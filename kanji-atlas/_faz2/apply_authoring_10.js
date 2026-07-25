/* AUTHORING Parti 10 · 左 + 右 — EŞLİ TUR (DRAFTED, KULLANICIYA GİZLİ). İki kayıtla sınırlı.
   Zeynep tur sırası: (1) 左 esas+çapraz · (2) 右 esas+çapraz · (3) her biri için oluşum/ses/anlam
   AYRI karar · (4) EN SON yalnız tutarlılık için yan yana karşılaştırma · (5) mnemonic QA'da
   gerçek sağ/sol karışıklığını çözen ipucu varsa active. "Karşılaştırma, kaynak okumasının yerine
   geçmemeli" — bu betikteki iki kayıt BAĞIMSIZ kaynak kanıtıyla yazıldı.

   ⚠️ 右 EŞLİ ELE ALINDIĞI İÇİN OTOMATİK TEMİZ KABUL EDİLMEDİ (Zeynep). Kırmızı kuyruktan çıkarma
   kararı QA sonrası verilecek.

   ŞEMA NOTU: `会意形声` mevcut ve desteklenen bir metadata değeridir (季'de Parti 2'den beri var;
   formationType hiçbir render yolunda/testte kullanılmıyor). Ek şema kararı YOKTUR. Bu betiğin
   whitelist'i önceki betiklerden farklı olarak 会意形声'yi de içerir.

   B0 (ölçüldü): ikisi de BOŞ (etymology/pictogram_note/memory_hint_tr/mnemonic yok, components boş,
   related_characters boş) → drafted maliyeti sıfır. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const KP = id => "https://www.kanjipedia.jp/kanji/" + id;
const TYPES = ["象形", "指事", "会意", "形声", "会意形声"];

const RECORDS = {
  "左": {
    formationType: "会意形声", confidence: "A",
    summaryTr: "工 bir aleti, üstteki parça ise sol eli gösterir ve サ sesine katkı yapar. Aleti tutan sol elden 'sol' anlamı gelişmiştir.",
    sources: [KP("0002452500")],
    disagreementNote:
      "TASLAK · BAĞIMSIZ OKUMA (右'dan türetilmedi). "
      + "|| ESAS Kanjipedia 0002452500:「会意形声。工と、𠂇(サ)（＝ナ。ひだり手）とから成り、工具を取る"
      + "ひだり手、ひいて、ひだり側の意を表す。また、左手は右手の働きを助けるので、「たすける」意に用いる。」 "
      + "|| ÇAPRAZ 説文解字 (漢典'den FETCH EDİLEREK):「手相左助也。从𠂇、工。」 "
      + "|| BİLEŞEN ROLLERİ (kaynaktan): 工 = 工具 (alet) → ANLAM bileşeni. 𠂇 (ナ biçimli, okunuşu サ) "
      + "= ひだり手 (sol el) → hem anlam hem SES taşır; 会意形声 tam olarak bunu ifade eder. "
      + "|| OLUŞUM NÜANSI (çatal DEĞİL): Kanjipedia 会意形声 der; 説文 「从𠂇、工」 der ve 聲 işaretlemez "
      + "(yani saf 会意 okur). Bu bir ÇELİŞKİ değil, EK bir katmandır: 会意形声 ⊃ 会意; bileşenler ve "
      + "anlam katkıları iki kaynakta BİREBİR aynı (𠂇 + 工). Bu yüzden confidence düşürülmedi. "
      + "|| ANLAM YOLU: Kanjipedia 'aleti tutan sol el → sol taraf' der. 説文'ın tanımı 「手相左助也」 "
      + "(el karşılıklı olarak SOLDA yardım eder) — 'sol' kavramı 説文'da da mevcut, ama türetme "
      + "açıklanmıyor. Kanjipedia'nın türetmesi çelişilmiyor, yalnız ek. "
      + "|| İKİNCİL ANLAM (metne KONMADI): Kanjipedia ayrıca 「左手は右手の働きを助けるので『たすける』意に"
      + "用いる」 diyor — 'yardım etmek' anlamı. Görünür metin 2 cümlede tutuldu (çıplak bilgi kuralı); "
      + "bu ikincil kullanım kartın anlam alanına ait. "
      + "|| GÖRÜNÜR METİN KARARI: 𠂇 adlandırılmadı, 'üstteki parça' dendi — U+20087 nadir bir CJK "
      + "genişletme karakteridir, cihazda tofu olarak görünme riski var (先 ve 書'deki aynı çözüm). "
      + "|| サイ MARUZİYETİ YOK: 左'da 口 bileşeni bulunmuyor → Shirakawa サイ tartışması bu kaydı "
      + "İLGİLENDİRMİYOR. (右'dan ayrılan tek yapısal nokta budur.) "
      + "|| SONUÇ: bileşenler, roller ve anlam yolu iki kaynakta uyumlu; gerçek bir görüş ayrılığı yok "
      + "→ confidence A (taslak)."
  },
  "右": {
    formationType: "会意形声", confidence: "B",
    summaryTr: "Alttaki 口 sözü, üstteki parça ise yardım eden bir eli gösterir ve イウ sesine katkı yapar. Önce 'sözle yardım etmek' anlamı doğmuş; 'sağ' anlamı ise sonradan gelişmiştir.",
    sources: [KP("0000308000")],
    disagreementNote:
      "TASLAK · BAĞIMSIZ OKUMA (左'dan türetilmedi). ⚠️ 右 eşli ele alındığı için OTOMATİK TEMİZ "
      + "KABUL EDİLMEDİ; kırmızı kuyruk kararı QA sonrası verilecek. "
      + "|| ESAS Kanjipedia 0000308000:「会意形声。口と、又(イウ)（𠂇は変わった形。たすける）とから成る。"
      + "ことばで援助することから、みちびく、「たすける」意を表す。のちに、又・佑(イウ)と区別して、「みぎ」の意に用いる。」 "
      + "|| ÇAPRAZ 説文解字 (漢典'den FETCH EDİLEREK, iki sürüm):「助也。从口从又。」 ve 「手口相助也。"
      + "从又从口。」 · 徐鍇 şerhi:「言不足以左、復手助之」 (sözün yetmediği yerde el yardım eder). "
      + "|| ===== DÖRT İDDİA AYRI DEĞERLENDİRİLDİ (Zeynep talimatı) ===== "
      + "(1) BİLEŞİMDE 口 BİÇİMİ GÖRÜLÜYOR MU? → EVET, tartışmasız. Kanjipedia açıkça 「口と…とから成る」 "
      + "diyor; 説文 「从口从又」 diyor. Bu alt iddia = A. "
      + "(2) BU PARÇANIN TARİHSEL ROLÜ NE? → ESAS kaynak role olarak SÖZ/KONUŞMA veriyor: "
      + "「ことばで援助することから」. 説文 de aynı hatta: 「手口相助也」 (el ve ağız/söz birbirine yardım "
      + "eder) + 徐鍇'nin 「言不足以…」 şerhi. İki kaynak da parçayı KONUŞMA işleviyle okuyor. Alt iddia = A. "
      + "(3) GÜNCEL 'AĞIZ' ANLAMIYLA İLİŞKİ KURULABİLİR Mİ? → DİKKAT: Kanjipedia bu parçayı 「くち」 diye "
      + "ADLANDIRMIYOR ve ona 'ağız' (organ) anlamı VERMİYOR; verdiği şey 'ことば' (söz) işlevidir. "
      + "Bu yüzden görünür metinde bilinçli olarak 'ağız' DENMEDİ, 'söz' dendi. Bu, kaynağın gerçekten "
      + "söylediğiyle bizim çıkarımımız arasındaki farkı korur ve 名'de yapılan 'ağız' adlandırmasından "
      + "AYRILIR. (名'in component_meanings'indeki 口:'ağız' değeri, ileride 口 bileşenleri toplu "
      + "uyumlamasında bu bulguyla birlikte gözden geçirilmeli.) "
      + "(4) SAĞ EL / ARAÇ / YARDIM / DUA YORUMLARINDAN HANGİSİ ESAS KAYNAKTA GERÇEKTEN VAR? → "
      + "  · YARDIM (たすける): VAR, hem Kanjipedia hem 説文'un merkezinde. "
      + "  · SAĞ EL: **YOK.** Bu, önemli bir bulgudur — sezgisel 'sağ el' hikâyesi ESAS kaynakta "
      + "    bulunmuyor. Kanjipedia'ya göre karakterin ilk anlamı 'yardım etmek'tir; 'みぎ' (sağ) "
      + "    anlamı SONRADAN, 又 ve 佑'dan ayrışmak için kullanılmıştır (「のちに、又・佑と区別して」). "
      + "    説文 'sağ' anlamını hiç açıklamıyor. "
      + "  · ARAÇ/ALET: YOK — o 左'nın 工 bileşenidir, 右'ya karıştırılmamalı. "
      + "  · DUA (サイ): ESAS kaynakta YOK. Shirakawa Shizuka ekolünün 口-biçimli parçayı 'tanrıya "
      + "    sunulan duayı koyan kap' okuması GENEL bir teoridir ve akademik olarak tartışmalıdır. "
      + "    DÜRÜSTLÜK NOTU: bu turda 右'ya ÖZEL bir Shirakawa/サイ atfı çevrimiçi kaynaklarda "
      + "    DOĞRULANAMADI (名'de de aynı sonuç çıkmıştı). İddia, Parti 5'te 口 kaydına yazılan "
      + "    ileriye dönük uyarıdan geliyor; teyit edilmiş bir 右 alıntısı yok. "
      + "|| CONFIDENCE GEREKÇESİ: (1) ve (2) = A; ama (a) 'sağ' anlamının sonradan ayrışma olduğu "
      + "iddiası YALNIZ Kanjipedia'da (説文 sessiz) ve (b) 口-sınıfı için Shirakawa azınlık okuması "
      + "prensipte bu karakteri de kapsıyor. En zayıf halka kuralı → confidence B (taslak). "
      + "名 emsaliyle tutarlı. "
      + "|| GÖRÜNÜR METİN KARARI: 又/𠂇 adlandırılmadı ('üstteki parça') — 𠂇 nadir glif, ayrıca "
      + "Kanjipedia zaten 「𠂇は変わった形」 (değişmiş biçim) diyor; N5'te biçim tarihçesi yük olur. "
      + "'Yardım etmek' → 'sağ' geçişi metinde AÇIKÇA verildi çünkü kaynak bunu açıkça söylüyor ve "
      + "öğrenenin 'neden sağ?' sorusunu yanıtsız bırakmak kafa karıştırırdı."
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
  if (JSON.stringify(next.related_characters) !== JSON.stringify(rec.related_characters)) throw new Error(ch + ": related_characters değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");
  if (next.etymology.summaryTr === (next.memory_hint_tr || "")) throw new Error(ch + ": Kökeni ile Hafıza aynı olamaz");
  if (/ağız/i.test(next.etymology.summaryTr)) throw new Error(ch + ": görünür metinde 'ağız' kullanılmamalı (iddia (3))");

  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error(ch + ": kayıt kaynakta bire bir bulunamadı");
  src = src.replace(oldSub, JSON.stringify(next));
  applied.push({ ch, id, conf: spec.confidence, type: spec.formationType, len: ETY.summaryTr.length, note: ETY.disagreementNote.length });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 10 DRAFTED yazıldı (2 kayıt, qaStatus=drafted, KULLANICIYA KAPALI):");
for (const a of applied) console.log("  " + a.ch + " (" + a.id + ") · " + a.type + " · conf " + a.conf + " · summaryTr " + a.len + " kr · not " + a.note + " kr · mnemonic pending_review");
console.log("右 otomatik temiz kabul EDİLMEDİ — kırmızı kuyruk kararı QA sonrası.");
console.log("reviewedAt YOK · reviewed + mnemonic 4-soru kararı AYRI turda (Zeynep).");
