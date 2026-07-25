/* AUTHORING Parti 9 · 書 先 食 外 — DRAFTED (KULLANICIYA GİZLİ).
   Zeynep: çekirdek 書 + 先, yanına iki temiz kayıt — "ama rastgele eklemem": önce ESAS Kanjipedia
   okunur, oluşum türü doğrulanır, confidence tahmin edilir, SONRA parti kesinleşir. Bu betik
   ön-taramanın SONUCUDUR.

   ⚠️ ÖN-TARAMA BULGUSU — 左 PARTİYE ALINMADI:
   Aday olarak okunan 左 (Kanjipedia 0002452500) 「会意形声。工と、(サ)（＝ひだり手）とから成り…」
   diyor → **会意形声**, veri setinde hiç kullanılmamış BEŞİNCİ bir oluşum türü. Triage 左'yı 会意
   sanıyordu. Yeni bir tür açmak bu partinin kapsamı değil (kapsam tek işte) → 左 ayrı ele alınacak.

   B0 (ölçüldü): dördü de BOŞ. 外'da components/component_meanings ZATEN dolu ({夕:akşam, 卜:fal})
   ve kaynakla BİREBİR uyuşuyor → dokunulmadı, yalnız köken yazıldı.

   KAYNAK TEYİDİ (Kanjipedia ESAS + 説文解字 漢典'den FETCH EDİLEREK — bellekten YAZILMADI):
   書 0003288700「形声。聿と、音符者(シヤ)→(シヨ)（曰は省略形）とから成る。筆で物事をかきつける意を表す。」
              説文「箸也。从聿者聲。」 → BİREBİR uyumlu (聿 anlam + 者 ses) → A
   先 0004040100「会意。儿と、之(し)（足あと。𠂒は変わった形）とから成り、人よりもさきだつ意を表す。」
              説文「前進也。从儿从之。」 → BİREBİR uyumlu → A
   食 0003539700「容器に食物を盛り(㿝)、上からふたをしたさま(亼)にかたどり、食物、ひいて「くう」意を表す。」= 象形
              説文「一米也。从皀亼聲。或說亼皀也。」 → ÇATAL: 説文 piktogram değil, 皀+亼(ses) okur → B
   外 0000841200「会意。夕（ゆうべ）と、卜(ぼく)（うらない）とから成る。通常は昼間に行ううらないを夜にすることから…」
              説文「遠也。卜尚平旦，今夕卜，於事外矣。」 → BİREBİR uyumlu (gece falı mantığı) → A

   mnemonic: pending_review (köken drafted). reviewed + mnemonic 4-soru kararı AYRI turda. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const KP = id => "https://www.kanjipedia.jp/kanji/" + id;

const RECORDS = {
  "書": {
    formationType: "形声", confidence: "A",
    summaryTr: "Üstteki 聿 fırça anlamı verir. Alttaki parça ise anlamıyla değil, okunuşuyla katkı yapar ve ショ sesini verir.",
    sources: [KP("0003288700")],
    disagreementNote:
      "İHTİLAF YOK. ESAS Kanjipedia 0003288700:「形声。聿と、音符者(シヤ)→(シヨ)（曰は省略形）とから成る。"
      + "筆で物事をかきつける意を表す。」 Çapraz 説文解字 (漢典'den fetch edilerek):「箸也。从聿者聲。」 "
      + "→ İki kaynak BİREBİR aynı: 聿 = anlam bileşeni (fırça), 者 = SES bileşeni. İhtilaf yok → confidence A. "
      + "|| GÖRÜNÜR METİN KARARI: ses bileşeni '者' diye ADLANDIRILMADI, 'alttaki parça' dendi. Sebep: "
      + "bugünkü 書'de 者 görünmez, alttaki 曰 者'nin kısaltılmış biçimidir (Kanjipedia: 「曰は省略形」). "
      + "Öğrenene göremediği bir parçanın adını vermek kafa karıştırır. Bu, 話'nin kilitli çözümüyle aynı "
      + "yaklaşım ('Sağdaki parça ise…'). Kısaltma bilgisi burada, denetim izinde kalır. "
      + "|| Ev kalıbı (AUTHORING-01, 形声 varsayılanı) uygulandı ve İKİ CÜMLEDE BİTİRİLDİ: kaynak "
      + "「筆で物事をかきつける意」 dese de 'yazmak' anlamı kartın başka yerinde zaten yazılı (çıplak bilgi kuralı)."
  },
  "先": {
    formationType: "会意", confidence: "A",
    summaryTr: "Üstteki parça bir ayak izini, alttaki 儿 ise bir insanı gösterir. Başkasından önde gitmekten 'önce, ileride' anlamı gelişmiştir.",
    sources: [KP("0004040100")],
    disagreementNote:
      "İHTİLAF YOK. ESAS Kanjipedia 0004040100:「会意。儿と、之(し)（足あと。𠂒は変わった形）とから成り、"
      + "人よりもさきだつ意を表す。」 Çapraz 説文解字 (漢典'den fetch edilerek):「前進也。从儿从之。」 "
      + "→ İki kaynak BİREBİR aynı bileşenleri veriyor: 儿 (insan) + 之 (ayak izi). İhtilaf yok → confidence A. "
      + "|| GÖRÜNÜR METİN KARARI: 之'nin bugünkü yazımda 𠂒 olarak DEĞİŞMİŞ biçimi olduğu notu "
      + "(Kanjipedia:「𠂒は変わった形」) metne KONMADI — 半'deki 牛 notuyla aynı gerekçe: N5 seviyesinde "
      + "biçim tarihçesi yük olur. Bu yüzden üst parça adlandırılmadı, işlevi ('ayak izi') verildi."
  },
  "食": {
    formationType: "象形", confidence: "B",
    summaryTr: "İçine yemek konmuş, üstü kapakla örtülmüş bir kabın resmidir. Buradan 'yemek' anlamı gelişmiştir.",
    sources: [KP("0003539700")],
    disagreementNote:
      "TASLAK — OLUŞUM TÜRÜ ÇATALI VAR. ESAS Kanjipedia 0003539700 象形 diyor:「容器に食物を盛り(㿝)、"
      + "上からふたをしたさま(亼)にかたどり、食物、ひいて「くう」意を表す。」 → yemek konmuş kap + üstünde kapak, "
      + "tek nesnenin resmi. "
      + "|| ÇATAL: 説文解字 (漢典'den fetch edilerek)「一米也。从皀亼聲。或說亼皀也。」 食'i bir RESİM değil, "
      + "皀 (anlam) + 亼 (SES) bileşiminden oluşan bir karakter olarak okur; hatta ikinci bir okuma daha önerir "
      + "(「或說亼皀也」). Yani 説文'a göre 食 象形 değil, ses bileşenli bir yapıdır. "
      + "|| Bu, 行'daki desenin AYNISI: modern uzlaşı (Kanjipedia, 甲骨/金文 biçimlerine dayanarak) piktogram "
      + "okur; 説文 küçük mühür yazısına bakarak bileşenlere böler. Görünür metin ESAS referansa (象形) uyar, "
      + "ama gerçek bir oluşum-türü görüş ayrılığı vardır → en zayıf halka kuralı → confidence B (taslak). "
      + "|| Kapaklı kap okuması Kanjipedia dışında da yaygındır; tartışma 'ne resmediliyor' değil, 'resim mi "
      + "yoksa bileşim mi' sorusudur — bu yüzden görünür metin güvenle yazılabildi."
  },
  "外": {
    formationType: "会意", confidence: "A",
    summaryTr: "夕 akşamı, 卜 ise fal bakmayı gösterir. Normalde gündüz bakılan fala akşam bakmaktan 'dışarısı, dışında' anlamı gelişmiştir.",
    sources: [KP("0000841200")],
    disagreementNote:
      "İHTİLAF YOK. ESAS Kanjipedia 0000841200:「会意。夕（ゆうべ）と、卜(ぼく)（うらない）とから成る。"
      + "通常は昼間に行ううらないを夜にすることから、「そと」「ほか」「よそ」、また、「はずれる」意を表す。」 "
      + "Çapraz 説文解字 (漢典'den fetch edilerek):「遠也。卜尚平旦，今夕卜，於事外矣。」 → İki kaynak "
      + "BİREBİR aynı mantığı veriyor: fal normalde sabah/gündüz bakılır; akşam bakılırsa 'işin dışında' kalır. "
      + "İhtilaf yok → confidence A. "
      + "|| VERİ TUTARLILIĞI: 外'nin components ([夕,卜]) ve component_meanings ({夕:akşam, 卜:fal}) alanları "
      + "ZATEN doluydu ve kaynakla birebir uyuşuyor → dokunulmadı, doğrulandı. "
      + "|| YAPISAL AKRABALIK (anlam çağrışımı DEĞİL): 外, reviewed 名 kaydıyla 夕 bileşenini paylaşır — "
      + "ikisinde de 夕 'akşam/karanlık' işlevindedir, tutarlı. 名'de サイ tartışması 口 içindi; 外'da 口 YOK "
      + "(卜 var) → o risk burada bulunmuyor."
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
  if (["象形","指事","会意","形声"].indexOf(next.etymology.formationType) < 0) throw new Error(ch + ": geçersiz formationType");
  if (next.mnemonic.status !== "pending_review") throw new Error(ch + ": mnemonic pending_review olmalı");
  if (next.etymology.sources.length !== 1) throw new Error(ch + ": tek kaynak künyesi bekleniyor");
  if (!/kanjipedia\.jp\/kanji\/\d{10}$/.test(next.etymology.sources[0])) throw new Error(ch + ": kaynak URL biçimi hatalı");
  if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error(ch + ": components değişmemeli");
  if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error(ch + ": component_meanings değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");
  if (next.etymology.summaryTr === (next.memory_hint_tr || "")) throw new Error(ch + ": Kökeni ile Hafıza aynı olamaz");

  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error(ch + ": kayıt kaynakta bire bir bulunamadı");
  src = src.replace(oldSub, JSON.stringify(next));
  applied.push({ ch, id, conf: spec.confidence, type: spec.formationType, len: ETY.summaryTr.length });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 9 DRAFTED yazıldı (4 kayıt, qaStatus=drafted, KULLANICIYA KAPALI):");
for (const a of applied) console.log("  " + a.ch + " (" + a.id + ") · " + a.type + " · conf " + a.conf + " · summaryTr " + a.len + " kr · mnemonic pending_review");
console.log("左 ön-taramada AYRILDI: 会意形声 (veri setinde kullanılmamış 5. tür) — ayrı ele alınacak.");
console.log("reviewedAt YOK · reviewed + mnemonic 4-soru kararı AYRI turda (Zeynep).");
