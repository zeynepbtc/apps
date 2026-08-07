# AUTHORING BATCH 17 — 南 REVIEWED AÇILIŞI

**Durum:** APPROVED / UYGULAMAYA HAZIR  
**Sahip:** Claude (plan + uygulama + kanıt) → Codex (bağımsız denetim)  
**Taban:** `e0abee68d94d55c42f0d79ed7a835215dc5b9afb`  
**Hedef dal:** `content/authoring-17-minami-review-2026-08-07`  
**Karar:** `_AGENT_EXCHANGE/decisions/DECISION-002-MINAMI-MNEMONIC.md`  
**Tarih:** 2026-08-07

## 1. Amaç

Yalnız `南` kaydını mevcut doğrulanmış taslaktan `reviewed` durumuna geçirmek ve kullanıcıya açmak. Görünür köken metni, confidence, oluşum türü, kaynak ve araştırma notu korunacak; mnemonic kararı `not_required` olarak kaydedilecek.

`今`, `白`, `九`, editoryal uyumlama ve Content Freeze bu partinin kapsamında değildir.

## 2. Başlamadan önce zorunlu plan

Claude ürün dosyasını değiştirmeden önce şu planı yazmalı ve commit etmeden Codex sözleşmesiyle birlikte teslim zincirinde korumalıdır:

- `_AGENT_EXCHANGE/claude/plans/2026-08-07-AUTHORING-BATCH-17-MINAMI-REVIEW-PLAN.md`

Plan; taban SHA doğrulamasını, değişecek dosyaları, uygulama sırasını, geri dönüşü ve kanıt komutlarını açıkça listelemelidir. Plan yeni ürün kararı üretemez.

## 3. İzin verilen dosyalar

- `_faz2/apply_authoring_16_minami_reviewed.js` (yeni)
- `index.html`
- `_faz2/data_chars.json` (yalnız generator çıktısı)
- `_faz2/content_manifest.json` (yalnız generator çıktısı)
- `_AGENT_EXCHANGE/claude/plans/2026-08-07-AUTHORING-BATCH-17-MINAMI-REVIEW-PLAN.md`
- `_AGENT_EXCHANGE/claude/reports/2026-08-07-AUTHORING-BATCH-17-MINAMI-REVIEW.md`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-17-minami-review/**`

Başka hiçbir dosya değişemez.

## 4. `南` için kilitli dönüşüm

Başlangıç durumu birebir doğrulanmalı:

- `etymology.qaStatus: "drafted"`
- `reviewedAt` yok
- `confidence: "A"`
- `mnemonic.status: "pending_review"`
- `summaryTr`: `Asılı, çan biçiminde bir çalgının resmidir. Daha sonra 'güney' anlamında kullanılmaya başlanmıştır.`

Uygulama sonrası yalnız şu semantik değişiklikler yapılabilir:

- `etymology.qaStatus`: `drafted` → `reviewed`
- `etymology.reviewedAt`: repository Git tarihinden alınan `YYYY-MM-DD`
- `mnemonic`: `{ "status": "not_required" }`
- `disagreementNote`: DECISION-002 ve dört-soru kararını kaydeden, mevcut araştırma izini silmeyen kısa bir reviewed-onay eki

Şunlar bayt/JSON değeri olarak değişmemeli:

- `summaryTr`
- `confidence`
- `formationType` ve `formationTypeSource`
- `sources`
- `components`, `component_meanings`
- `pictogram_note`, `memory_hint_tr`
- anlam, okumalar, örnekler, kategori ve diğer tüm `南` alanları

`mnemonic.textTr` veya yeni bir hafıza metni bulunamaz.

## 5. Uygulama betiği güvenceleri

Yeni apply betiği:

- yalnız `南` kaydını bulmalı,
- beklenen başlangıç durumu yoksa yazmadan durmalı,
- iki kez çalıştırıldığında ikinci koşum non-zero olmalı ve dosyaları değiştirmemeli,
- eski kaydı kaynak içinde birebir bulmadan replace yapmamalı,
- Git tarihini repository kökünden okumalı ve biçimini doğrulamalı,
- tüm kilitli/değişmez alanları uygulama öncesi ve sonrası karşılaştırmalı,
- görünür metinde `ödünç`, `anlamı gelişmiştir`, tartışma dili veya teknik kaynak terimi oluşmadığını doğrulamalı,
- görünür metnin `kullanılmaya başlanmıştır`, `çalgı`, `asılı`, `çan biçiminde` ve `güney` ifadelerini koruduğunu doğrulamalı,
- `disagreementNote` içindeki mevcut mekanizma ayrılığı ve kaynak izlerini korumalı.

## 6. Ölçülen sayım beklentisi

Taban `e0abee6`:

- 98 toplam karakter
- 57 reviewed
- 2 drafted (`九`, `南`)
- 30 legacy
- kullanıcıya görünür köken: 87
- mnemonic: 73 `not_required`, 2 `active`, 1 `pending_review`, 22 alansız
- CONTENT_HASH: `6abd13bed1ae525b`

Uygulama sonrası beklenen:

- toplam karakter değişmez: 98
- reviewed: **58**
- drafted: **1** ve bu yalnız `九`
- legacy: 30
- kullanıcıya görünür köken: **88**
- mnemonic: **74 `not_required`**, 2 `active`, **0 `pending_review`**, 22 alansız
- `今` ve `白` boş kalır; `九` drafted/confidence C ve kullanıcıya kapalı kalır
- CONTENT_HASH değişir ve generator çıktısıyla birebir eşleşir

## 7. Kabul ölçütleri

1. Çalışma tabanı tam olarak `e0abee68d94d55c42f0d79ed7a835215dc5b9afb`.
2. Plan ürün değişikliğinden önce oluşturulmuş ve sözleşmeye bağlıdır.
3. İzin verilen yollar dışında değişiklik yok.
4. `南` dönüşümü §4 ile birebir uyumlu; başka DATA kaydı değişmemiştir.
5. `generate_data_chars.js` normal koşumla türevleri üretir; ikinci koşum diff oluşturmaz; `--check` exit 0.
6. §6 sayımları birebir sağlanır.
7. `kokenOf(南)` artık tam kilitli `summaryTr` değerini döndürür; köken kartı tek ve görünürdür.
8. `mnemonicOf(南)` null döndürür; Hafıza kartı görünmez ve boş kart oluşmaz.
9. `今` ve `白` için boş Kökeni kartı oluşmaz; `九` kullanıcıya kapalı kalır.
10. Varsayılan `npm run gates`: **10/10 core + 4/4 browser = 14/14 PASS**, exit 0.
11. Apply betiğinin ikinci koşum negatif kanıtı non-zero ve değişikliksizdir.
12. `git diff --check` bulgusuz; koşum öncesi/sonrası ağaç beklenen teslim değişiklikleri dışında aynı ve süreç sızıntısızdır.

## 8. Teslim düzeni

Claude küçük ve denetlenebilir üç commit üretmeli:

1. plan,
2. uygulama + generator çıktıları,
3. rapor + ham kanıtlar.

Teslim raporu taban/uç SHA'larını, dosya listesini, komutları, sürümleri, exit kodlarını, sayım öncesi/sonrasını, içerik diff'ini, DOM kanıtını, negatif kanıtı, temiz-ağaç durumunu ve geri dönüş yöntemini içermelidir.

Push engellenirse tek doğrulanmış `.bundle` teslim et. Batch 17 sonunda dur; Codex PASS vermeden `今`, `白`, `九`, editoryal uyumlama, Content Freeze, deploy veya store işine geçme.

