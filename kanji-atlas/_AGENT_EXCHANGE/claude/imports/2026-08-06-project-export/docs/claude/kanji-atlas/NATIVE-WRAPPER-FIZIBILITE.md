# Native Wrapper — FİZİBİLİTE & DE-RİSK PLANI

> App Store gate: saf HTML/PWA reddedilir → native wrapper (WKWebView) şart. Somut risk haritası + de-risk planı. Gerçek iOS build/test Mac+Xcode gerektirir.
> Branch `onboarding-b2-gate3` · son HEAD `91c6f0c` · 2026-07-24.

## İlerleme
- **A. Storage durability — ✓ TAMAM** (commit `c91bc1f`). Bkz aşağıda.
- **B. Font self-host — ERTELENDİ (Zeynep kararı 2026-07-24):** CDN ile devam. Font swap'ı Capacitor/native aşamasında, **Mac + gerçek cihaz + render doğrulaması** varken yapılacak. Şimdi tipografi regresyonu riski alınmıyor. CDN olduğu gibi kaldı.
- **D. Capacitor iOS scaffold — ✓ TAMAM** (commit `91c6f0c`). `kanji-atlas/native/` izole klasör; index.html'e dokunulmadı. Bkz aşağıda.
- C (audioMode) / E (Mac build) — beklemede. Öncelik (Zeynep): onboarding, IA, native wrapper.

## D. CAPACITOR SCAFFOLD — ne kuruldu (commit 91c6f0c)
İzole `kanji-atlas/native/` klasörü — **web koduna sıfır dokunuş** (index.html byte-aynı):
- `package.json` — `@capacitor/core` + `@capacitor/ios` + `@capacitor/preferences` (+ cli). Scriptler: `sync-www`, `cap:add:ios`, `cap:sync`, `ios`.
- `capacitor.config.json` — appId **`app.zeynepkaya.japonca`**, appName "Japonca Yazı Atlası", webDir `www`, iOS bg `#F4EEE3` + contentInset always + https scheme.
- `scripts/build-www.mjs` — `www/`'yi `../index.html` + `../audio/` (473 dosya) + `../audio-manifest.json`'dan KURAR. Bu ortamda çalıştırıldı, doğrulandı.
- `.gitignore` — `www/`, `node_modules/`, `ios/`, `android/` git'e girmez (hepsi Mac'te üretilir / build çıktısı).
- `README.md` — Mac adımları (npm install → sync-www → cap add ios → cap sync → cap open ios), Preferences kalıcılık notu, cihaz doğrulama matrisi.
- Karar gerekçesi: web app tek doğru kaynak (`../index.html`); native kabuk onu **kopyalayarak** paketler → GitHub Pages sitesi etkilenmez, tipografi/davranış riski yok.
- **Bu ortamda YAPILAMAYAN (Mac gerekir):** `npm install`, `cap add ios`, Xcode build, cihaz testi. Scaffold hazır; `ios/` + `node_modules` Mac'te üretilecek.

## Genel — wrapping'i KOLAYLAŞTIRAN gerçekler
- Çalışma zamanı ağ çağrısı YOK (fetch/XHR yok; ses manifesti gömülü). CDN-font hariç tamamen offline.
- Service worker YOK → WKWebView çakışması yok. safe-area zaten kullanılıyor. 473 ses dosyası (91/91 kanji "recorded").

## Risk haritası (sıralı)
| # | Risk | Şiddet | Durum |
|---|---|---|---|
| 1 | localStorage kalıcılığı | KRİTİK | **✓ ÇÖZÜLDÜ (web-tarafı):** `makeStorageBackend()` (native Preferences write-through senkron-ayna) + `hydrateDurableBackend()` boot gate + lifecycle flush (pagehide/visibilitychange→save). Mac'te: `@capacitor/preferences` + boot'ta await. Test 9/9. |
| 2 | TTS (speechSynthesis) | YÜKSEK | Beklemede (Native-C). Mitigasyon hazır: 611 ses dosyası bundle'da → native'de audioMode dosya-öncelikli yap, TTS fallback. Cihazda doğrula. |
| 3 | CDN font | ORTA | **ERTELENDİ (Zeynep):** Mac + cihaz aşamasında. CDN kaldı. Bulgular aşağıda. |
| 4 | Ses bundle | DÜŞÜK | `build-www.mjs` `www/audio/`'ya kopyalıyor (473 dosya doğrulandı). |
| 5 | safe-area/lifecycle | DÜŞÜK | lifecycle flush eklendi; contentInset always config'de; safe-area cihazda doğrula. |

## B. FONT SELF-HOST — ARAŞTIRMA BULGULARI (kritik — kör swap regresyon yapar)
Fontlar: Noto Sans JP (400/500/700), Shippori Mincho (400/500/600/700/800), Klee One (3 kullanım). Araçlar hazır: fonttools+pyftsubset+brotli, chromium (doğrulama).

**Glif seti:** 374 benzersiz JP + 117 Latin (Türkçe ş/ğ/ı/İ/ç/ö/ü hepsi metinde var).

**Kapsam bulguları (@fontsource woff2):**
- `japanese` ana subset'i bazı **radikal gliflerini içermiyor**: 亻 氵 灬 艹 忄 扌 — ama bunlar @fontsource'un **numaralı subset dosyalarında** var (noto-...-50/33/31/21/40/39). Yani toplanabilir.
- **电 (U+7535) hiçbir Noto/@fontsource dosyasında YOK** (basitleştirilmiş Çince biçimi) → CDN'de de fallback'e düşer; self-host'ta da düşer (regresyon değil, mevcutla aynı).
- **Türkçe ş/ğ/ı/İ/Ş/Ğ hem Noto hem Shippori latin-ext'te YOK** → zaten system-ui'ye düşüyor (mevcut davranış; bilinen serif-başlık Türkçe sorununun kökü). Self-host bunu değiştirmez.

**Sonuç:** Self-host FİZİBİL ama = 3 aile × ~5-6 ağırlık × çok-subset-birleştir+subset+CSS+swap + chromium parite doğrulaması. Kör/kısmi swap uygulamanın çekirdek tipografisini kırar. **Zeynep kararı: Mac + cihaz aşamasına ertelendi; CDN korundu (regresyon yok).**

**Doğru yol (Mac aşamasında, iki seçenek):**
- **B1 (küçük, tavsiye):** Merged @fontsource subset'lerini glif setine subset'le → aile-ağırlık başına küçük woff2 (`fonts/`). system-ui fallback korunur (Türkçe mevcut davranış). chromium offline'da her kritik glif için parite doğrula (CDN ile aynı render). Sonra CDN'i sök. **Cihazda göz-kontrolü ile kapat.**
- **B2 (standart, büyük):** @fontsource woff2'leri olduğu gibi bundle + unicode-range CSS (subset riski yok, bundle daha büyük).

## Bu ortamda yapılabilir / Mac gereken
Yapılabilir: ✓ Capacitor scaffold (yapıldı), audioMode kararı, (ertelenen) font pipeline. Mac: `npx cap add ios`, Xcode build, cihaz testi (persistence/TTS/safe-area/offline/lifecycle), font swap + görsel doğrulama.

## Önerilen sıra (güncel)
A ✓ → D scaffold ✓ → **C audioMode dosya-öncelikli (bu ortamda yapılabilir, SIRADAKİ native işi)** → Mac: font (B1) + `cap add ios` + build + cihaz matrisi.
