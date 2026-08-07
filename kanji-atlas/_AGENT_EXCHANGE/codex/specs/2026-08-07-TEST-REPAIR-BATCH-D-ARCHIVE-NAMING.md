# TEST REPAIR BATCH D — ARŞİV VE ADLANDIRMA SÖZLEŞMESİ

**Durum:** UYGULAMAYA HAZIR  
**Sahip:** Claude (uygulama) → Codex (denetim ve birleştirme)  
**Taban:** `bb441ec2a619da8d199f00780cfab2a9b2cbabd4`  
**Hedef dal:** `repair/batch-d-archive-naming-2026-08-07`  
**Tarih:** 2026-08-07

## 1. Amaç

`_faz2/` kökünde test gibi görünen ama artık çalışmayan tarihsel eserleri silmeden arşivlemek; hâlâ anlamlı olan fakat adı yanlış beklenti yaratan üç aracı doğru adlandırmak. Böylece canlı yayın kapıları, geliştirici araçları ve tarihsel dosyalar birbirine karışmayacak.

Bu parti **yalnız düzenleme partisidir**. Ürün davranışı, test assertion'ları, manifest, ses, veri, onboarding ve erişilebilirlik değişmez.

## 2. Sayım düzeltmesi

2026-08-06 envanter önerisindeki “17 arşiv” toplamı `qa_kyuu_round.js` dosyasını tarihsel araç sayımına katmıştı. Bu dosya bayat değildir; güncel `index.html` üzerinde 九 authoring verisine yazan bir uygulama aracıdır. Bu nedenle:

- arşivlenecek dosya: **16**,
- yeniden adlandırılacak canlı dosya: **3**,
- silinecek dosya: **0**.

## 3. Arşivlenecek 16 dosya

Tüm taşımalar `git mv` ile yapılmalı. Hedef kök: `_faz2/_archive/`.

### 3.1 `legacy-tools/` — 5 tarihsel araç

- `edit_familystrip.py`
- `edit_onboarding.py`
- `edit_srs.py`
- `extract_srs.py`
- `inject_storage.py`

### 3.2 `obsolete-smokes/` — 9 yeniden üretilemeyen eser

- `smoke_onboarding.8step-OBSOLETE.txt`
- `smoke_onboarding_freshuser.8step-OBSOLETE.txt`
- `regress_check.js`
- `smoke_familystrip.js`
- `smoke_audio.js`
- `smoke_audio_6b.js`
- `smoke_audio_games.js`
- `smoke_audio_migration.js`
- `smoke_pathnorm.js`

Bu dosyaların dayandığı `atlas_drive_may30.html`, `atlas_pre_familystrip.html` ve `atlas_consumer1.html` dosyaları repoda ve Git geçmişinde yoktur. Arşivde çalışır test olarak sunulamazlar.

### 3.3 `superseded-smokes/` — 2 yerini yenisi almış test

- `smoke_srs.js` — yerine `srs_check.js`
- `smoke_storage.js` — yerine `storage_check.js`

## 4. Yeniden adlandırılacak 3 canlı dosya

Yalnız `git mv`; içerik ancak dosyanın kendi başlık/yardım metnindeki eski adı düzeltmek için değişebilir.

| Eski | Yeni | Gerekçe |
|---|---|---|
| `qa_kyuu_round.js` | `apply_kyuu_qa_round.js` | Test değildir; `index.html` üzerine yazar |
| `gate1_onboarding_b2.js` | `onboarding_b2_logic_fixture.js` | Codex yayın Gate 1 adıyla karışıyor; non-shipping mantık fixture'ıdır |
| `harness.js` | `families_report.js` | Genel test koşucusu değildir; aile karşılaştırma raporu üretir |

Aktif kod yorumlarında bu üç eski dosya adına yapılan güvenlik açıklamaları yeni adlarla güncellenmeli. Tarihsel `_AGENT_EXCHANGE` raporları/spec'leri ve import belgeleri **değiştirilmemeli**; onlar dönem kanıtıdır.

## 5. Arşiv belgesi

Yeni `_faz2/_archive/README.md` en az şunları içermeli:

- arşivin amacı ve “silinmedi, yayın kapısı değil” uyarısı,
- 16 dosyanın eski → yeni yol eşlemesi,
- her alt klasörün gerekçesi,
- `extract_srs.py` → canlı `srs_selector.extracted.js` / `srs_check.js` tarihsel ilişkisi,
- `inject_storage.py` → canlı `storage.js` / `storage_check.js` tarihsel ilişkisi,
- üç eksik HTML temelinin hiçbir zaman commit edilmediği bilgisi,
- geri alma yöntemi.

Arşiv dosyalarının içindeki bayat mutlak yolları onarmayın. Tarihsel içerik bayt olarak korunmalı; yalnız yolları taşınır.

## 6. Kesinlikle yasak kapsam

- `index.html`, `audio-manifest.json`, ses dosyaları veya herhangi bir ürün verisini değiştirmek
- `package.json`, `package-lock.json`, iki gate runner veya aktif test assertion/selector'larını değiştirmek
- arşivlenen dosyaları modernize etmek ya da yeniden çalışır hâle getirmek
- `smoke_home_rec.js`, onboarding test onarımı, erişilebilirlik, pictogram fallback, web manifest, native/store işi
- dosya silmek
- Batch E veya sonraki faza geçmek

## 7. Kabul ölçütleri

1. Taban tam olarak `bb441ec2a619da8d199f00780cfab2a9b2cbabd4`.
2. 16/16 dosya belirtilen arşiv alt klasörlerine `git mv` ile taşındı; içerik hash'leri taşıma öncesiyle aynı.
3. 3/3 canlı dosya doğru adlandırıldı; davranış kodu değişmedi.
4. `_faz2/` kökünde `atlas_drive_may30.html` referansı kalmadı. Referanslar yalnız `_archive/` altında ve tarihsel belgelerde olabilir.
5. `npm run gates` gerçek kilitli Chromium ile **10/10 + 3/3 PASS**, exit 0.
6. Gate koşumu öncesi/sonrası çalışma ağacı aynı ve temiz.
7. `git diff --check` bulgusuz.
8. `git diff --summary` taşımaları rename olarak gösteriyor; hiçbir dosya deletion olarak görünmüyor.
9. `index.html`, manifest, ses, ürün verisi ve paket dosyaları tabana göre bayt-identik.
10. `_archive/README.md` §5'teki tüm izlenebilirlik bilgisini içeriyor.

## 8. Negatif kanıtlar

Teslim raporunda ayrıca şunlar açıkça gösterilmeli:

- açık gate beyaz listelerinde `_archive/` altından çağrılan dosya sayısı: **0**,
- eski yanıltıcı üç adın `_faz2/` canlı kökünde bulunma sayısı: **0**,
- arşivlenen 16 dosyanın eski canlı yollarında bulunma sayısı: **0**,
- arşiv içeriğinin koşum sırasında değişmediği,
- silinen izlenen dosya olmadığı (rename tespitiyle birlikte).

## 9. Teslim

Claude şunları üretmeli:

- `_AGENT_EXCHANGE/claude/reports/2026-08-07-TEST-REPAIR-BATCH-D-ARCHIVE-NAMING.md`
- gerekli ham kanıtlar: `_AGENT_EXCHANGE/claude/evidence/2026-08-07-test-repair-d-archive-naming/`
- taban ve uç SHA,
- değişen/taşınan dosya listesi,
- içerik hash eşitliği tablosu,
- tam komutlar ve exit kodları,
- gerçek gate özeti,
- geri dönüş komutu,
- temiz son durum,
- tek `.bundle` teslimi.

Commitler küçük ve amaç bazlı olmalı: (1) arşiv taşımaları + README, (2) canlı adlandırmalar + zorunlu referans düzeltmeleri, (3) rapor/kanıt. Push engellenirse durma; bundle üret ve raporla.

## 10. Durma noktası

Batch D tesliminden sonra dur. Codex PASS vermeden arşiv temizliği, Batch E, erişilebilirlik, içerik, deploy veya store işine geçme.
