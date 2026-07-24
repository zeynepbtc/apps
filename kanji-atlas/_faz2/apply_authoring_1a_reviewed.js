/* AUTHORING Parti 1A · REVIEWED geçişi (2. tur onayı sonrası).
   Sadeleştirilmiş summaryTr (çıplak bilgi) + qaStatus=reviewed (köken GÖRÜNÜR) + mnemonic.status=not_required. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);

const REV = {
  toki:   "Solundaki 日 güneş/gün anlamı verir. Sağdaki 寺 ise anlamıyla değil, okunuşuyla katkı yapar ve ジ sesini verir.",
  hareru: "日 güneş anlamı verir. 青 ise anlamıyla değil, okunuşuyla katkı yapar ve セイ sesini verir.",
  hanasu: "言 konuşma anlamı verir. Sağdaki parça ise anlamıyla değil, okunuşuyla katkı yapar. Bugünkü yazımda 舌'e benzese de burada \"dil\" anlamı yoktur.",
  kiku:   "耳 kulak anlamı verir. 門 ise anlamıyla değil, okunuşuyla katkı yapar ve ブン sesini verir.",
};

for (const id of Object.keys(REV)) {
  const rec = DATA.chars[id];
  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error("bulunamadı: " + id);
  const ety = Object.assign({}, rec.etymology, { summaryTr: REV[id], qaStatus: "reviewed" });
  const mutated = Object.assign({}, rec, { etymology: ety, mnemonic: { status: "not_required" } });
  src = src.replace(oldSub, JSON.stringify(mutated));
}
fs.writeFileSync(INDEX, src);
console.log("Parti 1A REVIEWED (4 kayıt). köken artık GÖRÜNÜR; mnemonic not_required.");
