# AUTHORING BATCH 20 — 九 NİHAİ DURUM KAPISI · TESLİM RAPORU

# ✅ SONUÇ: **`九` = CLOSED / HOLD / hidden drafted**

`九` **kapatıldı**: `drafted` · `confidence: C` · `reviewedAt` yok · `kokenOf(九) → null` ·
kullanıcıya **kapalı**. Bu kayıt artık **Content Freeze öncesi açık bir authoring işi
değildir.**

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-AUTHORING-BATCH-20-KYUU-DISPOSITION.md` · SHA-256 `1f02bf203707f1daedf344b59959e1b290e154305c2b2d5203a2b6a5c2b58dd8` |
| Taban | **`70e1ef25fa66ee3eef00816164ae95f98c38a538`** (sözleşme §7.1 · birebir doğrulandı) |
| Dal | **`content/authoring-20-kyuu-disposition-2026-08-07`** |
| Karar | **B / HOLD** — sözleşmede kilitli, bu batch'te yeniden tartışılmadı |
| **Ürün dosyası farkı** | **0** — `index.html`, `data_chars.json`, `content_manifest.json` **bayt-identik** |
| `九` kaydı sha256 | önce = sonra → **`b7a619434515efcade…`** |
| Varsayılan `npm run gates` | **14/14 PASS · EXIT=0** |
| DOM kanıtı | **10/10 PASS** |
| Editoryal uyumlama · Content Freeze | **BAŞLATILMADI** |

---

## 0. Taban SHA — açık kayıt

Talimatta dal koordinasyon ucu `699fcc2172ab5a4b7cb8d24ac4e05f16a887f9b5` üzerinden
istenmişti; sözleşme §7.1 tabanı **`70e1ef25…`** olarak zorunlu kılıyor. İkisi arasındaki
**tek fark** `699fcc2`'nin eklediği sözleşme belgesinin kendisidir:

```
git diff --name-only 70e1ef2 699fcc2
  → kanji-atlas/_AGENT_EXCHANGE/codex/specs/2026-08-07-AUTHORING-BATCH-20-KYUU-DISPOSITION.md
```

**Sözleşmeyi seçtim** (kabul ölçütü §7.1 makine ile denetleniyor). Sözleşme metnini
`origin/codex/kanji-atlas-coordination`'dan okudum; içerik kaybı yok, ürün etkisi sıfır.
Codex isterse dal `699fcc2` üzerine yeniden kurulabilir.

---

## 1. Bu batch'in niteliği (§5.5) — açık beyan

**Bu bir araştırma turu değildir.** Yeni kaynak taranmadı, yeni teori seçilmedi, yeni köken
metni yazılmadı. Yapılan iş, **mevcut kanıtın ve Zeynep'in 2026-07-25 tarihli kararının
nihai yayın sınıflandırmasına dönüştürülmesidir.**

Doğrulama sırasında canlı kaynak erişimi mümkün oldu; bu bir "yeniden araştırma" değil,
**arşivlenmiş alıntıların doğruluk denetimi**dir — ve sonucu olumludur (§3).

---

## 2. Commit'ler ve gerçek değişen dosyalar

```
6878630  docs: Batch 20 (1/3) — 九 nihai durum kapısı uygulama planı
680e3b9  docs: Batch 20 (2/3) — kaynak/karar doğrulama kanıtı
<uç>     docs: Batch 20 (3/3) — teslim raporu + koşum kanıtları
```

`git diff --name-only 70e1ef2 HEAD` — **8 dosya, hepsi §6 beyaz listesinde**:

```
_AGENT_EXCHANGE/claude/plans/2026-08-07-AUTHORING-BATCH-20-KYUU-DISPOSITION-PLAN.md
_AGENT_EXCHANGE/claude/reports/2026-08-07-AUTHORING-BATCH-20-KYUU-DISPOSITION.md
_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-20-kyuu-disposition/dogrulama-matrisi-ve-karar-izi.md
_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-20-kyuu-disposition/kyuu-kaydi-ve-sayim-TABAN.txt
_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-20-kyuu-disposition/kyuu-checksum-ONCE.txt
_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-20-kyuu-disposition/kyuu-checksum-ve-sayim-SONRA.txt
_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-20-kyuu-disposition/gates-14of14-VARSAYILAN.log
_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-20-kyuu-disposition/gates-ILK-KOSUM-smoke-recognition-flake.log
_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-20-kyuu-disposition/browser-gates-yeniden-4of4.json
_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-20-kyuu-disposition/dom-kanit-10of10.log
```

**ÜRÜN / TEST / PAKET / SES DOSYASI DEĞİŞİKLİĞİ: 0.**

---

## 3. Canlı kaynak doğrulaması — arşivlenmiş alıntılar **doğru çıktı**

| Kaynak | URL | Erişim |
|---|---|---|
| **Kanjipedia `0001360800`** | `https://www.kanjipedia.jp/kanji/0001360800` | 2026-08-07 ✅ canlı |
| **説文解字 卷十四** (+段注 ayrı katman) | 漢典 `https://www.zdic.net/hans/%E4%B9%9D` | 2026-08-07 ✅ canlı |

```
Kanjipedia: 象形。人がひじを曲げた形にかたどる。借りて、数詞の「ここのつ」の意に用いる。
説文解字 卷十四: 陽之變也。象其屈曲究盡之形。凡九之屬皆从九。舉有切
説文解字注: (九)昜之變也。列子、春秋䋣露、白虎通、廣雅皆云：九，究也。象其屈曲究盡之形。…
```

> **Sonuç:** Kanjipedia satırı `九`'un `disagreementNote` alanında saklanan alıntıyla
> **birebir aynı**; 説文 alıntısı da uyumlu. **2026-07-25'te kaydedilen kanıt bugün de
> doğrudur** — bu, kararın dayandığı zeminin sağlam olduğunu gösterir.
> 段注 ayrıca 「九，究也」 okumasını 列子・春秋繁露・白虎通・廣雅'ya dayandırıyor: rakip okuma
> tek satırlık bir kapris değil, klasik gelenekte **yerleşik bir hat**.

---

## 4. Ortak nesne omurgası **yok** (§5.2)

| Kaynak | Eski biçim ne? | Sayı anlamı nasıl geldi? |
|---|---|---|
| **Kanjipedia (ESAS)** | dirsekten bükülmüş kol | **借りて** (ödünç) |
| 説文解字 卷十四 (+段注) | **soyut** 屈曲究盡 — nesne yok | **ödünçleme YOK**, doğrudan (九＝究) |
| 白川静 (kayıtlı) | kıvrılmış ejderha | 仮借 |
| EN Wiktionary (Sears) | bükülü kol | **anlam metaforu** — ses değil |
| ja.Wiktionary | — | 仮借 |
| OK辞典 `kanji131` | soyut bükülme | doğrudan |

Üç ayrı nesne (kol · soyut hareket · ejderha), iki ayrı mekanizma. **Omurga yok.**

### Bağımsızlık ayıklaması (§5.4)

| Görüş | Ham sayı | Bağımsız | Neden |
|---|---|---|---|
| Dirsek/bükülü kol | 3 | **≈1,5** | EN Wiktionary'nin tek dayanağı **Sears** (hakemli değil) ve sayıyı **ses değil anlam** metaforuyla açıklıyor |
| Soyut bükülme | 2 | **1** | **OK辞典 bağımsız değil — 説文'yi tekrarlıyor** |
| Ejderha | 1 | 1 | tek kaynak |

Hiçbir okuma iki bağımsız kaynağa ulaşmıyor; en güçlü iki hat (Kanjipedia ↔ 説文) hem
nesnede hem mekanizmada **birbiriyle çelişiyor**.

### "Şekil dokuz nesneyi göstermez" — açılma gerekçesi **yapılmadı** (§5.3)

Tüm kaynakların uzlaştığı tek nokta budur (alt iddia **(a)**, güven **A**) — ama **olumsuz
bir ifadedir**: neyin *olmadığını* söyler, ne *olduğunu* söylemez. Tek başına köken anlatısı
kurmaz ve "Kökeni" başlığı altına konacak bir cümle değildir.

### Alt iddia bazında güven — bugün de geçerli

| Alt iddia | Güven |
|---|---|
| (a) "şekil dokuz nesneyi göstermez" | **A** (olumsuz ifade) |
| (b) "sayı anlamı sonradan, ödünç alınarak" | **B** (説文/OK辞典 katılmıyor) |
| (c) "dirsekten bükülmüş kol" | **C** (ciddi ayrılık, hakemli kaynak yok) |

Kayıt tek blok → **en zayıf halka belirler** → **C**. `confidence: "C"` doğru sınıflandırmadır.

---

## 5. Karar izi — dört bağımsız yerde tutarlı (§5.1)

| # | Yer | Ne diyor |
|---|---|---|
| 1 | `九.etymology.disagreementNote` (ürün verisinin **içinde**) | *"NİHAİ KARAR (Zeynep, 2026-07-25) … reviewed VERİLMEDİ, reviewedAt VERİLMEDİ. confidence B → C … 'Şekil iddiasını çıkarıp yarım bir metin yayınlamak yerine şimdilik boş bırakmayı tercih ediyorum.'"* |
| 2 | `AUTHORING-DURUM-ve-FAZLAR.md` | Çıkarılabilir Ayrıntı Testi tablosu: *"Çıkarınca hiçbir şey kalmıyor → Yayınlanmaz (drafted/pending) → 九"* |
| 3 | `AUTHORING-03-KAYNAK-POLITIKASI.md` (satır 58) | *"Tartışmalı kısım çıkarılınca hiçbir şey kalmıyorsa → Yayınlanmaz — drafted/pending → 九"* |
| 4 | `AUTHORING-PARTI14-QA-RAPOR.md` | *"九'un durumu (drafted, conf C — açılmıyor)"* |

**Çelişki yok.** Karar ürün verisinde, metodoloji belgesinde, kaynak politikasında ve parti
raporunda aynı biçimde duruyor. Bu batch onu **kanonik yayın kararına** dönüştürüyor.

---

## 6. `九` kaydı — önce/sonra bayt ve semantik özdeşliği (§7.4)

| Ölçüm | Önce | Sonra |
|---|---|---|
| Kayıt JSON uzunluğu | 5307 bayt | **5307 bayt** |
| Kayıt sha256 | `b7a619434515efcade18fe2586950801eb689ccdbe9a44afb8ac595b249e69d4` | **aynı ✅** |
| `summaryTr` sha256 | `a387e77d5a3b25cf80cc7d305188ebdcb762ee0ea8bf0766efeba6e1e1d97d4a` | **aynı ✅** |
| `disagreementNote` sha256 | `c99fb5e38c50fb594e59cdf2f376f8effbb48c4f05d8115e749608d9baecae18` | **aynı ✅** |
| `qaStatus` / `confidence` / `reviewedAt` | `drafted` / `C` / yok | **aynı ✅** |
| `mnemonic` alanı | yok | **yok ✅** |
| `kokenOf(九)` / `mnemonicOf(九)` | `null` / `""` | **aynı ✅** |

Ürün dosyaları tabana göre: `index.html` **BAYT-IDENTİK** · `data_chars.json` **BAYT-IDENTİK** ·
`content_manifest.json` **BAYT-IDENTİK**.
`generate_data_chars.js --check` → `senkron: true · CONTENT_HASH güncel: true` ·
hash **`475592a4bd20617e`** · exit 0.

### Sayımlar — §2 ile birebir aynı

| Ölçüt | Sözleşme §2 | Ölçülen |
|---|---|---|
| toplam · reviewed · drafted · legacy · görünür köken | 98 · 58 · 1 (`九`) · 30 · 88 | **birebir** |
| mnemonic `not_required` / `active` / `pending_review` / alansız | 74 / 2 / 0 / 22 | **birebir** |
| `CONTENT_HASH` | `475592a4bd20617e` | **`475592a4bd20617e`** |

---

## 7. DOM kanıtı — gerçek Chromium, 10/10 (§7.7)

```
--- 南 ---  ✓ detay açıldı · ✓ Kökeni kartı TEK · ✓ gerçekten görünür
            ✓ görünür metin kilitli değerle BİREBİR aynı · ✓ Hafıza kartı YOK
--- 今 ---  ✓ boş Kökeni kartı OLUŞMADI (0)
--- 白 ---  ✓ boş Kökeni kartı OLUŞMADI (0)
--- 九 ---  ✓ kullanıcıya KAPALI — Kökeni kartı yok (drafted gizli)
            ✓ drafted/confidence C olarak KALDI
            ✓ pageerror YOK
DOM KANITI · pass=10  fail=0        CHILD EXIT=0 · 3,9 s
```

`九` için ne **Kökeni** ne **Hafıza** kartı oluşuyor; boş kart da yok.

---

## 8. Varsayılan gate (§7.8) — ve ikinci kararsızlık gözlemi

**Kanonik koşum:**

```
gates:core     10/10 PASS ·   1153 ms  ✅
gates:browser   4/4  PASS · 259249 ms  ✅
   ✅ smoke_sources.js 14548 · ✅ smoke_home_rec.js 24604
   ✅ smoke_backup.js  29579 · ✅ smoke_recognition.js 190462
Ağaç koruması: ✅ (her iki katmanda)        EXIT=0   → 14/14
```

### ⚠️ Gizlemediğim bulgu: bu kez `smoke_recognition.js` flake verdi

```
❌ FAIL      smoke_recognition.js   112530 ms exit=2      (exit 2 = HARNESS ERR)
```

Tekrar üretilemedi:

| Doğrulama | Sonuç |
|---|---|
| `run-browser-gates.mjs --json` (yeniden) | **4/4 PASS · overallPass: true** · `smoke_recognition` 207 729 ms |
| `npm run gates` (kanonik) | **14/14 PASS · exit 0** · `smoke_recognition` 190 462 ms |

**Bu, iki parti üst üste görülen ikinci flake'tir** — Batch 19'da `smoke_backup.js`
(44,4 s / normal 29 s), burada `smoke_recognition.js` (112,5 s / normal 190–208 s).
Ortak imza: **exit=2 (HARNESS ERR, assertion değil)** ve **anormal süre**. Batch 19'da süre
normalin üstündeydi, burada altında — yani test **erken düştü**.

Ürün verisi bu partide **hiç değişmediği** için bulgunun `九` ile ilgisi yoktur; ama
"14/14 yeşil" ifadesinin ölçülebilir kalması için kayda geçiriyorum ve **Batch 19'daki
önerimi yineliyorum**: Codex bunu ayrı bir **tarayıcı kapısı kararsızlığı** kaydı olarak
açsın. İki farklı testte tekrarlandığına göre sorun tek bir teste özgü değil, muhtemelen
paylaşılan tarayıcı/kaynak katmanında. Öneri: runner'ın çocuk `stderr`'ını **her koşumda**
(yalnız `--json` modunda değil) diske yazması — o zaman bir sonraki flake teşhis edilebilir olur.
Bu, bu partinin kapsamı dışıdır ve **yapılmadı**.

Ham loglar: `gates-ILK-KOSUM-smoke-recognition-flake.log` · `browser-gates-yeniden-4of4.json` ·
`gates-14of14-VARSAYILAN.log`.

> Batch 18'in disiplin hatası bu turda da **tekrarlanmadı**: kanıtlar gate başlamadan
> commit'lendi, tüm koşumlar temiz ağaçta yapıldı ("Ağaç koruması: ✅").

---

## 9. Bilinen borç — bu batch'te **düzeltilmedi** (§4)

`summaryTr` içindeki **"sesi nedeniyle"** ifadesi `EDITORYAL-UYUMLAMA-BEKLEYEN` §1'de kayıtlı:
altı kayıtlık (四 · 六 · 七 · 八 · 東 reviewed + **九** drafted) `借りて` geriye dönük hizalama
borcu. Aynı belgenin §11'i de `九`'un `mnemonic` alanının olmadığını, **açılırsa** eklenmesi
gerektiğini kaydediyor.

İkisi de **ayrı editoryal uyumlama batch'inin** işidir; burada dokunulmadı. `九` kullanıcıya
kapalı olduğu için bugün **kullanıcıya etkileri yoktur**.

---

## 10. Kabul ölçütleri (§7)

| # | Ölçüt | Sonuç |
|---|---|---|
| 1 | Başlangıç SHA tam olarak `70e1ef25…` | ✅ (§0'daki açık kayıtla) |
| 2 | Plan ayrı ve **ilk** commit | ✅ `6878630` |
| 3 | Değişen her dosya §6 beyaz listesinde; ürün farkı **0** | ✅ §2 |
| 4 | `九` önce/sonra semantik ve **bayt** özeti aynı | ✅ §6 — üç sha256 de aynı |
| 5 | Generator `--check` PASS, `CONTENT_HASH` `475592a4bd20617e` kalıyor | ✅ §6 |
| 6 | Sayımlar §2 ile birebir | ✅ §6 |
| 7 | DOM: `九` kartsız · `今`/`白` boş ve kartsız · `南` görünür · pageerror 0 | ✅ §7 |
| 8 | Varsayılan `npm run gates` 14/14 exit 0 | ✅ §8 (+ flake dürüstçe kayıtlı) |
| 9 | `git diff --check` temiz; ağaç yalnız izinli teslim dosyalarını gösteriyor | ✅ **0 bulgu** · `git status` boş · Chromium **0** |
| 10 | Rapor `九 = CLOSED / HOLD / hidden drafted` sonucunu açıkça yazıyor | ✅ **başlıkta ve §11'de** |

---

## 11. Nihai sınıflandırma

# `九` = **CLOSED / HOLD / hidden drafted**

- `etymology.qaStatus`: **`drafted`** (değişmedi)
- `etymology.confidence`: **`C`** (değişmedi)
- `etymology.reviewedAt`: **yok** (verilmedi)
- `kokenOf(九)`: **`null`** → Kökeni kartı **oluşmuyor**
- `mnemonicOf(九)`: **`""`** → Hafıza kartı **oluşmuyor**
- **Content Freeze öncesi açık authoring işi listesinden ÇIKTI.**

Karar **geri alınabilir olmayı sürdürüyor** ve yolu `disagreementNote` içinde yazılı:
`qaStatus → reviewed` + `reviewedAt` vermek yeterlidir — ki bu, şekil iddiasındaki **C**
seviyesini kabullenmek anlamına gelir. Bu batch o kapıyı **kapatmıyor**; yalnız bugünkü
durumu kanonikleştiriyor.

---

## 12. Komutlar, sürümler, çıkış kodları

```
git checkout -b content/authoring-20-kyuu-disposition-2026-08-07 70e1ef25…   exit=0  ağaç TEMİZ
git commit (plan)                                                             exit=0  6878630
<WebFetch × 2 canlı kaynak>                                                   ikisi de başarılı
git commit (doğrulama kanıtı)                                                 exit=0  680e3b9
npm run gates                     (ilk koşum)                                 exit=1  smoke_recognition FLAKE
node _faz2/run-browser-gates.mjs --json  (yeniden)                            exit=0  4/4 · overallPass
npm run gates                     (kanonik, VARSAYILAN)                       exit=0  14/14
node <depo dışı DOM ölçüm koşucusu>                                           exit=0  10/10
node _faz2/generate_data_chars.js --check                                     exit=0  hash değişmedi
git diff --quiet 70e1ef2 HEAD -- index.html / data_chars.json / content_manifest.json  hepsi exit=0
git diff --check 70e1ef2 HEAD                                                 0 satır
```

**Sürümler:** node `v22.22.2` · npm `10.9.7` · git `2.43.0` · playwright **1.56.0** (kilitli) ·
Chromium **141.0.7390.37** · Ubuntu 24.04 / x86_64.

---

## 13. Geri dönüş

Geri alınacak **ürün değişikliği yoktur** — bu batch yalnız belge üretti.

```bash
git revert <rapor commit'i> <doğrulama commit'i> <plan commit'i>
# veya dalı hiç birleştirmemek
```

---

## 14. Kapsam dışı bırakılanlar

`今` · `白` · `南` · diğer karakterler · `九` için reviewed açılışı veya metin düzeltmesi ·
"sesi nedeniyle" editoryal borcu · `九` mnemonic alanı · görünürlük politikası ·
tartışmalı-köken ürün deseni · editoryal uyumlama · Content Freeze · erişilebilirlik ·
telefon/tablet · native · mağaza · tarayıcı kapısı kararsızlığının onarımı.

Hiçbirine dokunulmadı.

---

**Batch 20 teslim edildi ve duruyorum.** Codex PASS vermeden editoryal uyumlama veya
Content Freeze başlatmıyorum.
