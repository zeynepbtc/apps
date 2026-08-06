# Kanji Atlas — Cihaz Gerçekliği & Safe-Area (QA katmanı)

> **Status:** kısmen çözüldü (2026-07-21) · Zeynep sordu: telefon modellerine göre çentik/ada ile arayüz çakışması ilgilendik mi? Kısmen — üst düzeltildi.
> Bu, Design System v1.0'ın **"cihaz kuralları / safe-area"** katmanına ait. DS token'larına girmeli.

## Yapıldı (faz2-kalem1 + önizleme)
- `viewport-fit=cover` zaten vardı.
- **Alt (home indicator):** tab bar `env(safe-area-inset-bottom)` — zaten güvenli.
- **Üst (durum çubuğu / çentik / Dynamic Island):** EKLENDİ → `header` ve `.ob-root` padding-top + `.ob-back`/`.ob-skip` top artık `calc(... + env(safe-area-inset-top))`. Header'ın blur zemini kenara kadar uzanır, içerik ada'nın altına girmez.
- **apple-touch-icon:** eski 仮 → yeni logo (C: teal boncuk + amber + 木) data-URI'ye çevrildi.

## Hâlâ açık (device-reality QA)
- **Cihaz matrisi testi yapılmadı:** gerçek cihazlarda sistematik test yok. Test edilecekler: çentikli iPhone (X–13), **Dynamic Island** (14/15/16 Pro), çentiksiz/küçük iPhone (SE), çeşitli Android (punch-hole kamera), landscape.
- **Landscape sol/sağ inset** (`safe-area-inset-left/right`): portre öncelikli app, düşük öncelik ama not.
- **Yeni socket nav entegrasyonu:** gerçek app'e girince alt bar **mutlaka** `safe-area-inset-bottom` taşımalı (mevcut tabbar taşıyor; yeni motor da taşımalı).
- **Metin taşması / Türkçe:** ş/ğ/ı font düzeltmesi (Nunito) ayrı bir "metin çakışması" ekseni — bkz. faz3-plan.
- **Dynamic Island canlı aktivite** vb. native konular: native sarım fazında.

## Design System bağı
Safe-area **token** olmalı: `--safe-top: env(safe-area-inset-top)`, `--safe-bottom: env(safe-area-inset-bottom)`. Header/nav/onboarding/modal/bottom-sheet hepsi bu token'ı kullanmalı → DS v1.0 "cihaz kuralları" bölümü. "Bir ekranda var, ötekinde yok" driftini önler.
