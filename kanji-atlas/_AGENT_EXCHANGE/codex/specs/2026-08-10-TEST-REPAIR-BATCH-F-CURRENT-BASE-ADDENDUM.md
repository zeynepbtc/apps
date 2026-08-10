# TEST REPAIR BATCH F — GÜNCEL TABAN EK SÖZLEŞMESİ

**Durum:** APPROVED / UYGULAMAYA HAZIR  
**Sahip:** Codex kapsam ve bağımsız kapı · Claude plan/uygulama/kanıt  
**Tarih:** 2026-08-10  
**Güncel taban:** `c4ac867cd7fcc66e70750ec8d8396c02e82c3e24`  
**Dal:** `onboarding-b2-gate3`

Bu belge,
`_AGENT_EXCHANGE/codex/specs/2026-08-07-TEST-REPAIR-BATCH-F-BROWSER-FAILURE-EVIDENCE.md`
sözleşmesini değiştirmez; yalnız eski `98c1385` tabanını bugünkü kanonik uçta uygulanabilir hale
getirir. Çelişkide bu ek belgedeki taban, sayım ve durma noktası geçerlidir. Davranış, güvenlik,
negatif kanıt ve ürün-kodu yasağı ilk sözleşmedeki biçimiyle korunur.

## 1. Neden şimdi

Batch F uygulaması mevcut commit zincirinde yoktur. `run-browser-gates.mjs`, PASS olmayan çocuğun
`stdout` ve `stderr` akışlarını sonuç nesnesinde toplamakta fakat insan-okur çıktısında
göstermemektedir. Bu nedenle bir sonraki tek-seferlik Chromium/HARNESS hatasının asıl mesajı yine
kaybolacaktır. Resmî okuma turları tamamlandığı için editoryal uyumlamadan önce bu gözlemlenebilirlik
borcu kapatılır.

## 2. Kesin kapsam

İzinli ürün/test yolları yalnız:

1. `kanji-atlas/_faz2/run-browser-gates.mjs`
2. `kanji-atlas/_faz2/tests/test_browser_gate_runner.mjs` — yeni kanonik davranış testi
3. `kanji-atlas/package.json` — yalnız davranış testini açık bir komuta bağlamak gerekirse

İzinli Claude teslim yolları yalnız:

- `kanji-atlas/_AGENT_EXCHANGE/claude/plans/2026-08-10-TEST-REPAIR-BATCH-F-PLAN.md`
- `kanji-atlas/_AGENT_EXCHANGE/claude/reports/2026-08-10-TEST-REPAIR-BATCH-F-DELIVERY.md`
- `kanji-atlas/_AGENT_EXCHANGE/claude/evidence/2026-08-10-test-repair-batch-f/`

Bu ek sözleşme Claude tarafından değiştirilemez. `index.html`, `data_chars.json`, manifestler,
okuma testleri, browser whitelist'i, selector/assertion'lar, timeout, Playwright sürümü, sunucu ve
git koruması değişemez.

## 3. Güncel başlangıç sabitleri

- Çalışma ağacı, bu ek sözleşme dışında temiz olmalıdır.
- Çekirdek koşucu bugün **14/14** kapıdır; eski sözleşmedeki 10/10 sayımı güncel değildir.
- Tarayıcı koşucu **4/4** kalmalıdır.
- `npm run gates` kabulü: **14/14 core + 4/4 browser**, exit `0`.
- Mevcut `--json` sonuç şeması ve sonuçlardaki tam `stdout`/`stderr` alanları değişmez.

## 4. Uygulama ve kanıt sırası

1. HEAD/dal/tam status ve izinli yolların başlangıç SHA-256 değerleri kaydedilir.
2. Claude planı, herhangi bir test/koşucu değişikliğinden önce yazılır.
3. İlk sözleşmenin §3 davranışı dar bir yardımcıyla uygulanır: PASS olmayan her sonuç özetinin
   hemen ardından iki akış ayrı sabit etiketle gösterilir; boş akış `(boş)`; sınır ve kesilme
   etiketi sabittir; tanılayıcı son bölüm korunur; orijinal UTF-8 uzunluğu raporlanır.
4. PASS çocukların tam akışları insan çıktısına basılmaz.
5. `--json` stdout'u tek parse edilebilir JSON belgesi olarak kalır.
6. Davranış testi üretim whitelist'ini veya gerçek smoke dosyalarını değiştirmez; geçici Atlas
   kopyasında açık, raporlanan mekanik fixture kullanır.
7. İlk sözleşme §4'teki yedi pozitif/negatif senaryo otomatik ölçülür. Her komut ve gerçek exit kodu
   ham kanıtta saklanır.
8. `npm run gates`, bağımsız `gates:core`, bağımsız `gates:browser`, davranış testi ve
   `git diff --check` çalıştırılır.
9. Ürün/veri/manifest SHA-256 değerleri başlangıç ve sonda birebir aynı olmalıdır.
10. Claude commit, push, merge, PR veya sonraki fazı başlatmadan Codex denetimini bekler.

## 5. Kabul ölçütleri

1. Gerçek değişen test/koşucu yolları §2'deki üç yolun dışına çıkmaz; `package.json` gerekmediyse
   değiştirilmez.
2. İlk sözleşmenin yedi senaryosu otomatik PASS verir ve yapay HARNESS ERR'nin asıl `stderr`
   metni insan-okur logunda görünür.
3. Uzun akışta sabit sınır, açık kesilme etiketi, orijinal uzunluk ve son bölüm kanıtlanır.
4. Timeout/signal yolunda çıktı korunur; sunucu ve çocuk süreç kalmaz.
5. JSON stdout tek belge ve geriye uyumludur; açıklama metni stdout'a sızmaz.
6. Başarı özeti ve 4/4 browser davranışı değişmez; PASS akışları logu şişirmez.
7. Kirli başlangıç ve koşum sırasında kirlenme korumaları zayıflamaz.
8. `npm run gates`: 14/14 core + 4/4 browser, exit 0.
9. `index.html`, türetilmiş veri/manifest, ses ve içerik dosyaları bayt-birebir değişmez.
10. Tam status yalnız §2 ve teslim yollarını gösterir; `git diff --check` temizdir.

## 6. Durma noktası

Batch F tesliminden sonra dur. Editoryal uyumlama, Content Freeze, erişilebilirlik, telefon/tablet,
native, deploy veya mağaza işine geçme. Commit ancak Codex ön-commit PASS ve Zeynep'in açık izniyle
oluşturulur.

