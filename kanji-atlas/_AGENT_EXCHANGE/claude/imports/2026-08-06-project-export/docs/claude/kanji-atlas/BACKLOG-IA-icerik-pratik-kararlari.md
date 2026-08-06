# Kanji Atlas — Backlog: IA / Yazma / İçerik Dili / Pratik Kararları

> **Durum:** KAYITLI — **sırası gelince ele alınacak.** Kod YOK, uygulama YOK. Zeynep'in yön kararları + backlog; her kalem kendi fazı açılınca yeniden konuşulup uygulanır.
> **Neden ayrı belge:** Bu kalemler gezinti/onboarding'i aşan bir küme (IA, yazma entegrasyonu, terminoloji, mnemonic, aşamalı yükleme, esnek pratik, öncelik listeleri). `GEZINTI-REVIZYON-BIRIKTIRME.md` R6'dan buraya bağlanır.
> **Kural (Zeynep):** *Bir onboarding/UX cevabı kullanıcı deneyiminde görünür bir fark üretmiyorsa toplanmaz/sorulmaz.*

---

## §1 — IA / Navigasyon yeniden yapı  ·  YÖN KİLİTLİ (Zeynep)

**Yeni ana yapı:**

```
Alt menü:  Kana · Kanji · Oyunlar · İlerleme
Üst bar:   Ana Sayfa · Ayarlar
```

**Kilitli IA ilkesi:** *Ana navigasyon bilgi alanlarına göre; çalışma biçimleri ilgili alanların içinde.*

**Gerekçe:** Kana ve Kanji **içerik alanı**dır; **yazma** ise bu içeriklerle yapılan bir **çalışma biçimi**dir. "Yazı" ayrı ana bölüm olunca kullanıcı zihninde "Kana başka yerde, Kanji başka yerde, yazmak tamamen başka yerde" ayrışması oluşuyor. Pedagojik bağ kopmamalı:

```
Kana'yı gör → sesini dinle → tanı → kelimede gör → yazmayı dene
Kanji'yi gör → anlamını/kelimesini öğren → yapısını incele → yazmayı dene
```

**Alan-temelli (bizim) vs etkinlik-temelli (Gemini) fark:** Gemini "Öğren · Pratik · Oyun · Analiz" öneriyor (etkinlik temelli). Kanji Atlas için **alan temelli** doğru: kullanıcı önce "Kana mı Kanji mi?" diye düşünür, sonra o alan içinde öğrenir/dinler/okur/yazar/tekrar eder. Hem alanı hem etkinlik türlerini aynı ana menüye koymak çapraz tekrar ve kalabalık üretir (Kana içinde pratik + Kanji içinde pratik + ayrı Pratik + ayrı Yazı).

**Yazma erişimi nasıl korunur** (kaldırılmaz, doğru bağlama taşınır):
- Kana detayında, çizim alanının **hemen altında** "Yazmayı dene"
- Kanji detayında **aynı bileşen, aynı konum**
- Kana ana sayfasında isteğe bağlı Yazma çalışması
- Kanji ana sayfasında isteğe bağlı Yazma çalışması
- İleride pratik filtrelerinde "yalnız çizim"
- "Zorlandıklarım" listesinden doğrudan ilgili yazma pratiğine geçiş

**R4 büyüdü:** R4 artık yalnız buton konumu değil → **Yazma işlevinin Kana/Kanji içine tutarlı entegrasyonu + alt navigasyondan "Yazı"nın kaldırılması.** Onboarding bittikten sonra **ayrı bir "IA / Yazma Entegrasyonu" fazı** olarak, R4 UI parity ile **aynı bütünsel işte** ele alınır (önce menüyü kaldırıp sonra butonları tek tek yamamak yerine).

---

## §2 — İçerik dili / terminoloji  ·  YÖN KİLİTLİ (Zeynep)

**"Radikal" gevşek kullanılmaz.** Bir kanji içindeki her görünür parça radikal değildir; içeride şunlar olabilir: sözlük radikali, anlamla ilişkili bileşen, okunuşa ipucu veren fonetik bileşen, tarihsel biçim, yalnız görsel olarak ayrılan parça.

**Genel kullanıcı dili (yüzey):** `Bileşen · Parça · Aile · Ortak yapı`. "Radikal" **yalnız gerçekten doğrulanmış sözlük radikali** anlatılıyorsa kullanılır.

**İç teknik şema (ileride, veri katmanında):** `Sözlük radikali · Anlam bileşeni · Ses ipucu / fonetik bileşen · Görsel parça`. Teknik doğruluk **içeride** korunur; ama kullanıcıya her detay ekranında dört teknik terim birden yüklenmez — **yüzey dili sade kalır.**

**Aile sınırı:** Kanji Atlas'taki "aile", görsel/kavramsal yakınlık sağlayan bir **öğrenme örgütüdür** — resmî etimolojik sınıf / sözlük radikali sınıfı / tarihsel köken grubu gibi **sunulmaz.** Güvenli ifade: *"aynı yapıyı paylaşan karakterler"* / *"ortak parçalı aile."*

---

## §3 — Mnemonic ("Hatırlama ipucu")  ·  P2 + içerik QA  ·  3 kural KİLİTLİ

Karar: her kanji için zorunlu hikâye yok; gerçekten yararlıysa **opsiyonel** hatırlatma ipucu var.

1. **Gerçek köken gibi sunulmaz.** Etiket: **"Hatırlama ipucu."** Yasak çerçeveler: "Bu kanji'nin hikâyesi", "aslında şunu anlatır", "gerçek anlamı buradan gelir." Gerçekten etimoloji anlatılıyorsa **kaynak + doğruluk denetimi** gerekir.
2. **Her kanjiye zorla yazılmaz.** Yararlılık testi: *ipucu karakteri öğrenmeyi gerçekten kolaylaştırıyor mu, yoksa yalnız içeriği mi uzatıyor?* Bazı karakterde görsel ipucu zaten mükemmel; bazısında uydurulan hikâye karakterin kendisinden zor.
3. **Ana öğrenme yolunu işgal etmez.** Kapalı/açılabilir küçük kart · isteğe bağlı yardımcı bölüm · detayda ikincil katman. Kullanıcı mnemonic okumadan da akışı tamamlayabilmeli.

---

## §4 — Kanji detay: aşamalı yükleme  ·  ADAY (tasarım yönü)

**İlke:** *Tutarlı iskelet, değişebilir vurgu.* İki uçtan da kaçın — her şeyi ilk ekranda gösterme **ve** her kanjiye tamamen farklı ekran düzeni verme.

**Tutarlı ilk görünüm (her kanji):**
```
Temel anlam · En yararlı gerçek kelime · Ses · Temel yapı / aile bağlantısı
```
"En yararlı kelime" önemli: okunuşu soyut liste yerine **gerçek kullanımda** gösterir.

**İsteğe bağlı derinleşme (alt katman):** Diğer kelimeler · okunuş ayrıntıları · yazmayı dene · bileşenler · (varsa) hatırlama ipucu · ek örnekler.

**Değişebilen vurgu (aynı bileşenler, farklı öne çıkarma):** görsel yapısı güçlü karakterde **bileşen**, çok yaygın kelimesi olanda **kelime**, biçimi karıştırılan karakterde **yazım** öne çıkabilir. Bu "her kanjiye ayrı tasarım" **değildir.** İlk Store sürümünde karmaşık motor gerekmez; ileride içerik verisinde basit bir öncelik etiketi yeterli: `word_first · structure_first · writing_first`. **P0 işi değil.**

---

## §5 — Esnek çalışma biçimleri  ·  P1

Ayrı ana menüye **dönüşmez.** Doğru yer: Kana veya Kanji → **"Pratik başlat"** → "Ne çalışmak istersin?"

Filtreler: yalnız anlam · yalnız okuma · yalnız yazma · **zorlandıklarım** · seçtiklerim / özel liste.

Bu sistem alt menüyü büyütmez, kullanıcıyı ayarlara gömmez, **P1 zayıf-nokta motoruyla birleşir**, ileri kullanıcıya esneklik verir, yeni kullanıcıyı boğmaz. **Sade başlangıç sırası:** (1) Zorlandıklarım, (2) Kaydedilenler/favoriler, (3) Çalışma türü filtresi. "Özel deste oluşturma" hemen değil, sonra.

---

## §6 — Öncelikli backlog

**P1 — Store sonrası yüksek değer**
- Hoşgörülü çizim geri bildirimi
- Quiz'de geri alma / "yazım hatası olabilir" uyarısı
- Çalışma türü filtreleri
- Haptic + hafif sesli çizim geri bildirimi
- Zayıf-nokta motoruyla yalnız anlam/okuma/yazma pratiği
- Kanji Builder için tasarım + pedagojik prototip

**P1–P2**
- Kanji Builder'ın tam oyunu
- Dark mode
- Gelişmiş özel çalışma listeleri

**P2**
- Cümle içinde kanji seçimi
- Opsiyonel mnemonic içerikleri
- Cezasız kişisel hedef
- Kullanıcıya özel listeler / desteler

**ALINMAYACAK (ürün ilkesi)**
- Streak kaybetme · Sert günlük kanji sınırı · "Unutuldu" mastery etiketi · Enerji/can sistemi · Zorunlu günlük görev · İleri içeriğe erişimi engelleyen yapay kapılar

> Kişisel hedef ileride eklenirse: *"Bugün 5 dakika ayırmak istiyorum"* gibi **gönüllü ve sıfırlanmayan** bir araç — gün kaçırınca kırmızı uyarı/kayıp üretmez.

---

## §7 — Önerilen roadmap sıralaması (onboarding sonrası)  ·  ADAY

```
1. Onboarding B2'yi tamamlama
2. IA / Yazma Entegrasyonu
   - "Yazı" alt menüsünü kaldır
   - Alt menü: Kana / Kanji / Oyunlar / İlerleme
   - Yazmayı Kana ve Kanji içine yerleştir
   - R4 UI parity'yi AYNI fazda kapat
3. R2-B genel içerik doğruluk denetimi
4. Accessibility + Reduced Motion
5. Release checklist + Final QA
6. Store varlıkları ve gönderim
```

> Not: Bu sıralama `kanji-atlas-roadmap-MASTER.md` STUDIO BOARD'a **onboarding kapanınca** uzlaştırılacak (şimdi board'a işlenmedi — kayıt aşaması).

---

## §8 — Kilitli karar özeti (Zeynep)

```
Alt menü:        Kana · Kanji · Oyunlar · İlerleme
Yazı:            Ana bölüm değil, bağlamsal çalışma biçimi
Radikal:         Yalnız doğrulanmış sözlük radikali için
Genel dil:       Bileşen · parça · aile · ortak yapı
Mnemonic:        Opsiyonel "hatırlama ipucu"; gerçek etimoloji gibi sunulmaz; zorunlu değil
Kanji ilk görünüm: Anlam + en yararlı kelime + temel yapı
Derinleşme:      Okunuşlar + ek kelimeler + yazma + bileşenler
Esnek pratik:    P1, Kana/Kanji içinden filtrelenebilir
Alınmayacak:     Streak · sert günlük limit · "Unutuldu"
```

**Yön:** çok özellikli ama parçalanmış bir araç değil; derinliği doğru anda açılan, sade ve bağlamsal bir öğrenme sistemi.
