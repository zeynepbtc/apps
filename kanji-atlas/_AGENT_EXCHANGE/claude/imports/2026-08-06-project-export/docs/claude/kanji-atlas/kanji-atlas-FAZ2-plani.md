# Kanji Atlas — Kilitli Kararlar + Faz 2 Planı (Mimari Güvenlik ve Tutarsızlık Kapatma)

> **Status:** Faz 1 kapandı · omurga kilitlendi (Zeynep+GPT+Claude) · Faz 2 **planı onay bekliyor**. 2026-07-20.
> **Kural:** Bu belge plan + geçit. **Uygulamaya, Zeynep onayı + GPT denetimi olmadan geçilmez.** Faz 2'de bütün tasarım yayılmaz, yazma motoru baştan kurulmaz, tüm N5 üretilmez.

---

## A. KİLİTLİ OMURGA KARARLARI (Faz 1 sonrası)

**1. Grafik modeli — Hibrit "yumuşak Model B" (ONAY).** Bütün düğümler keşfe açık; **kilit/kısıtlama YOK.** Görsel durum öğrenmeyle evrilir: keşfedilmemiş (sakin/düşük vurgu) → görülmüş (temel renk+kısa bilgi) → tanındı (aile bağlantıları belirgin) → kullanıldı (kelime bağlantıları + tamamlandı) → çalışılmalı (sakin tekrar işareti). **Zorunlu ekler:** liste/aile görünümü, arama, ekran okuyucu etiketi, klavye/focus, yalnız-renge-dayanmayan durum göstergesi, aile şeridi→grafik geçişi, grafik düğümü→öğrenme yoluna dönüş.

**2. Yazma yönü — skor kapı değil geri bildirim (ONAY).** İki mod (Öğrenme / isteğe bağlı Kontrol); kullanıcı başarısız sayılmaz; mevcut stroke altyapısı korunur ama ilerlemeyi kilitlemez. Faz 3'te 木 üzerinde kanıtlanır.

**3. Oyun sadeleştirme — şartlı ONAY, kontrollü sıra.** KORU (özgün öğrenme eylemi: tanıma/yazma/bileşen-aile) · BİRLEŞTİR (aynı bilgi+cevap biçimi tekrarı → Quiz'e) · GERİ PLAN (zincire zayıf bağlı çalışan yüzey) · TEMİZLE (gerçekten erişilemez ölü kod — **branch güvencesi + referans araması + smoke test + ayrı commit** zorunlu). Kanji Dedektifi'nde özgün "ipucu→kanjiyi çöz / aile muhakemesi" varsa Quiz'in bir modu olarak korunur.

**4. Aile sistemi — tek kanonik veri (KESİN ONAY).** Tek dosyada kalınır ama **tek kanonik aile verisi**; aynı ilişki üç yerde elle yazılmaz. Şerit + Detail bağları + Atlas grafik kenarları + aile listesi + vitrin akışı + ilerleme **aynı kaynaktan** üretilir. **İlişki türü açıkça etiketli:** ortak-bileşen / anlam / ses / görsel benzerlik — "aile" ile "etimolojik aynı köken" karıştırılmaz.

**5. Köken–yapı–hatırlama ayrımı (KESİN ONAY).** Üç alan açıkça etiketli: **Köken** (doğrulanabilir tarihsel/paleografik) · **Yapı/neden böyle** (bugünkü öğretim açıklaması, tarihsel iddia değil) · **Hatırlama desteği** (öğretici çağrışım, tarihsel iddia değil). Bileşik kanjilerde aynı metin üç kez tekrarlanmaz; doğrulanamayan bilgi "köken"e yazılmaz.

**6. Vitrin aile — 木 (ONAY).** 休=亻+木, 林=木+木, 森=木+木+木, 本=木+temel işareti — aynı bileşenin farklı görevleri gösterilecek; hepsi "ağaç sembolü" diye düzleştirilmez.

---

## B. ANA ÖĞRENME DÖNGÜSÜ (KİLİT)
Kanji: **Keşfet → Yapısını anla → Gerçek kelimede gör → Kademeli yaz → Hatırla → Kullan → Atlas bağlantısını görünür kıl → Gerektiğinde tekrar et.**
Kana: **Sesi duy → Şekli ayırt et → Kademeli yaz → Romajisiz hatırla → Kelimede tanı → Gerektiğinde tekrar et.** (Aynı pedagojik aile.)

---

## C. FAZ 2 — Mimari Güvenlik ve Tutarsızlık Kapatma

**Amaç:** Tasarım/yazma-motoru işine girmeden ÖNCE, veri mimarisini ve mevcut ürün tutarsızlıklarını sağlama almak; 木 vitrininin **yalnız veriden** üretilebildiğini kanıtlamak. Kapsam **yalnız yedi kalem**:

| # | Kalem | Hedef | Geçit |
|--:|---|---|---|
| 1 | **Kanonik aile verisi** | Tek `families{}` şeması (component · members · relations[**tür etiketli**] · learningOrder · examples). 木 ailesini bu şemayla yaz. | 木 için aile şeridi + Detail bağları + grafik kenarları + liste + ilerleme **tek kaynaktan** üretiliyor; üç eski kaynakla (ATLAS_FAMILIES/parent_components/EDGES) çelişki yok |
| 2 | **Ses manifesti** | ID-bazlı manifest (romaji homofon güvenli); ortak `/audio` (repo kökü, aynı origin); `audio:{word,sentence}` alanlarını manifeste bağla; default file-first | 木 ailesi sesleri manifestten çözülüyor; kana 46/46 Flick'ten bağlı; eksik-kayıt listesi kesin |
| 3 | **Kana SRS sayaç/review tutarsızlığı** | Sayaçta görünen her öğe gerçekten çalışılabilir olmalı. Karar: (a) kana'yı geçici sayaçtan çıkar VEYA (b) gerçek kana-review akışına bağla | Sayaç↔review tutarlı; yarım-bağlı yok |
| 4 | **Onboarding tercih/sonuç eşleşmesi** | Sade 3 seçenek (yeniyim / kana biliyorum→kanji / serbest keşif) → 3 sonuç (kana yolu / vitrin-aile kanji yolu / atlas keşif). Kullanılmayan soruları çıkar | Her cevap bir sonuca bağlı; kullanılmayan soru yok; ob-finish doğru yola gönderiyor |
| 5 | **Ölü kod kesin envanteri** | Erişilemez kodun kesin listesi (memory motoru, 7 round-builder, ayrı stroke-game kimliği) + referans araması + branch + smoke test + ayrı commit **planı** | Her "temizlenecek" için sıfır route/kullanıcı-yolu kanıtı; temizlik ayrı commit + smoke test olarak planlı (uygulama onayla) |
| 6 | **木 yalnız-veriden üretim testi** | Mimari geçidi: 木 içeriği/ilişkileri/sesleri/ilerlemesi renderer/SRS/storage/event'e dokunmadan sadece veriden üretilebiliyor mu? | Yeni aile eklemek (test) = sadece veri işi |
| 7 | **Storage + migration güvenliği** | Şema **sürüm numarası** ekle (şu an sürümsüz); migration testi; userHints koruması doğrula | Sürümlü şema + migration testi geçer + eski kayıt bozulmaz |

**Faz 2 kapanış geçidi (GPT):** 木 vitrini için gereken içerik, aile ilişkileri, sesler ve ilerleme durumu **tek kanonik veriden üretilebiliyor**; onboarding **doğru yola gönderiyor**; sayaçta görünen tekrar **gerçekten çalışılabiliyor**; **mevcut kayıtlar bozulmuyor.**

**Faz 2 KAPSAM DIŞI (girmez):** yazma motorunu baştan kurma · tasarımı tüm uygulamaya yayma · tüm N5 içeriği · grafik yumuşak-B görsel uygulaması (Faz 3/5) · oyun birleştirme/temizlik **uygulaması** (envanter+plan Faz 2, uygulama onaylı ayrı commit).

**Sonra:** Faz 3 — final kalitede **木 Vitrin Ailesi** (tasarım+ses+a11y+yazma iki-mod+öğrenme döngüsü, tek ailede kanıt) → Faz 4 insan playtest.

---

## D. Şimdi ne bekleniyor
Bu plan **onay bekliyor.** Zeynep onayı + GPT denetimi gelince Faz 2 uygulamasına geçilir. O zamana dek ürün koduna dokunulmaz.
