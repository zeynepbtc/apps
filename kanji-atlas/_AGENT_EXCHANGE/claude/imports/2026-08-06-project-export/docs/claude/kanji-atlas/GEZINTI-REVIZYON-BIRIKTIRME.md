# Kanji Atlas — Gezinti Revizyon Biriktirme (staging testi sırasında)

> **Amaç:** Zeynep staging'de (`kanji-atlas-staging.zeynop.workers.dev`) gezerken çıkan değişiklik isteklerini biriktirmek. **Hemen uygulanmaz** — biriktirilir, uygun fazda toplu ve tek işte devreye alınır. Kapsam genişlemesine karşı disiplinli kalınır.
> **Kural:** Bu maddeler **P0-5 (storage) işinden bağımsız UI/içerik revizyonları**. P0-5A/B ile karıştırılmaz.
> **Tekilleştirme:** Zeynep aynı maddeyi tekrar söyleyebilir; çakışırsa birleştirilir.

## Durum: TOPLANIYOR (Zeynep gezmeye devam ediyor)

## ⭐ KÜME — ONBOARDING YENİDEN TASARIM (ayrı faz, P0-5 sonrası)
Zeynep: "onboarding'i en baştan tekrar düzenlememiz şart; bir sürü çıkacak kısım ve sadeleşecek yer var." → Aşağıdaki **R1, R3, R5** tek tek yama DEĞİL; bir **"Onboarding Yeniden Tasarım" fazında** bütünsel ele alınacak (akış + metin + tipografi + tutarlılık + sadeleştirme). Faz açılınca önce tam akış envanteri çıkarılıp code-free plan sunulur.
> **İlerleme:** Envanter (`ONBOARDING-envanter-adim1.md`) + code-free akış seçenekleri (`ONBOARDING-akis-secenekleri-adim3.md`) çıkarıldı; akış **B2 — Yetkinlik Temelli Dürüst Dallanma** olarak kilitlendi (`ONBOARDING-B2-akis-haritasi.md`). Onboarding Adım 7 uygulandı, GATE 3 staging aşamasında.

## Maddeler

### R1 — [Onboarding] Karşılama 4. sayfayı kaldır
Katakana "şifreleri" ile karşılama; hiç bilmeyene kötü giriş. Karşılama akışından çıkar; öğrenme aracındaki Katakana Şifreleri modülü kalır. **→ Onboarding Yeniden Tasarım fazı.** (B2'de kaldırıldı.)

### R2 — Bilgi kartları & tanımların içerik denetimi (ÖNEMLİ)
Karşılama 5. sayfa (yazı sistemleri) güzel, kalır; ana tanım altına "yazı sistemlerini oluşturan sembollere **hece** denir" (doğruluk: kana=mora; ifade yanıltmadan). **TÜM** bilgi kartları/açıklama cümleleri doğru+yeterli bilgiyle elden geçirilecek. Japonca dilbilgisi gerçekleri araştırmayla teyit. **→ İçerik doğruluk fazı (R2-A onboarding metni · R2-B uygulama geneli).**

### R3 — [Onboarding] Sayfa 5 mesaj tipografi/hiyerarşisi
"Önce temel seslerle başlayacağız" çok silik/italik/minik → okunmuyor. Uygun görsel ağırlık; pedagojik tasarım. Referans: zeynepkaya.app vurgu şekli + Flick "aynı karakter, farklı işlev". **→ Onboarding Yeniden Tasarım fazı.**

### R4 — Yazma araçlarının Kana/Kanji bağlamına taşınması + erişim noktalarının korunması (IA / ERİŞİM — daraltıldı)
Kapsam **IA ve erişim** ile sınırlı (öğrenme akışı/hiyerarşi DEĞİL → o R7). Yazma araçları (mochi/drill) alt navdan çıkıp Kana/Kanji bağlamında kalır; erişim noktaları korunur (6 erişim noktası). **R4 = IA/erişim · R7 = gerçek öğrenme akışı ve ekran hiyerarşisi.** İkisi aynı fazda ele alınabilir ama **kabul ölçütleri ayrı tutulur.** **Pas 1'de alt-nav kısmı uygulandı** (Yazı navdan çıktı; mochi→Kana, drill→Kanji vurgu; Practice/drill/mochi kodu korundu). **→ bkz. R6 / R7 + `BACKLOG-IA-icerik-pratik-kararlari.md` §1.**

### R5 — [Onboarding] "Başla" hedefi ile metin tutarsızlığı (BUG)
- **Belirti (Zeynep):** Karşılamada "karıştırarak keşfetmeyi severim" seçiminden sonra "**hazır mısın? ilk harfin hiragana あ**" diyor; ama **"Başla"ya basınca kanji ağacına** bağlanıyor. Metin ile gidilen yer uyuşmuyor.
- **Teknik kök (muhtemel):** Son karşılama metni sabit ("hiragana あ") iken navigasyon `recommendedStart()` sonucuna gidiyor; "karıştır/keşfet" seçimi hedefi değiştiriyor → metinle çelişiyor.
- **→ Onboarding Yeniden Tasarım fazı.** **Tasarımda çözüldü:** B2'nin tek karar kaynağı (final metni + final CTA + Home önerisi aynı `startTarget`) bu çelişkiyi kaynağında kapatıyor; "İlk harfin あ" yalnız Bant 0'da. Uygulama Adım 7'de yapıldı, staging'de doğrulandı.

### R6 — IA / Navigasyon yeniden yapı + Yazma Entegrasyonu (YÖN KİLİTLİ · Zeynep)
- **Yeni yapı:** Alt menü = **Kana · Kanji · Oyunlar · İlerleme**. Üst bar: **solda bağlama göre geri, ortada sticky ve Ana Sayfa'ya giden logo, sağda profil/ayarlar erişimi.** "Yazı" ayrı ana bölüm değil.
- **İlke (kilitli):** *Ana navigasyon bilgi alanlarına göre; çalışma biçimleri ilgili alanların içinde.* Yazma = Kana/Kanji içinde bağlamsal çalışma biçimi; kaldırılmaz, doğru bağlama taşınır (6 erişim noktası).
- **Faz:** Onboarding sonrası **ayrı "IA / Yazma Entegrasyonu" fazı**; R4 (IA/erişim) burada kapanır. Öğrenme akışı hiyerarşisi **R7'de** ayrı ele alınır.
- **→ Tam detay + gerekçe:** `BACKLOG-IA-icerik-pratik-kararlari.md` §1.
- **DEVREYE ALMA:** aşağıdaki **PAS 1 / PAS 2** bölümü. Pas 1 (alt-nav IA) UYGULANDI.

### R7 — Kana/Kanji Detay Sayfaları: Learning Flow Parity (öğrenme akışı eşitleme) ⭐ EN KRİTİK EKSİK
R4'ten ayrıldı ve **bağımsız, görünür** madde yapıldı. R7 sadece "buton yukarı taşınsın" değildir; asıl mesele **iki detay sayfasının aynı öğrenme davranışını desteklemesidir.** Bu, uygulamanın kullanıcıya "iyi görünmesi"ni değil, **"iyi çalıştığını hissettirmesini"** sağlayan iş.

- **Sorun:** Kana ve Kanji detay sayfaları aynı uygulamanın iki öğrenme ekranı gibi davranmıyor.
  - Kana'da kullanıcı önce vuruş sırasını görüyor; çizim/yazma çağrısı sayfanın oldukça altında kalıyor.
  - Kanji'de "Çiz" ve "Mini test" karakter kartının hemen altında sunuluyor.
  - Aynı temel öğrenme davranışı **iki farklı hiyerarşi ve farklı CTA diliyle** sunuluyor.
- **Kilit öğrenme ilkesi:** Kullanıcı vuruş sırasını izledikten **hemen sonra** denemeye geçebilmelidir. Doğal akış:
  1. Karakteri gör → 2. Vuruş sırasını izle → 3. **Hemen çiz/yaz** → 4. Kısa kontrol veya mini test → 5. Örnek kelime ve ek bilgileri incele → 6. Öğrenme durumunu işaretle.
  Kullanıcı animasyonu izledikten sonra sayfanın altına inip yazma aracını **aramak zorunda kalmayacak.**
- **Hedef:** Kana ve Kanji detay sayfaları — aynı davranış sırası, aynı CTA mantığı, aynı görsel hiyerarşi, benzer düğme yerleşimi. **Birebir aynı görünmek zorunda değil**; ama kullanıcı her iki bölümde ne yapacağını yeniden öğrenmek zorunda kalmamalı.
- **Terminoloji (şu an tutarsız):** Kana "Yazmayı dene" ↔ Kanji "Çiz" · Kana "Vuruş sırası" ↔ Kanji "Vuruş sırasını oynat" · Kanji "Mini test" ↔ Kana'da denk yapı görünür değil. Bu terimler **ayrı dil/terminoloji turunda birlikte** kararlaştırılacak; **tasarım kararı verilmeden yalnız metin yaması yapılmayacak.**
- **Faz:** Ayrı **"Learning Flow Review"** fazı. Bu iş: Pas 1 DEĞİL · Pas 2 üst/alt navigasyon işi DEĞİL · yalnızca Kana/Kanji metin turu da DEĞİL. **Ekran hiyerarşisi + öğrenme psikolojisi + yazma araçlarının konumunu birlikte ele alan ayrı UX işi.**
- **Kabul ölçütleri:**
  - Vuruş animasyonundan çizim/yazma aracına geçiş **doğrudan ve görünür**.
  - Kana ve Kanji sayfalarının temel aksiyon sırası **paralel**.
  - Kullanıcı yazma aracını aramak için **aşağı kaydırmak zorunda değil**.
  - Ana CTA'lar birbiriyle **aynı dil ailesinde**.
  - Bilgi kartları eylemin önüne geçmiyor.
  - Mobilde **ilk ekran veya ilk kısa kaydırma** içinde "izle → dene" bağlantısı anlaşılır.

## Bağlı belge — geniş backlog (IA dışı yön kararları)
`BACKLOG-IA-icerik-pratik-kararlari.md`: terminoloji/dil (radikal↔bileşen, aile sınırı) · mnemonic 3 kural (P2) · kanji detay aşamalı yükleme · esnek pratik (P1) · P1/P1-P2/P2/Alınmayacak öncelik listeleri · önerilen onboarding-sonrası roadmap. **Hepsi KAYITLI, sırası gelince konuşulacak — kod yok.**

---

## ★ R6 DEVREYE ALMA — PAS 1 / PAS 2 (Onboarding sonrası, staging adayında)
Zeynep onayıyla iki kapanabilir pasa bölündü. Amaç: riski izole etmek. **Pas 1 = bilgi mimarisi (görsel değil). Pas 2 = üst bar + seçici görsel tasarımı.** (Öğrenme akışı hiyerarşisi ikisinde de değil → R7.)

### PAS 1 — UYGULANDI ✔ (branch `onboarding-b2-gate3`, commit `a123e67`, origin'e push edildi)
Salt IA + metin; görsel/animasyon dokunulmadı.
- **Onboarding metin (I18N.tr, semantic key değişmedi):** welcome lead → "Japonca yazı sistemlerini keşfetmeye başla" (noktasız); competency title → "Şu an hangi seviyedesin?".
- **Competency seçenekleri:** band0 "Yeni başlıyorum" · band1 "Kana'yı biraz tanıyorum, pekiştirmek istiyorum" · band2 "Kana'yı biliyorum, kanjiye geçmek istiyorum" · band3 "Biraz kanji biliyorum, devam etmek istiyorum".
- **Alt-nav içeriği:** `['Kana','Kanji','Oyunlar','İlerleme']` → `['kana','kanji5','games','progress']`. **Yazı çıktı, İlerleme eklendi** (mevcut `progress` ekranı). IC ikon dizisi yeniden sıralandı + İlerleme için sade çubuk ikon. Tutarlılık: `LB/SCREENS/IC` · `navSelectorState.roots` · `noBack` · `NAV_TAB_GROUP` · **`ROOT_SCREENS`** hepsinde `practice→progress`.
- **Yazma araçları kendi bölümünde:** `mochi` (kana yazımı) → Kana vurgusu; `drill` (kanji çizimi) → Kanji vurgusu.
- **Practice korundu:** `Practice()`/`drill`/`mochi` kodu SİLİNMEDİ; sadece navdan çıktı, artık geri-butonlu alt ekran. `ROOT_SCREENS`'ten çıktığı için `data-go="practice"` artık push eder (reset değil).
- **Home "Bugün ne öğrenmek istiyorsun?" bölümü:** Yazı kartı **kaldırıldı** (Zeynep kararı) → 3 kart: Kana / Kanji / Oyunlar.
- **Kullanılmayan `ICONS` haritası:** dokunulmadı (ölü kod, zararsız).
- **Doğrulama:** `node --check` en büyük script → SYNTAX_OK. Fonksiyonel doğrulama redeploy sonrası tarayıcı regresyonunda.
- **Artefakt:** `staging-pkg.zip` — 474 dosya (1 index.html `403f3a73` + 473 mp3), 5 dizin, junk yok. ZIP SHA-256 `955134c482dd556a4a98de044f8f9c139e7d8fb51d441b4b23469afe9abf4bde`. **Zeynep aynı Worker'a (kanji-atlas-staging-b2) yeni sürüm yükleyecek → kısa regresyon → temizse Pas 2.**
- **NOT:** GATE 3'ün önceki tarayıcı-geçişi Pas-1-öncesi bayta aitti; **Pas 1 kendi kısa regresyonunu gerektirir** (4 bant hâlâ doğru mu + yeni alt-nav İlerleme/Oyunlar + Home 3 kart + Yazı navda yok + practice geri-butonlu alt ekran).

### PAS 2 — KİLİTLİ KAPSAM (henüz uygulanmadı, ayrı çalışma)
Görsel/hareket dili. **Renk sistemi ve hareket dili henüz kilitlenmedi.**
- **Üst bar (D3 = seçenek a, KİLİTLİ):** logo **her zaman ortada ve sticky** (sayfa kaydırılsa da görünür), dokun → Ana Sayfa. Ağır toolbar/gölge/büyük başlık YOK. **Her ana ekranın (Kana/Kanji/Oyunlar/İlerleme) kendi içinde hafif bir sayfa başlığı** olacak (üst bardaki başlık kalkıyor). İlke: *nav bar = uygulama kimliği; sayfa başlığı = kullanıcının yeri* — ikisi karışmaz. Sol: yalnız alt sayfalarda bağlama-göre geri. Sağ: profil/ayarlar erişimi.
- **Üst bar tasarım notu (Zeynep):** Apple referans AMA birebir kopya değil — dilimiz daha sıcak. Ortadaki logo uygulamanın **ana çapası**: başlıklardan daha baskın ama **gösterişsiz**. Bu denge yakalanacak.
- **★ Üst navigasyonun KÜTLESİZLİĞİ (KİLİTLİ · şimdiye kadarki en net üst-bar tarifi):** Amaç ekranın üstüne ikinci bir panel/toolbar koymak **DEĞİL**; yönlendirme elemanları uygulama içeriğinin üzerinde **doğal biçimde durur**. Mesele "ortaya logo koymak" değil, **"üstte ikinci bir panel varmış hissini tamamen ortadan kaldırmak"** — Kanji Atlas'ın "sakin ve özenli" diliyle uyumlu.
  - **Netleştirme — kütlesizlik ≠ görünmezlik:** Kütlesizlik, navigasyonun **görünmez olması DEĞİLDİR.** Navigasyon her zaman **görünür ve güven vericidir**; görünmeyen tek şey onun **taşıyıcı panelidir.** Kullanıcı **ikonları fark eder, toolbar'ı fark etmez.**
  - **İstenen his:** hafif · ferah · boşluk kullanan · yüzen · görünür ama dikkat çekmeyen · uygulamanın içine gömülü.
  - **İstenmeyen:** kalın AppBar · belirgin toolbar · ikinci bir kart · sabit büyük dikdörtgen · ağır arka plan · Material hissi · "başka bir panel daha var" hissi.
  - **Yerleşim (bağımsızlık — hizalamadan ilişki):** üç eleman **tek bir panelin içine yerleştirilmiş gibi DEĞİL, birbirinden bağımsız duran üç gezinme öğesi** gibi algılanmalı. Aralarındaki ilişki **hizalamadan** gelir — **ortak bir arka plan kartından DEĞİL**. Arkalarında belirgin bir bar YOK. Sol `← Geri`, orta **Kanji Atlas logosu**, sağ **Profil/Ayarlar**.
  - **Scroll davranışı (bar sonradan oluşmaz):** sayfa en üstteyken **arka plan görünmez**, ikonlar içerik üzerinde serbestçe durur. Kullanıcı aşağı indikçe Apple'a benzer biçimde **çok hafif, neredeyse hissedilmeyecek** bir ayrışma oluşabilir (ince blur · çok hafif gölge · üst sınırda yumuşak ayrım). **AMA bu blur/gölge yeni bir bar oluşturmak için DEĞİL, yalnızca okunabilirliği artırmak içindir.** Kullanıcı hiçbir anda **"şimdi bir navigation bar oluştu"** hissini yaşamamalı. (Birçok uygulama scroll'da bir anda beyaz bir AppBar çıkarır — istediğimiz **tam olarak o değil.**) Hiçbir zaman kalın bir navigation bar'a dönüşmez.
  - **Logo (sabit referans noktası):** Logo yalnızca bir buton **değil**; uygulamanın **sabit referans noktasıdır.** Sayfa değişebilir, içerik kayabilir, kullanıcı derine inebilir; ama logo **aynı yerde kalarak kullanıcının zihinsel haritasını korur.** Sürekli görünen çapa — asla kaybolmaz, her zaman aynı yerde, Ana Sayfa'ya dönüşün doğal yolu.
  - **Özün özü (en berrak hedef):** Apple'ın hoş duran yanı **blur değil** — hoş olan şey **toolbar'ı hiç görmemen, yalnızca ihtiyacın olan üç şeyi görmen.** Kanji Atlas da bunu hedefler: kullanıcı geri okunu, logoyu ve profil ikonunu görür — ama arkalarında **ikinci bir katman / ikinci bir panel / ikinci bir sayfa varmış gibi hissetmez.**
  - **Referans:** Apple'ın son yıllardaki iOS gezinme **hissi** — ama Apple ikonları kullanılmaz, düzeni birebir kopyalanmaz; kendi logo/ikon/tasarım dilimiz korunur. Referans alınan yalnızca **yerleşim hissi, boşluk kullanımı, ağırlık dağılımı ve hareket dili.**
- **Alt-nav seçici (GEOMETRİ + HAREKET — nihai RENK değil):** büyük dışa taşan turuncu top → **dock içi yumuşak capsule/blob**; ikon çok az yükselip büyüyebilir; rafine hafif geçiş; jel/sıvı abartısız; oyuncak değil, sakin/kaliteli. (Canlı staging'de Claude in Chrome görsel döngüsüyle rafine edilecek.)
  - **SINIR (kilitli):** Pas 2'de seçicinin **geometrisi, konumu ve hareketi** tasarlanabilir; **nihai renk KİLİTLENMEZ.** Geçici renk mevcut paletten **nötr** biçimde alınır; büyük renk revizyonunda Kana/Kanji/Oyunlar + kart yüzeyleriyle birlikte yeniden değerlendirilir. → Pas 2'deki seçici rengi **"tamamlanmış tasarım kararı" SAYILMAZ.**

### ERTELENMİŞ NOTLAR (Pas 1/2 dışı, kaybolmasın)
- **RENK REVİZYONU — ERTELENDİ (Zeynep: "parça parça renk değiştirmek istemiyorum"):** Sonraki büyük UI turunda **Kana · Kanji · Oyunlar · kart yüzeyleri · accent renkleri · alt-nav seçicisi** hep birlikte **Japanese Flick ile aynı renk ailesine** taşınacak. Parça parça uygulanmayacak; tek bütünsel renk kararı. (Pas 2 seçici geçici rengi bu revizyonda tekrar ele alınır — yukarı bkz.)
- **Kana/Kanji dil/terminoloji turu — ERTELENDİ:** yapay Türkçe · ders kitabı tonu · fazla iddialı ifade · tutarsız CTA isimleri · "yazı/çiz/çalış/test" terminolojisi · Kana↔Kanji paralelliği → **ayrı içerik review turu.** (R7 terminoloji kararları bu turla birlikte alınır — yalnız metin yaması yapılmaz.)
- **LEARNING FLOW REVIEW (R7) — ERTELENDİ:** ayrı UX fazı; Pas 1/2 ve dil turundan bağımsız. Kabul ölçütleri R7 maddesinde.
- **S-1 (Shippori İ/ı/ğ/ş glif kalitesi) — AÇIK:** kozmetik, GATE 3 bloklayıcısı değil; uygulama geneli için toplu font kararı sonraya. Detay: `ONBOARDING-ADIM7-GATE3-staging-kit.md`.

<!-- Yeni maddeler R8 … buraya -->
