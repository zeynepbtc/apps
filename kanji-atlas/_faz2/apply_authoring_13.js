/* AUTHORING Parti 13 · 年 気 前 後 — DRAFTED (KULLANICIYA GİZLİ).
   Ön-tarama önce yapıldı; parti kesin liste oluştuktan SONRA yazıldı. Dördü de yönetilebilir çıktı
   → bileşim değişmedi. Zeynep'in DÖRT UYARISI da gerçek çıktı (aşağıda her birinin karşılığı var).

   B0 (ölçüldü): dördü de BOŞ. Karışıklık ortakları (米 气 牛 午 止 舟 刀 彳 糸 夂 毎) uygulamada YOK.

   ── KAYNAK TEYİDİ (ESAS Kanjipedia + 説文解字 漢典'den FETCH EDİLEREK) ──────────────────────
   年 0005481100「甲骨・金文は、象形。実った穀物の穂を、人が背負っている形にかたどる。みのりの意を表す。
        転じて、穀物が実る周期「とし」の意に用いる。本字は、形声で、意符の禾(か)（穀物）と、
        音符千(セン)→(ネン)とから成る。常用漢字はその変わった形。」
      説文「穀孰也。…年者、取禾一孰也。从禾。千聲。」 → 本字 analizi BİREBİR (禾 + 千聲) → A
   気 0001184900「旧字は、形声。意符米（こめ）と、音符气(キ)とから成る。食物・まぐさなどを他人に贈る
        意を表す。「餼(キ)」の原字。転じて、气の意に用いられる。教育用漢字は省略形による。」
      説文(氣)「饋客芻米也。从米气聲。」 → BİREBİR (米 + 气聲, 'konuğa yiyecek vermek') → A
   前 0004135400「会意形声。刀と、歬(セン)（すすむ。□は変わった形）とから成る。刀で切りそろえる意を
        表す。「剪(セン)」の原字。ひいて「すすむ」「まえ」の意に用いる。」
      説文: **前 MADDESİ YOK** — 漢典: 「说文解字未收录「前」字头，请参考「歬」字」. 歬 için:
        「不行而進謂之歬。从止在舟上。」 → 前 TEK KAYNAKLI → B
   後 0002095500「会意。彳と、夂(ち)（あし）と、幺(よう)（つなぐ）とから成り、足をつながれて前へ進めない
        ことから、「おくれる」、ひいて「あと」「うしろ」の意を表す。」
      説文「遲也。从彳幺夊。」 + 「幺者小也。小而行遲，後可知矣」 → BİLEŞENLER AYNI, MEKANİZMA FARKLI
        (Kanjipedia: 幺=bağlamak → ayaklar bağlı · 説文: 幺=küçük → küçük ve yavaş) → B
   ──────────────────────────────────────────────────────────────────────────────────────────

   ── ZEYNEP'İN DÖRT UYARISININ KARŞILIĞI ───────────────────────────────────────────────────
   (1) 年 — "modern biçimden 'insan + tahıl' görsel hikâyesi üretilmesin":
       Kaynak 「人が背負っている」 diyor AMA yalnız 甲骨・金文 katmanı için; bugünkü 年'de ne 禾 ne 人
       görünür. Görünür metin 本字'ın 形声 analizine + kaynağın verdiği anlam gelişimine dayanır;
       甲骨 katmanı (insan sırtında tahıl) metne ALINMADI, disagreementNote'ta duruyor.
   (2) 気 — "米'nin rolü yalnız eski biçim üzerinden":
       Metin 「Bugünkü 気, eski biçimi 氣'nin sadeleşmiş yazımıdır」 diye BAŞLIYOR; 米 yalnız 氣
       çerçevesinde anılıyor. Bugünkü 気'de 米 YOK (乂 var) — hiçbir çizgiye geriye dönük görev
       yüklenmedi.
   (3) 前 — "ayak/tekne/kesmek/ilerlemek: kaynak hangisini destekliyor?" → TEST EDİLDİ:
       · KESMEK (刀) → Kanjipedia'da VAR (「刀で切りそろえる意」)
       · İLERLEMEK (歬=すすむ) → Kanjipedia'da VAR
       · AYAK (止) ve TEKNE (舟) → Kanjipedia 前 için VERMİYOR; bunlar yalnız 歬'nin İÇİNDE ve
         yalnız 説文'un 歬 maddesinde (「从止在舟上」). Kanjipedia 歬'yi parçalarına AYIRMIYOR.
       → Görünür metinde ayak ve tekne YOK; kesmek ve ilerlemek VAR.
   (4) 後 — "'iki kişi geride yürüyor' hikâyesi kurulmasın":
       Kaynakta böyle bir şey yok. Kanjipedia üç bileşen veriyor (彳 · 夂=ayak · 幺=bağlamak) ve
       mekanizmayı açıkça söylüyor: ayaklar bağlı → ileri gidilemez → geride kalmak.
   ──────────────────────────────────────────────────────────────────────────────────────────

   SES YAZMA KARARI (AUTHORING-01 çatı ilkesi — kaynağın sesi okunuşla örtüşüyor mu?):
     年: 千(セン)→(ネン) · 年 = ネン ✓ ÖRTÜŞÜYOR → ses YAZILDI
     気: 气(キ) · 気 = キ ✓ ÖRTÜŞÜYOR → ses YAZILDI
     前: 歬(セン) · 前 = ゼン ✗ ÖRTÜŞMÜYOR (セン≠ゼン) → ses YAZILMADI (話 kalıbı)
     後: 会意 — ses bileşeni yok → konu dışı */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const KP = id => "https://www.kanjipedia.jp/kanji/" + id;
const TYPES = ["象形", "指事", "会意", "形声", "会意形声"];

const RECORDS = {
  "年": {
    formationType: "形声", confidence: "A",
    summaryTr: "Eski biçimi, tahıl anlamı veren 禾 ile okunuşuyla katkı yapıp ネン sesini veren 千'den oluşur. Tahılın bir kez olgunlaşmasından 'yıl' anlamı gelişmiştir; bugünkü 年 bu biçimin değişmiş hâlidir.",
    sources: [KP("0005481100")],
    disagreementNote:
      "TASLAK · İHTİLAF YOK, KATMAN VAR. ESAS Kanjipedia 0005481100 İKİ katman veriyor: "
      + "(a)「甲骨・金文は、象形。実った穀物の穂を、人が背負っている形にかたどる。みのりの意を表す。"
      + "転じて、穀物が実る周期「とし」の意に用いる。」 (b)「本字は、形声で、意符の禾(か)（穀物）と、"
      + "音符千(セン)→(ネン)とから成る。常用漢字はその変わった形。」 "
      + "|| ÇAPRAZ 説文解字 (漢典'den fetch edilerek):「穀孰也。…年者、取禾一孰也。**从禾。千聲。**」 → "
      + "本字 analizini BİREBİR doğruluyor (禾 anlam + 千 ses) ve anlam gelişimini de veriyor "
      + "(穀孰 = tahılın olgunlaşması; 取禾一孰 = tahılın bir kez olgunlaşması). İhtilaf yok → A. "
      + "|| KATMAN KARARI (Zeynep uyarısı 1 — 'modern biçimden insan+tahıl hikâyesi üretilmesin'): "
      + "甲骨/金文 katmanı (tahıl demetini SIRTINDA TAŞIYAN İNSAN) kaynakta GERÇEKTEN VAR, ama yalnız "
      + "en eski yazı katmanı için. Bugünkü 年'de ne 禾 ne 人 görünür. Görünür metin 本字'ın 形声 "
      + "analizine dayandırıldı; 甲骨 katmanı metne ALINMADI — üçüncü katman N5 için yük ve modern "
      + "biçme yanlış eşlenme riski taşıyor. Bilgi burada korunuyor. "
      + "|| SES YAZILDI: kaynak 千(セン)→(ネン) diyor, 年'nin okunuşu ネン — ÖRTÜŞÜYOR (çatı ilke). "
      + "|| Bileşenler bugünkü biçimde görünmediği için metin 'eski biçimi' çerçevesiyle açıldı ve "
      + "kapanışta 「常用漢字はその変わった形」 karşılığı verildi ('değişmiş hâli'). Not: kaynak burada "
      + "省略形 değil 変わった形 diyor → 'sadeleşmiş' değil 'değişmiş' kullanıldı (terim ayrımı korundu)."
  },
  "気": {
    formationType: "形声", confidence: "A",
    summaryTr: "Bugünkü 気, eski biçimi 氣'nin sadeleşmiş yazımıdır. 氣, pirinç anlamı veren 米 ile okunuşuyla katkı yapıp キ sesini veren 气'den oluşur; önce 'yiyecek vermek' anlamındaydı, sonradan 'hava, soluk' anlamında kullanılmıştır.",
    sources: [KP("0001184900")],
    disagreementNote:
      "TASLAK · İHTİLAF YOK. ESAS Kanjipedia 0001184900:「**旧字は**、形声。意符米（こめ）と、音符气(キ)"
      + "とから成る。食物・まぐさなどを他人に贈る意を表す。「餼(キ)」の原字。転じて、气の意に用いられる。"
      + "**教育用漢字は省略形による。**」 "
      + "|| ÇAPRAZ 説文解字 (氣 maddesi, 漢典'den fetch edilerek):「**饋客芻米也。从米气聲。**」 "
      + "(konuğa sunulan yem ve tahıl; 米'den, 气 sesli) → BİREBİR aynı: 米 anlam + 气 ses, ve özgün "
      + "anlam 'yiyecek vermek'. İhtilaf yok → A. "
      + "|| ⚠️ SUNUM KARARI (Zeynep uyarısı 2 — '米'nin rolü yalnız eski biçim üzerinden'): "
      + "Etimoloji 氣'ye aittir. **Bugünkü 気'de 米 YOKTUR** (yerinde 乂 var). Metin bu yüzden 'Bugünkü "
      + "気, eski biçimi 氣'nin sadeleşmiş yazımıdır' diye BAŞLIYOR ve 米 yalnız 氣 çerçevesinde "
      + "anılıyor; bugünkü çizgilere geriye dönük görev yüklenmedi. 円 ve 万 ile aynı aile, aynı "
      + "kilitli terim ('eski biçim' + 'sadeleşmiş'). "
      + "|| ANLAM KAYMASI metne alındı çünkü kaynak açıkça veriyor: özgün anlam 'yiyecek vermek' "
      + "(氣 = 餼'nin 原字), 転じて 气'nin anlamı ('hava/soluk'). Bu olmadan 'pirinç → hava' sıçraması "
      + "öğrenene keyfi görünürdü. "
      + "|| SES YAZILDI: 气(キ) ↔ 気'nin okunuşu キ — ÖRTÜŞÜYOR."
  },
  "前": {
    formationType: "会意形声", confidence: "B",
    summaryTr: "刀 bıçak anlamı verir; üstteki parça ise 'ilerlemek' anlamını taşır ve okunuşuyla katkı yapar. Önce 'bıçakla düzgün kesmek' anlamındaydı, buradan 'ön' anlamı gelişmiştir.",
    sources: [KP("0004135400")],
    disagreementNote:
      "TASLAK · TEK KAYNAK. ESAS Kanjipedia 0004135400:「**会意形声**。刀と、歬(セン)（**すすむ**。□は"
      + "変わった形）とから成る。**刀で切りそろえる意**を表す。「剪(セン)」の原字。ひいて「すすむ」「まえ」の"
      + "意に用いる。」 "
      + "|| ⚠️ ÇAPRAZ KAYNAK YOK: 説文解字'da **前 maddesi BULUNMUYOR**. 漢典 açıkça yazıyor: "
      + "「说文解字未收录「前」字头，请参考「歬」字」. 説文 yalnız 歬'yi tanımlıyor:「不行而進謂之歬。"
      + "**从止在舟上。**」 (yürümeden ilerlemeye 歬 denir; 止'in 舟 üstünde olmasından). "
      + "→ 前 için ESAS kaynak TEK BAŞINA kaldı; oluşum türü (会意形声) ve bileşen rolleri çapraz "
      + "doğrulanamadı → en zayıf halka → **confidence B (taslak)**. "
      + "|| ⚠️ ZEYNEP UYARISI 3 — DOLAŞAN DÖRT AÇIKLAMA TEST EDİLDİ: "
      + "· KESMEK (刀): Kanjipedia'da **VAR** (「刀で切りそろえる意」) → metne alındı. "
      + "· İLERLEMEK (歬 = すすむ): Kanjipedia'da **VAR** → metne alındı. "
      + "· AYAK (止) ve TEKNE (舟): Kanjipedia 前 için **VERMİYOR**. Bunlar yalnız 歬'nin İÇİNDEKİ "
      + "  parçalardır ve yalnız 説文'un 歬 maddesinde geçer. Kanjipedia 歬'yi parçalarına AYIRMIYOR. "
      + "  → Görünür metne **ALINMADI**. (Yaygın 'ayak + tekne' anlatısının kaynağı budur; 前'nin "
      + "  kendi kaydına ait değildir.) "
      + "|| GÖRÜNÜR METİN KARARI: 歬 adlandırılmadı ('üstteki parça') — bugünkü 前'de 歬 görünmez "
      + "(䒑+月 hâline gelmiş); kaynak da 「□は変わった形」 diyor (書/先/千 ile aynı kilitli çözüm). "
      + "|| SES YAZILMADI: kaynak 歬(セン) diyor ama 前'nin okunuşu **ゼン** — ÖRTÜŞMÜYOR (çatı ilke) "
      + "→ 話 kalıbı kullanıldı ('okunuşuyla katkı yapar', ses belirtilmeden). "
      + "|| 会意形声 gereği 歬'nin ANLAM katkısı ('ilerlemek') inkâr edilmedi — 季/左/右 ile aynı kalıp."
  },
  "後": {
    formationType: "会意", confidence: "B",
    summaryTr: "彳 yürümeyi, 夂 ayağı, 幺 ise bağlamayı gösterir. Ayakları bağlanan kişinin ileri gidememesinden 'geride kalmak', oradan da 'arka, sonra' anlamı gelişmiştir.",
    sources: [KP("0002095500")],
    disagreementNote:
      "TASLAK · MEKANİZMA ÇATALI VAR. ESAS Kanjipedia 0002095500:「会意。彳と、夂(ち)（**あし**）と、"
      + "幺(よう)（**つなぐ**）とから成り、**足をつながれて前へ進めないことから**、「おくれる」、ひいて"
      + "「あと」「うしろ」の意を表す。」 "
      + "|| ÇAPRAZ 説文解字 (漢典'den fetch edilerek):「**遲也。从彳幺夊。**」 + açıklama "
      + "「**幺者小也。小而行遲，後可知矣**」 (幺 küçüktür; küçük ve yavaş yürümekten 'sonra' anlaşılır). "
      + "|| BİLEŞENLER İKİ KAYNAKTA AYNI (彳 · 幺 · 夂/夊 — 夊 yalnız glif varyantı). "
      + "AMA MEKANİZMA FARKLI: Kanjipedia 幺'yu **'bağlamak'** okur (ayaklar bağlı → ileri gidilemez); "
      + "説文 幺'yu **'küçük'** okur (küçük ve yavaş → geride). Aynı sonuca (gecikme/arkada kalma) iki "
      + "farklı yoldan varıyorlar → 来'deki desenin aynısı → en zayıf halka → **confidence B (taslak)**. "
      + "|| GÖRÜNÜR METİN ESAS'A UYAR: 'bağlamak' okuması yazıldı; 説文'un 'küçük' okuması metne "
      + "ALINMADI (kaynak tartışması kullanıcı metnine girmez). "
      + "|| ⚠️ ZEYNEP UYARISI 4 — 'iki kişi geride yürüyor' hikâyesi: kaynakta böyle bir şey YOK. "
      + "Kanjipedia üç bileşeni ve mekanizmayı açıkça veriyor; modern biçme bakıp 'iki kişi' anlatısı "
      + "kurulmadı. Üç bileşen de bugünkü 後'de görünür olduğu için adlandırıldı (parça dili gerekmedi)."
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
    formationType: spec.formationType, formationTypeSource: "Kanjipedia",
    confidence: spec.confidence, summaryTr: spec.summaryTr,
    sources: spec.sources, disagreementNote: spec.disagreementNote, qaStatus: "drafted"
  };
  const next = Object.assign({}, rec, { etymology: ETY, mnemonic: { status: "pending_review" } });

  /* Standart güvenceler */
  if (next.etymology.qaStatus !== "drafted") throw new Error(ch + ": qaStatus drafted olmalı");
  if (next.etymology.reviewedAt) throw new Error(ch + ": reviewedAt VERİLMEZ");
  if (["A","B"].indexOf(next.etymology.confidence) < 0) throw new Error(ch + ": taslak confidence A/B bekleniyor");
  if (TYPES.indexOf(next.etymology.formationType) < 0) throw new Error(ch + ": geçersiz formationType");
  if (next.mnemonic.status !== "pending_review") throw new Error(ch + ": mnemonic pending_review olmalı");
  if (!/kanjipedia\.jp\/kanji\/\d{10}$/.test(next.etymology.sources[0])) throw new Error(ch + ": kaynak URL biçimi hatalı");
  if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error(ch + ": components değişmemeli");
  if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error(ch + ": component_meanings değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");
  if (next.etymology.summaryTr === (next.memory_hint_tr || "")) throw new Error(ch + ": Kökeni ile Hafıza aynı olamaz");

  /* ── Zeynep'in dört uyarısının makine güvencesi ── */
  if (ch === "年") {
    if (/(sırt|insan|kişi)/i.test(next.etymology.summaryTr)) throw new Error("年: UYARI 1 — 甲骨 katmanındaki 'insan sırtında tahıl' görünür metne giremez");
    if (!/eski biçim/i.test(next.etymology.summaryTr)) throw new Error("年: bileşenler bugünkü biçimde görünmüyor, 'eski biçim' çerçevesi zorunlu");
    if (/sadeleş/i.test(next.etymology.summaryTr)) throw new Error("年: kaynak 変わった形 diyor (省略形 değil) → 'sadeleşmiş' değil 'değişmiş' kullanılmalı");
  }
  if (ch === "気") {
    if (!/eski biçim/i.test(next.etymology.summaryTr)) throw new Error("気: UYARI 2 — 米 yalnız eski biçim çerçevesinde anılabilir");
    if (!/sadeleşmiş/i.test(next.etymology.summaryTr)) throw new Error("気: kaynak 省略形 diyor → kilitli terim 'sadeleşmiş'");
    if (next.etymology.summaryTr.indexOf("氣") < 0) throw new Error("気: eski biçim 氣 metinde anılmalı");
  }
  if (ch === "前") {
    if (/(tekne|kayık|ayağ|ayak)/i.test(next.etymology.summaryTr)) throw new Error("前: UYARI 3 — ayak/tekne Kanjipedia'nın 前 açıklamasında YOK, metne giremez");
    if (!/kes/i.test(next.etymology.summaryTr)) throw new Error("前: kaynakta olan 'kesmek' mekanizması metinde olmalı");
    if (/セン|ゼン/.test(next.etymology.summaryTr)) throw new Error("前: ses örtüşmüyor (セン≠ゼン) → ses yazılmamalı");
  }
  if (ch === "後") {
    if (/iki kişi|iki insan/i.test(next.etymology.summaryTr)) throw new Error("後: UYARI 4 — 'iki kişi' hikâyesi kaynakta yok");
    if (/küçük/i.test(next.etymology.summaryTr)) throw new Error("後: 説文'un 'küçük' okuması ana akım değil, metne giremez");
  }

  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error(ch + ": kayıt kaynakta bire bir bulunamadı");
  src = src.replace(oldSub, JSON.stringify(next));
  applied.push({ ch, id, conf: spec.confidence, type: spec.formationType, len: ETY.summaryTr.length });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 13 DRAFTED yazıldı (4 kayıt, qaStatus=drafted, KULLANICIYA KAPALI):");
for (const a of applied) console.log("  " + a.ch + " (" + a.id + ") · " + a.type + " · conf " + a.conf + " · summaryTr " + a.len + " kr · mnemonic pending_review");
console.log("年/気 = A (説文 birebir) · 前 = B (説文'da 前 maddesi YOK, tek kaynak) · 後 = B (mekanizma çatalı)");
console.log("reviewedAt YOK · reviewed + mnemonic kararı AYRI turda (Zeynep).");
