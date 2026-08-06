# Onboarding Adım 7 — GATE 3 staging aday + TEMİZ ARTEFAKT + CİHAZ kiti

> **Durum:** Temiz staging adayı + temiz shipping artefaktı + container ön-doğrulaması GEÇTİ. **Ayrı-origin deploy YAPILDI.** **Tarayıcı-tarafı GATE 3, canlı staging origin'inde Claude in Chrome ile GEÇTİ (aşağıda).** Kalan: gerçek production v2 blob migration (güvenlik) + gerçek telefon — CİHAZDA (Zeynep). **GATE 3 henüz KAPANMADI. GATE 4 YOK.**

## Staging aday dalı (tek runtime commit)
- Dal `origin/onboarding-b2-gate3` (main `ae742f6`'dan). Yedek `onboarding-b2` (`f5ab9de`) **dokunulmadı**.
- Runtime commit (TEK): `b5de1cd` · **byte-identical** blob `95ed9e4a80d998ca22bb9e51e5455408116bd171` (`origin/onboarding-b2` ile birebir, diff boş).
- Aday testleri: GATE 1 **46/46** · GATE 2 **47/47** · GATE 3 container **23/23**.

## ★ CANLI STAGING (deploy edildi — 2026-07-22)
- **URL:** `kanji-atlas-staging-b2.zeynop.workers.dev` (Cloudflare **Worker**, static-assets upload; Git-bağlantısız ZIP-drop → yalnız temiz dosyalar).
- Versiyon `3c23c40e` · manuel deploy · "Automatic deployment on upload".
- Yükleme manifesti panoda doğrulandı: **474 dosya** (1 `index.html` 656 KB + `audio/` 473 mp3 ≈ 5 MB). Fazladan/junk yok.
- Ayrı origin → production localStorage'ından yalıtık (workers.dev subdomain).
- Not: Cloudflare artık statik yüklemeyi "Pages" yerine **Worker** olarak paketliyor ("Create a Worker → Upload and deploy") — istediğimiz statik-varlık deploy'unun aynısı, yalnız isim değişmiş.

## ★ TEMİZ SHIPPING ARTEFAKTI (deploy paketi)
**Yalnız runtime çıktısı yayımlanır.** `_faz2`, `audio-manifest.json`, `ONBOARDING-*.md`, fixture/obsolete/log yayımlanmaz.

| Yayımlanan | Neden |
|---|---|
| `index.html` (655.798 B, blob `95ed9e4a…`) | uygulama (byte-identical) |
| `audio/` (473 mp3, ~6.1 MB) | runtime'da çalınan gerçek ses varlıkları |

**Yayımlanmayan (kanıtlı):** `_faz2/*` (test) · `audio-manifest.json` (build kaynağı — runtime'a gömülü, **fetch YOK**) · `ONBOARDING-*.md` (proje belgeleri).

## ★ TARAYICI-TARAFI GATE 3 SONUÇLARI — CANLI STAGING (Claude in Chrome, 2026-07-22)
Ortam: Claude in Chrome, gerçek origin `https://kanji-atlas-staging-b2.zeynop.workers.dev/`. Gerçek buton tıklamaları + `window.JYA.state` doğrulaması. Her band temiz `localStorage`'dan. **Hepsi GEÇTİ.**

**Kök yol + fresh onboarding:** `/` → index.html 200 (Cloudflare hata sayfası değil), `window.JYA` var, `schemaVersion=2`. Temiz localStorage + reload → `screen=onboarding`, `status=in-progress`, `stage=welcome`, `competency/startKey=null`, H1 "Kanji Atlas" (mağaza adı), "Ana sayfaya geç" var, `rec-hint=0`.

**Dört bant başlangıç hedefleri (gerçek tıklama):**
| Band | writing-intro | final H1 | başlat → |
|---|---|---|---|
| 0 (Sıfır) | görünür | "あ ile başlayalım." (glif あ, font-family Shippori) | `kanadetail` / `あ` (rehberli あ detay) |
| 1 (Başlangıç) | görünür | "Temel karakterlerden devam et." | `kana` (Kana Temeli ana görünüm) |
| 2 (Kana hazır) | **atlanır** | "Kanji yapılarına geçmeye hazırsın." (glif 木) | `detail` / `ki` (木 kanji detay) |
| 3 (Kanji) | **atlanır** | "Atlas'tan devam et." | `map` (Kanji Atlası grafiği) |
competency H1 = "Japonca yazıda nereden başlıyorsun?"; writing-intro H1 = "Japonca yazıda üç ana sistem birlikte kullanılır." Band 0/1 writing-intro görüyor, 2/3 atlıyor — doğru.

**Geri / reload / kaçış:** Kontroller: welcome `[ob-continue, ob-home]` · competency `[ob-back, 4×ob-competency, ob-home]` · writing-intro `[ob-back, ob-continue, ob-home]`. Geri: writing-intro → competency → welcome. Reload: onboarding'de yeri korur (writing-intro+comp0 → reload → aynı). Kaçış: competency'den `ob-home` → `screen=home`, `status=skipped`, `rec-hint=0` (sahte kişiselleştirme yok).

**Final semantiği + öneri şeridi (uçtan uca, gerçek SRS aksiyonu):** Band 2 tamamla → `status=completed`, `startKey=kanji-ki`, `fma=null`. Reload → Home, öneri şeridi **görünür** ("Senin için öneri: Kanji Atlası…", `recHint=1`, `shouldShowInitialRec=true`). 木 detayında gerçek "＋ Tekrara ekle & öğrenildi işaretle" tıklandı → `firstMeaningfulActionAt` damgalandı, `srs.ki={correct:1,mastery:1,seen:1}`, `learned.ki=true`. Home → şerit **kayboldu** (`recHint=0`, `shouldShow=false`). Reload → Home'da **geri gelmiyor** (`recHint=0`). → Kanonik marker gerçek runtime'da doğru.

**Fontlar:** Google Fonts unicode-range **alt-küme lazy loading** çalışıyor — Shippori/Noto/Klee woff2 alt-kümeleri talep üzerine iniyor, hepsi **200**. `document.fonts.check('48px "Shippori Mincho"','あ')=true`, eğitim glifi computed font = `"Shippori Mincho", serif`. (Genel `check` çağrısı false döner çünkü test edilen alt-küme henüz gerekmemiş — normal davranış, yükleme hatası değil.) → **İ/ı sorunu font-yükleme/sistem-serife-düşme DEĞİL; Shippori'nin kendi Türkçe glif kalitesi (Bulgu S-1 doğrulandı).**

**404 + console/network:**
- Normal akış (band0 tamam + home/kana/map/detail/games gezinti) = **90 istek, hepsi 200**; **console error/exception YOK**, pageerror YOK. (Listedeki `chrome-extension://…` ve `migaku-public-data.migaku.com` istekleri kullanıcının tarayıcı eklentilerinden — uygulamaya ait değil, hepsi 200.)
- `/index.html` **200** (text/html) · `/audio/kana/a.mp3` **200** (audio/mpeg 5895 B) · `/_faz2/gate1_onboarding_b2.js` **404** · `/audio-manifest.json` **404** · `/ONBOARDING-B2-akis-haritasi.md` **404** · bilinmeyen `/does-not-exist-xyz123` **gerçek 404** (SPA-fallback ile index.html DÖNMÜYOR). → Temiz artefakt canlı origin'de de doğrulandı.

## CİHAZDA (Zeynep) — KALAN
### 1. Ayrı-origin deploy ✔ YAPILDI · tarayıcı kontrolleri ✔ Claude in Chrome ile GEÇTİ
### 2. Gerçek production v2 blob migration (GÜVENLİK) — KALAN
- Production DevTools: `copy(localStorage.getItem('kana_state'))` (OKUR, değiştirmez). Blob'u **sohbete/Claude'a yapıştırma**; yalnız **hash/özet** paylaş.
- Production sekmesini kapat → **staging** DevTools → `localStorage.setItem('kana_state', <blob>)` → reload.
- **Kabul (asıl ölçüt): JSON farkında onboarding DIŞINDAKİ veriler DEĞİŞMEZ** — `schemaVersion=2` · kişisel notlar (userHints) · kana/kanji learned · SRS kayıtları · `seenWritingSystem` · userProfile+isim · oyun/progress. Eski completed kullanıcı → sahte competency/startKey YOK, Home normal kartlarla açılır. İkinci reload idempotent.
- Raw state hash'i yükleme öncesi/sonrası değişebilir (onboarding alt-nesnesi normalize olur) — bu beklenen; kabul, onboarding dışı veri değişmezliği.
- **Production localStorage'a hiçbir şey yazma.** (Not: staging localStorage tarayıcı testinde defalarca temizlendi; production hiç ellenmedi.)

### 3. Gerçek telefon — KALAN
**%200 metin büyütme** taşma yok, safe-area (çentik/alt bar), sticky örtme yok, 44×44 dokunma, üç font gerçek cihazda. (Akış/rota/final/404 mantığı masaüstü tarayıcıda geçti; telefon = fiziksel render/dokunma.)

## Staging test bulguları (biriken — cihazda gözlem, Zeynep)

### Bulgu S-1 — ERTELENDİ · Shippori Mincho'nun Türkçe i-ailesi (İ / ı) serif+italik bağlamda dengesiz
Tek kök neden, birden çok yüzey. GATE 0 "tofu yok / glif var" kabulünü **geçiyor**, ama estetik zayıf → kozmetik, GATE 3'ü bloklamaz. **Tarayıcı testinde teyit: font düzgün yükleniyor (200), sorun sistem-serife düşme değil, Shippori'nin İ/ı glif kalitesi.**

- **Kök neden:** Shippori Mincho bir Japonca serif (Mincho). Latin-genişletilmiş **Türkçe i-ailesi** için glif/metrik zayıf: noktalı büyük **İ** (U+0130) ve noktasız küçük **ı** (U+0131). Hem düz aksan-serif hem **italik** varyantta bozuk.
- **Gözlenen yüzeyler:**
  - **İ (büyük, düz aksan-serif):** Band 2 final → "**İ**lk kanji ailesi: 木" (reasonKey).
  - **ı (küçük, italik aksan-serif):** "Japoncanın üç ana sistemi" alt-metni → "…tan**ı**mak, sonraki ad**ı**mlar**ı** kolaylaşt**ı**r**ı**r."
  - **İ (uygulama geneli):** Kanji Atlası ekranı grup başlığı "**İ**nsan ailesi" — yani sadece onboarding değil, tüm serif/display başlıklarda genel.
- **Aday çözümler (sırası gelince):** (a) başlık/aksan/italik serif metinde Türkçe İ/ı içeren dizeleri UI fontuna (Noto Sans JP/sistem) düşürmek — karışık-font tutarlılık riski; (b) metin revizyonuyla İ/ı yoğun ifadelerden kaçınmak — R2-A metin kilidi açılmalı; (c) yalnız Latin için ikinci serif fallback stack'i (İ/ı'yı düzgün çizen bir serif); (d) CSS ince ayar (düşük olasılık).
- **Karar:** Zeynep "not al, sırası gelince ilgileniriz" → **faz açılmadı, ertelendi.** Toplu ele alınacak (tek font kararı, tüm yüzeyler birlikte).

## GATE 4 — YAPILMADI
Merge/main/production/tag/release YOK. Aday zaten tek runtime commit `b5de1cd`; production yalnız GATE 3 (gerçek blob migration + telefon) temiz çıkınca ve onayınla.
