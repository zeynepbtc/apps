# Kanji Atlas — Resmî Okuma Kümeleri Eksiksizlik Denetimi

**Durum:** LOCKED SPEC — Zeynep 2026-08-08 başlangıç onayı  
**Tür:** Salt-okunur içerik/veri denetimi  
**Taban:** `5840010ed00b1d4faab3bdac96e1f0ee10823226`  
**Kaynak dal:** `codex/kanji-atlas-coordination`  
**Sahiplik:** Codex spec/bağımsız kapı · Claude ölçüm/kanıt · Zeynep pedagojik karar  
**Yetki:** `DECISION-004-READINGS-DATA-MODEL.md` v3

> Bu tur hiçbir kanji okumasını, `readings` alanını, testi, jeneratörü veya kullanıcıya görünen
> içeriği değiştirmez. Amaç yalnız 11 tam iskeleli kaydın `officialOn` / `officialKun`
> kümelerini resmî kaynağa karşı ölçmek ve sonraki küçük düzeltme turlarını kanıta bağlamaktır.

---

## 1. Tek yetkili kaynak

`officialOn` / `officialKun` kapsamını yalnız aşağıdaki resmî kaynak belirler:

- 文化庁 — 常用漢字表（平成22年内閣告示第2号）
- Açıklama sayfası:
  `https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/kanji/`
- Resmî PDF:
  `https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/pdf/joyokanjihyo_20101130.pdf`
- Resmî音訓 indeksi yalnız bulma/doğrulama yardımcısıdır:
  `https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/kanji/joyokanjisakuin/index.html`

Jitenon, Kanjipedia ve diğer sözlükler yalnız çapraz kontroldür. Resmî kümeyi genişletemez
veya daraltamaz. Resmî PDF ile bir çapraz kaynak çelişirse PDF kazanır; fark raporda kaybolmaz.

### Kaynak okuma kuralları

1. Her karakterin **本表** satırındaki bütün 音 ve 訓 değerleri alınır.
2. 音 katakana, 訓 hiragana olarak sınıflandırılır.
3. Tire, okurigana, parantez ve gönderme işaretleri önce ham biçimiyle kaydedilir; uygulamanın
   `おお(きい)` gösterimine dönüştürme ayrı `normalized` sütununda açıkça gösterilir.
4. Bir okuma yalnız örnek kelimede görünüyorsa ama 音訓 sütununda ayrı değer değilse kümeye
   kendiliğinden eklenmez.
5. 付表 / 熟字訓 / jukujikun kelime düzeyindedir; `official*` kümesine girmez ve ayrı not edilir.
6. 小学校 / 中学校 ayrımı resmî kümeden okuma çıkarma gerekçesi değildir.
7. Emin olunmayan PDF satırı `UNRESOLVED` olur; sözlükten tahminle doldurulmaz.

---

## 2. Denetlenecek kapalı kayıt listesi

Yalnız aşağıdaki 11 kayıt denetlenir:

| id | Kanji | Mevcut `officialOn` | Mevcut `officialKun` |
|---|---|---|---|
| `hito` | 人 | ジン・ニン | ひと |
| `dai` | 大 | ダイ・タイ | おお(きい) |
| `tsuki` | 月 | ゲツ・ガツ | つき |
| `yon` | 四 | シ | よん・よ(つ) |
| `kyuu` | 九 | キュウ・ク | ここの(つ) |
| `otoko` | 男 | ダン・ナン | おとこ |
| `ashi` | 足 | ソク | あし・た(りる) |
| `ato` | 後 | ゴ | あと・うし(ろ) |
| `sei` | 生 | セイ | い(きる)・う(まれる) |
| `hanasu` | 話 | ワ | はな(す)・はなし |
| `nani` | 何 | カ | なに・なん |

Kalan 87 kayıt, `taught*`, yüzey `onyomi/kunyomi`, örnekler, romaji, ses, köken ve mnemonic
bu turun dışındadır.

---

## 3. Zorunlu teslim tablosu

Her kayıt için tek satır ve aşağıdaki sütunlar zorunludur:

| Alan | İçerik |
|---|---|
| `id` / `kanji` | Depodaki kimlik ve karakter |
| `sourcePage` | PDF sayfa numarası + mümkünse satır/ekran görüntüsü adı |
| `officialRawOn` | Resmî tabloda görülen bütün 音 değerleri, ham yazım |
| `officialRawKun` | Resmî tabloda görülen bütün 訓 değerleri, ham yazım |
| `normalizedOn` | DECISION-004 N-1…N-7 biçimine dönüştürülmüş öneri |
| `normalizedKun` | DECISION-004 N-1…N-7 biçimine dönüştürülmüş öneri |
| `currentOn` / `currentKun` | Depodaki mevcut değerler |
| `missingOn` / `missingKun` | Resmî olup depoda bulunmayanlar |
| `extraOn` / `extraKun` | Depoda olup resmî tabloda bulunmayanlar |
| `notationOnly` | Küme aynı, yalnız yazım/okurigana farkı varsa açık kayıt |
| `fuhyoOrIrregular` | Varsa kelime düzeyindeki ayrı okuma; kümeye katılmaz |
| `verdict` | `PASS` · `MISSING` · `EXTRA` · `NOTATION` · `UNRESOLVED` |

Bir karakterde birden fazla kusur varsa tek genel hüküm ayrıntıları gizleyemez; her fark kendi
sütununda görünür.

---

## 4. Kanıt dosyaları ve izinli yollar

Claude yalnız aşağıdaki yeni yolları oluşturabilir:

1. `_AGENT_EXCHANGE/claude/reports/2026-08-08-READINGS-OFFICIAL-COMPLETENESS-AUDIT.md`
2. `_AGENT_EXCHANGE/claude/evidence/2026-08-08-readings-official-completeness/`
   - `current-readings.json`
   - `official-readings.json`
   - `comparison.json`
   - `source-pages.txt`
   - gerekli 11 karaktere ait PDF sayfa görüntüleri veya kırpımları
   - `commands-and-tool-versions.txt`
   - `git-status-before.txt`
   - `git-status-after.txt`
   - `product-sha-before-after.txt`
3. Bir Claude planı gerekiyorsa yalnız:
   `_AGENT_EXCHANGE/claude/plans/2026-08-08-READINGS-OFFICIAL-COMPLETENESS-AUDIT-PLAN.md`

Ürün, test ve karar dosyaları değişemez. Bu Codex spec dosyası Claude tarafından düzenlenemez.

---

## 5. Uygulama sırası

1. HEAD, dal ve temiz ağaç kaydedilir.
2. `index.html`, `_faz2/data_chars.json`, `_faz2/content_manifest.json` SHA-256 değerleri
   başlangıç kanıtına yazılır.
3. 11 mevcut kayıt doğrudan `index.html DATA.chars` üzerinden JSON kanıtına çıkarılır.
4. Resmî PDF yerel kanıt kopyasına indirilir; dosyanın URL, indirme zamanı, boyut ve SHA-256
   değeri kaydedilir.
5. Her karakter PDF üzerinde bulunur; ilgili sayfa numarası ve ham 音訓 değerleri kaydedilir.
6. Ham değerlerden normalleştirilmiş değerler ayrı, denetlenebilir dönüşüm olarak üretilir.
7. Mevcut ve resmî kümeler sıra bağımsız karşılaştırılır.
8. İnsan okunur rapor ve makine okunur `comparison.json` aynı sonuçları vermelidir.
9. Ürün dosyalarının başlangıç/son SHA-256 değerleri karşılaştırılır.
10. Tam `git status --porcelain --untracked-files=all` raporlanır; yalnız §4 yolları yeni olabilir.
11. Commit, push veya sonraki düzeltme turu başlatılmaz; Codex denetimi beklenir.

---

## 6. Kabul kriterleri

1. 11/11 kayıt raporda ve JSON karşılaştırmada bulunur; eksik/çift kayıt yoktur.
2. Her kayıt resmî PDF sayfasına izlenebilir; yalnız sözlük atıflı kayıt FAIL olur.
3. Ham resmî okuma ile normalleştirilmiş uygulama yazımı birbirinden ayrıdır.
4. `missing`, `extra` ve `notationOnly` farkları otomatik küme karşılaştırmasıyla yeniden
   üretilebilir.
5. 付表/jukujikun değerleri kanji okuma kümelerine sızmaz.
6. `taughtOn`, `taughtKun`, yüzey alanları ve `deferred` gerekçeleri hakkında bu turda karar
   verilmez veya değişiklik önerisi uygulanmaz.
7. Üç ürün dosyasının başlangıç/son SHA-256 değerleri birebir aynıdır.
8. Ürün/test diff'i sıfırdır; yalnız §4 rapor/kanıt yolları bulunur.
9. Rapor açıkça sonraki uygulama gruplarını **öneri** olarak sınıflandırabilir, ancak hiçbir
   grubu uygulamaya yetkili sayamaz.
10. Claude commit/push yapmadan durur; Codex ham kanıtı bağımsız yeniden ölçer.

---

## 7. Beklenen riskler

- PDF metin çıkarımı sütunları veya okurigana düzenini bozabilir. Görsel sayfa kanıtı olmadan
  yalnız OCR/metin çıktısı kabul edilmez.
- Aynı kana dizisinin örnek kelimede görünmesi onun bağımsız 音訓 değeri olduğunu kanıtlamaz.
- `四` gibi ses değişimleri ve küçük っ, resmî ham yazım ile uygulama normalizasyonunun
  karıştırılmasına açıktır; `notationOnly` alanı bu yüzden zorunludur.
- `生` çok sayıda okuma taşır ve tek toplu düzeltmeye uygun olmayabilir; bu denetim yalnız
  ölçer, pedagojik kapsamı belirlemez.
- `何 / カ` resmî kümede bulunabilir ancak öğretilme kararı ayrı pedagojik kapıdır.

---

## 8. Bu turdan sonra

Codex denetimi sonucunda yalnız şu sınıflardan biri açılır:

1. **Mekanik küçük düzeltme grubu:** resmî kaynak açık, normalizasyon tartışmasız.
2. **Karmaşık karakter turu:** örneğin `生`, ayrı kanıt ve pedagojik sınıflandırma.
3. **Pedagojik karar:** resmî olup v1'de öğretilmeyecek okumaların `deferred` gerekçesi.
4. **Notasyon kararı:** resmî ham biçim ile uygulama gösterimi arasında dönüşüm kuralı.

Bu dört sınıftan hiçbiri bu spec ile otomatik başlamaz.
