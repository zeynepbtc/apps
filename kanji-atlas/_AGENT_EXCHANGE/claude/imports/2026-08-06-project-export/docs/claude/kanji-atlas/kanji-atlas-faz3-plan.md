# Kanji Atlas — FAZ 3 Planı (görsel dil + IA + imza özellikler)

> **Status:** Aktif · **Updated:** 2026-07-21
> **Ne bu belge?** Faz 3'ün kapsamı, sırası, kilitli feature request'leri ve kararları. Faz 3 = **davranış değiştirmeye değil, deneyimi + görsel dili olgunlaştırmaya** odaklanır (brief LOCKED). İşlevler değişmez; sunum, akış, his gelişir.
> **Bağlı belgeler:** `ortak-standartlar/STUDIO-VISUAL-BIBLE.md` · `kanji-atlas-karar-gunlugu.md` · Studio OS aşama 10/12.

---

## ★ KİLİTLENEN KARARLAR (2026-07-21)
- **Birincil ton = AMBER `#D3813A`.** Zeynep: "amber daha samimi geldi." Terracotta `#C0562F` marka/illüstrasyon katmanında kalır (logo). Visual Bible v0.2'de bu kilit işlenecek.
- **Sekme modeli = Seçenek 2 onaylandı:** `Ana Sayfa · Kana · Kanji · Çizim · Oyunlar` (İlerleme sekmeden çıkar → Ana Sayfa + profil).
- **Çizim = tek modül (tek ev), kısayollarla erişilir.** Kana/Kanji öğrenme modüllerinde "çizmeyi dene" linki aynı Çizim modülünü açar (kopya değil).
- **★ Geri-dönüş kuralı (Zeynep, KRİTİK):** Çizim'e kısayoldan girildiğinde **geri butonu her zaman gelinen son noktaya döner** (kanji detay / kana detay / neredeyse), sabit ekrana DEĞİL. "Ana sayfa kaçışı zaten hep sabit; o yüzden geri dönüşün kaldığın son noktaya olması çok önemli." → nav-stack: origin'i koru, state'i koru.
- **Logo:** stüdyo markasıyla (zeynepkaya.app) **aynı OLMAYACAK.** Ondan evrilebilir. Zeynep fikri: **farklı stroke renkleri olan bir kanji** (her vuruş aile paletinden farklı renk). **ŞİMDİ TASARLANMAYACAK** — sırası gelince denemeler gösterilecek, sonra netleşir.

---

## 0. Faz 3 üç kol

| Kol | Ne | Tür |
|---|---|---|
| **A · Görsel dil** | Visual Bible → aile logosu → token → bileşen → ekran uygulaması | Sunum |
| **B · IA / navigasyon** | Nav derinliğini azalt, çizimi öne çıkar, keşfedilebilirlik | Yapısal (görsel DEĞİL) |
| **C · İmza özellik** | Stroke Coach (yazı değerlendirme motoru) | İşlevsel (büyük, ileri) |

**★ Kritik ilişki:** B (IA) ve C (Stroke Coach) **çizim modülünde buluşur.** IA, Çizim'i birinci-sınıf hedef yapar; Stroke Coach o hedefin içine oturur → **B, C'den önce.**

---

## 1. Önerilen sıra (Claude önerisi — Zeynep onayına)

1. **Visual Bible** — ✅ taslak; v0.2'de Amber kilidi + karanlık mod + bilinen-riskler eklenir.
2. **Türkçe font düzeltmesi + Nunito geçişi** — doğruluk hatası; token geçişinin ilk adımı (erken yapılabilir). Aşağıda §6.
3. **Aile logosu** — Kanji Atlas markası (çok-renkli-stroke kanji fikri); sırası gelince, kilitlenir.
4. **IA refactor (Kol B)** — yapısal; ekran-ekran görsel uygulamadan ÖNCE nav modeli kilitlenir.
5. **Token + bileşen + ekran uygulaması (Kol A)** — Atlas `:root` → aile paleti + Nunito; kart/buton/ikon; ekran ekran. **Bu aşamada aynı anda: (a) IA yeni nav, (b) i18n string dışarı çıkarma, (c) karanlık mod token'ları.** Davranış-korur (smoke: "davranış aynı").
6. **Stroke Coach (Kol C)** — Çizim modülü kurulunca ayrı büyük kalem.

> **Verimlilik ilkesi:** Ekranlar Faz 3'te zaten elden geçecek. Görsel + IA + i18n-hazırlık + karanlık mod **aynı dokunuşta** yapılır ki her ekran bir kez açılsın.

---

## 2. 🔒 LOCKED — Stroke Coach (yazı koçu)
> Mevcut sistem fazla hoşgörülü; görsel kötü çizimleri kabul ediyor. Amaç: "doğru/yanlış" kontrolünden **gerçek el-yazısı koçuna.** Sinir bozucu yapmadan, bariz yanlışı da kabul etmeden. Felsefe: **asla cezalandırma · asla sadece "Yanlış" · her zaman geliştirilebileni açıkla · destekleyici öğretmen. Motivasyon > mükemmellik.** His: "Bunu daha iyi çizebilirim."

1. **Çok-faktörlü puan (0–100):** sıra · yön · başlangıç · bitiş · uzunluk · açı · konum · göreli oran · genel denge (her biri bağımsız).
2. **Yıldız:** ★★★★★ Mükemmel → ★☆☆☆☆ Tekrar dene.
3. **Yapıcı geri bildirim:** "✓ Sıra doğru · • Üçüncü vuruş biraz kısa olabilir." **Asla "❌ Yanlış".**
4. **Zorluk ilerlemesi:** başlangıç bağışlayıcı → ileri hassas.
5. **Hayalet vuruş:** önceki deneme açık gri arkada; gelişim görünür (Deneme 1 ★★★ → 3 ★★★★★).
6. **Pedagojik öncelik:** doğruluk önemli, motivasyon daha önemli.
7. **Uygulama:** AI görüntü tanıma DEĞİL. Deterministik motor, resmî `stroke_order_steps` verisiyle. Hızlı, tutarlı, çevrimdışı, bakımı kolay. (Altyapı: `validateStroke` + stroke oyunu motoru üstüne.)

**Konum:** imza özellik, Çizim modülünün içinde tek motor.

---

## 3. 🔒 LOCKED — Navigasyon & IA refactor
> Atlas büyüdü; özellikler çok katmanlı nav altına gömülüyor. Yeni özellik eklemeden önce IA yeniden. Hedef: **derin değil sığ.**

**Sorunlar:** çizim birden çok yerde · işlev tekrarı · modüller kanji sayfası derininde · çekirdeğe ulaşmak çok ekran · derinlik büyük.
**İlkeler:** (1) her etkinlik TEK modül, tekrarlı giriş yok — bir özellik=bir ev · (2) Çizim ÇEKİRDEK, birincil nav'a terfi · (3) 1–2 dokunuş · (4) her butonu denetle (benzersiz/tekrar/birleştir/kaldır) · (5) modüller bağımsız · (6) çok yere aitse **kısayol** (tek implementasyon) · (7) ilk dakikada Öğrenme/Yazma/Oyun/İlerleme görünür · (8) Apple HIG gözü; büyüdükçe **basitleş.**
**KISIT:** görsel/tipografi/renk YENİDEN TASARLANMAZ; yalnız nav/hiyerarşi/keşfedilebilirlik.

---

## 4. Claude'un IA değerlendirmesi (onaylandı + genişletildi)

**Mevcut sekmeler:** Ana Sayfa · Kana Okulu · Kanji Atlası · Oyunlar · İlerleme (5).
**Gerilim:** Çizim'i eklemek 6 sekme yapar (Apple 4–5). **Çözüm (onaylandı):** İlerleme sekmeden çıkar (pasif "ara sıra bak" yüzeyi), Ana Sayfa'ya taşınır.

**Yeni sekme seti:** `Ana Sayfa · Kana · Kanji · Çizim · Oyunlar`. İlerleme → Ana Sayfa (ilerleme kartı/halka) + profil, tek dokunuş.

**Çizim = tek ev + kısayol + geri-dönüş kuralı:**
- Tek **Çizim** modülü (sekme) = karakter seç → pratik. Stroke Coach motoru burada (tek implementasyon).
- Kana/Kanji detayında **"Bu karakteri çiz →"** = aynı modülü o karakterle açar (kısayol).
- **★ Geri dönüş origin'e:** Çizim'e nereden girildiyse geri o noktaya + o state'e döner. Nav-stack korunur; Ana Sayfa kaçışı ayrı ve sabit. (Kritik — Zeynep vurguladı.)
- Oyunlardaki stroke oyunu aynı motoru paylaşır (kopya yok).

**Denetim çıktısı (Kol B ilk işi):** çizim giriş-noktaları haritası (şu an kaç yerde, hangileri kopya) → tek-ev'e indirgeme planı. Sonra her ekranın buton denetimi.

---

## 5. 🔒 LOCKED — Türkçe font düzeltmesi (§ bug)
> **Kök neden (kanıtlandı):** gövde fontu **yalnız `Noto Sans JP`** (`--sans`); Nunito hiç yüklenmiyor. Noto Sans JP `ş`/`ğ`/`ı` gliflerinde güvenilir değil → kelime ortasında sistem fontuna düşüyor (ör. "beş" → `ş` başka font). Kodda "Font Patch v2: tek font" notu = geçmiş deneme tutmamış.
> **Ders:** Noto Sans JP **Türkçe-güvenli DEĞİL.** Tek-font çözümü Türkçe'yi çözmez.
> **Düzeltme (aile standardı):** gövde `'Nunito','Klee One',system-ui` (Latin/TR → Nunito), serif `'Shippori Mincho','Nunito'`. Google Fonts'a Nunito eklenir. → Faz 3 Nunito geçişiyle **aynı iş**; doğruluk hatası olduğu için erken yapılabilir.

---

## 6. 🔒 LOCKED — Çok-dillilik (i18n) hazırlığı
> Zeynep: "çok dilli olması şart; hemen çeviriye girmeyelim ama iş sırasına alalım." Soru: sistem buna hazır mı?
> **Dürüst tablo (kanıtlandı):**
> - **İçerik: yarı hazır** — DATA'da 176 öğe için `meaning_tr` **ve** `meaning_en` zaten var. Kanji/kelime anlamları iki-dilli.
> - **Arayüz: hazır DEĞİL** — dil sistemi yok (Flick'teki `t(tr,en)` Atlas'ta yok); ~71+ Türkçe UI string'i koda gömülü.
> **Plan (çeviri YAPMADAN):** Faz 3 ekran uygulamasında string'leri **locale tablosuna çıkar** (i18n-hazır). Flick modeli: `t(tr,en)` + `zk_lang` kalıcı + statik `.tr/.en`. Örnek cümleler (`example_sentence_*`) için EN alanı eklenir. **Verimli sıra:** ekran zaten açılırken yap; sonra yapmak her ekranı ikinci kez açmaktır. Çeviri (asıl EN metinler) ayrı, sonraki kalem.

---

## 7. 🔒 LOCKED — Karanlık mod
> Zeynep: "tasarımla ilgili önemli bir beklentim karanlık mod."
> **Plan:** Visual Bible token mimarisi (`:root` değişkenleri) buna uygun. Karanlık tema = ikinci token seti (`[data-theme=dark]` veya kullanıcı tercihi + `prefers-color-scheme`). Sıcak-kâğıt kimliği korunur ama koyu: koyu-kahve/mürekkep zemin, yumuşatılmış aksan. Visual Bible v0.2'de **light + dark token seti** tanımlanır; ekran uygulamasında ikisi birden test edilir. **★ Android bug'ıyla bağlantılı (§8):** kendi karanlık modumuzu shipleyince OS zorla-karartması devre dışı kalır.

---

## 8. 🔒 LOCKED — Android gece-modu renk bozulması (Flick dersi)
> Zeynep: "Flick'te Android telefonların kendi ekran kısartma/gece modunda renk bozulması bug'ının önlemini en baştan alalım."
> **Neden:** Android WebView/Chrome "forced dark" + cihaz gece/okuma modu, sayfa renklerini otomatik ters çevirip/karartıp bozar.
> **Önlem (baştan):** (a) `<meta name="color-scheme" content="light dark">` + CSS `color-scheme` — tarayıcıya "temayı ben yönetiyorum" de. (b) **Kendi karanlık modumuzu shiple** (§7) → OS zorla-karartmaya gerek duymaz. (c) Renkleri CSS `filter`/`invert` ile üretme. (d) Gerçek Android cihazda gece modu altında smoke. → §10 checklist'e girer.

---

## 9. 🔒 Geçmiş uygulama dersleri — bug-önleme checklist
> Zeynep: "önceki uygulamalarda başımıza gelen tasarım problemleri tekrarlanmasın; oradaki potansiyel buglardan ders çıkararak denetleyerek ilerleyelim." Her ekran/build bu listeye karşı denetlenir (Studio OS tutarlılık geçidi ruhu).

| # | Ders (kaynak) | Önlem / denetim |
|---|---|---|
| 1 | Noto Sans JP Türkçe-güvenli değil (Atlas §5) | Latin/TR gövde = **Nunito**; ş ğ İ ı ç render denetimi her ekranda |
| 2 | Android gece-modu renk bozulması (Flick) | `color-scheme` meta + kendi dark mode + gerçek cihaz smoke (§8) |
| 3 | Inline `<script>` bazı görüntüleyicilerde engelli (bu oturum) | Mockup/artifact **statik HTML** — içerik+SVG markup'ta, JS'e bağlama |
| 4 | localStorage temizlenince veri kaybı (bilinen risk) | Kalıcılık uyarısı; ileride bulut senkron fırsatı |
| 5 | Cihaz TTS kalite/tutarsızlığı (ses) | Dosya-öncelikli ses (Faz 2'de çözüldü) |
| 6 | Emoji tutarsız render (oyunlar) | Dekoratif emoji → monokrom çizgi-ikon (`.eico`, currentColor) |

Yeni ders çıktıkça buraya eklenir.

---

## 10. Açık kararlar (güncel)
1. ~~Birincil ton~~ → **AMBER #D3813A KİLİTLİ.**
2. ~~Sekme modeli~~ → **Seçenek 2 ONAYLANDI** (+ geri-origin kuralı).
3. **Logo:** çok-renkli-stroke kanji fikri kayıtlı; sırası gelince denemeler. Şimdi değil.
4. Sıra onayı: §1'deki sıra (font-fix erken? yoksa token geçişiyle birlikte mi?) — Zeynep'e.
