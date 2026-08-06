# Parti 14 · 北 青 飲 — Ayrı QA Turu Raporu (son temiz üçlü)

**Tarih:** 2026-07-25 · **Drafted commit:** `3964b20` (branch `onboarding-b2-gate3`, push+SHA doğrulandı) · **Durum:** 3 kayıt `drafted` (KAPALI) · **reviewed VERİLMEDİ**

Ön-tarama önce yapıldı; parti kesin liste oluştuktan **sonra** yazıldı. Üçü de yönetilebilir → bileşim değişmedi. **Bu parti kapanınca PHASE 2'de yalnız kırmızı kuyruk kalır.**

---

## 0. B0 — üçü de boş
北 青 飲'de etymology/pictogram_note/memory_hint_tr/mnemonic yok. Karışıklık ortakları: 比 化 丹 井 欠 飯 背 **YOK**; 生 食 南 VAR (ama gerçek karışıklık ortağı değiller).

---

## 1. Kaynak turu — ESAS + 説文 (hepsi fetch edilerek)

| Kanji | Kanjipedia (ESAS) | 説文解字 (漢典) | Sonuç |
|---|---|---|---|
| **北** | 0006467400「象形。たがいに背を向け合っている**ふたりのさま**にかたどり、**そむく**意を表す。「背」の原字。**ひいて**、太陽がある南を向いたときに、背の向く方角、「きた」の意に用いる。」 | 「乖也。**从二人相背**。」 | Resim+özgün anlam **BİREBİR**; 'kuzey' **açıklanmıyor** → **B** |
| **青** | 0003865600「**旧字は、会意形声**。**丹**（井の中からとる染料）と、**生**(セイ)（…変わった形。草が生えるさま）とから成り、草色をした染料…**教育用漢字は俗字による**」 | 「東方色也。木生火，**从生丹**。丹青之信言象然。」 | Bileşenler aynı; **iki çatal** → **B** |
| **飲** | 0000297300「**本字は、会意形声**。欠（口を大きくあける）と、酓(イム、オム)（酒をのむ）…**のち、酓を食に改めて、会意の字とした**」 | (**㱃** başlığı altında)「**歠也。从欠酓聲。**」 | 本字 analizi **BİREBİR** → **A** |

---

## 2. 🔍 Üç bulgu

### (1) **北 bir 借りて kaydı DEĞİL** — beşinci triage düzeltmesi
Beklenti "北 kuzey için ödünç alındı" idi. Kanjipedia **借りて kelimesini kullanmıyor**; 「ひいて」 ile **gerçek bir anlam bağı** veriyor: *güneşin bulunduğu güneye dönüldüğünde sırtın baktığı yön = kuzey.*
→ **西 ile aynı sınıf.** Ödünç kalıbı değil, anlam-bağı kalıbı kullanıldı. *Betikte: 北'de "ödünç" yasak, "anlamı gelişmiştir" zorunlu.*
*(Triage'ın ön hüküm olmadığının beşinci kanıtı: 母 指事 · 左 会意形声 · 会意形声 zaten vardı · 西 ödünç değil · şimdi 北.)*

**Neden yine de B?** Resim (sırt sırta iki kişi) ve özgün anlam (sırt çevirmek) 説文'da **birebir** var. **Ama 説文 'kuzey' anlamının nasıl doğduğunu hiç açıklamıyor** (yalnız 引伸 olarak askerî geri çekilmeye değinir). Güneye dönme gerekçesi **yalnız Kanjipedia'da** ve metnin taşıyıcı iddiası o → en zayıf halka → **B**. (右'daki desenin aynısı.)

### (2) **青 — triage sorusu çözüldü: bileşen 丹, 井 değil**
Triage "alt bileşende 丹 mı 井 mi" diye işaretlemişti. Kaynak net: bileşen **丹**'dır; **井 yalnız 丹'ın ne olduğunu anlatan açıklamanın içinde** geçer (「井の中からとる染料」 = kuyudan çıkarılan boya). Ayrı bir bileşen **değil**. *Betikte: 青'de 井 yasak.*

**İki çatal → B:** (a) 説文 ne 生'i ne 丹'ı `聲` işaretler → saf **会意** okur; Kanjipedia 生'i hem anlam hem **ses** sayar (**会意形声**). (b) **Anlam gerekçesi farklı:** Kanjipedia maddi (ot renginde boya); 説文 **五行 kozmolojisi** (doğunun rengi, ağaç ateşi doğurur).

### (3) **飲 — oluşum türü kararı: 会意 (会意形声 değil)**
Kanjipedia 本字'ı 会意形声 etiketler **ama** açıkça 「のち、酓を食に改めて、**会意の字とした**」 der. Bugünkü 飲 = 食 + 欠 ve kaynak bu biçimi **会意** sayar → kayıt **会意**.
**年'den ilkesel fark:** 年'de modern biçim 本字'ın *değişmiş hâlidir* — yapı korunur → 形声 alındı. 飲'de yapı **gerçekten değişti** (bileşen değiştirildi) → 会意 alındı. Tutarlı, keyfî değil.
**食 gloss edilmedi:** kaynak 酓'nin 食 ile değiştirildiğini söylüyor ama 食'in bu karakterdeki işlevini **açıklamıyor** → "yiyecek anlamı verir" demek kaynağın ötesine geçmek olurdu. 食 adlandırıldı, anlamı yazılmadı (kullanıcı 食 kaydına gidebilir — o kayıt reviewed).

---

## 3. Ses yazma kararı (çatı ilke)
| Kanji | Kaynağın sesi | Okunuş | Karar |
|---|---|---|---|
| 北 | — (象形) | — | konu dışı |
| 青 | 生(**セイ**) | セイ ✓ | **yazıldı** |
| 飲 | 酓(イム、オム) | イン ✗ | **yazılmadı** (+ kayıt 会意, ses bileşeni yok) |

---

## 4. Görünür metinler

| Kanji | summaryTr | Uzunluk |
|---|---|---|
| 北 | "Birbirine sırtını dönmüş iki kişinin resmidir; önce 'sırt çevirmek' anlamındaydı. Güneşin bulunduğu güneye dönüldüğünde sırtın baktığı yön olduğu için 'kuzey' anlamı gelişmiştir." | 178 kr |
| 青 | "Eski biçimi, kuyudan çıkarılan bir boyayı gösteren 丹 ile otların bitişini gösteren ve セイ sesini veren 生'den oluşur. Ot rengindeki bu boyadan 'mavi, yeşil' anlamı gelişmiştir; bugünkü 青 eski biçimin **yaygınlaşmış** hâlidir." | **219 kr** |
| 飲 | "Eski biçimi, ağzını iyice açan bir kişiyi gösteren 欠 ile 'içki içmek' anlamı taşıyan bir parçadan oluşur; 'içmek' anlamı buradan gelir. Sonradan o parça 食 ile değiştirilmiş, bugünkü 飲 böyle oluşmuştur." | 201 kr |

> **Not:** 北'deki "iki kişi" ifadesi **kaynağın kendi ifadesidir** (「ふたりのさま」) — 後'de yasakladığımız "iki kişi" hikâyesiyle karıştırılmamalı; orada kaynakta **yoktu**, burada **var**.

### ⚠️ RİTİM UYARISI
Korpus: ortalama **121** · medyan **116** kr. Bu üçü **178 / 219 / 201** — hepsi üst dilimde, **青 (219) korpusun en uzunu olur** (mevcut rekor 七 = 202).
Sebep yapısal: üçü de **iki katman** taşıyor (eski/özgün biçim + anlam gelişimi). 円 (175→116), 年 (188→164), 気 (216→174) emsalleri var.
**Seçenekler:** (a) kalsınlar · (b) üçü de kısaltılsın · (c) yalnız 青 kısaltılsın.

---

## 5. ⚠️ TERMİNOLOJİ — onay bekleyen yeni durum (青)
Kaynak bugünkü 青 için **「俗字」** diyor. Bu, mevcut iki sabitten **farklı üçüncü bir kategori**:

| Japonca | Ne demek | Türkçe sabit | Kayıtlar |
|---|---|---|---|
| 省略形 · 略字 | kısaltılarak sadeleştirilmiş biçim | **"sadeleşmiş"** | 円, 気, 万 |
| 変わった形 | biçimi değişmiş | **"değişmiş"** | 年 |
| **俗字** | halk arasında yerleşip standart olmuş varyant | **"yaygınlaşmış"** *(taslak — ONAY BEKLİYOR)* | 青 |

Taslakta **"yaygınlaşmış hâli"** kullanıldı. Onaylıyor musun, yoksa başka bir karşılık mı tercih edersin? *(Betikte: 青'de "sadeleşmiş"/"değişmiş hâli" yasak — terim ayrımı makine düzeyinde korunuyor.)*

---

## 6. ⭐ MNEMONIC — üçü de `not_required` öneriliyor
Karışıklık ortakları uygulamada **yok** (ölçüldü) → biçim kancası için T3 düşer.

| Kanji | Karar | Gerekçe |
|---|---|---|
| **北** | not_required | Köken **çok güçlü taşıyor** — "sırt sırta iki kişi → sırtın baktığı yön" somut ve görsel; ayrı kanca tekrar olurdu |
| **青** | not_required | Köken eski biçim üzerinden; bağlayacak her ek kanca ya tarihsel iddia (T2) ya uydurma görsel hikâye olurdu |
| **飲** | not_required | 食 + 欠 bugünkü biçimde görünür ve "ağzını açan kişi + yeme-içme" doğrudan bağlanıyor |

---

## 7. Editoryal kapı doğrulaması
3 kayıt `kokenOf`→null (KAPALI) · mnemonic `pending_review` · `disagreementNote` (説文 çatalları, 五行, 俗字 tartışması) **sızmıyor** · components/component_meanings/pictogram_note/memory_hint_tr dokunulmadı · reviewedAt yok · parti güvenceleri geçti (北'de "ödünç" yok · 青'de 井 yok · 飲'de ses yok).
`node --check` 0 hata · `generate --check` senkron, CONTENT_HASH **`9e5047d7723312c9`** · 4 suite: **401/401** · **83/83** · **0 başarısız** · **9/9**.

---

## 8. Kayıt dışı bulgu — kategori tutarsızlığı (uyumlama listesine)
Ölçüldü:

| Karakterler | Kategori |
|---|---|
| 北 南 西 東 | **"Yönler"** |
| 左 右 前 後 上 下 中 | **"Yön ve konum"** |
| 外 | **"Günlük yaşam"** (!) |

İki ayrı yön kategorisi var ve pusula yönleri sol/sağ/ön/arka'dan ayrı düşüyor; 外 ise büsbütün başka kategoride. Bu **kullanıcıya görünen** bir gruplama (kategori bazlı listeler). **Köken işi değil, veri hijyeni** → uyumlama listesine eklendi, **şimdi dokunulmadı**.

---

## 9. QA sonucu → Zeynep kararı

| Kanji | Oluşum | Conf önerisi | mnemonic |
|---|---|---|---|
| 北 | 象形 | **B** ('kuzey' mekanizması tek kaynaklı) | not_required |
| 青 | 会意形声 | **B** (iki çatal) | not_required |
| 飲 | 会意 | **A** | not_required |

**DURULDU.** reviewed + reviewedAt verilmedi.

### ▶ Kararlar
1. **Confidence:** 北=B, 青=B, 飲=A onaylanıyor mu?
2. **Onay:** üçü topluca reviewed açılsın mı?
3. **Terminoloji:** 俗字 için **"yaygınlaşmış"** kabul mü? (üçüncü sabit)
4. **Ritim:** 青 (219 kr) ve/veya diğerleri kısaltılsın mı?
5. **Mnemonic:** üçü de not_required kabul mü?

---

## 10. Sıradaki — **PHASE 2'nin son aşaması**
Bu parti kapanınca **boş kayıt kalmıyor**; yalnız 🔴 **kırmızı kuyruk** kalır:
**白 · 今 · 父 · 南** — "ek kanıt gerektiren" kayıtlar, her biri ayrı tur.
Sonra: **九**'un durumu (drafted, conf C — açılmıyor) ve **Editoryal Harmonizasyon** (11 kalem).
