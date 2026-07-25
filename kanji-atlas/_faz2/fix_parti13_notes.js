/* METADATA DÜZELTMESİ · Parti 13 — `disagreementNote` alanının anlamı korunuyor (Zeynep, 2026-07-25).
   Kayıtlar HÂLÂ `drafted`; bu betik reviewed'dan ÖNCE koşar ve YALNIZ disagreementNote'u yeniden yazar.

   ── ZEYNEP'İN AYRIMI ──────────────────────────────────────────────────────────────────────
   Üç durum aynı alana konmamalı:
     · 後'deki MEKANİZMA ÇATALI  → gerçek kaynak ayrılığıdır  → disagreementNote UYGUN → DOKUNULMAZ
     · 年'in 甲骨・金文 KATMANI   → anlaşmazlık değil, EK TARİHSEL KATMAN → çıkarılır
     · 前'in 説文'da MADDE OLMAMASI → anlaşmazlık değil, ÇAPRAZ KAYNAK SINIRLILIĞI → çıkarılır
   "disagreementNote yalnız bilimsel ayrılıklar içindir" (Parti 12'de 万'ın su mercimeği hattıyla
   kurulan emsalin devamı).
   Taşınan bilgiler kaybolmuyor:
     · 年'in erken biçim katmanı → AŞAĞIDAKİ AUTHORING KAYNAK NOTU (git'te kalıcı)
     · 前'in çapraz kaynak sınırlılığı → AUTHORING-PARTI13-QA-RAPOR (confidence gerekçesi) +
       aşağıdaki authoring notu; kayıtta yalnız tek satırlık NÖTR bir durum ifadesi kalır
       (confidence B'nin kayıttan izlenebilir olması için).
   ──────────────────────────────────────────────────────────────────────────────────────────

   ── AUTHORING KAYNAK NOTU · 年'in erken yazı katmanı (DATA'ya GİRMEZ) ──────────────────────
   Kanjipedia 0005481100 tam metni İKİ katman verir:
     (a)「甲骨・金文は、象形。実った穀物の穂を、人が背負っている形にかたどる。みのりの意を表す。
         転じて、穀物が実る周期「とし」の意に用いる。」
         → En eski yazı katmanı: olgunlaşmış tahıl demetini SIRTINDA TAŞIYAN insan; 'hasat' anlamı,
           oradan tahılın olgunlaşma döngüsü = 'yıl'.
     (b)「本字は、形声で、意符の禾(か)（穀物）と、音符千(セン)→(ネン)とから成る。常用漢字はその変わった形。」
         → Asıl karakter 形声: 禾 (anlam) + 千 (ses). Bugünkü 年 bunun değişmiş biçimi.
   Kayıt (b) hattına dayandırıldı. (a) görünür metne ALINMADI — Zeynep gerekçesi: modern biçimle
   erken yazı biçimi karışabilir, metin uzar, kullanıcı bugünkü 年 içinde 人 bileşenini aramaya
   başlayabilir. İleride "ayrıntılı tarih" katmanı açılırsa yeniden değerlendirilebilir.

   ── AUTHORING KAYNAK NOTU · 前'in çapraz kaynak durumu (DATA'ya AYRINTISIYLA GİRMEZ) ───────
   説文解字'da **前 maddesi bulunmuyor**. 漢典: 「说文解字未收录「前」字头，请参考「歬」字」.
   Yalnız 歬 tanımlı: 「不行而進謂之歬。从止在舟上。昨先切」 (yürümeden ilerlemek; 止'in 舟 üstünde
   olması). Bu, 前'nin kendi oluşum analizini doğrulamaz — 前 için ESAS kaynak tek başına kalır.
   Sonuç: confidence B. Ayrıntı QA raporunda; kayıtta yalnız nötr durum ifadesi.
   NOT: 'ayak (止)' ve 'tekne (舟)' yalnız BURADA geçer — Kanjipedia 前 için vermez, bu yüzden
   görünür metne alınmadı. Bu tespit kayıtta kalır çünkü doğrudan görünür metni belirledi.
   ──────────────────────────────────────────────────────────────────────────────────────────*/
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);

const NEW_NOTES = {
  "年": {
    expectConf: "A",
    note:
      "İHTİLAF YOK — kaynaklar aynı yapıyı destekliyor. "
      + "|| ESAS Kanjipedia 0005481100, kaydın dayandığı hat:「本字は、形声で、意符の禾(か)（穀物）と、"
      + "音符千(セン)→(ネン)とから成る。常用漢字はその変わった形。」 "
      + "|| ÇAPRAZ 説文解字 (漢典'den fetch edilerek):「穀孰也。…年者、取禾一孰也。**从禾。千聲。**」 → "
      + "bileşen rolleri BİREBİR aynı (禾 anlam + 千 ses) ve anlam gelişimi de doğrulanıyor "
      + "(穀孰 = tahılın olgunlaşması; 取禾一孰 = tahılın bir kez olgunlaşması) → confidence A. "
      + "|| GÖRÜNÜR METİN KARARLARI: (1) Bileşenler bugünkü biçimde görünmediği için metin "
      + "'eski biçimi' çerçevesiyle açıldı. (2) Kapanışta kaynağın 「常用漢字はその変わった形」 ifadesi "
      + "karşılandı — kaynak burada 省略形 DEĞİL 変わった形 diyor, bu yüzden kilitli terim ayrımı gereği "
      + "'sadeleşmiş' değil **'değişmiş'** kullanıldı. (3) SES YAZILDI: kaynak 千(セン)→(ネン) veriyor "
      + "ve 年'nin okunuşu ネン — örtüşüyor (çatı ilke). "
      + "|| Kanjipedia girdisinin erken yazı katmanı bu kayda dayanak yapılmadı ve görünür metne "
      + "alınmadı; ayrıntı authoring kaynak notunda (bu bir kaynak anlaşmazlığı değil, ek tarihsel "
      + "katmandır — bu yüzden burada tartışılmaz)."
  },
  "前": {
    expectConf: "B",
    note:
      "İHTİLAF YOK — ama ÇAPRAZ DOĞRULAMA YAPILAMADI (confidence B'nin sebebi budur; ayrıntı "
      + "AUTHORING-PARTI13-QA-RAPOR ve authoring kaynak notunda). "
      + "|| ESAS Kanjipedia 0004135400:「会意形声。刀と、歬(セン)（すすむ。□は変わった形）とから成る。"
      + "刀で切りそろえる意を表す。「剪(セン)」の原字。ひいて「すすむ」「まえ」の意に用いる。」 "
      + "|| GÖRÜNÜR METİN KARARLARI: (1) Kaynak 前 için YALNIZ iki bileşen veriyor — 刀 (bıçak, "
      + "'kesmek' mekanizması) ve 歬 ('ilerlemek' + ses). Yaygın olarak dolaşan **'ayak' (止) ve "
      + "'tekne' (舟)** açıklamaları Kanjipedia'nın 前 maddesinde BULUNMAZ; bunlar 歬'nin kendi "
      + "iç yapısına aittir ve Kanjipedia 歬'yi parçalarına ayırmaz → görünür metne ALINMADI. "
      + "(2) 歬 adlandırılmadı ('üstteki parça') — bugünkü 前'de görünmüyor, kaynak da 「□は変わった形」 "
      + "diyor (書/先/千 ile aynı kilitli çözüm). (3) SES YAZILMADI: kaynak 歬(セン) diyor ama 前'nin "
      + "okunuşu ゼン — örtüşmüyor → 話 kalıbı (çatı ilke). (4) 会意形声 gereği 歬'nin ANLAM katkısı "
      + "('ilerlemek') inkâr edilmedi — 季/左/右 ile aynı kalıp."
  }
};

const done = [];
for (const [ch, spec] of Object.entries(NEW_NOTES)) {
  const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === ch);
  if (!id) throw new Error(ch + " bulunamadı");
  const rec = DATA.chars[id];
  const e = rec.etymology;
  if (!e) throw new Error(ch + " etymology taşımıyor");
  if (e.qaStatus !== "drafted") throw new Error(ch + ": bu düzeltme reviewed'dan ÖNCE koşar; gelen " + e.qaStatus);
  if (e.confidence !== spec.expectConf) throw new Error(ch + ": beklenen confidence " + spec.expectConf);

  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error(ch + ": kayıt kaynakta bire bir bulunamadı");
  const next = Object.assign({}, rec, {
    etymology: Object.assign({}, e, { disagreementNote: spec.note })
  });

  /* SADECE disagreementNote değişmeli */
  if (next.etymology.summaryTr !== e.summaryTr) throw new Error(ch + ": summaryTr DEĞİŞMEMELİ");
  if (next.etymology.confidence !== e.confidence) throw new Error(ch + ": confidence DEĞİŞMEMELİ");
  if (next.etymology.qaStatus !== e.qaStatus) throw new Error(ch + ": qaStatus DEĞİŞMEMELİ (drafted kalır)");
  if (next.etymology.formationType !== e.formationType) throw new Error(ch + ": formationType DEĞİŞMEMELİ");
  if (JSON.stringify(next.etymology.sources) !== JSON.stringify(e.sources)) throw new Error(ch + ": sources DEĞİŞMEMELİ");
  if (JSON.stringify(next.mnemonic) !== JSON.stringify(rec.mnemonic)) throw new Error(ch + ": mnemonic DEĞİŞMEMELİ");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note DEĞİŞMEMELİ");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr DEĞİŞMEMELİ");

  /* Taşınan içerik gerçekten çıkmış mı? */
  if (ch === "年") {
    if (/甲骨|金文|背負|sırtında/i.test(next.etymology.disagreementNote)) throw new Error("年: erken yazı katmanı notta kalmamalı");
  }
  if (ch === "前") {
    if (/未収録|不行而進|从止在舟上/.test(next.etymology.disagreementNote)) throw new Error("前: 説文 madde-yokluğu ayrıntısı notta kalmamalı");
    if (!/ÇAPRAZ DOĞRULAMA YAPILAMADI/.test(next.etymology.disagreementNote)) throw new Error("前: confidence B kayıttan izlenebilir olmalı (nötr durum ifadesi)");
  }

  src = src.replace(oldSub, JSON.stringify(next));
  done.push({ ch, id, before: e.disagreementNote.length, after: spec.note.length });
}

/* 後 ve 気'ye DOKUNULMADIĞININ kanıtı */
const ato = Object.values(DATA.chars).find(v => v.character === "後");
if (!/幺者小也|MEKANİZMA ÇATALI/.test(ato.etymology.disagreementNote)) throw new Error("後'nün mekanizma çatalı notu beklenen hâlde değil");

fs.writeFileSync(INDEX, src);
console.log("Parti 13 metadata düzeltmesi — disagreementNote yeniden yazıldı (kayıtlar HÂLÂ drafted):");
for (const d of done) console.log("  " + d.ch + " (" + d.id + ") · " + d.before + " → " + d.after + " kr");
console.log("後: mekanizma çatalı — GERÇEK kaynak ayrılığı → DOKUNULMADI");
console.log("気: ihtilaf yok, içerik zaten kaynak+karar izi → DOKUNULMADI");
console.log("Taşınanlar: 年'in erken yazı katmanı + 前'in 説文 madde-yokluğu → authoring kaynak notu (bu betiğin başı) + QA raporu");
