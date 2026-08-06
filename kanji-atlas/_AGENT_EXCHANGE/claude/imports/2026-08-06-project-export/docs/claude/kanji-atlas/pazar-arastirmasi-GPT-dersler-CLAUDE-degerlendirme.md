# Pazar Araştırması Dersleri — Claude Değerlendirmesi

> Companion: `pazar-arastirmasi-GPT-dersler-MASTER.md`. Claude'un dürüst görüşü, itirazları ve önerilen sıra (2026-07-21). Zeynep adım adım işlemek istedi.

## Genel yargı
Belge sağlam ve disiplinli. En değerli iki katkısı: (1) **omurga cümlesi** "Anla → gör → dinle → yaz → tekrar et → bağ kur" — her yeni fikri süzeceğimiz filtre; (2) **"kaçınılacaklar" listesi** — çoğu ürün eklemeyi değil eklememeyi bilemediği için batar. Belge bunu biliyor. Riski: kendi uzunluğu (7 faz × 4 öncelik). Asıl katkım acımasız sıralama + "şimdi değil" listesi olmalı.

## Zaten yapılmış (yeniden planlama YOK)
| Alan | Durum |
|---|---|
| Faz 0 ses | Native ses tamam, flick sıfır (~%80). Kalan: Words ses butonu, örnek cümle sesi (74 TTS), yeni örnek kelime sesi, ses↔metin QA taraması |
| Faz 5 içerik (kısmi) | Kanji örnek kapsamı 91/91 (bugün); native-düzey doğrulamadan geçti |
| Faz 1 hazırlık | Nav + ikon + logo tasarlandı ve KİLİTLİ (entegrasyon ayrı iş) |
| Yedek | HDD + Drive alındı |

## Sonuna kadar katıldıklarım
- Omurga cümlesini karar filtresi yapmak (3.1).
- **Stroke Coach güvenilir olmadan yayımlanmamalı (2.8/Faz 4)** — el yazısını cezalandıran tanıma bu kategoride güveni en hızlı öldüren şey. En yüksek riskli taklit.
- İçerik doğruluğu + her içerikte `veri kaynağı + QA durumu` alanı (3.15) — kendi kısıtımız "en kırılgan nokta = veri" ile birebir.
- Yarım ses olmaz (1.10/3.14) — az önce ağır yükü kaldırdık.
- Kilitli tasarımı gerekçesiz açmamak (3.16).

## İtirazlarım / gerilimler (asıl değer burada)
1. **1.1 + 2.1 "tek baskın ana eylem" ↔ KİLİTLİ "öner-kısıtlama-yok + eşit ağırlık".** GPT dokümanı Duolingo tarzı tek huniye daha yakın; senin kimliğin eşit-ağırlıklı araç kartları + öneri (kısıtlama değil). Uzlaşma: üstte **görsel olarak baskın tek öneri şeridi** ("Kaldığın yer: 木 ailesi"), ama Kana/Kanji/Yazı/Oyun kartları eşit ve görünür kalsın. Tek huniye dönerse ayırt ediciliğini silersin. (Faz 11'de öneri satırını zaten kurmuştuk — bu onun evrimi.)
2. **1.4 altı mastery durumu — UI tuzağı.** Altısını da içeride izle, ekranda en fazla 3 göster (Yeni / Çalışılıyor / Güçlü + "tekrar zamanı" rozeti). İçeride zengin, dışarıda sakin. Aksi 3.5/3.11'e (bombardıman/hiyerarşi) çarpar.
3. **Kana SRS sıralaması.** GPT P0/Faz 3'e koyuyor; en büyük boşluk olduğuna katılıyorum AMA Faz 3'ün "ortak mastery modeli" maddesi önce gelmeli. Kana SRS'i bağımsız silo yaparsak kanji SRS ile tutarsızlaşır → yeniden iş. **Önce ortak mastery modeli spec'i, sonra Kana SRS o modelin tüketicisi.**
4. **2.4 Gerçek Japonya bağlamı — daha sert geri çek.** Şirin ama yüksek emek (telif için özgün görsel) + düşük öğrenme ROI. P2 değil, pratikte P3. Dürüstçe: kimlik süsü, öğrenme kaldıracı değil.
5. **Meta-risk: §7 sekiz planlama çıktısını aynı anda üretmek = planlama-erteleme.** Bir kez roadmap-eşleme turu + TEK sonraki büyük taş seçmek daha sağlıklı.

## Önerdiğim sonraki 3 iş (GPT'nin listesinin rafine hâli)
1. **Faz 0'ı kapat:** Words ekranı ses butonu + örnek cümle/yeni kelime sesi kapsam kararı + ses↔metin eşleşme QA taraması. (Küçük-orta; release-gate'in son parçası.)
2. **IA/nav entegrasyonu (Faz 1):** en büyük yapısal taş; tüm görsel işler buna bağlı. AMA "baskın eylem ↔ eşit ağırlık" gerilimini önce Zeynep ile netleştir, sonra kur.
3. **Ortak mastery modeli spec'i:** Kana SRS'in ön koşulu; kod yok, pedagojik+teknik tasarım.

Görsel cilalar bu üçün önüne geçmeyecek (GPT ile aynı fikirdeyim).
