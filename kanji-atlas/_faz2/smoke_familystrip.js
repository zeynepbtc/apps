const { chromium } = require("playwright");
const CUR = "file:///home/claude/atlas_drive_may30.html";
const BASE = "file:///home/claude/faz2/atlas_consumer1.html"; // consumer-1 baseline (rollback referansı)

async function openPage(browser, url) {
  const errors = [];
  const p = await browser.newPage();
  p.on("pageerror", e => errors.push("pageerror: " + e.message));
  p.on("console", m => { if (m.type() === "error" && !/Failed to load resource|net::ERR/i.test(m.text())) errors.push("console.error: " + m.text()); });
  await p.goto(url);
  await p.waitForFunction(() => typeof window.go === "function", { timeout: 15000 });
  return { p, errors };
}
async function visit(pg, id) {
  await pg.evaluate(cid => window.go("detail", cid), id);
  await pg.waitForTimeout(110);
  return pg.evaluate(() => {
    const strips = [...document.querySelectorAll(".screen .fam-strip")];
    const strip = strips[0] || null;
    let header = "", lead = "";
    if (strip) { const le = strip.previousElementSibling; lead = le ? le.textContent.trim() : ""; const se = le ? le.previousElementSibling : null; header = se ? se.textContent.trim() : ""; }
    const screenText = (document.querySelector(".screen") || document.body).textContent;
    const famSection = (() => { const s = document.querySelector(".screen"); if (!s) return ""; const nodes = [...s.querySelectorAll(".fam-strip")]; return nodes.map(n => n.outerHTML).join("|"); })();
    return {
      chips: strip ? [...strip.querySelectorAll(".fam-chip .fg")].map(x => x.textContent) : [],
      rels: strip ? [...strip.querySelectorAll(".fam-chip .ff")].map(x => x.textContent) : [],
      header, lead,
      stripCount: strips.length,
      secChips: strips[1] ? [...strips[1].querySelectorAll(".fam-chip .fg")].map(x => x.textContent) : [],
      hasYapisal: /Yapısal bağlantılar/.test(screenText),
      mentionsAgac: /Ağaç ailesi/.test(screenText),
      famSection,
      famStats: JSON.parse(JSON.stringify(window.__famStats))
    };
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const cur = await openPage(browser, CUR);
  const base = await openPage(browser, BASE);
  const ids = ["ki", "hayashi", "hon", "yasumu", "gakkou", "higashi", "fu"];
  const R = {}, RB = {};
  for (const id of ids) { R[id] = await visit(cur.p, id); RB[id] = await visit(base.p, id); }
  const stats = await cur.p.evaluate(() => JSON.parse(JSON.stringify(window.__famStats)));
  const meta = await cur.p.evaluate(() => {
    const kj = Object.keys(DATA.chars).filter(k => DATA.chars[k].type === "kanji");
    const canon = kj.filter(k => FR.familyStripData(k));
    const links = FR.detailFamilyLinks("yasumu");
    const purity = links.every(l => Object.keys(l).every(k => ["id", "char", "rel", "famId"].includes(k)));
    return { total: kj.length, canon: canon.length, purity };
  });
  await browser.close();

  let fail = 0; const A = (n, ok, x) => { console.log((ok ? "✓" : "✗") + " " + n + (x ? " — " + x : "")); if (!ok) fail++; };
  const has = (a, xs) => xs.every(x => a.includes(x));

  console.log("=== CONSUMER 1: familyStrip kanonik ===");
  A("木 kök: Ağaç ailesi + [木林森本休]", /Ağaç ailesi/.test(R.ki.header) && has(R.ki.chips, ["木", "林", "森", "本", "休"]));
  A("林 tekrar · 本 işaret", R.hayashi.rels.includes("tekrar") && R.hon.rels.includes("işaret"));
  A("東: 木/Ağaç ailesine DÜŞMEDİ", !R.higashi.mentionsAgac);
  console.log("=== CONSUMER 2: detailFamilyLinks çapraz-aile (休) ===");
  A("休 tek düğüm (adet=1)", R.yasumu.chips.filter(c => c === "休").length === 1 && !R.yasumu.secChips.includes("休"));
  A("Sözlük sınıflandırması (lead) + Yapısal bağlantılar (ayrı blok)", /Sözlük sınıflandırması/.test(R.yasumu.lead) && R.yasumu.hasYapisal);
  A("休 yapısal blok = ağaç üyeleri [木林森本]", has(R.yasumu.secChips, ["木", "林", "森", "本"]), R.yasumu.secChips.join(""));
  A("木 (secondary yok) → yapısal blok yok", R.ki.stripCount === 1);
  console.log("=== RESOLVER SAFLIĞI ===");
  A("detailFamilyLinks yalnız veri döndürür (id/char/rel/famId — UI metni yok)", meta.purity);
  console.log("=== REGRESYON / ROLLBACK PARİTE (consumer-1 == current, 休 hariç) ===");
  ["ki", "hayashi", "hon", "gakkou", "higashi", "fu"].forEach(id => A(`${id}: aile bölümü consumer-1 ile birebir`, R[id].famSection === RB[id].famSection));
  A("休: consumer-2'de değişti (beklenen)", R.yasumu.famSection !== RB.yasumu.famSection);
  console.log("=== FALLBACK & SAĞLIK ===");
  A("kapsam 8/91 kanonik (fallback 83, artmadı)", meta.canon === 8 && meta.total === 91, meta.canon + "/" + meta.total);
  A("校 · 東 · 夫 fallback'te", ["gakkou", "higashi", "fu"].every(x => stats.fallbackIds.includes(x)));
  A("yeni JS exception yok", cur.errors.length === 0, cur.errors.slice(0, 2).join(" | "));

  console.log("\n__famStats:", JSON.stringify(stats), "· kapsam:", meta.canon + "/" + meta.total);
  console.log(fail === 0 ? "\n✅ SMOKE GEÇTİ (0 başarısız)" : "\n❌ " + fail + " başarısız");
  process.exit(fail === 0 ? 0 : 1);
})().catch(e => { console.error("SMOKE HATASI:", e); process.exit(2); });
