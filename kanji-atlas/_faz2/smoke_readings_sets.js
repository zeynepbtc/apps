/* DECISION-004 · Okuma kümesi kapıları (I-1 · I-2 · I-3 · I-4 · I-7 · I-8)
   Yetki: Uygulama Sözleşmesi (v2, Codex TAM PASS) · DECISION-004-READINGS-DATA-MODEL.md (v3)

   Bu dosya, DECISION-004 §2'nin sert kapılarını `kind` farkındalığıyla uygular. `kind`-agnostik
   eski I-3 ve geçersiz kılınan I-6 ham dize kontrolleri smoke_legacy_derived.js'ten kaldırıldı;
   typed I-3 buraya taşındı (Sözleşme §1.2, Q2/Q3).

   Kapsam: yalnız `readings` iskelesi olan kayıtlar (`if (!k.readings) continue`) —
   DECISION-004 §6.1 cırcır kuralı. İskelesiz 81 kayıt bu turda kapsam dışı.

   SAF FONKSİYON: checkReadingSets(chars) → { pass, fail, failures[], byGate }.
   Enjeksiyon harness'ı (readings_gate_injection.js) bunu bellek içi klon üzerinde çağırır;
   ürün dosyasına DOKUNMADAN her kapının gerçekten kırılabilir olduğunu kanıtlar
   (DECISION-004 §2 kabul koşulu: totolojik güvence kabul edilmez).

   | Kapı | Kontrol |
   |------|---------|
   | I-1  | officialOn  == taughtOn  ∪ deferred(kind="on")   (küme eşitliği)          |
   | I-2  | officialKun == taughtKun ∪ deferred(kind="kun")  (küme eşitliği)          |
   | I-3  | deferred(on) ∩ taughtOn == ∅  ve  deferred(kun) ∩ taughtKun == ∅ (typed)  |
   | I-4  | officialOn·officialKun·taughtOn·taughtKun dizi içi tekrarsız              |
   | I-7  | her deferred girdisi geçerli kind taşır (varlık + ∈ {"on","kun"})         |
   | I-8  | On tarafı katakana · Kun tarafı hiragana(+"( )") · deferred kind'ıyla uyumlu | */

/* Yazı sistemi tanıyıcıları (DECISION-004 N-1 / N-2 / N-3) */
const isKatakana = s => typeof s === "string" && /^[ァ-ヺー]+$/.test(s);
const isHiragana = s => typeof s === "string" &&
  /^[ぁ-ゖゝ-ゟ]+(\([ぁ-ゖゝ-ゟ]+\))?$/.test(s);

const setEq = (a, b) => {
  const A = new Set(a), B = new Set(b);
  if (A.size !== B.size) return false;
  for (const x of A) if (!B.has(x)) return false;
  return true;
};
const uniq = a => Array.isArray(a) && new Set(a).size === a.length;

function checkReadingSets(chars) {
  let pass = 0, fail = 0;
  const failures = [];
  const byGate = { "I-1": { p: 0, f: 0 }, "I-2": { p: 0, f: 0 }, "I-3": { p: 0, f: 0 },
                   "I-4": { p: 0, f: 0 }, "I-7": { p: 0, f: 0 }, "I-8": { p: 0, f: 0 } };
  const ok = (gate, name, cond) => {
    if (cond) { pass++; byGate[gate].p++; }
    else { fail++; byGate[gate].f++; failures.push(gate + " · " + name); }
  };

  for (const id in chars) {
    const k = chars[id];
    if (!k.readings) continue;                                   // cırcır kuralı
    const r = k.readings;
    const deferred = Array.isArray(r.deferred) ? r.deferred : [];
    const hasQuartet = ["officialOn", "officialKun", "taughtOn", "taughtKun"].every(f => Array.isArray(r[f]));

    /* I-7 · her deferred girdisi geçerli kind taşır */
    for (const d of deferred)
      ok("I-7", id + " deferred '" + (d && d.reading) + "' geçerli kind",
         !!d && typeof d === "object" && (d.kind === "on" || d.kind === "kun"));

    /* I-3 (typed) · deferred okuma kendi tipindeki taught kümesine SIZMAZ */
    for (const d of deferred) {
      if (d && d.kind === "on")
        ok("I-3", id + " deferred(on) '" + d.reading + "' ∉ taughtOn",
           !(r.taughtOn || []).includes(d.reading));
      else if (d && d.kind === "kun")
        ok("I-3", id + " deferred(kun) '" + d.reading + "' ∉ taughtKun",
           !(r.taughtKun || []).includes(d.reading));
    }

    /* I-8 (+deferred) · deferred elemanı kendi kind'ıyla uyumlu yazı sistemi */
    for (const d of deferred) {
      if (d && d.kind === "on")
        ok("I-8", id + " deferred(on) katakana: " + d.reading, isKatakana(d.reading));
      else if (d && d.kind === "kun")
        ok("I-8", id + " deferred(kun) hiragana: " + d.reading, isHiragana(d.reading));
    }

    if (!hasQuartet) continue;                                   // I-1/I-2/I-4/I-8-küme yalnız dörtlü kayıtlarda

    const defOn  = deferred.filter(d => d && d.kind === "on").map(d => d.reading);
    const defKun = deferred.filter(d => d && d.kind === "kun").map(d => d.reading);

    /* I-1 / I-2 · küme eşitliği */
    ok("I-1", id + " officialOn == taughtOn ∪ deferred(on)",  setEq(r.officialOn,  [...r.taughtOn,  ...defOn]));
    ok("I-2", id + " officialKun == taughtKun ∪ deferred(kun)", setEq(r.officialKun, [...r.taughtKun, ...defKun]));

    /* I-4 · dört dizide tekrarsızlık (kayıt başına tek karar) */
    ok("I-4", id + " 4 dizide tekrar yok",
       uniq(r.officialOn) && uniq(r.officialKun) && uniq(r.taughtOn) && uniq(r.taughtKun));

    /* I-8 (33 küme dizesi) · On tarafı katakana, Kun tarafı hiragana(+"( )")
       Kümeler taught ve deferred'ı da kapsar ki taught tarafına sızan yanlış yazı sistemi
       (ör. I-8b: taughtKun'a katakana) yakalansın. */
    const onSide  = new Set([...r.officialOn,  ...r.taughtOn,  ...defOn]);
    const kunSide = new Set([...r.officialKun, ...r.taughtKun, ...defKun]);
    for (const x of onSide)  ok("I-8", id + " ON katakana: " + x, isKatakana(x));
    for (const x of kunSide) ok("I-8", id + " KUN hiragana: " + x, isHiragana(x));
  }

  return { pass, fail, failures, byGate };
}

/* ── CLI ── ürün DATA'sını index.html'den okur; pass/fail sayar; process.exit(fail?1:0) ── */
if (require.main === module) {
  const fs = require("fs"), path = require("path");
  const src = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const chars = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]).chars;
  const { pass, fail, failures, byGate } = checkReadingSets(chars);
  for (const g of Object.keys(byGate))
    console.log(`  ${g}: ${byGate[g].p}/${byGate[g].p + byGate[g].f}${byGate[g].f ? " ❌" : ""}`);
  for (const f of failures) console.log("FAIL:", f);
  console.log(`smoke_readings_sets: ${pass}/${pass + fail}`);
  process.exit(fail ? 1 : 0);
}

module.exports = { checkReadingSets };
