/* DECISION-004 · Resmî Okuma Tamamlama — 後/ato REGRESYON KAPISI
   Sözleşme: _AGENT_EXCHANGE/codex/specs/2026-08-08-READINGS-OFFICIAL-ATO-BATCH.md

   §1'de KİLİTLENEN beklentileri BAĞIMSIZ SABİT olarak taşır (totoloji değildir). Doğrudan
   index.html DATA.chars okunur. checkAto(chars) saf fonksiyondur; enjeksiyon harness'ı onu bellek
   içi klon üzerinde çağırır (ürün dosyasına yazmadan). */

const REASON = "Resmî 常用 okuması; N5 başlangıç yüzeyinde bu tur öğretilmiyor";
const D = (reading, kind) => ({ reading, kind, reason: REASON, recommend: "defer" });

const EXPECT = {
  officialOn:  ["ゴ", "コウ"],
  officialKun: ["のち", "うし(ろ)", "あと", "おく(れる)"],
  taughtOn:    ["ゴ"],
  taughtKun:   ["あと", "うし(ろ)"],
  onyomi:      "ゴ",
  kunyomi:     "あと・うし(ろ)",
  deferred:    [ D("コウ", "on"), D("のち", "kun"), D("おく(れる)", "kun") ],
  examples:    [["後ろ", "ushiro", "arka"], ["午後", "gogo", "öğleden sonra"]],
  source:      "文化庁 常用漢字表 / jitenon",
  qaStatus:    "reviewed",
};

const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function checkAto(chars) {
  let pass = 0, fail = 0; const failures = [];
  const ok = (name, cond) => { if (cond) pass++; else { fail++; failures.push(name); } };

  const k = chars.ato;
  ok("ato: kayıt + readings dörtlüsü mevcut",
     !!(k && k.readings && k.readings.officialOn && k.readings.officialKun && k.readings.taughtOn && k.readings.taughtKun));
  if (k && k.readings) {
    const r = k.readings;
    ok("ato: officialOn (değer+sıra)", eq(r.officialOn, EXPECT.officialOn));
    ok("ato: officialKun (değer+sıra)", eq(r.officialKun, EXPECT.officialKun));
    ok("ato: taughtOn", eq(r.taughtOn, EXPECT.taughtOn));
    ok("ato: taughtKun", eq(r.taughtKun, EXPECT.taughtKun));
    ok("ato: onyomi yüzeyi", k.onyomi === EXPECT.onyomi);
    ok("ato: kunyomi yüzeyi", k.kunyomi === EXPECT.kunyomi);
    ok("ato: deferred (tam eşleşme, sıra dahil)", eq(r.deferred, EXPECT.deferred));
    ok("ato: examples", eq(k.examples, EXPECT.examples));
    ok("ato: source", r.source === EXPECT.source);
    ok("ato: qaStatus", r.qaStatus === EXPECT.qaStatus);
  }
  return { pass, fail, failures };
}

if (require.main === module) {
  const fs = require("fs"), path = require("path");
  const src = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const chars = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]).chars;
  const { pass, fail, failures } = checkAto(chars);
  for (const f of failures) console.log("FAIL:", f);
  console.log(`smoke_official_readings_ato: ${pass}/${pass + fail}`);
  process.exit(fail ? 1 : 0);
}

module.exports = { checkAto, EXPECT };
