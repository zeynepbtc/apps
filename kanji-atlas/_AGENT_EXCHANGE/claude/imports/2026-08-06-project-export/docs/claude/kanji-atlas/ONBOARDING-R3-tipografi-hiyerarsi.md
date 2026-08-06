# Onboarding R3 — Tipografi & Görsel Hiyerarşi (code-free) · KİLİTLİ

> **Durum:** **KİLİTLİ** (Zeynep). Uygulamanın doğrulanacağı **sabit kaynak** — yeniden metin/tasarım alternatifi üretilmez. **R3'ün işi yeni metin değil**; kilitli R2-A metinlerinin **nasıl gösterileceği**. Kesin metin değiştirilmez/kısaltılmaz. **Kod YOK.** **Kaynak:** yalnız `ONBOARDING-B2-akis-haritasi.md` + `ONBOARDING-R2A-metin-ve-dogruluk.md`.
> **Tasarım temeli:** warm bg (`--bg #F4EEE3`), tek accent (`--accent #A4392C`), sakin premium, mobil öncelikli. **Font görevleri ayrı** (§0).

---

## §0 — Tip ölçeği + Font görevleri

**Font görevleri (kilit) — üç BAĞIMSIZ semantik token:**

| Görev | CSS token | Font (şimdi) |
|---|---|---|
| Marka + display/başlık (H1, H2) | `--font-display` | Shippori Mincho, serif |
| Gövde · kart · CTA · kaçış · a11y metinleri | `--font-ui` | Noto Sans JP, system-ui, sans-serif |
| Öğretilecek glifler **あ ア 火 木** (`.jp`) | `--font-ja-learning` | Shippori Mincho (= detay ekranı `.jp`) |

> **GATE 0 uyumlama notu (gerçek kod):** Mevcut uygulamada Japonca öğrenme glifleri `.jp` sınıfı üzerinden **Shippori Mincho** ile gösterilir ve Kana/Kanji **detay ekranlarıyla aynı biçimi** kullanır (app'te ayrı bir Japonca eğitim fontu **yok**; `Klee One` yalnız aile-ikon rozetinde). Marka/display ile Japonca öğrenme rolleri görsel olarak **aynı fontu** kullansa da **bağımsız semantik token** olarak tanımlanır: `--font-display` ve `--font-ja-learning` ikisi de **şimdilik** Shippori. `.jp` → `--font-ja-learning` okur. Böylece ileride bir locale'de display fontu değişse bile Japonca eğitim glifleri detayla **aynı kalır**. **Görsel sonuç değişmez.**
> あ ve 木 dekor değil; kullanıcının öğreneceği kanonik biçimlerdir → her zaman öğrenme ekranıyla aynı glif fontu (`--font-ja-learning`). Başlığa gömülü eğitim glifi de `.jp` ile gösterilir.

**Tip ölçeği:**

| Seviye | Rol | Font/biçim |
|---|---|---|
| **H1** | Ekran başlığı | `--font-display` (Shippori), en büyük, koyu charcoal |
| **H2** | Hedef etiketi / alt başlık | `--font-display` (Shippori), H1'den küçük |
| **Köprü** | Yalnız Ekran 3 "sonuç" vurgusu | `--font-ui`; gövdeden **belirgin**, dipnot/italik/minik **DEĞİL** |
| **Gövde** | Gerekçe · tanım · alt cümle | `--font-ui`, okunur, ikincil charcoal; asla küçültülmez |
| **Kart etiketi** | Yetkinlik kartı | `--font-ui`, orta; 1–2 satır (yumuşak) |
| **CTA-1 / CTA-2** | Birincil / ikincil eylem | `--font-ui` |
| Eğitim glifi | あ ア 火 木 | `.jp` = `--font-ja-learning` (Shippori, detayla aynı) |

**İlkeler:** tek accent; vurgu **yalnız renkle değil** (boyut+ağırlık+konum); cömert boşluk; okunabilirlik animasyonun önünde.

## §Global-A — CTA & kaçış eylemi kuralı
- **CTA-1:** dolu accent buton, yüksek kontrast, **min 44×44px**, alt/thumb bölgesi, ekranın **tek baskın** eylemi.
- **CTA-2 ("Ana sayfaya geç/git"):** görünür **metin eylemi** — çok silik **değil** · **min 44px dokunma** · çerçeveli ikinci büyük buton **değil** · altta kaybolmaz · **okunamayacak kadar küçültme YASAK**.

## §Global-B — Hareket kuralı
Hareket **bilginin erişimini kontrol etmez; yalnız sunumu destekler.** Tüm içerik **ilk render'da mevcut ve kullanılabilir**. Satırlar uzun aralıklarla tek tek açılmaz; köprü kullanıcıyı bekletmez. Eşit ağırlık gereken yerde giriş **senkron**. Hareket metni küçültmez/engellemez. Tam reduced-motion denetimi sonraki katman (§5).

## §Global-C — Yerleşim & kaydırma
**Her şeyi tek viewport'a sığdırma zorunluluğu YOK.** İlke: *sığdırmak için sıkıştırma yok; gerektiğinde kontrollü kaydırma var.*
- İçerik alanı: gerektiğinde **dikey kayar** (Üç Yazı Sistemi'nde kaydırma doğal/kabul edilebilir).
- Eylem alanı: **sticky alt alan olabilir**; safe-area boşluğu taşır; içeriğin sonuna eylem-alanı yüksekliği kadar **alt boşluk** eklenir → hiçbir metni örtmez.
- **Fixed overlay kullanılmaz.**

## §Global-D — Satır/akış kuralı
Satır sayıları **sert sınır değil, normal görünüm hedefi**. Normal boyutta hedef tutulur; **büyütüldüğünde doğal biçimde yeniden akar**. **Font küçültme, satır kesme/ellipsis veya içerik gizleme YASAK.** H1 dar/büyütülmüş ekranda 3 satıra çıkabilir; kart/gerekçe ≤2 satır hedef; Katakana tanımı ~3 satır hedef — hepsi büyüyünce akar.

---

## §1 — Ekran-ekran hiyerarşi (tek öneri)

### Ekran 1 — Karşılama
| Öğe | Karar |
|---|---|
| Görsel odak | Uygulama mührü/logo (mevcut ~88px) — tek güçlü odak, üstte |
| Başlık | **H1** "Kanji Atlas" (Shippori) |
| Yardımcı metin | Alt cümle → **Gövde** (sans), ikincil renk |
| Kart düzeni | Kart yok; dikey akış: logo → başlık → alt cümle → CTA'lar |
| Satır hedefi (yumuşak) | Başlık 1–2 · alt cümle ≤2; büyüyünce akar |
| Vurgu sırası | 1 logo+başlık → 2 alt cümle → 3 Başlayalım → 4 Ana sayfaya geç |
| Birincil / İkincil CTA | **Başlayalım** (accent) · **Ana sayfaya geç** (metin eylemi) |
| Boşluk & gruplanma | Logo+başlık üst grup; CTA'lar alt grup; cömert nefes |
| Hareket | Logo mühür animasyonu — tek seferlik giriş; içeriği geciktirmez |
| Küçük ekran | Düşük. Gerekirse scroll; sticky CTA safe-area + alt boşlukla metni örtmez |

### Ekran 2 — Yetkinlik (kritik: 4 eşit kart)
| Öğe | Karar |
|---|---|
| Görsel odak | Soru başlığı üstte; **dört kart eşit ağırlık** — hiçbiri öne çıkmaz/varsayılan görünmez |
| Başlık | **H1** "Japonca yazıda nereden başlıyorsun?" (Shippori) · **Gövde** "Sana uygun bir başlangıç önerelim." |
| Kart düzeni | 4 dikey tam-genişlik satır-kart (sans etiket), sıra 0→3; tek tutarlı düzen |
| Satır hedefi (yumuşak) | Kart etiketi normalde ≤2 satır; uzun Band 2/3 doğal 2 satır; büyüyünce akar; **küçültme yok** |
| Alt satır | **Hiçbir kartta alt satır yok** (uniform tek etiket). R2-A opsiyonel alt satırları bu düzende gösterilmez (metin değişmez) |
| Kart yüksekliği | **Aynı min-height + aynı görsel kurallar** (renk/border/padding/tipografi/hareket). Büyütülmüş metinde **kartın yüksekliği içeriği kadar artar** (yatayda ekran sınırını **aşmaz**; metin **dikey** yeniden akar). Eşit ağırlık **mutlak pikselle değil**, görsel sistemle korunur |
| Vurgu sırası | 1 başlık → 2 alt cümle → 3 dört kart (eşit) → 4 Ana sayfaya geç |
| Birincil / İkincil | **Kartın kendisi** eylem (seçince ilerler) · **Ana sayfaya geç** (metin eylemi) |
| Boşluk | Başlık grubu ↔ kart grubu nefes; kartlar arası eşit aralık |
| Hareket | Kartların girişi **senkron/eşit**; seçimde hafif geri bildirim |
| Küçük ekran | Uzun etiket 2 satıra akar (küçültme yok); gerekirse liste scroll; sticky "Ana sayfaya geç" metni örtmez |

### Ekran 3 — Üç Yazı Sistemi (risk: bilgi duvarı + köprü)
Omurga: **Ana başlık → üç eşit sistem satırı → belirgin köprü → Devam → Ana sayfaya geç.**

| Öğe | Karar |
|---|---|
| Görsel odak | Üç sistem satırı; her satırda **büyük glif** あ/ア/火 (**eğitim fontu = `.jp`/`--font-ja-learning`**) tutarlı boyut — üçü **eşit** |
| Başlık | **H1** "Japonca yazıda üç ana sistem birlikte kullanılır." (Shippori) |
| Sistem satırı | Glif (eğitim fontu) + ad (**H2**) + tanım (**Gövde** sans); üç satır aynı şablon |
| Satır hedefi (yumuşak) | Tanım: Hiragana/Kanji ~2, Katakana ~3 **hedef**; aynı gövde boyutu, büyüyünce akar, **küçültme yok** |
| Köprü | "Temel sesleri tanımak, sonraki adımları kolaylaştırır." → **ayrı kısa vurgu bandı** (ince ayraç + accent). **Dipnot/italik/minik DEĞİL**; ama üç sistemden **baskın da değil** |
| Vurgu sırası | 1 başlık → 2 üç satır (eşit) → 3 köprü → 4 Devam → 5 Ana sayfaya geç |
| Birincil / İkincil | **Devam** (accent) · **Ana sayfaya geç** (Band 1'de ayrı "geç" yok) |
| Boşluk | Satırlar arası eşit nefes; köprü öncesi hafif ayrım; glif hizası bilgi duvarını kırar |
| Hareket | **Üç satır ilk render'da mevcut**; hareket yalnız hafif giriş desteği; köprü bekletmez |
| Küçük ekran | **Kaydırma doğal ve kabul edilebilir**; CTA'lar sticky, safe-area + alt boşlukla metni örtmez; küçültme yok |

### Ekran 4 — Dürüst Öneri / Final (dört varyant, TEK bileşen ailesi)
Ortak iskelet: **Görsel odak → Başlık → (varsa) Hedef etiketi → Kısa gerekçe → Birincil CTA → İkincil CTA.** Aynı boşluk/tip ölçeği/hizalama; **yalnız görsel odak + CTA etiketi bant-özel.**

| Öğe | Karar (ortak) |
|---|---|
| Başlık | **H1** (bant metni, R2-A kilitli, Shippori) |
| Hedef etiketi | **H2** — yalnız gerçek hedef etiketi olan bantta (Band 2 "İlk kanji ailesi: 木"; 木 eğitim fontu). Band 0 hedefi **büyük あ ile** |
| Gerekçe | **Gövde** (sans), ≤2 satır hedef (yumuşak) |
| Birincil / İkincil | Dolu accent, bant-özel etiket · **Ana sayfaya git** (metin eylemi) |
| Vurgu sırası | 1 görsel odak+başlık → 2 hedef etiketi (varsa) → 3 gerekçe → 4 CTA-1 → 5 CTA-2 |
| Boşluk | Görsel odak üstte cömert; metin orta; CTA'lar altta thumb |
| Hareket | Görsel odak hafif giriş; dört varyant **aynı animasyon dili** |
| Küçük ekran | Gerekirse scroll; sticky CTA metni örtmez |

**Bant-özel görsel odak (kesinleşti):**

| Bant | Görsel odak (eğitim fontu / mevcut motif) | CTA-1 (R2-A) |
|---|---|---|
| 0 | Büyük **tek あ** | あ ile başla |
| 1 | **Eşit あ・ア çifti** (küçük grup; tek hedef karakter DEĞİL; Band 0'ın tek büyük あ'sıyla karışmaz) | Kana bölümünü aç |
| 2 | Büyük **tek 木** | 木 ailesiyle başla |
| 3 | **Mevcut Atlas ağ/harita motifi** (yeni soyut görsel üretilmez) | Atlas'ı aç |

### Skipped Home
Onboarding hiyerarşisi **yok**. Ne kişiselleştirilmiş ne genel öneri şeridi; Home'un normal başlığı + eşit ağırlıklı modül kartları olduğu gibi. Home geneli bu kapı dışı.

---

## §2 — Belirtilen R3 risklerinin çözümü
- **Yetkinlik eşit ağırlık + uzun metin:** aynı min-height + görsel kural; metin dikey akar (küçültme yok); hiçbiri baskın değil.
- **Alt satır ritmi:** tek düzen = alt satır hiçbir kartta yok.
- **Üç sistem bilgi duvarı:** üç eşit satır, kısa tanım, glif hizası, nefes; içerik ilk render'da; kaydırma kabul.
- **Köprü:** ayrı vurgu bandı; dipnot/italik değil; baskın da değil.
- **Dört final aynı aile, dürüst farklı görsel:** ortak iskelet; yalnız odak + CTA etiketi değişir.
- **Band 1 tek glif yok:** eşit **あ・ア çifti**.
- **Kaçış görünür ama ikincil:** metin eylemi; min 44px; büyük buton değil; okunamayacak kadar küçültme yasak.

## §3 — Küçük ekran / metin büyütme (özet)

| Ekran | Risk | Çözüm |
|---|---|---|
| Karşılama | Düşük | Scroll gerekirse; sticky CTA metni örtmez |
| Yetkinlik | Orta-yüksek | Etiket 2 satıra akar (küçültme yok); min-height + görsel kural; scroll |
| Üç sistem | Yüksek (bilgi duvarı) | Kısa tanım, kompakt hizalı satır; **kaydırma doğal**; sticky CTA örtmez |
| Final | Orta | Gerekçe akar; görsel odak ekrana göre; scroll |

---

## §4 — R3'te AYNEN korunan kararlar
Karşılama sırası (logo→başlık→açıklama→eylem) · yetkinlikte kartın kendisi eylem · dört kartın hiçbiri baskın değil · kartlarda alt satır yok · üç sistemin eşit ağırlığı · köprü dipnot değil · kaçış ikinci büyük buton değil · dört final aynı bileşen ailesi · Band 1'de tek karakter hedefi yok · Skipped Home normal Home.

## §5 — Accessibility sırası (iki katman)
Ana yol haritası **değişmez**; iki ayrı katman:

1. **Pre-code tasarım kısıt kontrolü (R3'ün hemen ardından, kısa):** metin küçültülmeyecek · içerik kesilmeyecek · min dokunma alanı · safe-area · kontrast **hedefi** · metin büyütmede yeniden akış · animasyon olmadan da tam anlam · sticky alan içeriği örtmez · **font kabul: Türkçe ğ ş ı İ ö ü ç + Japonca あ ア 火 木 gerçek font dosyalarıyla, fallback karışması yok, eğitim glifleri detayla aynı.** *(Uygulanabilirlik kontrolü — ölçüm değil. Detay: `ONBOARDING-precode-a11y-kisit-kontrolu.md`.)*
2. **Uygulama sonrası tam erişilebilirlik denetimi (kod + gerçek cihaz sonrası):** gerçek kontrast ölçümü · ekran okuyucu sırası · focus yönetimi · reduced-motion · metin büyütme · yatay/dikey · dokunma hedefleri.

**Sıra:** R3 hiyerarşi → **kısa pre-code a11y kısıtları** → Adım 7 uygulama + fixture + staging → ileride **tam accessibility / Reduced Motion** denetimi. *(Tam denetim koddan önce yapılamaz — ölçülecek gerçek arayüz yok.)*

---

## §6 — Kilitlenmiş R3 revizyon özeti
- **Tipografi:** üç bağımsız token — `--font-display` (Shippori, marka/H1-H2), `--font-ui` (sans; gövde/kart/CTA/kaçış/a11y), `--font-ja-learning` (`.jp`, eğitim glifi; şimdilik Shippori = detay). Görsel değişmez; ileride display locale-özel değişse bile eğitim glifi detayla aynı kalır.
- **Satır sınırları:** sert değil, normal görünüm hedefi; kesme/ellipsis/küçültme yok.
- **Yerleşim:** tek viewport zorunlu değil; gerektiğinde scroll; CTA sticky olabilir ama içeriği örtmez; fixed overlay yok.
- **Animasyon:** bilgiyi geciktirmez; içerik ilk anda erişilebilir.
- **Yetkinlik kartları:** aynı min-height + görsel sistem; büyütülmüş metinde **yükseklik** içeriği kadar artar (yatay taşma yok).
- **Band 1 görseli:** eşit **あ・ア çifti**; Band 3 mevcut Atlas motifi.
- **Accessibility:** kısa pre-code kısıt kontrolü şimdi; tam denetim uygulama sonrası.
