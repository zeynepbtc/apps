# Onboarding Adım 7 — GATE 0 · GATE 1 · GATE 2 durum

> **Durum:** GATE 0 KAPALI · GATE 1 GEÇTİ · **GATE 2 GEÇTİ (47/47 tarayıcı smoke)** · **GATE 3 (staging) BEKLİYOR — henüz açılmadı.**
> Dal: `onboarding-b2` (main `ae742f6`'dan). Remote yedek `origin/onboarding-b2` **senkron** (local==remote==`f5ab9de`); merge/PR/staging/tag/deploy YOK.

## Commit'ler
| Commit | Tür | İçerik |
|---|---|---|
| 8395508 | production runtime (feature) | B2 onboarding |
| e1c7330 | production runtime (corrective) | marker KANONİK |
| **f8f85bf** | production runtime (corrective-2) | ölü `hasMeaningfulLearning` kaldırıldı |
| f166b16 · dd93e5d · f5ab9de | non-shipping test | fixture + B2 smoke + obsolete renames |

**GATE 3 öncesi:** 3 runtime commit (8395508 + e1c7330 + f8f85bf) **squash** → tek production runtime commit.
**Rollback-compat:** feature HEAD~1 index.html == main byte-identical.

## `hasMeaningfulLearning` — SON DURUM: KALDIRILDI
Referans taraması: Home şeridi artık yalnız kalıcı `firstMeaningfulActionAt` (`shouldShowInitialRec`) kullanıyor; `hasMeaningfulLearning` (correct>0) **hiçbir runtime kararını etkilemiyordu** → ölü yardımcı kaldırıldı (yorumlanmış ölü kod yok; export'lardan da çıkarıldı). Kanonik kaynak yalnız marker.

## GATE 2 — B2 tarayıcı smoke (gerçek runtime/state/rota/reload/migration)
`_faz2/smoke_onboarding_b2.js` (Playwright, http.server) → **47 assertion · 0 fail · 0 pageerror.**
Kapsam (senaryo→assertion): fresh · 4 bant rota (kana-a/kana-home/kanji-ki/atlas-map) · 3 erken kaçış=skipped+temiz+completedAt null · final ikincil=completed · 4 geri dalı · reload-resume · competency-değiştir dal yeniden · introShown ama tam ders değil · marker yazma+şerit boşluksuz gizlenme · yanlış/gezinme marker yok · SRS reset marker korur · IMPORT correct>0 marker'sız şerit gösterilir · restart name/marker/ilerleme korur + şerit dönmez · migration (eski completed/incomplete) · invariant güvenli düşüş · t() fallback · lang="ja" + H1 focus · 320px yatay taşma yok.
**Kanıt:** 2 ekran görüntüsü (competency 4-eşit-kart, final band2 木) + tüm assertion'lar `window.JYA.state`/rota üzerinden (DOM-metin değil).

## Atlanan/başka kapıda doğrulanan (sessiz değil)
- **Senaryo 14 (marker save-hatası → öğrenme korunur, sonraki eylemde tekrar):** **GATE 1 node fixture'ında** deterministik doğrulandı (save mock ok/fail/throw). Tarayıcıda gerçek `STORE.save` başarısızlığı, completed state'i bozmadan zorlanamadığı için browser'da yeniden sürülmedi. Öğrenme geri alınmaması tasarım gereği (marker save'i öğrenme save'inden ayrı).

## Eski smoke'lar
`smoke_onboarding.js` + `smoke_onboarding_freshuser.js` → `.8step-OBSOLETE.txt` olarak yeniden adlandırıldı (eski 8-adım akış; test zincirinden çıkarıldı, sessiz bırakılmadı).

## Regresyon
GATE 1 node ✅ 46 · srs_check ✅ · smoke_storage ✅ · regress_check ✅ · node --check ✅. manifest_check 4 = main'de de var (ilgisiz).

## Sıradaki kapı
**GATE 3 — staging** (henüz AÇILMADI). Öncesi: 3 runtime commit squash + ayrı-origin deploy + gerçek telefon + gerçek v2 blob migration.
