# Kanji İçerik Denetimi — BATCH 1 RAPORU (8 yüksek riskli 形声)

> Karakterler: 語 校 晴 話 読 聞 電 何. Revize yöntemle (R1–R7, `KANJI-DENETIM-YONTEM-KILITLI.md`). **Kod/DATA/CSS/metin DEĞİŞMEDİ.** CSV: `KANJI-CONTENT-AUDIT-BATCH1.csv`. Batch sonunda DURULDU, Zeynep onayı bekleniyor.
> Branch `onboarding-b2-gate3` · HEAD `2efd279` · 2026-07-24.

## 1. Manşet bulgu — yanlış roller OYUNLARA yayılıyor (P0 kanıtı)
Rubrik R2: "yanlış bileşen rolü Atlas/oyun/SRS'e yayılıyorsa P0 (kanıtlanarak)." **Kanıt bulundu (read-only kod denetimi):**
- `component_meanings` detay kartında render ediliyor (index.html ~3461).
- **İki oyun havuzu** — comp-select (~5143) ve **Kanji Atölyesi/atolye** (~5225) — `components.every(c=>component_meanings[c])` filtresiyle her parçası anlamlandırılmış kanjileri havuza alıp parçaları "karakter (anlam)" olarak gösteriyor (satır 5171-5172, 5230-5233).
- Batch-1'in 8 karakterinin tümü bu filtreyi geçiyor → yanlış glosslar (可=olabilir, 門=kapı, 舌=dil, 五=beş, 口=ağız, 交=kavşak, 青=mavi-yeşil, 売=satmak) **oyunda aktif olarak yanlış öğretiliyor.**
Sonuç: yanlış-fonetik-rol taşıyan **7 kanji P1→P0'a yükseldi.** Bu, sorunun kozmetik değil sistematik yanlış-öğretim olduğunu kanıtlıyor — denetimin değerini pilottan da güçlü doğruluyor.

## 2. Sonuç tablosu
| Kanji | Formasyon | Fonetik (yanlış etiketli) | Verdict | Severity |
|---|---|---|---|---|
| 語 | 形声 | 吾 → app 五+口'ya bölüp "beş/ağız" demiş | REWRITE | **P0** |
| 校 | 形声 | 交 (kō) → "kavşak" | REWRITE | **P0** |
| 晴 | 形声 | 青 (sei) → "mavi-yeşil" | REWRITE | **P0** |
| 話 | 形声 | 𠯑 (舌 değil) → "dil" | REWRITE | **P0** |
| 読 | 形声 | 𧶠 (売 sadeleşmişi) → "satmak" | REWRITE | **P0** |
| 聞 | 形声 | 門 (bun) → "kapı" | REWRITE | **P0** |
| 何 | 形声 | 可 (ka) → "olabilir" | REWRITE | **P0** |
| 電 | 会意形声 | 电 = şimşek **savunulabilir** | KEEP_WITH_MINOR_EDIT | P2 |

Dağılım: Severity 7×P0, 1×P2 · Action 7×REWRITE, 1×KEEP · Güven **8×A** (tümü Kanjipedia birincil + çapraz teyit; hiç B/C/D/X yok) · Formasyon 7×形声, 1×会意形声.

## 3. Ek P1/P2 bulguları (P0'ların içinde katmanlı)
- **Okuma çelişkisi (R2 → P1):** 話 kendi örneği 話=**hanashi** (はなし) öğretilmeyen kun'u kullanıyor · 何 örnekleri 何時=**nanji**/何人=**nannin** öğretilmeyen なん'ı kullanıyor. Karakterler zaten P0; bu, düzeltmede okuma alanına da dokunulacağını gösterir.
- **Katman çökmesi (KÖKEN=HINT birebir):** 話, 聞, 電 (電'de tek kusur bu).
- **Boş köken:** 語, 校, 読, 何 → KÖKEN/HINT tamamen boş; oyunlarda yalnız (yanlış) bileşen glossları görünüyor. Düzeltmede köken YAZILACAK (uygulama fazı).
- **component sırası:** 聞 = [門,耳] ama anlam çekirdeği 耳; Aile Şeridi 耳 üzerinden kurulmalı.
- **電 nüansı doğru ele alındı:** 电 aslen şimşek piktogramı olduğundan "şimşek" glossu meşru — 時 hatasıyla karıştırılmadı (会意形声).

## 4. Eski → Önerilen kullanıcı metni (sade, N5, teknik terim yok → rozet)
- **語:** "言 (söz) anlamı verir; 吾 okunuşu (go) taşır — anlam değil." · rozet: *Anlam + ses karakteri*
- **校:** "木 (ağaç) + 交 (ses: kō). Eski anlamı ahşap çit; zamanla okul." · rozet: *交 = ses*
- **晴:** "日 güneş anlamı; 青 okunuşu (sei) taşır. Açılan gökyüzü: açık hava." · rozet: *青 → sesi verir*
- **話:** "言 (söz) anlamı verir: konuşmak. Sağ parça anlamı değil okunuşunu taşır."
- **読:** "言 (söz) anlamı verir; sağ parça sesi taşır. Yazıyı okumak."
- **聞:** "耳 (kulak) anlamı verir: duymak. 門 okunuşu (bun) taşır."
- **何:** "Aslen yük taşıyan insan; 可 sadece 'ka' sesini verir. Sonra 'ne' sorusu olmuş."
- **電:** (mevcut doğru) "Gökten inen şimşek → elektrik." + HINT tekrarını kaldır.

## 5. Yöntem tutarlılık QA (pilot ile)
- 8 ajan aynı şablonu üretti; normalize sorunsuz. Pilotla tutarlı: 形声 hata sınıfı 時'de öngörüldü, batch'te 7/8 tekrar etti — **kalıp doğrulandı.**
- Kontrol davranışı korundu: 電 gereksiz yere REWRITE'a zorlanmadı (savunulabilir → KEEP+P2). Yöntem "her şeyde hata bul"muyor.
- R5 (uydurma yok) tuttu: 何'de "insan+yük → ne" zorlama bağı kurulmadı, ödünçleme olduğu belirtildi.
- R4 (sade kullanıcı metni) tuttu: 形声 terimi kullanıcı metnine girmedi, rozet/açılır önerildi.
- **Propagasyon kanıtı** rubriği gerçek P0/P1 ayrımına bağladı — pilotta açık kalan soru bu batch'te kodla kapatıldı.

## 6. Kaynak kapsamı & maliyet
- Kanjipedia karakter sayfaları **8/8 doğrudan** çekildi (birincil etimoloji = sağlam). Wiktionary bazı sayfalarda cache-only → jitenon/okjiten/Kanshudo/Definify ile çapraz teyit; sessiz ikame yok, işaretlendi.
- 文化庁 音訓索引 doğrudan çekilemedi → Jōyō okuma seti jitenon 常用 etiketleriyle teyit (R1 gereği boşluk değil).
- Maliyet: 8/8 low–low-med, ~2-5 fetch/kanji, ~44k token/ajan. Ölçekleme sağlam; 91 kalanı benzer partilerle yapılabilir.
- Tartışmalı: yalnız 電 (会意形声 vs 形声) ve 校 (形声 vs 会意兼形声) — ikisi de birincil (Kanjipedia) kuralıyla çözüldü, kullanıcıya etki yok.

## 7. Karar (batch sonunda DUR)
Batch 1 bitti, kod değişmedi. **7/8 P0** (oyunlara yayılan yanlış-rol) — bu, içerik düzeltmesinin gerçekten P0 iş olduğunu kanıtlıyor. Onaylarsan Batch 2'ye (kart-içi okuma çelişkileri) geçerim. Not: bu P0'ların UYGULANMASI ayrı faz (Migration penceresi) — şimdi yalnız denetim.
