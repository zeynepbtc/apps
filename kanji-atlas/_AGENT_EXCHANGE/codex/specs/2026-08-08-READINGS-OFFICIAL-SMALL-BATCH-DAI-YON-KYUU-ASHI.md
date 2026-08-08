# Kanji Atlas — Resmî Okuma Tamamlama · Küçük Grup 1 (`大・四・九・足`)

**Durum:** LOCKED SPEC — Zeynep 2026-08-08 devam onayı  
**Tür:** Dar ürün-verisi düzeltmesi + regresyon kapısı  
**Taban:** `b93db57fe61d0aa72dfe0a64bafbf1c936ac271b`  
**Kaynak dal:** `codex/kanji-atlas-coordination`  
**Sahiplik:** Codex spec/bağımsız kapı · Claude plan/uygulama/kanıt · Zeynep son karar  
**Yetki:** `DECISION-004-READINGS-DATA-MODEL.md` v3 + resmî eksiksizlik denetimi `b93db57`

> Bu tur yalnız dört kaydın eksik `officialKun` kümelerini resmî 常用漢字表'a tamamlar.
> `taughtOn`, `taughtKun`, kullanıcıya görünen `onyomi`/`kunyomi`, örnekler, sesler ve
> pedagojik kapsam **değişmez**. Resmî kümede olup bu sürümde öğretilmeyen yeni okumalar
> `deferred(kind="kun")` olarak açıkça saklanır.

---

## 1. Kilitli ürün kararı

### 1.1 Bu turda değişecek dört kayıt

| id / kanji | Yeni tam `officialKun` | Değişmeden kalacak `taughtKun` | Eklenecek `deferred(kind="kun")` |
|---|---|---|---|
| `dai` / 大 | `おお` · `おお(きい)` · `おお(いに)` | `おお(きい)` | `おお` · `おお(いに)` |
| `yon` / 四 | `よ` · `よ(つ)` · `よっ(つ)` · `よん` | `よん` · `よ(つ)` | `よ` · `よっ(つ)` |
| `kyuu` / 九 | `ここの` · `ここの(つ)` | `ここの(つ)` | `ここの` |
| `ashi` / 足 | `あし` · `た(りる)` · `た(る)` · `た(す)` | `あし` | `た(りる)` korunur · `た(る)` · `た(す)` eklenir |

Sıralama resmî PDF'nin 音訓 sütunundaki sırayı izler. Uygulama normalizasyonu
DECISION-004 N-1…N-7'ye uyar; ASCII yarım genişlik parantez kullanılır.

### 1.2 Öğretim yüzeyi kilidi

Aşağıdaki alanlar başlangıç ve bitişte bayt-anlam olarak aynı kalmalıdır:

| id | `onyomi` | `kunyomi` | `taughtOn` | `taughtKun` |
|---|---|---|---|---|
| `dai` | `ダイ・タイ` | `おお(きい)` | `ダイ` · `タイ` | `おお(きい)` |
| `yon` | `シ` | `よん・よ(つ)` | `シ` | `よん` · `よ(つ)` |
| `kyuu` | `キュウ・ク` | `ここの(つ)` | `キュウ` · `ク` | `ここの(つ)` |
| `ashi` | `ソク` | `あし` | `ソク` | `あし` |

Bu kilit şu ilkeyi uygular: **resmî kümede bulunmak, aynı turda kullanıcıya öğretilmek
anlamına gelmez.** Yeni okumaların öğretim değeri ayrı pedagojik turda kararlaştırılır.

### 1.3 `deferred` kayıt biçimi

Her yeni girdide aşağıdakiler zorunludur:

```js
{
  reading: "...",
  kind: "kun",
  reason: "Resmî 常用 okuması; N5 başlangıç yüzeyinde bu tur öğretilmiyor",
  recommend: "defer"
}
```

- `reason` yukarıdaki sabit, dürüst ifadeyi kullanır; seviye veya kullanım sıklığı hakkında
  ölçülmemiş ek iddia eklenmez.
- `recommend: "defer"` mevcut ev geleneğiyle uyum için korunur.
- `ashi / た(りる)` mevcut girdisi **hiç değiştirilmez**; yalnız iki yeni girdi yanına eklenir.
- Dizi sırası `officialKun` sırasını takip eder; mevcut `た(りる)` ilk Kun-deferred girdisi kalır.

---

## 2. Bilerek kapsam dışı

Bu tur aşağıdakilerin hiçbirine yetki vermez:

- `後` veya `生` okumaları;
- başka 94 kanji kaydı;
- `taughtOn`, `taughtKun`, yüzey `onyomi`/`kunyomi` değişikliği;
- örnek kelime, romaji, anlam, ses, köken, mnemonic veya `qaStatus` değişikliği;
- `四つ` örneğindeki `yottsu` ile mevcut `taughtKun: よ(つ)` ilişkisinin çözümü;
- `deferred` okumaları oyunlara, quizlere, kartlara veya sese ekleme;
- kaynak politikasını veya DECISION-004'ü değiştirme;
- `CONTENT_VERSION` artırma;
- `main`, merge, push, PR, deploy, mağaza, native veya imzalama işlemi.

`四` anomalisi görünür biçimde açık kalır. Bu tur onu ne düzeltir ne de yeni resmî
`よっ(つ)` girdisi üzerinden sessizce öğretim yüzeyine taşır.

---

## 3. İzinli ürün/test dosyaları

Claude ürün ve test tarafında yalnız şu **beş** yola dokunabilir:

1. `kanji-atlas/index.html`
   - yalnız dört `DATA.chars[*].readings` nesnesi;
   - jeneratörün güncellediği `CONTENT_HASH` sabiti.
2. `kanji-atlas/_faz2/data_chars.json`
   - yalnız jeneratör çıktısı; elle düzenlenmez.
3. `kanji-atlas/_faz2/content_manifest.json`
   - yalnız jeneratör çıktısı; elle düzenlenmez.
4. `kanji-atlas/_faz2/smoke_official_readings_small_batch.js`
   - yeni, salt-okunur ve veri-kaynağı bağımsız regresyon kapısı.
5. `kanji-atlas/_faz2/run-core-gates.mjs`
   - yeni kapıyı çekirdek koşucuya ekleyen tek satırlık kayıt.

Başka ürün, test, doküman veya yapılandırma dosyası değişemez.

### 3.1 İzinli Claude teslim yolları

Claude ayrıca yalnız aşağıdaki yeni teslim yollarını oluşturabilir:

- `_AGENT_EXCHANGE/claude/plans/2026-08-08-READINGS-OFFICIAL-SMALL-BATCH-PLAN.md`
- `_AGENT_EXCHANGE/claude/reports/2026-08-08-READINGS-OFFICIAL-SMALL-BATCH-DELIVERY.md`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-08-readings-official-small-batch/`

Bu Codex spec dosyası Claude tarafından düzenlenemez.

---

## 4. Uygulama yöntemi

1. Dal, HEAD ve tam temiz ağaç kanıtı alınır.
2. Beş izinli ürün/test dosyasının başlangıç SHA-256 değerleri (yoksa `ABSENT`) kaydedilir.
3. Dört kaydın tamamı `index.html DATA.chars` içinden başlangıç JSON'una çıkarılır.
4. Claude değişiklikten önce kısa planını §3.1 yoluna yazar ve durup kapsamı yeniden doğrular.
5. Yalnız §1.1'deki `officialKun` ve `deferred` değişiklikleri `index.html` içinde uygulanır.
6. `node _faz2/generate_data_chars.js` çalıştırılır; `data_chars.json`, manifest ve
   `CONTENT_HASH` yalnız jeneratörden üretilir.
7. Yeni regresyon testi yazılır ve çekirdek koşucuya eklenir.
8. Normal kapılar ve aşağıdaki negatif enjeksiyonlar çalıştırılır.
9. Dört hedef dışındaki 94 `DATA.chars` kaydının başlangıç/son JSON'u bayt-birebir eşit olmalıdır.
10. Tam diff, dosya listesi, ham komut/exit kodları, ürün SHA'ları ve tam git status teslim edilir.
11. **Commit oluşturulmadan** Codex bağımsız denetimi beklenir.

---

## 5. Yeni regresyon kapısının zorunlu davranışı

`smoke_official_readings_small_batch.js` doğrudan `index.html DATA.chars` verisini okur ve en
az aşağıdakileri doğrular:

1. Kapalı id kümesi tam `dai, yon, kyuu, ashi`; hedeflerden biri yoksa FAIL.
2. Dört `officialKun` dizisi §1.1 ile **değer ve sıra olarak birebir** eşittir.
3. Dört `taughtOn`, `taughtKun` ve yüzey alanı §1.2 ile birebir eşittir.
4. Yeni deferred girdileri doğru `reading`, `kind`, `reason`, `recommend` değerlerini taşır.
5. `ashi / た(りる)` eski girdisi bütün alanlarıyla korunmuştur.
6. Hedef kayıtların örnekleri başlangıç sabitiyle birebir aynıdır.
7. `officialOn` dizileri başlangıç sabitiyle birebir aynıdır.

Test yalnız üretim verisini kendi kopyasına karşı doğrulayan totoloji olamaz; §1'de kilitlenen
beklentileri bağımsız sabit olarak taşır.

### 5.1 Zorunlu negatif enjeksiyonlar

Ürün dosyasını kalıcı değiştirmeyen geçici kopya/harness üzerinde en az şu altı kusur ayrı ayrı
enjekte edilir ve her biri yeni kapıyı `exit != 0` ile kırar:

1. `dai.officialKun` içinden `おお` çıkarılır.
2. `yon.officialKun` sırası değiştirilir.
3. `kyuu` için `ここの` yanlışlıkla `taughtKun`'a eklenir ve yüzey değiştirilmez.
4. `ashi` için yeni `た(す)` girdisinin `kind` değeri `on` yapılır.
5. `ashi / た(りる)` mevcut `reason` metni değiştirilir.
6. `yon.kunyomi` sessizce `よん・よ(つ)・よっ(つ)` yapılır.

Her enjeksiyon için komut, kusur adı, exit kodu ve ilgili FAIL mesajı ham kanıtta bulunur.
Harness enjeksiyon öncesi/sonrası gerçek ürün SHA'larını eşit göstermelidir.

---

## 6. Zorunlu kapılar

Normal durumda aşağıdakilerin tamamı `exit 0` olmalıdır:

1. `node kanji-atlas/_faz2/generate_data_chars.js --check`
2. `node kanji-atlas/_faz2/smoke_official_readings_small_batch.js`
3. `node kanji-atlas/_faz2/smoke_readings_sets.js`
4. `node kanji-atlas/_faz2/smoke_legacy_derived.js`
5. `node kanji-atlas/_faz2/run-core-gates.mjs` → önceki 11 kapı + yeni kapı = **12/12 PASS**

Ayrıca jeneratör ikinci kez çalıştırıldığında ürün diff'i sıfır olmalıdır (idempotence).

---

## 7. Kabul kriterleri

1. Gerçek değişen ürün/test yolu tam §3'teki beş yoldur; eksik veya fazla yol FAIL.
2. `officialKun` son durumu dört kayıtta §1.1 ile birebir aynıdır.
3. `taught*` ve kullanıcı yüzeyi dört kayıtta §1.2 ile birebir değişmeden kalır.
4. `deferred` son durumu §1.1/§1.3 ile birebir aynıdır; `ashi / た(りる)` korunur.
5. Hedef dışındaki 94 kanji kaydı bayt-birebir aynıdır.
6. Ürün/test kapsamı dışındaki dosyalarda diff yoktur.
7. Jeneratör senkron, hash güncel ve ikinci koşum idempotenttir.
8. DECISION-004 I-1/I-2/I-3/I-4/I-7/I-8 kapıları geçer.
9. Legacy yüzey türetme kapısı geçer; yeni resmî okumalar kullanıcı yüzeyine sızmaz.
10. Yeni regresyon kapısı normal durumda geçer ve altı enjeksiyonun her birinde gerçekten kırılır.
11. Çekirdek koşucu **12/12 PASS** verir; FAIL/TIMEOUT/diğer sıfırdır.
12. Tam başlangıç/son SHA, değişen dosya listesi, ham test çıktıları, exit kodları ve tam
    `git status --porcelain --untracked-files=all` teslim edilir.
13. Claude commit/merge/push yapmadan durur ve Codex denetimini bekler.

---

## 8. Geri dönüş noktası

- Başlangıç commit'i: `b93db57fe61d0aa72dfe0a64bafbf1c936ac271b`.
- Bu tur tek bir feature dalında kalır; `main` değişmez.
- Uygulama denetimden geçmezse yalnız bu turun beş ürün/test yolu geri alınabilir olmalıdır.
- Rapor/kanıt dosyaları geri dönüşte korunur; başarısızlığın nedeni kaybolmaz.

Bu sözleşme `後`, `生` veya öğretim politikası için emsal yoluyla otomatik yetki oluşturmaz.
