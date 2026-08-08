/* DECISION-004 · Resmî Okuma Tamamlama — Küçük Grup 1 (大・四・九・足) REGRESYON KAPISI
   Sözleşme: _AGENT_EXCHANGE/codex/specs/2026-08-08-READINGS-OFFICIAL-SMALL-BATCH-DAI-YON-KYUU-ASHI.md

   Bu kapı, §1'de KİLİTLENEN beklentileri BAĞIMSIZ SABİT olarak taşır (totoloji değildir):
   üretim verisini kendi kopyasına değil, sözleşmedeki sabit değerlere karşı doğrular.
   Doğrudan index.html DATA.chars okunur. checkSmallBatch(chars) saf fonksiyondur; enjeksiyon
   harness'ı onu bellek içi klon üzerinde çağırır (ürün dosyasına yazmadan).

   §5: (1) kapalı id kümesi {dai,yon,kyuu,ashi}; (2) officialKun değer+sıra; (3) taughtOn/taughtKun
   + yüzey onyomi/kunyomi; (4) yeni deferred reading/kind/reason/recommend; (5) ashi た(りる) korunur;
   (6) örnekler; (7) officialOn — hepsi §1 sabitine birebir. */

const REASON_NEW = "Resmî 常用 okuması; N5 başlangıç yüzeyinde bu tur öğretilmiyor";
const D = (reading) => ({ reading, kind: "kun", reason: REASON_NEW, recommend: "defer" });
const ASHI_TARIRU = { reading: "た(りる)", kind: "kun",
  reason: "N4; farklı anlam kümesi (yetmek); örnek 足りる authoring incelemesine", recommend: "defer" };

/* §1.1 + §1.2 + başlangıç sabitleri (officialOn, examples) — BAĞIMSIZ beklenti */
const EXPECT = {
  dai: {
    officialOn: ["ダイ", "タイ"], officialKun: ["おお", "おお(きい)", "おお(いに)"],
    taughtOn: ["ダイ", "タイ"], taughtKun: ["おお(きい)"], onyomi: "ダイ・タイ", kunyomi: "おお(きい)",
    deferred: [D("おお"), D("おお(いに)")],
    examples: [["大きい", "ookii", "büyük"], ["大学", "daigaku", "üniversite"], ["大人", "otona", "yetişkin"]],
  },
  yon: {
    officialOn: ["シ"], officialKun: ["よ", "よ(つ)", "よっ(つ)", "よん"],
    taughtOn: ["シ"], taughtKun: ["よん", "よ(つ)"], onyomi: "シ", kunyomi: "よん・よ(つ)",
    deferred: [D("よ"), D("よっ(つ)")],
    examples: [["四月", "shigatsu", "Nisan"], ["四つ", "yottsu", "dört adet"], ["四時", "yoji", "saat dört"]],
  },
  kyuu: {
    officialOn: ["キュウ", "ク"], officialKun: ["ここの", "ここの(つ)"],
    taughtOn: ["キュウ", "ク"], taughtKun: ["ここの(つ)"], onyomi: "キュウ・ク", kunyomi: "ここの(つ)",
    deferred: [D("ここの")],
    examples: [["九月", "kugatsu", "Eylül"], ["九つ", "kokonotsu", "dokuz adet"], ["九時", "kuji", "saat dokuz"]],
  },
  ashi: {
    officialOn: ["ソク"], officialKun: ["あし", "た(りる)", "た(る)", "た(す)"],
    taughtOn: ["ソク"], taughtKun: ["あし"], onyomi: "ソク", kunyomi: "あし",
    deferred: [ASHI_TARIRU, D("た(る)"), D("た(す)")],
    examples: [["足", "ashi", "ayak, bacak"], ["足りる", "tariru", "yetmek"]],
  },
};

const IDS = ["dai", "yon", "kyuu", "ashi"];
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function checkSmallBatch(chars) {
  let pass = 0, fail = 0; const failures = [];
  const ok = (name, cond) => { if (cond) pass++; else { fail++; failures.push(name); } };

  // (1) kapalı id kümesi tam olmalı
  for (const id of IDS) ok(`${id}: kayıt mevcut`, !!(chars[id] && chars[id].readings));

  for (const id of IDS) {
    const k = chars[id]; if (!k || !k.readings) continue;
    const r = k.readings, e = EXPECT[id];
    // (7) officialOn sabit
    ok(`${id}: officialOn`, eq(r.officialOn, e.officialOn));
    // (2) officialKun değer + sıra
    ok(`${id}: officialKun (değer+sıra)`, eq(r.officialKun, e.officialKun));
    // (3) taughtOn/taughtKun + yüzey
    ok(`${id}: taughtOn`, eq(r.taughtOn, e.taughtOn));
    ok(`${id}: taughtKun`, eq(r.taughtKun, e.taughtKun));
    ok(`${id}: onyomi yüzeyi`, k.onyomi === e.onyomi);
    ok(`${id}: kunyomi yüzeyi`, k.kunyomi === e.kunyomi);
    // (4)+(5) deferred tam eşleşme (reading/kind/reason/recommend + sıra; ashi た(りる) korunur)
    ok(`${id}: deferred (tam eşleşme)`, eq(r.deferred, e.deferred));
    // (6) örnekler sabit
    ok(`${id}: examples`, eq(k.examples, e.examples));
  }
  return { pass, fail, failures };
}

if (require.main === module) {
  const fs = require("fs"), path = require("path");
  const src = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const chars = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]).chars;
  const { pass, fail, failures } = checkSmallBatch(chars);
  for (const f of failures) console.log("FAIL:", f);
  console.log(`smoke_official_readings_small_batch: ${pass}/${pass + fail}`);
  process.exit(fail ? 1 : 0);
}

module.exports = { checkSmallBatch, EXPECT };
