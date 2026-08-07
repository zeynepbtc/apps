# BATCH C — DAR DÜZELTME · TESLİM RAPORU

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-TEST-REPAIR-BATCH-C-CORRECTION.md` |
| Sözleşme SHA-256 | `6e9d2580f6203be6324282652484fc4166ee2c6fe60d2a311e8aae94112c29db` |
| Codex incelemesi | `codex/audits/2026-08-07-TEST-REPAIR-BATCH-C-REVIEW.md` — **FAIL**, üç bulgu (okundu, üçü de kabul edildi) |
| Taban commit | **`28e394db76d4ae48aba9c3e452c5b6991d782c8f`** |
| Dal | `repair/batch-c-browser-gates-2026-08-07` (mevcut dal sürdürüldü) |
| Değişen dosya | **3** — `run-browser-gates.mjs` · `smoke_sources.js` · `tool-versions.txt` |
| Batch D / sonraki faz | **BAŞLATILMADI** |

---

## 1. Bulgu 1 — Fiziksel kapsama (sembolik bağ kaçışı)

**Kabul.** `safeResolve()` yalnız **sözcüksel** denetim yapıyordu; `statSync`/`createReadStream` sembolik bağları izlediği için Atlas içindeki bir bağ dışarıyı gösterebiliyordu. `..` içermediği için sözcüksel denetimden temiz geçiyordu.

### Uygulanan çözüm

```js
const ATLAS_REAL = realpathSync(ATLAS);            // kanonik kök, bir kez

function physicalTarget(abs) {
  let real;
  try { real = realpathSync(abs); } catch { return null; }   // yok/kırık bağ → 404
  const rel = path.relative(ATLAS_REAL, real);
  if (rel === "" || rel.startsWith("..") || path.isAbsolute(rel)) return false;  // KAÇIŞ → 403
  return real;
}
```

Akış: sözcüksel çözüm → **kanonik çözüm + kapsama doğrulaması** → **kanonik yoldan `O_NOFOLLOW` ile aç** → **içeriği o fd'den akıt** (yolu ikinci kez açmayız).

- Dizin istekleri: `index.html` **aynı** `physicalTarget` kuralından geçer — sembolik bağlı dizinin `index.html`'i dışarıdaysa reddedilir.
- Var olmayan dosya → normal **404**; bozuk yol → **400**; kaçış → **403**.
- `fstatSync(fd)` ile tür/boyut alınır (yolu yeniden `stat`'lamayız).

**Dürüst artık sınır (sözleşme §1 son cümlesi):** `O_NOFOLLOW` son bileşen yarışını kapatır ve içerik doğrulanan fd'den akar; ancak doğrulama ile açma arasında Atlas ağacını değiştirebilen bir saldırgana karşı **tam TOCTOU bağışıklığı** Node yerleşikleriyle taşınabilir biçimde sağlanamaz. Bu yerel test sunucusu böyle bir saldırganı varsaymaz; sınır kodun başlığında da yazılıdır.

### Kanıt 1–3

Geçici kopyada (`/tmp/sym`, depo dışı) Atlas **içine** üç bağ kuruldu: dosya bağı → dışarıdaki nöbetçi, `/etc/passwd` bağı, dizin bağı → dışarıdaki `index.html`.

```
✓ engellendi  HTTP 404  kodlanmis ../          /../../../../etc/passwd
✓ engellendi  HTTP 404  kodlanmis %2e%2e       /%2e%2e/%2e%2e/%2e%2e/etc/passwd
✓ engellendi  HTTP 404  kodlanmis %2f          /..%2f..%2f..%2fetc%2fpasswd
✓ engellendi  HTTP 400  null bayt              /%00/etc/passwd
✓ engellendi  HTTP 403  SEMBOLIK BAG · dosya   /kacak-dosya.html
✓ engellendi  HTTP 403  SEMBOLIK BAG · /etc    /passwd.html
✓ engellendi  HTTP 403  SEMBOLIK BAG · dizin   /kacak-dizin/
✓ engellendi  HTTP 403  SEM.BAG dizin+index    /kacak-dizin/index.html
✓ POST /index.html -> 405   ✓ GET /index.html -> 200
✓ GET /audio/kana/a.mp3 -> 200   ✓ GET / -> 200
✅ KAPSAMA GECTI (8 deneme, 0 sızıntı)                          runner exit=0
```

### Karşı kanıt — **düzeltme öncesi kod aynı fixture'da sızdırıyordu**

```
✗ SIZDIRDI   HTTP 200  SEMBOLIK BAG · dosya   /kacak-dosya.html
✗ SIZDIRDI   HTTP 200  SEMBOLIK BAG · /etc    /passwd.html
✗ SIZDIRDI   HTTP 200  SEMBOLIK BAG · dizin   /kacak-dizin/
✗ SIZDIRDI   HTTP 200  SEM.BAG dizin+index    /kacak-dizin/index.html
❌ KAPSAMA BASARISIZ                                            eski kod kararı: FAIL
```

Kodlanmış `..` denemeleri **eski kodda da** engelliydi — yani bulgu tam olarak Codex'in tarif ettiği yerde: sözcüksel denetim yeterliydi sanılıyordu, fiziksel değildi.

---

## 2. Bulgu 2 — `smoke_sources.js` temizlik sınırı

**Kabul.** Eskiden:
```js
const b = await chromium.launch(...); const p = await b.newPage();
try {
```
`newPage()` atarsa `try/finally`'ye hiç girilmiyordu → `b.close()` garanti değildi.

**Düzeltme:** `try` sınırı tarayıcı oluşur oluşmaz başlıyor:
```js
const b = await chromium.launch({headless:true});
try {
  const p = await b.newPage();
```
**Assertion, selector, navigasyon ve çıkış anlamları DEĞİŞMEDİ** — yalnız iki satırın sırası.

### Kanıt 4

Geçici kopyada `newPage()`'den **hemen önce** kasıtlı hata:
```
başlangıçta çalışan chromium: 0
kosucu exit=1 · smoke_sources: FAIL exit=2
stderr: HARNESS ERR FIXTURE: launch SONRASI, newPage ONCESI kasitli hata
4 sn sonra çalışan chromium: 0
✅ tarayıcı sızıntısı YOK
```

**Dürüst not:** aynı fixture'ı **eski** sürümle de koştum; bu ortamda o da süreç bırakmadı (0 → 0), çünkü Node süreci ölünce Playwright sürücü bağlantısı düşüyor ve Chromium onunla birlikte kapanıyor. Yani gözlemlenebilir bir sızıntı **üretemedim**. Bulgu yine de geçerli: sözleşme "başarılı biçimde oluşturulan tarayıcı garantili temizlik sınırının içinde olmalı" diyor ve eski yapı bu garantiyi **vermiyordu** — davranışın bu ortamda tesadüfen iyi çıkması garanti değildir. Sızıntıyı gördüğümü iddia etmiyorum; düzeltmeyi sözleşme gereği yaptım.

---

## 3. Bulgu 3 — Trailing whitespace

**Kabul.** Kaynağı ölçtüm: `chrome --version` çıktısı sonunda boşluk bırakıyor, o da `tool-versions.txt`'nin 6. satırına geçmiş.

```
kanji-atlas/…/tool-versions.txt:6: trailing whitespace.
+chromium             Chromium 141.0.7390.37␠      ← ␠ = fazladan boşluk (burada görünür yazıldı)
```

> Not: bu alıntıyı **birebir** (sondaki gerçek boşlukla) yazınca raporun kendisi
> `git diff --check`'i kırdı — ilk denemede tam olarak bu oldu. Boşluk `␠` işaretiyle
> gösterildi ki kanıt okunabilir kalsın ama teslim diff'i temiz olsun.

Dosya `sed 's/[[:space:]]*$//'` benzeri temizlikle yeniden üretildi ve üretim satırına kalıcı `sed` eklendi (aynı hata tekrarlanmasın diye).

```
$ git diff --check f6567d5..<yeni uç>      →  bulgu YOK ✅
```

---

## 4. Kapsam doğrulaması

```
28e394d'ye göre değişen:
 M kanji-atlas/_faz2/run-browser-gates.mjs
 M kanji-atlas/_faz2/smoke_sources.js
 M kanji-atlas/_AGENT_EXCHANGE/.../tool-versions.txt
 + düzeltme raporu ve ek kanıtlar (izin verilen yol)

İzin verilenler dışında değişen: YOK ✅
```

| Dosya | Durum |
|---|---|
| `package.json` · `package-lock.json` · `.gitignore` | **DEĞİŞMEDİ** ✅ |
| `smoke_backup.js` · `smoke_recognition.js` | **DEĞİŞMEDİ** ✅ |
| `run-core-gates.mjs` · `index.html` | **DEĞİŞMEDİ** ✅ |

Bağımlılık/sürüm değişikliği yok; assertion veya selector değişikliği yok.

---

## 5. Kanıt 5–6 · Mevcut davranış korundu

Düzeltme sonrası temiz ağaçta:

```
npm run gates
  gates:core     → 10/10 PASS   ✅ ÇEKİRDEK KAPILAR GEÇTİ
  gates:browser  →  3/3  PASS   ✅ TARAYICI KAPILARI GEÇTİ
EXIT=0
```
(Tam çıktı: `../evidence/2026-08-07-test-repair-c-browser-gates/correction-full-release-13of13.log`
ve teslim ucunda tekrarı: `…/correction-full-release-at-delivery-tip.log` — **3/3, `EXIT=0`, 242317 ms**.)

> **SHA öz-referansı hakkında dürüst not:** kanıt loglarındaki `Git SHA` satırı, o koşumun
> yapıldığı andaki commit'tir. Bir rapor kendi commit SHA'sını içeremez; nihai uç teslim
> mesajında bildirilir. İki koşum arasında **kod dosyaları bayt-aynıdır** (ölçüldü:
> `run-browser-gates.mjs`, `smoke_sources.js`, `run-core-gates.mjs` → AYNI); aradaki tek fark
> bu raporun kendisidir.

Ayrıca koşum sırasında **kirli ağaç koruması kendi işini gösterdi**: düzeltmeler commit'lenmeden `npm run gates` çalıştırıldığında core runner kirli başlangıcı yakalayıp reddetti — beklenen davranış.

---

## 6. Komutlar ve çıkış kodları

```
(/tmp/sym)   node _faz2/run-browser-gates.mjs --json          exit=0   8 deneme, 0 sızıntı
(/tmp/sym)   node _faz2/run-browser-gates-OLD.mjs --json      exit=1   4 sembolik bağ SIZDIRDI
(/tmp/clean) node _faz2/run-browser-gates.mjs --json          exit=1   erken hata · chromium 0→0
git diff --check f6567d5..<uç>                                exit=0   bulgu yok
(kanji-atlas/) npm run gates                                  exit=0   core 10/10 + browser 3/3
node _faz2/run-browser-gates.mjs --help                       exit=0
node --check _faz2/smoke_sources.js                           exit=0
```

**Sürümler (değişmedi):** node `v22.22.2` · npm `10.9.7` · git `2.43.0` · playwright **1.56.0** (kilitli) · Chromium **141.0.7390.37** · Ubuntu 24.04.4 / x86_64.

---

## 7. Geri dönüş ve son durum

| Geri dönüş | |
|---|---|
| Bu düzeltmeyi geri al | `git revert <düzeltme commit'i>` → Batch C'nin `28e394d` hâline döner |
| Yalnız sunucu düzeltmesini geri al | `git checkout 28e394d -- kanji-atlas/_faz2/run-browser-gates.mjs` |
| Tüm Batch C'yi geri al | dalı hiç birleştirmemek |

**Süreç/sunucu temizliği:** her koşumda `Sunucu kapatıldı · port <n>` üretildi; erken-hata fixture'ından sonra hayatta Chromium **0**.
**Geçici fixture'lar:** `/tmp/sym`, `/tmp/clean` — **depo dışında**.
**Son ağaç:** temiz; izin verilenler dışında değişen yok; `git diff --check` bulgusuz.

---

## 8. Kabul ölçütleri karşılığı

| Sözleşme ölçütü | Durum |
|---|---|
| Dosya ve dizin için fiziksel sembolik bağ kaçışları engelli | ✅ 4 bağ senaryosu → 403 |
| `smoke_sources.js` sayfa oluşturma hata verse de tarayıcıyı kapatır | ✅ Kanıt 4 |
| Teslim diff'i tamamen whitespace-temiz | ✅ `git diff --check` bulgusuz |
| Mevcut Batch C davranışı 3/3 ve tam 13/13 | ✅ |
| Yalnız izin verilen dosyalar değişti | ✅ |
| Rapor: taban/uç SHA, komutlar, çıkış kodları, süreç ve sunucu temizliği, dosya listesi, geri dönüş, son temiz durum | ✅ §4–§7 |
| Codex kilitli Mac kurulumu + gerçek Chromium koşumu | ⏳ **bekliyor** |

---

**Batch C hâlâ açık.** Codex yapısal incelemeyi geçirene ve gerçek Mac/harici birimde kilitli kurulum + Chromium koşumunu üretene kadar kapanmaz. Sonraki test-onarım veya yayın fazına kendi inisiyatifimle **geçmiyorum**.
