/* AUTHORING Parti 12 · 万 来 西 — REVIEWED ONAYI (Zeynep, 2026-07-25).
   Karar: 万=A, 来=B, 西=A (drafted değerleriyle aynı → değişmez). Üçü reviewed.
   MNEMONIC: üçü de not_required. summaryTr'lerde REVİZYON YOK — terminoloji zaten doğruydu.

   TERMİNOLOJİ KİLİTLENDİ (Zeynep): "eski biçimi → **sadeleşmiş yazımı**".
   Gerekçesi dil estetiği değil, projenin kendi terminolojisi: 円 ve 万 aynı tarihsel olguyu
   anlatıyor — eğitim kanjisindeki modern biçim, eski karakter biçiminin sadeleşmiş şeklidir.
   "kısaltılmış yazımı" projede artık BAŞKA bir anlam taşıyor (bileşen düzeyinde kısalma / grafik
   kısaltma — ör. 季'de 稚→禾) ve bütün-karakter sadeleştirmesi için kullanılmaz.

   来 = B gerekçesi (Zeynep): "Tartışma 'buğday mı değil mi?' değil; ANLAM GEÇİŞ MEKANİZMASI.
   Modern kaynak yalnız 借りて derken 説文 bunu açıklamaya çalışıyor. Bu, 百/千 türündeki
   'mekanizma çatalı' ile aynı editoryal sınıfa giriyor. Görünür metinde modern ve ortak paydada
   kalıp B vermek tutarlı."

   MNEMONIC gerekçesi (Zeynep): "Ödünç karakterlerde köken, tanımı gereği bugünkü anlamı açıklamaz.
   Ama bunun çözümü active mnemonic üretmek değil — üretilecek her kanca 'akrep → on bin' veya
   'buğday → gelmek' gibi tarihsel olmayan bir hafıza hikâyesine dönüşür ve aktif mnemonic
   standardının dışına çıkar. Mevcut politika korunmalı."

   DEĞİŞENLER: qaStatus drafted→reviewed · +reviewedAt (Git'ten) · mnemonic→not_required ·
   disagreementNote'a onay izi. summaryTr/confidence/formationType/sources DEĞİŞMEZ.
   components/component_meanings/pictogram_note/memory_hint_tr DOKUNULMAZ.
   東'ün legacy memory_hint_tr'sine DOKUNULMAZ (harmonizasyon listesinde bekliyor). */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const INDEX = path.join(__dirname, "..", "index.html");

const GIT_DATE = cp.execSync("git log -1 --format=%cd --date=short", { cwd: ROOT }).toString().trim();
if (!/^\d{4}-\d{2}-\d{2}$/.test(GIT_DATE)) throw new Error("git tarihi okunamadı: " + GIT_DATE);

const SES_GEREKCESI = /(sesi için|benzer sesli|sesi nedeniyle|sesi uygun|ses değeriyle)/i;

const REVIEW = {
  "万": { expectConf: "A", mnemNote:
    "not_required — 4-soru: ÖLÇÜLDÜ ki biçim karışıklığı ortakları (方, 力, 刀) uygulamada YOK; "
    + "`confusables` listesi yalnız kana içeriyor → biçim kancası için doğrulanabilir problem yok (T3). "
    + "YAPISAL NOT: ödünç kayıtlarda köken tanım gereği bugünkü anlamı açıklamaz (akrep 'on bin'i "
    + "açıklamaz) — 4-soru#1 bu sınıfta sistematik olarak HAYIR. Zeynep kararı: bunun çözümü active "
    + "üretmek DEĞİL, çünkü üretilecek her kanca 'akrep → on bin' gibi tarihsel olmayan bir hafıza "
    + "hikâyesine (visual_story) dönüşür ve aktif mnemonic standardının dışına çıkar. Mevcut politika "
    + "korunur. Emsal: mevcut ödünç kayıtların hepsi not_required (四 五 六 七 八 東 校 何)." },
  "来": { expectConf: "B", mnemNote:
    "not_required — 4-soru: karışıklık ortakları (未, 末, 米) uygulamada YOK (ölçüldü) → T3 düşer. "
    + "Yapısal not 万 ile aynı: ödünç kaydında köken bugünkü anlamı taşımaz, ama 'buğday → gelmek' "
    + "kancası tarihsel olmayan bir hikâye olurdu → yazılmaz (Zeynep kararı)." },
  "西": { expectConf: "A", mnemNote:
    "not_required — 4-soru: **köken zaten anlamı taşıyor** — 'kuşlar akşam yuvaya döner → batı' "
    + "başlı başına güçlü bir kanca ve iki kaynakta da doğrulanmış bir ANLAM BAĞI (ödünç değil). "
    + "Ayrı mnemonic yalnız tekrar olurdu. Karışıklık ortakları (酉, 要) uygulamada yok." }
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
    + "summaryTr revize EDİLMEDİ. "
    + (ch === "万"
        ? "|| TERMİNOLOJİ KİLİTLENDİ: 'eski biçimi → SADELEŞMİŞ yazımı'. 円 ve 万 aynı tarihsel olguyu "
          + "anlatır (eğitim kanjisindeki modern biçim = eski karakterin sadeleşmiş şekli). "
          + "'kısaltılmış yazımı' projede bileşen/grafik kısaltma için ayrılmıştır (ör. 季'de 稚→禾). "
        : "")
    + (ch === "来"
        ? "|| B GEREKÇESİ (Zeynep): 'Tartışma buğday mı değil mi değil; ANLAM GEÇİŞ MEKANİZMASI. Modern "
          + "kaynak yalnız 借りて derken 説文 bunu açıklamaya çalışıyor. 百/千 türündeki mekanizma "
          + "çatalıyla aynı editoryal sınıf. Görünür metinde modern ve ortak paydada kalıp B vermek "
          + "tutarlı.' "
        : "")
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
  if (next.etymology.summaryTr !== e.summaryTr) throw new Error(ch + ": summaryTr DEĞİŞMEMELİ");
  if (next.etymology.confidence !== e.confidence) throw new Error(ch + ": confidence değişmemeli");
  if (next.etymology.formationType !== "象形") throw new Error(ch + ": formationType 象形 kalmalı");
  if (JSON.stringify(next.etymology.sources) !== JSON.stringify(e.sources)) throw new Error(ch + ": sources değişmemeli");
  if (next.mnemonic.status !== "not_required") throw new Error(ch + ": mnemonic not_required olmalı");
  if ("textTr" in next.mnemonic) throw new Error(ch + ": not_required'da textTr olmaz");
  if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error(ch + ": components değişmemeli");
  if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error(ch + ": component_meanings değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");
  /* Kilitli editoryal kararların reviewed sonrası da geçerliliği */
  if (SES_GEREKCESI.test(next.etymology.summaryTr)) throw new Error(ch + ": KARAR 1 — ses gerekçesi metne giremez");
  if (ch === "西" && /ödünç/i.test(next.etymology.summaryTr)) throw new Error("西: KARAR 4 — 西 ödünç kaydı değil");
  if ((ch === "万" || ch === "来") && !/ödünç alınmıştır/i.test(next.etymology.summaryTr)) throw new Error(ch + ": ödünç kalıbı (B) korunmalı");
  if (ch === "万" && !/sadeleşmiş yazımı/i.test(next.etymology.summaryTr)) throw new Error("万: kilitli terim 'sadeleşmiş yazımı' olmalı");
  if (ch === "万" && /kısaltılmış yazımı/i.test(next.etymology.summaryTr)) throw new Error("万: 'kısaltılmış yazımı' bütün-karakter için kullanılmaz");
  if (/su mercimeği|うき草/i.test(next.etymology.summaryTr + next.etymology.disagreementNote)) throw new Error(ch + ": KARAR 3 — su mercimeği hattı DATA'ya giremez");

  src = src.replace(oldSub, JSON.stringify(next));
  done.push({ ch, id, conf: e.confidence });
}

/* 東'e dokunulmadığının kanıtı (harmonizasyon listesinde bekliyor) */
const higashi = Object.values(DATA.chars).find(v => v.character === "東");
if (!higashi || higashi.memory_hint_tr !== "Ağacın ardından doğan güneş: doğu.") throw new Error("東 memory_hint_tr beklenen legacy değerde değil — beklenmeyen durum");

fs.writeFileSync(INDEX, src);
console.log("Parti 12 REVIEWED · reviewedAt=" + GIT_DATE + " · KULLANICIYA AÇIK:");
for (const d of done) console.log("  " + d.ch + " (" + d.id + ") · 象形 · confidence " + d.conf + " · mnemonic not_required");
console.log("Terminoloji KİLİTLİ: 'eski biçimi → sadeleşmiş yazımı'.");
console.log("東 legacy memory_hint_tr'sine DOKUNULMADI (harmonizasyon listesinde).");
