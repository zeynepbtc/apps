# AUTHORING BATCH 17 — 南 REVIEWED AÇILIŞI · TESLİM RAPORU

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-AUTHORING-BATCH-17-MINAMI-REVIEW.md` · SHA-256 `92f2eb5334c0d5c11412449af15ca20f525c3c6c48ee1e13a8d5063064a97d44` |
| Karar | `_AGENT_EXCHANGE/decisions/DECISION-002-MINAMI-MNEMONIC.md` · SHA-256 `9416dfe51e3ec2a062fd72d0f35df3bd23a3128f4ad12e4eb29a2be785eb52c0` |
| Taban | **`e0abee68d94d55c42f0d79ed7a835215dc5b9afb`** (birebir doğrulandı) |
| Dal | **`content/authoring-17-minami-review-2026-08-07`** |
| Değişen kayıt | **98 kayıttan 1** — `minami` |
| Görünür metin | **BAYT OLARAK DEĞİŞMEDİ** |
| Varsayılan `npm run gates` | **14/14 PASS · EXIT=0** |
| DOM kanıtı | **10/10 PASS** |
| `今` · `白` · `九` · uyumlama · Content Freeze | **BAŞLATILMADI** |

---

## 1. Commit'ler (§8 — üç commit)

```
0824246  docs:    Batch 17 (1/3) — 南 reviewed açılışı uygulama planı
6e5feb6  content: Batch 17 (2/3) — 南 drafted → reviewed, mnemonic not_required
<uç>     docs:    Batch 17 (3/3) — teslim raporu + ham kanıtlar
```

Plan commit'i **ürün dosyasına dokunulmadan önce** yazıldı (§2/§7.2): `0824246`'da yalnız plan
dosyası var, `index.html` tabana göre bayt-identik.

## 2. Değişen dosyalar (§3 ile birebir)

```
kanji-atlas/_AGENT_EXCHANGE/claude/plans/2026-08-07-AUTHORING-BATCH-17-MINAMI-REVIEW-PLAN.md
kanji-atlas/_faz2/apply_authoring_16_minami_reviewed.js      (yeni)
kanji-atlas/index.html
kanji-atlas/_faz2/data_chars.json                            (yalnız generator çıktısı)
kanji-atlas/_faz2/content_manifest.json                      (yalnız generator çıktısı)
kanji-atlas/_AGENT_EXCHANGE/claude/reports/…-MINAMI-REVIEW.md
kanji-atlas/_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-17-minami-review/**
```

İzin verilen liste dışında **hiçbir dosya** değişmedi.

---

## 3. `南` dönüşümü (§4)

### 3.1 Başlangıç durumu — yazmadan önce birebir doğrulandı

| Alan | Beklenen | Ölçülen |
|---|---|---|
| `etymology.qaStatus` | `drafted` | `drafted` ✅ |
| `etymology.reviewedAt` | yok | yok ✅ |
| `etymology.confidence` | `A` | `A` ✅ |
| `mnemonic.status` | `pending_review` | `pending_review` ✅ |
| `etymology.summaryTr` | sözleşmedeki kilitli metin | **birebir eşleşti** ✅ |

Betik bu beş kontrolü geçmeden **tek bayt yazmaz**.

### 3.2 Uygulanan dört semantik değişiklik

```
etymology.qaStatus        : "drafted" → "reviewed"
etymology.reviewedAt      : (yok) → "2026-08-07"        ← repo Git tarihinden, biçim doğrulandı
mnemonic                  : {"status":"pending_review"} → {"status":"not_required"}
etymology.disagreementNote: mevcut metin + REVIEWED ONAYI eki (+1688 kr)
```

`mnemonic` yalnız `status` taşıyor; **`textTr` oluşmadı** (betik `Object.keys(...).length !== 1`
ile bunu ayrıca engelliyor).

### 3.3 Değişmeyenler — alan alan ölçüldü

```
etymology.formationType        : AYNI ✅   (象形)
etymology.formationTypeSource  : AYNI ✅   (Kanjipedia)
etymology.confidence           : AYNI ✅   (A)
etymology.summaryTr            : AYNI ✅   ← BAYT KARŞILAŞTIRMASI
etymology.sources              : AYNI ✅
etymology dışı 20 alanın hepsi : BAYT AYNI ✅
  (meaning_tr/en · onyomi · kunyomi · romaji · stroke_count · jlpt_level · category ·
   components · component_meanings · parent_components · related_characters · examples ·
   position_variants · pictogram_note · stroke_order_steps · memory_hint_tr ·
   visual_mnemonic_type · n5_words · id · character · type)
```

`disagreementNote`'un **eski metni başta ve bozulmadan** duruyor (`indexOf(eski) === 0` → true);
beş kaynaklı araştırma izi, mekanizma çatalının dört ucu (anlam bağı / fonetik ödünç / kozmoloji /
güney rüzgârı), uzlaşı ölçümü ve altı görünür-metin kararı **silinmedi**. Betik bunu
`MEKANİZMA BELİRSİZLİĞİ`, `説文解字`, `Dong Chinese`, `Wiktionary`, `OKJiten`, `UZLAŞI ÖLÇÜMÜ`
izlerini tek tek arayarak doğruluyor.

### 3.4 Başka hiçbir kayıt değişmedi

```
DATA üst anahtarlar aynı                      : true
DATA.hiragana / katakana / confusables / words: BAYT AYNI ✅
chars anahtar listesi ve sırası aynı          : true  (98 kayıt)
DEĞİŞEN KAYIT SAYISI                          : 1  → 南 (minami)
```

---

## 4. Neden `summaryTr` yeniden yazılmadı (父'dan farkı)

父'da görünür metin tartışmalı bir ayrıntı (balta) taşıdığı için yeniden yazılmış ve confidence
B→A yükselmişti. 南'ın taslağı ise **zaten** Mekanizma Belirsizliği ilkesine (AUTHORING-05, beşinci
kilitli ilke) göre yazılmıştı: mekanizma hiç yayımlanmadı, fiil `kullanılmaya başlanmıştır` olarak
kilitlendi, confidence baştan A verildi. Bu turda düzeltilecek bir şey yoktu — yalnız QA kapısı
açıldı. "Yazan ≠ onaylayan" ayrımı korundu.

Betik bunu dille de mühürlüyor: görünür metinde `ödünç`, `anlamı gelişmiştir`, tartışma dili
(`tartışmalı`, `farklı görüş`, `kesin değil`, `belirsiz`…) ve teknik kaynak terimi
(`象形`, `形声`, `会意`, `説文`, `Kanjipedia`, `Wiktionary`, `Sagart`, `piktogram`, `fonetik`)
**oluşamaz**; buna karşılık `kullanılmaya başlanmıştır`, `çalgı`, `asılı`, `çan biçiminde` ve
`güney` **korunmak zorundadır**. Tüm bu kontroller `throw` ile kodlandı.

### Mnemonic kararı

DECISION-002'nin dört sorusu `disagreementNote`'a kaydedildi (T1–T4 hepsi HAYIR → `not_required`),
kararın **yalnız `南` için** geçerli olduğu ve genel kural oluşturmadığı guardrail'i de yazıldı.
Betik `DECISION-002` ve `GUARDRAIL` izlerinin notta bulunmasını zorunlu kılıyor.

---

## 5. Sayımlar (§6) — birebir tutturuldu

| Ölçüt | Sözleşme tabanı | Ölçülen taban | Sözleşme beklentisi | **Ölçülen sonuç** |
|---|---|---|---|---|
| toplam karakter | 98 | 98 ✅ | 98 | **98** ✅ |
| reviewed | 57 | 57 ✅ | 58 | **58** ✅ |
| drafted | 2 (`九`,`南`) | 2 ✅ | 1, yalnız `九` | **1 → `九`** ✅ |
| legacy | 30 | 30 ✅ | 30 | **30** ✅ |
| görünür köken | 87 | 87 ✅ | 88 | **88** ✅ |
| mnemonic `not_required` | 73 | 73 ✅ | 74 | **74** ✅ |
| mnemonic `active` | 2 | 2 ✅ | 2 | **2** ✅ |
| mnemonic `pending_review` | 1 | 1 ✅ | 0 | **0** ✅ |
| mnemonic alansız | 22 | 22 ✅ | 22 | **22** ✅ |
| `今` / `白` | boş | boş ✅ | boş kalır | **boş** ✅ |
| `九` | drafted · C · kapalı | ✅ | değişmez | **drafted · C · kapalı** ✅ |
| `CONTENT_HASH` | `6abd13bed1ae525b` | ✅ | değişir, generator ile eşleşir | **`475592a4bd20617e`** ✅ |

Sayımlar ürünün kendi `kokenOf()` / `mnemonicOf()` mantığı birebir uygulanarak hesaplandı —
ayrı bir yorum değil, kodun kendisi.

---

## 6. Generator (§7.5)

```
node _faz2/generate_data_chars.js          → CONTENT_HASH güncellendi -> 475592a4bd20617e
                                             Üretildi: data_chars.json (98 kayıt) + content_manifest.json   exit=0
node _faz2/generate_data_chars.js  (2.)    → aynı hash · git status farkı YOK                               exit=0
node _faz2/generate_data_chars.js --check  → data_chars.json senkron: true | CONTENT_HASH güncel: true       exit=0
```

İkinci koşum **diff üretmedi**; `--check` **exit 0**.

---

## 7. DOM kanıtı (§7.7–7.9) — gerçek Chromium, 10/10

```
--- 南 ---
✓ 南 detay ekranı açıldı (id=minami)
✓ 南 Kökeni kartı TEK (ölçülen 1)
✓ 南 Kökeni kartı GERÇEKTEN görünür (kutusu var)
✓ 南 görünür metin kilitli değerle BİREBİR aynı
✓ 南 Hafıza kartı YOK (mnemonic not_required, boş kart oluşmadı)
--- 今 ---   ✓ 今 boş Kökeni kartı OLUŞMADI (ölçülen 0)
--- 白 ---   ✓ 白 boş Kökeni kartı OLUŞMADI (ölçülen 0)
--- 九 ---   ✓ 九 kullanıcıya KAPALI — Kökeni kartı yok (drafted gizli)
             ✓ 九 drafted/confidence C olarak KALDI
✓ pageerror YOK
DOM KANITI · pass=10  fail=0        CHILD EXIT=0  süre=4,0 s
```

Ölçüm koşucusu **depo dışında** (`/tmp`) çalıştı; ürün dosyasına veya test paketine hiçbir kanca
eklenmedi. Sunucu sahipliği ve hermetik ağ yalıtımı Batch E deseniyle aynı.

---

## 8. Varsayılan gate (§7.10)

```
gates:core     10/10 PASS · 968 ms   ✅ ÇEKİRDEK KAPILAR GEÇTİ
gates:browser   4/4  PASS · 260039 ms
   ✅ smoke_sources.js 14622 ms · ✅ smoke_home_rec.js 25620 ms
   ✅ smoke_backup.js  29134 ms · ✅ smoke_recognition.js 190606 ms
   Sunucu kapatıldı · port 42103        Ağaç koruması: ✅ değişiklik YOK
EXIT=0                                   → toplam 14/14
```

---

## 9. Negatif kanıt (§7.11) — apply betiği iki kez koşmaz

```
node _faz2/apply_authoring_16_minami_reviewed.js        (2. koşum)
Error: 南: beklenen qaStatus 'drafted', gelen 'reviewed' — betik iki kez koşmaz
EXIT=1
index.html sha256 önce = sonra → DEĞİŞMEDİ ✅
```

Betik başlangıç durumu doğrulamasını geçemediği için **dosyaya hiç dokunmadan** durur.

---

## 10. Kabul ölçütleri (§7)

| # | Ölçüt | Sonuç |
|---|---|---|
| 1 | Taban tam olarak `e0abee68…` | ✅ |
| 2 | Plan ürün değişikliğinden önce oluşturuldu | ✅ commit `0824246` |
| 3 | İzin verilen yollar dışında değişiklik yok | ✅ §2 |
| 4 | `南` dönüşümü §4 ile birebir; başka DATA kaydı değişmedi | ✅ §3.2–3.4 |
| 5 | Generator türevleri üretti; 2. koşum diff yok; `--check` exit 0 | ✅ §6 |
| 6 | §6 sayımları birebir | ✅ §5 |
| 7 | `kokenOf(南)` kilitli metni döndürüyor; kart tek ve görünür | ✅ §7 |
| 8 | `mnemonicOf(南)` boş; Hafıza kartı yok, boş kart oluşmuyor | ✅ §7 |
| 9 | `今`/`白` boş kart yok; `九` kapalı | ✅ §7 |
| 10 | Varsayılan `npm run gates` 14/14 exit 0 | ✅ §8 |
| 11 | İkinci apply koşumu non-zero ve değişikliksiz | ✅ §9 |
| 12 | `git diff --check` bulgusuz; ağaç temiz, süreç sızıntısı yok | ✅ **0 bulgu** · `git status` boş · Chromium **0** |

---

## 11. Komutlar ve çıkış kodları

```
git checkout -b content/authoring-17-minami-review-2026-08-07 e0abee68…   exit=0  ağaç TEMİZ
git commit (plan)                                                         exit=0  0824246
node --check _faz2/apply_authoring_16_minami_reviewed.js                  exit=0
node _faz2/apply_authoring_16_minami_reviewed.js         (1. koşum)       exit=0
node _faz2/apply_authoring_16_minami_reviewed.js         (2. koşum)       exit=1  yazma YOK
node _faz2/generate_data_chars.js                        (1. ve 2.)       exit=0  2.'de diff yok
node _faz2/generate_data_chars.js --check                                 exit=0
node <depo dışı DOM ölçüm koşucusu>                                       exit=0  10/10
npm run gates                                            (VARSAYILAN)     exit=0  14/14
git diff --check e0abee6 HEAD                                             0 satır
git commit (uygulama)                                                     exit=0  6e5feb6
```

**Sürümler:** node `v22.22.2` · npm `10.9.7` · git `2.43.0` · playwright **1.56.0** (kilitli) ·
Chromium **141.0.7390.37** · Ubuntu 24.04 / x86_64.

---

## 12. Geri dönüş

```bash
git revert 6e5feb6                  # 南 tekrar drafted/pending_review olur, kullanıcıya kapanır
node _faz2/generate_data_chars.js   # türevler ve CONTENT_HASH tabana döner
```

veya dalı hiç birleştirmemek. Değişiklik tek kayıtla sınırlı olduğu için diğer 97 kayda ve ürün
davranışına etkisi yoktur.

---

## 13. Kapsam dışı bırakılanlar

`今` · `白` · `九` · editoryal uyumlama (12 madde) · Content Freeze v1.0 · QA görünürlük politikası ·
reduced-motion erişilebilirliği · diğer 97 kayıt · ses · manifest · oyunlar · test paketi ve
runner'lar · `package.json` · `main` · deploy · landing · native/store.

Hiçbirine dokunulmadı.

---

**Batch 17 teslim edildi ve duruyorum.** Codex PASS vermeden `今`, `白`, `九`, editoryal uyumlama,
Content Freeze, deploy veya store işine geçmiyorum.
