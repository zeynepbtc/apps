/* AUTHORING Parti 7 · 分 半 友 赤 — REVIEWED ONAYI (Zeynep, 2026-07-25).
   Karar: "Parti 7 QA sonucunu onaylıyorum. Confidence: 分=A, 半=A, 友=A, 赤=B. Dördü de reviewed
   açılabilir. 赤'i drafted'da bekletmeye gerek yok; ana metin Kanjipedia ile uyumlu, alternatif
   yorum disagreementNote'ta kalıyor."

   DEĞİŞENLER (bu tur, kayıt bazında):
   - Dördü: qaStatus drafted → reviewed · + reviewedAt (Git'ten) · disagreementNote'a onay izi.
   - 赤 YALNIZCA: confidence A → B (QA bulgusu: 大'nin rolü yorumlanıyor — kompozisyon değil).
   - mnemonic.status pending_review → not_required — AMA OTOMATİK DEĞİL (Zeynep metodoloji
     düzeltmesi): her kayıt AYRI 4-soru mnemonic QA'sından geçirildi. Ölçüt "köken açık" değil,
     "köken TEK BAŞINA karakteri YETERİNCE HATIRLATIYOR mu?". Dördü de bu turda not_required
     çıktı; gerekçeler MNEM_QA'da. (İleride açık etimolojili ama ekstra çağrışım katan bir kayıt
     'active' alabilir — bu kural mekanik değildir.)

   summaryTr AYNEN KALIR (revizyon istenmedi). formationType, sources — dokunulmaz.
   components, component_meanings, pictogram_note, memory_hint_tr — DOKUNULMAZ.
   reviewedAt uydurulmaz: git log -1 --date=short. */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const INDEX = path.join(__dirname, "..", "index.html");

const GIT_DATE = cp.execSync("git log -1 --format=%cd --date=short", { cwd: ROOT }).toString().trim();
if (!/^\d{4}-\d{2}-\d{2}$/.test(GIT_DATE)) throw new Error("git tarihi okunamadı: " + GIT_DATE);

/* Kayıt bazında reviewed spec. newConfidence null ise değişmez. */
const REVIEW = {
  "分": { newConfidence: null, mnemQA:
    "4-SORU: (1) köken temel anlama ('bölmek') doğrudan bağlı → EVET. (2) tek okumada canlanır (bıçak+bölme) → EVET. "
    + "(3) ayrı mnemonic yeni bilgi katar mı → HAYIR, köken'in tekrarı olur. (4) 八 bileşen çelişkisi → köken zaten "
    + "'八=bölme (sekiz değil)' diye netliyor. SONUÇ: not_required." },
  "半": { newConfidence: null, mnemQA:
    "4-SORU: (1) köken 'yarım'a doğrudan bağlı → EVET. (2) 'büyük öküzü ikiye bölmek' imgesi tek okumada canlı (hatta "
    + "çarpıcı) → EVET. (3) ayrı mnemonic tekrar olur → yeni bilgi yok. (4) 八 tutarlı (分 ile ortak), çelişki yok. "
    + "SONUÇ: not_required — köken imgesi zaten güçlü." },
  "友": { newConfidence: null, mnemQA:
    "4-SORU: (1) köken 'dost'a doğrudan bağlı → EVET. (2) iki elin yardımlaşması tek okumada canlanır → EVET. "
    + "(3) ayrı mnemonic tekrar olur. (4) 又 (el) çelişki yok. SONUÇ: not_required." },
  "赤": { newConfidence: "B", mnemQA:
    "4-SORU: (1) köken 'kırmızı'ya doğrudan bağlı (büyük ateşin rengi) → EVET. (2) tek okumada canlanır → EVET. "
    + "(3) ayrı mnemonic tekrar olur → yeni çağrışım yok. (4) 大/火 çelişki yok. SONUÇ: not_required. "
    + "NOT: confidence B'ye indirildi (大'nin rolü yorumlanıyor); bu ETİMOLOJİ kararıdır, mnemonic'i etkilemez." }
};

let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const done = [];

for (const [ch, r] of Object.entries(REVIEW)) {
  const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === ch);
  if (!id) throw new Error(ch + " bulunamadı");
  const rec = DATA.chars[id];
  const e = rec.etymology;
  if (!e) throw new Error(ch + " etymology taşımıyor — önce drafted betiği koşmalı");
  if (e.qaStatus !== "drafted") throw new Error(ch + ": beklenen drafted, gelen " + e.qaStatus);
  if (e.reviewedAt) throw new Error(ch + ": reviewedAt zaten var — iki kez koşmaz");
  if (!rec.mnemonic || rec.mnemonic.status !== "pending_review") throw new Error(ch + ": mnemonic pending_review bekleniyor");

  const finalConf = r.newConfidence || e.confidence;
  const APPROVAL = " || ===== REVIEWED ONAYI (Zeynep, " + GIT_DATE + ") ===== "
    + "drafted → reviewed, reviewedAt Git'ten. confidence: " + e.confidence
    + (r.newConfidence ? (" → " + r.newConfidence + " (QA: 大'nin rolü yorumlanıyor, kompozisyon değil; en zayıf halka B)") : " (değişmedi)")
    + ". summaryTr revize edilmedi. "
    + "|| MNEMONIC KARARI (OTOMATİK DEĞİL — Zeynep metodoloji düzeltmesi 2026-07-25): " + r.mnemQA;

  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error(ch + ": kayıt kaynakta bire bir bulunamadı");
  const next = Object.assign({}, rec, {
    etymology: Object.assign({}, e, {
      qaStatus: "reviewed",
      reviewedAt: GIT_DATE,
      confidence: finalConf,
      disagreementNote: e.disagreementNote + APPROVAL
    }),
    mnemonic: { status: "not_required" }
  });

  /* Güvenceler */
  if (next.etymology.qaStatus !== "reviewed") throw new Error(ch + ": reviewed olmalı");
  if (next.etymology.reviewedAt !== GIT_DATE) throw new Error(ch + ": reviewedAt git tarihi olmalı");
  if (next.etymology.summaryTr !== e.summaryTr) throw new Error(ch + ": summaryTr değişmemeli");
  if (next.etymology.formationType !== e.formationType) throw new Error(ch + ": formationType değişmemeli");
  if (JSON.stringify(next.etymology.sources) !== JSON.stringify(e.sources)) throw new Error(ch + ": sources değişmemeli");
  if (next.mnemonic.status !== "not_required") throw new Error(ch + ": mnemonic not_required olmalı");
  if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error(ch + ": components değişmemeli");
  if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error(ch + ": component_meanings değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");
  if (next.etymology.summaryTr === (next.memory_hint_tr || "")) throw new Error(ch + ": Kökeni ile Hafıza aynı olamaz");
  if (["A","B","C","D","X"].indexOf(next.etymology.confidence) < 0) throw new Error(ch + ": confidence geçersiz");

  src = src.replace(oldSub, JSON.stringify(next));
  done.push({ ch, id, conf: finalConf });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 7 REVIEWED · reviewedAt=" + GIT_DATE + " · KULLANICIYA AÇIK:");
for (const d of done) console.log("  " + d.ch + " (" + d.id + ") · confidence " + d.conf + " · mnemonic not_required");
