/* AUTHORING Parti 5 · 口 — REVIEWED ONAYI (Zeynep, 2026-07-25).
   Onay metni: "口 reviewed onaylı. qaStatus: reviewed ve Git'ten türetilmiş reviewedAt ile
   kullanıcıya yeniden aç. Legacy metni geri getirmeyelim; yeni 'Bir ağzın resmidir.' metni
   daha temiz ve confidence A ile uyumlu."

   DEĞİŞEN tek şey: qaStatus drafted → reviewed, + reviewedAt eklenir.
   summaryTr AYNEN KALIR (revizyon istenmedi — metin QA'dan olduğu gibi geçti).
   confidence A, formationType 象形, sources, disagreementNote — dokunulmaz.
   mnemonic (not_required), memory_hint_tr, pictogram_note, components, related_characters — dokunulmaz.

   reviewedAt uydurulmaz: repo'nun son commit tarihinden (git log -1 --date=short) türetilir.
   Etki: kokenOf() artık summaryTr döndürür → 口 Kökeni satırı kullanıcıya AÇILIR.
   Drafted süresince boş kalan satır ("Açık bir ağzın kare çerçevesi." geri çekilmişti) bu commit'le
   yeni metinle dolar; legacy pictogram_note kayıtta durur ama artık okunmaz. */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const INDEX = path.join(__dirname, "..", "index.html");

/* reviewedAt — Git'ten türetilir, elle yazılmaz */
const GIT_DATE = cp.execSync("git log -1 --format=%cd --date=short", { cwd: ROOT }).toString().trim();
if (!/^\d{4}-\d{2}-\d{2}$/.test(GIT_DATE)) throw new Error("git tarihi okunamadı: " + GIT_DATE);

let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === "口");
if (!id) throw new Error("口 bulunamadı");
const rec = DATA.chars[id];
const e = rec.etymology;
if (!e) throw new Error("口 etymology taşımıyor — önce drafted betiği koşmalı");
if (e.qaStatus !== "drafted") throw new Error("beklenen drafted, gelen: " + e.qaStatus);
if (e.confidence !== "A") throw new Error("beklenen confidence A, gelen: " + e.confidence);
if (e.reviewedAt) throw new Error("reviewedAt zaten var — bu betik iki kez koşmaz");

const APPROVAL = " || ===== REVIEWED ONAYI (Zeynep, " + GIT_DATE + ") ===== "
  + "Kayıt drafted → reviewed yapıldı, reviewedAt Git commit tarihinden türetildi. "
  + "summaryTr REVİZE EDİLMEDİ: QA turu metinde düzeltilecek bir şey bulmadı, üç kaynak da "
  + "aynı tek iddiayı veriyor. "
  + "|| Zeynep'in kararı: \"Legacy metni geri getirmeyelim; yeni 'Bir ağzın resmidir.' metni daha "
  + "temiz ve confidence A ile uyumlu.\" Yani eski pictogram_note (\"Açık bir ağzın kare çerçevesi.\") "
  + "bilerek geri getirilmedi — kayıtta duruyor ama kokenOf() artık summaryTr döndürdüğü için "
  + "okunmuyor. Görsel okuma Hafıza katmanında yaşamaya devam ediyor "
  + "(memory_hint_tr: \"Açık bir ağzı andıran kare.\") → üç katman ayrı, tekrar yok. "
  + "|| B0 DERSİ (kalıcı kural olarak kabul edildi): 口 boş değil LEGACY bir kayıttı; drafted "
  + "penceresinde Kökeni satırı kullanıcıya boş göründü. Bundan sonra her partiden önce hedef "
  + "kayıtların legacy mi boş mu olduğu ÖLÇÜLÜR; legacy olanlar drafted'da uzun bekletilmez. "
  + "|| YUKARIDAKİ サイ UYARISI GEÇERLİLİĞİNİ KORUR: bu onay yalnız TEK BAŞINA 口 karakteri "
  + "içindir. Bileşik kanjilerde 口 biçimli parçanın \"ağız\" olduğu hâlâ otomatik varsayılamaz. "
  + "Sıradaki iş bu ayrımı kaynak bazında çözmek üzere 名'in tek kayıt tartışmalı QA turudur.";

const oldSub = JSON.stringify(rec);
if (!src.includes(oldSub)) throw new Error("kayıt kaynakta bire bir bulunamadı");
const next = Object.assign({}, rec, {
  etymology: Object.assign({}, e, {
    qaStatus: "reviewed",
    reviewedAt: GIT_DATE,
    disagreementNote: e.disagreementNote + APPROVAL
  })
});

/* Sert güvenceler — yalnız qaStatus/reviewedAt/disagreementNote değişmeli */
if (next.etymology.qaStatus !== "reviewed") throw new Error("qaStatus reviewed olmalı");
if (next.etymology.reviewedAt !== GIT_DATE) throw new Error("reviewedAt git tarihi olmalı");
if (next.etymology.summaryTr !== e.summaryTr) throw new Error("summaryTr DEĞİŞMEMELİ");
if (next.etymology.confidence !== "A") throw new Error("confidence A kalmalı");
if (next.etymology.formationType !== e.formationType) throw new Error("formationType değişmemeli");
if (JSON.stringify(next.etymology.sources) !== JSON.stringify(e.sources)) throw new Error("sources değişmemeli");
if (next.mnemonic.status !== rec.mnemonic.status) throw new Error("mnemonic değişmemeli");
if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error("memory_hint_tr değişmemeli");
if (next.pictogram_note !== rec.pictogram_note) throw new Error("pictogram_note SİLİNMEZ, değişmemeli");
if (JSON.stringify(next.related_characters) !== JSON.stringify(rec.related_characters)) throw new Error("related_characters değişmemeli");
if (next.memory_hint_tr === next.etymology.summaryTr) throw new Error("Kökeni ile Hafıza aynı olamaz (katman çökmesi)");

src = src.replace(oldSub, JSON.stringify(next));
fs.writeFileSync(INDEX, src);
console.log("口 (" + id + ") → qaStatus=reviewed · reviewedAt=" + GIT_DATE + " (Git'ten) · confidence A · KULLANICIYA AÇIK");
console.log("Kökeni : " + next.etymology.summaryTr);
console.log("Hafıza : " + next.memory_hint_tr + "   (ayrı katman, tekrar yok)");
console.log("disagreementNote: " + e.disagreementNote.length + " → " + next.etymology.disagreementNote.length + " karakter");
