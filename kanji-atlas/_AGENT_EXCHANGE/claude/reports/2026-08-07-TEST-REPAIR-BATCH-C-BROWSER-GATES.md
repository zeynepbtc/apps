# TEST REPAIR BATCH C — TAŞINABİLİR TARAYICI KAPILARI · TESLİM RAPORU

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-TEST-REPAIR-BATCH-C-BROWSER-GATES.md` |
| Sözleşme SHA-256 | `8fc4ea7a12ff1ed95af6c365c8273158f426843c27d43cbf691487e460e25246` |
| Batch B kapanışı | `codex/audits/2026-08-07-TEST-REPAIR-BATCH-B-CLOSURE.md` — **PASS** (okundu) |
| Başlangıç commit | **`f6567d560312ec5e04d80eacb1eaa04166454749`** |
| Dal | **`repair/batch-c-browser-gates-2026-08-07`** |
| Ürün değişikliği | **YOK** — `index.html`, manifest, ses, `run-core-gates.mjs`, onboarding testleri **dokunulmadı** |
| Batch D / arşiv / a11y / merge / deploy / store | **BAŞLATILMADI** |

---

## 1. Değişen dosyalar (yalnız izin verilenler)

```
A  kanji-atlas/package.json
A  kanji-atlas/package-lock.json
A  kanji-atlas/.gitignore
A  kanji-atlas/_faz2/run-browser-gates.mjs
M  kanji-atlas/_faz2/smoke_sources.js
M  kanji-atlas/_faz2/smoke_backup.js
M  kanji-atlas/_faz2/smoke_recognition.js
+  _AGENT_EXCHANGE/claude/reports/… ve evidence/…
```

Doğrulama (`git diff` başlangıç commit'ine karşı):

| Dosya | Durum |
|---|---|
| `kanji-atlas/index.html` | **DEĞİŞMEDİ** ✅ |
| `kanji-atlas/_faz2/run-core-gates.mjs` | **DEĞİŞMEDİ** ✅ |
| `kanji-atlas/audio-manifest.json` | **DEĞİŞMEDİ** ✅ |
| `kanji-atlas/audio/**` | **0 dosya** ✅ |
| onboarding testleri | **0 dosya** ✅ |
| `native/package.json` | **DEĞİŞMEDİ** ✅ |

---

## 2. Paket sınırı (sözleşme §1)

`kanji-atlas/package.json` — **Atlas kökünde**, `_faz2/` içinde **değil** (oradaki `.gitignore` `package.json`/`package-lock.json`'ı yok sayıyor; sözleşme bunu açıkça uyarmıştı).

```json
"private": true,
"engines": { "node": ">=22.0.0 <25.0.0" },     // Claude 22 + Codex 24
"devDependencies": { "playwright": "1.56.0" }   // TAM sürüm — ^ ~ latest YOK
"scripts": {
  "gates:install-browser": "playwright install chromium",
  "gates:core":            "node _faz2/run-core-gates.mjs",
  "gates:browser":         "node _faz2/run-browser-gates.mjs",
  "gates":                 "npm run gates:core && npm run gates:browser"
}
```

`package-lock.json`: **lockfileVersion 3**, 4 paket düğümü (`playwright 1.56.0`, `playwright-core 1.56.0`, `fsevents 2.3.2`). npm ile üretildi.

`.gitignore` (Atlas kökü): `node_modules/` · Playwright çıktıları (`playwright-report/`, `test-results/`, `blob-report/`, `.playwright/`, `playwright/.cache/`) · günlükler · yerel OS artıkları (`.DS_Store`, `._*`, `Thumbs.db` …). **`package.json` ve `package-lock.json` bilerek yok sayılmıyor** — kilitli kurulumun yeniden üretilebilirliği için ikisi de sürümlenir. `node_modules` yok sayıldığı `git check-ignore` ile doğrulandı.

`native/package.json` **dokunulmadı**, Capacitor bağımlılıkları kopyalanmadı.

---

## 3. Sahipli yerel sunucu (sözleşme §2)

`run-browser-gates.mjs` içinde, **yalnız `node:http`** — Python veya harici araç yok.

| Gereklilik | Uygulama |
|---|---|
| Yalnız loopback | `server.listen(0, "127.0.0.1", …)` |
| Port `0`, OS atar | Ölçülen farklı portlar: **44341 · 34651 · 38001 · 34711 · 41323 · 36837 · 45355 · 43217 · 36877 · 34633** — hiçbiri sabitlenmedi, hiçbiri assertion değil |
| Yalnız Atlas kökü altı | `decodeURIComponent` try/catch · null bayt reddi · `path.posix.normalize` · `path.resolve` + `path.relative` ile **son savunma** |
| Yöntem kısıtı | `GET`/`HEAD` dışı → **405** (`Allow` başlığıyla) |
| `/` ve `/index.html` | `/` → `/index.html`; dizin istekleri `index.html`'e düşer |
| MIME | html/js/mjs/json/css/mp3/wav/ogg/png/jpg/gif/svg/webp/ico/woff/woff2/ttf/otf/txt/map/webmanifest |
| Listening beklenir | `listen` geri çağrısı çözülmeden hiçbir test başlamaz |
| `SMOKE_URL` | Her çocuğa `env` ile geçer |
| Her yolda kapanır | `finally { await closeServer() }` + `SIGINT`/`SIGTERM` işleyicileri + kirli başlangıçta hiç açılmaz |

---

## 4. Üç smoke testinin taşınabilirliği (sözleşme §3)

| Test | Kaldırılan | Eklenen |
|---|---|---|
| `smoke_sources.js` | `file://` + `__dirname` ile yerel dosya açma | `SMOKE_URL` (doğrulanır), `try/finally`, `catch` → exit 2 |
| `smoke_backup.js` | **Python sunucu sahipliği**, sabit port **8921**, `/home/claude/apps-deploy/kanji-atlas` cwd, 900 ms uyku | `SMOKE_URL`, `try/finally` |
| `smoke_recognition.js` | **Python sunucu sahipliği**, sabit port **8901**, aynı `/home/claude` cwd, 900 ms uyku | `SMOKE_URL`, `try/finally` |

**Assertion'lar, selector'lar ve akış DEĞİŞMEDİ.** Ürün geçsin diye hiçbir şey gevşetilmedi; mevcut düzeltme notları (`.rec-hint` vs `.tip-pill` ayrımı, lifecycle-flush çözümü) olduğu gibi korundu.

Yorumsuz kodda `/home/claude`, `8901`, `8921`, `python3`, `http.server` **sıfır eşleşme** (dört dosyada ölçüldü; kalan eşleşmeler yalnız neyin kaldırıldığını belgeleyen yorum satırlarında).

`SMOKE_URL` olmadan doğrudan çağrılırsa üçü de kısa yapılandırma mesajıyla **exit 2** verir:
```
smoke_sources        exit=2 · YAPILANDIRMA HATASI: SMOKE_URL tanımlı değil.
smoke_backup         exit=2 · (aynı)
smoke_recognition    exit=2 · (aynı)
```

---

## 5. Pozitif kanıtlar

### P1 · Kilitli kurulum
```
$ npm ci --no-audit --no-fund        → added 2 packages in 643ms
playwright 1.56.0 · playwright-core 1.56.0 · lockfileVersion 3
```

### P2 · Chromium kurulumu / doğrulanmış yeniden kullanım
```
$ npm run gates:install-browser      exit=0
> playwright install chromium
chromium executablePath: /opt/pw-browsers/chromium-1194/chrome-linux/chrome
Chromium 141.0.7390.37
```
Bu konteynerde `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` ile **mevcut ikili yeniden kullanılıyor** (indirme yapılmıyor). Gerçek Mac'te aynı script indirmeyi yapacaktır.

### P3 · Tarayıcı kapıları 3/3
```
Sunucu : http://127.0.0.1:44341/index.html  (127.0.0.1, port OS tarafından atandı)
  ✅ PASS  smoke_sources.js        13696 ms
  ✅ PASS  smoke_backup.js         29946 ms
  ✅ PASS  smoke_recognition.js   191022 ms
Sunucu kapatıldı · port 44341
Toplam: 3/3 PASS · 234729 ms · Ağaç koruması: ✅
✅ TARAYICI KAPILARI GEÇTİ                                   exit=0
```

### P4 · Tam yayın komutu (`npm run gates`) — önce core, sonra browser
```
> gates:core     → 10/10 PASS · 540 ms      ✅ ÇEKİRDEK KAPILAR GEÇTİ
> gates:browser  →  3/3 PASS · 233123 ms    ✅ TARAYICI KAPILARI GEÇTİ
EXIT=0
```
`run-core-gates.mjs` **değiştirilmedi**; zincirleme `&&` ile npm script katmanında kuruldu, iki katmandan biri düşerse sonuç non-zero olur.

### P5 · `--json` (geçen paket)
```
serverUrl: http://127.0.0.1:34651/index.html | port: 34651
sıra: smoke_sources.js -> smoke_backup.js -> smoke_recognition.js   (sözleşme sırası ✅)
totals: {"total":3,"pass":3,"fail":0,"timeout":0,"other":0,"notRun":0} | overallPass: true
guard.unchanged: true | gitSha: 3d173ea3
```

### P6 · İki çalışma dizininden eşdeğer sonuç
| Konum | Sonuç |
|---|---|
| `kanji-atlas/` | 3/3 PASS · exit 0 · port 44341 |
| depo kökü (`apps-deploy/`) | 3/3 PASS · exit 0 · port 34651 |

### P7 · Bağımsız taşınmış kopya, kendi kilitli kurulumuyla
```
/tmp/reloc-c/kanji-atlas · npm ci → added 2 packages · gates:install-browser exit=0
/home/claude yolu: YOK
Sunucu : http://127.0.0.1:36877 … sonra 34633
  ✅ PASS  smoke_sources.js        13844 ms
  ✅ PASS  smoke_backup.js         29457 ms
  ✅ PASS  smoke_recognition.js   192604 ms
Toplam: 3/3 PASS · Git koruması: KULLANILAMIYOR (git yok) → çökmedi
✅ TARAYICI KAPILARI GEÇTİ
```

---

## 6. Negatif kanıtlar

### N1 · Meşgul sabit port koşucuyu etkilemiyor ✅
Eski sabit portlar **8901 ve 8921 kasıtlı olarak işgal edildi**; koşucu port `0` kullandığı için etkilenmedi ve `38001`'i aldı. Aynı anda birden fazla koşum da çakışmadan çalıştı.

### N2 · Bir tarayıcı testi exit≠0 → kalanlar yine koşar ✅
```
❌ FAIL  smoke_sources.js        35 ms exit=3
✅ PASS  smoke_backup.js      29320 ms     ← GERÇEK test, sonrasında koştu
✅ PASS  smoke_recognition.js    30 ms     ← (süre için hızlı stub)
Toplam: 2/3 PASS · FAIL 1 · Sunucu kapatıldı · port 34711        exit=1
```

### N3 · Asılan test → TIMEOUT, sonlandırma, artık süreç/port YOK ✅
```
⏱ TIMEOUT  smoke_backup.js  4004 ms signal=SIGTERM   (--timeout-ms=4000)
Toplam: 2/3 PASS · TIMEOUT 1 · Sunucu kapatıldı · port 41323      exit=1

Koşumdan sonra: hayatta çocuk süreç = 0 · port 41323 dinleyen = 0
```

### N4 · Koşum sırasında izlenen dosya mutasyonu → kapı düşer, **geri alınmaz** ✅
```
✅ PASS ×3  (testlerin hepsi "geçti")
Ağaç koruması: ❌ KOŞUM SIRASINDA AĞAÇ DEĞİŞTİ
     M kanji-atlas/audio-manifest.json
❌ TARAYICI KAPILARI GEÇMEDİ                                      exit=1

Koşum sonrası git status:  M kanji-atlas/audio-manifest.json   → geri ALINMADI ✅
```

### N5 · Zaten kirli ağaç → **sunucu bile açılmadan** reddedilir ✅
```
❌ KIRLI BAŞLANGIÇ — yayın kapısı koşumu TEMİZ ağaçta başlamalıdır.
   Sunucu AÇILMADI, hiçbir test çalıştırılmadı.                   exit=1

Çıktıdaki "Sunucu :" satırı sayısı = 0   → sunucu gerçekten açılmadı
Kirlilik korundu ✅
```

### N6 · Yol geçişi Atlas kökü dışını okuyamıyor ✅
Prob, koşucunun **gerçek** sunucusuna dokuz farklı saldırı denedi:
```
✓ engellendi  HTTP 404  /../../../../etc/passwd
✓ engellendi  HTTP 404  /%2e%2e/%2e%2e/%2e%2e/etc/passwd
✓ engellendi  HTTP 404  /..%2f..%2f..%2fetc%2fpasswd
✓ engellendi  HTTP 404  /audio/../../../../etc/passwd
✓ engellendi  HTTP 404  /%2E%2E%2F%2E%2E%2Fetc/passwd
✓ engellendi  HTTP 404  /index.html/../../../../etc/passwd
✓ engellendi  HTTP 400  /%00/etc/passwd
✓ engellendi  HTTP 400  /....//....//etc/passwd
✓ engellendi  HTTP 400  /%c0%ae%c0%ae/etc/passwd
✓ POST /index.html          -> HTTP 405
✓ GET  /index.html          -> HTTP 200      ← meşru istek çalışıyor
✓ GET  /audio/kana/a.mp3    -> HTTP 200      ← varlıklar servis ediliyor
✅ SUNUCU GUVENLIGI GECTI (9 deneme, 0 sızıntı)
```

### N7 · `--json` düşen pakette de geçerli ✅
```
decision: FAIL | overallPass: false | port: 43217
smoke_sources: FAIL exit=3 | totals: {"total":3,"pass":2,"fail":1,…} | sıra doğru: true
```

---

## 7. Komutlar, çıkış kodları, süreler

```
npm ci --no-audit --no-fund                                   exit=0   2 paket · 643 ms
npm run gates:install-browser                                 exit=0   chromium yeniden kullanıldı
(kanji-atlas/) node _faz2/run-browser-gates.mjs               exit=0   3/3 · 234729 ms · port 44341
(apps-deploy/) node kanji-atlas/_faz2/run-browser-gates.mjs --json  exit=0   3/3 · port 34651
(kanji-atlas/) npm run gates                                  exit=0   core 10/10 (540ms) + browser 3/3 (233123ms)
(/tmp/reloc-c/kanji-atlas) npm ci && node _faz2/run-browser-gates.mjs  exit=0   3/3 · port 34633
node _faz2/smoke_{sources,backup,recognition}.js  (SMOKE_URL yok)     exit=2   yapılandırma mesajı
(/tmp/c2) node _faz2/run-browser-gates.mjs                    exit=1   N2  FAIL exit=3, kalanlar koştu
(/tmp/c3) node _faz2/run-browser-gates.mjs --timeout-ms=4000  exit=1   N3  TIMEOUT SIGTERM
(/tmp/c45) node _faz2/run-browser-gates.mjs                   exit=1   N4  ağaç değişti
(/tmp/c45 kirli) node _faz2/run-browser-gates.mjs             exit=1   N5  sunucu açılmadı
(/tmp/c6) node _faz2/run-browser-gates.mjs                    exit=0   N6  9 geçiş denemesi engellendi
(/tmp/c2) node _faz2/run-browser-gates.mjs --json             exit=1   N7  geçerli JSON
node _faz2/run-browser-gates.mjs --help                       exit=0   test koşmadı
node _faz2/run-browser-gates.mjs --bilinmeyen                 exit=1   kullanım hatası
```

**Sürümler:** node `v22.22.2` · npm `10.9.7` · git `2.43.0` · **playwright `1.56.0`** (kilitli) · playwright-core `1.56.0` · **Chromium `141.0.7390.37`** (`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`) · Ubuntu 24.04.4 LTS / x86_64 · lockfileVersion 3.

**Atanan portlar (dinamik olduğunun kanıtı, hiçbiri assertion değil):** 33341 · 34633 · 34651 · 34711 · 36837 · 36877 · 38001 · 40331 · 41323 · 42665 · 43217 · 44341 · 45355.

---

## 8. Geri dönüş noktası ve son durum

| Geri dönüş | |
|---|---|
| Nokta | **`f6567d560312ec5e04d80eacb1eaa04166454749`** |
| Komut | `git checkout f6567d5 -- kanji-atlas/_faz2/smoke_sources.js kanji-atlas/_faz2/smoke_backup.js kanji-atlas/_faz2/smoke_recognition.js` + `git rm kanji-atlas/package.json kanji-atlas/package-lock.json kanji-atlas/.gitignore kanji-atlas/_faz2/run-browser-gates.mjs` |
| Veya | dalı hiç birleştirmemek |
| Etki | Üç test eski hâline döner, yeni dört dosya kalkar. Ürün zaten hiç değişmediği için **başka etki yok** |

**Süreç temizliği:** N3'ten sonra hayatta çocuk süreç **0**, koşucu portu dinleyen **0**. Tüm koşumlarda `Sunucu kapatıldı · port <n>` satırı üretildi.

**Son ağaç durumu:** izin verilenler dışında değişen izlenen dosya **YOK**; `node_modules` `.gitignore` ile dışarıda (doğrulandı); geçici fixture'ların hepsi (`/tmp/c2 c3 c45 c6`, `/tmp/reloc-c`) **depo dışında**.

---

## 9. Bilinen sınırlar ve riskler

| # | Konu | Not |
|---|---|---|
| 1 | **Gerçek Mac/harici diskte koşulmadı** | Konteynerde doğrulandı. Kilitli kurulum + 3/3'ü **Codex gerçek workspace'te üretmeli** — kabul ölçütü de bunu istiyor. Geçmiş gibi göstermiyorum |
| 2 | `gates:install-browser` burada **indirme yapmadı** | `PLAYWRIGHT_BROWSERS_PATH` ile mevcut Chromium yeniden kullanıldı. Mac'te ilk çalıştırmada gerçek indirme olacak; sözleşme "kurulum **veya doğrulanmış yeniden kullanım**" dediği için bu yol seçildi |
| 3 | Chromium sürümü lockfile'da **sabitlenmiyor** | Playwright sürümü sabit; Chromium revizyonu (1194) o sürümün eki. Mac'te aynı playwright 1.56.0 aynı revizyonu getirir |
| 4 | `smoke_recognition` ~191 sn | Tarayıcı katmanının süresini tek başına belirliyor. Bölme/paralelleştirme **kapsam dışı** bırakıldı |
| 5 | Zaman aşımı 300 sn/test | Recognition'a ~%57 pay. Çok yavaş bir makinede yetersiz kalırsa `--timeout-ms` ile artırılabilir |
| 6 | Ağaç koruması **tüm depoyu** kapsıyor | Batch B ile aynı bilinçli seçim |
| 7 | N2/N3/N6 fixture'larında bazı testler **hızlı stub'la** değiştirildi | Yalnız **süre** için; her kanıtta en az bir GERÇEK tarayıcı testi korundu (N2'de `smoke_backup` gerçek koştu, 29 sn). Denetimin konusu koşucunun **denetim davranışı** |
| 8 | Bu partide **hiçbir assertion kırmızı çıkmadı** | Sözleşme "mevcut bir assertion gerçekten kırmızıysa dur ve raporla" diyordu — **böyle bir durum oluşmadı**; ürüne dokunulmadı |

---

## 10. Kabul ölçütleri karşılığı

| Sözleşme ölçütü | Durum |
|---|---|
| Kilitli kurulum yeniden üretilebilir, paket dosyaları Atlas kökünde | ✅ `npm ci` · lockfileVersion 3 |
| Üç testte ve koşucuda `/home/claude` yolu veya sabit port **kalmadı** | ✅ yorumsuz kodda 0 eşleşme |
| Tek koşucu-sahipli loopback sunucu, OS atamalı port, **her zaman kapatılır** | ✅ 13 farklı port ölçüldü · her koşumda kapanış satırı |
| Tarayıcı katmanı Claude ortamında 3/3 | ✅ |
| Tam yayın girişi core 10/10 → browser 3/3 | ✅ `npm run gates` exit 0 |
| Pozitif ve negatif kanıtlar ürün değişikliği olmadan karşılandı | ✅ P1–P7 · N1–N7 |
| Yalnız izin verilen dosyalar değişti | ✅ sha256 ile doğrulandı |
| Rapor: sözleşme hash'i, taban/uç SHA, sürümler, dosya listesi, komutlar, çıkış kodları, süreler, portlar, geri dönüş noktası, süreç temizliği, son durum | ✅ §1–§8 |
| Codex gerçek Mac/harici birimde kilitli kurulum + 3/3 üretmeli | ⏳ **bekliyor** |

---

**Batch C açık.** Codex bundle'ı bağımsız inceleyip gerçek Mac/harici disk tarayıcı kapısını yeniden üretene kadar kapanmaz. Kendi inisiyatifimle sonraki test-onarım veya yayın fazına **geçmiyorum**.
