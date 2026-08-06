# Parti 6 · 名 — Ayrı QA Turu Raporu (TARTIŞMALI)

> ## ✅ KAPANDI — REVIEWED ONAYLI (Zeynep, 2026-07-25)
> **Karar:** confidence **B kalır**, **reviewed açıldı** (`f9dc575`, push+SHA doğrulandı). Ana akım (Kanjipedia+説文) yeterince güçlü; azınlık görüşleri (Shirakawa サイ, OKJiten 夕) `disagreementNote`'ta kaldı, kullanıcı metnine taşınmadı. `component_meanings` bilerek dokunulmadı (ileride 口 bileşenleri toplu editoryal uyumlamada ele alınacak).
> **summaryTr — Zeynep akıcılık edit'iyle son hâli:** *"口 ağız, 夕 ise akşam karanlığını gösterir. Karanlıkta birbirini göremeyen insanların adlarını ağızlarıyla söylemesinden 'isim' anlamı gelişmiştir."* ("anlamı verir"→"gösterir"; "kişilerin adını sesle"→"insanların adlarını ağızlarıyla".)
> **Reviewed doğrulaması:** `kokenOf(名)` → summaryTr döndürüyor (görünür); Kökeni ≠ Hafıza; サイ/Shirakawa metni sızmıyor; reviewedAt 2026-07-25 (Git'ten); CONTENT_HASH `d7cff661c1fcd1e7`; 4 içerik suite yeşil (401/83/sources/9); node --check 0 hata. Betik: `apply_authoring_6_mei_reviewed.js`.
> **Sıradaki:** Parti 7 adayı **右** (aşağıda §8) — 名 kalıbıyla otomatik açılmaz; 右'da 説文 dahi "ağız" demiyor, ayrı tur gerek.
>
> *Aşağısı, karar öncesi drafted (`bc4e16a`) hâlinde yapılan QA turunun tarihsel kaydıdır — olduğu gibi bırakıldı.*

---

**Tarih:** 2026-07-25 · **Drafted commit:** `bc4e16a` (branch `onboarding-b2-gate3`, push+SHA doğrulandı) · **Kayıt durumu (QA anında):** `drafted` (kullanıcıya KAPALI) · **reviewed o an VERİLMEMİŞTİ**

Bu rapor, kaydı yazan turdan **ayrı** bir okumadır. Amaç kaydı savunmak değil, kırmaya çalışmaktır. Zeynep'in Parti 6 talimatı gereği iki iddia **ayrı** tutuldu: (a) karakterde 口 biçimli parça bulunması · (b) o parçanın gerçekten "ağız" olması. **Ana bulgu: 名 için (b) sanıldığından güçlü — サイ riski 口 raporunun ima ettiğinden DAHA AZ akut.**

---

## 0. B0 ÖLÇÜMÜ — 名 legacy'dir, boş değil

Parti öncesi ölçüldü (B0 kuralı): `名` **`DATA.chars.na`'da var**, `etymology` alanı **yoktu** ama `pictogram_note` **doluydu** ve kullanıcıya görünüyordu:

> "Karanlıkta (akşam) ağızla söylenen: isim."

`kokenOf()` `drafted` görünce `null` döner (legacy'ye düşmez). Yani drafted penceresinde, tıpkı 口'da olduğu gibi, **görünen bir metin geri çekildi** (reviewed onayıyla yeni metne dönüştü). authoring branch canlı yayına gitmiyor (canlı site `main`'den servis edilir), gerçek kullanıcı etkilenmedi.

---

## 1. Denetlenen kayıt (drafted anı)

| Alan | Değer |
|---|---|
| `formationType` | 会意 |
| `formationTypeSource` | Kanjipedia |
| `confidence` | **B** (taslak → onaylandı) |
| `summaryTr` (drafted) | "口 ağız, 夕 ise akşam karanlığı anlamı verir. Karanlıkta birbirini göremeyen kişilerin adını sesle söylemesinden 'isim' anlamı gelişmiştir." → *reviewed'da Zeynep akıcılık edit'iyle güncellendi (bkz. kapanış banner'ı)* |
| `sources` | `https://www.kanjipedia.jp/kanji/0006666900` |
| `qaStatus` | `drafted` → **reviewed** |
| `disagreementNote` | 2640 kr (drafted) → 3724 kr (onay izi eklendi) |

Dokunulmayanlar: `mnemonic` (`not_required`), `pictogram_note`, `memory_hint_tr`, `components` (`夕`,`口`), `component_meanings` (`{夕:akşam, 口:ağız}`), `related_characters`, okumalar, örnekler. **Kod seviyesinde doğrulandı.**

---

## 2. Kaynak turu — bağımsız yeniden okuma

| Kaynak | Ne diyor | Sınıf |
|---|---|---|
| **Kanjipedia 0006666900** (esas Japon sözlük referansı) | 「会意。口と、夕（ゆうぐれ）とから成り、夕方の暗やみで、人に自分の名をなのることにより、『な』の意を表す。」 | 会意 · 口=ağız · 夕=akşam |
| **説文解字** (漢典 üzerinden) | 「名、自命也。从口从夕。夕者、冥也。冥不相見、故以口自名。」 | 会意 · 口=ağız · 夕=akşam(冥) |
| OKJiten kanji182 | 「『月』の象形(『夜明け』の意味)と『口』の象形から、夜明けに雄の鳥が鳴く事を意味し…転じて『な』」 | 口=ağız ama **夕=ay/şafak** (sapar) |
| Shirakawa 白川静 / サイ ekolü | 口-biçimli parçayı ritüel karakterlerde **サイ** (duayı koyan kap) okur — genel teori | tartışmalı, azınlık |

Kanjipedia + 説文解字 **birebir aynı** ana akım okumayı verir. OKJiten yalnız 夕'de sapar (口'yu yine ağız sayar). Shirakawa'nın サイ'si genel bir teoridir ve akademik olarak eleştirilir (ör. gaus.livedoor『常用漢字論―白川漢字学説の検証』: "söz sese dayanır, kaba konamaz").

**Not — bağımsızlık kalitesi:** OKJiten daha önce (九, 口) belirleyici sayılmadı; burada da sapan bir azınlık. Belirleyici hat **Kanjipedia + 説文解字**. `sources[]`'a yalnız Kanjipedia yazıldı.

---

## 3. İddia bazında karar (Zeynep talimatı: (a)/(b) AYRI)

| İddia | Kaynakta | Güven |
|---|---|---|
| **(a)** 名'de bir **口 BİÇİMLİ** parça var mı | Evet — Kanjipedia, 説文, OKJiten, Shirakawa **hepsi** bir 口-biçimi görür | **A** |
| **(b)** O parça etimolojik olarak **"ağız"** mı | Kanjipedia + 説文 + OKJiten + Shirakawa eleştirmenleri = **ağız**. Azınlık: Shirakawa サイ (genel teori, **名'e özel doğrulanamadı**) | **B** |
| **(c)** 夕 = **akşam karanlığı** mı | Kanjipedia + 説文 = evet (冥). Sapma: OKJiten (夕=ay/şafak, horoz hikâyesi) | **B** |
| **(d)** Türetme: karanlıkta ağızla ad söyleme | Kanjipedia + 説文 aynı; OKJiten farklı | **B** |

**En zayıf halka → bütün olarak B.** (a) tek başına A, ama (b) ve (c)'de gerçek azınlık sapmaları var. **Zeynep B'yi onayladı** ("A vermem çünkü alternatif okuma gerçekten var; C vermem çünkü ana akım çok baskın").

### サイ riski — dürüst değerlendirme
Parti 5 (口) raporu B3'te "名 bugün '口=ağız' diye yayınlıyor, サイ tartışmasının tek canlı riski burada" demişti. Bu tur o riski **ölçtü ve daralttı:**

- 名'e **ÖZEL**, Shirakawa'nın 口'yu サイ okuduğunu doğrudan gösteren bir çevrimiçi kaynak **doğrulanamadı**. サイ Wikipedia maddesi 名'i tek tek listelemiyor; iddia Shirakawa'nın 口-sınıfı **genel** teorisinden geliyor.
- Buna karşılık ESAS referans (Kanjipedia) + 説文 + OKJiten **hep birlikte** 名 için "ağız" der.
- Yani 名, サイ tartışmasının kapsamındadır ama **ana akım net biçimde ağızdan yana** — 名 bu tartışmanın "en zayıf" örneği değil, tam tersine görece sağlam örneği. *Zeynep bu yaklaşımı ("bir teori var → ölçtük → bu karakter için o kadar güçlü değil") özellikle olumladı.*

---

## 4. Metin denetimi — ne yazıldı, ne yazılmadı

| Aday | Karar | Gerekçe |
|---|---|---|
| "口 ağız … 夕 akşam karanlığı … isim anlamı gelişmiştir" | **Yazıldı** | Kanjipedia 会意 açıklamasının çıplak Türkçesi; 男 kalıbıyla ("… anlamı gelişmiştir") tutarlı |
| "Bu parçanın 'ağız' olduğu kesin değildir / farklı görüşler var" | Yazılmadı | Politika: kullanıcı metninde tartışma dili YOK. Seçenek: düz yaz ya da boş bırak |
| "サイ / dua kabı" | Yazılmadı | Ana akım değil; yalnız `disagreementNote`'ta denetim izi |
| OKJiten'in "şafakta horoz" hikâyesi | Yazılmadı | Sapan azınlık; ESAS referans değil |

Katman ayrımı: `summaryTr` (Kökeni) ≠ `memory_hint_tr` (Hafıza: "Karanlıkta (akşam) ağızla söylenen: isim."). **B4 katman çökmesi bu kayıtta çözüldü** — reviewed'da kokenOf summaryTr'yi döndürüyor, pictogram_note okunmuyor, Hafıza ile Kökeni farklı cümleler.

---

## 5. Editoryal kapı doğrulaması

**Drafted anı:** `kokenOf(名)` → `null` (kapalı), summaryTr görünmüyor, disagreementNote sızmıyor, node --check 0 hata, CONTENT_HASH `4c629d436c9f6621`, 4 suite yeşil.
**Reviewed sonrası (`f9dc575`):** `kokenOf(名)` → yeni summaryTr (görünür), Kökeni ≠ Hafıza, サイ sızmıyor, reviewedAt 2026-07-25, CONTENT_HASH `d7cff661c1fcd1e7`, 4 suite yeşil (401/83/sources/9), node --check 0 hata.

---

## 6. Kayıt dışı bulgular

- **B4 (çözüldü):** 名'in `pictogram_note` == `memory_hint_tr` idi; summaryTr farklı yazıldığı için reviewed'da katman çökmesi kapandı. **`component_meanings.口:"ağız"` dokunulmadı** (Zeynep: ileride 口 bileşenleri toplu uyumlamada).
- **B2 (envanter):** 口 hâlâ yalnız 名'in bileşen listesinde. Değişmedi; ayrı veri-bakım işi.
- **Okuma boşluğu (yeni, küçük):** Kanjipedia 名 için 音 **メイ・ミョウ** veriyor; kayıtta `onyomi:"メイ"` (ミョウ yok). Authoring köken turu okumalara dokunmaz — Editoryal Uyumlama / okuma turuna not.

---

## 7. QA sonucu → KARAR

| Soru | Cevap |
|---|---|
| Kayıt kaynağı doğru mu gösteriyor | Evet (Kanjipedia 会意) |
| summaryTr'de çıkarım/uydurma var mı | Yok — Kanjipedia'nın kendi açıklaması |
| (a) ve (b) ayrı tutuldu mu | Evet — disagreementNote + bu rapor |
| confidence | **B — Zeynep onayladı** |
| reviewed açıldı mı | **Evet** (`f9dc575`), summaryTr Zeynep akıcılık edit'iyle |
| component_meanings | Dokunulmadı (ileride toplu uyumlama) |

---

## 8. Sıradaki adım — 右 sınıflandırma önerisi (devam notu 3. adım)

**右** için ayrı öneri (ölçüldü: 右 = **boş** kayıt, 32 listesinde → drafted'da beklemenin kullanıcıya maliyeti yok, 名'in tersine):

- 右 de 口 biçimli parça içerir (口 + 又/ナ). Ama 名'den **farkı**: 右'da 口 çoğu ana akım kaynakta (説文 dahil) doğrudan "ağız" değil — 説文 「右、手口相助也」 (el ve ağız birbirine yardım eder) derken, Shirakawa サイ tartışması burada 名'den **daha canlı**.
- **Öneri:** 右'yu 名 kalıbıyla otomatik açma. Ayrı Kanjipedia turu + サイ kontrolü gerek; 右 boş kayıt olduğu için drafted'da rahatça bekletilebilir. Parti 7 adayı.

Zeynep'in kuralı korunuyor: küme **anlam çağrışımıyla değil, kaynak/biçim ilişkisiyle** seçilir; her 口-parçası için kaynağa ayrı bakılır.
