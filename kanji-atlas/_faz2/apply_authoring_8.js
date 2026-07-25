/* AUTHORING Parti 8 · 土 母 生 行 — DRAFTED (KULLANICIYA GİZLİ).
   Zeynep kararı (2026-07-25): 象形 triage etiketi ÖN HÜKÜM DEĞİL. Dört sayfa ayrı okundu;
   oluşum türü, resmedilen nesne ve güncel anlama geçiş ayrı doğrulandı. Ciddi çatal çıkan kayıt
   yalnız kendisi ayrılır, diğer üçü rehin tutulmaz.

   TRIAGE DÜZELTMESİ (kaynaktan): 母 象形 DEĞİL → 指事 (Kanjipedia). Triage'ın 4'ünü de 象形 sayması
   yanlıştı; ESAS sayfa okuması bunu yakaladı ("etiket ön hüküm değil" kuralının kanıtı).

   B0 (ölçüldü): dördü de BOŞ (etymology/pictogram_note/memory_hint_tr/mnemonic YOK, components boş)
   → drafted maliyeti sıfır.

   KAYNAK TEYİDİ:
   土 0005127900「象形。土地の神を祭るために設けたつち盛りの形にかたどり、つちの神、ひいて『つち』の意を表す。」
   母 0006317900「指事。女に、乳房を示す点を二つ加えて、子供に授乳するははおやの意を表す。」
   生 0003833400「象形。地上にめばえる草木のさまにかたどり、『うまれる』『いきる』『いのち』などの意を表す。」
   行 0002172500「象形。四方に道が延びる十字路の形にかたどり、人通りの多い道の意を表す。ひいて『ゆく』、転じて『おこなう』意に用いる。」

   confidence TASLAK: 土=B (resmedilen nesne çatallı: Kanjipedia yığın/sunak · 説文 katman · Shirakawa direk),
   母=A (指事, 女+göğüs noktaları; 説文 uyumlu), 生=A (説文 uyumlu), 行=B (oluşum çatallı: Kanjipedia 象形
   kavşak [modern 甲骨 uzlaşı] · 説文 会意 彳+亍). QA + Zeynep karar verir.
   mnemonic: pending_review (köken drafted). reviewed + mnemonic kararı AYRI turda. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const KP = id => "https://www.kanjipedia.jp/kanji/" + id;

const RECORDS = {
  "土": {
    formationType: "象形", confidence: "B",
    summaryTr: "Toprak tanrısı için yapılan bir toprak yığınının resmidir. Buradan 'toprak, yer' anlamı gelişmiştir.",
    sources: [KP("0005127900")],
    disagreementNote:
      "TASLAK. ESAS Kanjipedia 0005127900:「象形。土地の神を祭るために設けたつち盛りの形にかたどり、つちの神、ひいて『つち』の意を表す。」 "
      + "→ toprak tanrısına adanmış bir toprak yığınının (sunak) resmi → toprak. "
      + "|| ÇATAL (resmedilen nesne): 説文解字「土、地之吐生萬物者也。二象地之下、地之中。物出形也。」 土'yu bir "
      + "toprak YIĞINI değil, katmanları (yer altı/yer içi) ve topraktan çıkan şeyleri gösteren bir diyagram sayar — "
      + "yani 指事'ye yakın okur. Ayrıca Shirakawa ekolü 土'yu kutsal bir direk/伏 olarak okur (社 ile bağ). "
      + "Kanjipedia (ESAS) net biçimde 'toprak yığını/sunak' 象形 der; görünür metin ona uyar. Ama resmedilen nesnede "
      + "gerçek görüş ayrılığı var → confidence B (taslak). 土/士 karışması (görsel) ayrı bir mnemonic konusu, köken değil."
  },
  "母": {
    formationType: "指事", confidence: "A",
    summaryTr: "女 kadın işaretine, göğüsleri gösteren iki nokta eklenmiştir. Çocuğunu emziren anneden 'anne' anlamı doğmuştur.",
    sources: [KP("0006317900")],
    disagreementNote:
      "TASLAK. ESAS Kanjipedia 0006317900:「指事。女に、乳房を示す点を二つ加えて、子供に授乳するははおやの意を表す。」 "
      + "|| TRIAGE DÜZELTMESİ: 母 象形 DEĞİL, 指事 — mevcut bir karaktere (女) işaret ekleyerek yeni kavram gösterir. "
      + "Triage 4'ünü de 象形 saymıştı; yanlıştı, ESAS okuma düzeltti. "
      + "|| Bileşen/işaret rolleri (kaynaktan): taban 女 (kadın); eklenen iki nokta = 乳房 (göğüsler), emzirmeyi işaret eder. "
      + "女'den FARK budur: 女 kadın, 母 emziren anne. Çapraz 説文「母、牧也。从女、象褱子形。一曰、象乳子也。」 uyumlu "
      + "(女 + emzirme/çocuk işareti). İhtilaf yok → confidence A (taslak)."
  },
  "生": {
    formationType: "象形", confidence: "A",
    summaryTr: "Topraktan yeni biten bir bitkinin resmidir. Buradan 'doğmak, yaşamak' anlamı gelişmiştir.",
    sources: [KP("0003833400")],
    disagreementNote:
      "TASLAK. ESAS Kanjipedia 0003833400:「象形。地上にめばえる草木のさまにかたどり、『うまれる』『いきる』『いのち』などの意を表す。」 "
      + "→ topraktan biten bitkinin resmi → doğmak/yaşamak/hayat. Çapraz 説文「生、進也。象艸木生出土上。」 birebir uyumlu. "
      + "İhtilaf yok → confidence A (taslak). NOT (Zeynep): hangi çizginin 'toprak', hangisinin 'filiz' olduğu görünür "
      + "metne AYRINTILANDIRILMADI — kaynak da tek nesne (biten bitki) diyor, parçalara bölünmedi."
  },
  "行": {
    formationType: "象形", confidence: "B",
    summaryTr: "Dört yöne uzanan bir kavşağın resmidir; buradan 'işlek yol' anlamı doğmuştur. Yoldan 'gitmek', oradan da 'yapmak' anlamı gelişmiştir.",
    sources: [KP("0002172500")],
    disagreementNote:
      "TASLAK. ESAS Kanjipedia 0002172500:「象形。四方に道が延びる十字路の形にかたどり、人通りの多い道の意を表す。ひいて『ゆく』、転じて『おこなう』意に用いる。」 "
      + "|| İKİ AYRI İDDİA (Zeynep talimatı): (1) BİÇİM = dört yöne uzanan kavşak/işlek yol (象形). (2) ANLAM GEÇİŞİ = "
      + "yol → 'gitmek' (ひいて) → 'yapmak' (転じて). İkisi de Kanjipedia'da açık; görünür metin ikisini de veriyor. "
      + "|| ÇATAL (biçim/oluşum): 説文解字「行、人之步趨也。从彳从亍。」 行'ı bir kavşak DEĞİL, 彳+亍 (yürüme adımları) "
      + "会意'si olarak okur. Modern uzlaşı (甲骨文'e dayanarak, Kanjipedia dahil) kavşak 象形'idir; 説文'ın 彳+亍 okuması "
      + "eski/aşılmış sayılır. Gerçek oluşum-türü çatalı → confidence B (taslak)."
  }
};

const applied = [];
for (const [ch, spec] of Object.entries(RECORDS)) {
  const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === ch);
  if (!id) throw new Error(ch + " bulunamadı");
  const rec = DATA.chars[id];
  if (rec.etymology) throw new Error(ch + " zaten etymology taşıyor");
  if (rec.mnemonic) throw new Error(ch + " zaten mnemonic taşıyor — elle bak");
  if ((rec.pictogram_note || "").trim()) throw new Error(ch + " legacy (pictogram_note dolu) — B0 ihlali");

  const ETY = {
    formationType: spec.formationType,
    formationTypeSource: "Kanjipedia",
    confidence: spec.confidence,
    summaryTr: spec.summaryTr,
    sources: spec.sources,
    disagreementNote: spec.disagreementNote,
    qaStatus: "drafted"
  };
  const next = Object.assign({}, rec, { etymology: ETY, mnemonic: { status: "pending_review" } });

  if (next.etymology.qaStatus !== "drafted") throw new Error(ch + ": qaStatus drafted olmalı");
  if (next.etymology.reviewedAt) throw new Error(ch + ": reviewedAt VERİLMEZ");
  if (["A","B"].indexOf(next.etymology.confidence) < 0) throw new Error(ch + ": taslak confidence A/B bekleniyor");
  if (["象形","指事","会意","形声"].indexOf(next.etymology.formationType) < 0) throw new Error(ch + ": geçersiz formationType");
  if (next.mnemonic.status !== "pending_review") throw new Error(ch + ": mnemonic pending_review olmalı");
  if (next.etymology.sources.length !== 1) throw new Error(ch + ": tek kaynak künyesi bekleniyor");
  if (!/kanjipedia\.jp\/kanji\/\d{10}$/.test(next.etymology.sources[0])) throw new Error(ch + ": kaynak URL biçimi hatalı");
  if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error(ch + ": components değişmemeli");
  if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error(ch + ": component_meanings değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");
  if (next.etymology.summaryTr === (next.memory_hint_tr || "")) throw new Error(ch + ": Kökeni ile Hafıza aynı olamaz");

  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error(ch + ": kayıt kaynakta bire bir bulunamadı");
  src = src.replace(oldSub, JSON.stringify(next));
  applied.push({ ch, id, conf: spec.confidence, type: spec.formationType, len: ETY.summaryTr.length });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 8 DRAFTED yazıldı (4 kayıt, qaStatus=drafted, KULLANICIYA KAPALI):");
for (const a of applied) console.log("  " + a.ch + " (" + a.id + ") · " + a.type + " · conf " + a.conf + " · summaryTr " + a.len + " kr · mnemonic pending_review");
console.log("reviewedAt YOK · reviewed + mnemonic kararı AYRI turda (Zeynep).");
