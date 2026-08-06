# Kanji Atlas — Üretim Push Planı + Ürün Vizyonu

> **Ne bu belge?** Atlas'ı release kalitesine taşıyacak **tek, sıralı, geçitli** iş akışı + üstünde duran **ürün vizyonu/DNA**. Studio OS (`claude/STUDIO-OS.md`) hattının bu ürüne uygulanışı. Status board ayrı: `kanji-atlas-roadmap-MASTER.md`.
>
> **Status / Version / Updated:** AKTİF · **v3.0** · 2026-07-20
> **Mutabakat:** Üç ayak — Zeynep (ürün sahibi/vizyon/son karar) · Claude (Production Manager: mimari/kod/plan/risk/kalite geçitleri) · GPT (ürün denetçisi: pazar/rakip/pedagoji/UX/uzun vade — onaylamaz, gerektiğinde kapsamı daraltır).
> **v3 farkı:** GPT ürün-vizyonu talimatı işlendi. Plan artık "yapılacaklar" değil, **"neden yapılıyor / neden yapılmıyor"** gerekçeli. Başarı ölçütü özellik sayısı değil, **ürün netliği.**
> **Değişmez soru (her faz sonu):** *"Bu değişiklik Atlas'ı daha BÜYÜK mü, daha İYİ mi yaptı?"* Cevap "yalnız daha büyük" ise değişiklik yeniden değerlendirilir.

---

## A. ÜRÜN VİZYONU & KİMLİK (KİLİT — Vision Lock / Product DNA)

**Tek cümle:** *Japon yazı sistemini — kana'dan başlayıp kanji ailelerine, bileşenlere, anlam ve ses ilişkilerine, gerçek kelimelere ve yazmaya — anlamlandıran uygulama.*

**Atlas NE DEĞİL** (odağı dağıtır, reddedilir): tam sözlük · tam JLPT platformu · gramer kursu · konuşma uygulaması · sosyal ağ · haber okuma · "herkes için genel Japonca süper-app".

**Öğrenme zinciri** (her kanji mümkün olduğunca): **Anlam → Bileşen → Aile → Gerçek kelime → Yazma → Tekrar → Atlas'ta yeni bağlantının açılması.** *Atlas grafiği amaç değil; öğrenmenin GÖRÜNÜR SONUCU.* (Atomik kanji — 一 gibi — kısa zincir kullanır; zorlama yok.)

**Öğrenme felsefesi:** Bilgi göstermeyeceğiz, bilgiyi **anlamlandıracağız.** İlk ekranda boğmayacağız: önce en önemli anlam + en gerekli okuma + en faydalı gerçek kelimeler; ileri bilgi sonra açılır (aşamalı açığa çıkarma).

**Yazma sistemi:** "çizgiyi takip et" + AI puanı DEĞİL. İlerleme: **Gör → İzle → Hatırla → Yaz → Tanı → Kullan.** Cezalandırmaz; amaç öğretmek. *(Mevcut çizim modülü bu ölçüte göre denetlenecek — Faz 1.)*

**Üç bilgi katmanı (değişmez):** Köken → Neden böyle → Hatırlama desteği. Hatırlama desteği **tarihsel gerçek gibi sunulmaz**, açıkça öğrenme desteğidir.

**Flick ↔ Atlas sınırı (çakışma yok):**

| | Japanese Flick | Kanji Atlas |
|---|---|---|
| Kutup | hız · refleks · flick klavye · akıcılık · oyun | anlama · keşif · yapı · aile · bileşen · editoryal sakinlik |
| Kana'nın işi | **yazma refleksi** (flick tuşuyla girdi) | **okuma/tanıma + yazı sisteminde yeri** (vuruş, mnemonik, karışanlar) |
| Ortak | — | yalnız **ses dosyaları** (`/audio`), ekran/akış paylaşılmaz |

**Özellik ekleme süzgeci (STANDING GATE — her yeni ya da genişletilen özellik için):**
1. Öğrenmeyi gerçekten geliştiriyor mu? 2. Odağı dağıtıyor mu? 3. Flick ile çakışıyor mu? 4. Bakım maliyetini artırıyor mu? 5. Kullanıcı gerçekten istemiş mi? 6. Bu özellik olmadan ürün yine güçlü mü? — Cevaplar güçlü değilse **girmez.**

**Kaçınılacak tuzaklar:** özellik şişmesi · gereksiz mini-oyun · her şeyi tek app'e yığma · seçenekle boğma · çok erken ileri kanji · aynı bilgiyi farklı ekranda tekrar · güzel-ama-öğretmeyen ekran · teknik gösteriş uğruna sadeliği bozma.

---

## B. Kilitli kararlar

- **K1 — Tek dosyada kalınır** (framework/build yok). Ama dosya içinde katmanlar görünür: `CONFIG/TOKENS · DATA · AUDIO_MANIFEST · LEARNING_ENGINE(SRS) · STORAGE+MIGRATION · UI_RENDERERS · EVENT_BINDINGS · BOOTSTRAP`. **Mimari geçidi:** yeni aile/kelime/ses = renderer/SRS/storage/event'e dokunmadan, sadece veri. Denetle-düzelt, rewrite yok.
- **K2 — Vitrin Aile:** dikey dilim + tasarım tek kilometre taşında birleşir; katı sınırlı (Faz 3).
- **K3 — Faz 1 çıktıya bağlı kapanır**, süreye değil.
- **K4 — Production Manager modu (YENİ):** Her faz sonu raporu **ne yapıldı + ne REDDEDİLDİ + neden** (bigger-vs-better gerekçesi) içerir. Kapsam büyümesi gerekçe olmadan geçemez.

---

## C. Faz sırası + geçitler (her geçit: teknik DoD + **öğrenme/netlik ölçütü**)

| Faz | Ad | Geçit (teknik + öğrenme) |
|:--:|---|---|
| 0 ✅ | Kaynak sağlama + kanon | HEAD çekildi/yedek · kanon net · Baito düzeltildi · **GitHub tohumu atıldı** (kanji-atlas-seed) |
| 1 | **Ürün/öğrenme denetimi** (vizyona karşı) | Tek cümle + öğrenme zinciri + Flick sınırı kilitli · her ekranın zincire katkısı yazılı · koru/değiştir/**de-emphasize** listesi (silme yok) · vitrin aile seçili · çizim modülü "Gör→…→Kullan" ölçütüne göre değerlendirildi |
| 2 | Mimari güvenlik (tek dosya audit-fix + ses manifesti) | Mimari geçidi sağlanıyor · migration testi · **yeni içerik = sadece veri** |
| 3 | ★ **Vitrin Aile** final kalitede | İki tema kusursuz · sesli · a11y temeli · **tam öğrenme zinciri bu ailede işliyor** · Zeynep "aile+nüans" onayı · bigger-vs-better: İYİ |
| 4 | İnsan playtest (vitrin aile) | *Öğrenme* onayı: ilk yolu buldu · aile mantığını kavradı · grafikte kaybolmadı · 1 hafta sonra hatırladı · "incelemedim, öğrendim" |
| 5 | Tasarımı yay (alt-geçit 5A–5G) | Her ekran aile dilinde + iki tema · **hiçbir bilgi ekranlar arası tekrarlanmıyor** (anti-redundancy) |
| 6 | Öğrenme motoru + Kana SRS | Kana kanji ile aynı SRS disiplininde · **"şimdi ne çalışayım" net** (due yüzeye çıkıyor) |
| 7 | Kalan N5'i şablonla ölçekle | Yeni içerik koddan bağımsız giriyor · **sıra doğru, bilgi aşamalı** (boğmuyor) |
| 8 | QA + erişilebilirlik | 3 hat + a11y (rem/%200/semantik/focus/reduced-motion + **Atlas grafiğine liste alternatifi**) · kritik bug yok |
| 9 | Store hazırlık + paketleme | Mağaza varlıkları · gizlilik etiketi · Capacitor paket |
| 10 | Soft launch | **Yerel/opt-in ölçüm** · davetle dönüş · kritik çökme yok |

---

## D. GPT'nin 10 sorusuna cevap

1. **Korunan maddeler:** v2 omurgası tümüyle — tek dosya+katman (K1), vitrin-aile-önce (K2), çıktıya-bağlı denetim (K3), alt-geçitli tasarım yayılımı, insan playtest geçidi, somut a11y + grafik liste-alternatifi, ortak `/audio` ID-manifest, mahremiyet kilidi, Release-Gate/Editorial-Readiness ayrımı, üç-ayak model.
2. **Değişen:** (a) Faz 1 artık **kilitli vizyona karşı** denetim (kimlik + zincir + Flick sınırı) — sadece "ekran haritası" değil. (b) Her geçide **öğrenme/netlik ölçütü** eklendi. (c) Çizim modülü "Gör→…→Kullan" ilkesine göre yeniden değerlendirilecek (puanlama/ceza dışarı). (d) Atlas grafiği "sonuç, amaç değil" olarak konumlanacak (aşamalı açığa çıkma). (e) Kalite barı "bigger-vs-better" testine bağlandı.
3. **Tamamen kaldırılan:** sözlük/JLPT-platform/gramer/konuşma/sosyal/haber yönelimleri (kimlik dışı) · "editör 9+" geçit olarak (Editorial Readiness'e taşındı, pass/fail değil) · **özellik ekleme zihniyeti** (yerine 6-soru süzgeci) · AI-puanlı yazma. *(Çalışan kod SİLİNMEZ — CANON; de-emphasize/gate edilir.)*
4. **Yeni geçitler:** Vizyon geçidi (Faz 1'de kimlik+zincir+sınır kilidi) · **Özellik süzgeci (standing, 6 soru)** · Öğrenme-sonucu geçidi (playtest) · Anti-redundancy geçidi (bilgi tekrarı yok) · Yazma-pedagojisi geçidi (öğretir, cezalandırmaz).
5. **Vitrin aile seçim ölçütü:** tam zinciri en iyi kanıtlayan aile — (a) net ortak bileşen/kök · (b) üyelerde 3-katman içeriği hazır · (c) yüksek-frekans gerçek kelimeler (ses Flick'ten hazır) · (d) grafik bağlantısını görsel gösterebilen · (e) yeni-başlayana uygun. **Güçlü aday: 木 ailesi (木 本 休 林 森)** — ortak 木 bileşeni, doğal aile, gerçek kelimeler, zaten Aile Şeridi örneği. Faz 1'de bu ölçütlere göre kesinleşir.
6. **İnsan testi:** Faz 4 — 4 sıfır + 4 kana/N5 · açıklamasız ilk kullanım · 15–20 dk · 1 hafta sonra hatırlama · vitrin aile üzerinde. Geçit = **öğrenme sonucu** (bug değil): "atlas mı inceledin, öğrendin mi?".
7. **Pazar dersi → faz:** "şimdi ne çalışayım / yol kaybolmasın" → Faz 1 (öğrenme döngüsü) + Faz 6 (due yüzeye) · gerçek yazma öğretsin → Faz 3 yazma-pedagojisi · kanji gerçek kelimede → Faz 3 vitrin + Faz 7 şablon · doğru sıra/az bilgi → Faz 1 müfredat + aşamalı açığa çıkarma · boğma → bilgi-miktarı ilkesi · esneklik → öner-kısıtlama-yok (CANON) · şişme yok → 6-soru süzgeci + tuzak listesi · dönme nedeni → Faz 6 SRS + zincir-bağlantı ödülü.
8. **Flick çakışması ayrıştırma:** Kana ikisinde de var ama işi farklı — Flick=yazma refleksi (klavye girdisi), Atlas=okuma/tanıma+yazı sistemindeki yer. Ortak ekran/akış YOK; yalnız `/audio` paylaşımı. (Sınır tablosu §A.)
9. **V1 dışına alınanlar (neden):** N5-ötesi kanji → V2 (V1 sistemi N5'te kanıtlar) · sözlük/arama-birincil → kimlik dışı · pro cümle sesi → V1'de TTS fallback (maliyet) · AI-puanlı yazma → pedagoji (öğretir, puanlamaz) · ek mini-modül genişletmeleri → çalışır kalır, V1'de genişletilmez. Ortak gerekçe: **odak + bakım + kimlik.** *(Karanlık tema V1 İÇİNDE — Zeynep kararı.)*
10. **Faz-sonu kalite kriteri:** her fazın yukarıdaki geçidi + **"bigger-vs-better: İYİ"** + o fazın öğrenme/netlik ölçütü sağlanmadan sonraki faza geçilmez.

---

## E. Ses envanteri (özet · detay v2'de sabit)
Flick kütüphanesi 683 mp3 (kana 104 · word 568 · phrase 10). Atlas kapsama: **kana 46/46 (%100)** · kelime 52/78 · kanji-örnek 27/63. Ortak `/audio` (aynı origin, kopya yok), **ID-bazlı manifest** (romaji homofon çakışması: はし, かみ). Yeni kayıt: 26 kelime (Öncelik 1) + ~36 kanji-örnek + cümlelerde TTS fallback.

## F. Kalite iki bar + mahremiyet
**Release Quality Gate (ölçülebilir):** kritik bug yok · offline · a11y geçer · ana yolda gerçek ses · veri kaybı yok · iki tema · playtest geçti. **Editorial Readiness (olasılık, garanti değil):** özgün hikâye · güçlü görseller · belirgin kimlik · yerel dil · mahremiyet · eğitimsel yenilik · basın kiti. **Mahremiyet kilidi:** SHARED-STANDARDS §10 "veri toplamıyor" korunur → metrik yalnız cihazda / opt-in dışa aktarım; otomatik uzaktan analitik YOK.

## G. Çalışma anlaşması
1. Kapsamı tek fazda tut; vitrin aile sınırını koru (gizli rebuild yasak). 2. Çalışan kod/CSS silmeden önce sor. 3. Her değişiklikte doğrula (node --check + DATA JSON) · GitHub push · SURUMLER+CHANGELOG. 4. Üç katman · öner-kısıtlama-yok · eşit ağırlık · kişisel veri korunur. 5. **Faz kapanışı = ne yapıldı + ne reddedildi + neden (bigger-vs-better).** 6. Üç-ayak: Zeynep karar, Claude PM/inşa, GPT bağımsız denetim — denetim kalıcı.
