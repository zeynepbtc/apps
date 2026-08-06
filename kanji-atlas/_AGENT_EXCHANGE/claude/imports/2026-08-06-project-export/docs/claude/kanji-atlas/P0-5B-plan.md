# P0-5B — Kana SRS Davranışı · Uygulama Planı (ONAY BEKLİYOR)

> **Kural:** Onaylanmadan production-storage/davranış kodu yazılmaz. Alt-adım alt-adım, her adımda kabul kapısı. P0-5A KİLİTLİ kararları geçerli (SEED mastery1, eşik mastery≥1, seen yalnız anlamlı maruziyet, ayrı buildKanaReviewQueue).

## 0. KRİTİK bağlam — merge gate
`srsRecord` (1741) yeni kaydı eski şekille (`type/seen/write` yok) üretiyor → P0-5A `validateV2Shape` reload'da **reddeder → recovery/read-only**. Production v1 olduğu için şu an etkilenmiyor ama **P0-5A main'e merge edilmeden önce kapatılmalı.** 5B-1 bunu kapatır.

## Gerçek kod yüzeyleri (P0-5A sonrası satırlar)
| Fonksiyon | Satır | Rol |
|---|---|---|
| `srsRecord(key,correct)` | 1741 | TEK ölçüm yazıcı; yeni kayıt şekli + legacy ayna |
| `buildKanjiReviewQueue` / `inKanjiReviewScope` | 1763 / 1759 | Kanji review (DEĞİŞMEZ) |
| `masteryScore(key)` | 1799 | srs[key] okur, yoksa `learned?40:0` fallback |
| `userStage()` | 1915 | `state.kana` boolean + `state.learned` |
| completion: `learnedKana`/`kanaPct` | 2717 / 2741 | `state.kana[char]` boolean sayımı |
| grup: `groupDone` | 2899, 3837 | `state.kana[c]` boolean |
| kana yazma: `kana-known` | 5574 | `state.kana[k]=true; srsRecord(k,true)` |
| kana yazma: mochi başarı | 5454-55 | `state.kana[char]=true; srsRecord(char,true)` |
| `word-known` | 5575 | srsRecord **2 kez** (mastery 2'ye it) — quirk |
| ölü `data-kana` | 5557 | boolean-only (render yok) — dokunma |

APP_RESOLVER: `makeTypeResolver(DATA)` şu an sadece STORE wiring'de. 5B'de **paylaşılan `const APP_RESOLVER`** yapılıp srsRecord'da da kullanılır.

---

## Alt-adımlar (her biri ayrı, kapılı)

### 5B-1 — srsRecord v2-uyumlu (KRİTİK, merge-gate)
- **Değişiklik:** Yeni kayıt default'u v2 şekli: `{type:APP_RESOLVER.resolveType(key), correct:0,wrong:0,mastery:0, seen:0, write:0, last:null, next:null}`.
- Her çağrıda: `seen++` (anlamlı maruziyet, I2), correct/wrong/mastery güncelle, last=now, next=now+SRS_DAYS·DAY.
- **Defansif backfill:** mevcut kayıtta `type` yoksa resolver'dan ata; `seen` yoksa `max(correct+wrong, mastery>0?1:0)`.
- `type` çözülemezse (resolver null) → kaydı yazma, sessizce atla + `console.warn` (canonical'ı kirletme). *(Pratikte tüm çağrılar kanji-id / kana-char / word-id — hep çözülür.)*
- **K1:** pasif/ipucu mastery üretmez — srsRecord yalnız gerçek cevap/known yollarından çağrılıyor, uyumlu.
- **Risk:** yanlış type; word-known çift-seen. **Kabul:** yeni bir kana + yeni bir kanji cevapla → **reload'da recovery YOK**, validateV2Shape geçer; kayıtlarda type var, seen≥1; kanji review birebir aynı; `word-known` seen davranışı bilinçli (tek çağrıya indirilebilir — kararına bağlı).
- **Geri dönüş:** tek fonksiyon; eski default'a revert.

### 5B-2 — Kana review motoru (ayrı, kanji'ye dokunmadan)
- **Ekle:** `inKanaReviewScope(data,key)` (type==="kana"), `buildKanaReviewQueue(state,data,now)` (kanji mantığının kana kopyası: finite next & next≤now, aynı sıralama), `currentKanaReviewQueue`, `kanaDueCount`. `buildKanjiReviewQueue` **DEĞİŞMEZ**.
- SEED kana `next:null` → due DEĞİL (finite filtresi eler) → **kendiliğinden yığılmaz.** Kana ancak ilk gerçek cevaptan sonra zamanlanır.
- **Yüzey (KARAR gerekli):** kana due sayısını nerede göstereceğiz? Seçenek (a) minimal: sadece motor + due sayacı, ayrı ekran YOK (sonraki iş); (b) mevcut tekrar akışına kana'yı da kat. **Önerim: (a) minimal** — motoru kur, sayacı göster; tam kana-review ekranı ayrı bir küçük iş olsun (kapsamı dar tut).
- **Kabul:** kana cevabı sonrası due mantığı doğru; kanji review regresyon-yok.

### 5B-3 — Türetilmiş kaynak: completion mastery≥1'e geç (§9)
- **Ekle:** `kanaLearned(char) = (state.srs[char]?.mastery||0) >= 1` (güvenlik için geçişte boolean fallback: `|| state.kana[char]===true`).
- `learnedKana`/`kanaPct`/`groupDone`/`userStage` → `kanaLearned` kullansın. `state.kana` **yazılmaya devam** (ayna) ama birincil okuma-kaynağı değil.
- **§9 kabul (fixture + gözle):** migrasyon öncesi (boolean) == sonrası (mastery≥1) → öğrenilmiş adet · grup adedi · yüzde **birebir**.
- **KARAR/flag:** yanlış cevapla mastery 0'a düşen kana artık "öğrenilmiş" sayılmaz (locked §9: eşik mastery≥1). Migrated/known kana SEED=1 olduğu için nadir; ama davranış değişikliği — onaylıyor musun?

### 5B-4 — Günlük yeni-öğe sınırı (opsiyonel/hafif)
- SEED kana `next:null` olduğundan **otomatik pile-up YOK**; bu yüzden sıkı bir günlük cap 5B için zorunlu değil. **Önerim:** 5B-4'ü **ertele/atla**, gerçek kullanımda kana review yoğunluğu görülünce ayrı ele al. (İstersen basit bir "günde N yeni kana" girişi eklerim — kararına bağlı.)

### 5B-5 — Smoke + regresyon
- Node + tarayıcı: (1) yeni kana + yeni kanji cevabı → reload'da recovery YOK, kayıt v2-geçerli; (2) kana due zamanlama; (3) kanji review birebir; (4) §9 üç-sayı denkliği; (5) reset userHints korur; (6) forward-guard/backup bozulmadı; (7) staging'de gerçek tarayıcı teyidi.
- **Kapı:** hepsi yeşil → P0-5B kapanır → **ancak o zaman** P0-5A+B `main`'e merge önerilir (merge ayrı onay).

---

## Onay + kararlar
Başlamadan üç şeyi netleştirelim:
1. **5B-2 yüzey:** minimal motor (önerim) mi, yoksa kana review ekranı da 5B'de mi?
2. **5B-3 semantiği:** mastery 0'a düşen kana "öğrenilmemiş" sayılsın mı (locked §9 = evet)?
3. **5B-4:** günlük cap'i erteleyelim mi (önerim: evet)?
4. **word-known** çift-srsRecord'u tek çağrıya indireyim mi (temizlik)?

Onaylarsan **5B-1'den** başlıyorum (merge-gate açığını kapatan kritik adım), her alt-adımı ayrı test edip kapı koyarak ilerlerim.
