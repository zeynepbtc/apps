# Faz 2 · Kana Review / SRS Tutarlılığı — Sözleşme & Selector Spec (v2 · YEŞİL IŞIK)

> Envanter: `kanji-atlas-faz2-srs-envanteri.md`. v2, GPT'nin 4 teknik düzeltmesini işler → uygulamaya yeşil ışık. Ayrı commit + ayrı test kartı.

## Kilitli kararlar (Zeynep + GPT ratifikasyonu · 2026-07-20)
1. **Kapsam = A (yalnız kanji).** Kana due hiçbir yerde sayılmaz; kana tüketimi = ayrı **Kana SRS (büyük, B)** kalemi.
2. **Due = kesin zaman-temelli** (`next<=now`). `status` **due kaynağı DEĞİL**.
3. **Navigasyon önerisi due sisteminden ayrı** — `firstAvailableNode` & `reviewQueue()` korunur.
4. Kana + hayalet kayıtlar sayaçtan çıkar (**elenir, silinmez**).
5. Dört canlı yüzey **tek kanonik kuyruğu** kullanır. Çalışma-önerisi sistemi bu kalemde değişmez.

## Davranış sonucu (bilinçli kabul)
Kesin zaman-temelli olduğu için **bugün öğrenilen kanji aynı gün sayaçta görünmez** (`next=+1 gün`). Doğru aralıklı-tekrar semantiği. Home "Tekrar sırası" **listesi** (sayaç değil) değişmez.

## Selector — SAF & KANONİK (GPT düzeltmeli)
Global bağımlılık YOK: `state` ve `data` **enjekte edilir**; test edilen fonksiyon global'siz `buildKanjiReviewQueue`.
```js
function inKanjiReviewScope(data, key){
  const item = data && data.chars ? data.chars[key] : null;
  return Boolean(item && item.type === "kanji");
}
// SAF: state/data enjekte, now enjekte. Yan etki yok, giriş mutasyonu yok.
function buildKanjiReviewQueue(state, data, now){
  if(!Number.isFinite(now)) return [];                 // now doğrulaması → boş kuyruk (risksiz)
  return Object.entries((state && state.srs) || {})
    .filter(([id, rec]) =>
      inKanjiReviewScope(data, id) &&
      Number.isFinite(rec && rec.next) &&              // tip güvenli: string/null/NaN/Infinity ELENİR
      rec.next <= now)
    .sort(([idA, a], [idB, b]) =>
      (a.next - b.next) ||                             // 1) en eski next önce
      ((Number.isFinite(a.mastery) ? a.mastery : 0) -
       (Number.isFinite(b.mastery) ? b.mastery : 0)) || // 2) düşük mastery önce
      idA.localeCompare(idB))                          // 3) ID tie-break → deterministik
    .map(([id]) => id);
}
// Uygulama-içi wrapper (kolaylık). Kanonik hesap wrapper'da DEĞİL, build'de.
function currentKanjiReviewQueue(now){ return buildKanjiReviewQueue(state, DATA, (now===undefined?Date.now():now)); }
function dueCount(now){ return currentKanjiReviewQueue(now).length; }
```

## Diagnostic — yan etkisiz (silmez, raporlar)
```js
function inspectKanjiReviewData(state, data){
  const unknownKeys=[], invalidNext=[];
  for(const [id, rec] of Object.entries((state && state.srs) || {})){
    if(!inKanjiReviewScope(data, id)) unknownKeys.push(id);           // kana/kelime/ölü id
    else if(!Number.isFinite(rec && rec.next)) invalidNext.push(id);  // bozuk next
  }
  return { unknownKeys, invalidNext };
}
```
Selector storage'dan **silmez**; diagnostic yalnız harness/debug çıktısı (`unknown review keys: [...]`, `invalid next records: [...]`). Üretim console spam'i yok.

## Snapshot disiplini (invariant için ŞART)
Her render veya kullanıcı eyleminde **tek `now`**:
```js
const now = Date.now();
const queue = buildKanjiReviewQueue(state, DATA, now);
```
O işlem boyunca aynı `queue`/sayı kullanılır → milisaniye sınırında iki yüzey ayrışamaz. `review-start` tıklamada **yeniden** snapshot alır (eski DOM sayısına değil, tıklama anındaki kanonik kuyruğa göre davranır).

## İnvariant (kabul kriteri · GPT düzeltmeli)
```
dueCount(snapshot) === buildKanjiReviewQueue(snapshot).length === Profil/Home/Review başlığındaki sayı
dueCount(snapshot) > 0  →  review-start AYNI snapshot kuyruğunun İLK öğesini açar
```
(review-start bütün kümeyi değil, ilk öğeyi tüketir — invariant sayı eşitliği + ilk-öğe erişimi.)

## Tüketici migrasyonu — DEĞİŞECEK
| Yüzey (fonksiyon/satır) | Şu an | Olacak | UI metni |
|---|---|---|---|
| Review başlığı (`Review` 3355) | `union(dueItems∩ch, reviewQueue)` | `buildKanjiReviewQueue(state,DATA,now)` | "**N kanji** tekrar bekliyor" |
| `review-start` (5289) | `reviewQueue()[0]` | `currentKanjiReviewQueue()[0]` | — |
| Profil (`Profile` 3432) | `dueItems().length` | `dueCount(now)` | "Bugün tekrar" → "**Kanji tekrarı**" |
| Home statline (`Progress` 4032) | `reviewQueue().length` | `dueCount(now)` | kısa "Tekrar" korunur (4 sütun layout) |

## KORUNACAK (dokunulmaz)
`firstAvailableNode` fallback (2548) · Home "Tekrar sırası" listesi (1734) · `reviewQueue()` fonksiyonu · `dueItems()` (rewire sonrası kullanılmıyorsa bırakılır — ölü kod temizliği ayrı kalem) · Home 2417'deki mevcut ölü `q=reviewQueue()` (önceden var, kapsam dışı) · `srsRecord`/`SRS_DAYS`/`next` yazımı.

## Test kartı (16) — saf harness + canlı smoke
1. Boş: srs yok → dueCount 0, buton disabled.
2. Zaman-due kanji → dueCount 1, review-start açar.
3. learning ama next gelecekte → dueCount 0 (status due değil).
4. mastered + zaman-due → dueCount 1, review-start açar (**ölü buton çözüldü**).
5. Kana due → dueCount 0 (kanji-only).
6. Hayalet/tanınmayan anahtar → dueCount 0; diagnostic `unknownKeys` içinde.
7. İnvariant: karışık srs → dört yüzey === buildKanjiReviewQueue.length.
8. Tüketim=gösterim: başlık N ise review-start ilk öğeyi açar; sayaç>0 & review boş yolu YOK.
9. `firstAvailableNode` korundu (regresyon yok).
10. `next === now` → **due** (sınır dahil).
11. `next` string/`null`/`NaN`/`Infinity` → **due değil** (Number.isFinite eler); diagnostic `invalidNext`.
12. Aynı state + aynı now → **aynı deterministik sıra** (iki çağrı byte-eş).
13. En eski `next` ilk; eşitlikte mastery, sonra ID tie-break çalışır.
14. Selector giriş `state`'ini ve `data`'yı **değiştirmez** (mutasyon yok — derin eşitlik).
15. Aynı render snapshot'ında farklı yüzeyler **aynı kuyruğu** kullanır (tek `now`).
16. İlk due öğe cevaplanıp `next` geleceğe taşınınca selector yeniden hesaplanır → **ikinci öğe erişilebilir** (ilk öğe kalıcı bloke etmiyor). *Yeni çok-sorulu oturum istemez; yalnız blokaj yokluğunu kanıtlar.*

## Sınırlar
Yeni review modu yok · kana quiz motoru yok (B) · tasarım değişmez · `last` ölü alanı seçime girmez · ölü anahtar elenir/silinmez · navigasyon-önerisi korunur · ayrı commit + ayrı test kartı.
