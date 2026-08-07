# AUTHORING BATCH 17 — 南 REVIEWED AÇILIŞI · UYGULAMA PLANI

> Bu plan **ürün dosyasına dokunulmadan önce** yazıldı ve teslimin ilk commit'idir (§2).
> Yeni ürün kararı üretmez; yalnız `DECISION-002` ile Codex sözleşmesinin nasıl uygulanacağını
> ve hangi kanıtların üretileceğini bağlar. Sözleşme ile bu plan çelişirse **sözleşme kazanır**.

| | |
|---|---|
| Sözleşme | `codex/specs/2026-08-07-AUTHORING-BATCH-17-MINAMI-REVIEW.md` · SHA-256 `92f2eb5334c0d5c11412449af15ca20f525c3c6c48ee1e13a8d5063064a97d44` |
| Karar | `_AGENT_EXCHANGE/decisions/DECISION-002-MINAMI-MNEMONIC.md` · SHA-256 `9416dfe51e3ec2a062fd72d0f35df3bd23a3128f4ad12e4eb29a2be785eb52c0` |
| Taban | `e0abee68d94d55c42f0d79ed7a835215dc5b9afb` — **doğrulandı**, dal bu commit'ten açıldı |
| Dal | `content/authoring-17-minami-review-2026-08-07` |
| Kapsam | **yalnız `南`** · `今`, `白`, `九`, uyumlama, Content Freeze, deploy **kapsam dışı** |

---

## 1. Taban doğrulaması (yapıldı, plan yazılmadan önce)

```
git rev-parse HEAD                    → e0abee68d94d55c42f0d79ed7a835215dc5b9afb  ✅
git status --porcelain                → 0 satır (temiz)                            ✅
origin/codex/kanji-atlas-coordination → 0a39ae9 · e0abee6 bu dalın atası           ✅
```

Başlangıç durumu `南` kaydında **birebir** ölçüldü (§4):

| Alan | Ölçülen |
|---|---|
| `id` | `minami` |
| `etymology.qaStatus` | `drafted` ✅ |
| `etymology.reviewedAt` | **yok** ✅ |
| `etymology.confidence` | `A` ✅ |
| `mnemonic.status` | `pending_review` ✅ |
| `etymology.summaryTr` | `Asılı, çan biçiminde bir çalgının resmidir. Daha sonra 'güney' anlamında kullanılmaya başlanmıştır.` ✅ |
| `formationType` / `formationTypeSource` | `象形` / `Kanjipedia` |
| `sources` | 1 URL (Kanjipedia 0005406400) |

Taban sayımları da sözleşme §6 ile **birebir** uyuştu: 98 karakter · 57 reviewed · 2 drafted
(`九`, `南`) · 30 legacy · 87 görünür köken · mnemonic 73 `not_required` / 2 `active` /
1 `pending_review` / 22 alansız · `CONTENT_HASH = 6abd13bed1ae525b`.

---

## 2. Değişecek dosyalar (sözleşme §3 ile birebir)

| Dosya | Neden |
|---|---|
| `_faz2/apply_authoring_16_minami_reviewed.js` | **yeni** — kilitli dönüşümü uygulayan, güvenceli, tek kullanımlık betik |
| `index.html` | yalnız `南` kaydı + generator'ın yazdığı `CONTENT_HASH` sabiti |
| `_faz2/data_chars.json` | **yalnız** generator çıktısı |
| `_faz2/content_manifest.json` | **yalnız** generator çıktısı |
| `_AGENT_EXCHANGE/claude/plans/…-PLAN.md` | bu dosya |
| `_AGENT_EXCHANGE/claude/reports/…-MINAMI-REVIEW.md` | teslim raporu |
| `_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-17-minami-review/**` | ham kanıtlar |

Başka hiçbir dosyaya dokunulmayacak. Ses, manifest, oyun, runner, test ve diğer 97 kayıt
kapsam dışıdır.

---

## 3. Uygulama sırası

1. **Plan commit'i** (bu dosya) — ürün dosyası henüz değişmemiş olacak.
2. `_faz2/apply_authoring_16_minami_reviewed.js` yazılır. Betik §4'teki dört semantik
   değişiklik dışında hiçbir şey yapamaz; §5'teki her güvence `throw` ile kodlanır.
3. `node _faz2/apply_authoring_16_minami_reviewed.js` **bir kez** koşturulur.
4. `node _faz2/generate_data_chars.js` koşturulur → `data_chars.json`,
   `content_manifest.json`, `CONTENT_HASH`.
5. `node _faz2/generate_data_chars.js` **ikinci kez** koşturulur → diff **oluşmamalı**.
6. `node _faz2/generate_data_chars.js --check` → exit 0.
7. **Uygulama commit'i** (betik + `index.html` + iki generator çıktısı).
8. Kanıtlar üretilir (§4), **rapor + kanıt commit'i**.
9. Bundle oluşturulur, doğrulanır, teslim edilir. **DUR.**

### Betiğin uygulayacağı tek dönüşüm

```
etymology.qaStatus     : "drafted" → "reviewed"
etymology.reviewedAt   : yok → <repo Git tarihi, YYYY-MM-DD>
mnemonic               : {status:"pending_review"} → {status:"not_required"}
etymology.disagreementNote : mevcut metin + REVIEWED ONAYI eki (mevcut iz SİLİNMEZ)
```

Bayt/JSON değeri olarak **değişmeyecekler**: `summaryTr`, `confidence`, `formationType`,
`formationTypeSource`, `sources`, `components`, `component_meanings`, `pictogram_note`,
`memory_hint_tr`, anlam, okumalar, örnekler, kategori, stroke verisi ve `南`'ın kalan tüm alanları.
`mnemonic.textTr` **oluşmayacak**.

### Betiğin taşıyacağı güvenceler (§5)

Yalnız `南`'ı bulur · beklenen başlangıç durumu yoksa **yazmadan** `throw` · ikinci koşumda
non-zero ve dosyaya dokunmaz · eski kaydı `JSON.stringify` ile kaynakta **birebir** bulmadan
replace etmez · Git tarihini repo kökünden okur ve biçimini doğrular · tüm kilitli alanları
öncesi/sonrası karşılaştırır · görünür metinde `ödünç`, `anlamı gelişmiştir`, tartışma dili ve
teknik kaynak terimi **oluşmadığını** doğrular · görünür metnin `kullanılmaya başlanmıştır`,
`çalgı`, `asılı`, `çan biçiminde`, `güney` ifadelerini **koruduğunu** doğrular ·
`disagreementNote` içindeki mekanizma ayrılığı ve kaynak izlerini korur.

---

## 4. Kanıt komutları

| Kanıt | Komut |
|---|---|
| Taban SHA + temiz ağaç | `git rev-parse HEAD` · `git status --porcelain` |
| Sayım öncesi/sonrası | `node -e` ile `DATA.chars` üzerinden `kokenOf`/`mnemonicOf` mantığı birebir uygulanarak |
| Kilitli alanların bayt eşitliği | uygulama öncesi/sonrası `南` kaydının alan alan `JSON.stringify` karşılaştırması |
| İçerik diff'i | `git diff e0abee6 HEAD -- kanji-atlas/index.html` içindeki `南` kaydı |
| Generator idempotansı | ikinci koşumda `git status --porcelain` boş · `--check` exit 0 |
| **Negatif** — ikinci apply koşumu | `node _faz2/apply_authoring_16_minami_reviewed.js` → non-zero + `sha256sum` değişmemiş |
| **DOM** — `kokenOf(南)` görünür, tek kart | gerçek Chromium'da `SMOKE_URL` ile ölçüm |
| **DOM** — `mnemonicOf(南)` boş, Hafıza kartı yok | aynı koşumda |
| **DOM** — `今`/`白` boş kart oluşmuyor, `九` kapalı | aynı koşumda |
| Varsayılan gate | `npm run gates` → **14/14**, exit 0 |
| Süreç/ağaç temizliği | koşum sonrası `git status --porcelain` + Chromium sayımı |
| `git diff --check` | `git diff --check e0abee6 HEAD` |

DOM ölçümü, Batch E'de kurulan sahipli tarayıcı altyapısının aynısıyla yapılacak: sunucuyu
`run-browser-gates.mjs` deseninde geçici bir ölçüm koşucusu **depo dışında** (`/tmp`) açacak,
ürün dosyasına veya test paketine hiçbir kanca eklenmeyecek.

---

## 5. Geri dönüş

```bash
git revert <uygulama commit'i>     # 南 tekrar drafted/pending_review olur, kullanıcıya kapanır
node _faz2/generate_data_chars.js  # türevler ve CONTENT_HASH tabana döner
```

veya dalı hiç birleştirmemek. Değişiklik tek kayıtla sınırlı olduğu için geri dönüşün diğer
97 kayda ve ürün davranışına etkisi yoktur.

---

## 6. Beklenen sonuç (sözleşme §6)

| Ölçüt | Taban | Beklenen |
|---|---|---|
| toplam karakter | 98 | **98** |
| reviewed | 57 | **58** |
| drafted | 2 (`九`,`南`) | **1** — yalnız `九` |
| legacy | 30 | 30 |
| görünür köken | 87 | **88** |
| mnemonic `not_required` | 73 | **74** |
| mnemonic `active` | 2 | 2 |
| mnemonic `pending_review` | 1 | **0** |
| mnemonic alansız | 22 | 22 |
| `今` / `白` | boş | **boş kalır** |
| `九` | drafted · C · kapalı | **değişmez** |
| `CONTENT_HASH` | `6abd13bed1ae525b` | **değişir**, generator çıktısıyla birebir eşleşir |

---

## 7. Durma noktası

Teslim: plan commit'i · uygulama commit'i · rapor+kanıt commit'i · tek doğrulanmış `.bundle`.
Sonrasında **dururum**. Codex PASS vermeden `今`, `白`, `九`, editoryal uyumlama,
Content Freeze, `main`, deploy, landing, native veya store işine geçmem.
