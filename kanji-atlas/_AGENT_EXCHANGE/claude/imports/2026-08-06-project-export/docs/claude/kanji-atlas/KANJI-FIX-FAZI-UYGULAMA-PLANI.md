# Kanji FIX Fazı — Uygulama Planı (kod DEĞİŞMEDEN)

> Audit kapandı (`KANJI-CONTENT-AUDIT-KAPANIS-MASTER.md`). Bu, 30 bulguyu (10 P0/10 P1/10 P2) uygulama planıdır. **Bu belge onaylanana kadar kod/DATA/CSS değişmez.** Authoring (44 boş köken) AYRI faz — buraya karışmaz.
> Branch `onboarding-b2-gate3` · HEAD `2efd279` · 2026-07-24.

## 0. MİMARİ KARARI — içerik şeması ≠ kullanıcı state şeması (Zeynep'in uyarısı doğrulandı)
Kodda teyit edildi:
- **İçerik = statik `const DATA = {…}`**, HTML'e gömülü, **versiyonsuz**. Runtime transform yok.
- **Kullanıcı state = `kana_state`** (localStorage), `SCHEMA_VERSION=2`, `migrateV0ToV1/V1ToV2/hydrate/safeMerge/createStorage` ile yönetiliyor. İçerikten bağımsız.
- Kullanıcı state'i içeriğe **yalnız kararlı anahtarlarla** bağlı: `learned{id}`, `srs` (id/karakter anahtarlı), `games`. **Hiçbir `id` veya `character` DEĞİŞMEDİĞİ sürece state etkilenmez.**

**KARAR:** İçerik, kullanıcı state migration'ından **AYRI versiyonlanır.**
- Yeni bir `CONTENT_VERSION` sabiti eklenir (ör. `"2026.07-c1"`), `SCHEMA_VERSION`'dan bağımsız.
- **`SCHEMA_VERSION` bump EDİLMEZ; `migrateV*` fonksiyonlarına DOKUNULMAZ.**
- İçerik düzeltmesi = statik dosya düzenlemesi → doğası gereği idempotent, kullanıcıda migration çalıştırmaz.
- Gerekçe: bir köken düzeltmesi her kullanıcıda state migration tetiklememelidir. İki şemayı tek geçişte birleştirmek gereksiz risktir. **→ Fix, bir localStorage migration'ı DEĞİL.** (Önceki "Migration penceresine biniyor" ifadem yanlıştı; düzeltiliyor.)
- `CONTENT_VERSION` yalnız cache-busting ve türetilmiş-veri (data_chars.json) yeniden üretimini tetiklemek için.

## 1. VERİ & ŞEMA (içerik v2)
Her kanjiye eklenecek/değişecek alanlar. **Kullanıcıya görünen (UI)** vs **yalnız iç veri/oyun mantığı (INT)** ayrımıyla:

| Alan | Tip | Görünürlük | Not |
|---|---|---|---|
| `formationType` | 象形/指事/会意/形声/会意形声 | INT + rozet | Kullanıcı terimi görmez; sade rozet ("Anlam+ses" vb.) |
| `structure.components[]` `{glyph, role, labelTr}` | role: semantic/phonetic/indicative/form/empty/uncertain | INT (oyun) + rol rozeti | Düz `components`+`component_meanings`'in yerine geçer |
| `etymology.summaryTr` | kısa TR köken | **UI** (`pictogram_note` yerine) | Sade, N5 |
| `etymology.confidence` A–X · `sources[]` · `disagreementNote` · `qaStatus` | INT | Denetim/QA izi | Kullanıcı görmez |
| `mnemonic.textTr` + `mnemonic.status` (`active`/`not_required`) | UI (yalnız active ise) | Katman çökmesinde `not_required` | Yapay ikinci hikâye ÜRETİLMEZ |
| `readings.taughtOn/taughtKun` | UI | Öğretilen | Karta çıkar |
| `readings.officialOn/officialKun/deferred[]` | INT | Referans | Resmî set (文化庁/jitenon) |
| `readings.irregularWords[]` (jukujikun) | UI etiketi | Kelime düzensiz-okuma rozeti | Kanjiye okuma EKLEMEZ |
| `id`, `character`, `meaning_tr`, `examples`, `stroke_order_steps` | DEĞİŞMEZ | — | **Kararlı anahtarlar; state güvenliği** |

**Geriye-uyumluluk stratejisi (oyun kodu churn'ünü azalt):** Geçişte eski `components`/`component_meanings` alanları KORUNUR ama **değerleri düzeltilir**; yeni v2 alanları yanına eklenir. Oyunlar önce `structure.role` ile filtrelenecek şekilde küçük güncellenir (bkz. §4), böylece 形声/tek-piktogram kanjiler anlam-kompozisyon havuzundan çıkar.

## 2. MIGRATION (içerik) — localStorage değil, türetilmiş-veri senkronu
- **Kullanıcı state:** DOKUNULMAZ. `SCHEMA_VERSION=2` sabit. Doğrulama: hiçbir `id`/`character` değişmedi → `learned/srs/games` anahtarları çözülmeye devam eder.
- **İdempotent:** içerik statik düzenleme; runtime transform yok → tekrar çalıştırma diye bir şey yok. `node --check` + `JSON.parse(DATA)` doğrulaması.
- **Backup/rollback:** git tag `pre-fix-content` (önce) / `fix-content-v2` (sonra). App'in `kana_state.bak.v1` yedeği state'e ait, etkilenmez. Rollback = git revert; kullanıcı verisi değişmediği için veri kaybı yok.
- **Eksik alan vs not_required:** yeni alanlar açık değerle eklenir. `mnemonic.status:"not_required"` = bilinçli boş; boş köken (`etymology.qaStatus:"pending"`) = authoring TODO. İkisi net ayrılır.
- **Eski kullanıcı verisi:** etkilenmez (yukarıda). Test: mevcut v2 state blob'u yükle → learned/srs korunuyor mu (smoke).
- **Başarısız durum:** içerik düzenleme atomik commit; `node --check` geçmezse commit edilmez. Canonical veri = index.html DATA; `data_chars.json` ondan türetilir (tersi değil).
- **Mastery/SRS migration'dan AYRI mı?** **EVET, kesinlikle ayrı.** İçerik `CONTENT_VERSION` ile, state `SCHEMA_VERSION` ile versiyonlanır. Aynı geçişte birleştirilmez. (Zeynep'in kararı benimsendi: statik dataset, kullanıcı state migration'ından ayrı versiyonlanır.)

## 3. P0 DÜZELTMELERİ (önce; P0 kapanmadan P1/P2/authoring YOK)
`時 語 校 晴 話 読 聞 何 大 王` — her biri:

| Kanji | Mevcut yanlış | Yeni doğru rol/yapı | Oyuna etki | Güncellenecek test |
|---|---|---|---|---|
| 時 | 寺="tapınak" (anlam) | 寺 role=phonetic (ジ) | comp-meaning/atolye havuzundan çıkar | game-pool-role smoke |
| 語 | 五="beş",口="ağız" | structure=言(sem)+吾(phon); 五/口 kaldır | havuzdan çıkar (phonetic) | game-pool-role |
| 校 | 交="kavşak" | 交 role=phonetic (kō) | havuzdan çıkar | game-pool-role |
| 晴 | 青="mavi" | 青 role=phonetic (sei) | havuzdan çıkar | game-pool-role |
| 話 | 舌="dil" | 𠯑 role=phonetic; 舌 kaldır | havuzdan çıkar | game-pool-role |
| 読 | 売="satmak" | role=phonetic | havuzdan çıkar | game-pool-role |
| 聞 | 門="kapı" | 門 role=phonetic; 耳 semantic çekirdek | havuzdan çıkar | game-pool-role |
| 何 | 可="olabilir" | 可 role=phonetic | havuzdan çıkar | game-pool-role |
| 大 | 人+一 parçalama | components=[] (象形) | tüm bileşen oyunlarından çıkar | single-pictograph smoke |
| 王 | 一+二+三 | components=[] (象形 balta) | çıkar | single-pictograph + FAMILIES |

P0 mekanizması: (a) 形声 → phonetic rol işaretle + anlam-kompozisyon havuzundan filtrele; (b) 象形 (大王) → `components=[]` → doğal olarak tüm bileşen oyunlarından çıkar. **Köken metinleri authoring fazında yazılır; Fix yalnız yanlış YAPIYI kaldırır** (yanlış öğretmeyi durdurmak yeterli; boş köken zararsız).

## 4. OYUN MOTORU ETKİSİ
**Component verisi kullanan oyunlar (runtime, DATA'dan):**
1. `comp-meaning` (ptype comps) — pool: comps≥2 & hepsi glosslu → "parçalar→anlam"
2. `atolye` (ptype atolye) — pool: comps≥2 & hepsi glosslu → "parçalar hangi kanji"
3. `structure` — pool: comps≥2 → "eksik parça"
4. `comp-select` (multi) — pool: comps≥1 → "parçaları seç"
5. `family` — **sabit-kodlu `FAMILIES`** (component_meanings değil)
6. Detay kartı (satır ~3461) — component_meanings render

**Kontrol edilen riskler:**
- ✅ Fonetik bileşen anlam seçeneği olarak sunuluyor → §3 rol-filtresi çözer (形声 havuzdan çıkar).
- ✅ Tek piktogram yapay parçalara bölünüyor → 大王玉 `components=[]`.
- ⚠️ **`FAMILIES` yanlış girdi:** `{root:"hito",members:["dai","yasumu","onna"]}` — 大/女 人'den türemiyor. FAMILIES elden geçirilmeli (dai, onna çıkar; yalnız gerçek 亻/人 içerenler kalır). `family` oyununa + Aile Şeridine yayılıyor.
- ⚠️ **`_faz2/data_chars.json` bayat kopya:** graph_check/list_progress_check/harness bunu okuyor → **DATA düzeltilince yeniden üretilmeli.**
- ✅ Başka cache/serialize edilmiş havuz YOK (hepsi runtime).

**Önerilen yeni smoke testler (eski türetilmiş veriyi kullanmadığını KANITLAR):**
1. `smoke_game_roles.js` — comp-meaning/atolye havuzundaki HER kanjinin TÜM bileşenleri `role=semantic` (fonetik/gösterge havuza giremez).
2. `smoke_single_pictograph.js` — 象形 listesi (大王玉日木...) hiçbir bileşen-oyun havuzunda değil (components=[]).
3. `smoke_datachars_sync.js` — `_faz2/data_chars.json` == index.html'deki DATA.chars (regen + diff = boş).
4. `smoke_families.js` (mevcut families.js güçlendir) — her FAMILIES üyesi köke gerçekten (bileşen/tarihsel) bağlı.
5. `smoke_no_phonetic_as_meaning.js` — hiçbir component_meanings girişi, o kanjide phonetic işaretli bir bileşene "anlam" atamıyor.

## 5. P1 / P2 SIRASI (P0 sonrası)
**P1:** yanlış component (国: 口→囗; 玉: 王 bileşenini kaldır) · folk etimoloji yapısı (玉) · eksik resmî okuma (月ガツ 九ク 四よつ 足たりる 後うしろ 生うまれる 話はなし 何なん — `readings.taughtKun/On`'a ekle).
**P2:** gösterge çizgisi glossları (天夫本: `一` role=indicative, "bir" değil) · **katman çökmesi (32): `mnemonic.status:"not_required"`** — yapay mnemonic ÜRETİLMEZ · ek okumalar (人ニン 男ナン 大タイ) · jukujikun etiketleri (大人 明日 今日 お母さん お父さん 上手 下手 → `readings.irregularWords`).

## 6. AUTHORING AYRI KALIR
Fix ≠ Authoring. **Fix** = mevcut yanlış/eksik-yapılandırılmış veriyi düzeltir (rol, okuma, etiket, not_required). **Authoring** = yazılmamış içeriği üretir (44 boş köken + P0/P1'lerin yeni sade kullanıcı metinleri).
- Ayrı kabul kriteri, ayrı commit/tag: Fix → `fix-content-v2`; Authoring → `authoring-koken-v1`.
- Boş köken/yeni metin bu plana KARIŞMAZ.

## 7. KABUL KRİTERLERİ (Fix kapanış kontrolü)
- [ ] 10 P0'ın tamamı kaynak veride düzeltildi (rol/象形).
- [ ] Oyun havuzunda eski yanlış rol KALMADI (smoke_game_roles + smoke_single_pictograph yeşil).
- [ ] `data_chars.json` yeniden üretildi, DATA ile birebir (smoke_datachars_sync yeşil).
- [ ] `FAMILIES` yanlış girdilerden temizlendi (smoke_families yeşil).
- [ ] İçerik `CONTENT_VERSION` bump edildi; `SCHEMA_VERSION` DEĞİŞMEDİ.
- [ ] Migration iki kez "çalıştırıldığında" (idempotent edit) veri bozulmadı; `node --check` + `JSON.parse(DATA)` geçti.
- [ ] Rollback doğrulandı (git revert → önceki tag, kullanıcı verisi korunur).
- [ ] Eski kullanıcı v2 state blob'u yüklendiğinde learned/srs korundu (smoke_backup/smoke_recognition + state smoke yeşil).
- [ ] Tüm mevcut smoke testler geçti (recognition 23/23, backup 17/17, srs, familystrip, audio_games...).
- [ ] **İçerik QA (bulgu doğruluğu) ile teknik QA (test/migration) AYRI raporlandı.**

## Önerilen COMMIT SIRASI
1. `tag: pre-fix-content` (güvenli nokta)
2. `commit A — şema v2 iskelet`: yeni alanlar + `structure.role` modeli + oyun havuzu rol-filtresi + data_chars.json regen + FAMILIES temizliği + 5 yeni smoke. **Değer değişikliği yok**, yalnız yapı. → tüm testler yeşil.
3. `commit B — P0 (10)`: rolleri/象形'leri düzelt. → smoke_game_roles + single_pictograph yeşil. **P0 kapanışı.**
4. `commit C — P1`: 国/玉 component + eksik resmî okumalar.
5. `commit D — P2`: gösterge glossları + katman-çökmesi not_required + ek okuma + jukujikun etiketleri.
6. `tag: fix-content-v2` (Fix kapanışı). İçerik QA + teknik QA ayrı rapor.
7. (Authoring AYRI branch/faz: `authoring-koken-v1`.)

## Riskler
| Risk | Azaltma |
|---|---|
| Oyun kodu `component_meanings`'i doğrudan okuyor → rol modeli eklerken kırılma | Geçişte eski alanları koru, yanına role ekle; havuz filtresini role'e taşı; smoke ile doğrula |
| `data_chars.json` unutulursa testler bayat veriyle yeşil yanılgısı | commit A'da regen + smoke_datachars_sync zorunlu |
| FAMILIES elle düzeltmede eksik kalması | smoke_families her üyeyi köke bağlı doğrular |
| 形声 havuzdan çıkınca anlam-kompozisyon oyunu az kanjiyle kalır | Kabul: doğru az > yanlış çok; ileride "ses ailesi" oyunu (Authoring/feature) telafi eder |
| id/character yanlışlıkla değişirse state kırılır | Kesin kural: id/character DOKUNULMAZ; smoke ile kontrol |
