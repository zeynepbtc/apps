# Yazı Mantığı → "Dojo Kapısı" Revizyonu — Tasarım (TASARIMDA)

> **Durum:** TASARIMDA · Zeynep ile · **kod yok.** Ayrı faz. Onboarding şu an `writing-system`'e yönlendiriyor; bu faz o iniş ekranını yeniden kurar.
> **Rol (kilit içgörü):** Bu ekran DERS değil, **DOJO KAPISI.** Hiragana bilmeyenin karşılamadan sonra yönlendirileceği ilk kapı. Görevi öğretmek değil, **doğru ilk öğrenme modülüne ulaştırmak.**
> **Başarı ölçütü:** ❌ "ne kadar okudu" · ✅ "doğru modüle ne kadar hızlı ulaştı + ilk egzersizine başladı."
> **Kaynak görsel:** kullanıcı 9-adım dersinin 1. adımını işaretledi; Kanji tanımı "Anlamı hızlıca gösteren işaretler"e X attı → "bağlamsız/kişisel" eleştirisi.

## ★ Zeynep'in kararları (kilit)
1. **Kana nedir + Kanji nedir sayfaları KOMPLE İPTAL.** Her yerden kalkar (rota `kana-about`/`kanji-about`, render `KanaAbout`/`KanjiAbout`, home linkleri). Hiçbir yerde görünmeyecek. (ESKİ karar "Profil>Yardım'a taşı" idi — GEÇERSİZ; artık tam iptal, içerik kartlara damıtılır.)
2. Yazı Mantığı içeriği temizlenir. Konum: yeni başlayana **"senin için öneri"** olarak sayfa üstünde — iyi, kalır.
3. Bu bölüm bir **dojo kapısı**. Anlatım + **etkileşimli**. Düz açıklama + next ilerlemesi YOK.
4. Hiragana / Katakana / Kanji tuşları **kendi açıklamalarına** gider. Açıklamalar **sayfa üstüne açılan pencereler (bilgi kartı / bottom-sheet / modal)** olabilir. Şık. Bilgi kartı ama **etkileşimli, yönlendirmeli.**
5. **Hiragana + Katakana aynı kartı paylaşabilir — karşılaştırmalı.** Kanji kendi kartı.
6. **Sıralama ilerlemesi (Adım x/9) kaldırılır.**
7. Tanımlar + modüllere yönlendirmeler temiz/net. Tanımlar **pedagojik** olmalı — bağlamsız/kişisel değil.
8. **Home "Anlamak için / Japonca nasıl çalışır?" bölümü KOMPLE KALKAR.** Kapı en üste, Merhaba'nın altına, **kendi kutusunda** taşınır (aşağıda "Ana sayfa yeni hiyerarşi").

## Teşhis — "bağlamsız/kişisel" iki kusur
- **A. İddia var, gösterim yok.** "Kanji = anlamı hızlıca gösteren işaretler" + yanında **学** (anlamı çevrilmemiş). Kart kendi iddiasını örneğiyle çürütüyor. "sezersin/görürsün/fark edersin" = izlenim fiilleri, pedagoji değil.
- **B. Seviye uyumsuzluğu (asıl günah).** 9 adımın içinde radikaller, kök-transform, onyomi/kunyomi, stroke order — kullanıcı tek hiragana bilmeden kapıda karşısına çıkıyor. Tutunacak iskele yokken bilgi dökümü.

## Kapının işi — 3 soru, fazlası değil
| Soru | Kapı |
|---|---|
| Neye bakıyorum? | Üç sistem var |
| Şu an hangisi benim? | Yeni isen → Hiragana |
| Nereye gidiyorum? | Dokun → modül |

İleri içerik (radikal, okunuş, stroke order) → **modüllerin içinde, ihtiyaç anında.** Kapı yönlendirir, indirmez.

## Tanımların pedagojik yeniden yazımı (kart üstü tek satır)
| Sistem | Şimdi (kusurlu) | Öneri (işlevsel + gösterilmiş) |
|---|---|---|
| Hiragana | Japonca kelimeler, ekler ve gramer parçaları | **Japoncanın temel sesleri — her kelimenin iskeleti** |
| Katakana | Yabancı kökenli kelimeler, vurgu ve ses taklitleri | **Aynı sesler, köşeli kılık — yabancı kelimeler için** |
| Kanji | Anlamı hızlıca gösteren işaretler ❌ | **Ses değil, anlam taşır — 木 = ağaç** |

- Kapıdaki örnek glyph **学 DEĞİL** → 木/山/人 gibi **anında çevrilen** bir kanji. "Göster, iddia etme."
- Kanji satırı örneği (木 = ağaç) X'lenen iddiayı kartın üstünde kanıta çevirir.

## Etkileşimli bilgi kartları (kapının kalbi)
Kapı = tek sakin ekran. Üstte yeni başlayana "senin için öneri" (⭐ Hiragana). Üç **görsel eşit** buton (Katakana/Kanji soluklaştırılmaz — öner, kısıtlama yok). Butona dokun → **sayfadan gitmez**, üstüne zarif bilgi sayfası açılır (bottom-sheet/modal).

### Hiragana + Katakana → tek KARŞILAŞTIRMALI kart
Kana = tek sistem, iki yüz. Kart ikiz-ses ilişkisini gösterir: あ/ア = aynı "a", yumuşak↔köşeli. Dokun → ses (audioBtn). İki yüz arasında geçiş (flip/toggle). İki kopuk sayfa değil, **ilişkiyi** öğreten tek kart. (İçerik kaynağı: eski KanaAbout'tan damıtma — dakuten/küçük kana gibi ileri detay kapıda değil, kana modülünde.)

### Kanji → kendi kartı
Ses+anlam, tek işlenmiş örnek (木→森 "üç ağaç = orman"). "Ezber değil, çözme." Atlas yaklaşımı bir cümle. **Kapıda YOK:** onyomi/kunyomi, stroke order, "kaç tane var" listesi → hepsi kanji modülünde/detayında.

### Her kartın sonu
**Tek net aksiyon** modüle: "Hiragana'yı öğrenmeye başla →" + sakin "Kapat". Next-next YOK. Kart = açıp kapadığın mercek, sonra seçersin. Çıkmaz sokak yok.

## Ana sayfa — yeni hiyerarşi (KARARLAŞTI)
Home 2. görselle netleşti. "Anlamak için / Japonca nasıl çalışır?" 3-kart bloğu **komple kalkar** (kana-about + kanji-about zaten iptal; bölümün kendisi de gider). Kapı en üste taşınır.

| Sıra | Öğe | Durum / davranış |
|---|---|---|
| 1 | Merhaba (+ alt satır) | kalır |
| 2 | **Kapı kutusu** (YENİ) — Merhaba'nın altında, **kendi kutusunda**, あ ア 木 teaser + uygun dil | taşındı, üste; "ne nedir / nereden başla" girişi |
| 3 | Öneri şeridi (rec-hint) | kalır; **ilerlemeyle içeriği değişir** |
| 4 | Genel ilerleme / yarım kalan | kalır |
| 5 | "Başla" — Kana / Kanji / Oyunlar | kalır |
| ~~6~~ | ~~Anlamak için / nasıl çalışır (3 kart)~~ | **KALDIRILDI** |

**Sıfır-başlangıç kullanıcı ikisini birden görür:** üstteki kapı kutusu + öneri şeridinde aynı sayfaya yönlenme. Bu bilinçli **pekiştirme** — ama ikisi aynı yere gittiği için **farklı rol/ses taşımalı**, yoksa tekrar okunur:

| Öğe | Rol | Ses |
|---|---|---|
| Kapı kutusu | **Duran kapı** — herkese açık, kalıcı yönlenme | sakin/kurumsal: "Japonca üç yazıyla yazılır — nereden başlayacağını gör" |
| Öneri şeridi | **Kişisel ipucu** — dinamik, ilerlemeyle değişir | samimi: "Senin için: buradan başla →" (sonra → sıradaki adıma döner) |

**Açık karar (kapı tasarımında netleşecek):** kapı kutusu ilerlemiş kullanıcıda kalıcı mı (öner-kısıtlama-yok → gizlenmez) yoksa yalnız dili mi sönükleşir? **Lean:** kalıcı ama dili yumuşar — başta "buradan başla", sonra sessiz referans girişi; dinamik katmanı öneri şeridi taşır.
**Kapı kutusu kopyası:** işlevi anlatır, ismi değil (isim ertelendi). Adaylar: "Japonca üç yazıyla yazılır — nereden başlayacağını gör" · "Üç yazı sistemi, tek başlangıç." Kopya kapı tasarımıyla finalize.

## İleri içerik nereye taşınır (silinmez — "çalışan kodu silme")
9-adımın ileri adımları ölmez, **bağlama taşınır:**
- Radikal + kök-transform (adım 5-6) → Atlas / "Kökler ve Konumlar" (`transform` rotası zaten var).
- Onyomi/Kunyomi (adım 7) → kanji detayı / kanji girişi.
- Stroke order (adım 8) → çizim modülü.
- "Nasıl ilerleyeceksin" (adım 9) → kapının kendisi + öneri şeridi zaten bunu yapıyor; ayrı adım gereksiz.
Kapı bu yerlere **link verir**, orada öğretmez.

## Korunacak ilkeler (değişmez)
- Öner, kısıtlama yok — üç buton eşit, yalnız Hiragana'da ⭐/tip.
- Bilgi kaldırılmıyor, **isteğe bağlı + bağlama taşınıyor.**
- Hızlı yol her zaman en görünür yol — kart zenginliği Hiragana'ya dokunmayı yavaşlatmaz.
- Flick ile aynı renk paleti + yazı stilleri (buton/tipografi tutarlılığı).
- "Katman/layer" kelimesi asla kullanıcı-yüzü değil.

## İSİM (ertelendi)
"Yazı Mantığı" akademik. Adaylar: Japonca Yazıya Başlangıç · Yazıya Başla · İlk Adım · Japonca Yazı Rehberi. **Önce davranış değişsin + telefonda test, sonra isim.** Acil değil.

## Kapsam / risk (dürüst)
Onboarding'den bu yana en büyük tek iş: modal/sheet sistemi, karşılaştırmalı flip kart, ses, ileri içeriğin taşınması, home hiyerarşi değişimi. Değer: kapı ilk-izlenim yüzeyi. **Tek faz tut** — kapsam genişlemesine karşı uyanık. Gerçek doğrulama: telefonda yeni başlayan. Sonraki adım: bu tasarımın etkileşim detayını (kart geçişi, modal davranışı, taşıma haritası, home kapı kutusu kopyası) birlikte netleştirmek — kod öncesi.

## Bağlı / ayrı fazlar
Flick renk/font · freemium · onboarding kopya (bitti, staging'de) · production blob migration testi (bekliyor). Bu faz onlardan bağımsız planlanır.
