# Onboarding Adım 7 — GATE 0 (Font Kabul) · Sonuç

> **Durum:** Container ön-render **GEÇTİ**; **cihaz onayı BEKLİYOR** (kesin kabul kullanıcının cihazında). Fixture non-shipping scratch artefaktı (`/home/claude/font-fixture-gate0.html`) — production'a gitmez.

## Ön-render (Chromium, deviceScaleFactor 2)
- **3 font da yüklendi:** Shippori Mincho ✓ · Noto Sans JP ✓ · Klee One ✓ (CDN erişimi var).
- Türkçe **ğ ş ı İ ö ü ç** hem Shippori (başlık) hem Noto Sans JP (gövde) rolünde **görünür fallback sıçraması olmadan** render edildi (izolasyon grid'inde her iki satır tutarlı).
- Eğitim glifleri **あ ア 火 木** (`.jp`) tutarlı; CTA içindeki あ hizalı.
- Fallback simülasyonu (generic serif/sans): metin okunur, Japonca glifler sistem fontuyla görünür — düzen bozulmuyor.

## BULGU — font rol gerçeği (R3 uyumlama)
App'te `.jp { font-family: var(--serif) }` → **öğretilen glifler (detay `.bigchar` 96px dâhil) Shippori Mincho ile çiziliyor.** `Klee One` yalnızca aile-ikon rozetinde (dekoratif, satır 2064). Yani:
- "Eğitim glifi = detay ekranındaki biçim" pratikte **Shippori Mincho**'dur; **ayrı bir Japonca eğitim fontu YOK.**
- R3 §0'daki "eğitim glifleri … marka fontu değil" ifadesi bu app için **maddeten geçerli değil** — taught-glyph fontu ile marka fontu **aynı** (Shippori).
- **Sonuç:** onboarding eğitim glifi `.jp` sınıfını kullanır → "detayla birebir aynı" kabul kriteri **otomatik** sağlanır.
- **Öneri:** R3 §0 font-görevleri satırına tek cümlelik uyumlama notu: *"Bu app'te eğitim glif fontu = detay ekranı `.jp` = Shippori Mincho; ayrı eğitim fontu yok."* (Zeynep onayıyla; R3 kilidi bozulmaz, yalnız gerçekle uyumlanır.)

## Kalan
Kullanıcı cihazında fixture 5 maddeyle gözle onaylanır → GATE 0 kapanır → feature commit (kod) → GATE 1–4.
