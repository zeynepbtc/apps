# Home Grid & Renk — Editör Promptu (referans hizalama)

> **Amaç:** Home yeniden kurgusunu Zeynep'in "medical app" referansının **yumuşak-yuvarlak-muted-ferah** estetiğine hizalamak. Kod öncesi pusula. (2026-07-23.)
> **Bağlam:** İlk grid denemem sert/geometrik/çerçeveli/çiğ oldu → "kaba poster". Referans "sakin premium". Bu belge farkı ve düzeltmeyi tarif eder.
> **KARAR BEKLİYOR:** Bölüm 4 — A (tam yumuşak) vs B (hibrit ince-imza). Zeynep seçecek.

## 1. Referansın çözümü
- **His:** sakin, yumuşak, ferah, sıcak-muted, premium ("soft editorial"). Sert kenar / siyah çizgi / çiğ renk YOK.
- **Üst form:** dümdüz bar DEĞİL — alt kenarı **kavisli/organik**, içeriğe akan yumuşak renk formu. Selam metni içinde.
- **Kartlar:** büyük, **yumuşak yuvarlak köşe (~18–22px)**, dolu **muted** renk, **çerçevesiz**, bol iç padding. İkon+metin **net ayrık**.
- **Renk:** golden sarı · soft teal/sage · muted turuncu — hepsi **doygunluğu hafif alınmış**, huzurlu.
- **Ritim:** geniş hero → iki eşit orta → geniş alt (boyut ritmi; eşit değil).
- **Boşluk:** cömert dış + büyük iç; ekranı **dengeli** doldurur.

## 2. Hatalarım (yan yana)
| Öğe | Referans | Benim (yanlış) |
|---|---|---|
| Üst form | organik kavisli, akar | dümdüz sert bar + alt çizgi = toolbar (+ ucuz sarı #EDDD9A) → **DÜZELTİLDİ: krem kütlesiz üst** |
| Kart köşe | yumuşak yuvarlak | keskin açısal |
| Kart kenarı | çerçevesiz temiz dolu | siyah offset çerçeve = kaba |
| Doygunluk | muted/soft | çiğ/parlak |
| Boşluk | cömert, dengeli | üstte sıkışık, altta ölü alan |
| İkonlar | yumuşak, entegre | çıplak hamburger + sert logo |

## 3. Düzeltme direktifleri (redo)
1. **Üst:** full-width sert bar YOK; krem kütlesiz (yapıldı) VEYA organik kavisli yumuşak palet-formu. Ucuz sarı asla.
2. **Kartları yumuşat:** keskin köşe → **yuvarlak köşe**; siyah offset çerçeveyi kaldır ya da çok inceye çek; temiz dolu renk.
3. **Renkleri muted aileye çek:** turuncu/teal/sarı/terracotta hepsi hafif doygunluğu alınmış, uyumlu — çiğ değil.
4. **Boşluğu dengele:** cömert padding + gap; içerik ekranı dengeli doldursun, altta ölü alan yok.
5. **İkon+metin ayrımı:** net mesafe, **asla çakışma** (Apple boşluk disiplini).
6. **Boyut ritmi:** eşit kutular değil — geniş hero + ikili + geniş alt.
7. **Safe-area:** üstte ferah nefes (yapıldı: max 52px + safe-area).
8. **Palet:** yalnız kendi paletimiz (--bg krem, accent, gold, teal, clay, brown). İcat renk (ör. --sun) YOK.

## 4. TEK açık karar (Zeynep seçecek)
Zeynep önceden "ince çizgi çerçeve + taşmış renk" istedi; referans "çerçevesiz yumuşak yuvarlak." Zıt:
- **A) Tam referans dili:** çerçeve yok, yumuşak yuvarlak, muted → en sakin/premium.
- **B) Hibrit (Claude önerisi):** yumuşak yuvarlak + muted taban + kenarda **çok ince** imza çizgi/taşma → sevdiği karakter kalır, kaba olmaz.

## İlerleme
- ✔ Üst sarı şerit kaldırıldı → krem kütlesiz üst + safe-area nefesi (`69fb363`).
- ⏳ A/B kararı sonrası: kartları yumuşat + muted palet + boşluk-ritim (editör promtu uygulanır).
