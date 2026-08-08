# Teslim Raporu — Resmî Okuma Tamamlama · Küçük Grup 1 (大・四・九・足)

**Durum:** TAMAMLANDI — commit YOK · Codex bağımsız denetimi bekleniyor
**Sözleşme:** `_AGENT_EXCHANGE/codex/specs/2026-08-08-READINGS-OFFICIAL-SMALL-BATCH-DAI-YON-KYUU-ASHI.md`
**Taban / dal:** `b93db57…` → HEAD `0a6df1f…` · `onboarding-b2-gate3` · başlangıç ağacı temiz
**CONTENT_HASH:** `8049130f3356e083` → **`f4d4e6584d65959f`** (tek meşru ürün farkı)

## Değişen dört kayıt (§1.1/§1.2/§1.3 ile birebir)

| id | officialKun (son) | taughtKun (kilit) | deferred(kun) | onyomi/kunyomi (kilit) |
|---|---|---|---|---|
| 大 | おお · おお(きい) · おお(いに) | おお(きい) | おお · おお(いに) | ダイ・タイ / おお(きい) |
| 四 | よ · よ(つ) · よっ(つ) · よん | よん · よ(つ) | よ · よっ(つ) | シ / よん・よ(つ) |
| 九 | ここの · ここの(つ) | ここの(つ) | ここの | キュウ・ク / ここの(つ) |
| 足 | あし · た(りる) · た(る) · た(す) | あし | た(りる)[korundu] · た(る) · た(す) | ソク / あし |

- `ashi / た(りる)` mevcut girdisi tüm alanlarıyla (reason dahil) **korundu**; ilk kun-deferred.
- Yeni deferred reason'ı sabit: "Resmî 常用 okuması; N5 başlangıç yüzeyinde bu tur öğretilmiyor".
- Yüzey/taught **değişmedi** (bayt-doğrulandı); yeni resmî okuma kullanıcı yüzeyine **sızmadı**.

## Değişen beş ürün/test yolu (§3) — başka yol yok

```
 M kanji-atlas/index.html                                   (2/2 · 4 readings + CONTENT_HASH)
 M kanji-atlas/_faz2/data_chars.json                        (1/1 · jeneratör çıktısı)
 M kanji-atlas/_faz2/content_manifest.json                  (1/1 · jeneratör çıktısı)
 M kanji-atlas/_faz2/run-core-gates.mjs                     (1/0 · WHITELIST 11→12)
?? kanji-atlas/_faz2/smoke_official_readings_small_batch.js (yeni bağımsız regresyon kapısı)
```
Teslim/plan/kanıt (§3.1): `plans/…-SMALL-BATCH-PLAN.md`, bu rapor, `evidence/2026-08-08-readings-official-small-batch/`.

## Kapı sonuçları (normal — exit 0)

| Kapı | Sonuç |
|---|---|
| `generate_data_chars.js --check` | senkron:true · hash f4d4e6584d65959f · **idempotent** (ardışık koşum SHA aynı) |
| `smoke_official_readings_small_batch.js` | **36/36** |
| `smoke_readings_sets.js` (I-1..I-8) | **100/100** (I-3/I-7 9/9 — deferred 2→9) |
| `smoke_legacy_derived.js` (yüzey türetme) | **67/67** |
| `run-core-gates.mjs` | **12/12 PASS** (relocated non-git kopya; kirli ağaç git korumasını tetikler) |

## Altı negatif enjeksiyon (§5.1) — hepsi gerçek exit=1

| # | Enjeksiyon | Kıran kontrol | exit |
|---|---|---|---|
| 1 | dai.officialKun'dan おお çıkarılır | `dai: officialKun (değer+sıra)` | 1 |
| 2 | yon.officialKun sırası değişir | `yon: officialKun (değer+sıra)` | 1 |
| 3 | kyuu ここの taughtKun'a eklenir (yüzey aynı) | `kyuu: taughtKun` | 1 |
| 4 | ashi た(す) kind→on | `ashi: deferred (tam eşleşme)` | 1 |
| 5 | ashi た(りる) reason değişir | `ashi: deferred (tam eşleşme)` | 1 |
| 6 | yon.kunyomi sessizce genişletilir | `yon: kunyomi yüzeyi` | 1 |

Baseline exit 0. Harness bellek-içi; **ürün SHA öncesi=sonrası** (index.html `00ff56e2…`, data_chars `f4d4e658…`).

## Değişmezlik kanıtı

- Hedef dışı **94 kayıt bayt-birebir aynı** (yalnız ashi/dai/kyuu/yon değişti).
- Ürün/test kapsamı dışında (spec/decision/diğer) **diff yok**.
- Jeneratör çıktıları **elle düzenlenmedi**; CONTENT_VERSION **artırılmadı**.

## Kabul kriteri durumu (§7)
1 ✓ · 2 ✓ · 3 ✓ · 4 ✓ · 5 ✓ · 6 ✓ · 7 ✓ · 8 ✓ (I-1..I-8) · 9 ✓ (yüzey sızmadı) · 10 ✓ (6/6 enjeksiyon kırıldı) · 11 ✓ (12/12) · 12 ✓ (kanıt) · 13 ✓ (commit yok).

## Kanıt dosyaları
`starting-records.json` · `records-after.json` · `product-sha-before.txt` · `product-sha-after.txt` ·
`injection_small_batch.txt` · `core_gates_12_relocated.txt` · `git-status-before.txt` · `git-status-after.txt`.

Commit oluşturulmadı; Codex bağımsız PASS bekleniyor.
