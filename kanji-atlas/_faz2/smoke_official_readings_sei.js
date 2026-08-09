/* DECISION-004 · Resmî Okuma Tamamlama — 生/sei REGRESYON KAPISI
   Sözleşme: _AGENT_EXCHANGE/codex/specs/2026-08-09-READINGS-OFFICIAL-SEI-BATCH.md

   §1'de KİLİTLENEN beklentileri BAĞIMSIZ SABİT olarak taşır (totoloji değildir). Doğrudan
   index.html DATA.chars okunur. checkSei(chars) saf fonksiyondur; enjeksiyon harness'ı onu bellek
   içi klon üzerinde çağırır (ürün dosyasına yazmadan). 付表 (弥生/芝生) kümelere veya
   irregularWords'e SIZMAMALIDIR (§5.8). */

const REASON = "Resmî 常用 okuması; N5 başlangıç yüzeyinde bu tur öğretilmiyor";
const D = (reading, kind) => ({ reading, kind, reason: REASON, recommend: "defer" });

const EXPECT = {
  officialOn:  ["セイ", "ショウ"],
  officialKun: ["い(きる)", "い(かす)", "い(ける)", "う(まれる)", "う(む)", "お(う)", "は(える)", "は(やす)", "き", "なま"],
  taughtOn:    ["セイ"],
  taughtKun:   ["い(きる)", "う(まれる)"],
  onyomi:      "セイ",
  kunyomi:     "い(きる)・う(まれる)",
  deferred: [
    D("ショウ", "on"),
    D("い(かす)", "kun"), D("い(ける)", "kun"), D("う(む)", "kun"), D("お(う)", "kun"),
    D("は(える)", "kun"), D("は(やす)", "kun"), D("き", "kun"), D("なま", "kun"),
  ],
  examples: [["学生", "gakusei", "öğrenci"], ["先生", "sensei", "öğretmen"], ["生まれる", "umareru", "doğmak"]],
  source:   "文化庁 常用漢字表 / jitenon",
  qaStatus: "reviewed",
};
/* 付表/kelime okumaları — hiçbir kümede veya irregularWords'te bulunmamalı */
const FUHYO_FORBIDDEN = ["やよい", "しばふ"];

const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function checkSei(chars) {
  let pass = 0, fail = 0; const failures = [];
  const ok = (name, cond) => { if (cond) pass++; else { fail++; failures.push(name); } };

  const k = chars.sei;
  ok("sei: kayıt + readings dörtlüsü mevcut",
     !!(k && k.readings && k.readings.officialOn && k.readings.officialKun && k.readings.taughtOn && k.readings.taughtKun));
  if (k && k.readings) {
    const r = k.readings;
    ok("sei: officialOn (değer+sıra)", eq(r.officialOn, EXPECT.officialOn));
    ok("sei: officialKun (değer+sıra)", eq(r.officialKun, EXPECT.officialKun));
    ok("sei: taughtOn", eq(r.taughtOn, EXPECT.taughtOn));
    ok("sei: taughtKun", eq(r.taughtKun, EXPECT.taughtKun));
    ok("sei: onyomi yüzeyi", k.onyomi === EXPECT.onyomi);
    ok("sei: kunyomi yüzeyi", k.kunyomi === EXPECT.kunyomi);
    ok("sei: deferred (9, tam eşleşme, sıra dahil)", eq(r.deferred, EXPECT.deferred));
    ok("sei: examples", eq(k.examples, EXPECT.examples));
    ok("sei: source", r.source === EXPECT.source);
    ok("sei: qaStatus", r.qaStatus === EXPECT.qaStatus);
    // §5.8 — irregularWords eklenmemeli
    ok("sei: irregularWords YOK (付表 sızmadı)", !("irregularWords" in r));
    // 付表 kelime okumaları hiçbir kümeye/deferred'a sızmamalı
    const allSetReadings = [...r.officialOn, ...r.officialKun, ...r.taughtOn, ...r.taughtKun,
                            ...(r.deferred || []).map(d => d.reading)];
    for (const w of FUHYO_FORBIDDEN)
      ok(`sei: 付表 '${w}' hiçbir okuma kümesinde/deferred'da yok`, !allSetReadings.includes(w));
  }
  return { pass, fail, failures };
}

if (require.main === module) {
  const fs = require("fs"), path = require("path");
  const src = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const chars = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]).chars;
  const { pass, fail, failures } = checkSei(chars);
  for (const f of failures) console.log("FAIL:", f);
  console.log(`smoke_official_readings_sei: ${pass}/${pass + fail}`);
  process.exit(fail ? 1 : 0);
}

module.exports = { checkSei, EXPECT };
