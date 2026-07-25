/* AUTHORING Parti 11 · 百 千 円 金 — DRAFTED (KULLANICIYA GİZLİ).
   Zeynep: 万・来・西 (借りて üslup kararı bekliyor), 白 (kırmızı), 今・父・南 (çatal riski) bu tura
   ALINMADI. Ön-tarama önce yapıldı; parti kesin liste oluştuktan SONRA yazıldı.

   ÖN-TARAMA SONUCU: dördü de Kanjipedia'ya göre **形声**. Bileşim değişmedi (hiçbiri partiden
   çıkarılacak kadar sorunlu değil), ama iki gerçek çatal ve iki sunum kararı çıktı.

   KAYNAK TEYİDİ (ESAS Kanjipedia + 説文解字 漢典'den FETCH EDİLEREK):
   百 0005920000「形声。一（数のはじめ）と、音符白(ハク)から成る。大きな数、「ひゃく」の意を表す。」
             説文「十十也。从一白。數，十百爲一貫。相章也。」→ 从一白, 聲 YOK → 会意 okur. ÇATAL → B
   千 0004026200「形声。十（数の意）と、音符人(ジン)→(セン)とから成る。百の十倍の数の「せん」を表す。」
             説文「十百也。从十从人。此先切」→ 从十从人, 聲 YOK → 会意 okur. ÇATAL → B
   円 0000436000「旧字は、形声。囗と、音符員(ヱン)とから成る。まるいもの、また、欠けたところのない
             ものの意を表す。教育用漢字は省略形による。」
             説文(圓)「圜全也。从囗員聲，讀若員。」→ BİREBİR aynı (囗 + 員聲) → A
   金 0001604700「形声。意符土（つち）と、八（鉱物を示す形）と、音符今(キム、コム)とから成る。
             土の中にふくまれている鉱物の意を表す。」
             説文「…生於土，从土；左右注，象金在土中形；今聲。」→ BİREBİR aynı → A

   mnemonic: pending_review. Bu turda active üretme hedefi YOK (Zeynep); karar reviewed'da 4-soru
   + 4 kalite testi + T3 görev ayrımı ile verilecek. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const KP = id => "https://www.kanjipedia.jp/kanji/" + id;
const TYPES = ["象形", "指事", "会意", "形声", "会意形声"];

const RECORDS = {
  "百": {
    formationType: "形声", confidence: "B",
    summaryTr: "一 sayıların başlangıcını gösterir. 白 ise anlamıyla değil, okunuşuyla katkı yapar.",
    sources: [KP("0005920000")],
    disagreementNote:
      "TASLAK · ÇATAL VAR. ESAS Kanjipedia 0005920000:「形声。一（数のはじめ）と、音符白(ハク)から成る。"
      + "大きな数、「ひゃく」の意を表す。」 → 一 = anlam (sayıların başlangıcı), 白 = 音符 (SES). "
      + "|| ÇAPRAZ 説文解字 (漢典'den fetch edilerek):「十十也。从一白。數，十百爲一貫。相章也。」 → "
      + "「从一白」 der ve 聲 İŞARETLEMEZ; yani 白'ı ses değil ANLAM bileşeni sayar (会意 okuması). "
      + "Gerçek bir oluşum-türü çatalı → en zayıf halka → confidence B (taslak). 千 ile AYNI desen. "
      + "|| SES YAZILMADI — bilinçli: Kanjipedia 白'ın katkısını ハク diye veriyor, ama 百'nün okunuşu "
      + "ヒャク'dur. Kilitli ev örneklerinde (時→ジ, 晴→セイ, 聞→ブン) verilen ses karakterin okunuşuyla "
      + "ÖRTÜŞÜR; burada örtüşmüyor. 'ハク sesini verir' yazmak öğrenene yanlış bir eşleşme öğretirdi. "
      + "Bu yüzden 話'nin kilitli çözümü uygulandı: ses belirtilmeden 'okunuşuyla katkı yapar' denildi. "
      + "|| FOLK ETİMOLOJİ ENGELLENDİ (Zeynep uyarısı): 白 burada 'beyaz' DEĞİLDİR ve metin bunu açıkça "
      + "söylüyor ('anlamıyla değil'). Modern biçme bakıp 'beyaz bir şeyin yüzü' tipi hikâye üretilmedi."
  },
  "千": {
    formationType: "形声", confidence: "B",
    summaryTr: "十 sayı anlamı verir. Üstteki parça ise anlamıyla değil, okunuşuyla katkı yapar ve セン sesini verir.",
    sources: [KP("0004026200")],
    disagreementNote:
      "TASLAK · ÇATAL VAR. ESAS Kanjipedia 0004026200:「形声。十（数の意）と、音符人(ジン)→(セン)とから"
      + "成る。百の十倍の数の「せん」を表す。」 → 十 = anlam (sayı), 人 = 音符 (SES, ジン→セン). "
      + "|| ÇAPRAZ 説文解字 (漢典'den fetch edilerek):「十百也。从十从人。此先切」 → 「从十从人」 der ve "
      + "聲 İŞARETLEMEZ (会意 okuması). BİLEŞENLER İKİ KAYNAKTA AYNI (十 + 人); ayrılık yalnız 人'in ses "
      + "taşıyıp taşımadığında. Gerçek oluşum-türü çatalı → confidence B (taslak). 百 ile AYNI desen — "
      + "説文'ın sayı karakterlerini bileşen bazlı (会意) okuma eğilimi. "
      + "|| GÖRÜNÜR METİN KARARI: 人 ADLANDIRILMADI, 'üstteki parça' dendi. Sebep: bugünkü 千'de üst "
      + "parça 丿 biçimindedir, 人 olarak görünmez; öğrenene göremediği bir parçanın adını vermek kafa "
      + "karıştırır (書 ve 先'deki kilitli çözümün aynısı). "
      + "|| SES YAZILDI (百'den farklı olarak): Kanjipedia ses değişimini açıkça (ジン)→(セン) diye "
      + "gösteriyor ve セン, 千'nin gerçek okunuşudur → örtüşme var, ev kalıbı sorunsuz uygulandı. "
      + "|| MODERN BİÇİMDEN HİKÂYE ÜRETİLMEDİ (Zeynep uyarısı): 千'nin 丿+十 görünümünden 'bir insan ve "
      + "on' tipi bir anlatı kurulmadı; kaynak ne diyorsa o yazıldı."
  },
  "円": {
    formationType: "形声", confidence: "A",
    summaryTr: "Bu açıklama eski biçim 圓 içindir: dıştaki 囗 anlam bileşenidir, 員 ise anlamıyla değil okunuşuyla katkı yapar ve エン sesini verir. Bugünkü 円, bu eski biçimin kısaltılmış hâlidir.",
    sources: [KP("0000436000")],
    disagreementNote:
      "TASLAK · İHTİLAF YOK, ama SUNUM KARARI var. ESAS Kanjipedia 0000436000:「**旧字は**、形声。囗と、"
      + "音符員(ヱン)とから成る。まるいもの、また、欠けたところのないものの意を表す。**教育用漢字は省略形による。**」 "
      + "|| ÇAPRAZ 説文解字 (圓 maddesi, 漢典'den fetch edilerek):「圜全也。从囗員聲，讀若員。」 → "
      + "BİREBİR aynı: 囗 + 員(聲). İki kaynak tam uyumlu → confidence A (taslak). "
      + "|| ⚠️ SUNUM KARARI (Zeynep uyarısı: 'güncel şeklin her çizgisine tarihsel görev yükleme'): "
      + "Bu etimoloji **圓'a aittir, 円'a değil.** Bugünkü 円'nin çizgileri 囗 ve 員'i TAŞIMAZ; kaynak "
      + "bunu açıkça söylüyor (教育用漢字は省略形による). Bu yüzden görünür metin, açıklamanın eski biçim "
      + "için olduğunu BAŞTAN söyleyerek başlıyor ve son cümlede bugünkü biçmin kısaltma olduğunu "
      + "belirtiyor. Alternatif (etimolojiyi doğrudan 円'a atfetmek) öğrenene yanlış bir çizgi-bileşen "
      + "eşleşmesi öğretirdi. "
      + "|| 囗'nun ANLAMI YAZILMADI — bilinçli: Kanjipedia 囗'ya açık bir anlam glossu VERMİYOR, yalnız "
      + "員'i 音符 diye işaretliyor (dolayısıyla 囗 anlam tarafıdır). 説文'un 圜 ('yuvarlak/çevrelemek') "
      + "tanımı bu yönü destekler ama 囗'ya doğrudan atfedilmiş bir gloss değildir → 'anlam bileşenidir' "
      + "denip bırakıldı, 'çevre/kuşatma' gibi bir çıkarım EKLENMEDİ. "
      + "|| Karakterin anlamı (yuvarlak / yen) kartın anlam alanında zaten yazılı → çıplak bilgi kuralı "
      + "gereği köken metninde tekrar edilmedi."
  },
  "金": {
    formationType: "形声", confidence: "A",
    summaryTr: "土 toprak anlamı verir; içindeki iki nokta toprağın içindeki madeni gösterir. 今 ise anlamıyla değil, okunuşuyla katkı yapar.",
    sources: [KP("0001604700")],
    disagreementNote:
      "TASLAK · İHTİLAF YOK. ESAS Kanjipedia 0001604700:「形声。意符土（つち）と、八（鉱物を示す形）と、"
      + "音符今(キム、コム)とから成る。土の中にふくまれている鉱物の意を表す。」 "
      + "|| ÇAPRAZ 説文解字 (漢典'den fetch edilerek):「五色金也。黃爲之長。久薶不生衣，百鍊不輕，从革不違。"
      + "西方之行。生於土，**从土**；**左右注，象金在土中形**；**今聲**。」 → BİREBİR aynı üç bileşen: "
      + "土 (anlam/toprak) · yanlardaki iki nokta (toprağın içindeki maden) · 今 (SES). İhtilaf yok → "
      + "confidence A (taslak). "
      + "|| ⚠️ FOLK ETİMOLOJİ KONTROLÜ (Zeynep uyarısı: 'altın külçeleri / maden parçaları gibi yaygın "
      + "görsel hikâyeler kaynak desteklemiyorsa metne alınmasın'): Bu kayıtta hikâye YAYGIN AMA AYNI "
      + "ZAMANDA KAYNAKLI — Kanjipedia 八'i 「鉱物を示す形」 (maden gösteren biçim), 説文 ise 「左右注、"
      + "象金在土中形」 (sağ ve soldaki noktalar madenin toprak içindeki hâlini resmeder) diyor. Yani "
      + "'toprak içindeki maden' okuması UYDURMA DEĞİL, iki kaynakta da var → metne alındı. "
      + "AMA 'altın külçesi/külçeler' DENMEDİ: kaynaklar 鉱物/金 (maden) diyor, külçe demiyor; ayrıca "
      + "説文 「五色金也」 (beş rengin madeni) ile 金'i GENEL MADEN olarak tanımlıyor, altın yalnızca "
      + "bir alt anlam. Bu yüzden görünür metinde 'maden' kullanıldı, 'altın' kullanılmadı. "
      + "|| SES YAZILMADI — bilinçli: Kanjipedia 今'in katkısını (キム、コム) tarihsel biçimiyle veriyor; "
      + "金'nin bugünkü okunuşu キン'dir. Örtüşme olmadığı için 百'deki gerekçeyle aynı şekilde ses "
      + "belirtilmedi (話 kilitli çözümü). "
      + "|| 八 ADLANDIRILMADI: kaynak 八 diyor ama bugünkü 金'de bu parça iki nokta olarak görünür; "
      + "'八' demek öğrenene 'sekiz' çağrışımı yaptırırdı (分/半'de 八'in 'bölme' işlevi ayrıca "
      + "öğretiliyor — çelişki riski). 'İçindeki iki nokta' denildi; 説文'un 「左右注」 tanımıyla uyumlu."
  }
};

const applied = [];
for (const [ch, spec] of Object.entries(RECORDS)) {
  const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === ch);
  if (!id) throw new Error(ch + " bulunamadı");
  const rec = DATA.chars[id];
  if (rec.etymology) throw new Error(ch + " zaten etymology taşıyor");
  if (rec.mnemonic) throw new Error(ch + " zaten mnemonic taşıyor — elle bak");
  if ((rec.pictogram_note || "").trim()) throw new Error(ch + " legacy (pictogram_note dolu) — B0 ihlali");

  const ETY = {
    formationType: spec.formationType,
    formationTypeSource: "Kanjipedia",
    confidence: spec.confidence,
    summaryTr: spec.summaryTr,
    sources: spec.sources,
    disagreementNote: spec.disagreementNote,
    qaStatus: "drafted"
  };
  const next = Object.assign({}, rec, { etymology: ETY, mnemonic: { status: "pending_review" } });

  if (next.etymology.qaStatus !== "drafted") throw new Error(ch + ": qaStatus drafted olmalı");
  if (next.etymology.reviewedAt) throw new Error(ch + ": reviewedAt VERİLMEZ");
  if (["A","B"].indexOf(next.etymology.confidence) < 0) throw new Error(ch + ": taslak confidence A/B bekleniyor");
  if (TYPES.indexOf(next.etymology.formationType) < 0) throw new Error(ch + ": geçersiz formationType");
  if (next.mnemonic.status !== "pending_review") throw new Error(ch + ": mnemonic pending_review olmalı");
  if (next.etymology.sources.length !== 1) throw new Error(ch + ": tek kaynak künyesi bekleniyor");
  if (!/kanjipedia\.jp\/kanji\/\d{10}$/.test(next.etymology.sources[0])) throw new Error(ch + ": kaynak URL biçimi hatalı");
  if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error(ch + ": components değişmemeli");
  if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error(ch + ": component_meanings değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");
  if (next.etymology.summaryTr === (next.memory_hint_tr || "")) throw new Error(ch + ": Kökeni ile Hafıza aynı olamaz");
  /* Folk-etimoloji güvenceleri (Zeynep uyarıları) */
  if (ch === "百" && /beyaz/i.test(next.etymology.summaryTr)) throw new Error("百: 'beyaz' folk etimolojisi metne giremez");
  if (ch === "金" && /(altın|külçe)/i.test(next.etymology.summaryTr)) throw new Error("金: 'altın/külçe' metne giremez (kaynak 'maden' diyor)");
  if (ch === "円" && !/eski biçim/i.test(next.etymology.summaryTr)) throw new Error("円: metin eski biçim (圓) çerçevesini belirtmeli");

  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error(ch + ": kayıt kaynakta bire bir bulunamadı");
  src = src.replace(oldSub, JSON.stringify(next));
  applied.push({ ch, id, conf: spec.confidence, type: spec.formationType, len: ETY.summaryTr.length });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 11 DRAFTED yazıldı (4 kayıt, hepsi 形声, qaStatus=drafted, KULLANICIYA KAPALI):");
for (const a of applied) console.log("  " + a.ch + " (" + a.id + ") · " + a.type + " · conf " + a.conf + " · summaryTr " + a.len + " kr · mnemonic pending_review");
console.log("百 ve 千: 説文 çatalı (形声 vs 会意) → B · 円 ve 金: iki kaynak birebir → A");
console.log("reviewedAt YOK · reviewed + mnemonic kararı AYRI turda (Zeynep).");
