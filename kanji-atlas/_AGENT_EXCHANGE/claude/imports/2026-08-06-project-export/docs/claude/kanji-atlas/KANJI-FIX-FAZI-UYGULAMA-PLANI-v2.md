# Kanji FIX Fazı — Uygulama Planı v2 (Zeynep'in 10 revizyonuyla)

> `KANJI-FIX-FAZI-UYGULAMA-PLANI.md`'nin revize halidir; onaylanan mimari + 10 düzeltme. **Kod A1 dışında değişmez; A1 davranış değiştirmez.** Authoring AYRI faz.
> Branch `onboarding-b2-gate3` · HEAD `2efd279` · 2026-07-24.

## Onaylanan mimari (sabit)
- Statik içerik şeması ≠ `kana_state` kullanıcı şeması. `SCHEMA_VERSION` YÜKSELTİLMEZ. `id`/`character` DEĞİŞMEZ. `data_chars.json` canonical DEĞİL, DATA'dan türetilir. Fix ≠ Authoring.

## 10 REVİZYON (plana işlendi)

### R1 — Oyun başına ROL-İZİN MATRİSİ (tek genel "bileşen oyunu" kuralı YOK)
Kritik ayrım: "karakter hangi parçalardan oluşur" ≠ "parça oyunda nasıl kullanılır". 寺 hâlâ 時'nin gerçek işlevsel bileşenidir (yalnız anlam değil). Bu yüzden 時 "parçalar→anlam" oyununa girmez ama "eksik parçayı bul"/"parçaları seç"e girebilir.

| Oyun | semantic | phonetic | indicative | form | uncertain |
|---|---|---|---|---|---|
| comp-meaning (parçalar→anlam) | ✅ | ❌ | koşullu | ❌ | ❌ |
| atolye (anlamdan kur) | ✅ | ❌ | koşullu | ❌ | ❌ |
| structure (eksik görsel parça) | ✅ | ✅ | ✅ | ✅ | ❌ |
| comp-select (parçaları seç) | ✅ | ✅ | ✅ | ✅ | ❌ |
| (ileride) ses ailesi | ❌ | ✅ | ❌ | ❌ | ❌ |
"koşullu" = indicative parça yalnız anlam iddiası taşımıyorsa. `uncertain` hiçbir otomatik havuza girmez. `smoke_game_roles` bu matrise göre çalışır, tek genel kurala göre değil.

### R2 — Commit A ikiye bölünür (altyapı ≠ davranış)
- **A1 — compatibility scaffold, DAVRANIŞ/DEĞER DEĞİŞİKLİĞİ YOK:** v2 alan modeli desteği, eski/yeni render fallback'leri, generator script, sync/hash/version testleri, `CONTENT_VERSION`/`CONTENT_HASH`, ve **eski veride davranışın birebir korunduğunu kanıtlayan regression testi.**
- **A2 — ilk davranış/veri düzeltmeleri:** rol-izin matrisi filtrelerinin AKTİVE edilmesi + FAMILIES temizliği + yanlış havuz üyeliklerinin kaldırılması. Davranış değişikliği BURADA başlar.

### R3 — `structure.components` CANONICAL; legacy türetilmiş
- Tek hakikat = `structure.components` (rol dahil). `components`/`component_meanings` = yalnız geçici, **türetilmiş** uyumluluk alanları; **elle düzenlenmez.** Bir generator v2'den legacy'yi üretir.
- `smoke_legacy_components_derived` — legacy alanlar ile `structure.components` arasında **elle sapma olmadığını** doğrular (iki-hakikat borcunu engeller).
- Fix sonunda legacy alanları kaldırmak için ayrı **deprecation** kararı (commit E).

### R4 — `data_chars.json` üretim hattına bağlanır (elle güncellenmez)
`index.html DATA → generate-data-chars script → _faz2/data_chars.json`. Tek komut; test yeniden üretip diff kontrol eder; bayat kopyada smoke BAŞARISIZ olur. **Tercih:** teknik olarak mümkünse testler doğrudan canonical DATA'yı okusun ve ayrı kopya KALDIRILSIN (senkron testinden iyidir); kaldırılamıyorsa generator + diff smoke zorunlu.

### R5 — Eksik resmî okuma otomatik `taught`'a EKLENMEZ
Kilitli ilkeye dönüş. Sıra: (1) eksik resmî okuma → `officialOn/officialKun`; (2) mevcut örnekte kullanılıyorsa `taught` güçlü aday; (3) N5 için gereksiz → `deferred` + `deferReason`; (4) `taught` kararı ayrı pedagojik QA. P1 tablosuna sütunlar: `official_missing`, `used_in_current_examples`, `taught_decision`, `defer_reason`. (月ガツ örnekte var → taught adayı; ama liste otomatik aynı muamele görmez.)

### R6 — FAMILIES canonical'dan türetilir + aile türü + provenance
- FAMILIES ayrı sabit liste OLMAZ; mümkünse `structure.components`'ten türetilir. Aile türü: `semantic_family` / `phonetic_family` / `visual_family` / `indexing_family`. Her ilişkide provenance/QA.
- Manuel istisna → açık **whitelist**. "Tarihsel bağ" ilişkileri **audit fixture** ile doğrulanır (smoke değil). Teknik test = veri bütünlüğü; içerik QA = ilişki doğruluğu. İkisi karıştırılmaz. (Yanlış verinin kendini doğrulaması engellenir.)

### R7 — CONTENT_VERSION somut mekanizmaya bağlanır + CONTENT_HASH
Sabit tek başına hiçbir şeyi tetiklemez. Bağlanacağı somut çıktı yazılır: generator manifesti + (native tek-HTML bundle olduğundan) izlenebilirlik/QA + test. Gerçek cache invalidation'ı native build sürümü sağlar. Ek: `CONTENT_HASH` = canonical DATA'dan otomatik checksum (sürüm artırmayı unutma riskini yakalar). Kabul kriteri: **CONTENT_VERSION/HASH değiştiğinde hangi somut çıktının değiştiği testle kanıtlandı.**

### R8 — `etymology.qaStatus=pending` → köken bölümü RENDER EDİLMEZ
Boş "Kökeni" bölümü kırık kart bırakmasın. `pending` iken: köken bölümü kullanıcıya hiç render edilmez · placeholder tarihsel gerçek gibi görünmez · eski yanlış metin fallback GELMEZ · pending alanlar oyunlara girmez. (Authoring ayrı kalırken yayın kalitesi korunur.)

### R9 — `mnemonic.status` üç durum
`active` / `not_required` (bilinçli gerekmiyor) / `pending_review` (henüz denetlenmedi). İkisi aynı değil.

### R10 — Kabul kriteri: runtime "migration iki kez" YERİNE generator determinism
Bu runtime migration değil. "Migration iki kez çalıştırıldığında" KALDIRILDI. Yerine: **generator iki kez çalıştırıldığında aynı çıktı (deterministik/idempotent), formatter/build deterministik, ikinci çalıştırmada diff yok.**

### Küçük düzeltmeler
- `formationType` + `formationTypeSource` + `formationTypeConfidence` birlikte (会意形声 sözlükler arası değişebilir).
- Rol adları: `indicative` ≠ `semantic`; 本'deki işaret çizgisi bağımsız anlam parçası değil → comp-meaning havuzuna otomatik girmez (R1 matrisi).
- Rollback yalnız git değil: eski build açılıyor mu · yeni içerikle yazılmış state eski build'de okunuyor mu · native/SW cache eski içeriği gerçekten getiriyor mu.

## REVİZE COMMIT DİZİSİ
- `tag pre-fix-content`
- **A1 — Content v2 compatibility scaffold:** v2 alan modeli + eski/yeni render fallback + generator + sync/hash/version testleri + regression (davranış değişikliği YOK).
- **A2 — Game role policy:** oyun başına rol-izin matrisi + havuz filtreleri + testler + (kanji verisi değişmeden) regression.
- **B — P0 content corrections:** 8 形声 rol düzeltmesi + 大/王 yapı + yanlış FAMILIES ilişkileri + P0 içerik QA.
- **C — P1 corrections:** 国/玉 + official/taught/deferred okuma kararları + kart-içi örnek-okuma tutarlılığı.
- **D — P2 normalization:** indicative roller + mnemonic status + irregular-word etiketleri.
- **E — Legacy consistency/deprecation:** legacy'nin v2'den türetildiğinin doğrulanması + kaldırılacak alan listesi + full regression.
- `tag fix-content-v2`
- (Authoring AYRI: `authoring-koken-v1`.)

## KABUL KRİTERLERİ (güncel)
- 10 P0 kaynak veride düzeltildi · oyun havuzunda eski yanlış rol yok (rol-matris smoke) · legacy alanlar v2'den türetilmiş, elle sapma yok · data_chars üretim hattına bağlı (veya kaldırıldı) · resmî okuma official'a eklendi, taught kararı ayrı QA · FAMILIES canonical'dan + tür/provenance · CONTENT_VERSION/HASH somut çıktıya bağlı ve testli · pending köken render edilmiyor · generator deterministik (iki çalıştırma = diff yok) · rollback release düzeyinde doğrulandı · eski kullanıcı state korundu · tüm smoke geçti · **içerik QA ≠ teknik QA ayrı rapor.**

## Her commit sonunda: kod + veri diff özeti + geçen testler raporlanır, DURULUR.
