# GATE 1 — TESLİM RAPORU (Claude)

| | |
|---|---|
| Sözleşme | Codex, `2026-08-06-GATE-1-FIX-CONTRACT.md` · SHA-256 **doğrulandı** (§1) |
| Kaynak dal (sözleşme) | `origin/codex/kanji-atlas-coordination` @ `78d8b762209817adcd48e95dce089270847ca767` |
| Uygulayan | Claude |
| Denetleyecek | Codex (kanıtlar yeniden üretilmeden Gate 1 kapanmaz) |
| Dal | **`gate1/claude-fixes-2026-08-06`** |
| Başlangıç commit | **`db743d7f9ed3a7197ed9a26d07c5f512ca06acf3`** |
| **Son KOD commit'i** | **`cc57c4c10da7aeafbb126e7fd61d3a7d3a9fdf1d`** — uygulamayı etkileyen değişiklikler burada biter |
| Kod commit sayısı | **2** (M1/M2/M3/M6 · M4/M5 — ayrı tutuldu ki tek tek geri alınabilsin) |
| Belge commit'leri | Bu rapor + ham kanıtlar; `kanji-atlas/_AGENT_EXCHANGE/` dışına çıkmaz, uygulama dosyalarına dokunmaz |
| Dalın bitiş SHA'sı | Bu rapor kendi commit'inin SHA'sını içeremez; **nihai uç teslim mesajında ve `git ls-remote` ile bildirilir** |
| Çalışma ağacı | **TEMİZ** (§9) |
| Merge / deploy / landing | **YAPILMADI** |
| Gate 2 / Gate 3 | **BAŞLATILMADI** |

---

## 1. ✅ Sözleşme SHA-256 — DOĞRULANDI

Koordinasyon dalı erişilebilir olur olmaz sözleşmenin **ham baytları** üzerinden hesaplandı:

```
git show origin/codex/kanji-atlas-coordination:kanji-atlas/_AGENT_EXCHANGE/codex/specs/2026-08-06-GATE-1-FIX-CONTRACT.md | sha256sum
57fdc217aaa02d1245f4f4640556064b2352ff4b4bf968a9d080ad7d8093f678  -
beklenen:
57fdc217aaa02d1245f4f4640556064b2352ff4b4bf968a9d080ad7d8093f678
```
**BİREBİR EŞLEŞTİ.**

> Önceki teslimde bu değer doğrulanamamıştı; sözleşme metni sohbet üzerinden aktarıldığı için
> baytlar yeniden üretilemiyordu ve bunu doğrulanmış gibi göstermemiştim. Artık kanonik
> dosyadan doğrulanmıştır. Doğrulanan dosyanın kopyası: `../evidence/2026-08-06-gate1/GATE-1-FIX-CONTRACT-as-verified.md`

### 1.1 Uygulama, kanonik sözleşmeye karşı yeniden denetlendi

Düzeltmeler sohbetten aktarılan metne göre uygulanmıştı. Kanonik dosya gelince iki metin
normalize edilip (markdown işaretleri ve boşluk) karşılaştırıldı:

| Bölüm | Fark |
|---|---|
| Hedef | **fark yok** |
| Kapsam (6 madde) | **fark yok** |
| Kapsam dışı (6 madde) | **fark yok** |
| Kabul ölçütleri (7 madde) | **fark yok** — yalnız `commit'ler` ↔ `commit(ler)` yazımı |
| Teslim formatı | Sohbet sürümü **fazladan** iki kalem istiyordu (sözleşmenin tam metni + SHA, dal adı); kanonik sözleşme bunları istemiyor |

**Sonuç: uygulanan iş kanonik sözleşmeye tam uygundur; yeniden çalışma gerekmedi.** Fazladan
istenen iki kalem rapordan çıkarılmadı — üst küme olmaları zarar vermiyor, denetim izini
güçlendiriyor.

### 1.2 Faz 1 bağımsız denetimiyle mutabakat

`codex/audits/2026-08-06-PHASE-1-INDEPENDENT-REPRODUCTION.md` okundu. Codex'in beş bulgusundan
Gate 1 kapsamına giren üçü (§1 yanlış ses eşleşmeleri, §5'teki üç küçük kusur) bu turda kapatıldı.
Kapsam dışı bırakılanlar Codex'in Gate 3 sıralamasıyla aynı: `pictogram_note` görünürlük politikası
(§2), test envanteri (§3), `prefers-reduced-motion` (§4).

**Codex'in §2'de ek olarak bulduğu nokta kayda geçirildi:** Atölye açıklaması
`memory_hint_tr || pictogram_note` kullanıyor ve `kokenOf()` kapısını hiç çağırmıyor. Bu Gate 1
kapsamında **değil**, dokunulmadı; Gate 3'te QA görünürlük politikasıyla birlikte ele alınmalı.

### 1.3 Dal tabanı ilişkisi (ölçüldü)

```
db743d7 78d8b76'nin atası mı?        → EVET
merge-base(db743d7, 78d8b76)         → db743d7f9ed3a7197ed9a26d07c5f512ca06acf3
```
Yani `gate1/claude-fixes-2026-08-06` dalı, koordinasyon dalının **ortak atasından** dallanıyor;
78d8b76 ile birleşmesi çakışmasız olmalı (dokunulan dosya kümeleri ayrık). İstenirse dal
78d8b76 üzerine rebase edilebilir — **yapılmadı**, çünkü commit SHA'ları değişir ve Codex
doğrulaması bu SHA'lar üzerinden yürüyor.

## 2. Sözleşmenin tam metni

> Aşağıdaki metin sohbet üzerinden aktarılan sürümdür; SHA'sı doğrulanmış **kanonik** dosya `../evidence/2026-08-06-gate1/GATE-1-FIX-CONTRACT-as-verified.md` altındadır. İkisi arasındaki tek fark teslim-formatı bölümünün yazımıdır (§1.1).

```
Claude Görev Sözleşmesi — Gate 1 Düzeltmeleri
Tarih: 2026-08-06
Hazırlayan: Codex
Uygulayan: Claude
Denetleyen: Codex
Durum: READY
Hedef
Birleştirme öncesinde yalnızca doğrulanmış, düşük riskli içerik/ses ve görünüm kusurlarını
düzeltmek. Bu görev yayın, merge veya klasör taşıma yetkisi vermez.
Kapsam

1. `明` kaydının öğrenme bağlamına uygun romaji ve ses referansını düzelt.
2. `晴` kaydının öğrenme bağlamına uygun romaji ve ses referansını düzelt.
3. Yanlış `話 → hana → hana.mp3` ek manifest kaydını düzelt veya güvenli biçimde kaldır;
   doğru `話す/hanasu` ve `話/hanashi` ayrımını koru.
4. Boş köken metninde başlık ve kartın hiç üretilmemesini sağla; `null`, boş dize ve yalnız
   boşluk aynı gizli sonucu vermeli.
5. Tekrar ekranındaki düğmede tek bir `style` niteliği üret; devre dışı görünümünü koru.
6. `日.n5_words` içindeki yinelenen `nichiyoubi` öğesini teke indir.

Kapsam dışı

* `pictogram_note` yayın politikası
* Test paketinin yeniden kurulması
* `prefers-reduced-motion`
* Landing bağlantısı, merge, deploy
* Native/App Store/Google Play işleri
* Genel refactor veya biçim değişikliği

Kabul ölçütleri

* `明`, `晴` ve `話` için içerik ile manifest arasında yanlış dosya/okunuş eşleşmesi kalmaz.
* Manifestte `metin: "話", okunus: "hana"` kaydı kalmaz.
* Boş veya yalnız boşluk içeren köken değeri ekranda kart üretmez.
* Review düğmesinin HTML çıktısında aynı etikette iki `style` niteliği bulunmaz.
* `nichiyoubi` ilgili listede tam bir kez bulunur.
* Mevcut ses dosyalarının hiçbiri sessizce yeniden üretilmez veya üzerine yazılmaz.
* Değişiklikler dar kapsamlı commit'ler halinde, test komutları ve ham sonuçlarıyla teslim edilir.

Claude teslim formatı
`kanji-atlas/_AGENT_EXCHANGE/claude/reports/` altında tek rapor oluştur:

* Bu sözleşmenin tam metni ve SHA-256 değeri
* Başlangıç ve bitiş commit kimliği
* Dal adı
* Değişen dosyalar
* Her kabul ölçütü için kanıt
* Çalıştırılan komutlar ve çıkış kodları
* Bilinen kalan riskler
* Çalışma ağacının temiz/kirli durumu

Codex kanıtları yeniden üretmeden Gate 1 kapanmış sayılmaz.
```

---

## 3. Commit'ler ve değişen dosyalar

```
94bc5e3  Gate 1 (M1,M2,M3,M6): 明/晴/話 romaji-ses eslesmesi + 日.n5_words yinelemesi
cc57c4c  Gate 1 (M4,M5): bos koken karti gizlensin + review butonunda tek style niteligi
```

`git diff --stat db743d7..cc57c4c`
```
 kanji-atlas/_faz2/content_manifest.json |   2 +-
 kanji-atlas/_faz2/data_chars.json       |   2 +-
 kanji-atlas/_faz2/gate1_fix_data.js     | 110 ++++++++++++++++++++++++++++++++
 kanji-atlas/_faz2/gate1_fix_manifest.js |  89 ++++++++++++++++++++++++++
 kanji-atlas/audio-manifest.json         |  18 ++----
 kanji-atlas/index.html                  |  10 +--
 6 files changed, 210 insertions(+), 21 deletions(-)
```

| Dosya | Ne değişti |
|---|---|
| `index.html` | DATA (M1 明 romaji · M2 晴 romaji · M3 言→話 örnek romaji · M6 日.n5_words) · gömülü `AUDIO_MANIFEST` (senkron) · `CONTENT_HASH` · **2 render satırı** (M4 :3632, M5 :4073) |
| `audio-manifest.json` | 3 kayıt: `kanji_akarui` · `kanji_hareru` düzeltildi, `word_x_hana` kaldırıldı (611 → 610) |
| `_faz2/data_chars.json`, `_faz2/content_manifest.json` | `generate_data_chars.js` türetti (hash `ff4232ff…` → `6abd13bed1ae525b`) |
| `_faz2/gate1_fix_data.js`, `_faz2/gate1_fix_manifest.js` | **Yeni** — uygulanan düzeltmelerin çalıştırılabilir kaydı + makine güvenceleri; her ikisi de iki kez koşmayı reddeder |

**`audio/` altında sıfır değişiklik** (`git status --short kanji-atlas/audio/` boş).

---

## 4. Her kabul ölçütü için kanıt

### K1 · 明, 晴, 話 için içerik↔manifest yanlış eşleşmesi kalmaz

| Kayıt | ÖNCE | SONRA |
|---|---|---|
| 明 romaji | `aka` (= 赤'in okunuşu) | **`akarui`** |
| 明 kanji sesi | `audio/word/aka.mp3` (**赤'in sesi**) | **`audio/word/akarui.mp3`** (明るい) |
| 晴 romaji | `ha` (= は kanası) | **`hare`** |
| 晴 kanji sesi | `audio/kana/ha.mp3` (**は kanasının sesi**) | **`audio/word/hare.mp3`** (晴れ) |
| 言→話 örnek romaji | `hana` (= 花'nın okunuşu) | **`hanashi`** |

Ham çıktı:
```
✅ 明 romaji=akarui  → akarui
✅ 明 kanji sesi akarui.mp3  → akarui / audio/word/akarui.mp3
✅ 明 artik 赤ın sesini CALMIYOR
✅ 晴 romaji=hare  → hare
✅ 晴 kanji sesi hare.mp3  → hare / audio/word/hare.mp3
✅ 晴 artik は kanasinin sesini CALMIYOR
✅ 言→話 ornek romaji=hanashi
✅ romaji↔manifest okunus tutarli (明)
✅ romaji↔manifest okunus tutarli (晴)
```
Tarayıcı teyidi (gerçek render): `akarui → romaji "akarui"` · `hareru → romaji "hare"`.

**Seçim gerekçeleri** (ikisi de var olan dosyaya oturur, yeni ses üretilmedi):
- **明 → `akarui`:** ev deseni ölçüldü — fiil/sıfat kanjilerinde romaji = sözlük biçimi okunuşu: 休→`yasumu`, 話→`hanasu`, 飲→`nomu`, 食→`taberu`, 見→`miru`, 買→`kau`. Kaydın kendi verisi de destekliyor (`id:"akarui"`, kunyomi あか(るい), ilk örnek 明るい). `akarui.mp3` zaten mevcuttu.
- **晴 → `hare` (bilinçli sapma):** sözlük biçimi deseni `hareru` derdi, ama `hareru.mp3` **yok** ve sözleşme ses üretmeyi yasaklıyor. `hare` seçildi çünkü kaydın `meaning_tr`'si **"açık hava" = 晴れ** ve ilk örneği `["晴れ","hare","açık hava"]`; `hare.mp3` mevcut ve tam olarak 晴れ. Manifest `_meta.pedagojik_hukum` da bunu destekliyor: *"Karakter (kanji) sesi pedagojik temsili okunuştur; tüm okunuşları temsil ettiği iddia edilmez."* **Bu sapma sessiz değildir — burada ve betik başlığında yazılıdır.**

### K2 · Manifestte `metin:"話", okunus:"hana"` kaydı kalmaz
```
✅ manifest(gomulu) 話/hana yok
✅ manifest(json)   話/hana yok
✅ 話す/hanasu KORUNDU
✅ kanji 話/hanasu KORUNDU
```
`word_x_hana` **kaldırıldı**. Düzeltme mümkün değildi: doğru okunuş はなし olurdu ama `hanashi.mp3` yok ve ses üretmek yasak; yanlış dosyayı işaret etmeye devam etmektense kaydı kaldırmak seçildi (sözleşme "düzelt **veya güvenli biçimde kaldır**" diyor). Sonuç: o yüzeyde buton **sessiz** — yanlış ses çalmıyor.
`audio/word/hana.mp3` **yetim kalmadı**: `word_hana` (花) + `word_x_hana_2` (はな) hâlâ kullanıyor.

### K3 · Boş veya yalnız boşluk köken kart üretmez
Kod: `_ko===null?""` → **`(!_ko||!String(_ko).trim())?""`** (`index.html:3632`)

Gerçek `kokenOf()` üzerinde 9 vaka:
```
✅ null (drafted)             -> GIZLI     ✅ yalniz bosluk "   "       -> GIZLI
✅ null (pending)             -> GIZLI     ✅ tab+newline               -> GIZLI
✅ bos dize (legacy "")       -> GIZLI     ✅ reviewed bos summaryTr    -> GIZLI
✅ alan hic yok               -> GIZLI     ✅ GERCEK METIN              -> kart var
                                           ✅ reviewed metin            -> kart var
```
Gerçek veri: `今 → GIZLI · 白 → GIZLI · 九 → GIZLI · 南 → GIZLI · 時 → kart var · 父 → kart var`

**Tarayıcı kanıtı** (390×844, gerçek render): `shiro` → `kokenBasligi: false` · `ima` → `kokenBasligi: false` · `toki/akarui/hareru` → `kokenBasligi: true`. Ekran görüntüleri `/home/claude/gate1/detail-*.png`.

### K4 · Review düğmesinde aynı etikette iki `style` bulunmaz
ÖNCE: `style="margin-top:12px" ${due.length?'':'disabled style="opacity:.5;margin-top:12px"'}` — parser ikinci `style`'ı yok sayıyordu, `opacity:.5` **hiç uygulanmıyordu**.
SONRA: `style="margin-top:12px${due.length?'':';opacity:.5'}" ${due.length?'':'disabled'}`

```
✅ due=0 -> style niteligi sayisi: 1
   <button class="btn full" style="margin-top:12px;opacity:.5" disabled data-act="review-start">Şimdilik temiz</button>
✅ due=3 -> style niteligi sayisi: 1
   <button class="btn full" style="margin-top:12px"  data-act="review-start">Tekrara başla</button>
```
**Tarayıcı kanıtı:** `disabled: true` · `getComputedStyle().opacity: "0.5"` · `styleAttr: "margin-top:12px;opacity:.5"` → **devre dışı görünümü korundu ve artık gerçekten uygulanıyor.**
Tüm ağaç taraması: aynı etikette iki `style` **kalmadı** (DATA/manifest satırları hariç tutuldu).

### K5 · `nichiyoubi` tam bir kez
```
ÖNCE: ["mainichi","kyou","getsuyoubi","suiyoubi","kinyoubi","nichiyoubi","nichiyoubi","nihongo","nihon"]  (9)
SONRA: ["mainichi","kyou","getsuyoubi","suiyoubi","kinyoubi","nichiyoubi","nihongo","nihon"]              (8)
✅ 日.n5_words icinde 1 kez     ✅ liste 8 ogeli, digerleri korundu
```
Sıra korundu; ilk görülen konum kaldı.

### K6 · Hiçbir ses dosyası yeniden üretilmedi / üzerine yazılmadı
Değişiklikten **önce** 473 `.mp3`'ün sha256 mührü alındı, **sonra** yeniden alındı:
```
✅ 473 ses dosyasinin TAMAMI BIT-BIREBIR AYNI
   muhur: 3b1dc83accaada928f92a032a09a6b8e   (önce = sonra)
git status --short kanji-atlas/audio/   →   (boş)
✅ .mp3 sayisi 473    ✅ kirik yol yok (0)    ✅ yetim mp3 yok
```
Mühür dosyaları: `/home/claude/gate1/audio-BEFORE.sha256`, `audio-AFTER.sha256`.

### K7 · Dar kapsamlı commit'ler + test komutları ve ham sonuçlar
2 commit (§3). Komutlar ve çıkış kodları §5'te.

---

## 5. Çalıştırılan komutlar ve çıkış kodları

| Komut | exit | Ham sonuç |
|---|---|---|
| `git checkout -b gate1/claude-fixes-2026-08-06 db743d7` | 0 | başlangıç `db743d7…` |
| `node _faz2/gate1_fix_data.js` | 0 | M1 ✓ M2 ✓ M3 ✓ M6 ✓ |
| `node _faz2/gate1_fix_manifest.js` | 0 | 611 → 610 kayıt; `.mp3` 473 (değişmedi) |
| `python3 _faz2/inject_manifest.py` | 0 | `AUDIO_MANIFEST gömüldü — 610 kayıt, blok 101676 bayt` |
| `node _faz2/generate_data_chars.js` | 0 | `CONTENT_HASH → 6abd13bed1ae525b` |
| `node _faz2/generate_data_chars.js --check` | 0 | `data_chars.json senkron: true \| CONTENT_HASH güncel: true` |
| gömülü↔JSON manifest karşılaştırması | 0 | `gomulu 610 \| json 610 \| fark 0 \| SENKRON: EVET` |
| `node --check` (en büyük inline script, 371.148 B) | 0 | ✅ |
| DATA JSON parse | 0 | `98 kayit · 78 kelime` |
| `node _faz2/smoke_content_scaffold.js` | 0 | **401/401** |
| `node _faz2/smoke_legacy_derived.js` | 0 | **83/83** |
| `node _faz2/smoke_sources.js` | 0 | **0 başarısız** |
| `node _faz2/smoke_durable_backend.js` | 0 | **9/9** |
| `node _faz2/smoke_backup.js` | 0 | geçti |
| `node _faz2/smoke_game_roles.js` | 0 | **62/62** |
| `node _faz2/storage_check.js` | 0 | **0 başarısız** |
| `node _faz2/srs_check.js` | 0 | **0 başarısız** |
| Playwright 390×844 render turu | 0 | **0 pageerror, 0 console hatası** |
| ses mühür karşılaştırması (`diff`) | 0 | fark yok |

**Koşturulmayan suite'ler ve sebebi** (Gate 1 kapsamı dışı, sözleşme "test paketinin yeniden kurulması"nı kapsam dışı sayıyor):
- **16 dosya** bayat `file:///home/claude/atlas_drive_may30.html` yoluna bağlı → koşturulamıyor. *(Codex'in 16 sayısı doğrudur; benim önceki denetimimdeki 9 sayısı yanlıştı — taramayı `*.js` ile sınırlamıştım, 5 `.py` + 2 `.txt` kaçmıştı. Düzeltme kabul edildi.)*
- `manifest_check.js` / `manifest_build_check.js` — bayat beklentiler (335/214/47/74) yüzünden zaten kırmızıydı; **bu turda düzeltilmedi**, çünkü beklenti güncellemek "test paketini yeniden kurmak" olurdu.
- `smoke_home_rec` / `smoke_onboarding_b2` / `smoke_recognition` — kendi HTTP sunucularını kurmaya çalışıyor, bu ortamda 4 dk+ sürüyor/başarısız; **doğrulanamadı**.

### 5.1 Araç sürümleri (Working Agreement gereği)

```
node       v22.22.2
python3    Python 3.11.15
git        git version 2.43.0
playwright 1.56.0
chromium   Chromium 141.0.7390.37  (/opt/pw-browsers/chromium)
os         Ubuntu 24.04.4 LTS / x86_64
ortam      Anthropic Cowork efemer bulut konteyneri (hostname: vm)
```

### 5.2 Geri dönüş noktası (rollback point)

| | |
|---|---|
| Geri dönüş commit'i | **`db743d7f9ed3a7197ed9a26d07c5f512ca06acf3`** |
| Komut | `git reset --hard db743d7` (dalda) veya dalı hiç birleştirmemek |
| Etki | Bu daldaki 3 commit'in tamamı geri alınır; `origin/onboarding-b2-gate3` ve `origin/main` **zaten etkilenmedi** |
| Kısmi geri alma | M4/M5 tek başına: `git revert cc57c4c` · M1/M2/M3/M6 tek başına: `git revert 94bc5e3` (iki commit ayrı tutuldu ki tek tek geri alınabilsin) |
| Ses dosyaları | Hiç değişmediği için geri alınacak ses yok |

### 5.3 Ham kanıt dosyaları

`_AGENT_EXCHANGE/claude/evidence/2026-08-06-gate1/` altında:
`audio-BEFORE.sha256` · `audio-AFTER.sha256` · `audio-integrity.txt` · `tool-versions.txt` ·
`browser-check.mjs` (çalıştırılan tarayıcı betiği) · `testlog-*.txt` (8 suite ham çıktısı) ·
`GATE-1-FIX-CONTRACT-as-verified.md` (SHA'sı doğrulanan sözleşmenin kopyası).
Kimlik bilgisi içermez (`claude/00_README` gereği).

---

## 6. Bilinen kalan riskler

| # | Risk | Şiddet | Not |
|---|---|---|---|
| 1 | **Sözleşme SHA'sı doğrulanamadı** (§1) | Orta | Metin sohbet üzerinden geldi; baytlar yeniden üretilemez. Sözleşme git'e girince kesinleşir |
| 2 | **`hare` seçimi ev deseninden sapıyor** | Düşük | Gerekçeli ve belgeli (§4/K1). Codex `hareru` isterse ses kaydı gerekir — ayrı iş |
| 3 | **`話` yüzeyi artık sessiz** | Düşük | `word_x_hana` kaldırıldı; `hanashi.mp3` üretilirse geri bağlanabilir. Yanlış ses çalmaktan iyidir |
| 4 | **Kanji ses kapsamı 91/91 → 90/91 değil**, ama `word` kategorisinde 話 yüzeyi düştü | Düşük | Kanji kartı 話 hâlâ `kanji_hanasu` ile sesli; düşen yalnız 言 radikalinin örnek yüzeyi |
| 5 | **Regresyon ağı hâlâ zayıf** | **Yüksek** | 16 ölü + 2 kırmızı suite duruyor. Gate 1 kapsamı dışı ama **birleştirmeden önce çözülmeli** |
| 6 | Dal `origin/main`'in **6 commit gerisinde** | Orta | Hepsi site/ERP, `kanji-atlas/` dışı → çakışma beklenmiyor; yine de merge öncesi güncellenmeli |
| 7 | Font CDN'siz ortamda test edildi | Düşük | Gerçek cihazda `Shippori Mincho` ile metin genişlikleri farklı olur; M4/M5 metin genişliğine duyarlı değil |
| 8 | 明 kartı artık 明るい sesini çalıyor | Düşük | Tek karakterin izole okunuşu değil; `_meta.pedagojik_hukum`'a uygun ve ev deseniyle aynı (休→yasumu) |

---

## 7. Kapsam dışı bırakılanlar (dokunulmadı)

`pictogram_note` yayın politikası · test paketinin yeniden kurulması · `prefers-reduced-motion` · landing bağlantısı / merge / deploy · native / App Store / Google Play · genel refactor veya biçim değişikliği.
Ayrıca kendi denetimimden gelen ama **sözleşmede olmayan** hiçbir kalem uygulanmadı (ör. `kanji_hanasu` kaydı, örnek kelimelerin Türkçe karşılıkları, kategori tutarsızlığı, paramsız quiz döngüsü).

## 8. Uygulama disiplini

Her iki düzeltme betiği **makine güvenceli**: beklenen "bozuk" hâli bulamazsa durur (iki kez koşmayı reddeder), kapsam dışı kayıtların değişmediğini doğrular, yetim/kırık ses yolu oluşursa durur, `.mp3` sayısı değişirse durur. Manifest yeniden yazımında biçim round-trip'i (1 boşluk girinti, sonda `\n` yok) önceden doğrulandı → diff yalnız gerçek değişikliği gösteriyor, biçim gürültüsü yok.

## 9. Çalışma ağacı durumu

Bu rapor commit'lenmeden önce: `?? kanji-atlas/_AGENT_EXCHANGE/claude/reports/2026-08-06-GATE-1-TESLIM-RAPORU.md` (yalnız bu dosya).
Rapor commit'lendikten sonra **temiz**; nihai SHA teslim mesajında bildirilir.

---

**Gate 1 kapanmadı.** Codex kanıtları bağımsız olarak yeniden üretene kadar bu dal beklemede. Merge, deploy, landing bağlantısı ve Gate 2/3 işleri **başlatılmadı**.
