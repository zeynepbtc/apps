# P0-5B — Kilitli Kararlar & İlerleme

> Zeynep + GPT onaylı. Alt-adımlar ayrı kapılarla.

## İlerleme
- **5B-1** srsRecord v2-uyumlu ✅ KAPALI (staging smoke geçti) — commit `45bd2bc`. 28 fixture.
- **5B-2** Kana review motoru ✅ KAPALI — commit `88b85ef`. 9 fixture.
- **5B-3** mastery yumuşatma + kanaLearned + completion kaynak ✅ **UYGULANDI** — commit `bce5aa9`. Kabul fixture'ları + tam regresyon yeşil. **Zeynep/GPT denetimi bekliyor.**
- **5B-4** ertelendi. **5B-5** tam regresyon — **5B-3 onayı sonrası** (otomatik geçilmedi).

## KİLİT 1 — word-known semantiği (uygulandı, değişmeyecek)
Tek eylem → seen+1, correct+1; `known:true` → mastery tabanı 2. `known:true` = yalnız açık "biliyorum/tanıyorum" beyanı; kana/kanji'de gelişigüzel KULLANILMAZ. (`kana-known` normal doğru = mastery+1.)

## KİLİT 2 — mastery yanlış-cevap yumuşatması (5B-3'te UYGULANDI)
| Başlangıç | Doğru → | Yanlış → |
|:---:|:---:|:---:|
| 0 | 1 | 0 |
| 1 | 2 | **1** |
| 2 | 3 | 1 |
| 3 | 4 | 2 |
| 4 | 4 | 3 |
Kod: `else { r.mastery = r.mastery <= 1 ? r.mastery : r.mastery - 1; }`. `next` düşüşten sonraki YENİ mastery'den (`SRS_DAYS[yeniMastery]`). Yanlış cevap yine `wrong++/seen++/last/next/due` günceller.

## KİLİT 3 — kanaLearned helper (5B-3'te UYGULANDI)
```js
function kanaLearned(char){
  const record = state.srs && state.srs[char];
  if(record && record.type === "kana"){ return Number.isInteger(record.mastery) && record.mastery >= 1; }
  return (state.kana && state.kana[char]) === true;   // kayıt yok VEYA type!=="kana" → legacy fallback
}
```
OR-mantığı yok. Şu okumalar helper'a geçti: `learnedKana`, `kanaPct` (learnedKana'dan türer), `groupDone` ×2, `userStage` (hira/kataDone). `doneInSet` KAPSAM DIŞI (dokunulmadı). `state.kana` ayna olarak yazılmaya devam ediyor.

## 5B-3 test sonucu (bce5aa9)
- **Mastery tablosu:** 0-4 doğru+yanlış, her yanlışta wrong+1/seen+1/last güncel/next=SRS_DAYS[yeniMastery]/stored v2-valid — ✅ tam tablo.
- **Completion (a-d):** (a) SRS yok+bool→true; (b) kana m0+bool→**false**; (c) kana m1+bool yok→true; (d1) yanlış-type+bool→true (fallback); (d2) yanlış-type m3+bool false→**false** (SRS sayılmadı) — ✅.
- **§9 denklik:** her karakter için kanaLearned==boolean (migrated SEED) → adet/grup/yüzde birebir — ✅.
- **Regresyon:** storage 97 · 5B-1 28 · 5B-2 9 · word-known · reload-recovery-yok — hepsi ✅.

## Sıra
5B-3 denetimi geçerse → **5B-5** (tam regresyon + staging teyidi) → sonra P0-5A+B `main` merge (ayrı onay). Merge-gate 5B-1'de kapatıldı.
