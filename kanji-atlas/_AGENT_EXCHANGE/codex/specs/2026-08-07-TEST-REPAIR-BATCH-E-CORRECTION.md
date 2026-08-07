# TEST REPAIR BATCH E — DAR DÜZELTME SÖZLEŞMESİ

**Durum:** UYGULAMAYA HAZIR  
**Sahip:** Claude (uygulama) → Codex (denetim ve birleştirme)  
**Taban:** `fff298cfb597316588a7060a5aee2fb3d3de5e4f`  
**Hedef dal:** `repair/batch-e-home-rec-2026-08-07`  
**Tarih:** 2026-08-07

## 1. Amaç

Batch E'nin taşınabilirlik düzeltmesi korunacak; `smoke_home_rec.js` dış CDN zaman aşımından bağımsız, hızlı ve deterministik hale getirilecek. Varsayılan `npm run gates` yeniden yayın kararı verebilen yeşil bir kapı olmalıdır.

## 2. İzin verilen dosyalar

- `_faz2/smoke_home_rec.js`
- `_AGENT_EXCHANGE/claude/reports/2026-08-07-TEST-REPAIR-BATCH-E-CORRECTION.md`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-07-test-repair-e-correction/**`

`run-browser-gates.mjs` dahil başka hiçbir kod veya ürün dosyası değişemez.

## 3. Zorunlu düzeltme

İlk `goto` veya `reload` çağrısından önce Playwright sayfasına hermetik ağ yönlendirmesi kurulmalı:

- `http:` ve `https:` isteklerinde yalnız `127.0.0.1` ve `localhost` hedeflerine izin verilmeli,
- diğer HTTP(S) hedefleri hemen `abort` edilmeli,
- `data:`, `blob:` ve tarayıcı-içi şemalar gereksiz yere engellenmemeli,
- URL ayrıştırma hatası sessizce dış ağa izin vermemeli; güvenli biçimde engellenmeli,
- engellenen dış isteklerin sayısı test çıktısında kısa ve deterministik bir özet olarak görünmeli,
- yerel uygulama kaynağı başarısız olursa test kırmızı kalmalı.

Bu karar bilinçlidir: kapı DOM davranışı ve taşmayı yedek sistem fontuyla doğrulayabilir. Dış fontun görsel sadakati bu testin sorumluluğu değildir.

## 4. Mutlak korumalar

- Mevcut 57 assertion, selector, üç onboarding yolu, 44 px eşiği, mouse/Enter/Space davranışı, tekillik, marker semantiği, 320 px taşma ve `pageerror` kontrolü değiştirilmemeli veya gevşetilmemeli.
- Varsayılan `300000 ms` timeout, runner timeout mantığı ve CLI davranışı değiştirilmemeli.
- `run-browser-gates.mjs`, `package.json`, lockfile ve ürün dosyalarına dokunulmamalı.
- Harici font dosyası depoya alınmamalı; yeni bağımlılık eklenmemeli.
- Testte eski ortama ait `8907` ve `/home/claude` literalleri yorum dahil kalmamalı. Eski altyapıyı anlatan yorum genel ifadeyle sadeleştirilmeli.
- Normal gate koşumu ekran görüntüsü veya başka dosya yazmamalı.

## 5. Kabul ölçütleri

1. Taban tam olarak `fff298cfb597316588a7060a5aee2fb3d3de5e4f`.
2. Kod değişikliği yalnız `_faz2/smoke_home_rec.js` dosyasında.
3. Testin yürütülmesi için dış internet gerekmiyor; yerel olmayan HTTP(S) istekleri ilk gezinmeden önce engelleniyor.
4. `smoke_home_rec.js`: **57/57 PASS**, exit 0.
5. Varsayılan `npm run gates:browser`: **4/4 PASS**, exit 0; özel timeout bayrağı yok.
6. Varsayılan `npm run gates`: **10/10 core + 4/4 browser = 14/14 PASS**, exit 0; özel timeout bayrağı yok.
7. `--json` dört testi doğru sırada, geçerli JSON ve `overallPass: true` olarak veriyor.
8. `smoke_home_rec.js` gerçek süresi her kanonik koşumda **60 saniyenin altında**.
9. Test başlamadan dış font uç noktasını erişilemez/asılı hale getiren geçici fixture altında da 4/4 ve 14/14 sonuçları değişmiyor.
10. Yerel `SMOKE_URL` hedefi kasıtlı bozulduğunda test hızlı ve non-zero bitiyor; ağ filtresi yerel kaynak hatasını maskelemiyor.
11. Engellenen hedeflerin kanıtında yalnız yerel olmayan HTTP(S) kaynakları var; yerel uygulama istekleri engellenmiyor.
12. Gate öncesi/sonrası ağaç temiz ve aynı; Chromium, sunucu ve çocuk süreç sızıntısı yok.
13. `git diff --check` bulgusuz; `index.html` Batch E tabanına göre bayt-identik.

## 6. Teslim

Claude şunları üretmeli:

- tek küçük düzeltme commit'i,
- ayrı rapor/kanıt commit'i,
- taban ve uç SHA,
- tam değişen dosya listesi,
- varsayılan 4/4 ve 14/14 ham logları ile exit kodları,
- 57/57, JSON, süre, offline/asılı dış uç nokta, bozuk yerel hedef, süreç ve temiz-ağaç kanıtları,
- geri dönüş yöntemi,
- tek `.bundle`.

Düzeltme sonunda dur. Codex PASS vermeden Batch F veya başka bir faza geçme.
