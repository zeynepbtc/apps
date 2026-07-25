/* AUTHORING · KIRMIZI KUYRUK TURU 2 · 南 — TEK KAYIT (DRAFTED, KULLANICIYA GİZLİ).
   Zeynep kararı 2026-07-25: metin, oluşum yönü ve confidence ÖNCEDEN belirlendi (aşağıda).
   Bu betik yalnız o kararı DATA'ya yazar; reviewed AYRI turda ve AYRI commit'te açılır.

   ── ⭐⭐ BU TURUN AÇTIĞI BEŞİNCİ KİLİTLİ İLKE: **MEKANİZMA BELİRSİZLİĞİ** ──────────────────
   Zeynep: "Bunu çıkarılabilir ayrıntı testi içine katmazdım. Çünkü aynı şey değil. 父'de
   'balta mı değnek mi?' tek bir AYRINTIYDI. Burada ise 'hangi tarihsel MEKANİZMA?' — bu başka
   seviyede bir ayrışma."
   KURAL (AUTHORING-05'te tam metin): «Nesne üzerinde yeterli uzlaşı varsa, fakat anlamın hangi
   mekanizmayla bugünkü kullanımına ulaştığı konusunda güvenilir kaynaklar ayrışıyorsa, mekanizma
   görünür metne ALINMAZ. Görünür metin yalnız ÖZGÜN BİÇİMİ ve BUGÜNKÜ ANLAMI belirtir; geçiş
   mekanizması disagreementNote'ta korunur.»
   → Yeni ve ADLANDIRILMIŞ kalıp: "… resmidir. Daha sonra '[anlam]' anlamında KULLANILMAYA
     BAŞLANMIŞTIR." Bu kalıp, kilitli iki kalıbın da yerine geçmez, üçüncüsüdür:
       · anlam bağı  → "…-den '[anlam]' anlamı gelişmiştir"          (西, 北)
       · 借りて       → "Sonradan '[anlam]' anlamında ödünç alınmıştır" (万, 来)
       · MEKANİZMA BELİRSİZ → "Daha sonra '[anlam]' anlamında kullanılmaya başlanmıştır" (南)
   Zeynep'in fiil gerekçesi: "kullanılmıştır" değil **"kullanılmaya başlanmıştır"** — çünkü bu
   "ödünç aldı" da demiyor, "anlamı gelişti" de demiyor; yalnız TARİHSEL OLGUYU söylüyor.

   ── B0 (ÖLÇÜLDÜ) ──────────────────────────────────────────────────────────────────────────
   南 = `minami`, TAMAMEN BOŞ (etymology/pictogram_note/memory_hint_tr yok; components []).
   Uygulamada VAR: 十 半 円 北 西 東 中 · YOK: 干 冂 羊 内 出.

   ── BEŞ KAYNAK OKUNDU (hepsi FETCH EDİLDİ) ────────────────────────────────────────────────
   1. ESAS Kanjipedia 0005406400:「象形。鐘状の楽器を木の枝に掛けた形にかたどる。南方の民族が使って
      いた楽器であったことから、「みなみ」の意を表す。」 → 象形 · ÇAN BİÇİMLİ ÇALGI, DALA ASILI ·
      mekanizma = ANLAM BAĞI (güneyli halkların çalgısı)
   2. 説文解字 卷六 (漢典):「艸木至南方，有枝任也。从𣎵𢆉聲。𡴖，古文。那含切」 → 形声 · NESNE YOK ·
      mekanizma = kozmoloji (南=任). 説文解字注 ayrıca:「按古南男二字相假借。」 (南/男 karşılıklı
      ödünç — çalgı→güney ödüncü DEĞİL; abartılmadı.)
   3. Dong Chinese:「Depicts a bell-shaped musical instrument. The current meaning of 南 is a
      phonetic loan.」 → ÇAN BİÇİMLİ ÇALGI · mekanizma = ÖDÜNÇ
   4. Wiktionary:「…a pictogram (象形) of a hanging percussion instrument, originally identical to
      the left side of 㱿.」 + 「Sagart (1988) instead proposes that it is a pictogram of the front
      of a house…」 → ASILI VURMALI ÇALGI (a) / EV CEPHESİ (b)
   5. OKJiten kanji150:「会意文字です。「草」の象形と「入り口」の象形…「風をはらむ帆」の象形…南からの風
      の意味を表し…」 → 会意 · RÜZGÂR/YELKEN (dört kez belirleyici sayılmadı: 九 口 名 父)

   ── UZLAŞI ÖLÇÜMÜ ─────────────────────────────────────────────────────────────────────────
   NESNE: asılı çan/vurmalı çalgı = **3/5** (Kanjipedia + Dong + Wiktionary-a) → MODERN KÜME VAR,
     ESAS içinde. Zeynep: "nesne kısmı bana göre artık 'çıkarılabilir ayrıntı' değil."
     Sıfatlar da çapraz destekli: "asılı" (Kanjipedia 木の枝に掛けた + Wiktionary hanging) ·
     "çan biçiminde" (Kanjipedia 鐘状 + Dong bell-shaped).
   MEKANİZMA: **DÖRT AYRI CEVAP** (anlam bağı / ödünç / kozmoloji / rüzgâr) → YAYIN DIŞI.
     Kritik: anlam bağı ile ödünç birbirinin yerine KULLANILAMAZ (AUTHORING-04 çakışması).

   CONFIDENCE = **A** (Zeynep): yayımlanan iki iddia (çalgı ✔ · bugün güney ✔) sağlam; araştırmanın
   kendisi B/C olabilir ama confidence YAYIMLANAN metni ölçer (父 turunda kilitlendi).

   ⚠️ Bu betik yalnız DRAFTED yazar → kokenOf() null döner, kullanıcı GÖRMEZ. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);

const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === "南");
if (!id) throw new Error("南 bulunamadı");
const rec = DATA.chars[id];
if (rec.etymology) throw new Error("南 zaten etymology taşıyor");
if (rec.mnemonic) throw new Error("南 zaten mnemonic taşıyor");
if ((rec.pictogram_note || "").trim()) throw new Error("南 legacy taşıyor — B0 ihlali");

const SUMMARY = "Asılı, çan biçiminde bir çalgının resmidir. Daha sonra 'güney' anlamında kullanılmaya başlanmıştır.";

const ETY = {
  formationType: "象形",
  formationTypeSource: "Kanjipedia",
  confidence: "A",
  summaryTr: SUMMARY,
  sources: ["https://www.kanjipedia.jp/kanji/0005406400"],
  disagreementNote:
    "TASLAK · KIRMIZI KUYRUK TURU 2 · **MEKANİZMA BELİRSİZLİĞİ** (beşinci kilitli ilke, bu kayıtta "
    + "doğdu — AUTHORING-05). Beş kaynak okundu, hepsi fetch edildi. "
    + "|| ESAS Kanjipedia 0005406400:「象形。鐘状の楽器を木の枝に掛けた形にかたどる。南方の民族が使って"
    + "いた楽器であったことから、「みなみ」の意を表す。」 → 象形 · çan biçimli çalgı, dala asılı · "
    + "mekanizma = ANLAM BAĞI (güneyli halkların çalgısıydı). "
    + "|| ÇAPRAZ 1 · 説文解字 卷六 (漢典'den fetch edilerek):「艸木至南方，有枝任也。从𣎵𢆉聲。𡴖，古文。"
    + "那含切」 → 形声 · NESNE VERMİYOR (mühür biçiminin yapısal analizi) · mekanizma = Han dönemi "
    + "kozmolojisi (南=任, bitkiler güneyde dal verir). 説文解字注 ek gözlem:「按古南男二字相假借。」 "
    + "(南 ile 男'in karşılıklı ödüncü — çalgı→güney ödüncü DEĞİLDİR, karıştırılmadı.) "
    + "|| ÇAPRAZ 2 · Dong Chinese (fetch edilerek):「Depicts a bell-shaped musical instrument. The "
    + "current meaning of 南 is a phonetic loan.」 → NESNEDE ESAS'la AYNI, MEKANİZMADA KARŞIT (ödünç). "
    + "|| ÇAPRAZ 3 · Wiktionary (fetch edilerek): (a)「…a pictogram (象形) of a hanging percussion "
    + "instrument, originally identical to the left side of 㱿.」 (b)「Sagart (1988) instead proposes "
    + "that it is a pictogram of the front of a house. Archaeological evidence confirms that in "
    + "antiquity, at least in some regions, houses were built to face south.」 → (a) ESAS'ı destekler, "
    + "(b) azınlık görüşü. "
    + "|| ÇAPRAZ 4 · OKJiten kanji150 (fetch edilerek):「会意文字です。「草」の象形と「入り口」の象形"
    + "(「入る」の意味)と「風をはらむ帆」の象形(「風」の意味)から春、草・木の発芽を促す南からの風の意味"
    + "を表し…」 → 会意 · rüzgâr/yelken. (OKJiten 九·口·名·父 turlarında da bağımsız/belirleyici "
    + "sayılmadı — beşinci kez aynı muamele.) "
    + "|| ===== UZLAŞI ÖLÇÜMÜ ===== "
    + "NESNE (asılı, çan/vurmalı çalgı): **3/5** — Kanjipedia + Dong + Wiktionary-(a). MODERN KÜME "
    + "OLUŞMUŞ ve ESAS onun içinde → Zeynep: 'nesne kısmı artık çıkarılabilir ayrıntı DEĞİL.' "
    + "Sıfatlar çapraz destekli: 'asılı' (Kanjipedia 木の枝に掛けた + Wiktionary hanging) · "
    + "'çan biçiminde' (Kanjipedia 鐘状 + Dong bell-shaped). "
    + "MEKANİZMA ('nasıl güney oldu?'): **DÖRT AYRI CEVAP** — anlam bağı (Kanjipedia) / fonetik ödünç "
    + "(Dong) / kozmoloji (説文) / güney rüzgârı (OKJiten). Bunlar birbirinin yerine KULLANILAMAZ ve "
    + "AUTHORING-04'ün iki kilitli kalıbının tam çakışmasına düşer → **MEKANİZMA YAYIN DIŞI**. "
    + "|| ===== GÖRÜNÜR METİN KARARLARI ===== "
    + "(1) Fiil **'kullanılmaya başlanmıştır'** — 'kullanılmıştır' DEĞİL. Zeynep gerekçesi: bu ifade "
    + "'ödünç aldı' da demiyor, 'anlamı gelişti' de demiyor; yalnız tarihsel olguyu söylüyor. "
    + "(2) 'Güneyli halkların çalgısı' ANLAM BAĞI metne ALINMADI — tek kaynaklı VE Dong tarafından "
    + "aktif olarak reddediliyor (北'un durumundan zayıf: 北'ta çelişen kaynak yoktu). "
    + "(3) 'ödünç' de yazılmadı — o da tek kaynaklı ve ESAS tarafından reddediliyor. "
    + "(4) 木の枝 (ağaç dalı) metne alınmadı: bugünkü 南'da böyle bir bileşen görünmüyor, 'asılı' "
    + "sıfatı zaten aynı bilgiyi taşıyor (görünmeyen bileşen adlandırılmaz ilkesi). "
    + "(5) Oluşum türü çatalı (象形 3 / 形声 1 / 会意 1) metne girmedi — teknik terim zaten girmez. "
    + "(6) Sagart'ın 'ev cephesi' önerisi azınlık görüşü olarak burada duruyor, metne alınmadı. "
    + "|| CONFIDENCE **A** (Zeynep): yayımlanan iki iddia sağlam (çalgı 3/5 + ESAS · 'bugün güney' "
    + "tartışmasız). Araştırmanın kendisi B/C olabilir; confidence YAYIMLANAN metni ölçer (父 emsali).",
  qaStatus: "drafted"
};

const next = Object.assign({}, rec, { etymology: ETY, mnemonic: { status: "pending_review" } });

/* ── Genel güvenceler ── */
if (next.etymology.qaStatus !== "drafted") throw new Error("qaStatus drafted olmalı");
if (next.etymology.reviewedAt) throw new Error("reviewedAt VERİLMEZ");
if (next.mnemonic.status !== "pending_review") throw new Error("mnemonic pending_review olmalı");
if (["象形","指事","会意","形声","会意形声"].indexOf(next.etymology.formationType) < 0) throw new Error("bilinmeyen formationType");
if (!/kanjipedia\.jp\/kanji\/\d{10}$/.test(next.etymology.sources[0])) throw new Error("kaynak URL biçimi hatalı");
if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error("components değişmemeli");
if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error("component_meanings değişmemeli");
if (next.pictogram_note !== rec.pictogram_note) throw new Error("pictogram_note değişmemeli");
if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error("memory_hint_tr değişmemeli");
if (next.etymology.summaryTr === (next.memory_hint_tr || "")) throw new Error("Kökeni ile Hafıza aynı olamaz");

/* ── MEKANİZMA BELİRSİZLİĞİ güvenceleri (beşinci ilke, makine kuralı) ── */
const S = next.etymology.summaryTr;
if (!/kullanılmaya başlanmıştır/.test(S)) throw new Error("南: kilitli fiil 'kullanılmaya başlanmıştır' zorunlu");
if (/ödünç/i.test(S)) throw new Error("南: MEKANİZMA YAYIN DIŞI — 借りて kalıbı giremez");
if (/anlamı gelişmiştir|gelişmiş/i.test(S)) throw new Error("南: MEKANİZMA YAYIN DIŞI — anlam bağı kalıbı giremez");
if (/halk|kavim|millet|rüzgâr|rüzgar|yelken|ev cephe|kozmo|bitki|dal ver/i.test(S)) throw new Error("南: rakip mekanizmaların hiçbiri metne giremez");
if (!/çalgı/i.test(S)) throw new Error("南: modern kümenin uzlaştığı nesne ('çalgı') korunmalı");
if (!/asılı/i.test(S)) throw new Error("南: 'asılı' sıfatı çapraz destekli, korunmalı");
if (!/çan biçiminde/i.test(S)) throw new Error("南: 'çan biçiminde' sıfatı çapraz destekli, korunmalı");
if (!/güney/i.test(S)) throw new Error("南: bugünkü anlam ('güney') belirtilmeli");
if (/ağaç dalı|dala asıl/i.test(S)) throw new Error("南: görünmeyen bileşen (木の枝) adlandırılmaz");
if (/kesin değil|farklı görüş|tartışmalı|kaynaklar/i.test(S)) throw new Error("南: tartışma dili kullanıcı metnine giremez");
if (/象形|形声|会意|㱿|𣎵/.test(S)) throw new Error("南: teknik terim / uygulamada olmayan karakter metne giremez");
/* Araştırma izi kaybolmamalı */
const N = next.etymology.disagreementNote;
if (!/MEKANİZMA YAYIN DIŞI/.test(N)) throw new Error("南: beşinci ilkenin uygulandığı notta yazılı olmalı");
if (!/phonetic loan/.test(N) || !/南方の民族/.test(N)) throw new Error("南: iki rakip mekanizma da notta korunmalı");

const oldSub = JSON.stringify(rec);
if (!src.includes(oldSub)) throw new Error("南: kayıt kaynakta bire bir bulunamadı");
src = src.replace(oldSub, JSON.stringify(next));
fs.writeFileSync(INDEX, src);

console.log("南 (" + id + ") DRAFTED · 象形 · confidence A · qaStatus=drafted (KULLANICIYA KAPALI)");
console.log("summaryTr (" + SUMMARY.length + " kr): " + SUMMARY);
console.log("disagreementNote: " + ETY.disagreementNote.length + " kr · BEŞ kaynak fetch edildi");
console.log("⭐ BEŞİNCİ İLKE: MEKANİZMA BELİRSİZLİĞİ — nesne uzlaşılı, geçiş mekanizması yayın dışı.");
