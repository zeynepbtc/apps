# TEST REPAIR BATCH E DENETİMİ

**Karar: FAIL — dar düzeltme gerekli**  
**Claude teslim ucu:** `fff298cfb597316588a7060a5aee2fb3d3de5e4f`  
**Uygulama commit'i:** `df5696c341bf08231e7fbceefc71f098b32121a4`  
**Taban:** `476374dcdc8dbbe5ac1148cba86faa847e7f2c03`  
**Tarih:** 2026-08-07

## Bağımsız kapsam denetimi

- Bundle doğrulandı ve `claude/repair/batch-e-home-rec` uzak izleme ref'ine alındı.
- Sözleşme SHA-256 değeri `0d37611d9fd3c77b0d8c7482c2bf95e45e78eaf42ee6b31fcec22c6987e42557` ile eşleşti.
- Uygulama commit'i yalnız izin verilen iki kod dosyasını değiştiriyor: `_faz2/smoke_home_rec.js` ve `_faz2/run-browser-gates.mjs`.
- Runner değişikliği yalnız açık beyaz listeye `smoke_home_rec.js` dosyasını ikinci sırada ekliyor.
- Testin kendi sunucu süreci, sabit URL'si ve zorunlu ekran görüntüsü yan etkisi kaldırılmış; `SMOKE_URL`, `try/finally` ve opsiyonel kanıt dizini doğru yönde uygulanmış.
- Assertion, selector ve ürün dosyası değişikliği yok.
- `git diff --check` bulgusuz.
- Eski ortam ve port değerleri yürütülen koddan kaldırılmış olsa da iki yasak literal açıklama yorumlarında hâlâ bulunuyor. Bu tek başına yayın riski değildir; fakat sözleşmenin “dosyada kalmadı” ölçütünü tam karşılamaz.

## Bloklayıcı bulgu

Teslimin kendi ham kanıtına göre kanonik varsayılan komut kırmızıdır:

- `gates:core`: **10/10 PASS**
- `gates:browser`: **3/4 PASS**, `smoke_home_rec.js` **300 saniyede TIMEOUT**
- `npm run gates`: **exit 1**, toplam **13/14**

`--timeout-ms=900000` ile elde edilen 4/4 sonucu sözleşmenin varsayılan 4/4 ve 14/14 kabul ölçütlerinin yerine geçmez. Bu nedenle teslim mevcut haliyle koordinasyon dalına birleştirilemez.

## Kök neden değerlendirmesi

Claude'un ölçümü tutarlı ve yeterince açıklayıcıdır: test 24 sayfa yüklemesinin her birinde dış Google Fonts stil isteğinin ağ zaman aşımını bekliyor. Dış istek engellendiğinde yükleme yaklaşık 12,7 saniyeden 0,1 saniyeye, bütün test de yaklaşık dört saniyeye düşüyor. Assertion kırmızısı yok; sorun yayın kapısının dış CDN davranışına bağımlı olmasıdır.

## Ürün/QA kararı

Varsayılan süre bütçesi yükseltilmeyecek. Daha yüksek süre gerçek asılmaları geç yakalar, kapıyı yavaşlatır ve dış ağ bağımlılığını çözmez.

`smoke_home_rec.js` hermetik yapılacak: yerel test sunucusu dışındaki HTTP(S) istekleri ilk gezinmeden önce engellenecek. Bu kapı; home recommendation DOM davranışı, erişilebilirlik semantiği, etkileşim ve taşmayı sınar, Google Fonts CDN kullanılabilirliğini sınamaz. Yedek sistem fontuyla ölçüm yapılması bu kapı için bilinçli olarak kabul edilir. Yazı tipi sadakati daha sonra gerçek cihaz/görsel yayın turunun konusudur.

## Sonuç

Batch E **FAIL**. Dar düzeltme sözleşmesi `2026-08-07-TEST-REPAIR-BATCH-E-CORRECTION.md` dosyasındadır. Düzeltme mevcut Claude teslim ucu üzerinden ilerlemeli; runner timeout'u ve ürün kodu değişmemelidir.
