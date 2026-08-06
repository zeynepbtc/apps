# Kanji Kartı İçerik Modeli — "Köken vs Hatırlatıcı" Araştırması

> Amaç: Zeynep'in tespiti üzerine — kanji kartlarındaki **"Kökeni"** alanının aslında hatırlatıcı (mnemonic) tonunda yazıldığı, gerçek etimoloji olmadığı endişesi. Kaliteli kanji kaynaklarının bu ayrımı nasıl yaptığını araştırdık. Bu not GPT'nin paralel araştırmasıyla kıyaslanmak üzere yazıldı.
> Tarih: 2026-07-24 · Kaynak-of-truth kod değil, bu bir karar/araştırma notudur.

## 1. Zeynep'in tespiti (ekran görüntüleri: 月 ve 男)

- 月 kartı: **"Kökeni: Hilal şeklindeki ay resmi."** → Zeynep: "hilal ay hiç alakalı gelmedi, modern glif hilale benzemiyor."
- 男 kartı: **"Kökeni: Tarlada güç harcayan: erkek."** → mnemonic hikaye gibi okunuyor.
- Genel iddia: "Tüm kanjilerde köken diye yazan aslında mnemoniki tarif ediyor. Bu köken değil, hatırlatıcı olabilir. Köken başka bir şey."
- Ayrıca: Atlas bileşen etiketlerinde Türkçe karakter bug'ı ("güç" → "güc", ç düşüyor; serif/Shippori Mincho ç/ş/ğ taşımıyor).

## 2. Kritik nüans: içerik aslında YANLIŞ değil, SUNUM köken'i çürütüyor

Araştırma sonucu ilginç: mevcut metinler bilimsel olarak kabaca doğru.

| Kanji | Mevcut "köken" metni | Gerçek etimoloji (kaynaklı) | Değerlendirme |
|---|---|---|---|
| 月 | "Hilal şeklindeki ay resmi" | Gerçekten hilal ay piktogramı. Oracle bone (MÖ ~1600–1200) basit hilal; bambu-şerit çağında uzatılıp ekseninde döndürülmüş → modern 月. | **Doğru etimoloji.** Ama modern glif atadan çok uzaklaştığı için, *eski form gösterilmeden* iddia kanıtsız/kopuk kalıyor. |
| 男 | "Tarlada güç harcayan: erkek" | 田 (tarla) + 力. 力 = ya "kaslı kol" (Setsumon) ya "saban" (Shirakawa). "Tarlada saban/güçle çalışan = erkek." Oracle/bronz formlar bunu destekliyor. | **Kabaca doğru bileşensel etimoloji.** Ama "güç harcayan" hikaye tonunda; 力'nin saban kökeni gizli. |

**Sonuç:** Zeynep'in içgüdüsü doğru ("köken → hatırlatıcıya kaçmış") ama sebep uydurma bilgi değil. İki gerçek sebep:
1. **Görsel kanıt yok** — köken'in inandırıcı olması için eski form (oracle/seal → modern) mini evrim şeridi gerekiyor. Metin tek başına "iddia" gibi duruyor.
2. **Ton hatırlatıcı sesinde** — "Tarlada güç harcayan" cümlesi etimoloji değil hikaye gibi okunuyor.

## 3. Kaliteli kaynaklar bir kanjide neyi nasıl sunuyor?

| Kaynak | Felsefe | Kanji başına içerik | Köken/etimoloji? |
|---|---|---|---|
| **Heisig RTK** | Anlam-önce, uydurma hikaye | Anlam, bileşen ("primitive"), mnemonic hikaye, çizim sırası. Okuma YOK, kelime YOK. | **Yok** (kasıtlı). Uydurma primitive isimleri. |
| **WaniKani** | Radikal→kanji→kelime, SRS | Anlam, okuma, radikal, hem anlam hem OKUMA için mnemonic, örnek kelime | **Yok.** Uydurma radikal isimleri; ses bağını gizler. |
| **KanjiDamage** | Kaba/komik mnemonic | Anlam, okuma, bileşen, mnemonic, kelime, benzer-kanji ayırt ipucu | **Yok**, mnemonic. |
| **Kodansha KKLC** | Bileşen ("grapheme") + hikaye | Anlam, okuma, bileşen, mnemonic, çizim, örnek kelime (sadece öğrenilmiş kanjiyle) | Kısmi/karışık. |
| **Outlier Kanji Dict.** | **Bilimsel etimoloji** | Karakterin 3 özelliği + bileşenlerin işlevi + gerçek köken + (ayrı) mnemonic | **Evet, tek ciddi bilimsel kaynak.** |

### Outlier'ın çerçevesi (bizim için en değerlisi)
- **Bir karakterin 3 özelliği:** Form (biçim) · Anlam · Ses.
- **Bileşenlerin 3 işlevi:** Anlam bileşeni · Ses bileşeni · Form bileşeni. Bazıları **"boş bileşen"** (işlevsiz, karakterin anlam/sesiyle alakasız).
- **En kritik uyarı:** Uydurma mnemonic "kanjilerin gerçekte anlam/sesi nasıl taşıdığını gizler." Örnek: 識'i "söz(言)+ses(音)+mızrak(戈)" diye parçalayan hikaye, gerçek **ses bileşeni 戠**'yi (職 織 ile ortak) gizler. "Herhangi bir kanji için sonsuz hikaye uydurulabilir; ama sadece gerçek işlevsel bileşene dayalı hikaye, erken aşamadan itibaren kanjiler arası gerçek ses/anlam bağını görmeyi sağlar."
- **Ne zaman etimoloji, ne zaman mnemonic:** Mnemonic ilk ezberde işe yarar; ama tahmin gücü (bilinmeyen kanjiyi kestirme) ve uzun-vade hatırlama için gerçek işlevsel bileşen şart.

## 4. Bu bizim locked "3 katman modeli"ne nasıl oturuyor?

Bizim model: **Köken** (piktogram kaynağı) · **Neden böyle?** (yapısal mantık) · **Hafıza** (hatırlatıcı).

Bu model aslında Outlier'la **uyumlu ve doğru.** Sorun modelin kendisi değil:
- İçerik katmanları karıştırıyor (Köken alanı Hafıza tonunda yazılmış).
- Köken katmanı **görsel kanıtsız** (eski form yok).
- **Ses bileşeni ayrımı bizde hiç yok** — Outlier'ın "asıl fayda" dediği şey. En büyük yapısal eksik.

## 5. Öneri (tartışmaya açık — GPT araştırmasıyla kıyaslanacak)

**Yol A — Köken'i gerçekten köken yap (Outlier yolu; premium ama zahmetli)**
1. Her kanjide Köken = kısa gerçek etimoloji + **eski form mini evrim şeridi** (oracle/seal → modern). "Hilal ay" ancak eski glif görününce oturur.
2. **Ses bileşenini işaretle** (form/anlam/ses ayrımı). Bizde hiç yok; en değerli katkı; "aile/parça ile keşfettir" vizyonuyla birebir.
3. Hafıza katmanı ayrı ve **dürüstçe etiketli**: "bu bir hafıza tekniği, bilimsel köken değil."

**Yol B — Dürüst etiketleme (hızlı, düşük risk)**
1. Her kanjiyi denetle: metin gerçek etimoloji mi, hikaye mi?
2. Gerçek etimoloji → "Köken" kalır (mümkünse görselle). Hikaye → başlık **"Hatırlatıcı"** olur.
3. Böylece hiçbir yerde "yanlış şeye köken demiş olmayız."

**Karma öneri (Claude tavsiyesi):** Kısa vade **Yol B** (dürüst etiketleme — anında doğruluk kazancı, düşük risk). Orta vade Yol A'nın en değerli parçaları: **eski-form görsel şeridi + ses bileşeni işareti.** Çünkü araştırma net: fark yaratan uydurma hikaye değil, gerçek bileşen işlevini (özellikle ses) göstermek.

## 6. Yan bulgu — Türkçe karakter bug (Atlas bileşen etiketleri)
"güç"→"güc", serif (Shippori Mincho) ç/ş/ğ taşımadığından. Zaten P0/P1 glyph süpürme işinde; bu ekran (atlas bileşen/aile etiketleri) listeye eklendi.

## Kaynaklar
- Outlier Linguistics — Three Attributes, Three Functions
- Outlier Linguistics — What is Etymology and Is it Useful for Learning Kanji? (Part 1)
- Tofugu — Best Kanji Learning Programs
- Beyond Calligraphy — Kanji 月 etimolojisi
- KANJI PORTRAITS — 男 ve 力 etimolojisi
