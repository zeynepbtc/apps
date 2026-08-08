# Kanji Atlas — Resmî Okuma Tamamlama · `後` Dar Turu

**Durum:** LOCKED SPEC — Zeynep 2026-08-08 devam onayı  
**Tür:** Tek kayıt ürün-verisi düzeltmesi + regresyon kapısı  
**Taban:** `8782d53934fdf9841745c2e8a0e8a2e2c6e01d3f`  
**Kaynak dal:** `codex/kanji-atlas-coordination`  
**Sahiplik:** Codex spec/bağımsız kapı · Claude plan/uygulama/kanıt · Zeynep son karar  
**Yetki:** `DECISION-004-READINGS-DATA-MODEL.md` v3 + resmî eksiksizlik denetimi `b93db57`

> Bu tur yalnız `ato / 後` kaydının eksik resmî okumalarını tamamlar. Kullanıcıya öğretilen
> ve gösterilen `ゴ・あと・うし(ろ)` aynen kalır. Yeni `コウ・のち・おく(れる)` okumaları
> kullanıcı yüzeyine sızmadan `deferred` olarak saklanır.

---

## 1. Kilitli son durum

### 1.1 `後.readings`

```js
{
  officialOn: ["ゴ", "コウ"],
  officialKun: ["のち", "うし(ろ)", "あと", "おく(れる)"],
  taughtOn: ["ゴ"],
  taughtKun: ["あと", "うし(ろ)"],
  deferred: [
    {
      reading: "コウ",
      kind: "on",
      reason: "Resmî 常用 okuması; N5 başlangıç yüzeyinde bu tur öğretilmiyor",
      recommend: "defer"
    },
    {
      reading: "のち",
      kind: "kun",
      reason: "Resmî 常用 okuması; N5 başlangıç yüzeyinde bu tur öğretilmiyor",
      recommend: "defer"
    },
    {
      reading: "おく(れる)",
      kind: "kun",
      reason: "Resmî 常用 okuması; N5 başlangıç yüzeyinde bu tur öğretilmiyor",
      recommend: "defer"
    }
  ],
  source: "文化庁 常用漢字表 / jitenon",
  qaStatus: "reviewed"
}
```

- `officialOn` ve `officialKun` sırası resmî PDF s.51 音訓 sütununu izler.
- `deferred` sırası önce On, ardından resmî sıradaki öğretilmeyen Kun değerleridir.
- `reason` kullanım sıklığı, JLPT alt seviyesi veya okul sınıfı hakkında ölçülmemiş iddia içermez.
- `recommend: "defer"` mevcut ev geleneğini korur.

### 1.2 Değişmez kullanıcı yüzeyi

Aşağıdakiler başlangıç ve bitişte birebir aynı kalır:

```js
onyomi: "ゴ"
kunyomi: "あと・うし(ろ)"
taughtOn: ["ゴ"]
taughtKun: ["あと", "うし(ろ)"]
examples: [["後ろ", "ushiro", "arka"], ["午後", "gogo", "öğleden sonra"]]
```

Resmî kümede bulunmak aynı turda öğretilmek anlamına gelmez. `コウ`, `のち` ve
`おく(れる)` için gelecek öğretim kararı bu mekanik turdan ayrıdır.

---

## 2. Bilerek kapsam dışı

- `生` veya başka 97 kanji kaydı;
- `taughtOn`, `taughtKun`, yüzey `onyomi`/`kunyomi` değişikliği;
- örnek, romaji, anlam, ses, köken, mnemonic, kaynak veya `qaStatus` değişikliği;
- deferred okumaları kart, oyun, quiz, arama veya ses sistemine ekleme;
- `CONTENT_VERSION` artırma;
- DECISION-004 veya önceki denetim raporlarını değiştirme;
- `main`, merge, push, PR, deploy, mağaza, native veya imzalama işlemi.

---

## 3. İzinli ürün/test dosyaları

Claude yalnız şu beş ürün/test yoluna dokunabilir:

1. `kanji-atlas/index.html`
   - yalnız `DATA.chars.ato.readings`;
   - jeneratörün güncellediği `CONTENT_HASH`.
2. `kanji-atlas/_faz2/data_chars.json` — yalnız jeneratör çıktısı.
3. `kanji-atlas/_faz2/content_manifest.json` — yalnız jeneratör çıktısı.
4. `kanji-atlas/_faz2/smoke_official_readings_ato.js` — yeni bağımsız regresyon kapısı.
5. `kanji-atlas/_faz2/run-core-gates.mjs` — yeni kapıyı ekleyen tek satır.

### 3.1 İzinli Claude teslim yolları

- `_AGENT_EXCHANGE/claude/plans/2026-08-08-READINGS-OFFICIAL-ATO-PLAN.md`
- `_AGENT_EXCHANGE/claude/reports/2026-08-08-READINGS-OFFICIAL-ATO-DELIVERY.md`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-08-readings-official-ato/`

Başka dosya değişemez. Bu Codex spec Claude tarafından düzenlenemez.

---

## 4. Uygulama sırası

1. HEAD, dal ve temiz ağaç kaydedilir.
2. Beş izinli ürün/test yolunun başlangıç SHA-256 değeri (yoksa `ABSENT`) alınır.
3. `ato` kaydının tamamı başlangıç JSON'una çıkarılır.
4. Claude planı §3.1 yoluna yazılır; ürün değişikliğinden önce kapsam yeniden doğrulanır.
5. Yalnız §1.1 uygulanır.
6. `node _faz2/generate_data_chars.js` çalıştırılır; türetilmiş iki JSON elle düzenlenmez.
7. Yeni regresyon kapısı yazılır ve çekirdek koşucuya eklenir.
8. Normal kapılar ve §5.1 enjeksiyonları çalıştırılır.
9. `ato` dışındaki 97 kanji kaydı bayt-birebir aynı olmalıdır.
10. Tam diff, SHA, ham test/exit kodu ve tam git status teslim edilir.
11. Commit oluşturulmadan Codex denetimi beklenir.

---

## 5. Regresyon kapısı

`smoke_official_readings_ato.js`, `index.html DATA.chars` verisini okur ve sözleşmedeki bağımsız
sabitlere karşı en az şunları doğrular:

1. `ato / 後` kaydı ve readings dörtlüsü vardır.
2. `officialOn` değer+sıra §1.1 ile birebirdir.
3. `officialKun` değer+sıra §1.1 ile birebirdir.
4. `taughtOn`, `taughtKun`, `onyomi`, `kunyomi` §1.2 ile birebirdir.
5. Üç deferred nesnesi bütün alanları ve sırayla §1.1 ile birebirdir.
6. `examples` §1.2 ile birebirdir.
7. `source` ve `qaStatus` başlangıç sabitiyle aynıdır.

Test üretim verisini kendi kopyasıyla karşılaştıran totoloji olamaz; beklentiler sözleşmeden
bağımsız sabit olarak yazılır.

### 5.1 Zorunlu negatif enjeksiyonlar

Geçici bellek kopyasında aşağıdaki altı kusur ayrı ayrı `exit != 0` üretmelidir:

1. `officialOn` içinden `コウ` çıkarılır.
2. `officialKun` sırası değiştirilir.
3. `コウ` yanlışlıkla `taughtOn`'a eklenir; yüzey aynı bırakılır.
4. `のち` deferred girdisinin `kind` değeri `on` yapılır.
5. `おく(れる)` deferred girdisinin `reason` metni değiştirilir.
6. `kunyomi` sessizce `あと・うし(ろ)・のち` yapılır.

Her enjeksiyonun adı, gerçek exit kodu ve ilgili FAIL mesajı ham kanıtta bulunur. Harness
öncesi/sonrası gerçek ürün SHA'ları aynı kalmalıdır.

---

## 6. Zorunlu normal kapılar

1. `node kanji-atlas/_faz2/generate_data_chars.js --check`
2. `node kanji-atlas/_faz2/smoke_official_readings_ato.js`
3. `node kanji-atlas/_faz2/smoke_readings_sets.js`
4. `node kanji-atlas/_faz2/smoke_legacy_derived.js`
5. `node kanji-atlas/_faz2/run-core-gates.mjs` → **13/13 PASS**

Jeneratör ikinci koşumda idempotent olmalı; ürün diff'i üretmemelidir.

---

## 7. Kabul kriterleri

1. Gerçek değişen ürün/test yolu tam §3'teki beş yoldur.
2. `ato.readings` son durumu §1.1 ile birebirdir.
3. Öğretim yüzeyi ve örnekler §1.2 ile birebir aynı kalır.
4. `ato` dışındaki 97 kanji kaydı bayt-birebir aynıdır.
5. Jeneratör senkron, hash güncel ve idempotenttir.
6. DECISION-004 I-1/I-2/I-3/I-4/I-7/I-8 kapıları geçer.
7. Legacy yüzey kapısı geçer; deferred değerler kullanıcı yüzeyine sızmaz.
8. Yeni kapı normal durumda geçer ve altı enjeksiyonda gerçekten kırılır.
9. Çekirdek koşucu 13/13 PASS; FAIL/TIMEOUT/diğer sıfırdır.
10. Yalnız §3 ve §3.1 yolları status'ta bulunur; kapsam dışı diff yoktur.
11. Ham komutlar, araç sürümleri, exit kodları, SHA'lar ve başlangıç/son kayıtlar teslim edilir.
12. Claude commit/merge/push yapmadan durur ve Codex bağımsız denetimini bekler.

---

## 8. Geri dönüş noktası

- Başlangıç: `8782d53934fdf9841745c2e8a0e8a2e2c6e01d3f`.
- `main` değişmez.
- Başarısızlıkta yalnız bu turun beş ürün/test yolu geri alınabilir olmalıdır.
- Rapor ve ham kanıtlar korunur.

Bu sözleşme `生` veya başka bir karakter için otomatik yetki oluşturmaz.
