# Kanji Atlas — Faz 1 Ürün/Öğrenme Denetim Raporu (KARAR BELGESİ · KİLİTLİ)

> **Durum: Faz 1 KAPALI ve KİLİTLİ** (Zeynep hükmü, 2026-07-20). Yeni özellik tartışmasıyla yeniden açılmaz. **Yeni bulgu çıkarsa:** Faz 1 değiştirilmez → `kanji-atlas-karar-gunlugu.md`'ye eklenir ve ilgili sonraki fazın kapsamına alınır.
>
> **Ne bu belge?** Faz 1 çıktısı: inceleme, teşhis, karar taslağı. **Ürün kodu/DATA/tasarım DEĞİŞTİRİLMEDİ.** 7 paralel salt-okur denetim (kanıt: fonksiyon@satır) sentezi. Altı omurga kararı kilitli → `kanji-atlas-FAZ2-plani.md`.
>
> Kaynak: `japonca-yazi-atlasi.html` (5299 satır). DATA: 98 karakter (91 kanji + 7 radikal), 78 kelime, 9 confusable.

---

## ÇIKTI 1 — Tek cümlelik ürün vaadi
> **Japon yazı sistemini — kana'dan başlayıp kanji ailelerine, bileşenlere, anlam/ses ilişkilerine, gerçek kelimelere ve yazmaya — anlamlandıran uygulama.**

Denetim doğruladı: zincir `Detail()`'de gerçekten bağlı; **grafik, keşif alanı ve öğrenme haritası olarak çalışıyor** (başta keşif → öğrenirken yön bulma → sonrasında ilerlemenin görünür haritası), öğrenme ilerledikçe bağlantıları ve durumları görünür kılma tohumu var; kana kendi eşit-ağırlıklı yolu (işi = okuma/tanıma + sistemdeki yer, Flick'in yazma-refleksinden farklı).

---

## ANA ÖĞRENME DÖNGÜSÜ (KİLİT)

**Kanji döngüsü:** Keşfet → Yapısını anla → Gerçek kelimede gör → Kademeli yaz → Hatırla → Kullan → Atlas bağlantısını görünür kıl → Gerektiğinde tekrar et.

**Kana döngüsü (aynı pedagojik aile):** Sesi duy → Şekli ayırt et → Kademeli yaz → Romajisiz hatırla → Kelimede tanı → Gerektiğinde tekrar et.

Mevcut kodun her basamağa karşılığı (kanıtlı) — eksik halkalar Faz 2/3'ün hedefi:

| Kanji basamağı | Bugün nerede | Durum |
|---|---|---|
| Keşfet | `KanjiN5` grid, `MapView`, `kanji-about` | VAR |
| Yapısını anla | `Detail` (köken/yapı/bileşen), `Transform` | VAR |
| Gerçek kelimede gör | `Detail` n5_words → `Words`/`WordDetail` | VAR |
| Kademeli yaz | `Drill`/`Practice` | VAR ama **kapı** (Değiştir) |
| **Hatırla** | — (`kvg-hidden` var, kullanılmıyor) | **YOK** |
| Kullan | örnek cümle, Quiz kelime türleri | KISMİ |
| Atlas bağlantısını görünür kıl | `MapView` (renk) + aile şeridi | KISMİ + **köprü YOK** |
| Gerektiğinde tekrar et | `Review`/SRS (kanji) | VAR |

| Kana basamağı | Bugün nerede | Durum |
|---|---|---|
| Sesi duy | `KanaDetail` ses, `audioBtn` | VAR |
| Şekli ayırt et | `KanaDetail`, `confuse` oyunu | VAR |
| Kademeli yaz | `Mochi` | VAR ama **kapı** (Değiştir) |
| Romajisiz hatırla | — | **YOK** |
| Kelimede tanı | örnek kelime, Words | VAR |
| Gerektiğinde tekrar et | — (kana SRS yüzeysiz) | **YOK** (Faz 2) |

---

## ÇIKTI 2 — Flick ↔ Atlas sınırı
Flick = hız/refleks/flick-klavye/oyun (kana işi: **yazma refleksi/klavye girdisi**). Atlas = anlama/keşif/yapı/aile/editoryal sakinlik (kana işi: **okuma/tanıma + sistemdeki yer**). Bulunan çakışmalar: `kana-match` oyunu (Flick kutbu → geri plan); kana çizimi vs Flick yazımı (kavramsal yakın, farklı; sınır üründe net). Gerisi Atlas-native.

---

## ÇIKTI 3 — Tüm yüzeyin sınıflandırması (38 ürün yüzeyi ve altyapı bileşeni)

**Sınıf:** KORU · DEĞİŞTİR · BİRLEŞTİR · GERİ PLAN · TEMİZLE. **V1 görünürlük:** Ana yol · Bağlamsal araç · Keşif alanı · Geri plan · Teknik borç. *(Tablo 38 kalem: ekranlar + SRS/storage/audio gibi altyapı bileşenleri + oyun envanteri.)*

| # | Yüzey (kanıt) | Sınıf | Öğrenme zincirine katkı | V1 görünürlük |
|--:|---|---|---|---|
| 1 | onboarding (1685) | DEĞİŞTİR | Kişiselleştir→doğru yola sok (şu an kopuk) | Ana yol |
| 2 | Home (2172) | KORU | Giriş ağzı + devam/tekrar | Ana yol |
| 3 | Kana hub (2339) | KORU | Kana: ses/şekil/rota girişi | Ana yol |
| 4 | KanaDetail (3426) | KORU+küçük DEĞİŞTİR | Tanıma→örnek→yazma (mastery göstergesi eksik) | Ana yol |
| 5 | Mochi kana yazımı (3336) | DEĞİŞTİR | Kademeli yaz (kana) — şu an kapı | Ana yol |
| 6 | KanjiN5 grid (3564) | KORU | Keşfet → Detail | Ana yol |
| 7 | Detail kanji (2602) | KORU+sıra DEĞİŞTİR | **Zincir merkez düğümü** | Ana yol |
| 8 | Aile Şeridi (2566/2581) | DEĞİŞTİR | Aile halkası — tek kaynak+köprü+kapsam(19/91) | Ana yol |
| 9 | Words (3609) | KORU | Gerçek kelimede gör | Ana yol |
| 10 | WordDetail (3652) | KORU | Kelime→kanji→aile | Bağlamsal araç |
| 11 | Transform kök dönüşümü (2709) | KORU | Yapıyı anla (bileşen dönüşümü) — benzersiz | Keşif alanı |
| 12 | Katakana Şifreleri (4584) | KORU+terfi | Katakana'yı kuralla anla — benzersiz | Keşif alanı |
| 13 | MapView Atlas grafiği (2461) | DEĞİŞTİR | Keşif + yön bulma + ilerleme haritası (3 işlev) | Keşif alanı |
| 14 | AtlasNode (2514) | KORU | Boş-detay zarif düşüş | Bağlamsal araç |
| 15 | Quiz (2867) | KORU+BİRLEŞTİR | Tanı/pekiştir (kanji odaklı, SRS) | Bağlamsal araç |
| 16 | Drill kanji çizim (2849) | DEĞİŞTİR | Kademeli yaz (kanji) — kapı kaldır | Bağlamsal araç |
| 17 | Practice çizim seçici (2796) | KORU | Yazma pratiği girişi | Bağlamsal araç |
| 18 | Review (3082) | DEĞİŞTİR | Tekrar halkası — kana tutarsızlığı | Bağlamsal araç |
| 19 | Path öğrenme yolu (3108) | KORU | Sıralı rota görünürlüğü | Bağlamsal araç |
| 20 | Progress (3694) | DEĞİŞTİR (sadeleştir) | Geri besleme/motivasyon — tekrar riski | Keşif alanı |
| 21 | Profile (3138) | KORU | Ayar/mahremiyet | Bağlamsal araç |
| 22 | ProfileEdit (1849) | KORU | Ayar | Bağlamsal araç |
| 23 | ResetConfirm (1866) | KORU | Granüler reset | Bağlamsal araç |
| 24 | WritingSystem 9-adım (2103) | KORU+tekrar sadeleştir | Kavramsal zemin | Keşif alanı |
| 25 | KanaAbout (1893) | KORU+tekrar sadeleştir | Kavramsal tanım | Keşif alanı |
| 26 | KanjiAbout (1958) | KORU+tekrar sadeleştir | Kavramsal tanım (vizyona en hizalı) | Keşif alanı |
| 27 | Learn hub (2317) | GERİ PLAN | Home ile çakışan 2. hub, erişimi belirsiz | Geri plan |
| 28 | GamesHub/GameScreen (4007/4371) | DEĞİŞTİR (sadeleştir) | Pratik dağıtım | Bağlamsal araç |
| 29 | SRS motoru (1346-1387) | KORU+DEĞİŞTİR | Tekrar — kana yüzeyi + Home/Review birleştir | Altyapı |
| 30 | Save/load+migration (1297) | DEĞİŞTİR | Veri güvenliği — şema sürümsüz | Teknik borç |
| 31 | Audio speak/audioBtn (1417/1444) | KORU+DEĞİŞTİR | Ses — default file-first değil | Altyapı |
| 32 | confuse oyunu (4181) | KORU | Şekli ayırt et (benzer kana) | Bağlamsal araç |
| 33 | kana-match oyunu (4281) | GERİ PLAN | Kana hız — **Flick çakışması** | Geri plan |
| 34 | Kanji Dedektifi comp×3+family (4204) | BİRLEŞTİR→Quiz | Bileşen/aile muhakemesi (Quiz ile tekrar) | Bağlamsal→birleştir |
| 35 | word-meaning oyunu (3687) | KORU | Kelime testi | Bağlamsal araç |
| 36 | Memory motoru (4343) | TEMİZLE | Erişilemez — çalışmayan kod | Teknik borç |
| 37 | Ölü round-builder'lar (4177-4258) | TEMİZLE | word-reading/cloze/kana-romaji/find/quick/kanji-meaning/find | Teknik borç |
| 38 | Sert Stroke Game (4475) | GERİ PLAN | Puanlı meydan okuma — zincir dışı | Geri plan |

---

## ÇIKTI 4 — Vitrin aile: 木 (木・本・休・林・森)
On ölçütte net kazanan (N5, günlük kelime, ortak bileşen açıklığı, piktogram köken, ses büyük ölçüde hazır, düşük yazma zorluğu, 木/本 ayrım örneği, güçlü kelime üretimi, aile şeridi zaten tetikleniyor, tek oturumda biter).

**Pedagojik uyarı (kilitli):** üyeler tek tip ilişkiyle sunulmayacak — **休 = 亻+木 (yapısal), 林 = 木+木 (tekrar), 森 = 木+木+木 (tekrar), 本 = 木+kök/temel işareti (işaret).** Vitrinin başarısı, hepsini "ağaç sembolleri" diye gruplamak değil; **aynı bileşenin farklı karakterlerde farklı görev üstlenmesini** göstermek.

---

## ÇIKTI 5 — Çizim modülü: pedagojik + teknik değerlendirme
`validateStroke` (4750) = iz-takip + 6-boyut skor + geçti/kaldı **kapısı**. Kana (Mochi "öğretici") yumuşak ama kapı; kanji (Drill 2849 + Stroke Game 4475) **sert/cezalandırıcı** — Drill metni "mükemmellik gerekmez" (2855) derken kod kilit uyguluyor (4973). **Hatırla basamağı yok** (`kvg-hidden` var, kullanılmıyor). Tanı/Kullan kopuk.

**Kilitli karar (iki mod):**
- **Öğrenme modu:** Gör→İzle→Hatırla→Yaz→Tanı→Kullan; kullanıcı **başarısız sayılmaz**; sistem vuruş sırası/başlangıç yönü/yaklaşık yerleşim/eksik-fazla vuruş geri bildirimi verir.
- **İsteğe bağlı kontrol modu:** daha az ipucu; yine "geçemedin" değil, "yeniden dene / yaklaştın / şu bölüme dikkat" dili.
- **Mevcut skor:** silinmez → iç metrik/geri bildirim desteği; ilerlemeyi kilitlemez, kırmızı başarısızlık ekranına dönüşmez, sahte % sunmaz, kullanıcının yazısını küçümsemez. **Vitrin ailede kanıtlanacak.**

---

## ÇIKTI 6 — Playtest hipotezleri + ölçüm
Yöntem: moderatörlü ilk-kullanım (sesli düşün) + 1 hafta sonra hatırlama + kısa çıkış görüşmesi; vitrin 木 üzerinde; metrikler **yerel/opt-in**.

| # | Hipotez | Ölçüm | Eşik (taslak) |
|---|---|---|---|
| H1 | İlk yolu yardımsız bulur | İlk anlamlı eyleme süre + yardım sayısı | <60sn, 0 yardım |
| H2 | Aile mantığını kendi cümlesiyle açıklar | "林 neden iki 木?" sözlü | ≥6/8 |
| H3 | 1 hafta sonra anlam + ≥1 kelime | Gecikmeli hatırlama testi | ≥60% anlam, ≥1 kelime |
| H4 | Grafiğin bağlantıları gösteren bir **öğrenme haritası** olduğunu anlar | "Bu harita ne işe yarıyor, ne zaman kullanırsın?" açık uçlu | ≥6/8 kullanıcı **keşif / bağlantı / yön bulma / ilerleme** işlevlerinden **en az ikisini** ifade eder |
| H5 | Yazma gerçek hatırlama sağlar | İz kapalı bellekten çizim | ≥50% |
| H6 | Flick↔Atlas farkını anlar | "İki uygulama ne için?" | ≥6/8 |
| H0 | **Çekirdek** | "Atlas mı inceledin, öğrendin mi?" | çoğunluk "öğrendim" |

---

## Faz 1 kapanış geçidi — TAM
✅ Ürün tek cümlede net · ✅ ana öğrenme döngüsü açıkça yazılı (kanji+kana) · ✅ **38 ürün yüzeyi ve altyapı bileşeninin tamamı sınıflandırıldı** (Sınıf + zincir katkısı + V1 görünürlük) · ✅ Flick sınırı net · ✅ vitrin aile 木 seçili + pedagojik uyarı · ✅ çizim modülü karar seçenekleri (iki mod) görünür · ✅ playtest hipotezleri ölçülebilir · ✅ **uygulama koduna dokunulmadı.**

**Altı omurga kararı kilitlendi → `kanji-atlas-FAZ2-plani.md`. Faz 1 KAPALI/KİLİTLİ.**
