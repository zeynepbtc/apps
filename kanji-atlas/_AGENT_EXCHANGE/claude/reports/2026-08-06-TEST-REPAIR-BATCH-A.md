# TEST REPAIR BATCH A — TESLİM RAPORU

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-06-TEST-REPAIR-BATCH-A-CONTRACT.md` |
| Sözleşme SHA-256 | `1d019ef42b9967b307ddab08c8d5e651f208d441bba6f3bf5158731746a50927` (ham baytlardan ölçüldü) |
| Başlangıç commit | **`2ba47efaeb91af25e9892cd412d83b1e2b552ab0`** |
| Dal | **`repair/batch-a-2026-08-06`** |
| Değişen izlenen dosya | **2** — yalnız izin verilen ikisi |
| Çalışma ağacı | **TEMİZ** (§7) |
| Merge / deploy / landing / arşiv / başka test onarımı | **YAPILMADI** |

> Sözleşmede "Required starting commit: supplied in the handoff after this contract is pushed" yazıyordu; teslim mesajında verilen `2ba47efa…` kullanıldı ve koordinasyon ucuyla eşleştiği doğrulandı.

---

## 1. Değişen dosyalar (izin verilenler dışında hiçbiri)

```
M kanji-atlas/_faz2/manifest_check.js
M kanji-atlas/_faz2/manifest_build_check.js
A kanji-atlas/_AGENT_EXCHANGE/claude/reports/2026-08-06-TEST-REPAIR-BATCH-A.md
A kanji-atlas/_AGENT_EXCHANGE/claude/evidence/2026-08-06-test-repair-a/  (8 kanıt dosyası)
```

**Kanıt:** 1955 izlenen dosyanın sha256'sı başlangıçta ve sonunda karşılaştırıldı; izin verilen iki dosya dışında **değişen yok**. Uygulama, manifest, ses ve üretilmiş veri dosyalarına dokunulmadı.

---

## 2. Taşınabilirlik (sözleşme §1)

Her iki betikte `/home/claude/apps-deploy` sabiti **kaldırıldı**. Atlas dizini artık betiğin kendi konumundan çözülüyor:

```js
const cliArg = process.argv.slice(2).find(a => a.startsWith("--atlas="));
const ATLAS = path.resolve(
  cliArg ? cliArg.slice("--atlas=".length)
         : (process.env.ATLAS_DIR || path.join(__dirname, ".."))
);
```

**Belgelenen geçersiz kılma** (isteğe bağlı, öncelik sırası CLI → ENV → `__dirname/..`):
```
node manifest_check.js --atlas=/yol/kanji-atlas
ATLAS_DIR=/yol/kanji-atlas node manifest_check.js
```
Manifest/HTML bulunamazsa betik **açık mesajla `exit=2`** verir (sessiz başarısızlık yok).

### Beş farklı çalışma dizininden aynı sonuç

| Nereden | `manifest_check` | `manifest_build_check` |
|---|---|---|
| Depo kökü (`apps-deploy/`) | `exit=0` | `exit=0` |
| `kanji-atlas/` | `exit=0` | `exit=0` |
| `kanji-atlas/_faz2/` | `exit=0` | `exit=0` |
| `/tmp` (tamamen ilgisiz dizin) | `exit=0` | `exit=0` |
| **`/tmp/macsim/kanji-atlas`** (taşınmış kopya — Mac-uyumlu göreli düzen simülasyonu) | `exit=0` | `exit=0` |

Taşınmış kopyada çıktının ilk satırı `Atlas dizini: /tmp/macsim/kanji-atlas` — yani gerçekten yeni konumu çözüyor, eski mutlak yola düşmüyor. `--atlas=` ve `ATLAS_DIR` de doğrulandı.

---

## 3. `manifest_check.js` — değişmezler (sözleşme §2)

### 3.1 Kaldırılanlar (bugünkü sayılarla **değiştirilmedi**)

| Kaldırılan | Neden |
|---|---|
| `7a) kategori sayıları (92/91/78/74)` | Dondurulmuş anlık görüntü; her içerik eklemesinde kırılır, hiçbir kaliteyi korumaz |
| `7b) durum sayıları (214/47/74)` | Aynı; ayrıca `610/0/0` bir **iyileşmeyi** hata gibi gösteriyordu |
| `8) tüm cümleler durum=tts` | Cümleler seslendirildi; iddia artık ürünün gerilemesini talep ediyor |
| `4) kaynak=flick ⇔ durum=recorded` | Çift yönlü koşul; flick→yeni göçünden sonra mantıken düşer |

**Hiçbiri `=== 610`, `=== 353` gibi güncel toplamlarla değiştirilmedi.** Doğrulama: yorumsuz kodda kalan tek sayısal eşitlik `=== 0` biçimindeki **sıfır-kusur** iddialarıdır (başarısız yok, yetim yok, duplicate yok). `92/214/47/335/610` yalnız başlık yorumunda — ne kaldırıldığını belgelemek için.

### 3.2 Korunan ve güçlendirilen değişmezler

| # | Kontrol | Sözleşme maddesi |
|---|---|---|
| 1 | id'ler benzersiz | ✅ |
| 2 | zorunlu alanlar + enum'lar geçerli (`metin` boş olamaz — güçlendirildi) | ✅ |
| **3** | **Yayın kapısı: `missing`/`tts` kayıt YOK** (sayı değil, durum değişmezi) | ✅ *"No `missing` or `tts` entry remains at the release gate"* |
| **4a** | Ses yolu **göreli**, mutlak değil, `..` içermez, izinli klasörde | ✅ *"valid relative audio path"*, *"paths stay under the allowed Atlas audio directories"* |
| **4b** | Referanslanan her dosya **diskte var** | ✅ *"the referenced file exists"* |
| 5 | `kategori + metin` tekil | ✅ |
| **6** | **Yetim mp3 yok** — `audio/` altındaki her dosya en az bir kayıtça referanslı, paylaşım serbest | ✅ **yeni koruma** |
| **7** | **Flick koşullu:** flick kaydı varsa recorded olmalı ve kaynağı bulunmalı; **flick kaydı yoksa kardeş dizin hiç aranmaz** | ✅ *"Absence of Flick entries must not make the test depend on a missing sibling directory"* |
| 8 | `_meta.pedagojik_hukum` zorunlu | ✅ |

Bugünkü ölçüm: **473 ses dosyası · 0 yetim · 0 flick kaydı → kardeş dizin kontrolü atlandı.**

---

## 4. `manifest_build_check.js` — değişmezler (sözleşme §3)

**Korunanlar:** anchor tespiti · **Gate 7 semantik eşitlik** · Gate 10 runtime fetch yasağı · Gate 10b JSON'un fetch argümanı olmaması · `AUDIO_MANIFEST` tüketimi · `_meta.pedagojik_hukum`.

**Kaldırılan:** `entries === 335`. **`610` ile değiştirilmedi.** Yerine sayıdan bağımsız yapısal koşul kondu:

```js
A("gömülü entries dizi ve boş değil (sabit sayı YOK)",
  !!(embedded && Array.isArray(embedded.entries) && embedded.entries.length > 0), …);
```

**Gerekçe:** kayıt sayısının eşitliği zaten **Gate 7 tarafından garanti ediliyor** — gömülü blok ile kanonik JSON semantik olarak birebir aynı olmak zorunda, dolayısıyla sayı da zorunlu olarak aynı. Ayrı bir sabit sayı hiçbir ek koruma sağlamıyordu.

**Ek sağlamlaştırma:** anchor bulunamazsa eski kod `m[1]` üzerinde çöküyordu; artık guard var ve Gate 7 düzgün şekilde başarısız oluyor.

---

## 5. Dört zorunlu negatif bozma kanıtı (sözleşme §4)

Hepsi **depo dışındaki geçici kopyalarda** (`/tmp/neg1..4`) yapıldı. Depo çalışma ağacına dokunulmadı.

### N1 · recorded kaydın ses dosyası eksik
```
silinen: /tmp/neg1/kanji-atlas/audio/kanji/dai.mp3
exit=1
✗ 4b) referanslanan her ses dosyası DİSKTE VAR — kanji_dai→audio/kanji/dai.mp3
❌ 1 başarısız
```

### N2 · Yetim mp3 (manifestte referansı yok)
```
eklenen: /tmp/neg2/kanji-atlas/audio/kana/__yetim_test.mp3
exit=1
✗ 6) yetim mp3 YOK (audio/ altındaki her dosya referanslı) — 474 dosya · 1 yetim: audio/kana/__yetim_test.mp3
❌ 1 başarısız
```

### N3 · `kategori + metin` duplicate
```
eklenen duplicate: kategori=kanji metin=一 (id: kanji_ichi__dup_test)
exit=1
✗ 5) kategori+metin duplicate SIFIR (çözüm anahtarı tekil) — kanji 一 (kanji_ichi ↔ kanji_ichi__dup_test)
❌ 1 başarısız
```

### N4 · Gömülü manifest ile JSON semantik ayrışması
```
JSON değiştirildi: word_ohayou · okunus "ohayou" → "ohayou_DEGISTI" (gömülü blok eski hâlde kaldı)
exit=1
✗ Gate 7) gömülü AUDIO_MANIFEST === audio-manifest.json (semantik)
❌ 1 başarısız
```

**Dördü de `exit≠0` ve dördü de tam olarak amaçlanan kontrolde düştü** — yan etkiyle veya çökerek değil. Ham loglar: `../evidence/2026-08-06-test-repair-a/negative-{1..4}-*.log`

---

## 6. Çalıştırılan komutlar ve çıkış kodları

```
POZİTİF
  (apps-deploy/)      node kanji-atlas/_faz2/manifest_check.js            exit=0   0 başarısız
  (apps-deploy/)      node kanji-atlas/_faz2/manifest_build_check.js      exit=0   Gate 7&10 geçti
  (kanji-atlas/)      node _faz2/manifest_check.js                        exit=0
  (kanji-atlas/)      node _faz2/manifest_build_check.js                  exit=0
  (kanji-atlas/_faz2) node manifest_check.js                              exit=0
  (kanji-atlas/_faz2) node manifest_build_check.js                        exit=0
  (/tmp)              node <abs>/manifest_check.js                        exit=0
  (/tmp)              node <abs>/manifest_build_check.js                  exit=0
  (/tmp/macsim)       node kanji-atlas/_faz2/manifest_check.js            exit=0   Atlas: /tmp/macsim/kanji-atlas
  (/tmp/macsim)       node kanji-atlas/_faz2/manifest_build_check.js      exit=0
  node manifest_check.js --atlas=/tmp/macsim/kanji-atlas                  exit=0
  ATLAS_DIR=/tmp/macsim/kanji-atlas node manifest_check.js                exit=0

NEGATİF (geçici kopyalar, depo dışı)
  node manifest_check.js --atlas=/tmp/neg1/kanji-atlas                    exit=1   ✗ 4b
  node manifest_check.js --atlas=/tmp/neg2/kanji-atlas                    exit=1   ✗ 6
  node manifest_check.js --atlas=/tmp/neg3/kanji-atlas                    exit=1   ✗ 5
  node manifest_build_check.js --atlas=/tmp/neg4/kanji-atlas              exit=1   ✗ Gate 7
```

**Araç sürümleri:** node `v22.22.2` · python3 `3.11.15` · git `2.43.0` · Ubuntu 24.04.4 LTS / x86_64 · Anthropic Cowork efemer bulut konteyneri.

---

## 7. Çalışma ağacı ve geri dönüş noktası

```
git status --short
 M kanji-atlas/_faz2/manifest_build_check.js
 M kanji-atlas/_faz2/manifest_check.js
(rapor ve kanıtlar commit edildi)

İzin verilenler dışında değişen izlenen dosya: YOK ✅
Geçici kopyalar: /tmp/neg1..4, /tmp/macsim — hiçbiri apps-deploy altında değil ✅
```

| Geri dönüş | |
|---|---|
| Nokta | **`2ba47efaeb91af25e9892cd412d83b1e2b552ab0`** |
| Komut | `git checkout 2ba47efa -- kanji-atlas/_faz2/manifest_check.js kanji-atlas/_faz2/manifest_build_check.js` |
| Veya | dalı hiç birleştirmemek |
| Etki | İki betik eski hâline döner; başka hiçbir dosya etkilenmez (zaten değişmedi) |

---

## 8. Bilinen kalan riskler ve notlar

| # | Konu | Not |
|---|---|---|
| 1 | Kontrol #3 artık **tüm** kayıtların `recorded` olmasını şart koşuyor | Bugün doğru (610/610). İleride bilinçli olarak `tts` bir kayıt eklenirse bu kapı kırmızı olur — **istenen davranış** (yayın kapısı), ama ekip bunu bilmeli |
| 2 | Kontrol #6 (yetim mp3) `audio/` altındaki **tüm** mp3'leri kapsıyor | Geçici/deneme sesi bırakılırsa kapı kırmızı olur. Kasıtlıdır: sessiz birikim engellenir |
| 3 | Flick kontrolü artık koşullu | Flick kayıtları geri gelirse kardeş dizin gerekliliği de geri gelir; dizin yoksa açık hata verir |
| 4 | `manifest_check` ses dosyalarını **diskten okuyor** (473 `existsSync` + dizin listeleme) | Ölçülen süre yine ~40ms; performans sorunu yok |
| 5 | Onarım yalnız bu iki dosyayı kapsadı | Envanterdeki diğer 3 onarım adayı (`gate3_container_verify`, `smoke_onboarding_b2`, `gate1_onboarding_b2`) **dokunulmadı** — sözleşme kapsamı dışı |
| 6 | Sözleşmedeki "Mac-compatible relative layout" kanıtı **simülasyondur** | Gerçek macOS'ta koşulmadı; taşınmış kopya (`/tmp/macsim`) ile mutlak-yol bağımsızlığı kanıtlandı. Gerçek Mac doğrulaması Codex/Zeynep tarafında yapılmalı |

---

## 9. Kabul ölçütleri karşılığı

| Sözleşme ölçütü | Durum |
|---|---|
| Her iki kontrol değiştirilmemiş ürün ağacında `exit=0` | ✅ 5 farklı çalışma dizininden |
| Depo kökünden ve `kanji-atlas/` içinden çalışıyor | ✅ ikisi de `exit=0` |
| Dört negatif kanıt amaçlanan sebeple `exit≠0` | ✅ 4b · 6 · 5 · Gate 7 |
| Güncel toplamlar beklenti olarak dondurulmadı | ✅ yorumsuz kodda yalnız `=== 0` sıfır-kusur iddiaları |
| Yalnız izin verilen dosyalar değişti | ✅ sha256 ile kanıtlandı |
| Ham komutlar, exit kodları, araç sürümleri, başlangıç/bitiş SHA, geri dönüş noktası, ağaç durumu raporlandı | ✅ §6, §7 |

---

**Batch A kapanmadı.** Codex pozitif ve negatif kanıtları yeniden üretene kadar bu dal beklemede. Merge, deploy, landing, arşivleme ve başka test onarımı **yapılmadı**.
