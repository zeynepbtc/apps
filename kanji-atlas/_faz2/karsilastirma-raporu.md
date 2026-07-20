# Faz 2 · Kalem 1 (v2) — Karşılaştırma + Validator + Reverse Test

> Kanonik `FAMILIES` + çözümleyici, eski üç kaynakla karşılaştırıldı; enum donduruldu; primary/secondary eklendi; Reverse Test ve tüm-aile validator koşuldu. Canlı render'a dokunulmadı. Üretim: `faz2/harness.js`.

## 0. Relation enum (dondurulmuş)
- İzinli türler (6/10): `root, repetition, composition, indicator, variant, extension`
- Politika: yeni tür yalnız **Karar Günlüğü** girişiyle eklenir; tavan 10.

## 1. Validator — her aile, her üye (gece build denetimi)
- ✓ [tree] üyeler DATA'da var
- ✓ [tree] rel türleri enum'da
- ✓ [tree] tekrar eden id yok
- ✓ [tree] orphan üye yok (via çözülüyor)
- ✓ [person] üyeler DATA'da var
- ✓ [person] rel türleri enum'da
- ✓ [person] tekrar eden id yok
- ✓ [person] orphan üye yok (via çözülüyor)
- ✓ çapraz üye 休 tek primary — primary=person
- ✓ grafik düğümleri çözülüyor (char/primaryFam)

## 2. Ağaç (木) ailesi — kanonik vs eski kaynaklar

| Üye | ESKİ ATLAS | ESKİ EDGES | DATA parent | KANONİK (via·rel·primary?) | Sonuç |
|---|---|---|---|---|---|
| 木 (kök) | kök | — | — | kök·primary | ✓ |
| 林 | 木 | 木 | 木 | 木·repetition·primary | ✓ uyum |
| 森 | 林 | 林 | 木 | 木·repetition·primary | ÇÖZÜLDÜ: 林→森 yerine 木→森 (3×木) |
| 本 | 木 | 木 | 木 | 木·indicator·primary | ✓ uyum |
| 休 | 木 | 木,人 | 人,木 | 木·composition·secondary | ÇÖZÜLDÜ: çapraz üye; primary=person (secondary=tree) |

**Vitrinden ÇIKARILANLAR — ürün/pedagoji gerekçesiyle:**
- **校** (okul): 木+交 birleşimi ama 木 burada anlam-taşıyıcı DEĞİL, 交 fonetik. Öğretim değeri okul kavramında; ağaç ailesinde göstermek yanlış bileşen hikâyesi kurar. *Kanıt gelmeden pedagoji öne geçmez.* → geniş aile, sonraki faz.
- **東** (doğu): **Pedagojik gerekçe** — 東'deki 木 şekli aşınmış/tesadüfi; anlam-aktif bir 'ağaç' bileşeni değil. Ağaç ailesinde sunmak, olmayan bir ağaç-anlamı ima eder (köken/yapı/hatırlama ayrımını çiğner). 東'nin öğretim yeri **yön ailesi** (東西南北, işlevsel grup). Bu karar DATA değişse de değişmez.

## 3. Beş tüketici tek kaynaktan + primary/secondary
- **(1) aile şeridi** 休: primary=İnsan ailesi · secondary=Ağaç ailesi · üyeler=人 亻 大 天 休
- **(2) detail bağları** 木: 林(repetition) · 森(repetition) · 本(indicator) · 休(composition)
- **(3) grafik**: benzersiz düğüm 9 · kenar 8 · 休 primaryFam=person
- **(4) liste**: Ağaç ailesi(5) · İnsan ailesi(5)
- **(5) ilerleme** tree learned={ki,hayashi}: {"famId":"tree","learned":2,"total":5}

## 4. Stres — yeni aile = yalnız veri
- ✓ person ailesi çözümleyici değişmeden çalıştı — türler: repetition,indicator,composition,variant,extension

## 5. Reverse Test — `tree` FAMILIES'ten çıkarıldı
- ✓ hiç exception atılmadı
- ✓ tree-only karakter (林) şeridi → null
- ✓ tree-only karakter (林) detail bağları → []
- ✓ familyProgress('tree') → null
- ✓ grafikte tree kenarı yok
- ✓ 休 tree kalkınca person'a düşüyor (kontrollü)

> İyi veri modeli: EKLEYİNCE değil, ÇIKARINCA da çökmüyor. Reverse Test bunu kanıtlıyor.

## 6. Özet
- Validator: tüm aileler denetlendi · Reverse Test: kontrollü · Stres: geçti · Toplam başarısız kontrol: **0**
- Eski üç kaynağın 4 çelişkisi çözüldü; 東 için **pedagojik** gerekçe yazıldı; enum donduruldu; primary/secondary kavramı kod+veriye girdi.
- Sınır korundu: FAMILIES içerik/ses/ilerleme tutmuyor.