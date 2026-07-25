/* AUTHORING Parti 11 · 百 千 円 金 — REVIEWED ONAYI (Zeynep, 2026-07-25).
   Karar: 百=B, 千=B, 円=A, 金=A (drafted değerleriyle aynı → değişmez). Dördü reviewed.
   MNEMONIC: dördü de not_required — "burada active zorlamamak doğru" (Zeynep).

   TEK METİN REVİZYONU · 円: Zeynep "ayrı partiye ayrılmasın; yalnız summaryTr kısaltılsın" dedi.
   Gerekçe: "Sorun içeriğin yanlış olması değil; tek başına diğer kayıtların ritmini bozması."
   Korunması gereken üç bilgi: (1) açıklama eski biçim 圓 üzerinden yapılır · (2) 員 ses öğesidir ·
   (3) bugünkü 円 sadeleşmiş hâldir. Zeynep'in tercih ettiği (daha nötr) sürüm uygulandı — meta
   açıklama tek cümleye indi ve "エン okunuşu buradan gelişmiştir" iddiası KULLANILMADI (o ifade
   ev 形声 kalıbıyla birebir örtüşmüyordu).

   百/千 = B notu (Zeynep): "Aynı türde çatal paylaşmaları, bunları tek tek A yapmaktan daha dürüst.
   Ses öğesi rolü esas kaynakta açıkken 説文'un bunu belirtmemesi, görünür metni engellemez ama
   confidence'ı düşürür."

   DEĞİŞENLER: qaStatus drafted→reviewed · +reviewedAt (Git'ten) · mnemonic→not_required ·
   disagreementNote'a onay izi · SADECE 円'de summaryTr kısaltıldı.
   confidence/formationType/sources DEĞİŞMEZ. components/component_meanings/pictogram_note/
   memory_hint_tr DOKUNULMAZ. */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const INDEX = path.join(__dirname, "..", "index.html");

const GIT_DATE = cp.execSync("git log -1 --format=%cd --date=short", { cwd: ROOT }).toString().trim();
if (!/^\d{4}-\d{2}-\d{2}$/.test(GIT_DATE)) throw new Error("git tarihi okunamadı: " + GIT_DATE);

const EN_NEW_SUMMARY = "Bugünkü 円, eski biçimi 圓'dan gelir. 圓, dıştaki 囗 ile ses veren 員'dan oluşur; bugünkü biçim bunun sadeleşmiş hâlidir.";

const REVIEW = {
  "百": { expectConf: "B", newSummary: null, mnemNote:
    "not_required — 4-soru: köken temel anlama bağlı, tek okumada canlanıyor. ACTIVE DEĞERLENDİRİLDİ "
    + "ve REDDEDİLDİ: ölçüldü ki karışıklık ortağı 白 uygulamada VAR (T3 geçerdi), ama üretilen "
    + "kancaların hepsi ('白'ın üstüne bir çizgi' vb.) kökenin zaten söylediği bileşimi tekrarlıyor → "
    + "T1 / 4-soru#3 'yalnız tekrar' → reddedildi. Zayıf çağrışım yerine boş bırakmak doğru." },
  "千": { expectConf: "B", newSummary: null, mnemNote:
    "not_required — 4-soru: köken yeterli. ACTIVE REDDEDİLDİ: görsel karışıklık ortakları (干, 午) "
    + "uygulamada ÖLÇÜLDÜ ve YOK; doğrulanabilir bir öğrenme problemi kurulamıyor → T3 düşer." },
  "円": { expectConf: "A", newSummary: EN_NEW_SUMMARY, mnemNote:
    "not_required — 4-soru: kısaltılmış metin zaten eski biçim ilişkisini taşıyor. ACTIVE REDDEDİLDİ: "
    + "her aday ya tarihsel iddia olurdu (T2 — '圓'dan kısaldı' zaten Kökeni katmanında) ya da uydurma "
    + "görsel hikâye (visual_story → UI etiketi gerekir, etiket kodda yok → politika gereği yazılmaz)." },
  "金": { expectConf: "A", newSummary: null, mnemNote:
    "not_required — 4-soru: köken ('toprağın içindeki maden') çok somut ve anlama doğrudan bağlı; "
    + "ek çağrışım yalnız tekrar olurdu. Bileşen çelişkisi yok (八 bilinçli olarak adlandırılmadı, "
    + "分/半'deki 八='bölme' öğretisiyle çakışma engellendi)." }
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
  if (e.confidence !== r.expectConf) throw new Error(ch + ": beklenen confidence " + r.expectConf + ", gelen " + e.confidence);
  if (!rec.mnemonic || rec.mnemonic.status !== "pending_review") throw new Error(ch + ": mnemonic pending_review bekleniyor");

  const finalSummary = r.newSummary || e.summaryTr;
  const APPROVAL = " || ===== REVIEWED ONAYI (Zeynep, " + GIT_DATE + ") ===== "
    + "drafted → reviewed, reviewedAt Git'ten. confidence " + e.confidence + " (değişmedi). "
    + (r.newSummary
        ? ("summaryTr KISALTILDI (Zeynep kararı: '円 ayrı partiye ayrılmasın; yalnız summaryTr "
           + "kısaltılsın. Sorun içeriğin yanlış olması değil; tek başına diğer kayıtların ritmini "
           + "bozması.'). Korunan üç bilgi: (1) açıklama eski biçim 圓 üzerinden · (2) 員 ses öğesi · "
           + "(3) bugünkü biçim sadeleşmiş hâl. Meta açıklama tek cümleye indi. Zeynep'in iki "
           + "seçeneğinden DAHA NÖTR olanı seçildi; 'buradan エン okunuşu gelişmiştir' ifadesi ev "
           + "形声 kalıbıyla birebir örtüşmediği için KULLANILMADI. ESKİ METİN (drafted): \""
           + e.summaryTr + "\"")
        : "summaryTr revize edilmedi.")
    + " || MNEMONIC KARARI (4-soru, otomatik değil): " + r.mnemNote;

  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error(ch + ": kayıt kaynakta bire bir bulunamadı");
  const next = Object.assign({}, rec, {
    etymology: Object.assign({}, e, {
      qaStatus: "reviewed",
      reviewedAt: GIT_DATE,
      summaryTr: finalSummary,
      disagreementNote: e.disagreementNote + APPROVAL
    }),
    mnemonic: { status: "not_required" }
  });

  /* Güvenceler */
  if (next.etymology.qaStatus !== "reviewed") throw new Error(ch + ": reviewed olmalı");
  if (next.etymology.reviewedAt !== GIT_DATE) throw new Error(ch + ": reviewedAt git tarihi olmalı");
  if (next.etymology.confidence !== e.confidence) throw new Error(ch + ": confidence değişmemeli");
  if (next.etymology.formationType !== "形声") throw new Error(ch + ": formationType 形声 kalmalı");
  if (JSON.stringify(next.etymology.sources) !== JSON.stringify(e.sources)) throw new Error(ch + ": sources değişmemeli");
  if (next.mnemonic.status !== "not_required") throw new Error(ch + ": mnemonic not_required olmalı");
  if ("textTr" in next.mnemonic) throw new Error(ch + ": not_required'da textTr olmaz");
  if (!r.newSummary && next.etymology.summaryTr !== e.summaryTr) throw new Error(ch + ": summaryTr değişmemeliydi");
  if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error(ch + ": components değişmemeli");
  if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error(ch + ": component_meanings değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");
  if (next.etymology.summaryTr === (next.memory_hint_tr || "")) throw new Error(ch + ": Kökeni ile Hafıza aynı olamaz");
  /* Folk-etimoloji + sunum güvenceleri (drafted turundakiyle aynı, revizyon sonrası da geçerli) */
  if (ch === "百" && /beyaz/i.test(next.etymology.summaryTr)) throw new Error("百: 'beyaz' metne giremez");
  if (ch === "金" && /(altın|külçe)/i.test(next.etymology.summaryTr)) throw new Error("金: 'altın/külçe' metne giremez");
  if (ch === "円") {
    if (!/eski biçim/i.test(next.etymology.summaryTr)) throw new Error("円: metin eski biçim (圓) çerçevesini belirtmeli");
    if (!next.etymology.summaryTr.includes("圓")) throw new Error("円: metinde 圓 geçmeli");
    if (!/sadele/i.test(next.etymology.summaryTr)) throw new Error("円: bugünkü biçimin sadeleşmiş hâl olduğu belirtilmeli");
    if (!/ses veren|okunuş/i.test(next.etymology.summaryTr)) throw new Error("円: 員'in ses öğesi olduğu belirtilmeli");
    if (next.etymology.summaryTr.length >= e.summaryTr.length) throw new Error("円: yeni metin daha kısa olmalı");
  }

  src = src.replace(oldSub, JSON.stringify(next));
  done.push({ ch, id, conf: e.confidence, revised: !!r.newSummary, len: finalSummary.length });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 11 REVIEWED · reviewedAt=" + GIT_DATE + " · KULLANICIYA AÇIK:");
for (const d of done) console.log("  " + d.ch + " (" + d.id + ") · 形声 · confidence " + d.conf + " · mnemonic not_required" + (d.revised ? " · summaryTr KISALTILDI (" + d.len + " kr)" : ""));
