# Uygulama Planı — TEST REPAIR BATCH F · Browser Failure Evidence

**Sözleşmeler:** `2026-08-07-TEST-REPAIR-BATCH-F-BROWSER-FAILURE-EVIDENCE.md` (davranış) +
`2026-08-10-...-CURRENT-BASE-ADDENDUM.md` (güncel taban — çelişkide üstün)
**Taban / dal:** `c4ac867…` → HEAD `26ac5e64…` · `onboarding-b2-gate3` · ağaç temiz (doğrulandı)
**Amaç:** `run-browser-gates.mjs` insan-okur modda PASS olmayan çocuğun yakalanmış stdout/stderr'ini
açık, sınırlı ve makinece test edilebilir biçimde göstersin. Flake tahmin edilmez; sonraki
tekrarın tanılanabilir olması sağlanır.

## Değişecek üç yol (§2) — başka yol YOK
1. `_faz2/run-browser-gates.mjs` — yalnız insan-okur çıktıya "başarısızlık kanıtı" bloğu eklenir.
2. `_faz2/tests/test_browser_gate_runner.mjs` — YENİ bağımsız davranış testi (7 senaryo).
3. `package.json` — yalnız `test:runner` komutu eklenir (davranış testini bağlamak için).

## Davranış (§3) — insan-okur modda, PASS olmayan her çocuk için özet satırının HEMEN ardından
- `stdout` ve `stderr` ayrı, sabit etiketlerle; boş akış `(boş)`.
- İçerik UTF-8 korunur (JS string; çıktı utf8).
- Her akış için **sabit üst sınır** (belgeli); aşılırsa açık `[KESİLDİ …]` etiketi + **orijinal
  karakter/bayt uzunluğu** raporlanır; en tanılayıcı **son bölüm (tail)** korunur.
- Yeni iz dosyası yazılmaz, ağaç kirletilmez, "hassas veri ayıklandı" gibi gerçeğe aykırı iddia yok.
- `--json` modunda stdout yalnız TEK geçerli JSON kalır; sonuç `stdout`/`stderr` alanları
  değişmez; insan açıklaması yalnız insan-okur modda basılır.

## KESİNLİKLE DEĞİŞMEZ (kilit)
Beyaz liste ve sırası · selector/assertion · varsayılan timeout (300000) + KILL_GRACE · yerel
sunucu güvenliği · git koruması (kirli başlangıç + koşum-sırası) · JSON şeması · Playwright sürümü ·
`gates:core`/`gates:browser`/`gates` komutları · ürün: index.html, data_chars.json, manifest, sesler,
okuma testleri, içerik.

## Test (§4/§5) — 7 senaryo, geçici taşınabilir Atlas kopyasında AÇIK mekanik fixture
Beyaz liste adları (smoke_sources/home_rec/backup/recognition) test kopyasında fixture betiklerle
değiştirilir; ÜRETİM whitelist'i veya gerçek smoke dosyaları değişmez.
1. non-zero çocuk, iki akış dolu → ikisi görünür, exit 1.
2. non-zero çocuk, bir akış boş → `(boş)`.
3. çok uzun çıktı → sınır + `[KESİLDİ]` + orijinal uzunluk + tail.
4. timeout → yakalanan çıktı korunur; sunucu kapanır; artık çocuk süreç kalmaz (pgrep ile).
5. `--json` başarısızlık → stdout tek parse edilebilir JSON; sonuç stdout/stderr tam.
6. başarı → 4/4, insan özeti korunur; PASS çocuk çıktısı basılmaz.
7. kirli başlangıç + koşum-sırası kirlenme korumaları değişmeden çalışır (git init'li temp kopya).
Yapay HARNESS ERR (exit=2 + stderr) fixture'ı ile asıl stderr'in insan logunda göründüğü kanıtlanır.

## Kapılar / kanıt
`npm run gates` → **14/14 core + 4/4 browser, exit 0** · `gates:core` · `gates:browser` ·
`node _faz2/tests/test_browser_gate_runner.mjs` (7/7) · `git diff --check` temiz ·
ürün/veri/manifest **başlangıç=son SHA** · tam git status yalnız §2 + teslim yolları.

## Yasak
commit/push/merge/PR/deploy/mağaza yok · Batch F sonunda dur.

**Kapsam doğrulandı.** Uygulamaya geçiliyor.
