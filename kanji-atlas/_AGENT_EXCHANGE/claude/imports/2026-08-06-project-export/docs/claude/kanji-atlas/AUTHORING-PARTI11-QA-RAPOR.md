# Parti 11 · 百 千 円 金 — Ayrı QA Turu Raporu

> ## ✅ KAPANDI — REVIEWED ONAYLI (Zeynep, 2026-07-25)
> **Karar:** **百=B · 千=B · 円=A · 金=A**; dördü de reviewed açıldı (`bb24677`, push+SHA doğrulandı). **Mnemonic: dördü de `not_required`** — *"burada active zorlamamak doğru."*
> **百/千 = B notu (Zeynep):** *"Aynı türde çatal paylaşmaları, bunları tek tek A yapmaktan daha dürüst. Ses öğesi rolü esas kaynakta açıkken 説文'un bunu belirtmemesi, görünür metni engellemez ama confidence'ı düşürür."*
> **円 — tek metin revizyonu.** Zeynep: *"Ayrı partiye ayrılmasın; yalnız summaryTr kısaltılsın. Sorun içeriğin yanlış olması değil; tek başına diğer kayıtların ritmini bozması."* Korunan üç bilgi: (1) açıklama eski biçim 圓 üzerinden · (2) 員 ses öğesi · (3) bugünkü biçim sadeleşmiş hâl.
> **Yeni metin (Zeynep'in daha nötr sürümü):** *"Bugünkü 円, eski biçimi 圓'dan gelir. 圓, dıştaki 囗 ile ses veren 員'dan oluşur; bugünkü biçim bunun sadeleşmiş hâlidir."* → **175 → 116 kr**; artık 金 (123) ve 千 (98) ile aynı ritimde. *("buradan エン okunuşu gelişmiştir" ifadesi ev 形声 kalıbıyla birebir örtüşmediği için kullanılmadı.)*
> **Doğrulama:** 4 kayıt Kökeni görünür · Hafıza yok · sızıntı yok · reviewedAt 2026-07-25 · CONTENT_HASH `2be986c7590aa959` · 4 suite yeşil (401/83/sources/9) · node --check 0 hata. Betik güvenceleri revizyon sonrası da geçti (円'de 圓 + "eski biçim" + "sadeleş" + ses ibaresi zorunlu, ayrıca kısalma şartı).
>
> *Aşağısı, karar öncesi drafted (`c50de88`) hâlinde yapılan QA turunun tarihsel kaydıdır.*

---

**Tarih:** 2026-07-25 · **Drafted commit:** `c50de88` · **Durum (QA anında):** 4 kayıt `drafted` (KAPALI) · **reviewed o an VERİLMEMİŞTİ**

Ön-tarama önce yapıldı, parti kesin liste oluştuktan **sonra** yazıldı. Dördü de yönetilebilir çıktı → **bileşim değişmedi.** Zeynep'in üç uyarısının **üçü de gerçek çıktı.**

---

## 0. B0 — dördü de boş
百 千 円 金'de etymology/pictogram_note/memory_hint_tr/mnemonic yok → drafted maliyeti **sıfır**.

## 1. Ön-tarama sonucu: **dördü de 形声**
Triage sınıfları karışıktı (百 "会意/形声", 千 "指事/形声", 円 "形声", 金 "形声/会意"). ESAS okuma dördü için de **形声** dedi.

## 2. Kaynak turu — ESAS + 説文 (hepsi fetch edilerek)

| Kanji | Kanjipedia (ESAS) | 説文解字 (漢典) | Sonuç |
|---|---|---|---|
| **百** | 0005920000「形声。一（数のはじめ）と、**音符白**(ハク)から成る。大きな数、「ひゃく」の意を表す。」 | 「十十也。**从一白**。數，十百爲一貫。相章也。」 | **ÇATAL** — `聲` yok → 会意 okur |
| **千** | 0004026200「形声。十（数の意）と、**音符人**(ジン)→(セン)とから成る。百の十倍の数の「せん」を表す。」 | 「十百也。**从十从人**。此先切」 | **ÇATAL** — `聲` yok → 会意 okur |
| **円** | 0000436000「**旧字は**、形声。囗と、**音符員**(ヱン)とから成る。…**教育用漢字は省略形による。**」 | (圓)「圜全也。**从囗員聲**，讀若員。」 | **BİREBİR** |
| **金** | 0001604700「形声。**意符土**（つち）と、**八（鉱物を示す形）**と、**音符今**(キム、コム)とから成る。土の中にふくまれている鉱物の意を表す。」 | 「…生於土，**从土**；**左右注，象金在土中形**；**今聲**。」 | **BİREBİR** |

**百 + 千 aynı desen:** bileşenler iki kaynakta aynı; ayrılık yalnız **ses bileşeni var mı** sorusunda. 説文'un sayı karakterlerini bileşen bazlı (会意) okuma eğilimi — Parti 4'te 四〜九'un hepsinin 借りて çıkmasıyla aynı aile. → **ikisi de B.**

---

## 3. Zeynep'in üç uyarısı — nasıl karşılandı

**(1) 百/千: "modern görünüme bakarak hikâyeleştirme."**
百'de 白 **"beyaz" değil** — metin açıkça söylüyor ("anlamıyla değil"). 千'de kaynak **十 + 人** diyor, modern biçim 丿+十 görünüyor → "bir insan ve on" anlatısı kurulmadı, 人 **adlandırılmadı** ("üstteki parça", 書/先 çözümü). *Betikte: 百'de "beyaz" yasak.*

**(2) 円: "güncel şeklin her çizgisine tarihsel görev yükleme."** — **tam isabet.**
Kaynak 「**旧字は**…」 ile başlayıp 「**教育用漢字は省略形による**」 ile bitiyor: etimoloji **圓'a ait, 円'a değil.** → Metin bunu baştan söylüyor; 囗'ya kaynakta olmayan anlam glossu **eklenmedi** ("anlam bileşenidir" denip bırakıldı). *Betikte: "eski biçim" ibaresi zorunlu.*

**(3) 金: "altın külçeleri / maden parçaları."** — **durum farklı çıktı.**
Hikâye yaygın **ama aynı zamanda kaynaklı**: Kanjipedia 八'i 「鉱物を示す形」, 説文 「左右注、象金在土中形」 diyor → metne alındı. **Ama sınır çizildi:** "altın"/"külçe" kullanılmadı (kaynaklar 鉱物/金 = maden diyor; 説文 「五色金也」 = genel maden). **八 adlandırılmadı** ("içindeki iki nokta") — "sekiz" çağrışımı yapar ve 分/半'de öğretilen **八 = "bölme"** ile çelişirdi. *Betikte: "altın/külçe" yasak.*

---

## 4. 🔍 Sistematik bulgu — ses yazma kararı
形声 ev kalıbı ("… ve [ses] sesini verir") örtük olarak **verilen sesin karakterin okunuşu olduğunu** vaat eder (時→ジ, 晴→セイ, 聞→ブン hep örtüşür).

| Kanji | Kaynağın sesi | Okunuş | Örtüşme | Karar |
|---|---|---|---|---|
| 千 | (ジン)→**セン** | セン | ✓ | ses yazıldı |
| 円 | 員(**ヱン**) | エン | ✓ | ses yazıldı |
| **百** | 白(**ハク**) | **ヒャク** | ✗ | **ses yazılmadı** |
| **金** | 今(**キム、コム**) | **キン** | ✗ | **ses yazılmadı** |

Örtüşmeyenlerde ses yazılsaydı **yanlış eşleşme** öğretilirdi → **話**'nin kilitli kalıbı kullanıldı (ses verilmeden). **Yeni kural değil**, iki kilitli kalıptan doğru olanı seçmek — ama tekrar edecek bir ayrım. **借りて üslup kararıyla aynı ailede.**

---

## 5. MNEMONIC — dördü de `not_required`
**Önce ölçüm:** karışıklık ortakları uygulamada var mı? → **白 VAR** · **干 · 午 · 全 · 士 · 員 · 囗 YOK** · `confusables` (9 kayıt) bu dördünün hiçbirini içermiyor.

| Kanji | Karar | Gerekçe |
|---|---|---|
| **百** | not_required | 白 uygulamada **var** (T3 geçerdi), **ama** aday kancalar kökenin söylediği bileşimi tekrarlıyor → **T1 / "yalnız tekrar"** |
| **千** | not_required | Ortakları (干, 午) uygulamada **yok** → doğrulanabilir problem kurulamıyor → **T3 düşer** |
| **円** | not_required | Her aday ya **T2** (tarihsel iddia) ya etiketsiz **visual_story** (etiket kodda yok → yazılmaz) |
| **金** | not_required | Köken ("toprağın içindeki maden") somut ve doğrudan bağlı; ek çağrışım tekrar olurdu |

**Yan gözlem (aksiyon değil):** 土'un onaylı active'i örtük olarak **士** ile karşıtlığa dayanıyor ama 士 uygulamada **yok** (ölçüldü). Metin 士'yi adlandırmadığı için tip kendi başına ayakta — hata değil. T3'ün "gerçek problem" ölçütünün uygulama-içi ortak gerektirip gerektirmediği bir gün netleştirilirse bu örnek hatırlanmalı.

---

## 6. Editoryal kapı doğrulaması
**Drafted:** 4 kayıt `kokenOf`→null · mnemonic `pending_review` · sızıntı yok · betik güvenceleri geçti · CONTENT_HASH `594fed4981574a64` · 4 suite yeşil.
**Reviewed (`bb24677`):** 4 kayıt Kökeni görünür · Hafıza yok · sızıntı yok · reviewedAt 2026-07-25 · CONTENT_HASH `2be986c7590aa959` · 4 suite yeşil · node --check 0.

---

## 7. Sonuç

| Kanji | Oluşum | Confidence | mnemonic | summaryTr |
|---|---|---|---|---|
| 百 | 形声 | **B** | not_required | 81 kr (değişmedi) |
| 千 | 形声 | **B** | not_required | 98 kr (değişmedi) |
| 円 | 形声 | **A** | not_required | **116 kr (kısaltıldı, 175'ten)** |
| 金 | 形声 | **A** | not_required | 123 kr (değişmedi) |

---

## 8. Sıradaki
- Kalan boş **14:** 万 年 今 気 父 前 後 西 南 北 白 青 来 飲
- 🔴 Kırmızı kuyruk (ek kanıt gerektiren): **白** · 今 · 父 · 南
- ⏳ **借りて kümesi (万 来 西)** — Parti 4 "sesi …" üslup kararı hâlâ bekliyor. **§4'teki ses-yazma bulgusu bu kararla doğrudan ilgili — ikisi birlikte ele alınabilir.**
- Temiz kalan adaylar: **年 気 前 後 北 青 飲** (7 kayıt → bir 4'lük parti + kalanı)
