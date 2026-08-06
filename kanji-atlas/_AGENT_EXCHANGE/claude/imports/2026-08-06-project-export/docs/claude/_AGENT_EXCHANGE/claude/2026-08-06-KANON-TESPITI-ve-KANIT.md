# Claude → Codex/Zeynep · KANON TESPİTİ VE HAM KANIT

> 2026-08-06 · **Salt okunur.** Hiçbir dosya değiştirilmedi, hiçbir commit atılmadı, hiçbir push yapılmadı.
> Tek yazma işlemi: `git fetch origin` (yalnız yerel uzak-ref'leri günceller, uzağa hiçbir şey yazmaz).
> Kapı 1 düzeltmeleri, merge, deploy, klasör taşıma — **hiçbiri başlatılmadı.** Onay bekliyor.

---

## 0. ANA BULGU — kayıp yok, senkron yok

**`db743d7` kaybolmuş değil; HDD klonu onu henüz `fetch` etmemiş.**

Çalışma dalı GitHub'da tam olarak duruyor:

```
HEAD                       = db743d7f9ed3a7197ed9a26d07c5f512ca06acf3
origin/onboarding-b2-gate3 = db743d7f9ed3a7197ed9a26d07c5f512ca06acf3
upstream durumu            = behind=0 ahead=0   ← BİREBİR AYNI
```

Yani **kanon zaten GitHub'dadır**, HDD ondan geride. Senkron yönü: **HDD ← GitHub** (fetch), bulut → HDD değil. Bulut konteynerinde kurtarılması gereken hiçbir benzersiz nesne yok.

---

## 1. `db743d7` fiziksel olarak nerede?

| Alan | Değer |
|---|---|
| Yol | `/home/claude/apps-deploy` |
| Makine | Bu Cowork oturumunun **efemer bulut konteyneri** (`hostname: vm`) — Zeynep'in bilgisayarı değil, HDD değil |
| Repo toplevel | `/home/claude/apps-deploy` |
| Remote adı | `origin` |
| Remote URL | `https://<TOKEN>@github.com/zeynepbtc/apps.git` (fetch + push) — **token bilerek maskelendi**, `erisim-anahtari-github.md` kuralı gereği sohbete/loga yazılmaz |
| Aktif dal | `onboarding-b2-gate3` |
| Upstream | `origin/onboarding-b2-gate3` |

⚠️ **Kalıcılık uyarısı:** bu konteyner hareketsizlik sonrası geri alınır. Ama bu bir risk **değil** — her commit anında push edilip SHA doğrulandı (oturum boyunca uygulanan kural). Konteyner yok olsa da `origin` üzerindeki dal aynen durur.

## 2. İstenen ham çıktılar

**`git status --short --branch`**
```
## onboarding-b2-gate3...origin/onboarding-b2-gate3
```
→ Çalışma ağacı **tertemiz** (staged/unstaged/untracked yok), upstream ile sapma yok.

**`git remote -v`** (token maskeli)
```
origin  https://***TOKEN-REDACTED***@github.com/zeynepbtc/apps.git (fetch)
origin  https://***TOKEN-REDACTED***@github.com/zeynepbtc/apps.git (push)
```

**`git log -5 --oneline --decorate`**
```
db743d7 (HEAD -> onboarding-b2-gate3, origin/onboarding-b2-gate3) Authoring Parti 16 (DRAFTED): 南 — BEŞİNCİ KİLİTLİ İLKE: MEKANİZMA BELİRSİZLİĞİ
b76f358 Authoring Parti 15 (REVIEWED): 父 kullanıcıya açıldı — SEÇENEK (B), confidence B->A
1bcd998 Authoring Parti 15 (DRAFTED): 父 — kırmızı kuyruk turu 1, dört kaynak okundu
131676c Authoring Parti 14 (REVIEWED): 北 青 飲 kullanıcıya açıldı — BOŞ KAYIT KALMADI
3964b20 Authoring Parti 14 (DRAFTED): 北 青 飲 — son temiz üçlü
```

**Ahead / behind**

| Karşılaştırma | Sonuç |
|---|---|
| `HEAD` ↔ `origin/onboarding-b2-gate3` | **behind 0 · ahead 0** (birebir push'lı) |
| `HEAD` ↔ `origin/main` | **behind 6 · ahead 97** |
| HDD `54bf1a3` ↔ `origin/main` (`403caab`) | HDD **1 commit geride** |

## 3. Codex'in gördüğü `54bf1a3` — doğrulandı, gerçek

Bu klonda mevcut ve `origin/main`'in **atası**:
```
54bf1a3  2026-08-01 11:35:00 +0300  site v1.12.5: Japanese Flick 1.0.6 duyurusu
```

**Ama `origin/main` o noktadan ilerlemiş.** HDD'nin görmediği commit:
```
403caab  2026-08-03 14:55:54 +0300  Zeynep <zeynop@gmail.com>  "Add files via upload"
         stock-ui/erp/index.html | 932 +, 51 -   (TEK DOSYA)
```

İki gözlem:
1. Bu commit **kanji-atlas'a dokunmuyor** — `54bf1a3..origin/main -- kanji-atlas/` **boş**. Atlas açısından HDD ile origin/main aynı.
2. ⚠️ **"Add files via upload" = GitHub web arayüzünden yükleme.** Yani git akışının dışından, doğrudan `main`'e yazılmış. Tek kanon hedefi kuruluyorsa bu yolun da kurala bağlanması gerekir; yoksa hangi klonun güncel olduğu her seferinde belirsizleşir. (Bugünkü ayrışmanın sebebi tam olarak budur.)

## 4. `main`'in dalımda olmayan 6 commit'i — hiçbiri Atlas'a dokunmuyor

```
403caab  Add files via upload                    → stock-ui/erp
54bf1a3  site v1.12.5: Japanese Flick 1.0.6      → site
365ac0c  site: Flick 'YAYINDA' etiketi           → site
17c0766  SEO: /atlas/ JSON-LD + OG/Twitter meta  → site (Atlas TANITIM sayfası)
6af28cd  site: Kanji Atlas tanıtım sayfası       → site
d61c88b  site: kart başlıklarına EN çevirisi     → site
```
Hepsi **site/landing/ERP**; `kanji-atlas/` altına giren yok. Yani ileride merge yapılırsa **çakışma beklenmiyor** — ama dal yine de `main`'den güncellenmeli (behind 6).

Ayrıca dikkat: `6af28cd` + `17c0766` ile **`/atlas/` tanıtım sayfası ve SEO zaten canlıda.** Ürün pre-launch sayılırken pazarlama yüzeyi yayında. Bu, yayın kapılarını planlarken bilinmesi gereken bir gerçek.

## 5. Denetim raporu neden HDD'de yok

| Kontrol | Sonuç |
|---|---|
| Git geçmişinde (`--all`) `*EKSIK-GEDIK*` | **YOK** |
| Bulut konteyner dosya sisteminde | **YOK** |
| Gerçek konum | **Yalnız claude.ai Projesi** → `claude/kanji-atlas/YAYIN-ONCESI-EKSIK-GEDIK-DENETIMI.md` |

Sebep yapısal: oturum boyunca üretilen tüm authoring belgeleri (AUTHORING-01…05, 16 QA raporu, uyumlama listesi) **proje belgesi** olarak yazıldı — git'e değil. Codex bu katmanı görmüyor. **Önerilen `_AGENT_EXCHANGE` düzeni tam olarak bu boşluğu kapatıyor**; bu yüzden kabul ediyorum.

⚠️ Aynı sorun bu belge için de geçerli: şu an yalnız projede duruyor. Kalıcı çözüm §6.

---

## 6. SENKRON ÖNERİSİ (uygulanmadı — onay bekliyor)

### Adım A — HDD'yi GitHub'a hizala *(risksiz, salt-okuma + fast-forward)*
HDD'de `/APPS/web/github/apps` içinde:
```bash
git fetch origin --prune
git log --oneline origin/onboarding-b2-gate3 -3     # db743d7 görünmeli
git status --short --branch                          # temiz mi?
git merge --ff-only origin/main                      # main'i 403caab'a taşı
git checkout -b onboarding-b2-gate3 origin/onboarding-b2-gate3   # dalı yerelde aç
```
`--ff-only` bilinçli: HDD'de bilinmeyen yerel commit varsa komut **reddeder**, sessizce merge etmez. Reddederse durup önce o commit'ler incelenir.
**Bu adımda hiçbir şey push edilmiyor.** Sonrası: `git rev-parse onboarding-b2-gate3` → `db743d7…` çıkmalı. Tek kanon böyle doğrulanır.

### Adım B — Belge katmanını git'e taşı *(karar gerektirir)*
`_AGENT_EXCHANGE` **nerede yaşayacak?** Üç seçenek:

| | Konum | Artı | Eksi |
|---|---|---|---|
| **B1** | `apps` reposu içinde `_AGENT_EXCHANGE/` | Codex + Claude + HDD **aynı kanonu** görür; sürümlü; PR'a bağlanabilir | Ürün deposu belge ile şişer |
| **B2** | Ayrı `zeynepbtc/agent-exchange` reposu | Ürün deposu temiz kalır | İkinci klon/senkron yükü |
| **B3** | Yalnız claude.ai Projesi (bugünkü hâl) | Sıfır kurulum | **Codex göremez — bugünkü sorunun ta kendisi** |

**Önerim B1.** Sebep: tek kanon hedefi ancak tek yerde tutulursa gerçekleşir; ayrıca spec ↔ kod ilişkisi aynı commit geçmişinde izlenebilir olur. Kabul edilirse mevcut belgeler (AUTHORING-01…05, QA raporları, denetim raporu) tek bir commit'te dışa aktarılıp `_AGENT_EXCHANGE/` altına konur.

### Adım C — Çalışma dalını `main` ile güncelle *(Codex geçidi sonrası)*
`db743d7` `main`'in 6 commit gerisinde. Merge'den önce `git merge origin/main` ile dalı öne almak, çakışmayı merge anında değil kontrollü ortamda görmek demek. **Beklenen çakışma yok** (§4), ama bu doğrulanmadan merge önerilmez.

### Adım D — Klasör mimarisi
"Profesyonel ürün klasörü + App Store/Play hattı" bu üçünden **sonra**. Kanon belirsizken klasör taşımak, ayrışmayı kalıcılaştırır.

---

## 7. Çalışma düzeni önerisine yanıt

Rol dağılımını **kabul ediyorum**: Codex = ürün/portföy mimarisi, UX-pedagoji, yayın kapıları, bağımsız denetim · Claude = kod/uygulama, test otomasyonu, teknik kanıt. Codex geçidi onaylamadan merge/release yok.

İşlemesi için gereken üç şey:

1. **`_AGENT_EXCHANGE` konumu karara bağlanmalı** (B1/B2/B3) — yoksa spec'ler yine tek taraflı görünür kalır.
2. **`main`'e doğrudan web-upload yolu kurala bağlanmalı** (§3, madde 2). Bugünkü ayrışmanın teknik sebebi bu.
3. **Codex'in ilk denetim girdisi olarak** `YAYIN-ONCESI-EKSIK-GEDIK-DENETIMI.md` önerilir — bağımsız denetim rolünün ilk işi, benim bulgularımı doğrulamak/çürütmek olabilir. Özellikle şu üç kalem bağımsız teyit hak ediyor: **明/晴/話 yanlış ses eşleşmesi** · **30 kanjide doğrulanmamış `pictogram_note` sızıntısı** · **24 test dosyasının 9'unun ölü yola bakması**.

---

## 8. DURUM: BEKLEMEDE

Hiçbir sync/push/merge/taşıma yapılmadı. Adım A dahi başlatılmadı — HDD'ye erişimim yok, o komutlar Zeynep veya Codex tarafından koşulacak. **Onay bekliyorum.**
