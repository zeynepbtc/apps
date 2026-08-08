#!/usr/bin/env node
/**
 * run-core-gates.mjs — Kanji Atlas · ÇEKİRDEK YAYIN KAPISI KOŞUCUSU
 * Test Repair Batch B (Codex sözleşmesi 2026-08-07-TEST-REPAIR-BATCH-B-CORE-RUNNER)
 *
 * NE YAPAR: bağımsız olarak zaten yeşil olan ON hızlı kontrolü tek, taşınabilir, bağımlılıksız
 * bir giriş noktasından SIRAYLA koşar ve sonucu insan/makine okunur biçimde raporlar.
 * NE YAPMAZ: hiçbir testi onarmaz, yeniden yazmaz, yeniden adlandırmaz, kapsamını genişletmez.
 *
 * KASITLI SINIRLAR (sözleşme):
 *   · Yalnız Node yerleşikleri — sıfır bağımlılık, package dosyası eklenmez.
 *   · Testler AÇIK BEYAZ LİSTEDEN gelir; dosya adı deseni veya dizin taramasıyla KEŞFEDİLMEZ.
 *     (apply_kyuu_qa_round.js gibi "uygulamaya yazan" betikler bu yüzden asla çalışmaz.)
 *   · Sunucu başlatmaz, port bağlamaz, tarayıcı açmaz, ağa çıkmaz, izlenen dosya YAZMAZ.
 *   · Git koruması SALT OKUNURDUR: reset/restore/clean/stash YAPMAZ. Kullanıcının işini asla
 *     otomatik geri almaz — yalnız bildirir.
 *
 * KULLANIM
 *   node run-core-gates.mjs                  insan okunur özet
 *   node run-core-gates.mjs --json           stdout'a TEK geçerli JSON belgesi (tanılar stderr'e)
 *   node run-core-gates.mjs --atlas=<yol>    Atlas dizinini elle ver (varsayılan: bu dosyanın üst dizini)
 *   node run-core-gates.mjs --timeout-ms=N   test başına zaman aşımı (varsayılan 60000)
 *   node run-core-gates.mjs --help           bu metni yazar, TEST KOŞMADAN çıkar (exit 0)
 *
 * ZAMAN AŞIMI GEREKÇESİ: bu katmandaki on testin ölçülen en yavaşı ~310 ms (toplam < 1 sn).
 * Varsayılan 60 000 ms, yavaş disk / soğuk önbellek / harici birim için ~200× pay bırakır;
 * asılan bir çocuğu ise kapıyı süresiz bekletmeden yakalar. Zaman aşımı çocuğu SONLANDIRIR
 * (SIGTERM, 2 sn sonra SIGKILL) ve kapıyı DÜŞÜRÜR.
 *
 * ÇIKIŞ KODU: hepsi geçerse 0; aksi hâlde 1 (test başarısızlığı, sinyal, zaman aşımı, spawn
 * hatası, kirli başlangıç, koşum sırasında ağaç değişimi, kullanım hatası).
 */
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCHEMA_VERSION = "1.0";
const RUNNER_NAME = "run-core-gates";
const HERE = path.dirname(fileURLToPath(import.meta.url));   // …/kanji-atlas/_faz2
const DEFAULT_TIMEOUT_MS = 60_000;

/* ── AÇIK BEYAZ LİSTE — sözleşmedeki sıra. Genişletmek ayrı bir sözleşme gerektirir. ──────────
   Buraya dosya adı deseniyle ekleme YAPILMAZ; her giriş bilinçli bir karardır.               */
const WHITELIST = [
  "smoke_content_scaffold.js",
  "smoke_legacy_derived.js",
  "smoke_readings_sets.js",
  "smoke_official_readings_small_batch.js",
  "smoke_official_readings_ato.js",
  "smoke_durable_backend.js",
  "smoke_game_roles.js",
  "storage_check.js",
  "srs_check.js",
  "graph_check.js",
  "list_progress_check.js",
  "manifest_check.js",
  "manifest_build_check.js",
];

const USAGE = `run-core-gates — Kanji Atlas çekirdek yayın kapısı koşucusu (${WHITELIST.length} test)

  node run-core-gates.mjs [--json] [--atlas=<yol>] [--timeout-ms=<n>]
  node run-core-gates.mjs --help

  --json           stdout'a tek JSON belgesi; insan çıktısı stderr'e gider
  --atlas=<yol>    Atlas dizini (varsayılan: bu betiğin üst dizini)
  --timeout-ms=<n> test başına zaman aşımı, ms (varsayılan ${DEFAULT_TIMEOUT_MS})
  --help           bu metni yazar ve çıkar (test koşmaz)

Beyaz liste (sırayla):
${WHITELIST.map((t, i) => `  ${String(i + 1).padStart(2)}. ${t}`).join("\n")}`;

/* ── Argüman ayrıştırma: bilinmeyen argüman HATA ── */
const argv = process.argv.slice(2);
let jsonMode = false, atlasArg = null, timeoutMs = DEFAULT_TIMEOUT_MS;
for (const a of argv) {
  if (a === "--help" || a === "-h") { process.stdout.write(USAGE + "\n"); process.exit(0); }
  else if (a === "--json") jsonMode = true;
  else if (a.startsWith("--atlas=")) atlasArg = a.slice("--atlas=".length);
  else if (a.startsWith("--timeout-ms=")) {
    const n = Number(a.slice("--timeout-ms=".length));
    if (!Number.isFinite(n) || n <= 0) { process.stderr.write(`HATA: geçersiz --timeout-ms: ${a}\n\n${USAGE}\n`); process.exit(1); }
    timeoutMs = n;
  } else { process.stderr.write(`HATA: bilinmeyen argüman: ${a}\n\n${USAGE}\n`); process.exit(1); }
}

/* İnsan çıktısı: --json modunda stdout kirlenmesin diye stderr'e gider. */
const out = s => (jsonMode ? process.stderr : process.stdout).write(s + "\n");

/* ── Atlas dizini: koşucunun KENDİ konumundan çözülür (çağıranın cwd'si değil) ── */
const ATLAS = path.resolve(atlasArg || path.join(HERE, ".."));
const FAZ2 = atlasArg ? path.join(ATLAS, "_faz2") : HERE;

/* ── Git koruması (SALT OKUNUR) ── */
const git = (args, cwd) => {
  const r = spawnSync("git", args, { cwd, encoding: "utf8", shell: false });
  return { ok: r.status === 0 && !r.error, stdout: (r.stdout || "").trim(), stderr: (r.stderr || "").trim() };
};
function gitProbe() {
  const inside = git(["rev-parse", "--is-inside-work-tree"], ATLAS);
  if (!inside.ok || inside.stdout !== "true") {
    return { available: false, reason: "Git çalışma ağacı bulunamadı (bağımsız kopya olabilir)", status: null, sha: null };
  }
  const st = git(["status", "--porcelain"], ATLAS);
  const sha = git(["rev-parse", "HEAD"], ATLAS);
  if (!st.ok) return { available: false, reason: "git status okunamadı: " + st.stderr, status: null, sha: null };
  return { available: true, reason: null, status: st.stdout, sha: sha.ok ? sha.stdout : null };
}

/* ── Tek testi koş: process.execPath ile, KABUK YOK ── */
function runOne(file) {
  const abs = path.join(FAZ2, file);
  const started = Date.now();
  if (!existsSync(abs)) {
    return { name: file, status: "MISSING", exitCode: null, signal: null, durationMs: 0,
             stdout: "", stderr: `beyaz listedeki dosya bulunamadı: ${abs}`, error: "ENOENT" };
  }
  return new Promise(resolve => {
    let child;
    try {
      child = spawn(process.execPath, [abs], { cwd: ATLAS, shell: false, stdio: ["ignore", "pipe", "pipe"] });
    } catch (e) {
      return resolve({ name: file, status: "SPAWN_ERROR", exitCode: null, signal: null,
                       durationMs: Date.now() - started, stdout: "", stderr: String(e && e.message || e), error: "SPAWN" });
    }
    let so = "", se = "", timedOut = false, killTimer = null;
    child.stdout.on("data", d => { so += d; });
    child.stderr.on("data", d => { se += d; });
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
      killTimer = setTimeout(() => { try { child.kill("SIGKILL"); } catch {} }, 2000);
    }, timeoutMs);
    child.on("error", e => {
      clearTimeout(timer); if (killTimer) clearTimeout(killTimer);
      resolve({ name: file, status: "SPAWN_ERROR", exitCode: null, signal: null,
                durationMs: Date.now() - started, stdout: so, stderr: se + String(e && e.message || e), error: "SPAWN" });
    });
    child.on("close", (code, signal) => {
      clearTimeout(timer); if (killTimer) clearTimeout(killTimer);
      const durationMs = Date.now() - started;
      const status = timedOut ? "TIMEOUT" : (signal ? "SIGNAL" : (code === 0 ? "PASS" : "FAIL"));
      resolve({ name: file, status, exitCode: code, signal: signal || null, durationMs, stdout: so, stderr: se, error: null });
    });
  });
}

/* ── Ana akış ── */
const startedAt = new Date();
const t0 = Date.now();

out(`${RUNNER_NAME} · ${WHITELIST.length} çekirdek kapı`);
out(`Atlas dizini : ${ATLAS}`);
out(`Node         : ${process.version}`);
out(`Zaman aşımı  : ${timeoutMs} ms / test`);

const before = gitProbe();
const guard = { available: before.available, reason: before.reason, startedClean: null, unchanged: null, changedPaths: [], sha: before.sha };

if (before.available) {
  guard.startedClean = before.status === "";
  out(`Git SHA      : ${before.sha || "(bilinmiyor)"}`);
  if (!guard.startedClean) {
    const dirty = before.status.split("\n").filter(Boolean);
    guard.changedPaths = dirty;
    out(`\n❌ KIRLI BAŞLANGIÇ — yayın kapısı koşumu TEMİZ ağaçta başlamalıdır.`);
    out(`   ${dirty.length} değişmiş yol (ilk 10):`);
    dirty.slice(0, 10).forEach(l => out(`     ${l}`));
    out(`   Hiçbir test çalıştırılmadı. Koruma SALT OKUNURDUR: değişiklikleriniz OLDUĞU GİBİ duruyor;`);
    out(`   koşucu hiçbir şeyi geri almaz/temizlemez. Değişiklikleri kendiniz commit'leyin veya saklayın.`);
    if (jsonMode) {
      process.stdout.write(JSON.stringify({
        schemaVersion: SCHEMA_VERSION, runner: RUNNER_NAME, nodeVersion: process.version,
        atlasDir: ATLAS, timeoutMs, gitSha: before.sha,
        startedAt: startedAt.toISOString(), endedAt: new Date().toISOString(), totalDurationMs: Date.now() - t0,
        guard: { available: true, startedClean: false, unchanged: null, changedPaths: dirty, reason: "dirty-start" },
        results: [], totals: { total: WHITELIST.length, pass: 0, fail: 0, timeout: 0, other: 0, notRun: WHITELIST.length },
        overallPass: false, decision: "REFUSED_DIRTY_START",
      }, null, 2) + "\n");
    }
    process.exit(1);
  }
} else {
  out(`Git koruması : KULLANILAMIYOR — ${before.reason}`);
}

const results = [];
for (const file of WHITELIST) {
  const r = await runOne(file);
  results.push(r);
  const tag = { PASS: "✅ PASS", FAIL: "❌ FAIL", TIMEOUT: "⏱ TIMEOUT", SIGNAL: "💥 SIGNAL",
                SPAWN_ERROR: "🚫 SPAWN", MISSING: "🚫 MISSING" }[r.status] || r.status;
  const detail = r.status === "PASS" ? "" :
    (r.signal ? ` signal=${r.signal}` : (r.exitCode !== null ? ` exit=${r.exitCode}` : ` ${r.error || ""}`));
  out(`  ${tag.padEnd(11)} ${r.name.padEnd(26)} ${String(r.durationMs).padStart(6)} ms${detail}`);
}

/* Koşum sonrası ağaç kontrolü (SALT OKUNUR) */
if (guard.available) {
  const after = gitProbe();
  if (!after.available) { guard.unchanged = null; guard.reason = "koşum sonrası git status okunamadı"; }
  else {
    guard.unchanged = after.status === before.status;
    if (!guard.unchanged) {
      const b = new Set(before.status.split("\n").filter(Boolean));
      guard.changedPaths = after.status.split("\n").filter(Boolean).filter(l => !b.has(l));
    }
  }
}

const totals = {
  total: results.length,
  pass: results.filter(r => r.status === "PASS").length,
  fail: results.filter(r => r.status === "FAIL").length,
  timeout: results.filter(r => r.status === "TIMEOUT").length,
  other: results.filter(r => !["PASS", "FAIL", "TIMEOUT"].includes(r.status)).length,
  notRun: 0,
};
const testsOk = totals.pass === totals.total;
const guardOk = guard.available ? guard.unchanged === true : true;   // koruma yoksa engel değil
const overallPass = testsOk && guardOk;
const endedAt = new Date();
const totalDurationMs = Date.now() - t0;

out("");
out(`Toplam: ${totals.pass}/${totals.total} PASS · FAIL ${totals.fail} · TIMEOUT ${totals.timeout} · diğer ${totals.other} · ${totalDurationMs} ms`);
if (guard.available) {
  if (guard.unchanged === true) out(`Ağaç koruması: ✅ koşum sırasında değişiklik YOK`);
  else if (guard.unchanged === false) {
    out(`Ağaç koruması: ❌ KOŞUM SIRASINDA AĞAÇ DEĞİŞTİ — bir test izlenen dosyaya yazmış olabilir`);
    guard.changedPaths.slice(0, 10).forEach(l => out(`     ${l}`));
    out(`   Değişiklikler OLDUĞU GİBİ bırakıldı (salt okunur koruma); inceleyip kendiniz karar verin.`);
  } else out(`Ağaç koruması: ⚠️ koşum sonrası durum okunamadı`);
} else out(`Ağaç koruması: ⚠️ kullanılamıyor (${guard.reason})`);
out(overallPass ? "\n✅ ÇEKİRDEK KAPILAR GEÇTİ" : "\n❌ ÇEKİRDEK KAPILAR GEÇMEDİ");

if (jsonMode) {
  process.stdout.write(JSON.stringify({
    schemaVersion: SCHEMA_VERSION, runner: RUNNER_NAME, nodeVersion: process.version,
    atlasDir: ATLAS, timeoutMs, gitSha: guard.sha,
    startedAt: startedAt.toISOString(), endedAt: endedAt.toISOString(), totalDurationMs,
    guard: { available: guard.available, startedClean: guard.startedClean, unchanged: guard.unchanged,
             changedPaths: guard.changedPaths, reason: guard.reason },
    results: results.map(r => ({ name: r.name, status: r.status, exitCode: r.exitCode, signal: r.signal,
                                 durationMs: r.durationMs, stdout: r.stdout, stderr: r.stderr, error: r.error })),
    totals, overallPass, decision: overallPass ? "PASS" : "FAIL",
  }, null, 2) + "\n");
}

process.exit(overallPass ? 0 : 1);
