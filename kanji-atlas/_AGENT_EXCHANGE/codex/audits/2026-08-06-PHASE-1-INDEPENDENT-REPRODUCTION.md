# Faz 1 — Claude Denetiminin Bağımsız Yeniden Üretimi

Tarih: 2026-08-06  
Denetleyen: Codex  
Dal: `onboarding-b2-gate3`  
Başlangıç commit'i: `801c35d`  
Durum: **PASS — kritik bulgular yeniden üretildi; yayın HOLD**

## Amaç

Claude'un yayın öncesi raporundaki kritik iddiaları uygulama dosyalarını değiştirmeden, güncel çalışma ağacından bağımsız olarak doğrulamak.

## Doğrulanan bulgular

### 1. Yanlış okunuş ve ses eşleşmeleri — doğrulandı

- `明` / `akarui`: içerik `romaji: "aka"`; manifest `audio/word/aka.mp3`.
- `晴` / `hareru`: içerik `romaji: "ha"`; manifest `audio/kana/ha.mp3`.
- `話`: ana `kanji_hanasu` kaydı doğru; fakat ek `word_x_hana` kaydı `話 → hana → audio/word/hana.mp3` olarak yanlış.

Sonuç: Düzeltme yalnızca ekranda görünen romaji alanına uygulanamaz. Kanonik içerik, gömülü veri, manifest ve ilgili ses referansları birlikte doğrulanmalıdır.

### 2. QA kapısını aşan köken metinleri — doğrulandı

`kokenOf()` reviewed bir `etymology.summaryTr` yoksa `pictogram_note` alanına geri düşüyor. Güncel 98 karakterin 30'unda reviewed etimoloji olmamasına rağmen dolu legacy metin var; bu metinler ayrıntı ekranında görünür hale geliyor.

Ek olarak oyun kodunda en az bir doğrudan erişim doğrulandı: Atölye açıklaması `memory_hint_tr || pictogram_note` kullanıyor ve `kokenOf()` kapısını çağırmıyor.

### 3. Eski çalışma dosyasına bağlı test/yardımcılar — doğrulandı, sayı güncellendi

`atlas_drive_may30.html` yoluna bağlı **16** JS/Python/HTML/TXT dosyası bulundu. Claude raporundaki 9 sayısı mevcut çalışma ağacında güncel değil. Bu sonuç tek başına 16 dosyanın tamamının aktif test olduğu anlamına gelmez; sınıflandırma Gate 3'te yapılmalıdır.

### 4. Azaltılmış hareket desteği — doğrulandı

- `prefers-reduced-motion`: 0 eşleşme
- CSS animasyon tanımı: 26 eşleşme

Bu, animasyonların kullanıcı hareket tercihine göre kapatılmadığını doğrular.

### 5. Küçük fakat görünür kusurlar — doğrulandı

- Köken kartı yalnızca `null` durumunda gizleniyor; boş dize için boş kart üretilebiliyor.
- Tekrar düğmesinde devre dışı durumda ikinci bir `style` niteliği oluşturuluyor.
- `日.n5_words` içinde `nichiyoubi` iki kez bulunuyor.

## Düzeltme sırası

1. Gate 1: veri/ses doğruluğu ve küçük güvenli görünüm kusurları.
2. Gate 2: kontrollü birleştirme; landing bağlantısı hâlâ kapalı.
3. Gate 3: test envanteri, QA görünürlük politikası, erişilebilirlik ve manifest ikonları.
4. Gate 4: iOS/Android mağaza hattı.

## Faz kararı

Claude denetimi yön olarak güvenilir bulundu. Sayısal düzeltme: eski dosya yoluna bağlı öğe sayısı 9 değil 16'dır. Ürün yayınlanmamalı; önce Gate 1 sözleşmesi uygulanıp Codex tarafından yeniden denetlenmelidir.
