# Kanji Content FIX Fazı — KAPANIŞ (B/C/D)

> İçerik düzeltme fazı tamamlandı. Yanlış öğretme riski (yanlış bileşen rolleri, folk etimoloji, çelişen okumalar, katman çökmesi) veriden kalktı ve smoke testleriyle kilitlendi. **Kod tarafı bitti; kalan Authoring (yeni metin yazımı).**
> Branch `onboarding-b2-gate3` · Tarih 2026-07-24 · Plan: `KANJI-FIX-FAZI-UYGULAMA-PLANI-v2.md`.

## Commit zinciri (hepsi push'landı, SHA doğrulandı)
| Tag/Commit | İş | SHA |
|---|---|---|
| pre-fix-content | güvenlik tag'i | 2efd279 |
| A1 | içerik v2 uyumluluk iskeleti (davranış nötr) | 6d6fe2a |
| A2 | oyun rol-izin politikası (motor; legacy fail-safe) | 7b63d0c |
| B | 10 P0 (形声 rol + 大/王 象形) | 747d04e |
| C | P1 (国/玉 yapı + okuma kararları) | 46229fb |
| D1 | indicative (天夫本) + folk (季東) + taught (人ニン/大タイ) | fdd5df2 |
| D2 | katman çökmesi mnemonic + jukujikun etiketleri | 3cc1c34 |

## Mimari (kilitli)
- İçerik statik dataset, **`CONTENT_VERSION`** (şu an c2) ile versiyonlu; kullanıcı state `SCHEMA_VERSION=2` DEĞİŞMEDİ. `id`/`character` hiç değişmedi → kullanıcı ilerlemesi korundu.
- `structure.components` (rol dahil) CANONICAL; legacy `components`/`component_meanings`/`onyomi`/`kunyomi` ONDAN türetilir (generator + `smoke_legacy_derived` enforce). `data_chars.json` üretim hattına bağlı (`generate_data_chars.js`, elle düzenlenmez).
- Oyun rol-matrisi tek merkezde (`GAME_ROLE_POLICY`); matris yalnız v2 role verisi olan kayıtlara uygulanır (legacy fail-safe).

## Ne düzeldi (özet)
- **10 P0** (形声 fonetik rol oyuna yayılıyordu): 時語校晴話読聞何 fonetik işaretlendi → comp-meaning/atolye'den çıktı, structure/comp-select'te kaldı. 大/王 象形 (bileşen yok) → tüm bileşen oyunlarından çıktı.
- **P1**: 国 (囗 doğru gloss), 玉 (象形), 7 çelişen okuma taught'a (月ガツ 九ク 四よつ 後うしろ 生うまれる 話はなし 何なん), 足た(りる)/男ナン deferred, 人ニン/大タイ taught.
- **P2**: 天夫本 gösterge çizgisi (indicative, "bir" değil), 季東 folk köken gizlendi, 32 katman çökmesi (27 not_required + 5 pending_review), 7 jukujikun 付表 etiketi.

## Kalan: AUTHORING fazı (ayrı — "yeni içerik yaz")
- **Pending köken metinleri** (qaStatus=pending, şu an gizli): 時 語 校 晴 話 読 聞 何 王 玉 季 東 — gerçek etimoloji + eski-form/ses-bileşeni anlatımı yazılacak (sade, N5, rozet).
- **44 boş köken** yazımı.
- **Jukujikun UI rozeti**: örnek kelimede düzensiz-okuma göstergesi (readings.irregularWords var, render eklenecek).
- **人-ailesi** (game FAMILIES hito=[yasumu] tek üye): 亻'li kanjilerle (休/何) doğru kurulacak.
- **ATLAS_FAMILIES "İnsan ailesi"** hâlâ 大←人 içeriyor → Faz-3 kanonik takasta hizalanacak.
- Kabul kriteri + commit/tag Authoring için AYRI.

## Doğrulama altyapısı (kalıcı)
`smoke_content_scaffold` (sync/hash/round-trip/accessor) · `smoke_game_roles` (rol matrisi + legacy regression + pool delta) · `smoke_legacy_derived` (canonical→legacy + readings + irregular sızma) · + mevcut 10+ smoke. Her commit: node --check + generator --check + full regression + SHA doğrulama.
