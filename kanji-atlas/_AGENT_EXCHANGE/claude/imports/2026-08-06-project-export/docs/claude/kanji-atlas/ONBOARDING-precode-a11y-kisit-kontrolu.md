# Onboarding — Pre-code Erişilebilirlik Kısıt Kontrolü (code-free)

> **Durum:**
> - Pre-code kısıtları **tasarım düzeyinde karşılanabilir: EVET**
> - Gerçek erişilebilirlik testi geçti: **henüz değil** — font render, kontrast, focus sırası, metin büyütme **gerçek arayüz olmadan ölçülemez**; Adım 7'nin **fixture + staging** kapılarında doğrulanır.
> **Amaç:** R3 hiyerarşisi koda dökülmeden tasarımın erişilebilirlik kısıtlarını karşıladığını doğrulamak (uygulanabilirlik kontrolü — ölçüm değil).
> **Kaynak:** kilitli `ONBOARDING-R2A-...` + `ONBOARDING-R3-...` + `ONBOARDING-B2-...`. **Kod YOK.**

---

## §1 — Kısıt listesi (tüm ekranlar)

### A. Metin & okunabilirlik
- [ ] Font küçültme yok · kesme/ellipsis/gizleme yok · büyütmede dikey reflow · gövde okunur min boyut.

### B. Font kabul (Adım 7 ilk GATE — §6)
- [ ] Gerçek dosyalarla **ğ ş ı İ ö ü ç** + **あ ア 火 木**; Türkçe fallback sıçraması yok; başlıkta kalınlık karışması yok; eğitim glifleri detayla aynı; Shippori yüklenemezse okunur fallback.

### C. Dokunma & eylem → ölçüt §5-1
### D. Yerleşim & kaydırma → ölçüt §5-5
### E. Renk & kontrast → ölçüt §5-2
### F. Hareket
- [ ] Animasyon olmadan tam anlam; içerik ilk render'da; dokunma/okuma gecikmesi yok. *(Tam reduced-motion Adım 7 sonrası.)*
### G. Yapı & okuma sırası → ölçüt §5-4
- [ ] Okuma/DOM sırası = görsel öncelik (başlık → içerik → köprü → CTA-1 → CTA-2).

---

## §2 — Ekran-özel kritik kısıt

| Ekran | Ana kısıt riski | Tasarım nasıl karşılıyor |
|---|---|---|
| Karşılama | Sticky CTA + kısa içerik | Alt boşluk; overlay yok; scroll gerekirse |
| Yetkinlik | 4 kart eşit + uzun metin büyütme | min-height + görsel kural; dikey akış; küçültme yok; kart 44px+ |
| Üç sistem | Bilgi duvarı + kaydırma + köprü kontrast | Kontrollü scroll; köprü belirgin ama baskın değil; sticky örtmez; içerik ilk render'da |
| Final | Görsel odak + eğitim glifi doğruluğu | あ/ア/木 eğitim fontu; Band 1 あ・ア çifti; scroll; gerekçe akar |

---

## §5 — Adım 7 kabul ölçütleri (ölçülebilir hâle getirilmiş kısıtlar)

**1. Dokunma hedefi (iki boyut açık)**
```
CTA-1:            min 44 × 44 CSS px
CTA-2:            min 44 × 44 CSS px
Yetkinlik kartı:  tüm kart yüzeyi etkileşim alanı
```
Metin görsel küçük kalabilir; çevre dokunma alanı 44×44'ten küçük olmaz.

**2. Kontrast matrisi (uygulama sonrası, ayrı çiftler)**
```
Gövde metni ↔ warm bg
İkincil metin ↔ warm bg
CTA metni ↔ terracotta CTA zemini
CTA-2 metni ↔ warm bg
Kart metni ↔ kart zemini
Focus göstergesi ↔ çevre zemin
Seçili kart border/işareti ↔ kart ve sayfa zemini
```
Birincil butonda kritik: yalnız terracotta'nın zeminden ayrılması değil, **buton yazısının terracotta üzerinde okunması**.

**3. Türkçe–Japonca dil semantiği**
```
Sayfa/aralık dili: Türkçe
Japonca glifler (あ ア 火 木): Japonca dil işareti
```
- Arayüz ana dili Türkçe; öğretim glifleri Japonca işaretlenir; ekran okuyucu bunları Türkçe harf gibi yorumlamaz.
- Glif erişilebilirlik davranışı: öğretimsel anlamlıysa uygun erişilebilir ad · yalnız dekoratif tekrar ise ekran okuyucudan gizle · aynı içerik iki kez anlamsız okutulmaz.

**4. Klavye & focus**
```
Tab ile erişilebilir
Enter/Space ile seçilebilir
Focus göstergesi görünür
Yalnız focus alınca otomatik İLERLEMEZ
Yalnız kullanıcı etkinleştirince ilerler
Ekran geçişinde focus yeni ekranın H1'ine taşınır
```
Otomatik ilerleyen yetkinlik seçiminde focus eski DOM noktasında kaybolmaz.

**5. Reflow & sticky kabul (staging'e girer)**
```
320 CSS px genişlikte yatay sayfa kaydırması YOK
%200 metin büyütmede içerik kesilmiyor
Kartlar yatay taşmıyor
Sticky CTA son içeriği örtmüyor
İçerik sonu ↔ sticky arası yeterli alt boşluk
Safe-area hesaba katılıyor
```
%400 zoom + kapsamlı yönelim testleri **tam a11y fazında**; %200 + dar mobil genişlik **staging kabulüne** girer.

---

## §6 — Font kabulünün yeri: Adım 7 ilk uygulama GATE'i
Gerçek font dosyalarıyla **ğ ş ı İ ö ü ç** + **あ ア 火 木** kontrolü, **tüm onboarding CSS'i bitmeden önce** küçük bir font fixture'ı olarak render edilir (sonda sürpriz font sorunu yaşamamak için).
Beklenti: Shippori Mincho Türkçe karakterleri tutarlı gösterir · gövde sans'ında Türkçe fallback sıçraması yok · Japonca eğitim glifleri mevcut Kana/Kanji detaylarıyla aynı · font yüklenemezse arayüz bozulmadan okunur kalır.

---

## §7 — Geçiş
Tüm pre-code kısıtları tasarımda karşılanabilir (EVET) → **Adım 7 uygulama planı** (`ONBOARDING-ADIM7-uygulama-plani.md`; plan onayı ayrı kapı; onaydan sonra kod + fixture + staging). Gerçek ölçümler (font/kontrast/focus/reflow) Adım 7 fixture + staging kapılarında.
