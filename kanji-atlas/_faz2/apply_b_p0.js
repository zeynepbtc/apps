/* FAZ2-FIX B · 10 P0 kaydının canonical yapısını düzeltir (SADECE bu 10 kayıt).
   Değişen: formationType, structure.components (+role), etymology(qaStatus), türetilmiş legacy components/component_meanings.
   DEĞİŞMEYEN: köken/mnemonic METNİ (Authoring), okumalar, jukujikun, diğer kayıtlar.
   Yanlış eski köken kokenOf(pending) ile gizlenir. Diğer 88 kayıt byte-korunur (indexOf/replace). */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);

// id -> {ft: formationType, st: [[glyph, role, labelTr|null], ...], koken: "pending"|"keep"}
const FIX = {
  toki:   { ft: "形声", st: [["日","semantic","güneş / gün"],["寺","phonetic",null]], koken: "pending" },
  gengo:  { ft: "形声", st: [["言","semantic","söz"],["吾","phonetic",null]], koken: "pending" },
  gakkou: { ft: "形声", st: [["木","semantic","ağaç"],["交","phonetic",null]], koken: "pending" },
  hareru: { ft: "形声", st: [["日","semantic","güneş / gün"],["青","phonetic",null]], koken: "pending" },
  hanasu: { ft: "形声", st: [["言","semantic","söz"],["舌","phonetic",null]], koken: "pending" },
  yomu:   { ft: "形声", st: [["言","semantic","söz"],["売","phonetic",null]], koken: "pending" },
  kiku:   { ft: "形声", st: [["耳","semantic","kulak"],["門","phonetic",null]], koken: "pending" },
  nani:   { ft: "形声", st: [["亻","semantic","insan (yan)"],["可","phonetic",null]], koken: "pending" },
  dai:    { ft: "象形", st: [], koken: "keep" },      // köken metni DOĞRU → kalır
  ou:     { ft: "象形", st: [], koken: "pending" },   // folk köken → gizle (Authoring: balta)
};

const report = [];
for (const id of Object.keys(FIX)) {
  const f = FIX[id];
  const rec = DATA.chars[id];
  if (!rec) throw new Error("kayıt yok: " + id);
  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error("literal'de bulunamadı: " + id);

  // türetilmiş legacy
  const components = f.st.map(x => x[0]);
  const component_meanings = {};
  for (const x of f.st) if (x[2] !== null) component_meanings[x[0]] = x[2];

  const mutated = Object.assign({}, rec, {
    components,
    component_meanings,
    parent_components: (f.st.length === 0 ? [] : rec.parent_components),  // tek piktogram → parent yok
    structure: {
      components: f.st.map(x => ({ glyph: x[0], role: x[1], labelTr: x[2] })),
      qaStatus: "reviewed"
    },
    etymology: {
      formationType: f.ft,
      formationTypeSource: "Kanjipedia",
      confidence: "A",
      qaStatus: f.koken === "pending" ? "pending" : "reviewed"
      // summaryTr YOK → Authoring yazacak (pending gizlenir; 'keep'te legacy pictogram_note gösterilir)
    }
  });

  report.push({
    id, char: rec.character,
    oldComps: JSON.stringify(rec.components), newComps: JSON.stringify(components),
    oldParent: JSON.stringify(rec.parent_components), newParent: JSON.stringify(mutated.parent_components),
    ft: f.ft, koken: f.koken,
    roles: f.st.map(x => `${x[0]}:${x[1]}`).join(", ") || "(bileşen yok)"
  });

  src = src.replace(oldSub, JSON.stringify(mutated));
}

fs.writeFileSync(INDEX, src);
console.log("10 P0 kaydı güncellendi.\n");
for (const r of report) {
  console.log(`${r.char} (${r.id}) · ${r.ft} · köken:${r.koken}`);
  console.log(`   comps ${r.oldComps} → ${r.newComps} · parent ${r.oldParent} → ${r.newParent}`);
  console.log(`   roller: ${r.roles}`);
}
