# Kanji Atlas — Ekran/rota envanteri & yeni-ev haritası (Faz 3 · IA)

> **Status:** Denetim tamam · **ev-kararları KİLİTLİ (2026-07-21)** · Kaynak: `index.html` R haritası (~27 rota).
> **Amaç:** Her rotanın yeni evi neresi · birleşir mi · kaldırılır mı. Kilitli model: `kanji-atlas-faz3-IA-mimarisi.md`.
> **Eylem kodu:** 🟢 KAL (tab evi) · 🔵 ALT (bir tab'ın içinde görünüm/detay) · 🟡 BİRLEŞ (başka eve) · 🔴 KALDIR · ⚙ TAŞI (Ayarlar).

## ★ Kilitlenen ev-kararları (2026-07-21)
- **N5 Kelimeler (`words`/`worddetail`) → Kanji altı.** İçerik olarak N5'e ait; ayrı sekme hak etmiyor.
- **Öğrenme yolu (`path`) → Home dashboard** ("devam et / yolun" omurgası); keşfedilebilirliği artırır.
- (Cross-link temizliği = ekran redesign'ında.)

## Rota → yeni-ev haritası

| Rota | Ne | Eylem | Yeni ev / not |
|---|---|---|---|
| `home` | Ana Sayfa | 🟢 | **Ana Sayfa** (logo). Dashboard'a redesign (devam/bugün/öneri/keşfet + **Öğrenme yolu**). |
| `kana` | Kana Okulu | 🟢 | **Kana** tab. |
| `kanadetail` | Kana detay | 🔵 | Kana altı. "Yazmayı dene" → Yazı/kana. |
| `kana-about` | "Kana nedir" | 🔵 | Kana altı, bağlamsal "?". |
| `kanji5` | N5 Kanji | 🟢 | **Kanji** tab. |
| `map` | Atlas grafiği | 🔵 | Kanji altı **görünüm** (grafik). |
| `atlasnode` | Atlas düğüm detayı | 🔵 | Kanji/atlas altı. |
| `detail` | Kanji detay | 🔵 | Kanji altı. "Çiz" → Yazı/kanji · aile şeridi. |
| `transform` | Kök dönüşümleri | 🔵 | Kanji altı. |
| `kanji-about` | "Kanji nedir" | 🔵 | Kanji altı, bağlamsal "?". |
| `words` | N5 Kelimeler | 🔵 | **Kanji altı** (KİLİT). |
| `worddetail` | Kelime detay | 🔵 | Kanji altı (words). |
| `practice` | Çizim hub'ı | 🟢 | **Yazı** tab (terfi) + kana desteği. |
| `drill` | Tek-kanji drill | 🟡 | **Yazı / kanji modu** (birleş). |
| `mochi` | Kana yazımı | 🟡 | **Yazı / kana modu** (birleş). |
| `games` | Oyun merkezi | 🟢 | **Oyunlar** tab. |
| `game` | Oyun ekranı | 🔵 | Oyunlar altı. Stroke oyunu motoru paylaşır. |
| `quiz` | Mini test | 🔵 | Bağlamsal (detay/practice'ten). Tek implementasyon, kısayol. |
| `review` | SRS tekrar | 🔵 | Home'dan başlatılan akış. Tab değil. |
| `path` | Öğrenme yolu | 🟡 | **Home dashboard** omurgası (KİLİT). |
| `progress` | İlerleme (istatistik) | 🟡 | **Ana Sayfa** özet + gelişim/kutlama görünümü. |
| `learn` | Learn hub | 🔴 | **ÖKSÜZ — hiçbir yer gitmiyor** (`data-go="learn"` yok). Kaldır. |
| `profile` | Profil | 🟢 | **Profil** (üst-sağ avatar). Ayarlar ayrılır. |
| `profile-edit` | Profil düzenle | 🔵 | Profil altı. |
| `reset-confirm` | Sıfırlama onayı | ⚙ | **Ayarlar → Veri → sıfırla**. |
| `writing-system` | Yazı sistemleri açıklayıcı | 🔵 | Bağlamsal (onboarding/Home). |
| `onboarding` | İlk açılış | 🟢 | Korunur. |

## Özet
- 🔴 Kaldır (1): `learn`. · 🟡 Birleş (3): `drill`+`mochi`→Yazı · `progress`→Home. · ⚙ Taşı (1): `reset-confirm`→Ayarlar.
- 🟢 Tab evi (6): Ana Sayfa · Kana · Kanji · Yazı · Oyunlar · Profil.
- Geri kalan 🔵 rotalar bir tab'ın **içinde**. **Asıl kazanç: hiyerarşi düzleşir** — her şey 1–2 dokunuş.

## Buton/tekrar bulguları
- Çizim girişleri → tek Yazı evine (motor zaten tek).
- `quiz` iki yerden başlıyor ama **kopya değil, kısayol** (tek quiz). Korunur.
- Satır-içi "…'ye geç" linkleri (Kana/N5 Kanji) → sekme gelince gereksizleşir; redesign'da temizle.
- "Detay ›" çok yerde → kısayol (kopya değil).

## ▶ Sıradaki
IA modeli + envanter kilitli. Uygulama-sırası kararı (davranış-korur IA-iskelet mi, IA+görsel birlikte mi) → görsel ("makyaj") değerlendirmelerinden sonra.
