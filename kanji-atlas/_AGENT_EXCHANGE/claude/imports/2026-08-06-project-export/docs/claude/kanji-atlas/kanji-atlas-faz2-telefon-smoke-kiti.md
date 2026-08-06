# Faz 2 · Telefon Smoke Kiti (storage + onboarding + SRS)

> **Amaç:** Üç kapanmış altyapı kalemini gerçek cihazda kısa ve kontrollü doğrulamak. **Yeni özellik arama yok.** Yalnız aşağıdaki 8 akış. Hepsi geçerse üç kalem birlikte "cihaz smoke geçti" diye günlüğe yazılır → ses manifesti. Bir hata çıkarsa yeni faz açılmaz; ilgili kapanmış kaleme **yalnız doğrulama düzeltmesi** olarak dönülür.

## Test edilecek build
`faz2-kalem1` dalı · `kanji-atlas/index.html` (commit `3a4d3c5`). **Canlı `zeynepkaya.app/kanji-atlas/` DEĞİL** — o main'in eski sürümü. Yükleme yöntemi ayrı kararlaştırılacak (bkz. son bölüm).

## Durum tetikleme hileleri (günlerce beklemeden)
SRS_DAYS = `[0,1,3,7,16]` (mastery 0→4). Yani:
- **Yeni + DOĞRU cevap** → mastery 1 → `next = +1 gün` → **bugün due DEĞİL**.
- **Yeni + YANLIŞ cevap** → mastery 0 → `next = now + 0 = now` → **anında due** ✅ (dokunmayla "zamanı gelmiş" üretir).
- **Mastered + due** → mastery 4 gerektirir (`next=+16 gün`); aynı gün dokunmayla üretilemez → **otomatik smoke test 4'te kanıtlı**, cihazda atlanabilir (istersen masaüstü devtools'ta tek satırla: `state.srs['ki']={correct:5,wrong:0,mastery:4,last:Date.now(),next:Date.now()-1000}; save(); render()`).

## 8 akış — dokunma adımları

**1) Eski kullanıcı gibi açılış**
Zaten onboarding'i bitirmiş bir cihazda uygulamayı aç. **Beklenti:** onboarding geri gelmez, doğrudan **home** açılır.

**2) Onboarding tekrar çalıştırma (varsa re-onboarding yolu)**
Onboarding'i yeniden başlat, bir seviye seç (ör. "Hiragana biliyorum, kanjiye girmek istiyorum"), "Başla" de. **Beklenti:** seçime uygun ekrana gider (hiragana→木 vitrini `detail/ki`, explorer→Atlas `map`, beginner→kana `あ`); **mevcut öğrenme verisi (notlar, ilerleme) SİLİNMEZ**.

**3) Yeni öğrenilmiş kanji aynı gün due'ya girmiyor**
Bir kanji öğren ve mini-testte **DOĞRU** cevapla. Profil ve Progress'teki tekrar sayacına bak. **Beklenti:** bu kanji **bugünkü sayaca girmez** (`next=+1 gün`). Doğru aralıklı-tekrar davranışı.

**4) Zamanı gelmiş kanji: üç ekran aynı sayı**
Bir kanji öğren, mini-testte **YANLIŞ** cevapla (→ anında due). Sonra **Profil "Kanji tekrarı"**, **Progress "Tekrar"**, **Review başlığı "N kanji tekrar bekliyor"** sayılarına bak. **Beklenti:** üçü de **aynı sayı**.

**5) "Tekrara başla" ilk due kanjiyi açıyor**
Review ekranında "Tekrara başla"ya bas. **Beklenti:** gerçekten bir kanji mini-testi açılır (boş/ölü buton değil). Birden fazla due varsa **en eski `next`**li açılır.

**6) Mastered ama zamanı gelmiş: ölü buton yok**
(Aynı gün dokunmayla üretilemez — otomatik smoke test 4'te kanıtlı. Masaüstü devtools erişimin varsa yukarıdaki tek satırla dene: sayaç>0 iken "Tekrara başla" gerçekten o kanjiyi açmalı, `return` ile ölmemeli.)

**7) Kana çalışması kanji sayacını şişirmiyor**
Bir kana oyunu oyna veya kana "tanıdım" işaretle. Sonra kanji tekrar sayaçlarına bak. **Beklenti:** kana çalışması **kanji tekrar sayacını artırmaz** (kapsam A: yalnız kanji sayılır).

**8) Kapat-aç: state korunuyor**
Uygulamayı tamamen kapat, yeniden aç. **Beklenti:** öğrenme verisi, sayaçlar ve açılış davranışı (home) **korunur** (localStorage).

## Sonuç kaydı
- **Hepsi geçti →** karar günlüğüne "üç kalem cihaz smoke GEÇTİ" + ses manifestine geç.
- **Hata →** hangi akış, ne beklendi, ne oldu; ilgili kapanmış kaleme yalnız doğrulama düzeltmesi (yeni faz yok).

## Açık karar: build'i telefona nasıl yükleriz?
faz2-kalem1 canlı değil. Seçenekler (öneri sırasıyla):
1. **main'de bağlantısız önizleme yolu** (ör. `zeynepkaya.app/kanji-atlas-preview/`) — gerçek origin, localStorage sağlam, canlı `/kanji-atlas/` ve launcher'a dokunmaz, geri alınır. main'e küçük bir commit gerektirir.
2. **Sen kendi yönteminle yüklersin** (daha önce telefonda test ettiğin yol — kendi host'un / yerel sunucu).
3. faz2-kalem1'i main'e merge (**ÖNERİLMEZ** — bu smoke tam da "hazır mı" geçidi; test etmeden canlıya sürmek tersine iş).
