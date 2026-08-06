# P0-5 Production Release — Durum: ✅ TAMAMLANDI & DOĞRULANDI (2026-07-22)

## Sonuç
**P0-5 (A+B) production'a çıktı, smoke geçti, doğrulandı.**
- **Release commit:** `ae742f6587b15586fab021224af4c27febad8a89` (`ae742f6`) — main == origin/main.
- **Doğrulanmış release tag:** `p05-production-20260722` → `ae742f6` (`^{}` eşitliği doğrulandı).
- **Rollback tag:** `pre-p05-20260722` → `ab9d7d9` (eski production).
- İçerik: `kanji-atlas/index.html` → v2 (storage migration + kana SRS); `kanji-atlas-preview/` + `atlas-onizleme/` → inert tombstone (script/localStorage/kana_state YOK).

## Production smoke — GEÇTİ (Zeynep, gerçek cihaz)
S1 fresh-install (incognito): açılışta kana_state null → tek eylem+reload → schemaVersion 2, recovery yok, hata yok. ✅
S2 mevcut-kullanıcı migration: manuel .txt yedek + canonical v2 + ilerleme/userHints korundu + yeni aktivite kalıcı + recovery yok + `.bak.v1` mevcut, normal save ile değişmedi. ✅
Tombstone: `/atlas-onizleme/` + `/kanji-atlas-preview/` → "Bu önizleme kapatıldı". ✅

## Test tabanı
storage node 97 · 5B-1 28 · 5B-2 9 · 5B-3 ~40 · 5B-5 18 = ~190 assertion, 0 hata. Staging (kanji-atlas-staging.zeynop.workers.dev) A-D geçti.

## Acil durum (gerekirse)
Forward-fix → v2-compatible rollback (kapsam haritası: `P0-5-MERGE-plani.md` §7; "storage açısından geri alınabilir; ürün/pedagoji açısından ayrıca onay gerektirir") → son çare `pre-p05-20260722`. Force-push YOK; tam-revert applicable değil (eski kopyaları geri açar). Her kullanıcıda `.bak.v1` yedeği.

## P0-5 KAPANDI. Sıradaki işler (P0-5'ten bağımsız, backlog'da)
- **Onboarding Yeniden Tasarım** (R1 4.sayfa, R3 sayfa5 tipografi, R5 "Başla→kanji ağacı" tutarsızlığı) — `GEZINTI-REVIZYON-BIRIKTIRME.md`.
- **İçerik doğruluk denetimi** (R2 bilgi kartları/tanımlar).
- **UI Parity** (R4 Kana "Yazmayı dene" konumu).
- Auto-deploy: faz2-kalem1 → staging otomatik; production release = seçici snapshot (bu belge).
