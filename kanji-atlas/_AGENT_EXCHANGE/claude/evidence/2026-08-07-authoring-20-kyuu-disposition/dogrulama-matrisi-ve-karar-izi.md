# 九 — KAYNAK MATRİSİ, BAĞIMSIZLIK AYIKLAMASI ve KARAR İZİ

Bu belge **yeni araştırma değildir.** Sözleşme §5 gereği mevcut kanıt zinciri doğrulanmış,
kayıtlı alıntılar canlı kaynaklarla karşılaştırılmış ve kullanıcı kararının izi çıkarılmıştır.

Doğrulama tarihi (UTC): **2026-08-07**.

---

## 1. Canlı kaynak erişimi — **başarılı**, kayıtlı alıntılar doğrulandı

Sözleşme §5 "canlı kaynak erişimi mümkünse kesin URL, erişim tarihi ve kısa özgün alıntı"
diyor. Erişim mümkün oldu; bellekten alıntı üretilmedi.

### 1.1 Kanjipedia `0001360800` — **ZORUNLU ESAS**

| | |
|---|---|
| URL | `https://www.kanjipedia.jp/kanji/0001360800` |
| Erişim | 2026-08-07, canlı |
| Üstveri | 部首 乙 · 2画 · キュウ/ク · ここの/ここのつ |

```
象形。人がひじを曲げた形にかたどる。借りて、数詞の「ここのつ」の意に用いる。
```

> **DOĞRULAMA SONUCU:** bu satır, `九` kaydının `disagreementNote` alanında saklanan alıntıyla
> **birebir aynı**. Arşivlenen kanıt doğrudur; 2026-07-25'te kaydedilen metin bugün canlı
> sayfada aynen duruyor.

### 1.2 説文解字 卷十四 (漢典 üzerinden)

| | |
|---|---|
| URL | `https://www.zdic.net/hans/%E4%B9%9D` |
| Erişim | 2026-08-07, canlı |

```
說文解字 卷十四：陽之變也。象其屈曲究盡之形。凡九之屬皆从九。舉有切
```

説文解字注 (段玉裁) — **AYRI KATMAN**:

```
(九)昜之變也。列子、春秋䋣露、白虎通、廣雅皆云：九，究也。象其屈曲究盡之形。
許書多作詰詘，此云屈曲，恐後人改之。舉有切。三部。凡九之屬皆从九。
```

> **DOĞRULAMA SONUCU:** `disagreementNote` içinde kayıtlı olan
> 「九，陽之變也。象其屈曲究盡之形。」 alıntısı canlı metinle **uyumlu** (kayıtta başa lemma
> öneki konmuş; 説文'nin kendi gövdesi 「陽之變也。象其屈曲究盡之形。」). 段注 ayrıca
> 「九，究也」 okumasını 列子・春秋繁露・白虎通・廣雅'ya dayandırıyor — yani "bükülüp tükenme"
> okuması klasik gelenekte **tek satırlık bir kaprisi değil**, yerleşik bir hattır.

---

## 2. Kaynak matrisi — ortak bir **nesne omurgası** oluşmuyor (§5.2)

| Kaynak | Eski biçim neyi gösteriyor? | Sayı anlamı nasıl geldi? |
|---|---|---|
| **Kanjipedia (ESAS)** | **dirsekten bükülmüş kol** (人がひじを曲げた形) | **借りて** — ödünç |
| 説文解字 卷十四 (+段注) | **soyut**: 屈曲究盡 — bükülüp sona eren biçim; nesne yok | **ödünçleme YOK** — sayı doğrudan şekilden (九＝究) |
| 白川静 (kayıtlı) | **kıvrılmış ejderha** | ses ödünçlemesi (仮借) |
| EN Wiktionary (tek dayanak: **Sears**) | bükülü kol / dirsek | **anlam metaforu** ile — ses değil |
| ja.Wiktionary | — | 仮借 (ses ödünçlemesi) |
| OK辞典 `kanji131` | soyut "bükülüp tükenme" | doğrudan |

Üç ayrı **nesne**: bükülü kol · soyut bükülme hareketi (nesne değil) · ejderha.
İki ayrı **mekanizma**: ödünç (ses) · doğrudan anlam.

**Ortak nesne omurgası YOK.**

---

## 3. Bağımsızlık ayıklaması (§5.4) — "destek" sayılmayanlar

| Görüş | Ham kaynak sayısı | Bağımsız destek | Gerekçe |
|---|---|---|---|
| Dirsek / bükülü kol | 3 (Kanjipedia, EN Wiktionary, ja.Wiktionary) | **≈1,5** | EN Wiktionary'nin **tek dayanağı Richard Sears'tır** (hakemli değil) ve sayı anlamını **ses değil anlam metaforuyla** açıklar → aynı iddianın destekçisi sayılamaz |
| Soyut "bükülüp tükenme" | 2 (説文解字, OK辞典) | **1** | **OK辞典 bağımsız değildir — 説文'yi tekrarlıyor** (2026-07-25 QA turunda ölçülmüştü; 口 turunda da aynı tespit yapıldı) |
| Kıvrılmış ejderha | 1 (白川静) | 1 | tek kaynak |

Hiçbir okuma **iki bağımsız kaynağa** ulaşmıyor; en güçlü iki hat (Kanjipedia ↔ 説文)
**birbiriyle çelişiyor** — hem nesnede hem mekanizmada.

---

## 4. "Şekil dokuz nesneyi göstermez" — açılma gerekçesi YAPILMADI (§5.3)

Bu, tüm kaynakların örtük olarak uzlaştığı **tek** noktadır ve 2026-07-25 QA turunda
alt iddia **(a)** olarak **A** güveni almıştı. Ancak:

- **olumsuz bir ifadedir** — neyin *olmadığını* söyler, ne *olduğunu* söylemez,
- tek başına bir köken anlatısı **kurmaz**,
- kullanıcıya "Kökeni" başlığı altında verilecek bir cümle değildir.

Sözleşme §5.3 gereği bu bulgu **kullanıcıya açılma gerekçesi yapılmamıştır.**

---

## 5. Alt iddia bazında güven (2026-07-25 QA turundan, doğrulandı)

| Alt iddia | Güven | Durum |
|---|---|---|
| (a) "şekil dokuz nesneyi göstermez" | **A** | tüm kaynaklar uyumlu — ama olumsuz ifade |
| (b) "sayı anlamı sonradan, ödünç alınarak" | **B** | Kanjipedia + ja.Wiktionary + 白川 hemfikir; **説文/OK辞典 değil** |
| (c) "dirsekten bükülmüş kol" | **C** | ciddi görüş ayrılığı, hakemli kaynak yok |

Kayıt tek blok olduğu için **en zayıf halka belirler** → bütün olarak **C**.
Bu, bugün de geçerlidir; `confidence: "C"` doğru sınıflandırmadır.

---

## 6. Karar izi — çapraz kontrol (§5.1)

Zeynep'in 2026-07-25 kararı **dört bağımsız yerde** aynı şekilde kayıtlı:

### 6.1 Ürün verisinin kendi içinde — `九.etymology.disagreementNote`

```
===== NİHAİ KARAR (Zeynep, 2026-07-25) ===== Kayıt DRAFTED'da bırakıldı, reviewed VERİLMEDİ,
reviewedAt VERİLMEDİ. confidence B → C düşürüldü … Zeynep'in gerekçesi: "Şekil iddiasını
çıkarıp yarım bir metin yayınlamak yerine şimdilik boş bırakmayı tercih ediyorum."
Yani QA raporundaki seçenek (2) — kısaltılmış A/B metni — REDDEDİLDİ;
seçenek (3) — drafted'da bekletme — seçildi.
```

### 6.2 `AUTHORING-DURUM-ve-FAZLAR.md` (içe aktarılmış kanonik belge)

Kilitli **Çıkarılabilir Ayrıntı Testi** tablosunun üçüncü satırı:

```
| Çıkarınca **hiçbir şey kalmıyor** | Yayınlanmaz (`drafted`/`pending`) | 九 |
```

### 6.3 `AUTHORING-03-KAYNAK-POLITIKASI.md` satır 58

```
| Tartışmalı kısım çıkarılınca **hiçbir şey kalmıyorsa** | Yayınlanmaz — `drafted`/`pending` | 九 |
```

### 6.4 `AUTHORING-PARTI14-QA-RAPOR.md`

```
Sonra: **九**'un durumu (drafted, conf C — açılmıyor) ve **Editoryal Harmonizasyon** (11 kalem).
```

> **Çapraz kontrol sonucu: dördü de aynı kararı söylüyor, çelişki yok.**
> Karar ürün verisinin içinde, metodoloji belgesinde, kaynak politikasında ve parti
> raporunda tutarlı biçimde duruyor.

---

## 7. Bilinen borç — bu batch'te **düzeltilmedi** (§4)

`summaryTr` içindeki **"sesi nedeniyle"** ifadesi `EDITORYAL-UYUMLAMA-BEKLEYEN` §1'de
kayıtlıdır:

```
| 1 | 借りて geriye dönük hizalama ⭐ | AUTHORING-04 (B) kararı gereği kaynakta olmayan ses
gerekçesi çıkarılacak. 6 kayıt: 四 · 六 · 七 · 八 · 東 (reviewed) + 九 (drafted).
Çıkarılacak: "sesi uygun düştüğü için", "benzer sesli olduğu için", "sesi için",
"sesi nedeniyle". | Orta-Yüksek |
```

Aynı belgenin §11'i de `九`'un `mnemonic` alanının olmadığını, **açılırsa** eklenmesi
gerektiğini kaydediyor.

Bu iki kalem **ayrı editoryal uyumlama batch'inin** işidir ve burada **dokunulmadı**.
`九` kullanıcıya kapalı olduğu için ikisinin de bugün **kullanıcıya etkisi yoktur**.

---

## 8. Sonuç

Bu batch **yeni bir araştırma sonucu değildir.** Mevcut kanıtın ve Zeynep'in 2026-07-25
tarihli kararının **nihai yayın sınıflandırmasıdır**:

# `九` = CLOSED / HOLD / hidden drafted

`drafted` · `confidence: C` · `reviewedAt` yok · `kokenOf(九) → null` · kullanıcıya **kapalı**.
Karar geri alınabilir olmayı sürdürür (`disagreementNote` yolu tarif ediyor) ama artık
**Content Freeze öncesi açık bir authoring işi değildir.**
