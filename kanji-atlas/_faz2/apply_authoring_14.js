/* AUTHORING Parti 14 · 北 青 飲 — SON TEMİZ ÜÇLÜ (DRAFTED, KULLANICIYA GİZLİ).
   Ön-tarama önce yapıldı; parti kesin liste oluştuktan SONRA yazıldı. Üçü de yönetilebilir çıktı
   → bileşim değişmedi. Bu parti kapanınca PHASE 2'de yalnız KIRMIZI KUYRUK kalır (白 今 父 南).

   B0 (ölçüldü): üçü de BOŞ. Karışıklık ortakları: 比 化 丹 井 欠 飯 背 uygulamada YOK; 生 食 南 VAR.

   ── KAYNAK TEYİDİ (ESAS Kanjipedia + 説文解字 漢典'den FETCH EDİLEREK) ──────────────────────
   北 0006467400「象形。たがいに背を向け合っているふたりのさまにかたどり、そむく意を表す。「背(ハイ)」の
        原字。ひいて、太陽がある南を向いたときに、背の向く方角、「きた」の意に用いる。」
      説文「乖也。从二人相背。」 → RESİM ve ÖZGÜN ANLAM birebir; ama 説文 'kuzey'i HİÇ AÇIKLAMIYOR
        (yalnız 引伸 olarak askerî geri çekilmeye değiniyor) → 'kuzey' mekanizması TEK KAYNAKLI → B
   青 0003865600「旧字は、会意形声。丹（井の中からとる染料）と、生(セイ)（…は変わった形。草が生えるさま）
        とから成り、草色をした染料、「あお」「あおい」意を表す。教育用漢字は俗字による。」
      説文「東方色也。木生火，从生丹。丹青之信言象然。」 → BİLEŞENLER AYNI (生+丹) ama 説文 hiçbirini
        聲 İŞARETLEMİYOR (会意 okur) ve anlam gerekçesi FARKLI (五行 kozmolojisi: doğu rengi, ağaç
        ateşi doğurur) — Kanjipedia ise maddi gerekçe verir (ot renginde boya) → ÇATAL → B
   飲 0000297300「本字は、会意形声。欠(けん)（口を大きくあける）と、酓(イム、オム)（酒をのむ）とから成る。
        酒を「のむ」意を表す。のち、酓を食に改めて、会意の字とした。」
      説文 (㱃 başlığı altında)「歠也。从欠酓聲。」 → 本字 analizi BİREBİR (欠 + 酓聲, 'içmek') → A
   ──────────────────────────────────────────────────────────────────────────────────────────

   ── ÖNEMLİ BULGU: 北 de 借りて DEĞİL ──────────────────────────────────────────────────────
   Beklenti "北 kuzey için ödünç alındı" idi. Kanjipedia 借りて kelimesini KULLANMIYOR; 「ひいて」 ile
   gerçek bir ANLAM BAĞI veriyor: güneşin olduğu güneye dönüldüğünde sırtın baktığı yön = kuzey.
   → 西 ile aynı sınıf. Ödünç kalıbı DEĞİL, anlam-bağı kalıbı kullanıldı (AUTHORING-04 çatısı).
   Triage'ın ön hüküm olmadığının BEŞİNCİ kanıtı (母 指事 · 左 会意形声 · 会意形声 zaten vardı ·
   西 ödünç değil · şimdi 北 ödünç değil).
   ──────────────────────────────────────────────────────────────────────────────────────────

   ── OLUŞUM TÜRÜ KARARI · 飲 ───────────────────────────────────────────────────────────────
   Kanjipedia 本字'ı 会意形声 diye etiketler AMA açıkça 「のち、酓を食に改めて、**会意の字とした**」 der.
   Bugünkü 飲 = 食 + 欠 ve kaynak bu biçimi 会意 sayar → kayıt **会意**.
   (年'den farkı ilkeseldir: 年'de modern biçim 本字'ın DEĞİŞMİŞ hâlidir — yapı korunur, o yüzden
   形声 alındı. 飲'de yapı GERÇEKTEN değişti — bileşen değiştirildi — o yüzden 会意 alındı.)
   ──────────────────────────────────────────────────────────────────────────────────────────

   SES YAZMA (çatı ilke — kaynağın sesi okunuşla örtüşüyor mu?):
     北: 象形 — ses bileşeni yok → konu dışı
     青: 生(セイ) ↔ 青 = セイ ✓ ÖRTÜŞÜYOR → ses YAZILDI
     飲: 酓(イム、オム) ↔ 飲 = イン ✗ örtüşmüyor; ayrıca 酓 bugünkü biçimde YOK ve kayıt 会意
         → ses YAZILMADI

   TERMİNOLOJİ · YENİ DURUM (Zeynep onayı gerekiyor — QA raporunda): 青 için kaynak 「俗字」 diyor.
   Bu, mevcut iki sabitten (省略形→"sadeleşmiş" · 変わった形→"değişmiş") FARKLI bir üçüncü kategori.
   Taslakta **"yaygınlaşmış biçim"** kullanıldı; onaya sunuluyor. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);
const KP = id => "https://www.kanjipedia.jp/kanji/" + id;
const TYPES = ["象形", "指事", "会意", "形声", "会意形声"];

const RECORDS = {
  "北": {
    formationType: "象形", confidence: "B",
    summaryTr: "Birbirine sırtını dönmüş iki kişinin resmidir; önce 'sırt çevirmek' anlamındaydı. Güneşin bulunduğu güneye dönüldüğünde sırtın baktığı yön olduğu için 'kuzey' anlamı gelişmiştir.",
    sources: [KP("0006467400")],
    disagreementNote:
      "TASLAK · RESİM ve ÖZGÜN ANLAM tartışmasız; 'kuzey' mekanizması TEK KAYNAKLI. "
      + "|| ESAS Kanjipedia 0006467400:「象形。たがいに背を向け合っているふたりのさまにかたどり、そむく意を"
      + "表す。「背(ハイ)」の原字。ひいて、太陽がある南を向いたときに、背の向く方角、「きた」の意に用いる。」 "
      + "|| ÇAPRAZ 説文解字 (漢典'den fetch edilerek):「乖也。从二人相背。」 → resim (sırt sırta iki kişi) "
      + "ve özgün anlam (aykırılık / sırt çevirme) BİREBİR aynı. "
      + "|| ÇATAL DEĞİL, EKSİKLİK: 説文 'kuzey' anlamının nasıl doğduğunu **hiç açıklamıyor** (yalnız "
      + "引伸 olarak askerî geri çekilmeye değinir). Güneye dönünce sırtın kuzeyi göstermesi gerekçesi "
      + "YALNIZ Kanjipedia'da. Bu gerekçe metnin taşıyıcı iddiasıdır → en zayıf halka → confidence B. "
      + "(右'daki 'sağ anlamı sonradan' durumuyla aynı sınıf.) "
      + "|| ⚠️ 北 BİR 借りて KAYDI DEĞİLDİR: Kanjipedia 借りて kelimesini kullanmıyor, 「ひいて」 ile "
      + "gerçek bir ANLAM BAĞI veriyor. Bu yüzden ödünç kalıbı DEĞİL, 西'deki anlam-bağı kalıbı "
      + "kullanıldı ('…-den … anlamı gelişmiştir'). "
      + "|| 'İki kişi' ifadesi kaynağın kendi ifadesidir (「ふたりのさま」) — 後'deki yasaklı 'iki kişi' "
      + "hikâyesiyle karıştırılmamalı; orada kaynakta YOKTU, burada VAR."
  },
  "青": {
    formationType: "会意形声", confidence: "B",
    summaryTr: "Eski biçimi, kuyudan çıkarılan bir boyayı gösteren 丹 ile otların bitişini gösteren ve セイ sesini veren 生'den oluşur. Ot rengindeki bu boyadan 'mavi, yeşil' anlamı gelişmiştir; bugünkü 青 eski biçimin yaygınlaşmış hâlidir.",
    sources: [KP("0003865600")],
    disagreementNote:
      "TASLAK · ÇATAL VAR. ESAS Kanjipedia 0003865600:「**旧字は、会意形声**。丹（**井の中からとる染料**）と、"
      + "生(セイ)（…は変わった形。**草が生えるさま**）とから成り、**草色をした染料**、「あお」「あおい」意を"
      + "表す。**教育用漢字は俗字による。**」 "
      + "|| ÇAPRAZ 説文解字 (漢典'den fetch edilerek):「東方色也。木生火，**从生丹**。丹青之信言象然。」 "
      + "|| BİLEŞENLER AYNI (生 + 丹) — TRIAGE SORUSU ÇÖZÜLDÜ: bileşen **丹**'dır; 井 yalnız 丹'ın ne "
      + "olduğunu anlatan açıklamanın içinde geçer (kuyudan çıkarılan boya), ayrı bir bileşen DEĞİLDİR. "
      + "|| İKİ ÇATAL: (a) 説文 ne 生'i ne 丹'ı `聲` işaretler → saf 会意 okur; Kanjipedia 生'i hem anlam "
      + "hem SES sayar (会意形声). (b) ANLAM GEREKÇESİ farklı: Kanjipedia maddi bir gerekçe verir "
      + "(ot renginde boya); 説文 五行 kozmolojisine dayanır (doğunun rengi; ağaç ateşi doğurur). "
      + "→ en zayıf halka → confidence B. "
      + "|| SES YAZILDI: 生(セイ) ↔ 青'nin okunuşu セイ — örtüşüyor (çatı ilke). "
      + "|| ⚠️ TERMİNOLOJİ · ONAY BEKLİYOR: kaynak bugünkü biçim için 「**俗字**」 diyor — mevcut iki "
      + "sabitten farklı ÜÇÜNCÜ bir kategori (省略形→'sadeleşmiş' · 変わった形→'değişmiş'). Taslakta "
      + "**'yaygınlaşmış hâli'** kullanıldı; Zeynep onayına sunuldu (QA raporu)."
  },
  "飲": {
    formationType: "会意", confidence: "A",
    summaryTr: "Eski biçimi, ağzını iyice açan bir kişiyi gösteren 欠 ile 'içki içmek' anlamı taşıyan bir parçadan oluşur; 'içmek' anlamı buradan gelir. Sonradan o parça 食 ile değiştirilmiş, bugünkü 飲 böyle oluşmuştur.",
    sources: [KP("0000297300")],
    disagreementNote:
      "TASLAK · İHTİLAF YOK. ESAS Kanjipedia 0000297300:「**本字は、会意形声**。欠(けん)（**口を大きく"
      + "あける**）と、酓(イム、オム)（**酒をのむ**）とから成る。酒を「のむ」意を表す。**のち、酓を食に改めて、"
      + "会意の字とした。**」 "
      + "|| ÇAPRAZ 説文解字 (**㱃** başlığı altında, 漢典'den fetch edilerek):「**歠也。从欠酓聲。**」 → "
      + "本字 analizi BİREBİR aynı (欠 + 酓 ses, anlam 'içmek'). İhtilaf yok → confidence A. "
      + "|| OLUŞUM TÜRÜ KARARI: kayıt **会意** olarak yazıldı, 会意形声 değil. Sebep kaynağın kendi "
      + "ifadesi: 本字 会意形声'dir AMA 「のち、酓を食に改めて、**会意の字とした**」 — bugünkü 飲 (食+欠) "
      + "kaynak tarafından 会意 sayılır. 年'den ilkesel fark: 年'de modern biçim 本字'ın DEĞİŞMİŞ hâlidir "
      + "(yapı korunur → 形声 alındı); 飲'de yapı GERÇEKTEN değişti (bileşen değiştirildi → 会意). "
      + "|| SES YAZILMADI: 酓(イム、オム) ↔ 飲 = イン örtüşmüyor; ayrıca 酓 bugünkü biçimde YOK ve kayıt "
      + "会意 (ses bileşeni yok) → ses yazmak yanlış olurdu. "
      + "|| 食 GLOSS EDİLMEDİ: kaynak 酓'nin 食 ile değiştirildiğini söylüyor ama 食'in bu karakterdeki "
      + "işlevini AÇIKLAMIYOR. 'Yiyecek anlamı verir' demek kaynağın ötesine geçmek olurdu → 食 "
      + "adlandırıldı, anlamı yazılmadı (kullanıcı 食 kaydına gidebilir, o kayıt reviewed)."
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
    formationType: spec.formationType, formationTypeSource: "Kanjipedia",
    confidence: spec.confidence, summaryTr: spec.summaryTr,
    sources: spec.sources, disagreementNote: spec.disagreementNote, qaStatus: "drafted"
  };
  const next = Object.assign({}, rec, { etymology: ETY, mnemonic: { status: "pending_review" } });

  /* Standart güvenceler */
  if (next.etymology.qaStatus !== "drafted") throw new Error(ch + ": qaStatus drafted olmalı");
  if (next.etymology.reviewedAt) throw new Error(ch + ": reviewedAt VERİLMEZ");
  if (["A","B"].indexOf(next.etymology.confidence) < 0) throw new Error(ch + ": taslak confidence A/B bekleniyor");
  if (TYPES.indexOf(next.etymology.formationType) < 0) throw new Error(ch + ": geçersiz formationType");
  if (next.mnemonic.status !== "pending_review") throw new Error(ch + ": mnemonic pending_review olmalı");
  if (!/kanjipedia\.jp\/kanji\/\d{10}$/.test(next.etymology.sources[0])) throw new Error(ch + ": kaynak URL biçimi hatalı");
  if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error(ch + ": components değişmemeli");
  if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error(ch + ": component_meanings değişmemeli");
  if (next.pictogram_note !== rec.pictogram_note) throw new Error(ch + ": pictogram_note değişmemeli");
  if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error(ch + ": memory_hint_tr değişmemeli");
  if (next.etymology.summaryTr === (next.memory_hint_tr || "")) throw new Error(ch + ": Kökeni ile Hafıza aynı olamaz");

  /* Parti 14'e özel güvenceler */
  if (ch === "北") {
    if (/ödünç/i.test(next.etymology.summaryTr)) throw new Error("北: 借りて kaydı DEĞİL — 'ödünç' metne giremez (西 ile aynı sınıf)");
    if (!/anlamı gelişmiştir/i.test(next.etymology.summaryTr)) throw new Error("北: anlam-bağı kalıbı kullanılmalı");
  }
  if (ch === "青") {
    if (!/eski biçim/i.test(next.etymology.summaryTr)) throw new Error("青: bileşenler bugünkü biçimde görünmüyor → 'eski biçim' çerçevesi zorunlu");
    if (/井/.test(next.etymology.summaryTr)) throw new Error("青: 井 ayrı bir bileşen DEĞİL (yalnız 丹'ın açıklamasında) — metne giremez");
    if (/sadeleşmiş|değişmiş hâli/i.test(next.etymology.summaryTr)) throw new Error("青: kaynak 俗字 diyor — 省略形/変わった形 terimleri kullanılmamalı");
  }
  if (ch === "飲") {
    if (/イン|イム|オム/.test(next.etymology.summaryTr)) throw new Error("飲: ses örtüşmüyor + kayıt 会意 → ses yazılmamalı");
    if (!/eski biçim/i.test(next.etymology.summaryTr)) throw new Error("飲: eski biçim çerçevesi zorunlu");
    if (/食 yiyecek|yiyecek anlamı veren 食/i.test(next.etymology.summaryTr)) throw new Error("飲: kaynak 食'in işlevini açıklamıyor — gloss eklenemez");
  }

  const oldSub = JSON.stringify(rec);
  if (!src.includes(oldSub)) throw new Error(ch + ": kayıt kaynakta bire bir bulunamadı");
  src = src.replace(oldSub, JSON.stringify(next));
  applied.push({ ch, id, conf: spec.confidence, type: spec.formationType, len: ETY.summaryTr.length });
}

fs.writeFileSync(INDEX, src);
console.log("Parti 14 DRAFTED yazıldı (3 kayıt, qaStatus=drafted, KULLANICIYA KAPALI):");
for (const a of applied) console.log("  " + a.ch + " (" + a.id + ") · " + a.type + " · conf " + a.conf + " · summaryTr " + a.len + " kr · mnemonic pending_review");
console.log("北: 借りて DEĞİL (anlam bağı) · 青: bileşen 丹 (井 değil) + 俗字 terim onayı bekliyor · 飲: 会意 (yapı gerçekten değişti)");
console.log("reviewedAt YOK · reviewed + mnemonic kararı AYRI turda (Zeynep).");
