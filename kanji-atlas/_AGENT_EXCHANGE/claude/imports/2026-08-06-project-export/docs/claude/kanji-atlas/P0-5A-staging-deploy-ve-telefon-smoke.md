# P0-5A — Staging Deploy + Telefon Smoke Kontrol Listesi

## Neden ayrı origin? (kritik)
`zeynepkaya.app/kanji-atlas/` (production) ve `/kanji-atlas-preview/` **aynı origin**'dedir. localStorage path'e değil **origin**'e göre ayrılır → ikisi de aynı `kana_state` anahtarını görür. Bu yüzden P0-5A migration'ı **kesinlikle ayrı bir origin'de** (örn. `*.netlify.app` / `*.pages.dev`) test edilmeli; aksi halde staging'de çalışan migration **gerçek production verini dönüştürebilir**. Production ve GitHub Pages/main **dokunulmuyor.**

## Deploy — Netlify (önerilen, config hazır)
Dal `faz2-kalem1` push edildi ve köke `netlify.toml` eklendi (`publish = "kanji-atlas"`). Adımlar (~2 dk, senin hesabında):
1. app.netlify.com → **Add new site → Import an existing project → GitHub → `zeynepbtc/apps`**.
2. **Branch to deploy: `faz2-kalem1`** seç (production değil!). Build command boş, publish dir `netlify.toml`'dan otomatik `kanji-atlas`.
3. Deploy. URL örn: `kanji-atlas-p05.netlify.app` (isim değiştirilebilir).
> Not: Sandbox'tan senin Netlify/Cloudflare hesabına giremiyorum; bu 3 adım sende. Config'i hazırladım ki tek tık olsun.

## Deploy — Cloudflare Pages (alternatif)
1. Cloudflare Pages → **Connect to Git → `zeynepbtc/apps`**.
2. **Production branch: `faz2-kalem1`**. **Build output directory: `kanji-atlas`** (build command boş).
3. Deploy → `<proje>.pages.dev`.

## GÜVENLİK sözleşmesi
- main / GitHub Pages kaynağı / `kanji-atlas-preview/` **değiştirilmez.**
- Staging **production verisini doğrudan okumaz** (ayrı origin → localStorage boş başlar).
- P0-5A–E test + onay kapıları bitmeden `main`'e merge/push **YOK**.

---

## Telefon Smoke — senaryolar

Staging URL telefonda açılınca, ayrı origin olduğu için **boş kullanıcı** gibi başlar. "Mevcut kullanıcı migration"ı gerçekçi test etmek için aşağıdaki **manuel veri aktarımı** (app'te export/import yok, DevTools ile):

### A. Mevcut kullanıcı migration testi (manuel veri aktarımı)
Uygulamada export/import özelliği yok; bu yüzden production `kana_state`'i elle taşıyoruz.
> **GÜVENLİK:** Production blob'u **kişisel notlarını (mnemonic/userHints)** içerebilir. **Asla** herhangi bir sohbete, mesajlaşmaya veya üçüncü-taraf forma yapıştırma; **yalnız staging sayfasının DevTools konsolunda** kullan.

1. **Önce staging URL'nin ayrı origin olduğunu doğrula** (§B). Aynı origin ise DURDUR.
2. **Masaüstü tarayıcıda** `zeynepkaya.app/kanji-atlas/` aç → DevTools (F12) → Console:
   `copy(localStorage.getItem('kana_state'))` → production blob panoya kopyalanır. (Bu **production'ı değiştirmez**, yalnız okur.)
3. **Production sekmesini kapat.**
4. **Staging** URL'yi aç → DevTools → Console. **Önce staging'in mevcut state'ini ayrıca kaydet** (üstüne yazmadan önce güvence):
   `window._stagingBak = localStorage.getItem('kana_state')`
5. Production blob'u staging origin'ine yaz + reload:
   `localStorage.setItem('kana_state', <yapıştır tırnak içinde>)` → sayfayı **yenile**.
6. **Migration sonrası doğrula** (Console + gözle):
   - `JSON.parse(localStorage.getItem('kana_state')).schemaVersion` → **2**
   - `userHints` **birebir aynı** (kişisel notların korundu)
   - mevcut **güçlü SRS kayıtları değişmemiş** (kanji mastery/sayaç aynı)
   - kana **seed kayıtları `mastery:1`**, **`last:null`**, **`next:null`**
   - legacy `kana` / `learned` / `status` aynaları **korunmuş**
   - `localStorage.getItem('kana_state.bak.v1')` → `{sourceHash,createdAt,raw}`; **raw = migration öncesi v1 veri**
   - **ikinci reload'da** state **tekrar değişmiyor** (idempotent): yenile → tekrar bak, aynı.
   - Console'da **hata yok**; kana ilerlemen görünür (eski "bildiğin" kana kilitli/sıfır değil); kanji review kuyruğu bozulmamış.

### B. Temiz kurulum
1. Staging'i **gizli/incognito** pencerede aç (boş localStorage).
2. Onboarding akışı çalışır, uygulama hatasız açılır.
3. Kana/Kanji/Yazı/Oyunlar sekmeleri, scroll, geri tuşu akıcı.

### C. Reset senaryoları (P0-5A reset-full düzeltmesi)
1. Profil → **Profili sıfırla** (full reset): profil temizlenir, onboarding'e döner. Reload sonrası veri gerçekten temiz (schemaVersion 2, srs boş).
2. **İlerlemeyi sıfırla** (progress-only): ilerleme sıfırlanır ama kişisel notların (mnemonic/userHints) **korunur**.
3. (İleri) Bozuk veri koruması: Console'da `localStorage.setItem('kana_state','{bozuk')` → reload → uygulama açılır, "veri koruma modu" davranışı; reset denenirse "Veri koruma modu açıkken sıfırlanamaz" mesajı; bozuk ham veri **silinmez**.

### D. Genel akış / gerçek kullanım
1. Kana çiz, kanji çalış, mini test, oyun oyna — mastery/review güncelleniyor.
2. Ses: dosya varsa çalar, yoksa cihaz TTS. (Staging'e audio klasörü de deploy edildi.)
3. Telefonu kapat-aç, uygulamaya dön — ilerleme kalıcı (aynı origin, aynı cihaz).

---

## Durum tablosu (geçiş kararı)
```
P0-5A kod + otomatik testler        : YEŞİL  (97 node + tarayıcı, 0 hata)
Ayrı-origin deploy (Cloudflare)     : YEŞİL  → kanji-atlas-p05.zeynop.workers.dev
Masaüstü staging sentetik migration : YEŞİL  (ver=2, SEED あ mastery1/last-next null, ichi=kanji, quarantine, hint korundu, backup)
Telefon + gerçek-veri storage smoke : BEKLİYOR (opsiyonel ek güvence)
P0-5B'ye geçiş                      : KAPALI (Zeynep onayına dek)
```
**Deploy notu:** Cloudflare Workers static-assets, ZIP sürükle-bırak ile (Git bağlantısız). Netlify MCP deploy'u bu oturumda 403/permission düştü; site `kanji-atlas-p05-staging` oluşturuldu ama içerik itilemedi — Cloudflare kullanıldı.

**ÇALIŞAN staging (doğrulanmış):** `kanji-atlas-p05.zeynop.workers.dev` (ZIP deploy, P0-5A build). Migration burada kanıtlandı.

**Git auto-deploy — ✅ KURULDU (2026-07-22):** `kanji-atlas-staging` Worker Git'e bağlı (`zeynepbtc/apps`), **Production branch = `faz2-kalem1`**, `wrangler.jsonc` (assets=kanji-atlas, SPA fallback). Her `faz2-kalem1` push'unda **otomatik build + deploy**.
- **KANONİK STAGING URL (otomatik güncellenen):** **`https://kanji-atlas-staging.zeynop.workers.dev/`** ← bundan sonra bunu kullan.
- Doğrulandı: push `eadc5ed` (faz2-kalem1) → build yeşil → active deployment %100 (version 96ea1cef). İçerik P0-5A (assets kanji-atlas).
- Eski manuel ZIP staging `kanji-atlas-p05.zeynop.workers.dev` hâlâ duruyor (P0-5A snapshot); artık gerekmiyor, istenirse silinebilir.
- **İş akışı:** Claude `faz2-kalem1`'e push eder → `kanji-atlas-staging...workers.dev` kendini günceller. Zeynep hiçbir şey yapmaz.
- Not: Cloudflare kurulumda repoda `cloudflare/workers-autoconfig` / `setup-auto-update` dalları + bir `main` build üretmiş olabilir (zararsız gürültü).
Telefon testi yeşil olunca P0-5A kapatılır ve **P0-5B — Kana SRS yazma yolları** açılabilir. Bu aşamada migration koduna **yeni özellik eklenmez**; staging'de sorun çıkarsa yalnız P0-5A kapsamında düzeltilir.

## Test sonrası
- Hepsi yeşilse → P0-5A "gerçek kullanım döngüsü" şartı tamam → **P0-5B onayına** geçebiliriz.
- Sorun çıkarsa → not al (senaryo + adım + beklenen/gerçek), düzeltip staging'i güncellerim (dev dalına push → Netlify otomatik yeniden deploy).
- **Telefon testi yeşil olmadan P0-5B YOK.**

## Git durumu
- `faz2-kalem1` HEAD = `247064a` (netlify.toml + test kanıtı + reset düzeltmesi + migration). Remote ile senkron.
- `main` / production: **dokunulmadı.**
