# TEST REPAIR BATCH C DÜZELTME DENETİMİ

**Karar: PASS**  
**Claude teslim ucu:** `d7186bddfe5533f6156134cf04b05c5bc8a5b881`  
**İnceleme ortamı:** macOS arm64, harici birim üzerinde bağımsız detached worktree  
**Tarih:** 2026-08-07

## Kapsam

- Bundle doğrulandı ve arşivlendi.
- `f6567d5..d7186bd` için `git diff --check` bulgusuz.
- `28e394d..d7186bd` ürün kodunda yalnız sözleşmenin izin verdiği üç dosya değişti:
  - `_faz2/run-browser-gates.mjs`
  - `_faz2/smoke_sources.js`
  - kanıt altındaki `tool-versions.txt`
- Ek değişiklikler yalnız düzeltme raporu ve ham kanıt dosyalarıdır.

## Önceki üç bulgunun kapanışı

1. **Fiziksel kapsama:** hedef ve Atlas kökü kanonik yolla karşılaştırılıyor; dışarı yönelen dosya/dizin sembolik bağları reddediliyor. Dosya doğrulanmış fd üzerinden, `O_NOFOLLOW` ile açılıp akıtılıyor. Dizin `index.html` yolu aynı denetimden geçiyor.
2. **Tarayıcı temizliği:** `smoke_sources.js` içindeki `try/finally`, başarılı `chromium.launch()` çağrısından hemen sonra başlıyor; `newPage()` artık temizlik sınırının içinde.
3. **Whitespace:** `tool-versions.txt` sonundaki boşluk kaldırıldı; teslim diff'i temiz.

## Bağımsız gerçek Mac doğrulaması

Kilitli kurulum:

- `npm ci` — exit 0, `playwright@1.56.0`
- `npm run gates:install-browser` — exit 0, Chromium `141.0.7390.37` / build `1194`, mac-arm64

Nihai tam koşum:

- `npm run gates` — **exit 0**
- çekirdek: **10/10 PASS**
- gerçek Chromium: **3/3 PASS**
- sunucu: `127.0.0.1:57759`, port işletim sistemi tarafından dinamik atandı
- çalışma ağacı koşum boyunca değişmedi
- sunucu koşum sonunda kapatıldı

Not: kurulumdan hemen sonraki ilk tarayıcı denemesi üç hızlı başlangıç hatası verdi. Ardından ayrıntılı gerçek Chromium koşumu 3/3 geçti; nihai kabul için tam 13/13 zinciri yeniden baştan çalıştırıldı ve exit 0 verdi. Karar yalnız bu son temiz tam koşuma dayanır.

## Sonuç

Batch C düzeltmesi kabul edildi. Önceki FAIL kararı kapanmıştır; teslim koordinasyon dalına birleştirilebilir. Batch D bu denetimin kapsamında başlatılmamıştır.
