# AUTHORING BATCH 19 — 白 ARAŞTIRMA + GİZLİ TASLAK · UYGULAMA PLANI

> Bu plan **ürün dosyasına dokunulmadan ve araştırma sonucu bilinmeden önce** yazıldı; teslimin
> ilk commit'idir (§2). Yeni ürün kararı üretmez. Sözleşme ile çelişirse **sözleşme kazanır**.

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-AUTHORING-BATCH-19-SHIRO-DRAFT.md` · SHA-256 `7421d66554376e1c0bf1e90e2268c9460161ad125a48ed0a8203d27036aba971` |
| Taban | `ac7698f65218644df97a2cbfe66245aea319ee20` — **doğrulandı**, dal bu commit'ten açıldı |
| Dal | `content/authoring-19-shiro-draft-2026-08-07` |
| Kapsam | **yalnız `白`** · araştırma + (koşullu) **kullanıcıya kapalı** `drafted` taslak |
| Kapsam dışı | `今`, `九`, `南`, `百`, `白い`, diğer kayıtlar · reviewed açılışı · uyumlama · tartışmalı-köken ürün deseni · Content Freeze · `main`/deploy/native/store |

---

## 1. Taban ve başlangıç kaydı (ölçüldü)

```
git rev-parse HEAD      → ac7698f65218644df97a2cbfe66245aea319ee20   ✅
git status --porcelain  → 0 satır (temiz)                            ✅
ac7698f "docs(kanji-atlas): pass Batch 18 Ima hold" · origin/codex/… @ 106f8da atası ✅
```

Taban sayımları sözleşme §8 ile **birebir**: 98 karakter · 58 reviewed · 1 drafted (`九`) ·
30 legacy · 88 görünür köken · mnemonic 74 `not_required` / 2 `active` / 0 `pending_review` /
22 alansız · `CONTENT_HASH = 475592a4bd20617e`.

`白` başlangıç durumu (§7 önkoşulları):

| Alan | Ölçülen |
|---|---|
| `id` / `character` | `shiro` / `白` |
| `etymology` | **yok** ✅ |
| `mnemonic` | **yok** ✅ |
| `pictogram_note` | `""` ✅ |
| `memory_hint_tr` | `""` ✅ |
| kategori · okumalar · örnekler | `Renkler` · ハク / しろ · `白`, **`白い / shiroi`**, `面白い / omoshiroi` |
| `n5_words` | `["shiroi"]` |

`百` (hyaku) kaydı da ölçüldü: `etymology` yok, `pictogram_note: ""` — yani **白 ses bileşeni
anlatısı şu an mevcut değil**; bu parti onu ne ekler ne değiştirir.

---

## 2. Araştırma kapısı (§3) — veri yazmadan önce

Sıra ve yöntem:

1. **Kanjipedia (ZORUNLU)** — `白` karakter sayfası **`0005607600`** canlı açılacak; karakter
   üstverisi (部首 · 画数 · 音/訓) ve `字源・成り立ち` **özgün Japoncasıyla**, kesin URL ve
   erişim tarihiyle kaydedilecek. Açılamazsa **hiçbir taslak yazılmaz** (B).
2. **説文解字** — güvenilir dijital nüshadan **özgün girdi**; `段注` ve `康熙字典`
   **ayrı katman** olarak etiketlenecek (説文'nin kendisiyle karıştırılmayacak).
3. **Dong Chinese · Wiktionary · OK辞典** — erişilebildiği ölçüde. Basılı 白川静 / 藤堂 veya
   modern paleografi kaynağının **doğrudan, doğrulanabilir** alıntısı bulunursa matrise
   eklenecek; **ikincil özet, kaynak adına konuşturulmayacak**.
4. **Aday teoriler özellikle aranacak, hiçbiri doğru varsayılmayacak:**
   palamut/tohum · tırnak · kafatası/baş · gün doğumu/ışık · pirinç tanesi.
   Kaynakta bulunmayan teori yalnız **"bulunamadı"** diye kaydedilecek.
5. **Modern `白` glifi tarihsel biçimin yerine kullanılmayacak**; çizgilerden hikâye
   türetilmeyecek (日 + 丿 türü bir çözümleme kaynak desteği olmadan kurulmayacak).
6. **Kaynak matrisi — beş iddia alanı:**
   (a) betimlenen nesne/görsel olgu · (b) oluşum türü · (c) tarihsel parçaların/işaretlerin
   rolleri · (d) biçimden **"beyaz/aydınlık"** anlamına geçiş · (e) aday teorinin **modern
   paleografik desteği ve kaynağın bağımsızlığı**.
7. Her ayrılık şu sınıflardan biriyle etiketlenecek: **ortak omurga · çıkarılabilir ayrıntı ·
   mekanizma belirsizliği · bütünsel çöküş**.

**Bağımsızlık kuralı (§3 son paragraf):** kaynak sayısı tek başına uzlaşı değildir. Aynı eski
iddiayı birbirinden kopyalayan siteler **bağımsız oy sayılmaz**; her kaynağın iddiayı nereden
aldığı matriste ayrıca not edilecek. Kanjipedia zorunludur ama **tek başına** görünür iddiayı
taşımaya yetmez.

Erişim yöntemi `WebFetch` / `WebSearch`. Sayfa erişilemezse rapora yazılır; başka bir yolla
(curl/script/arşiv) içerik çekilmez.

**Ölçülecek iki ayrı iddia:** *tarihsel biçim ne gösteriyor* ile *"beyaz" anlamına nasıl
geçildi* birbirine karıştırılmadan, ayrı satırlarda değerlendirilecek.

---

## 3. Karar ağacı (§4) — sonucu araştırma belirler

### A — savunulabilir ortak omurga VARSA

`白` kaydına **yalnız** şunlar eklenir:

```
etymology.qaStatus        : "drafted"      ← kullanıcıya KAPALI (kokenOf → null)
etymology.reviewedAt      : YOK
etymology.summaryTr       : en fazla 2–3 kısa, sade Türkçe cümle
etymology.formationType / formationTypeSource : yalnız desteklenen ölçüde
etymology.confidence      : GÖRÜNÜR iddiaların EN ZAYIF HALKASINI ölçer
etymology.sources         : zorunlu Kanjipedia + gerçekten kullanılanlar
etymology.disagreementNote: iddia matrisi + doğrudan alıntılar + ayrılıklar
mnemonic                  : { "status": "pending_review" }   ← textTr YOK
```

Ayrılık **yalnız mekanizmada** kalırsa nötr kalıp kullanılabilir:
`Daha sonra 'beyaz' anlamında kullanılmaya başlanmıştır.`
**Bu kalıp nesne/olgu omurgası yoksa KULLANILAMAZ** (§4A son cümlesi).

### B — savunulabilir ortak omurga YOKSA

Ürün verisine **hiç yazılmaz**; rapor + kanıt teslim edilir, `HOLD` verilir, durulur.
**Sayım hedefi uğruna aday teorilerden biri seçilmez veya bunlar birleştirilmez** (§4B).

---

## 4. İzin verilen dosyalar (§6)

| Dosya | A | B |
|---|---|---|
| `…/plans/2026-08-07-AUTHORING-BATCH-19-SHIRO-DRAFT-PLAN.md` | ✅ | ✅ |
| `…/reports/2026-08-07-AUTHORING-BATCH-19-SHIRO-DRAFT.md` | ✅ | ✅ |
| `…/evidence/2026-08-07-authoring-19-shiro-draft/**` | ✅ | ✅ |
| `_faz2/apply_authoring_19_shiro_draft.js` (yeni) | ✅ | ✗ |
| `index.html` | ✅ | ✗ |
| `_faz2/data_chars.json` · `_faz2/content_manifest.json` (generator çıktısı) | ✅ | ✗ |

Başka hiçbir dosyaya dokunulmaz.

---

## 5. Uygulama sırası (§10 commit düzeni)

1. **Plan commit'i** (bu dosya) — ürün dosyası değişmemiş olacak.
2. **Araştırma/matris commit'i** — kaynak alıntıları + beş alanlı matris + bağımsızlık
   değerlendirmesi + A/B kararı. **Veri hâlâ yazılmadı.**
3. **A ise** `_faz2/apply_authoring_19_shiro_draft.js` yazılır (§7 güvenceleri `throw` ile),
   bir kez koşturulur; `generate_data_chars.js` koşturulur, ikinci koşum diff üretmemeli,
   `--check` exit 0 → **uygulama commit'i**. **B ise bu commit yoktur.**
4. **Rapor + ham kanıt commit'i** (sayım, semantik diff, DOM, negatif, gate logları).
5. Bundle oluşturulur, doğrulanır, teslim edilir. **DUR.**

### Betiğin güvenceleri (§7)

Yalnız `shiro`/`白` kaydını bulur · başlangıçta `etymology`/`mnemonic` **yokluğunu** ve iki boş
legacy alanını (`pictogram_note`, `memory_hint_tr`) doğrular · beklenen durum yoksa **yazmadan**
`throw` · eski kaydı kaynakta `JSON.stringify` ile **birebir** bulmadan replace etmez ·
değişmez alanları öncesi/sonrası karşılaştırır · ikinci koşumda non-zero döner ve **hiçbir
dosyayı değiştirmez** · görünür metinde kaynak adı, tartışma dili, **kesinliği aşan teori** ve
**modern çizgi hikâyesi** bulunmadığını doğrular.

---

## 6. Değişmez alanlar (§5)

`character`, anlamlar, kategori, okumalar, örnekler ve **`白い / shiroi`** ·
`components`, `component_meanings`, ilişkiler, çizim verisi ·
`pictogram_note`, `memory_hint_tr` · ses, kelime, SRS, oyun, arayüz verileri ·
**`百` içindeki 白 ses bileşeni anlatısı** ve diğer bütün DATA kayıtları.

---

## 7. Kanıt komutları

| Kanıt | Yöntem |
|---|---|
| Taban SHA + temiz ağaç | `git rev-parse HEAD` · `git status --porcelain` |
| Kanjipedia `0005607600` | kesin URL + üstveri + `字源・成り立ち` özgün metni + erişim tarihi |
| 説文解字 | özgün girdi + nüsha/URL; `段注`/`康熙` ayrı etiketli |
| Aday teoriler | beşi de tek tek arandı → bulundu/bulunamadı kaydı |
| Bağımsızlık | her kaynağın iddiayı nereden aldığı; kopya oy ayıklaması |
| Matris | beş iddia alanı × kaynak + ayrılık sınıfı |
| Sayım öncesi/sonrası | ürünün kendi `kokenOf`/`mnemonicOf` mantığı birebir |
| Semantik diff | `白` kaydının alan alan karşılaştırması + değişen kayıt sayısı |
| Generator | (A) normal + ikinci koşum diff yok + `--check` exit 0 |
| **Negatif** | (A) ikinci apply koşumu non-zero + `sha256sum` değişmemiş |
| **DOM** | gerçek Chromium: `白` gizli ve boş kartsız · `今` gizli/boş · `九` drafted/gizli · `南` görünür |
| Varsayılan gate | `npm run gates` → **14/14**, exit 0 (**temiz ağaçta**) |
| `git diff --check` | `git diff --check ac7698f HEAD` |

> Disiplin notu (Batch 18 dersi): gate koşumu **sürerken** kanıt dosyası yazılmayacak —
> runner'ın kirli-ağaç koruması haklı olarak kırmızı verir. Kanıtlar commit'lendikten sonra
> temiz ağaçta koşulacak.

DOM ölçümü depo dışında (`/tmp`), Batch E/17/18 desenindeki sahipli sunucu ve hermetik ağ
yalıtımıyla yapılır; ürün dosyasına veya test paketine kanca eklenmez.

---

## 8. Geri dönüş

```bash
# A sonucunda
git revert <uygulama commit'i>      # 白 etymology/mnemonic taşımayan hâline döner
node _faz2/generate_data_chars.js   # türevler ve CONTENT_HASH tabana döner
# B sonucunda geri alınacak ürün değişikliği YOKTUR
```

veya dalı hiç birleştirmemek.

---

## 9. Durma noktası

Teslim: plan · araştırma/matris · (A ise) uygulama · rapor+kanıt commit'leri ve tek
doğrulanmış `.bundle`. Sonrasında **dururum**. Codex PASS **ve ayrı bir reviewed kararı**
olmadan `白` kullanıcıya açılamaz; `九`, editoryal uyumlama, tartışmalı-köken ürün deseni,
Content Freeze, deploy veya store işine geçmem.
