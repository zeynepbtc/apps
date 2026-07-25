/* AUTHORING Parti 12 · 万 来 西 — DRAFTED (KULLANICIYA GİZLİ).
   借りて üslup kararı (AUTHORING-04) kilitlendikten SONRA yazıldı. Zeynep'in beş kararı:
     1. Ödünç ifadesi = (B): "Sonradan '[anlam]' anlamında ödünç alınmıştır."
        "sesi için / benzer sesli olduğu için" veya bir okunuş YAZILMAZ.
     2. Olumsuz kapanış ("şekil …göstermez") yalnız gerçekten yanıltıcı görsel beklenti varsa.
        → Bu üçünde böyle bir beklenti YOK; hiçbirine kapanış eklenmedi.
     3. 万'ın su mercimeği hattı görünür metne DE, disagreementNote'a DA girmez — çünkü ortada
        kaynak anlaşmazlığı yok, iki biçimin birleşen tarihçesi var. AUTHORING KAYNAK NOTU olarak
        yalnız bu yorumda korunur (aşağıda).
     4. 西 借りて kümesinden çıktı ama Parti 12'de kalıyor — FARKLI ev kalıbıyla (anlam bağı).
     5. Geriye dönük hizalama (四 六 七 八 東 + 九) harmonizasyon turuna bırakıldı; burada DOKUNULMAZ.

   ── AUTHORING KAYNAK NOTU (万'ın üçüncü hattı — DATA'ya GİRMEZ, karar 3) ───────────────────
   Kanjipedia 0006573600 iki ayrı madde veriyor:
     (A)「象形。もと、[𠃌]と書き、うき草の形にかたどる。古くから萬の略字として用いられていた。
         教育用漢字はこれによる。」 → 万 karakterinin KENDİ kökeni: su mercimeği (うき草) resmi;
         uzun zamandır 萬'ın 略字'i olarak kullanılmış; eğitim kanjisi buna dayanıyor.
     (B)「象形。さそり（蠆(たい)）の形にかたどる。借りて、数詞の「まん」の意に用いる。」 → 萬'ın kökeni.
   Yani 万 ve 萬 ayrı kökenli iki karakterdir; 万 zamanla 萬'ın kısaltması olarak yerleşmiştir.
   Görünür metin kaynağın kendi çerçevesini (「萬の略字」) kullanır; su mercimeği hattı N5 için yüktür.
   ──────────────────────────────────────────────────────────────────────────────────────────

   TERMİNOLOJİ (ölçüldü, Zeynep'in sorusuna yanıt): summaryTr'lerde "eski biçim" ifadesi 3 kayıtta
   sabit (円, 九, 読 = 旧字 karşılığı). Bütün-karakter sadeleştirmesi (省略形/略字) için tek emsal
   円'nin "**sadeleşmiş**" ifadesidir. ("kısaltılmış biçim" yalnız 季'de ve BİLEŞEN kısaltması için
   kullanılmış — farklı bağlam.) → 万'da "kısaltılmış yazımı" yerine **"sadeleşmiş yazımı"** seçildi;
   円 ile aynı aile, aynı terim.

   KAYNAK TEYİDİ (ESAS Kanjipedia + 説文解字 漢典'den FETCH EDİLEREK):
   万/萬 0006573600 · 説文(萬)「蟲也。从厹，象形。」 + 段注「叚借爲十千數名」 → böcek/akrep resmi + ödünç. UYUMLU
   来 0007020500「旧字は、象形。麦がのぎを張った形にかたどる。借りて「くる」意に用いる。教育用漢字は省略形による。」
       説文(來)「周所受瑞麥來麰。一來二縫，象芒朿之形。天所來也，故爲行來之來。」 → resim AYNI (buğday);
       ama MEKANİZMA farklı: Kanjipedia 借りて (ödünç), 説文 anlam gerekçesi verir → ÇATAL → B
   西 0003852100「象形。鳥の巣の形にかたどる。太陽がにしに傾くころに鳥が巣に帰ることから、方角の「にし」の意に用いる。」
       説文「鳥在巢上。象形。日在西方而鳥棲，故因以爲東西之西。」 → BİREBİR aynı → A */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const KP = id => "https://www.kanjipedia.jp/kanji/" + id;
const TYPES = ["象形", "指事", "会意", "形声", "会意形声"];
/* Karar 1: kaynakta olmayan ses gerekçesi hiçbir metne giremez */
const SES_GEREKCESI = /(sesi için|benzer sesli|sesi nedeniyle|sesi uygun|ses değeriyle|okunuşu (?:uygun|aynı))/i;

const RECORDS = {
  "万": {
    formationType: "象形", confidence: "A",
    summaryTr: "Bugünkü 万, eski biçimi 萬'ın sadeleşmiş yazımıdır. 萬, bir akrebin resmidir; sonradan 'on bin' anlamında ödünç alınmıştır.",
    sources: [KP("0006573600")],
    disagreementNote:
      "TASLAK · İHTİLAF YOK. ESAS Kanjipedia 0006573600, 萬 için:「象形。さそり（蠆(たい)）の形にかたどる。"
      + "借りて、数詞の「まん」の意に用いる。」 ve 万'ın 「萬の略字」 olarak kullanıldığını belirtir. "
      + "|| ÇAPRAZ 説文解字 (萬 maddesi, 漢典'den fetch edilerek):「蟲也。从厹，象形。」 + 説文解字注: "
      + "「叚借爲十千數名」 (on bin sayısı için ödünç alınmıştır). → İki kaynak da aynı iki şeyi söylüyor: "
      + "(a) 萬 bir böceğin/akrebin resmidir — 説文 蟲 (böcek) der, Kanjipedia さそり/蠆 (akrep) diye "
      + "somutlaştırır; 蠆 zaten akrep demektir, çelişki yok. (b) sayı anlamı ÖDÜNÇTÜR (借りて / 叚借). "
      + "|| ORTOGRAFİK İLİŞKİ: 万'ın 萬 ile ilişkisi 説文'da yok (説文'da 万 maddesi bulunmuyor), ama "
      + "漢典 万 sayfası 萬'ı geleneksel biçim ve 異體字 olarak listeliyor → ilişki bağımsız olarak "
      + "teyitli. Tartışmalı bir iddia değil, ortografik olgu. "
      + "|| Üç iddianın hiçbirinde karşı görüş yok → confidence A (taslak). "
      + "|| ÜSLUP: kaynakta ses gerekçesi YOK, bu yüzden metinde de yok (Zeynep kararı 1). "
      + "Olumsuz kapanış eklenmedi (karar 2): 万'ın biçiminde 'on bin' beklentisi yaratan yanıltıcı "
      + "bir görsel yok. Terim olarak 'sadeleşmiş' seçildi — 円 ile aynı aile, ölçülen sabit terim."
  },
  "来": {
    formationType: "象形", confidence: "B",
    summaryTr: "Bugünkü 来, eski biçimi 來'den gelir. 來, başak vermiş bir buğdayın resmidir; sonradan 'gelmek' anlamında ödünç alınmıştır.",
    sources: [KP("0007020500")],
    disagreementNote:
      "TASLAK · MEKANİZMA ÇATALI VAR. ESAS Kanjipedia 0007020500:「旧字は、象形。麦がのぎを張った形に"
      + "かたどる。借りて「くる」意に用いる。教育用漢字は省略形による。」 → eski biçim 來 = başak vermiş "
      + "buğday resmi; 'gelmek' anlamı ÖDÜNÇ; bugünkü 来 sadeleşmiş biçim. "
      + "|| ÇAPRAZ 説文解字 (來 maddesi, 漢典'den fetch edilerek):「周所受瑞麥來麰。一來二縫，象芒朿之形。"
      + "**天所來也，故爲行來之來。**」 → RESİM AYNI (buğday/başak), ama ANLAM KAYMASININ MEKANİZMASI "
      + "FARKLI: Kanjipedia yalnız 借りて (ödünç) der, gerekçe vermez; 説文 ise bir ANLAM GEREKÇESİ "
      + "verir — 'gökten gelen (天所來) tahıl olduğu için gidip-gelmenin 來'si olmuştur'. "
      + "|| Bu, Han dönemi rasyonalizasyonu ile modern ödünç görüşünün ayrılmasıdır; ikisi aynı "
      + "olayı farklı mekanizmayla açıklıyor. Resim üzerinde ihtilaf YOK, mekanizmada VAR → "
      + "en zayıf halka → confidence B (taslak). "
      + "|| GÖRÜNÜR METİN ESAS'A UYAR: ödünç denildi; 説文'un 'gökten gelen tahıl' gerekçesi metne "
      + "ALINMADI (ana akım değil, ayrıca kaynak-tartışması kullanıcı metnine girmez). "
      + "|| ÜSLUP: ses gerekçesi yok (karar 1). Olumsuz kapanış yok (karar 2) — 来'nin biçiminde "
      + "'gelmek' beklentisi yaratan yanıltıcı görsel bulunmuyor."
  },
  "西": {
    formationType: "象形", confidence: "A",
    summaryTr: "Bir kuş yuvasının resmidir. Güneş batıya eğildiğinde kuşların yuvalarına dönmesinden 'batı' anlamı gelişmiştir.",
    sources: [KP("0003852100")],
    disagreementNote:
      "TASLAK · İHTİLAF YOK. ⚠️ BU KAYIT BİR 借りて (ÖDÜNÇ) KAYDI DEĞİLDİR. "
      + "|| ESAS Kanjipedia 0003852100:「象形。鳥の巣の形にかたどる。**太陽がにしに傾くころに鳥が巣に"
      + "帰ることから**、方角の「にし」の意に用いる。」 → 借りて kelimesi HİÇ GEÇMİYOR; kaynak gerçek bir "
      + "ANLAM BAĞI veriyor. "
      + "|| ÇAPRAZ 説文解字 (漢典'den fetch edilerek):「鳥在巢上。象形。**日在西方而鳥棲，故因以爲東西之西。**」 "
      + "→ BİREBİR aynı: kuş yuvada; güneş batıdayken kuşlar tüner, bu yüzden doğu-batının 'batı'sı "
      + "olarak kullanılır. İki kaynak hem resimde hem anlam bağında tam mutabık → confidence A (taslak). "
      + "|| ÜSLUP KARARI (Zeynep kararı 4): 西 Parti 12'de kalıyor ama 万/来'den FARKLI ev kalıbıyla "
      + "yazıldı — 'ödünç alınmıştır' DEĞİL, '…-den ... anlamı gelişmiştir' (男/名/分/半/赤/土/生/行 ile "
      + "aynı kilitli kapanış). Kaynakta ödünç yokken ödünç demek, olmayan bir mekanizma iddia etmek "
      + "olurdu. "
      + "|| Not: triage bu kaydı '借りて kümesi' sayıyordu; ESAS okuma düzeltti — triage ön hüküm değil "
      + "(dördüncü kez: 母 指事, 左 会意形声, 会意形声 zaten var, şimdi 西 ödünç değil)."
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

  /* Standart güvenceler */
  if (next.etymology.qaStatus !== "drafted") throw new Error(ch + ": qaStatus drafted olmalı");
  if (next.etymology.reviewedAt) throw new Error(ch + ": reviewedAt VERİLMEZ");
  if (["A","B"].indexOf(next.etymology.confidence) < 0) throw new Error(ch + ": taslak confidence A/B bekleniyor");
  if (TYPES.indexOf(next.etymology.formationType) < 0) throw new Error(ch + ": geçersiz formationType");
  if (next.mnemonic.status !== "pending_review") throw new Error(ch + ": mnemonic pending_review olmalı");
  if (next.etymology.sources.length !== 1) throw new Error(ch + ": tek kaynak künyesi bekleniyor");
  if (!/kanjipedia\.jp\/kanji\/\d{10}$/.test(next.etymology.sources[0])) throw new Error(ch + ": kaynak URL biçimi hatalı");
  if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error(ch + ": components değişmemeli");
  if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error(ch + ": component_meanings değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");
  if (next.etymology.summaryTr === (next.memory_hint_tr || "")) throw new Error(ch + ": Kökeni ile Hafıza aynı olamaz");

  /* ── Parti 12'ye özel: kilitlenen beş kararın makine güvenceleri ── */
  // Karar 1: kaynakta olmayan ses gerekçesi hiçbir yerde geçemez
  if (SES_GEREKCESI.test(next.etymology.summaryTr)) throw new Error(ch + ": KARAR 1 ihlali — ses gerekçesi summaryTr'ye giremez");
  if (SES_GEREKCESI.test(next.etymology.disagreementNote)) throw new Error(ch + ": KARAR 1 ihlali — ses gerekçesi notta da kullanılmamalı");
  // Karar 3: 万'ın su mercimeği hattı NE summaryTr'ye NE disagreementNote'a girer
  if (ch === "万") {
    if (/su mercimeği|うき草|mercimek/i.test(next.etymology.summaryTr)) throw new Error("万: KARAR 3 ihlali — su mercimeği hattı summaryTr'ye giremez");
    if (/su mercimeği|うき草|mercimek/i.test(next.etymology.disagreementNote)) throw new Error("万: KARAR 3 ihlali — su mercimeği hattı disagreementNote'a da giremez");
    if (!/sadeleş/i.test(next.etymology.summaryTr)) throw new Error("万: ölçülen sabit terim 'sadeleş…' kullanılmalı (円 ailesi)");
  }
  // Karar 4: 西 ödünç kalıbıyla yazılmaz; 万/来 yazılır
  if (ch === "西" && /ödünç/i.test(next.etymology.summaryTr)) throw new Error("西: KARAR 4 ihlali — 西 bir ödünç kaydı değil, summaryTr'de 'ödünç' geçemez");
  if ((ch === "万" || ch === "来") && !/ödünç alınmıştır/i.test(next.etymology.summaryTr)) throw new Error(ch + ": ödünç kalıbı (B) kullanılmalı");
  // Karar 2: olumsuz kapanış bu üçünde kullanılmamalı
  if (/göstermez|resmetmez|bağı yoktur/i.test(next.etymology.summaryTr)) throw new Error(ch + ": KARAR 2 — bu kayıtlarda olumsuz kapanış gerekmiyor");
  // "eski biçim" terimi 万/来'de sabit
  if ((ch === "万" || ch === "来") && !/eski biçim/i.test(next.etymology.summaryTr)) throw new Error(ch + ": 'eski biçim' sabit terimi kullanılmalı");

  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error(ch + ": kayıt kaynakta bire bir bulunamadı");
  src = src.replace(oldSub, JSON.stringify(next));
  applied.push({ ch, id, conf: spec.confidence, len: ETY.summaryTr.length });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 12 DRAFTED yazıldı (3 kayıt, hepsi 象形, qaStatus=drafted, KULLANICIYA KAPALI):");
for (const a of applied) console.log("  " + a.ch + " (" + a.id + ") · conf " + a.conf + " · summaryTr " + a.len + " kr · mnemonic pending_review");
console.log("Üslup: 万/来 = ödünç kalıbı (B, ses gerekçesi YOK) · 西 = anlam bağı kalıbı (ödünç DEĞİL)");
console.log("reviewedAt YOK · reviewed + mnemonic kararı AYRI turda (Zeynep).");
