/* İZLENEBİLİRLİK · etymology.reviewedAt (Zeynep talebi, 2026-07-25)
   "Bu açıklamayı hangi kaynaklara dayanarak, ne zaman onaylamışız?" sorusunun cevabı kayıtta dursun.
   Tarihler UYDURULMAZ: her kanjinin ilk kez qaStatus:"reviewed" olduğu commit'in gerçek tarihi
   git geçmişinden türetildi (bkz. _faz2/derive_reviewed_at.js). Kullanıcıya GÖRÜNMEZ — editör metadata'sı.
   Not: talepteki `reviewStatus` alanı zaten `qaStatus` adıyla var (kod ona bakar) — ikinci bir alan açılmadı. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);

// id → ilk "reviewed" commit tarihi (git log --date=short ile türetildi)
const REVIEWED_AT = {
  toki: "2026-07-24", hareru: "2026-07-24", kiku: "2026-07-24", hanasu: "2026-07-24",   // Parti 1A · 68ecd89
  gakkou: "2026-07-24", gengo: "2026-07-24", yomu: "2026-07-24", nani: "2026-07-24",     // Parti 1B · 5c4269a
  ki2: "2026-07-24", ou: "2026-07-24", tama: "2026-07-24", higashi: "2026-07-24",        // Parti 2  · 30cd0ca
  me: "2026-07-24", mimi: "2026-07-24", te: "2026-07-24", ashi: "2026-07-24",            // Parti 3  · e20e532
  yon: "2026-07-25", go: "2026-07-25", roku: "2026-07-25", nana: "2026-07-25",           // Parti 4  · 4baac87
  hachi: "2026-07-25",
  // v2 iskele turu: etymology metadata'sı reviewed, köken metni legacy pictogram_note'tan geliyor
  dai: "2026-07-24",                                                                     // 747d04e
  kuni: "2026-07-24",                                                                    // 46229fb
  ten: "2026-07-24", fu: "2026-07-24", hon: "2026-07-24",                                // fdd5df2
};

let n = 0; const skipped = [];
for (const id in DATA.chars) {
  const rec = DATA.chars[id];
  const e = rec.etymology;
  if (!e) continue;
  if (e.qaStatus !== "reviewed") { skipped.push(rec.character + " (" + e.qaStatus + ")"); continue; }
  const at = REVIEWED_AT[id];
  if (!at) throw new Error("reviewed ama tarihi yok: " + rec.character + " / " + id);
  if (e.reviewedAt === at) continue;
  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error("kaynakta bulunamadı: " + rec.character);
  const next = Object.assign({}, rec, { etymology: Object.assign({}, e, { reviewedAt: at }) });
  src = src.replace(oldSub, JSON.stringify(next));
  n++;
}
fs.writeFileSync(INDEX, src);
console.log(`reviewedAt yazıldı: ${n} kayıt.`);
if (skipped.length) console.log("atlandı (reviewed değil):", skipped.join(", "));
