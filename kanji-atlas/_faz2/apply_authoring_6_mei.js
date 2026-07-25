/* AUTHORING Parti 6 · 名 — TEK KAYIT, tartışmalı QA (DRAFTED, KULLANICIYA GİZLİ).
   Zeynep kararı (2026-07-25): 名・右・古・品 TOPLU açılmayacak. Biçimsel olarak 口 içermeleri
   aynı etimolojik iddiayı paylaştıkları anlamına gelmez; 白川静'in サイ yorumu tam bu varsayımı
   bozar. 名 tek kayıt, ayrı tartışmalı QA turu. İki şey AYRI tutulur:
     (a) karakter biçiminde 口 benzeri bir parça bulunması
     (b) bu parçanın etimolojik olarak gerçekten "ağız" kabul edilmesi
   Bunlar aynı şey değildir.

   B0 (ölçüldü): 名 = LEGACY kayıt (etymology yok, pictogram_note dolu, kullanıcıya görünür:
   "Karanlıkta (akşam) ağızla söylenen: isim."). Bu betik qaStatus:"drafted" yazınca kokenOf()
   null döner ve o legacy metin GERİ ÇEKİLİR. Bu yüzden drafted penceresi KISA tutulmalı —
   QA raporu hazır, onay/karar Zeynep'ten hemen istenecek.

   Yöntem (değişmedi): esas Japon sözlük referansı (Kanjipedia karakter sayfası) → drafted →
   ayrı QA raporu → DUR. Bu betik reviewedAt VERMEZ. reviewed onayı ayrıca Zeynep'ten gelir.

   Sadece etymology alanı eklenir. mnemonic (status:"not_required"), pictogram_note,
   memory_hint_tr, components, component_meanings, related_characters — HİÇBİRİNE DOKUNULMAZ.
   Üç katman ayrımı korunur: Kökeni = etymology.summaryTr (kaynağın söylediği, çıplak). */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === "名");
if (!id) throw new Error("名 bulunamadı");
const rec = DATA.chars[id];
if (rec.etymology) throw new Error("名 zaten etymology taşıyor — bu betik yalnız legacy/boş kayda yazar");

/* Esas Japon sözlük referansı — Kanjipedia karakter sayfası 0006666900:
   「会意。口と、夕（ゆうぐれ）とから成り、夕方の暗やみで、人に自分の名をなのることにより、
     『な』の意を表す。」  → 会意, 口=ağız, 夕=akşam karanlığı.
   Çapraz okuma (yalnız denetim izi, sources[]'a EKLENMEZ):
   説文解字「名、自命也。从口从夕。夕者、冥也。冥不相見、故以口自名。」(漢典 üzerinden) — Kanjipedia
   ile BİREBİR aynı okuma (akşam karanlığı + ağızla ad söyleme).
   Ayrıntılı görüş ayrılığı disagreementNote'ta. Alt iddialarda azınlık sapmaları var (Shirakawa
   口→サイ genel teorisi; OKJiten 夕→ay/şafak) → en zayıf halka B. confidence TASLAK önerisi = B,
   nihai karar QA + Zeynep. */
const ETY = {
  formationType: "会意",
  formationTypeSource: "Kanjipedia",
  confidence: "B",
  summaryTr: "口 ağız, 夕 ise akşam karanlığı anlamı verir. Karanlıkta birbirini göremeyen kişilerin adını sesle söylemesinden 'isim' anlamı gelişmiştir.",
  sources: ["https://www.kanjipedia.jp/kanji/0006666900"],
  disagreementNote:
    "TARTIŞMALI QA · TASLAK — reviewed VERİLMEDİ. Bu alan kaynak mutabakatını, azınlık "
    + "sapmalarını ve (a)/(b) ayrımını kaydeder; kullanıcıya gitmez. "
    + "|| ESAS REFERANS (Kanjipedia 0006666900): 「会意。口と、夕（ゆうぐれ）とから成り、夕方の"
    + "暗やみで、人に自分の名をなのることにより、『な』の意を表す。」 → 会意; 口=ağız, 夕=akşam "
    + "karanlığı; karanlıkta ağızla ad söyleme. "
    + "|| ÇAPRAZ (説文解字, 漢典 üzerinden): 「名、自命也。从口从夕。夕者、冥也。冥不相見、故以口自名。」 "
    + "— Kanjipedia ile BİREBİR aynı: akşam karanlığı (冥) + ağızla kendini adlandırma. Bu iki hat "
    + "geleneksel/ana akım okumadır. "
    + "|| İKİ İDDİA AYRI TUTULDU (Zeynep talimatı): "
    + "(a) 名'de 口 BİÇİMLİ bir parça var mı? → EVET, istisnasız tüm kaynaklar (Kanjipedia, 説文, "
    + "OKJiten, hatta Shirakawa) bir 口-biçimi görür. Bu alt iddia = A. "
    + "(b) O parça etimolojik olarak 'AĞIZ' mı? → Kanjipedia + 説文 + OKJiten + Shirakawa "
    + "eleştirmenleri (ör. gaus.livedoor '常用漢字論―白川漢字学説の検証' serisi) = AĞIZ. "
    + "Azınlık: Shirakawa Shizuka (白川静) ekolü 口-biçimli parçayı ritüel karakterlerde 'サイ' "
    + "(tanrıya sunulan duayı koyan kap) okur. Bu GENEL bir teoridir ve akademik olarak tartışmalıdır "
    + "(itiraz: 'söz sese dayanır, kaba konamaz'). ÖNEMLİ DÜRÜSTLÜK NOTU: 名'e ÖZEL, Shirakawa'nın "
    + "口'yu サイ okuduğunu doğrudan gösteren bir çevrimiçi kaynak DOĞRULANAMADI — サイ Wikipedia "
    + "maddesi 名'i tek tek listelemiyor; bu iddia Shirakawa'nın 口-sınıfı genel teorisinden ve "
    + "Parti 5 (口) QA notundan geliyor. Yani 名 için サイ riski, 口 raporunun ima ettiğinden DAHA "
    + "AZ akuttur: ESAS referans dahil ana akım net biçimde 'ağız' der. "
    + "(c) 夕 = akşam karanlığı mı? → Kanjipedia + 説文 = EVET (akşam/冥). Sapma: OKJiten (kanji182) "
    + "夕'yi 'ay' (夜明け=şafak) sayıp 'şafakta horozun ötüşü' hikâyesini verir — hem 夕'nin anlamında "
    + "hem türetmede ana akımdan sapar. OKJiten daha önce (九, 口) belirleyici sayılmadı; burada da "
    + "teyit edici değil, sapan bir azınlık. "
    + "|| CONFIDENCE GEREKÇESİ: (a)=A, ama (b) ve (c)'de gerçek azınlık sapmaları var. 九'daki gibi "
    + "'en zayıf halka' kuralı → bütün olarak B (ana akım net ve yayınlanabilir, ama ayrıntı "
    + "tartışmalı). B TASLAK ÖNERİSİDİR; A'ya çıkarmak (Shirakawa'yı 名'e özgü olmayan genel teori "
    + "sayıp) ya da C'de tutmak (サイ tartışmasını ağır basma) Zeynep'in kararıdır. "
    + "|| summaryTr çıplak: Kanjipedia'nın 会意 açıklamasını verir, 'kesin değildir/farklı görüşler' "
    + "dili İÇERMEZ (politika: düz yaz ya da boş bırak). Görsel/hafıza okuması ayrı katmanda "
    + "(memory_hint_tr) zaten var. "
    + "|| B4 (katman çökmesi, legacy): 名'in pictogram_note ve memory_hint_tr BİREBİR aynı string "
    + "('Karanlıkta (akşam) ağızla söylenen: isim.'). reviewed açılırsa kokenOf summaryTr'yi "
    + "döndüreceği için pictogram_note okunmaz; ama memory_hint_tr (Hafıza) ile summaryTr (Kökeni) "
    + "artık FARKLI olmalı — bu betik summaryTr'yi zaten farklı yazdı, katman çakışması yok.",
  qaStatus: "drafted"
};

const oldSub = JSON.stringify(rec);
if (!src.includes(oldSub)) throw new Error("kayıt kaynakta bire bir bulunamadı");
const next = Object.assign({}, rec, { etymology: ETY });

/* Sert güvenceler — drafted kapısı ve dokunulmazlar */
if (next.etymology.qaStatus !== "drafted") throw new Error("qaStatus drafted olmalı");
if (next.etymology.reviewedAt) throw new Error("reviewedAt VERİLMEZ (onay ayrı gelir)");
if (next.etymology.confidence !== "B") throw new Error("taslak confidence B bekleniyor");
if (next.mnemonic.status !== rec.mnemonic.status) throw new Error("mnemonic değişmemeli");
if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error("memory_hint_tr değişmemeli");
if (next.pictogram_note !== rec.pictogram_note) throw new Error("pictogram_note değişmemeli");
if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error("components değişmemeli");
if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error("component_meanings değişmemeli");
if (next.etymology.summaryTr === next.memory_hint_tr) throw new Error("Kökeni ile Hafıza aynı olamaz");
if (next.etymology.sources.length !== 1) throw new Error("tek kaynak künyesi bekleniyor");
if (!/kanjipedia\.jp\/kanji\/\d{10}$/.test(next.etymology.sources[0])) throw new Error("kaynak URL biçimi hatalı");

src = src.replace(oldSub, JSON.stringify(next));
fs.writeFileSync(INDEX, src);
console.log("名 (" + id + ") → etymology YAZILDI · 会意 · confidence B (TASLAK) · qaStatus=drafted (KULLANICIYA KAPALI) · reviewedAt YOK");
console.log("summaryTr (" + ETY.summaryTr.length + " kr): " + ETY.summaryTr);
console.log("disagreementNote: " + ETY.disagreementNote.length + " karakter");
