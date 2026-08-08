# DECISION-004 — Okuma Alanları Veri Modeli (`readings`)

**Durum:** APPROVED (revizyon **v3** — commit'e hazır)
**Tarih:** 2026-08-07 · **Revizyon:** 2026-08-08
**Karar sahibi:** Zeynep
**Ürün/pedagoji kapısı:** Codex — v1'e koşullu PASS (6 düzeltme, §7.2) → v2 denetimi **tamam**
(ürün SHA-256, temiz ağaç, `d7c7549` tabanı doğrulandı) → v3'te 2 metinsel kapanış düzeltmesi (§7.3)
**Hazırlayan:** Claude (ölçüm + taslak)
**Kapsam:** `kanji-atlas/` · `DATA.chars[*].readings`

> Bu belge bir **alan tanımıdır.** Hiçbir kaydın içeriğini değiştirmez, hiçbir okumayı
> `taught`'a eklemez, hiçbir kod değişikliğine yetki vermez. **Bu turda hiçbir kanji verisi
> değiştirilmedi** (§4.4 bayt kanıtı). Uygulama AGENTS.md'nin spec → plan → dal → bağımsız
> denetim → kapı sırasına tabidir.

---

## 1. Karar — alan tanımları

| Alan | Tanım | Kaynak |
|---|---|---|
| `officialOn` / `officialKun` | 文化庁 **常用漢字表**'ın o karakter için verdiği **bütün** okumalar. `小学校` / `中学校` ayrımı **yapılmaz** — ayrım gerekiyorsa `deferred[].reason`'da belirtilir. | **Birincil ve tek yetkili:** 常用漢字表 (§1.1) |
| `taughtOn` / `taughtKun` | Bu sürümde **öğretilen** pedagojik alt küme. | Pedagojik karar (kayıt bazında) |
| `deferred[]` | `official`'da olup `taught`'ta **olmayan** okumalar. **Zorunlu alanlar:** `reading` · **`kind: "on" \| "kun"`** · `reason`. | Türetilir + gerekçe |
| `irregularWords[]` | 付表 / jukujikun. **Kanjinin okuması değildir**, kelimeye özgüdür. `official` / `taught` / `deferred` kümelerinin **hiçbirine girmez**. | 付表 |
| `onyomi` / `kunyomi` (yüzey) | **Türetilmiş alan.** Yalnız `taught*`'tan üretilir (§1.2). | Türetme |

### 1.1 Kaynak hiyerarşisi — birincil vs çapraz

| Rol | Kaynak | Yetki |
|---|---|---|
| **Birincil** | 文化庁 **常用漢字表** | `official*` kümesinin **kapsamını tek başına belirler**. |
| **Çapraz kontrol** | jitenon · Kanjipedia · diğer sözlükler | Yalnız **doğrulama ve okunabilirlik**. Çapraz kaynak `official*` kümesini **genişletemez, daraltamaz**. |

- Çapraz kaynak 常用漢字表 ile **çelişirse 常用漢字表 kazanır**; çelişki silinmez, `disagreementNote`'a yazılır.
- `readings.source` alanı **birincil kaynağı adlandırmak zorundadır**; çapraz kaynaklar ayrıca anılabilir.
- 常用漢字表'da **olmayan** bir okuma `official*`'a **giremez** (varsa `irregularWords[]` veya kayıt dışı).

### 1.2 Yüzey alanlarının türetilmesi — kesin kural

```
onyomi  === taughtOn.join("・")
kunyomi === taughtKun.join("・")
```

- Yüzey alanları **elle yazılmaz**, `official*`'tan veya `deferred`'dan **asla türetilmez**.
- `taught*` boşsa yüzey alanı **boş dizedir**; sessiz fallback **yoktur**.
- Bu kural bugün `smoke_legacy_derived.js:31-32`'de zaten uygulanıyor ve **11/11 geçiyor** (§4.3).

---

## 2. Invariantlar — sert kapı

İskelesi olan **her** kayıt için, **On ve Kun ayrı ayrı**:

| # | Invariant | Durum |
|---|---|---|
| **I-1** | `officialOn == taughtOn ∪ deferred(kind="on")` | **YENİ** — eklenecek |
| **I-2** | `officialKun == taughtKun ∪ deferred(kind="kun")` | **YENİ** — eklenecek |
| **I-3** | `taughtOn ∩ deferred(kind="on") == ∅` ve `taughtKun ∩ deferred(kind="kun") == ∅` | mevcut (kind'sız biçimde) |
| **I-4** | **Dizi içi tekrarsızlık:** `officialOn` · `officialKun` · `taughtOn` · `taughtKun` küme semantiğiyle işlenir; aynı okuma bir dizide iki kez bulunamaz | **YENİ** — eklenecek |
| **I-5** | `onyomi === taughtOn.join("・")` · `kunyomi === taughtKun.join("・")` | mevcut |
| **I-6** | **`irregularWords[]` öğeleri `official*`, `taught*` veya `deferred[]` girdisi ÜRETMEZ.** 付表 / jukujikun okuması yalnız **kelime düzeyinde** saklanır; kanjinin okuma kümelerine hiçbir yoldan taşınmaz | mevcut (yeniden ifade edildi) |
| **I-7** | Her `deferred[]` girdisi `kind` **taşımak zorundadır**; `kind ∉ {"on","kun"}` → FAIL | **YENİ** — eklenecek |
| **I-8** | **Yazı sistemi doğrulaması:** `officialOn` · `taughtOn` · `deferred(kind="on")` elemanları **katakana** (N-1); `officialKun` · `taughtKun` · `deferred(kind="kun")` elemanları **hiragana (+ okurigana parantezi)** (N-2). Yazı sistemi `kind` ile uyuşmuyorsa FAIL | **YENİ** — eklenecek |

**Birleşik invariant kaldırıldı.** v1'in `official == taught ∪ deferred` biçimi On ve Kun kümelerini
tek torbada karşılaştırıyordu; bir okumanın **yanlış tarafa** yazılması bu biçimde **yakalanmıyordu.**
I-1/I-2 bu boşluğu kapatır.

**On/Kun metinsel kesişimi sert güvence DEĞİLDİR.** `officialOn ∩ officialKun == ∅` gibi bir
dize karşılaştırması ayrı bir kapı olarak tanımlanmaz: **N-1/N-2 yazım kuralları (On = katakana,
Kun = hiragana) bu ayrımı zaten yapısal olarak sağlıyor** ve I-8 bunu makinece doğruluyor.
Sert kontroller şunlardır: **I-4** (dizi içi tekrarsızlık) · **I-8** (yazı sistemi doğrulaması) ·
**I-1/I-2** (`kind`'ın doğru tarafa yerleşmesi). Metinsel kesişim ölçümü §4.3'te **bilgi amaçlı**
kalır, kapı değildir.

**I-6 neden ham dize karşılaştırması değil.** `irregularWords[]` bir **kelime** kaydıdır
(付表 / jukujikun): `大人 = おとな` gibi. Buradaki okuma kanjinin okuması değildir, dolayısıyla
"bu dize `taught`'ta geçmesin" demek yanlış soruyu sorar — doğru kural **köken kuralıdır**:
bu öğeler okuma kümelerini **üretmez**. Kümeye başka bir gerekçeyle meşru biçimde giren aynı
dize, bu kuralı ihlal etmez.

**Ölçüm durumu — dürüst sınır:** `kind` alanı bugün **0/2** `deferred` girdisinde var.
Dolayısıyla **I-1 ve I-2 bugünkü veri üzerinde DEĞERLENDİRİLEMEZ.** Yazı sistemine göre
*türetilmiş* geçici sınıflandırmayla 11/11 geçiyor (§4.2) — bu bir **ön gösterge, kanıt değildir.**
Kanıt, `kind` göçünden sonra üretilir.

**Kabul koşulu (zorunlu):** her güvence **gerçekten kırılabilir** olmalıdır. Sabitleri sabitlere
karşı doğrulayan totolojik blok kabul edilmez; güvencenin bir enjeksiyonla **kırıldığı gösterilmeden**
PASS sayılmaz. (Bu koşul Editoryal 01–02 denetiminde yaşanmış gerçek bir kusurdan geliyor.)

---

## 3. Okuma yazımı ve normalizasyon

Aşağıdaki kuralların tamamı **mevcut 33 okuma dizesi ölçülerek** çıkarıldı — uydurulmadı (§4.5).

| # | Kural | Ölçüm |
|---|---|---|
| N-1 | `officialOn` / `taughtOn` elemanları **katakana** yazılır | 16/16 katakana |
| N-2 | `officialKun` / `taughtKun` elemanları **hiragana** yazılır | 17/17 hiragana |
| N-3 | Okurigana **yarım genişlik parantez** içinde: `おお(きい)` — `U+0028` / `U+0029` | kullanılan tek parantez çifti |
| N-4 | Bütün dizeler **Unicode NFC** | 0 ihlal |
| N-5 | Dizelerde **boşluk yok** (baş/son/iç) | 0 ihlal |
| N-6 | Ayırıcı `・` **dizi elemanının içinde bulunamaz**; yalnız yüzey `join`'inde | 0 ihlal |
| N-7 | Yazım 常用漢字表'ın yazımına **birebir** uyar; sözlük varyantına göre değiştirilmez | — |

**Tekrarsızlık (I-4'ün veri karşılığı):** diziler **küme** semantiğiyle işlenir — aynı okuma bir
dizide iki kez bulunamaz. Ölçüm: bugün **0 tekrar**.

**On/Kun ayrımı N-1/N-2'nin sonucudur.** Katakana ve hiragana kümeleri örtüşmediği için ayrım
yazım kuralından **yapısal olarak** doğar; I-8 bunu doğrular. Ayrıca metinsel kesişim kapısı
tanımlanmaz (§2).

---

## 4. Ölçüm kanıtı

**Ne ölçüldü:** `_faz2/data_chars.json` (generator ile `index.html DATA.chars`'tan türetilmiş;
`--check` → **senkron: true**, `CONTENT_HASH 475592a4bd20617e`).
**Nerede:** çalışma kopyası `_worktrees/kanji-atlas-onboarding-b2-gate3/kanji-atlas`, taban `d7c7549`.
**Tarih:** 2026-08-07 (§4.1) · 2026-08-08 (§4.2–4.5).

### 4.1 Kapsam sayıları

| Ölçü | Değer |
|---|---|
| `DATA.chars` toplam kayıt | **98** |
| `readings` iskelesi olan | **17** |
| `official*` + `taught*` + `deferred` dörtlüsü olan | **11** |
| Yalnız `qaStatus` (+ `irregularWords`) taşıyan | **6** (明 · 今 · 母 · 父 · 手 · 下) |
| İskelesiz kayıt | **81** — bunların **74**'ü yüzeyde `onyomi` gösteriyor |
| **`taught*` olmadan yüzeyde `onyomi` gösteren toplam** | **80** = 74 iskelesiz + 6 yalnız-`qaStatus` |
| `deferred[]` **toplam girdi** | **2** — `男 ナン` · `足 た(りる)` |

**Neden 81 kayıt denetim dışı:** `smoke_legacy_derived.js:29` → `if (!k.readings) continue;`

### 4.2 Ayrık invariantlar (I-1 / I-2)

| Ölçü | Değer |
|---|---|
| `deferred` girdilerinde `kind` alanı | **0 / 2** |
| Mevcut `deferred` girdi anahtarları | `reading` · `reason` · `recommend` (2/2 aynı) |
| I-1 `officialOn == taughtOn ∪ deferred(on)` | **11 / 11** — *türetilmiş* sınıflandırmayla |
| I-2 `officialKun == taughtKun ∪ deferred(kun)` | **11 / 11** — *türetilmiş* sınıflandırmayla |

**Türetme yöntemi (geçici):** `ナン` katakana → `on` adayı · `た(りる)` hiragana → `kun` adayı.
Bu, `kind` alanının **yerini tutmaz**; göçten sonra alan üzerinden yeniden ölçülecektir.

### 4.3 Ayrıklık, tekrarsızlık, yüzey türetmesi

| Ölçü | Değer |
|---|---|
| Dizi içi tekrar (I-4, **kapı**) | **0** |
| Yazı sistemi: ON katakana / KUN hiragana (I-8, **kapı**) | **33 / 33** — karışık 0 |
| `officialOn ∩ officialKun ≠ ∅` olan kayıt (*bilgi amaçlı, kapı değil*) | **0** |
| `taughtOn ∩ taughtKun ≠ ∅` olan kayıt (*bilgi amaçlı, kapı değil*) | **0** |
| `onyomi === taughtOn.join("・")` | **11 / 11** |
| `kunyomi === taughtKun.join("・")` | **11 / 11** |
| `officialOn == taughtOn` (bilgi taşımayan çift) | 10 / 11 — tek fark `男` |
| `officialKun == taughtKun` | 10 / 11 — tek fark `足` |

### 4.4 Bu turda veri değişmedi

`index.html` ve `_faz2/data_chars.json` **açılmadı, yazılmadı**; yalnız okundu.
`generate_data_chars.js --check` **yazma yapmaz** ve `senkron: true` döndürdü.
`CONTENT_HASH` **`475592a4bd20617e`** — v1 ölçümüyle **aynı**. Değişen tek dosya bu karar belgesidir.

### 4.5 Yazım geleneği ölçümü

33 farklı okuma dizesi · dağılım `{ON/katakana: 16, KUN/hiragana(+paren): 17}` ·
parantez yalnız `( U+0028` / `) U+0029` · NFC dışı **0** · boşluklu **0** · eleman içinde `・` **0**.

### 4.6 Yeniden üretim

```
node _faz2/generate_data_chars.js --check     # senkron + CONTENT_HASH
node /tmp/measure2.js                          # §4.2–4.5 sayıları (salt-okunur)
```

---

## 5. Bu kararın düzelttiği iki iddia

**(a) `DECISION-003` numarası dolu.** Depodaki `DECISION-003-TABLET-RELEASE-GATE.md`
**Tablet Yayın Kapısı** kararıdır (APPROVED, Zeynep, 2026-08-07) ve `PRODUCT_STATUS.md:54`
ona mağaza yayın sırası olarak atıf yapıyor. 2026-08-07 gecesi yazılan devam notu
`DECISION-003`'ü *"okuma politikası kararı verilmedi"* belgesi diye anıyor — **çalışma
kopyasındaki DECISION-003 bunu söylemiyor.** Bu belge dolayısıyla **DECISION-004**'tür.
Dalda çakışan bir `DECISION-003` varsa **yeniden numaralandırılmalıdır.**

**(b) "mevcut 6 `deferred` gerekçesi" ölçümle uyuşmuyor.** Taban çalışma kopyasında
`deferred[]` toplam **2** girdi taşıyor. Gecenin notundaki 6 rakamı bu kopyada
**doğrulanmıyor**; dal kopyası bu makinede yok, dolayısıyla farkın nereden geldiği
**ölçülmemiştir** — iddia edilmez, açık bırakılır.

---

## 6. Bu kararın **kapsamadığı** (bilerek açık)

| Açık kalem | Not |
|---|---|
| **`kind` göçü** | `男 / ナン → kind:"on"` · `足 / た(りる) → kind:"kun"`. **Ayrı uygulama sözleşmesinde** yapılacak; bu belge yalnız alanı zorunlu kılar. `recommend` alanının kalıp kalmayacağına da o sözleşme karar verir. |
| `officialOn`/`officialKun` fiilen tam küme mi? | **Kaynağa karşı ölçülmedi.** Deponun kendi kaydı (`EDITORYAL-01-02`) `生` `後` `足` `四`'ü "kısaltılmış" diye işaretliyor. Bu karar o kayıtları **düzeltmez**; düzeltmenin **ölçüsünü** verir. |
| `deferred[].reason` yazım geleneği | Ölçüldü: gelenek çıkarmaya **yetersiz** (2 girdi, ikisi de serbest metin). Bu yüzden **sınıflandırma yapılmaz**; gerekçe serbest metindir. Sınıf uydurmak bu belgeyle **yasaktır**. |
| `四` anomalisi | `taughtKun よ(つ)` kaydın kendi örneği `四つ = yottsu` ile çelişiyor. Ayrı iş. |
| Hangi okuma `taught` olacak? | Her kayıt için **ayrı pedagojik karar**. |
| İskelesiz 81 kayıt | §3'ün cırcır kuralı kapsamında; geriye dönük tur ayrı ve adlandırılmış olacak. |

---

## 6.1 Kapsam — cırcır (ratchet) kuralı

- Bugünden sonra bir kaydın **okuma alanına dokunan** her iş, o kayda `readings` iskelesini
  (`officialOn/officialKun/taughtOn/taughtKun/deferred/source`) **zorunlu olarak kazandırır.**
- Geriye dönük iskelesiz kayıtlar **bu kararla iş açmaz.** Content Freeze öncesi **ayrı ve
  adlandırılmış bir toplu turda** ele alınır.
- Yani: kusur sınıfı bugünden itibaren **büyüyemez**; küçültme ayrı iştir.

---

## 7. Onay izi (birebir)

### 7.1 Zeynep — 2026-08-07

| # | Soru | Seçilen cevap |
|---|---|---|
| 1 | "Tam resmî küme" (`official*`) neyi kapsıyor? | **常用漢字表'ın tamamı** — 小学校/中学校 ayrımı yapılmadan |
| 2 | İskelesiz 81 kayıt ne olacak? | **Cırcır (ratchet) kuralı** |
| 3 | Invariant kapıya bağlansın mı? | **Evet, sert kapı** |
| 4 | Belge nereye yazılsın? | **Dosya teslim + Claude projesine kayıt**; commit Zeynep/Codex'te |

### 7.2 Codex — koşullu PASS, 6 zorunlu düzeltme (v1 → v2)

| # | Düzeltme | Nerede karşılandı |
|---|---|---|
| 1 | `deferred[]`'e zorunlu `kind: "on" \| "kun"` | §1 tablo · I-7 |
| 2 | Birleşik invariant yerine ayrık invariantlar | §2 I-1 / I-2 (birleşik biçim **kaldırıldı**) |
| 3 | Ayrıklık + tekrarsızlık + normalizasyon kuralı | §2 I-4 / I-8 · §3 N-1…N-7 |
| 4 | Birincil kaynak = 文化庁 常用漢字表; diğerleri çapraz | §1.1 |
| 5 | `onyomi`/`kunyomi` yalnız `taught*` üzerinden türetilir | §1.2 |
| 6 | Bu turda kanji verisi değişmez; tam diff + ölçüm raporu | §4.4 · ayrı diff/rapor teslimi |

### 7.3 Codex — v2 denetimi PASS + 2 metinsel kapanış düzeltmesi (v2 → v3)

Doğrulananlar: ürün dosyalarının SHA-256 değerleri · temiz çalışma ağacı · `d7c7549` tabanı ·
**veri değişmemiş**.

| # | Düzeltme | v3 konumu |
|---|---|---|
| 1 | I-6 ham dize karşılaştırması olmaktan çıkarıldı → köken kuralı: `irregularWords[]` okuma kümesi **üretmez**, yalnız kelime düzeyinde saklanır. `reading ∉ taughtOn ∪ taughtKun` ifadesi **kaldırıldı** | §2 I-6 + gerekçe |
| 2 | I-4'ten On/Kun **metinsel kesişimi** sert güvence olmaktan çıkarıldı. Sert kontroller: **I-4** dizi içi tekrarsızlık · **I-8** yazı sistemi doğrulaması · **I-1/I-2** doğru `kind` yerleşimi | §2 I-4 / I-8 + not · §3 · §4.3 |

Bu iki değişiklik **yalnız karar belgesindedir**: ürün verisi, testler ve `kind` göçü
**dokunulmadı**.

**Durum:** belge **commit edilmeye hazır** — `_AGENT_EXCHANGE/decisions/` altına, dalda,
`main`'e doğrudan değil.

---

## 8. Guardrail

- Bu belge **alan tanımıdır**, içerik kararı değildir.
- **"`official`'da var → `taught`'a ekle" otomatizmi YOKTUR.** (`KANJI-FIX-FAZI-...-v2` R5 ile uyumlu:
  eksik resmî okuma önce `official*`'a girer; `taught` kararı ayrı pedagojik QA turudur.)
- Bu belge, `AGENTS.md`'nin dal + bağımsız denetim + kapı sırasını **değiştirmez**.
- Canonical olması için `_AGENT_EXCHANGE/decisions/` altına commit edilmesi gerekir
  (`DECISION-001`: bulut belgesi commit edilene kadar canonical değildir). **Commit henüz yapılmadı;
  v3 itibarıyla hazır.**
