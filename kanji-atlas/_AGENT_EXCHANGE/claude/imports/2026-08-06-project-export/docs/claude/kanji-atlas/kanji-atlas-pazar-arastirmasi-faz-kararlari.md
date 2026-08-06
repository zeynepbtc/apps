# Kanji Atlas — Pazar Araştırması & İleri Faz Kararları

> **Status:** GELİŞTİRME NOTU (2026-07-21) · Zeynep'in pazar araştırması. **İleri fazlarda yeri gelince ciddi değerlendirilecek** — şu anki odak (nav/ikon/logo) değil.
> **Kaynak:** popüler kanji öğretme uygulamalarından derlenen kullanıcı beklentileri + şikayetleri.

## Ana içgörü
Bizim **radikal / aile / kanji-bağlantıları (Atlas)** sistemimiz, pazardaki ortak eksiklerden birini **zaten çözüyor**. Buna **kelime bağlamı** + **iyi bir yazma döngüsü** eklenirse Kanji Atlas sıradan bir kanji-kart uygulaması olmaktan çıkar. Ayrı **bağımsız fırça uygulaması** ise daha da farklı bir boşluğu hedefleyebilir: **kullanıcının gerçek izini koruyan**, stroke order'ı öğreten ama **yazıyı onun yerine tamamlamayan** uygulama.

## Neyi kimden almalı (en doğru birleşim — hepsini taklit etme)
| Kaynak | Alınacak güç |
|---|---|
| **Atlas (biz)** | Radikal, aile ve kanji bağlantıları — çekirdeğimiz, koru |
| **Kanji Study** | Gerçek kelime içinde öğrenme (kelime bağlamı) |
| **Ringotan** | Kademeli stroke yardımı |
| **Robokana** | Beşli kısa dersler + özel setler |
| **Write It!** | Tanıma ↔ yazma ayrımı |
| **Skritter** | Stroke seviyesinde geri bildirim |
| **Benkyō** | Hassasiyet ayarı — ama görünür ayar kalabalığı olmadan |

## Kesinlikle KAÇINILACAKLAR
- Kullanıcının çizgisini **otomatik güzelleştirmek** (gerçek izi bozma).
- Bir hafta çalışılmayınca **yüzlerce görev borcu** çıkarmak.
- Tek bir **"öğrenildi %"** kullanmak (çok boyutlu ilerleme yerine).
- Her kanjiyi **sürekli aynı kelimeyle** sormak.
- Bütün **ayar/filtreleri ana ekrana yığmak**.
- **2.136 kanjiyi aceleyle** doldurmak.

## Yol haritasına bağlar (mevcut planla örtüşme)
- **Kelime bağlamı:** app'te `words`/`n5_words` altyapısı var → genişletme adayı.
- **Yazma döngüsü / stroke geri bildirimi:** daha önce kilitlenen **Stroke Coach** feature request'iyle birebir örtüşüyor (deterministik, çok-faktörlü el-yazısı değerlendirme; izi tamamlamaz). Bkz. faz3-plan.
- **Çok boyutlu ilerleme:** "tek % kullanma" → tanıma/yazma/kelime ayrı izlenmeli (SRS zaten var).
- **Tanıma ↔ yazma ayrımı:** mevcut Çiz + Mini test'i iki ayrı yetkinlik olarak konumlandırma.
- **Bağımsız fırça uygulaması:** aile içinde ayrı bir ürün fırsatı (gerçek iz + stroke order, otomatik tamamlama yok) — Japanese Flick / Baito gibi aile ürünleriyle aynı stüdyo çatısında.

## Karar
Bu notlar **ileri faz pusulası**. Yeri geldiğinde (IA refactor + Stroke Coach fazları) bu birleşim ve kaçınılacaklar listesi tasarım kriteri olarak kullanılacak. Şu an: nav/ikon/logo işleri önce kapanır.
