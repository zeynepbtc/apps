/* DECISION-004 · `kind` göçü — deferred girdilerine zorunlu `kind` alanı ekler
   Yetki: Uygulama Sözleşmesi (v2, Codex TAM PASS) · DECISION-004-READINGS-DATA-MODEL.md (v3, a1721ae4)
   Dal: onboarding-b2-gate3 · Taban: a1721ae4

   ── BU BETİĞİN YAPTIĞI TEK ŞEY ─────────────────────────────────────────────────────────────
       男 (otoko) readings.deferred[0]  → kind:"on"   (ナン · katakana)
       足 (ashi)  readings.deferred[0]  → kind:"kun"  (た(りる) · hiragana)
   Anahtar sırası: {reading, kind, reason, recommend} — kind, reading'in hemen ardında (Q4 ONAY).
   Başka hiçbir alan, hiçbir kayıt değişmez. Kalan 96 kayıt bayt olarak birebir aynı kalır.
   Bu betik yalnız index.html DATA'sına dokunur; jeneratör çıktılarını (data_chars.json +
   content_manifest.json + CONTENT_HASH) generate_data_chars.js üretir — bu betik onlara DOKUNMAZ.

   ── EV DESENİ (apply_authoring_16_minami_reviewed.js) ──────────────────────────────────────
       · başlangıç durumu BİREBİR doğrulanır; tek uyumsuzlukta HİÇBİR ŞEY yazılmaz
       · ikinci koşum non-zero biter (kind zaten varsa başlangıç doğrulaması durdurur)
       · alan alan bayt karşılaştırması: yalnız 2 kayıt, yalnız kind farkı
       · eski kayıt kaynakta BENZERSİZ substring olarak bulunmadan replace YOK
   SONRAKİ ADIM: node _faz2/generate_data_chars.js */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");

/* Göç tanımı — Uygulama Sözleşmesi §1.1 tablosu (BİREBİR) */
const MIGRATIONS = [
  { id: "otoko", character: "男", reading: "ナン",     kind: "on"  },
  { id: "ashi",  character: "足", reading: "た(りる)", kind: "kun" },
];
const EXPECTED_KEYS = ["reading", "reason", "recommend"];

let src = fs.readFileSync(INDEX, "utf8");
const m = src.match(/const DATA = (\{.*?\});/s);
if (!m) throw new Error("DATA bulunamadı");
const DATA = JSON.parse(m[1]);
const before = JSON.parse(JSON.stringify(DATA.chars));   // ölçüm için değişmez taban klon
const targets = new Set(MIGRATIONS.map(x => x.id));

/* ── BAŞLANGIÇ DURUMU BİREBİR DOĞRULANIR — uymazsa HİÇBİR ŞEY YAZILMAZ ──
   Bu blok aynı zamanda İKİNCİ KOŞUMU non-zero bitirir: ilk koşumdan sonra
   deferred girdisinde `kind` bulunduğu için burada durur (tekrar koruması). */
for (const mg of MIGRATIONS) {
  const rec = DATA.chars[mg.id];
  if (!rec) throw new Error(mg.id + " bulunamadı");
  if (rec.character !== mg.character) throw new Error(mg.id + ": beklenen karakter " + mg.character + ", gelen " + rec.character);
  const r = rec.readings;
  if (!r || !Array.isArray(r.deferred) || r.deferred.length !== 1)
    throw new Error(mg.id + ": tam olarak 1 deferred girdisi beklenir");
  const d = r.deferred[0];
  if (d.reading !== mg.reading) throw new Error(mg.id + ": deferred reading '" + mg.reading + "' bekleniyor, gelen '" + d.reading + "'");
  if ("kind" in d) throw new Error(mg.id + ": deferred girdisinde 'kind' zaten var — betik iki kez koşmaz");
  if (JSON.stringify(Object.keys(d)) !== JSON.stringify(EXPECTED_KEYS))
    throw new Error(mg.id + ": beklenen anahtar dizisi [" + EXPECTED_KEYS + "], gelen [" + Object.keys(d) + "]");
}

/* ── DEĞİŞİKLİK · yalnız deferred[0]'a kind; sıra {reading, kind, reason, recommend} ── */
for (const mg of MIGRATIONS) {
  const d = DATA.chars[mg.id].readings.deferred[0];
  const nd = { reading: d.reading, kind: mg.kind, reason: d.reason, recommend: d.recommend };
  if (Object.keys(nd).length !== 4) throw new Error(mg.id + ": deferred girdi 4 alan taşımalı");
  if (JSON.stringify(Object.keys(nd)) !== JSON.stringify(["reading", "kind", "reason", "recommend"]))
    throw new Error(mg.id + ": anahtar sırası {reading,kind,reason,recommend} olmalı");
  for (const k of EXPECTED_KEYS)
    if (JSON.stringify(nd[k]) !== JSON.stringify(d[k])) throw new Error(mg.id + ": '" + k + "' değişmemeliydi");
  DATA.chars[mg.id].readings.deferred[0] = nd;
}

/* ── ALAN ALAN BAYT KARŞILAŞTIRMASI · yalnız 2 kayıt değişir, o da yalnız kind ── */
let changed = 0;
for (const id of Object.keys(before)) {
  const a = JSON.stringify(before[id]);
  const b = JSON.stringify(DATA.chars[id]);
  if (a === b) {
    if (targets.has(id)) throw new Error(id + ": değişmesi gereken kayıt değişmedi");
    continue;
  }
  changed++;
  if (!targets.has(id)) throw new Error(id + ": dokunulmaması gereken kayıt değişti");
  const mg = MIGRATIONS.find(x => x.id === id);
  const bMinusKind = JSON.parse(b);
  if (bMinusKind.readings.deferred[0].kind !== mg.kind) throw new Error(id + ": kind beklenen değer değil");
  delete bMinusKind.readings.deferred[0].kind;
  if (JSON.stringify(bMinusKind) !== a) throw new Error(id + ": kind dışında bir fark var — reddedildi");
}
if (changed !== 2) throw new Error("Beklenen 2 kayıt değişmeli; değişen: " + changed);

/* ── YAZMA · eski kayıt kaynakta BENZERSİZ substring olmadan replace YOK ── */
for (const mg of MIGRATIONS) {
  const oldSub = JSON.stringify(before[mg.id]);
  const newSub = JSON.stringify(DATA.chars[mg.id]);
  if (!src.includes(oldSub)) throw new Error(mg.id + ": kayıt kaynakta birebir bulunamadı — yazılmadı");
  if (src.split(oldSub).length - 1 !== 1) throw new Error(mg.id + ": kayıt kaynakta birden çok kez geçiyor — yazılmadı");
  src = src.replace(oldSub, newSub);
}
fs.writeFileSync(INDEX, src);

/* ── POST-WRITE · disk yeniden ayrıştırılır, 96/2 invariantı doğrulanır ── */
const src2 = fs.readFileSync(INDEX, "utf8");
const DATA2 = JSON.parse(src2.match(/const DATA = (\{.*?\});/s)[1]);
let disk = 0;
for (const id of Object.keys(before))
  if (JSON.stringify(before[id]) !== JSON.stringify(DATA2.chars[id])) disk++;
if (disk !== 2) throw new Error("POST-WRITE doğrulaması: beklenen 2, diskteki fark " + disk);
for (const mg of MIGRATIONS)
  if (DATA2.chars[mg.id].readings.deferred[0].kind !== mg.kind)
    throw new Error("POST-WRITE: " + mg.id + " kind diske yazılmadı");

console.log("kind göçü UYGULANDI · 2/2 deferred girdisi:");
for (const mg of MIGRATIONS)
  console.log("  " + mg.character + " (" + mg.id + ") deferred[" + mg.reading + "] += kind:\"" + mg.kind + "\"");
console.log("Değişen kayıt: " + changed + "/" + Object.keys(before).length + " · dokunulmayan: " + (Object.keys(before).length - changed) + " (bayt aynı)");
console.log("SONRAKİ ADIM: node _faz2/generate_data_chars.js  (data_chars.json + content_manifest.json + CONTENT_HASH güncellenir)");
