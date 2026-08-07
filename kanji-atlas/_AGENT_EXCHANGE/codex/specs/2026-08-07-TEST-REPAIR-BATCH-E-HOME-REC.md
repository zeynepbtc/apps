# TEST REPAIR BATCH E — HOME RECOMMENDATION DOM KAPISI

**Durum:** UYGULAMAYA HAZIR  
**Sahip:** Claude (uygulama) → Codex (denetim ve birleştirme)  
**Taban:** `476374dcdc8dbbe5ac1148cba86faa847e7f2c03`  
**Hedef dal:** `repair/batch-e-home-rec-2026-08-07`  
**Tarih:** 2026-08-07

## 1. Karar ve kök neden

`smoke_home_rec.js` **arşivlenmeyecek**. Bu test, mantık düzeyi onboarding kontrollerinden farklı olarak gerçek DOM'da şu yayın risklerini koruyor:

- `.rec-hint` gerçekten render ediliyor ve tekil,
- görünür kutu ve dokunma hedefi en az 44 px,
- metin/rota/ARIA/role/tabindex doğru,
- fare, Enter ve Space akışları çalışıyor,
- ikinci bir tavsiye aynı anda görünmüyor,
- marker sonrası şerit kalkıp normal ipucu geri geliyor,
- 320 px genişlikte yatay taşma yok,
- page error yok.

Ölçülen altyapı kusurları:

1. kendi `python3 -m http.server` sürecini açıyor,
2. sabit `8907` portunu kullanıyor,
3. yalnız Claude ortamına ait `/home/claude/apps-deploy/kanji-atlas` yoluna bağlı,
4. sunucu ve Chromium sahipliği mevcut ortak runner'ı atlıyor,
5. tarayıcı `try/finally` temizlik sınırında değil,
6. hata/asılma halinde kapanış yalnız dış süreç ölümüne bırakılıyor.

Batch E yalnız bu altyapıyı onarır ve testi mevcut sahipli tarayıcı runner'ına ekler.

## 2. İzin verilen dosyalar

- `_faz2/smoke_home_rec.js`
- `_faz2/run-browser-gates.mjs`
- `_AGENT_EXCHANGE/claude/reports/2026-08-07-TEST-REPAIR-BATCH-E-HOME-REC.md`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-07-test-repair-e-home-rec/**`

Başka hiçbir dosya değişemez.

## 3. `smoke_home_rec.js` onarımı

### Zorunlu altyapı değişiklikleri

- Python import/spawn ve sabit port tamamen kaldırılmalı.
- URL yalnız `process.env.SMOKE_URL` üzerinden alınmalı.
- `SMOKE_URL` yoksa anlaşılır hata ve non-zero exit üretmeli; hiçbir tarayıcı açmamalı.
- `chromium.launch()` başarılı olur olmaz `try/finally` başlamalı.
- `newPage()`, tüm assertion'lar ve akış `try` içinde olmalı.
- `finally` her başarı/hata yolunda tarayıcıyı kapatmalı.
- Test sunucu kapatmaya çalışmamalı; sunucunun tek sahibi `run-browser-gates.mjs` olmalı.
- `/tmp/home_rec_*.png` zorunlu yan etkileri kaldırılmalı. Görsel kanıt gerekiyorsa yalnız teslim evidence klasörüne, açık bir debug seçeneğiyle üretilmeli; normal gate koşumu dosya yazmamalı.

### Korunacak test anlamı

Mevcut assertion'lar, seçiciler, üç onboarding yolu, 44 px ölçütü, mouse/Enter/Space davranışı, tekillik, marker semantiği, 320 px taşma ve pageerror kontrolü değiştirilmemeli.

Eğer güncel ürün akışı gerçekten bir assertion'ı kırıyorsa:

- assertion'ı gevşetme veya silme,
- ürün kodunu bu partide değiştirme,
- gerçek kırmızı sonucu raporla ve dur.

Yalnız açıkça yeniden adlandırılmış ama semantik olarak aynı bir seçici/rota varsa, önce eski ve yeni ürün kanıtını raporla; Codex onayı olmadan assertion değiştirme.

## 4. Runner katılımı

`run-browser-gates.mjs` açık beyaz listesine `smoke_home_rec.js` eklenmeli.

Kanonik sıra:

1. `smoke_sources.js`
2. `smoke_home_rec.js`
3. `smoke_backup.js`
4. `smoke_recognition.js`

Runner'ın mevcut güvenlik, dinamik port, fiziksel kapsama, timeout, JSON, kirli-ağaç ve süreç temizliği davranışları değişmemeli.

## 5. Yasak kapsam

- `index.html`, manifest, ses, veri veya ürün davranışı değişikliği
- `package.json`, lockfile veya Playwright sürümü değişikliği
- mevcut üç browser testinin assertion/selector değişikliği
- core runner veya core test değişikliği
- onboarding fixture onarımı
- erişilebilirlik ürün uygulaması, pictogram fallback, web manifest, native/store, deploy
- arşiv temizliği veya dosya silme
- Batch F / sonraki faz

## 6. Kabul ölçütleri

1. Taban tam olarak `476374dcdc8dbbe5ac1148cba86faa847e7f2c03`.
2. `smoke_home_rec.js` içinde `python3`, `http.server`, `8907`, `/home/claude` ve kendi sunucu süreci kalmadı.
3. Test yalnız runner'ın verdiği dinamik `SMOKE_URL` ile çalışıyor.
4. Normal gate koşumu repo içine veya `/tmp/home_rec_*` yoluna screenshot yazmıyor.
5. Chromium her başarı, assertion fail, `newPage()` hatası ve beklenmeyen exception yolunda kapanıyor.
6. Browser runner beyaz listesi açık ve tam dört dosya; desen/dizin keşfi yok.
7. `npm run gates:browser`: **4/4 PASS**, exit 0.
8. `npm run gates`: **10/10 core + 4/4 browser = 14/14 PASS**, exit 0.
9. `--json` çıktısı dört testi doğru sırada ve geçerli JSON olarak veriyor.
10. Gate öncesi/sonrası ağaç temiz ve aynı; sunucu kapalı, artık çocuk süreç yok.
11. `git diff --check` bulgusuz.
12. İzin verilen yollar dışında değişiklik yok; `index.html` tabana göre bayt-identik.

## 7. Negatif kanıtlar

Teslim raporunda en az şunlar bulunmalı:

- `SMOKE_URL` olmadan doğrudan test: hızlı non-zero, Chromium sayısı değişmiyor,
- eski sabit `8907` portu başka süreç tarafından tutuluyken tam browser gate yine 4/4 geçiyor,
- `newPage()` öncesi kasıtlı hata fixture'ı: Chromium sızıntısı yok,
- bir home-rec assertion'ı kasıtlı düşürülen geçici fixture: runner diğer testleri çalıştırıyor fakat toplam karar FAIL,
- zaman aşımı fixture'ı: çocuk sonlandırılıyor, sunucu kapanıyor,
- normal koşumdan sonra `/tmp/home_rec_320.png` ve `/tmp/home_rec_390.png` yeni oluşturulmuyor.

Fixture'lar depo dışında geçici kopyalarda çalıştırılmalı; teslim koduna test kancası eklenmemeli.

## 8. Teslim

Claude şunları üretmeli:

- küçük uygulama commit'i,
- ayrı rapor/kanıt commit'i,
- taban ve uç SHA,
- tam değişen dosya listesi,
- komutlar ve exit kodları,
- 4/4 ve 14/14 ham logları,
- JSON kanıtı,
- süreç/sunucu/port/temiz-ağaç kanıtı,
- negatif fixture kanıtları,
- geri dönüş yöntemi,
- tek `.bundle`.

Push engellenirse bundle teslim et. Batch E sonunda dur; Codex PASS vermeden sonraki faza geçme.
