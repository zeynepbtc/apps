# Navigasyon Malzeme Tutarlılığı — KİLİTLİ + UYGULANDI

> Bağlam: Header ve alt nav "bağımsız floating overlay" mimarisine geçirildikten sonra
> (commit 15eebf0), üst objeler ile alt kapsül arasında bir "aynı sistemin parçası değil"
> hissi kaldı. Bu belge kök nedeni, kilitli ilkeleri ve UYGULANAN çözümü (commit d3cfe54) kaydeder.

## Kilitli ilke (değişmez)

**Material consistency does not mean identical materials. It means consistent lighting,
elevation, and visual hierarchy. Brand elements and interface controls may use different
materials as long as they appear to exist in the same physical environment.**

Türkçe özü: Marka öğeleri ile arayüz kontrolleri farklı malzemeden olabilir — yeter ki
aynı fiziksel ortamda yaşıyormuş gibi görünsünler. Ortaklaşan şey malzeme DEĞİL; gölge
yüksekliği (elevation), ambient ışık, highlight ve kenar yumuşaklığıdır.
Bu ilke "tutarlılık = her şeyi cam yap" yanlış çıkarımını engeller.

## Objelerin rolleri (karıştırılmaz)

| Obje | Rol | Malzeme kararı |
|---|---|---|
| Logo (sol üst) | Marka / kimlik | Olduğu gibi. Cam YOK, blur YOK, disk YOK. Çıplak marka objesi. |
| Ayarlar (sağ üst) | Kontrol / chrome | Aynı kalır; sadece elevation birliği. Dev cam disk İSTENMEZ. |
| Alt kapsül | Chrome | Cam. Görevi chrome. |

## Felsefe 2 — KİLİTLİ karar (kenarsız whisper scrim)

Worst-case: koyu bir kart floating objelerin ALTINA kaydığında çıplak obje kaybolabilir.
Kilitli mimari ortak üst yüzeyi yasaklıyordu; ama kullanıcı bilinçli olarak Felsefe 2'yi seçti.

**Bant ≠ scrim ayrımı (kilit):**

| | Yasak "bant" | İzinli whisper scrim |
|---|---|---|
| Görünür kenar/sınır | var | **YOK** — hiçliğe kadar solar |
| Renk | kendi rengi (ucuz sarı) | renksiz = sayfa bg tonu (#DAD5C8), yeni hue yok |
| "Kutu" hissi | var | yok |
| Boş zeminde | görünür | neredeyse görünmez (bg ile aynı renk) |

Görünür alt kenarı olan scrim = geri gelen bant (YASAK). Tamamen kenarsız, nötr, içeriğe
varmadan şeffafa dönen fade = "bant" değil; sadece ışığı yönetir. Spec'in RUHUNU korur
(kutu yok, kenar yok), harfini bilinçli değiştirir.

## Uygulanan değerler (commit d3cfe54)

- **Üst scrim** (`header::before`, tüm sayfalarda global):
  `linear-gradient(to bottom, rgba(218,213,200,.80) 0%, rgba(218,213,200,.48) 50%, rgba(218,213,200,0) 100%)`
  `position:absolute; top:0; bottom:-22px; z-index:-1; pointer-events:none`. Renk = bg tonu → boş
  zeminde görünmez, koyu içerik altına gelince cream veil ile objeleri okunur tutar. `.tb-row` z-index:1.
- **Elevation birliği** (GPT talimatı: perceived height + lighting family, exact değer kopyası değil):
  logo + ayarlar `filter:drop-shadow(0 4px 12px rgba(58,42,26,.20))` — ikisi AYNI, alt kapsülle aynı
  sıcak-kahve hue. (Önceki: ayarlar `0 2px 5px .30`, logo gölgesiz.)
- **Kapsül camı** (hafif): `.fnav::before` `rgba(250,245,236,.24)→.30`, `blur 18px→20px`.
  Gölge/border/blob dokunulmadı (sevilen görünüm korundu).

## worst-case page ilkesi

Okunabilirlik en elverişli sayfada (Home — bg-decor + sıcak kartlar) DEĞİL, en elverişsizde
(düz krem zemin, yoğun kanji grid, uzun scroll, açık kartlar) ayarlanır. Doğrulama Kana liste
ekranında (yoğun açık kartlar) yapıldı: logo/ayarlar net okunur, scrim kenarsız, bant yok.

## Doğrulama (bu oturum)

- node --check (en büyük script) OK · smoke 23/23 · pageerror YOK
- Ekran görüntüleri: whisper scrim boş/açık zeminde görünmez, koyu pil arkasında obje okunur,
  elevation logo+ayarlar↔kapsül aynı katta, alt kapsül sevilen haliyle + bir tık daha ayrık.
- iOS gerçek cam davranışı yerelde doğrulanamaz → telefon testinde koyu kart worst-case'i gözlenmeli.

## Kalan (bu pas dışı, faz disiplini)

Bu pas kapatıldı; bundan sonrası küçük kazanım. B seçeneği (ayarlar için mini cam disk) yalnızca
telefon testinde üst hâlâ zayıf kalırsa gündeme gelir.
