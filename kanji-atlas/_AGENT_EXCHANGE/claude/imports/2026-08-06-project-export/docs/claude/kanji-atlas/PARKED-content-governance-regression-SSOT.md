# PARK EDİLDİ — GPT'nin üçüncü tur production-line eklemeleri

> Zeynep'in ara notu (2026-07-24): "kenara al, sırası gelince değerlendiririz." İşi bölmüyoruz; canlı görev hâlâ pilot→91 onayı. Bu üç madde, Migration penceresi / roadmap v2 kilitlenirken açılacak. Kaynak: `PRODUCTION-LINE-REVIEW-GPT-vs-CLAUDE-v2.md`.

## GPT değerlendirmesi (özet)
Revizyona 9.8/10. En beğendiği: içerik araştırması ile mühendislik sağlamlaştırmasının paralel track'e ayrılması + "denetim şimdi paralel, kod uygulaması Migration'da birleşir" kararı. Faz-şişmesi eleştirime katılıyor (Motion/Empty/Microcopy/Cognitive Load tek Design Polish checklist'i). Native timing ve local-only telemetri konusunda benimle hemfikir. "İçerik-doğruluğu ≠ pedagojik-doğruluk" cümlesini olgunluk işareti sayıyor.

## Park edilen 3 madde (sırası gelince değerlendirilecek)
1. **CONTENT GOVERNANCE** — yeni içerik üretim standardı (kaynak zorunluluğu → QA → peer review → confidence → release). Gerekçe: bu 91 kanji düzelecek ama N4/N3/5000 kelime *aynı kaliteyle* nasıl yazılacak? Bir içerik-üretim pipeline'ı.
2. **CONTENT REGRESSION QA** — bir içerik değişikliğinden sonra tüm bağlı sistemlerin otomatik doğrulanması: Kart → Atlas → Game Pool → SRS → Examples → Audio → Search → Related → Family. Migration/QA var ama içerik-regresyonu yok.
3. **SINGLE SOURCE OF TRUTH** — meaning/readings/components/roles/mnemonic/examples/atlas/games/SRS hepsi tek DATA'dan beslensin; UI sadece render etsin. Bugün aynı bilgi birçok yerde tekrar ediyor.

## Claude'un ön-tutumu (tam değerlendirme ertelendi)
Üçü de yeni ekran değil **yönetim/altyapı katmanı** — faz-şişmesi riski düşük, kabul eğilimindeyim:
- **SSOT** zaten v2 şema yönümüzün örtük hedefi (DATA tek kaynak). Roadmap'e *açıkça* yazmak doğru; ayrıca 91 denetiminde bulduğumuz "aynı bilgi çok yerde" sorununu çözer.
- **Content Regression QA**, bizim zaten benimsediğimiz "her değişiklikten sonra doğrula" ilkesinin içerik versiyonu — Implementation'dan sonra doğal verification adımı. Deterministik script + smoke testleriyle ucuz kurulabilir.
- **Content Governance**, asıl değerini N4/N3 genişlemesinde gösterir; v1 için hafif bir "yeni içerik = kaynak + confidence + verdict zorunlu" kuralı yeterli, ağır süreç sonraya.
GPT'nin önerdiği birleşik hat: Track A'ya `Content Governance` (91 Audit sonrası, Migration öncesi) ve `Content Regression QA` (Implementation sonrası) eklenir. Roadmap v2 kilitlenirken bu tabloyla birlikte değerlendirilecek.
