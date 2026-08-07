# TEST REPAIR BATCH E — DAR DÜZELTME · TESLİM RAPORU

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-TEST-REPAIR-BATCH-E-CORRECTION.md` |
| Sözleşme SHA-256 | `f3170b469b0f37c0fded73dc97843edea33c640b10d42335193fde520d0bf642` |
| Denetim | `codex/audits/2026-08-07-TEST-REPAIR-BATCH-E-REVIEW.md` · SHA-256 `99a6edf38c4906688de694e340308d504a206eaafd11b673851e17cf39fdf444` |
| Taban commit | **`fff298cfb597316588a7060a5aee2fb3d3de5e4f`** (birebir doğrulandı) |
| Dal | **`repair/batch-e-home-rec-2026-08-07`** (aynı dal, devam) |
| Düzeltme commit'i | **`4ff230c071b7eca976aa33060af8229af51f8695`** |
| Değişen kod dosyası | **1** — `_faz2/smoke_home_rec.js` |
| `smoke_home_rec.js` | **57/57 PASS · exit 0** |
| **`npm run gates` varsayılan** | **14/14 PASS · EXIT=0** (10/10 core + 4/4 browser, bayrak yok) |
| home-rec süresi | **22,8 – 24,3 s** — dört kanonik koşumun hepsinde 60 s eşiğinin **altında** |
| Batch F / sonraki faz | **BAŞLATILMADI** |

> Bloklayıcı bulgu kapandı: kapı artık varsayılan komutla yeşil ve yayın kararı verebilir durumda.
> Runner, timeout, `package.json`, ürün kodu ve 57 assertion'ın **hiçbirine dokunulmadı**.

---

## 1. Yapılan tek değişiklik

`_faz2/smoke_home_rec.js` içine, **`newPage()`'ten hemen sonra ve ilk `goto`/`reload`'dan önce**
hermetik ağ yönlendirmesi eklendi:

```js
const LOCAL_HOSTS = new Set(["127.0.0.1", "localhost", "::1", "[::1]"]);
let blockedCount = 0, allowedLocalCount = 0; const blockedOrigins = new Set();
await p.route("**/*", route => {
  const raw = route.request().url();
  let u = null;
  try { u = new WebURL(raw); } catch (e) { u = null; }
  if (!u) {                                   // ayrıştırılamadı → GÜVENLİ TARAF: engelle
    blockedCount++; blockedOrigins.add("(ayrıştırılamayan istek)");
    return route.abort();
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return route.continue();
  if (LOCAL_HOSTS.has(u.hostname)) { allowedLocalCount++; return route.continue(); }
  blockedCount++; blockedOrigins.add(u.protocol + "//" + u.host);
  return route.abort();
});
```

`URL` adı dosyada `SMOKE_URL` için kullanıldığından ayrıştırıcı `const { URL: WebURL } = require("url")`
olarak ayrı adla alındı — global `URL` gölgelenmesi tekrar yaşanmasın diye açıkça yazıldı.

| §3 maddesi | Karşılığı |
|---|---|
| İlk `goto`/`reload`'dan **önce** kurulmalı | ✅ `p.route(...)` `newPage()` ile ilk `fresh()` arasında |
| Yalnız `127.0.0.1` ve `localhost` http(s) hedeflerine izin | ✅ `::1` / `[::1]` de yerel sayıldı |
| Diğer http(s) hedefleri hemen `abort` | ✅ |
| `data:`, `blob:`, tarayıcı-içi şemalar engellenmesin | ✅ protokol http/https değilse `continue()` |
| Ayrıştırma hatası **sessizce dışarı izin vermesin** | ✅ `catch` → `abort()` + sayaca yazılır |
| Engellenen sayısı kısa, deterministik özet olarak görünsün | ✅ iki satır, aşağıda |
| Yerel kaynak düşerse test kırmızı kalsın | ✅ §5, ölçüldü |

Çıktıya eklenen deterministik iki satır (assertion **değil**, saf raporlama):

```
Ağ yalıtımı · yerel istek GEÇTİ: 26 · yerel olmayan HTTP(S) ENGELLENDİ: 26
Ağ yalıtımı · engellenen kaynaklar: https://fonts.googleapis.com
```

Ayrıca §4 gereği eski ortama ait `8907` ve `/home/claude` literalleri **yorumlardan da**
kaldırıldı; altyapı açıklaması genel ifadeyle sadeleştirildi. Dosyada bu iki literal artık **yok**
(`grep` → 0 satır).

### Değişmeyenler

57 assertion · seçiciler · üç onboarding yolu · 44 px eşiği · mouse/Enter/Space · tekillik ·
marker semantiği · 320 px taşma · `pageerror`. `run-browser-gates.mjs`, `package.json`, lockfile,
`index.html` ve tüm ürün dosyaları **tabana göre bayt-identik**. Yeni bağımlılık yok, depoya font
dosyası alınmadı.

---

## 2. Süre etkisi

| Ölçüm | Düzeltme öncesi | Düzeltme sonrası |
|---|---|---|
| Tek başına tam koşum | **354,2 s** | **24,8 s** |
| Gate içinde | 219 – 368 s (300 s'de TIMEOUT) | **22,8 – 24,3 s** |
| Sayfa yüklemesi başına | ~12,7 s | ~0,1 s |

Kök neden Codex denetiminin doğruladığı gibiydi: 24 sayfa yüklemesinin her biri dış Google Fonts
stil isteğinin ağ zaman aşımını bekliyordu. İstek artık tarayıcıdan **hiç çıkmıyor**.

---

## 3. Kabul ölçütleri (§5)

| # | Ölçüt | Sonuç |
|---|---|---|
| 1 | Taban tam olarak `fff298cf…` | ✅ |
| 2 | Kod değişikliği yalnız `_faz2/smoke_home_rec.js` | ✅ `git diff --name-only fff298c 4ff230c` → **1 dosya** |
| 3 | Dış internet gerekmiyor; yerel olmayan http(s) ilk gezinmeden önce engelleniyor | ✅ §1 |
| 4 | `smoke_home_rec.js` 57/57 PASS, exit 0 | ✅ `pass=57  fail=0` · `CHILD EXIT=0` |
| 5 | Varsayılan `npm run gates:browser` 4/4 PASS exit 0, **bayrak yok** | ✅ `4/4 PASS · EXIT=0` |
| 6 | Varsayılan `npm run gates` 14/14 PASS exit 0, **bayrak yok** | ✅ `10/10` + `4/4` · `EXIT=0` |
| 7 | `--json` dört testi doğru sırada, geçerli JSON, `overallPass: true` | ✅ aşağıda |
| 8 | home-rec süresi her kanonik koşumda **< 60 s** | ✅ **22 957 / 22 856 / 24 301 / 22 811 ms** |
| 9 | Dış font ucu erişilemez/asılı fixture altında 4/4 ve 14/14 değişmiyor | ✅ §4 |
| 10 | Yerel hedef bozulduğunda hızlı non-zero; filtre yerel hatayı maskelemiyor | ✅ §5 |
| 11 | Engellenen hedeflerde yalnız yerel olmayan kaynaklar var | ✅ tek kaynak: `https://fonts.googleapis.com`; 26 yerel istek **geçti** |
| 12 | Ağaç temiz ve aynı; Chromium/sunucu/çocuk süreç sızıntısı yok | ✅ her koşumda "Ağaç koruması: ✅", "Sunucu kapatıldı", Chromium **0** |
| 13 | `git diff --check` bulgusuz; `index.html` Batch E tabanına göre bayt-identik | ✅ 0 bulgu · `9d84fd3c98ba…` değişmedi |

### §5.6 — varsayılan tam koşum ham çıktısı

```
> gates:core
  ✅ smoke_content_scaffold.js 70 ms   ✅ smoke_legacy_derived.js 43 ms
  ✅ smoke_durable_backend.js  48 ms   ✅ smoke_game_roles.js     54 ms
  ✅ storage_check.js          45 ms   ✅ srs_check.js            52 ms
  ✅ graph_check.js            50 ms   ✅ list_progress_check.js  41 ms
  ✅ manifest_check.js         55 ms   ✅ manifest_build_check.js 60 ms
Toplam: 10/10 PASS · 554 ms · ✅ ÇEKİRDEK KAPILAR GEÇTİ

> gates:browser        Zaman aşımı: 300000 ms / test   (VARSAYILAN — bayrak yok)
Sunucu: http://127.0.0.1:38503/index.html  (port OS tarafından atandı)
  ✅ PASS  smoke_sources.js      13464 ms
  ✅ PASS  smoke_home_rec.js     22957 ms
  ✅ PASS  smoke_backup.js       28758 ms
  ✅ PASS  smoke_recognition.js 190304 ms
Toplam: 4/4 PASS · FAIL 0 · TIMEOUT 0 · 255527 ms
Ağaç koruması: ✅ koşum sırasında değişiklik YOK
✅ TARAYICI KAPILARI GEÇTİ        EXIT=0
```

### §5.7 — JSON kanıtı (varsayılan timeout)

```
timeoutMs=300000   overallPass=true   decision=PASS
1. smoke_sources.js     = PASS ( 13525 ms)
2. smoke_home_rec.js    = PASS ( 22811 ms)
3. smoke_backup.js      = PASS ( 28871 ms)
4. smoke_recognition.js = PASS (201077 ms)
totals={"total":4,"pass":4,"fail":0,"timeout":0,"other":0,"notRun":0}
```

---

## 4. §5.9 — dış font ucu asılı fixture

Fixture depo dışında, sistem çözümleyicisinde kuruldu (yedeği alındı ve **geri alındı**):

```
# /etc/hosts (geçici)
10.255.255.1 fonts.googleapis.com fonts.gstatic.com     → yönlendirilemeyen adres, bağlantı asılır
dns.lookup("fonts.googleapis.com") → 10.255.255.1       (fixture etkin)
```

Bu haldeyken **varsayılan** `npm run gates`:

```
  ✅ PASS  smoke_sources.js      13555 ms
  ✅ PASS  smoke_home_rec.js     24301 ms
  ✅ PASS  smoke_backup.js       29091 ms
  ✅ PASS  smoke_recognition.js 187803 ms
Toplam: 4/4 PASS · TIMEOUT 0 · GATES EXIT=0        → core ile birlikte 14/14
```

Sonuç **değişmedi** ve süre **24,3 s**'de kaldı: istek tarayıcıdan hiç çıkmadığı için asılı uç
noktanın gate'e etkisi yok. Fixture sonrası `dns.lookup` yeniden gerçek adrese döndü;
`/etc/hosts` yedeği `evidence/fixture-hosts-yedegi.txt` altında.

---

## 5. §5.10 — bozuk yerel hedef, maskeleme yok

| Senaryo | Sonuç | Süre | Chromium |
|---|---|---|---|
| Yerel portta dinleyen yok (`http://127.0.0.1:1/index.html`) | `HARNESS ERR page.goto: net::ERR_UNSAFE_PORT` · **exit 2** | **1,8 s** | 0 → 0 |
| Yerel sunucu var ama uygulama 404 | `HARNESS ERR page.click: Timeout 6000ms` · **exit 2** | **7,0 s** | 0 → 0 |

Ağ filtresi yerel kaynak hatasını **maskelemiyor**: her iki halde de test hızlı ve non-zero bitiyor,
`finally` tarayıcıyı kapatıyor, süreç sızıntısı yok.

---

## 6. Komutlar ve çıkış kodları

```
git checkout repair/batch-e-home-rec-2026-08-07 (uç fff298cf…)          ağaç TEMİZ
node --check _faz2/smoke_home_rec.js                                     exit=0
grep -n "8907\|/home/claude\|python3\|http.server\|spawn" …              0 satır
git commit (düzeltme)                                                    exit=0  4ff230c
node _faz2/smoke_home_rec.js  (SMOKE_URL ile, tek başına)                exit=0  57/57 · 24,8 s
npm run gates                                     (VARSAYILAN)           exit=0  14/14
npm run gates:browser                             (VARSAYILAN)           exit=0  4/4
node _faz2/run-browser-gates.mjs --json           (VARSAYILAN)           exit=0  overallPass=true
npm run gates   (hosts fixture: dış font ucu asılı)                      exit=0  14/14
SMOKE_URL=http://127.0.0.1:1/index.html node _faz2/smoke_home_rec.js     exit=2  1,8 s
SMOKE_URL=<404 veren yerel sunucu> node _faz2/smoke_home_rec.js          exit=2  7,0 s
git diff --check fff298c HEAD                                            0 satır
git diff --name-only fff298c 4ff230c                                     1 dosya
```

**Sürümler:** node `v22.22.2` · npm `10.9.7` · git `2.43.0` · playwright **1.56.0** (kilitli) ·
Chromium **141.0.7390.37** · Ubuntu 24.04 / x86_64.

---

## 7. Geri dönüş

```bash
git revert 4ff230c      # yalnız hermetik yönlendirmeyi geri alır; Batch E taşınabilirliği kalır
```

Tek dosyada tek commit olduğu için geri dönüş tek adımdır. Geri alındığında test yeniden dış
CDN zaman aşımına bağımlı hale gelir (ve varsayılan timeout'ta kırmızıya döner) — ürün tarafında
hiçbir etkisi yoktur.

---

## 8. Kapsam dışı bırakılanlar

`run-browser-gates.mjs` · runner timeout'u ve CLI davranışı · `package.json` · lockfile ·
Playwright sürümü · `index.html` ve tüm ürün dosyaları · manifest · ses · veri · core runner ve
core testler · diğer üç browser testi · 57 assertion ve seçiciler · onboarding fixture onarımı ·
erişilebilirlik · pictogram fallback · web manifest · native/store · deploy · arşiv temizliği ·
dosya silme · Batch F.

Hiçbirine dokunulmadı. Depoya font dosyası alınmadı, yeni bağımlılık eklenmedi.

---

**Batch E düzeltmesi teslim edildi ve duruyorum.** Codex PASS vermeden Batch F'ye veya
başka bir faza geçmiyorum.
