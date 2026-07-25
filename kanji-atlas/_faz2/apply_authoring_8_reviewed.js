/* AUTHORING Parti 8 · 土 母 生 行 — REVIEWED ONAYI (Zeynep, 2026-07-25).
   Karar: confidence 土=B, 母=A, 生=A, 行=B (drafted değerleriyle aynı → değişmez). Dördü reviewed.
   MNEMONIC (ilk kez gerçek 'active' içerik):
     土 = active · "Toprak aşağıda yayılır: 土'ta alttaki çizgi daha uzundur."   (土/士 karışması)
     母 = not_required
     生 = not_required
     行 = active · "Kavşakta bir yol seç: git ve yap."                           (kavşak→gitmek→yapmak köprüsü)
   Zeynep: "Active metinleri tarihsel köken açıklaması değil, AYRI Hafıza katmanı olarak tut."
   Kod bunu zaten ayırıyor: kokenOf → 'Kökeni' bölümü (summaryTr); mnemonicOf(active) → ayrı
   '記 · Şöyle hatırlayabilirsin:' kartı (textTr). İki katman ayrı render edilir.

   basis alanı kodda/testte kullanılmıyor ve hiçbir kayıtta yok → mnemonic nesnesi minimal tutuldu
   ({status, textTr}); smoke_content_scaffold tam bunu bekliyor. İki active de visual_story (sahte
   etimoloji) DEĞİL: 土 gerçek biçim farkı, 行 gerçek anlam zincirinin köprüsü → 'gerçek köken değildir'
   etiketi gerekmez.

   DEĞİŞENLER: qaStatus drafted→reviewed · +reviewedAt (Git'ten) · mnemonic.status (+textTr) ·
   disagreementNote'a onay izi. summaryTr/confidence/formationType/sources DEĞİŞMEZ.
   components/component_meanings/pictogram_note/memory_hint_tr DOKUNULMAZ. */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const INDEX = path.join(__dirname, "..", "index.html");

const GIT_DATE = cp.execSync("git log -1 --format=%cd --date=short", { cwd: ROOT }).toString().trim();
if (!/^\d{4}-\d{2}-\d{2}$/.test(GIT_DATE)) throw new Error("git tarihi okunamadı: " + GIT_DATE);

const REVIEW = {
  "土": { mnemonic: { status: "active", textTr: "Toprak aşağıda yayılır: 土'ta alttaki çizgi daha uzundur." },
    mnemNote: "active — köken TEKRARI DEĞİL: öğrenenin gerçek karışıklığı olan 土/士 ayrımını çözer (biçim farkı, ayrı Hafıza katmanı)." },
  "母": { mnemonic: { status: "not_required" },
    mnemNote: "not_required — 4-soru: köken (女+göğüs noktaları) tek başına yeterince hatırlatıyor, ek çağrışım tekrar olurdu." },
  "生": { mnemonic: { status: "not_required" },
    mnemNote: "not_required — 4-soru: biten bitki imgesi tek başına yeterince hatırlatıyor." },
  "行": { mnemonic: { status: "active", textTr: "Kavşakta bir yol seç: git ve yap." },
    mnemNote: "active — köken tarihsel doğru ama 'kavşak→yapmak' geçişi zihinde zor bağlanıyor; bu köprü ek fayda sağlar (ayrı Hafıza katmanı, tarihsel açıklama değil)." }
};

let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const done = [];

for (const [ch, r] of Object.entries(REVIEW)) {
  const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === ch);
  if (!id) throw new Error(ch + " bulunamadı");
  const rec = DATA.chars[id];
  const e = rec.etymology;
  if (!e) throw new Error(ch + " etymology taşımıyor");
  if (e.qaStatus !== "drafted") throw new Error(ch + ": beklenen drafted, gelen " + e.qaStatus);
  if (e.reviewedAt) throw new Error(ch + ": reviewedAt zaten var — iki kez koşmaz");
  if (!rec.mnemonic || rec.mnemonic.status !== "pending_review") throw new Error(ch + ": mnemonic pending_review bekleniyor");

  const APPROVAL = " || ===== REVIEWED ONAYI (Zeynep, " + GIT_DATE + ") ===== "
    + "drafted → reviewed, reviewedAt Git'ten. confidence " + e.confidence + " (değişmedi). summaryTr revize edilmedi. "
    + "|| MNEMONIC (4-soru, otomatik değil): " + r.mnemNote;

  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error(ch + ": kayıt kaynakta bire bir bulunamadı");
  const next = Object.assign({}, rec, {
    etymology: Object.assign({}, e, { qaStatus: "reviewed", reviewedAt: GIT_DATE, disagreementNote: e.disagreementNote + APPROVAL }),
    mnemonic: r.mnemonic
  });

  /* Güvenceler */
  if (next.etymology.qaStatus !== "reviewed") throw new Error(ch + ": reviewed olmalı");
  if (next.etymology.reviewedAt !== GIT_DATE) throw new Error(ch + ": reviewedAt git tarihi olmalı");
  if (next.etymology.summaryTr !== e.summaryTr) throw new Error(ch + ": summaryTr değişmemeli");
  if (next.etymology.confidence !== e.confidence) throw new Error(ch + ": confidence değişmemeli");
  if (next.etymology.formationType !== e.formationType) throw new Error(ch + ": formationType değişmemeli");
  if (JSON.stringify(next.etymology.sources) !== JSON.stringify(e.sources)) throw new Error(ch + ": sources değişmemeli");
  if (["active","not_required"].indexOf(next.mnemonic.status) < 0) throw new Error(ch + ": mnemonic status geçersiz");
  if (next.mnemonic.status === "active") {
    if (!next.mnemonic.textTr || !next.mnemonic.textTr.trim()) throw new Error(ch + ": active mnemonic textTr boş olamaz");
    if (next.mnemonic.textTr === next.etymology.summaryTr) throw new Error(ch + ": Hafıza (mnemonic) ile Kökeni aynı olamaz");
  }
  if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error(ch + ": components değişmemeli");
  if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error(ch + ": component_meanings değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");

  src = src.replace(oldSub, JSON.stringify(next));
  done.push({ ch, id, conf: e.confidence, mn: next.mnemonic.status });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 8 REVIEWED · reviewedAt=" + GIT_DATE + " · KULLANICIYA AÇIK:");
for (const d of done) console.log("  " + d.ch + " (" + d.id + ") · confidence " + d.conf + " · mnemonic " + d.mn);
