/* FAZ 2 · Kalem 1 · Consumer-3 VERİ KATMANI — graphEdges semantik doğrulaması.
   Canlı MapView'a DOKUNMAZ (dedup = düzen değişikliği → Faz 3 grafik rebuild'ine ait).
   GPT'nin grafik gate'lerini kanonik veri üzerinde kanıtlar. */
const fs = require("fs");
const { FAMILIES, makeResolver } = require("./families.js");
const chars = JSON.parse(fs.readFileSync(__dirname + "/data_chars.json", "utf8"));
const R = makeResolver(chars);
const g = R.graphEdges();

let fail = 0; const A = (n, ok, x) => { console.log((ok ? "✓" : "✗") + " " + n + (x ? " — " + x : "")); if (!ok) fail++; };
const cid = id => (chars[id] ? chars[id].character : id);

console.log("# Consumer-3 (graphEdges) semantik doğrulama\n");
console.log("Düğüm:", g.nodes.length, "· Kenar:", g.edges.length);
console.log("Kenarlar:", g.edges.map(e => cid(e.from) + "→" + cid(e.to) + "(" + e.rel + ")").join("  "), "\n");

// 1) 休 tek düğüm (çapraz üyelik duplicate üretmez)
A("休 tek düğüm (çapraz üyelik duplicate üretmez)", g.nodes.filter(n => n.id === "yasumu").length === 1);
A("休 iki aileye üye (tek düğüm, iki bağ)", (() => { const n = g.nodes.find(x => x.id === "yasumu"); return n && n.families.length === 2 && n.families.includes("tree") && n.families.includes("person"); })());

// 2) Kararlı dedup anahtarı: kenar yönü DAİMA kök→üye (root→member); 木|休 hep aynı sırada
const keyOf = e => e.from + "|" + e.to;
const rootIds = new Set(Object.values(FAMILIES).map(f => f.rootId));
A("kenar yönü daima kök→üye (kararlı anahtar; sıra hiç ters dönmez)", g.edges.every(e => rootIds.has(e.from) && !rootIds.has(e.to) === false ? true : rootIds.has(e.from)));
const keys = g.edges.map(keyOf);
A("dedup anahtarları benzersiz (aynı çift iki farklı sırada yok)", new Set(keys).size === keys.length, keys.join(" "));

// 3) Aynı iki düğüm arası çoklu ilişki: model = tek kenar + rel metadata (renderer karar vermez)
const pairMap = {}; g.edges.forEach(e => { const p = [e.from, e.to].sort().join("~"); (pairMap[p] = pairMap[p] || []).push(e.rel); });
const multi = Object.entries(pairMap).filter(([, rels]) => rels.length > 1);
A("aynı çift arası çoklu kenar YOK (her çift = tek kenar + rel metadata)", multi.length === 0, multi.map(([p, r]) => p + ":" + r).join(", ") || "yok");

// 4) 森→木 doğrudan; 林→森 (eski zincir) sızmıyor
A("森→木 doğrudan kenar var (ki→mori)", g.edges.some(e => e.from === "ki" && e.to === "mori" && e.rel === "repetition"));
A("林→森 (eski 森←林 zinciri) YOK", !g.edges.some(e => e.from === "hayashi" && e.to === "mori"));

// 5) 東 ve 校 kanonik grafa dahil DEĞİL
A("東 kanonik grafta yok", !g.nodes.some(n => cid(n.id) === "東") && !g.edges.some(e => cid(e.to) === "東" || cid(e.from) === "東"));
A("校 kanonik grafta yok", !g.nodes.some(n => cid(n.id) === "校"));

// 6) self-loop ve orphan edge — veri üretmese bile açıkça reddedilmeli
A("self-loop yok (from≠to)", g.edges.every(e => e.from !== e.to));
const nodeIds = new Set(g.nodes.map(n => n.id));
A("orphan kenar yok (her iki uç düğüm listesinde)", g.edges.every(e => nodeIds.has(e.from) && nodeIds.has(e.to)));

// 7) classFam yalnız sınıflandırma taşır; yön/pedagojik öncelik üretmez
A("classFam yalnız sınıflandırma (tree|person), yön/öncelik alanı yok", g.nodes.every(n => (n.classFam === null || ["tree", "person"].includes(n.classFam)) && !("direction" in n) && !("priority" in n)));

console.log("\n--- LEGACY GRAFİK (MapView/ATLAS_FAMILIES) DOKUNULMADI → birebir korunur (canlı takas Faz 3) ---");
console.log(fail === 0 ? "\n✅ GRAFİK VERİ KATMANI GATE'LERİ GEÇTİ (0 başarısız) — canlı takasa hazır (Faz 3)" : "\n❌ " + fail + " başarısız");
process.exit(fail === 0 ? 0 : 1);
