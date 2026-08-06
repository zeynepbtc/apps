# Onboarding Yeniden Tasarım — Adım 3: Code-Free Akış Seçenekleri

> **Kapı:** Adım 2'de kilitlenen 14 bulguya dayanır. **Kod YOK, uygulama YOK.** Yalnız koru/kaldır/birleştir kararları + aday akışlar + karşılaştırma. Seçim Zeynep'te; seçilen akış onaylanınca R2-A metin doğruluğu (Adım 5) ve uygulama (Adım 7) ayrı kapılarda.
> Kaynak envanter: `ONBOARDING-envanter-adim1.md` (production `index.html` @ `ae742f6`). 8 ekran, `OB_TOTAL_STEPS=8`.

---

## 1. Ana fikir — iki çelişen karar-ağacını TEK modele indir (Bulgu 10)

Envanterin en kritik gerçeği: yönlendirme **iki ayrı ve çelişen mantıkla** yapılıyor.

- **A) "Başla" hedefi** = `deriveEntryPath(level)` → yalnız `level` (motivation/style/name yok sayılır)
- **B) Home önerisi** = `recommendedStart(level+style)` → farklı girdi, farklı sonuç

Aynı kullanıcı için ikisi uyuşmuyor (örn. `explorer`: A→harita, B→games). Her akış seçeneğinin **değişmez omurgası**: bu ikisi **tek karar modeline** iner. Girdi yalnız **yetkinlik** (kullanıcı ne biliyor), çıktı `startTarget`. Hem "Başla" hem Home önerisi **aynı** çıktıyı kullanır. Böylece metin-hedef çelişkisi (R5) kaynağında biter.

**Tek karar modeli (kavramsal — kod değil):**

| Yetkinlik (kullanıcı der ki) | `startTarget` (gerçek hedef) | Final ekran ne der | Bulgu |
|---|---|---|---|
| "Japoncaya hiç dokunmadım" | Kana / **あ** yazma | "あ ile başlıyoruz" (dürüst, uyumlu) | 1 |
| "Birkaç kana biliyorum" | Kana (tekrar/devam) | kana; alternatif: kanjiye göz at | 1 |
| "Kana'yı biliyorum, kanji istiyorum" | Kanji ailesi (**木**) / Atlas | kanji; alternatif: kana tekrarı | 1, 2 |
| "İleri / kendi yolumu seçerim" | Atlas haritası **veya** Home | "Seni doğrudan Atlas'a bırakıyoruz" — vaat şişirme YOK | 2, 12 |

Not: eski `explorer` niyeti (son satır) artık **seviye değil**; "biliyorum + kendim gezerim" olarak dürüst bir çıkış. あ vaat etmez (Bulgu 2 + 12).

---

## 2. Mevcut 8 ekran → koru / kaldır / birleştir

| # | Mevcut ekran | Karar | Bulgu | Gerekçe |
|---|---|---|---|---|
| 1 | Karşılama | **KORU** | 14 | Tek cümlelik giriş; değeri geciktirmez |
| 2 | İsim | **KALDIR** (zorunlu akıştan) | 3 | Erken/gereksiz; istenirse ilk değerden sonra veya profilde |
| 3 | Motivasyon | **KALDIR** | 4 | Toplanıp hiçbir karara girmiyor; ancak fonksiyonel olursa döner |
| 4 | Seviye | **DÖNÜŞTÜR → "Yetkinlik"** (tek karar) | 1, 2, 10 | `explorer` seviyeden çıkar; yalnız bilgi düzeyi; **tek** yönlendirme girdisi |
| 5 | Katakana "milk" quiz | **KALDIR** | 5 | Kullanıcı kararı üretmiyor; yeni başlayana kötü giriş. Katakana Şifreleri modülü öğrenme aracında **kalır** |
| 6 | Üç yazı sistemi | **KORU (koşullu)** + yeniden yaz | 6, 7, 8 | Yeni başlayana göster, bilene atlanır; metin R2-A'da düzeltilir |
| 7 | Öğrenme stili | **KALDIR (ölçüm)** — en fazla değiştirilebilir tercih | 9 | Stil ölçülmez; en fazla bloklamayan bir başlangıç tercihi |
| 8 | Final "Başla" | **YENİDEN YAZ** | 10, 11, 12, 13 | Gerçek hedef + neden + alternatif(ler) + "Atla → Home" açık |

**Birleştir:** "Başla" hedefi + Home önerisi → **tek `startTarget` modeli** (girdi yalnız Yetkinlik). Envanterdeki A ve B ağaçları tek fonksiyona iner.

---

## 3. Aday akışlar (üç seçenek — code-free)

Üçü de **tüm sert bulguları** karşılar (aşağıda kontrol). Fark **yumuşak tercihlerde**: omurganın ötesinde ne kadar kişiselleştirme/dallanma.

### Seçenek A — Çekirdek (en sade)
```
Karşılama → Yetkinlik (tek karar) → [yalnız yeni başlayan: Üç yazı sistemi] → Final (gerçek hedef + neden + alternatif)
```
- **Ekran sayısı:** yeni başlayan 4, bilen 3.
- **Kaldırılan:** isim, motivasyon, katakana quiz, öğrenme stili — hepsi.
- **İleri kullanıcı:** Final ekrandaki "alternatif/Atla" ile Atlas/Home'a. Ayrı dal yok.
- **Artı:** en hızlı değere ulaşma (Bulgu 14); sıfır kullanılmayan veri; en az yüzey.
- **Eksi:** hiç kişiselleştirme yok (isim selamı gider); ileri kullanıcı için özel dal "birinci sınıf" değil.

### Seçenek B — Çekirdek + Dürüst Dallanma  ⭐ (önerilen)
```
Karşılama → Yetkinlik (tek karar)
   ├─ yeni başlayan → Üç yazı sistemi → Final(あ, dürüst)
   ├─ kana biliyor  → (yazı sistemi atlanır) → Final(kanji/Atlas + alternatif)
   └─ ileri/kendi yolu → Final(Atlas/Home, vaat şişirme YOK) — ya da doğrudan Home
```
- **Ekran sayısı:** yeni başlayan 4, diğerleri 3 (üç ayrı dürüst çıkış).
- **Kaldırılan:** isim, motivasyon, katakana quiz, öğrenme-stili-ölçümü.
- **İleri kullanıcı:** açık, birinci sınıf dürüst dal (Bulgu 12); "Atla" da açıkça "Home'a gidersin" (Bulgu 13).
- **Artı:** her kullanıcı doğru derinliği alır; tek karar modeli; hiçbir ölçüm/kullanılmayan veri yok; dürüstlük (Bulgu 11, 12) omurgada.
- **Eksi:** A'ya göre bir tık daha çok dal → tasarım/doğrulama biraz artar (yine de küçük).

### Seçenek C — B + Değiştirilebilir Tercih (hafif kişiselleştirme)
B'nin dürüst dallanması + iki opsiyonel, **bloklamayan** ekleme:
- Tek "başlangıç tercihi" (adım-adım / oyunla / karışık) — **ölçüm değil**, sonradan değiştirilebilir, akışı durdurmaz (Bulgu 9'un "en fazla değiştirilebilir tercih" izni). Final ekranda veya Home'da yüzeye çıkar.
- İsim, **ilk değerden sonra** veya profilde istenir (Bulgu 3: erken sormamak). Zorunlu akışta değil.
- **Artı:** biraz sıcaklık/kişiselleştirme, hiçbir sert bulguyu ihlal etmeden.
- **Eksi:** en çok yüzey; "tercih"in gerçekten davranışı etkilemesi gerekir yoksa motivasyon hatasına (Bulgu 4) düşer.

---

## 4. 14 bulgu × seçenek kontrolü

| Bulgu | A | B | C | Nasıl karşılanıyor |
|---|---|---|---|---|
| 1 sıfır-kullanıcı merkezli değil | ✓ | ✓ | ✓ | Yetkinlik sorusu bilen kullanıcıyı doğru yönlendirir |
| 2 explorer seviye değil | ✓ | ✓ | ✓ | "sen yönlendir" yetkinlik seçeneği olmaktan çıkar |
| 3 isim erken sorulmaz | ✓ (yok) | ✓ (yok) | ✓ (ertelenir) | — |
| 4 motivasyon zorunludan çıkar | ✓ | ✓ | ✓ | Kaldırıldı (fonksiyonel olmadıkça dönmez) |
| 5 katakana quiz çıkar | ✓ | ✓ | ✓ | Onboarding'den çıkar; modül kalır |
| 6 üç sistem koşullu | ✓ | ✓ | ✓ | Yeni başlayana göster, bilene atla |
| 7 "hece" deme (kana=mora) | ✓ | ✓ | ✓ | Metin R2-A'da kilitlenir (sert kısıt) |
| 8 "Kanji ses değil anlam" yeniden yaz | ✓ | ✓ | ✓ | R2-A metin pass |
| 9 stil ölçme | ✓ (yok) | ✓ (yok) | ✓ (değiştirilebilir tercih) | — |
| 10 tek karar modeli | ✓ | ✓ | ✓ | `startTarget` — "Başla" + Home önerisi aynı model |
| 11 final: gerçek hedef+neden+alternatif | ✓ | ✓ | ✓ | Final ekran yeniden yazılır |
| 12 ileri kullanıcıya dürüst yol | ~ (final içinde) | ✓ (açık dal) | ✓ (açık dal) | B/C birinci sınıf dal yapar |
| 13 "Atla" gizli değil → Home der | ✓ | ✓ | ✓ | Açık etiket |
| 14 değeri geciktirme / ders modülü olma | ✓✓ | ✓ | ✓ | Daha az ekran = daha hızlı değer |

Sert kısıtlar (5, 7, 8, 10, 11, 13, 14, 2, 1) **üç seçenekte de** karşılanıyor. Fark yalnız yumuşak seçimlerde (3, 4, 9, 12).

---

## 5. Öneri

**Seçenek B — Çekirdek + Dürüst Dallanma.** Gerekçe: 14 bulgunun tümünü en az yüzeyle ve en dürüst şekilde karşılar; tek karar modelini omurgaya koyar; ileri kullanıcıya birinci sınıf dürüst yol verir (A'nın zayıf yanı); C'nin eklerini yeniden tasarım gerektirmeden sonradan üstüne koyabiliriz. C'nin "başlangıç tercihi" ve "ertelenmiş isim" eklerini **omurgayı değiştirmeden opsiyon** olarak açık tutuyorum.

Home önerisi (öner-kısıtlama-yok ilkesi) korunur; yalnızca artık **aynı** `startTarget` modelinden beslenir.

---

## 6. Bir sonraki kapıda kilitlenecek kararlar

1. **Seçenek:** A / B (önerilen) / C?
2. **İleri/kendi-yolu hedefi:** Atlas haritası mı, Home mu? (öner-kısıtlama-yok ilkesiyle ikisi de meşru)
3. **Yetkinlik seçenek sayısı ve etiketleri:** 3 mü 4 mü? (kesin metin R2-A'da)
4. **İsim (yalnız C):** tamamen kaldır mı, ilk değerden sonra/profilde iste mi?
5. **Motivasyon:** kalıcı kaldır mı, ileride fonksiyonel kullanım için beklet mi? (öneri: şimdilik kaldır)

## 7. Adım 3 kapsamı DIŞI (sonraki kapılar)
- Üç yazı sistemi ekranının **kesin metni** (kana=mora, "anlam taşır") → R2-A doğruluk pass (Adım 5).
- Tipografi/hiyerarşi (R3, "önce temel seslerle…" vurgusu) → Adım 6.
- State/kod/`deriveEntryPath`/`recommendedStart` uygulaması → Adım 7 (fixture + staging kapılı).
