# AUTHORING BATCH 18 — 今 ARAŞTIRMA + GİZLİ TASLAK · UYGULAMA PLANI

> Bu plan **ürün dosyasına dokunulmadan ve araştırma sonucu bilinmeden önce** yazıldı; teslimin
> ilk commit'idir (§2). Yeni ürün kararı üretmez. Sözleşme ile çelişirse **sözleşme kazanır**.

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-AUTHORING-BATCH-18-IMA-DRAFT.md` · SHA-256 `c02733cd7aadc697e84873ca657f7aee7676fcef85059cfb07ae291cbe498b65` |
| Taban | `13a62c50e5bd3da6c74b3a44b8cce82a47e9349b` — **doğrulandı**, dal bu commit'ten açıldı |
| Dal | `content/authoring-18-ima-draft-2026-08-07` |
| Kapsam | **yalnız `今`** · araştırma + (koşullu) **kullanıcıya kapalı** `drafted` taslak |
| Kapsam dışı | `白`, `九`, `南`, diğer 97 kayıt · reviewed açılışı · uyumlama · Content Freeze · `main`/deploy/native/store |

---

## 1. Taban doğrulaması (yapıldı)

```
git rev-parse HEAD      → 13a62c50e5bd3da6c74b3a44b8cce82a47e9349b   ✅
git status --porcelain  → 0 satır (temiz)                            ✅
13a62c5 "docs(kanji-atlas): pass Authoring Batch 17" · origin/codex/… @ 87d175a atası ✅
南 kaydı bu tabanda reviewed / not_required → Batch 17 içeriği tabanda mevcut ✅
```

Taban sayımları sözleşme §8 ile **birebir** uyuştu: 98 karakter · 58 reviewed · 1 drafted (`九`) ·
30 legacy · 88 görünür köken · mnemonic 74 `not_required` / 2 `active` / 0 `pending_review` /
22 alansız · `CONTENT_HASH = 475592a4bd20617e`.

`今` başlangıç durumu (§7 önkoşulları):

| Alan | Ölçülen |
|---|---|
| `id` / `character` | `ima` / `今` |
| `etymology` | **yok** ✅ |
| `mnemonic` | **yok** ✅ |
| `pictogram_note` | `""` ✅ |
| `memory_hint_tr` | `""` ✅ |
| `readings.irregularWords` | `今日 / きょう` jukujikun kaydı — **dokunulmayacak** |

---

## 2. Araştırma kapısı — veri yazmadan önce (§3)

Sıra ve yöntem:

1. **Kanjipedia (ZORUNLU)** — `今` karakter sayfasının kesin URL/kimliği bulunacak,
   `字源・成り立ち` açıklaması özgün Japoncasıyla ve erişim tarihiyle kaydedilecek.
   Bu kaynak bulunamazsa **hiçbir taslak yazılmaz** (B sonucu).
2. **説文解字** — güvenilir bir dijital nüshadan (ör. 漢典/中國哲學書電子化計劃) özgün metin,
   nüsha/URL ve erişim tarihiyle kaydedilecek. Bulunamazsa **arama yöntemi ve yokluk kanıtı**
   raporlanacak; uydurulmayacak.
3. **Dong Chinese · Wiktionary · OK辞典** — erişilebildiği ölçüde kontrol edilecek.
   Hiçbiri Kanjipedia zorunluluğunun yerine geçmez.
4. **Modern glif keyfî parçalanmayacak.** Bugünkü şekil ile tarihsel biçim açıkça ayrılacak;
   `亼 + …` türü bir çözümleme **kaynak desteği olmadan kurulmayacak**.
5. **Kaynak matrisi** dört iddia alanı için kurulacak:
   (a) betimlenen nesne/biçim · (b) oluşum türü · (c) tarihsel parçaların rolleri ·
   (d) tarihsel anlamdan “şimdi” anlamına geçiş **mekanizması**.
6. Her ayrılık dört sınıftan biriyle etiketlenecek: **ortak omurga · çıkarılabilir ayrıntı ·
   mekanizma belirsizliği · bütünsel çöküş**.

Erişim yöntemi: `WebFetch` / `WebSearch`. Sayfa erişilemezse bu **rapora yazılır**; başka bir
yolla (curl/script) içerik çekilmez.

---

## 3. Karar ağacı (§4) — sonucu araştırma belirler, ben değil

### A — savunulabilir ortak omurga VARSA

`今` kaydına **yalnız** şunlar eklenir:

```
etymology.qaStatus       : "drafted"          ← kullanıcıya KAPALI (kokenOf → null)
etymology.reviewedAt     : YOK
etymology.summaryTr      : en fazla 2–3 kısa, sade Türkçe cümle
etymology.formationType / formationTypeSource : yalnız kaynakların desteklediği ölçüde
etymology.confidence     : yalnız GÖRÜNÜR iddiaların güvenini ölçer
etymology.sources        : zorunlu Kanjipedia + gerçekten kullanılan diğerleri
etymology.disagreementNote: kaynak matrisi + doğrulama alıntıları, denetlenebilir
mnemonic                 : { "status": "pending_review" }   ← textTr YOK
```

Mekanizma belirsiz ama omurga sağlamsa **yalnız** nötr kilitli kalıp kullanılır:
`Daha sonra 'şimdi' anlamında kullanılmaya başlanmıştır.` Bu kalıp belirsizliği çözmüş
saymaz; ayrılık araştırma notunda durur (AUTHORING-05, beşinci kilitli ilke).

### B — savunulabilir ortak omurga YOKSA

**Ürün verisine hiç yazılmaz.** Araştırma raporu + kanıtlar teslim edilir, sonuç `HOLD`
işaretlenir, durulur. Sayım veya taslak üretmek için **metin zorlanmaz**. Bu, başarısızlık
değil; doğruluk standardının uygulanmasıdır (九 emsali).

---

## 4. Değişecek dosyalar (§6)

| Dosya | A | B |
|---|---|---|
| `…/plans/2026-08-07-AUTHORING-BATCH-18-IMA-DRAFT-PLAN.md` | ✅ | ✅ |
| `…/reports/2026-08-07-AUTHORING-BATCH-18-IMA-DRAFT.md` | ✅ | ✅ |
| `…/evidence/2026-08-07-authoring-18-ima-draft/**` | ✅ | ✅ |
| `_faz2/apply_authoring_18_ima_draft.js` (yeni) | ✅ | ✗ |
| `index.html` | ✅ | ✗ |
| `_faz2/data_chars.json` (generator çıktısı) | ✅ | ✗ |
| `_faz2/content_manifest.json` (generator çıktısı) | ✅ | ✗ |

Başka hiçbir dosyaya dokunulmaz.

---

## 5. Uygulama sırası

1. **Plan commit'i** (bu dosya) — ürün dosyası değişmemiş olacak.
2. Araştırma tamamlanır; kaynak matrisi ve A/B kararı yazılır. **Veri hâlâ yazılmadı.**
3. **B ise:** rapor + kanıt commit'i, bundle, DUR.
4. **A ise:** `_faz2/apply_authoring_18_ima_draft.js` yazılır (§7 güvenceleri `throw` ile kodlanır),
   bir kez koşturulur; `generate_data_chars.js` koşturulur, ikinci koşum diff üretmemeli,
   `--check` exit 0; **uygulama commit'i**.
5. Kanıtlar (sayım, semantik diff, DOM, negatif, gate) üretilir; **rapor + kanıt commit'i**.
6. Bundle oluşturulur, doğrulanır, teslim edilir. **DUR.**

### Betiğin güvenceleri (§7)

Yalnız `ima`/`今` kaydını bulur · başlangıçta `pictogram_note:""`, `memory_hint_tr:""`,
`etymology` ve `mnemonic` **yokluğunu** doğrular · beklenen durum yoksa **yazmadan** `throw` ·
eski kaydı kaynakta `JSON.stringify` ile **birebir** bulmadan replace etmez · değişmez alanları
öncesi/sonrası karşılaştırır · ikinci koşumda non-zero döner ve **hiçbir dosyayı değiştirmez** ·
görünür metinde kaynak adı, tartışma dili, modern biçime dayalı uydurma parça anlatısı ve
kesinliği aşan mekanizma **bulunmadığını** doğrular.

---

## 6. Değişmez alanlar (§5)

`character`, `meaning_tr`, kategori, okumalar, örnekler · `components`, `component_meanings` ·
`pictogram_note`, `memory_hint_tr` · ses, kelime, SRS, oyun ve arayüz verileri ·
**`今日 / kyou` jukujikun davranışı ve `readings` bloğu** · `白`, `九`, `南` ve diğer tüm
DATA kayıtları.

---

## 7. Kanıt komutları

| Kanıt | Yöntem |
|---|---|
| Taban SHA + temiz ağaç | `git rev-parse HEAD` · `git status --porcelain` |
| Kanjipedia erişimi | kesin URL + `字源・成り立ち` özgün metni + erişim tarihi |
| 説文解字 | özgün metin + nüsha/URL + erişim tarihi **veya** yokluk kanıtı |
| Kaynak matrisi | dört iddia alanı × kaynak tablosu + ayrılık sınıfı |
| Sayım öncesi/sonrası | ürünün kendi `kokenOf`/`mnemonicOf` mantığı birebir uygulanarak |
| Semantik diff | `今` kaydının alan alan `JSON.stringify` karşılaştırması + değişen kayıt sayısı |
| Generator idempotansı | ikinci koşumda `git status` boş · `--check` exit 0 |
| **Negatif** — ikinci apply koşumu | non-zero + `sha256sum` değişmemiş |
| **DOM** | gerçek Chromium: `今` Kökeni/Hafıza kartı **YOK**, boş kart yok; `白` boş, `九` gizli, `南` görünür |
| Varsayılan gate | `npm run gates` → **14/14**, exit 0 |
| `git diff --check` | `git diff --check 13a62c5 HEAD` |

DOM ölçümü depo dışında (`/tmp`), Batch E/17 desenindeki sahipli sunucu ve hermetik ağ
yalıtımıyla yapılır; ürün dosyasına veya test paketine kanca eklenmez.

---

## 8. Geri dönüş

```bash
# A sonucunda
git revert <uygulama commit'i>      # 今 etymology/mnemonic taşımayan hâline döner
node _faz2/generate_data_chars.js   # türevler ve CONTENT_HASH tabana döner
# B sonucunda geri alınacak ürün değişikliği YOKTUR
```

veya dalı hiç birleştirmemek.

---

## 9. Durma noktası

Teslim: plan commit'i · (A ise) uygulama commit'i · rapor+kanıt commit'i · tek doğrulanmış
`.bundle`. Sonrasında **dururum**. Codex PASS **ve ayrı bir reviewed kararı** olmadan `今`
kullanıcıya açılamaz; `白`, `九`, uyumlama, Content Freeze, deploy veya store işine geçmem.
