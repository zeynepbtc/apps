# Cloudflare Pages — Staging Kurulum Rehberi (adım adım)

> **Amaç:** `faz2-kalem1` dalını ayrı origin'de staging olarak yayınlamak. Production (`zeynepkaya.app`), `main`, GitHub Pages kaynağı ve apex DNS **hiç değişmez**. CF Pages repoya salt-okunur build erişimiyle bağlanır.

## Ön koşul
- GitHub'da `zeynepbtc/apps` reposu, `faz2-kalem1` dalı push edilmiş (HEAD `247064a`). ✓
- Cloudflare hesabı (ücretsiz yeterli). Yoksa dash.cloudflare.com → Sign Up.

---

## Bölüm 1 — Repoyu Cloudflare Pages'e bağla

1. **dash.cloudflare.com** → sol menü **Workers & Pages** → **Create application** → **Pages** sekmesi → **Connect to Git**.
2. **GitHub**'ı seç → **Connect GitHub**. Cloudflare Pages GitHub App kurulum ekranı açılır.
3. **Only select repositories** → yalnız **`zeynepbtc/apps`** seç (tüm repolara erişim verme) → **Install & Authorize**. (Bu izin *salt-okunur build* içindir; `main`/Pages ayarlarına dokunmaz.)
4. Geri dönünce repo listesinde **`zeynepbtc/apps`** → **Begin setup**.

## Bölüm 2 — Build ayarları (KRİTİK)

Bu ekranda tam olarak şunları gir:

| Alan | Değer |
|---|---|
| **Project name** | `kanji-atlas-p05` (URL: `kanji-atlas-p05.pages.dev`) |
| **Production branch** | **`faz2-kalem1`** ← main DEĞİL! |
| **Framework preset** | **None** |
| **Build command** | *(boş bırak)* |
| **Build output directory** | **`kanji-atlas`** |
| **Root directory** | *(boş / `/`)* |

> Neden `kanji-atlas`: uygulama tek dosya `kanji-atlas/index.html` + `kanji-atlas/audio/`. Output dir'i `kanji-atlas` yapınca staging kökü doğrudan uygulama olur.

5. **Save and Deploy**. İlk build ~1 dk. Bitince yeşil "Success" + URL.

## Bölüm 3 — İlk doğrulama (ayrı origin)

1. Verilen URL'yi aç: **`https://kanji-atlas-p05.pages.dev`**.
2. Adres çubuğunda host **`.pages.dev`** — yani `zeynepkaya.app`'ten **ayrı origin**. ✓
3. DevTools (F12) → Console: `location.origin` → `https://kanji-atlas-p05.pages.dev` (production değil).
4. Uygulama açılıyor mu, Console'da hata var mı bak. (Boş kullanıcı gibi açılır — ayrı origin, boş localStorage.)
5. Telefon smoke için: **`P0-5A-staging-deploy-ve-telefon-smoke.md`** dokümanındaki adımlar (özellikle §A manuel veri aktarımı + güvenlik notu).

## Bölüm 4 — Otomatik deploy (kurulduktan sonra otomatik)

- `faz2-kalem1`'e her `git push` → CF Pages **otomatik** yeniden deploy eder. Ben dev'e push edince staging kendiliğinden güncellenir. Ekstra işlem yok.
- Diğer dalların push'ları ayrı **preview** URL'leri alır (production branch faz2-kalem1 olduğu için karışmaz).

---

## Bölüm 5 — (Opsiyonel, sonra) `staging.zeynepkaya.app` özel alan adı

`.pages.dev` yeterli ve sıfır-DNS. Daha kurumsal bir URL istersen, **apex'e/production'a dokunmadan**:

1. CF Pages projesi → **Custom domains** → **Set up a custom domain** → `staging.zeynepkaya.app` yaz.
2. CF sana bir **CNAME hedefi** verir (örn. `kanji-atlas-p05.pages.dev`).
3. **Mevcut DNS sağlayıcında** (nameserver'ı taşımadan) **tek yeni kayıt** ekle:
   - Tip: **CNAME**, Ad: **`staging`**, Hedef: **`kanji-atlas-p05.pages.dev`**, TTL: otomatik.
   - ⚠️ Apex (`@` / `zeynepkaya.app`) kaydına **DOKUNMA** — o GitHub Pages'te kalır (production).
4. CF doğrular + ücretsiz HTTPS cert üretir (birkaç dk). Sonra `https://staging.zeynepkaya.app` = staging.
   > Not: CF'nin "branch alias" özelliği proxied CF DNS ister; biz onu KULLANMIYORUZ. Düz custom-domain + harici CNAME, nameserver taşımadan çalışır çünkü `faz2-kalem1` projenin *production* dalı.

## Bölüm 6 — Güvenlik & temizlik

- **Sıfır production riski:** CF Pages `main`'i, GitHub Pages kaynağını, apex DNS'i değiştirmez; salt-okunur build. Staging ayrı origin → production `kana_state`'e erişemez.
- **Erişim (opsiyonel):** Staging'i gizli tutmak istersen CF Pages → **Access Policy** (Cloudflare Access) ile parola/e-posta koruması ekleyebilirsin.
- **netlify.toml:** `faz2-kalem1` kökündeki `netlify.toml` CF için **etkisizdir** (CF dashboard ayarlarını kullanır). Kalması zararsız; istersen sonra kaldırırım.
- **P0-5B'ye geçiş:** Telefon smoke yeşil olana dek KAPALI. main'e merge YOK.

---

## Özet akış
Connect to Git → `zeynepbtc/apps` → production branch **`faz2-kalem1`** → output dir **`kanji-atlas`** → Save & Deploy → `kanji-atlas-p05.pages.dev` (ayrı origin) → telefon smoke → (opsiyonel) `staging.zeynepkaya.app` CNAME.

---

## EK — Netlify alternatifi (site zaten oluşturuldu)

Netlify'ı bağladığın için MCP üzerinden staging sitesini **oluşturdum**: **`kanji-atlas-p05-staging.netlify.app`** (ayrı origin ✓, siteId `17ec7ca6-9618-486f-aef6-60de0269fd26`). Ancak MCP'nin **dosya yükleme (deploy) adımı** bu oturumda `403 Forbidden` verip bağlantısı düştü — yani siteyi oluşturabildim ama içeriği MCP ile itemedim. İki güvenilir bitiş yolu:

**Yol 1 — Netlify dashboard'dan repoya bağla (sürekli deploy, önerilen):**
1. app.netlify.com → **kanji-atlas-p05-staging** projesi → **Site configuration → Build & deploy → Link repository** (veya **Import from Git**).
2. **`zeynepbtc/apps`** → **Branch: `faz2-kalem1`** → **Publish directory: `kanji-atlas`** (kökteki `netlify.toml` zaten bunu söylüyor) → Deploy.
3. Her `faz2-kalem1` push'unda otomatik yeniden deploy.

**Yol 2 — Cloudflare Pages** (yukarıdaki ana rehber; senin onayladığın kalıcı çözüm).

> İkisi de ayrı origin, production'a sıfır risk. Netlify sitesi zaten hazır olduğu için Yol 1 en hızlısı; Cloudflare'i kalıcı olarak tercih ediyorsan ana rehber geçerli. Hangisini seçersen onu netleştir, ben ona göre ilerleyeyim. (Netlify MCP toparlarsa deploy'u ben de tekrar deneyebilirim.)
