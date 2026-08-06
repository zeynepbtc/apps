# Kanji Atlas — Çizim giriş-noktası denetimi (IA refactor · Kol B ilk iş)

> **Status:** Denetim tamam · **model KİLİTLİ (2026-07-21)** · Kaynak: `index.html` (faz2-kalem1 tip, satır no'ları o an).
> **Amaç:** "Bir özellik = bir ev" için çizim şu an nerede yaşıyor, hangileri kopya, tek-ev planı ne.

## ★ KİLİTLENEN MODEL (2026-07-21)
**Çizim = tek modül (`Practice` terfi), İKİ MOD:**
- **Kana modu** = Mochi'nin tek-aşama yazım akışı (korunur).
- **Kanji modu** = Drill'in vuruş-sırası + hayalet iz akışı (korunur).
- Kana/Kanji Detay'daki "çizmeyi dene" butonları → Çizim'i **doğru modda + o karakterle** açar (kısayol). Geri butonu **origin'e + state'e** döner; Ana Sayfa kaçışı ayrı-sabit.
- Stroke oyunu Oyunlar'da kalır, aynı motoru paylaşır.
- **Davranış-korur:** iki mevcut pedagoji aynen korunur, yalnız tek eve toplanır (Zeynep: "iki mod, tek modül").

## Bulgu 1 — Motor TEK (kopya yok) ✅
`drillStage()` (tuval, ~sat.3059) + `validateStroke()` (~sat.4999) **dört yüzeyin hepsinde paylaşılıyor** (drillStage çağrıları: Practice ~3053 · Drill ~3093 · Mochi ~3627 · strokeGame ~4735). **Kopya motor YOK.** → Konsolidasyon = ekran/giriş birleştirme, motor yeniden yazma DEĞİL. Stroke Coach de tek motoru geliştirir; hepsi kazanır.

## Bulgu 2 — Çizim 4 ekrana bölünmüş + gömülü ❌
| Yüzey (route) | Ne | Giriş noktası | Karakter | → Yeni model |
|---|---|---|---|---|
| **`Practice`** (Çizim/Vuruş pratiği) | Karakter seçici + çizim **HUB** | İçerik linkleri (sat.2360, 3842) — **alt nav'da DEĞİL** | kanji | **→ "Çizim" sekmesi (terfi) + kana desteği** |
| **`Drill`** | Tek-kanji drill | Kanji Detay → "✎ Çiz" (sat.2915) | kanji | **→ Çizim / kanji modu (char param + kısayol)** |
| **`Mochi`** ("Yaz Akışı" Faz 6A) | Kana yazımı (tek-aşama) | Kana Detay → "✦ Yazmayı dene" (sat.3770) | kana | **→ Çizim / kana modu (char param + kısayol)** |
| **stroke game** (`strokeGameView`) | Kanji vuruş **oyunu** | Oyunlar → `startGame("stroke")` (sat.5235) | kanji | **→ Oyunlar'da kalır, motoru paylaşır** |

**Sorunlar (kanıtlı):** zaten bir çizim hub'ı var (`Practice`) ama alt nav'da değil (Zeynep'in "gömülü" şikâyeti doğru) · Drill ⊆ Practice örtüşmesi (ikisi de kanji) · kana/kanji iki ayrı ev · derinlik ≈5 dokunuş.

## Sonuç
**4 ekran → 1 Çizim modülü** (2 mod) + oyun modu. Derinlik: Home → **Çizim** → seç → çiz (**2 dokunuş**); detaydan kısayol **1 dokunuş**. Tek motor → Stroke Coach buraya oturur.

## Kararlar
- **A.** `Practice` → "Çizim" sekmesi → **EVET** (onaylı sekme modeliyle tutarlı: Ana Sayfa·Kana·Kanji·Çizim·Oyunlar).
- **B.** Kana vs kanji → **İKİ MOD, TEK MODÜL** (KİLİT).
- **C.** Zamanlama → nav modeli kilidiyle birlikte (Kol B), görsel geçişten önce. (Uygulama sırası Zeynep onayına.)

## Sonraki denetim adımı (istenirse)
Her ekranın **tüm butonlarının** benzersiz/tekrar/birleştir/kaldır tablosu (yalnız çizim değil) — genel IA sadeleştirmesi için.
