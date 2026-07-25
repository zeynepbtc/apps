/* AUTHORING Parti 4 · EK — 九 (dokuz) DRAFTED turu. Zeynep kararı, 2026-07-25.
   Önceki durum: pending + boş ("emin olmadığımız yerde konuşma").
   Değişiklik gerekçesi: karardan sonra Kanjipedia karakter sayfası (0001360800) getirildi;
   "dirsekten bükülmüş kol" okuması Wiktionary/Sears ile örtüşüyor → tartışma sanıldığından küçük.
   Kullanıcı metnini ZEYNEP yazdı. Yine de "yazan ≠ onaylayan" ilkesi gereği bu tur DRAFTED'tır:
   köken kullanıcıya HÂLÂ GÖRÜNMEZ (kokenOf → null). reviewed + reviewedAt ayrı QA turunda verilir.
   confidence B — okjiten'in farklı okuması duruyor, A verilmedi. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === "九");
if (!id) throw new Error("九 bulunamadı");
const rec = DATA.chars[id];
if (!rec.etymology) throw new Error("etymology yok");
if (rec.etymology.qaStatus !== "pending") throw new Error("beklenen durum pending, gelen: " + rec.etymology.qaStatus);

const SUM = 'Eski biçimi, dirsekten bükülmüş bir kolu gösteren resimden gelir. Daha sonra sesi nedeniyle "dokuz" anlamında kullanılmaya başlanmıştır; şekil dokuz nesneyi göstermez.';

const DIS = 'Kanjipedia 0001360800 成り立ち: 象形。人がひじを曲げた形にかたどる。借りて、数詞の「ここのつ」の意に用いる。 '
  + '(= dirsekten bükülmüş kol biçimi; "dokuz" sayısı sonradan ödünç alınmıştır.) Wiktionary ve Sears\'ın '
  + '"bükülü kol / dirsek" okumasıyla örtüşür. '
  + '|| FARKLI OKUMA (duruyor, kullanıcı metnine KONMADI): okjiten (kanji131) şekli soyut bir "bükülüp tükenme" '
  + 'hareketi olarak yorumlar. Azınlık görüşüdür; bu ayrılık yüzünden confidence A değil B verildi. '
  + '|| TARİHÇE: 2026-07-25 taslak QA\'sında "referans tartışmalı" göründüğü için önce pending + boş bırakıldı '
  + '(Zeynep kararı: "yanlış hikâye vermektense bilmiyoruz demek yeğdir"). Aynı gün Kanjipedia karakter sayfası '
  + 'getirilince tartışmanın sanıldığından küçük olduğu görüldü; Zeynep kullanıcı metnini kendisi yazdı ve kayıt '
  + 'drafted\'a alındı. Metin Zeynep\'e aittir — bu yüzden QA turu AYRI yapılır (yazan ≠ onaylayan).';

const oldSub = JSON.stringify(rec);
if (!src.includes(oldSub)) throw new Error("kaynakta bulunamadı");
const next = Object.assign({}, rec, {
  etymology: Object.assign({}, rec.etymology, {
    formationType: "象形",
    formationTypeSource: "Kanjipedia",
    confidence: "B",
    summaryTr: SUM,
    disagreementNote: DIS,
    qaStatus: "drafted"           // reviewedAt YOK — onay verilmedi
  })
});
if (next.etymology.reviewedAt) throw new Error("drafted kayıtta reviewedAt olamaz");
src = src.replace(oldSub, JSON.stringify(next));
fs.writeFileSync(INDEX, src);
console.log("九 → drafted (象形 · Kanjipedia · conf B). Köken HÂLÂ GİZLİ.");
console.log("  " + SUM);
console.log("  sources: " + next.etymology.sources.join(" | "));
