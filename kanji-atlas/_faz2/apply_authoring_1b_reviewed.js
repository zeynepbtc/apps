/* AUTHORING Parti 1B · REVIEWED geçişi (2. tur onayı). summaryTr (revize) + qaStatus=reviewed + mnemonic not_required. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);

const REV = {
  gengo:  "言 söz ve konuşma anlamı verir. 吾 ise anlamıyla değil, okunuşuyla katkı yapar ve ゴ sesini verir.",
  gakkou: "木 ahşap nesne anlamı verir. 交 ise anlamıyla değil, okunuşuyla katkı yapar ve コウ sesini verir. Karakterin bugünkü \"okul\" anlamı sonradan ödünç alınmıştır.",
  yomu:   "言 söz ve yazılı dil anlamı verir. Eski biçimdeki sağ parça ise anlamıyla değil, okunuşuyla katkı yapar ve ドク sesini verir. Bugünkü 売 biçimi \"satmak\" anlamı taşımaz.",
  nani:   "亻 insan anlamı verir. 可 ise anlamıyla değil, okunuşuyla katkı yapar ve カ sesini verir. Karakter önce \"yük taşımak\" anlamındaydı; bugünkü \"ne?\" anlamı sonradan ödünç alınmıştır.",
};

for (const id of Object.keys(REV)) {
  const rec = DATA.chars[id];
  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error("bulunamadı: " + id);
  const ety = Object.assign({}, rec.etymology, { summaryTr: REV[id], qaStatus: "reviewed" });
  src = src.replace(oldSub, JSON.stringify(Object.assign({}, rec, { etymology: ety, mnemonic: { status: "not_required" } })));
}
fs.writeFileSync(INDEX, src);
console.log("Parti 1B REVIEWED (4). köken GÖRÜNÜR; mnemonic not_required.");
