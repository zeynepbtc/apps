# Faz 2 · Ses Manifesti — Envanter (kod DEĞİŞMEDEN)

> **GPT kuralı:** Önce hiçbir şey değiştirme; yalnız envanter + sözleşme. Amaç dört soruyu netleştirmek: **neye ihtiyacımız var · elimizde ne var · hangisini yeniden kullanacağız · hangisini yeni kaydedeceğiz.** Ses manifesti bir "ses sistemi yeniden yazımı"na **dönüşmeyecek**. Bu belge yalnız envanter; üretim kodu değişmedi.

## 0. Mevcut ses mimarisi (kod gerçeği)
- Tek fonksiyon `speak(text, el, url)`. Ayar `state.settings.audioMode`: **`system`** (varsayılan → cihaz TTS), **`premium`** (url varsa dosya, hata/yoksa TTS'e düşer), **`off`** (sessiz + toast).
- **Bugünkü fiili politika = Option A** ama yalnız `premium` modunda: `dosya varsa çal → hata/yoksa TTS → o da yoksa sessiz`. Varsayılan `system` modunda **hep TTS**; dosya hiç denenmiyor.
- Dosya URL'si yalnız **words** taşıyor: `w.audio.word = "audio/words/{romaji}.mp3"`, `w.audio.sentence = "audio/sentences/{romaji}.mp3"` — **ama bu dosyalar Atlas'ta YOK** (Atlas tek HTML; `audio/` klasörü yok). Altyapı hazır, dosyalar değil. Kana/kanji `audioBtn`'leri **hiç url taşımıyor** → her zaman TTS.

## 1. Atlas bugün ne istiyor? (her ses isteği)
| Tür | İçerik örn. | Kullanıldığı yer (fonksiyon) | url taşıyor mu? | Zorunlu mu? |
|---|---|---|---|---|
| Kana | あ | Kana / Öğren, Detail (`audioBtn(c.character)`) | Hayır → TTS | Evet |
| Kanji | 木 | Kanji Detail (`audioBtn(c.character)`) | Hayır → TTS | Evet |
| Kanji örnek kelimesi | 木曜日 | Detail örnekleri (`audioBtn(e[0])`) | Hayır → TTS | Orta |
| N5 kelime | 森 | Kelime kartı (`audioBtn(w.word_jp, url)`) | Evet (dosya yok) | Evet |
| Örnek cümle | 森は… | Kelime detay cümlesi (`w.audio.sentence`) | Evet (dosya yok) | Orta |
| Oyun etiketi / quiz okunuşu | dinamik | Oyunlar, Quiz (`speak(label)`, `R.speak`) | Hayır → TTS | Opsiyonel |
| UI geri bildirim | Doğru/Yanlış | Quiz | — (TTS bile değil) | Opsiyonel |

**Sayısal ihtiyaç:** Kana **92** (46 hiragana + 46 katakana) · Kanji **91** · N5 kelime **78** · Örnek cümle **78**.

## 2. Flick'te ne var? (683 dosya)
| Klasör | Dosya | İçerik | Kalite | Kullanılabilir |
|---|---|---|---|---|
| `audio/kana/` | **104** | tam hece (a, ka, ki, dakuten, yōon…) | ✓ gerçek kayıt | ✓ |
| `audio/word/` | **568** | romaji-adlı N5–N3 kelimeler (kinoko, mori, ki…) | ✓ | ✓ |
| `audio/phrase/` | 10 | selam/kalıp cümleler | ✓ | kısmi |
| `audio/ui/` | 1 | greeting | ✓ | opsiyonel |
- **`audio/kanji/` klasörü YOK** — Flick'te tek-kanji sesi yok; ama kanji **okunuşları** kana/word kütüphanesinde olabilir (木→ki, 森→mori).
- Referans: Flick seslendirme planı `SESLENDIRME-eksik-liste.md` (romaji-adlı, part-gruplu; kırpma/adlandırma iş akışı orada).

## 3. Eşleşme — MANİFESTİN KALBİ (gerçek sayılar, romaji üzerinden)
| Atlas ihtiyacı | Sayı | Flick'te var mı? | Sonuç |
|---|---|---|---|
| **Kana** | 92 | **92/92** (kana/) | **Aynen kullan** — hepsi Flick `kana/{romaji}.mp3` |
| **Kanji (okunuş)** | 91 | **70/91** (kana+word, romaji sesi) | 70 **aynen kullan** · **21 yeni kayıt** |
| **N5 kelime** | 78 | **52/78** (word/) | 52 **aynen kullan** · **26 yeni kayıt** |
| **Örnek cümle** | 78 | **0** (sentences/ yok) | **78 yeni** (veya TTS'te bırak) |

- **Eşleşmeyen kanji (21):** 大 天 夫 林 時 学 女 王 玉 円 金 年 … (okunuşu Flick'te yok).
- **Eşleşmeyen kelime (26) örnek:** hitotsu, futatsu, mittsu, gozen, gogo, han, onnanoko, otokonoko …
- **⚠ Eşleşme uyarısı:** Match romaji-**ses** üzerinden. 木→ki (kana き sesi) doğru okunuş; 休→yasumu (fiil) doğru; ama her eşleşme **bağlamca doğrulanmalı** (aynı romaji farklı kelime olabilir). Manifest kilitlenmeden bu 70+52 tek tek gözden geçirilir.

**Kaba yeni-kayıt yükü:** dosya-zorunlu senaryoda 21 (kanji) + 26 (kelime) + 78 (cümle) = **~125**; cümleler TTS'te kalırsa **~47**.

## 4. Politika (en önemli karar — baştan kilitle)
GPT iki seçenek sundu:
- **A — Dosya öncelikli, TTS ağı açık:** `dosya varsa çal → yoksa/hata TTS → o da yoksa sessiz`. **(Bugünkü kod bunu yapıyor, `premium` modunda.)** Uygulama asla sessizleşmez; kademeli ses eklenebilir.
- **B — Dosya zorunlu:** dosya yoksa **hiç ses çalma**. Daha saf/tutarlı ama kaydedilmeyen her karakter **sessiz** kalır.

**Öneri: A.** Gerekçe: 92 kana + 122 okunuş/kelime hemen dosyayla gelir, kalan ~47-125 kayıt tamamlanana kadar **TTS ağı öğreneni yalnız bırakmaz**; risk en düşük, mevcut davranışla uyumlu. B'yi ancak tüm kütüphane tamamlanınca "release cila" olarak düşün. (Karar Zeynep+GPT.)

## Manifest şeması (GPT önerisi — yalnız dosya listesi değil)
Alanlar: `id · kategori · metin · okunuş · ses_dosyası · kaynak`
| id | kategori | metin | okunuş | ses_dosyası | kaynak |
|---|---|---|---|---|---|
| kana_a | kana | あ | a | kana/a.mp3 | Flick |
| kanji_ki | kanji | 木 | ki | kana/ki.mp3 | Flick (okunuş) |
| kanji_dai | kanji | 大 | dai | kanji/dai.mp3 | Yeni |
| word_mori | kelime | 森 | mori | word/mori.mp3 | Flick |
| word_gozen | kelime | 午前 | gozen | word/gozen.mp3 | Yeni |
- **Faydası:** Atlas + Flick + (ileride) Part Time Japan arası **ortak ses kütüphanesi**. Tek kimlik/yol/kaynak sözleşmesi.
- **Yol notu:** Atlas bugün `audio/words/` (çoğul) bekliyor, Flick `audio/word/` (tekil); kana url'si hiç bağlı değil. Manifest yol normalizasyonunu tek yerde çözer.

## Bu kalemin sınırları (kapsam kilidi)
Bu faz = **envanter + şema + politika kararı**. Bu kalemde: yeni ses **kaydı yapılmaz**, `speak()`/audio sistemi **yeniden yazılmaz**, manifest dosyası **henüz bağlanmaz**. Önce envanter+sözleşme onaylanır → sonra ayrı "uygulama" adımı (manifest verisi üret + speak() yol çözümüne bağla) ayrı commit + testle gelir.

## Açık kararlar (Zeynep + GPT)
1. **Politika A mı B mi?** (Öneri: A — TTS ağı açık kalsın.)
2. **Manifest şeması** bu haliyle kabul mü? (`id·kategori·metin·okunuş·ses_dosyası·kaynak`)
3. **Cümleler:** 78 cümle yeni kayıt mı, yoksa TTS'te mi kalsın? (Öneri: şimdilik TTS; kelime+karakter önce.)
4. **Kanji okunuş sesi:** tek-kanji için hangi okunuş kaydedil/kullanılır — kanji `romaji` alanı (tek okunuş) yeterli mi, yoksa on/kun ayrımı gerek mi? (Eşleşen 70'in bağlam doğrulaması buna bağlı.)
5. **Yol normalizasyonu:** ortak kütüphane kökü (`/audio/{kana|kanji|word}/…`) manifn içinde mi çözülsün?
