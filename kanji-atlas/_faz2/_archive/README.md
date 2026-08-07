# `_faz2/_archive/` — TARİHSEL DOSYA ARŞİVİ

> **Bu dosyaların hiçbiri SİLİNMEDİ ve hiçbiri YAYIN KAPISI DEĞİLDİR.**
> Test Repair Batch D (2026-08-07) ile `_faz2/` kökünden buraya **`git mv` ile taşındılar**.
> İçerikleri **bayt olarak korunmuştur** — içlerindeki bayat mutlak yollar bilerek onarılmadı.

## Neden arşiv?

`_faz2/` kökünde, adı `smoke_*` / `*_check` olduğu için **test sanılan** ama artık çalışmayan
dosyalar birikmişti. Bu, iki somut riske yol açıyordu:

1. Bir insan ya da otomasyon bunları "yayın kapısı" sanıp koşabilir;
2. "Testler geçiyor" ifadesi ölçülemez hâle gelir — 2026-08-06 envanter denetiminin ana bulgusu buydu.

Arşiv, **canlı yayın kapıları · geliştirici araçları · tarihsel eserler** ayrımını dizin
düzeyinde görünür kılar. Canlı kapılar açık beyaz listelerle çalışır
(`run-core-gates.mjs`, `run-browser-gates.mjs`); **bu klasörden hiçbir dosya çağrılmaz.**

## Eski → yeni yol eşlemesi (16 dosya)

### `legacy-tools/` — 5 tarihsel taşıma/düzenleme aracı

Bunlar **test değildir**; bir kereye mahsus kod taşıma/enjeksiyon işleri yapmışlardır.
Envanter sözleşmesinin özel şartı gereği yalnız bayat HTML yoluna baktıkları için test sayılmadılar.

| Eski yol | Yeni yol |
|---|---|
| `_faz2/edit_familystrip.py` | `_faz2/_archive/legacy-tools/edit_familystrip.py` |
| `_faz2/edit_onboarding.py` | `_faz2/_archive/legacy-tools/edit_onboarding.py` |
| `_faz2/edit_srs.py` | `_faz2/_archive/legacy-tools/edit_srs.py` |
| `_faz2/extract_srs.py` | `_faz2/_archive/legacy-tools/extract_srs.py` |
| `_faz2/inject_storage.py` | `_faz2/_archive/legacy-tools/inject_storage.py` |

### `obsolete-smokes/` — 9 yeniden üretilemeyen eser

| Eski yol | Yeni yol |
|---|---|
| `_faz2/smoke_onboarding.8step-OBSOLETE.txt` | `_faz2/_archive/obsolete-smokes/smoke_onboarding.8step-OBSOLETE.txt` |
| `_faz2/smoke_onboarding_freshuser.8step-OBSOLETE.txt` | `_faz2/_archive/obsolete-smokes/smoke_onboarding_freshuser.8step-OBSOLETE.txt` |
| `_faz2/regress_check.js` | `_faz2/_archive/obsolete-smokes/regress_check.js` |
| `_faz2/smoke_familystrip.js` | `_faz2/_archive/obsolete-smokes/smoke_familystrip.js` |
| `_faz2/smoke_audio.js` | `_faz2/_archive/obsolete-smokes/smoke_audio.js` |
| `_faz2/smoke_audio_6b.js` | `_faz2/_archive/obsolete-smokes/smoke_audio_6b.js` |
| `_faz2/smoke_audio_games.js` | `_faz2/_archive/obsolete-smokes/smoke_audio_games.js` |
| `_faz2/smoke_audio_migration.js` | `_faz2/_archive/obsolete-smokes/smoke_audio_migration.js` |
| `_faz2/smoke_pathnorm.js` | `_faz2/_archive/obsolete-smokes/smoke_pathnorm.js` |

### `superseded-smokes/` — 2 yerini yenisi almış test

| Eski yol | Yeni yol | Yerini alan (CANLI) |
|---|---|---|
| `_faz2/smoke_srs.js` | `_faz2/_archive/superseded-smokes/smoke_srs.js` | **`_faz2/srs_check.js`** |
| `_faz2/smoke_storage.js` | `_faz2/_archive/superseded-smokes/smoke_storage.js` | **`_faz2/storage_check.js`** |

İkisi de aynı mantığı sınıyordu; canlı sürümler tarayıcıya ve bayat HTML'e ihtiyaç duymadan
saf Node ile koşuyor ve çekirdek kapı paketinde yer alıyor.

## ⚠️ Üç temel HTML dosyası hiçbir zaman commit edilmedi

`obsolete-smokes/` ve bazı `legacy-tools/` dosyaları şu üç dosyaya bağlıdır:

| Dosya | Repoda | Diskte | **Git geçmişinin tamamında** |
|---|---|---|---|
| `atlas_drive_may30.html` | yok | yok | **0 commit** |
| `atlas_pre_familystrip.html` | yok | yok | **0 commit** |
| `atlas_consumer1.html` | yok | yok | **0 commit** |

Ölçüldü (`git log --all -- '*<dosya>'` → boş). Bu yüzden bu dosyalar **yeniden üretilemez** ve
arşivde **çalışır test olarak sunulamazlar**. Özellikle `regress_check.js` ve
`smoke_familystrip.js` öncesi/sonrası karşılaştırıcıdır; temelleri olmadan bir yayın kapısı
olarak önerilemezler. Karşılaştırmalı regresyon istenirse **yeni bir temel** oluşturulmalıdır —
bu ayrı bir iştir.

## Canlı dosyalarla tarihsel bağlar (silmeden önce okunmalı)

Bu araçlar ölüdür, ama **ürünleri canlıdır**. Arşivi bir gün temizlemek isteyen biri bu bağı bilmeli:

| Arşivdeki araç | Ürettiği CANLI dosya | O dosyayı kullanan CANLI test |
|---|---|---|
| `legacy-tools/extract_srs.py` | `_faz2/srs_selector.extracted.js` | **`_faz2/srs_check.js`** (çekirdek kapı) |
| `legacy-tools/inject_storage.py` | `_faz2/storage.js` | **`_faz2/storage_check.js`** (çekirdek kapı) |

Yani `srs_check.js` ve `storage_check.js` bugün yeşil koşuyor; girdilerini bir zamanlar bu iki
arşiv aracı üretmişti. Araçlar arşivde olsa da bu köken bilgisi kaybolmamalıdır.

## Geri alma

Tek bir dosyayı canlı köke geri almak için:

```bash
git mv kanji-atlas/_faz2/_archive/<altklasor>/<dosya> kanji-atlas/_faz2/<dosya>
```

Batch D'nin tamamını geri almak için:

```bash
git revert <arşiv commit'i>          # taşımalar + bu README
git revert <adlandırma commit'i>     # üç canlı dosyanın adı
```

veya dalı hiç birleştirmemek. Taşımalar `git mv` ile yapıldığı için `git log --follow` ve
`git diff -M` geçmişi korur; hiçbir dosya silinmedi.

## Kapsam notu

Batch D **yalnız bir düzenleme partisidir**. Ürün davranışı, test assertion'ları, manifest, ses,
veri, onboarding ve erişilebilirlik **değişmedi**. Arşivlenen dosyalar modernize edilmedi,
onarılmadı, çalışır hâle getirilmedi.
