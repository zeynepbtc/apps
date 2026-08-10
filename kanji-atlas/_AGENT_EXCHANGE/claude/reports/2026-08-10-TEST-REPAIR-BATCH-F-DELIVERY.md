# Teslim Raporu — TEST REPAIR BATCH F · Browser Failure Evidence

**Durum:** TAMAMLANDI (Codex ön-commit BULGU 1+2 düzeltildi) — commit YOK · Codex yeniden denetimi bekleniyor
**Sözleşmeler:** `2026-08-07-...-BROWSER-FAILURE-EVIDENCE.md` (davranış) + `2026-08-10-...-CURRENT-BASE-ADDENDUM.md` (güncel taban)
**Taban / dal:** `c4ac867…` → HEAD `26ac5e64…` · `onboarding-b2-gate3` · başlangıç ağacı temiz

## Codex ön-commit düzeltmeleri (2026-08-10)
- **BULGU 1 — Unicode kesme sınırı:** `printFailureEvidence` artık `s.length`/`s.slice` (UTF-16 code-unit)
  yerine `Array.from(s)` (code point) kullanır; kesme `cp.slice(...).join("")` ile **surrogate çiftini
  asla bölmez** → U+FFFD oluşmaz. Karakter sayımı code point; bayt sayımı gerçek UTF-8 `Buffer.byteLength`.
  Yeni **S8** senaryosu (emoji/𠮷 tam kesme sınırında; Codex'in `"😀"+"A".repeat(3999)` enjeksiyonu dahil)
  bunu otomatik doğrular. Davranış testi **34 → 48 kontrol**.
- **BULGU 2 — teslim sayımı:** Doğru tam status = **16 yol** (2 modified + 1 yeni davranış testi + plan
  + rapor + 11 evidence). Önceki "14 yol" ifadesi düzeltildi.

## Ne değişti
`run-browser-gates.mjs` insan-okur modda PASS olmayan her çocuğun **yakalanmış stdout/stderr'ini**
özet satırının hemen ardından gösteriyor: sabit `── stdout ──`/`── stderr ──` etiketleri; boş akış
`(boş)`; akış başına sabit üst sınır `MAX_EVIDENCE_CHARS = 4000`; aşılırsa açık `[KESİLDİ … orijinal
N karakter · M bayt]` + en tanılayıcı **son bölüm (tail)**; UTF-8 korunur; yeni dosya yazılmaz;
"hassas veri ayıklandı" gibi iddia yok. Kesme **Unicode code point güvenlidir** (Array.from; surrogate çifti bölünmez; U+FFFD yok).
`--json` modu değişmedi (stdout tek JSON; sonuç stdout/stderr alanları tam; insan bloğu yalnız
insan-okur modda). Değişiklik **saf eklemedir** (numstat 34/0): mevcut hiçbir satır silinmedi;
whitelist, selector, timeout, sunucu, git koruması, JSON şeması aynen korundu.

## Değişen üç yol (§2) — başka ürün/test yolu yok
```
 M kanji-atlas/_faz2/run-browser-gates.mjs   (34/0 · yalnız insan-okur kanıt bloğu + Unicode güvenli yardımcı + sabit)
 M kanji-atlas/package.json                  (2/1 · yalnız "test:runner" komutu eklendi)
?? kanji-atlas/_faz2/tests/test_browser_gate_runner.mjs  (YENİ · 8 senaryo davranış testi, 48 kontrol)
```
Teslim: plan (§4.2 önce yazıldı) · bu rapor · `evidence/2026-08-10-test-repair-batch-f/`.

## Senaryolar (davranış testi 48/48 — `behavior-test.txt`)
| # | Senaryo | Sonuç |
|---|---|---|
| S1 | non-zero çocuk, iki akış dolu (yapay HARNESS ERR) | iki akış + asıl stderr görünür, exit 1 ✅ |
| S2 | bir akış boş | `(boş)` ✅ |
| S3 | çok uzun çıktı | `[KESİLDİ]` + orijinal karakter·bayt + tail korunur, head kesilir ✅ |
| S4 | timeout/kill | yakalanan çıktı korunur · sunucu kapanır · pgrep boş (artık süreç yok) ✅ |
| S5 | `--json` başarısızlık | stdout tek parse edilebilir JSON · sonuç stdout/stderr tam · insan bloğu sızmadı ✅ |
| S6 | başarı | 4/4 · PASS çocuk çıktısı basılmaz · kanıt bloğu yok ✅ |
| S7 | kirli başlangıç + koşum-sırası kirlenme | her iki git koruması değişmeden çalışır ✅ |
| S8 | **Unicode kesme sınırı (BULGU 1)** | emoji/𠮷 sınırda bütün korunur veya bütün düşer; **U+FFFD yok** ✅ |

Test üretim whitelist'ini/gerçek smoke dosyalarını değiştirmez; geçici taşınabilir Atlas kopyasında
açık mekanik fixture kullanır.

## Yapay HARNESS ERR — insan logunda asıl stderr (`human-harness-err-sample.txt`)
```
  ❌ FAIL      smoke_sources.js              34 ms exit=2
     ── stdout ──
     [51 karakter · 53 bayt]
     | smoke_sources: sayfa yüklendi, 3/5 assertion geçti
     ── stderr ──
     [118 karakter · 118 bayt]
     | HARNESS ERR: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:PORT/index.html
     |     at smoke_sources.js:42:17
```

## Kapılar (§6) — hepsi exit 0
- `npm run gates` → **14/14 core + 4/4 browser** (`npm-run-gates-relocated.txt`)
- `gates:core` 14/14 · `gates:browser` 4/4 (gerçek smoke'lar, modifiye runner; `gates-browser-relocated.txt`)
- `node _faz2/tests/test_browser_gate_runner.mjs` / `npm run test:runner` → **48/48**
- `git diff --check` → temiz
- **Not:** kapı koşumları, kirli ağacın git korumasını tetiklemesini önlemek için taşınabilir Git'siz
  kopyada koşuldu (`--atlas`; koruma "kullanılamıyor" = engel değil) — önceki turlardaki emsalle aynı.
  Commit sonrası temiz gerçek ağaçta yeniden koşulacaktır.

## Değişmezlik
- `index.html`, `data_chars.json`, `content_manifest.json` **başlangıç = son SHA** (bayt-birebir):
  `51a12c75…` · `64b7ebfb…` · `65ea1bb8…`.
- Varsayılan timeout (300000), KILL_GRACE, whitelist ve sırası, selector/assertion, sunucu güvenliği,
  git koruması, Playwright sürümü, JSON şeması **değişmedi**.
- Tam `git status --untracked-files=all`: yalnız §2 + teslim yolları (**16 yol** = 2 modified + 1 yeni
  davranış testi + plan + rapor + 11 evidence); `git diff --check` temiz.

## Kabul (§5 addendum): 1✓ 2✓ 3✓ 4✓ 5✓ 6✓ 7✓ 8✓(14/14+4/4) 9✓(ürün SHA aynı) 10✓(yalnız izinli yollar)

Commit/push/merge/PR/deploy YOK. Batch F sonunda durdum; Codex ön-commit denetimini bekliyorum.
