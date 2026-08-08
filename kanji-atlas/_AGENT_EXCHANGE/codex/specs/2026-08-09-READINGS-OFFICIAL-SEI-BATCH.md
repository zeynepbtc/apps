# Kanji Atlas — Resmî Okuma Tamamlama · `生` Karmaşık Turu

**Durum:** LOCKED SPEC — Zeynep 2026-08-09 devam onayı  
**Tür:** Tek kayıt ürün-verisi düzeltmesi + bağımsız regresyon kapısı  
**Taban:** `f7fdc5fbbcc4c7112d54214b1b84d7beac7d2a41`  
**Kaynak dal:** `codex/kanji-atlas-coordination`  
**Sahiplik:** Codex spec/bağımsız kapı · Claude plan/uygulama/kanıt · Zeynep son karar  
**Yetki:** `DECISION-004-READINGS-DATA-MODEL.md` v3 + resmî eksiksizlik denetimi `b93db57`

> Bu tur yalnız `sei / 生` kaydının eksik resmî On/Kun okumalarını tamamlar. Kullanıcıya
> öğretilen ve gösterilen `セイ・い(きる)・う(まれる)` aynen kalır. Yeni dokuz okuma kullanıcı
> yüzeyine sızmadan `deferred` olarak saklanır. Bu mekanik tamamlama bir öğretim kararı değildir.

---

## 1. Kilitli son durum

### 1.1 `生.readings`

```js
{
  officialOn: ["セイ", "ショウ"],
  officialKun: [
    "い(きる)", "い(かす)", "い(ける)", "う(まれる)", "う(む)",
    "お(う)", "は(える)", "は(やす)", "き", "なま"
  ],
  taughtOn: ["セイ"],
  taughtKun: ["い(きる)", "う(まれる)"],
  deferred: [
    { reading: "ショウ", kind: "on", reason: REASON, recommend: "defer" },
    { reading: "い(かす)", kind: "kun", reason: REASON, recommend: "defer" },
    { reading: "い(ける)", kind: "kun", reason: REASON, recommend: "defer" },
    { reading: "う(む)", kind: "kun", reason: REASON, recommend: "defer" },
    { reading: "お(う)", kind: "kun", reason: REASON, recommend: "defer" },
    { reading: "は(える)", kind: "kun", reason: REASON, recommend: "defer" },
    { reading: "は(やす)", kind: "kun", reason: REASON, recommend: "defer" },
    { reading: "き", kind: "kun", reason: REASON, recommend: "defer" },
    { reading: "なま", kind: "kun", reason: REASON, recommend: "defer" }
  ],
  source: "文化庁 常用漢字表 / jitenon",
  qaStatus: "reviewed"
}
```

Bu sözleşmedeki `REASON` sabiti bütün dokuz yeni girdide birebir şudur:

```text
Resmî 常用 okuması; N5 başlangıç yüzeyinde bu tur öğretilmiyor
```

- `officialOn` ve `officialKun` sırası resmî PDF s.89 音訓 sütununu izler.
- `deferred` sırası önce öğretilmeyen On, ardından resmî sıradaki öğretilmeyen Kun değerleridir.
- `recommend: "defer"` mevcut ev geleneğini korur.
- `弥生 / やよい` ve `芝生 / しばふ` 付表/kelime okumalarıdır. `official*`, `taught*` veya
  `deferred[]` girdisi üretmez; bu turda `irregularWords` da eklenmez.

### 1.2 Değişmez kullanıcı yüzeyi

Aşağıdakiler başlangıç ve bitişte birebir aynı kalır:

```js
onyomi: "セイ"
kunyomi: "い(きる)・う(まれる)"
taughtOn: ["セイ"]
taughtKun: ["い(きる)", "う(まれる)"]
examples: [
  ["学生", "gakusei", "öğrenci"],
  ["先生", "sensei", "öğretmen"],
  ["生まれる", "umareru", "doğmak"]
]
```

Yeni okumaların hangilerinin ileride, hangi sırayla öğretileceği ayrı ürün/pedagoji turudur.

---

## 2. Bilerek kapsam dışı

- `生` dışındaki 97 kanji kaydı;
- `taughtOn`, `taughtKun`, yüzey `onyomi`/`kunyomi` değişikliği;
- `弥生`, `芝生` veya başka 付表/kelime kaydı ekleme;
- örnek, romaji, anlam, ses, köken, mnemonic, kaynak veya `qaStatus` değişikliği;
- deferred okumaları kart, oyun, quiz, arama veya ses sistemine ekleme;
- `CONTENT_VERSION` artırma;
- karar/denetim belgelerini değiştirme;
- `main`, merge, push, PR, deploy, mağaza, native veya imzalama işlemi.

---

## 3. İzinli ürün/test dosyaları

Claude yalnız şu beş ürün/test yoluna dokunabilir:

1. `kanji-atlas/index.html`
   - yalnız `DATA.chars.sei.readings`;
   - jeneratörün güncellediği `CONTENT_HASH`.
2. `kanji-atlas/_faz2/data_chars.json` — yalnız jeneratör çıktısı.
3. `kanji-atlas/_faz2/content_manifest.json` — yalnız jeneratör çıktısı.
4. `kanji-atlas/_faz2/smoke_official_readings_sei.js` — yeni bağımsız regresyon kapısı.
5. `kanji-atlas/_faz2/run-core-gates.mjs` — yeni kapıyı ekleyen tek satır.

### 3.1 İzinli Claude teslim yolları

- `_AGENT_EXCHANGE/claude/plans/2026-08-09-READINGS-OFFICIAL-SEI-PLAN.md`
- `_AGENT_EXCHANGE/claude/reports/2026-08-09-READINGS-OFFICIAL-SEI-DELIVERY.md`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-09-readings-official-sei/`

Başka dosya değişemez. Bu Codex spec Claude tarafından düzenlenemez.

---

## 4. Uygulama sırası

1. HEAD, dal ve temiz ağaç kaydedilir.
2. Beş izinli ürün/test yolunun başlangıç SHA-256 değeri (yoksa `ABSENT`) alınır.
3. `sei` kaydının tamamı başlangıç JSON'una çıkarılır.
4. Claude planı §3.1 yoluna yazılır; ürün değişikliğinden önce kapsam yeniden doğrulanır.
5. Yalnız §1.1 uygulanır.
6. `node _faz2/generate_data_chars.js` çalıştırılır; türetilmiş iki JSON elle düzenlenmez.
7. Yeni regresyon kapısı yazılır ve çekirdek koşucuya eklenir.
8. Normal kapılar ve §5.1 enjeksiyonları çalıştırılır.
9. `sei` dışındaki 97 kanji kaydı bayt-birebir aynı olmalıdır.
10. Tam diff, SHA, ham test/exit kodu ve tam git status teslim edilir.
11. Commit oluşturulmadan Codex denetimi beklenir.

---

## 5. Regresyon kapısı

`smoke_official_readings_sei.js`, `index.html DATA.chars` verisini okur ve sözleşmedeki bağımsız
sabitlere karşı en az şunları doğrular:

1. `sei / 生` kaydı ve readings dörtlüsü vardır.
2. `officialOn` değer+sıra §1.1 ile birebirdir.
3. `officialKun` değer+sıra §1.1 ile birebirdir.
4. `taughtOn`, `taughtKun`, `onyomi`, `kunyomi` §1.2 ile birebirdir.
5. Dokuz deferred nesnesi bütün alanları ve sırayla §1.1 ile birebirdir.
6. `examples` §1.2 ile birebirdir.
7. `source` ve `qaStatus` başlangıç sabitiyle aynıdır.
8. `readings.irregularWords` başlangıçta yoksa sonda da yoktur; 付表 okumaları kümelere sızmaz.

Test üretim verisini kendi kopyasıyla karşılaştıran totoloji olamaz; beklentiler sözleşmeden
bağımsız sabit olarak yazılır.

### 5.1 Zorunlu negatif enjeksiyonlar

Geçici bellek kopyasında aşağıdaki sekiz kusur ayrı ayrı `exit != 0` üretmelidir:

1. `officialOn` içinden `ショウ` çıkarılır.
2. `officialKun` sırası değiştirilir.
3. `ショウ` yanlışlıkla `taughtOn`'a eklenir; yüzey aynı bırakılır.
4. `い(かす)` deferred girdisinin `kind` değeri `on` yapılır.
5. `なま` deferred girdisinin `reason` metni değiştirilir.
6. `kunyomi` sessizce `い(きる)・う(まれる)・なま` yapılır.
7. `やよい` yanlışlıkla `officialKun` ve deferred(kun) içine eklenir.
8. `readings.irregularWords` alanı sessizce eklenir.

Her enjeksiyonun adı, gerçek exit kodu ve ilgili FAIL mesajı ham kanıtta bulunur. Harness
öncesi/sonrası gerçek ürün SHA'ları aynı kalmalıdır.

---

## 6. Zorunlu normal kapılar

1. `node kanji-atlas/_faz2/generate_data_chars.js --check`
2. `node kanji-atlas/_faz2/smoke_official_readings_sei.js`
3. `node kanji-atlas/_faz2/smoke_readings_sets.js`
4. `node kanji-atlas/_faz2/smoke_legacy_derived.js`
5. `node kanji-atlas/_faz2/smoke_official_readings_ato.js`
6. `node kanji-atlas/_faz2/run-core-gates.mjs` → **14/14 PASS**

Jeneratör ikinci koşumda idempotent olmalı; ürün diff'i üretmemelidir.

---

## 7. Kabul kriterleri

1. Gerçek değişen ürün/test yolu tam §3'teki beş yoldur.
2. `sei.readings` son durumu §1.1 ile birebirdir.
3. Öğretim yüzeyi ve örnekler §1.2 ile birebir aynı kalır.
4. `sei` dışındaki 97 kanji kaydı bayt-birebir aynıdır.
5. 付表 okumaları kanji okuma kümelerine veya yeni `irregularWords` alanına sızmaz.
6. Jeneratör senkron, hash güncel ve idempotenttir.
7. DECISION-004 I-1/I-2/I-3/I-4/I-7/I-8 kapıları geçer.
8. Legacy yüzey kapısı geçer; deferred değerler kullanıcı yüzeyine sızmaz.
9. Yeni kapı normal durumda geçer ve sekiz enjeksiyonda gerçekten kırılır.
10. Çekirdek koşucu 14/14 PASS; FAIL/TIMEOUT/diğer sıfırdır.
11. Yalnız §3 ve §3.1 yolları status'ta bulunur; kapsam dışı diff yoktur.
12. Ham komutlar, araç sürümleri, exit kodları, SHA'lar ve başlangıç/son kayıtlar teslim edilir.
13. Claude commit/merge/push yapmadan durur ve Codex bağımsız denetimini bekler.

---

## 8. Geri dönüş noktası

- Başlangıç: `f7fdc5fbbcc4c7112d54214b1b84d7beac7d2a41`.
- `main` değişmez.
- Başarısızlıkta yalnız bu turun beş ürün/test yolu geri alınabilir olmalıdır.
- Rapor ve ham kanıtlar korunur.

Bu sözleşme başka karakter veya `生` öğretim yüzeyini genişletmek için otomatik yetki oluşturmaz.
