/* AUTHORING Parti 1A · 時 晴 話 聞 — DRAFTED köken (qaStatus:drafted → henüz GİZLİ; reviewed 2. tur onayında).
   Yalnız etymology.summaryTr/sources/disagreementNote + qaStatus=drafted eklenir. mnemonic DOKUNULMAZ (öneri: not_required, reviewed'da uygulanacak). */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);

const DRAFT = {
  toki: {
    sum: "Solundaki 日 \"güneş/gün\" demektir; günlerin akışı, yani zaman fikrini buraya o taşır. Sağdaki 寺 ise anlamıyla değil, okunuşuyla katkı yapar → ジ sesini verir.",
    src: ["https://www.kanjipedia.jp/kanji/0002876900"], dis: null,
  },
  hareru: {
    sum: "日 (güneş) ile 青'nin birleşimidir. Anlamı 日 verir: güneşin çıktığı, açık gökyüzü. 青 ise anlamıyla değil, okunuşuyla katkı yapar → セイ sesi.",
    src: ["https://www.kanjipedia.jp/kanji/0003900400"],
    dis: "Kanjipedia 青'yi salt fonetik (音符) verir; bazı literatürde 会意形声 / 'açık-mavi yankısı' okuması geçer ama birincil kaynak desteklemez — kullanıcı metnine yansıtılmadı.",
  },
  hanasu: {
    sum: "Söz/konuşma anlamı veren 言 ile sağdaki parçadan oluşur. Anlamı 言 taşır; sağ parça ise anlamıyla değil, okunuşuyla katkı yapar. Bugünkü yazımda 舌'e benzese de burada \"dil\" anlamı yoktur.",
    src: ["https://www.kanjipedia.jp/kanji/0007407700"],
    dis: "Modern yazımda sağ parça 舌'e benzer; Kanjipedia (舌は変わった形) ve Wiktionary bunu tarihsel fonetik 𠯑'in değişmiş biçimi sayar, 'dil' anlamı taşımaz.",
  },
  kiku: {
    sum: "耳 kulak anlamı verir: duymak, işitmek. 門 ise anlamıyla değil, okunuşuyla katkı yapar → ブン sesi. İkisi birleşince \"kulakla işitmek\" fikrini taşır.",
    src: ["https://www.kanjipedia.jp/kanji/0006190200"],
    dis: "okjiten 聞'ü 会意兼形声 sayıp 門'e yardımcı anlam yükler; Kanjipedia (birincil) salt fonetik (音符) kabul eder — bu izlendi.",
  },
};

const report = [];
for (const id of Object.keys(DRAFT)) {
  const rec = DATA.chars[id];
  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error("bulunamadı: " + id);
  const d = DRAFT[id];
  const ety = Object.assign({}, rec.etymology, {
    summaryTr: d.sum,
    sources: d.src,
    disagreementNote: d.dis,
    qaStatus: "drafted",   // henüz reviewed DEĞİL → kokenOf gizler
  });
  const mutated = Object.assign({}, rec, { etymology: ety });
  src = src.replace(oldSub, JSON.stringify(mutated));
  report.push({ char: rec.character, id, ft: ety.formationType, conf: ety.confidence, sum: d.sum, dis: d.dis });
}
fs.writeFileSync(INDEX, src);
console.log("Parti 1A drafted (4 kayıt). qaStatus=drafted → köken GİZLİ (reviewed onayı bekliyor).\n");
for (const r of report) {
  console.log(`${r.char} (${r.id}) · ${r.ft} · confidence ${r.conf}`);
  console.log(`   summaryTr: ${r.sum}`);
  console.log(`   disagreement: ${r.dis || "yok"}\n`);
}
