/* AUTHORING Parti 2 · REVIEWED. 王玉東 metni aynen; 季 dil düzeltmesi. qaStatus=reviewed + mnemonic not_required.
   confidence: 王A 玉A 季B 東B (mevcut, değişmez). */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);

// yalnız 季 metni revize; diğerleri drafted metnini korur (override yok)
const OVERRIDE = {
  ki2: "子 çocuk anlamı verir. Üstteki 禾, burada 稚'nin kısaltılmış biçimidir ve キ sesine katkı yapar. Karakter önce \"en küçük çocuk\" anlamındaydı; buradan \"genç\" ve sonra \"mevsim\" anlamı gelişti.",
};

for (const id of ["ou", "tama", "ki2", "higashi"]) {
  const rec = DATA.chars[id];
  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error("bulunamadı: " + id);
  const ety = Object.assign({}, rec.etymology, { qaStatus: "reviewed" });
  if (OVERRIDE[id]) ety.summaryTr = OVERRIDE[id];
  src = src.replace(oldSub, JSON.stringify(Object.assign({}, rec, { etymology: ety, mnemonic: { status: "not_required" } })));
}
fs.writeFileSync(INDEX, src);
console.log("Parti 2 REVIEWED (4). köken GÖRÜNÜR; mnemonic not_required. Pending köken kapandı.");
