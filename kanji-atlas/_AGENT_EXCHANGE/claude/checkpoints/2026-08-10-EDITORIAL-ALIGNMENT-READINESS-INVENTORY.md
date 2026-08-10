# Editoryal Uyumlama — Hazırlık Envanteri (SALT-OKUNUR)

**Durum:** TAMAMLANDI — ürün/veri/test/karar değişikliği YOK · commit YOK · Codex denetimi bekleniyor
**Taban / dal:** `9f1072e…` · `onboarding-b2-gate3` · başlangıç ağacı temiz
**Yetki:** `shared/CODEX-PAUSE-CLAUDE-CONTINUATION-2026-08-07.md` §izin verilen ek hazırlık · Zeynep+Codex onayı
**Kaynak liste:** `imports/…/EDITORYAL-UYUMLAMA-BEKLEYEN.md` (**12 kalem**: 1·2·12·3·4·5·6·7·8·9·10·11) · ölçüm: `evidence/2026-08-10-editorial-readiness/measurements.json` (deterministik; `_meta.sourceFileSha256` + §Yeniden Üretim)

> Bu belge **yalnız ölçer ve sınıflar**. Hiçbir kayıt/metin/kategori/okuma değiştirilmedi; pedagojik veya
> yaratıcı karar üretilmedi. Uygulama yetkisi vermez.

## Bağlam (ölçüldü)
- Toplam kayıt **98** · `reviewed` **58** · `drafted` **1** (九).
- **~103 reviewed hedefine ulaşılmadı (58/103).** Zeynep planı: büyük dil standardizasyonu ~103'te tek seferde →
  **kalem 1, 2, 12 ERTELENMİŞ kalır** (bu envanter bunu doğrular, değiştirmez).
- **Kullanıcıya yanlış bilgi gösteren kayıt: 0** (kaynak listesi satır 3 ile uyumlu; item 1 kaynaksız-gerekçe,
  item 3 render edilmiyor — aşağıda).

## Öncelik kovaları (Codex sırası)
1. **Kullanıcıya yanlış bilgi:** — **boş** (hard hata yok). *Sınırda:* item 1 (kaynaksız ses gerekçesi, ertelenmiş), item 3 (yalnız 東 `active` olursa).
2. **Veri bütünlüğü & test güvenliği:** item 9 (名 音 eksik), item 7 (reviewed ama summaryTr yok).
3. **Tutarlı öğrenme:** item 5 (kategori), item 4 (口 terim), item 6 (legacy pictogram ses uyumu), item 2/12 (ERTELENMİŞ).
4. Erişilebilirlik/telefon-tablet: bu listede yok.
5. Native/mağaza: bu listede yok.
6. **Ertelenmiş kozmetik:** item 10 (名 legacy kalıntı), item 8/11 (authoring'e bağlı).

## 12 kalem — sınıf · etkilenen · kanıt · risk
> Kaynak tablo sırası 1·2·**12**·3…11'dir; toplam **12/12** kalem ölçüldü. `measurements.json`'da kalem 4
> iki alt-anahtar taşır (`item4_右`, `item4_名`); kalem 12 açık `scanVerdict:"notMeasured"` + objektif aday havuzu.

| # | Kalem | Sınıf | Etkilenen kayıt/alan | Kanıt (ölçüm) | Risk | Kova |
|---|---|---|---|---|---|---|
| 1 | 借りて hizalama | **kısmen çözülmüş · ERTELENDİ (~103, item2'ye birleşik)** | 四·東 (reviewed) + 九 (drafted) · summaryTr/etymology | 六·七·八 **temiz**; 四=1, 東=1 eşleşme; **九 = 4 eşleşme / 3 benzersiz ibare** ("sesi nedeniyle" hem summaryTr hem disagreementNote'ta) | Düşük — kaynaksız gerekçe, yanlış değil | 1(sınır) |
| 2 | Oluşum türü dili std. | **hâlâ gerekli · ERTELENDİ (~103)** | reviewed kayıtların formationType/summaryTr dili | dağılım 象形22·指事6·形声15·会意形声5·会意11 | Düşük — tutarlılık | 3 |
| 12 | Çıkarılabilir-ayrıntı taraması | **hâlâ gerekli · ERTELENDİ (Zeynep 2026-07-25: şimdi yapılmaz)** | B-confidence reviewed kayıtlar | `scanVerdict:"notMeasured"` (creative tarama ertelenmiş) · **aday havuzu ölçüldü: 15 B-confidence reviewed** (季 百 千 土 右 前 後 東 北 赤 青 名 行 来 食; reviewed conf A:43/B:15) | Düşük — tarama sonucu üretilmedi | 2/3 |
| 3 | 東 memory_hint çelişkisi | **zaten zararsız · karar gerekiyor** | 東 `memory_hint_tr` | `mnemonic.status=not_required`, **render=false** | Yalnız 東 `active` olursa yüzeyde | 1(potansiyel) |
| 4 | 口 "ağız" mı "söz" mü | **hâlâ gerekli · karar gerekiyor (terim)** | 右 vs 名 · component_meanings/summaryTr | 右↔名 farkı ölçüldü | Düşük — tutarlılık | 3 |
| 5 | Kategori tutarsızlığı | **hâlâ gerekli · karar gerekiyor (hedef şema)** | 北南西東=Yönler · 左右前後上下中=Yön ve konum · 外=Günlük yaşam | 3 ayrı şema doğrulandı | Orta — kullanıcı-görünür gruplama | 3 |
| 6 | 30 legacy pictogram_note | **hâlâ gerekli · authoring/karar** | pictogram_note taşıyan 47 (30 iskelesiz + 17 reviewed) | ölçüldü | Düşük | 3 |
| 7 | 大 天 夫 本 国 summaryTr yok | **hâlâ gerekli · authoring gerekiyor** | 5 kayıt · summaryTr | 5/5 reviewed, summaryTr **yok**, pictogram_note var | Orta — reviewed kaydın görünen kökeni v2 kalıntısından | 2 |
| 8 | 名 summaryTr akıcılık | **karar/authoring (creative)** | 名 · summaryTr | ölçüldü | Düşük | 6 |
| 9 | 名 音 ミョウ eksik | **hâlâ gerekli · ayrı veri turu** | 名 · officialOn/deferred (iskele yok) | onyomi=`メイ`, iskele **yok**; Kanjipedia メイ・ミョウ (PDF denetimi gerekli) | Düşük — eksik, yanlış değil; yüzey değişmez | 2 |
| 10 | 名 pictogram_note kalıntı | **ertelenmiş kozmetik** | 名 · pictogram_note | ölçüldü | Yok (render edilmiyor) | 6 |
| 11 | 九 mnemonic alanı yok | **hâlâ gerekli · 九 authoring'e bağlı** | 九 · mnemonic | 九 `drafted`, mnemonic **yok** | Düşük — 九 açılınca | 6 |

## Önerilen küçük-batch sırası (YALNIZ ÖNERİ — yetki değil)
Öncelik: yanlış-bilgi > veri bütünlüğü/test > tutarlı öğrenme > erişilebilirlik > native > kozmetik. ~103 ertelemesi ve "karar uydurma" yasağı korunur.

1. **[Veri bütünlüğü] 名 音 ミョウ mikro-veri turu (kalem 9)** — *önerilen ilk uygulanabilir iş.* `b93db57`/sei-ato deseni:
   önce **名 için resmî PDF denetimi** (salt-okunur), sonra iskele + `officialOn:[メイ,ミョウ]` + `deferred(ミョウ, on, "öğretilmiyor")`; **yüzey `メイ` değişmez** (kurulu "official-not-taught" politikası — yeni karar değil). Yeni regresyon kapısı + negatif enjeksiyonlar; 5 ürün/test yolu; geri alınabilir; kapı-uyumlu.
2. **[Tutarlı öğrenme] Kategori şeması kararı (kalem 5)** — önce **Zeynep ürün kararı** (hedef gruplama), sonra mekanik `category` birleştirme. Karar öncesi uygulanamaz.
3. **[Önleyici] 東 memory_hint (kalem 3)** — düşük; 東 authoring turunda ele alınması yeterli (şu an render edilmiyor).
4. **[~103'te tek seferde] kalem 1 + 2 (+12)** — dil standardizasyonu; 58→~103 reviewed'da. *Fırsatçı:* 四/東 tek tek reviewed turuna girerse 借りて ibaresi o turda çıkarılmalı.
5. **[Authoring turları] kalem 7, 8, 4, 6, 11** — summaryTr/terim/mnemonic yazımı creative; ayrı authoring sözleşmeleri (Claude tek başına karar veremez).
6. **[Kozmetik] kalem 10** — en sona.

## Yeniden Üretim (deterministik)

`measurements.json` aşağıdaki betikle üretildi. **Date/rastgelelik yok** → aynı `index.html` + aynı betik =
**byte-identical** JSON. Kaynak dosyanın SHA-256'sı `_meta.sourceFileSha256`'a yazılır. Betik yalnız okur.

**Komut (kanji-atlas/ içinden):**
```
node measure_editorial.mjs _AGENT_EXCHANGE/claude/evidence/2026-08-10-editorial-readiness/measurements.json
```
`_meta.sourceFileSha256` bu turda: `51a12c75754fa85c1a0b8beed9e2f932d9d45c7d5903917d7f4d16c94b6f46e7` (== `index.html`).

**measure_editorial.mjs (tam betik):**
```js
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
const src = readFileSync("index.html", "utf8");
const sha = createHash("sha256").update(readFileSync("index.html")).digest("hex");
const D = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]).chars;
const rec = c => Object.values(D).find(k => k.character === c);
const ety = k => (k && k.etymology) || {};
const qa = k => (k && k.etymology && k.etymology.qaStatus) || (k && k.qaStatus) || null;
const conf = k => (k && k.etymology && k.etymology.confidence) || (k && k.confidence) || null;
const summ = k => ((k && k.etymology && k.etymology.summaryTr) || (k && k.summaryTr) || null);
const M = {};
M._meta = { generator: "checkpoints/2026-08-10-EDITORIAL-ALIGNMENT-READINESS-INVENTORY.md §Yeniden Üretim",
  sourceFile: "kanji-atlas/index.html", sourceFileSha256: sha, deterministic: true,
  note: "Salt-okunur; Date/rastgelelik yok. Aynı sourceFileSha256 → byte-identical çıktı." };
M.context = { totalRecords: Object.keys(D).length,
  reviewed: Object.values(D).filter(k => qa(k) === "reviewed").length,
  drafted: Object.values(D).filter(k => qa(k) === "drafted").length };
const P1 = ["sesi uygun düştüğü", "benzer sesli", "sesi için", "sesi nedeniyle"];
M.item1 = { records: {} };
for (const c of ["四","六","七","八","東","九"]) { const k = rec(c), e = ety(k);
  const fields = { summaryTr: summ(k), disagreementNote: e.disagreementNote, memory_hint_tr: k && k.memory_hint_tr };
  const hits = []; for (const [fn, val] of Object.entries(fields)) if (val) for (const p of P1) if (String(val).includes(p)) hits.push({ field: fn, phrase: p });
  M.item1.records[c] = { qaStatus: qa(k), matchCount: hits.length, distinctPhrases: [...new Set(hits.map(h => h.phrase))].length, hits }; }
M.item1.clean = Object.entries(M.item1.records).filter(([, v]) => v.hits.length === 0).map(([c]) => c);
M.item1.dirty = Object.entries(M.item1.records).filter(([, v]) => v.hits.length > 0).map(([c]) => c);
const ft = {}; for (const k of Object.values(D)) { const f = ety(k).formationType; if (f) ft[f] = (ft[f] || 0) + 1; }
M.item2 = { formationTypeDistribution: ft, reviewedCount: M.context.reviewed, note: "~103 reviewed toplu standardizasyon; item1(借りて) buraya birleşik" };
{ const k = rec("東"); M.item3 = { memory_hint_tr: k && k.memory_hint_tr, mnemonicStatus: k && k.mnemonic && k.mnemonic.status, qaStatus: qa(k), renderedNow: (k && k.mnemonic && k.mnemonic.status === "active") }; }
for (const c of ["右","名"]) { const k = rec(c); M["item4_" + c] = { component_meanings: k && k.component_meanings, summaryTr: summ(k) }; }
M.item5 = {}; for (const c of ["北","南","西","東","左","右","前","後","上","下","中","外"]) { const k = rec(c); M.item5[c] = k && k.category; }
M.item5_distinct = [...new Set(Object.values(M.item5))];
const withPn = Object.values(D).filter(k => k.pictogram_note && String(k.pictogram_note).trim().length > 0);
M.item6 = { recordsWithPictogramNote: withPn.length, byQa: withPn.reduce((o, k) => { const s = qa(k) || "none"; o[s] = (o[s] || 0) + 1; return o; }, {}) };
M.item7 = {}; for (const c of ["大","天","夫","本","国"]) { const k = rec(c); M.item7[c] = { qaStatus: qa(k), hasSummaryTr: !!summ(k), hasPictogramNote: !!(k && k.pictogram_note) }; }
{ const k = rec("名"); M.item8 = { summaryTr: summ(k), qaStatus: qa(k) }; }
{ const k = rec("名"); M.item9 = { onyomi: k && k.onyomi, kunyomi: k && k.kunyomi, hasReadingsSkeleton: !!(k && k.readings && k.readings.officialOn), kanjipediaClaim: "メイ・ミョウ (belge; PDF denetimi gerekli)" }; }
{ const k = rec("名"); M.item10 = { hasPictogramNote: !!(k && k.pictogram_note), qaStatus: qa(k), hasSummaryTr: !!summ(k) }; }
{ const k = rec("九"); M.item11 = { hasMnemonic: !!(k && k.mnemonic), qaStatus: qa(k) }; }
const reviewed = Object.values(D).filter(k => qa(k) === "reviewed");
const confDist = {}; for (const k of reviewed) { const c = conf(k) || "none"; confDist[c] = (confDist[c] || 0) + 1; }
const bList = reviewed.filter(k => conf(k) === "B").map(k => k.character);
M.item12 = { scanVerdict: "notMeasured",
  notMeasuredReason: "Çıkarılabilir-ayrıntı taraması creative editoryal iştir; Zeynep 2026-07-25 'ŞİMDİ YAPILMAZ' (kalan kırmızı turlar 南/白 testi gerçek vakada sınar, şimdi kapsam büyütür). Sayısal tarama sonucu üretilmez.",
  candidatePoolReviewedConfidenceDist: confDist, candidatePoolBConfidenceReviewedCount: bList.length, candidatePoolBConfidenceReviewed: bList };
writeFileSync(process.argv[2], JSON.stringify(M, null, 2) + "\n");
```
Doğrulama (bu turda koşuldu): aynı komutun ikinci koşumu `measurements.json` ile **byte-identical**;
`_meta.sourceFileSha256` diskteki `index.html` SHA-256'sıyla eşit (`git-status-after.txt` + `product-sha-before-after.txt`).

## Guardrail
- Bu tur yalnız `checkpoints/` raporu + `evidence/2026-08-10-editorial-readiness/` yazdı; **ürün/veri/test/manifest/karar/spec değişmedi**.
- Hiçbir pedagojik/yaratıcı/ürün kararı verilmedi; "karar gerekiyor" kalemleri Zeynep/Codex'e soru olarak bırakıldı.
- Zeynep'in ~103-reviewed ertelemesi korundu; hiçbir kalem uygulamaya yetkilendirilmedi.
