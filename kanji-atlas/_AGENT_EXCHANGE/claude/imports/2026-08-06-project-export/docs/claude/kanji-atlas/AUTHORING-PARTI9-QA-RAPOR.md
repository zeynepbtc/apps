# Parti 9 · 書 先 食 外 — Ayrı QA Turu Raporu

> ## ✅ KAPANDI — REVIEWED ONAYLI (Zeynep, 2026-07-25)
> **Karar:** confidence **書=A, 先=A, 食=B, 外=A**; **dördü de reviewed açıldı** (`aaea831`, push+SHA doğrulandı).
> **食=B gerekçesi (Zeynep):** *"Esas kaynak net olsa da çapraz kaynağın farklı bir yapı okuması sunması, görünür metni engellemez fakat A'yı gereksiz iddialı kılar."*
> **Mnemonic:** dördü de **not_required**. 書 için active denendi, 4 kalite testinden düştü → **yeni deneme yapılmadı.** Zeynep: *"Bu karar mnemonic sisteminin başarısızlığı değil, kalite standardının çalışmasıdır. active kullanmaya başlamış olmak, her partide active üretmek zorunda olmak demek değil. 土 ve 行 gerçekten ihtiyaç duyuyordu; bu dört kayıt için zorlamamak daha iyi editörlük."*
> **Doğrulama:** 4 kayıt Kökeni görünür, Hafıza yok (not_required), sızıntı yok · reviewedAt 2026-07-25 · CONTENT_HASH `cb17219d35ce730a` · 4 suite yeşil (401/83/sources/9) · node --check 0 hata. Betik: `apply_authoring_9_reviewed.js`.

> ## ⚠️ DÜZELTME — "会意形声 veri setinde hiç kullanılmamış" İDDİASI YANLIŞTI (2026-07-25)
> Bu raporun ilk sürümünde 左'nın partiden çıkarılma gerekçesi olarak *"会意形声 veri setinde hiç kullanılmamış beşinci bir oluşum türü"* denmişti. **Bu iddia ölçülmeden yazıldı ve yanlıştı.**
> **Ölçüm (`DATA.chars`, `aaea831` sonrası):** `象形` 17 · `指事` 6 · `形声` 9 · `会意` 8 · **`会意形声` 1** → **季** (ki2), `reviewed`, conf B, `reviewedAt` 2026-07-24, Parti 2'den beri **canlı**.
> **Ayrıca ölçüldü:** `formationType` saf editör metadata'sıdır — hiçbir render yolunda veya smoke suite'inde kullanılmıyor, kullanıcı metnine girmiyor. 季 bu türle aylardır sorunsuz çalışıyor.
> **Sonuç:** Ortada **şema/tür kararı yoktu.** 左'yı engelleyen tek şey `apply_authoring_9.js`'in kendi doğrulama whitelist'iydi (`["象形","指事","会意","形声"]`) — benim yazdığım script kısıtı, sistemin kısıtı değil. Yani 左 teknik olarak bu partiye girebilirdi.
> **Etkisi:** Parti 9'un bileşimi ve dört kaydın kararları **etkilenmedi** (Zeynep 書 先 食 外'yı ayrıca onayladı). Değişen tek şey 左+右 turunun **niteliği**: şema kararı değil, **normal authoring turu**. Bundan sonraki apply betiklerinde whitelist `会意形声`'yi de içerecek.
> **Ders:** B0 disiplini ("varsayma, ölç") yalnız legacy/boş sorusuna değil, **"bu sistemde X var mı?"** tipindeki her iddiaya uygulanmalı.

---

**Tarih:** 2026-07-25 · **Drafted commit:** `e284cc8` · **Durum (QA anında):** 4 kayıt `drafted` (KAPALI) · **reviewed o an VERİLMEMİŞTİ**

Zeynep yöntemi uygulandı: ESAS Kanjipedia okundu → oluşum türü doğrulandı → confidence tahmin edildi → **sonra parti kesinleşti.** Ön-tarama partinin bileşimini gerçekten değiştirdi (§1).

---

## 0. B0 — dördü de boş
書 先 食 外'in hiçbirinde etymology/pictogram_note/memory_hint_tr/mnemonic yok → drafted maliyeti **sıfır**. Tek fark: **外**'de `components` ([夕,卜]) ve `component_meanings` ({夕:akşam, 卜:fal}) zaten doluydu — kaynakla **birebir uyuştu**, dokunulmadı, doğrulandı.

---

## 1. ÖN-TARAMA BULGUSU — 左 partiye alınmadı
İkinci "temiz kayıt" kontenjanı için 左 okundu (triage: 🟡 会意, 右'nin kolay eşi). Kanjipedia 0002452500:

> 「**会意形声**。工と、(サ)（＝ひだり手）とから成り、工具を取るひだり手、ひいて、ひだり側の意を表す。」

Triage 左'yı `会意` sanıyordu; ESAS okuma **会意形声** dedi. Bu, "triage etiketi ön hüküm değil" kuralının ikinci somut kanıtı (birincisi Parti 8'de 母 → 指事).
→ 左 partiden çıkarıldı, yerine **食** alındı.
*(Çıkarma gerekçesi olarak yazdığım "hiç kullanılmamış 5. tür" iddiası yanlıştı — bkz. yukarıdaki düzeltme. 左 pekâlâ alınabilirdi; ama parti dört temiz kayıtla kapandı ve kararlar etkilenmedi.)*

---

## 2. ⚠️ METODOLOJİK AÇIK — 説文 alıntıları (tespit + düzeltme, `920e5fd`)
**Parti 7 ve 8'de çapraz kaynak (説文解字) alıntılarını fetch etmeden, bellekten yazmıştım.** AUTHORING-03'ün "Kaynak ne diyor ≠ benim çıkarımım" kuralının ihlali — üstelik alıntılar yayınlanmış kayıtların denetim izinde duruyordu.

**Geriye dönük doğrulama** (漢典/zdic'ten fetch, 説文 alıntısı taşıyan tüm kayıtlar):

| Kayıt | Sonuç |
|---|---|
| 口 · 九 · 母 · 生 · 名 · 行 | ✓ doğru (yalnız ev üslubu lemma öneki + noktalama farkı) |
| **土** | ✗ **hatalı** — metinde olmayan 萬 eklenmiş, olan 丨 atlanmış |
| 分 · 半 · 友 · 赤 | veri kaydında 説文 alıntısı YOK (yalnız Parti 7 QA raporunda) |

**Düzeltmeler:** DATA'da 土 (`920e5fd`, yalnız `disagreementNote`; kullanıcıya görünen hiçbir şey değişmedi, B gerekçesi geçerli kaldı) · QA raporlarında 友 (Parti 7) ve 土 (Parti 8) alıntıları doğrulanmış metinle değiştirilip düzeltme notu bırakıldı.
**Kural AUTHORING-03'e eklendi** (Zeynep onayı): *"Esas kaynak dışındaki çapraz kaynaklardan kullanılan doğrudan alıntılar da erişilip birebir doğrulanır; bellekten alıntı yazılmaz."* — yeni kural değil, mevcut kuralın operasyonel tanımı.

---

## 3. Kaynak turu — ESAS + 説文 (hepsi fetch edilerek)

| Kanji | Kanjipedia (ESAS) | 説文解字 (漢典) | Mutabakat |
|---|---|---|---|
| **書** | 0003288700「形声。聿と、音符者(シヤ)→(シヨ)（曰は省略形）とから成る。筆で物事をかきつける意を表す。」 | 「箸也。从聿者聲。」 | **Tam** — 聿 anlam + 者 ses |
| **先** | 0004040100「会意。儿と、之(し)（足あと。𠂒は変わった形）とから成り、人よりもさきだつ意を表す。」 | 「前進也。从儿从之。」 | **Tam** — 儿 + 之 |
| **食** | 0003539700「容器に食物を盛り(㿝)、上からふたをしたさま(亼)にかたどり、食物、ひいて「くう」意を表す。」= **象形** | 「一米也。**从皀亼聲**。或說亼皀也。」 | **ÇATAL** — 説文 piktogram değil, ses bileşenli okur |
| **外** | 0000841200「会意。夕（ゆうべ）と、卜(ぼく)（うらない）とから成る。通常は昼間に行ううらないを夜にすることから…」 | 「遠也。卜尚平旦，今夕卜，於事外矣。」 | **Tam** — gece falı mantığı birebir |

### 食 çatalı (tek gerçek bulgu)
Kanjipedia: 食 = yemek konmuş kap + üstünde kapak, **tek nesnenin resmi** (象形). 説文: 皀 (anlam) + 亼 (**ses**) bileşimi, hatta ikinci bir okuma daha (「或說亼皀也」). **行'daki desenin aynısı:** modern uzlaşı (甲骨/金文'e dayanarak) piktogram okur, 説文 küçük mühür yazısına bakarak bileşenlere böler. Gerçek oluşum-türü ayrılığı → **B**.
Önemli nüans: tartışma "**ne** resmediliyor" değil, "**resim mi yoksa bileşim mi**" sorusu → görünür metin güvenle yazılabildi.

---

## 4. Görünür metin kararları

| Kanji | summaryTr | Karar notu |
|---|---|---|
| 書 | "Üstteki 聿 fırça anlamı verir. Alttaki parça ise anlamıyla değil, okunuşuyla katkı yapar ve ショ sesini verir." | Ses bileşeni **者 diye adlandırılmadı** — bugünkü 書'de 者 görünmez, alttaki 曰 onun kısaltılmış biçimi (話'nin kilitli çözümü). Kaynak「筆で…かきつける意」 dese de **iki cümlede bitirildi** (形声 ev varsayılanı + çıplak bilgi) |
| 先 | "Üstteki parça bir ayak izini, alttaki 儿 ise bir insanı gösterir. Başkasından önde gitmekten 'önce, ileride' anlamı gelişmiştir." | 之'nin değişmiş biçimi (𠂒) metne konmadı — 半'deki 牛 notuyla aynı gerekçe |
| 食 | "İçine yemek konmuş, üstü kapakla örtülmüş bir kabın resmidir. Buradan 'yemek' anlamı gelişmiştir." | 説文 çatalı metne girmedi |
| 外 | "夕 akşamı, 卜 ise fal bakmayı gösterir. Normalde gündüz bakılan fala akşam bakmaktan 'dışarısı, dışında' anlamı gelişmiştir." | component_meanings ile birebir tutarlı |

---

## 5. ⭐ MNEMONIC — 4 test ilk kez **reddetme yönünde** çalıştı
Dördü de `not_required`. Bu bilinçli: standart, Hafıza katmanını zayıf içerikle doldurmamak için var.

| Kanji | Karar | Gerekçe |
|---|---|---|
| 先 | not_required | Ayak izi + insan imgesi doğrudan görsel, tek okumada taşıyor |
| 食 | not_required | Kapaklı yemek kabı çok somut |
| 外 | not_required | "Gündüz yapılması gerekeni akşam yapmak" **tuhaf olduğu için akılda kalıyor** — köken kendisi kanca |
| 書 | not_required (denendi, reddedildi) | ↓ |

**書 — active denendi, 4 testten geçen aday çıkmadı.** 形声 kayıtlarda ses bileşeni hafıza için anlamsız olduğundan köken hafızayı 会意/象形'e göre daha zayıf taşır. Adaylar:

| Aday | Düştüğü test |
|---|---|
| "Fırçanın izi yukarıda, sayfa aşağıda." | **T1** — köken zaten 聿=fırça diyor, tekrar |
| "Alttaki parça 者'nin kısalmış hâli." | **T2** — tarihsel iddia; Kökeni katmanına ait |
| "書'yi 昼'den ayır: üstte fırça var." | **T3** — 昼 N5 setinde yok, gerçek karışıklık değil |

**Gözlem (kural değil):** ilerideki 形声 kayıtlarda active ihtiyacı daha sık doğabilir; her biri yine tek tek değerlendirilir.

---

## 6. Editoryal kapı doğrulaması
**Drafted:** 4 kayıt `kokenOf`→null · mnemonic `pending_review` · sızıntı yok · CONTENT_HASH `d40d7183ea898640` · 4 suite yeşil.
**Reviewed (`aaea831`):** 4 kayıt Kökeni görünür · Hafıza yok (not_required) · sızıntı yok · reviewedAt 2026-07-25 · CONTENT_HASH `cb17219d35ce730a` · 4 suite yeşil (401/83/sources/9) · node --check 0.

---

## 7. QA sonucu → KARAR

| Kanji | Oluşum | Confidence | mnemonic |
|---|---|---|---|
| 書 | 形声 | **A** | not_required |
| 先 | 会意 | **A** | not_required |
| 食 | 象形 | **B** (説文 oluşum çatalı) | not_required |
| 外 | 会意 | **A** | not_required |

Dördü reviewed açıldı (`aaea831`).

---

## 8. Sıradaki
- **左 + 右 ORTAK ÖZEL TUR** (Zeynep planı): ikisi de `会意形声`, sağ/sol karşıtlığı taşıyor, biçim ve anlam geçmişleri birlikte karşılaştırılınca daha doğru denetlenebilir. **右'nun kırmızı riskinin bir kısmı, onu tek başına ve yalnız 口 üzerinden okumaktan kaynaklanıyor olabilir.** Yine de **右 otomatik olarak temiz kabul edilmez** — kırmızı kuyruktan çıkarılmadı, yalnız eşli inceleme adayı yapıldı. (Şema kararı gerekmiyor — bkz. yukarıdaki düzeltme.)
- Kırmızı kuyruk: **白** (biçim çok teorili) + 今 · 父 · 南 (draft'ta çatal çıkarsa).
- Kalan boş 20: 百 千 万 円 金 年 今 気 父 右 左 前 後 西 南 北 白 青 来 飲
- 借りて kümesi (万 来 西) hâlâ Parti 4 "sesi…" üslup kararını bekliyor.
- **Ders:** ön-tarama iki kez üst üste partinin sınıfını düzeltti (母 指事, 左 会意形声). "Kaynak okunmadan parti kesinleşmez" üretimi yavaşlatmıyor, yanlış üretimi engelliyor.
