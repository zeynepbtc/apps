#!/usr/bin/env node
/**
 * run-browser-gates.mjs — Kanji Atlas · TARAYICI YAYIN KAPISI KOŞUCUSU
 * Test Repair Batch C (Codex sözleşmesi 2026-08-07-TEST-REPAIR-BATCH-C-BROWSER-GATES)
 *
 * NE YAPAR: üç tarayıcı smoke testini TEK sahipli yerel sunucu üzerinden, sırayla, denetimli koşar.
 * NE YAPMAZ: hiçbir assertion'ı zayıflatmaz, selector değiştirmez, ürünü onarmaz.
 *
 * SUNUCU SAHİPLİĞİ (sözleşme §2): sunucuyu KOŞUCU açar, testler değil.
 *   · Yalnız Node yerleşiği `node:http` — Python veya harici araç YOK.
 *   · Yalnız 127.0.0.1'e bağlanır (loopback), dış arayüz dinlemez.
 *   · Port `0` istenir → işletim sistemi atar. SABİT PORT YOK; çakışma yapısal olarak imkânsız.
 *   · Yalnız Atlas kökü altındaki dosyalar servis edilir. Kapsama SÖZCÜKSEL DEĞİL FİZİKSELDİR:
 *     kök ve hedef `realpath` ile kanonikleştirilip karşılaştırılır, dosya kanonik yoldan
 *     `O_NOFOLLOW` ile açılır ve içerik o fd'den akıtılır. Atlas içindeki bir sembolik bağ
 *     dışarıyı gösteriyorsa 403 döner (dizin `index.html`'i için de aynı kural işler).
 *     Artık sınır (dürüst not): bu yerel test sunucusu, doğrulama ile açma arasında Atlas
 *     ağacını değiştirebilen bir saldırganı varsaymaz — O_NOFOLLOW son bileşen yarışını kapatır,
 *     ama tam TOCTOU bağışıklığı Node yerleşikleriyle taşınabilir biçimde sağlanamaz.
 *   · Çözülen URL çocuklara `SMOKE_URL` ile geçirilir.
 *   · Sunucu BAŞARI, BAŞARISIZLIK, ZAMAN AŞIMI, SİNYAL ve İÇ HATA yollarının HEPSİNDE kapatılır.
 *
 * ZAMAN AŞIMI: varsayılan 300 000 ms/test. Gerekçe: ölçülen en yavaş test `smoke_recognition.js`
 * ~191 sn (çok sayıda tam sayfa yeniden yükleme). 300 sn ~%57 pay bırakır; asılmayı yine yakalar.
 * Aşılırsa SIGTERM, 5 sn sonra SIGKILL.
 *
 * GIT KORUMASI: Batch B ile aynı ilke — SALT OKUNUR. Kirli başlangıçta sunucuyu bile açmadan
 * reddeder; koşum sırasında ağaç değişirse düşer. reset/restore/clean/stash ASLA yapmaz.
 *
 * KULLANIM
 *   node run-browser-gates.mjs                insan okunur özet
 *   node run-browser-gates.mjs --json         stdout'a TEK geçerli JSON belgesi
 *   node run-browser-gates.mjs --atlas=<yol>  Atlas kökü (taşınmış kopya kanıtları için)
 *   node run-browser-gates.mjs --timeout-ms=N test başına zaman aşımı (varsayılan 300000)
 *   node run-browser-gates.mjs --help         test koşmadan çıkar (exit 0)
 */
import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, createReadStream, realpathSync, openSync, closeSync, fstatSync, constants as FS } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCHEMA_VERSION = "1.0";
const RUNNER_NAME = "run-browser-gates";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_TIMEOUT_MS = 300_000;
const KILL_GRACE_MS = 5_000;

/* ── AÇIK BEYAZ LİSTE — sözleşmedeki sıra. Desen/dizin taraması YOK. ── */
const WHITELIST = ["smoke_sources.js", "smoke_home_rec.js", "smoke_backup.js", "smoke_recognition.js"];

const USAGE = `run-browser-gates — Kanji Atlas tarayıcı yayın kapısı (${WHITELIST.length} test)

  node run-browser-gates.mjs [--json] [--atlas=<yol>] [--timeout-ms=<n>]
  node run-browser-gates.mjs --help

  --json           stdout'a tek JSON belgesi; insan çıktısı stderr'e gider
  --atlas=<yol>    Atlas kökü (varsayılan: bu betiğin üst dizini)
  --timeout-ms=<n> test başına zaman aşımı, ms (varsayılan ${DEFAULT_TIMEOUT_MS})
  --help           bu metni yazar ve çıkar (test koşmaz)

Beyaz liste (sırayla):
${WHITELIST.map((t, i) => `  ${i + 1}. ${t}`).join("\n")}

Sunucu: node:http · 127.0.0.1 · port 0 (OS atar) · yalnız Atlas kökü altı.`;

/* ── Argümanlar: bilinmeyen argüman HATA ── */
let jsonMode = false, atlasArg = null, timeoutMs = DEFAULT_TIMEOUT_MS;
for (const a of process.argv.slice(2)) {
  if (a === "--help" || a === "-h") { process.stdout.write(USAGE + "\n"); process.exit(0); }
  else if (a === "--json") jsonMode = true;
  else if (a.startsWith("--atlas=")) atlasArg = a.slice("--atlas=".length);
  else if (a.startsWith("--timeout-ms=")) {
    const n = Number(a.slice("--timeout-ms=".length));
    if (!Number.isFinite(n) || n <= 0) { process.stderr.write(`HATA: geçersiz --timeout-ms: ${a}\n\n${USAGE}\n`); process.exit(1); }
    timeoutMs = n;
  } else { process.stderr.write(`HATA: bilinmeyen argüman: ${a}\n\n${USAGE}\n`); process.exit(1); }
}
const out = s => (jsonMode ? process.stderr : process.stdout).write(s + "\n");

const ATLAS = path.resolve(atlasArg || path.join(HERE, ".."));
const FAZ2 = atlasArg ? path.join(ATLAS, "_faz2") : HERE;

/* ── Git koruması (SALT OKUNUR) ── */
const git = args => {
  const r = spawnSync("git", args, { cwd: ATLAS, encoding: "utf8", shell: false });
  return { ok: r.status === 0 && !r.error, stdout: (r.stdout || "").trim(), stderr: (r.stderr || "").trim() };
};
function gitProbe() {
  const inside = git(["rev-parse", "--is-inside-work-tree"]);
  if (!inside.ok || inside.stdout !== "true") return { available: false, reason: "Git çalışma ağacı bulunamadı (bağımsız kopya olabilir)", status: null, sha: null };
  const st = git(["status", "--porcelain"]);
  if (!st.ok) return { available: false, reason: "git status okunamadı: " + st.stderr, status: null, sha: null };
  const sha = git(["rev-parse", "HEAD"]);
  return { available: true, reason: null, status: st.stdout, sha: sha.ok ? sha.stdout : null };
}

/* ── Sahipli yerel sunucu ── */
const MIME = {
  ".html": "text/html; charset=utf-8", ".htm": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".mp3": "audio/mpeg", ".wav": "audio/wav", ".ogg": "audio/ogg",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif",
  ".svg": "image/svg+xml", ".webp": "image/webp", ".ico": "image/x-icon",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".otf": "font/otf",
  ".txt": "text/plain; charset=utf-8", ".map": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

/* ── FİZİKSEL KAPSAMA (Batch C düzeltmesi 2026-08-07) ─────────────────────────────────────────
   Sözcüksel (lexical) kontrol YETMEZ: Atlas içindeki bir SEMBOLİK BAĞ dışarıyı gösterebilir ve
   `..` içermediği için sözcüksel denetimden geçer. Bu yüzden kök ve hedef KANONİK (realpath)
   biçimde çözülüp karşılaştırılır; dosya sonra KANONİK yoldan, O_NOFOLLOW ile açılır. */
const ATLAS_REAL = (() => { try { return realpathSync(ATLAS); } catch { return ATLAS; } })();

/** Kanonik hedef Atlas kökünün İÇİNDE mi? İçindeyse kanonik yolu, değilse false, yoksa null döner. */
function physicalTarget(abs) {
  let real;
  try { real = realpathSync(abs); } catch { return null; }        // yok / kırık bağ → 404
  const rel = path.relative(ATLAS_REAL, real);
  if (rel === "" || rel.startsWith("..") || path.isAbsolute(rel)) return false;  // KAÇIŞ
  return real;
}

/** İstek yolunu GÜVENLİ biçimde Atlas kökü altındaki mutlak yola çevirir; kaçış varsa null. */
function safeResolve(rawUrl) {
  let pathname;
  try { pathname = new URL(rawUrl, "http://127.0.0.1").pathname; } catch { return null; }
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { return null; }   // bozuk yüzde kodlaması
  if (decoded.includes("\0")) return null;                                  // null bayt
  if (decoded === "/" || decoded === "") decoded = "/index.html";
  /* POSIX normalize et; sonuç hâlâ kökten kaçıyorsa reddet. */
  const norm = path.posix.normalize(decoded);
  if (!norm.startsWith("/") || norm.startsWith("/..")) return null;
  const abs = path.resolve(ATLAS, "." + norm);
  const rel = path.relative(ATLAS, abs);
  /* Son savunma: çözülen yol gerçekten Atlas kökünün ALTINDA mı? */
  if (rel === "" || rel.startsWith("..") || path.isAbsolute(rel)) return null;
  return abs;
}

function startServer() {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      if (req.method !== "GET" && req.method !== "HEAD") {
        res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8", "Allow": "GET, HEAD" });
        return res.end("405 Method Not Allowed");
      }
      const abs = safeResolve(req.url || "/");
      if (!abs) return plain(res, 400, "400 Bad Request");

      /* 1) Sözcüksel olarak güvenli yol → KANONİK yola çöz ve fiziksel kapsamayı doğrula. */
      let real = physicalTarget(abs);
      if (real === null) return plain(res, 404, "404 Not Found");           // yok / kırık bağ
      if (real === false) return plain(res, 403, "403 Forbidden");          // SEMBOLİK BAĞ KAÇIŞI

      /* 2) Kanonik yoldan aç. O_NOFOLLOW: son bileşen bağ ise açma (yarış payı da kapanır). */
      let fd;
      try { fd = openSync(real, FS.O_RDONLY | FS.O_NOFOLLOW); }
      catch { return plain(res, 404, "404 Not Found"); }

      let st;
      try { st = fstatSync(fd); } catch { try { closeSync(fd); } catch {} return plain(res, 404, "404 Not Found"); }

      if (st.isDirectory()) {
        try { closeSync(fd); } catch {}
        /* 3) Dizin dizini: index.html AYNI fiziksel kapsama kuralından geçer.
              (Sembolik bağlı dizinin index.html'i dışarıdaysa reddedilir.) */
        const idxReal = physicalTarget(path.join(real, "index.html"));
        if (idxReal === null) return plain(res, 404, "404 Not Found");
        if (idxReal === false) return plain(res, 403, "403 Forbidden");
        let ifd;
        try { ifd = openSync(idxReal, FS.O_RDONLY | FS.O_NOFOLLOW); }
        catch { return plain(res, 404, "404 Not Found"); }
        let ist;
        try { ist = fstatSync(ifd); } catch { try { closeSync(ifd); } catch {} return plain(res, 404, "404 Not Found"); }
        if (!ist.isFile()) { try { closeSync(ifd); } catch {} return plain(res, 404, "404 Not Found"); }
        return sendFd(ifd, idxReal, ist.size, req, res);
      }
      if (!st.isFile()) { try { closeSync(fd); } catch {} return plain(res, 404, "404 Not Found"); }
      sendFd(fd, real, st.size, req, res);
    });
    function plain(res, code, msg) {
      res.writeHead(code, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(msg);
    }
    /* İçerik, doğrulanan KANONİK yoldan AÇILMIŞ fd üzerinden akıtılır — yolu yeniden açmayız,
       böylece doğrulama ile okuma arasında ikinci bir ad çözümlemesi olmaz. */
    function sendFd(fd, file, size, req, res) {
      const type = MIME[path.extname(file).toLowerCase()] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": type, "Content-Length": size, "Cache-Control": "no-store" });
      if (req.method === "HEAD") { try { closeSync(fd); } catch {} return res.end(); }
      const rs = createReadStream(null, { fd, autoClose: true });
      rs.on("error", () => { try { res.destroy(); } catch {} });
      rs.pipe(res);
    }
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => resolve(server));   // PORT 0 → OS atar
  });
}

/* ── Tek testi koş ── */
function runOne(file, smokeUrl) {
  const abs = path.join(FAZ2, file);
  const started = Date.now();
  if (!existsSync(abs)) {
    return Promise.resolve({ name: file, status: "MISSING", exitCode: null, signal: null, durationMs: 0,
      stdout: "", stderr: `beyaz listedeki dosya bulunamadı: ${abs}`, error: "ENOENT" });
  }
  return new Promise(resolve => {
    let child;
    try {
      child = spawn(process.execPath, [abs], {
        cwd: ATLAS, shell: false, stdio: ["ignore", "pipe", "pipe"],
        env: { ...process.env, SMOKE_URL: smokeUrl },
      });
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
      killTimer = setTimeout(() => { try { child.kill("SIGKILL"); } catch {} }, KILL_GRACE_MS);
    }, timeoutMs);
    child.on("error", e => {
      clearTimeout(timer); if (killTimer) clearTimeout(killTimer);
      resolve({ name: file, status: "SPAWN_ERROR", exitCode: null, signal: null,
        durationMs: Date.now() - started, stdout: so, stderr: se + String(e && e.message || e), error: "SPAWN" });
    });
    child.on("close", (code, signal) => {
      clearTimeout(timer); if (killTimer) clearTimeout(killTimer);
      const status = timedOut ? "TIMEOUT" : (signal ? "SIGNAL" : (code === 0 ? "PASS" : "FAIL"));
      resolve({ name: file, status, exitCode: code, signal: signal || null,
        durationMs: Date.now() - started, stdout: so, stderr: se, error: null });
    });
  });
}

/* ── Ana akış ── */
const startedAt = new Date();
const t0 = Date.now();
let server = null;
const closeServer = () => new Promise(r => { if (!server) return r(); server.close(() => r()); server = null; });
/* Sinyal yollarında da sunucu kapanır */
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, async () => { await closeServer(); process.exit(1); });

out(`${RUNNER_NAME} · ${WHITELIST.length} tarayıcı kapısı`);
out(`Atlas kökü   : ${ATLAS}`);
out(`Node         : ${process.version}`);
out(`Zaman aşımı  : ${timeoutMs} ms / test`);

const before = gitProbe();
const guard = { available: before.available, reason: before.reason, startedClean: null, unchanged: null, changedPaths: [], sha: before.sha };

function emitJson(extra) {
  if (!jsonMode) return;
  process.stdout.write(JSON.stringify({
    schemaVersion: SCHEMA_VERSION, runner: RUNNER_NAME, nodeVersion: process.version,
    atlasDir: ATLAS, timeoutMs, gitSha: guard.sha,
    startedAt: startedAt.toISOString(), endedAt: new Date().toISOString(), totalDurationMs: Date.now() - t0,
    guard: { available: guard.available, startedClean: guard.startedClean, unchanged: guard.unchanged,
             changedPaths: guard.changedPaths, reason: guard.reason },
    ...extra,
  }, null, 2) + "\n");
}

if (before.available) {
  guard.startedClean = before.status === "";
  out(`Git SHA      : ${before.sha || "(bilinmiyor)"}`);
  if (!guard.startedClean) {
    const dirty = before.status.split("\n").filter(Boolean);
    guard.changedPaths = dirty;
    out(`\n❌ KIRLI BAŞLANGIÇ — yayın kapısı koşumu TEMİZ ağaçta başlamalıdır.`);
    out(`   ${dirty.length} değişmiş yol (ilk 10):`);
    dirty.slice(0, 10).forEach(l => out(`     ${l}`));
    out(`   Sunucu AÇILMADI, hiçbir test çalıştırılmadı. Koruma SALT OKUNURDUR: değişiklikleriniz`);
    out(`   OLDUĞU GİBİ duruyor; koşucu hiçbir şeyi geri almaz/temizlemez.`);
    emitJson({ serverUrl: null, port: null, results: [],
      totals: { total: WHITELIST.length, pass: 0, fail: 0, timeout: 0, other: 0, notRun: WHITELIST.length },
      overallPass: false, decision: "REFUSED_DIRTY_START" });
    process.exit(1);
  }
} else {
  out(`Git koruması : KULLANILAMIYOR — ${before.reason}`);
}

let results = [], smokeUrl = null, port = null, exitCode = 1;
try {
  server = await startServer();
  port = server.address().port;
  smokeUrl = `http://127.0.0.1:${port}/index.html`;
  out(`Sunucu       : ${smokeUrl}  (127.0.0.1, port OS tarafından atandı)`);
  out("");

  for (const file of WHITELIST) {
    const r = await runOne(file, smokeUrl);
    results.push(r);
    const tag = { PASS: "✅ PASS", FAIL: "❌ FAIL", TIMEOUT: "⏱ TIMEOUT", SIGNAL: "💥 SIGNAL",
                  SPAWN_ERROR: "🚫 SPAWN", MISSING: "🚫 MISSING" }[r.status] || r.status;
    const detail = r.status === "PASS" ? "" :
      (r.signal ? ` signal=${r.signal}` : (r.exitCode !== null ? ` exit=${r.exitCode}` : ` ${r.error || ""}`));
    out(`  ${tag.padEnd(11)} ${r.name.padEnd(24)} ${String(r.durationMs).padStart(7)} ms${detail}`);
  }
} catch (e) {
  out(`\n❌ KOŞUCU İÇ HATASI: ${e && e.message || e}`);
  results.push({ name: "(runner)", status: "RUNNER_ERROR", exitCode: null, signal: null,
    durationMs: Date.now() - t0, stdout: "", stderr: String(e && e.stack || e), error: "RUNNER" });
} finally {
  await closeServer();                                   // HER yolda kapanır
}

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
  total: WHITELIST.length,
  pass: results.filter(r => r.status === "PASS").length,
  fail: results.filter(r => r.status === "FAIL").length,
  timeout: results.filter(r => r.status === "TIMEOUT").length,
  other: results.filter(r => !["PASS", "FAIL", "TIMEOUT"].includes(r.status)).length,
  notRun: Math.max(0, WHITELIST.length - results.filter(r => r.name !== "(runner)").length),
};
const testsOk = totals.pass === WHITELIST.length && totals.notRun === 0;
const guardOk = guard.available ? guard.unchanged === true : true;
const overallPass = testsOk && guardOk;
const totalDurationMs = Date.now() - t0;

out("");
out(`Sunucu kapatıldı · port ${port ?? "(açılmadı)"}`);
out(`Toplam: ${totals.pass}/${totals.total} PASS · FAIL ${totals.fail} · TIMEOUT ${totals.timeout} · diğer ${totals.other} · ${totalDurationMs} ms`);
if (guard.available) {
  if (guard.unchanged === true) out(`Ağaç koruması: ✅ koşum sırasında değişiklik YOK`);
  else if (guard.unchanged === false) {
    out(`Ağaç koruması: ❌ KOŞUM SIRASINDA AĞAÇ DEĞİŞTİ`);
    guard.changedPaths.slice(0, 10).forEach(l => out(`     ${l}`));
    out(`   Değişiklikler OLDUĞU GİBİ bırakıldı (salt okunur koruma).`);
  } else out(`Ağaç koruması: ⚠️ koşum sonrası durum okunamadı`);
} else out(`Ağaç koruması: ⚠️ kullanılamıyor (${guard.reason})`);
out(overallPass ? "\n✅ TARAYICI KAPILARI GEÇTİ" : "\n❌ TARAYICI KAPILARI GEÇMEDİ");

emitJson({
  serverUrl: smokeUrl, port,
  results: results.map(r => ({ name: r.name, status: r.status, exitCode: r.exitCode, signal: r.signal,
    durationMs: r.durationMs, stdout: r.stdout, stderr: r.stderr, error: r.error })),
  totals, overallPass, decision: overallPass ? "PASS" : "FAIL",
});
exitCode = overallPass ? 0 : 1;
process.exit(exitCode);
