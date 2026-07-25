/* AUTHORING Parti 4 · REVIEWED turu — Zeynep kararları (2026-07-25).
   四 五 六 七 八 → reviewed (görünür).  九 → pending + BOŞ (görünmez, araştırma saklanır).
   Kaynak politikası (yeni, Zeynep): reviewed statüsü için her karakterde en az bir
   birincil Japon sözlüğü referansı (Kanjipedia ID) bulunur. Kullanıcıya gösterilmez,
   sadece editör metadata'sı — amaç kalite değil İZLENEBİLİRLİK.
   Bu turda 6 Kanjipedia sayfasının 成り立ち metni doğrudan getirildi → formationTypeSource
   hepsinde Kanjipedia, confidence A'ya yükseldi. 七'de taslaktaki çizgi yönü düzeltildi. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const byChar = {}; for (const id in DATA.chars) byChar[DATA.chars[id].character] = id;

const KP = {
  "四": "https://www.kanjipedia.jp/kanji/0002715400",
  "五": "https://www.kanjipedia.jp/kanji/0002081300",
  "六": "https://www.kanjipedia.jp/kanji/0007380200",
  "七": "https://www.kanjipedia.jp/kanji/0002916700",
  "八": "https://www.kanjipedia.jp/kanji/0005677700",
  "九": "https://www.kanjipedia.jp/kanji/0001360800",
};

const FINAL = {
  "四": {
    ft: "象形", fts: "Kanjipedia", conf: "A", qa: "reviewed", mnem: "not_required",
    sum: 'Aslen nefes almayı gösteren eski bir resimdir. Bu şekil, sesi uygun düştüğü için sonradan "dört" sayısı anlamında ödünç alınmıştır; şekil dörtlüğü göstermez.',
    src: [KP["四"], "https://www.dong-chinese.com/wiki/%E5%9B%9B", "https://en.wiktionary.org/wiki/%E5%9B%9B"],
    dis: "Kanjipedia 成り立ち: 象形 — açık ağızda diş/dil görünen biçim, 息つく (nefes alma) anlamı; 呬 (nefes vermek) karakterinin öz biçimi (原字). 'Dört' sayısı eskiden 亖 ile yazılırdı, 四 ödünç alındı. Dong Chinese + Wiktionary doğruluyor. Zeynep düzeltmesi: 'burundan soluk alışı' fazla spesifikti, 'nefes almayı' ile sadeleştirildi."
  },
  "五": {
    ft: "指事", fts: "Kanjipedia", conf: "A", qa: "reviewed", mnem: "not_required",
    sum: 'Ortada çaprazlanan çizgilerden oluşan soyut bir işarettir; "iç içe geçme" fikrini verir. Bu işaret "beş" sayısı için kullanılmıştır; beş nesneyi resmetmez.',
    src: [KP["五"], "https://en.wiktionary.org/wiki/%E4%BA%94"],
    dis: "Kanjipedia 成り立ち: 指事 — 二本の線が交わった形から、物事が交錯するさま; 借りて sayı 'itsutsu'. Yani bu da teknik olarak bir ödünçlemedir; metinde 'kullanılmıştır' denip 'ödünç' sözcüğü kullanılmadı — Zeynep onayladı (2026-07-25). Diğer sayılarla dil birliği istenirse ileride 'ödünç alınmıştır' eklenebilir."
  },
  "六": {
    ft: "象形", fts: "Kanjipedia", conf: "A", qa: "reviewed", mnem: "not_required",
    sum: 'Aslen basit bir kulübenin resmidir. Benzer sesli olduğu için "altı" sayısına verilmiştir; şekil altılığı göstermez.',
    src: [KP["六"], "https://okjiten.jp/kanji128.html", "https://en.wiktionary.org/wiki/%E5%85%AD"],
    dis: "Kanjipedia 成り立ち: 象形 — 屋根の形 (çatı biçimi); 借りて sayı 'mutsu'. okjiten: ev/kulübe resmi. Kullanıcı metnindeki 'kulübe' iki okumayı da kapsayacak şekilde seçildi (Zeynep 'küçük kulübe' → 'kulübe' sadeleştirmesini onayladı). Ses benzerliği bağını Wiktionary 廬 üzerinden verir; Kanjipedia yalnızca 'ödünç' der. İstenirse metin 'çatı' ile daha birebir yapılabilir."
  },
  "七": {
    ft: "指事", fts: "Kanjipedia", conf: "A", qa: "reviewed", mnem: "not_required",
    sum: 'Yatay bir çizgiyi dikey bir çizginin kestiği, "kesmek" anlamı taşıyan bir işarettir; bugünkü 切 (kesmek) karakterinin kökenidir. Sesi için "yedi" sayısına ödünç verilmiş, asıl anlamı 切\'ye devredilmiştir.',
    src: [KP["七"], "https://www.dong-chinese.com/wiki/%E4%B8%83", "https://en.wiktionary.org/wiki/%E4%B8%83"],
    dis: "Kanjipedia 成り立ち: 指事 — 横線を縦線で切断するさまにより、たちきる意; 「切」の原字; 借りて sayı 'nanatsu'. DÜZELTME: taslakta çizgi yönü ters yazılmıştı ('bir çizgiyi yatay bir çizginin kestiği'); Kanjipedia'ya göre doğrusu yatay çizgiyi DİKEY çizginin kesmesidir — reviewed turunda düzeltildi."
  },
  "八": {
    ft: "指事", fts: "Kanjipedia", conf: "A", qa: "reviewed", mnem: "not_required",
    sum: 'Birbirinden uzaklaşan iki çizgiyle "ayırmak, bölmek" fikrini veren soyut bir işarettir. Sesi için "sekiz" sayısına ödünç verilmiş; "ayırma" anlamı bugün 別 ile yazılır. Sekiz nesneyi resmetmez.',
    src: [KP["八"], "https://en.wiktionary.org/wiki/%E5%85%AB", "https://www.dong-chinese.com/wiki/%E5%85%AB"],
    dis: "Kanjipedia 成り立ち: 指事 — たがいに背き合っている二本の線で、わかれる意; 借りて sayı 'yatsu'. Shuowen: 別也. Popüler 'iki parmak/el' görseli etimoloji DEĞİL, hatırlatıcıdır — kullanıcı metnine konmadı (Zeynep talimatı)."
  },
  "九": {
    ft: "象形", fts: "Kanjipedia", conf: "B", qa: "pending", mnem: null,
    sum: "",
    src: [KP["九"], "https://en.wiktionary.org/wiki/%E4%B9%9D", "https://okjiten.jp/kanji131.html"],
    dis: "ZEYNEP KARARI (2026-07-25): şimdilik BOŞ ve pending — 'emin olmadığımız yerde kesin konuşmama' ilkesi; yanlış hikâye vermektense 'bilmiyoruz' demek yeğdir. || Karardan SONRA bulunan birincil kaynak: Kanjipedia 0001360800 成り立ち: 象形。人がひじを曲げた形にかたどる。借りて、数詞の「ここのつ」の意に用いる。 (= bükülmüş dirsek biçimi, sayı sonradan ödünç). Bu, Wiktionary/Sears 'bükülü kol/dirsek' okumasıyla örtüşür; okjiten'in 'bükülüp tükenme' soyut okuması azınlıkta kalır. || Hazır taslak metin (ONAY BEKLİYOR, yazılmadı): 'Aslen kolunu dirsekten bükmüş bir insanın resmidir. Bu şekil, sesi uygun düştüğü için sonradan \"dokuz\" sayısı anlamında ödünç alınmıştır; şekil dokuzluğu göstermez.' Zeynep onaylarsa qaStatus reviewed yapılır."
  },
};

const report = [];
for (const ch of Object.keys(FINAL)) {
  const id = byChar[ch];
  if (!id) throw new Error("id yok: " + ch);
  const rec = DATA.chars[id];
  if (!rec.etymology) throw new Error("etymology yok (önce drafted turu): " + ch);
  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error("kaynakta bulunamadı: " + ch);
  const d = FINAL[ch];
  const next = Object.assign({}, rec, {
    etymology: {
      formationType: d.ft, formationTypeSource: d.fts, confidence: d.conf,
      summaryTr: d.sum, sources: d.src, disagreementNote: d.dis, qaStatus: d.qa
    }
  });
  if (d.mnem) next.mnemonic = { status: d.mnem };
  src = src.replace(oldSub, JSON.stringify(next));
  report.push({ ch, id, qa: d.qa, ft: d.ft, conf: d.conf, sum: d.sum });
}
fs.writeFileSync(INDEX, src);
console.log("Parti 4 REVIEWED turu uygulandı.\n");
for (const r of report) {
  console.log(`${r.ch} (${r.id}) [${r.qa} · ${r.ft} · conf ${r.conf}]`);
  console.log("   " + (r.sum || "(BOŞ — kullanıcıya hiçbir şey gösterilmez)") + "\n");
}
