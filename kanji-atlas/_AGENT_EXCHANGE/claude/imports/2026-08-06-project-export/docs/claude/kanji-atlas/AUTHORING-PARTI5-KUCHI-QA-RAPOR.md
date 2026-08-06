# Parti 5 · 口 — Ayrı QA Turu Raporu

**Tarih:** 2026-07-25 · **Commit:** `861622e` · **Kayıt durumu:** `drafted` (kullanıcıya KAPALI) · **reviewed VERİLMEDİ**

Bu rapor, kaydı yazan turdan **ayrı** bir okumadır. Amaç kaydı savunmak değil, kırmaya çalışmaktır. Kaynak tarafında bulgu çıkmadı; **kayıt dışında iki gerçek bulgu çıktı (B0 ve B1) ve ikisi de karar gerektiriyor.**

---

## 0. ÖNCE BUNU OKU — 口 "boş köken" değildi, **legacy** kayıttı

Plan "kalan 32 boş kökenden biri" diye açılmıştı. Ölçtüm: **口 o listede değil.** `etymology` alanı yoktu ama **`pictogram_note` doluydu** ve kullanıcıya görünüyordu:

> "Açık bir ağzın kare çerçevesi."

`kokenOf()` etymology yoksa `pictogram_note`'a düşer. Kayıt `drafted` olunca fonksiyon **legacy'ye düşmeden `null` döner**. Yani şu an:

| | Kökeni satırı (kullanıcıda) |
|---|---|
| `92a83f7` (önce) | "Açık bir ağzın kare çerçevesi." — görünür |
| `861622e` (şimdi, drafted) | **boş** |
| reviewed onaylanırsa | "Bir ağzın resmidir." — görünür |

**Bu yeni bir hata değil, drafted adımının bilinen geçici hâli.** Aynısı Parti 3'te 目 ("Dik duran bir gözü andıran kare.") ve 手 ("Parmaklı bir el.") için de yaşandı; `0806275` → `e20e532` arasında kısa sürdüğü için sorun olmadı.

**Karar gerektiren nokta:** 九'da drafted'da bekletmenin bedeli sıfırdı (kayıt zaten boştu). Burada bedel var — görünen bir metin geri çekildi. 口 uzun süre drafted'da bekleyecekse bu bilinçli bir seçim olmalı. İhtilaf olmadığı ve confidence A olduğu için beklemenin editoryal bir gerekçesi de yok; onay geldiğinde açılırsa boşluk kapanır.

---

## 1. Denetlenen kayıt

| Alan | Değer |
|---|---|
| `formationType` | 象形 |
| `formationTypeSource` | Kanjipedia |
| `confidence` | **A** |
| `summaryTr` | "Bir ağzın resmidir." (19 karakter) |
| `sources` | `https://www.kanjipedia.jp/kanji/0002117900` |
| `qaStatus` | `drafted` |
| `reviewedAt` | yok |
| `disagreementNote` | 1351 karakter (ihtilaf değil: mutabakat kaydı + ileriye dönük uyarı) |

Dokunulmayanlar: `mnemonic` (`not_required`), `pictogram_note`, `memory_hint_tr`, `components`, `related_characters`, okumalar, örnekler.

---

## 2. Kaynak turu — bağımsız yeniden okuma

| Kaynak | Ne diyor | Sınıflandırma |
|---|---|---|
| Kanjipedia 0002117900 (esas Japon sözlük referansı) | 「象形。くちの形にかたどり、『くち』の意を表す。」 | 象形 |
| 説文解字 (漢典 üzerinden okundu) | 「口、人所以言食也。象形。」 | 象形 |
| OKJiten kanji7 | 「象形文字です。『くち』の象形から『口』という漢字が成り立ちました。」 | 象形 |

Üç okuma da aynı tek iddiayı veriyor: **ağzın resmi.** Farklı bir referans öneren, ödünçleme (仮借) iddia eden ya da sınıflandırmayı tartışan kaynak bulunamadı.

**Not — bağımsızlık kalitesi:** OKJiten daha önce (九 turunda) bağımsız bir ses sayılamayacağı görülmüştü; burada da teyit edici sayılıyor, belirleyici değil. Belirleyici olan Kanjipedia + 説文解字 hattıdır. `sources[]`'a yalnız Kanjipedia yazıldı; diğer ikisi beyan edilen dört kaynak künyesini şişirmemek için `disagreementNote` içinde denetim izi olarak kaldı.

---

## 3. İddia bazında karar

九 turunda kayıt alt iddialara bölünüp en zayıf halka belirleyici olmuştu. Burada **bölünecek alt iddia yok.**

| İddia | Kaynakta doğrudan var mı | Güven |
|---|---|---|
| 象形 sınıflandırması | Evet, üçünde de | A |
| Referans = ağız | Evet, üçünde de | A |
| Sonradan ödünçleme yok, anlam kaymamış | Hiçbir kaynak ödünçleme demiyor; 説文 anlamı doğrudan veriyor | A |

**Sonuç: confidence A doğrulandı, değişiklik önerilmiyor.**

---

## 4. Metin denetimi — ne yazılmadı ve neden

| Cümle adayı | Karar | Gerekçe |
|---|---|---|
| "**Açık** bir ağzın resmidir" | Yazılmadı | Hiçbir kaynak "açık" demiyor. Bu bir çıkarım. |
| "Kare çerçeve ağzın hatlarıdır" | Yazılmadı | Aynı — görsel yorum, kaynak ifadesi değil. |
| "Ağzın şekline benzetilmiştir" | Yazılmadı (fazlalık) | かたどる zaten "resmidir" ile karşılanıyor; 目・耳・手 ile ses birliği bozulurdu. |

Dikkat: eski legacy metin ("Açık bir ağzın **kare çerçevesi**") tam da bu iki çıkarımı içeriyordu — yani reviewed onayı gelirse kullanıcı **daha kısa ama daha dürüst** bir cümle görecek. Görsel okuma kaybolmuyor, Hafıza katmanında zaten duruyor (`memory_hint_tr`: "Açık bir ağzı andıran kare.").

Ses tutarlılığı: "Bir ağzın resmidir." ↔ 耳 "Bir kulağın resmidir." ↔ 目 "Bir gözün resmidir." — aynı kalıp.

---

## 5. Editoryal kapı doğrulaması (kod seviyesinde ölçüldü)

| Kontrol | Sonuç |
|---|---|
| `kokenOf(DATA.chars.kuchi)` | `null` — kayıt kullanıcıya kapalı |
| Detay ekranında "Bir ağzın resmidir" metni | Görünmüyor |
| `disagreementNote` içeriği (サイ, Shirakawa) sızıyor mu | Hayır |
| 目 (reviewed) hâlâ açık mı | Evet — kapı yalnız drafted'ı kesiyor |
| Detay ekranı render | Sorunsuz, `pageerror` yok |

Doğrulama zinciri: `node --check` (iki script bloğu) · `DATA` JSON parse · `generate_data_chars.js --check` (senkron + CONTENT_HASH güncel: `ee76f8ab89a986e1`) · dört içerik suite'i: `smoke_content_scaffold` **401/401**, `smoke_legacy_derived` **83/83**, `smoke_sources` **0 başarısız**, `smoke_durable_backend` **9/9**.

---

## 6. Kayıt dışı bulgular

### B1 — Durum tablosu sayıları yanlıştı (orta, düzeltildi)

`AUTHORING-DURUM-ve-FAZLAR.md` "reviewed 21 / legacy 37 / drafted 1 / boş 32" diyordu. Veriden ölçülen gerçek (bu commit sonrası):

| Durum | Gerçek |
|---|---|
| Reviewed | **26** |
| Legacy (etymology yok, pictogram_note var) | **31** |
| Drafted (口, 九) | **2** |
| Boş (ikisi de yok) | **32** |
| **Toplam kanji** | **91** |

Boş 32 listesi doğruydu ve değişmedi. Yanlış olan reviewed/legacy ayrımıydı — B0'ın gözden kaçmasının sebebi de bu. Durum belgesi düzeltildi.

### B2 — 口 bileşen envanteri neredeyse boş (orta)

Veride 口'yu bileşen olarak listeleyen **tek** kayıt var: 名 (`夕`+`口`). Oysa 右, 四 gibi kayıtların `components` alanı boş. Zeynep'in "口 sonraki birçok kanji için bileşen olarak önemli" gerekçesi veride henüz karşılığını bulmuyor. Veri boşluğu, hata değil.

### B3 — Yaşayan サイ riski: 名 bugün "口 = ağız" diye yayınlıyor (orta)

名'nin `component_meanings` alanı `{"夕":"akşam","口":"ağız"}` ve metni "Karanlıkta (akşam) ağızla söylenen: isim." Shirakawa Shizuka (白川静) ekolü tam da bu karakteri サイ (tanrıya sunulan duayı koyan kap) ile okur. Bu **口 kaydının sorunu değil** — 口 tek başına tartışmasız; Shirakawa'nın kendisi de サイ'nin "ağız" anlamında kullanıldığı açık örnek olmadığını söyler. Ama bileşen açıklaması yazılırken kaynağa ayrıca bakılmalı. `disagreementNote`'a bu yüzden ileriye dönük uyarı olarak yazıldı.

### B4 — 名'de katman çökmesi (küçük)

`pictogram_note` ve `memory_hint_tr` **birebir aynı string**. FIX-D2'de kapatılan sınıfın kalıntısı; Kökeni tadındaki metin Hafıza alanında oturuyor.

### B5 — `related_characters` biçim benzerliğine dayanıyor (küçük)

口 → `["田","目"]`. Bu bağ ortak kök değil, kutu benzerliği. Üstelik asimetrik: 目'nin kendi `related_characters` alanı boş. Zeynep'in "sonraki parti anlam çağrışımıyla değil, kaynak ve biçim ilişkisiyle seçilsin" talimatıyla doğrudan ilgili.

### B6 — Olumlu: 口 ile 囗 karışmamış (bulgu yok)

国 bileşen olarak `囗`'yu kullanıyor, `口`'yu değil. İki karakter veride ayrı tutulmuş. 囗'nun kendi kaydı yok — bugün gerek de yok.

---

## 7. QA sonucu

| Soru | Cevap |
|---|---|
| Kayıt kaynağı doğru mu gösteriyor | Evet |
| summaryTr'de çıkarım var mı | Yok |
| confidence doğru mu | Evet, A |
| Kayıtta değiştirilmesi gereken bir şey | Yok |
| reviewed'a hazır mı | **Teknik olarak evet — karar Zeynep'in** |
| Bekletmenin bedeli var mı | **Evet** — B0: görünen legacy köken şu an boş |

**DURULDU.** `reviewed` + `reviewedAt` verilmedi. Onay gelirse tek işlem: `qaStatus → "reviewed"`, `reviewedAt: "2026-07-25"` (+ 4 içerik suite'i + push).

---

## 8. Sıradaki parti için not

Zeynep'in kuralı: kümeyi **anlam çağrışımıyla değil, kaynak ve biçim ilişkisiyle** seç. Bu turun bulguları iki aday üretti:

1. **口 bileşen ailesi** (名 · 右 · 古 · 品 gibi) — biçim ilişkisi gerçek, ama B3 nedeniyle her biri için kaynağa ayrı bakmak gerekir; ucuz parti değildir.
2. **Envanter/katman temizliği** (B2 + B4 + B5) — köken yazımı değil, veri bakımı. Ayrı ve kapanabilir bir iş.

Ayrıca B0 kalıcı bir kural öneriyor: **legacy kayıt drafted'a çevrilirken kullanıcıda bir metin geri çekilir.** Bundan sonraki partilerde hedef kayıtların legacy mi boş mu olduğu **önceden ölçülmeli**; legacy olanlar drafted'da uzun bekletilmemeli.

気 · 父 · 母 · 友 hâlâ boş; ama aralarındaki bağ anlamsaldır, kaynak/biçim değil — kural gereği grup olarak önerilmiyor.
