# TEST ENVANTERİ DENETİMİ — Salt Okunur

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-06-TEST-INVENTORY-AUDIT-CONTRACT.md` |
| Sözleşme SHA-256 | `44331fbbec3986f30a191a378680f8b3fafdc72c71e110c6e38cdff8ccd970d1` (ölçüldü) |
| Başlangıç commit | **`a5892f566117b7e52fcb13859ed07672cb71c7f9`** (sözleşmenin istediği) |
| Çalışma dalı | `audit/test-inventory-2026-08-06` |
| Çalışma ağacı | **TEMİZ** — 1951 izlenen dosyanın tamamı sha256 birebir aynı (§8) |
| Değiştirilen dosya | **0** · Eklenen: yalnız bu rapor |
| Merge / push-to-main / deploy / Gate 3 uygulaması | **YAPILMADI** |

---

## 0. Yöntem ve dürüstlük notları

### 0.1 Sözleşme doğrulaması
```
git rev-parse origin/codex/kanji-atlas-coordination
c543e8bc78fe760be9ed80d36c7b595b76de8c9d          → bildirilen uç ile EŞLEŞTİ
git merge-base --is-ancestor a5892f5 c543e8bc     → EVET (istenen başlangıç, ucun atası)
```
Gate 1 commit'lerimin dördü de (`94bc5e3`, `cc57c4c`, `d2f760a`, `b5c0545`) `c543e8bc` içinde — birleştirme doğrulandı.

### 0.2 ⚠️ Çalıştırma sırasında bir uygulama dosyası değişti — tespit edildi ve geri alındı

Envanteri çıkarmak için adayları **çalıştırdım** (sözleşme "current measured result and exit code when safely runnable" istiyor). Çalıştırma öncesi ve sonrası tüm izlenen dosyaların sha256'sını aldım. Sonrasında:

```
❌ DEĞİŞEN: kanji-atlas/index.html
```

**Sebep:** `qa_kyuu_round.js` — adı `qa_` ile başladığı için "kontrol" gibi görünüyor, ama gerçekte `fs.writeFileSync(INDEX, src)` ile **uygulamanın kendisine yazan bir apply betiği**. (Çıktısı: *"九 QA turu kaydedildi… disagreementNote uzunluğu: 5970 karakter."*)

**Yapılan:** `git checkout -- kanji-atlas/index.html` → ağaç eski hâline döndü, 1951 dosya birebir doğrulandı (§8). Net etki **sıfır**.

Bunu gizlemiyorum çünkü bu, denetimin **en değerli bulgularından biri**: envanterde "test gibi adlandırılmış ama mutasyon yapan" bir betik var ve bir insan onu güvenle çalıştırılabilir sanabilir. Aday kümedeki **yazma yapan tüm betikleri** ölçtüm:

| Betik | Nereye yazıyor | Risk |
|---|---|---|
| **`qa_kyuu_round.js`** | **`../index.html` (UYGULAMA)** | 🔴 **Yüksek** — adı yanıltıcı |
| `harness.js` | `_faz2/karsilastirma-raporu.md` (**izlenen dosya**) | 🟡 Orta — bu turda aynı içerik yazdı, fark oluşmadı |
| `deadcode_css3.js` | `/tmp/css_candidates.json` | 🟢 Yok |
| 5 `.py` betiği | var olmayan `/home/claude/...` yolları | 🟢 Yok — yazmadan önce çöküyorlar |

---

## 1. Kapsam ölçümü

`kanji-atlas/_faz2/` altında **94 dosya**. Sözleşme kapsamı = *test/kontrol olarak sunulan* ∪ *`atlas_drive_may30.html` referansı olan* → **37 aday**.

```
isim-bazlı test/kontrol adayı : 32
bayat yol (atlas_drive_may30) : 16
birleşim                      : 37
```

**16 bayat-yol dosyasının hiçbiri aktif test olarak önerilmiyor** (§2 dağılımı):
5 tarihsel `.py` aracı · 2 `OBSOLETE` `.txt` · 7 eskimiş smoke · 2 yerini almış smoke.

---

## 2. Dosya bazında envanter (37)

Sütunlar: **Kat.** = sözleşmenin altı sınıfı · **Sonuç** = ölçülen exit kodu · **Öneri** = disposition.

### 2.1 Aktif yayın-kapısı testi — YEŞİL (11) · öneri: **retain**

| Dosya | Amaç | Girdi | Girdi repoda? | Taşınabilir? | Ölçülen | Öneri |
|---|---|---|---|---|---|---|
| `smoke_content_scaffold.js` | v2 içerik iskelesi/şema bütünlüğü | `../index.html` | ✅ | ⚠️ mutlak yol | `exit=0` **401/401** · 308ms | retain |
| `smoke_legacy_derived.js` | legacy→v2 türetme tutarlılığı | `../index.html` | ✅ | ⚠️ mutlak yol | `exit=0` **83/83** · 42ms | retain |
| `smoke_durable_backend.js` | kalıcı storage backend sözleşmesi | `../index.html` | ✅ | ⚠️ mutlak yol | `exit=0` **9/9** · 88ms | retain |
| `smoke_game_roles.js` | oyun rol/veri sözleşmesi | `../index.html` | ✅ | ⚠️ mutlak yol | `exit=0` **62/62** · 83ms | retain |
| `storage_check.js` | storage kabul seti (saf, `storage.js` üzerinden) | `./storage.js` | ✅ | ✅ | `exit=0` **0 başarısız** · 69ms | retain |
| `srs_check.js` | SRS kanonik selector (saf, çıkarılmış fonksiyonlar) | `./srs_selector.extracted.js` | ✅ | ✅ | `exit=0` **0 başarısız** · 101ms | retain |
| `graph_check.js` | aile/graf veri modeli | DATA | ✅ | ✅ | `exit=0` **0 başarısız** · 38ms | retain |
| `list_progress_check.js` | ilerleme listesi mantığı | DATA | ✅ | ✅ | `exit=0` **0 başarısız** · 37ms | retain |
| `smoke_sources.js` | "Kaynaklar ve Yöntem" ekranı + render regresyonu | `../index.html` + playwright | ✅ | ⚠️ mutlak yol | `exit=0` **0 başarısız** · 13.9s | retain |
| `smoke_backup.js` | yedek al/geri yükle akışı | `../index.html` + playwright + http | ✅ | ⚠️ mutlak yol | `exit=0` · 30.6s | retain |
| `smoke_recognition.js` | tanıma akışı (kendi http sunucusunu :8901 açıyor) | `../index.html` + playwright | ✅ | ⚠️ mutlak yol | `exit=0` **pass=24 fail=0** · **191.5s** | retain (⚠️ yavaş) |

### 2.2 Aktif yayın-kapısı testi — KIRMIZI/ONARIM GEREKLİ (5) · öneri: **repair**

| Dosya | Neden kırmızı | Bayat beklenti mi, ürün hatası mı? | Ölçülen | Öneri |
|---|---|---|---|---|
| `manifest_check.js` | 4 başarısız kontrol | **Bayat beklenti** (§4.1) | `exit=1` · 35ms | repair |
| `manifest_build_check.js` | 1 başarısız (`entries 335`) | **Bayat beklenti** (§4.2) | `exit=1` · 58ms | repair |
| `gate3_container_verify.js` | dış http sunucusu gerekiyor + **bayat seçici** | **Bayat** — `[data-act="ob-competency"]` index.html'de **0 kez** geçiyor (onboarding sadeleştirildi) | sunucusuz `exit=2` ERR_CONNECTION_REFUSED · sunucuyla `exit=2` selector timeout | repair |
| `smoke_onboarding_b2.js` | dış http sunucusu gerekiyor (`SMOKE_URL` env) + eski akış | Bayat — B2 akışı değişti | sunucusuz `exit=2` · sunucuyla `exit=124` (asıldı) | repair |
| `gate1_onboarding_b2.js` | `index.html`'den kod çıkarma **işaretleri bulunamıyor** | Bayat — `const I18N = {` … marker'ları kaydı | `exit=1` EXTRACT FAIL · 34ms | repair |

> ⚠️ **İsim çakışması uyarısı:** `gate1_onboarding_b2.js`'deki "GATE 1", Codex'in **Gate 1**'iyle ilgisizdir. Dosya başlığı: *"GATE 1 · Onboarding B2 — SAF mantık fixture'ı (non-shipping)"*. Bu ad ileride karışıklık yaratır; yeniden adlandırma önerilir (§6, Parti D).

### 2.3 Aktif geliştirici teşhisi — test DEĞİL (3) · öneri: **retain, kapıdan ayrı tut**

| Dosya | Amaç | Ölçülen | Not |
|---|---|---|---|
| `deadcode_scan.js` | kullanılmayan JS/CSS **adayı** çıkarır | `exit=0` · 521ms | Kendi çıktısı: *"Bunlar ADAY. Her biri elle doğrulanacak… Şüphede TUT."* → geçit olamaz |
| `deadcode_css3.js` | CSS ölü aday taraması, `/tmp`'ye yazar | `exit=0` · 188ms | Yan etkisi repo dışında |
| `harness.js` | **Test koşucusu DEĞİL** — FAMILIES modeli için rapor üreteci; `karsilastirma-raporu.md` yazar | `exit=0` · "başarısız kontrol: 0" | Adı yanıltıcı; **hiçbir dosya `require` etmiyor** (ölçüldü) |

### 2.4 Tarihsel taşıma/düzenleme aracı — test DEĞİL (6) · öneri: **archive**

Sözleşmenin özel şartı: *"Python edit/extract/inject scripts must not be counted as tests merely because they reference the stale HTML path."* — Uygulandı.

| Dosya | Ne yapar | Girdi | Girdi var mı | Ölçülen |
|---|---|---|---|---|
| `edit_familystrip.py` | eski HTML'e aile şeridi enjekte eder | `/home/claude/atlas_drive_may30.html`, `/home/claude/faz2/families.js` | ❌ ikisi de yok | `exit=1` · 23ms |
| `edit_onboarding.py` | eski HTML'de onboarding düzenler | aynı bayat HTML | ❌ | `exit=1` · 14ms |
| `edit_srs.py` | eski HTML'de SRS düzenler | aynı bayat HTML | ❌ | `exit=1` · 14ms |
| `extract_srs.py` | eski HTML'den SRS kodunu çıkarır → `srs_selector.extracted.js` | aynı bayat HTML | ❌ | `exit=1` · 20ms |
| `inject_storage.py` | `storage.js`'i eski HTML'e enjekte eder | aynı bayat HTML | ❌ | `exit=1` · 21ms |
| **`qa_kyuu_round.js`** | **九 kaydına yazar (apply betiği)** | `../index.html` | ✅ | `exit=0` — **ve index.html'i DEĞİŞTİRDİ** (§0.2) |

> `extract_srs.py` ve `inject_storage.py`, bugün **yeşil** olan `srs_check.js` / `storage_check.js`'in girdilerini (`srs_selector.extracted.js`, `storage.js`) üretmişti. Yani araçlar ölü ama **ürünleri canlı**. Arşivlenirken bu bağ not düşülmeli — aksi hâlde ileride "bu dosyalar nereden geldi?" sorusu cevapsız kalır.

### 2.5 Eskimiş tarihsel eser (9) · öneri: **archive**

Hepsi var olmayan `file:///home/claude/atlas_drive_may30.html` hedefini açmaya çalışıp **ERR_FILE_NOT_FOUND** ile düşüyor.

| Dosya | Tür | Ek eksik temel | Ölçülen |
|---|---|---|---|
| `smoke_onboarding.8step-OBSOLETE.txt` | **çalıştırılamaz** (.txt) | — | **koşulmadı** — adında `OBSOLETE`, uzantısı `.txt` |
| `smoke_onboarding_freshuser.8step-OBSOLETE.txt` | **çalıştırılamaz** (.txt) | — | **koşulmadı** — aynı |
| `regress_check.js` | **öncesi/sonrası karşılaştırıcı** | `atlas_pre_familystrip.html` ❌ | `exit=2` · 1284ms |
| `smoke_familystrip.js` | karşılaştırmalı | `atlas_consumer1.html` ❌ | `exit=2` · 426ms |
| `smoke_audio.js` | ses akışı | — | `exit=2` · 586ms |
| `smoke_audio_6b.js` | ses 6b | — | `exit=2` · 648ms |
| `smoke_audio_games.js` | oyunlarda ses | — | `exit=2` · 439ms |
| `smoke_audio_migration.js` | ses taşıma | — | `exit=2` · 435ms |
| `smoke_pathnorm.js` | yol normalizasyonu | — | `exit=2` · 512ms |

> Sözleşmenin özel şartı: *"Pre/post regression comparators must identify whether their historical baseline still exists."*
> **Ölçüldü — üç temel dosyanın hiçbiri hiçbir yerde yok:**
> | Dosya | Repoda | Diskte | **Git geçmişinin tamamında** |
> |---|---|---|---|
> | `atlas_pre_familystrip.html` | 0 | ❌ | **0 commit** |
> | `atlas_consumer1.html` | 0 | ❌ | **0 commit** |
> | `atlas_drive_may30.html` | 0 | ❌ | **0 commit** |
>
> Hiçbiri hiç commit edilmemiş. → `regress_check.js` ve `smoke_familystrip.js` **yeniden üretilemez**; yayın kapısı olarak **önerilemezler**.

### 2.6 Yerini almış / kopya (2) · öneri: **archive**

| Eskimiş | Yerini alan | Kanıt |
|---|---|---|
| `smoke_srs.js` (bayat HTML, `exit=2`) | **`srs_check.js`** (`exit=0`, 0 başarısız) | İkisi de aynı SRS mantığını sınıyor; `srs_check.js` `srs_selector.extracted.js`'i doğrudan kullanıyor, tarayıcıya ve eski HTML'e ihtiyaç duymuyor |
| `smoke_storage.js` (bayat HTML, `exit=2`) | **`storage_check.js`** (`exit=0`, 0 başarısız) | Aynı ilişki; `storage.js` üzerinden saf koşuyor |

### 2.7 Bozuk / şu an sınıflandırılamaz (1)

| Dosya | Durum | Ölçülen | Öneri |
|---|---|---|---|
| `smoke_home_rec.js` | Kendi http sunucusunu `:8907`'de açıyor, sayfaya gidiyor, **sonra asılıyor** | `exit=124` (240s zaman aşımı) · son log: `navigated to http://127.0.0.1:8907/index.html` sonrası `page.reload: Target page… closed` | **triyaj gerekli** — asılma sebebi ölçülmedi; onarım mı arşiv mi kararı Codex'e |

### 2.8 Dağılım özeti

| Sınıf | Adet | Bunların kaçı bayat-yollu |
|---|---:|---:|
| Aktif yayın-kapısı testi (yeşil) | **11** | 0 |
| Aktif yayın-kapısı testi (onarım gerekli) | **5** | 0 |
| Aktif geliştirici teşhisi | **3** | 0 |
| Tarihsel taşıma/düzenleme aracı | **6** | 5 |
| Eskimiş tarihsel eser | **9** | 9 |
| Yerini almış / kopya | **2** | 2 |
| Bozuk / sınıflandırılamaz | **1** | 0 |
| **TOPLAM** | **37** | **16** ✅ |

---

## 3. Ham komutlar ve çıkış kodları

Tümü `cd kanji-atlas` altından, `timeout` ile zaman kutulanarak koşuldu.

```
node _faz2/smoke_content_scaffold.js        exit=0     308ms  401/401
node _faz2/smoke_legacy_derived.js          exit=0      42ms  83/83
node _faz2/smoke_durable_backend.js         exit=0      88ms  9/9
node _faz2/smoke_game_roles.js              exit=0      83ms  62/62
node _faz2/storage_check.js                 exit=0      69ms  0 başarısız
node _faz2/srs_check.js                     exit=0     101ms  0 başarısız
node _faz2/graph_check.js                   exit=0      38ms  0 başarısız
node _faz2/list_progress_check.js           exit=0      37ms  0 başarısız
node _faz2/manifest_check.js                exit=1      35ms  ❌ 4 başarısız
node _faz2/manifest_build_check.js          exit=1      58ms  ❌ 1 başarısız
node _faz2/deadcode_scan.js                 exit=0     521ms
node _faz2/deadcode_css3.js                 exit=0     188ms
node _faz2/harness.js                       exit=0      36ms  başarısız kontrol: 0
node _faz2/qa_kyuu_round.js                 exit=0      73ms  ⚠️ index.html'e YAZDI → geri alındı
node _faz2/gate1_onboarding_b2.js           exit=1      34ms  EXTRACT FAIL (markers not found)

node _faz2/regress_check.js                 exit=2    1284ms  ERR_FILE_NOT_FOUND
node _faz2/smoke_audio.js                   exit=2     586ms  ERR_FILE_NOT_FOUND
node _faz2/smoke_audio_6b.js                exit=2     648ms  ERR_FILE_NOT_FOUND
node _faz2/smoke_audio_games.js             exit=2     439ms  ERR_FILE_NOT_FOUND
node _faz2/smoke_audio_migration.js         exit=2     435ms  ERR_FILE_NOT_FOUND
node _faz2/smoke_familystrip.js             exit=2     426ms  ERR_FILE_NOT_FOUND
node _faz2/smoke_pathnorm.js                exit=2     512ms  ERR_FILE_NOT_FOUND
node _faz2/smoke_srs.js                     exit=2     449ms  ERR_FILE_NOT_FOUND
node _faz2/smoke_storage.js                 exit=2     497ms  ERR_FILE_NOT_FOUND
python3 _faz2/edit_familystrip.py           exit=1      23ms  (girdi yok)
python3 _faz2/edit_onboarding.py            exit=1      14ms  (girdi yok)
python3 _faz2/edit_srs.py                   exit=1      14ms  (girdi yok)
python3 _faz2/extract_srs.py                exit=1      20ms  (girdi yok)
python3 _faz2/inject_storage.py             exit=1      21ms  (girdi yok)
  smoke_onboarding.8step-OBSOLETE.txt            KOŞULMADI (.txt, çalıştırılabilir değil)
  smoke_onboarding_freshuser.8step-OBSOLETE.txt  KOŞULMADI (.txt, çalıştırılabilir değil)

node _faz2/smoke_sources.js                 exit=0   13852ms  0 başarısız
node _faz2/smoke_backup.js                  exit=0   30561ms
node _faz2/smoke_recognition.js             exit=0  191549ms  pass=24 fail=0
node _faz2/smoke_home_rec.js                exit=124 240085ms ASILDI
node _faz2/smoke_onboarding_b2.js           exit=2     434ms  ERR_CONNECTION_REFUSED (sunucusuz)
node _faz2/smoke_onboarding_b2.js           exit=124 105025ms (dış sunucu :8899 ayaktayken → asıldı)
node _faz2/gate3_container_verify.js        exit=2     429ms  ERR_CONNECTION_REFUSED (sunucusuz)
node _faz2/gate3_container_verify.js        exit=2   ~35000ms (dış sunucu ayakta) selector timeout
```

**Araç sürümleri:** node `v22.22.2` · python3 `3.11.15` · playwright `1.56.0` · chromium `141.0.7390.37` (`/opt/pw-browsers/chromium`) · Ubuntu 24.04.4 / x86_64.

---

## 4. İki kırmızı manifest kontrolünün bağımsız analizi

> Sözleşme: *"Do not change expected counts merely to make a red test green."* — Değiştirmedim; yalnız sınıflandırdım.

### 4.1 `manifest_check.js` — 4 başarısız, **dördü de bayat beklenti**

```
✓ 1) tüm id benzersiz — 610 kayıt
✓ 2) her kayıt şemaya uygun
✓ 3) recorded→dosya var, missing/tts→dosya yok
✗ 4) kaynak=flick ⇔ durum=recorded — kana_hira_a,kana_hira_i,kana_hira_u
✓ 5) tüm flick kayıtları GERÇEK Flick dosyasına işaret ediyor
✓ 6) ses_dosyası ortak klasör yapısında
✗ 7a) kategori sayıları (92/91/78/74) — {"kana":92,"kanji":91,"word":353,"sentence":74}
✗ 7b) durum sayıları (214 recorded / 47 missing / 74 tts) — 610/0/0
✓ 7c) kategori+metin duplicate SIFIR
✗ 8) tüm cümleler durum=tts — 74 cümle
✓ 9) flick-eşleşen kanjiler 'dogrulanmali' bayraklı — 0 bayrak
✓ 10) _meta pedagojik hüküm mevcut
```

| # | İddia | Gerçek | Hüküm |
|---|---|---|---|
| **4** | `kaynak=flick ⇔ durum=recorded` çift yönlü | Korpus **flick→yeni** göçünü tamamladı; artık `kaynak=flick` kaydı yok, ama `recorded` kayıtlar var → çift yönlü koşul mantıken düşüyor | **Bayat beklenti.** Kontrolün kendisi geçersiz; tek yönlü (`flick ⇒ recorded`) olmalıydı |
| **7a** | word = 78 | word = **353** | **Bayat beklenti.** 78 = `DATA.words` çekirdek sayısı; manifest ayrıca örnek kelime yüzeylerini de taşıyor. **kana 92 · kanji 91 · sentence 74 birebir tutuyor** → sayaç mantığı sağlam, yalnız `word` beklentisi eski. Ayrıca ✓7c "duplicate SIFIR" geçiyor → 353 şişme değil |
| **7b** | 214 recorded / 47 missing / 74 tts | **610 / 0 / 0** | **Bayat beklenti — ve aslında bir BAŞARI göstergesi.** Değişimin yönü tamamen iyileşme: `missing` ve `tts` sıfırlandı |
| **8** | tüm cümleler `tts` | 74 cümle artık `recorded` | **Bayat beklenti.** Aynı kilometre taşının parçası: cümleler seslendirildi |

**Sonuç: hiçbiri ürün hatası değil.** Ürün doğruluğunu koruyan kontroller (#3 recorded→dosya var, #5, #6, #7c tekillik, #10) **geçiyor**. Dördü de "2026-07 öncesi ses envanterinin dondurulmuş fotoğrafı".

⚠️ **Ama bu, "beklentileri güncelle geç" demek değil.** #7a/#7b/#8 bugün **hiçbir şeyi korumuyor** — sabit sayılar her içerik eklemede kırılır. Onarım, sayıyı güncellemek değil, **değişmezi (invariant) yeniden tanımlamak** olmalı (§6, Parti A).

### 4.2 `manifest_build_check.js` — 1 başarısız, **bayat sayı**

```
✓ gömülü blok anchor'larla mevcut
✓ Gate 7) gömülü AUDIO_MANIFEST === audio-manifest.json (semantik)
✓ Gate 10) runtime manifest fetch YOK
✓ Gate 10b) 'audio-manifest.json' fetch argümanı değil
✓ AUDIO_MANIFEST tüketiliyor (buildAudioIndex ile)
✗ entries 335 kayıt          ← beklenen 335, gerçek 610
✓ _meta.pedagojik_hukum gömülü
```

**Kritik gözlem: asıl koruma olan "gömülü === JSON (semantik)" kapısı GEÇİYOR.** Yani bu dosyanın var olma sebebi (gömülü manifest ile kanonik JSON'un ayrışmasını yakalamak) bugün de çalışıyor. Tek başarısız kalem, hiçbir bütünlük garantisi vermeyen sabit bir sayı.

**Hüküm: bayat beklenti, ürün hatası değil.** Onarım = sabit sayıyı **kaldırmak** (semantik eşitlik zaten kapsıyor) veya "≥ önceki sayı" gibi tek yönlü bir korumaya çevirmek.

---

## 5. Önerilen yayın-kapısı paketi (retention)

### 5.1 Çekirdek kapı — hızlı, deterministik, tarayıcısız (8 dosya, ~800ms toplam)
`smoke_content_scaffold` · `smoke_legacy_derived` · `smoke_durable_backend` · `smoke_game_roles` · `storage_check` · `srs_check` · `graph_check` · `list_progress_check`

Bu sekizi **her commit'te** koşabilir. Gate 1 turunda da bu kümenin bir alt kümesi kullanılmıştı; ölçülen kararlılık yüksek.

### 5.2 Genişletilmiş kapı — tarayıcılı (3 dosya, ~4 dk)
`smoke_sources` (14s) · `smoke_backup` (31s) · `smoke_recognition` (**191s**)

Yalnız birleştirme öncesi. `smoke_recognition` 3 dakikadan uzun — bölünmesi veya paralelleştirilmesi ayrı bir iş.

### 5.3 Onarım sonrası kapıya katılacaklar (5)
`manifest_check` · `manifest_build_check` · `gate3_container_verify` · `smoke_onboarding_b2` · `gate1_onboarding_b2`

### 5.4 Kapının DIŞINDA kalacaklar (3 teşhis)
`deadcode_scan` · `deadcode_css3` · `harness` — çıktıları **öneri**, geçit değil.

---

## 6. Önerilen tek giriş noktası ve uygulama partileri

> Sözleşme uyarınca **hiçbiri uygulanmadı** — bunlar Codex onayına sunulan tekliflerdir.

### 6.1 Teklif: `kanji-atlas/_faz2/run-gates.mjs` (yeni dosya, tek giriş noktası)

Tasarım ilkeleri (ölçülen sorunlara birebir cevap):

| Sorun (ölçüldü) | Çözüm |
|---|---|
| Mutlak `/home/claude/...` yolları — konteyner dışında kırılır | Hedef `--app` parametresi; varsayılan `path.resolve(__dirname,'..','index.html')` (göreli) |
| Bazı testler dış sunucu bekliyor (`:8899`), bazıları kendi sunucusunu açıyor (`:8901`, `:8907`) | Koşucu **tek** sunucu açar, portu **0 = boş port** ile alır, `SMOKE_URL` olarak enjekte eder → port çakışması yapısal olarak imkânsız |
| Node/Playwright/Chromium sürümü sabitlenmemiş | `engines` + `package.json`'da `@playwright/test` pinlenir; koşucu başlangıçta ölçüp **uyuşmazsa durur**; chromium yolu `PLAYWRIGHT_BROWSERS_PATH` ile |
| `qa_kyuu_round.js` gibi mutasyon yapan betikler yanlışlıkla koşabilir | Koşucu **beyaz liste** ile çalışır (dosya adı deseni değil, açık liste); ayrıca koşum öncesi/sonrası `git status` alır, kirlenirse **kırmızı** verir |
| Yavaş testler hızlıları bekletiyor | `--tier=core\|extended` |

Çıktı: makine okunur `gates-report.json` (dosya · exit · süre · özet) + insan okunur özet.

### 6.2 Partiler — her biri bağımsız Codex incelemesine uygun

| Parti | Kapsam | Kabul ölçütü | Geri dönüş |
|---|---|---|---|
| **A · Kırmızı beklentileri düzelt** | `manifest_check` #4/#7a/#7b/#8 ve `manifest_build_check` sabit sayısı — **sayıyı güncelleyerek değil, değişmezi yeniden tanımlayarak**: #4 tek yönlü (`flick ⇒ recorded`), #7a/#7b/#8 sabit sayı yerine "gerileme yok" (recorded azalmaz, missing/tts artmaz), build-check'te sabit `entries` sayısı kaldırılır (semantik eşitlik zaten koruyor) | İki dosya `exit=0`; **kasıtlı bir bozma denemesi hâlâ kırmızı veriyor** (koruma gücü kanıtı); DATA/manifest/ses dosyası değişmiyor | Tek commit revert |
| **B · Tek giriş noktası** | `run-gates.mjs` + `package.json` sürüm pinleri. **Mevcut testlerin içeriğine dokunulmaz**, yalnız çağrılırlar | `--tier=core` 8/8 yeşil, <5s; `--tier=extended` 11/11 yeşil; çalışma ağacı koşum sonrası temiz | Yeni dosyalar; silinince eski durum |
| **C · Mutlak yolları parametreye çevir** | 8 dosyadaki `/home/claude/...` → `--app` / `__dirname` göreli. Assertion'lara **dokunulmaz** | Her dosya hem eski hem yeni konumdan aynı sonucu veriyor; repo başka bir dizine kopyalanınca da yeşil | Dosya başına revert |
| **D · Arşiv + adlandırma** | 17 dosya (9 eskimiş + 6 tarihsel araç + 2 yerini almış) → `_faz2/_archive/` **taşınır, silinmez**; `qa_kyuu_round.js` → `apply_kyuu_qa_round.js`; `gate1_onboarding_b2.js` → `onboarding_b2_logic_fixture.js`; `harness.js` → `families_report.js`. Her taşımaya kısa `_archive/README.md` gerekçesi | Aktif kapı paketi etkilenmiyor; `git log --follow` geçmişi koruyor; `_faz2` kök dizininde yalnız canlı dosyalar kalıyor | `git mv` geri alınır |
| **E · `smoke_home_rec` triyajı** | Asılma sebebi ölçülür, sonra onarım veya arşiv kararı | Kök sebep yazılı; karar Codex onayıyla | Karar öncesi kod değişmez |

**Önerilen sıra:** A → B → C → D → E. A ve B birbirinden bağımsız; C, B'den sonra daha ucuz. D en son, çünkü taşıma diff'i büyük ve incelemeyi zorlaştırır.

---

## 7. Riskler, bilinmezler ve karar gerektirenler

| # | Konu | Tür | Not |
|---|---|---|---|
| 1 | **`qa_kyuu_round.js` uygulamaya yazıyor** | 🔴 Risk | Adı test çağrıştırıyor. Bir insan veya CI onu koşarsa `index.html` sessizce değişir. **Parti D'den önce bile yeniden adlandırılması düşünülebilir** — Codex kararı |
| 2 | `harness.js` izlenen bir dosyayı (`karsilastirma-raporu.md`) yeniden yazıyor | 🟡 Risk | Bu turda içerik aynı çıktı, fark oluşmadı; ama veri değişince koşum ağacı kirletir |
| 3 | `smoke_home_rec` asılma sebebi | ❓ Bilinmez | Ölçülmedi (sözleşme onarımı yasakladı) |
| 4 | `word` kategorisi 353 doğru mu? | ❓ Bilinmez | Duplicate kontrolü (#7c) geçiyor ve büyüme örnek kelimelerle açıklanıyor; ama 353'ün **beklenen** değer olduğu bağımsız doğrulanmadı — Parti A'da netleşmeli |
| 5 | Tarayıcı testleri font CDN'siz koşuldu | 🟡 Risk | Metin genişliğine duyarlı bir assertion varsa gerçek cihazda farklı davranabilir |
| 6 | `smoke_recognition` 191s | 🟡 Risk | Kapı paketine girerse birleştirme süresini tek başına belirler |
| 7 | Arşiv mi silme mi? | ⚖️ **Karar** | Bu rapor **arşiv** öneriyor (proje ilkesi: "çalışanı silme"). 17 dosyanın silinmesi ayrı bir karar; bu turda **hiçbiri silinmedi** |
| 8 | 3 temel HTML dosyası hiç commit edilmemiş | ⚖️ **Karar** | `regress_check` ve `smoke_familystrip` yeniden üretilemez. Karşılaştırmalı regresyon istenirse **yeni bir temel** oluşturulmalı — ayrı iş |
| 9 | `gate1_onboarding_b2.js` isim çakışması | ⚖️ **Karar** | Codex'in Gate numaralandırmasıyla karışıyor |

---

## 8. Çalışma ağacı durumu ve kanıt

```
Başlangıç: a5892f566117b7e52fcb13859ed07672cb71c7f9
Dal      : audit/test-inventory-2026-08-06

Koşum öncesi: git ls-files | sha256sum → 1951 dosya
Koşum sonrası: kanji-atlas/index.html DEĞİŞTİ (qa_kyuu_round.js yüzünden) → §0.2
Geri alma   : git checkout -- kanji-atlas/index.html
Son durum   : ✅ 1951 izlenen dosyanın TAMAMI sha256 birebir aynı
git status --short → (yalnız bu rapor: ?? .../2026-08-06-TEST-INVENTORY-AUDIT.md)
```

**Kabul ölçütleri karşılığı:**

| Sözleşme ölçütü | Durum |
|---|---|
| 16 bayat-yol referansının tamamı hesaba katıldı, **16'sı da test olarak etiketlenmedi** | ✅ 5 araç + 2 OBSOLETE + 7 eskimiş + 2 yerini almış |
| Diğer tüm `_faz2` smoke/check adayları hesaba katıldı | ✅ 37/37 sınıflandırıldı |
| Uygulama/test/araç/manifest/ses/üretilmiş veri dosyası değişmedi | ✅ sha256 ile kanıtlandı (§8) |
| Yalnız istenen rapor eklendi | ✅ tek dosya |
| Merge / `main`'e push / deploy / Gate 3 uygulaması yok | ✅ hiçbiri yapılmadı |
| `OBSOLETE` dosyalar aktif test sayılmadı | ✅ koşulmadı bile |
| Python betikleri test sayılmadı | ✅ tarihsel araç |
| Öncesi/sonrası karşılaştırıcıların temeli sorgulandı | ✅ üçü de hiç commit edilmemiş |
| Kırmızı testi yeşile çevirmek için beklenti değiştirilmedi | ✅ hiçbir dosya düzenlenmedi |
| Bağımlılık kurulmadı, ses üretilmedi | ✅ |

---

**Gate 3 uygulaması başlatılmadı. Codex'in envanteri incelemesi bekleniyor.**
