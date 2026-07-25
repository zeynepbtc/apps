/* AUTHORING Parti 4 · 四 五 六 七 八 九 — sayı kanjileri, boş köken (DRAFTED, GİZLİ).
   Yöntem: her sayı AYRI kaynak beyanıyla. "Sayılar basittir" varsayımı YOK.
   Çoğu sayı niceliği RESMETMEZ → ödünç işaret (仮借). 東 (torba→doğu) reviewed modeli izlenir.
   八/九: popüler görsel hikâyeler (iki parmak vb.) kaynakta açıkça yoksa kullanıcı metnine KONMAZ → disagreementNote.
   Sadece etymology eklenir (qaStatus:drafted). mnemonic kararı reviewed turunda. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const byChar = {}; for (const id in DATA.chars) byChar[DATA.chars[id].character] = id;

// Her kayıt: formationType (grafiğin türü — ödünçleme metinde anlatılır), confidence A/B, summaryTr (çıplak bilgi), sources, disagreementNote (audit).
const DRAFT = {
  "四": {
    ft: "象形", fts: "Dong Chinese", conf: "B",
    sum: "Aslen burundan soluk alışı gösteren bir resimdir. Bu şekil, sesi uygun düştüğü için sonradan “dört” sayısı anlamında ödünç alınmıştır; şekil dörtlüğü göstermez.",
    src: ["https://www.dong-chinese.com/wiki/%E5%9B%9B", "https://en.wiktionary.org/wiki/%E5%9B%9B"],
    dis: "Eski “dört” yazımı dört yatay çizgiydi (亖). 四'nün “soluk/burun” resmi (呬'nin kökeni) olduğu standart görüştür ama yorum kısmıdır; ödünçlemenin kendisi tartışmasız. Kanjipedia doğrudan getirilemedi → Dong Chinese + Wiktionary."
  },
  "五": {
    ft: "指事", fts: "Kanjipedia", conf: "B",
    sum: "Ortada çaprazlanan çizgilerden oluşan soyut bir işarettir; “iç içe geçme” fikrini verir. Bu işaret “beş” sayısı için kullanılmıştır; beş nesneyi resmetmez.",
    src: ["https://www.kanjipedia.jp/kanji/0002081300", "https://en.wiktionary.org/wiki/%E4%BA%94"],
    dis: "Kanjipedia: 指事 (iki çizginin kesişmesi). İşaretin tam olarak neyi anlattığı (kesişme / el sayımı / birleşmiş çizgiler) kaynaklarda değişir. “Beş” sözcüğü eski ve yerlidir; soyut işaret sayı için kullanılır."
  },
  "六": {
    ft: "象形", fts: "okjiten", conf: "B",
    sum: "Aslen basit bir kulübenin resmidir. Benzer sesli olduğu için “altı” sayısına verilmiştir; şekil altılığı göstermez.",
    src: ["https://okjiten.jp/kanji128.html", "https://en.wiktionary.org/wiki/%E5%85%AD"],
    dis: "Kulübe/barınak okuması yaygın ama kaynaklarda çekinceli (“belki”; Wiktionary 廬 ile ses bağı). Alternatif: eski bir sayma işareti. okjiten: ev resmi → sayı. Kanjipedia doğrudan getirilemedi."
  },
  "七": {
    ft: "指事", fts: "Dong Chinese", conf: "A",
    sum: "Bir çizgiyi yatay bir çizginin kestiği, “kesmek” anlamı taşıyan bir işarettir; bugünkü 切 (kesmek) karakterinin kökenidir. Sesi için “yedi” sayısına ödünç verilmiş, asıl anlamı 切'ye devredilmiştir.",
    src: ["https://www.dong-chinese.com/wiki/%E4%B8%83", "https://en.wiktionary.org/wiki/%E4%B8%83"],
    dis: "“Kesmek” → 切 ilişkisi ve “yedi” için ödünçleme yerleşik görüş (Dong Chinese, kehanet-kemiği biçimi). Kanjipedia doğrudan getirilemedi."
  },
  "八": {
    ft: "指事", fts: "Wiktionary; Dong Chinese", conf: "A",
    sum: "Birbirinden uzaklaşan iki çizgiyle “ayırmak, bölmek” fikrini veren soyut bir işarettir. Sesi için “sekiz” sayısına ödünç verilmiş; “ayırma” anlamı bugün 別 ile yazılır. Sekiz nesneyi resmetmez.",
    src: ["https://en.wiktionary.org/wiki/%E5%85%AB", "https://www.dong-chinese.com/wiki/%E5%85%AB"],
    dis: "Kaynaklar birleşik: soyut “bölme/ayrılma” işareti (Shuowen: 別也), sayı için ödünç. Popüler “iki parmak/el” görseli etimoloji DEĞİL, hatırlatıcıdır — kullanıcı metnine konmadı (Zeynep talimatı)."
  },
  "九": {
    ft: "象形", fts: "Wiktionary / okjiten", conf: "B",
    sum: "Kökeni kesin değildir; en çok verilen okuma, bileği bükülü bir kol/el resmi (aslen “dirsek”, bugün 肘) olduğudur. Her durumda “dokuz” sayısı sonradan ödünç alınmıştır; şekil dokuzluğu göstermez.",
    src: ["https://en.wiktionary.org/wiki/%E4%B9%9D", "https://okjiten.jp/kanji131.html"],
    dis: "Referans tartışmalı: bükülü kol/dirsek (Sears/Wiktionary) ↔ “bükülüp tükenme” soyut biçimi (okjiten). İkisi de 象形, sayıyı sonradan alır. Tek “el/dirsek” hikâyesi güvenilir ama uzlaşı DEĞİL → Zeynep kararı: (a) düz yaz, (b) çekinceli bırak, (c) 九'u boş bırak."
  },
};

const report = [];
for (const ch of Object.keys(DRAFT)) {
  const id = byChar[ch];
  if (!id) throw new Error("id yok: " + ch);
  const rec = DATA.chars[id];
  if (rec.etymology) throw new Error("zaten etymology var: " + ch);
  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error("kaynakta bulunamadı: " + ch);
  const d = DRAFT[ch];
  const ety = {
    formationType: d.ft, formationTypeSource: d.fts, confidence: d.conf,
    summaryTr: d.sum, sources: d.src, disagreementNote: d.dis, qaStatus: "drafted"
  };
  src = src.replace(oldSub, JSON.stringify(Object.assign({}, rec, { etymology: ety })));
  report.push({ ch, id, ft: d.ft, conf: d.conf, sum: d.sum });
}
fs.writeFileSync(INDEX, src);
console.log("Parti 4 DRAFTED (6 · 四五六七八九). qaStatus=drafted → köken GİZLİ (reviewed'a kadar render edilmez).\n");
for (const r of report) console.log(`${r.ch} (${r.id}) [${r.ft} · conf ${r.conf}]\n   ${r.sum}\n`);
