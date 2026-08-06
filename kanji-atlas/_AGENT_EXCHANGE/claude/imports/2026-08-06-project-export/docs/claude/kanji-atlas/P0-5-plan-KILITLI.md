# Kanji Atlas — P0-5 Kana SRS · Kod-Dışı Uygulama Planı (P0-5A ONAYLI · KİLİTLİ)

> **P0-5A ONAY DURUMU:** Aşağıdaki dört uygulama garantisi + yumuşatılmış SEED gerekçesi + görsel karar eklenerek **P0-5A ONAYLANDI** (Zeynep + GPT). Yalnız P0-5A uygulanır; 1-13 smoke + değişen fonksiyonlar + backup/read-only kanıtı sunulup **P0-5B'ye geçmeden yeniden onay beklenir.**

## KİLİTLİ KABUL EKLERİ (P0-5A — uygulama garantileri)
1. **Backup zorunlu kapı:** `.bak.v1` yazımı başarısızsa migration **commit edilmez** → canonical değişmez → schemaVersion yükselmez → **read-only** açılır. Backup yazıldıktan sonra **geri okunup `raw`+`sourceHash` eşleşmesi doğrulanmadan** canonical v2 yazılmaz.
2. **Backup/hash davranışı:** Tek `kana_state.bak.v1` anahtarı atomik yenilenir; güncel backup `sourceHash`'i migrate edilen raw blob ile **birebir** eşleşmeli; hash **deterministik ve fixture-testable** (FNV-1a); eski backup, yeni backup başarılı+doğrulanmadan geçerli rollback kaynağı olmaktan çıkmaz (setItem atomikliği → yarım/bozuk backup olmaz). Migration yalnız güncel backup source blob ile eşleşiyorsa devam eder.
3. **Read-only merkezi kilit:** Koruma **yalnız `createStorage.save()`** katmanında; `readOnly=true` iken save/reset/onboarding/srsRecord/oyun sonucu/userHint hangi yol çağrılırsa çağrılsın canonical progress blob'una **hiçbir yazma yapılmaz**. Smoke 12: kullanıcı eylemleri + reset sonrası canonical blob **byte-değişmez**.
4. **V2 validator katı:** `correct/wrong/seen/write` = finite **integer** ≥0; `mastery` = finite integer 0..4; `last/next` = null **veya** finite ≥0 timestamp; **invariant `seen ≥ correct+wrong`**; geçerli existing seen `correct+wrong`'dan küçükse `max(existingSeen, correct+wrong)` ile normalize.

**SEED gerekçesi (yumuşatıldı):** Bugünkü **canlı** kod yolları doğrulandı; eski sürümün bütün tarihçesi kesin değil. SEED=1'in gerekçesi, eski UI'da öğrenilmiş sayılan kullanıcı ilerlemesini koruyan **conservative migration** olmasıdır; **sahte last/next üretilmez** (null).
**SEED görsel kararı (kilitli):** legacy boolean-only kana → mastery 1 → ortak mastery mürekkebi **%25**; **özel legacy rendering EKLENMEZ.**

---

# (Kod-Dışı Uygulama Planı — teknik gövde)

> **Kural:** Bu plan onaylanmadan production storage'a dokunan **hiçbir kod uygulanmaz.** P0-4 KİLİTLİ ortak-mastery spec'i temel alınır.
> **Bölünme:** **P0-5A = Storage migration** (yalnız veri şekli; davranış/UI YOK). **P0-5B = Kana SRS davranışı** (yazma yolları, review kuyruğu, derived kaynak). İki alt-dilim **ayrı doğrulama adımlarında**; migration ile yeni SRS davranışı **aynı testte karıştırılmaz.**
> **Bu revizyon** Zeynep + GPT'nin 9 kritik düzeltmesini işler. En kritik ikisi: sahte `seen=1` üretimi ve v3 verinin `safeMerge` tarafından v2'ye düşürülmesi — ikisi de aşağıda kapatıldı.

---

## 1. Envanter — gerçek schemaVersion, key'ler, veri şekli, okuyan/yazan fonksiyonlar

| Öğe | Gerçek yer | Değer |
|---|---|---|
| `SCHEMA_VERSION` | index.html:1404 | `1` |
| `DAY` / `SRS_DAYS` | :1372 / :1374 | `86400000` / `[0,1,3,7,16]` |
| `DEFAULT_STATE` | :1407-1415 | learned{}, status{}, kana{}, srs{}, games{}, userHints{}, … |

**Storage key'leri (`createStorage` :1480-1509):** `"kana_state"` (kanonik JSON blob) · `"kana_state_recovery_"+now()` (bozuk JSON ham kopyası :1490, orijinal silinmez).

**Eski veri şekilleri (v1):**
- `srs[key] = {correct,wrong,mastery,last,next}` — default `{...,last:0,next:0}` (:1552, **null değil, 0**).
- `kana[char] = true` — kana için yalnız boolean.
- `learned[id]=true`, `status[id]="new|learning|soon|almost|mastered"` — kanji legacy aynaları (srsRecord :1559-1562).

**Okuyan/yazan gerçek fonksiyonlar:** `migrate`/`migrateV0ToV1` (:1434/:1422) · `safeMerge` (:1444, **her durumda `schemaVersion=SCHEMA_VERSION` damgalar** :1450) · `hydrate` (:1467, kritik-alan doğrulaması :1474) · `createStorage.read/save` (:1485/:1495; save schemaVersion damgalar+yazar :1501; recovery modunda `{ok:false}` yazmaz :1497) · `load`/`save` (:1515/:1530) · `clearProgressData` (:1535; `srs/kana/learned/status={}`, **userHints DOKUNMAZ**) · `srsRecord(key,correct)` (:1550) · `buildKanjiReviewQueue` (:1572, yalnız `type==="kanji"`) · `masteryScore` (:1608, srs yoksa `learned[key]?40:0` fallback). Node testi: `module.exports` :1511.

**Kana yazma noktaları — gerçek semantik (inceleme sonucu):**
| Nokta | Satır | Tetik | srs? | Durum |
|---|---|---|---|---|
| `data-kana` | :5323 | **hiçbir yerde render EDİLMİYOR** (grep boş; yalnız :5264 dispatch + :5323 handler) | Hayır (boolean) | **ÖLÜ/erişilemez legacy handler** |
| `kana-known` | :5340 (buton :3882 "Tanıyorum olarak işaretle") | Kullanıcı açık "tanıyorum" beyanı | **Evet** `srsRecord(k,true)` | Canlı |
| `mochi` başarı | :5220-5221 | Tüm vuruşlar doğru çizilince (`_mochi.success`) | **Evet** `srsRecord(char,true)` | Canlı |

**Sonuç:** Bugün canlı kodda her `kana[char]=true` **zaten bir srs kaydıyla** birlikte gelir. **Boolean-only kana yalnız ESKİ sürüm verisinde** bulunur — migration'ın gerçek hedefi budur.

**Kana tamamlanma/gösterim — hepsi boolean `state.kana[char]` tabanlı:**
- `learnedKana = allKanaChars.filter(x=>state.kana[x.character]).length` (:2501) → `kanaPct = learnedKana/total*100` (:2525), `learnedKana/total` gösterimi (:2579), `established` (:2534).
- Grup: `groupDone = groupChars.filter(c=>state.kana[c]).length` (:2665,:3603); `completed = groupDone===groupTotal` (:2667); `pct` (:2671); "tamam" etiketi (:2679).
- `doneInSet` (:2654,:2727).

---

## 2. Eski → yeni alan eşleme (semantik dahil)

| v1 | v2 | Kural |
|---|---|---|
| `srs[key]={correct,wrong,mastery,last,next}` | `{type,correct,wrong,mastery,seen,write,last,next}` | Mevcut alanlar KORUNUR; `type` atanır; `seen` **§ tiered kuralı** (aşağı); `write=0` |
| `kana[char]=true` **+ srs YOK** (legacy) | `srs[char]={type:'kana',mastery:1,correct:0,wrong:0,seen:1,write:0,last:null,next:null}` | **SEED=1 — ürün onayı §7'de.** `kana[char]=true` ayna olarak KALIR |
| `kana[char]=true` **+ srs VAR** | Mevcut srs KORUNUR; yalnız eksik `type/seen/write` normalize | Boolean güçlü kaydı EZMEZ |
| type çözülemeyen srs kaydı | `_migrationQuarantine.srs[key]` (kayıpsız taşınır) | Canonical srs'ten çıkar → validator geçer, **sessiz silme YOK** (§6-düzeltme) |
| `learned/status` | Aynen kalır — **write-only ayna** (5B sonrası okuma-kaynağı değil) | Silinmez |
| `schemaVersion:1` | `2` | Yalnız doğrulanmış write ile (§6) |

**`seen` normalizasyonu (DÜZELTİLDİ — sahte seen=1 yok):**
```
if (validExistingSeen)          seen = existingSeen;   // idempotent tekrar
else if (correct + wrong > 0)   seen = correct + wrong;
else if (mastery > 0)           seen = 1;              // pozitif mastery eski sistemden kanıt
else                            seen = 0;              // hiç görülmemiş → seen=0 (sahte değil)
```
`mastery=0 & correct+wrong=0` → **seen=0** (eski `max(1,…)` yanlıştı; I2-I4'ü bozardı).

`type` çözümü **enjekte edilen resolver ile** (§5): `resolveType(key)` → `kanji|radical|word|kana|null`. `null` → quarantine.

---

## 3. Migration'ın kesin işlem sırası (P0-5A)

**Okuma akışı (hydrate/read), forward-guard EN BAŞTA:**
1. Ham parse + `isPlainObject` (mevcut :1470-71). Bozuk → recovery, ham DOKUNULMAZ.
2. **FORWARD-SCHEMA GUARD (yeni, `safeMerge`'den ÖNCE):** `storedVersion > SCHEMA_VERSION` ise → **migrate ETME, safeMerge ETME, save ETME**; `{unsupported:true, readOnly:true}` döndür; state **byte düzeyinde değişmez** (§7-idempotency). Uygulama read-only açılır, canonical write kapalı.
3. `migrate(parsed)`: `if(ver<1) migrateV0ToV1; if(ver<2) migrateV1ToV2(...)`.

**`migrateV1ToV2(state,{resolveType,isKana})` — SAF (storage/DATA yok, §5):**
1. `ver>=2` → NO-OP (girdiyi aynen döndür, mutate etme).
2. srs normalize: her kayda `type=resolveType(key)`, `write:0`, `seen`= §2 tiered kuralı. mastery/correct/wrong/last/next KORUNUR.
3. `type===null` → kaydı **`out._migrationQuarantine.srs[key]`'e taşı** (kayıpsız), canonical srs'ten çıkar.
4. `kana[char]=true` + srs YOK → SEED kaydı ekle (`last:null,next:null`, sahte tarih yok).
5. srs VAR olan kana → yalnız `type/seen/write` normalize, mevcut değerleri EZME.
6. Legacy aynalar (`kana/learned/status`) olduğu gibi kalır.
7. Dönüşmüş **yeni nesneyi** döndür; **girdi nesnesi mutate EDİLMEZ** (§5 saflık testi).

**Commit akışı:** `migrate` → `safeMerge` → **v2-şekil doğrulaması** (§6) → geçerse `save()` atomik `setItem` + schemaVersion damga. Geçmezse → **recovery/read-only, canonical write kapalı** (§4).

---

## 4. Yedek + rollback (DÜZELTİLDİ — hash'li yedek + fail=read-only)

**Yedek — kaynak-blob'a bağlı, sabit snapshot DEĞİL:**
- Migrate edilecek ham v1 blob'un hash'i alınır. Yedek: `"kana_state.bak.v1"` içeriği `{ sourceHash, createdAt, raw }`.
- Kural: canonical v1 hash **==** yedek `sourceHash` → yeniden yazma. **Farklıysa** (ilk deneme fail olup kullanıcı v1'de çalışmaya devam edip blob değiştiyse) → **yeni yedek üret.** Doğrulanan v2'nin **hangi sourceHash'ten üretildiği** kaydedilir (`state._migratedFrom = sourceHash`).
- Böylece rollback kaynağı **her zaman gerçek migration girdisiyle eşleşir.**

**Rollback / fail davranışı (DÜZELTİLDİ):**
- Migration doğrulama **fail → canonical `"kana_state"`'e HİÇBİR yazma yok** → uygulama **recovery/read-only modda** açılır: kullanıcı verisi **görüntülenebilir**, **ilerleme YAZILAMAZ**, hata raporu + `.bak`'tan manuel kurtarma yolu.
- **Neden "normal yazılabilir eski state" DEĞİL:** aksi halde `save()` dönüşmemiş v1'e `schemaVersion=2` damgalayıp sahte-v2 üretebilir. Bu yol kapatıldı.
- Atomiklik: tek `setItem` — ya tam doğrulanmış v2 ya hiç.

---

## 5. Geçici key / iki aşamalı commit + saf migrate

**İki aşamalı commit:**
- **Aşama 1:** hash'li yedek yaz (`.bak.v1` §4).
- **Aşama 2:** v2 nesnesini **bellekte doğrula** (§6), geçerse tek atomik `setItem("kana_state", …)`. Geçmezse yazma yok → read-only.

localStorage `setItem` key-atomik olduğu için ayrı "pending" key zorunlu değil; doğrulama **commit'ten önce bellekte** yapılır — geçersiz v2 canonical key'e asla ulaşmaz.

**`migrateV1ToV2` gerçekten saf (DÜZELTİLDİ):**
- İmza: `migrateV1ToV2(state, { resolveType, isKana })` — **global `DATA` YOK.** Uygulamada gerçek resolver enjekte edilir; Node fixture'ında stub resolver.
- **Saflık testi iki şeyi doğrular:** (a) çıktı doğru, (b) **girdi nesnesi mutate edilmedi** (`deepEqual(inputBefore, inputAfter)`). Yalnız idempotency yetmez.

---

## 6. schemaVersion bump — yalnız doğrulama sonrası

- `migrateV1ToV2` şemayı damgalamaz; yalnız veri şekli üretir. **schemaVersion migration BAŞINDA yükseltilmez.**
- **v2-şekil doğrulaması** (bump'tan önce, `hydrate` ok-kontrolüne eklenir): her canonical `srs` kaydında geçerli `type∈{kanji,radical,word,kana}`, `mastery∈0..4`, sayısal `correct/wrong/seen/write`, `last/next∈finite|null`. Quarantine kayıtları canonical'da olmadığı için validator geçer (§2-düzeltme, "her kayıtta valid type" ↔ "unknown dokunma" çelişkisi böyle çözülür).
- schemaVersion=2 **yalnız** `save()` başarılı `setItem`'ında düşer (:1501); recovery/read-only'de yazma yok → v1 blob yerinde. Yarım migration → schemaVersion 1 kalır → sonraki açılış yeniden dener.

---

## 7. Idempotency + forward-schema senaryoları

| Senaryo | Davranış |
|---|---|
| **İlk çalıştırma** (v1) | migrateV1ToV2 → hash'li yedek → doğrula → schemaVersion=2 |
| **İkinci çalıştırma** (v2) | `ver>=2` → NO-OP; yedek hash aynı → yeniden yazma yok; `migrate∘migrate=migrate` |
| **Yarım kalmış** | Doğrulama fail → yazma yok → stored v1 → sonraki açılış yeniden dener |
| **Zaten v2** | NO-OP; alan yeniden atanmaz |
| **Bozuk/eksik v1** | parse/plainObject fail → recovery, ham DOKUNULMAZ |
| **İleri sürüm (v3+) — DÜZELTİLDİ** | `storedVersion>SCHEMA_VERSION` → **migrate/safeMerge/save YOK**, state **byte-değişmez**, read-only sonuç. **Ayrı fixture: blob byte düzeyinde aynı.** |

**Kana yazma noktası semantiği (§7 gereği belgelendi):**
- `data-kana` (:5323): **ölü handler** (render yok) → migration/mastery kararına dahil değil; fallback-temizlik adayı (silme değil, §12).
- `kana-known` (:5340): kullanıcı açık "tanıyorum" → gerçek tanışıklık → mastery meşru.
- `mochi` (:5220): vuruş-doğru başarılı çizim → gerçek yazım/recall → mastery meşru.
- **Legacy boolean-only kana**, tarihsel olarak aynı "işaretle/tanıyorum" eylemlerinden geldi → **SEED=1 semantik olarak tutarlı**, ancak **ürün kararı olarak Zeynep onayı gerektirir** (otomatik/pasif temas kaynağı olmadığı bu tabloyla kanıtlandı).

---

## 8. I1–I4 invariant'ları (seen kuralı düzeltilmiş)

| # | Invariant | Garanti | Fixture | Başarı | Başarısızlık |
|---|---|---|---|---|---|
| **I1** | `mastery>0 & correct+wrong=0 → seen=1` | tiered kural 3. dal | mastery=2,sayaç=0 | seen=1 | migration iptal → read-only |
| **I2** | seen yalnız anlamlı maruziyette; render/liste/açılış artırmaz | migration bir kez set; 5B'de yalnız srsRecord | 2× load + gezinme | seen değişmez | 5B yazma yolu reddi |
| **I3** | `seen>0` learned üretmez; learned yalnız mastery>0 | derived kaynak mastery | seen=2,mastery=0 | "Öğrenildi" YOK | derived düzeltme |
| **I4** | `mastery:0,seen>0 → "Yeni"` | grup helper mastery-tabanlı | seen=3,mastery=0 | "Yeni" | helper düzeltme |

**Ek:** `mastery=0 & sayaç=0 → seen=0` (sahte seen yok); kana sahte last/next üretmez (null); güçlü srs boolean'la düşmez; type-null kayıt quarantine'e kayıpsız; userHints korunur; bozuk JSON ezilmez; migrate idempotent **VE** girdi-mutasyonsuz; forward-schema byte-değişmez; legacy aynalar korunur ama okuma-kaynağı değil. Fixture'lar `module.exports` ile node'da (production storage'sız).

---

## 9. Semantik eşdeğerlik — FORMÜLLEŞTİRİLDİ

**Karar (kilitlenecek): "öğrenilmiş" eşiği = `mastery>=1`.** Böylece legacy boolean (SEED→mastery 1) yeni sayımda da öğrenilmiş kalır.

| Ölçü | Eski formül | Yeni formül | Eşdeğerlik |
|---|---|---|---|
| Öğrenilmiş kana adedi | `filter(state.kana[c]).length` (:2501) | `filter(mastery(c)>=1).length` | boolean-true ↔ SEED mastery≥1 → **birebir** |
| Grup tamamlanma | `groupDone===groupTotal` (boolean) | `filter(mastery(c)>=1)===groupTotal` | **birebir** |
| Gösterilen % | `learnedKana/total*100` (:2525) | aynı formül, mastery≥1 sayımı | **birebir** |

**Fixture 3 sayıyı karşılaştırır:** öğrenilmiş karakter adedi · tamamlanmış grup adedi · kullanıcıya gösterilen yüzde. Migration öncesi (boolean) == sonrası (mastery≥1). **Kayıp=0 tek başına yetmez** — bu üç sayının eşitliği şart.

**Bilinen görsel fark (flag, gizlenmiyor):** mürekkep-dolgu `masteryScore` (:1608) bugün boolean-only kana için `learned[c]?40:0`=**0%** döndürüyor (kana `learned` set etmiyor). SEED sonrası mastery 1 → `(1/4)*100=25%`. Yani dolgu **0→25 YUKARI** gider (düşüş değil). Tamamlanma sayımından **ayrı** bir görsel; 5B'de: (a) 25% kabul (küçük, yukarı, tutarlı) veya (b) SEED için ayrı görsel eşleme — **ürün kararı 5B kapısında.** Completion sayıları bundan etkilenmez.

---

## 10. Export/import, reset, onboarding, temiz kurulum

| Alan | Etki |
|---|---|
| export/import | App'te YOK. P0-5 eklemez; şema export-ready kalır. P3'te feature → o zaman "export→import→re-migration" regression. Bu planda N/A. |
| reset | `clearProgressData` (:1535) `srs/kana={}` → yeni alanlar temizlenir; `_migrationQuarantine` de temizlenir; `userHints` korunur. 5B'de doğrulanır. |
| onboarding | Dokunulmaz (`migrateV0ToV1` mantığı korunur). |
| temiz kurulum | `raw==null` → `freshState()` (v2) → migration çalışmaz. |

---

## 11. Alt-aşama kabul kapıları & smoke matrisi

| # | Senaryo | 5A | 5B |
|---|---|:--:|:--:|
| 1 | Sıfırdan yeni kullanıcı | ✓ | ✓ |
| 2 | Yalnız boolean `kana{}` legacy | ✓ | ✓ |
| 3 | Kana için boolean+srs | ✓ | ✓ |
| 4 | Kanji+kelime srs (regresyon) | ✓ | ✓ |
| 5 | Pozitif mastery + sıfır sayaç → seen=1 (I1) | ✓ | — |
| 6 | mastery=0 + sıfır sayaç → **seen=0** (sahte-seen yok) | ✓ | — |
| 7 | Bozuk/kısmi (recovery) | ✓ | — |
| 8 | type çözülemeyen key → quarantine, kayıpsız | ✓ | — |
| 9 | userHints korunur | ✓ | ✓ |
| 10 | Reload idempotent + **girdi-mutasyonsuz** | ✓ | ✓ |
| 11 | **Forward-schema v3 → byte-değişmez, read-only** | ✓ | — |
| 12 | Migration fail → canonical write kapalı, sahte-v2 yok | ✓ | — |
| 13 | Hash'li yedek → source blob değişince yeni backup | ✓ | — |
| 14 | Kana doğru/yanlış → srs güncellenir | — | ✓ |
| 15 | Pasif görüntüleme mastery üretmez (I2) | — | ✓ |
| 16 | Kana review kuyruğu (ayrı) + null-next yığılmaz | — | ✓ |
| 17 | Semantik eşdeğerlik: 3 sayı eşit (§9) | — | ✓ |
| 18 | reset → srs boş + userHints korunur | — | ✓ |

**Kapılar:**
- **P0-5A:** 1-13 geçer + `migrate∘migrate=migrate` + saf/mutasyonsuz + hash'li yedek + schemaVersion yalnız doğrulanmış write'ta 2 + **kanji davranışı DEĞİŞMEZ**. → Zeynep onayı → 5B.
- **P0-5B:** 14-18 + I1-I4 + §9 üç-sayı eşitliği + kanji review regresyon-yok + SEED görsel kararı. → Zeynep onayı → **P0-5 CLOSED**.

---

## 12. Fallback okuma kodu ne zaman kaldırılır

- **5A'da KALDIRILMAZ.** Migration her load'da idempotent çalıştığından 5A sonrası her okuma garanti v2 üretir; fallback okumalar (`masteryScore` :1610; boolean `state.kana[...]` :1727,2501,2665,…) **write-only ayna** döneminde hâlâ okunuyor olabilir.
- **5B'de derived kaynak srs'e geçer;** legacy okumalar yerini srs okumalarına bırakır — ama **kod silinmez** (aynalar yazılıyor).
- **Fallback silme + ölü `data-kana` handler temizliği = ayrı, sonraki adım**, şu koşullarla: (a) 5A ≥1 gerçek-kullanım döngüsü canlıda doğrulandı, (b) 5B derived-geçiş shipped, (c) read-anında v1 kalmadığı teyitli. **Asla 5A ile aynı commit'te değil.** "Çalışanı silme" ilkesi: önce sor.

---

## 13. Geri-dönüş noktaları & değişecek dosya/fonksiyon

**P0-5A — Storage migration**
- **Dosya/fonksiyon:** `index.html` — `SCHEMA_VERSION` (:1404→2), `migrate` (:1434 + `migrateV1ToV2`), **forward-guard** (`hydrate`/`read` :1467/:1485, safeMerge ÖNCESİ), `hydrate` ok-kontrolü (:1474, v2-şekil doğrulaması), hash'li `.bak.v1` yazımı (`createStorage`), fail→read-only yolu (`createStorage.save`/`read` recovery), `module.exports` (:1511, `migrateV1ToV2`).
- **Değişiklik:** yalnız veri şekli + forward-guard + doğrulama + hash'li yedek + idempotency/saflık. **Kana SRS davranışı YOK, UI YOK, kanji queue değişmez.**
- **Risk:** yanlış type, güçlü kayıt ezme, sahte seen/tarih, sahte-v2 → §2/§4/§6/§8 ile kapatıldı.
- **Geri-dönüş:** `SCHEMA_VERSION=1` + `migrateV1ToV2` no-op tek commit revert; fail→read-only, `.bak.v1` elde.

**P0-5B — Kana SRS davranışı**
- **Dosya/fonksiyon:** `srsRecord` (:1550, `type` param + `seen++`), kana yazma yolları (:5340 kana-known, :5220-21 mochi → `{type:'kana'}`; ölü :5323 dokunulmaz), **`buildKanaReviewQueue(...)` AYRI eklenir** (:1572 `buildKanjiReviewQueue` **DEĞİŞMEZ**; ortaklaştırma sonraki temizlik), `masteryScore` (:1608 kana srs), Home/Profile completion + `userStage` derived kaynağı (mastery≥1 eşiği §9), günlük yeni-öğe sınırı.
- **Değişiklik:** kana gerçek ölçüm SRS'e girer; pasif/ipucu mastery üretmez (K1); null-next yığılmaz; completion kaynağı srs (eşik mastery≥1); legacy aynalar yazılır (okunmaz).
- **Risk:** kanji review regresyonu (ayrı kuyrukla minimize), çift-yazım, completion sayım kayması → §9 üç-sayı fixture.
- **Geri-dönüş:** her fonksiyon izole commit; kana yolu flag ile eski-yola döner; 5A verisi bozulmaz.

---

## Onay kapıları özeti
Plan onayı → **P0-5A** (smoke 1-13, kanji değişmez) → (onay) → **P0-5B** (smoke 14-18, üç-sayı eşitliği) → (onay) **P0-5 CLOSED** → (ayrı adım) fallback + ölü-handler temizliği.
**Bu plan onaylanmadan storage'a dokunan kod uygulanmaz. Migration ile yeni SRS davranışı aynı doğrulama adımında karıştırılmaz.**

---

## EK — Bu revizyonda kapatılan 9 düzeltme
1. `seen` tiered kural (sahte seen=1 kaldırıldı; mastery=0&sayaç=0→seen=0). §2, §8-I1, smoke 6.
2. Forward-schema guard **safeMerge ÖNCESİ**; v3 byte-değişmez read-only. §3.2, §7, smoke 11.
3. Migration fail → **canonical write kapalı recovery/read-only** (sahte-v2 yok). §4, smoke 12.
4. **Hash'li yedek** (source blob'a bağlı; değişince yeni backup; `_migratedFrom`). §4, smoke 13.
5. `migrateV1ToV2(state,{resolveType,isKana})` **saf + enjekte**; fixture output **+ girdi-mutasyonsuz**. §5, smoke 10.
6. type-null kayıt → **`_migrationQuarantine`** (kayıpsız); validator geçer; sessiz silme yok. §2, §6, smoke 8.
7. 3 kana yazma noktası **semantiği belgelendi** (data-kana ölü; kana-known/mochi gerçek); SEED=1 ürün onayına bağlı. §1, §7.
8. Semantik eşdeğerlik **formülleştirildi** (3 sayı: adet/grup/%); ink 0→25 görsel farkı flag'lendi. §9, smoke 17.
9. **`buildKanaReviewQueue` ayrı**; `buildKanjiReviewQueue` değişmez; genelleme sonraya. §13-5B, smoke 16.
