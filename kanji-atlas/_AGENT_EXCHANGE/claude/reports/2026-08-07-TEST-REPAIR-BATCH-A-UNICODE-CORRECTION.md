# BATCH A — UNICODE DÜZELTMESİ · TESLİM RAPORU

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-TEST-REPAIR-BATCH-A-UNICODE-CORRECTION.md` |
| Sözleşme SHA-256 | `c108af337bbd3e070d8cdc8959f018b067596fbbc70512f5c8a77eb5ef5eb1f2` |
| Codex incelemesi | `codex/audits/2026-08-07-TEST-REPAIR-BATCH-A-REVIEW.md` (okundu) |
| Taban commit | **`42a23eabf8833af51ea539dd72a762e93bf86abd`** |
| Dal | **`repair/batch-a-2026-08-06`** (mevcut dal sürdürüldü) |
| Düzeltme commit'i | tek commit, tabanın üzerine |
| Değişen izlenen dosya | **1** — `kanji-atlas/_faz2/manifest_check.js` |
| `manifest_build_check.js` | **DEĞİŞMEDİ** (`git diff` boş) |
| Ürün / manifest / ses / üretilmiş veri | **DEĞİŞMEDİ** |
| Batch B | **BAŞLATILMADI** |

---

## 1. Kök neden — kabul ve doğrulama

Codex'in bulgusu doğru ve hata **testin kendisindeydi**, üründe değil.

| Ortam | Dosya adları | Ham karşılaştırma sonucu |
|---|---|---|
| Gerçek harici proje diski (macOS/APFS) | **NFD** | **19 sahte yetim** |
| Claude konteyneri (ext4) | **NFC** | 0 yetim |

Kanonik manifest yolları NFC; APFS dosya adlarını NFD olarak sunuyor. Ham JavaScript dize karşılaştırması aynı mantıksal dosyayı iki ayrı yol sanıyor. Konteynerde ölçüm — hatanın neden burada görünmediğinin kanıtı:

```
konteynerdeki mp3: 473 | NFC-DIŞI ad: 0
manifest yolu:     610 | NFC-DIŞI:     0
chīzu / fōku / gēmu / kōhī → hepsi [NFC]
```

Yani konteyner bu hatayı **yapısal olarak gösteremez**. Bu yüzden sözleşmenin istediği NFD fixture'ı açık yeniden adlandırmayla kuruldu (§4, Kanıt 2).

---

## 2. Uygulanan düzeltme

### 2.1 Kanonik karşılaştırma (sözleşme §1)

`const NFC = s => String(s).normalize("NFC");` — **yalnız karşılaştırma anahtarları** normalize edilir. Dosyalar yeniden adlandırılmaz, manifest yeniden yazılmaz.

- Disk indeksi bir kez kurulur: ham yollar + `NFC → Set(ham yollar)` haritası.
- Yetim karşılaştırması NFC anahtarları üzerinden yapılır.

### 2.2 Dosya varlığı gerçek dosya sisteminde çalışmaya devam ediyor

```js
const existsOnFs = fs.existsSync(path.join(ATLAS, raw));
if (!existsOnFs && !diskByNfc.has(NFC(raw))) missingFile.push(...);
```

İki aşamalı, çünkü iki farklı platform davranışı var: **macOS/APFS** aramada normalizasyon-duyarsızdır → `existsSync` NFC yolla NFD dosyayı bulur. **Linux/ext4** bayt-tamdır → `existsSync` düşer, ama NFC indeksi eşleşmeyi yakalar. Gerçek dosya sistemi araması **atlanmadı**, yalnız üzerine güvenli bir geri düşüş eklendi.

### 2.3 Yol güvenliği korundu (sözleşme §2)

Güvenlik yüklemi normalizasyondan **bağımsızdır** ve **hem ham hem NFC** biçime ayrı ayrı uygulanır:

```js
if (!isSafeRel(raw) || !isSafeRel(NFC(raw))) { badPath.push(...); continue; }
```

`isSafeRel`: göreli · mutlak değil · `..` yok · sürücü harfi yok · `audio/{kana,kanji,word,sentence}/*.mp3` kalıbında. İki biçim de geçmek zorunda olduğu için **normalizasyon yasak bir yolu gizleyemez** — kanıtı §4/Kanıt 5.

### 2.4 Normalizasyon çakışması tespiti (sözleşme §3)

İki ayrı kontrol eklendi; belirsiz girdiler sessizce tek üyeye **indirgenmez**:

| Kontrol | Ne yakalar |
|---|---|
| **6a** | Diskte iki farklı **ham** ad aynı NFC anahtarına düşerse |
| **6b** | Manifestte iki farklı **ham** yol aynı NFC anahtarına düşerse |

Tanı çıktısı her iki ham yolu `JSON.stringify` ile gösterir — görsel olarak aynı görünen adlar ayırt edilebilsin diye.

### 2.5 Kontrol numaralandırması

Eski `6)` → **`6a` · `6b` · `6c`**. `6c` eski yetim kontrolünün NFC anahtarlı hâli; ayrıca tanı amaçlı (iddia değil) **ham karşılaştırmanın kaç sahte yetim üreteceğini** de yazdırır — Codex'in gördüğü hata sınıfı bir daha sessiz kalmaz.

---

## 3. Temiz ağaçta pozitif koşum (Kanıt 1)

```
$ node kanji-atlas/_faz2/manifest_check.js          exit=0
Atlas dizini: /home/claude/apps-deploy/kanji-atlas
✓ 1) tüm id benzersiz — 610 kayıt
✓ 2) her kayıt şemaya uygun (id·kategori·metin·kaynak·durum)
✓ 3) yayın kapısı: missing/tts kayıt YOK (hepsi recorded)
✓ 4a) ses yolu göreli ve izinli klasörde — ham VE NFC biçim ayrı doğrulandı
✓ 4b) referanslanan her ses dosyası DİSKTE VAR (NFC/NFD duyarsız)
✓ 5) kategori+metin duplicate SIFIR (çözüm anahtarı tekil)
✓ 6a) diskte normalizasyon çakışması YOK — 473 benzersiz NFC anahtarı
✓ 6b) manifestte normalizasyon çakışması YOK — 473 benzersiz NFC anahtarı
✓ 6c) yetim mp3 YOK (NFC anahtarlarıyla karşılaştırıldı) — 473 dosya · 0 yetim · NFC-dışı disk adı: 0
✓ 7) flick kaydı yok → kardeş dizin kontrolü atlandı — 0 flick kaydı
✓ 8) _meta.pedagojik_hukum mevcut

✅ MANİFEST BÜTÜNLÜK GEÇTİ (0 başarısız)
```

---

## 4. Zorunlu kanıtlar

Tüm bozucu fixture'lar **depo dışı** geçici kopyalarda (`/tmp/u*`) kuruldu.

### Kanıt 2 · NFD dosya adı, NFC manifest yolu → **GEÇMELİ** ✅

Codex'in bildirdiği dört dosya diskte NFD adla yeniden adlandırıldı; **manifest hiç değiştirilmedi**:

```
NFD yapıldı: "chīzu.mp3" → "chīzu.mp3" | bayt: 10 → 11
NFD yapıldı: "fōku.mp3"  → "fōku.mp3"  | bayt:  9 → 10
NFD yapıldı: "gēmu.mp3"  → "gēmu.mp3"  | bayt:  9 → 10
NFD yapıldı: "kōhī.mp3"  → "kōhī.mp3"  | bayt: 10 → 12

$ node manifest_check.js --atlas=/tmp/u2/kanji-atlas          exit=0
✓ 4b) referanslanan her ses dosyası DİSKTE VAR (NFC/NFD duyarsız)
✓ 6c) yetim mp3 YOK — 473 dosya · 0 yetim · NFC-dışı disk adı: 4 · (ham karşılaştırma 4 sahte yetim verirdi)
✅ MANİFEST BÜTÜNLÜK GEÇTİ (0 başarısız)
```

### Karşı kanıt · aynı fixture, **düzeltme öncesi** kod → düşüyor

```
$ node <42a23ea sürümü> --atlas=/tmp/u2/kanji-atlas           exit=1
✗ 4b) referanslanan her ses dosyası DİSKTE VAR — word_f_kōhī→audio/word/kōhī.mp3 | word_f_chīzu→… | word_f_fōku→…
✗ 6) yetim mp3 YOK — 473 dosya · 4 yetim: audio/word/chīzu.mp3, audio/word/fōku.mp3, audio/word/gēmu.mp3
❌ 2 başarısız
```

Bu, Codex'in harici diskte gördüğü hata sınıfının küçük ölçekli birebir yeniden üretimidir: **aynı fixture düzeltme öncesi kırmızı, düzeltme sonrası yeşil.**

### Kanıt 3 · Gerçek yetim → **DÜŞMELİ** ✅

```
eklenen: audio/kana/__gercek_yetim.mp3                        exit=1
✗ 6c) yetim mp3 YOK — 474 dosya · 1 yetim · NFC-dışı disk adı: 0 → audio/kana/__gercek_yetim.mp3
```

### Kanıt 3b · **NFD adlı** gerçek yetim → **DÜŞMELİ** ✅ *(ek güvence)*

Normalizasyonun gerçek bir yetimi gizlemediğini gösterir:

```
eklenen NFD yetim: "şĕkerlĕ_yetim.mp3"                        exit=1
✗ 6c) yetim mp3 YOK — 474 dosya · 1 yetim · NFC-dışı disk adı: 1 → audio/word/şĕkerlĕ_yetim.mp3
```

### Kanıt 4 · Normalizasyon çakışması (disk) → **DÜŞMELİ** ✅

Aynı NFC anahtarına düşen iki farklı ham ad yan yana:

```
ham ad 1: "kōhī.mp3" (10 bayt)   ham ad 2: "kōhī.mp3" (12 bayt)
ikisi de NFC anahtarı: "kōhī.mp3"                             exit=1
✗ 6a) diskte normalizasyon çakışması YOK — audio/word/kōhī.mp3 ← "audio/word/kōhī.mp3" ve "audio/word/kōhī.mp3"
```

### Kanıt 4b · Çakışma **manifest** tarafında → **DÜŞMELİ** ✅

```
eklenen kayıt yolu (NFD): "audio/word/kōhī.mp3"               exit=1
✗ 6b) manifestte normalizasyon çakışması YOK — audio/word/kōhī.mp3 ← "…" ve "…"
```

### Kanıt 5 · Yol güvenliği korunuyor → **DÜŞMELİ** ✅

```
yol: audio/word/../../../etc/passwd.mp3                       exit=1
✗ 4a) ses yolu göreli ve izinli klasörde — ham VE NFC biçim ayrı doğrulandı — word_ohayou→audio/word/../../../etc/passwd.mp3
```

---

## 5. Regresyon — Batch A kazanımları korundu

| Batch A negatifi | Sonuç |
|---|---|
| N1 eksik ses dosyası | `exit=1` → ✗ 4b |
| N2 yetim mp3 | `exit=1` → ✗ 6c |
| N3 duplicate `kategori+metin` | `exit=1` → ✗ 5 |
| N4 gömülü/JSON ayrışması | `exit=1` → ✗ Gate 7 (`manifest_build_check`, değişmedi) |

| Taşınabilirlik | Sonuç |
|---|---|
| depo kökü · `kanji-atlas/` · `_faz2/` · `/tmp` | `exit=0` |
| taşınmış kopya `/tmp/macsim2` | `exit=0` · `Atlas dizini: /tmp/macsim2/kanji-atlas` |

---

## 6. Komutlar ve çıkış kodları

```
node kanji-atlas/_faz2/manifest_check.js                              exit=0   Kanıt 1
node manifest_check.js --atlas=/tmp/u2/kanji-atlas                    exit=0   Kanıt 2 (NFD fixture)
node <42a23ea sürümü>  --atlas=/tmp/u2/kanji-atlas                    exit=1   karşı kanıt
node manifest_check.js --atlas=/tmp/u3/kanji-atlas                    exit=1   Kanıt 3
node manifest_check.js --atlas=/tmp/u3b/kanji-atlas                   exit=1   Kanıt 3b
node manifest_check.js --atlas=/tmp/u4/kanji-atlas                    exit=1   Kanıt 4
node manifest_check.js --atlas=/tmp/u4b/kanji-atlas                   exit=1   Kanıt 4b
node manifest_check.js --atlas=/tmp/u5/kanji-atlas                    exit=1   Kanıt 5
(regresyon) --atlas=/tmp/r1..r4                                       exit=1   ×4
(taşınabilirlik) 5 farklı çalışma dizini                              exit=0   ×5
```

**Çalışma zamanı:** node `v22.22.2` · git `2.43.0` · Ubuntu 24.04.4 LTS / x86_64 · dosya sistemi **ext4 (bayt-tam, Unicode normalizasyonu yapmaz)**.

---

## 7. Ağaç durumu ve geri dönüş

```
git status --short
 M kanji-atlas/_faz2/manifest_check.js
(rapor + kanıtlar commit edildi)

git diff kanji-atlas/_faz2/manifest_build_check.js   → BOŞ ✅
Ürün / manifest / ses / üretilmiş veri               → DEĞİŞMEDİ ✅
Geçici fixture'lar /tmp/u*, /tmp/r*, /tmp/macsim2    → hiçbiri depo altında değil ✅
```

| Geri dönüş | |
|---|---|
| Bu düzeltmeyi geri al | `git revert <düzeltme commit'i>` → Batch A'nın `42a23ea` hâline döner |
| Batch A'nın tamamını geri al | `git checkout 2ba47efa -- kanji-atlas/_faz2/manifest_check.js kanji-atlas/_faz2/manifest_build_check.js` |
| Etki | Yalnız bu iki test dosyası; başka hiçbir dosya etkilenmiyor |

---

## 8. Bilinen sınırlar ve riskler

| # | Konu | Not |
|---|---|---|
| 1 | **Gerçek NFD diskinde koşulmadı** | Konteyner ext4 ve tüm adlar NFC; NFD durumu **simüle edildi** (açık yeniden adlandırma). Sözleşmenin de öngördüğü gibi **nihai doğrulama gerçek harici diskte Codex tarafından yapılmalı**. Bunu geçmiş gibi göstermiyorum |
| 2 | 6a/6b çakışma kontrolleri **yeni kapılar** | Diskte kasıtlı olarak hem NFC hem NFD kopya tutulursa kırmızı olur. Kasıtlıdır: belirsizlik sessizce çözülmez |
| 3 | NFC seçimi tek yönlüdür | Karşılaştırma anahtarı NFC; NFKC/NFKD **kullanılmadı** — onlar farklı karakterleri (ör. tam genişlik ↔ yarım genişlik) eşitler ve Japonca içerikte veri kaybı riski taşır |
| 4 | Kontrol numaraları değişti (`6` → `6a/6b/6c`) | Çıktı ayrıştıran bir otomasyon varsa etkilenir; bilinen böyle bir tüketici yok |
| 5 | Disk okuma maliyeti | 473 dosya + dizin listeleme; ölçülen süre yine ~40 ms |

---

## 9. Kabul ölçütleri karşılığı

| Sözleşme ölçütü | Durum |
|---|---|
| Düzeltilmiş test temiz ürün kopyasında ve NFD fixture'ında geçiyor | ✅ Kanıt 1 · Kanıt 2 |
| Gerçek yetim hâlâ düşüyor | ✅ Kanıt 3 · 3b (NFD adlı yetim de) |
| Normalizasyon çakışmaları açık tanıyla düşüyor | ✅ Kanıt 4 (disk) · 4b (manifest) — her iki ham yol da gösteriliyor |
| Yalnız izin verilen dosyalar değişti | ✅ tek betik + rapor + kanıtlar |
| Yol güvenliği zayıflamadı | ✅ Kanıt 5 · ham **ve** NFC biçim ayrı doğrulanıyor |
| Taban/uç SHA, değişen dosya listesi, komutlar, çıkış kodları, çalışma zamanı sürümü, geri dönüş noktası, temiz durum | ✅ §1, §6, §7 |
| Teslim: iki commit'i de içeren yeni bundle | ✅ teslim mesajında |

---

**Batch A hâlâ FAIL — kapanmadı.** Sözleşme gereği Codex nihai pozitif kanıtı **gerçek harici proje diskinde** koşana kadar öyle kalır. Batch B **başlatılmadı**; merge, deploy, landing yok.
