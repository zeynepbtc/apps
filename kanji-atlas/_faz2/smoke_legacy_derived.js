/* FAZ2-FIX B · Canonical→legacy türetme tutarlılığı (R3):
   structure.components CANONICAL; legacy components/component_meanings ONDAN türetilmiş — elle sapma OLMAMALI.
   Ayrıca: phonetic/indicative parçalar legacy component_meanings'te MEANING taşımamalı (oyuna yanlış anlam sızmasın). */
const fs = require("fs"), path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const chars = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]).chars;
let pass = 0, fail = 0;
const ok = (n, c) => { if (c) pass++; else { fail++; console.log("FAIL:", n); } };

let v2count = 0;
for (const id in chars) {
  const k = chars[id];
  if (!k.structure || !Array.isArray(k.structure.components)) continue;   // yalnız v2 kayıtlar
  v2count++;
  const derivedComps = k.structure.components.map(c => c.glyph);
  const derivedCM = {};
  for (const c of k.structure.components) if (c.labelTr != null) derivedCM[c.glyph] = c.labelTr;
  ok("components == türetilmiş: " + id, JSON.stringify(k.components || []) === JSON.stringify(derivedComps));
  ok("component_meanings == türetilmiş: " + id, JSON.stringify(k.component_meanings || {}) === JSON.stringify(derivedCM));
  for (const c of k.structure.components) {
    if (c.role === "phonetic" || c.role === "indicative")
      ok(`${id}: ${c.glyph} (${c.role}) legacy meaning taşımıyor`, !(k.component_meanings && k.component_meanings[c.glyph]));
  }
}
console.log(`v2 kayıt: ${v2count}`);
console.log(`smoke_legacy_derived: ${pass}/${pass + fail}`);
process.exit(fail ? 1 : 0);
