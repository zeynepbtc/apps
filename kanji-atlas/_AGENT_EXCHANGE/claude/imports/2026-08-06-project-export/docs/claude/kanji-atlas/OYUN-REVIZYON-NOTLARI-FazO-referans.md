# Oyun Revizyonu — Referans Notları (Faz O'da değerlendirilecek)

> Kaynak: GPT oyun analizi (Zeynep iletti, 2026-07). Sırası gelince (Faz O) değerlendir, üzerine konuş, işe yarayanı uyarla. Bu belge KARAR değil, ham referans + Claude'un ön hizalaması.
> Claude ön-notu: bu analiz benim daha önceki değerlendirmemle büyük ölçüde örtüşüyor (üretim/geri-çağırma, minimal-çift ayrımı, kelime-içinde okuma, bileşen kompozisyonu = moat). Aşağısı Faz O'nun çalışma zemini.

## En değerli oyun türleri (öncelik sırası)

1. **Ses Avı — duyduğunu bul/yaz** (öncelik ÇOK YÜKSEK). Kana'nın gerçek işi ses↔yazı hızlı bağı; romajiden değerli. Aşamalar: (1) ses→4 kana, (2) ses→benzer grup, (3) ses→kana yaz, (4) kelimeyi duy→eksik kanayı yerleştir (きっぷ → き＿ぷ). Böylece uzun ses, küçük っ, küçük ゃゅょ, dakuten, benzer sesler ölçülür.
2. **İnce Farklar — benzerleri ayır** (ÇOK YÜKSEK). Rastgele 4 şık yerine birbirine benzeyenler: Kana さ/き ぬ/め れ/わ シ/ツ ソ/ン ク/ケ · Kanji 土/士 未/末 人/入 千/干 右/石 木/本. "shi hangisi?" → seçenekler シ ve ツ. Interleaving + discrimination. İsim: İnce Farklar / Karışanlar / İkizler / Gözünü Keskinleştir.
3. **Cevabı kendin üret** (ÇOK YÜKSEK). Seçenek yok. Kana: "neko" → ねこ yaz/klavyeden kur; sonra romaji kalkar (🐈+ses → ねこ). Kanji: "ağaç" → 木 yaz/bileşenden kur. Serbest üretim daha dürüst ölçüm (testing effect).
4. **Gerçek kelimeyi oku** (ÇOK YÜKSEK). İzole 生=sei/shō/nama yerine kelime içinde: 学生 hangi okunuş? / せんせい doğru yazım? / 火曜日 eksik kanjiyi yerleştir. Şekil+okuma+anlam+kullanımı aynı anda bağlar. İsim: Kelime İçinde / Gerçek Kullanım / Okuma Rotası / Kanjiyi Yakala.
5. **Eksik karakter / bağlam tamamlama** (YÜKSEK). わたしは 学＿ です → 生/先/校. Kana: きょ＿ "bugün" → う. Mevcut N5 kelime+cümle verisiyle yapılabilir, yeni içerik sistemi gerekmez.
6. **Bileşenlerden kanji kur** (YÜKSEK, ÜRÜNÜ FARKLILAŞTIRIR). 木+木 → 林; 亻+木 → 休. Sıradan yapboz değil: her cevap sonrası ilişki açıklanmalı (亻 insan + 木 ağaç → insanın ağaca yaslanması = dinlenmek). Görsel parçalama + bileşen + aile + mnemonic. İsim: Kanji Atölyesi / Parçadan Kanjiye / Kökleri Birleştir / Atlas Yapbozu.
7. **Hafızadan çizim** (YÜKSEK, teknik maliyet yüksek). Tracing DEĞİL: karakter 2-3 sn görünür → kaybolur → hafızadan çiz → kılavuzla karşılaştır → yanlış bölüm gösterilir. Mükemmel kaligrafiyle cezalandırma; önce doğru bileşen/oran/vuruş sırası; "yanlış" yerine "hangi kısım karıştı".
8. **Hızlı okuma akışı** (ORTA). Kısa kelimeler akar (ねこ すし きって きょう); ses seç/anlam eşle. Amaç süre baskısı değil OTOMATİKLEŞME. Flick'le örtüşmemeli (Flick=klavye refleksi; buradaki=görsel okuma akıcılığı).

## Mevcut oyunların değerlendirmesi
- **Katakana Şifreleri:** KESİNLİKLE KALSIN + büyüsün. Mekaniği = öğrenilen konu (kaynak→ara biçim→katakana zinciri + kural açıklaması). Gerçek öğrenme oyunu.
- **Kana Mahjong / hafıza eşleştirme:** ana oyun OLMAMALI. Cevap üretmiyor, rastgele eşle çözülebilir, tekrar hissi. Ancak şöyle değerli olur: yalnız karışanlarla, ses–kana, hiragana–katakana, SRS'de zayıf çıkanlar, eşleşince ses, yanlışta farkı göster. Kartları rastgele değil kişisel hata verisinden üret.
- **Çoktan seçmeli:** kalsın ama USTALIK ÖLÇÜMÜ SAYILMASIN. Öğretim/başlangıç için iyi. Mastery kanıtı: (1) tanıma, (2) benzer ayırma, (3) üretim, (4) kelimede kullanım, (5) gecikmeli tekrar. Tek doğru MC "öğrenildi" dememeli.

## Önerilen çekirdek paket (6-7 iyi oyun > 10 vasat)
Kana: 1) **Ses Avı** 2) **İnce Farklar** 3) **Kelimeyi Kur** · Kanji: 4) **Kelime İçinde** 5) **Kanji Atölyesi** 6) **Hafızadan Çiz** · Özel: 7) **Katakana Şifreleri** (korunacak/genişletilecek).

## EN ÖNEMLİ: çok boyutlu ölçme sistemi (arka plan)
Her karakter için AYRI AYRI: şekil tanıma · ses/okuma · anlam · benzerlerinden ayırma · seçeneksiz üretim · kelime içinde tanıma · yazma · gecikmeli hatırlama. Tek MC doğrusu "öğrendi" saymaz. Kullanıcıya bu teknik gösterilmese de sistem içeride bilirse oyun önerileri gerçekten akıllı olur. → **Bu, Faz K'daki SRS omurgasının çok boyutlu tasarlanması gerektiğini ima ediyor.**

## Net karar (GPT)
- Korunacak: Katakana Şifreleri · bağlama bağlı çizim · iyi kısa testler.
- Dönüştürülecek: Mahjong · hafıza eşleştirme · rastgele MC.
- Önce eklenecek 3: Ses Avı · İnce Farklar · Kelime İçinde. Sonra farklılaştıran: Kanji Atölyesi.
- Ana tez: Flick refleksi taşıyor; Atlas'ın oyunları şekil+anlam+ses+kelime+aile bağını bağlamalı, yoksa ikisi de "doğru kutuya dokun"a döner.

## Claude Faz-O ön değerlendirmesi (uygulama zamanı tartışılacak)
- Hızlı kazanç hâlâ geçerli: `word-meaning/word-reading/word-cloze` kodda hazır ama hub'da gizli → "Kelime İçinde / Cümle tamamlama"nın çekirdeği bunlarda kısmen var, yüzeye çıkarılabilir.
- "Çok boyutlu ölçme" en büyük iş; SRS kaydını tek mastery yerine boyut-bazlı (recognize/produce/read/write/discriminate) tutmak gerekir — Faz K SRS tasarımını buna hazır kurmalıyız ki Faz O üstüne otursun.
- Yazma (hafızadan çiz) motoru mevcut stroke sisteminden türetilebilir.
