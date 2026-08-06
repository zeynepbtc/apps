# Onboarding Envanteri — Mevcut Sistemin Gerçeği (çözüm/kod YOK)

> Kaynak: production `kanji-atlas/index.html` @ `ae742f6`. Yalnız MEVCUT davranış; koru/kaldır kararları ayrı kapıda.
> **Numara uyarısı:** kullanıcının "4. sayfa / 5. sayfa" dediği = ekrandaki **eyebrow numarası** (01–06). Aşağıda hem `step` (akış sırası 1–8) hem eyebrow verildi.

`OB_TOTAL_STEPS = 8`. state: `onboarding = {completed, step, name, motivation, level, style, startedAt, completedAt, entryPath}` + türetilen `userProfile`. Üstte: geri oku (step>1), "Atla" (step 2–7), ilerleme çubuğu (%=step/8).

---

## Ekran 1 — Karşılama (step 1, eyebrow YOK)
- **Metin:** başlık "Japonca Yazı Atlası" · lead "Japonca yazı sistemlerinin mantığını adım adım keşfedin." · CTA "Başlayalım"
- **Görsel:** app logo (88px, mühür animasyonu)
- **Amaç:** giriş/karşılama
- **Kullanıcı kararı:** yok (yalnız devam)
- **State'e yazılan:** yok
- **Sonraki hedef:** step 2
- **Hedef mantığı:** sabit (`ob-next`)
- **Sorun:** —
- **İlk karar:** Koru (giriş ekranı)
- **Not:** —

## Ekran 2 — İsim (step 2, eyebrow 01)
- **Metin:** "Sana nasıl hitap edelim?" · input placeholder "Adın" · CTA "Devam" · ghost "İsim girmeden geç"
- **Görsel:** metin input
- **Amaç:** isim (kişiselleştirme)
- **Kullanıcı kararı:** isim gir / boş geç
- **State'e yazılan:** `onboarding.name` (boş geç → "")
- **Sonraki hedef:** step 3
- **Hedef mantığı:** sabit
- **Sorun:** —
- **İlk karar:** analiz kapısı (isim erken mi?)
- **Not:** name → final ekran selamı + userProfile.name

## Ekran 3 — Motivasyon (step 3, eyebrow 02)
- **Metin:** "Japoncaya neden ilgi duyuyorsun?" · 4 kart: 旅 Japonya seyahati · 漫 Anime, manga, oyunlar · 脳 Sadece merak · 業 Akademik / iş
- **Görsel:** 4 kart (kanji glif + etiket)
- **Amaç:** motivasyon topla
- **Kullanıcı kararı:** 1 kart seç (seçince otomatik ilerler)
- **State'e yazılan:** `onboarding.motivation` (travel/culture/curiosity/work)
- **Sonraki hedef:** step 4 (seçimle)
- **Hedef mantığı:** sabit
- **Sorun:** **motivasyon hiçbir yönlendirmeyi/öneriyi etkilemiyor** (yalnız userProfile'a yazılıyor, kullanılmıyor). Kanji terminolojisi (漫/脳/業) erken.
- **İlk karar:** analiz kapısı
- **Not:** toplanıp kullanılmayan veri

## Ekran 4 — Seviye (step 4, eyebrow 03)  ⚠️ KRİTİK (yönlendirmeyi belirleyen tek girdi)
- **Metin:** "Hangi aşamadasın?" · 4 satır: `beginner` "Hiç dokunmadım" · `a_few` "Birkaç harf biliyorum" · `hiragana` "Hiragana biliyorum, kanjiye girmek istiyorum" · `explorer` "Karıştırmayı seviyorum, sen yönlendir"
- **Görsel:** 4 dikey satır-kart (etiket + ›)
- **Amaç:** başlangıç seviyesi
- **Kullanıcı kararı:** 1 seç (otomatik ilerler)
- **State'e yazılan:** `onboarding.level`
- **Sonraki hedef:** step 5
- **Hedef mantığı:** sabit (adım geçişi); **ama `level` sonradan "Başla" hedefini VE Home önerisini belirleyen tek girdi** (aşağıda karar-ağacı)
- **Sorun:** kullanıcı burada seçtiği "kanjiye girmek istiyorum"/"sen yönlendir" ile son ekrandaki sabit "あ" metni çelişiyor (R5)
- **İlk karar:** analiz kapısı (etiketler + hedef eşlemesi)
- **Not:** R5'in kökü burada başlıyor

## Ekran 5 — Katakana "milk" mini-quiz (step 5, eyebrow 04)  ← kullanıcının "4. sayfa"sı (R1)
- **Metin:** "Bu kelime sence ne demek?" · ミルク / miruku · reveal "Milk'ten gelen bir Japonca kelime: süt. Zaten biliyordun aslında." · köprü "Katakana'nın mantığını çözünce…" · ek satırlar: コンピューター→computer, サラダ→salad, ホテル→hotel · CTA "Devam"
- **Görsel:** quiz kartı + reveal animasyonu + 3 örnek satır
- **Amaç:** katakana "şifre" sezgisi vermek (eğlence)
- **Kullanıcı kararı:** yok (yalnız devam)
- **State'e yazılan:** yok
- **Sonraki hedef:** step 6
- **Hedef mantığı:** sabit
- **Sorun (Zeynep):** hiç bilmeyene katakana ile karşılama gereksiz/kötü giriş; kullanıcı kararı üretmiyor
- **İlk karar:** **Kaldır** (R1 — zaten kararlaştırıldı)
- **Not:** öğrenme aracındaki Katakana Şifreleri modülü ayrı, o kalır

## Ekran 6 — Üç yazı sistemi (step 6, eyebrow 05)  ← kullanıcının "5. sayfa"sı (R2-A/R3)
- **Metin:** "Japonca üç yazı sisteminden oluşur." · あ Hiragana "en yaygın Japonca kökenli kelimeleri yazmada kullanılan ses sistemi" · ア Katakana "aynı sesleri yazan ikiz sistem; yabancı kelimeler, isimler ve ses taklitleri için kullanılır" · 火 Kanji "ses değil anlam taşıyan, Çin'den uyarlanmış işaretler; her biri bir kavramı gösterir" · köprü "Önce temel seslerle başlayacağız." · CTA "Devam"
- **Görsel:** 3 satır (glif + ad + açıklama), kademeli animasyon (200/550/900ms)
- **Amaç:** üç sistemi tanıt
- **Kullanıcı kararı:** yok (yalnız devam)
- **State'e yazılan:** yok
- **Sonraki hedef:** step 7
- **Hedef mantığı:** sabit
- **Sorun:** "Önce temel seslerle başlayacağız" satırı **çok silik/italik/minik** → okunmuyor (R3). İçerik doğruluğu: "hece" eklemesi + kana=mora nüansı (R2-A). Kana/Kanji terminolojisi erken yükleniyor.
- **İlk karar:** Koru + yeniden yaz (metin/tipografi) — R3 + R2-A
- **Not:** Zeynep bu ekranı "güzel" buldu (içerik/akış korunur, tasarım/metin elden geçer)

## Ekran 7 — Öğrenme stili (step 7, eyebrow 06)
- **Metin:** "Nasıl ilerlemek istersin?" · 4 satır: `step` "Adım adım ilerlemek isterim" · `play` "Oyunlarla öğrenirim" · `mix` "Karıştırarak keşfetmeyi severim" · `any` "Hepsi / kararsızım"
- **Görsel:** 4 dikey satır-kart
- **Amaç:** öğrenme stili
- **Kullanıcı kararı:** 1 seç (otomatik ilerler)
- **State'e yazılan:** `onboarding.style`
- **Sonraki hedef:** step 8
- **Hedef mantığı:** sabit
- **Sorun:** **`style` "Başla" hedefini HİÇ etkilemiyor** (entryPath yalnız `level`'a bakar). Yalnız Home önerisini (`recommendedStart`) etkiliyor → iki mantık çelişiyor. Kullanıcı "karıştırmayı severim" seçtiğini sanıp sabit rota alıyor.
- **İlk karar:** analiz kapısı
- **Not:** R5'in ikinci kaynağı — style vs level çelişkisi

## Ekran 8 — Final "Başla" (step 8, eyebrow YOK)
- **Metin:** selam "Hazır mısın, {isim}?" (isim yoksa "Hazır mısın?") · glif あ · "İlk harfin / a" · lead "Vuruş sırasını izleyeceksin, kendin çizeceksin. Birkaç saniyeden uzun sürmeyecek." · CTA "Başla"
- **Görsel:** büyük あ glifi + romaji
- **Amaç:** ilk eyleme geçir
- **Kullanıcı kararı:** yok ("Başla")
- **State'e yazılan:** `completeOnboarding()` → `onboarding.completed=true, completedAt, entryPath` + `userProfile` üretilir
- **Sonraki hedef:** `resolveEntryRoute(entryPath)` (aşağıda) — geçersizse Home
- **Hedef mantığı:** `entryPath` = `deriveEntryPath(level)` — **yalnız `level`**
- **Sorun (R5 — MERKEZİ):** metin **herkese sabit "İlk harfin あ / vuruş sırası çizeceksin"** diyor; ama "Başla" seviyeye göre **farklı** yere gidiyor (aşağı). "hiragana biliyorum"/"karıştır" seçen kullanıcıya あ vaat edip 木'ye veya haritaya götürüyor.
- **İlk karar:** Yeniden yaz (metin-hedef hizası) — R5
- **Not:** düzeltme yönü ayrı kapıda

---

## İKİ ÇELİŞEN KARAR-AĞACI (ürün mantığı)

### A) "Başla" (ob-finish) → `deriveEntryPath(level)` → `resolveEntryRoute`
Yalnız **`level`**'a bakar (motivation/style/name YOK sayılır):
| level (Ekran 4 seçimi) | entryPath | Gerçek hedef | Final ekran metni |
|---|---|---|---|
| beginner "Hiç dokunmadım" | `kana` | **あ** kana detayı (kanadetail/あ) | "İlk harfin あ" ✅ uyumlu |
| a_few "Birkaç harf biliyorum" | `kana` | **あ** kana detayı | "İlk harfin あ" ✅ |
| hiragana "…kanjiye girmek istiyorum" | `kanji-family` | **木 (ki) KANJI detayı** | "İlk harfin あ" ❌ **çelişki** |
| explorer "…sen yönlendir" | `explore` | **Atlas haritası (map)** | "İlk harfin あ" ❌ **çelişki** |
- "Atla" (ob-skip) → `completeOnboarding()` + **Home** (entryPath'i kullanmaz).

### B) Home önerisi (`recommendedStart()`) — AYRI ve FARKLI mantık
Ana sayfadaki "öneri" satırı için; `level` + `style` + legacy `userProfile.level`:
| Girdi | Öneri |
|---|---|
| level `explorer` **veya** style `play`/`mix` | **games** (Oyunlar) |
| level ∈ {hiragana, kana, basic_kanji, advanced} veya pLvl aynı | **kanji** |
| aksi | **kana** |
- **Çelişki:** aynı kullanıcı için "Başla" hedefi (A) ile Home önerisi (B) uyuşmuyor. Örn. `explorer`: A→harita, B→games. `style=mix`: A yok sayar (level'a göre), B→games.

## Bitişik "ilk kullanım" ekranları (8-adım ÇEKİRDEĞİNİN DIŞINDA — envanter notu)
- **Yazı sistemi dersi** (`WS_STEPS`, `_wsStep`, `seenWritingSystem`): ayrı, onboarding akışında değil.
- **Okuma tanıtımı** (`seenReadingIntro`): ilk "reading" quiz'de bir kez gösteriliyor; onboarding değil.
- (Bunlar onboarding fazının kapsamı netleşince ayrıca değerlendirilebilir.)

## Envanterden çıkan ana gerçekler (yalnız gözlem)
1. Yönlendirme **iki ayrı, birbiriyle çelişen** mantıkla yapılıyor: "Başla" (yalnız level) ve Home önerisi (level+style). 
2. Final ekran metni **herkese sabit あ**, ama hedef level'a göre değişiyor → R5 çelişkisi (hiragana→木, explorer→harita).
3. **motivation** (Ekran 3) toplanıyor ama hiçbir karara girmiyor.
4. **style** (Ekran 7) yalnız Home önerisini etkiliyor, "Başla"yı etkilemiyor.
5. Ekran 5 (katakana quiz) kullanıcı kararı üretmiyor (R1 kaldır).
6. Ekran 6 içerik/tipografi düzeltmesi bekliyor (R2-A/R3), akış/konsept korunuyor.
