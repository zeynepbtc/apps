# AUTHORING BATCH 18 — 今 ARAŞTIRMA + GİZLİ TASLAK · TESLİM RAPORU

# ⛔ SONUÇ: **B — HOLD**. Ürün verisine hiçbir şey yazılmadı.

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-AUTHORING-BATCH-18-IMA-DRAFT.md` · SHA-256 `c02733cd7aadc697e84873ca657f7aee7676fcef85059cfb07ae291cbe498b65` |
| Taban | **`13a62c50e5bd3da6c74b3a44b8cce82a47e9349b`** (birebir doğrulandı) |
| Dal | **`content/authoring-18-ima-draft-2026-08-07`** |
| Karar | **B** — savunulabilir ortak omurga **YOK** |
| `index.html` | **tabana göre BAYT-IDENTİK** |
| Değişen dosya | **3** — hepsi `_AGENT_EXCHANGE/` altında (plan + iki kanıt) |
| Varsayılan `npm run gates` | **14/14 PASS · EXIT=0** |
| DOM kanıtı | **10/10 PASS** |
| `白` · `九` · `南` · uyumlama · Content Freeze · sonraki karakter | **BAŞLATILMADI** |

---

## 1. Neden B

Beş kaynağın hepsi okundu ve fetch edildi. **Nesne iddiasında hiçbir uzlaşı yok** ve
zorunlu ESAS kaynak **tek başına** kalıyor:

| Kaynak | Eski biçim neyi gösteriyor? | Oluşum türü | Mekanizma |
|---|---|---|---|
| **Kanjipedia (ESAS)** | çandan sarkan **dil/tokmak**; 「鈴」'in 原字'i | 象形 | **借りて** (ödünç) |
| 説文解字 卷五 (+段注/康熙) | **nesne YOK** — 亼 + 乁 yapısal çözümlemesi | 会意 | 逮及爲今 (anlam bağı) |
| Dong Chinese | **kapalı ağız**; ters 曰 | — | fonetik ödünç |
| Wiktionary | 指事 · "in the mouth" | 指事 | "etymology not clear" (Schuessler) |
| OK辞典 | somut nesne yok — "**örtüp içine alma hâli**" | 指事 | doğrudan anlam bağı |

Dağılım: **çan 1 · ağız 2 · örtme 1 · nesne yok 1**. Modern bir küme oluşmuyor ve ESAS o
kümenin içinde değil. Oluşum türünde de çoğunluk (指事, 2) ESAS'ın 象形'ıyla çelişiyor.

### Çıkarılabilir Ayrıntı Testi (父 emsali) — 今'da çöküyor

父'da tartışmalı ayrıntı (nesnenin balta olması) çıkarılınca omurga ayakta kalıyordu:
el → alet → otorite → baba. 今'da aynı testi uyguladım:

| Adım | Sonuç |
|---|---|
| Bugün "şimdi" anlamına geliyor mu? | ✅ ortak — ama bu **köken değil**, kaydın zaten sahip olduğu anlam |
| Eski biçim bir nesne gösteriyor mu? | ❌ ortak değil; bir kaynak "nesne yok" diyor |
| Nesne ne? | ❌ çan / ağız / örtme — **bağdaşmaz** |
| Parçalar ne? | ❌ 亼+乁 / ters 曰 / yok |
| Nasıl "şimdi" oldu? | ❌ ödünç / anlam bağı / belirsiz |

Tartışmalı olan her şey çıkarıldığında geriye kalan tek cümle:
**"Bugün 'şimdi' anlamına gelir."** Bu bir köken açıklaması değildir.
Ayrılık çıkarılabilir bir ayrıntıda değil, **kaydın omurgasında** →
sınıf: **BÜTÜNSEL ÇÖKÜŞ**.

### 南 geçti, 今 geçmiyor — fark tam olarak burada

| | 南 (Batch 16–17) | 今 (bu parti) |
|---|---|---|
| Nesne uzlaşısı | **3/5** (Kanjipedia + Dong + Wiktionary) | **küme yok**; ESAS yalnız |
| ESAS kümenin içinde mi | ✅ | ❌ |
| Ayrışan şey | yalnız **mekanizma** | **nesnenin kendisi** |
| Ayrılık çıkarılınca | omurga ayakta | **hiçbir şey kalmıyor** |
| Sonuç | mekanizma yayın dışı → yayımlandı, confidence A | **yayımlanamaz** |

Bu, 九'da verilen kararla aynı desendir. Sözleşme §4B'nin dediğini yaptım:
**sayım veya taslak üretmek için metin zorlamadım.**

> Mekanizma tek başına ayrışsaydı (南 gibi) nötr kalıp — `Daha sonra 'şimdi' anlamında
> kullanılmaya başlanmıştır.` — kullanılabilirdi. Ama o kalıbın önüne konacak **omurga cümlesi
> yok**: "neyin resmidir?" sorusunun savunulabilir bir cevabı çıkmadı.

---

## 2. Kaynak erişim bilgileri (§3, §9.3)

Erişim tarihi **2026-08-07 (UTC)**, yöntem `WebFetch`/`WebSearch`. Erişilemeyen sayfa için
başka bir yolla içerik çekilmedi.

| # | Kaynak | Kesin adres | Erişim |
|---|---|---|---|
| 1 | **Kanjipedia (ZORUNLU)** | `https://www.kanjipedia.jp/kanji/0002417400/` · id `0002417400` | ✅ |
| 2 | 説文解字 卷五 + 段注 + 康熙 | 漢典 `https://www.zdic.net/hans/%E4%BB%8A` | ✅ |
| 3 | Dong Chinese | `https://www.dong-chinese.com/wiki/%E4%BB%8A` | ✅ |
| 4 | Wiktionary | `https://en.m.wiktionary.org/wiki/%E4%BB%8A` (masaüstü alan adı "cache-only" hatası verdi) | ✅ mobil |
| 5 | OK辞典 | `https://okjiten.jp/kanji237.html` | ✅ |

Kanjipedia sayfa kimliği ayrıca üstveriyle doğrulandı: 部首 人 · 4画 · コン/キン · いま ·
常用/教育漢字 · 漢検9級 — hepsi `今` ile uyumlu.

### 字源・成り立ち (ESAS, özgün)

```
象形。すずから舌(した)が垂れている形にかたどる。「鈴(レイ、リン)」の原字。
借りて「いま」の意に用いる。
```

### Dürüstlük kaydı — Codex'in teyit etmesi istenen tek nokta

Bu satırı aynı URL'den üç kez okudum ve üçü de aynı geldi; ancak `WebFetch` her URL'yi
15 dakika önbelleklediği için bu **bağımsız üç okuma sayılmaz**. Metnin yanlışlıkla **令**
karakterine ait olma ihtimalini ayrıca test ettim: Kanjipedia'da 令
(`https://www.kanjipedia.jp/kanji/0007237600`, 部首 亼, 5画) **farklı** bir 成り立ち veriyor
(`会意。亼…と、卩…とから成り…`), yani çan/tokmak metni 令'e ait değil.

**Bu belirsizlik kararı değiştirmiyor:** ESAS ne derse desin, diğer dört kaynak nesne
konusunda birbirine de ESAS'a da uymuyor; küme yine oluşmuyor. Yine de canlı sayfada
teyit edilmesi kaydın gelecekteki turu için yararlı olur.

Ham alıntılar: `evidence/kaynak-alintilari-HAM.md` · matris: `evidence/kaynak-matrisi.md`.

---

## 3. Modern glif uyarısı (§3.4)

Bugünkü `今` şekli tarihsel biçimin çözümlemesi **değildir**. Kaynakların hiçbiri bugünkü
parçalardan yola çıkmıyor; 説文'nin `亼 + 乁`'si mühür biçimine ait. Bu yüzden `亼 + …` türü
bir çözümleme **kurulmadı**: kaynak desteği yok ve bileşen kullanıcıya bugünkü şekilde
görünmüyor ("görünmeyen bileşen adlandırılmaz", 南 turunda kilitlendi).

---

## 4. Ürün verisi — hiç dokunulmadı (§4B, §5, §9.5)

```
git diff --quiet 13a62c5 HEAD -- kanji-atlas/index.html   → index.html BAYT-IDENTİK ✅
git diff --name-only 13a62c5 HEAD:
  _AGENT_EXCHANGE/claude/plans/2026-08-07-AUTHORING-BATCH-18-IMA-DRAFT-PLAN.md
  _AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-18-ima-draft/kaynak-alintilari-HAM.md
  _AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-18-ima-draft/kaynak-matrisi.md
  (+ bu rapor ve koşum logları — son commit'te)
```

`_faz2/apply_authoring_18_ima_draft.js` **yazılmadı** (B sonucunda izinli değil).
`data_chars.json`, `content_manifest.json` ve `CONTENT_HASH` **dokunulmadı**.

`今` kaydı taban hâlinde: `etymology` **yok**, `mnemonic` **yok**, `pictogram_note: ""`,
`memory_hint_tr: ""`, `readings.irregularWords` (`今日 / きょう` jukujikun) **korundu**.

### Sayımlar — tabanla birebir aynı (§8, B kolu)

| Ölçüt | Taban | Teslim |
|---|---|---|
| toplam karakter | 98 | **98** |
| reviewed | 58 | **58** |
| drafted | 1 (`九`) | **1 (`九`)** |
| legacy | 30 | **30** |
| görünür köken | 88 | **88** |
| mnemonic `not_required` / `active` / `pending_review` / alansız | 74 / 2 / 0 / 22 | **74 / 2 / 0 / 22** |
| `CONTENT_HASH` | `475592a4bd20617e` | **`475592a4bd20617e`** |

`node _faz2/generate_data_chars.js --check` → `senkron: true · CONTENT_HASH güncel: true` · exit 0.

---

## 5. DOM kanıtı — gerçek Chromium, 10/10

```
--- 南 ---  ✓ detay açıldı (minami) · ✓ Kökeni kartı TEK · ✓ gerçekten görünür
            ✓ görünür metin kilitli değerle BİREBİR aynı · ✓ Hafıza kartı YOK
--- 今 ---  ✓ boş Kökeni kartı OLUŞMADI (ölçülen 0)
--- 白 ---  ✓ boş Kökeni kartı OLUŞMADI (ölçülen 0)
--- 九 ---  ✓ kullanıcıya KAPALI · ✓ drafted/confidence C olarak KALDI
            ✓ pageerror YOK
DOM KANITI · pass=10  fail=0        CHILD EXIT=0 · 3,1 s
```

`今` bu partiden önce de sonra da kullanıcıya **kapalı**; boş kart oluşmuyor.
`南` Batch 17'den beri görünür ve metni bozulmamış.

---

## 6. Varsayılan gate (§9.9)

```
gates:core     10/10 PASS ·    746 ms   ✅
gates:browser   4/4  PASS · 280679 ms   ✅  (sunucu kapatıldı · port 34283)
Ağaç koruması: ✅ koşum sırasında değişiklik YOK   (her iki katmanda)
EXIT=0                                   → toplam 14/14
```

> Şeffaflık notu: ilk gate denemem `EXIT=1` verdi — çünkü koşum **sürerken** kanıt
> dosyalarını yazmıştım ve runner'ın kirli-ağaç koruması bunu doğru şekilde yakaladı.
> Testlerin hepsi o koşumda da geçmişti (10/10 + 4/4); kırmızı yalnız benim disiplin
> hatamdı. Kanıtları commit'leyip **temiz ağaçta yeniden koştum**; yukarıdaki sonuç odur.
> Ham log: `evidence/gates-14of14-VARSAYILAN.log`.

---

## 7. Kabul ölçütleri (§9)

| # | Ölçüt | Sonuç |
|---|---|---|
| 1 | Taban tam olarak `13a62c50…` | ✅ |
| 2 | Plan ürün değişikliğinden önce **ayrı commit** | ✅ `ee44098` |
| 3 | Kanjipedia kesin sayfa + erişim kanıtı; matris dört iddia alanını kapsıyor | ✅ §2, `kaynak-matrisi.md` |
| 4 | A/B açıkça seçilmiş ve kanıtla gerekçelendirilmiş | ✅ **B**, §1 |
| 5 | B sonucunda ürün verisi değişmiyor | ✅ `index.html` bayt-identik |
| 6 | (A'ya özel — generator) | **uygulanmadı**, B |
| 7 | (A'ya özel — sayımlar/DOM) | sayımlar tabanla aynı ✅ · DOM'da `今` gizli, boş kart yok ✅ |
| 8 | `白`, `九`, `南`, okumalar, örnekler, sesler korundu | ✅ §4, §5 |
| 9 | Varsayılan `npm run gates` 14/14 exit 0 | ✅ §6 |
| 10 | (A'ya özel — apply negatif kanıtı) | **uygulanmadı**, B |
| 11 | `git diff --check` bulgusuz; kapsam dışı değişiklik/süreç sızıntısı yok | ✅ **0 bulgu** · ağaç temiz · Chromium **0** |

---

## 8. Komutlar ve çıkış kodları

```
git checkout -b content/authoring-18-ima-draft-2026-08-07 13a62c50…     exit=0  ağaç TEMİZ
git commit (plan)                                                        exit=0  ee44098
<WebFetch × 5 kaynak + WebSearch>                                        hepsi kayıtlı
git commit (kaynak alıntıları + matris)                                  exit=0
npm run gates              (kirli ağaçla ilk deneme)                     exit=1  koruma doğru çalıştı
npm run gates              (temiz ağaç, VARSAYILAN)                      exit=0  14/14
node <depo dışı DOM ölçüm koşucusu>                                      exit=0  10/10
node _faz2/generate_data_chars.js --check                                exit=0  hash değişmedi
git diff --quiet 13a62c5 HEAD -- kanji-atlas/index.html                  exit=0  BAYT-IDENTİK
git diff --check 13a62c5 HEAD                                            0 satır
```

**Sürümler:** node `v22.22.2` · npm `10.9.7` · git `2.43.0` · playwright **1.56.0** (kilitli) ·
Chromium **141.0.7390.37** · Ubuntu 24.04 / x86_64.

---

## 9. Geri dönüş

Geri alınacak **ürün değişikliği yoktur**. Belgeler istenirse:

```bash
git revert <kanıt commit'i> <plan commit'i>
# veya dalı hiç birleştirmemek
```

---

## 10. Öneri (karar Codex'in)

`今` kaydı bugünkü kaynak durumuyla **kapalı kalmalı**. Açılabilmesi için ya (a) nesne
iddiasında modern bir küme oluşturacak ek birincil kaynak (白川静 字統 / 藤堂 漢字源 gibi
basılı sözlüklerin doğrudan alıntısı), ya da (b) "kökeni tartışmalıdır" durumunu kullanıcıya
dürüstçe gösteren **ayrı bir ürün deseni** gerekir — ikincisi bu partinin değil, QA görünürlük
politikasının konusudur.

`九` ile birlikte artık **iki kayıt** aynı sebeple kapalı. Content Freeze'e giderken
"kapalı kayıt" durumunun ürün tarafında nasıl anlatılacağı ayrı bir kapı olarak açılmalı.

---

## 11. Kapsam dışı bırakılanlar

`白` · `九` · `南` · diğer 97 kayıt · `今` için reviewed açılışı · editoryal uyumlama ·
Content Freeze v1.0 · QA görünürlük politikası · ses · manifest · oyunlar · test paketi ·
`package.json` · `main` · deploy · landing · native/store.

Hiçbirine dokunulmadı.

---

**Batch 18 teslim edildi ve duruyorum.** Codex PASS **ve ayrı bir reviewed kararı** olmadan
`今` kullanıcıya açılamaz; sonraki karaktere geçmiyorum.
