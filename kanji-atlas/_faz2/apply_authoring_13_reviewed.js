/* AUTHORING Parti 13 · 年 気 前 後 — REVIEWED ONAYI (Zeynep, 2026-07-25).
   Karar: 年=A, 気=A, 前=B, 後=B (drafted değerleriyle aynı → değişmez). Dördü reviewed.
   MNEMONIC: dördü de not_required — "気 için kökenin bugünkü anlamı tam taşımaması, otomatik
   olarak active mnemonic gerektirmez. Kaynaksız bir görsel hikâye üretmek daha büyük sorun olur."

   ÖN KOŞUL: metadata düzeltmesi (`fix_parti13_notes.js`, commit `d483cec`) ZATEN uygulandı —
   年 ve 前'in disagreementNote'undan anlaşmazlık-olmayan içerik çıkarıldı, 後'deki gerçek
   mekanizma çatalı kaldı.

   İKİ METİN KISALTILDI (Zeynep metinleri, ritim gerekçesi — korpus ort. 122 / medyan 116):
     年 188 → yeni · 気 216 (korpusun en uzunuydu) → yeni.
   前 ve 後 metinleri OLDUĞU GİBİ kalır.

   ⚠️ ÜSLUP GÖZLEMİ (aksiyon önerilmiyor, uyumlama listesine): Zeynep'in kısa sürümleri 形声
   bileşen dilini sıkıştırıyor — "anlamıyla değil, okunuşuyla katkı yapar ve [ses] sesini verir"
   yerine "[ses] sesini veren [bileşen]". Ses bileşenine YANLIŞ ANLAM verilmediği için kilitli
   kuralın amacı korunuyor (Zeynep: "'okunuşuyla katkı yapıp' ifadesi burada gereksiz; '[ses]
   sesini veren' zaten aynı işi daha kısa yapıyor"). Bu sıkıştırılmış biçim yalnız "eski biçimi …
   -den oluşur" cümle çerçevesinde kullanılıyor (年, 気); klasik çerçeve (時/晴/聞/書/百/千/金/前)
   tam kalıbı sürdürüyor. İki farklı 形声 ifadesi doğuyor → uyumlama turunda gözden geçirilebilir.

   DEĞİŞENLER: qaStatus drafted→reviewed · +reviewedAt (Git'ten) · mnemonic→not_required ·
   年/気'de summaryTr KISALTILDI · disagreementNote'a onay izi.
   confidence/formationType/sources DEĞİŞMEZ. components/component_meanings/pictogram_note/
   memory_hint_tr DOKUNULMAZ. */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const INDEX = path.join(__dirname, "..", "index.html");

const GIT_DATE = cp.execSync("git log -1 --format=%cd --date=short", { cwd: ROOT }).toString().trim();
if (!/^\d{4}-\d{2}-\d{2}$/.test(GIT_DATE)) throw new Error("git tarihi okunamadı: " + GIT_DATE);

const NEN_NEW = "年'in eski biçimi, tahılı gösteren 禾 ile ネン sesini veren 千'den oluşur. Tahılın bir kez olgunlaşmasından 'yıl' anlamı gelişmiş; bugünkü 年 bu biçimin değişmiş hâlidir.";
const KI_NEW  = "Bugünkü 気, eski biçimi 氣'nin sadeleşmiş yazımıdır. 氣, pirinci gösteren 米 ile キ sesini veren 气'den oluşur; önce 'yiyecek vermek', sonra 'hava, soluk' anlamında kullanılmıştır.";

const REVIEW = {
  "年": { expectConf: "A", newSummary: NEN_NEW, mnemNote:
    "not_required — 4-soru: köken (tahılın olgunlaşma dönemi → yıl) temel anlama doğrudan bağlanıyor "
    + "ve tek okumada canlanıyor. Karışıklık ortakları (午, 半 dışında) uygulamada YOK (ölçüldü) → "
    + "biçim kancası için T3 düşer. Ayrı mnemonic yalnız tekrar olurdu." },
  "気": { expectConf: "A", newSummary: KI_NEW, mnemNote:
    "not_required — 4-soru: köken zinciri (pirinç → yiyecek vermek → hava) bugünkü anlama DOLAYLI "
    + "bağlanıyor, yani köken hafızayı tam taşımıyor. Zeynep kararı: **bu otomatik olarak active "
    + "gerektirmez** — 'kaynaksız bir görsel hikâye üretmek daha büyük sorun olur.' Bağlayacak her "
    + "aday ya tarihsel iddia (T2) ya etiketsiz visual_story olurdu → not_required. "
    + "(Ödünç kayıtlarındaki yapısal gözlemle aynı sınıf.)" },
  "前": { expectConf: "B", newSummary: null, mnemNote:
    "not_required — 4-soru: 'bıçakla düzgün kesmek → ilerlemek → ön' zinciri kaynaktan geliyor ve "
    + "görünür metinde zaten açık. Karışıklık ortakları (刀, 止, 舟) uygulamada YOK → T3 düşer." },
  "後": { expectConf: "B", newSummary: null, mnemNote:
    "not_required — 4-soru: köken anlamı ÇOK İYİ taşıyor — 'ayakları bağlı → ileri gidemez → geride' "
    + "somut, görsel ve doğrudan. Üç bileşen de bugünkü biçimde görünür. Ayrı mnemonic tekrar olurdu." }
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
  if (e.confidence !== r.expectConf) throw new Error(ch + ": beklenen confidence " + r.expectConf);
  if (!rec.mnemonic || rec.mnemonic.status !== "pending_review") throw new Error(ch + ": mnemonic pending_review bekleniyor");
  /* metadata düzeltmesinin uygulanmış olduğunu doğrula */
  if (ch === "年" && /甲骨|金文|背負/.test(e.disagreementNote)) throw new Error("年: metadata düzeltmesi uygulanmamış — önce fix_parti13_notes.js");
  if (ch === "前" && /未収録|不行而進|从止在舟上/.test(e.disagreementNote)) throw new Error("前: metadata düzeltmesi uygulanmamış");
  if (ch === "後" && !/MEKANİZMA ÇATALI/.test(e.disagreementNote)) throw new Error("後: gerçek mekanizma çatalı notta kalmalıydı");

  const finalSummary = r.newSummary || e.summaryTr;
  const APPROVAL = " || ===== REVIEWED ONAYI (Zeynep, " + GIT_DATE + ") ===== "
    + "drafted → reviewed, reviewedAt Git'ten. confidence " + e.confidence + " (değişmedi). "
    + (r.newSummary
        ? ("summaryTr KISALTILDI (ritim — korpus ort. 122 / medyan 116 kr). ESKİ METİN: \""
           + e.summaryTr + "\" (" + e.summaryTr.length + " kr) → YENİ: " + finalSummary.length + " kr. "
           + "Taşınan bilgilerin hiçbiri kaybolmadı: eski biçim ilişkisi, bileşen rolleri ve anlam "
           + "gelişimi korundu. ")
        : "summaryTr revize edilmedi. ")
    + "|| MNEMONIC KARARI (4-soru, otomatik değil): " + r.mnemNote;

  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error(ch + ": kayıt kaynakta bire bir bulunamadı");
  const next = Object.assign({}, rec, {
    etymology: Object.assign({}, e, {
      qaStatus: "reviewed", reviewedAt: GIT_DATE,
      summaryTr: finalSummary,
      disagreementNote: e.disagreementNote + APPROVAL
    }),
    mnemonic: { status: "not_required" }
  });

  /* Güvenceler */
  if (next.etymology.qaStatus !== "reviewed") throw new Error(ch + ": reviewed olmalı");
  if (next.etymology.reviewedAt !== GIT_DATE) throw new Error(ch + ": reviewedAt git tarihi olmalı");
  if (next.etymology.confidence !== e.confidence) throw new Error(ch + ": confidence değişmemeli");
  if (next.etymology.formationType !== e.formationType) throw new Error(ch + ": formationType değişmemeli");
  if (JSON.stringify(next.etymology.sources) !== JSON.stringify(e.sources)) throw new Error(ch + ": sources değişmemeli");
  if (next.mnemonic.status !== "not_required") throw new Error(ch + ": mnemonic not_required olmalı");
  if ("textTr" in next.mnemonic) throw new Error(ch + ": not_required'da textTr olmaz");
  if (!r.newSummary && next.etymology.summaryTr !== e.summaryTr) throw new Error(ch + ": summaryTr değişmemeliydi");
  if (r.newSummary && next.etymology.summaryTr.length >= e.summaryTr.length) throw new Error(ch + ": yeni metin daha kısa olmalı");
  if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error(ch + ": components değişmemeli");
  if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error(ch + ": component_meanings değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");
  /* Dört uyarı güvencesi revizyon sonrası da geçerli */
  if (ch === "年") {
    if (/(sırt|insan|kişi)/i.test(next.etymology.summaryTr)) throw new Error("年: UYARI 1 — erken yazı katmanı metne giremez");
    if (!/eski biçim/i.test(next.etymology.summaryTr)) throw new Error("年: 'eski biçim' çerçevesi zorunlu");
    if (/sadeleş/i.test(next.etymology.summaryTr)) throw new Error("年: kaynak 変わった形 diyor → 'değişmiş' kullanılmalı");
    if (!/değişmiş/i.test(next.etymology.summaryTr)) throw new Error("年: 'değişmiş hâli' ibaresi korunmalı");
  }
  if (ch === "気") {
    if (!/eski biçim/i.test(next.etymology.summaryTr)) throw new Error("気: UYARI 2 — 米 yalnız eski biçim çerçevesinde");
    if (!/sadeleşmiş/i.test(next.etymology.summaryTr)) throw new Error("気: kilitli terim 'sadeleşmiş'");
    if (next.etymology.summaryTr.indexOf("氣") < 0) throw new Error("気: eski biçim 氣 anılmalı");
  }
  if (ch === "前" && /(tekne|kayık|ayağ|ayak)/i.test(next.etymology.summaryTr)) throw new Error("前: UYARI 3 — ayak/tekne metne giremez");
  if (ch === "後" && /(iki kişi|küçük)/i.test(next.etymology.summaryTr)) throw new Error("後: UYARI 4 ihlali");

  src = src.replace(oldSub, JSON.stringify(next));
  done.push({ ch, id, conf: e.confidence, revised: !!r.newSummary, before: e.summaryTr.length, after: finalSummary.length });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 13 REVIEWED · reviewedAt=" + GIT_DATE + " · KULLANICIYA AÇIK:");
for (const d of done) console.log("  " + d.ch + " (" + d.id + ") · confidence " + d.conf + " · mnemonic not_required"
  + (d.revised ? (" · summaryTr KISALTILDI " + d.before + " → " + d.after + " kr") : (" · summaryTr " + d.after + " kr")));
