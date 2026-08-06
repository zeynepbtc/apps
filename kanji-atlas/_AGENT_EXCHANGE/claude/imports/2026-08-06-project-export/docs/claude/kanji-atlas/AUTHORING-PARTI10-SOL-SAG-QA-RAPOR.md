# Parti 10 · 左 + 右 — Eşli Tur QA Raporu

> ## ✅ KAPANDI — REVIEWED ONAYLI (Zeynep, 2026-07-25)
> **Karar:** **左 = A · 右 = B**; ikisi de reviewed açıldı (`54ee218`, push+SHA doğrulandı).
> **右 = B gerekçesi (Zeynep):** *"Sebep 'yardım etmek' kısmı değil. Sebep: modern kaynakta 'sağ' anlamına geçiş açıklanıyor, fakat bunun tarihsel gelişimi bütün kaynaklarda aynı netlikte değil; ayrıca 口'nun rolü üzerine farklı okuma ihtimali mevcut. Yani B burada 'kaynak çatışması var' anlamında değil, **editoryal ihtiyat** anlamında kullanılıyor."*
> **Mnemonic: ikisi de `not_required`.** Çizim-sırası adayı 4 testi teknik olarak geçiyordu ama **görev ayrımı** gerekçesiyle reddedildi — Hafıza katmanı anlam/ayırt etme kancasıdır, yazım öğretimi çizim modülünün (Stroke Coach) işidir. Kural AUTHORING-02'ye **T3 kapsam sınırı** olarak işlendi.
> **右 KIRMIZI KUYRUKTAN ÇIKARILDI.** Zeynep: *"Kırmızı kuyruğun amacı 'zor karakter' değil, 'ek araştırma gerektiren karakter' idi. Araştırma yapıldı, risk doğrulandı, kaynak okundu, karar verildi. Görevini tamamladı."* → Kuyruğun tanımı netleşti: **yayınlanamaz karakterler değil, ek kanıt gerektiren karakterler.**
> **名 konusu:** gerçek hata değil, editoryal dil tutarlılığı → **harmonizasyon turuna** bırakıldı, commit açılmadı.
> **Doğrulama:** ikisi Kökeni görünür, Hafıza yok, "ağız" geçmiyor, sızıntı yok · reviewedAt 2026-07-25 · CONTENT_HASH `af58bd611c579de8` · 4 suite yeşil (401/83/sources/9) · node --check 0 hata.
>
> *Aşağısı, karar öncesi drafted (`a90801c`) hâlinde yapılan QA turunun tarihsel kaydıdır.*

---

**Tarih:** 2026-07-25 · **Drafted commit:** `a90801c` · **Durum (QA anında):** 2 kayıt `drafted` (KAPALI) · **reviewed o an VERİLMEMİŞTİ**

Zeynep tur sırası uygulandı: (1) 左 bağımsız · (2) 右 bağımsız · (3) her biri için oluşum/ses/anlam ayrı karar · (4) **en son** yalnız tutarlılık için yan yana karşılaştırma · (5) mnemonic QA. **Karşılaştırma kaynak okumasının yerine geçmedi.**

> **Turun en önemli bulgusu:** 右'nun kökeninde **"sağ el" YOK.** İlk anlam "yardım etmek", "sağ" anlamı **sonradan** 又/佑'dan ayrışmak için gelişmiş. Eşli tur olmasa muhtemelen fark edilmezdi.

---

## 0. B0 — ikisi de boş
左 ve 右'da etymology/pictogram_note/memory_hint_tr/mnemonic yok, components ve related_characters boş → drafted maliyeti **sıfır**.

---

## 1. 左 — bağımsız kaynak turu

| Kaynak | Metin |
|---|---|
| **Kanjipedia 0002452500** (ESAS) | 「**会意形声**。工と、𠂇(サ)（＝ナ。ひだり手）とから成り、工具を取るひだり手、ひいて、ひだり側の意を表す。また、左手は右手の働きを助けるので、「たすける」意に用いる。」 |
| **説文解字** (漢典, fetch edildi) | 「手相左助也。从𠂇、工。」 |

| Boyut | Karar |
|---|---|
| **Oluşum** | 会意形声. 説文 「从𠂇、工」 der, 聲 işaretlemez. **Çelişki değil, ek katman** (会意形声 ⊃ 会意); bileşenler birebir aynı |
| **Anlam öğesi** | 工 = 工具 (alet) |
| **Ses öğesi** | 𠂇 (サ) = ひだり手 — hem anlam hem ses (会意形声'nin tanımı) |
| **Anlam yolu** | Aleti tutan sol el → sol taraf. 説文'un tanımında da 'sol' var (手相**左**助也), türetme açıklanmıyor ama çelişilmiyor |

**Confidence: A.** **口 yok → サイ maruziyeti yok.**
**Görünür metin:** *"工 bir aleti, üstteki parça ise sol eli gösterir ve サ sesine katkı yapar. Aleti tutan sol elden 'sol' anlamı gelişmiştir."* (𠂇 adlandırılmadı — U+20087 nadir glif, tofu riski; ikincil "たすける" anlamı metne konmadı.)

---

## 2. 右 — bağımsız kaynak turu (dört iddia AYRI)

| Kaynak | Metin |
|---|---|
| **Kanjipedia 0000308000** (ESAS) | 「**会意形声**。口と、又(イウ)（𠂇は変わった形。たすける）とから成る。**ことばで援助することから**、みちびく、「たすける」意を表す。**のちに、又・佑(イウ)と区別して、「みぎ」の意に用いる。**」 |
| **説文解字** (漢典, fetch edildi, iki sürüm) | 「助也。从口从又。」 · 「手口相助也。从又从口。」 · 徐鍇: 「言不足以左、復手助之」 |

| # | İddia | Bulgu | Güven |
|---|---|---|---|
| **1** | Bileşimde **口 biçimi** var mı? | **EVET, tartışmasız** (Kanjipedia + 説文) | **A** |
| **2** | Parçanın **tarihsel rolü**? | **SÖZ/KONUŞMA.** Kanjipedia 「ことばで援助することから」; 説文 「手口相助也」 + 徐鍇 「言不足以…」 | **A** |
| **3** | **"Ağız"** anlamıyla ilişki? | Kanjipedia parçayı 「くち」 diye **adlandırmıyor**, organ anlamı **vermiyor**; verdiği **ことば (söz)** işlevi → görünür metinde **"ağız" DENMEDİ, "söz" dendi** (betikte sert güvence) | — |
| **4** | **Sağ el / araç / yardım / dua**'dan hangisi ESAS kaynakta var? | · Yardım: **VAR**<br>· Sağ el: **YOK** ⚠️<br>· Araç: **YOK** (o 左'nın 工'su)<br>· Dua/サイ: **YOK** (Shirakawa genel teorisi) | — |

**"Sağ el" bulgusu:** Kanjipedia'ya göre ilk anlam **"yardım etmek"**; 「みぎ」 **sonradan**, 又/佑'dan ayrışmak için (「のちに、又・佑と区別して」). 説文 "sağ"ı hiç açıklamıyor.
**サイ dürüstlük notu:** 右'ya **özel** bir Shirakawa/サイ atfı çevrimiçi kaynaklarda **doğrulanamadı** (名'de de aynı sonuç). İddia Parti 5'teki ileriye dönük uyarıdan geliyor.

**Confidence: B.** (1) ve (2) = A; ama "sağ"ın sonradan ayrışması yalnız Kanjipedia'da ve 口-sınıfı azınlık okuması prensipte kapsıyor → en zayıf halka.
**Görünür metin:** *"Alttaki 口 sözü, üstteki parça ise yardım eden bir eli gösterir ve イウ sesine katkı yapar. Önce 'sözle yardım etmek' anlamı doğmuş; 'sağ' anlamı ise sonradan gelişmiştir."*

---

## 3. Adım 4 — YALNIZ tutarlılık karşılaştırması

| Boyut | 左 | 右 | Tutarlı mı? |
|---|---|---|---|
| Oluşum etiketi | 会意形声 | 会意形声 | ✓ |
| Kanjipedia ↔ 説文 bileşen uyumu | tam (𠂇+工) | tam (口+又) | ✓ |
| Ses öğesi gösterimi | "…サ sesine katkı yapar" | "…イウ sesine katkı yapar" | ✓ 季 kalıbı |
| Nadir glif adlandırma | "üstteki parça" | "üstteki parça" | ✓ |
| Confidence | **A** | **B** | ✓ gerekçeli fark |

**Bulunan asimetriler — editoryal kusur değil, kaynağın kendisi:**
1. **Anlam yolu asimetrik.** 左'nın "sol"u kaynakta doğrudan türetiliyor; 右'nun "sağ"ı türetilmiyor, sonradan ayrışıyor. **Simetrik görünen çift etimolojik olarak ayna değil.**
2. **Yapısal asimetri.** 左'da 工, 右'da 口 → yalnız 右'nun サイ maruziyeti var; confidence farkının sebebi bu (+ "sağ"ın tek kaynaklı olması).
3. **"Yardım" ikisinde de var ama farklı ağırlıkta.** 右'da birincil/özgün (metne girdi — "neden sağ?" ancak böyle açıklanıyor); 左'da ikincil kullanım (metne girmedi). **Bilinçli asimetri.**

**Sonuç: iki metin ton/kalıp olarak tutarlı, içerik olarak doğru biçimde asimetrik.** Karşılaştırma hiçbir kararı değiştirmedi.

---

## 4. MNEMONIC — gerçek karışıklık bulundu, ama görev ayrımıyla reddedildi

**Veriden ölçüldü** (`stroke_order_steps`): 左 ilk çizgi **YATAY** (21,40 → Δ126,-12) · 右 ilk çizgi **EĞİK** (54,22 → Δ116,185). Japon okullarında öğretilen klasik ayrım, uygulamanın çizim verisiyle birebir uyumlu.

**Aday:** 左 → *"左'da ilk çizgi yatay gider; 右'da ise önce eğik çizgi çizilir."* / 右 → aynası.
**4 test:** T1 ✓ (köken tekrarı değil) · T2 ✓ (tarihsel iddia yok) · T3 ✓ (gerçek hata) · T4 ✓ (kısa).

**→ REDDEDİLDİ (Zeynep, görev ayrımı):** Bu ipucu bir **YAZIM** karışıklığını çözüyor, **ANLAM/AYIRT ETME** karışıklığını değil. Hafıza katmanı yazım öğretmeye başlarsa sınır kaybolur ("ilk çizgi, ikinci çizgi, kalem kaldırma, oran, açı…"). 土 emsali meşru çünkü iki **karakteri** ayırt ettiriyor (土/士), yazım tekniği öğretmiyor. Stroke order verisi zaten uygulamada mevcut.
**→ AUTHORING-02'ye T3 kapsam sınırı olarak işlendi.**

---

## 5. Editoryal kapı doğrulaması
**Drafted:** 2 kayıt `kokenOf`→null · mnemonic `pending_review` · sızıntı yok · summaryTr'de "ağız" yok (betik güvencesi) · 𠂇 surrogate sağlam, U+FFFD yok · CONTENT_HASH `39d9cc6f3942b5af` · 4 suite yeşil.
**Reviewed (`54ee218`):** 2 kayıt Kökeni görünür · Hafıza yok · "ağız" yok · sızıntı yok · reviewedAt 2026-07-25 · CONTENT_HASH `af58bd611c579de8` · 4 suite yeşil · node --check 0.

---

## 6. Kayıt dışı bulgu — 名 ile tutarlılık sorusu (harmonizasyona bırakıldı)
右 için "口 = söz, ağız değil" kararı, 名'in mevcut metniyle gerilim yaratıyor: 名 *"**口 ağız**, 夕 ise…"* diyor + `component_meanings {口:"ağız"}`. Oysa 名'in Kanjipedia metni de 口'yu adlandırmıyor (「人に自分の名を**なのる**ことにより」).
**Zeynep kararı:** *"Bu gerçek bir hata değil. Bu bir editoryal dil tutarlılığı meselesi ve böyle şeyler authoring bittikten sonra yapılacak harmonizasyon turunun tam konusu."* → **EDITORYAL-UYUMLAMA-BEKLEYEN**'de (orta öncelik), commit açılmadı.

---

## 7. Sonuç

| Kanji | Oluşum | Confidence | mnemonic | Durum |
|---|---|---|---|---|
| 左 | 会意形声 | **A** | not_required | ✓ reviewed |
| 右 | 会意形声 | **B** | not_required | ✓ reviewed · kırmızı kuyruktan çıktı |

---

## 8. Sıradaki
- Kalan boş **18:** 百 千 万 円 金 年 今 気 父 前 後 西 南 北 白 青 来 飲
- 🔴 Kırmızı kuyruk (yeni tanımıyla — **ek kanıt gerektiren**, yayınlanamaz değil): **白** + 今 · 父 · 南 (draft'ta çatal çıkarsa)
- 借りて kümesi (万 来 西) hâlâ Parti 4 "sesi…" üslup kararını bekliyor
- **Ders:** Eşli tur işe yaradı — ama beklendiği gibi değil. Beklenti "右'nun riski 左 ile bakınca azalır"dı; çıkan sonuç **"sağ el" hikâyesinin kaynakta hiç olmadığı** ve iki karakterin **ayna olmadığı** oldu. Karşılaştırma, kaynak okumasının *yerine* değil *sonrasına* konduğu için görülebildi.
