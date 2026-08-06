# Onboarding — Ekran-ekran review notları (Zeynep, biriktiriliyor)

> **Durum:** Zeynep telefonda (staging `kanji-atlas-staging-b2`) onboarding'i **tek tek** gözden geçiriyor; çıkan **etkileşim + düzen + kopya + renk** notları burada birikiyor. **Kod yok.** Review pası bitince ana tasarım belgesine (`ONBOARDING-SADELESTIRME-tanima-merdiveni.md`) konsolide edilecek.
> **Bağlam:** yeni onboarding yönü = tanıma merdiveni. Renk kilidi = GEZINTI "renk revizyonu ertelendi". "Karşılama" = welcome akışının Zeynep'in tercih ettiği adı.

## N1 — Onboarding 1 (Karşılama ekranı)
- **Yerleşim/düzen:** iyi, dokunma.
- **Buton rengi (Başlayalım):** logo **göbeğindeki turuncuya** çekilecek (amber, ~`#D3813A` — kod token'ı `IC.amber`/`--gold` civarı; uygulama anında teyit). Şu an aksan kırmızısı (`--accent #A4392C`).
- **⚠ Renk kilidiyle kesişim:** Bu aslında bir **aksan rengi** kararı — yalnız welcome butonunu turuncu yapmak, diğer ana butonlar kırmızı kalırken tek ekranı ayrıştırır. "Parça parça renk değiştirmeme" kilidiyle çakışır. **Karar (uygulama zamanı):** tekil welcome fix mi, yoksa büyük renk revizyonunda ana buton rengi ailece mi? → **büyük renk revizyonuna besleniyor.**

## N2 — Profil: "yeniden başlat" kopyası
- Profil altındaki **"onboarding'i yeniden başlat"** → **"Karşılama ekranını yeniden başlat"**. (Kullanıcıya "onboarding" jargonu gösterilmez.) Mevcut tam string uygulama anında kodda teyit.

## N3 — Onboarding 2 (あ tanıma ekranı) — ETKİLEŞİM + DÜZEN (önemli)
- **Mevcut "Şu an hangi seviyedesin?" 4-kart competency ekranı (foto IMG_7195) GİDİYOR** → yerine tek hiragana harf **あ** + başlık **"Bunu tanıyor musun?"**.
- **Etkileşim = Evet / Hayır (iki buton):**
  - **Hayır** — alt açıklama: *"yazı sistemleri mantığını tanıyarak başlamak için tıklayın"* → **Yazı Mantığı tanıtım sayfasına** götürür. (Yazı Mantığı sayfasının kendi detaylı revizyonu SONRA; önce onboarding.)
  - **Evet** — alt açıklama gerekmez → hemen **bir sonraki onboarding sayfasına** (Kanji/木 "Bunu tanıyor musun") geçer.
  - Buton görsel hiyerarşisi (hangisi dolu/primary, buton sırası) → **açık micro-karar**.
- **"Ana sayfaya git" HER onboarding sayfasında, altta.** Tutarlılık: welcome "geç" / final "git" — **tek dile sabitle**; Zeynep tercih: **"git"**.
- **DÜZEN (KRİTİK):** foto IMG_7195 gibi **yayılmış OLMAYACAK.** Foto IMG_7196 ("あ ile başlayalım") gibi **ortada, düzenli, alt alta gruplu** (glif → başlık → kısa alt metin → butonlar → "Ana sayfaya git", dikey merkezde toplu). Uygulama ipucu: mevcut `.ob-final` düzenini yeniden kullan.
- **AÇIK KARAR KAPANDI:** "tanımıyorum butonu adı" → **"Hayır"**, hedef Yazı Mantığı. "Kana ile başla" kavramı page 2'den kalktı; Kana erişimi Yazı Mantığı dersinin içinde.

## N4 — Onboarding 3 (Kanji / 木 tanıma ekranı) — ETKİLEŞİM
- **2. sayfada "Evet" seçen doğrudan buraya gelir.** İçerik: bir kanji (**木**) + alt başlık **"Bunu tanıyor musun?"**. (Mevcut "Kanji yapılarına geçmeye hazırsın" — foto IMG_7197 — tanıma modeline yeniden kurgulanır.)
- **Etkileşim = Evet / Hayır:**
  - **Hayır** → *(öneri/tentative)* **"Kanji nedir?"** sayfasına (foto IMG_7198; mevcut `kanji-about` — o sayfa da **biraz elden geçirilecek**). O sayfadan bir **butonla → "5 kanji"** (temel/başlangıç kanji seti).
    - **AÇIK:** "5 kanji" hangi 5? (Muhtemelen piktogram seti 山/木/人/日/月 — Kanji nedir & Yazı Mantığı örnekleriyle uyumlu — ya da 木 ailesi 木/本/休/林/森. Netleşecek.)
  - **Evet (tanıyorum)** → **Kanji Atlas ağacı / aileleri pekiştir** sayfası (atlas / `map`).
- **"Ana sayfaya git" sabit** (bu sayfada da).
- **Simetri:** page2 Hayır→Yazı Mantığı intro · page3 Hayır→Kanji nedir intro · page2 Evet→sonraki soru · page3 Evet→Atlas (son basamak).
- **Düzen:** yine foto IMG_7196 gibi ortada-toplu.
- **Not:** bu değişiklikle page-3 "tanımıyorum" hedefi eski "木 ailesiyle başla / kanji-ki detay"dan → "Kanji nedir → 5 kanji"ye kaydı. (Eski `kanji-ki` başlangıç hedefi artık bu bandda kullanılmayabilir; başlangıç-hedefi eşlemesi konsolidasyonda güncellenecek.)

<!-- Yeni notlar N5 … buraya. Onboarding ekranları (welcome/あ/木) tamamlandı; sıradaki: Zeynep review pası bitti mi? Yazı Mantığı & Kanji nedir sayfaları ayrı revizyon. -->
