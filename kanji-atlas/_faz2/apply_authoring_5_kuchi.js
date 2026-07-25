/* AUTHORING Parti 5 · 口 — TEK KAYIT, boş köken doldurulur (DRAFTED, KULLANICIYA GİZLİ).
   Zeynep kararı (2026-07-25): "Parti 5'i tek kayıt 口 olarak açalım. 目・耳・手・足 zaten kapandı;
   気'yi 'vücut+yüz' grubuna zorla eklemeyelim. 口 temel ve yüksek etkili bir kayıt, ayrıca yeni
   ritmi düşük riskle yeniden başlatır."

   Yöntem (değişmedi): esas Japon sözlük referansı → drafted → ayrı QA raporu → DUR.
   Bu betik qaStatus:"drafted" yazar, reviewedAt VERMEZ. kokenOf() drafted'ı null döndürür,
   yani kayıt kullanıcıya AÇILMAZ. reviewed onayı ayrıca Zeynep'ten gelir.

   Sadece etymology alanı eklenir. mnemonic (status:"not_required"), pictogram_note,
   memory_hint_tr, components, related_characters — HİÇBİRİNE DOKUNULMAZ.
   Üç katman ayrımı korunur: Kökeni = etymology.summaryTr (kaynağın söylediği, çıplak).
   "Açık ağız / kare çerçeve" gibi görsel yorum zaten Hafıza katmanındadır (memory_hint_tr) —
   summaryTr'ye taşınmaz (politika: "Kaynak ne diyor ≠ benim çıkarımım"). */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === "口");
if (!id) throw new Error("口 bulunamadı");
const rec = DATA.chars[id];
if (rec.etymology) throw new Error("口 zaten etymology taşıyor — bu betik yalnız boş kayda yazar");

/* Esas Japon sözlük referansı — Kanjipedia karakter sayfası 0002117900:
   「象形。くちの形にかたどり、『くち』の意を表す。」
   Çapraz okuma (yalnız denetim izi, sources[] listesine EKLENMEZ — beyan edilen dört kaynak
   dışında bir şey künyeye girmez): 説文解字「口、人所以言食也。象形。」(漢典 üzerinden okundu).
   İki referans aynı şeyi söylüyor: ağzın resmi, 象形. Alt iddia yok, ihtilaf yok → confidence A. */
const ETY = {
  formationType: "象形",
  formationTypeSource: "Kanjipedia",
  confidence: "A",
  summaryTr: "Bir ağzın resmidir.",
  sources: ["https://www.kanjipedia.jp/kanji/0002117900"],
  disagreementNote:
    "İHTİLAF YOK — bu alan burada uyuşmayı ve ileriye dönük bir editör uyarısını kaydeder. "
    + "|| KAYNAK MUTABAKATI: Kanjipedia karakter sayfası (0002117900) 象形 diyor: "
    + "「くちの形にかたどり、『くち』の意を表す」. Çapraz okuma olarak 説文解字 de aynı: "
    + "「口、人所以言食也。象形」(漢典 üzerinden). Tek bir iddia var (ağzın resmi), alt iddiaya "
    + "bölünmüyor, hiçbir kaynak farklı bir referans önermiyor → confidence A. 九'daki gibi "
    + "'en zayıf halka' durumu yok. "
    + "|| summaryTr bilinçli olarak çıplak: kaynak yalnız 'ağzın şekli' diyor, 'AÇIK ağız' veya "
    + "'kare çerçeve' demiyor. Bu görsel okuma zaten Hafıza katmanında duruyor "
    + "(memory_hint_tr: 'Açık bir ağzı andıran kare.') ve orada kalmalı. "
    + "|| İLERİYE DÖNÜK UYARI (口 bileşen olarak): 口 sonraki birçok kanjide bileşendir. "
    + "Bu kayıt yalnız TEK BAŞINA 口 karakteri hakkındadır. Bileşik kanjilerdeki 口 biçimli "
    + "parçanın 'ağız' olduğu OTOMATİK varsayılmamalıdır: Shirakawa Shizuka (白川静) ekolü, "
    + "kehanet kemiği/bronz yazıtlarda bu parçanın çoğu yerde ağız değil, tanrıya sunulan duayı "
    + "koyan kap ('サイ') olduğunu savunur; 名 告 右 可 gibi karakterler bu tartışmanın içindedir. "
    + "Shirakawa'nın kendisi de サイ'nin 'ağız' anlamında kullanıldığı açık bir örnek bulunmadığını "
    + "söyler — yani bu görüş TEK BAŞINA 口 kaydına itiraz DEĞİLDİR, bu yüzden confidence A "
    + "düşürülmedi. Uyarı, bileşen açıklaması yazılacak kanjiler için geçerlidir: orada 'ağız' "
    + "demeden önce kaynağa ayrıca bakılmalı.",
  qaStatus: "drafted"
};

const oldSub = JSON.stringify(rec);
if (!src.includes(oldSub)) throw new Error("kayıt kaynakta bire bir bulunamadı");
const next = Object.assign({}, rec, { etymology: ETY });

/* Sert güvenceler — drafted kapısı ve dokunulmazlar */
if (next.etymology.qaStatus !== "drafted") throw new Error("qaStatus drafted olmalı");
if (next.etymology.reviewedAt) throw new Error("reviewedAt VERİLMEZ (onay ayrı gelir)");
if (next.mnemonic.status !== rec.mnemonic.status) throw new Error("mnemonic değişmemeli");
if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error("memory_hint_tr değişmemeli");
if (next.pictogram_note !== rec.pictogram_note) throw new Error("pictogram_note değişmemeli");
if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error("components değişmemeli");
if (next.etymology.sources.length !== 1) throw new Error("tek kaynak künyesi bekleniyor");
if (!/kanjipedia\.jp\/kanji\/\d{10}$/.test(next.etymology.sources[0])) throw new Error("kaynak URL biçimi hatalı");

src = src.replace(oldSub, JSON.stringify(next));
fs.writeFileSync(INDEX, src);
console.log("口 (" + id + ") → etymology YAZILDI · 象形 · confidence A · qaStatus=drafted (KULLANICIYA KAPALI) · reviewedAt YOK");
console.log("summaryTr (" + ETY.summaryTr.length + " kr): " + ETY.summaryTr);
console.log("disagreementNote: " + ETY.disagreementNote.length + " karakter");
