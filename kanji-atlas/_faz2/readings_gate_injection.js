/* DECISION-004 · Okuma kümesi kapıları — ENJEKSİYON KANITI HARNESS'I
   Yetki: Uygulama Sözleşmesi (v2, Codex TAM PASS) · smoke_readings_sets.js checkReadingSets

   AMAÇ: her kapının GERÇEKTEN kırılabilir olduğunu kanıtlar (DECISION-004 §2 kabul koşulu:
   sabitleri sabitlere doğrulayan totolojik güvence kabul edilmez). Enjeksiyonsuz koşum PASS,
   enjeksiyonlu koşum FAIL — ham çıktı + GERÇEK exit kodu ile.

   ── KESİN KURAL: ENJEKSİYON YALNIZ BELLEKTE ──────────────────────────────────────────────
   index.html ve data_chars.json bu harness tarafından AÇILIP YAZILMAZ; yalnız okunur.
   Her enjeksiyon, index.html'den taze ayrıştırılmış `chars` KLONU üzerinde uygulanır.
   Orkestratör, koşum öncesi/sonrası iki ürün dosyasının SHA-256'sının EŞİT olduğunu gösterir.

   ── GERÇEK EXIT KODU ──────────────────────────────────────────────────────────────────────
   Orkestratör her satırı ayrı bir çocuk süreçte koşar:
       node readings_gate_injection.js --run=<key>
   Çocuk, checkReadingSets'i (aynı saf fonksiyon) klon üzerinde çağırır ve
   process.exit(fail?1:0) ile GERÇEK bir exit kodu döndürür. --run=baseline enjeksiyonsuzdur.

   Enjeksiyonlar (Uygulama Sözleşmesi §1.3):
     I-1  男'ın deferred girdisi silinir            → officialOn ⊋ taughtOn ∪ deferred(on)  FAIL
     I-2  足'ün officialKun'una karşılıksız kun     → officialKun ⊋ birleşim                 FAIL
     I-4  otoko taughtOn'da eleman tekrarlanır      → dizi içi tekrar                        FAIL
     I-7a 男 deferred.kind SİLİNİR                  → kind yok                               FAIL
     I-7b 男 deferred.kind geçersiz ("ON")          → kind ∉ {on,kun}                        FAIL
     I-8a 男 deferred.reading hiragana (なん)/on    → On tarafı hiragana                     FAIL
     I-8b 足 taughtKun'a katakana eleman            → Kun tarafı katakana                    FAIL
     I-3  男'ın deferred(on) ナン taughtOn'a da     → I-1 PASS · I-3 FAIL (bağımsızlık)      */
const fs = require("fs"), path = require("path"), crypto = require("crypto"), cp = require("child_process");
const { checkReadingSets } = require("./smoke_readings_sets.js");

const HERE = __dirname;
const INDEX = path.join(HERE, "..", "index.html");
const DATA_CHARS = path.join(HERE, "data_chars.json");
const SELF = path.join(HERE, "readings_gate_injection.js");

const sha256 = f => crypto.createHash("sha256").update(fs.readFileSync(f)).digest("hex");
/* index.html'den TAZE klon — her çağrı bağımsız; kaynak dosya YALNIZ OKUNUR */
const loadCharsClone = () =>
  JSON.parse(fs.readFileSync(INDEX, "utf8").match(/const DATA = (\{.*?\});/s)[1]).chars;

/* Enjeksiyon tanımları — mutate yalnız bellek içi klonu değiştirir */
const INJECTIONS = [
  { key: "I-1",  target: "I-1", label: "男'ın deferred girdisi silinir",
    mutate: c => { c.otoko.readings.deferred.splice(0, 1); } },
  { key: "I-2",  target: "I-2", label: "足'ün officialKun'una karşılıksız kun eklenir (ぬん)",
    mutate: c => { c.ashi.readings.officialKun.push("ぬん"); } },
  { key: "I-4",  target: "I-4", label: "otoko taughtOn'da mevcut eleman tekrarlanır",
    mutate: c => { c.otoko.readings.taughtOn.push(c.otoko.readings.taughtOn[0]); } },
  { key: "I-7a", target: "I-7", label: "男 deferred.kind alanı silinir",
    mutate: c => { delete c.otoko.readings.deferred[0].kind; } },
  { key: "I-7b", target: "I-7", label: "男 deferred.kind geçersiz değere çekilir ('ON')",
    mutate: c => { c.otoko.readings.deferred[0].kind = "ON"; } },
  { key: "I-8a", target: "I-8", label: "男 deferred.reading hiragana yapılır (なん), kind:'on' kalır",
    mutate: c => { c.otoko.readings.deferred[0].reading = "なん"; } },
  { key: "I-8b", target: "I-8", label: "足 taughtKun'a katakana bir eleman eklenir (ソク)",
    mutate: c => { c.ashi.readings.taughtKun.push("ソク"); } },
  { key: "I-3",  target: "I-3", label: "男'ın deferred(on) okuması ナン taughtOn'a DA konur",
    independence: true,   // I-1'in geçmeye devam ettiği gösterilecek
    mutate: c => { c.otoko.readings.taughtOn.push("ナン"); } },
];

/* ── ÇOCUK MODU: tek satır koş, GERÇEK exit kodu döndür ── */
function runOne(key) {
  const chars = loadCharsClone();
  const baseline = key === "baseline";
  const inj = baseline ? null : INJECTIONS.find(x => x.key === key);
  if (!baseline && !inj) { console.error("bilinmeyen enjeksiyon: " + key); process.exit(2); }

  if (inj) { console.log("ENJEKSİYON:", inj.key, "·", inj.label); console.log("HEDEF KAPI:", inj.target); }
  else console.log("BASELINE · enjeksiyon YOK");

  if (inj) inj.mutate(chars);
  const { pass, fail, failures, byGate } = checkReadingSets(chars);
  for (const g of Object.keys(byGate))
    console.log(`  ${g}: ${byGate[g].p}/${byGate[g].p + byGate[g].f}${byGate[g].f ? " ❌" : ""}`);
  for (const f of failures) console.log("FAIL:", f);
  console.log(`smoke_readings_sets: ${pass}/${pass + fail}`);
  console.log("exit:", fail ? 1 : 0);
  process.exit(fail ? 1 : 0);
}

/* ── ORKESTRATÖR ── */
function orchestrate() {
  const shaBefore = { index: sha256(INDEX), data: sha256(DATA_CHARS) };
  console.log("=== ÜRÜN DOSYASI SHA-256 · KOŞUM ÖNCESİ ===");
  console.log("  index.html      :", shaBefore.index);
  console.log("  data_chars.json :", shaBefore.data);

  const spawnOne = key => {
    const r = cp.spawnSync(process.execPath, [SELF, "--run=" + key], { encoding: "utf8" });
    return { code: r.status, out: (r.stdout || "") + (r.stderr || "") };
  };

  let problems = 0;
  const record = [];

  /* BASELINE — enjeksiyonsuz, PASS (exit 0) beklenir */
  console.log("\n=== BASELINE (enjeksiyonsuz) — beklenen exit 0 ===");
  const base = spawnOne("baseline");
  process.stdout.write(base.out);
  console.log("→ GERÇEK exit kodu:", base.code);
  if (base.code !== 0) { console.log("✗ BEKLENMEDİK: baseline PASS olmalıydı"); problems++; }
  record.push({ key: "baseline", expect: 0, code: base.code, ok: base.code === 0 });

  /* ENJEKSİYONLAR — her biri FAIL (exit 1) beklenir; hedef kapı gerçekten kırılmalı */
  for (const inj of INJECTIONS) {
    console.log("\n=== " + inj.key + " — beklenen exit 1 (hedef kapı: " + inj.target + ") ===");
    const child = spawnOne(inj.key);
    process.stdout.write(child.out);
    console.log("→ GERÇEK exit kodu:", child.code);

    /* in-process semantik doğrulama: hedef kapı GERÇEKTEN kırıldı mı */
    const chars = loadCharsClone();
    inj.mutate(chars);
    const { byGate } = checkReadingSets(chars);
    const targetBroke = byGate[inj.target].f > 0;

    let ok = child.code === 1 && targetBroke;
    if (child.code !== 1) { console.log("✗ BEKLENMEDİK: exit 1 olmalıydı"); }
    if (!targetBroke) { console.log("✗ BEKLENMEDİK: hedef kapı " + inj.target + " kırılmadı"); }

    /* I-3 bağımsızlık kanıtı: I-1 GEÇMEYE DEVAM ederken I-3 düşer */
    if (inj.independence) {
      const i1ok = byGate["I-1"].f === 0;
      const i3broke = byGate["I-3"].f > 0;
      console.log("  BAĞIMSIZLIK: I-1 =", (i1ok ? "PASS" : "FAIL"), "(f=" + byGate["I-1"].f + ") · I-3 =",
                  (i3broke ? "FAIL" : "PASS"), "(f=" + byGate["I-3"].f + ")");
      if (!(i1ok && i3broke)) { console.log("✗ BEKLENMEDİK: I-3 enjeksiyonunda I-1 PASS · I-3 FAIL bekleniyordu"); ok = false; }
    }
    if (!ok) problems++;
    record.push({ key: inj.key, target: inj.target, expect: 1, code: child.code, targetBroke, ok });
  }

  /* ÜRÜN DOSYALARI YAZILMADI mı */
  const shaAfter = { index: sha256(INDEX), data: sha256(DATA_CHARS) };
  console.log("\n=== ÜRÜN DOSYASI SHA-256 · KOŞUM SONRASI ===");
  console.log("  index.html      :", shaAfter.index);
  console.log("  data_chars.json :", shaAfter.data);
  const untouched = shaBefore.index === shaAfter.index && shaBefore.data === shaAfter.data;
  console.log(untouched ? "✅ ÜRÜN DOSYALARI DEĞİŞMEDİ (harness yazmadı)"
                        : "❌ ÜRÜN DOSYASI DEĞİŞTİ — harness yazmış olabilir");
  if (!untouched) problems++;

  /* ÖZET */
  console.log("\n=== ÖZET ===");
  for (const r of record)
    console.log(`  ${r.key.padEnd(9)} beklenen exit ${r.expect} · gerçek ${r.code} · ${r.ok ? "✅" : "❌"}` +
                (r.target ? "  (hedef " + r.target + (r.targetBroke ? " kırıldı" : " KIRILMADI") + ")" : ""));
  console.log(`\nBaseline PASS + 8 enjeksiyon FAIL + ürün dokunulmadı: ${problems === 0 ? "✅ TÜMÜ BEKLENDİĞİ GİBİ" : "❌ " + problems + " sorun"}`);
  process.exit(problems === 0 ? 0 : 1);
}

/* ── giriş ── */
const runArg = process.argv.slice(2).find(a => a.startsWith("--run="));
if (runArg) runOne(runArg.slice("--run=".length));
else orchestrate();
