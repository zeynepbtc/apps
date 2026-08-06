# Kanji İçerik Doğruluğu Denetimi (v2) — Plan & Durum

> Bu, 91 kanjinin köken/yapı/bileşen-işlevi/hatırlatıcı/okuma denetiminin **canlı çalışma kaydıdır.** Kaybolmaması için tutuluyor. Kardeş not: `KANJI-KART-KOKEN-vs-HATIRLATICI-arastirma.md` (araştırma) ve `URETIM-YOL-HARITASI-GENIS-TABLO.md` (genel roadmap).
> Tarih: 2026-07-24 · Branch: `onboarding-b2-gate3` · HEAD: `2efd279` · **Bu süreçte kod DEĞİŞMEDİ.**

## Nerede duruyoruz (durum)
- **Aşama:** Ön rapor (envanter + kaynak hiyerarşisi + pilot planı + belirsizlik yönetimi) çıkarıldı. **5 kanjilik pilotun ÇALIŞTIRILMASI için Zeynep onayı bekleniyor.**
- Sıra (Zeynep + GPT onaylı): 1) 5 kanji pilot doğruluk denetimi → 2) içerik modeli & kaynak politikası kilitle → 3) 91 tam tarama → 4) P0/P1 içerik düzeltmeleri → 5) UI başlıkları + veri şeması → 6) kaynak/lisans doğrulanmış karakterlerde eski-biçim görselleri → 7) ses bileşeni + gerçek aile ilişkilerini Atlas'a yay.
- **İlke:** Bu iş "sadece Köken başlığını düzeltmek" değil; hedef kanjileri güzel hikâyelerle değil **gerçek biçim–anlam–ses ilişkileriyle** anlaşılır kılmak (Atlas'ın asıl farkı).

## 1. Gerçek veri şeması (koddan, tahmin değil)
`DATA.chars`: 98 kayıt = **91 kanji + 7 radikal.** Her kanjide alanlar tek tip:
`id, character, type, meaning_tr, meaning_en, onyomi, kunyomi, romaji, stroke_count, jlpt_level, category, components, component_meanings, parent_components, related_characters, examples, position_variants, pictogram_note, stroke_order_steps, memory_hint_tr, visual_mnemonic_type, n5_words` (+ `quiz_items` sadece 8 kanjide).

Kartla eşleşme: **"Kökeni" = `pictogram_note`** · "neyden oluşur" ağacı = `components`+`component_meanings` · **"Hatırlatıcı" = `memory_hint_tr`**.

### Üç yapısal sorun (kanıtlı)
1. Köken alanının adı **`pictogram_note`** → şema seviyesinde "her kanji piktogramdır" varsayımı gömülü (91/91).
2. Köken == Hatırlatıcı **birebir aynı olabiliyor**: 男'de ikisi de "Tarlada güç harcayan: erkek." (aynı string). Katmanlar çökmüş.
3. **Bileşen rolü / oluşum türü / kaynak / güven alanı YOK.** `component_meanings` sadece Türkçe anlam veriyor, rol (anlam/ses/biçim/boş) yok → ses bileşeni gösterilemiyor. Aşırı parçalama riski: 語 = 言+五+口 (doğrusu 言 + ses bileşeni 吾).
4. "Neden böyle?" katmanının ayrı metin alanı yok → bileşen ağacından türetiliyor; 3 katman 2 alana sıkışmış.

## 2. Kaynak hiyerarşisi (KİLİTLİ — GPT düzeltmeleriyle)
| Katman | Birincil | Ne için |
|---|---|---|
| Okuma & kullanım | **文化庁 常用漢字表** | Resmî on/kun, okuma kapsamı, 常用 statüsü. N5 kapsamı ayrı; okuma "yok" denmez → "N5'te öğretilmiyor". |
| Anlam/oluşum türü/etimoloji | **Kanjipedia / 漢検 (角川新字源)** | 象形/指事/会意/形声, anlam/ses bileşeni, çoklu görüş. |
| Bileşen işlevi & pedagoji | Outlier — **yalnız çerçeve** | form/anlam/ses + boş bileşen. Tek etimoloji hakemi DEĞİL; iddia Japonca sözlükle çapraz doğrulanır. |
| İkincil | Akademik/saygın sözlük | Çelişki çözme, tarihsel biçim. |
| Sadece pazar/pedagoji | Tofugu/WaniKani/KanjiDamage/blog | Yöntem/mnemonic örneği. Tarihsel gerçek kaynağı DEĞİL. |
Kural: her tarihsel iddiada kaynak URL'si (karakter sayfası, genel arama değil). Kaynak ≠ çıkarım (ayrı yazılır). Çelişki → "görüş ayrılığı" işaretlenir, sessizce taraf seçilmez.

## 3. Beş kanjilik pilot (seçim + gerekçe)
| Kanji | Neden | Test ettiği kriter |
|---|---|---|
| 男 (otoko) | Köken==Hatırlatıcı aynı string; 力 rolü (saban/güç) gizli | Köken/mnemonic ayrımı |
| 月 (tsuki) | Köken doğru ama görselsiz kopuk; app'te sadece ゲツ, resmî ガツ eksik | Tarihsel-modern + resmî okuma |
| 時 (toki) | **形声**: 日(anlam)+寺(ses, *ji*); app "güneşle ölçülen zaman" deyip sesi gizliyor | Ses bileşenini gösterme |
| 明 (akarui) | 会意 (日+月); tarihsel görüşte 日 aslında 囧 (pencere) olabilir | Görüş ayrılığını saklamama |
| 休 (yasumu) | 亻+木, temiz/doğru 会意 | Doğru olanın bozulmadan geçmesi |
Her pilot kanji: GPT'nin 32 sütunlu şemasıyla denetim satırı (CSV+MD), severity P0–P3, güven A–X.

## 4. Belirsizlik yönetimi
Güven: **A** (iki güvenilir/resmî uyumlu) · **B** (genel kabul, ayrıntı farkı) · **C** (ciddi görüş ayrılığı → kesin köken sunulmaz) · **D** (sadece öğretim hikâyesi → etimoloji alanına giremez, açık "Hatırlatıcı") · **X** (doğrulanmadı → yayınlanmaz).
İlke: doğrulanamayan alanı boş bırak > hikâye uydur. Eski-biçim görseli bu turda EKLENMEZ (kaynak+lisans+eşleşme şart). Türkçe glyph bug'ı: bu turda sadece teşhis (computed font + gerçek string + normalizasyon), font peşinen suçlanmaz → `BUG-TURKCE-GLYPH-DIAGNOSIS.md`.

## 5. Pilot çıktı dosyaları (onaydan sonra üretilecek)
`KANJI-CONTENT-AUDIT-91.csv/.md`, `KANJI-CONTENT-MODEL-v2-PROPOSAL.md`, `KANJI-SOURCE-POLICY.md`, `KANJI-P0-P1-FINDINGS.md`, `BUG-TURKCE-GLYPH-DIAGNOSIS.md`. Pilot bittiğinde yalnız raporlar commit edilir; uygulama koduna dokunulmaz.

## 6. Önerilen v2 veri şeması (kod değişmeden değerlendirilecek)
`etymology{formationType, summaryTr, confidence, sources, disagreementNote, historicalFormsStatus, qaStatus}` · `structure{modernComponents:[{glyph,labelTr,role:semantic|phonetic|form|empty|uncertain,explanationTr,source}], indexingRadical, noteTr, qaStatus}` · `mnemonic{textTr, basis:historical_form|functional_components|visual_story|not_required, historicalClaim:false, qaStatus}` · `readings{officialOn, officialKun, taughtAtN5, exampleWords, source, qaStatus}`.
Kritik: `pictogram_note` her kanjiye uygun değil — her kanji piktogram varsayılmaz.
