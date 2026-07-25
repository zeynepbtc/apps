/* 九 · NİHAİ KARAR (Zeynep, 2026-07-25) — kayıt DRAFTED'DA KALIR, confidence B → C.
   Karar metni: "drafted'da kalsın, reviewed yapılmasın. Confidence C olsun; summaryTr kullanıcıya
   açılmasın, bütün bulgular disagreementNote içinde korunsun. Şekil iddiasını çıkarıp yarım bir
   metin yayınlamak yerine şimdilik boş bırakmayı tercih ediyorum."

   Bu betiğin DEĞİŞTİRDİĞİ tek alanlar: confidence (B→C) ve disagreementNote (karar eklenir).
   DOKUNULMAYANLAR: qaStatus (drafted kalır), summaryTr (metin yerinde durur — silinmez),
   formationType, formationTypeSource, sources, reviewedAt (verilmez).

   Kullanıcıya hiçbir şey gitmez: kokenOf() qaStatus "drafted" iken null döner (editoryal kapı).
   Yani "kullanıcıya boş" hedefi zaten sağlanıyor; metni silmeye gerek yok, karar geri alınabilir. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === "九");
if (!id) throw new Error("九 bulunamadı");
const rec = DATA.chars[id];
const e = rec.etymology;
if (!e) throw new Error("etymology yok");
if (e.qaStatus !== "drafted") throw new Error("beklenen drafted, gelen: " + e.qaStatus);
if (e.confidence !== "B") throw new Error("beklenen confidence B, gelen: " + e.confidence);

const DECISION = ' || ===== NİHAİ KARAR (Zeynep, 2026-07-25) ===== '
  + 'Kayıt DRAFTED\'da bırakıldı, reviewed VERİLMEDİ, reviewedAt VERİLMEDİ. '
  + 'confidence B → C düşürüldü: QA turu alt iddia bazında (a) A, (b) B, (c) C verdi; kayıt tek blok '
  + 'olduğu için en zayıf halka belirler. '
  + '|| Zeynep\'in gerekçesi: "Şekil iddiasını çıkarıp yarım bir metin yayınlamak yerine şimdilik boş '
  + 'bırakmayı tercih ediyorum." Yani QA raporundaki seçenek (2) — kısaltılmış A/B metni — REDDEDİLDİ; '
  + 'seçenek (3) — drafted\'da bekletme — seçildi. '
  + '|| summaryTr alanı SİLİNMEDİ, olduğu gibi duruyor; drafted kapısı nedeniyle kullanıcıya '
  + 'zaten görünmüyor (kokenOf() null döner). Karar geri alınabilir: metin hazır bekliyor, '
  + 'açılmak istenirse tek yapılacak qaStatus → reviewed + reviewedAt vermektir — ki bu da '
  + 'şekil iddiasındaki C\'yi kabullenmek anlamına gelir. '
  + '|| formationType 象形 + formationTypeSource korundu; bunlar Kanjipedia\'nın sınıflandırmasını '
  + 'kaydeden editör metadata\'sıdır, tartışmalı olan şeklin NE olduğudur.';

const oldSub = JSON.stringify(rec);
if (!src.includes(oldSub)) throw new Error("kaynakta bulunamadı");
const next = Object.assign({}, rec, {
  etymology: Object.assign({}, e, {
    confidence: "C",
    disagreementNote: e.disagreementNote + DECISION
  })
});
// Sert güvenceler — yalnız iki alan değişmiş olmalı
if (next.etymology.qaStatus !== "drafted") throw new Error("qaStatus drafted kalmalı");
if (next.etymology.summaryTr !== e.summaryTr) throw new Error("summaryTr değişmemeli");
if (next.etymology.reviewedAt) throw new Error("reviewedAt olamaz");
if (next.etymology.formationType !== e.formationType) throw new Error("formationType değişmemeli");
if (next.etymology.sources.length !== 3) throw new Error("sources korunmalı");
if (next.etymology.confidence !== "C") throw new Error("confidence C olmalı");
src = src.replace(oldSub, JSON.stringify(next));
fs.writeFileSync(INDEX, src);
console.log("九 → drafted (değişmedi) · confidence C · summaryTr yerinde (" + e.summaryTr.length + " kr) · reviewedAt YOK.");
console.log("disagreementNote: " + e.disagreementNote.length + " → " + next.etymology.disagreementNote.length + " karakter.");
