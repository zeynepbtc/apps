# AUTHORING BATCH 19 — 白 ARAŞTIRMA + GİZLİ TASLAK

**Durum:** APPROVED / UYGULAMAYA HAZIR  
**Sahip:** Claude (araştırma + plan + uygulama + kanıt) → Codex (bağımsız denetim)  
**Taban:** `ac7698f65218644df97a2cbfe66245aea319ee20`  
**Hedef dal:** `content/authoring-19-shiro-draft-2026-08-07`  
**Tarih:** 2026-08-07

## 1. Amaç ve sınır

Yalnız `白` kaydının tarihsel oluşumunu kaynaklardan yeniden araştırmak ve ancak savunulabilir ortak omurga bulunursa kullanıcıya kapalı `drafted` kayıt üretmek.

Bu parti reviewed açılışı değildir. `今`, `九`, `南`, diğer kayıtlar, editoryal uyumlama, tartışmalı-köken ürün deseni, Content Freeze, `main`, deploy, landing, native ve store kapsam dışıdır.

## 2. Başlamadan önce zorunlu plan

Ürün dosyasına dokunmadan önce ayrı commit'te:

- `_AGENT_EXCHANGE/claude/plans/2026-08-07-AUTHORING-BATCH-19-SHIRO-DRAFT-PLAN.md`

Plan tam taban SHA'yı, başlangıç kaydını, kaynak erişim yöntemini, karar ağacını, izinli dosyaları, uygulama/geri dönüş sırasını ve kanıt komutlarını içermelidir.

## 3. Araştırma kapısı

1. Kanjipedia `白` karakter sayfası `0005607600` canlı açılmalı; karakter üstverisi ve `字源・成り立ち` özgün metni kesin URL ve erişim tarihiyle kaydedilmeli.
2. `説文解字` girdisi güvenilir dijital nüshadan özgün metinle alınmalı; 段注/康熙 ayrı katman olarak etiketlenmeli.
3. Dong Chinese, Wiktionary ve OK辞典 erişilebildiği ölçüde kontrol edilmeli. Basılı 白川静/藤堂 veya modern paleografi kaynağının doğrudan, doğrulanabilir alıntısı bulunursa matrise eklenebilir; ikincil özet kaynak adına konuşturulamaz.
4. Ön taramadaki aday teoriler özellikle aranmalı fakat doğru varsayılmamalı: palamut/tohum, tırnak, kafatası/baş, gün doğumu/ışık ve pirinç tanesi. Kaynakta bulunmayan teori yalnız “bulunamadı” diye kaydedilir.
5. Modern `白` glifi tarihsel biçim yerine kullanılamaz; çizgilerden hikâye türetilemez.
6. Şu iddia alanları için kaynak matrisi kurulmalı:
   - betimlenen nesne veya görsel olgu,
   - oluşum türü,
   - tarihsel parçalar/işaretlerin rolleri,
   - biçimden “beyaz/aydınlık” anlamına geçiş,
   - aday teorinin modern paleografik desteği ve kaynağın bağımsızlığı.
7. Her ayrılık `ortak omurga`, `çıkarılabilir ayrıntı`, `mekanizma belirsizliği` veya `bütünsel çöküş` olarak sınıflandırılmalı.

Kaynak sayısı tek başına uzlaşı değildir. Aynı eski iddiayı birbirinden kopyalayan siteler bağımsız oy sayılmaz. Kanjipedia zorunludur fakat tek başına görünür iddiayı reviewed yapmaz.

## 4. İki sonuçlu karar ağacı

### A — savunulabilir ortak omurga varsa

Yalnız `白` kaydına:

- `etymology.qaStatus: "drafted"`; `reviewedAt` yok
- en fazla 2–3 kısa ve sade cümlelik `summaryTr`
- yalnız desteklenen `formationType` / `formationTypeSource`
- görünür iddiaların en zayıf halkasını ölçen `confidence`
- zorunlu Kanjipedia ve gerçekten kullanılan kaynakları içeren `sources`
- iddia matrisi, doğrudan doğrulama alıntıları ve ayrılıkları koruyan `disagreementNote`
- `{ "status": "pending_review" }` mnemonic; `textTr` yok

eklenebilir. Ayrılık yalnız mekanizmada kalırsa, koşulları sağlandığında nötr kalıp kullanılabilir: `Daha sonra 'beyaz' anlamında kullanılmaya başlanmıştır.` Bu kalıp nesne/olgu omurgası yoksa kullanılamaz.

### B — savunulabilir ortak omurga yoksa

Ürün verisine hiç yazma. Araştırma raporu ve kanıtları teslim et, `HOLD` ver ve dur. Sayım hedefi uğruna aday teorilerden birini seçme veya bunları birleştirme.

## 5. Değişmez alanlar

- `character`, anlamlar, kategori, okumalar, örnekler ve `白い / shiroi`
- `components`, `component_meanings`, ilişkiler ve çizim verisi
- `pictogram_note`, `memory_hint_tr`
- ses, kelime, SRS, oyun ve arayüz verileri
- `百` içindeki 白 ses bileşeni anlatısı ve diğer bütün DATA kayıtları

## 6. İzin verilen dosyalar

Her iki sonuçta:

- `_AGENT_EXCHANGE/claude/plans/2026-08-07-AUTHORING-BATCH-19-SHIRO-DRAFT-PLAN.md`
- `_AGENT_EXCHANGE/claude/reports/2026-08-07-AUTHORING-BATCH-19-SHIRO-DRAFT.md`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-19-shiro-draft/**`

Yalnız A sonucunda ayrıca:

- `_faz2/apply_authoring_19_shiro_draft.js` (yeni)
- `index.html`
- `_faz2/data_chars.json` ve `_faz2/content_manifest.json` (yalnız generator çıktısı)

Başka hiçbir dosya değişemez.

## 7. Apply betiği güvenceleri (yalnız A)

Betiğin yalnız `shiro` / `白` kaydını bulması; başlangıçta etymology/mnemonic yokluğu ile iki boş legacy alanını doğrulaması; eski kaydı birebir bulmadan yazmaması; değişmez alanları önce/sonra karşılaştırması; ikinci koşumda non-zero ve değişikliksiz durması; görünür metinde kaynak adı, tartışma dili, kesinliği aşan teori veya modern çizgi hikâyesi bulunmadığını doğrulaması zorunludur.

## 8. Sayım beklentisi

Taban `ac7698f`:

- 98 toplam; 58 reviewed; 1 drafted (`九`); 30 legacy; 88 görünür köken
- mnemonic: 74 `not_required`, 2 `active`, 0 `pending_review`, 22 alansız
- `今` ve `白` boş/gizli; `九` drafted/gizli; `南` reviewed/görünür
- CONTENT_HASH `475592a4bd20617e`

A sonucu sonrası:

- toplam 98; reviewed 58; legacy 30; görünür köken 88
- drafted 2: yalnız `九` ve `白`
- mnemonic: 74 `not_required`, 2 `active`, 1 `pending_review`, 21 alansız
- `白` drafted olduğu için Kökeni ve Hafıza kartları görünmez
- CONTENT_HASH değişir ve generator ile eşleşir

B sonucunda tüm ürün verisi, sayımlar ve hash tabanla birebir aynı kalır.

## 9. Kabul ölçütleri

1. Taban SHA tam olarak `ac7698f65218644df97a2cbfe66245aea319ee20`.
2. Plan ürün değişikliğinden önce ayrı commit'tedir.
3. Kanjipedia kesin sayfası ve 説文 özgün girdisi doğrulanmıştır; matris beş iddia alanını kapsar.
4. A/B sonucu açık, kaynak bağımsızlığı gözetilmiş ve çıkarılabilir ayrıntı testiyle gerekçelendirilmiştir.
5. A'da yalnız `shiro` semantik olarak değişir; B'de hiçbir ürün verisi değişmez.
6. A'da generator normal/idempotent/`--check` koşumları başarılıdır ve §8 sayımları birebirdir.
7. DOM'da `白` gizli ve boş kartsız; `今` gizli/boş; `九` drafted/gizli; `南` görünür kalır.
8. `百`, `白い`, okumalar, örnekler, sesler ve tüm değişmez alanlar korunur.
9. Varsayılan `npm run gates`: **10/10 core + 4/4 browser = 14/14 PASS**, exit 0.
10. A'da ikinci apply koşumu non-zero ve değişikliksizdir.
11. `git diff --check` bulgusuz; kapsam dışı değişiklik veya süreç sızıntısı yoktur.

## 10. Teslim ve durma noktası

Küçük commit sırası: plan; araştırma/matris; A ise uygulama+türevler; rapor+ham kanıtlar. Teslim raporu taban/uç SHA'ları, gerçek değişen dosya sayısı/listesi, kaynak URL ve alıntıları, bağımsızlık değerlendirmesi, A/B kararı, komut/sürüm/exit kodları, sayımlar, semantik diff, DOM, temiz-ağaç ve geri dönüş kanıtını içermelidir.

Push engellenirse tek doğrulanmış `.bundle` teslim et. Batch 19 sonunda dur; Codex PASS ve ayrı reviewed kararı olmadan `白` kullanıcıya açılamaz ve `九`, uyumlama veya Content Freeze başlatılamaz.
