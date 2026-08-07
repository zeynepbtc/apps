# AUTHORING BATCH 20 — 九 NİHAİ DURUM KAPISI · UYGULAMA PLANI

> Bu plan **ürün dosyasına dokunulmadan önce** yazıldı; teslimin ilk commit'idir (§3).
> Yeni ürün kararı üretmez, yeni köken hikâyesi aramaz. Sözleşme ile çelişirse
> **sözleşme kazanır**.

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-AUTHORING-BATCH-20-KYUU-DISPOSITION.md` · SHA-256 `1f02bf203707f1daedf344b59959e1b290e154305c2b2d5203a2b6a5c2b58dd8` |
| Taban | **`70e1ef25fa66ee3eef00816164ae95f98c38a538`** — sözleşme §7.1'de zorunlu kılınan SHA |
| Dal | `content/authoring-20-kyuu-disposition-2026-08-07` |
| Kilitli sonuç | **B / HOLD** — `九` drafted · confidence C · kullanıcıya kapalı **kalır** |
| Ürün dosyası değişikliği | **0** (bayt-identik kalacak) |

## 0. Taban SHA notu — açık kayıt

Talimatta dal `699fcc2172ab5a4b7cb8d24ac4e05f16a887f9b5` (koordinasyon ucu) üzerinden
istenmişti; sözleşme §7.1 ise tabanı **`70e1ef25…`** olarak zorunlu kılıyor.
İkisi arasındaki **tek fark** `699fcc2`'nin eklediği sözleşme belgesinin kendisidir
(`git diff --name-only 70e1ef2 699fcc2` → yalnız
`_AGENT_EXCHANGE/codex/specs/2026-08-07-AUTHORING-BATCH-20-KYUU-DISPOSITION.md`).

**Seçim:** sözleşme kazanır → dal `70e1ef25…` üzerinden açıldı; kabul ölçütü §7.1 birebir
sağlanıyor. Sözleşme metnini `origin/codex/kanji-atlas-coordination`'dan okudum, içerik
kaybı yok. Bu tercih raporda da yazılıdır; Codex isterse dal `699fcc2` üzerine yeniden
kurulabilir (ürün etkisi sıfırdır).

---

## 1. Taban doğrulaması ve mevcut `九` kaydının özeti (§3)

```
git rev-parse HEAD      → 70e1ef25fa66ee3eef00816164ae95f98c38a538   ✅
git status --porcelain  → 0 satır (temiz)                            ✅
```

Taban sayımları sözleşme §2 ile **birebir**: 98 toplam · 58 reviewed · 1 drafted (yalnız `九`) ·
30 legacy · 88 görünür köken · mnemonic 74 `not_required` / 2 `active` / 0 `pending_review` /
22 alansız · `CONTENT_HASH = 475592a4bd20617e`.

### `九` (id `kyuu`) semantik özeti — ölçüldü

| Alan | Değer |
|---|---|
| `etymology.qaStatus` | **`drafted`** |
| `etymology.confidence` | **`C`** |
| `etymology.reviewedAt` | **yok** (`undefined`) |
| `etymology.formationType` / `formationTypeSource` | `象形` / `Kanjipedia` |
| `etymology.sources` | 3 URL (Kanjipedia `0001360800` · EN Wiktionary · OKJiten `kanji131`) |
| `etymology.summaryTr` | **167 karakter** — dirsek/bükülü kol iddiası **ve** "sesi nedeniyle" ifadesi içeriyor |
| `etymology.disagreementNote` | **3878 karakter** — Kanjipedia/説文/白川/Wiktionary ayrılığı + 2026-07-25 QA turu + Zeynep'in NİHAİ KARARI |
| `mnemonic` alanı | **yok** (`"mnemonic" in kayıt` → false) |
| `kokenOf(九)` | **`null`** → kullanıcıya **KAPALI** |
| `mnemonicOf(九)` | `""` → Hafıza kartı **oluşmuyor** |

Bu tablo sözleşme §2'nin tarif ettiği başlangıç durumuyla birebir örtüşüyor.

---

## 2. Bu batch'in ne OLDUĞU ve ne OLMADIĞI

**Olan:** hâlihazırda var olan kanıtın ve **Zeynep'in 2026-07-25 tarihli kararının** nihai
yayın sınıflandırmasına dönüştürülmesi. `九`'un authoring durumu **kapatılır**;
Content Freeze öncesi açık iş listesinden çıkar.

**Olmayan:** yeni araştırma, yeni teori seçimi, yeni köken metni, `reviewed` açılışı,
confidence değişikliği, metin düzeltmesi.

### Kilitli kapsam (§4)

- `九` `drafted` · confidence `C` · kullanıcıya kapalı **kalır**
- `reviewedAt` **eklenmez**
- `summaryTr`, `sources`, `disagreementNote`, formation alanları ve mnemonic **değişmez**
- `index.html`, `_faz2/data_chars.json`, `_faz2/content_manifest.json` ve tüm ürün dosyaları
  **bayt-identik** kalır
- Gizli taslaktaki **"sesi nedeniyle"** ifadesinin editoryal düzeltmesi bu batch'te
  **yapılmaz** — `EDITORYAL-UYUMLAMA-BEKLEYEN` §1'de kayıtlı, altı kayıtlık
  (四 · 六 · 七 · 八 · 東 · 九) bir **borçtur** ve ayrı uyumlama batch'ine aittir

Kapsam dışı: `今`, `白`, `南`, diğer karakterler, görünürlük politikası, tartışmalı-köken ürün
deseni, editoryal uyumlama, Content Freeze, erişilebilirlik, telefon/tablet, native, mağaza.

---

## 3. Doğrulama sırası (§5)

1. **Karar izi çapraz kontrolü** — `九`'un `disagreementNote`'undaki *"NİHAİ KARAR (Zeynep,
   2026-07-25)"* bloğu ile içe aktarılmış kanonik belgeler (`AUTHORING-DURUM-ve-FAZLAR.md`,
   `AUTHORING-03-KAYNAK-POLITIKASI.md`, `AUTHORING-PARTI14-QA-RAPOR.md`,
   `EDITORYAL-UYUMLAMA-BEKLEYEN.md`) karşılaştırılır.
2. **Kaynak matrisi özeti** — Kanjipedia `0001360800`, 説文 girdisi ve kayıtlı karşıt
   teorilerin **ortak bir nesne omurgası oluşturmadığı** özetlenir. Canlı erişim denenir;
   başarılıysa kesin URL + erişim tarihi + kısa özgün alıntı kaydedilir, **bellekten doğrudan
   alıntı üretilmez**.
3. **"Şekil dokuz nesneyi göstermez"** bulgusu — ortak ama **olumsuz** bir ifadedir; tek
   başına köken anlatısı kurmaz ve **açılma gerekçesi yapılmaz** (§5.3).
4. **Bağımsızlık ayıklaması** — yalnız anılan, açıkça reddedilen veya ikincil olarak aktarılan
   görüşler **"destek" sayılmaz** (§5.4). OKJiten'in 説文'yi tekrarladığı, EN Wiktionary'nin
   tek dayanağının Sears olduğu ayrıca not edilir.
5. **Açık beyan** — kararın yeni bir araştırma sonucu **değil**, mevcut kanıtın ve kullanıcı
   kararının **nihai yayın sınıflandırması** olduğu raporda açıkça yazılır (§5.5).

---

## 4. İzin verilen yollar (§6)

```
_AGENT_EXCHANGE/claude/plans/2026-08-07-AUTHORING-BATCH-20-KYUU-DISPOSITION-PLAN.md
_AGENT_EXCHANGE/claude/reports/2026-08-07-AUTHORING-BATCH-20-KYUU-DISPOSITION.md
_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-20-kyuu-disposition/**
```

Ürün, test, paket, ses veya başka belge dosyası **değişemez**.

---

## 5. Teslim sırası (§8)

1. **plan** (bu dosya)
2. **kaynak/karar doğrulama kanıtı** (matris + canlı alıntılar + karar izi)
3. **rapor + koşum kanıtları** (sayım, DOM, gate logları)
4. tek doğrulanmış `.bundle` → **DUR**

> Disiplin notu (Batch 18/19 dersi): gate koşumu **sürerken** kanıt dosyası yazılmaz; kanıtlar
> commit'lendikten sonra **temiz ağaçta** koşulur.

---

## 6. Kanıt komutları (§7)

| Kanıt | Yöntem |
|---|---|
| Taban SHA + temiz ağaç | `git rev-parse HEAD` · `git status --porcelain` |
| `九` önce/sonra **bayt** özeti | kaydın `JSON.stringify` sha256'sı, koşum öncesi ve sonrası |
| `九` önce/sonra **semantik** özeti | alan alan karşılaştırma + `kokenOf`/`mnemonicOf` |
| Ürün dosyası farkı = 0 | `git diff --quiet 70e1ef2 HEAD -- kanji-atlas/index.html` (+ türevler) |
| Generator | `node _faz2/generate_data_chars.js --check` → exit 0, hash `475592a4bd20617e` |
| Sayımlar | ürünün kendi `kokenOf`/`mnemonicOf` mantığı birebir uygulanarak |
| **DOM** | gerçek Chromium: `九` Kökeni/Hafıza kartı **yok** · `今`/`白` boş ve kartsız · `南` görünür · `pageerror` 0 |
| Varsayılan gate | `npm run gates` → **14/14**, exit 0 (temiz ağaçta) |
| `git diff --check` | `git diff --check 70e1ef2 HEAD` |
| Değişen dosya listesi | `git diff --name-only 70e1ef2 HEAD` — hepsi §6 beyaz listesinde |

---

## 7. Geri dönüş

Geri alınacak **ürün değişikliği yoktur** — bu batch yalnız belge üretir.

```bash
git revert <rapor commit'i> <doğrulama commit'i> <plan commit'i>
# veya dalı hiç birleştirmemek
```

`九`'un kararı ileride değiştirilmek istenirse yol açıktır ve `disagreementNote` içinde
yazılıdır: `qaStatus → reviewed` + `reviewedAt` vermek yeterlidir — ki bu, şekil iddiasındaki
**C** seviyesini kabullenmek anlamına gelir. Bu batch o kapıyı **kapatmıyor**, yalnız bugünkü
durumu kanonikleştiriyor.

---

## 8. Durma noktası

Teslimden sonra **dururum**. Codex PASS vermeden editoryal uyumlama, tartışmalı-köken ürün
deseni veya Content Freeze başlatmam.
