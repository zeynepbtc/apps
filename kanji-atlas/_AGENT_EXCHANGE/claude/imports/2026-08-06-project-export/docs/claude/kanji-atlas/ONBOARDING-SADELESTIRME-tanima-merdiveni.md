# Onboarding Sadeleştirme — "Tanıma Merdiveni" + Yazı Mantığı Hub + Yardım (TASARIM KONSOLİDE)

> **Durum:** Zeynep'in ekran-ekran review'ı (N1–N5) buraya **konsolide edildi.** **Kod yok, faz açılmadı.** Sıradaki: **ekran-ekran + yönlendirme haritası** (kod-suz, mevcut koda göre) → plan → onay → kod. Ham review notları: `ONBOARDING-EKRAN-CILA-NOTLARI.md`.
> **Motivasyon (Zeynep):** "hiç içime sinmedi" → daha sade, hedef odaklı, laf kalabalıksız.
> **Ana içgörü:** "seviyen nedir?" DEĞİL → **"bunu tanıyor musun?"** Somut karakter göster, tanıma sor; seviye ilan ettirme. Baskısız, dürüst, ekranda mini öğrenme anı.
> **Kapsanır:** B2 altyapısı (startKey/descriptor + öneri şeridi + ilk-eylem markörü) korunur; değişen = seçtirme biçimi (competency ekranı → tanıma merdiveni) + "üç sistem" primer'inin yeri.

## Onboarding akışı — tanıma merdiveni (3 ekran, onboarding burada BİTER)
Model: her adımda **Hayır → ilgili tanıtıma** · **Evet → bir derine** · **Ana sayfaya git → atla** (her sayfada).

| Ekran | İçerik | **Hayır** (tanımıyorum) | **Evet** (tanıyorum) |
|---|---|---|---|
| **1. Karşılama** (AYNI) | Logo · "Kanji Atlas" · "Japonca yazı sistemlerini keşfetmeye başla" · **Başlayalım** (→ 2) | — | — |
| **2. あ** · "Bunu tanıyor musun?" | büyük あ · güvence "Tanımıyorsan sorun değil…" | **Hayır** — alt: "yazı sistemleri mantığını tanıyarak başlamak için tıklayın" → **Yazı Mantığı tanıtımı** | **Evet** → **3. sayfa** |
| **3. 木** · "Bunu tanıyor musun?" | büyük 木 · güvence | **Hayır** → **Kanji nedir?** → (buton) → **Kanji'ye devam** (kanji bölümü) | **Evet** → **Kanji Atlas** (ağaç / aileleri pekiştir · `map`) |

- **"Ana sayfaya git"** her sayfada altta (welcome dahil). **Kopya tek dile:** "git" (welcome'daki "geç" düzeltilecek).
- **Düzen (kritik):** foto örneği "あ ile başlayalım" gibi **ortada, düzenli, alt alta gruplu** (glif → başlık → kısa alt metin → butonlar → "Ana sayfaya git"). Yayılmış/dağınık DEĞİL. Uygulama ipucu: mevcut `.ob-final` düzenini yeniden kullan.
- **Butonlar:** Evet / Hayır iki buton; Hayır'ın alt açıklaması var, Evet'in gerekmez. **Renk:** kendi paletimizden (aş. Flick hizalama). **Kaldırılan:** ayrı "üç ana sistem" tanıtım ekranı (içerik Yazı Mantığı dersinde).

## Yönlendirme + durum semantiği (KRİTİK — dünkü makine korunur)
Her çıkış öneri şeridi / kaldığın-yerden-devam / ilk-eylem markörünü tutarlı bırakmalı:
- **Hayır/Evet çıkışları = onboarding "tamamlandı"** + uygun **başlangıç-hedefi (startKey)**:
  - あ Hayır → Yazı Mantığı (`writing-system`) · startKey = yazı-mantığı/kana yönlü (**AÇIK:** öneri şeridi ne desin)
  - 木 Hayır → Kanji nedir → Kanji'ye devam · startKey = kanji-başlangıç
  - 木 Evet → Atlas (`map`) · startKey = `atlas-map`
  - (Eski B2 band0/1/2/3 startKey'leri bu 3 çıkışa **remap** edilecek; `kanji-ki` bu bandda kullanılmayabilir — haritada netleşir.)
- **"Ana sayfaya git" = ATLA** (`skipped`, öneri şeridi YOK).

## Japonca Yazı Mantığı dersi — hub evrimi
Mevcut `writing-system` (9 adım). Hiç bilmeyen buraya gelir → **başlangıç merkezi**.
- **Adım 1 kutuları → BUTON** (Hiragana/Katakana/Kanji → çalışma alanına atla).
- **Adım 9 yerleştirme seçici KALIR** (あ/木/森).
- **"Kana nedir? / Kanji nedir?" derse buton olarak girer.**
- **⚠ Yerleştirme fazlalığı (düşünülecek):** yeni başlayan "nereye?"yi üç yerde görebilir (merdiven + adım-1 kutuları + adım-9 seçici). Yazı Mantığı revizyonunda **bilinçli sadeleştir** — "sürekli soruluyor" hissi olmasın.
- Bu sayfanın kendi detaylı revizyonu + dil/ton temizliği **ayrı tur**.

## Home temizliği + Profil > Yardım
- **Home'dan "nasıl çalışır / nedir" kartları TAMAMEN kalkar.** Home = **yapma**; Yardım = **okuma/başvurma**.
- **Profil > Yardım** (yeni): • Japonca Yazı Mantığı (ders; içinde kana/kanji nedir) • Uygulamayı Kullanma Rehberi • Sık Sorulan Sorular.
- Ders iki yerden erişilir: onboarding (yeni başlayan) + Profil > Yardım (tekrar okuma).

## Freemium (GELECEK — iş modeli notu, Zeynep)
- İleri seviye kanjiler için ücretli paket düşüncesi (temel ücretsiz → ileri ücretli). **N5 seviye etiketi** ileride free/paid **yol ayrımını** destekler.
- **Şimdilik onboarding'de "N5" diye sınırlama/etiketleme YOK** — nötr "Kanji'ye devam". N5 branding'i freemium fazında devreye girer.

## Flick ailesine hizalama (tek bütünsel revizyon — parça parça DEĞİL)
Zeynep: tüm butonlar kendi paletimizden + yazı stilleri Flick ile aynı. → **renk paleti + tipografi + S-1 (İ/ı/ğ/ş glif)** tek revizyonda birlikte. (Welcome buton rengi → logo turuncusu bu revizyon içinde.)

## SIRAYA ALINDI (kod yok, ayrı)
- Flick hizalama revizyonu (yukarı).
- Profil kopya: "onboarding'i yeniden başlat" → **"Karşılama ekranını yeniden başlat"**.
- Yazı Mantığı & Kanji nedir sayfalarının kendi revizyonu (dil/ton: "sezersin/görürsün/gösterir/ilk bakışta gösterir" yumuşatılacak) + "Kanji nedir"e net **"→ Kanji'ye devam"** butonu.
- Yeni Yardım içeriği: **Uygulamayı Kullanma Rehberi + SSS** (şu an yok, yazılacak).
- Home + Profil kod dokunuşu (nedir kartları çıkar, Yardım bölümü eklenir).

## Açık micro-kararlar (harita öncesi netleşecek)
- Buton görsel hiyerarşisi/sırası (Evet vs Hayır: hangisi dolu/primary, üst/alt).
- あ-Hayır çıkışının startKey'i (öneri şeridi metni).
- "Evet" kopyası "ustayım" değil "tanıyorum/görmüştüm" tonu (人ları ihtiyaçtan atlatmasın; 木 düşük bar).

## İlişki & sıralama
- **B2 competency seçim ekranını değiştirir**; `ONBOARDING-B2-akis-haritasi.md` bu yön için kısmen geçersiz (başlangıç hedefleri hariç).
- **Pas 2 (nav görseli) ve GATE 3 (cihaz testleri) ile BAĞIMSIZ** — ayrı faz. Sıra Zeynep ile.
- **Uygulama yolu:** ekran-ekran + yönlendirme haritası (yukarıdaki "durum semantiği"ni kilitler) → plan → onay → kod. Dil turu + yeni Yardım içerikleri + Flick hizalama ayrı işler.
