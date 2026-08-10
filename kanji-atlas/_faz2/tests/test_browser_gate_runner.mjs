/* TEST REPAIR BATCH F — run-browser-gates.mjs DAVRANIŞ TESTİ
   Sözleşme: 2026-08-07-TEST-REPAIR-BATCH-F-BROWSER-FAILURE-EVIDENCE.md (+ 2026-08-10 ek)

   NE YAPAR: gerçek run-browser-gates.mjs koşucusunu, GEÇİCİ ve TAŞINABİLİR bir Atlas kopyasına
   karşı çalıştırır. Üretim whitelist'i (smoke_sources/home_rec/backup/recognition) DEĞİŞMEZ;
   yalnız test kopyasındaki bu adlara AÇIK, mekanik fixture betikleri yazılır. Gerçek smoke
   dosyaları, üretim verisi, selector, timeout, sunucu ve git koruması değişmez.

   Doğrulanan senaryolar: özgün sözleşmenin (§4) 7 senaryosu (S1–S7) + Codex ön-commit Unicode
   düzeltme senaryosu (S8). Toplam 8 senaryo:
     S1 non-zero çocuk, iki akış dolu → ikisi görünür, exit 1 (yapay HARNESS ERR: asıl stderr görünür)
     S2 non-zero çocuk, bir akış boş → (boş)
     S3 çok uzun çıktı → sabit sınır + [KESİLDİ] + orijinal uzunluk + son bölüm (tail)
     S4 timeout → yakalanan çıktı korunur; sunucu kapanır; artık çocuk süreç kalmaz
     S5 --json başarısızlık → stdout tek parse edilebilir JSON; sonuç stdout/stderr alanları tam
     S6 başarı → 4/4; PASS çocuk çıktısı insan loguna basılmaz
     S7 kirli başlangıç + koşum-sırası kirlenme korumaları değişmeden çalışır
     S8 Unicode kesme sınırı (Codex BULGU 1) → surrogate çifti bölünmez; U+FFFD oluşmaz */
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const RUNNER = path.join(HERE, "..", "run-browser-gates.mjs");
const WL = ["smoke_sources.js", "smoke_home_rec.js", "smoke_backup.js", "smoke_recognition.js"];
const PASS = m => `console.log(${JSON.stringify(m)}); process.exit(0);`;

let passed = 0, failed = 0; const fails = [];
const check = (name, cond, detail = "") => {
  if (cond) { passed++; console.log(`  ✅ ${name}`); }
  else { failed++; fails.push(name); console.log(`  ❌ ${name}${detail ? " — " + detail : ""}`); }
};

/* Geçici Atlas: index.html + _faz2/<4 fixture>. fixtures: {name: sourceString}. */
function mkAtlas(fixtures, opts = {}) {
  const dir = mkdtempSync(path.join(tmpdir(), "batchf_"));
  writeFileSync(path.join(dir, "index.html"), "<!doctype html><title>fixture</title>");
  mkdirSync(path.join(dir, "_faz2"));
  for (const name of WL) writeFileSync(path.join(dir, "_faz2", name), fixtures[name] ?? PASS("PASS_" + name));
  for (const [f, c] of Object.entries(opts.extraFiles || {})) writeFileSync(path.join(dir, f), c);
  if (opts.git) {
    const g = a => spawnSync("git", a, { cwd: dir, encoding: "utf8" });
    g(["init", "-q"]); g(["config", "user.email", "t@t"]); g(["config", "user.name", "t"]);
    g(["add", "-A"]); g(["commit", "-q", "-m", "init"]);
  }
  return dir;
}
function runRunner(atlas, args = []) {
  const r = spawnSync(process.execPath, [RUNNER, "--atlas=" + atlas, ...args],
    { encoding: "utf8", timeout: 60_000 });
  return { code: r.status, stdout: r.stdout || "", stderr: r.stderr || "" };
}
const cleanup = d => { try { rmSync(d, { recursive: true, force: true }); } catch {} };

/* ── S1: iki akış dolu · yapay HARNESS ERR asıl stderr görünür ── */
function s1() {
  console.log("S1 · non-zero çocuk, iki akış dolu (yapay HARNESS ERR)");
  const OUT = "SRC_STDOUT_MARKER_S1", ERR = "HARNESS ERR: asıl stderr S1";
  const atlas = mkAtlas({ "smoke_sources.js": `console.log(${JSON.stringify(OUT)}); console.error(${JSON.stringify(ERR)}); process.exit(2);` });
  const r = runRunner(atlas);
  check("S1 runner exit 1", r.code === 1, "exit=" + r.code);
  check("S1 stdout etiketi görünür", r.stdout.includes("── stdout ──"));
  check("S1 stderr etiketi görünür", r.stdout.includes("── stderr ──"));
  check("S1 çocuk stdout içeriği görünür", r.stdout.includes(OUT));
  check("S1 asıl HARNESS ERR stderr insan logunda görünür", r.stdout.includes(ERR));
  cleanup(atlas);
}

/* ── S2: bir akış boş → (boş) ── */
function s2() {
  console.log("S2 · non-zero çocuk, stdout boş");
  const ERR = "ONLY_STDERR_MARKER_S2";
  const atlas = mkAtlas({ "smoke_sources.js": `console.error(${JSON.stringify(ERR)}); process.exit(1);` });
  const r = runRunner(atlas);
  check("S2 runner exit 1", r.code === 1, "exit=" + r.code);
  check("S2 boş stdout '(boş)' olarak işaretli", /── stdout ──\s*\n\s*\(boş\)/.test(r.stdout));
  check("S2 stderr içeriği görünür", r.stdout.includes(ERR));
  cleanup(atlas);
}

/* ── S3: uzun çıktı → sınır + [KESİLDİ] + orijinal uzunluk + tail ── */
function s3() {
  console.log("S3 · çok uzun çıktı, kesilme + tail");
  const HEAD = "HEAD_MARKER_ILK_SATIR_S3", TAIL = "TAIL_MARKER_SON_SATIR_S3";
  const src = `let s=${JSON.stringify(HEAD)}+"\\n"; for(let i=0;i<600;i++){s+="FILLER-0123456789-"+i+"\\n";} s+=${JSON.stringify(TAIL)}; process.stdout.write(s+"\\n"); process.exit(1);`;
  const atlas = mkAtlas({ "smoke_sources.js": src });
  const r = runRunner(atlas);
  check("S3 runner exit 1", r.code === 1, "exit=" + r.code);
  check("S3 [KESİLDİ] etiketi var", r.stdout.includes("[KESİLDİ"));
  check("S3 orijinal uzunluk raporlanıyor (karakter+bayt)", /orijinal \d+ karakter · \d+ bayt/.test(r.stdout));
  check("S3 son bölüm (tail) korunuyor", r.stdout.includes(TAIL));
  check("S3 baş bölüm kesildi (head görünmüyor)", !r.stdout.includes(HEAD));
  cleanup(atlas);
}

/* ── S4: timeout → çıktı korunur, sunucu kapanır, artık süreç kalmaz ── */
function s4() {
  console.log("S4 · timeout / kill yolu");
  const MARK = "PRE_TIMEOUT_MARKER_S4";
  const src = `console.log(${JSON.stringify(MARK)}); process.on("SIGTERM",()=>{}); setInterval(()=>{},1000);`;
  const atlas = mkAtlas({ "smoke_recognition.js": src });   // son sıradaki test asılır
  const r = runRunner(atlas, ["--timeout-ms=1000"]);
  check("S4 runner exit 1", r.code === 1, "exit=" + r.code);
  check("S4 TIMEOUT durumu görünür", r.stdout.includes("TIMEOUT"));
  check("S4 timeout öncesi yakalanan çıktı korunmuş", r.stdout.includes(MARK));
  check("S4 sunucu kapatıldı", r.stdout.includes("Sunucu kapatıldı"));
  const pg = spawnSync("pgrep", ["-f", atlas], { encoding: "utf8" });
  check("S4 artık çocuk süreç kalmadı (pgrep boş)", (pg.stdout || "").trim() === "", "pgrep=" + JSON.stringify((pg.stdout || "").trim()));
  cleanup(atlas);
}

/* ── S5: --json başarısızlık → tek JSON + tam stdout/stderr alanları ── */
function s5() {
  console.log("S5 · --json başarısızlık");
  const OUT = "JSON_STDOUT_MARKER_S5", ERR = "JSON_STDERR_MARKER_S5";
  const atlas = mkAtlas({ "smoke_sources.js": `console.log(${JSON.stringify(OUT)}); console.error(${JSON.stringify(ERR)}); process.exit(1);` });
  const r = runRunner(atlas, ["--json"]);
  check("S5 runner exit 1", r.code === 1, "exit=" + r.code);
  let doc = null, parseOk = true;
  try { doc = JSON.parse(r.stdout); } catch { parseOk = false; }
  check("S5 stdout TEK parse edilebilir JSON", parseOk && doc && typeof doc === "object");
  if (doc) {
    const src = (doc.results || []).find(x => x.name === "smoke_sources.js");
    check("S5 sonuç nesnesi mevcut", !!src);
    check("S5 sonuç.stdout tam", !!src && String(src.stdout).includes(OUT));
    check("S5 sonuç.stderr tam", !!src && String(src.stderr).includes(ERR));
    check("S5 overallPass false / decision FAIL", doc.overallPass === false && doc.decision === "FAIL");
  }
  check("S5 insan kanıt bloğu stdout'a sızmadı (JSON temiz)", !r.stdout.includes("── stdout ──"));
  cleanup(atlas);
}

/* ── S6: başarı → 4/4, PASS çocuk çıktısı basılmaz ── */
function s6() {
  console.log("S6 · başarı yolu");
  const marks = Object.fromEntries(WL.map((n, i) => [n, PASS("PASS_MARKER_" + i)]));
  const atlas = mkAtlas(marks);
  const r = runRunner(atlas);
  check("S6 runner exit 0", r.code === 0, "exit=" + r.code);
  check("S6 4/4 PASS özeti", r.stdout.includes("4/4 PASS") || r.stdout.includes("TARAYICI KAPILARI GEÇTİ"));
  check("S6 PASS çocuk çıktısı basılmadı", !/PASS_MARKER_\d/.test(r.stdout));
  check("S6 kanıt bloğu yok", !r.stdout.includes("── stdout ──"));
  cleanup(atlas);
}

/* ── S7a: kirli başlangıç koruması ── */
function s7a() {
  console.log("S7a · kirli başlangıç koruması");
  const atlas = mkAtlas({}, { git: true });
  writeFileSync(path.join(atlas, "dirty-untracked.txt"), "x");   // koşumdan önce kirlet
  const r = runRunner(atlas);
  check("S7a runner exit 1", r.code === 1, "exit=" + r.code);
  check("S7a KIRLI BAŞLANGIÇ mesajı", r.stdout.includes("KIRLI BAŞLANGIÇ"));
  check("S7a sunucu açılmadı", r.stdout.includes("Sunucu AÇILMADI"));
  cleanup(atlas);
}

/* ── S7b: koşum sırasında kirlenme koruması ── */
function s7b() {
  console.log("S7b · koşum sırasında ağaç değişimi koruması");
  const atlas = mkAtlas(
    { "smoke_sources.js": `require("fs").appendFileSync("tracked.txt","MUT"); console.log("mutated"); process.exit(0);` },
    { git: true, extraFiles: { "tracked.txt": "orig\n" } });
  // tracked.txt commit'e dahil edilsin diye tekrar init/commit gerek: mkAtlas git init'i extraFiles'tan SONRA yapmıyor.
  // extraFiles mkAtlas içinde git'ten ÖNCE yazıldığı için commit'e girer.
  const r = runRunner(atlas);
  check("S7b runner exit 1", r.code === 1, "exit=" + r.code);
  check("S7b KOŞUM SIRASINDA AĞAÇ DEĞİŞTİ mesajı", r.stdout.includes("KOŞUM SIRASINDA AĞAÇ DEĞİŞTİ"));
  cleanup(atlas);
}

/* ── S8: UTF-8/Unicode kesme sınırı güvenli (surrogate çifti asla bölünmez, U+FFFD oluşmaz) ── */
function s8() {
  console.log("S8 · Unicode kesme sınırı güvenliği (BULGU 1)");
  const REPL = "�";
  // S8a: emoji tam da kesme sınırında ilk KORUNAN code point → bütün korunur
  {
    const atlas = mkAtlas({ "smoke_sources.js": `process.stdout.write("A".repeat(4000)+"😀"); process.exit(1);` });
    const r = runRunner(atlas);
    check("S8a exit 1", r.code === 1, "exit=" + r.code);
    check("S8a [KESİLDİ] var", r.stdout.includes("[KESİLDİ"));
    check("S8a U+FFFD (�) OLUŞMADI", !r.stdout.includes(REPL));
    check("S8a sınırdaki emoji bütün korundu", r.stdout.includes("😀"));
    cleanup(atlas);
  }
  // S8b: emoji tam da kesme sınırında son DÜŞEN code point → bütün olarak düşer, yarım surrogate kalmaz
  {
    const atlas = mkAtlas({ "smoke_sources.js": `process.stdout.write("😀"+"A".repeat(4000)); process.exit(1);` });
    const r = runRunner(atlas);
    check("S8b exit 1", r.code === 1, "exit=" + r.code);
    check("S8b U+FFFD (�) OLUŞMADI", !r.stdout.includes(REPL));
    check("S8b düşen emoji yarım surrogate bırakmadı (emoji yok)", !r.stdout.includes("😀"));
    cleanup(atlas);
  }
  // S8c: Codex enjeksiyonu birebir — "😀"+"A"*3999 (code point sayımıyla 4000 → kesilmez) → emoji korunur
  {
    const atlas = mkAtlas({ "smoke_sources.js": `process.stdout.write("😀"+"A".repeat(3999)); process.exit(1);` });
    const r = runRunner(atlas);
    check("S8c exit 1", r.code === 1, "exit=" + r.code);
    check("S8c U+FFFD (�) OLUŞMADI (hasReplacement=false)", !r.stdout.includes(REPL));
    check("S8c emoji korundu (hasEmoji=true)", r.stdout.includes("😀"));
    check("S8c orijinal 4000 karakter (code point) raporlandı", r.stdout.includes("4000 karakter"));
    cleanup(atlas);
  }
  // S8d: surrogate-çifti kanji (𠮷 U+20BB7) kesme sınırında bütün korunur
  {
    const atlas = mkAtlas({ "smoke_sources.js": `process.stdout.write("A".repeat(4000)+"𠮷"); process.exit(1);` });
    const r = runRunner(atlas);
    check("S8d exit 1", r.code === 1, "exit=" + r.code);
    check("S8d U+FFFD (�) OLUŞMADI", !r.stdout.includes(REPL));
    check("S8d sınırdaki 𠮷 bütün korundu", r.stdout.includes("𠮷"));
    cleanup(atlas);
  }
}

console.log("=== test_browser_gate_runner: 8 senaryo ===\n");
s1(); s2(); s3(); s4(); s5(); s6(); s7a(); s7b(); s8();
console.log(`\ntest_browser_gate_runner: ${passed}/${passed + failed} kontrol` + (failed ? ` · BAŞARISIZ: ${fails.join(", ")}` : ""));
process.exit(failed ? 1 : 0);
