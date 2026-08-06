# Authoring — KAYNAK POLİTİKASI (KİLİTLİ, tek sayfa)

> Her köken/okuma için hangi kaynak esas, anlaşmazlıkta ne yapılır, confidence nasıl verilir. Fix fazının kaynak hiyerarşisinin Authoring özeti. Kardeş: Köken Yazım, Mnemonic Policy.

> **Terminoloji notu (Zeynep, 2026-07-25):** Bu belgede "birincil kaynak" ifadesi kullanılmaz. Akademik olarak doğru karşılık **"esas Japon sözlük referansı"**, somut nesne ise **"Kanjipedia karakter sayfası"**dır. Sebep: "birincil kaynak" filoloji terminolojisinde dönem metnini/yazıtı işaret eder; Kanjipedia modern bir sözlüktür — esas alınan referanstır, birincil kaynak değildir.

## Kaynak hiyerarşisi (esas → ikincil)
| Konu | ESAS kaynak | Doğrulama / not |
|---|---|---|
| Okuma & kullanım | **文化庁 常用漢字表 音訓索引** | Kodlama engellerse jitenon 常用/表外/付表 ile **teyit** (ikame değil) |
| Anlam, oluşum türü, etimoloji | **Kanjipedia** (角川新字源) | Karakter sayfasından |
| Bileşen işlevi çerçevesi | **Outlier** (yalnız LENS) | Tek etimoloji hakemi DEĞİL |
| Çelişki / tarihsel biçim | Akademik / saygın sözlük | İkincil |
| Yöntem / pazar / mnemonic örneği | Tofugu, WaniKani, blog | Tarihsel gerçek kaynağı DEĞİL |

## ⭐ EK KURAL — Esas sözlük referansı zorunluluğu (Zeynep, 2026-07-25 · KİLİTLİ)
**`reviewed` statüsü için her karakterin en az bir esas Japon sözlük referansı — yani bir Kanjipedia karakter sayfası (ID/URL) — bulunmalıdır.**

- Gerekçe **kalite değil, İZLENEBİLİRLİK:** *"3 yıl sonra biri 'Bunu neden böyle yazmışız?' diye sorduğunda 'Kanjipedia' cevabı çok değerlidir. Yoksa tekrar araştırma yapmak gerekir."*
- Dong Chinese ✔ Wiktionary ✔ okjiten ✔ — **kabul edilir ama tek başına yetmez**; Kanjipedia karakter sayfası da `sources[]` içine eklenir.
- Bu referanslar **kullanıcıya karakter kartında gösterilmez**; yalnızca editör tarafı metadata'dır. (Kaynak *isimleri* uygulamada ayrı bir "Kaynaklar ve Yöntem" ekranında toplu olarak duyurulur.)
- Kanjipedia karakter sayfası bulma yolu: `site:kanjipedia.jp "<karakter> | 漢字一字 | 漢字ペディア"` araması → `https://www.kanjipedia.jp/kanji/<10 haneli ID>` → sayfadan **成り立ち** metni birebir alınır ve `disagreementNote`'a Japoncasıyla yazılır.
- Kanjipedia karakter sayfası bulunamıyorsa: `reviewed` yapılmaz **veya** eksiklik `disagreementNote`'ta açıkça yazılır ve onay ayrıca istenir.

## ⭐ EK KURAL — `reviewedAt` (Zeynep, 2026-07-25 · KİLİTLİ)
Her `reviewed` kaydında `etymology.reviewedAt` (`YYYY-MM-DD`) bulunur.
- **Tarih uydurulmaz.** Kaynak git geçmişidir. Geriye dönük türetme: `_faz2/derive_reviewed_at.js`. Yeni partilerde reviewed turunun koştuğu günün git tarihi (`git log -1 --date=short`) kullanılır.
- `pending`/`drafted` kayıtlarda `reviewedAt` **bulunmaz**.
- `reviewStatus` alanı **açılmadı** — kod `qaStatus`'a bakıyor.

## ⭐ Kullanıcıya görünen yüz — "Kaynaklar ve Yöntem" ekranı (commit `17c24d8`)
Editör metadata'sı gizli kalır; yöntem Profil > Hakkında altında açıkça yazılır. Metin kasıtlı olarak **mutlak değil**:

> "Kanji Atlas'taki köken ve tarihsel açıklamalar, güvenilir Japon sözlükleri ve akademik etimoloji kaynakları **çapraz doğrulanarak** hazırlanır. Kaynaklar arasında görüş ayrılığı bulunan durumlarda **en muhafazakâr yorum** tercih edilir; yeterli güven oluşmuyorsa **kesin bir açıklama verilmez**."

- "Her köken esas Japon sözlük referansından yazılır" gibi **kesin iddiada bulunulmaz**.
- Kaynaklar isimle listelenir: Kanjipedia · Dong Chinese · Wiktionary · OKJiten. İleride ekleme olursa metin yeniden yazılmaz, listeye satır eklenir.

## Kurallar
- **Karakter-sayfası URL'si** kaydedilir.
- **"Kaynak ne diyor" ≠ "benim çıkarımım"** — ayrı. Kaynak söylemiyorsa amaç/neden UYDURMA.
- **⭐ Çapraz kaynak alıntıları da doğrulanır (Zeynep, 2026-07-25 · KİLİTLİ):** *Esas kaynak dışındaki çapraz kaynaklardan kullanılan doğrudan alıntılar da erişilip birebir doğrulanır; bellekten alıntı yazılmaz.*
  - Bu **yeni bir metodoloji kuralı değil**, yukarıdaki "kaynağın söylediği ile editoryal çıkarımı ayır" kuralının **operasyonel tanımıdır**.
  - Gerekçe (yaşanmış): Parti 7/8'de 説文解字 alıntıları fetch edilmeden bellekten yazıldı; 土'nunki birebir değildi (metinde olmayan 萬 eklenmiş, olan 丨 atlanmış). Görünür metni etkilemedi ama **denetim izinde doğrulanmamış bir doğrudan alıntı** bulunuyordu — asıl sorun buydu. Düzeltme: `920e5fd` (DATA) + Parti 7/8 QA raporlarında 友 ve 土 alıntıları. Kapsam ölçüldü, yalnız gerçek hatalar düzeltildi (口 · 九 · 母 · 生 · 名 · 行 doğru çıktı).
- **⭐ "Sistemde X yok/var" iddiaları da ÖLÇÜLÜR (B0'ın genişletilmiş hâli, 2026-07-25):** Parti 9'da "会意形声 veri setinde hiç kullanılmamış" denildi — **ölçülmeden**, ve yanlıştı (季 kaydında Parti 2'den beri var). Veri/sistem hakkındaki her olgusal iddia `DATA.chars` üzerinden ölçülür.
- **Anlaşmazlıkta:** sessizce taraf seçme → `disagreementNote` + ihtiyatlı dil VEYA yayınlama. İki tarihsel biçimi düzleştirme.
- **Kullanıcı metninde tartışma gösterilmez.** "Kesin değildir / farklı görüşler vardır" ifadeleri `summaryTr`'ye **girmez**. Seçenek ikidir: düz yaz, ya da **boş bırak**.
- **Eski-biçim görseli:** yalnız kaynak + provenance + dönem + **lisans** doğrulanmışsa. Kaynaksız glif üretme.

## ⭐⭐ EK KURAL — ÇIKARILABİLİR AYRINTI TESTİ (Zeynep, 2026-07-25 · KİLİTLİ · 父 emsali)

Kaynaklar bir kayıtta ayrışıyorsa, **önce ayrışan şeyin ne olduğu sorulur:**

| Ayrışan şey | Ne yapılır | Örnek |
|---|---|---|
| Kaydın **OMURGASI** (çıkarılırsa geriye anlamlı metin kalmaz) | ESAS izlenir, **confidence B**, çatal `disagreementNote`'ta | 行 (kavşak ↔ 彳+亍) · 来 (ödünç ↔ 天所來) · 土 (yığın ↔ katman) |
| **ÇIKARILABİLİR bir AYRINTI** (çıkarılınca köken zinciri ayakta kalır) | Ayrıntı **görünür metne alınmaz**; yalnız uzlaşılan çekirdek yayımlanır | **父** (nesne balta mı, değnek mi?) |
| Tartışmalı kısım çıkarılınca **hiçbir şey kalmıyorsa** | Yayınlanmaz — `drafted`/`pending` | 九 |

**Uygulama testi (Zeynep'in "kaynak kadar konuş" sırası):** kayıt alt iddialara bölünür, her biri için "kaynaklar bunda ortak mı?" sorulur, **ilk ORTAK OLMAYAN iddiada durulur.** 父'de: (a) el ✅ · (b) elde bir nesne ✅ · (c) otorite ✅ · (d) "baba" anlamı ✅ · (e) nesne **balta** mı? ❌ → tam orada duruldu.

**Ölçüt:** *"Bu ayrıntı metnin anlaşılması için zorunlu mu?"* Zorunlu değilse ve tartışmalıysa → yayın dışı. Zeynep: *"'Balta' yazmak kullanıcı açısından hiçbir şeyi çözmüyor; ama biri 'neden balta?' diye sorduğunda cevap 'çünkü Kanjipedia öyle diyor' olmuyor — 'kaynaklar burada tam uzlaşmıyor' oluyor. O zaman kullanıcıya baştan kesinmiş gibi söylemek gereksiz."*

⚠️ Bu kural, ESAS kaynağı izleme desenini **iptal etmez, sınırını çizer.** Bilgi de kaybolmaz: ayrıntı dört kaynağıyla `disagreementNote`'ta durur. Bu, **"yayımlanan iddia" ile "araştırma notu"nun ayrılmasıdır.**

## Confidence (`etymology.confidence`)
| Sınıf | Anlam | Yayın |
|---|---|---|
| **A** | İki güvenilir/resmî uyumlu | Yayınla |
| **B** | Genel kabul, ayrıntı değişebilir | Yayınla (ihtiyatlı) |
| **C** | Ciddi görüş ayrılığı | Kesin sunma (ihtiyatlı/pending) |
| **D** | Yalnız öğretim hikâyesi | Etimoloji alanına giremez → etiketli mnemonic |
| **X** | Doğrulanmadı | YAYINLANMAZ (pending) |

**⭐ Confidence NEYİ ölçer (Zeynep, 2026-07-25 · KİLİTLİ · 父 turunda netleşti):** confidence **YAYIMLANAN metnin kaynak desteğini** temsil eder — araştırmanın tümünün kesinliğini değil. Tartışmalı bir ayrıntı görünür metinden çıkarıldığında confidence **yükselebilir** (父: B → **A**), çünkü kullanıcıya gösterilen hiçbir cümle artık tartışmalı değildir. Kayıt "kırmızı kuyruktan gelmiş" olmayı sürdürür ve çatal `disagreementNote`'ta durur; ama yayımlanan içeriğin güvenilirliği ayrı bir ölçüdür.

**Pratik ölçüt (Parti 7–9'da yerleşti):** kayıt alt iddialara bölünür, **en zayıf halka** bütünü belirler — *yayımlanan iddialar arasındaki* en zayıf halka. Esas kaynak net olsa bile çapraz kaynak farklı bir **yapı/oluşum** okuması sunuyorsa → **B** ("görünür metni engellemez fakat A'yı gereksiz iddialı kılar"). Örnekler: 行, 食 (oluşum çatalı) · 土 (resmedilen nesne çatalı) · 赤 (bileşen rolü çatalı) · 名 (bileşen anlamı çatalı).

## qaStatus yaşam döngüsü (KİLİTLİ — yazan ≠ onaylayan)
```
pending   → hiç yazılmadı VEYA bilerek boş bırakıldı (kod: köken GİZLİ)
drafted   → metin + kaynak girildi; QA GEÇMEDİ (kod: köken hâlâ GİZLİ)
reviewed  → ayrı QA turu tamam (kod: köken GÖRÜNÜR) + reviewedAt yazılır
```
- **Tek işlem yazıp aynı anda "reviewed" ilan edemez.** İki ayrı tur şart (yaz → ayrı denetle), ayrı commit'lerle.
- Kod enforce eder: `kokenOf` yalnız `reviewed`'da summaryTr'yi döndürür.
- **Bilerek boş bırakılan kayıt** `pending` + `summaryTr:""`; bulgular `disagreementNote`'ta saklanır.
- **Not (şema nüansı):** 5 kayıtta (大 天 夫 本 国) `qaStatus:"reviewed"` var ama `summaryTr` yok — v2 iskele turunda metadata onaylandı, görünen köken hâlâ legacy `pictogram_note`'tan geliyor. Editoryal Uyumlama fazında ele alınacak.

## Oluşum türleri — ÖLÇÜLDÜ (`aaea831` sonrası, `DATA.chars`)
`象形` **17** · `形声` **9** · `会意` **8** · `指事` **6** · **`会意形声` 1** (季, reviewed 2026-07-24, Parti 2'den beri canlı).
- **Beş tür de meşrudur.** `会意形声` yeni/istisnai değil — Kanjipedia'nın kendi sınıflandırması ve veri setinde zaten kullanımda.
- **`formationType` saf editör metadata'sıdır:** hiçbir render yolunda veya smoke suite'inde kullanılmıyor, kullanıcı metnine girmiyor. Yeni tür eklemek şema kararı gerektirmez.
- ⚠️ **Apply betikleri için not:** `apply_authoring_9.js`'e kadar yazılan doğrulama whitelist'leri yalnız dört türü içeriyordu. **Bundan sonraki betiklerde whitelist `会意形声`'yi de içermelidir** (`["象形","指事","会意","形声","会意形声"]`).

## QA turunda kontrol (6 madde)
1. Tarihsel doğruluk · 2. Bileşen rolleri · 3. Kaynak yeterliliği (**Kanjipedia karakter sayfası var mı? Çapraz alıntılar fetch edildi mi?**) · 4. Türkçe sadeliği · 5. Köken–mnemonic tekrarı · 6. Sistem tutarlılığı.

## Kayıt alanları
`etymology`: `formationType, formationTypeSource, confidence, sources[], disagreementNote, summaryTr, qaStatus, reviewedAt`. `readings`: `officialOn/Kun, taughtOn/Kun, deferred[], irregularWords[], source`.

## İlke (kapanış)
**Doğrulanamayan alanı boş bırakmak, kulağa hoş gelen hikâye uydurmaktan iyidir.**
