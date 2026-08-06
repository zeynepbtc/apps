# Kanji Atlas — Ses Re-record & QA Bulguları

> 2026-07-21 · Gerçek kullanımda çıkan ses bulguları. Release-gate'in parçası.

## ✅ TAMAMLANDI — Tüm sözcük/kana/kanji sesi tek native ses (2026-07-21)

Zeynep A/B/C/D/E kayıt kuyruklarının **tamamını** kaydetti; hepsi işlendi, gömüldü, deploy edildi.

| Liste | İçerik | Adet | Sonuç |
|-------|--------|------|-------|
| A | Kapsanmayan örnek kelimeler | 55 | word entry eklendi (audio/word/) |
| B | Sessiz (-91dB) flick dosyaları | 6 | sensei/okane/ima/tomodachi/kyou/mainichi yeniden |
| C | Onset-kırpık flick kanji okunuşları | 70 | kanji kart sesleri native; 15'i kana dosyası paylaşımlı |
| D | Kalan temel kana (gojūon) | 37 | hira+kata paylaşımlı → 74 kana girişi native |
| E | Kalan kelimeler (selam/gün/günlük) | 29 | son flick kayıtları değişti |

**Sonuç durumu (manifest, 390 kayıt):**
- kaynak: **390/390 yeni — FLICK SIFIR.** Artık tüm app tek tutarlı native ses.
- durum: recorded 316 (kana 92 + kanji 91 + word 133) · **tts 74 (yalnız örnek CÜMLE)**.
- Kanji kart ses kapsamı **91/91**. Örnek kelime kapsamı **72/85**.

**Kalan ses boşlukları (bilinçli, ileride):**
1. **74 örnek cümle** hâlâ TTS (`sentence` kategorisi). Ayrı ve büyük kayıt işi; tekil sözcük/kanji çekirdek olduğu için düşük öncelik.
2. **13 tek-kanji örnek yüzeyi** (休 口 女 日 月 林 森 火 玉 王 話 語 読) örnek-kelime (`word`) anahtarıyla sessiz — çoğu mevcut kayıttan yeniden kullanılabilir, kayıt gerektirmez.
3. Dakuten/handakuten + küçük kana (が, ぱ, ゃ…) kana rehberinde ayrı modül; henüz native kayıt yok.

## Ses işleme hattı (kanıtlanmış — A/B/C/D/E hepsinde kullanıldı)
Tek uzun kayıt, satır aralarında boşluk → `silencedetect noise=-35dB:d=0.35` → sessizlik **orta noktalarından** böl → her parça için segment içi onset/offset tespiti (`-35dB:d=0.06`), **onset−0.06s / offset+0.10s** ile kes (onset kırpma YOK) → `loudnorm I=-16:TP=-1.5:LRA=11` → mp3 44100/128k. Romaji-çift anahtarlarda (ki/hi/aka/go/sen) sıra-index ile böl. Sonuç: tüm parçalar temiz onset, peak ~−2dB, sessiz dosya yok.

## ⚠ KRİTİK İŞ AKIŞI DERSİ — manifest çift kopya
Manifest İKİ yerde:
1. `kanji-atlas/audio-manifest.json` (kanonik kaynak)
2. `kanji-atlas/index.html` içinde **gömülü `AUDIO_MANIFEST`** (FAZ2_AUDIO_MANIFEST_START/END arası) — **app bunu okur, JSON'u değil (runtime fetch yok).**
**Kural:** JSON'u güncelledikten sonra MUTLAKA `python3 kanji-atlas/_faz2/inject_manifest.py` çalıştır. Yoksa değişiklik app'e YANSIMAZ. → 2026-07-21'de 47 kayıt eklendi ama enjekte edilmeyince 天 vb. robotik çaldı; enjeksiyonla düzeldi.

## Paylaşımlı dosya notu (kana ↔ kanji)
Manifestte bazı kanji entry'leri kana dosyasını paylaşıyor (二→kana/ni.mp3, 木→kana/ki.mp3 …). Bir dosyayı değiştirmek onu paylaşan TÜM entry'leri etkiler. C+D'de bu bilinçli kullanıldı: kanji okunuşu = kana sesi olduğundan (二=に) tek kayıt ikisini de native yaptı. Entegrasyonda: dosyayı yaz + o dosyayı paylaşan tüm entry'lerin `kaynak`'ını yeni yap.

## Deploy hattı (her ses batch'i)
faz2-kalem1'de `audio/` + manifest güncelle → inject → `node --check` (en büyük script) + DATA/manifest JSON doğrula → commit → main'de `git archive faz2-kalem1 … | tar -x` ile `kanji-atlas-preview/`'e senkron → her iki dalı push (token yalnız URL'de, çıktı `sed` ile maskeli) → `git fetch <url> '+refs/heads/*:...'` ile stale ref temizle. Test: **zeynepkaya.app/kanji-atlas-preview/**.

## Release-gate hatırlatması
Tüm tekil sözcük/kana/kanji sesi native ve `dogrulanmali:true` (dev'de çalar, release'de sessiz). Release'e geçmeden Zeynep'in telefonda QA'i + `dogrulanmali:false`'a çevirme gerekiyor. Sonra `AUDIO_MODE="release"` + faz2-kalem1 → main merge.
