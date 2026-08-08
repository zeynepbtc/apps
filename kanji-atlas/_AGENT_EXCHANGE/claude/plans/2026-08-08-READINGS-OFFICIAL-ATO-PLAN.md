# Uygulama Planı — Resmî Okuma Tamamlama · `後` Dar Turu

**Sözleşme:** `_AGENT_EXCHANGE/codex/specs/2026-08-08-READINGS-OFFICIAL-ATO-BATCH.md`
**Taban:** `8782d539…` → HEAD `93a15d2…` · `onboarding-b2-gate3` · ağaç temiz (doğrulandı)
**İlke:** Resmî kümede bulunmak öğretilmek değildir. Yeni `コウ・のち・おく(れる)` yalnız
`officialOn/officialKun` + `deferred`'a girer; kullanıcı yüzeyi ve örnekler DEĞİŞMEZ.

## Tek kayıt — kilitli son durum (§1.1)

`ato / 後`:
- `officialOn`: `["ゴ","コウ"]`  (was `["ゴ"]` → +コウ)
- `officialKun`: `["のち","うし(ろ)","あと","おく(れる)"]`  (was `["あと","うし(ろ)"]` → PDF s.51 sırası + のち, おく(れる))
- `deferred` (yeni): `コウ`(on) · `のち`(kun) · `おく(れる)`(kun) — reason sabiti
  "Resmî 常用 okuması; N5 başlangıç yüzeyinde bu tur öğretilmiyor", `recommend:"defer"`, sıra: önce On sonra Kun
- **Değişmez:** `taughtOn:["ゴ"]` · `taughtKun:["あと","うし(ろ)"]` · `onyomi:"ゴ"` · `kunyomi:"あと・うし(ろ)"`
  · `examples:[["後ろ",...],["午後",...]]` · `source:"文化庁 常用漢字表 / jitenon"` · `qaStatus:"reviewed"`

Invariant (doğrulandı): `officialOn == taughtOn ∪ deferred(on)` · `officialKun == taughtKun ∪ deferred(kun)` ·
`deferred ∩ taught == ∅` · On=katakana / Kun=hiragana(+paren).

## Değişecek beş ürün/test yolu (§3) — başka yol YOK
1. `index.html` — yalnız `DATA.chars.ato.readings` + jeneratörün `CONTENT_HASH`'i
2. `_faz2/data_chars.json` — jeneratör çıktısı
3. `_faz2/content_manifest.json` — jeneratör çıktısı
4. `_faz2/smoke_official_readings_ato.js` — YENİ bağımsız regresyon kapısı
5. `_faz2/run-core-gates.mjs` — WHITELIST'e tek satır (12→13)

`index.html` düzenlemesi scratchpad apply betiğiyle (ev deseni; depoya konmaz).

## Kapılar / kanıt
- `generate --check` senkron + idempotent · yeni kapı PASS · **6 negatif enjeksiyon** (§5.1) her biri exit!=0, harness ürün SHA öncesi=sonrası
- `smoke_readings_sets` (I-1..I-8) · `smoke_legacy_derived` PASS — yeni okuma yüzeye sızmaz
- `run-core-gates` **13/13 PASS**
- hedef dışı **97 kayıt** bayt-birebir aynı · CONTENT_HASH eski→yeni · tam git status

## Yasak (§2)
生/başka kayıt yok · taught/yüzey/örnek/romaji/anlam/ses/köken/mnemonic/source/qaStatus yok ·
deferred'ı kart/oyun/quiz/arama/sese ekleme yok · CONTENT_VERSION artırma yok · main/merge/push/PR/deploy yok · commit yok.

**Kapsam yeniden doğrulandı:** tek kayıt (ato) + beş yol. Uygulamaya geçiliyor.
