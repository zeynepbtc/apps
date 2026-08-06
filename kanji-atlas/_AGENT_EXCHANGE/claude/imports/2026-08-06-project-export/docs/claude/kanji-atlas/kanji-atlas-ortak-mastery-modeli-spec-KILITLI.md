# Kanji Atlas — Ortak Mastery Modeli Spec'i (P0-4 · Oturum 3) — ✅ KİLİTLİ (onaylı)

> **Durum:** Zeynep kararları + 3 düzeltme + invariant'lar işlendi → **P0-4 spec KİLİTLİ.** Uygulama P0-5'te; bu belge yalnız modeli tanımlar.
> **Kritik sınır (hâlâ):** migration/veri dönüşümü/anahtar değişimi/UI/SRS davranışı/yeni model kodu YOK.
> **SRS ≠ Mastery:** **Mastery** = öğe üzerindeki öğrenme yeterliği · **SRS** = bir sonraki tekrar zamanını belirleyen planlama. **due** = `next<now` → türetilir, seviye değildir.

---

## 1. Mevcut veri kaynakları ve alanlar (envanter — olduğu gibi)
**Depolama:** tek localStorage anahtarı **`"kana_state"`** · tek JSON blob · `schemaVersion:1` · `migrate()`+`safeMerge`+recovery (bozuk JSON ham veriyi EZMEZ; `learned/srs/userHints` doğrulanır).

| Persist alan | Şekil | Anlam |
|---|---|---|
| `learned` | id→true | kanji/kelime "öğrenildi" bayrağı |
| `status` | id→`new/learning/soon/almost/mastered` | legacy seviye string; **yalnız kanji** için `srs.mastery`'den senkron |
| `kana` | 'あ'→true | kana "tanındı" boolean — kana'nın birincil sinyali |
| `srs` | key→`{correct,wrong,mastery(0-4),last,next}` | key = kanji id \| word id \| (kısmen) kana char |
| `games` | gameId→`{best,plays,lastScore}` | oyun kayıtları |
| `streak`,`pathStage`,`lastActive` | sayı | seri/aşama |
| `settings`,`userProfile`,`onboarding` | nesne | ayar/profil/ilk açılış |
| `lastSeenKatakana`,`discoveredRules`,`cipherLearned` | çeşitli | Katakana Şifreleri |
| `userHints` | id/char→not | **kişisel not — reset'te KORUNUR** (`clearProgressData` silmez) |

**Derived fonksiyonlar:** `masteryScore(key)`→0-100 `(mastery/4)*100×0.75 + acc×25` (srs yok+learned→40); `masteryTier`→1-4; `SRS_DAYS=[0,1,3,7,16]`; `srsRecord(key,correct)` doğru→`min(4,+1)`/yanlış→`max(0,-1)`, kanji ise learned+status senkron; `buildKanjiReviewQueue` **yalnız kanji** + `next<=now`; tamamlanma % Home/Profile'da inline (kana=boolean, kanji=learned, kelime=masteryScore).
**Kana yazım noktaları:** `data-kana`→`kana[k]=true` (srs YOK) · `kana-known`→`kana[k]=true`+`srsRecord` (srs VAR) · mochi→`kana[char]=true`.

## 2. Çakışmalar (aynı kavram farklı biçim)
1. Kana iki yerde: `kana{}` boolean (birincil) + kısmen `srs{}`.
2. Mastery iki temsil: `srs.mastery` (sayı) + `status{}` (string, yalnız kanji senkron).
3. Due çelişkisi: kelime `srs{}`'te ama `buildKanjiReviewQueue` yalnız kanji → kelime/kana due DIŞINDA.
4. Tamamlanma üç kaynak: kana=boolean · kanji=learned · kelime=masteryScore.

## 3. Önerilen tek şema (KİLİTLİ kararlarla)
Tek harita **`srs`** (ad korunur; RENAME YOK). Her kayıt:
```
srs[key] = {
  type:    "kana" | "kanji" | "word",   // ZORUNLU (K6)
  mastery: 0..4,                        // TANIMA/recall gücü → SRS'i sürer
  correct: n,  wrong: n,                // yalnız GERÇEK ölçüm sinyalleri
  seen:    n,                           // anlamlı maruz kalma (0=hiç); "learned" DEĞİL
  write:   0..4,                        // yazma alt-yetkinliği; P1-4'e kadar 0 (K3)
  last:    ts|null,  next: ts|null      // SRS zamanlama; kana migration'da null (bkz. §7)
}
```
**Seviye → yüzey (K4):** iç `mastery` 0-4 →
| mastery | yüzey grubu |
|---|---|
| 0 | **Yeni** (seen>0 olsa bile yüzey "Yeni" kalır — §Düzeltme-2) |
| 1-3 | **Çalışılıyor** |
| 4 | **Öğrenildi** |
**+ "Tekrar zamanı" rozeti** = due (`next<now`) — ayrı bayrak, seviye değil.
> **"Tanışıldı" AYRI bir mastery seviyesi DEĞİLDİR** (K düzeltme-2). `seen` yalnız iç sinyaldir ("daha önce görülmüş"); yüzeyde 4. grup üretmez.

**Sinyal kuralı (K1):** mastery yalnız **gerçek ölçüm** yapan doğru/yanlıştan değişir — mini-test, quiz, **ölçen** oyun soruları, SRS tekrarı: doğru **+1**, yanlış **-1**. **Pasif görüntüleme ve ipucuyla tamamlanan etkileşimler mastery ÜRETMEZ.** `correct/wrong` yalnız bu gerçek sinyallerde artar. Tam sıfırlama yok.

## 4. Ortak / türe özel alanlar
**Ortak (üç tip):** `type, mastery, correct, wrong, seen, last, next`.
**Türe özel:** `write` → kana & kanji doldurulur (üretim/yazma); **word'de 0 kalır**. *(opsiyonel ileride: kana `script:hira/kata`)*. Tek şema, tip davranışı farklı.

## 5. Derived vs Persisted (K5: legacy aynalar KAYNAK DEĞİL)
**PERSISTED (kaynak-of-truth):** `srs` kayıtları (`type,mastery,correct,wrong,seen,write,last,next`) · `userHints` · `games` · `streak` · `pathStage` · `lastActive` · `settings` · `userProfile` · `onboarding` · `cipher/discovered` · `schemaVersion`.
**DERIVED (hesaplanır, saklanmaz):** `masteryScore` · `masteryTier` · yüzey grubu (Yeni/Çalışılıyor/Öğrenildi) · **due** (`next<now`) · tamamlanma % · review kuyruğu · `userStage`.
**LEGACY AYNA (K5 — tamamen korunur AMA yeni modelin kaynağı DEĞİL):** `status{}`, `kana{}`, `learned{}`. Yeni kod **yalnız `srs`'i okur**; bu aynalar eski ekranların bozulmaması için yazılmaya devam eder, karar verirken kaynak alınmaz.
> **Düzeltme-1:** `seen>0`, **learned anlamına GELMEZ.** Legacy `learned` aynası gerekiyorsa **yalnız `mastery>0`** üzerinden üretilir.

## 6. Migration riskleri & geriye uyum
| Risk | Azaltma |
|---|---|
| kana boolean kaybı | `kana{}`→`srs[char]` **SEED=1** (K2); `kana{}` ayna KORUNUR |
| **sahte çalışma zamanı** | kana migration'da **`last:null, next:null`** (Düzeltme-3); migration tarihi kullanıcı çalışması gibi KAYDEDİLMEZ; ilk gerçek planlama **P0-5**'te |
| key çakışması (aynı key ↔ farklı tip) | `type` zorunlu; **migration TAHMİN EDEREK kayıt EZMEZ** (K6) — belirsizse dokunmaz/raporlar |
| status yalnız kanji senkron | legacy ayna (K5); yeni model srs'ten türetir |
| bozuk/eski veri | mevcut recovery + `schemaVersion` bump + `migrate()` **idempotent** + kopya-doğrula; **userHints DOKUNULMAZ** |
**İlke:** migration DÖNÜŞTÜRÜR, sessizce SIFIRLAMAZ.

**INVARIANT'lar (kilitli):**
- **I1:** Eski srs kaydında `mastery>0` fakat `correct+wrong=0` ise → `seen = max(1, correct+wrong)` (yani ≥1). Mastery pozitifse "hiç görülmemiş" olamaz.
- **I2:** `seen` **yalnız anlamlı öğrenme maruziyetinde** artar; **render, liste görünümü, sayfa açılışı seen'i ARTIRMAZ.**
- **I3:** `seen>0` ⇏ `learned`. Learned yalnız `mastery>0`'dan türetilir (Düzeltme-1).
- **I4:** `mastery:0, seen>0` → yüzey **"Yeni"**; yalnız iç "görülmüş" sinyali taşınır (Düzeltme-2).

## 7. Eski veriden yeni modele örnek dönüşüm (kavramsal — UYGULANMAYACAK)
```
# KANA (boolean)   ESKİ: kana['あ']=true
                   YENİ: srs['あ']={type:"kana", mastery:1(SEED), correct:0, wrong:0,
                                    seen:1, write:0, last:null, next:null}   // sahte tarih YOK
                   + kana['あ']=true KORUNUR (legacy ayna)

# KANJI            ESKİ: srs['ichi']={correct:3,wrong:1,mastery:3,last,next}
                   YENİ: srs['ichi']={...aynı, type:"kanji", seen:max(1,4)=4, write:0}

# KANJI (I1)       ESKİ: srs['ten']={correct:0,wrong:0,mastery:2,last,next}   // pozitif mastery, sıfır sayaç
                   YENİ: srs['ten']={...aynı, type:"kanji", seen:max(1,0)=1, write:0}

# KELİME           ESKİ: srs['ohayou']={correct:2,wrong:0,mastery:2,last,next}
                   YENİ: srs['ohayou']={...aynı, type:"word", seen:2, write:0}
```

## 8. Acceptance criteria
1. Üç tip tek `srs` şemasında, `type` **zorunlu**; aynı-key-farklı-tip'te migration ezmez (K6).
2. Mastery (yeterlik) ile SRS (zamanlama) kavramsal ayrı; due türetilir.
3. Tanıma (`mastery`) vs yazma (`write`) ayrı; write recall SRS'ini sürmez, P1-4'e kadar 0.
4. Yüzey 0=Yeni / 1-3=Çalışılıyor / 4=Öğrenildi; "Tanışıldı" ayrı seviye YOK; "Tekrar zamanı" ayrı bayrak.
5. `seen>0 ≠ learned`; learned yalnız mastery>0'dan; I1-I4 invariant'ları sağlanır.
6. Legacy aynalar (status/kana/learned) korunur ama **kaynak değil**.
7. Migration kayıpsız+idempotent; kana `last:null/next:null` (sahte tarih yok); `userHints` korunur.
8. Örnek dönüşüm gerçek alan adlarıyla (I1 dahil) verilmiş.
9. Belge hiçbir kodu değiştirmez.

## 9. Kararlar — KİLİTLİ
- **K1 ✅** Ölçen oyun doğru/yanlış = mini-test ağırlığı (+1/-1). Pasif görüntüleme/ipucu mastery üretmez.
- **K2 ✅** Legacy `kana=true` → **SEED=1**.
- **K3 ✅** `write` şemada şimdi; P1-4'e kadar 0.
- **K4 ✅** Yüzey: 0=Yeni · 1-3=Çalışılıyor · 4=Öğrenildi.
- **K5 ✅** status/kana/learned legacy ayna; yeni modelin kaynağı değil.
- **K6 ✅** Ham key + zorunlu `type`; aynı-key-farklı-tip'te tahminle ezme yok.
- **Düzeltme-1 ✅** seen>0 ≠ learned; learned yalnız mastery>0'dan.
- **Düzeltme-2 ✅** mastery:0+seen>0 → yüzey "Yeni"; "Tanışıldı" ayrı seviye değil.
- **Düzeltme-3 ✅** kana migration last:null/next:null; ilk planlama P0-5; migration tarihi çalışma değil.

## Kapsam DIŞI (bu faz)
Kana SRS uygulaması (P0-5) · yazma motoru (P1-4) · due kuyruğu tip-agnostik hâli · UI/ilerleme ekranı · migration KODU · anahtar değişimi. **P0-4 spec KİLİTLİ; uygulama P0-5.**
