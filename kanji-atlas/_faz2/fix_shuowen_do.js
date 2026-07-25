/* DÜZELTME · 土 — 説文解字 alıntısı birebir değildi (2026-07-25).
   Tespit: Parti 7/8'de çapraz kaynak (説文解字) alıntıları FETCH EDİLMEDEN, bellekten yazılmıştı.
   Geriye dönük doğrulama (漢典/zdic üzerinden, 2026-07-25) tüm 説文 taşıyan kayıtlara uygulandı:
     口 ✓ · 九 ✓ · 母 ✓ · 生 ✓ · 名 ✓ · 行 ✓  → doğru
     土 ✗ → metinde OLMAYAN 萬 eklenmiş, metinde OLAN 丨 atlanmış.
   (分 半 友 赤'ın 説文 alıntıları yalnız QA raporunda; veri kaydında yok → veri düzeyinde etkilenmedi.)

   Gerçek 説文解字 (漢典): 「地之吐生物者也。二象地之下、地之中，丨，物出形也。凡土之屬皆从土。」
   Yazılmış olan (hatalı):  「土、地之吐生萬物者也。二象地之下、地之中。物出形也。」

   Bu bir İZLENEBİLİRLİK düzeltmesidir (AUTHORING-03: "Kaynak ne diyor ≠ benim çıkarımım").
   KULLANICIYA GÖRÜNEN HİÇBİR ŞEY DEĞİŞMEZ: yalnız etymology.disagreementNote (editör metadata).
   summaryTr, confidence (B), formationType, sources, qaStatus, reviewedAt, mnemonic — DOKUNULMAZ.
   土'nun confidence'ı zaten B'ydi ve gerekçesi (nesne çatalı) değişmiyor — düzeltme kararı etkilemiyor. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);

const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === "土");
if (!id) throw new Error("土 bulunamadı");
const rec = DATA.chars[id];
const e = rec.etymology;
if (!e) throw new Error("土 etymology taşımıyor");
if (e.qaStatus !== "reviewed") throw new Error("土 reviewed olmalı, gelen: " + e.qaStatus);

const WRONG = "「土、地之吐生萬物者也。二象地之下、地之中。物出形也。」";
const RIGHT = "「土、地之吐生物者也。二象地之下、地之中，丨，物出形也。」";
if (!e.disagreementNote.includes(WRONG)) throw new Error("hatalı alıntı bulunamadı — betik zaten koşmuş olabilir");
if (e.disagreementNote.includes("SÖZLÜK ALINTISI DÜZELTMESİ")) throw new Error("düzeltme zaten uygulanmış — iki kez koşmaz");

const NOTE = " || ===== SÖZLÜK ALINTISI DÜZELTMESİ (2026-07-25) ===== "
  + "Bu kayıttaki 説文解字 alıntısı ilk yazımda FETCH EDİLMEDEN bellekten aktarılmıştı ve birebir "
  + "değildi: metinde olmayan 萬 eklenmiş, metinde olan 丨 atlanmıştı. 漢典 üzerinden doğrulanıp "
  + "düzeltildi. Doğru metin: 「地之吐生物者也。二象地之下、地之中，丨，物出形也。凡土之屬皆从土。」 "
  + "(Kayıtta ev üslubuna uygun olarak lemma öneki 「土、…」 ile ve kısaltılmış biçimde tutulur.) "
  + "|| ETKİ: yalnız denetim izi. Kullanıcıya görünen metin (summaryTr), confidence (B) ve gerekçesi "
  + "(resmedilen nesne çatalı: Kanjipedia yığın/sunak · 説文 katman · Shirakawa direk) DEĞİŞMEDİ — "
  + "説文'ın 土'yu bir yığın değil katman/çıkış diyagramı olarak okuduğu tespiti doğruydu, yalnız "
  + "alıntının harfi yanlıştı. "
  + "|| KAPSAM: aynı geriye dönük doğrulama 説文 alıntısı taşıyan tüm kayıtlara uygulandı — "
  + "口 · 九 · 母 · 生 · 名 · 行 doğru çıktı; yalnız 土 hatalıydı.";

const oldSub = JSON.stringify(rec);
if (!src.includes(oldSub)) throw new Error("kayıt kaynakta bire bir bulunamadı");
const next = Object.assign({}, rec, {
  etymology: Object.assign({}, e, {
    disagreementNote: e.disagreementNote.replace(WRONG, RIGHT) + NOTE
  })
});

/* Güvenceler — SADECE disagreementNote değişmeli */
if (next.etymology.summaryTr !== e.summaryTr) throw new Error("summaryTr DEĞİŞMEMELİ");
if (next.etymology.confidence !== e.confidence) throw new Error("confidence DEĞİŞMEMELİ");
if (next.etymology.qaStatus !== e.qaStatus) throw new Error("qaStatus DEĞİŞMEMELİ");
if (next.etymology.reviewedAt !== e.reviewedAt) throw new Error("reviewedAt DEĞİŞMEMELİ");
if (next.etymology.formationType !== e.formationType) throw new Error("formationType DEĞİŞMEMELİ");
if (JSON.stringify(next.etymology.sources) !== JSON.stringify(e.sources)) throw new Error("sources DEĞİŞMEMELİ");
if (JSON.stringify(next.mnemonic) !== JSON.stringify(rec.mnemonic)) throw new Error("mnemonic DEĞİŞMEMELİ");
if (next.pictogram_note !== rec.pictogram_note) throw new Error("pictogram_note DEĞİŞMEMELİ");
if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error("memory_hint_tr DEĞİŞMEMELİ");
if (next.etymology.disagreementNote.includes("萬物者也")) throw new Error("hatalı alıntı hâlâ duruyor");

src = src.replace(oldSub, JSON.stringify(next));
fs.writeFileSync(INDEX, src);
console.log("土 説文 alıntısı DÜZELTİLDİ (yalnız disagreementNote).");
console.log("  önce: " + WRONG);
console.log("  sonra: " + RIGHT);
console.log("  disagreementNote: " + e.disagreementNote.length + " → " + next.etymology.disagreementNote.length + " karakter");
console.log("  summaryTr/confidence/qaStatus/reviewedAt/mnemonic: DEĞİŞMEDİ");
