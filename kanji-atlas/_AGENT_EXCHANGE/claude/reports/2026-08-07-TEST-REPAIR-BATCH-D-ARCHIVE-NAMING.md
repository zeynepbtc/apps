# TEST REPAIR BATCH D — ARŞİV VE ADLANDIRMA · TESLİM RAPORU

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-TEST-REPAIR-BATCH-D-ARCHIVE-NAMING.md` |
| Sözleşme SHA-256 | `3d75c47539a45fff616922c8ed8972881e9c0c9a81c8e2b5899e750628b3807e` |
| Taban commit | **`bb441ec2a619da8d199f00780cfab2a9b2cbabd4`** (birebir doğrulandı) |
| Dal | **`repair/batch-d-archive-naming-2026-08-07`** |
| Arşivlenen | **16** · Yeniden adlandırılan **3** · **Silinen 0** |
| Gate | **13/13 PASS · `EXIT=0`** (gerçek kilitli Chromium) |
| Batch E / sonraki faz | **BAŞLATILMADI** |

---

## 1. Commit'ler (küçük ve amaç bazlı, §9)

```
25456ac  chore: Batch D (1/3) — 16 bayat dosyayı _faz2/_archive altına taşı + README
a49a184  chore: Batch D (2/3) — üç canlı dosyayı doğru adlandır
<uç>     docs: Batch D (3/3) — teslim raporu + ham kanıtlar
```

## 2. Taşınan / adlandırılan dosyalar

### 2.1 Arşiv — 16 dosya, hepsi `git mv`, **içerik hash'leri birebir aynı**

| Dosya | Hedef | sha256 (ilk 12) | Hash |
|---|---|---|---|
| `edit_familystrip.py` | `_archive/legacy-tools/` | `8fd6220576ee` | ✅ |
| `edit_onboarding.py` | `_archive/legacy-tools/` | `9f310da5a677` | ✅ |
| `edit_srs.py` | `_archive/legacy-tools/` | `64686417aa6e` | ✅ |
| `extract_srs.py` | `_archive/legacy-tools/` | `2ace804b97ed` | ✅ |
| `inject_storage.py` | `_archive/legacy-tools/` | `e8cacdc323d3` | ✅ |
| `smoke_onboarding.8step-OBSOLETE.txt` | `_archive/obsolete-smokes/` | `7e7594c986b1` | ✅ |
| `smoke_onboarding_freshuser.8step-OBSOLETE.txt` | `_archive/obsolete-smokes/` | `671a88be0210` | ✅ |
| `regress_check.js` | `_archive/obsolete-smokes/` | `4126c2691b66` | ✅ |
| `smoke_familystrip.js` | `_archive/obsolete-smokes/` | `b36b7fb488bf` | ✅ |
| `smoke_audio.js` | `_archive/obsolete-smokes/` | `ce5a5fe846f9` | ✅ |
| `smoke_audio_6b.js` | `_archive/obsolete-smokes/` | `ef48b0ecd79d` | ✅ |
| `smoke_audio_games.js` | `_archive/obsolete-smokes/` | `831dca9670c5` | ✅ |
| `smoke_audio_migration.js` | `_archive/obsolete-smokes/` | `aef92f7937fb` | ✅ |
| `smoke_pathnorm.js` | `_archive/obsolete-smokes/` | `5a6379be9179` | ✅ |
| `smoke_srs.js` | `_archive/superseded-smokes/` | `11e968ae3e7a` | ✅ |
| `smoke_storage.js` | `_archive/superseded-smokes/` | `bcf29ecc1af9` | ✅ |

**16/16 hash aynı.** Ham liste: `../evidence/2026-08-07-test-repair-d-archive-naming/hashes-{before,after}-move.txt`
Arşiv dosyalarının içindeki bayat mutlak yollar **bilerek onarılmadı** (§5 son cümlesi).

### 2.2 Yeniden adlandırma — 3 canlı dosya

| Eski | Yeni | İçerik değişikliği |
|---|---|---|
| `qa_kyuu_round.js` | **`apply_kyuu_qa_round.js`** | Yalnız başa açıklama bloğu (uygulama aracı, test değil) |
| `gate1_onboarding_b2.js` | **`onboarding_b2_logic_fixture.js`** | Başlık + **tek** `console.log` etiketi |
| `harness.js` | **`families_report.js`** | Yalnız başa açıklama bloğu |

**Davranış kodu değişmedi.** `onboarding_b2_logic_fixture.js` için adil karşılaştırma yaptım — eski dosyayı **aynı dizinden** koşturup yenisiyle kıyasladım:

```
ESKİ ad  exit=1  (EXTRACT FAIL)
YENİ ad  exit=1  (EXTRACT FAIL)   → davranış AYNI
```
Bu dosya **tabanda da kırmızıydı**; Batch D onu onarmıyor (sözleşme §6 yasaklıyor).

### 2.3 Aktif kod yorumu güncellemesi (§4 son paragraf)

`run-core-gates.mjs` içindeki güvenlik açıklaması yeni adla güncellendi:
`qa_kyuu_round.js` → `apply_kyuu_qa_round.js`. **Beyaz liste ve davranış değişmedi.**

`_AGENT_EXCHANGE` altındaki **7 tarihsel belge dokunulmadı** — dönem kanıtıdır (§4).

---

## 3. `_archive/README.md` içeriği (§5 karşılığı)

| §5 gereği | Var mı |
|---|---|
| Arşivin amacı + "silinmedi, yayın kapısı değil" uyarısı | ✅ başlıkta kalın |
| 16 dosyanın eski → yeni yol eşlemesi | ✅ üç tablo |
| Her alt klasörün gerekçesi | ✅ |
| `extract_srs.py` → `srs_selector.extracted.js` / `srs_check.js` | ✅ "Canlı dosyalarla tarihsel bağlar" tablosu |
| `inject_storage.py` → `storage.js` / `storage_check.js` | ✅ aynı tablo |
| Üç HTML temelinin hiç commit edilmediği | ✅ ölçüm tablosu (`git log --all` → 0 commit) |
| Geri alma yöntemi | ✅ tek dosya ve tüm parti için |

---

## 4. Kabul ölçütleri (§7)

| # | Ölçüt | Sonuç |
|---|---|---|
| 1 | Taban tam olarak `bb441ec2…` | ✅ |
| 2 | 16/16 `git mv`, içerik hash'leri aynı | ✅ §2.1 |
| 3 | 3/3 adlandırma doğru, davranış kodu değişmedi | ✅ §2.2 |
| 4 | `_faz2/` **kökünde** `atlas_drive_may30` referansı | **0 dosya** ✅ (yalnız `_archive/` altında 17 — 16 dosya + README) |
| 5 | `npm run gates` gerçek kilitli Chromium ile 10/10 + 3/3 | ✅ **13 PASS · EXIT=0** |
| 6 | Gate öncesi/sonrası ağaç aynı ve temiz | ✅ ikisi de **0 değişiklik**; 2020 izlenen dosyanın hash listesi **değişmedi** |
| 7 | `git diff --check` | **0 bulgu** ✅ |
| 8 | `git diff --summary` rename gösteriyor, deletion yok | ✅ **19 rename · 0 delete mode** |
| 9 | Ürün/paket dosyaları tabana göre bayt-identik | ✅ aşağıda |
| 10 | `_archive/README.md` tüm izlenebilirlik bilgisini içeriyor | ✅ §3 |

**Ölçüt 9 detayı** (`git diff --quiet bb441ec HEAD -- <dosya>`):

| Dosya | Durum |
|---|---|
| `index.html` | **AYNI** ✅ |
| `audio-manifest.json` | **AYNI** ✅ |
| `package.json` · `package-lock.json` · `.gitignore` | **AYNI** ✅ |
| `run-browser-gates.mjs` | **AYNI** ✅ |
| `audio/**` | **0 dosya değişti** ✅ |

> `run-core-gates.mjs` bilerek istisnadır: §4 "aktif kod yorumlarında bu üç eski dosya adına yapılan güvenlik açıklamaları yeni adlarla güncellenmeli" diyor. Değişen **tek satır bir yorumdur**; beyaz liste, mantık ve çıktı aynıdır.

### Gate koşum özeti

```
> gates:core     10/10 PASS ·   540 ms   ✅ ÇEKİRDEK KAPILAR GEÇTİ
> gates:browser   3/3  PASS · 231331 ms  ✅ TARAYICI KAPILARI GEÇTİ
                  sunucu 127.0.0.1:36849 (OS atadı) · kapatıldı
Ağaç koruması: ✅ koşum sırasında değişiklik YOK
EXIT=0
```

---

## 5. Negatif kanıtlar (§8)

| Ölçüm | Sonuç |
|---|---|
| Gate beyaz listelerinde `_archive/` altından çağrılan dosya | **0** |
| Eski üç yanıltıcı adın `_faz2/` **canlı kökünde** bulunması | **0** |
| Arşivlenen 16 dosyanın **eski canlı yollarında** bulunması | **0** |
| Arşiv içeriğinin koşum sırasında değişmesi | **DEĞİŞMEDİ** — mühür `26df56b2f2a736d4c01973035403a770` (önce = sonra) |
| Silinen izlenen dosya | **0** (rename tespiti: **19**) |

---

## 6. Komutlar ve çıkış kodları

```
git checkout -b repair/batch-d-archive-naming-2026-08-07 bb441ec2…      exit=0  ağaç TEMİZ
git mv … _archive/legacy-tools/       (×5)                              exit=0
git mv … _archive/obsolete-smokes/    (×9)                              exit=0
git mv … _archive/superseded-smokes/  (×2)                              exit=0
git mv qa_kyuu_round.js apply_kyuu_qa_round.js                          exit=0
git mv gate1_onboarding_b2.js onboarding_b2_logic_fixture.js            exit=0
git mv harness.js families_report.js                                    exit=0
node --check apply_kyuu_qa_round.js                                     exit=0
node families_report.js                                                 exit=0
node onboarding_b2_logic_fixture.js  (eski ve yeni ad, aynı dizinden)   exit=1  ikisi de (taban kırmızı)
npm run gates                                                           exit=0  13/13
git diff --check bb441ec HEAD                                           exit=0  0 bulgu
git diff --summary bb441ec HEAD                                         19 rename · 0 delete
```

**Sürümler:** node `v22.22.2` · npm `10.9.7` · git `2.43.0` · playwright **1.56.0** (kilitli) · Chromium **141.0.7390.37** · Ubuntu 24.04.4 / x86_64.

> `apply_kyuu_qa_round.js` **bilerek koşulmadı** — `index.html` üzerine yazar. 2026-08-06 envanter turunda tam olarak bu betik ağacı kirletmişti; adının değişme sebebi de budur.

---

## 7. Geri dönüş

```bash
# Tek dosyayı canlı köke geri al
git mv kanji-atlas/_faz2/_archive/<altklasör>/<dosya> kanji-atlas/_faz2/<dosya>

# Tüm partiyi geri al
git revert a49a184     # adlandırmalar
git revert 25456ac     # arşiv taşımaları + README
# veya dalı hiç birleştirmemek
```
Taşımalar `git mv` ile yapıldığı için `git log --follow` ve `git diff -M` geçmişi korur.

---

## 8. Son durum

Çalışma ağacı **temiz** (`git status --porcelain` → 0). Gate koşumu öncesi ve sonrası ağaç **aynı**; 2020 izlenen dosyanın hash listesi değişmedi. Arşiv içeriği koşumdan etkilenmedi. `git diff --check` bulgusuz.

Ham kanıtlar: `../evidence/2026-08-07-test-repair-d-archive-naming/` — `gates-13of13.log` · `hashes-before-move.txt` · `hashes-after-move.txt` · `rename-detection.txt` · `tree-clean-proof.txt`

---

## 9. Kapsam dışı bırakılanlar

`index.html` · `audio-manifest.json` · ses · ürün verisi · `package.json`/`package-lock.json` · iki gate runner'ın mantığı · aktif test assertion/selector'ları · arşivlenen dosyaların modernizasyonu · `smoke_home_rec.js` · onboarding test onarımı · erişilebilirlik · pictogram fallback · web manifest · native/store · dosya silme · Batch E.

Hiçbirine dokunulmadı.

---

**Batch D teslim edildi ve duruyorum.** Codex PASS vermeden arşiv temizliği, Batch E, erişilebilirlik, içerik, deploy veya store işine geçmiyorum.
