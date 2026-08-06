# Faz 2 · Kana Review / SRS Tutarlılığı — Envanter (kod DEĞİŞMEDEN)

> **Kural (GPT):** Önce üç akışı çıkar, örnek veri senaryolarıyla sapmayı göster, saf selector öner. Kapsam (kana mı, kanji mi, ikisi mi) netleşmeden kodları eşitleme — yanlış olur. Bu belge yalnız **envanter + öneri**; üretim kodu değişmedi.

## TL;DR — çekirdek bulgu
Üründe **tek bir "due" tanımı yok; üç ayrı sayaç var ve birbirini tutmuyor.** Dahası **gösterilen sayı ile tüketilen kuyruk farklı fonksiyonlardan geliyor**, bu yüzden *"sayaç > 0 ama review boş"* durumu **gerçekten mümkün** (ölü buton). Kök neden: iki bağımsız işaret sistemi paralel yaşıyor — zaman-temelli `srs[k].next` ve durum-temelli `state.status[id]` — ve her tüketici bunlardan farklı birini/karışımını okuyor, farklı kapsam süzgeciyle.

---

## Akış 1 — Sayaç üretimi (üç farklı sayı)
| Yüzey (satır) | Kaynak fonksiyon | Temel | Kapsam süzgeci | Tanınmayan anahtar? |
|---|---|---|---|---|
| Profil "Bugün tekrar" (3432) | `dueItems().length` | **zaman** (`next<=now`) | **YOK** — ham `state.srs` anahtarları | **Sayılır** (kana + kelime + ölü id dahil) |
| Home statline "Tekrar" (2417/4028) | `reviewQueue().length` | **durum** (`status∈{learning,soon}`) | `ch(id)` → **yalnız kanji/radikal** | Elenir (ama kana zaten girmez) |
| Review başlığı "N karakter tekrar bekliyor" (3355) | `union(dueItems∩ch, reviewQueue)` | zaman **+** durum | `dueItems` kısmına `ch()` filtresi | kana/kelime elenir; kanji dueItems'tan girer |
| Home "Tekrar sırası" listesi (1734) | kendi süzgeci: `status∈{learning,soon} && type==="kanji"` (+ fallback `learned` kanji) | durum | kanji-only | — (yalnız liste, sayı değil) |

Üç sayı üç farklı kümeyi ölçüyor: **Profil = her SRS anahtarı (zaman) · Home = durum-temelli kanji · Review = ikisinin birleşimi.**

## Akış 2 — Kuyruk üretimi vs. gösterim
- **Review başlığı** birleşimi gösterir: `[...dueItems().filter(ch), ...reviewQueue()]` (dedup `Set`).
- **"Tekrara başla" (`review-start`, 5289)** ise **yalnız `reviewQueue()`** okur ve **yalnız ilk öğeyi** alır: `const due=reviewQueue(); if(!due.length) return; go("quiz", due[0]);`
- Yani **gösterilen küme ≠ tüketilen küme.** Başlıkta sayılan bir kanji (dueItems'tan gelen, `mastered`/`almost` durumundaki, zamanı gelmiş) `reviewQueue`'da olmadığı için tıklamada **hiç açılmaz.**
- **Duplicate:** yok — `reviewQueue` `Object.keys(status)` üzerinden benzersiz, başlık `Set` ile dedup. (Bu leg temiz.)

## Akış 3 — Review tüketimi
- `review-start` gerçekte **tek soru** açar (`reviewQueue()[0]` → tek quiz), tüm kuyruğu gezmez.
- **Boş kuyruk:** buton `due.length` (başlık birleşimi) ile disabled/enabled olur; ama tıklama `reviewQueue()` ile çalışır. Başlık birleşimi > 0 iken `reviewQueue` boşsa → buton **enabled ama tık ölü** (`return`).
- **Çözülebilir benzersiz öğe sayısı:** pratikte 1 (ilk öğe), başlıktaki sayı ne olursa olsun.

## Alan kullanım tablosu (`srs[key] = {correct,wrong,mastery,last,next}`)
| Alan | Yazan | Okuyan (seçim/sayaç) | Not |
|---|---|---|---|
| `mastery` | srsRecord | masteryOf, masteryScore, status senk. | 0–4; SRS_DAYS index'i |
| `correct`/`wrong` | srsRecord | srsStats, masteryScore, weak-list (4008) | isabet/zayıf |
| `next` | srsRecord (`now+SRS_DAYS[m]*DAY`) | **yalnız `dueItems`** | zaman-temelli tek okuyucu |
| `last` | srsRecord | **hiçbir seçici okumuyor** | seçim için **ölü alan** |
| `status` (ayrı map) | srsRecord (yalnız `DATA.chars[key]` için) | reviewQueue, homeReviewSection, Review grupları | **kana için ASLA yazılmaz** |
| `learned` (ayrı map) | srsRecord + addreview | masteryOf, fallback'lar | — |

**Kritik yapısal gerçek:** `srsRecord` kana karakterini de kanji id'sini de **aynı `state.srs`'e** yazar; ama `status`/`learned` senkronunu **yalnız `DATA.chars[key]` olduğunda** yapar. Yani **kana SRS kaydı oluşur (`next` dahil) ama status'u olmaz** → zaman-temelli sayaçta görünür, durum-temelli kuyruğa/review'a asla giremez. (Roadmap'teki "Kana SRS: kanjide var, kanada yok" bulgusunun kod kanıtı.)

---

## Örnek veri senaryoları (sapmayı gösteren)
| # | Durum | Profil (dueItems) | Home (reviewQueue) | Review başlığı (union) | "Tekrara başla" | Sonuç |
|---|---|---|---|---|---|---|
| S1 | `ki` kanji mastery 4 (**mastered**), `next<=now` | **1** | 0 (status∉learning/soon) | **1** (dueItems∩ch) | enabled → `reviewQueue()=[]` → `return` | **Üç ekran üç sayı + ÖLÜ BUTON** |
| S2 | Kana "あ" oyunda yanlış → `srs["あ"].next<=now`, status yok | **1** | 0 | 0 (kana `ch()` fail) | — | **Kana sayaçta ama asla review edilemez** |
| S3 | Eski kelime id'si srs'te, kelime veriden çıkmış | **1** | 0 | 0 | — | **Kalıcı hayalet sayı — temizlenemez** |
| S4 | `learning` ama `next` gelecekte (henüz zamanı yok) | 0 | **1** | 1 | enabled → çalışır | **Home 1, Profil 0** |
| S5 | Hiç srs/status yok | 0 | 0 | 0 | disabled | **Tek tutarlı senaryo** |

## Aranan invariant (GPT) — şu an ÜÇ leg de ihlal
```
displayedDueCount(now) === buildReviewQueue(now).length === review'da çözülebilir benzersiz öğe
```
- `displayedDueCount` yüzeyler arası tutarsız (Profil=dueItems / Home=reviewQueue / Review=union).
- `buildReviewQueue` diye tek fonksiyon **yok**; review-start `reviewQueue()` (farklı küme) tüketir.
- Çözülebilir = 1 (ilk öğe), kuyruk uzunluğu değil.

---

## ÖNCE KARAR: kapsam sözleşmesi (kodları eşitlemeden)
GPT'nin uyarısı tam buraya oturuyor. Eşitlemeden önce **review kapsamı** netleşmeli:

- **A) Review = yalnız kanji (mevcut de-facto).** `reviewQueue`/quiz zaten kanji-only. Bu durumda **düzeltme = tüm sayaçları kanji-only tek kaynağa bağlamak**; Profil'in ham `dueItems`'ı buradaki hata. Kana due öğeleri **hiçbir yerde "tekrar bekliyor" sayılmaz** (kana review yolu yokken). En küçük, en dürüst, kapsam güvenli. Kana tüketimi ayrı **Kana SRS (büyük)** kalemine devredilir.
- **B) Review = kana + kanji birleşik.** `reviewQueue` zaman-temelli (`next`) hem kana hem kanji üzerinde yeniden kurulur, review-start gerçek kuyruğu gezer, **kana quiz modu** eklenir. Bu artık *tutarlılık düzeltmesi değil*, roadmap'teki **Kana SRS büyük kalemi**. Faz 2 tutarlılık kapsamını aşar.

**Öneri (karar sizde):** Bu kalemi **A** ile sınırla — tek `reviewScope` selector'ı, tüm yüzeyler ona bağlanır, kana tüketimi B olarak ayrı kaleme yazılır. Böylece "sayaç=kuyruk=çözülebilir" invariantı kanji kapsamında sağlanır; kapsam genişlemesi olmaz.

## Saf selector önerisi (uygulama DEĞİL — taslak)
```js
// now ENJEKTE edilir (test edilebilir; Date.now gizli değil). Saf: state yazmaz, nav yapmaz.
function inReviewScope(key){
  // A) kanji-only:  return !!(DATA.chars[key] && DATA.chars[key].type==="kanji");
  // B) kana+kanji:  return (DATA.chars[key]?.type==="kanji") || !!KANA_BY_CHAR[key];
}
function reviewScope(state, now){
  const ids = new Set();
  for(const k of Object.keys(state.srs||{})){           // zaman-temelli (next)
    const r=state.srs[k];
    if(r && r.next && r.next<=now && inReviewScope(k)) ids.add(k);
  }
  for(const id of Object.keys(state.status||{})){        // durum-temelli (learning/soon)
    if(["learning","soon"].includes(state.status[id]) && inReviewScope(id)) ids.add(id);
  }
  return [...ids];                                        // benzersiz + kapsam-tutarlı + tanınmayan elenmiş
}
function dueCount(state, now){ return reviewScope(state, now).length; }
```
Sonra **her yüzey** (Profil "Bugün tekrar", Home "Tekrar", Review başlığı, `review-start` tüketimi) yalnız `reviewScope`/`dueCount`'tan okur → invariant sağlanır.

### Alt-karar (selector içinde netleşmeli)
"learning/soon ama `next` gelecekte" öğe due sayılır mı? Mevcut `reviewQueue` **evet** (durum), `dueItems` **hayır** (zaman). Yukarıdaki taslak ikisini **birleştiriyor** (aktif öğrenilen + zamanı gelen). Alternatif: **kesin zaman-temelli** (`next<=now` şart). Bu bir ürün kararı — S4 senaryosunun hangi sayıyı göstereceğini belirler.

## Bu kalemin sınırları (öneri)
Yeni review modu eklenmez · kana quiz motoru yazılmaz (B kalemi) · tasarım değişmez · yalnız sayaç/kuyruk **tek kaynağa** indirgenir · `last` ölü alanı seçime sokulmaz · ölü/hayalet SRS anahtarları selector'da elenir (silinmez — "çalışanı silme").

## Açık soru (Zeynep + GPT'ye)
1. Kapsam **A mı B mi**? (Öneri: A; B'yi Kana SRS büyük kalemine devret.)
2. Due tanımı: **zaman∪durum** mu, **kesin zaman** mı? (S4'ün cevabı.)
3. Hayalet/tanınmayan SRS anahtarları: selector'da elenip **görünmez** mi kalsın, yoksa ayrı bir "temizlik" kalemi mi? (Öneri: şimdilik ele-görünmez; silme ayrı.)
