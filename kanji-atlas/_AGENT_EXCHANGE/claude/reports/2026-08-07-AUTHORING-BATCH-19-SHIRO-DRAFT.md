# AUTHORING BATCH 19 — 白 ARAŞTIRMA + GİZLİ TASLAK · TESLİM RAPORU

# ⛔ SONUÇ: **B — HOLD**. Ürün verisine hiçbir şey yazılmadı.

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-AUTHORING-BATCH-19-SHIRO-DRAFT.md` · SHA-256 `7421d66554376e1c0bf1e90e2268c9460161ad125a48ed0a8203d27036aba971` |
| Taban | **`ac7698f65218644df97a2cbfe66245aea319ee20`** (birebir doğrulandı) |
| Dal | **`content/authoring-19-shiro-draft-2026-08-07`** |
| Karar | **B** — savunulabilir ortak omurga **YOK** |
| `index.html` | **tabana göre BAYT-IDENTİK** |
| **Gerçek değişen dosya sayısı** | **5** — hepsi `_AGENT_EXCHANGE/` altında (1 plan · 3 kanıt · 1 rapor) + son commit'te 4 koşum logu |
| Varsayılan `npm run gates` | **14/14 PASS · EXIT=0** |
| DOM kanıtı | **10/10 PASS** |
| `今` · `九` · `南` · `百` · `白い` · uyumlama · Content Freeze · sonraki adım | **BAŞLATILMADI** |

---

## 1. Neden B — kaynakların kendisi "uzlaşı yok" diyor

Altı kaynak okundu ve fetch edildi. `白` bu seride karşılaştığımız **en zayıf kayıt**:
yalnız uzlaşı yok, **üç kaynak açıkça uzlaşı olmadığını beyan ediyor**.

| Kaynak | Eski biçim neyi gösteriyor? | Tür | "Beyaz"a geçiş |
|---|---|---|---|
| **Kanjipedia (ESAS)** | **白骨化した頭骨** — beyazlaşmış kafatası; asıl anlam されこうべ | 象形 | **転じて** (beyaz) · 借りて (aydınlık, söylemek) |
| 説文解字 卷七 | **nesne YOK** — 西方色也; 从入合二 (五行 kozmolojisi) | yapısal | geçiş yok; anlam zaten "beyaz" |
| 漢典 詳細解释 | **gün ışığı** — 象日光上下射之形 | 象形 | doğrudan: güneşin parlaklığı = beyaz |
| Dong Chinese | **"Origin unclear."** olasılıklar: başparmak **veya** insan yüzü | belirsiz | söylenmiyor |
| Wiktionary (EN) | **"Unclear; probably a pictogram"** · Guo (1954) → başparmak · Unger (Schuessler 2007) → palamut | 象形 (ihtiyatlı) | söylenmiyor |
| Wiktionary (JA) | 容器 · 人の頭 · 親指 (郭沫若 1954) — ve **「定説は無い」「憶測に過ぎず」** | — | söylenmiyor |
| OK辞典 | **üçünü yan yana sayıyor**: kafa kemiği · gün ışığı · palamut | 象形文字 | doğrudan, hangisinden olduğu belirsiz |

Ortaya çıkan nesne kümesi: **kafatası/baş · başparmak · palamut · gün ışığı · yüz · kap**
— altı rakip, üç "belirsiz" beyanı. **ESAS tek başına** kesin bir iddiada bulunuyor.

### Aday teori taraması (§3.4) — beşi de arandı, hiçbiri doğru varsayılmadı

| Aday | Sonuç | Nerede |
|---|---|---|
| Palamut / tohum | ✅ bulundu | Unger (Schuessler 2007) · OK辞典 「どんぐりの実」 |
| Tırnak / başparmak | ✅ bulundu | **郭沫若『金文余釋・釋白』(1954)** · EN Wiktionary · Dong |
| Kafatası / baş | ✅ bulundu | **Kanjipedia** (iddia) · OK辞典 · ja.Wiktionary · Dong ("face") — sonuncular **olasılık olarak** |
| Gün doğumu / ışık | ✅ bulundu | 漢典 詳細解释 · OK辞典 |
| **Pirinç tanesi** | ❌ **BULUNAMADI** | okunan altı kaynağın hiçbirinde yok — yalnız "bulunamadı" olarak kaydedildi |
| (ek) Kap / 容器 | ✅ bulundu | ja.Wiktionary |

### Kaynak bağımsızlığı (§3 son paragraf) — sayı ≠ uzlaşı

| İddia | Bağımsız destek | Değerlendirme |
|---|---|---|
| Kafatası/baş | **1** (Kanjipedia) | OK辞典 ve ja.Wiktionary bunu **savunmuyor, listeliyor** → bağımsız oy değil |
| Başparmak | **1** (郭沫若 1954) | EN Wiktionary ve Dong aynı 1954 önerisini aktarıyor → tek kök |
| Palamut | **1** (Unger, Schuessler 2007) | OK辞典 aktarım |
| Gün ışığı | **1** (漢典 geleneksel satır) | OK辞典 aktarım |
| Pirinç tanesi | **0** | — |

**Hiçbir iddia ikiden fazla bağımsız desteğe ulaşmıyor** ve en çok atıf alan öneri
(başparmak) ESAS'ın söylediği şey **değil**.

### İki iddia ayrı ayrı ölçüldü (sözleşme talebi)

| Ölçülen | Sonuç |
|---|---|
| **Tarihsel biçim ne gösteriyor?** | **uzlaşı YOK** — altı rakip nesne, üç kaynak "belirsiz" diyor |
| **"Beyaz" anlamına nasıl geçildi?** | **uzlaşı YOK** — 転じて / kozmoloji / doğrudan ışık / söylenmiyor |

`南`'da yalnız ikincisi ayrışmıştı ve birincisi 3/5 uzlaşıyla ayaktaydı. Burada **ikisi
birden** düşüyor.

### Çıkarılabilir Ayrıntı Testi (父 emsali) — 白'da çöküyor

| Adım | Sonuç |
|---|---|
| Bugün "beyaz" anlamına geliyor mu? | ✅ ortak — ama bu **köken değil** |
| 象形 mı? | ✅ görece ortak — ama **teknik metadata, kullanıcıya hiç render edilmez** |
| Eski biçim **neyi** gösteriyor? | ❌ kafatası / başparmak / palamut / ışık / yüz / kap — **bağdaşmaz** |
| Parçalar ne? | ❌ yok; 説文'nin verdiği tek çözümleme **"hatalı analiz"** sayılıyor |
| Nasıl "beyaz" oldu? | ❌ dört ayrı cevap |

Tartışmalı olan her şey çıkarıldığında geriye kalan cümle:
**"Bugün 'beyaz' anlamına gelir."** Bu bir köken açıklaması değildir →
sınıf: **BÜTÜNSEL ÇÖKÜŞ**.

**Sözleşme §4A'nın açık şartı uygulandı:** nötr kalıp
(`Daha sonra 'beyaz' anlamında kullanılmaya başlanmıştır.`) **nesne/olgu omurgası yoksa
kullanılamaz**. Burada omurga yok → kalıp kullanılmadı. §4B gereği aday teorilerden biri
**seçilmedi**, teoriler **birleştirilmedi**.

### Üç kaydın karşılaştırması

| | `南` (açıldı) | `今` (HOLD) | `白` (bu parti) |
|---|---|---|---|
| Nesne uzlaşısı | 3/5, ESAS küme içinde | küme yok | **küme yok** |
| Kaynakların kendi beyanı | — | — | **üç kaynak "belirsiz / 定説は無い"** |
| Rakip nesne sayısı | 1 (+azınlık) | 4 | **6** |
| Ayrışan | mekanizma | nesne + mekanizma | **nesne + mekanizma + parçalar** |
| Sonuç | yayımlandı (A) | HOLD | **HOLD** |

---

## 2. Kaynak erişim bilgileri (§3, §9.3)

Erişim tarihi **2026-08-07 (UTC)**, yöntem `WebFetch`/`WebSearch`.

| # | Kaynak | Kesin adres | Erişim |
|---|---|---|---|
| 1 | **Kanjipedia (ZORUNLU)** | `https://www.kanjipedia.jp/kanji/0005607600` — sözleşmedeki kimlikle **aynı** | ✅ canlı |
| 2 | 説文解字 卷七 (+段注, 康熙, 詳細解释 **ayrı katmanlar**) | 漢典 `https://www.zdic.net/hans/%E7%99%BD` | ✅ |
| 3 | Dong Chinese | `https://www.dong-chinese.com/wiki/%E7%99%BD` | ✅ |
| 4 | Wiktionary (EN) | `https://en.m.wiktionary.org/wiki/%E7%99%BD` | ✅ |
| 5 | Wiktionary (JA) | `https://ja.wiktionary.org/wiki/%E7%99%BD` | ✅ |
| 6 | OK辞典 | `https://okjiten.jp/kanji140.html` | ✅ |

Kanjipedia üstverisi doğrulandı: 部首 白 · 5画 · ハク/ビャク · しろ/しら/しろい · yedi anlam maddesi.

### 字源・成り立ち (ESAS, özgün)

```
象形。白骨化した頭骨の形にかたどる。もと、されこうべの意を表した。
転じて「しろい」、借りて、あきらか、「もうす」意に用いる。
```

### 説文解字 卷七 (özgün girdi)

```
白：西方色也。陰用事，物色白。从入合二。二，陰數。凡白之屬皆从白。𦣺，古文白。㫄陌切
```

`段注` ve `康熙字典` katmanları kanıt dosyasında **ayrı ayrı** etiketlendi; 説文'nin kendisiyle
karıştırılmadı.

### Basılı 白川静 / 藤堂 — arandı, **bulunamadı**

`字統` ve `漢字源` maddelerinin **doğrudan, doğrulanabilir** alıntısı bulunamadı; yalnız ikincil
özet/blog sayfaları çıktı. Sözleşme §3.3 gereği **kaynak adına konuşturulmadı** ve matrise
alınmadı. ESAS'ın kafatası okumasının 白川静 geleneğine dayanması muhtemeldir ama
**doğrulanmadığı için varsayılmadı**.

Ham alıntılar: `evidence/kaynak-alintilari-HAM.md` · matris: `evidence/kaynak-matrisi.md`.

---

## 3. Modern glif uyarısı (§3.5)

Bugünkü `白` şekli (日'nin üstünde kısa bir çizgi) tarihsel biçimin çözümlemesi **değildir**.
`日 + 丿` türü bir okuma hiçbir kaynakta yok; **çizgilerden hikâye türetilmedi**.

---

## 4. Ürün verisi — hiç dokunulmadı (§4B, §5, §9.5)

```
git diff --quiet ac7698f HEAD -- kanji-atlas/index.html   → BAYT-IDENTİK ✅
git diff --name-only ac7698f HEAD  → 4 dosya (rapor commit'i öncesi), hepsi _AGENT_EXCHANGE/
git diff --check ac7698f HEAD      → 0 bulgu
```

`_faz2/apply_authoring_19_shiro_draft.js` **yazılmadı** (B'de izinli değil).
`data_chars.json`, `content_manifest.json`, `CONTENT_HASH` **dokunulmadı**
(`--check` → `senkron: true · CONTENT_HASH güncel: true` · exit 0).

### Değişmez alanlar (§5) — ölçüldü

```
白: etymology=false · mnemonic=false · pictogram_note="" · memory_hint_tr=""
白 örnekler: [["白","shiro","beyaz"],["白い","shiroi","beyaz (sıfat)"],["面白い","omoshiroi","ilginç, eğlenceli"]]
白 n5_words: ["shiroi"]
百: etymology reviewed · confidence B · formationType 形声
    summaryTr: "一 sayıların başlangıcını gösterir. 白 ise anlamıyla değil, okunuşuyla katkı yapar."
```

`白い / shiroi` ve **`百` içindeki 白 ses bileşeni anlatısı** olduğu gibi duruyor.

### Sayımlar — tabanla birebir aynı (§8, B kolu)

| Ölçüt | Taban | Teslim |
|---|---|---|
| toplam · reviewed · drafted · legacy · görünür köken | 98 · 58 · 1 (`九`) · 30 · 88 | **aynı** |
| mnemonic `not_required` / `active` / `pending_review` / alansız | 74 / 2 / 0 / 22 | **aynı** |
| `CONTENT_HASH` | `475592a4bd20617e` | **`475592a4bd20617e`** |

---

## 5. DOM kanıtı — gerçek Chromium, 10/10 (§9.7)

```
--- 南 ---  ✓ detay açıldı · ✓ Kökeni kartı TEK · ✓ gerçekten görünür
            ✓ görünür metin kilitli değerle BİREBİR aynı · ✓ Hafıza kartı YOK
--- 今 ---  ✓ boş Kökeni kartı OLUŞMADI (0)
--- 白 ---  ✓ boş Kökeni kartı OLUŞMADI (0)     ← bu partiden önce de sonra da gizli
--- 九 ---  ✓ kullanıcıya KAPALI · ✓ drafted/confidence C olarak KALDI
            ✓ pageerror YOK
DOM KANITI · pass=10  fail=0        CHILD EXIT=0 · 2,1 s
```

---

## 6. Varsayılan gate (§9.9) — ve bir kararsızlık bulgusu

**Kanonik koşum:**

```
gates:core     10/10 PASS ·   1626 ms  ✅
gates:browser   4/4  PASS · 279819 ms  ✅
   ✅ smoke_sources.js 31510 · ✅ smoke_home_rec.js 26508
   ✅ smoke_backup.js  29261 · ✅ smoke_recognition.js 192400
Ağaç koruması: ✅ (her iki katmanda)        EXIT=0   → 14/14
```

### ⚠️ Gizlemediğim bulgu: `smoke_backup.js` bir kez flake verdi

İlk koşumda aynı taban ve aynı kodla:

```
❌ FAIL      smoke_backup.js   44448 ms exit=2      (exit 2 = HARNESS ERR, assertion değil)
```

Sonrasında **tekrar üretemedim**:

| Doğrulama | Sonuç |
|---|---|
| `smoke_backup.js` tek başına | **17/17 PASS · exit 0 · 29,4 s** |
| `run-browser-gates.mjs --json` (yeniden) | **4/4 PASS · `overallPass: true`** |
| `npm run gates` (kanonik) | **14/14 PASS · exit 0** · `smoke_backup.js` 29 261 ms |

Süre imzası dikkat çekici: flake koşumunda **44,4 s**, sağlıklı koşumlarda tutarlı biçimde
**29 s**. Bu, assertion kırmızısı değil, altyapı kaynaklı bir kararsızlıktır (muhtemelen
kaynak/zamanlama). **Ürün verisi bu partide hiç değişmediği için bu bulgunun `白` ile ilgisi
yoktur**; ama "14/14 yeşil" ifadesinin ölçülebilir kalması için kayda geçiriyorum.

Öneri: Codex bunu ayrı bir kararsızlık kaydı olarak açsın. İlk koşumda çocuğun stderr'ı
JSON'suz koşumda yakalanmadı; tekrar görülürse `--json` ile koşulup `results[].stderr`
alınmalı. Ham loglar: `gates-ILK-KOSUM-smoke-backup-flake.log` · `browser-gates-yeniden-4of4.json` ·
`gates-14of14-VARSAYILAN.log`.

> Ayrıca Batch 18'de yaptığım hatayı bu turda **tekrarlamadım**: kanıt dosyaları gate koşumu
> başlamadan önce commit'lendi, koşumlar temiz ağaçta yapıldı ("Ağaç koruması: ✅").

---

## 7. Kabul ölçütleri (§9)

| # | Ölçüt | Sonuç |
|---|---|---|
| 1 | Taban tam olarak `ac7698f65…` | ✅ |
| 2 | Plan ürün değişikliğinden önce **ayrı commit** | ✅ `9113456` |
| 3 | Kanjipedia kesin sayfası + 説文 özgün girdisi doğrulandı; matris **beş** iddia alanını kapsıyor | ✅ §2, `kaynak-matrisi.md` |
| 4 | A/B açık, **bağımsızlık gözetilmiş**, çıkarılabilir ayrıntı testiyle gerekçelendirilmiş | ✅ **B**, §1 |
| 5 | B'de hiçbir ürün verisi değişmiyor | ✅ `index.html` bayt-identik |
| 6 | (A'ya özel — generator/sayımlar) | uygulanmadı; `--check` exit 0, sayımlar tabanla aynı ✅ |
| 7 | DOM'da `白` gizli ve boş kartsız; `今` gizli/boş; `九` drafted/gizli; `南` görünür | ✅ §5 |
| 8 | `百`, `白い`, okumalar, örnekler, sesler ve değişmez alanlar korundu | ✅ §4 |
| 9 | Varsayılan `npm run gates` 14/14 exit 0 | ✅ §6 (+ flake bulgusu dürüstçe kayıtlı) |
| 10 | (A'ya özel — apply negatif kanıtı) | uygulanmadı, B |
| 11 | `git diff --check` bulgusuz; kapsam dışı değişiklik/süreç sızıntısı yok | ✅ **0 bulgu** · ağaç temiz · Chromium **0** |

---

## 8. Komutlar, sürümler, çıkış kodları

```
git checkout -b content/authoring-19-shiro-draft-2026-08-07 ac7698f65…   exit=0  ağaç TEMİZ
git commit (plan)                                                         exit=0  9113456
<WebFetch × 6 kaynak + WebSearch × 4>                                     hepsi kayıtlı
git commit (kaynak alıntıları + matris + taban ölçümü)                    exit=0
npm run gates                     (ilk koşum)                             exit=1  smoke_backup FLAKE
node _faz2/smoke_backup.js        (tek başına, SMOKE_URL ile)             exit=0  17/17 · 29,4 s
node _faz2/run-browser-gates.mjs --json                                   exit=0  4/4 · overallPass
npm run gates                     (kanonik, VARSAYILAN)                   exit=0  14/14
node <depo dışı DOM ölçüm koşucusu>                                       exit=0  10/10
node _faz2/generate_data_chars.js --check                                 exit=0  hash değişmedi
git diff --quiet ac7698f HEAD -- kanji-atlas/index.html                   exit=0  BAYT-IDENTİK
git diff --check ac7698f HEAD                                             0 satır
```

**Sürümler:** node `v22.22.2` · npm `10.9.7` · git `2.43.0` · playwright **1.56.0** (kilitli) ·
Chromium **141.0.7390.37** · Ubuntu 24.04 / x86_64.

---

## 9. Geri dönüş

Geri alınacak **ürün değişikliği yoktur**. Belgeler istenirse:

```bash
git revert <rapor commit'i> <araştırma commit'i> <plan commit'i>
# veya dalı hiç birleştirmemek
```

---

## 10. Öneri (karar Codex'in)

`白` bugünkü kaynak durumuyla **kapalı kalmalı**. Açılabilmesi için ya (a) nesne iddiasında
**iki bağımsız modern paleografi kaynağının** aynı şeyi söylediği doğrulanabilir alıntılar,
ya da (b) "kökeni tartışmalıdır" durumunu kullanıcıya dürüstçe gösteren ayrı ürün deseni
gerekir — ikincisi bu partinin değil, **tartışmalı-köken ürün deseninin** konusudur.

Artık **üç kayıt** (`九`, `今`, `白`) aynı sebeple kapalı. Bu, tartışmalı-köken deseninin
Content Freeze öncesinde ele alınmasını daha da gerekli kılıyor — ama o kapıyı açmak bana
düşmez.

`白`'ın özel bir yanı var: `百` kaydı zaten kullanıcıya **"白 anlamıyla değil, okunuşuyla
katkı yapar"** diyor. Yani ürün, 白'ın *ses* rolünü doğru biçimde anlatıyor; eksik olan yalnız
白'ın **kendi** kökeni. Bu tutarsızlık değil, bilinçli bir sınır.

---

## 11. Kapsam dışı bırakılanlar

`今` · `九` · `南` · `百` · `白い` · diğer kayıtlar · `白` için reviewed açılışı ·
editoryal uyumlama · tartışmalı-köken ürün deseni · Content Freeze v1.0 · ses · manifest ·
oyunlar · test paketi · `package.json` · `main` · deploy · landing · native/store.

Hiçbirine dokunulmadı.

---

**Batch 19 teslim edildi ve duruyorum.** Codex PASS **ve ayrı bir reviewed kararı** olmadan
`白` kullanıcıya açılamaz; `九`, uyumlama veya Content Freeze'e geçmiyorum.
