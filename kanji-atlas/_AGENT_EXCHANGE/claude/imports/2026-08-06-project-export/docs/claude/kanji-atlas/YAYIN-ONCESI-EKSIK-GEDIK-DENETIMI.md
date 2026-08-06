# Kanji Atlas — YAYIN ÖNCESİ EKSİK-GEDİK DENETİMİ

> 2026-08-01 · Branch `onboarding-b2-gate3` @ `db743d7` · merge ÖNCESİ tam tarama.
> Yöntem: üç bağımsız denetim (içerik verisi · gerçek tarayıcı QA · P0 mutabakatı) + test paketi koşusu. **Her bulgu ölçüldü**, hiçbiri belgeden alınmadı. Belge ile kod çeliştiğinde kod kazandı.

---

## 0. Tek cümlelik hüküm

**Öğrenme çekirdeği belgelerin iddia ettiğinden çok daha ileride ve sağlam. Yayını tutan şey pedagoji değil: doğrulanmamış içerik sızıntısı, üç yanlış ses eşleşmesi, sıfır erişilebilirlik uygulaması, ve test paketinin yarısının aslında hiçbir şeyi test etmiyor olması.**

---

## 1. İYİ HABERLER (ölçüldü, doğrulandı)

| Alan | Bulgu |
|---|---|
| **Kararlılık** | 31 ekran · 15 oyun · 359 etkileşimli eleman · 5 akış → **0 pageerror, 0 JS console hatası** |
| **Ölü buton** | Tüm `data-go`/`data-act` elemanları tek tek tıklandı → **gerçek ölü buton yok** (1 görsel istisna, §3.2) |
| **Onboarding** | 3 adım, tüm dallar (evet/hayır/geri/atla) test edildi, hepsi çalışıyor |
| **Ses altyapısı** | manifest 611/611 `recorded` · **kırık yol 0** · yetim mp3 **0** · gömülü manifest ile JSON farkı **0** |
| **Ses kapsamı** | kanji 91/91 · kana 92/92 · kelime 78/78 · cümle 78/78 · örnek kelime 253/253 |
| **Veri bütünlüğü** | duplicate karakter 0 · `meaning_tr` boş 0 · `stroke_order_steps` boş 0 · `stroke_count` uyuşmazlığı 0 · 0–1 örnekli kayıt 0 |
| **Türkçe glif** | 31 ekranda **0 tofu**; ş ğ ı İ Ç Ö Ü temiz |
| **Taşma** | `document.scrollWidth === 390` her ekranda; tabbar altında kalan metin **0** |
| **Kalıcılık** | "İlerlemeyi sıfırla" sonrası `userHints` **korundu** — proje ilkesi kodda doğrulandı |
| **P0-1 / P0-4 / P0-5** | Yol haritası "bekliyor" diyor — **üçü de kurulu ve çalışıyor** (nav socket, ortak mastery modeli, **Kana SRS**). Roadmap ~2 hafta bayat. |

**Kana SRS artık bir boşluk değil.** `buildKanaReviewQueue` :2145, `KanaReview()` ekranı :4243, kana due banner'ı :3363, dakuten dönüşüm kartı. Bir önceki değerlendirmemde "en büyük işlevsel boşluk" demiştim — **yanlıştı, ölçmeden belgeye güvenmiştim.** Düzeltiyorum.

---

## 2. 🔴 CİDDİ — yayından önce düzeltilmeli

### 2.1 Üç kanji YANLIŞ SES çalıyor
`DATA.romaji` alanı hatalı, manifest bunu birebir izliyor:

| Karakter | `romaji` | Çalan dosya | Olması gereken |
|---|---|---|---|
| **明** | `"aka"` | `word/aka.mp3` → **赤'in sesi** | あかるい / メイ |
| **晴** | `"ha"` | `kana/ha.mp3` → **は kanasının sesi** | はれる / セイ |
| **話** (言 örneği) | `"hana"` | `word/hana.mp3` → **花'nın sesi** | はなし |

Bu sadece ses değil — `romaji` ekranda da yazıyor. Yani kullanıcı 明'in okunuşunu "aka" olarak **öğreniyor**. Bir dil öğretme uygulamasında bu en ağır hata tipidir.

### 2.2 Doğrulanmamış içerik kullanıcıya sızıyor
`kokenOf()` (:1620) etymology yoksa `pictogram_note`'a düşüyor → **30 kanjide QA'dan geçmemiş metin yayında**: 一二三人木林森休日月明子学女水火山川田十雨男上下中小見買車電.

Daha kötüsü: **oyun ve quiz yolları kapıyı tamamen atlıyor** (:3959-3965, :5310, :5324, :5408) — ham `memory_hint_tr`/`pictogram_note` okuyorlar.

Bu, ürünün ana iddiasını (*"kaynaklı, çapraz doğrulanmış, QA'lı içerik"*) doğrudan çürütüyor. Aylardır kurduğumuz `qaStatus` kapısı bir kapıdır — ama yanında açık bir pencere var.

### 2.3 Boş "Kökeni" kartı
`index.html:3632` guard'ı yalnız `null` kontrol ediyor, `""` kontrol etmiyor → **今** ve **白**'da başlık basılıyor, gövde boş bir beyaz pill olarak duruyor. (九 ve 南 doğru şekilde gizleniyor — onlar `null` dönüyor.)
Kanıt: `qa-shots/detail-shiro-白.png` vs `detail-toki-時.png`.

### 2.4 Test paketinin yarısı ölü
**24 test dosyasının 9'u var olmayan bir dosyaya bakıyor** (`file:///home/claude/atlas_drive_may30.html`):
`regress_check · smoke_audio · smoke_audio_6b · smoke_audio_games · smoke_audio_migration · smoke_familystrip · smoke_pathnorm · smoke_srs · smoke_storage`

Bunlar **hata vermiyor gibi görünüp aslında hiçbir şey test etmiyor.** Ayrıca `manifest_check` (4 test) ve `manifest_build_check` (1 test) bayat beklentilerle **kırmızı**.

| Durum | Sayı | Hangileri |
|---|---|---|
| ✅ Gerçekten yeşil | 8 | content_scaffold 401/401 · legacy_derived 83/83 · sources · durable_backend 9/9 · backup · game_roles 62/62 · storage_check · srs_check |
| 💀 Ölü yol | 9 | yukarıdaki liste |
| ❌ Kırmızı | 2 | manifest_check · manifest_build_check |
| ⏱ Doğrulanamadı | 3 | home_rec · onboarding_b2 · recognition (bu ortamda 4dk+) |

**"17 suite geçiyor" ifadesi bugün doğru değil.** Release checklist'i dürüstçe imzalamak şu an mümkün değil.

### 2.5 Erişilebilirlik — sıfır uygulama
`prefers-reduced-motion`: **0 eşleşme.** 56 `transition` + 26 `animation` + 12 `@keyframes` koşulsuz çalışıyor.
Kardeş uygulamalarında (`japanese-flick`, `matreflex`, `nav-prototip`, landing) bu **var**. Yani yapılamıyor değil, yapılmamış.
6552 satırda: `aria-label` 16 · `role="button"` 12 · `focus-visible` 2 · `toast()` içinde `aria-live` **yok**.

### 2.6 Yayın mekaniği kurulu değil
- Web manifest'te **`icons` dizisi yok** → Android ana ekran ikonu tanımsız
- `const ICONS` (:2354) tanımlı ama **hiçbir yerde kullanılmıyor** — ölü kod
- `native/` yalnız iskelet (README + config + build script); iOS/Android projesi yok → **App Store'a bugün gidilemez**
- Branch main'in **97 commit önünde, merge edilmemiş**
- Landing `index.html` kanji-atlas'a **hiç link vermiyor** (0 eşleşme) → ürün fiilen pre-launch

---

## 3. 🟡 ORTA — fark edilir, ürün çalışıyor

| # | Bulgu | Ölçüm |
|---|---|---|
| 3.1 | **33 kanjinin kelime kartı bağı yok** (25'i N5). Bu 33'ün **hiçbiri** `words[]` metninde geçmiyor → mevcut veriyle bağ kurulamaz, yeni kart gerekir | 33/91 |
| 3.2 | Tekrar ekranında devre dışı buton **tam accent kırmızısı** görünüyor. Sebep: tag'de **iki `style` attribute'u** var (:4073), parser ikincisini yok sayıyor → `opacity:.5` hiç uygulanmıyor | 1 |
| 3.3 | Paramsız `go("quiz")` **sonsuz döngü** (:3849) — sayaç hep "1/N", sonuç ekranı gelmiyor. Bugün UI'dan erişilemiyor; "Rastgele mini test" butonu eklenirse anında blocker | latent |
| 3.4 | Hafıza katmanı içeriği olmayan kanji | 42/91 |
| 3.5 | "Neden böyle?" metni olmayan kanji | 37/91 |
| 3.6 | `formationType` bileşik ama `components` boş → bileşen görünümü çıkmıyor | 19 |
| 3.7 | `DATA.chars`'ta karşılığı olmayan bileşen referansı → **tıklanamaz uç** (太 寺 禾 好 力 交 夕 吾 儿 門 売 舌 网 貝 卜 囗 电 可) | 19 |
| 3.8 | Radikal örnek karakterlerinin çoğu `DATA.chars`'ta yok → detaya gidilemez | 14/21 |
| 3.9 | 7 radikalin karakter sesi manifestte yok → buton **sessiz** | 7 |
| 3.10 | **見**'de semantik bileşen 目'ün anlamı yok (`component_meanings` eksik) — Atlas'ın çekirdek vaadi | 1 |
| 3.11 | `quiz_items` alanı 8 kayıtta var, **hepsi boş dizi** | 8 |
| 3.12 | Kategori ekseni karışık: "İleri (kilitli)" semantik değil erişim ekseni · "Yönler"(4) ↔ "Yön ve konum"(9) çakışması · 大/小 yanlış kovada | 3 |
| 3.13 | Alt barda kilitli IA'da olan **"Yazı" sekmesi yok** (`LB=['Kana','Kanji','Oyunlar','İlerleme']`, :2393) | 1 |
| 3.14 | Yüzeyde **5 mastery etiketi** görünüyor; D3 kilidi "yüzeyde 3 durum" diyor | 3 yer |
| 3.15 | `日.n5_words` içinde `nichiyoubi` **iki kez** | 1 |
| 3.16 | 4 örnek cümle iki kelime kaydında paylaşılıyor | 4 |
| 3.17 | Atlas seviye çubuğunda **"Kökler" çipi kırpık** (scrollWidth 386 / client 354), kaydırma ipucu yok | 1 |
| 3.18 | Son seviye filtresi kapatılamıyor ama **hiçbir geri bildirim yok** → bozuk sanılabilir | 1 |
| 3.19 | Service worker yok → **gerçek offline kurulumu yok** | — |

---

## 4. ⚪ KOZMETİK / TEKNİK BORÇ

`words[].audio` ölü alan (24 kırık yol, kodda okunmuyor) · `kunyomi="-"` placeholder 7 · aynı örnek kelimenin farklı Türkçe karşılığı (天気, 目玉) · ク↔タ tek yönlü confusable · 艹 `base_stroke_order_steps` boş · 忄扌艹 hiçbir kanjide geçmiyor · 17 `words` kaydı hiçbir kanjiden referans almıyor · ölü CSS (`.levbar .mbox .home-band .gate-card .pcard .snav-*`) · bayat kod yorumları (:2161) · DEVAM-NOKTASI'ndaki HEAD 16 commit geride.

---

## 5. ⚠️ BU HÂLİYLE PAZARA ÇIKMANIN ÖNGÖRÜLEBİLİR SONUÇLARI

### 5.1 İtibar riski — en ciddi olan bu
Uygulamanın satış vaadi **"kaynaklı, çapraz doğrulanmış, dürüst içerik"**. Bu vaat aynı zamanda en kırılgan yeri.

- **明 = "aka"** hatasını Japonca bilen bir kullanıcı **ilk 10 dakikada** bulur. Yön: "kanji öğretiyor ama okunuşu yanlış." Bir kez yazılan bu yorum, aylarca süren etimoloji titizliğinin tamamını gölgeler.
- Kaynaklar ekranında *"çapraz doğrulanarak hazırlanır"* yazarken 30 kanjide QA'dan geçmemiş metin göstermek, keşfedilirse **savunulamaz** bir tutarsızlıktır. En kötü senaryo: bu tutarsızlığı biz değil, bir kullanıcı bulur.
- Boş "Kökeni" kartı (今, 白) "yarım kalmış ürün" izlenimi verir — hem de tam olarak **öne çıkardığımız** bölümde.

### 5.2 Store reddi / gecikme riski
- App Store saf web'i **kabul etmiyor**; native kabuk iskeletten öteye geçmemiş → bugün gönderilemez.
- Erişilebilirlik sıfır: reduced-motion yok, `aria-live` yok, focus yönetimi zayıf. Bu, hem inceleme riski hem de "editör vitrinine" (featured) girme şansını doğrudan düşürür.
- Web manifest'te ikon yok → Android'de ana ekrana eklenince **jenerik ikon**.

### 5.3 Kalite güvencesi çöküşü
9 ölü + 2 kırmızı suite ile **regresyon ağı yok**. Yayından sonra gelen her düzeltme, fark edilmeden başka bir şeyi bozabilir. Yayın sonrası hızlı düzeltme yapmak zorunda kalınan an, bu tam olarak en tehlikeli hâle gelir. Şu an "testler geçiyor" demek **doğru değil**, ve bu bilgi eksikliğiyle karar vermek gerçek riskin kendisidir.

### 5.4 Kullanıcı deneyimi aşınması
- 33 kanjide kelime kartı yok → öğrenen aynı akışı bazı karakterlerde bulup bazılarında bulamıyor. **Tutarsızlık, eksiklikten daha rahatsız edicidir.**
- 19 tıklanamaz bileşen ucu → Atlas'ın "gezilebilirlik" vaadi bazı yollarda duvara çarpıyor.
- 42/91 kanjide hafıza notu yok → bölüm bazen var bazen yok.
- Devre dışı butonun aktif görünmesi → "bozuk uygulama" algısı.

### 5.5 Veri kaybı riski
localStorage tek kalıcılık; bulut senkron yok. Kullanıcı tarayıcı verisini silerse **tüm ilerleme gider**. Manuel yedekleme var ama kullanıcı bunu bilmiyor. İlk kötü yorum tipi budur: *"bütün ilerlemem sıfırlandı."*

### 5.6 Bir de tersi — geciktirmenin maliyeti
Dürüst olmak gerekirse: **canlıdaki sürüm bugünkünden çok daha kötü.** 22 Temmuz'dan kalma, son 97 commit'in hiçbiri yok. Bu denetimdeki "ciddi" kalemlerin bir kısmı canlı sürümde de var, üstelik yanına eksik içerik de ekleniyor. Yani *merge etmemek* güvenli bir seçenek değil — sadece görünmez bir seçenek.

---

## 6. ÖNERİLEN SIRA

**Kapı 1 — merge'den önce (küçük, 1 oturum):** §2.1 üç `romaji`/ses hatası · §2.3 boş Kökeni guard'ı (`_ko===null` → `!_ko`) · §3.2 çift `style` attribute'u · §3.15 duplicate `nichiyoubi`. Dördü de tek satırlık, riski düşük, etkisi yüksek.

**Kapı 2 — merge (landing linki YOK):** canlı sürüm bugünkü hâline gelsin, sessizce. Ardından **telefonda gerçek kullanım turu** — fontlu ortamda §3.17 ve metin genişlikleri yeniden bakılmalı.

**Kapı 3 — web yayınından önce:** §2.4 test paketini onar veya resmen düşür (ölü suite silinsin, `manifest_check` beklentileri güncellensin) · §2.2 `pictogram_note` fallback kararı + oyun/quiz yollarındaki 4 kapı ihlali · §2.5 erişilebilirlik turu (reduced-motion + aria-live + focus) · §2.6 web manifest ikonları.

**Kapı 4 — store:** native sarım (Mac gerekir) · store varlıkları · gizlilik/destek sayfası.

**Bilinçli olarak v1 sınırı sayılabilecekler:** 33 kelime kartı bağı · 42 hafıza notu · 19 tıklanamaz uç · dark mode · i18n · bulut senkron. Bunlar eksiklik, hata değil — sürüm notunda dürüstçe söylenebilir.

---

## 7. Denetim izi

Üç bağımsız ajan + doğrudan ölçüm. Ekran görüntüleri: `/home/claude/qa-shots/` (bulgu kanıtları + 8 anahtar ekran + onboarding 3 adım). Test betikleri `/home/claude/qa/`. **Hiçbir dosya değiştirilmedi** — bu tur salt denetimdir.
