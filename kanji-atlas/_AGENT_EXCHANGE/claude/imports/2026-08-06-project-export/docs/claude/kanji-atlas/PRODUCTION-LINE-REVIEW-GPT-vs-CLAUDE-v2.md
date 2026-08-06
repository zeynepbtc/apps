# Production-Line Review — GPT önerileri + Claude savunması (v2)

> `URETIM-YOL-HARITASI-GENIS-TABLO.md`'nin üzerine GPT'nin ikinci turdaki production-line analizi geldi. Bu not: GPT'nin eklemeleri + Claude'un katıldığı/itiraz ettiği noktalar + önerilen birleşik sıralama. Karar-aşamasında; Zeynep hizalayınca ana roadmap v2'ye işlenecek.
> Tarih: 2026-07-24

## GPT'nin eklemek istediği fazlar & Claude'un tutumu
| # | GPT önerisi | Claude tutumu | Gerekçe |
|---|---|---|---|
| 1 | **Learning QA / Educational Review** (her ekran: recognition/recall/production/writing/listening/discrimination/transfer) | **KATILIYORUM** — ama zaman-kutulu | Gerçek boşluk; içerik-doğruluğu ≠ pedagojik-doğruluk. Ancak sonsuz "mükemmel pedagoji" kapısı olmamalı; iterasyonu besler, v1'i süresiz kilitlemez. |
| 2 | **Game Balance Pass** (soru sayısı, bitiş koşulu, havuz, SRS ağırlığı, tekrar oranı) | **KATILIYORUM** — dar tut | Şu an tanımsız (Ses Avı kaç soru? Mahjong kaç yanlış?). Ama Faz O'nun kapanışı olarak tek odaklı geçiş, dev faz değil. |
| 3 | **Learning Analytics zorunlu** | **KISMEN** | App localStorage tek-dosya; backend yok. **Local-only enstrümantasyon** (localStorage sayaç, kimseye gitmez) ucuz → erken yap. **Ağ/uzak analytics** = launch sonrası (gizlilik etiketi + rıza + altyapı). Önemli ama v1 ship-blocker değil, gizlilik-önce. |
| 4 | **User Testing** (5 sıfır + 5 N5 + 5 ileri, sabit görevler) | **GÜÇLÜ KATILIYORUM** — ayrı faz | En büyük boşluk. Roadmap'te "telefonda yaşat" vardı ama yapısız; GPT'nin kohort+görev yapısı doğru. Store'dan ÖNCE. |
| 5 | **Cognitive/Memory Load Pass** (kart aşırı bilgi) | KATILIYORUM — ama **birleştir** | Gerçek risk (onyomi+kunyomi+romaji+köken+hatırlatıcı+bileşen+test+çiz+ses+vuruş+örnek aynı ekranda). Ayrı faz değil, Design Polish checklist'ine gir. |
| 6 | **Microcopy Review** (terminolojiden ayrı) | KATILIYORUM — **birleştir** | Değerli ama Design Polish içinde tek geçiş; ayrı faz şişirme. |
| 7 | **Motion Review / Motion Language** | KATILIYORUM — **birleştir** | Home→Kanji→Detay→Atlas tek animasyon dili. Design Polish checklist. |
| 8 | **Empty States** gerçek tasarım işi | KATILIYORUM | Ucuz, yüksek cila-ROI. Design Polish içinde ama hak ettiği ciddiyetle. |
| 9 | **Performance Pass** (açılış, render, scroll/atlas fps, memory, ses, svg, canvas) | KATILIYORUM — **doğru boyutla** | Eksikti. Ama tek-dosya localStorage app; bütçe mütevazı. İzlenecek asıl nokta: Atlas büyüdükçe. |
| 10 | **Educational Review merkeze** ("oyunlar bitmiş sayılmaz") | KATILIYORUM (ruh) — **zaman-kutulu** | Doğru vurgu: fark yaratan yeni ekran değil öğrenme kalitesi. Ama pedagojik-mükemmeliyetçilik ship'i süresiz ertelememeli: yeterince iyi + gerçek kullanıcı gözlemi > teorik mükemmel. |

## Claude'un iki asıl itirazı (faz disiplini savunması)
1. **Faz şişmesi.** GPT ~9 yeni isimli faz öneriyor; projenin kilitli ilkesi "her yeni iş tek ve kapanabilir, kapsam genişlemesine uyanık." Cognitive Load + Motion + Microcopy + Empty States → **tek "Design Polish" checklist'i**, dört ayrı faz değil. Niyeti al, çoğalmayı reddet.
2. **Her şeyi stability bloğunun arkasına dizmek.** İçerik-doğruluğu denetimi read-only araştırma, sıfır kod riski, ürünün çekirdek değeri + en kırılgan katmanı. Migration/accessibility/performance'ı beklemeden **paralel track olarak ŞİMDİ** başlar. İki track, User Testing'de birleşir.

## Claude'un kabul ettiği GPT düzeltmeleri
- **Native sarım zamanlaması:** en sona bırakmak riskli. Capacitor/WKWebView safe-area, klavye, dosya, ses, yaşam döngüsünde sürpriz çıkarır. **Son yayından bir faz önce** devreye alınmalı, kalan polish+test onun üzerinde. → Benim eski roadmap'te "en son"du; **düzeltiyorum.** (Mevcut `kanji-atlas-cihaz-gerceklik-safe-area.md` bunu destekliyor.)
- **Learning QA ≠ Content QA** ayrımı doğru; ikisini ayrı tutuyorum.
- **User Testing Store'dan önce** — kesin.

## Önerilen BİRLEŞİK sıralama (iki paralel track → birleşme)
**Track A — Öğrenme/İçerik (şimdi başlar, düşük kod riski):**
Kanji içerik denetimi (pilot→model kilidi→91 tarama→P0/P1 içerik düzeltmeleri) → Learning QA (ekran-başına beceri haritası) → Game Balance → local-only öğrenme enstrümantasyonu.

**Track B — Mühendislik sağlamlaştırma:**
Stability → Migration (v2 içerik şeması buraya biner — sinerji) → Accessibility → Performance → Device Matrix → **Design Polish** (empty states + motion language + microcopy + cognitive-load, tek birleşik checklist).

**Birleşme → yayın:**
User Testing (3 kohort × sabit görev) → düzeltme → **Native sarım (yayından bir faz önce)** → Release QA + gizlilik etiketi → Store.

**Launch sonrası:** uzak öğrenme analytics, dil seçenekleri (i18n), (renk revizyonuna binmediyse) gece modu, ileri oyun sistemleri.

## Sinerji notu
İçerik v2 şeması (`etymology/structure/mnemonic/readings` nesneleri) zaten bir şema-bump → migration guard gerektiriyor. Yani **Track A'nın içerik düzeltmelerinin UYGULANMASI, Track B'nin Migration adımına doğal biner.** Denetim (araştırma) şimdi paralel gider; kod-uygulaması Migration penceresinde birleşir. Böylece kanji revizyonu açık-uçlu mega-faza dönüşmez: pilot→kilit→tarama→fix ayrı ayrı kapanabilir adımlar kalır.
