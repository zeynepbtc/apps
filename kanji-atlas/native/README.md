# Japonca Yazı Atlası — Native Wrapper (Capacitor / iOS)

App Store saf HTML/PWA'yı reddeder; bu klasör uygulamayı **WKWebView** içinde native bir kabuğa sarar. Web kodu **değişmez** — kaynak tek doğru hâlâ `../index.html` + `../audio/`. Bu klasör yalnızca native build içindir.

## Tasarım kararı: web kodu ayrı, native kabuk ayrı
- `www/` bir **build çıktısıdır**, git'e girmez. `npm run sync-www` onu `../index.html` + `../audio/` + `../audio-manifest.json`'dan kurar.
- Böylece web uygulaması tek yerde yaşar; native tarafı onu kopyalayarak paketler. index.html'e native'e özel hiçbir şey eklenmedi.
- Depo kökü aynı zamanda `zeynepkaya.app` GitHub Pages sitesidir; bu klasör statik siteyi etkilemez (Pages package.json/config'i sayfa olarak sunmaz).

## Depolanan durum kalıcılığı (KRİTİK — çözüldü)
WKWebView'de `localStorage` sistem temizliğinde silinebilir → kullanıcı ilerlemesi kaybı. Web kodu (`index.html`) buna karşı zaten hazır:
- `makeStorageBackend()` native'de `window.Capacitor.Plugins.Preferences`'a **write-through** yazar (senkron ayna + localStorage cache).
- `hydrateDurableBackend()` açılışta Preferences'tan aynayı doldurur.
- `pagehide` / `visibilitychange(hidden)` olaylarında flush.
- Capacitor yoksa (web) → düz `localStorage` (davranış birebir aynı).

Bunun native'de çalışması için **`@capacitor/preferences` kurulu olmalı** (package.json'da var). Plugin native tarafta otomatik kaydolur; `window.Capacitor.Plugins.Preferences` cihazda erişilebilir olur.

## Gereksinimler (yalnız Mac)
- macOS + Xcode (App Store gönderimi için zorunlu; iOS build sadece macOS'ta yapılır).
- Node 18+ ve npm.
- CocoaPods (`sudo gem install cocoapods` ya da `brew install cocoapods`).

## İlk kurulum (Mac'te, sırayla)
```bash
cd kanji-atlas/native
npm install
npm run sync-www        # www/ = ../index.html + ../audio (build)
npx cap add ios         # ios/ platform klasörünü üretir (git'e girmez)
npx cap sync            # web varlıkları + eklentileri iOS projesine kopyalar
npx cap open ios        # Xcode'da açar
```
Sonra Xcode'da: imzalama takımını (signing team) seç, gerçek cihaza çalıştır.

## Web kodu her değiştiğinde (Mac'te)
```bash
npm run cap:sync        # sync-www + cap sync (tek komut)
# veya tam açılış:
npm run ios             # sync-www + cap sync + cap open ios
```

## Bu ortamda (bulut) YAPILAMAYANLAR
- `npm install`, `cap add ios`, Xcode build, cihaz testi → **Mac gerektirir**.
- Bu klasör yalnızca **scaffold** (config + build script + bu README). Native platform (`ios/`) ve `node_modules/` Mac'te üretilir.

## Cihazda doğrulama matrisi (Mac + gerçek iPhone)
| Test | Ne doğrulanır |
|---|---|
| Kalıcılık | İlerleme kaydet → uygulamayı öldür → yeniden aç → veri duruyor. Sonra cihazı yeniden başlat → hâlâ duruyor (Preferences write-through). |
| TTS / ses | Ses butonları çalıyor mu? `speechSynthesis` WKWebView'de zayıfsa → audioMode'u **dosya-öncelikli** yap (ses dosyaları bundle'da; bkz Native-C). |
| safe-area | Çentik/alt bar overlay header/nav'ı kesmiyor. |
| Offline | Uçak modunda tam çalışıyor (CDN font hariç her şey gömülü). |
| Lifecycle | Arka plana al → geri gel → state duruyor (flush). |
| Font | **Ertelendi (Zeynep kararı):** CDN font şimdilik kalıyor. Self-host'u burada, cihazda render'ı gözle kıyaslayarak yap (bkz NATIVE-WRAPPER-FIZIBILITE B1). |

## Sonraki native işler (kayıtlı)
- **Native-C:** audioMode dosya-öncelikli varsayılan (ürün kararı — cihazda TTS kalitesine bakıp).
- **Font self-host (B1):** Mac + cihaz varken; chromium parite + göz kontrolü. Şimdilik CDN.

Detay: proje belgesi `NATIVE-WRAPPER-FIZIBILITE.md`.
