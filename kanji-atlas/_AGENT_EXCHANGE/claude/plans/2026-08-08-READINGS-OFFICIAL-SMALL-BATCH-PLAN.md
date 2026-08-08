# Uygulama Planı — Resmî Okuma Tamamlama · Küçük Grup 1 (大・四・九・足)

**Sözleşme:** `_AGENT_EXCHANGE/codex/specs/2026-08-08-READINGS-OFFICIAL-SMALL-BATCH-DAI-YON-KYUU-ASHI.md`
**Taban / dal:** `b93db57…` → HEAD `0a6df1f…` · `onboarding-b2-gate3` · ağaç temiz (doğrulandı)
**İlke:** *Resmî kümede bulunmak, aynı turda öğretilmek anlamına gelmez.* Yeni resmî 訓 yalnız
`officialKun` + `deferred(kind="kun")`'a girer; `taught*` ve kullanıcı yüzeyi DEĞİŞMEZ.

## Değişecek dört kayıt — kilitli son durum (§1.1)

| id | yeni `officialKun` (sıra=PDF 音訓) | `taughtKun` (kilit) | eklenecek `deferred(kind=kun)` |
|---|---|---|---|
| dai 大 | おお · おお(きい) · おお(いに) | おお(きい) | おお · おお(いに) |
| yon 四 | よ · よ(つ) · よっ(つ) · よん | よん · よ(つ) | よ · よっ(つ) |
| kyuu 九 | ここの · ここの(つ) | ここの(つ) | ここの |
| ashi 足 | あし · た(りる) · た(る) · た(す) | あし | た(りる)[korunur] · た(る) · た(す) |

Değişmez: `officialOn`, `taughtOn`, `taughtKun`, `onyomi`, `kunyomi`, `examples`, `irregularWords`,
diğer tüm alanlar. I-1/I-2 gereği her kayıtta `officialKun == taughtKun ∪ deferred(kun)` (doğrulandı).

## deferred biçimi (§1.3)

- Yeni girdiler: `{reading, kind:"kun", reason:"Resmî 常用 okuması; N5 başlangıç yüzeyinde bu tur öğretilmiyor", recommend:"defer"}`.
- `ashi / た(りる)` mevcut girdisi **hiç değişmez** (reason dahil), ilk Kun-deferred kalır; yanına た(る), た(す) eklenir.
- Anahtar sırası `{reading, kind, reason, recommend}`; dizi sırası `officialKun` sırasını izler.

## Değişecek beş ürün/test yolu (§3) — başka yol YOK

1. `index.html` — yalnız 4 `readings` nesnesi + jeneratörün güncellediği `CONTENT_HASH`
2. `_faz2/data_chars.json` — yalnız jeneratör çıktısı
3. `_faz2/content_manifest.json` — yalnız jeneratör çıktısı (bu tur İZİNLİ)
4. `_faz2/smoke_official_readings_small_batch.js` — YENİ bağımsız regresyon kapısı
5. `_faz2/run-core-gates.mjs` — WHITELIST'e tek satır (11→12)

`index.html` düzenlemesi scratchpad'deki apply betiğiyle (ev deseni: başlangıç birebir doğrulama,
alan-alan bayt karşılaştırması, benzersiz substring) yapılır; betik depoya KONMAZ (izinli 5 yol dışında).

## Kapılar / kanıt

- `generate --check` senkron + idempotent (ikinci koşum diff sıfır)
- yeni kapı normal PASS; **6 negatif enjeksiyon** (§5.1) her biri `exit!=0` ile kırar; harness ürün SHA öncesi=sonrası
- `smoke_readings_sets` (I-1..I-8) · `smoke_legacy_derived` (yüzey türetme) PASS — yeni okuma yüzeye sızmaz
- `run-core-gates` **12/12 PASS**
- hedef dışı 94 kayıt bayt-birebir aynı · ürün SHA eski→yeni (yalnız meşru fark) · tam git status

## Yasak (§2)
後/生 yok · başka kayıt yok · taught/yüzey/örnek/romaji/ses/köken/mnemonic/qaStatus yok ·
deferred'ı oyun/quiz/kart/sese ekleme yok · CONTENT_VERSION artırma yok · main/merge/push/PR/deploy yok · commit yok.

**Kapsam yeniden doğrulandı:** dört kayıt + beş yol; başka hiçbir şey. Uygulamaya geçiliyor.
