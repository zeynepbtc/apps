# AUTHORING · PARTİ 15 QA RAPORU — 父 (KIRMIZI KUYRUK TURU 1)

**KAPANDI.** Karar: **SEÇENEK (B)** · confidence **B → A** · `qaStatus: reviewed` · mnemonic `not_required`.
Commit: `1bcd998` (drafted) → **`b76f358`** (reviewed). Remote SHA doğrulandı. CONTENT_HASH `4ef1e054d7ac746a`.

## YAYIMLANAN METİN

> **"Elinde bir alet tutan kişiyi gösterir. Aileyi yöneten ve elinde otorite bulunduran kişiden 'baba' anlamı gelişmiştir."** (117 kr · korpus ort. 124 / medyan 120)

---

## 1. B0 — ölçüm (iddia değil)

| Ölçülen | Sonuç |
|---|---|
| 父 kaydı | `chichi` · **tamamen boş** (etymology yok, `pictogram_note` "", `memory_hint_tr` "", `components` []) |
| İlgili kayıtlar uygulamada | 母 **VAR** · 又 · 斧 · 杖 · 交 · 文 **YOK** |
| Korpus (yayınlanmış metinler) | 51 → **52** · ort. 124 · medyan 120 · A:37 / B:15 |

---

## 2. Dört kaynak okundu — hepsi FETCH edildi (bellekten alıntı yok)

| # | Kaynak | Oluşum | Eldeki nesne | Otorite gerekçesi |
|---|---|---|---|---|
| 1 | **ESAS** Kanjipedia 0006017800 | 会意 | **balta** (おの) | 武器を手に持っている → 一族をとりしまる者 |
| 2 | 説文解字 (漢典) | 从又舉杖 | **değnek** (杖) | 家長率教者 — yöneten **ve öğreten** |
| 3 | Wiktionary (glyph origin) | 象形 | **taş balta** | (yalnız betimliyor) |
| 4 | OKJiten kanji27 | 象形 | **kamçı** (ムチ) | 一族の統率者 |

ESAS tam metni:
> 「会意。[手]（手）と、丨（**おの**）とから成る。「**斧(フ)」の原字**。**武器**を手に持っているさまにより、**一族をとりしまる者**、ひいて「ちち」の意を表す。」

説文 tam metni:
> 「矩也。家長率教者。**从又舉杖**。」

---

## 3. İddia bazında durum — kararın dayandığı tablo

| | İddia | Kaynak durumu | Sınıf | Yayımlandı mı? |
|---|---|---|---|---|
| **(a)** | Bir **el** ve elin tuttuğu bir **nesne** var | Dördü de ortak | **A** | ✅ |
| **(b)** | Nesneyi tutan kişi **aileyi yöneten** kişidir | Kanjipedia · 説文 · OKJiten açıkça | **A/B** | ✅ |
| **(c)** | Oradan **"baba"** anlamı | Üç kaynak açıkça | **A/B** | ✅ |
| **(d)** | **Nesne balta mı?** | **ÇATAL:** balta (Kanjipedia + Wiktionary) ↔ değnek/kamçı (説文 + OKJiten) | **C** | ❌ **yayın dışı** |
| **(e)** | **Oluşum türü** | **ÇATAL:** 会意 ↔ 象形 | **C** | ❌ (zaten hiç render edilmez) |

Zeynep'in uyguladığı sıra: *"el ✅ · elde bir nesne ✅ · otorite ✅ · baba ✅ · balta mı? ❌ — **işte tam burada durmak gerekiyor.**"*

---

## 4. Karar gerekçesi (Zeynep)

**Neden (A) değil:** *"Burada 'balta' yazmak kullanıcı açısından hiçbir şeyi çözmüyor. Ama ileride biri 'neden balta?' diye sorduğunda cevap artık 'çünkü Kanjipedia öyle diyor' olmuyor; 'aslında kaynaklar burada tam uzlaşmıyor' oluyor. O zaman kullanıcıya baştan kesinmiş gibi söylemek gereksiz."*

**Neden (C) değil:** *"Bu kayıt 九 değil. 九'da tartışmalı kısmı çıkarınca karakterin kökeni çökmüştü. Burada el, alet, otorite, baba zinciri hâlâ tamamen ayakta. Bilgi eksilmiyor; yalnız tartışmalı ayrıntıyı yayın dışına alıyorsunuz."*

**Dil dokunuşu:** "elinde **güç** bulunduran" → "elinde **otorite** bulunduran" — *"'güç' Türkçede burada biraz soyut kalıyor."*

---

## 5. ⭐ Confidence B → A — yeni ve kalıcı bir netleşme

Taslak **B** idi çünkü görünür metin tartışmalı ayrıntıyı taşıyordu. (B) uygulandığında **yayımlanan her iddia A/A-B sınıfına** düşüyor.

> Zeynep: *"Confidence artık görünür metnin doğruluğunu temsil ediyor. Kullanıcıya gösterilen hiçbir cümle tartışmalı değil. Kırmızı kuyruk nedeni hâlâ mevcut, çünkü ayrıntı tartışmalı — ama o ayrıntıyı yayınlamıyorsunuz. Dolayısıyla yayınlanan içeriğin güvenilirliği yükseliyor."*

**Kilitlenen tanım:** `confidence` = **yayımlanan metnin** kaynak desteği; araştırmanın tümünün kesinliği değil. AUTHORING-03'e işlendi.

---

## 6. ⭐⭐ Bu turun açtığı EMSAL (AUTHORING-03'e kilitlendi)

İlk kez, **ESAS kaynağın verdiği bir ayrıntı**, çapraz kaynaklarla uzlaşmadığı ve **çıkarılabilir** olduğu için görünür metne alınmadı.

Bu, 行/来/土 deseninden **ayrılma değil, sınırının çizilmesi**:

| Ayrışan şey | Ne yapılır | Örnek |
|---|---|---|
| Kaydın **OMURGASI** | ESAS izlenir, confidence **B**, çatal notta | 行 · 来 · 土 |
| **ÇIKARILABİLİR AYRINTI** | Ayrıntı yayın dışı, çekirdek yayımlanır | **父** |
| Çıkarınca **hiçbir şey kalmıyor** | Yayınlanmaz (`drafted`) | 九 |

Ölçüt: *"Bu ayrıntı metnin anlaşılması için zorunlu mu?"* Bilgi kaybolmuyor — dört kaynak, çatal ve gerekçe `disagreementNote`'ta (2.031 → ~3.400 kr) duruyor. Bu, **"yayımlanan iddia" ile "araştırma notu"nun ayrılmasıdır.**

---

## 7. Mnemonic — 4-soru yazılı uygulandı

| Test | Sonuç |
|---|---|
| T1 · Köken bugünkü anlamı taşıyor mu? | **EVET** — el + alet + otorite → baba doğrudan |
| T2 · Tek okumada canlanıyor mu? | **EVET** |
| T3 · Biçim kancası gerekli mi? | **HAYIR** — karışıklık ortakları 又 · 交 · 文 uygulamada **YOK** (ölçüldü); çizim öğretimi Stroke Coach'un işi |
| T4 · Ayrı bir katman ekliyor mu? | **HAYIR** — tekrar olurdu |

→ **`not_required`** (otomatik değil, testle).

---

## 8. Doğrulama izi

`generate_data_chars.js --check` senkron ✓ · CONTENT_HASH `4ef1e054d7ac746a` · scaffold **401/401** · legacy_derived **83/83** · sources **0 fail** · durable_backend **9/9** · `kokenOf(父)` → yeni metin ✓ · `mnemonicOf(父)` → `""` ✓ · legacy alanlar (`components`, `component_meanings`, `pictogram_note`, `memory_hint_tr`) dokunulmadı ✓ · `formationType` 会意 değişmedi (render edilmiyor) ✓ · betik ikinci kez koşmayı reddediyor ✓

---

## 9. Kalan

Kırmızı kuyruk: ~~父~~ → **南** → **今** → **白**. Sonra 九 kararı → editoryal uyumlama (11 madde) → Content Freeze v1.0.
