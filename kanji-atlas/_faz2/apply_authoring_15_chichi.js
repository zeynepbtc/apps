/* AUTHORING · KIRMIZI KUYRUK TURU 1 · 父 — TEK KAYIT (DRAFTED, KULLANICIYA GİZLİ).
   Zeynep sırası: 父 → 南 → 今 → 白 ("en zor dosyayı sona bırak" değil, "en olgun metodolojiyle
   ele al"). Kırmızı kuyruk = "ek kanıt gerektiren", yayınlanamaz değil.

   B0 (ölçüldü): 父 BOŞ (etymology/pictogram_note/memory_hint_tr/mnemonic yok, components boş).
   İlgili kayıtlar: 母 VAR; 又 · 斧 · 杖 · 交 · 文 uygulamada YOK.

   ── DÖRT KAYNAK OKUNDU (ek kanıt turu — hepsi FETCH EDİLDİ) ───────────────────────────────
   1. ESAS Kanjipedia 0006017800:「会意。[手]（手）と、丨（**おの**）とから成る。「**斧(フ)」の原字**。
      **武器**を手に持っているさまにより、**一族をとりしまる者**、ひいて「ちち」の意を表す。」
      → 会意 · elde BALTA · 父, 斧'nin özgün karakteri · silah tutan → aileyi yöneten → baba
   2. 説文解字 (漢典):「矩也。家長率教者。**从又舉杖**。」
      → elde DEĞNEK (杖) · aileyi yöneten ve ÖĞRETEN kişi
   3. Wiktionary (glyph origin): "Pictogram (象形) – A hand holding a stone, referring to a man
      working with a **stone axe**." → 象形 · elde TAŞ BALTA
   4. OKJiten kanji27:「「手に**ムチ**を持つ」象形から、「一族の統率者、ちち」…」 → 象形 · elde KAMÇI
      (ikinci paragrafta 斧 de anılıyor)
   ──────────────────────────────────────────────────────────────────────────────────────────

   ── İDDİA BAZINDA DURUM ───────────────────────────────────────────────────────────────────
   (a) Bir EL ve elin tuttuğu bir NESNE var          → DÖRDÜ DE aynı fikirde  = A
   (b) Bu nesneyi tutan kişi AİLEYİ YÖNETEN kişidir,
       oradan "baba" anlamı gelişmiştir              → Kanjipedia · 説文 · OKJiten açıkça;
                                                        Wiktionary yalnız betimliyor = A/B
   (c) NESNE NEDİR?                                  → **ÇATAL**: balta (Kanjipedia + Wiktionary)
                                                        vs değnek/kamçı (説文 + OKJiten)     = C
   (d) OLUŞUM TÜRÜ                                   → **ÇATAL**: 会意 (Kanjipedia) vs
                                                        象形 (Wiktionary + OKJiten)          = C
   ──────────────────────────────────────────────────────────────────────────────────────────

   TASLAK KARARI: görünür metin ESAS'ı izler (balta), çünkü desen tanıdıktır — modern uzlaşı
   (Kanjipedia + Wiktionary, 甲骨 delilleri) ile 説文'un Han dönemi yorumu ayrışıyor; 行 (kavşak vs
   彳+亍), 来 (ödünç vs 天所來) ve 土 (yığın vs katman) turlarında da ESAS izlenip B verilmişti.
   Ek yapısal delil: 斧 = 斤 + 父 → 父'nin balta olması 斧'yi açıklar (ESAS'ın 「斧の原字」 iddiası).
   OKJiten daha önce (九, 口, 名) bağımsız/belirleyici sayılmadı.
   confidence TASLAK = **B**. QA raporunda Zeynep'e İKİ ALTERNATİF de sunuluyor:
     (A) ESAS'ı izle, balta yaz, B ile yayınla  [bu taslak]
     (B) Nesneyi hiç yazma, yalnız üzerinde uzlaşılan çekirdeği ver ("bir alet tutan el → aileyi
         yöneten kişi → baba"); o zaman yayınlanan iddialar A/B olur
     (C) 九 gibi drafted'da bırak, yayınlama
   ⚠️ Not: 九'da Zeynep "yarım metin yayınlamaktansa boş bırak" demişti. 父'de FARK: tartışmalı
   ayrıntı çıkarılınca geriye YARIM DEĞİL, tam ve anlamlı bir açıklama kalıyor (el + otorite → baba).
   Bu yüzden (B) seçeneği 九'daki durumdan farklıdır ve gerçekten masadadır. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);

const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === "父");
if (!id) throw new Error("父 bulunamadı");
const rec = DATA.chars[id];
if (rec.etymology) throw new Error("父 zaten etymology taşıyor");
if (rec.mnemonic) throw new Error("父 zaten mnemonic taşıyor");
if ((rec.pictogram_note || "").trim()) throw new Error("父 legacy — B0 ihlali");

const ETY = {
  formationType: "会意",
  formationTypeSource: "Kanjipedia",
  confidence: "B",
  summaryTr: "Balta tutan bir eli gösterir. Elinde silah bulunduran, aileyi yöneten kişiden 'baba' anlamı gelişmiştir.",
  sources: ["https://www.kanjipedia.jp/kanji/0006017800"],
  disagreementNote:
    "TASLAK · KIRMIZI KUYRUK TURU — GERÇEK ÇATAL VAR, dört kaynak okundu. "
    + "|| ESAS Kanjipedia 0006017800:「会意。[手]（手）と、丨（**おの**）とから成る。「**斧(フ)」の原字**。"
    + "武器を手に持っているさまにより、一族をとりしまる者、ひいて「ちち」の意を表す。」 → elde BALTA. "
    + "|| ÇAPRAZ 1 · 説文解字 (漢典'den fetch edilerek):「矩也。家長率教者。**从又舉杖**。」 → elde "
    + "DEĞNEK (杖); ayrıca otorite gerekçesi 'yöneten ve ÖĞRETEN' (率教) biçiminde, silah değil. "
    + "|| ÇAPRAZ 2 · Wiktionary (glyph origin, fetch edilerek): 「Pictogram (象形) – A hand holding a "
    + "stone, referring to a man working with a **stone axe**.」 → elde TAŞ BALTA, ama oluşum 象形. "
    + "|| ÇAPRAZ 3 · OKJiten kanji27 (fetch edilerek):「「手に**ムチ**を持つ」象形から、「一族の統率者、"
    + "ちち」…」 → elde KAMÇI, oluşum 象形. (OKJiten daha önce 九/口/名 turlarında bağımsız ve "
    + "belirleyici sayılmamıştı; burada da teyit edici değil, dördüncü ses.) "
    + "|| ===== İDDİA BAZINDA ===== "
    + "(a) el + tutulan bir nesne → DÖRDÜ DE aynı fikirde = A. "
    + "(b) nesneyi tutan kişi aileyi yöneten kişidir → 'baba' → Kanjipedia, 説文 ve OKJiten açıkça "
    + "söylüyor (Wiktionary yalnız betimliyor) = A/B. "
    + "(c) NESNE NEDİR → **ÇATAL**: balta (Kanjipedia + Wiktionary) vs değnek/kamçı (説文 + OKJiten) "
    + "= C. "
    + "(d) OLUŞUM TÜRÜ → **ÇATAL**: 会意 (Kanjipedia) vs 象形 (Wiktionary + OKJiten) = C. "
    + "|| TASLAK GEREKÇESİ: görünür metin ESAS'ı izliyor (balta). Desen tanıdık — modern uzlaşı "
    + "(Kanjipedia + Wiktionary, 甲骨 delilleri) ile 説文'un Han dönemi yorumu ayrışıyor; 行, 来 ve 土 "
    + "turlarında da ESAS izlenip B verilmişti. Ek yapısal delil: 斧 = 斤 + 父, yani 父'nin balta "
    + "olması 斧'yi açıklar (ESAS'ın 「斧の原字」 iddiası). "
    + "|| ⚠️ ZEYNEP KARARI BEKLİYOR — üç seçenek QA raporunda: (A) bu taslak (ESAS'ı izle, balta yaz, "
    + "B ile yayınla) · (B) nesneyi hiç yazma, yalnız uzlaşılan çekirdeği ver · (C) 九 gibi drafted'da "
    + "bırak. 九'dan FARK: tartışmalı ayrıntı çıkarılınca geriye yarım değil, TAM bir açıklama kalıyor "
    + "(el + otorite → baba) — bu yüzden (B) gerçekten masadadır. "
    + "|| GÖRÜNÜR METİN KARARLARI: 斧 metne KONMADI (uygulamada yok, kanıt değeri var ama öğrenene "
    + "yük); 'silah' ifadesi ESAS'ın 武器 karşılığıdır; oluşum türü çatalı metne girmedi (teknik "
    + "terim zaten görünür metinde kullanılmaz).",
  qaStatus: "drafted"
};

const next = Object.assign({}, rec, { etymology: ETY, mnemonic: { status: "pending_review" } });

if (next.etymology.qaStatus !== "drafted") throw new Error("qaStatus drafted olmalı");
if (next.etymology.reviewedAt) throw new Error("reviewedAt VERİLMEZ");
if (next.mnemonic.status !== "pending_review") throw new Error("mnemonic pending_review olmalı");
if (!/kanjipedia\.jp\/kanji\/\d{10}$/.test(next.etymology.sources[0])) throw new Error("kaynak URL biçimi hatalı");
if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error("components değişmemeli");
if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error("component_meanings değişmemeli");
if (next.pictogram_note !== rec.pictogram_note) throw new Error("pictogram_note değişmemeli");
if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error("memory_hint_tr değişmemeli");
if (next.etymology.summaryTr === (next.memory_hint_tr || "")) throw new Error("Kökeni ile Hafıza aynı olamaz");
/* Tur güvenceleri */
if (/değnek|sopa|kamçı/i.test(next.etymology.summaryTr)) throw new Error("父: taslak ESAS'ı izler (balta); rakip okuma metne giremez");
if (/kesin değil|farklı görüş|tartışmalı/i.test(next.etymology.summaryTr)) throw new Error("父: tartışma dili kullanıcı metnine giremez");

const oldSub = JSON.stringify(rec);
if (!src.includes(oldSub)) throw new Error("kayıt kaynakta bire bir bulunamadı");
src = src.replace(oldSub, JSON.stringify(next));
fs.writeFileSync(INDEX, src);
console.log("父 (" + id + ") DRAFTED · 会意 · confidence B (TASLAK) · qaStatus=drafted (KULLANICIYA KAPALI)");
console.log("summaryTr (" + ETY.summaryTr.length + " kr): " + ETY.summaryTr);
console.log("disagreementNote: " + ETY.disagreementNote.length + " kr · dört kaynak okundu");
console.log("⚠️ ZEYNEP KARARI: (A) balta yaz+yayınla · (B) nesneyi yazma, çekirdeği ver · (C) drafted'da bırak");
