/* AUTHORING Parti 7 · 分 半 友 赤 — TEMİZ 会意 DÖRTLÜSÜ (DRAFTED, KULLANICIYA GİZLİ).
   Zeynep kararı (2026-07-25): İlk hızlandırılmış parti. Estetik değil kaynak/QA temelli seçim:
   dördü de tartışmasız, şeffaf bileşenli 会意; ortak QA riski tek tip (bileşen-rol doğrulama).
   先 bilerek DIŞARIDA (partiyi 5 uğruna genişletme; ayrı biçim ayrıntısı doğurabilir).

   B0 (ÖLÇÜLDÜ): dördü de gerçekten BOŞ — etymology yok, pictogram_note yok ("" ), memory_hint_tr
   yok (""), mnemonic alanı YOK (44 "alan yok" kaydından), components boş. Gizli legacy tuzağı yok
   → drafted penceresinin kullanıcıya maliyeti sıfır.

   KAYNAK TEYİDİ (triage'ın sınıfı değil, ESAS sayfa okundu — Kanjipedia karakter sayfaları):
   分 0006175200「会意。刀と、八（わける）とから成り、刀で切りわける意を表す。」
   半 0005726200「会意。牛（は変わった形）と、八（わける）とから成る。大きな牛を二つに分けることから、物の半分の意を表す。」
   友 0006843100「会意。又二つから成り、手の下に別の手をそえて、助ける、したしむ、ひいて『とも』の意を表す。」
   赤 0003955600「本字は、会意。火（ひ）と、大（おおきい）とから成り、火が盛んに燃える、また、その色の意を表す。赤は、その変わった形。」

   Bu betik her kayda: etymology (qaStatus:drafted, reviewedAt YOK) + mnemonic{status:"pending_review"}
   ekler. Köken kullanıcıya AÇILMAZ (kokenOf drafted→null). reviewed onayı + mnemonic'in not_required'a
   çevrilmesi AYRI turda, Zeynep onayıyla. components/component_meanings/pictogram_note/memory_hint_tr
   DOKUNULMAZ (kapsam tek işte). confidence TASLAK = A (Kanjipedia tek net okuma); QA + Zeynep karar. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);

const KP = id => "https://www.kanjipedia.jp/kanji/" + id;

const RECORDS = {
  "分": {
    formationType: "会意", confidence: "A",
    summaryTr: "刀 bıçağı, 八 ise bölmeyi gösterir. Bir şeyi bıçakla kesip ayırmaktan 'bölmek' anlamı gelişmiştir.",
    sources: [KP("0006175200")],
    disagreementNote:
      "İHTİLAF YOK. ESAS referans Kanjipedia 0006175200:「会意。刀と、八（わける）とから成り、刀で切りわける意を表す。」 "
      + "Bileşen rolleri (kaynaktan): 刀 = bıçak (eylem), 八 = bölme (『わける』, sayı 'sekiz' DEĞİL). İki anlam bileşeni → 会意. "
      + "Tek net okuma, farklı referans öneren kaynak yok → confidence A (taslak). 八'in burada 'bölme' anlamı taşıması, "
      + "'sekiz' ile karıştırılmamalı — Kanjipedia bunu açıkça (わける) diye şerh düşüyor."
  },
  "半": {
    formationType: "会意", confidence: "A",
    summaryTr: "牛 öküzü, 八 ise bölmeyi gösterir. Büyük bir öküzü ikiye bölmekten 'yarım' anlamı gelişmiştir.",
    sources: [KP("0005726200")],
    disagreementNote:
      "İHTİLAF YOK. ESAS referans Kanjipedia 0005726200:「会意。牛（は変わった形）と、八（わける）とから成る。大きな牛を二つに分けることから、物の半分の意を表す。」 "
      + "Bileşen rolleri: 牛 = öküz (kayıtta 'biçimi değişmiş' 牛 notu var — görünür metne konmadı, N5'te kafa karıştırır), "
      + "八 = bölme (『わける』). 分 ile ORTAK 八 = gerçek yapısal akrabalık (anlam benzerliği değil). "
      + "Tek net okuma → confidence A (taslak)."
  },
  "友": {
    formationType: "会意", confidence: "A",
    summaryTr: "İki el (又) üst üste gelir; bir elin diğerine yardım etmesinden 'dost' anlamı gelişmiştir.",
    sources: [KP("0006843100")],
    disagreementNote:
      "İHTİLAF YOK. ESAS referans Kanjipedia 0006843100:「会意。又二つから成り、手の下に別の手をそえて、助ける、したしむ、ひいて『とも』の意を表す。」 "
      + "Bileşen rolleri: iki adet 又 (el); bir el diğerinin altına eklenir → yardımlaşma/yakınlık → 'dost'. "
      + "又 = el, tartışmasız. Tek net okuma → confidence A (taslak). "
      + "Not: 又'nun tek başına kaydı yok (radikal); burada yalnız 友'nun bileşeni olarak anılıyor."
  },
  "赤": {
    formationType: "会意", confidence: "A",
    summaryTr: "火 ateşi, 大 ise büyüklüğü gösterir. Harlı yanan büyük bir ateşin renginden 'kırmızı' anlamı gelişmiştir.",
    sources: [KP("0003955600")],
    disagreementNote:
      "İHTİLAF YOK (küçük not var). ESAS referans Kanjipedia 0003955600:「本字は、会意。火（ひ）と、大（おおきい）とから成り、火が盛んに燃える、また、その色の意を表す。赤は、その変わった形。」 "
      + "Bileşen rolleri (kaynaktan): 火 = ateş, 大 = BÜYÜK (『おおきい』). "
      + "KÜÇÜK NOT: Bazı tarihsel okumalarda 赤'nin üst parçası 大 'insan' olarak da yorumlanır; ancak ESAS referans "
      + "(Kanjipedia) net biçimde 大='büyük' der, görünür metin ona uyar. Bu azınlık nüansı confidence'ı düşürmüyor ama "
      + "QA'da teyit edilmeli. Ayrıca 'bugünkü 赤 biçimi 本字'nin değişmiş halidir' notu kayıtta; görünür metne konmadı. "
      + "Tek ana akım okuma → confidence A (taslak)."
  }
};

const applied = [];
for (const [ch, spec] of Object.entries(RECORDS)) {
  const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === ch);
  if (!id) throw new Error(ch + " bulunamadı");
  const rec = DATA.chars[id];
  if (rec.etymology) throw new Error(ch + " zaten etymology taşıyor — bu betik yalnız boş kayda yazar");
  if (rec.mnemonic) throw new Error(ch + " zaten mnemonic taşıyor — beklenmeyen durum, elle bak");
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

  /* Sert güvenceler — drafted kapısı + dokunulmazlar + kapsam sınırı */
  if (next.etymology.qaStatus !== "drafted") throw new Error(ch + ": qaStatus drafted olmalı");
  if (next.etymology.reviewedAt) throw new Error(ch + ": reviewedAt VERİLMEZ");
  if (next.etymology.confidence !== "A") throw new Error(ch + ": taslak confidence A bekleniyor");
  if (next.mnemonic.status !== "pending_review") throw new Error(ch + ": mnemonic pending_review olmalı (drafted)");
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
  applied.push({ ch, id, len: ETY.summaryTr.length });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 7 DRAFTED yazıldı (4 kayıt, 会意, confidence A taslak, qaStatus=drafted, KULLANICIYA KAPALI):");
for (const a of applied) console.log("  " + a.ch + " (" + a.id + ") · summaryTr " + a.len + " kr · mnemonic pending_review");
console.log("reviewedAt YOK · reviewed + mnemonic→not_required AYRI turda (Zeynep onayı).");
