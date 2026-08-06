# Parti 8 · 土 母 生 行 — Ayrı QA Turu Raporu

> ## 📝 ALINTI DÜZELTMESİ (2026-07-25)
> Bu rapordaki 説文解字 alıntıları ilk sürümde **bellekten yazılmıştı**; 漢典 (zdic) üzerinden erişilip birebir doğrulandı. **Editoryal karar değişmedi** (土=B, 母=A, 生=A, 行=B). Değişen:
> - **土:** "「土、地之吐生萬物者也。二象地之下、地之中。物出形也。」" → **「地之吐生物者也。二象地之下、地之中，丨，物出形也。」** (metinde olmayan 萬 eklenmiş, olan 丨 atlanmıştı — gerçek sapma)
> - 母 · 生 · 行: doğruydu (yalnız lemma öneki/noktalama farkı).
> Aynı hata **DATA kaydında da** vardı ve orada da düzeltildi (`920e5fd`, yalnız `disagreementNote`; kullanıcıya görünen hiçbir şey değişmedi). 土'nun **B gerekçesi geçerliliğini korudu**: 説文'ın 土'yu yığın değil katman/çıkış diyagramı olarak okuduğu tespiti doğruydu, yalnız alıntının harfi yanlıştı. Kural artık AUTHORING-03'te kilitli.

> ## ✅ KAPANDI — REVIEWED ONAYLI (Zeynep, 2026-07-25)
> **Karar:** confidence **土=B, 母=A, 生=A, 行=B**; **dördü de reviewed açıldı** (`1857b42`, push+SHA doğrulandı).
> **MNEMONIC — ilk kez gerçek `active` içerik (eşik geçildi):**
> - 土 = **active** · "Toprak aşağıda yayılır: 土'ta alttaki çizgi daha uzundur." (土/士 ayrımı)
> - 行 = **active** · "Kavşakta bir yol seç: git ve yap." (kavşak→gitmek→yapmak köprüsü)
> - 母 = not_required · 生 = not_required
> Kararlar 4-soruyla, otomatik değil. Active metinler **ayrı Hafıza katmanı** (kod: `mnemonicOf`→'記' kartı), tarihsel köken açıklaması değil. İkisi de visual_story DEĞİL → etiket gerekmedi.
> **Doğrulama:** DOM'da Kökeni/Hafıza ayrımı — 土/行'da her ikisi de var ve farklı; 母/生'de yalnız Kökeni. Sızıntı yok · reviewedAt 2026-07-25 · CONTENT_HASH `b091ca10f6f452ae` · 4 suite yeşil · node --check 0 hata.
>
> *Aşağısı, karar öncesi drafted (`2398dd8`) hâlinde yapılan QA turunun tarihsel kaydıdır.*

---

**Tarih:** 2026-07-25 · **Drafted commit:** `2398dd8` · **Durum (QA anında):** 4 kayıt `drafted` (KAPALI) · **reviewed o an VERİLMEMİŞTİ**

Yazan turdan ayrı okuma. Zeynep talimatı: 象形 triage etiketi ön hüküm değil; her kayıt için oluşum türü + resmedilen nesne + güncel anlama geçiş ayrı doğrulandı. **Sonuç: 母 象形 değil `指事`. İki kayıt (土, 行) nesne/oluşum çatalı → B. İkisi (母, 生) temiz A. Hiçbiri ayrılmadı.**

---

## 0. B0 — dördü de boş, maliyet sıfır
DATA.chars'tan ölçüldü: 土 母 生 行'in hiçbirinde etymology/pictogram_note/memory_hint_tr/mnemonic yok → drafted maliyeti **sıfır**. mnemonic `pending_review` açıldı.

---

## 1. ⚠️ TRIAGE ÖN HÜKÜM DEĞİLDİR — kanıt: 母
Risk taraması dördünü de **象形** saymıştı. ESAS okuma düzeltti: **母 = `指事`**「女に、乳房を示す点を二つ加えて…」 — mevcut karaktere (女) işaret ekler, tek başına piktogram değil. Dört sayfa ayrı okunmasaydı 母 yanlış sınıfla açılacaktı.

---

## 2. Kayıt bazında karar (oluşum · nesne · anlam geçişi ayrı)

| Kanji | Oluşum | Resmedilen nesne / yapı | Anlam geçişi | Çatal? | Conf |
|---|---|---|---|---|---|
| **土** | 象形 | toprak tanrısına adanmış **toprak yığını (sunak)** | yığın → toprak | **VAR (nesne)** | **B** |
| **母** | **指事** | 女 + **iki nokta = göğüsler** | emziren anne → anne | Yok | **A** |
| **生** | 象形 | **topraktan biten bitki** | biten bitki → doğmak | Yok | **A** |
| **行** | 象形 | dört yöne **kavşak / işlek yol** | yol → **gitmek** → **yapmak** | **VAR (oluşum)** | **B** |

### 土 çatalı (nesne)
Kanjipedia (ESAS): toprak yığını/sunak 象形. 説文解字 (漢典 · doğrulanmış):「地之吐生物者也。二象地之下、地之中，丨，物出形也。」 → 土'yu yığın değil **toprak katmanları / çıkış** diyagramı (指事'ye yakın) okur; Shirakawa ekolü **kutsal direk** (社 bağı) okur. Görünür metin ESAS'a uydu → **B**. (土/士 görsel karışması ayrı — §4 mnemonic.)

### 行 çatalı (oluşum) + iki iddia
İki iddia ayrı: (1) biçim = kavşak (象形), (2) anlam = yol→gitmek→yapmak. İkisi de Kanjipedia'da açık. Çatal: 説文解字 (doğrulanmış)「人之步趨也。从彳从亍。」 会意 (adımlar) okur; modern uzlaşı (甲骨) kavşak 象形 → **B**.

### 母, 生 — temiz
- 母: 説文 (doğrulanmış)「牧也。从女，象褱子形。一曰象乳子也。」 uyumlu. 女'den fark kaynaktan. **A**.
- 生: 説文 (doğrulanmış)「進也。象艸木生出土上。」 birebir. Çizgi-ayrıntısı verilmedi (Zeynep uyarısı). **A**.

---

## 3. Metin denetimi (görünür summaryTr)

| Kanji | summaryTr |
|---|---|
| 土 | "Toprak tanrısı için yapılan bir toprak yığınının resmidir. Buradan 'toprak, yer' anlamı gelişmiştir." |
| 母 | "女 kadın işaretine, göğüsleri gösteren iki nokta eklenmiştir. Çocuğunu emziren anneden 'anne' anlamı doğmuştur." |
| 生 | "Topraktan yeni biten bir bitkinin resmidir. Buradan 'doğmak, yaşamak' anlamı gelişmiştir." |
| 行 | "Dört yöne uzanan bir kavşağın resmidir; buradan 'işlek yol' anlamı doğmuştur. Yoldan 'gitmek', oradan da 'yapmak' anlamı gelişmiştir." |

Ton tutarlı; teknik terim (象形/指事) görünür metinde yok.

---

## 4. ⭐ MNEMONIC — karar (Zeynep, reviewed'da): active gerçekten kullanıldı

| Kanji | Karar | Metin / gerekçe |
|---|---|---|
| 生 | not_required | Biten bitki imgesi tek başına yeterli |
| 母 | not_required | "女 + göğüs noktaları" imgesi güçlü |
| 土 | **active** | "Toprak aşağıda yayılır: 土'ta alttaki çizgi daha uzundur." — köken tekrarı değil, 土/士 ayrımını çözer |
| 行 | **active** | "Kavşakta bir yol seç: git ve yap." — "kavşak→yapmak" geçişini bağlar |

not_required OTOMATİK DEĞİL — dördü 4-soruyla ayrı değerlendirildi. Active'ler AYRI Hafıza katmanı.

---

## 5. Editoryal kapı doğrulaması (drafted anı → reviewed sonrası)
**Drafted:** 4 kayıt kokenOf→null, mnemonic pending_review, sızıntı yok, CONTENT_HASH `d8d3b8adf0329709`, 4 suite yeşil.
**Reviewed (`1857b42`):** 4 kayıt görünür; 土/行 Hafıza kartı da var, Köken≠Hafıza; 母/生 yalnız Kökeni; sızıntı yok; CONTENT_HASH `b091ca10f6f452ae`; 4 suite yeşil (401/83/sources/9); node --check 0.

---

## 6. QA sonucu → KARAR

| Kanji | Oluşum | Confidence | mnemonic |
|---|---|---|---|
| 土 | 象形 | **B** | active |
| 母 | 指事 | **A** | not_required |
| 生 | 象形 | **A** | not_required |
| 行 | 象形 | **B** | active |

Dördü reviewed açıldı (`1857b42`).

---

## 7. Sıradaki (o günkü hâliyle)
- Kalan yeşiller: 書 (形声) · 先 (会意) Parti 9 çekirdeği. → Parti 9'da 食 ve 外 ile kapandı.
- Kırmızı kuyruk: 右, 白 (+ draft'ta çatal çıkarsa 今 父 南).
- **Ders:** Parti 8 "temiz 象形 dörtlüsü" beklentisini kırdı — 母 指事, 土/行 B. "Triage ön hüküm değil, her sayfa ayrı okunur" kuralı olmasa yanlış açılırdı. Ayrıca mnemonic sistemi ilk gerçek `active` içeriğini üretti (土, 行) — eşik geçildi.
