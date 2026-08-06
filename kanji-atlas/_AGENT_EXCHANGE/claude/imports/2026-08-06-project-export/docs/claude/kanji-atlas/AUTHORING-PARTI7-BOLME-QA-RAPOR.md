# Parti 7 · 分 半 友 赤 — Ayrı QA Turu Raporu

> ## 📝 ALINTI DÜZELTMESİ (2026-07-25)
> Bu rapordaki 説文解字 alıntıları ilk sürümde **bellekten yazılmıştı**; 漢典 (zdic) üzerinden erişilip birebir doğrulandı ve düzeltildi. **Editoryal karar değişmedi** (分/半/友 = A, 赤 = B). Değişenler:
> - **友:** "「友、同志爲友。从二又相交。」" → **「同志爲友。从二又。相交友也。」** (iki cümle birleştirilmişti — gerçek sapma)
> - 分: 以 → **㠯** · 半: 為 → **爲** (edisyon glif varyantları) · 赤: doğruydu
> Veri kayıtlarında (`DATA.chars`) bu parti için 説文 alıntısı **yok** — düzeltme yalnız bu raporu ilgilendiriyor. Kural artık AUTHORING-03'te kilitli: *çapraz kaynak alıntıları da erişilip birebir doğrulanır; bellekten alıntı yazılmaz.*

> ## ✅ KAPANDI — REVIEWED ONAYLI (Zeynep, 2026-07-25)
> **Karar:** confidence **分=A, 半=A, 友=A, 赤=B**; **dördü de reviewed açıldı** (`5fadb57`, push+SHA doğrulandı). 赤 drafted'da bekletilmedi (ana metin Kanjipedia'ya uygun, alternatif disagreementNote'ta).
> **Mnemonic (Zeynep metodoloji düzeltmesi):** `not_required` **otomatik değil** — dördü de reviewed'da AYRI 4-soru QA'sından geçti, dördü de not_required çıktı. Ölçüt "köken açık" değil, "köken tek başına karakteri yeterince hatırlatıyor mu?". Kural AUTHORING-02'ye kilitlendi.
> **Doğrulama:** kokenOf reviewed→summaryTr görünür (4'ü de) · conf 赤=B, diğerleri=A · mnemonic not_required · sızıntı yok · reviewedAt 2026-07-25 · CONTENT_HASH `a1ad219457890901` · 4 suite yeşil · node --check 0 hata.
>
> *Aşağısı, karar öncesi drafted (`2fbcc43`) hâlinde yapılan QA turunun tarihsel kaydıdır.*

---

**Tarih:** 2026-07-25 · **Drafted commit:** `2fbcc43` · **Durum (QA anında):** 4 kayıt `drafted` (KAPALI) · **reviewed o an VERİLMEMİŞTİ**

İlk hızlandırılmış parti. Yazan turdan ayrı okuma. Amaç: dördünü kaynağa karşı kırmaya çalışmak, ciddi ihtilaf çıkanı partiden ayırmak. **Sonuç: 3 kayıt temiz A; 1 kayıt (赤) küçük azınlık nüansı nedeniyle B. Hiçbiri ayrılmadı.**

---

## 0. B0 — dördü de boş, maliyet sıfır
DATA.chars'tan ölçüldü: 分 半 友 赤'in **hiçbirinde** etymology, pictogram_note, memory_hint_tr veya mnemonic alanı yoktu; components boş. Gizli legacy yok → drafted maliyeti **sıfır**. (Betik mnemonic alanını `pending_review` açtı.)

---

## 1. Kaynak turu — her kayıt ESAS sayfadan + 説文 çapraz (triage sınıfı gerçek kabul edilmedi)

| Kanji | Kanjipedia (ESAS) | 説文解字 (漢典 · doğrulanmış) | Mutabakat |
|---|---|---|---|
| **分** | 0006175200「会意。刀と、八（わける）とから成り、刀で切りわける意を表す。」 | 「別也。从八从刀，刀㠯分別物也。」 | **Tam** — 刀+八, bıçakla bölme |
| **半** | 0005726200「会意。牛（変わった形）と、八（わける）とから成る。大きな牛を二つに分けることから、物の半分の意。」 | 「物中分也。从八从牛。牛爲物大，可以分也。」 | **Tam** — 牛+八, öküzü bölme |
| **友** | 0006843100「会意。又二つから成り、手の下に別の手をそえて、助ける…『とも』の意。」 | 「同志爲友。从二又。相交友也。」 | **Tam** — iki el |
| **赤** | 0003955600「本字は、会意。火（ひ）と、大（おおきい）とから成り、火が盛んに燃える、また、その色の意。」 | 「南方色也。从大从火。」 | Kompozisyon tam (大+火); **大'nin anlamında çatal** |

Üçünde (分 半 友) Kanjipedia + 説文 hem kompozisyon hem rol olarak birebir örtüşüyor.

---

## 2. İddia bazında karar

| Kanji | Oluşum | Bileşen rolleri | Alt iddia çatalı? | Confidence |
|---|---|---|---|---|
| 分 | 会意 ✓ | 刀=bıçak, 八=**bölme** (『わける』, 'sekiz' değil) | Yok | **A** |
| 半 | 会意 ✓ | 牛=öküz (biçimi değişmiş), 八=**bölme** | Yok | **A** |
| 友 | 会意 ✓ | 又+又 = iki el, yardımlaşma | Yok | **A** |
| 赤 | 会意 ✓ | 火=ateş, 大=? | **VAR:** 大 = "büyük" (Kanjipedia) vs "insan" (Shirakawa azınlık) | **B** |

### 赤 bulgusu (QA'nın tek gerçek işi)
Kompozisyon tartışmasız (会意, 大+火, "ateş rengi"). Çatal yalnız 大'nin anlamında: ESAS (Kanjipedia) net "büyük"; azınlık "insan" (ateş üstündeki kişi — 名'deki サイ tadında yeniden yorum). Görünür metin ESAS'a uyuyor. **Zeynep gerekçesi:** "tartışma kompozisyonda değil, 大'nin rolünde → tam B seviyesi; A gereksiz cesur olur." Kompozisyon sağlam → ayrılmadı.

---

## 3. Metin denetimi (çıplak-bilgi, "…anlamı gelişmiştir" kalıbı)

| Kanji | summaryTr | Not |
|---|---|---|
| 分 | "刀 bıçağı, 八 ise bölmeyi gösterir. Bir şeyi bıçakla kesip ayırmaktan 'bölmek' anlamı gelişmiştir." | 八='bölme' metne konmadı, karışma riski düşük |
| 半 | "牛 öküzü, 八 ise bölmeyi gösterir. Büyük bir öküzü ikiye bölmekten 'yarım' anlamı gelişmiştir." | 牛'nün değişmiş biçim notu N5 için konmadı |
| 友 | "İki el (又) üst üste gelir; bir elin diğerine yardım etmesinden 'dost' anlamı gelişmiştir." | Temiz |
| 赤 | "火 ateşi, 大 ise büyüklüğü gösterir. Harlı yanan büyük bir ateşin renginden 'kırmızı' anlamı gelişmiştir." | 大=büyük (ESAS); azınlık disagreementNote'ta |

Ev üslubu tutarlı, 名/男 kalıbıyla aynı.

---

## 4. Editoryal kapı doğrulaması

**Drafted anı:** 4 kayıt `kokenOf`→null (kapalı), mnemonic `pending_review`, disagreementNote sızmıyor, node --check 0 hata, CONTENT_HASH `22c50f1eb47c72d8`, 4 suite yeşil.
**Reviewed sonrası (`5fadb57`):** 4 kayıt görünür (summaryTr), conf 赤=B/diğerleri=A, mnemonic `not_required`, sızıntı yok, reviewedAt 2026-07-25, CONTENT_HASH `a1ad219457890901`, 4 suite yeşil (401/83/sources/9), node --check 0.

---

## 5. QA sonucu → KARAR

| Kanji | Confidence | mnemonic (4-soru) | reviewed |
|---|---|---|---|
| 分 | **A** | not_required | ✓ açıldı |
| 半 | **A** | not_required | ✓ açıldı |
| 友 | **A** | not_required | ✓ açıldı |
| 赤 | **B** | not_required | ✓ açıldı |

mnemonic kararları OTOMATİK DEĞİL — her biri 4-soruyla ayrı verildi (Zeynep düzeltmesi, AUTHORING-02'de kilitli).

---

## 6. Sıradaki (o günkü hâliyle)
- Parti 8 adayı: 土 母 生 行 (象形) · 書 (形声) · 先 (会意). → Parti 8 ve 9'da kapandı.
- Kırmızı kuyruk: 右, 白 (+ draft'ta çatal çıkarsa 今 父 南).
- **Ders:** 赤 bulgusu, "büyük ateş" gibi masum 会意'lerde bile Shirakawa-tarzı 'insan' yeniden okumasının çıkabildiğini gösterdi — hız partilerinde bile 説文 çaprazı ucuz ve değerli. *(Sonradan eklenen ders: o çaprazın **fetch edilerek** yapılması da şart — bkz. yukarıdaki alıntı düzeltmesi.)*
