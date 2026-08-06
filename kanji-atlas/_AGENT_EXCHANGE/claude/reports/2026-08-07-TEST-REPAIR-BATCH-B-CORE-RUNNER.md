# TEST REPAIR BATCH B — ÇEKİRDEK KAPI KOŞUCUSU · TESLİM RAPORU

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-TEST-REPAIR-BATCH-B-CORE-RUNNER.md` |
| Sözleşme SHA-256 | `e2ff08755d5cd503a48ae26377b977a1724ee96dd51b959769af83a5f2fc121b` |
| Batch A kapanışı | `codex/audits/2026-08-07-TEST-REPAIR-BATCH-A-CLOSURE.md` — **PASS** (okundu) |
| Başlangıç commit | **`7c1389b8197e88ecf3251cb2388619edcf4d8838`** |
| Dal | **`repair/batch-b-core-runner-2026-08-07`** |
| Eklenen dosya | `kanji-atlas/_faz2/run-core-gates.mjs` (**yeni**) |
| **Değişen mevcut izlenen dosya** | **0** — sha256 ile doğrulandı |
| Batch C / tarayıcı / sunucu / port | **BAŞLATILMADI** |

---

## 1. Ne yapıldı

Bağımsız olarak zaten yeşil olan **on** hızlı kontrolü tek, taşınabilir, **bağımlılıksız** bir giriş noktasından koşan `run-core-gates.mjs` eklendi. Hiçbir test onarılmadı, yeniden yazılmadı, yeniden adlandırılmadı, kapsamı genişletilmedi — bu parti mevcut korumaları **paketliyor**.

**Sıralama düzeltmesi kabul edildi:** envanter raporum sekiz hızlı test + Playwright katmanını aynı partide öneriyordu. Codex bunu literal kabul etmedi; üç tarayıcı testi (`smoke_backup`, `smoke_recognition`, sabit yollar/portlar, Playwright'ın proje kökünde tanımlı olmaması) ayrı bir sözleşme gerektiriyor. Bu parti **yalnız çekirdek koşucudur**; tarayıcı modernizasyonuna **girilmedi**.

## 2. Açık beyaz liste

Koşucu tam olarak şu on dosyayı, bu sırayla çağırır. Liste kodda **açıkça** yazılıdır:

```
 1. smoke_content_scaffold.js      6. srs_check.js
 2. smoke_legacy_derived.js        7. graph_check.js
 3. smoke_durable_backend.js       8. list_progress_check.js
 4. smoke_game_roles.js            9. manifest_check.js
 5. storage_check.js              10. manifest_build_check.js
```

**Dosya adı deseni veya dizin taraması YOK.** Bu, envanter denetiminde bulduğum riskin yapısal karşılığıdır: `qa_kyuu_round.js` adı `qa_` ile başlar ama `fs.writeFileSync` ile **uygulamaya yazar**. Desen tabanlı keşif onu bir gün yakalayabilirdi; açık beyaz liste yakalayamaz. Aynı şekilde `harness.js`, teşhis araçları, arşiv adayları, onboarding ve tarayıcı testleri de asla çağrılmaz.

## 3. Davranış (sözleşme §1–§4)

| Gereklilik | Uygulama |
|---|---|
| Yalnız Node yerleşikleri | `child_process`, `fs`, `path`, `url` — **sıfır bağımlılık**, package dosyası eklenmedi |
| Yollar koşucunun kendi konumundan | `path.dirname(fileURLToPath(import.meta.url))` — çağıranın `cwd`'si kullanılmaz |
| `process.execPath` ile spawn, kabuk yok | `spawn(process.execPath, [abs], { shell: false })` |
| Sıralı koşum | `for … await` — beyaz liste sırasında |
| Yakalananlar | exit kodu, sinyal, süre, stdout, stderr |
| Zaman aşımı | **60 000 ms/test** (varsayılan, `--timeout-ms` ile ayarlanır). Gerekçe: bu katmanın ölçülen en yavaş testi ~310 ms, toplam < 1 sn → **~200× pay**. Aşılırsa SIGTERM, 2 sn sonra SIGKILL |
| Başarısızlıktan sonra devam | Sıradan başarısızlıkta beyaz listenin **kalanı yine koşar** (tam tablo için) |
| exit≠0 tetikleyicileri | non-zero çocuk · sinyal · zaman aşımı · spawn hatası · eksik dosya · kirli başlangıç · koşum sırasında ağaç değişimi · kullanım hatası |
| Yasaklar | Sunucu **yok**, port **yok**, tarayıcı **yok**, ağ **yok**, izlenen dosya **yazılmaz** |

### Git mutasyon koruması — **salt okunur**

Koşum öncesi ve sonrası `git status --porcelain`. **Kirli başlarsa hiçbir test koşmadan reddeder.** Koşum sırasında durum değişirse değişen yolları göstererek düşer.

> Koruma **asla** `reset`, `restore`, `clean`, `stash` çalıştırmaz. Sözleşme "otomatik geri alma yapmadan" diyordu; koşucu bunu yalnız uygulamakla kalmıyor, çıktıda da açıkça söylüyor: *"Değişiklikler OLDUĞU GİBİ bırakıldı (salt okunur koruma); inceleyip kendiniz karar verin."*

Git çalışma ağacı yoksa (bağımsız taşınmış kopya) **çökmez** — korumayı "kullanılamıyor" diye raporlar ve testler yine koşar.

### Çıktı

Varsayılan: insan okunur tablo + toplamlar + karar. `--json`: **stdout'a tek geçerli JSON belgesi**, insan çıktısı stderr'e kaydırılır. `--help` test koşmadan `exit 0`; bilinmeyen argüman kullanım mesajıyla `exit 1`.

---

## 4. Pozitif kanıt

```
$ node kanji-atlas/_faz2/run-core-gates.mjs                       exit=0
run-core-gates · 10 çekirdek kapı
Atlas dizini : /home/claude/apps-deploy/kanji-atlas
Node         : v22.22.2
Zaman aşımı  : 60000 ms / test
Git SHA      : 295aab234e3036c8cadfb63d49e09f816d18cf2d
  ✅ PASS      smoke_content_scaffold.js     124 ms
  ✅ PASS      smoke_legacy_derived.js        83 ms
  ✅ PASS      smoke_durable_backend.js       42 ms
  ✅ PASS      smoke_game_roles.js            42 ms
  ✅ PASS      storage_check.js               38 ms
  ✅ PASS      srs_check.js                   47 ms
  ✅ PASS      graph_check.js                 36 ms
  ✅ PASS      list_progress_check.js         35 ms
  ✅ PASS      manifest_check.js              48 ms
  ✅ PASS      manifest_build_check.js        47 ms

Toplam: 10/10 PASS · FAIL 0 · TIMEOUT 0 · diğer 0 · 577 ms
Ağaç koruması: ✅ koşum sırasında değişiklik YOK
✅ ÇEKİRDEK KAPILAR GEÇTİ
```

### Dört konumdan tutarlılık

| Konum | exit | Sonuç |
|---|---|---|
| depo kökü (`apps-deploy/`) | 0 | 10/10 PASS · 465 ms |
| `kanji-atlas/` | 0 | 10/10 PASS · 693 ms |
| `kanji-atlas/_faz2/` | 0 | 10/10 PASS · 469 ms |
| `/tmp` (tamamen ilgisiz dizin) | 0 | 10/10 PASS · 432 ms |
| **`/tmp/reloc` — bağımsız taşınmış kopya, `.git` YOK** | **0** | 10/10 PASS · `Git koruması: KULLANILAMIYOR — Git çalışma ağacı bulunamadı` |

Son satır sözleşme §3'ün son cümlesinin kanıtı: koruma yoksa **çökmüyor**, raporluyor; testler yine koşuyor.

### Argüman işleme

```
--help          exit=0   (test koşmadan kullanım metni)
--bilinmeyen    exit=1   HATA: bilinmeyen argüman: --bilinmeyen
```

---

## 5. Beş zorunlu negatif kanıt

Hepsi **depo dışı** geçici kopyalarda / geçici git worktree'lerinde. Teslim edilen ağaç temiz kaldı.

### N1 · Bir test `process.exit(7)` → kalanlar yine koşar, koşucu exit≠0 ✅
```
/tmp/b1 · graph_check.js → process.exit(7)                        exit=1
  ✅ PASS  smoke_content_scaffold.js … srs_check.js       (6 test)
  ❌ FAIL  graph_check.js                  24 ms exit=7
  ✅ PASS  list_progress_check.js · manifest_check.js · manifest_build_check.js   ← KALANLAR KOŞTU
Toplam: 9/10 PASS · FAIL 1 · ❌ ÇEKİRDEK KAPILAR GEÇMEDİ
```
Kritik nokta: başarısızlıktan **sonraki üç test de koştu** — tam tablo görünüyor.

### N2 · Zaman aşımını aşan test → TIMEOUT, çocuk sonlandırıldı, exit≠0 ✅
```
/tmp/b2 · srs_check.js → setTimeout(…, 600000)   --timeout-ms=1500   exit=1
  ⏱ TIMEOUT   srs_check.js                 1504 ms signal=SIGTERM
Toplam: 9/10 PASS · TIMEOUT 1 · ❌ ÇEKİRDEK KAPILAR GEÇMEDİ

Koşum bittikten 2 sn sonra hayatta kalan çocuk süreç: 0   ← çocuk GERÇEKTEN sonlandırıldı
```
Sonlandırma ayrıca `ps` ile bağımsız doğrulandı; asılı süreç bırakılmıyor.

### N3 · Koşum sırasında izlenen dosyayı değiştiren test → yakalandı, **otomatik geri alınmadı** ✅
```
/tmp/b3 (geçici git deposu) · list_progress_check.js → audio-manifest.json'a yazar
fixture commit edildi, ağaç TEMİZ başladı                          exit=1

Toplam: 10/10 PASS          ← testlerin hepsi "geçti"…
Ağaç koruması: ❌ KOŞUM SIRASINDA AĞAÇ DEĞİŞTİ — bir test izlenen dosyaya yazmış olabilir
     M kanji-atlas/audio-manifest.json
❌ ÇEKİRDEK KAPILAR GEÇMEDİ  ← …ama koruma kapıyı düşürdü

Koşum sonrası git status:  M kanji-atlas/audio-manifest.json
     → değişiklik OLDUĞU GİBİ duruyor; koşucu geri almadı ✅
```
Bu, envanterdeki `qa_kyuu_round.js` bulgusunun kapıya dönüşmüş hâli: **testler yeşil olsa bile** ağaç kirlenmişse kapı düşer.

### N4 · Zaten kirli ağaçta başlama → hiçbir test koşmadan reddeder ✅
```
/tmp/b3 · audio-manifest.json elle kirletildi                      exit=1
❌ KIRLI BAŞLANGIÇ — yayın kapısı koşumu TEMİZ ağaçta başlamalıdır.
   1 değişmiş yol:  M kanji-atlas/audio-manifest.json
   Hiçbir test çalıştırılmadı. Koruma SALT OKUNURDUR: değişiklikleriniz OLDUĞU GİBİ duruyor…

Çıktıdaki test satırı sayısı: 0        ← gerçekten hiç test koşulmadı
Koşum sonrası kirlilik: korundu ✅
```

### N5 · `--json` her iki durumda da geçerli JSON ✅

| | exit | JSON.parse | Doğrulanan |
|---|---|---|---|
| Geçen paket | 0 | ✅ | zorunlu alanların **hepsi var** · `schema 1.0` · `runner run-core-gates` · `node v22.22.2` · `sha 295aab23` · guard `available/clean/unchanged` · **results 10, sıra birebir doğru** · `totals {10,10,0,0,0,0}` · `overallPass true` |
| Düşen paket (N1 fixture) | 1 | ✅ | `overallPass false` · `decision FAIL` · `graph_check: FAIL exit=7` · `totals {10,9,1,0,0,0}` |

stdout saflığı: ilk karakter `{`, son karakter `}`, tamamı tek JSON belgesi olarak ayrıştırılıyor — nesir karışmamış.

---

## 6. Komutlar ve çıkış kodları

```
node kanji-atlas/_faz2/run-core-gates.mjs                              exit=0   10/10
(kanji-atlas/)   node _faz2/run-core-gates.mjs                         exit=0   10/10
(_faz2/)         node run-core-gates.mjs                               exit=0   10/10
(/tmp)           node <abs>/run-core-gates.mjs                         exit=0   10/10
(/tmp/reloc)     node kanji-atlas/_faz2/run-core-gates.mjs             exit=0   10/10 · guard kullanılamıyor
node run-core-gates.mjs --help                                         exit=0   test koşmadı
node run-core-gates.mjs --bilinmeyen                                   exit=1   kullanım hatası
node /tmp/b1/…/run-core-gates.mjs                                      exit=1   N1  FAIL exit=7
node /tmp/b2/…/run-core-gates.mjs --timeout-ms=1500                    exit=1   N2  TIMEOUT SIGTERM
(/tmp/b3)        node kanji-atlas/_faz2/run-core-gates.mjs             exit=1   N3  ağaç değişti
(/tmp/b3 kirli)  node kanji-atlas/_faz2/run-core-gates.mjs             exit=1   N4  kirli başlangıç
node run-core-gates.mjs --json                                         exit=0   N5a geçerli JSON
node /tmp/b1/…/run-core-gates.mjs --json                               exit=1   N5b geçerli JSON
```

**Araç sürümleri:** node `v22.22.2` · git `2.43.0` · Ubuntu 24.04.4 LTS / x86_64. **Bağımlılık yok**; `package.json`, lockfile, CI yapılandırması **dokunulmadı**.

---

## 7. Ağaç durumu ve geri dönüş

```
Başlangıç 7c1389b: 1978 izlenen dosya (sha256 alındı)
Sonuç            : mevcut izlenen dosyalardan DEĞİŞEN YOK ✅
                   tek fark: run-core-gates.mjs (YENİ dosya, izin verilen)
Geçici fixture'lar: /tmp/b1 /tmp/b2 /tmp/b3 /tmp/reloc — hiçbiri depo altında değil ✅
```

| Geri dönüş | |
|---|---|
| Nokta | **`7c1389b8197e88ecf3251cb2388619edcf4d8838`** |
| Komut | `git rm kanji-atlas/_faz2/run-core-gates.mjs` — veya dalı hiç birleştirmemek |
| Etki | Tek yeni dosya kalkar; mevcut hiçbir test/ürün dosyası zaten değişmediği için **başka etki yok** |

---

## 8. Bilinen sınırlar ve riskler

| # | Konu | Not |
|---|---|---|
| 1 | Koşucu **kirli ağaçta çalışmayı reddeder** | Geliştirme sırasında düzenleme yaparken kapıyı koşmak istenirse reddedilir — **kasıtlı** (yayın kapısı sözleşmesi). Geliştirici testleri tek tek elle koşabilir |
| 2 | Ağaç koruması **tüm depoyu** kapsar | `kanji-atlas/` dışında (ör. `japanese-flick/`) yapılan bir düzenleme de kapıyı düşürür. Dar kapsam ayrı bir karar; sözleşme "git status --porcelain" dedi, daraltmadım |
| 3 | Zaman aşımı **60 sn/test** | Ölçülen en yavaş test ~310 ms. Harici birimde soğuk önbellek çok daha yavaş olabilir; 60 sn cömert ama asılmayı yine yakalar. `--timeout-ms` ile ayarlanabilir |
| 4 | Testler **sıralı** koşuyor | Toplam ~0,6 sn olduğu için paralelleştirme gereksiz; ayrıca sıralı koşum ağaç korumasının hangi testin yazdığını daraltmasını kolaylaştırır |
| 5 | `--json` modunda çocuk stdout'u JSON alanına gömülür | Büyük çıktı üreten bir test eklenirse JSON şişebilir; bugünkü on testte sorun değil |
| 6 | Harici birimde koşulmadı | Konteynerde doğrulandı; **gerçek proje biriminde 10/10 PASS'i Codex üretmeli** — sözleşmenin kabul ölçütü de bunu istiyor |
| 7 | Üç tarayıcı testi kapsam dışı | `smoke_sources`, `smoke_backup`, `smoke_recognition` bu koşucuya **girmedi**; genişletilmiş katman HOLD'da |

---

## 9. Kabul ölçütleri karşılığı

| Sözleşme ölçütü | Durum |
|---|---|
| Tek, bağımlılıksız koşucu tam olarak on onaylı dosyayı sırayla çağırıyor | ✅ açık beyaz liste, desen/tarama yok |
| Temiz pozitif koşum 10/10 PASS ve exit 0 | ✅ |
| Dört konumdan tutarlı davranış | ✅ (+ taşınmış kopya, git'siz) |
| Başarısızlık · zaman aşımı · mutasyon · kirli başlangıç · JSON kanıtları | ✅ N1–N5 |
| Mevcut izlenen dosyalar başlangıç commit'iyle bayt-aynı | ✅ sha256 |
| Yalnız izin verilen dosyalar değişti | ✅ yeni koşucu + rapor + kanıtlar |
| Sözleşme hash'i, taban/uç SHA, değişen dosya listesi, ham komutlar, çıkış kodları, sürümler, geri dönüş noktası, temiz durum | ✅ §1, §6, §7 |
| Push edilemiyorsa Git bundle | ✅ teslim mesajında |
| Codex gerçek harici birimde 10/10 PASS üretmeli | ⏳ **bekliyor** |

---

**Batch B açık.** Codex bundle'ı bağımsız inceleyip pozitif ve seçili negatif kanıtları yeniden üretene kadar kapanmaz. Playwright/tarayıcı/sunucu/port ve Batch C işlerine **girilmedi**; merge, deploy, landing **yok**.
