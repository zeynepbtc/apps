# Teslim Raporu — Resmî Okuma Tamamlama · `生` Karmaşık Turu

**Durum:** TAMAMLANDI — commit YOK · Codex bağımsız ön-commit denetimi bekleniyor
**Sözleşme:** `_AGENT_EXCHANGE/codex/specs/2026-08-09-READINGS-OFFICIAL-SEI-BATCH.md`
**Taban:** `f7fdc5f…` → HEAD `1194c7c…` · `onboarding-b2-gate3` · başlangıç ağacı temiz
**CONTENT_HASH:** `e84b9e040e6efcb7` → **`64b7ebfbdc1c7f7b`** (tek meşru ürün farkı)

## Tek kayıt — `sei / 生` son durum (§1.1 ile birebir)

| alan | değer |
|---|---|
| officialOn | セイ · **ショウ** |
| officialKun (10, PDF s.89) | い(きる)·い(かす)·い(ける)·う(まれる)·う(む)·お(う)·は(える)·は(やす)·き·なま |
| taughtOn (kilit) | セイ |
| taughtKun (kilit) | い(きる) · う(まれる) |
| deferred (9) | ショウ(on) · い(かす)·い(ける)·う(む)·お(う)·は(える)·は(やす)·き·なま(kun) |
| onyomi/kunyomi (kilit) | セイ / い(きる)・う(まれる) |
| examples/source/qaStatus (kilit) | değişmedi |
| irregularWords | **YOK** (başlangıçta yok, sonda da yok) |

付表 `弥生/やよい` · `芝生/しばふ` hiçbir kümeye, deferred'a veya irregularWords'e **eklenmedi** (§1.1/§5.8).
Invariant doğrulandı: `officialOn == taughtOn ∪ deferred(on)` · `officialKun == taughtKun ∪ deferred(kun)`
· `deferred ∩ taught == ∅` · On=katakana / Kun=hiragana(+paren). Yeni okuma yüzeye **sızmadı**.

## Değişen beş ürün/test yolu (§3) — başka yol yok
```
 M kanji-atlas/index.html                             (2/2 · sei.readings + CONTENT_HASH)
 M kanji-atlas/_faz2/data_chars.json                  (1/1 · jeneratör)
 M kanji-atlas/_faz2/content_manifest.json            (1/1 · jeneratör)
 M kanji-atlas/_faz2/run-core-gates.mjs               (1/0 · WHITELIST 13→14)
?? kanji-atlas/_faz2/smoke_official_readings_sei.js   (yeni bağımsız regresyon kapısı)
```

## Kapı sonuçları (normal — exit 0)
| Kapı | Sonuç |
|---|---|
| `generate --check` | senkron:true · hash 64b7ebfbdc1c7f7b · **idempotent** |
| `smoke_official_readings_sei.js` | **14/14** |
| `smoke_readings_sets.js` (I-1..I-8) | **148/148** (deferred 12→21) |
| `smoke_official_readings_ato.js` | 11/11 (bozulmadı) |
| `smoke_official_readings_small_batch.js` | 36/36 (bozulmadı) |
| `smoke_legacy_derived.js` | **67/67** |
| `run-core-gates.mjs` | **14/14 PASS** (relocated non-git kopya) |

## Sekiz negatif enjeksiyon (§5.1) — hepsi gerçek exit=1
| # | Enjeksiyon | Kıran kontrol |
|---|---|---|
| 1 | officialOn'dan ショウ çıkarılır | sei: officialOn |
| 2 | officialKun sırası değişir | sei: officialKun |
| 3 | ショウ taughtOn'a eklenir (yüzey aynı) | sei: taughtOn |
| 4 | い(かす) deferred kind→on | sei: deferred |
| 5 | なま deferred reason değişir | sei: deferred |
| 6 | kunyomi sessizce genişletilir | sei: kunyomi yüzeyi |
| 7 | やよい officialKun+deferred'a eklenir | sei: officialKun + 付表 sızma |
| 8 | readings.irregularWords eklenir | sei: irregularWords YOK |

Baseline exit 0. Harness bellek-içi; **ürün SHA öncesi=sonrası** (index.html `51a12c75…`, data_chars `64b7ebfb…`).

## Değişmezlik
- Hedef dışı **97 kayıt bayt-birebir aynı** (yalnız sei değişti).
- Kapsam dışı diff yok · jeneratör çıktıları elle düzenlenmedi · CONTENT_VERSION artırılmadı · irregularWords eklenmedi.

## Kabul kriteri (§7): 1✓ 2✓ 3✓ 4✓ 5✓(付表 sızmadı) 6✓ 7✓(I-1..I-8) 8✓(yüzey) 9✓(8/8 enjeksiyon) 10✓(14/14) 11✓ 12✓ 13✓(commit yok)

## Kanıt dosyaları
`starting-sei.json` · `records-after.json` · `product-sha-before.txt` · `product-sha-after.txt` ·
`injection_sei.txt` · `core_gates_14_relocated.txt` · `git-status-before.txt` · `git-status-after.txt`.

Commit oluşturulmadı; Codex bağımsız ön-commit denetimi bekleniyor.
