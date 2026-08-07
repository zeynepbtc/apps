# TEST REPAIR BATCH E — HOME RECOMMENDATION DOM KAPISI · TESLİM RAPORU

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-TEST-REPAIR-BATCH-E-HOME-REC.md` |
| Sözleşme SHA-256 | `0d37611d9fd3c77b0d8c7482c2bf95e45e78eaf42ee6b31fcec22c6987e42557` |
| Taban commit | **`476374dcdc8dbbe5ac1148cba86faa847e7f2c03`** (birebir doğrulandı) |
| Dal | **`repair/batch-e-home-rec-2026-08-07`** |
| Uygulama commit'i | **`df5696c341bf08231e7fbceefc71f098b32121a4`** |
| Değişen kod dosyası | **2** — `_faz2/smoke_home_rec.js` · `_faz2/run-browser-gates.mjs` |
| Testin kendi sonucu | **57/57 PASS · fail=0** — assertion kırmızısı **YOK** |
| `gates:browser` (`--timeout-ms=900000`) | **4/4 PASS · EXIT=0** |
| `npm run gates` **varsayılan ayarla** | **KIRMIZI** — `smoke_home_rec.js` 300 s sınırında **TIMEOUT** |
| Karar gerektiren tek konu | **Süre bütçesi** (§ 5). Ürün hatası değil; ölçülmüş çevresel kök neden var. |
| Batch F / sonraki faz | **BAŞLATILMADI** |

> **Özet dürüst cümle:** Sözleşmenin istediği altyapı onarımı **tamamlandı ve kanıtlandı**.
> Ancak §6.7/§6.8'in istediği "varsayılan ayarlarla 4/4 ve 14/14" bu ortamda **sağlanamadı**;
> sebep bir assertion kırmızısı değil, testin süresidir. Kök nedeni ölçtüm, aşağıda veriyorum.
> §4 "runner'ın timeout davranışı değişmemeli" dediği için **varsayılanı kendi başıma yükseltmedim.**
> Karar Codex'e ait; üç seçeneği ölçümlerle §5.4'te sunuyorum.

---

## 1. Yapılan değişiklikler (yalnız izin verilen iki dosya)

### 1.1 `_faz2/smoke_home_rec.js` — altyapı onarımı

| Sözleşme §3 maddesi | Yapıldı |
|---|---|
| Python import/spawn ve sabit port tamamen kaldırıldı | ✅ `spawn`, `python3 -m http.server`, `8907` yok |
| URL yalnız `process.env.SMOKE_URL` | ✅ |
| `SMOKE_URL` yoksa anlaşılır hata + non-zero, **tarayıcı açmadan** | ✅ `exit 2`, 448 ms, Chromium 0→0 |
| `chromium.launch()` başarılı olur olmaz `try/finally` | ✅ `try {` doğrudan `launch()` satırının altında |
| `newPage()`, assertion'lar ve akış `try` içinde | ✅ |
| `finally` her başarı/hata yolunda tarayıcıyı kapatır | ✅ `finally { await b.close().catch(()=>{}); }` |
| Test sunucu kapatmaya çalışmaz | ✅ `srv.kill()` **iki yerden de** silindi; `process.exitCode` kullanılıyor |
| Zorunlu `/tmp/home_rec_*.png` yan etkisi kaldırıldı | ✅ yalnız `HOME_REC_SHOT_DIR` verilirse yazılır |

Mutlak yol `/home/claude/apps-deploy/kanji-atlas` kaldırıldı. Dosyada kalan tek `/home/claude`
ve `8907` geçişi **açıklama yorumundadır** (ne yapıldığını kayda geçirmek için); kod yolu yok.

Ekran görüntüsü artık şu yardımcı ile alınır — verilmezse **hiç dosya yazılmaz**:

```js
const SHOT_DIR = process.env.HOME_REC_SHOT_DIR || null;
const shot = async (p, ad) => {
  if (!SHOT_DIR) return;                        // normal koşumda hiç dosya yazılmaz
  const path = require("path"), fs = require("fs");
  fs.mkdirSync(SHOT_DIR, { recursive: true });
  await p.screenshot({ path: path.join(SHOT_DIR, ad) });
};
```

### 1.2 Korunan test anlamı (§3 ikinci bölüm)

**Hiçbir assertion, seçici, bekleme eşiği veya akış değiştirilmedi.** Değişmeyenler:
üç onboarding yolu (`a-hayir` / `ki-hayir` / `harita`), `.rec-hint` tekilliği, ≥44 px dokunma
hedefi, metin/rota/ARIA/`role`/`tabindex` kontrolleri, fare + Enter + Space akışları,
`.tip-pill` karşılıklı dışlaması, marker semantiği, 320 px taşma ölçümü, `pageerror` kontrolü.

Sayısal kanıt: test tek başına koşturulduğunda **`pass=57  fail=0`**
(`evidence/home-rec-tek-basina-57pass.log`). Yani **ürün kırmızısı yok**; §3'ün "gerçek kırmızı
çıkarsa dur" maddesi devreye girmiyor.

### 1.3 `_faz2/run-browser-gates.mjs` — tek satır

```diff
-const WHITELIST = ["smoke_sources.js", "smoke_backup.js", "smoke_recognition.js"];
+const WHITELIST = ["smoke_sources.js", "smoke_home_rec.js", "smoke_backup.js", "smoke_recognition.js"];
```

`--help` çıktısı kanonik sırayı doğruluyor:

```
Beyaz liste (sırayla):
  1. smoke_sources.js
  2. smoke_home_rec.js
  3. smoke_backup.js
  4. smoke_recognition.js
```

Güvenlik, dinamik port, fiziksel kapsama, timeout mekanizması, JSON, kirli-ağaç koruması ve
süreç temizliği kodunun **hiçbiri değişmedi** — beyaz liste dizisi dışında tek karakter dokunulmadı.

---

## 2. Pozitif kanıtlar

### 2.1 `gates:browser` — 4/4 PASS (açık `--timeout-ms` bayrağıyla, **kod değişikliği yok**)

```
run-browser-gates · 4 tarayıcı kapısı
Zaman aşımı  : 900000 ms / test
Sunucu       : http://127.0.0.1:37279/index.html  (port OS tarafından atandı)

  ✅ PASS      smoke_sources.js           13603 ms
  ✅ PASS      smoke_home_rec.js         219729 ms
  ✅ PASS      smoke_backup.js            32101 ms
  ✅ PASS      smoke_recognition.js      189091 ms

Sunucu kapatıldı · port 37279
Toplam: 4/4 PASS · FAIL 0 · TIMEOUT 0 · diğer 0 · 454618 ms
Ağaç koruması: ✅ koşum sırasında değişiklik YOK
EXIT=0
```

Bu koşum sırasında **eski sabit 8907 portu başka bir süreç tarafından tutuluyordu** (§7 ikinci
negatif kanıt) — gate yine de 4/4 geçti.

### 2.2 `gates:core` — 10/10 PASS

Varsayılan koşumun çekirdek yarısı sorunsuz: `10/10 PASS · EXIT=0`
(`evidence/gates-default-timeout-home-rec-TIMEOUT.log` ilk yarısı).

### 2.3 `--json` — geçerli JSON, dört test doğru sırada (§6.9)

```
1. smoke_sources.js    → PASS   13755 ms
2. smoke_home_rec.js   → PASS  367496 ms
3. smoke_backup.js     → PASS   29059 ms
4. smoke_recognition.js→ PASS  188543 ms
overallPass: true · EXIT=0
```

Anahtarlar: `schemaVersion, runner, nodeVersion, atlasDir, timeoutMs, gitSha, startedAt,
endedAt, totalDurationMs, guard, serverUrl, port, results, totals, overallPass, decision`.
Ham dosya: `evidence/browser-gates.json`.

---

## 3. `npm run gates` varsayılan ayarla — DÜRÜST KIRMIZI

```
gates:core     10/10 PASS · 545 ms
gates:browser  Zaman aşımı: 300000 ms / test
  ✅ PASS      smoke_sources.js           13319 ms
  ⏱ TIMEOUT   smoke_home_rec.js         300064 ms exit=2
  ✅ PASS      smoke_backup.js            28978 ms
  ✅ PASS      smoke_recognition.js      190224 ms
Toplam: 3/4 PASS · FAIL 0 · TIMEOUT 1 · EXIT=1
```

**Bunu gizlemiyorum ve etrafından dolaşmıyorum.** §6.7 ve §6.8 bu ortamda karşılanmadı.
Sebep aşağıda ölçülmüştür.

---

## 4. Kök neden — ölçüldü, tahmin değil

`smoke_home_rec.js` **24 tam sayfa yüklemesi** yapar (10 × `fresh()` = 10 `goto` + 10 `reload`,
artı 2 doğrudan `goto` + 2 doğrudan `reload`). Her yükleme bu kum havuzunda **~12,7 saniye** sürüyor.

```
ilk goto                    12.72s
reload                      12.72s
2. goto                     12.65s
2. reload                   12.61s
--- 127.0.0.1 dışı istekler ---
4x  FAILED https://fonts.googleapis.com/css2?family=Noto+Sans+JP:...&family=Shippori+Mincho:...
```

`index.html` `<head>` içinde Google Fonts stil sayfasına bağlıdır. Bu konteynerde dışa ağ
çıkışı olmadığı için istek **hemen reddedilmiyor, zaman aşımına kadar asılıyor**; `DOMContentLoaded`
bekleyen stil sayfası yüzünden gecikiyor. Karşı ölçüm — aynı sayfa, yalnız 127.0.0.1 dışı
istekler engellenmiş:

```
[font ENGELLİ] goto                0.10s
[font ENGELLİ] reload              0.06s
[font ENGELLİ] .rec-hint ölçüm: {"h":59,"w":350,"font":"\"Noto Sans JP\", system-ui, -apple-system"}
```

**12,72 s → 0,10 s (≈127×).** 24 yükleme × 12,7 s ≈ **305 s** — ölçülen 300–368 s ile birebir uyuşuyor.
Font engellendiğinde testin tamamı ≈ **4 saniyede** biterdi.

Ölçülen süre dağılımı (aynı kod, aynı commit):

| Koşum | Süre | Sonuç |
|---|---|---|
| Tek başına, boş makine | 354 s | PASS (57/57) |
| Gate içinde, tek suite | 219 s | PASS |
| Gate içinde, varsayılan 300 s | 300 s sınırı | TIMEOUT |
| Gate içinde, paralel ikinci suite varken | 367 s | PASS |

Yani test **300 s eşiğinin tam üstünde salınıyor**. Bu bir kararlılık sorunudur ve tamamen
DNS/ağ zaman aşımı davranışına bağlıdır — internet erişimi olan bir makinede aynı test
saniyeler içinde biter.

---

## 5. Karar noktası — Codex'e

Kendi başıma çözmedim, çünkü her çözüm sözleşmenin bir maddesine dokunuyor:

| # | Seçenek | Ne değişir | Riski |
|---|---|---|---|
| **A** | `run-browser-gates.mjs` **varsayılan** timeout'u yükselt (ör. 300 s → 600 s) | §4 "timeout davranışı değişmemeli" maddesine dokunur | Düşük. Mekanizma aynı kalır, yalnız bütçe artar. Gerçek asılmaları da geç yakalar. |
| **B** | `smoke_home_rec.js`'e **hermetik yönlendirme** ekle: 127.0.0.1 dışı istekleri `abort` et | Assertion metni değişmez ama **render koşulu değişir** — yazı tipi her yerde yedek fontla ölçülür | Orta. 44 px ve 320 px taşma ölçümleri font metriklerine bağlıdır. Ölçtüm: fontsuz `.rec-hint` yüksekliği **59 px** (eşik 44). Yine de bu, testin neyi ölçtüğünü değiştirir — **Codex kararı olmalı.** |
| **C** | Değişiklik yapma; `npm run gates` bu kum havuzunda kırmızı kalsın, CI/gerçek makinede yeşil olduğu doğrulansın | Hiçbir şey | Yüksek. "14/14 yeşil" ifadesi ölçülemez hâle gelir — Batch D'nin çözdüğü hatanın aynısı. |

**Önerim: A + B birlikte, ama ayrı bir partide.** A süre bütçesini dürüstçe gerçeğe uydurur;
B testi ağdan bağımsız ve *deterministik* kılar — ki bir yayın kapısının dış CDN'e bağlı olmaması
zaten doğru olandır. B'nin font metriği yan etkisi bilinçli kabul edilmeli ve raporlanmalı.
İkisini de Batch E kapsamı dışında bırakıyorum çünkü §4 ve §3 açıkça yasaklıyor.

---

## 6. Kabul ölçütleri (§6)

| # | Ölçüt | Sonuç |
|---|---|---|
| 1 | Taban tam olarak `476374dc…` | ✅ |
| 2 | `python3`, `http.server`, `8907`, `/home/claude`, kendi sunucu süreci kalmadı | ✅ kod yolunda 0 (yalnız açıklama yorumu) |
| 3 | Yalnız dinamik `SMOKE_URL` ile çalışıyor | ✅ |
| 4 | Normal koşum repo içine veya `/tmp/home_rec_*` yoluna yazmıyor | ✅ §7.6 |
| 5 | Chromium her yolda kapanıyor | ✅ §7.1, §7.3, §7.5 |
| 6 | Beyaz liste açık ve tam dört dosya; desen keşfi yok | ✅ |
| 7 | `gates:browser` 4/4 PASS exit 0 | ⚠️ **`--timeout-ms=900000` ile ✅ · varsayılanla ❌** |
| 8 | `npm run gates` 14/14 exit 0 | ⚠️ **varsayılanla ❌ (13/14, 1 TIMEOUT)** — §4/§5 |
| 9 | `--json` dört testi doğru sırada, geçerli JSON | ✅ |
| 10 | Gate öncesi/sonrası ağaç temiz ve aynı; sunucu kapalı, artık çocuk süreç yok | ✅ her koşumda "Ağaç koruması: ✅", "Sunucu kapatıldı", Chromium 0 |
| 11 | `git diff --check` bulgusuz | ✅ **0 satır** |
| 12 | İzin verilen yollar dışında değişiklik yok; `index.html` bayt-identik | ✅ `git diff --name-only 476374dc HEAD` → **yalnız 2 dosya**; `index.html` **AYNI** |

---

## 7. Negatif kanıtlar (§7)

| # | İstenen | Ölçülen sonuç | Log |
|---|---|---|---|
| 1 | `SMOKE_URL` olmadan doğrudan test → hızlı non-zero, Chromium sayısı değişmiyor | `EXIT=2` · **448 ms** · Chromium **0 → 0** | `neg1-smoke-url-yok_neg3-newpage-oncesi-hata.log` |
| 2 | Eski `8907` portu tutuluyken tam browser gate 4/4 | 8907 başka süreçte **DOLU** iken **4/4 PASS · EXIT=0**, runner kendi portunu `37279` olarak OS'ten aldı | `browser-4of4-PASS-timeout900k.log` |
| 3 | `newPage()` öncesi kasıtlı hata → Chromium sızıntısı yok | `HARNESS ERR FIXTURE-A` · `EXIT=2` · **0,7 s** · Chromium **0 → 0** | aynı log |
| 4 | Bir assertion kasıtlı düşürülsün → runner diğer testleri koşar, toplam FAIL | `smoke_home_rec.js` **❌ FAIL exit=1**, diğer üçü **PASS**; toplam `3/4 · FAIL 1 · EXIT=1` | `neg4-kasitli-assertion-fail.log` |
| 5 | Zaman aşımı fixture'ı → çocuk sonlandırılıyor, sunucu kapanıyor | `--timeout-ms=5000` ile **4 TIMEOUT**, "Sunucu kapatıldı · port 35069", Chromium **0 → 0**. Ayrıca **gerçek** bir timeout da yaşandı (§3) ve orada da artık süreç kalmadı | `neg5-zaman-asimi-fixture.log` |
| 6 | Normal koşumdan sonra `/tmp/home_rec_320.png` ve `_390.png` oluşmuyor | Tüm koşumlardan sonra: `/tmp/home_rec_*.png` → **yok**; repo içinde `home_rec_*.png` → **0 dosya** | doğrudan ölçüm |
| + | Bonus: kirli ağaçla runner reddi | Runner iki değiştirilmiş dosyayı görüp **hiç test koşmadı**, hiçbir şeyi geri almadı | `neg0-kirli-agac-reddi.log` |

Fixture'lar **depo dışında** çalıştırıldı (`/tmp/e-fix/atlas-{A,B,C}` — `kanji-atlas`'ın tam kopyaları).
**Teslim koduna hiçbir test kancası eklenmedi**; fixture farkları yalnız geçici kopyalarda yaşıyor.

`HOME_REC_SHOT_DIR` debug yolu da doğrulandı: değişken verildiğinde görüntüler yalnız
`evidence/.../screenshots/` altına yazılıyor, verilmediğinde hiçbir dosya oluşmuyor.

---

## 8. Komutlar ve çıkış kodları

```
git checkout -b repair/batch-e-home-rec-2026-08-07 476374dc…            exit=0  ağaç TEMİZ
node --check _faz2/smoke_home_rec.js                                     exit=0
node _faz2/run-browser-gates.mjs --help                                  exit=0  4 test, kanonik sıra
git commit  (uygulama)                                                   exit=0  df5696c
npm run gates:browser                              (kirli ağaç denemesi) exit=1  test KOŞULMADI
npm run gates:browser -- --timeout-ms=900000                             exit=0  4/4 PASS
npm run gates                                      (varsayılan)          exit=1  10/10 + 3/4 (1 TIMEOUT)
node _faz2/run-browser-gates.mjs --json --timeout-ms=900000              exit=0  geçerli JSON, 4/4
env -u SMOKE_URL node _faz2/smoke_home_rec.js                            exit=2  448 ms, tarayıcı açılmadı
node /tmp/e-fix/atlas-A/_faz2/smoke_home_rec.js  (SMOKE_URL ile)         exit=2  0,7 s, sızıntı yok
node /tmp/e-fix/atlas-B/_faz2/run-browser-gates.mjs --timeout-ms=900000  exit=1  3/4 · FAIL 1
node /tmp/e-fix/atlas-C/_faz2/run-browser-gates.mjs --timeout-ms=5000    exit=1  4 TIMEOUT, sunucu kapandı
git diff --check 476374dc HEAD                                           0 satır
git diff --name-only 476374dc HEAD                                       2 dosya
```

**Sürümler:** node `v22.22.2` · npm `10.9.7` · git `2.43.0` · playwright **1.56.0** (kilitli) ·
Chromium **141.0.7390.37** · Ubuntu 24.04 / x86_64.

---

## 9. Geri dönüş

```bash
git revert df5696c        # hem test onarımını hem beyaz liste satırını geri alır
# veya dalı hiç birleştirmemek
```

Tek uygulama commit'i olduğu için geri dönüş tek adımdır. `index.html`, manifest, ses, veri,
`package.json`, lockfile, core runner ve diğer üç browser testi **hiç dokunulmadığı için**
geri dönüşün ürün tarafında etkisi yoktur.

---

## 10. Kapsam dışı bırakılanlar (§5)

`index.html` · manifest · ses · veri · ürün davranışı · `package.json`/lockfile · Playwright
sürümü · diğer üç browser testinin assertion/selector'ları · core runner ve core testler ·
onboarding fixture onarımı · erişilebilirlik · pictogram fallback · web manifest · native/store ·
deploy · arşiv temizliği · dosya silme · Batch F.

Hiçbirine dokunulmadı.

---

**Batch E teslim edildi ve duruyorum.** §5'teki süre bütçesi kararını Codex verene kadar
timeout varsayılanına, hermetik yönlendirmeye veya sonraki faza geçmiyorum.
