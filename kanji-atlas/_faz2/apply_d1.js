/* FAZ2-FIX D1 · P2 (kısım 1): gösterge (indicative) rolleri + folk köken + onaylı taught (人ニン/大タイ).
   Yeni köken/mnemonic YAZILMAZ. Katman-çökmesi mnemonic + jukujikun etiketleri D2'de. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);

// Yapısal: indicative (天/本), tek-piktogram (夫/東), folk (季)
const STRUCT = {
  ten:     { ft: "指事", st: [["大", "semantic", "büyük insan"], ["一", "indicative", null]], koken: "keep" },
  hon:     { ft: "指事", st: [["木", "semantic", "ağaç"], ["一", "indicative", null]], koken: "keep" },
  fu:      { ft: "象形", st: [], koken: "keep" },       // tek piktogram (saç tokası çizimin parçası, ayrı bileşen değil)
  ki2:     { ft: "会意形声", st: [["禾", "phonetic", null], ["子", "semantic", "çocuk"]], koken: "pending" }, // folk 'hasat'
  higashi: { ft: "象形", st: [], koken: "pending" },    // folk 'ağaç+güneş'; gerçek: çuval + ses ödünç
};
// Okuma güncelleme (onaylı taught): deferred → taught
const READ_UP = {
  hito: { addTaughtOn: "ニン" },
  dai:  { addTaughtOn: "タイ" },
};

const report = [];
const ids = [...new Set([...Object.keys(STRUCT), ...Object.keys(READ_UP)])];
for (const id of ids) {
  const rec = DATA.chars[id];
  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error("bulunamadı: " + id);
  const patch = {}; const chg = [];

  if (STRUCT[id]) {
    const f = STRUCT[id];
    const components = f.st.map(x => x[0]);
    const cm = {}; for (const x of f.st) if (x[2] !== null) cm[x[0]] = x[2];
    patch.components = components;
    patch.component_meanings = cm;
    patch.parent_components = f.st.length === 0 ? [] : rec.parent_components;
    patch.structure = { components: f.st.map(x => ({ glyph: x[0], role: x[1], labelTr: x[2] })), qaStatus: "reviewed" };
    patch.etymology = { formationType: f.ft, formationTypeSource: "Kanjipedia", confidence: (id === "ki2" || id === "higashi" ? "B" : "A"), qaStatus: f.koken === "pending" ? "pending" : "reviewed" };
    chg.push(`comps ${JSON.stringify(rec.components)}→${JSON.stringify(components)} · ${f.ft} · köken:${f.koken} · roller ${f.st.map(x => x[0] + ":" + x[1]).join(",") || "(yok)"}`);
  }
  if (READ_UP[id]) {
    const add = READ_UP[id].addTaughtOn;
    const R = Object.assign({}, rec.readings);
    R.taughtOn = [...R.taughtOn, add];
    R.deferred = (R.deferred || []).filter(d => d.reading !== add);
    patch.readings = R;
    patch.onyomi = R.taughtOn.join("・");
    chg.push(`on ${JSON.stringify(rec.onyomi)}→${JSON.stringify(patch.onyomi)} (taught +${add})`);
  }
  src = src.replace(oldSub, JSON.stringify(Object.assign({}, rec, patch)));
  report.push({ char: rec.character, id, chg });
}
fs.writeFileSync(INDEX, src);
console.log(`${ids.length} kayıt (D1).\n`);
for (const r of report) console.log(`${r.char} (${r.id}): ${r.chg.join(" | ")}`);
