# Parti 13 · 年 気 前 後 — Ayrı QA Turu Raporu

**Tarih:** 2026-07-25 · **Drafted commit:** `f8a1af5` (branch `onboarding-b2-gate3`, push+SHA doğrulandı) · **Durum:** 4 kayıt `drafted` (KAPALI) · **reviewed VERİLMEDİ**

Ön-tarama önce yapıldı; parti kesin liste oluştuktan **sonra** yazıldı. Dördü de yönetilebilir çıktı → **bileşim değişmedi.** **Zeynep'in dört uyarısının dördü de gerçek çıktı** ve dördü de makine güvencesiyle enforce edildi.

---

## 0. B0 — dördü de boş
年 気 前 後'da etymology/pictogram_note/memory_hint_tr/mnemonic yok. Karışıklık ortakları (米 气 牛 午 止 舟 刀 彳 糸 夂 毎) uygulamada **YOK** (ölçüldü).

---

## 1. Kaynak turu — ESAS + 説文 (hepsi fetch edilerek)

| Kanji | Kanjipedia (ESAS) | 説文解字 (漢典) | Sonuç |
|---|---|---|---|
| **年** | 0005481100 · İKİ katman: (a)「**甲骨・金文は、象形**。実った穀物の穂を、**人が背負っている**形…みのりの意…転じて…「とし」」 (b)「**本字は、形声**で、意符の禾（穀物）と、音符千(セン)→(ネン)…**常用漢字はその変わった形**」 | 「穀孰也。…年者、取禾一孰也。**从禾。千聲。**」 | 本字 analizi **BİREBİR** → **A** |
| **気** | 0001184900「**旧字は**、形声。意符**米**（こめ）と、音符**气**(キ)…**食物を他人に贈る意**…「餼」の原字。転じて、气の意…**教育用漢字は省略形による**」 | (氣)「**饋客芻米也。从米气聲。**」 | **BİREBİR** → **A** |
| **前** | 0004135400「**会意形声**。**刀**と、**歬**(セン)（**すすむ**…）とから成る。**刀で切りそろえる意**…「剪」の原字。ひいて「すすむ」「まえ」」 | ⚠️ **前 MADDESİ YOK** — 漢典: 「说文解字未收录「前」字头」. Yalnız 歬: 「不行而進謂之歬。**从止在舟上。**」 | **TEK KAYNAK** → **B** |
| **後** | 0002095500「**会意**。彳と、夂（**あし**）と、幺（**つなぐ**）…**足をつながれて前へ進めない**ことから「おくれる」…「あと」「うしろ」」 | 「**遲也。从彳幺夊。**」 + 「**幺者小也。小而行遲**，後可知矣」 | **MEKANİZMA ÇATALI** → **B** |

### 🔍 前 — çapraz kaynak **yok**
説文解字'da **前 maddesi bulunmuyor**; 漢典 açıkça 歬'ye yönlendiriyor. Yani 前 için ESAS kaynak **tek başına** kaldı — oluşum türü (会意形声) ve bileşen rolleri çapraz doğrulanamadı → **B**. (Bu, "説文 farklı diyor" değil, "説文 hiç demiyor" durumu — yeni bir tür tek-kaynaklılık.)

### 🔍 後 — mekanizma çatalı (来 deseninin aynısı)
Bileşenler iki kaynakta **aynı** (彳 · 幺 · 夂/夊). Ama **幺'nun rolü farklı:** Kanjipedia **"bağlamak"** (ayaklar bağlı → ileri gidilemez), 説文 **"küçük"** (küçük ve yavaş → geride). Aynı sonuca iki farklı yoldan → **B**.

---

## 2. ⚠️ Zeynep'in dört uyarısı — test sonuçları

### (1) 年 — "modern biçimden 'insan + tahıl' hikâyesi üretilmesin"
**Uyarı haklı ama nüanslı:** kaynak 「**人が背負っている**」 diyor — **ama yalnız 甲骨・金文 katmanı için.** Bugünkü 年'de ne 禾 ne 人 görünür.
→ Görünür metin **本字'ın 形声 analizine** dayandırıldı; 甲骨 katmanı metne **alınmadı**, `disagreementNote`'ta korunuyor. *Betikte: "sırt/insan/kişi" yasak.*
→ Terim ayrımı da korundu: kaynak burada **変わった形** diyor (省略形 değil) → "sadeleşmiş" değil **"değişmiş"** kullanıldı. *Betikte: 年'de "sadeleş" yasak.*

### (2) 気 — "米'nin rolü yalnız eski biçim üzerinden"
**Tam isabet.** Etimoloji **氣'ye ait**; **bugünkü 気'de 米 YOK** (yerinde 乂 var).
→ Metin *"Bugünkü 気, eski biçimi 氣'nin sadeleşmiş yazımıdır"* diye **başlıyor**; 米 yalnız 氣 çerçevesinde anılıyor. *Betikte: "eski biçim" + "sadeleşmiş" + 氣 zorunlu.*
→ **Anlam kayması metne alındı** çünkü kaynak açıkça veriyor: özgün anlam **"yiyecek vermek"** (氣 = 餼'nin 原字), 転じて 气'nin anlamı. Bu olmadan "pirinç → hava" sıçraması keyfi görünürdü.

### (3) 前 — "ayak / tekne / kesmek / ilerlemek: kaynak hangisini destekliyor?"
**Dördü ayrı ayrı test edildi:**

| Popüler açıklama | Kanjipedia 前 için veriyor mu? | Karar |
|---|---|---|
| **Kesmek** (刀) | **EVET** — 「刀で切りそろえる意」 | ✅ metne alındı |
| **İlerlemek** (歬 = すすむ) | **EVET** | ✅ metne alındı |
| **Ayak** (止) | **HAYIR** — yalnız 歬'nin **içinde**, yalnız 説文'un 歬 maddesinde (「从止在舟上」) | ❌ alınmadı |
| **Tekne** (舟) | **HAYIR** — aynı şekilde | ❌ alınmadı |

Kanjipedia 歬'yi **parçalarına ayırmıyor**. Yaygın "ayak + tekne" anlatısının kaynağı 歬'nin kendi maddesidir, 前'nin değil. *Betikte: "ayak/tekne" yasak.*

### (4) 後 — "'iki kişi geride yürüyor' hikâyesi kurulmasın"
Kaynakta **böyle bir şey yok**. Kanjipedia üç bileşeni (彳 · 夂=ayak · 幺=bağlamak) ve mekanizmayı açıkça veriyor. Üç bileşen de bugünkü 後'de **görünür** olduğu için adlandırıldı (parça dili gerekmedi). *Betikte: "iki kişi" ve 説文'un "küçük" okuması yasak.*

---

## 3. Ses yazma kararı (çatı ilke uygulandı)

| Kanji | Kaynağın sesi | Okunuş | Örtüşme | Karar |
|---|---|---|---|---|
| 年 | 千(セン)→**ネン** | ネン | ✓ | **yazıldı** |
| 気 | 气(**キ**) | キ | ✓ | **yazıldı** |
| **前** | 歬(**セン**) | **ゼン** | ✗ | **yazılmadı** (話 kalıbı) |
| 後 | — (会意) | — | — | konu dışı |

---

## 4. Görünür metinler

| Kanji | summaryTr | Uzunluk |
|---|---|---|
| 年 | "Eski biçimi, tahıl anlamı veren 禾 ile okunuşuyla katkı yapıp ネン sesini veren 千'den oluşur. Tahılın bir kez olgunlaşmasından 'yıl' anlamı gelişmiştir; bugünkü 年 bu biçimin değişmiş hâlidir." | **188 kr** |
| 気 | "Bugünkü 気, eski biçimi 氣'nin sadeleşmiş yazımıdır. 氣, pirinç anlamı veren 米 ile okunuşuyla katkı yapıp キ sesini veren 气'den oluşur; önce 'yiyecek vermek' anlamındaydı, sonradan 'hava, soluk' anlamında kullanılmıştır." | **216 kr** |
| 前 | "刀 bıçak anlamı verir; üstteki parça ise 'ilerlemek' anlamını taşır ve okunuşuyla katkı yapar. Önce 'bıçakla düzgün kesmek' anlamındaydı, buradan 'ön' anlamı gelişmiştir." | 169 kr |
| 後 | "彳 yürümeyi, 夂 ayağı, 幺 ise bağlamayı gösterir. Ayakları bağlanan kişinin ileri gidememesinden 'geride kalmak', oradan da 'arka, sonra' anlamı gelişmiştir." | 154 kr |

### ⚠️ RİTİM UYARISI (円 ile aynı tür karar)
Korpus ölçüldü: **ortalama 122 kr · medyan 116 kr** (49 kayıt). En uzun 8: 気(**216**) · 七(202) · 八(192) · 年(**188**) · 季(186) · 何(176) · 東(170) · 前(169).
→ **気 (216 kr) korpusun EN UZUN metni.** 年 (188) da üst dilimde.
İkisi de uzun çünkü **üç bilgi** taşıyorlar: eski biçim ilişkisi + bileşen rolleri + anlam gelişimi. Aynı durum 円'de yaşandı ve kısaltılmıştı (175→116).
**Seçenekler:** (a) kalsınlar (bilgiler gerçekten gerekli) · (b) kısaltılsınlar — özellikle 気'de "hava, soluk" → "hava" ve "pirinç anlamı veren 米" → "米" sadeleştirmesi ~30 kr kazandırır · (c) yalnız 気 kısaltılsın.

---

## 5. ⭐ MNEMONIC — dördü de `not_required` öneriliyor
Bu turda active hedefi yoktu (Zeynep). Her kayıt ayrı test edildi; **karışıklık ortakları uygulamada yok** (ölçüldü) → biçim kancası için T3 düşer.

| Kanji | Karar | Gerekçe |
|---|---|---|
| **後** | not_required | **Köken anlamı çok iyi taşıyor** — "ayakları bağlı → ileri gidemez → geride" somut ve doğrudan |
| **前** | not_required | "Bıçakla düzgün kesmek → ilerlemek → ön" zinciri kaynaktan geliyor ve metinde zaten açık |
| **年** | not_required | Köken (tahılın olgunlaşma dönemi → yıl) anlama doğrudan bağlanıyor |
| **気** | not_required (yapısal not ↓) | ↓ |

**気 — yapısal gözlem (ödünç kayıtlarındakine benzer):** kökenin anlam zinciri (pirinç → yiyecek vermek → hava) bugünkü "hava/ruh hâli" anlamına **dolaylı** bağlanıyor; köken hafızayı tam taşımıyor. Ama bağlayacak her kanca ya **tarihsel iddia** (T2) ya **uydurma görsel hikâye** (visual_story → UI etiketi yok) olurdu → `not_required`. Politika korundu.

---

## 6. Editoryal kapı doğrulaması
4 kayıt `kokenOf`→null (KAPALI) · mnemonic `pending_review` · `disagreementNote` (説文 çatalı, 甲骨 katmanı, 歬 tartışması) **sızmıyor** · components/component_meanings/pictogram_note/memory_hint_tr dokunulmadı · reviewedAt yok · **dört uyarı güvencesi geçti**.
`node --check` 0 hata · `generate --check` senkron, CONTENT_HASH **`c62d260e109a3007`** · 4 suite: **401/401** · **83/83** · **0 başarısız** · **9/9**.

---

## 7. QA sonucu → Zeynep kararı

| Kanji | Oluşum | Conf önerisi | mnemonic |
|---|---|---|---|
| 年 | 形声 | **A** | not_required |
| 気 | 形声 | **A** | not_required |
| 前 | 会意形声 | **B** (説文'da madde yok → tek kaynak) | not_required |
| 後 | 会意 | **B** (mekanizma çatalı) | not_required |

**DURULDU.** reviewed + reviewedAt verilmedi.

### ▶ Kararlar
1. **Confidence:** 年=A, 気=A, 前=B, 後=B onaylanıyor mu?
2. **Onay:** dördü topluca reviewed açılsın mı?
3. **Ritim:** 気 (216 kr, korpusun en uzunu) ve 年 (188 kr) kısaltılsın mı? (円 emsali: 175→116.)
4. **Mnemonic:** dördü de not_required kabul mü?
5. **(Bilgi)** 年'in 甲骨 katmanı (tahıl demetini sırtında taşıyan insan) görünür metne **alınmadı** — kaynakta var ama modern biçimde görünmüyor. Bu kararı onaylıyor musun, yoksa kısa bir cümleyle metne girmesini ister misin?

---

## 8. Sıradaki
- Kalan boş **7:** 今 父 南 北 白 青 飲
- **Temiz üretim adayları (3):** 北 青 飲
- 🔴 **Kırmızı kuyruk (4):** 白 · 今 · 父 · 南
- Bu parti kapanınca **Authoring PHASE 2'nin sonuna** çok yaklaşılmış olacak: yalnız 3 temiz + 4 kırmızı kayıt kalıyor.
