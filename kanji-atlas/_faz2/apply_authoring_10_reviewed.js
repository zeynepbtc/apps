/* AUTHORING Parti 10 · 左 + 右 — REVIEWED ONAYI (Zeynep, 2026-07-25).
   Karar: 左=A, 右=B (drafted değerleriyle aynı → değişmez). İkisi de reviewed.
   MNEMONIC: ikisi de not_required. Çizim-sırası ipucu (左 ilk çizgi yatay / 右 eğik) 4 kalite
   testini geçiyordu ama Zeynep GÖREV AYRIMI gerekçesiyle reddetti:

     "土'daki active gerçek kullanıcı problemi çözüyordu; 土/士 gerçekten karışıyor. 左/右 için ilk
      çizgi farklılığı gerçek, ama bunun Stroke Coach'un görevi olduğunu düşünüyorum. Eğer Hafıza
      katmanı bunu da üstlenmeye başlarsa ileride ilk çizgi, ikinci çizgi, kalem kaldırma, oran, açı
      gibi şeyler gelmeye başlar ve Hafıza katmanı giderek yazı öğretmeye başlar. Bu görev ayrımı
      bozulur. Stroke order verisi zaten uygulamada var."

   → T3 ("gerçek bir öğrenme problemini çözüyor mu?") KAPSAM SINIRI netleşti: Hafıza katmanı
   ANLAM/AYIRT ETME kancasıdır; YAZIM ÖĞRETİMİ çizim modülünün işidir. 土'un active'i meşru çünkü
   iki KARAKTERİ ayırt ettiriyor (土/士), yazım tekniği öğretmiyor.

   右 KIRMIZI KUYRUKTAN ÇIKARILDI (Zeynep): "Kırmızı kuyruğun amacı 'zor karakter' değil, 'ek
   araştırma gerektiren karakter' idi. Araştırma yapıldı, risk doğrulandı, kaynak okundu, karar
   verildi. Görevini tamamladı. Artık normal reviewed kayıt."

   DEĞİŞENLER: qaStatus drafted→reviewed · +reviewedAt (Git'ten) · mnemonic pending_review→not_required
   · disagreementNote'a onay izi. summaryTr/confidence/formationType/sources DEĞİŞMEZ.
   components/component_meanings/related_characters/pictogram_note/memory_hint_tr DOKUNULMAZ. */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const INDEX = path.join(__dirname, "..", "index.html");

const GIT_DATE = cp.execSync("git log -1 --format=%cd --date=short", { cwd: ROOT }).toString().trim();
if (!/^\d{4}-\d{2}-\d{2}$/.test(GIT_DATE)) throw new Error("git tarihi okunamadı: " + GIT_DATE);

const MNEM_NOTE_COMMON =
  "not_required — 4-soru: köken temel anlama bağlı ve tek okumada canlanıyor; ayrı bir anlam kancası "
  + "tekrar olurdu. ÇİZİM-SIRASI ADAYI DEĞERLENDİRİLDİ ve REDDEDİLDİ: uygulamanın kendi "
  + "stroke_order_steps verisinden ölçülen fark (左 ilk çizgi yatay · 右 ilk çizgi eğik) gerçektir ve "
  + "4 kalite testini teknik olarak geçiyordu, ama Zeynep GÖREV AYRIMI gerekçesiyle reddetti: Hafıza "
  + "katmanı ANLAM/AYIRT ETME kancasıdır, YAZIM ÖĞRETİMİ çizim modülünün (Stroke Coach) işidir. Aksi "
  + "halde katman zamanla 'ilk çizgi, ikinci çizgi, kalem kaldırma, oran, açı' ile dolar ve yazı "
  + "öğretmeye başlar. Emsal ayrımı: 土'un active'i iki KARAKTERİ ayırt ettirir (土/士), yazım tekniği "
  + "öğretmez — bu yüzden meşrudur. Stroke order verisi zaten uygulamada mevcut.";

const REVIEW = {
  "左": { expectConf: "A", extra:
    "|| 左 için ek not: 口 bileşeni bulunmadığından Shirakawa/サイ tartışması bu kaydı hiç "
    + "ilgilendirmiyor; confidence A'nın 右'dan (B) ayrıldığı iki noktadan biri budur (diğeri: "
    + "'sol' anlamının kaynakta doğrudan türetiliyor olması)." },
  "右": { expectConf: "B", extra:
    "|| ZEYNEP'İN B GEREKÇESİ (kayda geçirildi): \"Sebep 'yardım etmek' kısmı değil. Sebep: modern "
    + "kaynakta 'sağ' anlamına geçiş açıklanıyor, fakat bunun tarihsel gelişimi bütün kaynaklarda aynı "
    + "netlikte değil; ayrıca 口'nun rolü üzerine farklı okuma ihtimali mevcut. Yani B burada 'kaynak "
    + "çatışması var' anlamında değil, EDİTORYAL İHTİYAT anlamında kullanılıyor.\" "
    + "|| KIRMIZI KUYRUKTAN ÇIKARILDI: kırmızı kuyruk 'yayınlanamaz karakter' değil, 'EK KANIT "
    + "GEREKTİREN karakter' demekti. Araştırma yapıldı, risk doğrulandı, kaynak okundu, karar verildi "
    + "→ görevini tamamladı, artık normal reviewed kayıt. "
    + "|| Görünür metinde 'ağız' bilinçli olarak kullanılmadı ('söz'). 名 ile doğan editoryal ses "
    + "tutarlılığı sorusu bir HATA DEĞİL, harmonizasyon turunun konusudur; uyumlama listesinde bekliyor "
    + "(şimdi commit açılmadı)." }
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

  const APPROVAL = " || ===== REVIEWED ONAYI (Zeynep, " + GIT_DATE + ") ===== "
    + "drafted → reviewed, reviewedAt Git'ten. confidence " + e.confidence + " (değişmedi). "
    + "summaryTr revize edilmedi. || MNEMONIC KARARI (4-soru, otomatik değil): " + MNEM_NOTE_COMMON
    + " " + r.extra;

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
  if (next.etymology.formationType !== "会意形声") throw new Error(ch + ": formationType 会意形声 kalmalı");
  if (JSON.stringify(next.etymology.sources) !== JSON.stringify(e.sources)) throw new Error(ch + ": sources değişmemeli");
  if (next.mnemonic.status !== "not_required") throw new Error(ch + ": mnemonic not_required olmalı");
  if ("textTr" in next.mnemonic) throw new Error(ch + ": not_required'da textTr olmaz");
  if (/ağız/i.test(next.etymology.summaryTr)) throw new Error(ch + ": görünür metinde 'ağız' olmamalı");
  if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error(ch + ": components değişmemeli");
  if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error(ch + ": component_meanings değişmemeli");
  if (JSON.stringify(next.related_characters) !== JSON.stringify(rec.related_characters)) throw new Error(ch + ": related_characters değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");

  src = src.replace(oldSub, JSON.stringify(next));
  done.push({ ch, id, conf: e.confidence });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 10 REVIEWED · reviewedAt=" + GIT_DATE + " · KULLANICIYA AÇIK:");
for (const d of done) console.log("  " + d.ch + " (" + d.id + ") · 会意形声 · confidence " + d.conf + " · mnemonic not_required");
console.log("右 KIRMIZI KUYRUKTAN ÇIKARILDI — normal reviewed kayıt.");
