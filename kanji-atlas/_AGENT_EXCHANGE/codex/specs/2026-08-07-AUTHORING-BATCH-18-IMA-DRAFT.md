# AUTHORING BATCH 18 — 今 ARAŞTIRMA + GİZLİ TASLAK

**Durum:** APPROVED / UYGULAMAYA HAZIR  
**Sahip:** Claude (araştırma + plan + uygulama + kanıt) → Codex (bağımsız denetim)  
**Taban:** `13a62c50e5bd3da6c74b3a44b8cce82a47e9349b`  
**Hedef dal:** `content/authoring-18-ima-draft-2026-08-07`  
**Tarih:** 2026-08-07

## 1. Amaç ve sınır

Yalnız `今` kaydının tarihsel oluşumunu kaynaklardan yeniden araştırmak ve ancak savunulabilir bir ortak omurga bulunursa kullanıcıya kapalı `drafted` kayıt üretmek.

Bu parti **reviewed açılışı değildir**. Üretilen taslak kullanıcıya görünmez. `白`, `九`, diğer karakterler, editoryal uyumlama, Content Freeze, `main`, deploy, landing, native ve store kapsam dışıdır.

## 2. Başlamadan önce zorunlu plan

Claude ürün dosyasını değiştirmeden önce şunu yazmalı:

- `_AGENT_EXCHANGE/claude/plans/2026-08-07-AUTHORING-BATCH-18-IMA-DRAFT-PLAN.md`

Plan; tam taban SHA doğrulamasını, kaynak erişim yöntemini, değişecek dosyaları, karar ağacını, uygulama sırasını, geri dönüşü ve kanıt komutlarını içermelidir. Plan yeni ürün kararı üretemez.

## 3. Araştırma kapısı

Claude önce veri yazmadan araştırmayı tamamlamalıdır:

1. Kanjipedia'da `今` karakter sayfasının kesin URL/kimliğini bul, sayfanın `字源・成り立ち` açıklamasını erişim tarihiyle kaydet.
2. `説文解字` girdisini güvenilir bir dijital nüshadan bul ve özgün metni, nüsha/URL ve erişim tarihiyle kaydet; bulunamazsa arama yöntemini ve yokluk kanıtını raporla.
3. Dong Chinese, Wiktionary ve OK辞典 kaynaklarını erişilebildiği ölçüde kontrol et. Bunlardan hiçbiri Kanjipedia zorunluluğunun yerine geçmez.
4. Modern glifi keyfî biçimde parçalara ayırma. Güncel şekil ile tarihsel biçimi açıkça ayır; `亼 + ...` gibi bir çözümlemeyi kaynak desteği olmadan kurma.
5. Aşağıdaki iddialar için kaynak matrisi oluştur:
   - betimlenen nesne/biçim,
   - oluşum türü,
   - tarihsel parçaların rolleri,
   - tarihsel anlamdan “şimdi” anlamına geçiş mekanizması.
6. Her ayrılığı şu sınıflardan biriyle kaydet: ortak omurga, çıkarılabilir ayrıntı, mekanizma belirsizliği veya bütünsel çöküş.

Kaynaklardan kısa doğrulama alıntıları araştırma notunda tutulabilir. Kullanıcıya görünür `summaryTr` içinde kaynak tartışması, teknik çekişme veya kesinliği aşan iddia bulunamaz.

## 4. İki sonuçlu karar ağacı

### A. Savunulabilir ortak omurga varsa

Yalnız `今` için:

- `etymology.qaStatus: "drafted"`
- `reviewedAt` bulunmaz
- `summaryTr` en fazla 2–3 kısa, sade Türkçe cümledir
- `formationType` ve `formationTypeSource` yalnız kaynakların desteklediği ölçüde yazılır
- `confidence`, yalnız görünür iddiaların güvenini ölçer
- `sources`, en az zorunlu Kanjipedia kaynağını ve gerçekten kullanılan diğer kaynakları içerir
- `disagreementNote`, kaynak matrisini ve doğrulama alıntılarını denetlenebilir biçimde korur
- `mnemonic: { "status": "pending_review" }`; `textTr` eklenmez

Mekanizma belirsiz fakat omurga sağlam ise yalnız kaynak politikasındaki nötr kalıp kullanılabilir: `Daha sonra 'şimdi' anlamında kullanılmaya başlanmıştır.` Bu kalıp belirsizliği çözmüş sayılmaz; araştırma notu ayrılığı korur.

### B. Savunulabilir ortak omurga yoksa

Ürün verisine **hiç yazma**. Araştırma raporunu ve kanıtları teslim et, sonucu `HOLD` olarak işaretle ve dur. Sayım veya taslak üretmek için metin zorlama.

## 5. Değişmez alanlar

Her iki sonuçta da şu alanlar değişemez:

- `character`, `meaning_tr`, kategori, okumalar ve örnekler
- `components` ve `component_meanings`
- `pictogram_note` ve `memory_hint_tr`
- ses, kelime, SRS, oyun ve arayüz verileri
- `今日 / kyou` dâhil mevcut jukujikun/okuma davranışı
- `白`, `九`, `南` ve diğer tüm DATA kayıtları

## 6. İzin verilen dosyalar

Her iki sonuçta:

- `_AGENT_EXCHANGE/claude/plans/2026-08-07-AUTHORING-BATCH-18-IMA-DRAFT-PLAN.md`
- `_AGENT_EXCHANGE/claude/reports/2026-08-07-AUTHORING-BATCH-18-IMA-DRAFT.md`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-18-ima-draft/**`

Yalnız A sonucu oluşursa ayrıca:

- `_faz2/apply_authoring_18_ima_draft.js` (yeni)
- `index.html`
- `_faz2/data_chars.json` (yalnız generator çıktısı)
- `_faz2/content_manifest.json` (yalnız generator çıktısı)

Başka hiçbir dosya değişemez.

## 7. Uygulama betiği güvenceleri (yalnız A sonucu)

Apply betiği:

- yalnız `ima` / `今` kaydını bulmalı,
- başlangıçta `pictogram_note: ""`, `memory_hint_tr: ""`, etymology ve mnemonic yokluğunu doğrulamalı,
- beklenen başlangıç durumu yoksa yazmadan durmalı,
- eski kaydı kaynak içinde birebir bulmadan replace yapmamalı,
- değişmez alanları uygulama öncesi ve sonrası karşılaştırmalı,
- ikinci koşumda non-zero dönmeli ve hiçbir dosyayı değiştirmemeli,
- görünür metinde kaynak adı, tartışma dili, modern biçime dayalı uydurma parça anlatısı veya kesinliği aşan mekanizma bulunmadığını doğrulamalıdır.

## 8. Ölçülen sayım beklentisi

Taban `13a62c5`:

- 98 toplam karakter
- 58 reviewed
- 1 drafted: yalnız `九`
- 30 legacy
- kullanıcıya görünür köken: 88
- mnemonic: 74 `not_required`, 2 `active`, 0 `pending_review`, 22 alansız
- CONTENT_HASH: `475592a4bd20617e`

A sonucu sonrası beklenen:

- toplam 98; reviewed 58; legacy 30; görünür köken 88
- drafted **2**: yalnız `九` ve `今`
- mnemonic: 74 `not_required`, 2 `active`, **1 `pending_review`**, **21 alansız**
- `今` drafted olduğu için Kökeni ve Hafıza kartları kullanıcıya görünmez
- `白` boş, `九` drafted/gizli, `南` reviewed/görünür kalır
- CONTENT_HASH değişir ve generator çıktısıyla eşleşir

B sonucunda ürün verisi, sayımlar ve CONTENT_HASH tabanla birebir aynı kalır.

## 9. Kabul ölçütleri

1. Çalışma tabanı tam olarak `13a62c50e5bd3da6c74b3a44b8cce82a47e9349b`.
2. Plan ürün değişikliğinden önce ayrı commit'tedir.
3. Kanjipedia kesin karakter sayfası ve erişim kanıtı mevcuttur; kaynak matrisi tüm dört iddia alanını kapsar.
4. Sonuç A veya B açıkça seçilmiş ve kanıtla gerekçelendirilmiştir.
5. A sonucunda yalnız `ima` semantik olarak değişir; B sonucunda ürün verisi değişmez.
6. A sonucunda generator normal koşumda türevleri üretir, ikinci koşum diff oluşturmaz ve `--check` exit 0'dır.
7. A sonucunda §8 sayımları birebir sağlanır; DOM'da `今` gizlidir ve boş kart yoktur.
8. Her iki sonuçta `白`, `九`, `南`, okumalar, örnekler, sesler ve kapsam dışı alanlar korunur.
9. Varsayılan `npm run gates`: **10/10 core + 4/4 browser = 14/14 PASS**, exit 0.
10. A sonucunda apply betiğinin ikinci koşum negatif kanıtı non-zero ve değişikliksizdir.
11. `git diff --check` bulgusuz; kapsam dışı değişiklik veya süreç sızıntısı yoktur.

## 10. Teslim düzeni ve durma noktası

Claude küçük commit'ler üretmeli:

1. plan,
2. A ise uygulama + generator çıktıları (B ise bu commit yok),
3. rapor + ham kanıtlar.

Teslim raporu taban/uç SHA'ları, dosya listesi, kaynak erişim bilgileri, iddia matrisi, A/B kararı, komutlar, sürümler, exit kodları, sayımlar, semantik diff, DOM kanıtı, temiz-ağaç durumu ve geri dönüş yöntemini içermelidir.

Push engellenirse tek doğrulanmış `.bundle` teslim et. Batch 18 sonunda dur; Codex PASS ve ayrı reviewed kararı olmadan `今` kullanıcıya açılamaz ve sonraki karaktere geçilemez.
