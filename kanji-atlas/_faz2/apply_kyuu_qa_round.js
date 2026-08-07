/* apply_kyuu_qa_round — UYGULAMA ARACI, TEST DEĞİLDİR.
   (Eski ad: qa_kyuu_round.js. "qa_" öneki bunu bir kontrol sanmaya yol açıyordu; oysa
   fs.writeFileSync ile index.html üzerindeki 九 authoring verisine YAZAR. Yayın kapısı
   beyaz listelerinde YER ALMAZ. Batch D'de yeniden adlandırıldı; davranış DEĞİŞMEDİ.) */
/* 九 · AYRI QA TURU (yazan ≠ onaylayan) — 2026-07-25.
   Metni Zeynep yazdı; QA bağımsız bir tur olarak yürütüldü (Kanjipedia, EN+JA Wiktionary,
   okjiten, 説文解字, 白川 eleştiri kaynağı yeniden getirildi).
   SONUÇ: qaStatus reviewed'a YÜKSELTİLMEDİ. İki bulgu var, karar Zeynep'te.
   Bu betik yalnızca disagreementNote'u zenginleştirir; summaryTr ve qaStatus'a DOKUNMAZ.
   Kayıt drafted kaldığı için köken kullanıcıya görünmemeye devam eder. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === "九");
const rec = DATA.chars[id];
if (rec.etymology.qaStatus !== "drafted") throw new Error("beklenen drafted, gelen: " + rec.etymology.qaStatus);

const QA = ' || ===== QA TURU (2026-07-25, bağımsız kaynak doğrulaması) ===== '
  + 'BULGU 1 — "sesi nedeniyle" ifadesi Kanjipedia\'da YOK. Kanjipedia yalnızca 「借りて」 (ödünç alınarak) der, '
  + '音/ses sözcüğünü hiç geçirmez. Ses ödünçlemesini açıkça yazan kaynaklar: ja.wiktionary 「…を表す字を仮借して数詞{九}に用いたもの」 '
  + 've 白川 (仮借の用法). 仮借 tanımı gereği ses ödünçlemesidir, yani teknik olarak savunulabilir — ama esas referanstan '
  + 'DOĞRUDAN okunmuyor, çıkarımdır. TUTARLILIK NOTU: 四 六 七 八 kayıtlarında da aynı çeviri tercihi yapıldı '
  + '("sesi uygun düştüğü için", "sesi için ödünç"). Yani bu bir ev üslubudur; 九 için reddedilirse diğer dördü de gözden geçirilmelidir. '
  + '|| BULGU 2 (AĞIR) — "dirsekten bükülmüş kol" okumasının rakibi sanılandan güçlü. okjiten bağımsız bir yorum DEĞİL, '
  + '説文解字\'ı tekrarlıyor: 「九，陽之變也。象其屈曲究盡之形。」 (= bükülüp sona eren biçim; ödünçleme YOK, sayı doğrudan şekilden çıkıyor). '
  + 'Ayrıca 白川静 şekli "kıvrılmış ejderha" okur. Yani tablo şudur: [dirsek/bükülü kol] Kanjipedia(角川新字源) + EN Wiktionary(Sears) + ja.wiktionary '
  + '· [bükülüp tükenme, ödünçlemesiz] 説文解字 → okjiten · [ejderha + ses ödünçlemesi] 白川. '
  + 'EN Wiktionary\'nin tek dayanağı Richard Sears\'tır (hakemli değil) ve sayı anlamını ses değil ANLAM metaforuyla açıklar. '
  + '|| DEĞERLENDİRME (alt iddia bazında): (a) "şekil dokuz nesneyi göstermez" → A, tüm kaynaklar uyumlu. '
  + '(b) "sayı anlamı sonradan, ödünç alınarak" → B; Kanjipedia + ja.wiktionary + 白川 hemfikir, 説文/okjiten değil. '
  + '(c) "dirsekten bükülmüş kol" → C; ciddi görüş ayrılığı, hakemli kaynak yok. '
  + 'Kayıt tek blok olduğu için en zayıf halka belirler → bütün olarak C\'ye yakın, B iyimser kalır. '
  + '|| KARAR: reviewed VERİLMEDİ. Politika C sınıfı için "kesin sunma (ihtiyatlı/pending)" der; ayrıca kilitli kural gereği '
  + 'kullanıcı metnine tartışma dili GİREMEZ ("düz yaz ya da boş bırak"). Bu ikisi birleşince seçenek üçe iner: '
  + '(1) metni olduğu gibi B ile aç ve ayrılığı yalnız bu notta tut; (2) şekil iddiasını metinden çıkarıp yalnız A/B seviyesindeki '
  + 'kısmı yaz ("Sayı anlamı sonradan, ödünç alınarak kazanılmıştır; şekil dokuz nesneyi göstermez."); (3) drafted\'da bırak. '
  + 'Karar Zeynep\'e ait — Claude tek başına yükseltmez.';

const oldSub = JSON.stringify(rec);
const next = Object.assign({}, rec, {
  etymology: Object.assign({}, rec.etymology, { disagreementNote: rec.etymology.disagreementNote + QA })
});
if (next.etymology.qaStatus !== "drafted") throw new Error("qaStatus değişmemeli");
if (next.etymology.summaryTr !== rec.etymology.summaryTr) throw new Error("summaryTr değişmemeli");
if (next.etymology.reviewedAt) throw new Error("reviewedAt verilmemeli");
src = src.replace(oldSub, JSON.stringify(next));
fs.writeFileSync(INDEX, src);
console.log("九 QA turu kaydedildi. qaStatus: " + next.etymology.qaStatus + " (değişmedi) · köken hâlâ GİZLİ.");
console.log("disagreementNote uzunluğu: " + next.etymology.disagreementNote.length + " karakter.");
