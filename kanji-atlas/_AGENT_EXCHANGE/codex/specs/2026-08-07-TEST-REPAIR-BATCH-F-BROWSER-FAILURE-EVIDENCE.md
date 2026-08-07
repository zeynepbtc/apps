# TEST REPAIR BATCH F — BROWSER FAILURE EVIDENCE

**Durum:** APPROVED / UYGULAMAYA HAZIR  
**Sahip:** Claude (plan + uygulama + kanıt) → sonraki Codex oturumu (bağımsız denetim)  
**Taban:** `98c1385478d9c83157b8a6ca4b99b29db4342c15`  
**Hedef dal:** `test/batch-f-browser-failure-evidence-2026-08-07`  
**Tarih:** 2026-08-07

## 1. Neden

Batch 19'da `smoke_backup.js`, Batch 20'de `smoke_recognition.js` birer kez `exit=2 / HARNESS ERR` verdi; tekrar koşumlarında ve bağımsız Mac denetimlerinde geçtiler. İnsan-okur modundaki `run-browser-gates.mjs` çocuk stdout/stderr'i bellekte topluyor fakat başarısızlıkta göstermiyor. Bu nedenle ilk hatanın asıl mesajı kayboluyor.

Bu batch flake'i tahmin ederek onarmaz. Bir sonraki tekrarın tanılanabilir olmasını sağlar.

## 2. Kapsam

Yalnız browser runner'ın başarısız çocuk sürecine ait yakalanmış stdout/stderr'i insan-okur çıktısında açık, sınırlı ve makinece test edilebilir biçimde göstermesi.

İzinli ürün/test dosyaları:

- `_faz2/run-browser-gates.mjs`
- `_faz2/tests/test_browser_gate_runner.mjs` veya mevcut runner davranış testinin kanonik dosyası
- gerekirse `package.json` yalnız mevcut test komutuna yeni runner testi eklemek için

Teslim belgeleri:

- `_AGENT_EXCHANGE/claude/plans/2026-08-07-TEST-REPAIR-BATCH-F-BROWSER-FAILURE-EVIDENCE-PLAN.md`
- `_AGENT_EXCHANGE/claude/reports/2026-08-07-TEST-REPAIR-BATCH-F-BROWSER-FAILURE-EVIDENCE.md`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-07-test-repair-batch-f/**`

`index.html`, içerik verileri, manifest, sesler, smoke assertion'ları, selector'lar, timeout değerleri, whitelist, sunucu güvenliği ve ürün davranışı değişemez.

## 3. Zorunlu davranış

İnsan-okur modunda PASS olmayan her çocuk için özet satırının hemen ardından:

- stdout ve stderr ayrı, sabit etiketlerle gösterilmeli;
- boş akış açıkça `(boş)` diye belirtilmeli;
- içerik UTF-8 olarak korunmalı;
- aşırı çıktı ana logu boğmamalı: her akış için belgelenmiş sabit bir üst sınır uygulanmalı ve kesilme açıkça işaretlenmeli;
- en tanılayıcı son bölüm korunmalı; toplam orijinal karakter/bayt uzunluğu raporlanmalı;
- runner yeni iz dosyası yazmamalı, çalışma ağacını kirletmemeli ve hassas veri ayıklıyormuş gibi gerçeğe aykırı bir iddiada bulunmamalı.

`--json` modunda mevcut tek-geçerli-JSON stdout sözleşmesi korunmalı. Sonuç nesnelerindeki `stdout` ve `stderr` alanları kaybolmamalı veya zayıflatılmamalı. İnsan açıklamaları stderr'e gidebilir; stdout yalnız JSON kalmalıdır.

## 4. Negatif ve pozitif kanıtlar

Fixture'lar gerçek ürün smoke testlerini değiştirmeden, taşınabilir geçici Atlas kopyasında en az şu durumları kanıtlamalıdır:

1. non-zero çocuk; hem stdout hem stderr dolu → iki akış görünür, runner exit 1.
2. non-zero çocuk; akışlardan biri boş → `(boş)` görünür.
3. çok uzun çıktı → üst sınır çalışır, kesilme etiketi ve orijinal uzunluk görünür, son bölüm korunur.
4. timeout/signal yolu → yakalanmış çıktı kaybolmaz; sunucu kapanır ve artık Chromium/çocuk süreç kalmaz.
5. `--json` başarısızlık → stdout parse edilebilir tek JSON; sonuç stdout/stderr alanları tam sözleşmeye uygun.
6. başarı yolu → mevcut insan özeti ve 4/4 davranışı korunur; PASS çocuklarının tam çıktısı gereksiz yere basılmaz.
7. kirli başlangıç ve koşum sırasında kirlenme korumaları değişmeden çalışır.

Fixture için whitelist'in üretimde dinamikleştirilmesi veya dosya taraması yasaktır. Test enjeksiyonu gerekiyorsa yalnız test kopyasında açık ve raporlanan mekanik dönüşüm kullanılabilir.

## 5. Kabul ölçütleri

1. Plan ürün/test değişikliğinden önce ayrı commit'tedir.
2. Değişiklik §2 beyaz listesi içindedir; ürün dosyası farkı 0'dır.
3. §3 davranışının tamamı otomatik negatif testlerle ölçülür.
4. JSON schema/alanları geriye uyumludur; `--json` stdout'una başka metin sızmaz.
5. Varsayılan timeout, whitelist sırası, assertion'lar, yerel sunucu ve git koruması değişmez.
6. `npm run gates`: 10/10 core + 4/4 browser, exit 0.
7. En az bir yapay HARNESS ERR kanıtında asıl stderr insan-okur logunda görünür.
8. `git diff --check` temiz; çalışma ağacı koşum sonunda yalnız izinli teslim değişikliklerini içerir.

## 6. Durma noktası

Batch F sonunda dur. Editoryal uyumlama, Content Freeze, erişilebilirlik, telefon/tablet, native, deploy veya mağaza işine geçme. Codex dönene kadar yalnız aşağıdaki geçiş belgesinde izin verilen salt-okunur hazırlık yapılabilir.
