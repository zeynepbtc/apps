/* ============================================================
   FAZ 2 · Kalem 1 — KANONİK AİLE VERİSİ + ÇÖZÜMLEYİCİ  (v2)
   ------------------------------------------------------------
   SINIR (kilitli): FAMILIES yalnız AİLE İLİŞKİLERİNİN kanonik
   kaynağıdır. İçerik DATA'da, ses manifestte, ilerleme storage'da.
   ------------------------------------------------------------
   GEÇİT-1 (enum dondu): Yeni relation type yalnız Karar Günlüğü'ne
     giriş yapıldıktan sonra eklenir. Tavan: 10.
   GEÇİT-2 (primary/secondary): Bir karakterin TEK primary ailesi
     vardır (kural: karakterin sınıflandırıcı radikali). Öğrenme
     sırası/ilerleme/öneri bir gün primary üzerinden çalışır.
   ============================================================ */

// Dondurulmuş ilişki türü enum'u. BÜYÜTME = önce Karar Günlüğü.
const REL_TYPES = Object.freeze([
  "root",         // ailenin kökü
  "repetition",   // kökün tekrarı (林=木木, 森=木木木)
  "composition",  // iki+ bileşenin birleşimi (休=亻+木)
  "indicator",    // kök + işaret çizgisi (本=木+一)
  "variant",      // kökün konumsal/biçimsel türevi (亻 ← 人)
  "extension"     // kökün piktografik uzantısı (大 ← 人)
]);
const REL_MAX = 10; // tavan; enum bunu aşamaz (aşarsa mimari dağılır)

const FAMILIES = {
  tree: {
    id: "tree", label: "Ağaç ailesi", component: "木", rootId: "ki",
    members: [
      { id: "hayashi", rel: "repetition",  via: "木", note: "iki ağaç" },
      { id: "mori",    rel: "repetition",  via: "木", note: "üç ağaç" },
      { id: "hon",     rel: "indicator",   via: "木", note: "ağaç + temel/kök işareti (一)" },
      // 休 ağaç ailesine İKİNCİL bağlı (primary = insan, çünkü sınıflandırıcı radikali 亻)
      { id: "yasumu",  rel: "composition", via: "木", note: "insan (亻) + ağaç → dinlenen kişi", primary: false }
    ],
    learningOrder: ["ki", "hayashi", "mori", "hon", "yasumu"]
  },
  person: {
    id: "person", label: "İnsan ailesi", component: "人", rootId: "hito",
    members: [
      { id: "r_nin",  rel: "variant",     via: "人", note: "人'nin sol/yan biçimi (亻)" },
      { id: "dai",    rel: "extension",   via: "人", note: "kollarını açmış insan → büyük" },
      { id: "ten",    rel: "composition", via: "大", note: "büyük insanın üstünde çizgi → gök" },
      // 休 BURADA birincil (sınıflandırıcı radikali = 亻)
      { id: "yasumu", rel: "composition", via: "亻", note: "insan (亻) + ağaç → dinlenmek", primary: true }
    ],
    learningOrder: ["hito", "r_nin", "dai", "ten", "yasumu"]
  }
};

function makeResolver(DATA_chars, families) {
  const FAM = families || FAMILIES;
  const fams = () => Object.values(FAM);
  const charOf = id => (DATA_chars[id] ? DATA_chars[id].character : null);

  function famNodes(fam) {
    const root = { id: fam.rootId, char: charOf(fam.rootId) || fam.component, rel: "root", via: null, note: null, missing: !DATA_chars[fam.rootId] };
    const members = fam.members.map(m => ({
      id: m.id, char: charOf(m.id), rel: m.rel, via: m.via, note: m.note,
      primary: m.primary, missing: !DATA_chars[m.id]
    }));
    return [root, ...members];
  }

  function familiesOf(id) {
    return fams().filter(f => f.rootId === id || f.members.some(m => m.id === id));
  }

  // GEÇİT-2: bir karakterin TEK primary ailesi
  function primaryFamilyOf(id) {
    const rootFam = fams().find(f => f.rootId === id);
    if (rootFam) return rootFam;                                   // kök → kendi ailesine primary
    const mem = fams().filter(f => f.members.some(m => m.id === id));
    if (!mem.length) return null;
    const explicit = mem.find(f => f.members.find(m => m.id === id).primary === true);
    if (explicit) return explicit;
    const nonSecondary = mem.filter(f => f.members.find(m => m.id === id).primary !== false);
    if (nonSecondary.length === 1) return nonSecondary[0];
    return mem.length === 1 ? mem[0] : null;                        // null = validator uyarır (belirsiz primary)
  }
  function secondaryFamiliesOf(id) {
    const p = primaryFamilyOf(id);
    return familiesOf(id).filter(f => f !== p);
  }

  function familyList() {
    return fams().map(f => ({ id: f.id, label: f.label, component: f.component, count: f.members.length + 1 }));
  }
  function familyStripData(id) {
    const p = primaryFamilyOf(id);
    if (!p) return null;                                            // aile yoksa KONTROLLÜ null (exception yok)
    return {
      famId: p.id, label: p.label, component: p.component,
      members: famNodes(p),
      secondaryFamilies: secondaryFamiliesOf(id).map(f => ({ id: f.id, label: f.label, component: f.component }))
    };
  }
  function detailFamilyLinks(id) {
    const seen = new Set(), out = [];
    familiesOf(id).forEach(f => famNodes(f).forEach(n => {
      if (n.id !== id && !seen.has(n.id)) { seen.add(n.id); out.push({ id: n.id, char: n.char, rel: n.rel, famId: f.id }); }
    }));
    return out;
  }
  function graphEdges() {
    const edges = [], nodeIds = new Set();
    fams().forEach(f => {
      nodeIds.add(f.rootId);
      f.members.forEach(m => { nodeIds.add(m.id); edges.push({ from: f.rootId, to: m.id, rel: m.rel, via: m.via, fam: f.id }); });
    });
    const nodes = [...nodeIds].map(id => {
      const p = primaryFamilyOf(id);
      return { id, char: charOf(id), primaryFam: p ? p.id : null, families: familiesOf(id).map(f => f.id) };
    });
    return { nodes, edges };
  }
  function familyProgress(famId, learnedSet) {
    const f = FAM[famId]; if (!f) return null;                     // aile yoksa KONTROLLÜ null
    const nodes = famNodes(f);
    return { famId, learned: nodes.filter(n => learnedSet.has(n.id)).length, total: nodes.length };
  }

  return { charOf, famNodes, familiesOf, primaryFamilyOf, secondaryFamiliesOf, familyList, familyStripData, detailFamilyLinks, graphEdges, familyProgress };
}

if (typeof module !== "undefined") module.exports = { FAMILIES, REL_TYPES, REL_MAX, makeResolver };
