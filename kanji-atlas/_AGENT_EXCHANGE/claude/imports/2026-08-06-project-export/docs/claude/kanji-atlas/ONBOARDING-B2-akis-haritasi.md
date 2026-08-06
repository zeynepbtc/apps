# Onboarding B2 — Yetkinlik Temelli Dürüst Dallanma · Ekran-Ekran Akış Haritası (code-free)

> **Durum:** Akış KİLİTLİ + beş mikro-karar + dört semantik karar (Zeynep). R2-A **KİLİTLİ**; iki belge senkron düzeltmesi uygulandı. Bu belge B2'nin **ekran-ekran haritası** — kod YOK, kesin kullanıcı metni `ONBOARDING-R2A-metin-ve-dogruluk.md`'de. Kaynak: `ONBOARDING-envanter-adim1.md`, `ONBOARDING-akis-secenekleri-adim3.md`.
> **Kural:** Bu harita "ne ekran, hangi banta, hangi karar, nereye" sorularını yanıtlar. Kesin cümleler, tipografi ve state/kod ayrı kapılarda.

---

## 0. Kilitli kararlar (özet)

| Konu | Karar |
|---|---|
| Akış | **B2 — Yetkinlik Temelli Dürüst Dallanma** |
| Yetkinlik | **4 bant** (0–3); tek yönlendirme girdisi |
| "Kendi yolumu seçerim" | Yetkinlik seçeneği **DEĞİL** → kaçış eylemiyle çözülür |
| "İleri seviye" ifadesi | **Kullanılmaz** (ürün temel/N5; fazla vaat yok) |
| Üç Yazı Sistemi ekranı | Band 0 ve 1'e **göster**; Band 2 ve 3'e **gösterme** |
| Üç-sistem eylemleri | Yalnız birincil **"Devam"** + ikincil **"Ana sayfaya geç"**. Band 1'de **ayrı "bu ekranı geç" eylemi YOK** |
| İsim / Motivasyon / Öğrenme stili | Onboarding'den **çıkar** |
| Placement testi | İlk sürümde **yok** |
| Erken kaçış | **"Ana sayfaya geç"** — Karşılama, Yetkinlik, Üç-sistem ekranlarında |
| onboardingStatus | **skipped** (erken çıktı) ≠ **completed** (finali tamamladı) — ayrı semantik |
| **Skipped kullanıcı** | competency yok · initialStartTarget yok · **öneri şeridi gösterilmez (ne kişisel ne genel)** — yalnız Home'un eşit ağırlıklı normal modül kartları |
| Completed kullanıcı | competency (0–3) + initialStartTarget **taşır** |
| Öneri modeli | **initialStartTarget** (ilk giriş) → **recommendedNext** (ilerlemeyle) |
| initialStartTarget→recommendedNext tetiği | **Yalnız gezinme değiştirmez**; ilk **anlamlı öğrenme eylemi** (gerçek cevap/tanıma/yazma) sonrası recommendedNext devreye girer |
| Band 0 hedefi | **Rehberli あ Kana detayı** — doğrudan yazma modu **değil** |
| Band 1 hedefi | **Kana ana görünümü** — ayrı "kaldığın yeri seç" onboarding ekranı **yok** |
| Üç-sistem işareti | Kısa intro ≠ tam ders; `seenWritingSystem` **otomatik kullanılmaz** |
| Final | Her bantta **tek birincil CTA + tek ikincil "Ana sayfaya git"**; alternatif kart yok |

---

## 1. Akış diyagramı (kaçış yolları dahil)

```
                     ┌─────────────┐
                     │  Karşılama  │──▶ Ana sayfaya geç
                     └──────┬──────┘
                            │ Devam
                     ┌──────┴──────┐
                     │  Yetkinlik  │──▶ Ana sayfaya geç  (bant seçmeden → skipped)
                     └──────┬──────┘    (Band 0/1/2/3 seç)
               ┌────────────┼────────────────┐
            Band 0/1      Band 2           Band 3
               │            │                │
      ┌────────┴────────┐   │                │        (Band 2/3 bu ekranı atlar)
      │ Üç Yazı Sistemi │──▶ Ana sayfaya geç │
      │     Devam       │   │                │        (ayrı "bu ekranı geç" YOK)
      └────────┬────────┘   │                │
               └────────────┼────────────────┘
                            │
                     ┌──────┴───────┐
                     │ Dürüst Öneri │   (Final — tüm bantlar → completed)
                     └──────┬───────┘
              [Önerilen yerden başla]      [Ana sayfaya git]
                      │                          │
              bant initialStartTarget     Home (ilk öneri = AYNI initialStartTarget)
```

**Ekran sayısı:** Band 0 = 4 · Band 1 = 4 · Band 2 = 3 · Band 3 = 3.

---

## 2. Öneri modeli — initialStartTarget (ilk giriş) vs recommendedNext (sonra)

**İki katman:**
- **İlk kullanım:** yetkinlik bandı → **initialStartTarget** → final metni + final birincil CTA + onboarding-sonrası ilk Home önerisi. Üçü aynı hedef → çelişki yok.
- **Kullanım başladıktan sonra:** gerçek ilerleme → **recommendedNext**. Home önerisi zamanla buna döner.

**Geçiş tetiği:** initialStartTarget → recommendedNext geçişi **yalnız gezinmeyle olmaz.** Kullanıcı ekranlar arasında dolaşınca öneri değişmez; ancak **ilk anlamlı öğrenme eylemi** — gerçek cevap / tanıma / yazma — gerçekleştikten sonra recommendedNext devreye girebilir. *(Anlamlı eylemin kesin tanımı ve SRS bağı Adım 7.)*

**initialStartTarget tablosu:**

| Bant | Gözlemlenebilir durum | initialStartTarget | Üç-sistem | Final "あ" metni |
|---|---|---|---|---|
| **0 — Sıfır** | Japonca yazıya hiç başlamadı | **Rehberli あ Kana detayı** (yazma modu değil) | Göster | **Evet** (yalnız burada) |
| **1 — Başlangıç** | Birkaç Hiragana/Katakana tanıyor | **Kana ana görünümü** (あ detayı değil; ayrı seç ekranı yok) | Göster | Hayır |
| **2 — Kana hazır** | Hiragana + Katakana okuyabiliyor | **İlk Kanji ailesi / 木** | Gösterme | Hayır |
| **3 — Temel Kanji deneyimi** | Kana + bazı temel Kanji | **Atlas haritası** | Gösterme | Hayır |
| **— (bant seçmeden çıktı = skipped)** | bilinmiyor | **YOK** — sahte kişiselleştirme yok | — | — |

**Band 0 iç akışı:** gör → dinle → tanı → yazmayı dene. Yazma detayın içinde bağlamsal eylem; ayrı mod değil (IA/R6). Onboarding "çizim moduna göndereceğim" taahhüt etmez. **"İlk harfin あ" yalnız Bant 0.**

---

## 2.5 Semantik durum modeli — onboardingStatus (kilit)

Onboarding'den çıkışın **iki farklı anlamı** ayrı tutulur; skipped'a completed muamelesi yapılmaz.

| Durum | Nasıl oluşur | competency | initialStartTarget | Home davranışı |
|---|---|---|---|---|
| **completed** | Bir bant seçip **Final**'i geçti | var (0–3) | var | İlk öneri şeridi = initialStartTarget; sonra recommendedNext |
| **skipped** | Herhangi bir ekranda **"Ana sayfaya geç"** ile erken çıktı | **yok** | **yok** | **Öneri şeridi gösterilmez — ne kişiselleştirilmiş ne genel.** Yalnız Home'un eşit ağırlıklı normal modül kartları |

- **skipped ≠ completed:** semantik olarak farklı; skipped kullanıcı "onboarding'i bitirdi" sayılmaz, ama Home'a erişir.
- Skipped kullanıcı ilk anlamlı öğrenme eylemini yapınca (gerçek cevap/tanıma/yazma) sistem artık gerçek veriye sahiptir → o noktadan sonra öneri şeridi (recommendedNext mantığıyla) açılabilir.

---

## 3. Ekran-ekran harita

### Ekran 1 — Karşılama · tüm bantlar
- **Amaç:** kısa giriş; değeri geciktirmez.
- **İçerik (kavram):** başlık + tek cümle + birincil CTA + ikincil **"Ana sayfaya geç"**. *(Kesin metin R2-A.)*
- **Kullanıcı kararı:** Devam **veya** Ana sayfaya geç (→ skipped).
- **Sonraki hedef:** Devam → Yetkinlik · Ana sayfaya geç → Home (skipped).

### Ekran 2 — Yetkinlik (TEK karar) · tüm bantlar
- **Amaç:** tek yönlendirme girdisi; gözlemlenebilir bilgi durumu (öz-değerlendirme, geri çevrilebilir).
- **İçerik (kavram):** 4 açık beceri ifadesi (Bant 0–3) + ikincil **"Ana sayfaya geç"**. *(Kesin etiketler R2-A.)*
- **Kullanıcı kararı:** 1 bant seç (ilerler) **veya** Ana sayfaya geç (→ skipped: bant yazılmaz).
- **Sonraki hedef:** Bant 0/1 → Üç Yazı Sistemi · Bant 2/3 → Final · Ana sayfaya geç → Home.
- **Not:** "Kendi yolumu seçerim" yok; "ileri seviye" yok; seçim finalde de reddedilebilir.

### Ekran 3 — Üç Yazı Sistemi · yalnız Bant 0 ve 1
- **Amaç:** Kana/Kanji bölümlerinin **neden var olduğunu** anlamlandırmak. **Ders DEĞİL** — birkaç kısa cümle, bağlam.
- **İçerik (kavram):** あ Hiragana · ア Katakana · 火 Kanji — kısa doğru tanımlar + köprü. **Eylemler:** yalnız birincil **"Devam"** + ikincil **"Ana sayfaya geç"**. **Band 1'de ayrı "bu ekranı geç" eylemi YOK.** *(Doğruluk + kesin metin R2-A; köprü vurgusu R3.)*
- **Kullanıcı kararı:** Devam **veya** Ana sayfaya geç.
- **Kaydedilen (kavram):** `onboardingWritingSystemsIntroShown` benzeri **ayrı** işaret — tam ders (`seenWritingSystemLesson`) ile aynı **sayılmaz**. *(Kesin adlar Adım 7.)*
- **Sonraki hedef:** Final · Ana sayfaya geç → Home (skipped).
- **Not:** Bant 2/3 görmez (expertise reversal). Kısa kartı görmek tam dersi tamamlamak değildir.

### Ekran 4 — Dürüst Öneri / Başlangıç (Final) · tüm bantlar → completed
- **Amaç:** ilk gerçek eyleme geçirmek; öneriyi dürüstçe sunmak.
- **İçerik — üç değişmez öğe:** (1) Nereye (initialStartTarget) · (2) Neden (kısa gerekçe) · (3) Reddedilebilir (ikincil "Ana sayfaya git"). "İlk harfin あ" yalnız Bant 0. *(Kesin metin R2-A.)*
- **Kullanıcı kararı:** **[Önerilen yerden başla]** **veya** **[Ana sayfaya git]**. Alternatif kart yok.
- **Kaydedilen (kavram):** onboardingStatus=**completed** + competency + **initialStartTarget** + türetilen profil.
- **Sonraki hedef:** birincil → initialStartTarget · ikincil → Home (ilk öneri = aynı initialStartTarget; sonra recommendedNext).

---

## 4. Erken kaçış yolu ("Ana sayfaya geç") · KİLİTLİ

Yalnız final kaçışı yeterli değil — kullanıcı bant seçmeye zorlanmamalı (kendini sınıflandırmak istemeyen / uygulamayı doğrudan görmek isteyen / seviyesinden emin olmayan / hızlı göz atan kullanıcı).

- **Etiket:** belirsiz "Atla" değil, açık **"Ana sayfaya geç"**.
- **Nerede:** Karşılama · Yetkinlik · Üç Yazı Sistemi (ikincil, küçük eylem).
- **Çıkınca:** onboardingStatus=**skipped** → Home. **Sahte yetkinlik/hedef üretilmez.**
- **Skipped Home:** öneri şeridi **gösterilmez** — ne kişiselleştirilmiş ne genel. Yalnız Home'un eşit ağırlıklı normal modül kartları. **"Sana özel önerimiz" / "Nereden başlamak istersin, seç" gibi satır YOK.** (İlk anlamlı öğrenme eyleminden sonra recommendedNext için gerçek veri oluşur.)

---

## 5. Üç-sistem işareti ≠ tam ders · semantik ayrım KİLİTLİ

İki farklı öğrenme olayı ayrı: **onboarding kısa tanıtımı** (bağlam, ders değil) vs **ayrı tam "Yazı Sistemleri dersi"** (ayrıntılı, kendi adımları, tamamlanabilir). Kısa kartı görmek tam dersi tamamlamak değildir. Ayrı kayıtlar: `onboardingWritingSystemsIntroShown` ≠ `seenWritingSystemLesson`; mevcut `seenWritingSystem` **otomatik kullanılmaz.** Kesin adlar Adım 7.

---

## 6. Kilitlenen mikro + semantik kararlar (hepsi kapandı)

1. Erken kaçış: korunur; adı **"Ana sayfaya geç"**.
2. Band 1: doğrudan **Kana ana görünümü**; ayrı "kaldığın yeri seç" ekranı yok.
3. Üç-sistem işareti: kısa intro ≠ tam ders; ayrı state semantiği.
4. Band 0: rehberli **あ Kana detayı** (yazma modu değil).
5. Öneri modeli: **initialStartTarget** → **recommendedNext**.
6. **Üç-sistem eylemleri:** yalnız "Devam" + "Ana sayfaya geç"; Band 1'de ayrı "bu ekranı geç" YOK.
7. **onboardingStatus:** skipped ≠ completed; skipped → competency/initialStartTarget yok, öneri şeridi (kişisel VEYA genel) gösterilmez.
8. **completed:** competency + initialStartTarget taşır.
9. **Geçiş tetiği:** initialStartTarget yalnız gezinmeyle değişmez; ilk anlamlı öğrenme eylemi sonrası recommendedNext.

## 7. Kapsam DIŞI / kapılar
- **R2-A (KİLİTLİ):** `ONBOARDING-R2A-metin-ve-dogruluk.md` — yetkinlik etiketleri, karşılama, üç-sistem tanımları, final metinleri, mikrokopi.
- **R3 (sıradaki):** üç-sistem + tüm ekranların tipografi/görsel hiyerarşisi (yeni metin değil, gösterim).
- **Adım 7 (kod):** onboardingStatus (skipped/completed) · initialStartTarget kaynağı · anlamlı-eylem tetiği · Home şeridi · `onboardingWritingSystemsIntroShown` vs `seenWritingSystemLesson` · `deriveEntryPath`/`recommendedStart` birleştirme · fixture + staging.
- **Sonraki faz:** `recommendedNext` ilerleme-temelli öneri motoru.
