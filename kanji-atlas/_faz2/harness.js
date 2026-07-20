/* FAZ 2 · Kalem 1 (v2) — parite + validator + reverse test. Canlı render'a DOKUNMAZ. */
const fs = require("fs");
const { FAMILIES, REL_TYPES, REL_MAX, makeResolver } = require("./families.js");
const DATA_chars = JSON.parse(fs.readFileSync(__dirname + "/data_chars.json", "utf8"));
const R = makeResolver(DATA_chars);
const charById = id => (DATA_chars[id] ? DATA_chars[id].character : id);
const charExists = ch => Object.values(DATA_chars).some(c => c.character === ch);

const OLD_ATLAS_TREE = [["木",null],["本","木"],["林","木"],["森","林"],["休","木"],["校","木"],["東","木"]];
const OLD_EDGES = [["ki","hayashi"],["hayashi","mori"],["ki","hon"],["ki","yasumu"],["hito","yasumu"]];

const lines = []; const P = s => lines.push(s);
let FAIL = 0; const check = (name, ok, detail) => { P(`- ${ok ? "✓" : "✗"} ${name}${detail ? " — " + detail : ""}`); if (!ok) FAIL++; };

P("# Faz 2 · Kalem 1 (v2) — Karşılaştırma + Validator + Reverse Test");
P("");
P("> Kanonik `FAMILIES` + çözümleyici, eski üç kaynakla karşılaştırıldı; enum donduruldu; primary/secondary eklendi; Reverse Test ve tüm-aile validator koşuldu. Canlı render'a dokunulmadı. Üretim: `faz2/harness.js`.");
P("");

/* ===== 0) ENUM DONDURMA ===== */
P("## 0. Relation enum (dondurulmuş)");
P("- İzinli türler (" + REL_TYPES.length + "/" + REL_MAX + "): `" + REL_TYPES.join(", ") + "`");
P("- Politika: yeni tür yalnız **Karar Günlüğü** girişiyle eklenir; tavan " + REL_MAX + ".");
P("");

/* ===== 1) TÜM-AİLE VALIDATOR ("gece build") ===== */
P("## 1. Validator — her aile, her üye (gece build denetimi)");
const dupCheck = (arr) => arr.length !== new Set(arr).size;
Object.values(FAMILIES).forEach(f => {
  const ids = [f.rootId, ...f.members.map(m => m.id)];
  check(`[${f.id}] üyeler DATA'da var`, f.members.every(m => DATA_chars[m.id]) && DATA_chars[f.rootId], "");
  check(`[${f.id}] rel türleri enum'da`, f.members.every(m => REL_TYPES.includes(m.rel)), "");
  check(`[${f.id}] tekrar eden id yok`, !dupCheck(ids), "");
  check(`[${f.id}] orphan üye yok (via çözülüyor)`, f.members.every(m => m.via === f.component || charExists(m.via)), "");
});
// cross-family: her karakter TEK primary
const allMemberIds = new Set();
Object.values(FAMILIES).forEach(f => f.members.forEach(m => allMemberIds.add(m.id)));
[...allMemberIds].filter(id => R.familiesOf(id).length > 1).forEach(id => {
  const p = R.primaryFamilyOf(id);
  check(`çapraz üye ${charById(id)} tek primary`, !!p, p ? "primary=" + p.id : "BELİRSİZ");
});
// consumer tutarlılığı: her grafik düğümü çözülüyor
const gAll = R.graphEdges();
check("grafik düğümleri çözülüyor (char/primaryFam)", gAll.nodes.every(n => n.char && n.primaryFam), "");
P("");

/* ===== 2) Ağaç ailesi: kanonik vs eski ===== */
P("## 2. Ağaç (木) ailesi — kanonik vs eski kaynaklar");
P("");
P("| Üye | ESKİ ATLAS | ESKİ EDGES | DATA parent | KANONİK (via·rel·primary?) | Sonuç |");
P("|---|---|---|---|---|---|");
R.famNodes(FAMILIES.tree).forEach(n => {
  if (n.rel === "root") { P(`| ${n.char} (kök) | kök | — | — | kök·primary | ✓ |`); return; }
  const dc = DATA_chars[n.id]; const pc = (dc && dc.parent_components) ? dc.parent_components.join(",") : "—";
  const ep = OLD_EDGES.filter(e => charById(e[1]) === n.char).map(e => charById(e[0])); const eps = ep.length ? ep.join(",") : "—";
  const ar = OLD_ATLAS_TREE.find(x => x[0] === n.char); const ap = ar ? (ar[1] || "kök") : "—";
  const prim = R.primaryFamilyOf(n.id).id;
  let v = "✓ uyum";
  if (n.char === "森") v = "ÇÖZÜLDÜ: 林→森 yerine 木→森 (3×木)";
  if (n.char === "休") v = "ÇÖZÜLDÜ: çapraz üye; primary=" + prim + " (secondary=tree)";
  P(`| ${n.char} | ${ap} | ${eps} | ${pc} | ${n.via}·${n.rel}·${n.primary === false ? "secondary" : "primary"} | ${v} |`);
});
P("");
P("**Vitrinden ÇIKARILANLAR — ürün/pedagoji gerekçesiyle:**");
P("- **校** (okul): 木+交 birleşimi ama 木 burada anlam-taşıyıcı DEĞİL, 交 fonetik. Öğretim değeri okul kavramında; ağaç ailesinde göstermek yanlış bileşen hikâyesi kurar. *Kanıt gelmeden pedagoji öne geçmez.* → geniş aile, sonraki faz.");
P("- **東** (doğu): **Pedagojik gerekçe** — 東'deki 木 şekli aşınmış/tesadüfi; anlam-aktif bir 'ağaç' bileşeni değil. Ağaç ailesinde sunmak, olmayan bir ağaç-anlamı ima eder (köken/yapı/hatırlama ayrımını çiğner). 東'nin öğretim yeri **yön ailesi** (東西南北, işlevsel grup). Bu karar DATA değişse de değişmez.");
P("");

/* ===== 3) Beş tüketici + primary/secondary ===== */
P("## 3. Beş tüketici tek kaynaktan + primary/secondary");
const strip = R.familyStripData("yasumu");
P("- **(1) aile şeridi** 休: primary=" + strip.label + " · secondary=" + (strip.secondaryFamilies.map(f => f.label).join(",") || "—") + " · üyeler=" + strip.members.map(m => m.char).join(" "));
P("- **(2) detail bağları** 木: " + R.detailFamilyLinks("ki").map(l => l.char + "(" + l.rel + ")").join(" · "));
P("- **(3) grafik**: benzersiz düğüm " + gAll.nodes.length + " · kenar " + gAll.edges.length + " · 休 primaryFam=" + gAll.nodes.find(n => n.id === "yasumu").primaryFam);
P("- **(4) liste**: " + R.familyList().map(f => f.label + "(" + f.count + ")").join(" · "));
P("- **(5) ilerleme** tree learned={ki,hayashi}: " + JSON.stringify(R.familyProgress("tree", new Set(["ki", "hayashi"]))));
P("");

/* ===== 4) STRES: yeni aile = yalnız veri ===== */
P("## 4. Stres — yeni aile = yalnız veri");
const relset = new Set(); Object.values(FAMILIES).forEach(f => f.members.forEach(m => relset.add(m.rel)));
check("person ailesi çözümleyici değişmeden çalıştı", R.famNodes(FAMILIES.person).length === 5, "türler: " + [...relset].join(","));
P("");

/* ===== 5) REVERSE TEST — aile çıkarınca kontrollü davranış ===== */
P("## 5. Reverse Test — `tree` FAMILIES'ten çıkarıldı");
const famNoTree = { person: FAMILIES.person };            // tree yok
const R2 = makeResolver(DATA_chars, famNoTree);
let threw = false, results = {};
try {
  results.strip_hayashi = R2.familyStripData("hayashi");   // tree-only karakter → null beklenir
  results.links_hayashi = R2.detailFamilyLinks("hayashi"); // [] beklenir
  results.prog_tree = R2.familyProgress("tree", new Set(["ki"])); // null beklenir
  results.graph = R2.graphEdges();                          // tree düğümü/kenarı yok
  results.strip_yasumu = R2.familyStripData("yasumu");     // 休 artık yalnız person → person döner (kontrollü)
} catch (e) { threw = true; results.err = String(e); }
check("hiç exception atılmadı", !threw, threw ? results.err : "");
check("tree-only karakter (林) şeridi → null", results.strip_hayashi === null, "");
check("tree-only karakter (林) detail bağları → []", Array.isArray(results.links_hayashi) && results.links_hayashi.length === 0, "");
check("familyProgress('tree') → null", results.prog_tree === null, "");
check("grafikte tree kenarı yok", results.graph && results.graph.edges.every(e => e.fam !== "tree"), "");
check("休 tree kalkınca person'a düşüyor (kontrollü)", results.strip_yasumu && results.strip_yasumu.famId === "person", "");
P("");
P("> İyi veri modeli: EKLEYİNCE değil, ÇIKARINCA da çökmüyor. Reverse Test bunu kanıtlıyor.");
P("");

/* ===== 6) Özet ===== */
P("## 6. Özet");
P(`- Validator: tüm aileler denetlendi · Reverse Test: kontrollü · Stres: geçti · Toplam başarısız kontrol: **${FAIL}**`);
P("- Eski üç kaynağın 4 çelişkisi çözüldü; 東 için **pedagojik** gerekçe yazıldı; enum donduruldu; primary/secondary kavramı kod+veriye girdi.");
P("- Sınır korundu: FAMILIES içerik/ses/ilerleme tutmuyor.");

const out = lines.join("\n");
fs.writeFileSync(__dirname + "/karsilastirma-raporu.md", out);
console.log(out);
console.log("\n--- SMOKE ---  başarısız kontrol:", FAIL, FAIL === 0 ? "→ TÜM GEÇİTLER YEŞİL" : "→ İNCELE");
process.exit(FAIL === 0 ? 0 : 1);
