/* AUTHORING Parti 14 · 北 青 飲 — REVIEWED ONAYI (Zeynep, 2026-07-25).
   Karar: 北=B, 青=B, 飲=A (drafted değerleriyle aynı → değişmez). Üçü reviewed. Üçü not_required.
   TERMİNOLOJİ KİLİTLENDİ: 俗字 → **"yaygınlaşmış"** (üçüncü sabit; 省略形→"sadeleşmiş",
   変わった形→"değişmiş" yanına). Zeynep: "'yaygın biçim' doğal; 'standartlaşmış' fazla resmî;
   'varyant' kullanıcı dili değil."

   ÜÇ METİN RİTİM DÜZENLEMESİNDEN GEÇTİ (Zeynep talimatı, "özellikle 青"):
     北 — Zeynep'in metni AYNEN uygulandı (tek cümle ikiye bölündü, "bulunduğu" atıldı).
     飲 — Zeynep'in edit'i AYNEN uygulandı ("ağzını iyice açan" → "ağzını açan"; 'iyice' bilgi katmıyor).
     青 — ⚠️ Zeynep'in metninden TEK FARKLA uygulandı; gerekçe aşağıda.

   ── ⚠️ 青'DE TEK FARK VE GEREKÇESİ (Zeynep'e bildirildi, onayına açık) ──────────────────────
   Zeynep'in önerdiği kısa sürüm 生'in ANLAM katkısını da düşürüyordu:
     "…boya anlamı veren 丹 ile セイ sesini veren 生'den oluşur. Bu boyadan 'mavi, yeşil' anlamı…"
   Sorun: **丹 tek başına KIRMIZI bir boyadır (zincifre).** Kanjipedia'nın mantığında rengi veren
   şey 生'dir: 「丹（染料）+ 生（草が生えるさま）→ **草色をした染料**」 = OT RENGİNDE boya → mavi/yeşil.
   生'in anlam katkısı düşerse metin "boya → mavi/yeşil" der ki bu hem mantık atlar hem de 丹'ın
   kendi (kırmızı) anlamıyla çelişir. Ayrıca kayıt **会意形声**'dir: 季/左/右 kalıbı gereği ses
   bileşeninin ANLAMI inkâr edilmez/düşürülmez.
   → Bu yüzden 生'in "ot" katkısı KORUNDU, ama Zeynep'in asıl itirazı olan 丹'ın fazla açıklayıcı
   glossu ("kuyudan çıkarılan bir boyayı gösteren") KALDIRILDI. Kısalma yine sağlandı.
   Zeynep tam kendi sürümünü tercih ederse tek satırlık bir düzeltme yeterli.
   ──────────────────────────────────────────────────────────────────────────────────────────

   DEĞİŞENLER: qaStatus drafted→reviewed · +reviewedAt (Git'ten) · mnemonic→not_required ·
   ÜÇÜNDE DE summaryTr kısaltıldı · disagreementNote'a onay izi.
   confidence/formationType/sources DEĞİŞMEZ. components/component_meanings/pictogram_note/
   memory_hint_tr DOKUNULMAZ. */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const INDEX = path.join(__dirname, "..", "index.html");

const GIT_DATE = cp.execSync("git log -1 --format=%cd --date=short", { cwd: ROOT }).toString().trim();
if (!/^\d{4}-\d{2}-\d{2}$/.test(GIT_DATE)) throw new Error("git tarihi okunamadı: " + GIT_DATE);

const KITA_NEW = "Birbirine sırtını dönmüş iki kişinin resmidir. Önce 'sırt çevirmek' anlamındaydı; güneye dönüldüğünde sırtın baktığı yön olduğu için 'kuzey' anlamı gelişmiştir.";
const AO_NEW   = "Eski biçimi, boya anlamı veren 丹 ile otların bitişini gösteren ve セイ sesini veren 生'den oluşur. Ot renginde bu boyadan 'mavi, yeşil' anlamı gelişmiş; bugünkü 青 eski biçimin yaygınlaşmış hâlidir.";
const NOMU_NEW = "Eski biçimi, ağzını açan kişiyi gösteren 欠 ile 'içki içmek' anlamı taşıyan bir parçadan oluşur; 'içmek' anlamı buradan gelir. Sonradan o parça 食 ile değiştirilmiş, bugünkü 飲 böyle oluşmuştur.";

const REVIEW = {
  "北": { expectConf: "B", newSummary: KITA_NEW, editNote:
    "Zeynep'in ritim metni AYNEN uygulandı (tek cümle ikiye bölündü; 'bulunduğu' atıldı).", mnemNote:
    "not_required — 4-soru: köken ÇOK GÜÇLÜ taşıyor ('sırt sırta iki kişi → sırtın baktığı yön'), "
    + "somut ve görsel. Zeynep: 'kökeni zaten başlı başına bir mnemonic gibi çalışıyor.' Karışıklık "
    + "ortakları (比, 化, 背) uygulamada YOK (ölçüldü) → T3 düşer." },
  "青": { expectConf: "B", newSummary: AO_NEW, editNote:
    "Zeynep'in kısaltma talebi uygulandı — 丹'ın fazla açıklayıcı glossu ('kuyudan çıkarılan bir "
    + "boyayı gösteren') KALDIRILDI. TEK FARK: 生'in 'ot' anlam katkısı KORUNDU, çünkü 丹 tek başına "
    + "KIRMIZI bir boyadır (zincifre) ve Kanjipedia'da rengi veren şey 生'dir (「草色をした染料」 = "
    + "ot renginde boya). 生'in anlamı düşerse metin 'boya → mavi/yeşil' der; hem mantık atlar hem "
    + "丹'ın kendi anlamıyla çelişir. Ayrıca kayıt 会意形声 — 季/左/右 kalıbı gereği ses bileşeninin "
    + "anlamı düşürülmez. Zeynep tam kendi sürümünü isterse tek satırlık düzeltme yeterli.", mnemNote:
    "not_required — 4-soru: köken eski biçim üzerinden veriliyor; bağlayacak ek kanca ya tarihsel "
    + "iddia (T2) ya uydurma görsel hikâye olurdu. Karışıklık ortakları (丹, 井) uygulamada YOK." },
  "飲": { expectConf: "A", newSummary: NOMU_NEW, editNote:
    "Zeynep'in edit'i AYNEN uygulandı: 'ağzını iyice açan' → 'ağzını açan' ('iyice' bilgi katmıyor).", mnemNote:
    "not_required — 4-soru: 食 ve 欠 bugünkü biçimde görünür; 'ağzını açan kişi + yeme-içme' doğrudan "
    + "bağlanıyor. Karışıklık ortakları (欠, 飯) uygulamada YOK → T3 düşer." }
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

  const APPROVAL = " || ===== REVIEWED ONAYI (Zeynep, " + GIT_DATE + ") ===== "
    + "drafted → reviewed, reviewedAt Git'ten. confidence " + e.confidence + " (değişmedi). "
    + "|| RİTİM DÜZENLEMESİ: " + r.editNote + " ESKİ METİN (" + e.summaryTr.length + " kr): \""
    + e.summaryTr + "\" → YENİ (" + r.newSummary.length + " kr). "
    + (ch === "青" ? "|| TERMİNOLOJİ KİLİTLENDİ: 俗字 → 'yaygınlaşmış' (üçüncü sabit; 省略形→'sadeleşmiş', "
        + "変わった形→'değişmiş' yanına). Zeynep: 'yaygın biçim doğal; standartlaşmış fazla resmî; "
        + "varyant kullanıcı dili değil.' " : "")
    + "|| MNEMONIC KARARI (4-soru, otomatik değil): " + r.mnemNote;

  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error(ch + ": kayıt kaynakta bire bir bulunamadı");
  const next = Object.assign({}, rec, {
    etymology: Object.assign({}, e, {
      qaStatus: "reviewed", reviewedAt: GIT_DATE,
      summaryTr: r.newSummary,
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
  if (next.etymology.summaryTr.length >= e.summaryTr.length) throw new Error(ch + ": yeni metin daha kısa olmalı");
  if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error(ch + ": components değişmemeli");
  if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error(ch + ": component_meanings değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");
  /* Parti güvenceleri revizyon sonrası da geçerli */
  if (ch === "北") {
    if (/ödünç/i.test(next.etymology.summaryTr)) throw new Error("北: 借りて kaydı DEĞİL");
    if (!/anlamı gelişmiştir/i.test(next.etymology.summaryTr)) throw new Error("北: anlam-bağı kalıbı korunmalı");
  }
  if (ch === "青") {
    if (!/eski biçim/i.test(next.etymology.summaryTr)) throw new Error("青: 'eski biçim' çerçevesi zorunlu");
    if (/井/.test(next.etymology.summaryTr)) throw new Error("青: 井 ayrı bileşen değil");
    if (!/yaygınlaşmış/i.test(next.etymology.summaryTr)) throw new Error("青: kilitli terim 'yaygınlaşmış' (俗字)");
    if (/sadeleşmiş|değişmiş hâli/i.test(next.etymology.summaryTr)) throw new Error("青: 省略形/変わった形 terimleri kullanılamaz");
    if (!/ot/i.test(next.etymology.summaryTr)) throw new Error("青: 生'in 'ot' anlam katkısı korunmalı (丹 tek başına kırmızı boyadır)");
  }
  if (ch === "飲") {
    if (/イン|イム|オム/.test(next.etymology.summaryTr)) throw new Error("飲: ses yazılmamalı");
    if (!/eski biçim/i.test(next.etymology.summaryTr)) throw new Error("飲: eski biçim çerçevesi zorunlu");
    if (/yiyecek anlamı veren 食/i.test(next.etymology.summaryTr)) throw new Error("飲: 食 gloss edilemez");
  }

  src = src.replace(oldSub, JSON.stringify(next));
  done.push({ ch, id, conf: e.confidence, before: e.summaryTr.length, after: r.newSummary.length });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 14 REVIEWED · reviewedAt=" + GIT_DATE + " · KULLANICIYA AÇIK:");
for (const d of done) console.log("  " + d.ch + " (" + d.id + ") · confidence " + d.conf + " · mnemonic not_required · summaryTr " + d.before + " → " + d.after + " kr");
console.log("TERMİNOLOJİ KİLİTLENDİ: 俗字 → 'yaygınlaşmış'");
console.log("⚠️ 青: Zeynep'in metninden TEK FARK — 生'in 'ot' katkısı korundu (gerekçe betiğin başında)");
