/* AUTHORING Parti 9 · 書 先 食 外 — REVIEWED ONAYI (Zeynep, 2026-07-25).
   Karar: confidence 書=A, 先=A, 食=B, 外=A (drafted değerleriyle aynı → değişmez). Dördü reviewed.
   MNEMONIC: dördü de not_required. 書 için active DENENDİ ve REDDEDİLDİ — yeni deneme YAPILMAZ.
   Zeynep: "Bu karar mnemonic sisteminin başarısızlığı değil, kalite standardının çalışmasıdır.
   active kullanmaya başlamış olmak, her partide active üretmek zorunda olmak demek değildir.
   土 ve 行 gerçekten ihtiyaç duyuyordu; bu dört kayıt için zorlamamak daha iyi editörlük."

   食 = B gerekçesi (Zeynep): "Esas kaynak net olsa da çapraz kaynağın farklı bir yapı okuması
   sunması, görünür metni engellemez fakat A'yı gereksiz iddialı kılar."

   DEĞİŞENLER: qaStatus drafted→reviewed · +reviewedAt (Git'ten) · mnemonic pending_review→not_required
   · disagreementNote'a onay izi. summaryTr/confidence/formationType/sources DEĞİŞMEZ.
   components/component_meanings/pictogram_note/memory_hint_tr DOKUNULMAZ. */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const INDEX = path.join(__dirname, "..", "index.html");

const GIT_DATE = cp.execSync("git log -1 --format=%cd --date=short", { cwd: ROOT }).toString().trim();
if (!/^\d{4}-\d{2}-\d{2}$/.test(GIT_DATE)) throw new Error("git tarihi okunamadı: " + GIT_DATE);

const REVIEW = {
  "書": { mnemNote:
    "not_required — 4-soru: köken temel anlama bağlı (fırça→yazmak), tek okumada canlanıyor. "
    + "ACTIVE CİDDİ DÜŞÜNÜLDÜ ve REDDEDİLDİ: 形声 kayıtlarda ses bileşeni hafıza için anlamsız olduğundan "
    + "köken hafızayı 会意/象形'e göre daha zayıf taşır. Üç aday da 4 kalite testinden düştü — "
    + "(a) 'Fırçanın izi yukarıda, sayfa aşağıda' → T1 köken tekrarı; (b) 'Alttaki parça 者'nin kısalmış hâli' "
    + "→ T2 tarihsel iddia (Kökeni katmanına ait); (c) 'Ustteki fırçayla 昼'den ayır' → T3 gerçek olmayan "
    + "karışıklık (昼 N5 setinde yok). Zayıf çağrışım üretmektense boş bırakmak doğru (Zeynep onayı: "
    + "'書 için yeni mnemonic denemesi yapma')." },
  "先": { mnemNote:
    "not_required — 4-soru: ayak izi + insan imgesi doğrudan görsel; 'önde olma' anlamını tek okumada "
    + "taşıyor. Ayrı mnemonic tekrar olurdu. Bileşen çelişkisi yok." },
  "食": { mnemNote:
    "not_required — 4-soru: kapaklı yemek kabı çok somut bir imge, köken tek başına yeterli. "
    + "NOT: confidence B (説文 oluşum çatalı) bir ETİMOLOJİ kararıdır, mnemonic ihtiyacını etkilemez." },
  "外": { mnemNote:
    "not_required — 4-soru: 'normalde gündüz yapılması gerekeni akşam yapmak' TUHAF olduğu için zaten "
    + "akılda kalıyor; köken kendisi kanca işlevi görüyor. Ayrı çağrışım şişirme olurdu." }
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
    + "|| MNEMONIC KARARI (4-soru, otomatik değil): " + r.mnemNote;

  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error(ch + ": kayıt kaynakta bire bir bulunamadı");
  const next = Object.assign({}, rec, {
    etymology: Object.assign({}, e, { qaStatus: "reviewed", reviewedAt: GIT_DATE, disagreementNote: e.disagreementNote + APPROVAL }),
    mnemonic: { status: "not_required" }
  });

  /* Güvenceler */
  if (next.etymology.qaStatus !== "reviewed") throw new Error(ch + ": reviewed olmalı");
  if (next.etymology.reviewedAt !== GIT_DATE) throw new Error(ch + ": reviewedAt git tarihi olmalı");
  if (next.etymology.summaryTr !== e.summaryTr) throw new Error(ch + ": summaryTr değişmemeli");
  if (next.etymology.confidence !== e.confidence) throw new Error(ch + ": confidence değişmemeli");
  if (next.etymology.formationType !== e.formationType) throw new Error(ch + ": formationType değişmemeli");
  if (JSON.stringify(next.etymology.sources) !== JSON.stringify(e.sources)) throw new Error(ch + ": sources değişmemeli");
  if (next.mnemonic.status !== "not_required") throw new Error(ch + ": mnemonic not_required olmalı");
  if ("textTr" in next.mnemonic) throw new Error(ch + ": not_required'da textTr olmaz");
  if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error(ch + ": components değişmemeli");
  if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error(ch + ": component_meanings değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");

  src = src.replace(oldSub, JSON.stringify(next));
  done.push({ ch, id, conf: e.confidence, type: e.formationType });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 9 REVIEWED · reviewedAt=" + GIT_DATE + " · KULLANICIYA AÇIK:");
for (const d of done) console.log("  " + d.ch + " (" + d.id + ") · " + d.type + " · confidence " + d.conf + " · mnemonic not_required");
