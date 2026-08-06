# Staging Altyapısı — Araştırma & Mimari Önerisi (ONAY BEKLİYOR)

> **Durum:** Yalnız araştırma + öneri. Hiçbir dosya değiştirilmedi, push/DNS yapılmadı. Onayından sonra adım adım kurulum rehberi hazırlanacak.

## 1. Doğrulanan teknik gerçekler (bu oturumda)

**Origin izolasyonu:** `staging.zeynepkaya.app` bir **alt alan adıdır** ve `zeynepkaya.app`'ten **ayrı origin**'dir. Tarayıcı `localStorage`'ı origin (şema+host+port) başına ayırır; alt alan adları arasında **paylaşılmaz**. Yani alt alan adı, aradığın izolasyonu (ayrı localStorage/cookie/cache) sağlar. → Hedef mimari doğru.

**Mevcut DNS (canlı sorgu):** `zeynepkaya.app` apex → doğrudan **GitHub Pages IP'leri** (`185.199.108.153`, IPv6 `2606:50c0:800x::153`). Yani DNS **Cloudflare proxy'sinde değil**, bir kayıt sağlayıcısında duruyor. `staging.zeynepkaya.app` **henüz yok** (çözülmüyor). → Cloudflare'in "branch alias → subdomain" özelliği *proxied CF DNS* ister; bu bizde yok. Ama buna **ihtiyaç da yok** (aşağıda).

**GitHub Pages sınırı (doğrulandı):** Bir repo başına **yalnız bir** custom domain/subdomain (`CNAME` dosyası 1-e-1 eşleme). İkinci origin için **ayrı repo** şart. → GitHub Pages ile staging = ayrı repo + senkron yükü.

**Cloudflare Pages (doğrulandı):** GitHub repo'suna bağlanır, **production branch seçilir**, push'ta **otomatik deploy**; her proje ücretsiz `*.pages.dev` origin'i alır; harici DNS'te bile **CNAME ile custom domain** eklenebilir. Framework yoksa build command boş, output dir seçilir.

## 2. Öncelik sırası (senin)
1. Production'a sıfır risk · 2. Ayrı origin · 3. Otomatik deploy · 4. Tek-tık branch publish · 5. En az bakım.

## 3. Seçenekler — karşılaştırma

| Seçenek | Prod riski | Ayrı origin | Oto-deploy | Tek-tık branch | Bakım | Not |
|---|---|---|---|---|---|---|
| **Cloudflare Pages** (repo bağla, prod branch=faz2-kalem1) | **Sıfır** — main/Pages/apex'e dokunmaz, salt-okunur build | **Evet** (`.pages.dev` veya subdomain) | **Evet** (push→deploy) | **Evet** (dashboard'da branch seç) | **En az** (static, repo sync yok) | En temiz |
| İkinci GitHub repo + GitHub Pages + subdomain | Düşük ama repo-sync riski | Evet (ayrı repo → subdomain) | Kısmî (Action gerekir) | **Hayır** (branch değil ayrı repo; içerik kopyalanmalı) | **Yüksek** (faz2-kalem1'i sync tut) | GH tanıdık ama hantal |
| GitHub Actions → ikinci Pages hedefi | — | Aynı repoda **imkânsız** (repo başına 1 Pages) | — | — | — | Yine ayrı repo gerektirir |
| Netlify | Sıfır | Evet | Evet | Evet | Az | **Sende yok / istemiyorsun** → eleme |
| Vercel | Sıfır | Evet | Evet | Evet | Az | CF ile eşdeğer; ek hesap, tercih değil |

## 4. ÖNERİ → **Cloudflare Pages**

**Neden bunu seçiyoruz (teknik gerekçe):**
- **Production'a sıfır risk:** CF Pages repo'ya *salt-okunur* build erişimiyle bağlanır; `main`'i, GitHub Pages kaynağını ve apex DNS'i (production) **hiç değiştirmez**. Ayrı servis, ayrı origin. GitHub Pages tarafı olduğu gibi kalır.
- **Ayrı origin garantisi:** `<proje>.pages.dev` **anında** farklı origin → production `kana_state` ile temas imkânsız. (İstersen sonra `staging.zeynepkaya.app`.)
- **Otomatik deploy + tek-tık branch:** dashboard'da production branch = `faz2-kalem1` seçilir; her push'ta otomatik yayınlanır. GitHub Pages ile bunu yapmak ayrı repo + Action ister.
- **En az bakım:** static site, build yok, repo-sync yok, ücretsiz. İkinci-repo seçeneğindeki "faz2-kalem1'i staging repo'ya kopyalama" yükü **yok**.
- İkinci GitHub repo seçeneği çalışır ama "tek-tık branch publish" ve "en az bakım" önceliklerinde **kaybeder** (repo başına 1 custom domain → içerik kopyalama/sync şart).

## 5. İki katmanlı dağıtım (risksiz yol)

**Katman 1 — MVP (sıfır DNS, hemen):** CF Pages projesi, production branch=`faz2-kalem1`, output dir=`kanji-atlas` → **`kanji-atlas-p05.pages.dev`** gibi bir URL. Ayrı origin, DNS'e dokunmadan. **Telefon testini bununla yaparız.**

**Katman 2 — İsteğe bağlı, sonra (`staging.zeynepkaya.app`):** Mevcut DNS sağlayıcında **tek yeni CNAME kaydı**: `staging → <proje>.pages.dev`. Bu **apex'e (production) dokunmaz** — apex A-kayıtları GitHub Pages'te kalır; `staging` bağımsız yeni bir kayıttır. Nameserver taşımaya **gerek yok** (CF Pages harici DNS'te CNAME ile custom domain destekler). Yani "gerçek HTTPS + `staging.zeynepkaya.app`" da production'a sıfır riskle elde edilir.

## 6. Onay sonrası (henüz YAPILMADI — rehber hazırlanacak)
1. Cloudflare hesabı → Pages → **Connect to Git** → `zeynepbtc/apps` (salt-okunur build izni; GitHub App yalnız bu repoya).
2. Production branch = **`faz2-kalem1`**, build command **boş**, output dir **`kanji-atlas`**, framework **None**.
3. İlk deploy → `.pages.dev` URL doğrula (ayrı origin).
4. (Opsiyonel) Custom domain `staging.zeynepkaya.app` → DNS'te CNAME → CF doğrular + cert.
5. Telefon smoke (ayrı doküman: `P0-5A-staging-deploy-ve-telefon-smoke.md`).

**Küçük temizlik notu:** `faz2-kalem1`'de daha önce eklediğim `netlify.toml` Cloudflare için **etkisiz** (CF dashboard ayarları kullanılır). Kurulumda istersen kaldırırız; şu an dokunmuyorum.

---
**Karar bekliyorum:** Cloudflare Pages'i onaylıyor musun? Onaylarsan §6'yı **adım adım eksiksiz kurulum rehberine** (ekran ekran: Cloudflare hesabı → repo bağlama → branch/build ayarları → ilk deploy → doğrulama → opsiyonel subdomain+DNS) çeviririm. Farklı bir seçenek istersen ona göre hazırlarım.

## Kaynaklar
- Cloudflare Pages — custom branch aliases: https://developers.cloudflare.com/pages/how-to/custom-branch-aliases/
- Cloudflare Pages — GitHub integration: https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/
- Cloudflare Pages — branch build controls: https://developers.cloudflare.com/pages/configuration/branch-build-controls/
- GitHub Pages — custom domain (repo başına bir domain): https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
- GitHub community — one repo / multiple subdomains tartışması: https://github.com/orgs/community/discussions/164202
