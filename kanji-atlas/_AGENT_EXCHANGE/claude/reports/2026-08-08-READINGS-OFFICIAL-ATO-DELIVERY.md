# Teslim Raporu — Resmî Okuma Tamamlama · `後` Dar Turu

**Durum:** TAMAMLANDI — commit YOK · Codex bağımsız ön-commit denetimi bekleniyor
**Sözleşme:** `_AGENT_EXCHANGE/codex/specs/2026-08-08-READINGS-OFFICIAL-ATO-BATCH.md`
**Taban:** `8782d539…` → HEAD `93a15d2…` · `onboarding-b2-gate3` · başlangıç ağacı temiz
**CONTENT_HASH:** `f4d4e6584d65959f` → **`e84b9e040e6efcb7`** (tek meşru ürün farkı)

## Tek kayıt — `ato / 後` son durum (§1.1 ile birebir)

| alan | değer |
|---|---|
| officialOn | ゴ · **コウ** |
| officialKun | のち · うし(ろ) · あと · おく(れる) |
| taughtOn (kilit) | ゴ |
| taughtKun (kilit) | あと · うし(ろ) |
| deferred | コウ(on) · のち(kun) · おく(れる)(kun) — reason sabiti, recommend:"defer" |
| onyomi/kunyomi (kilit) | ゴ / あと・うし(ろ) |
| examples/source/qaStatus (kilit) | değişmedi |

Invariant doğrulandı: `officialOn == taughtOn ∪ deferred(on)` · `officialKun == taughtKun ∪ deferred(kun)`
· `deferred ∩ taught == ∅` · On=katakana / Kun=hiragana(+paren). Yeni okuma yüzeye **sızmadı**.

## Değişen beş ürün/test yolu (§3) — başka yol yok
```
 M kanji-atlas/index.html                             (2/2 · ato.readings + CONTENT_HASH)
 M kanji-atlas/_faz2/data_chars.json                  (1/1 · jeneratör)
 M kanji-atlas/_faz2/content_manifest.json            (1/1 · jeneratör)
 M kanji-atlas/_faz2/run-core-gates.mjs               (1/0 · WHITELIST 12→13)
?? kanji-atlas/_faz2/smoke_official_readings_ato.js   (yeni bağımsız regresyon kapısı)
```

## Kapı sonuçları (normal — exit 0)
| Kapı | Sonuç |
|---|---|
| `generate --check` | senkron:true · hash e84b9e040e6efcb7 · **idempotent** |
| `smoke_official_readings_ato.js` | **11/11** |
| `smoke_readings_sets.js` (I-1..I-8) | **112/112** (deferred 9→12) |
| `smoke_official_readings_small_batch.js` | 36/36 (bozulmadı) |
| `smoke_legacy_derived.js` | **67/67** |
| `run-core-gates.mjs` | **13/13 PASS** (relocated non-git kopya) |

## Altı negatif enjeksiyon (§5.1) — hepsi gerçek exit=1
| # | Enjeksiyon | Kıran kontrol |
|---|---|---|
| 1 | officialOn'dan コウ çıkarılır | ato: officialOn |
| 2 | officialKun sırası değişir | ato: officialKun |
| 3 | コウ taughtOn'a eklenir (yüzey aynı) | ato: taughtOn |
| 4 | のち deferred kind→on | ato: deferred |
| 5 | おく(れる) deferred reason değişir | ato: deferred |
| 6 | kunyomi sessizce genişletilir | ato: kunyomi yüzeyi |

Baseline exit 0. Harness bellek-içi; **ürün SHA öncesi=sonrası** (index.html `67e8bcbc…`, data_chars `e84b9e04…`).

## Değişmezlik
- Hedef dışı **97 kayıt bayt-birebir aynı** (yalnız ato değişti).
- Kapsam dışı (spec/decision/diğer) diff yok · jeneratör çıktıları elle düzenlenmedi · CONTENT_VERSION artırılmadı.

## Kabul kriteri (§7): 1✓ 2✓ 3✓ 4✓ 5✓ 6✓(I-1..I-8) 7✓(yüzey sızmadı) 8✓(6/6 enjeksiyon) 9✓(13/13) 10✓ 11✓ 12✓(commit yok)

## Kanıt dosyaları
`starting-ato.json` · `records-after.json` · `product-sha-before.txt` · `product-sha-after.txt` ·
`injection_ato.txt` · `core_gates_13_relocated.txt` · `git-status-before.txt` · `git-status-after.txt`.

Commit oluşturulmadı; Codex bağımsız ön-commit denetimi bekleniyor.
