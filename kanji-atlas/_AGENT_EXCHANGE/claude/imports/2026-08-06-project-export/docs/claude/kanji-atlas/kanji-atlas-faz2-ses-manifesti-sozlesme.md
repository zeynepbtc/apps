# Faz 2 · Ses Manifesti — Sözleşme (v3 · gömme RATİFİYE + build kapıları)

> Envanter: `...-ses-manifesti-envanteri.md`. GPT çerçevelemesi: politika **ürün değil ORTAM kararı**. v3, gömme yaklaşımını ratifiye eder ve 10 build/inject kapısı + `durum`≠runtime ayrımını kilitler.

## ★ RATİFİYE (Zeynep + GPT · 2026-07-20): JSON kaynak + build-time gömme
**Net hüküm:** *audio-manifest.json kanonik yazım ve üretim kaynağıdır. Uygulama runtime'da manifest fetch ETMEZ. Build/enjeksiyon adımında **doğrulanmış** manifest, HTML içine `const AUDIO = {...}` biçiminde gömülür. Ship edilen tek HTML, ses haritasının çalışması için harici manifest dosyasına bağımlı DEĞİLDİR.* Runtime fetch reddedildi (tek-dosya bozulur · eksik-dosya hata modu · file://+offline zorlaşır · sürüm-drift · async hazır-olma sırası).

### ★ LOCK yorumlayıcı netleştirme (günlüğe de eklendi)
Tek-dosya ilkesi **uygulama mantığı + yapılandırma/veri haritaları** için geçerlidir. **Medya dosyaları (`audio/`) paketlenmiş statik varlık olarak ayrı bulunabilir; runtime yapılandırma dosyası fetch edilmez.** ("Tek dosyaysa MP3 neden dışarıda?" sorusunu baştan kapatır.)

### ★ Yol çözüm sözleşmesi (GÖRELİ URL — kanıtlandı, step 4)
Ses yolları **HTML'e görelidir** (`audio/word/mori.mp3`, mutlak/CDN değil). **`audio/` klasörü `index.html` ile aynı göreli kökte bulunur.** Tarayıcı göreli URL'yi **doküman konumuna göre** çözer (`new URL(rel, document.baseURI)`) → preview ve canlı yollarında aynı klasör mantığı çalışır, sessiz hata üretmez. `smoke_pathnorm.js` bunu kanıtladı. *Bu varsayım bozulursa (ör. audio farklı köke taşınırsa) tek `AUDIO_BASE_PATH` resolver'ı eklenir; çağrı yüzeyleri kendi yolunu birleştirmez.* Şimdilik göreli-aynı-kök geçerli ve kilitli.

### ★ `durum` ≠ runtime davranışı (KRİTİK ayrım)
Manifest **"ne mevcut?"** der; ortam politikası **"ne yapmalıyım?"** der. `durum` tek başına runtime davranışı SEÇMEZ:
- **development:** recorded→dosya · tts/missing→TTS denenebilir
- **release:** recorded→dosya · tts/missing→**sessiz** (TTS yok)

Yani `durum=tts` development politikasını ifade eder; release'de o kayıt sessizdir. Runtime davranışı **ortam bayrağı + durum** birlikte türetir.

### ★ 10 build/inject kabul kapısı (uygulama gate'leri)
1. JSON şema doğrulamasından geçmeden HTML üretilmez.
2. `id` benzersiz.
3. `kategori` yalnız izinli enum.
4. `durum=recorded` ise `ses_dosyası` boş olamaz.
5. `durum=tts|missing` ise dosya alanı davranışı açık (null).
6. Yol yalnız normalize köklerden başlar: `audio/kana/` · `audio/kanji/` · `audio/word/` · `audio/sentence/`.
7. Gömülen veri ile JSON **semantik olarak birebir aynı**.
8. Aynı JSON iki kez işlenince **byte-identical** AUDIO bloğu.
9. **Geçersiz manifestte eski geçerli HTML sessizce EZİLMEZ.**
10. Üretim build'inde **runtime manifest fetch bulunmadığı** smoke ile doğrulanır.

### ★ speak() entegrasyon uyarısı (GPT)
`speak()` yeniden yazılmaz. Entegrasyondan ÖNCE **tüm çağrı yüzeylerinin manifest ID'sini nasıl çözeceği** doğrulanır. **Ses dosyası adıyla pedagojik kimliği YAPIŞTIRMA** — çözüm anahtarı (kategori+metin) pedagojik `id`'den ayrı tutulur.

### Uygulama sırası (kilitli)
1. manifest üretimi ✅ (`99a66a0`) → 2. şema/bütünlük harness ✅ → 3. gömme scripti ✅ (`a548fa9`) → 4. yol normalizasyonu ✅ (`99a6330`) → 5. dev/release ses politikası bayrağı → 6. speak() entegrasyonu → 7. smoke → 8. 47 kayıt listesi.

---

## Kilitli kararlar (v2'den — değişmedi)

### 1. İki ortam, iki politika
Release = dosya→sessiz (TTS yok) · Development = dosya→TTS→sessiz. Tek bayrak geçişi. TTS ürün özelliği değil, iskele.

### 2. Klasör yapısı Flick ile birebir ortak
`audio/kana/·kanji/·word/`(tekil)·`sentence/`. Atlas `words/`→`word/`, `sentences/`→`sentence/` ✅. Flick otorite.

### 3. Şema (7 alan)
`id·kategori·metin·okunuş·ses_dosyası·kaynak·durum`; durum∈{recorded,tts,missing}; kaynak∈{flick,yeni}.

### 4. Kanji okunuş sesi
Temsilî tek okunuş (木→き). Karakter sesi (kategori kanji) vs kelime sesi (kategori word) ayrı. Zorunlu ibare: *"Karakter sesi pedagojik temsilî okunuştur; tüm okunuşları temsil ettiği iddia edilmez."* (`_meta.pedagojik_hukum`).

### 5. Fiziksel yer
CDN yok; her uygulama kendi `audio/`'sunu taşır; manifest yapısı ortak. Önce sözleşme, sonra depolama. **Not:** Atlas `audio/` klasörü henüz doldurulmadı (recorded kayıtlar Flick kaynağında doğrulandı); Atlas'a kopyalama = release-öncesi deployment adımı.

### 7. Cümleler
78 cümle durum=`tts` (development). Release'de kayıt bitene dek sessiz.

## Eşleşme özeti
Kana 92/92 · Kanji okunuş 70/91 (21 yeni) · Kelime 52/78 (26 yeni) · Cümle 0/78 (tts). Yeni kayıt: karakter+kelime ~47.

## Durum (uygulama)
**1-4 TAMAM.** manifest (339) · gömme (10 kapı) · yol normalizasyonu (çoğul=0, 3 katman doğrulandı, göreli-URL kanıtlandı). **speak() davranışı henüz değişmedi** (AUDIO_MANIFEST tüketilmiyor). Sıradaki: **5) dev/release ses politikası bayrağı** → 6) speak() entegrasyonu → 7) smoke → 8) 47 kayıt listesi (entegrasyon smoke'undan hemen sonra, kesin dosya adlarıyla).
