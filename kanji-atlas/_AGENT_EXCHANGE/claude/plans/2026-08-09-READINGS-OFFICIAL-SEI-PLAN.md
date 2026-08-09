# Uygulama Planı — Resmî Okuma Tamamlama · `生` Karmaşık Turu

**Sözleşme:** `_AGENT_EXCHANGE/codex/specs/2026-08-09-READINGS-OFFICIAL-SEI-BATCH.md`
**Taban:** `f7fdc5f…` → HEAD `1194c7c…` · `onboarding-b2-gate3` · ağaç temiz (doğrulandı)
**İlke:** Resmî kümede bulunmak öğretilmek değildir. Dokuz yeni okuma yalnız
`officialOn/officialKun` + `deferred`'a girer; kullanıcı yüzeyi ve örnekler DEĞİŞMEZ.
付表 kelime okumaları (弥生/やよい · 芝生/しばふ) hiçbir kümeye ve `irregularWords`'e **girmez**.

## Tek kayıt — `sei / 生` kilitli son durum (§1.1)
- `officialOn`: `["セイ","ショウ"]`  (was `["セイ"]` → +ショウ)
- `officialKun` (PDF s.89 sırası, 10): `い(きる)·い(かす)·い(ける)·う(まれる)·う(む)·お(う)·は(える)·は(やす)·き·なま`
- `deferred` (yeni 9): `ショウ`(on) · `い(かす)·い(ける)·う(む)·お(う)·は(える)·は(やす)·き·なま`(kun);
  reason sabiti "Resmî 常用 okuması; N5 başlangıç yüzeyinde bu tur öğretilmiyor", `recommend:"defer"`, sıra önce On sonra Kun
- **Kilit (değişmez):** `taughtOn:["セイ"]` · `taughtKun:["い(きる)","う(まれる)"]` · `onyomi:"セイ"` ·
  `kunyomi:"い(きる)・う(まれる)"` · `examples` (学生/先生/生まれる) · `source` · `qaStatus` · **irregularWords eklenmez**

Invariant (doğrulandı): `officialOn == taughtOn ∪ deferred(on)` · `officialKun == taughtKun ∪ deferred(kun)` ·
`deferred ∩ taught == ∅` · On=katakana / Kun=hiragana(+paren).

## Değişecek beş ürün/test yolu (§3) — başka yol YOK
1. `index.html` — yalnız `DATA.chars.sei.readings` + jeneratörün `CONTENT_HASH`'i
2. `_faz2/data_chars.json` — jeneratör çıktısı
3. `_faz2/content_manifest.json` — jeneratör çıktısı
4. `_faz2/smoke_official_readings_sei.js` — YENİ bağımsız regresyon kapısı
5. `_faz2/run-core-gates.mjs` — WHITELIST'e tek satır (13→14)

`index.html` düzenlemesi scratchpad apply betiğiyle (ev deseni; depoya konmaz).

## Kapılar / kanıt
- `generate --check` senkron + idempotent · yeni kapı PASS · **8 negatif enjeksiyon** (§5.1) her biri exit!=0, harness ürün SHA öncesi=sonrası
- `smoke_readings_sets` (I-1..I-8) · `smoke_legacy_derived` · `smoke_official_readings_ato` PASS — yeni okuma yüzeye sızmaz
- `run-core-gates` **14/14 PASS**
- hedef dışı **97 kayıt** bayt-birebir aynı · CONTENT_HASH eski→yeni · tam git status

## Yasak (§2)
başka kayıt yok · taught/yüzey/örnek/romaji/anlam/ses/köken/mnemonic/source/qaStatus yok ·
弥生/芝生/irregularWords eklenmez · deferred'ı kart/oyun/quiz/arama/sese ekleme yok · CONTENT_VERSION yok · main/merge/push/PR/deploy yok · commit yok.

**Kapsam yeniden doğrulandı:** tek kayıt (sei) + beş yol. Uygulamaya geçiliyor.
