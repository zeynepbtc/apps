# P0-5A — Durum & Devam Notu (Oturum kaydı, 2026-07-21)

## Kısa özet
**P0-5A (Storage migration v1→v2) UYGULANDI + reset-full read-only açığı KAPATILDI.** Dev dalında (`faz2-kalem1`) commit+push edildi. **Canlı `main` DOKUNULMADI** — deploy Zeynep onayına bağlı. Sıradaki: (1) dev→main deploy + telefonda gerçek kullanım/migration testi, (2) test geçerse P0-5B. **Telefon testi geçmeden P0-5B YOK.**

## Git durumu (kritik)
- Repo: `zeynepbtc/apps`. Dizin: `/home/claude/apps-deploy/` (yeni oturumda yoksa clone gerek).
- Dev dalı `faz2-kalem1` HEAD = **`db728bc`** (remote ile senkron, ahead/behind 0/0).
  - `db728bc` P0-5A reset-full: resetCanonical (read-only invariant)
  - `0b58eb5` P0-5A: storage v1→v2 migration (güncel taban üzerine)
  - `ab9d7d9` (taban) scroll bug-fix + Dilim 3.5 — bunlar main'de YOK, sadece dev'de.
- `main` = canlı/GitHub Pages, P0-5A içermiyor. Deploy = `faz2-kalem1`→`main` merge + kanji-atlas-preview senkronu + push (token'lı URL, çıktı sed'le filtreli).
- **GÜVENLİK:** GitHub PAT asla sohbet/log/commit'te görünmemeli; yalnız push URL'inde, tüm çıktı `sed -E 's#github_pat_[A-Za-z0-9_]+#***#g; s#x-access-token:[^@]*@#***@#g'` ile filtrelenir. (Token değeri önceki oturum özetinde.)

## Değişen dosyalar (hepsi `db728bc`'de)
- `kanji-atlas/index.html` — storage bloğu (satır ~1401-1682) + reset handler (~5705). Başka fonksiyona dokunulmadı.
- `kanji-atlas/_faz2/storage.js` — saf, node-testable modül (source of truth for storage logic).
- `kanji-atlas/_faz2/smoke_p05a.js` — test harness.

## Ne yapıldı (P0-5A içerik)
- `SCHEMA_VERSION` 1→2. `migrateV1ToV2(state,{resolveType,isKana})` SAF, resolver enjekte, **girdi-mutasyonsuz**.
- srs kayıtlarına `type/seen/write`. **seen tiered kural:** validExisting→max(existing,cw); cw>0→cw; mastery>0→1; else→**0** (sahte seen YOK). invariant `seen≥correct+wrong`.
- Legacy boolean kana (`kana[char]=true`, srs yok) → **SEED** `{type:kana,mastery:1,seen:1,last:null,next:null}` (conservative; sahte tarih yok).
- type çözülemeyen key → `_migrationQuarantine.srs[key]` (kayıpsız); canonical validator geçer.
- **Forward-schema guard** (safeMerge ÖNCESİ): storedVer>SCHEMA_VERSION → migrate/safeMerge/save YOK, byte-değişmez, read-only.
- **Hash'li backup-gate:** `.bak.v1` = `{sourceHash(FNV-1a),createdAt,raw}`; geri-okunup doğrulanmadan canonical v2 yazılmaz. Backup/commit fail → read-only, canonical v1 kalır.
- **Merkezi read-only kilit** yalnız `createStorage.save()` katmanında — srsRecord/reset/hint/oyun hepsi buradan.
- **Katı v2 validator:** integer≥0, mastery 0..4, last/next null|finite≥0, seen≥cw.
- `makeTypeResolver(DATA)` (index.html'de `STORE = createStorage(..., {resolver: makeTypeResolver(DATA)})`).

## reset-full düzeltmesi (db728bc)
- `STORE.resetCanonical()` merkezi, sonuç döner. Handler artık `localStorage`'a DOKUNMAZ.
- readOnly/recovery → reddedilir, canonical **byte-değişmez** (v3/recovery/backup-fail durumları).
- `removeItem` KULLANILMAZ: temiz v2 doğrulanıp **tek atomik setItem**; yazma fail → eski kayıt yerinde, başarı mesajı yok.
- Full reset = temiz sayfa: srs/kana/learned/**userHints** + _migrationQuarantine/_migratedFrom sıfır; `.bak.v1`+recovery kopyaları temizlenir. **Progress-only reset AYRI, userHints KORUR.**
- progress-only/onboarding reset: readOnly'de sahte başarı yok.

## Test durumu
- `node _faz2/smoke_p05a.js` → **92 geçti, 0 kaldı** (smoke 1-13 + R1-R5 reset + validator birim).
- Tarayıcı (playwright, gerçek DATA): P0-5A 13/13 + reset 6/6, 0 pageerror.
- `node --check` (en büyük script) OK; DATA JSON parse OK (98 kanji, 78 kelime).
- Doğrulama komutları: `cd kanji-atlas && node _faz2/smoke_p05a.js`; browser fixture'ları `/tmp/browser_p05a.js`, `/tmp/browser_reset.js` (cwd = kanji-atlas olmalı).

## DOKUNULMAYAN (P0-5B kapsamı — henüz YOK)
- `srsRecord(key,correct)` imzası aynı. `buildKanjiReviewQueue` aynı. Kana yazma noktaları (`kana-known` :5505, mochi :5385) aynı. Tüm UI aynı. Kanji review davranışı birebir.

## Sıradaki (onay bekleyen)
1. **Dev deploy + telefon testi** (Zeynep onayı bekliyor). Deploy sonrası telefonda: v1→v2 migration gerçek veride, kana SEED görünürlüğü, reset-full koruması, genel akış.
2. Telefon testi geçerse → **P0-5B** (Kana SRS davranışı: srsRecord type param, ayrı buildKanaReviewQueue, completion kaynağı srs mastery≥1, günlük yeni-öğe sınırı). Plan: `p05-plan.md` §13-5B.
3. SEED görsel kararı KİLİTLİ: mastery1→%25 mürekkep, özel legacy rendering YOK.

## Kilitli plan
Tam plan: proje dokümanı `claude/kanji-atlas/P0-5-plan-KILITLI.md` (ayrı yazıldı) — 13 başlık + 4 kabul güvencesi + KİLİTLİ ekler.
