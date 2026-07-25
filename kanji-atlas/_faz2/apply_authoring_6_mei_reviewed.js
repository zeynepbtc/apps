/* AUTHORING Parti 6 · 名 — REVIEWED ONAYI (Zeynep, 2026-07-25).
   Onay: "Karar: confidence B olarak kalsın. Reviewed onaylı. Ana akım kaynaklar (özellikle
   Kanjipedia ve 説文) yeterince güçlü. QA'nın ortaya koyduğu azınlık görüşleri disagreementNote
   içinde kalsın; kullanıcı metnine taşınmasın. Summary metnini yalnız küçük bir editoryal akıcılık
   turundan geçirip reviewed aç. component_meanings şu aşamada değişmesin."

   DEĞİŞENLER (bu tur): qaStatus drafted → reviewed · + reviewedAt (Git'ten) ·
   summaryTr KÜÇÜK EDİTORYAL REVİZYON (Zeynep'in akıcılık edit'i) · disagreementNote'a onay izi.
   confidence B KALIR. formationType 会意, sources — dokunulmaz.
   component_meanings ({夕:akşam, 口:ağız}), mnemonic (not_required), memory_hint_tr,
   pictogram_note, components, related_characters — DOKUNULMAZ (Zeynep talimatı).

   reviewedAt uydurulmaz: repo'nun son commit tarihinden (git log -1 --date=short) türetilir.
   Etki: kokenOf() artık summaryTr döndürür → 名 Kökeni satırı kullanıcıya AÇILIR.
   Drafted süresince boş kalan satır (legacy "Karanlıkta (akşam) ağızla söylenen: isim." geri
   çekilmişti) bu commit'le yeni, düzeltilmiş metinle dolar. */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const INDEX = path.join(__dirname, "..", "index.html");

/* reviewedAt — Git'ten türetilir, elle yazılmaz */
const GIT_DATE = cp.execSync("git log -1 --format=%cd --date=short", { cwd: ROOT }).toString().trim();
if (!/^\d{4}-\d{2}-\d{2}$/.test(GIT_DATE)) throw new Error("git tarihi okunamadı: " + GIT_DATE);

/* Zeynep'in editoryal akıcılık revizyonu — "anlamı verir" → "gösterir", "kişilerin adını sesle" →
   "insanların adlarını ağızlarıyla". Ana omurga (口+夕 → karanlıkta ad söyleme → isim) aynı. */
const NEW_SUMMARY = "口 ağız, 夕 ise akşam karanlığını gösterir. Karanlıkta birbirini göremeyen insanların adlarını ağızlarıyla söylemesinden 'isim' anlamı gelişmiştir.";

let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === "名");
if (!id) throw new Error("名 bulunamadı");
const rec = DATA.chars[id];
const e = rec.etymology;
if (!e) throw new Error("名 etymology taşımıyor — önce drafted betiği koşmalı");
if (e.qaStatus !== "drafted") throw new Error("beklenen drafted, gelen: " + e.qaStatus);
if (e.confidence !== "B") throw new Error("beklenen confidence B, gelen: " + e.confidence);
if (e.reviewedAt) throw new Error("reviewedAt zaten var — bu betik iki kez koşmaz");
if (NEW_SUMMARY === rec.memory_hint_tr) throw new Error("yeni Kökeni ile Hafıza aynı olamaz");

const APPROVAL = " || ===== REVIEWED ONAYI (Zeynep, " + GIT_DATE + ") ===== "
  + "Kayıt drafted → reviewed yapıldı, reviewedAt Git commit tarihinden türetildi. confidence B KALDI. "
  + "|| Zeynep'in gerekçesi: \"Ana akım kaynaklar (özellikle Kanjipedia ve 説文) yeterince güçlü. "
  + "A vermem çünkü alternatif okuma gerçekten var; C vermem çünkü ana akım çok baskın. B en dengeli "
  + "seviye. Bu kayıt 九 ile aynı durumda değil: 九'da temel şeklin ne olduğu tartışmalıydı; burada "
  + "ana omurga sağlam (口+夕 → karanlıkta adını söylemek → isim), kullanıcıdan gizlemeye gerek yok.\" "
  + "|| AZINLIK GÖRÜŞLERİ (Shirakawa サイ, OKJiten 夕) disagreementNote'ta KALIR, kullanıcı metnine "
  + "TAŞINMAZ (politika: düz yaz ya da boş bırak). "
  + "|| summaryTr KÜÇÜK EDİTORYAL REVİZYONDAN GEÇTİ (Zeynep akıcılık edit'i): "
  + "\"anlamı verir\" → \"gösterir\"; \"kişilerin adını sesle söylemesinden\" → \"insanların adlarını "
  + "ağızlarıyla söylemesinden\". Kaynak iddiası (Kanjipedia 会意) değişmedi, yalnız Türkçe akıcılık. "
  + "|| component_meanings ({夕:akşam, 口:ağız}) BİLEREK DOKUNULMADI: ileride 口 bileşenleri için "
  + "toplu editoryal uyumlama yapılırsa birlikte ele alınacak (Zeynep talimatı).";

const oldSub = JSON.stringify(rec);
if (!src.includes(oldSub)) throw new Error("kayıt kaynakta bire bir bulunamadı");
const next = Object.assign({}, rec, {
  etymology: Object.assign({}, e, {
    qaStatus: "reviewed",
    reviewedAt: GIT_DATE,
    summaryTr: NEW_SUMMARY,
    disagreementNote: e.disagreementNote + APPROVAL
  })
});

/* Sert güvenceler — yalnız qaStatus/reviewedAt/summaryTr/disagreementNote değişmeli */
if (next.etymology.qaStatus !== "reviewed") throw new Error("qaStatus reviewed olmalı");
if (next.etymology.reviewedAt !== GIT_DATE) throw new Error("reviewedAt git tarihi olmalı");
if (next.etymology.summaryTr !== NEW_SUMMARY) throw new Error("summaryTr yeni metin olmalı");
if (next.etymology.confidence !== "B") throw new Error("confidence B kalmalı");
if (next.etymology.formationType !== e.formationType) throw new Error("formationType değişmemeli");
if (JSON.stringify(next.etymology.sources) !== JSON.stringify(e.sources)) throw new Error("sources değişmemeli");
if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error("component_meanings DOKUNULMAZ");
if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error("components değişmemeli");
if (next.mnemonic.status !== rec.mnemonic.status) throw new Error("mnemonic değişmemeli");
if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error("memory_hint_tr değişmemeli");
if (next.pictogram_note !== rec.pictogram_note) throw new Error("pictogram_note SİLİNMEZ, değişmemeli");
if (JSON.stringify(next.related_characters) !== JSON.stringify(rec.related_characters)) throw new Error("related_characters değişmemeli");
if (next.memory_hint_tr === next.etymology.summaryTr) throw new Error("Kökeni ile Hafıza aynı olamaz (katman çökmesi)");

src = src.replace(oldSub, JSON.stringify(next));
fs.writeFileSync(INDEX, src);
console.log("名 (" + id + ") → qaStatus=reviewed · reviewedAt=" + GIT_DATE + " (Git'ten) · confidence B · KULLANICIYA AÇIK");
console.log("Kökeni : " + next.etymology.summaryTr);
console.log("Hafıza : " + next.memory_hint_tr + "   (ayrı katman, tekrar yok)");
console.log("component_meanings (dokunulmadı): " + JSON.stringify(next.component_meanings));
console.log("disagreementNote: " + e.disagreementNote.length + " → " + next.etymology.disagreementNote.length + " karakter");
