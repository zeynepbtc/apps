/* AUTHORING · KIRMIZI KUYRUK TURU 1 · 父 — REVIEWED ONAYI (Zeynep, 2026-07-25).
   KARAR: **(B)** — nesne adlandırılmaz; yalnız dört kaynağın uzlaştığı çekirdek yayımlanır.

   ── BU TURUN AÇTIĞI EMSAL (yeni; kalıcı) ──────────────────────────────────────────────────
   İlk kez, ESAS kaynağın (Kanjipedia) verdiği BİR AYRINTI, çapraz kaynaklarla uzlaşmadığı ve
   metnin anlaşılması için ZORUNLU olmadığı için görünür metne ALINMADI.
   Zeynep: "Kullanıcıya gösterilen hiçbir cümle tartışmalı değil… Bu, 'yayınlanan iddia' ile
   'araştırma notu'nu birbirinden ayıran editoryal yaklaşım."
   → Bugüne kadarki desen (行, 来, 土): ESAS ile 説文 ayrışınca ESAS izlenir, confidence B.
     BURADAKİ FARK: ayrışan şey KAYDIN OMURGASI değil, ÇIKARILABİLİR bir ayrıntı. Omurga
     (el → alet → otorite → baba) çıkarınca da AYAKTA kalıyor. 九'dan ayıran da tam olarak budur:
     九'da tartışmalı kısım çıkarılınca köken çöküyordu; burada çökmüyor.
   → Test sırası (Zeynep'in "kaynak kadar konuş" uygulaması):
       (a) el ✅ ortak · (b) elde bir nesne ✅ ortak · (c) otorite ✅ ortak · (d) baba ✅ ortak
       (e) nesne BALTA mı? ❌ ortak DEĞİL → **tam burada durulur**.

   ── CONFIDENCE B → A (bilinçli yükseltme, gerekçeli) ──────────────────────────────────────
   Taslak B idi çünkü görünür metin tartışmalı ayrıntıyı (balta) taşıyordu.
   (B) uygulandığında görünür metindeki HER İDDİA A/A-B sınıfına düşüyor.
   Zeynep kararı: "confidence artık görünür metnin doğruluğunu temsil ediyor" → **A**.
   ⚠️ Bu, confidence'ın anlamının kayıt bazında netleştiği ilk yer: confidence = YAYIMLANAN
   metnin kaynak desteği; araştırmanın tümünün kesinliği değil.
   Kayıt KIRMIZI KUYRUKTAN gelmiş olmayı sürdürür (ayrıntı hâlâ tartışmalı) — ama tartışmalı
   ayrıntı yayımlanmadığı için yayımlanan içeriğin güvenilirliği A'dır.

   ── METİN (Zeynep dil dokunuşu) ───────────────────────────────────────────────────────────
   Önerim: "…elinde güç bulunduran…" → Zeynep: "güç" Türkçede burada soyut kalıyor, **"otorite"**
   daha doğal. Ayrıca "Aileyi yöneten VE elinde otorite bulunduran" bağlacı kabul edildi.

   ── DEĞİŞENLER ────────────────────────────────────────────────────────────────────────────
   summaryTr YENİDEN YAZILDI (balta çıktı) · confidence B→A · qaStatus drafted→reviewed ·
   +reviewedAt (Git'ten) · mnemonic → not_required · disagreementNote'a onay izi.
   formationType (会意/Kanjipedia) DEĞİŞMEZ — saf editör metadatası, hiç render edilmez; oluşum
   türü çatalı (会意 vs 象形) notta duruyor.
   components / component_meanings / pictogram_note / memory_hint_tr DOKUNULMAZ. */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const INDEX = path.join(__dirname, "..", "index.html");

const GIT_DATE = cp.execSync("git log -1 --format=%cd --date=short", { cwd: ROOT }).toString().trim();
if (!/^\d{4}-\d{2}-\d{2}$/.test(GIT_DATE)) throw new Error("git tarihi okunamadı: " + GIT_DATE);

const NEW_SUMMARY = "Elinde bir alet tutan kişiyi gösterir. Aileyi yöneten ve elinde otorite bulunduran kişiden 'baba' anlamı gelişmiştir.";

let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);

const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === "父");
if (!id) throw new Error("父 bulunamadı");
const rec = DATA.chars[id];
const e = rec.etymology;
if (!e) throw new Error("父 etymology taşımıyor — önce apply_authoring_15_chichi.js");
if (e.qaStatus !== "drafted") throw new Error("父: beklenen drafted, gelen " + e.qaStatus);
if (e.reviewedAt) throw new Error("父: reviewedAt zaten var — bu betik iki kez koşmaz");
if (e.confidence !== "B") throw new Error("父: taslak confidence B olmalıydı, gelen " + e.confidence);
if (!/Balta/.test(e.summaryTr)) throw new Error("父: taslak metin beklenen hâlde değil (balta içermeli)");
if (!rec.mnemonic || rec.mnemonic.status !== "pending_review") throw new Error("父: mnemonic pending_review bekleniyor");

const APPROVAL =
  " || ===== REVIEWED ONAYI (Zeynep, " + GIT_DATE + ") · KARAR: SEÇENEK (B) ===== "
  + "Görünür metinden TARTIŞMALI AYRINTI (nesnenin ne olduğu) ÇIKARILDI. "
  + "ESKİ TASLAK METİN: \"" + e.summaryTr + "\" (" + e.summaryTr.length + " kr) → YAYIMLANAN: \""
  + NEW_SUMMARY + "\" (" + NEW_SUMMARY.length + " kr). "
  + "|| GEREKÇE (Zeynep, 'kaynak kadar konuş' testi): (a) el ✅ ortak · (b) elde bir nesne ✅ ortak · "
  + "(c) otorite ✅ ortak · (d) 'baba' anlamı ✅ ortak · (e) nesne BALTA mı? ❌ ORTAK DEĞİL → burada durulur. "
  + "Nesnenin kimliği metnin anlaşılması için zorunlu bilgi değil; çıkarılınca köken zinciri "
  + "(el → alet → otorite → baba) tamamen ayakta kalıyor. "
  + "|| CONFIDENCE B → **A** (bilinçli yükseltme): taslak B idi çünkü görünür metin tartışmalı "
  + "ayrıntıyı taşıyordu; (B) ile yayımlanan HER iddia A/A-B sınıfında. Zeynep: 'confidence artık "
  + "görünür metnin doğruluğunu temsil ediyor.' Kayıt kırmızı kuyruktan gelmeyi sürdürür — ayrıntı "
  + "hâlâ tartışmalı — ama tartışmalı ayrıntı YAYIMLANMIYOR. "
  + "|| ⭐ EMSAL (yeni, kalıcı): İlk kez ESAS kaynağın verdiği bir ayrıntı, çapraz kaynaklarla "
  + "uzlaşmadığı ve çıkarılabilir olduğu için görünür metne alınmadı. 行/来/土 desenden AYRILMA "
  + "değil, onun sınırının çizilmesidir: orada ayrışan şey kaydın OMURGASIYDI (çıkarılırsa metin "
  + "kalmaz), burada çıkarılabilir bir AYRINTI. 九'dan fark da budur. "
  + "|| DİL: 'elinde güç bulunduran' → 'elinde otorite bulunduran' (Zeynep: 'güç' burada soyut kalıyor). "
  + "|| MNEMONIC (4-soru, otomatik değil): T1 köken bugünkü anlamı taşıyor mu? → EVET, el+alet+otorite→baba "
  + "zinciri doğrudan. T2 tek okumada canlanıyor mu? → EVET. T3 biçim kancası gerekli mi? → HAYIR: "
  + "karışıklık ortakları 又 · 交 · 文 uygulamada YOK (ölçüldü); ayrıca çizim öğretimi Stroke Coach'un "
  + "işi. T4 ayrı bir katman ekliyor mu? → HAYIR, tekrar olurdu. → **not_required**. "
  + "|| formationType 会意 (Kanjipedia) DEĞİŞMEDİ — saf editör metadatası, render edilmiyor; oluşum "
  + "türü çatalı (会意 vs 象形) yukarıda kayıtlı ve görünür metni hiç etkilemiyor.";

const next = Object.assign({}, rec, {
  etymology: Object.assign({}, e, {
    summaryTr: NEW_SUMMARY,
    confidence: "A",
    qaStatus: "reviewed",
    reviewedAt: GIT_DATE,
    disagreementNote: e.disagreementNote + APPROVAL
  }),
  mnemonic: { status: "not_required" }
});

/* ── Güvenceler ── */
if (next.etymology.qaStatus !== "reviewed") throw new Error("父: reviewed olmalı");
if (next.etymology.reviewedAt !== GIT_DATE) throw new Error("父: reviewedAt git tarihi olmalı");
if (next.etymology.confidence !== "A") throw new Error("父: (B) kararında confidence A olmalı");
if (next.etymology.formationType !== e.formationType) throw new Error("父: formationType değişmemeli");
if (JSON.stringify(next.etymology.sources) !== JSON.stringify(e.sources)) throw new Error("父: sources değişmemeli");
if (next.mnemonic.status !== "not_required") throw new Error("父: mnemonic not_required olmalı");
if ("textTr" in next.mnemonic) throw new Error("父: not_required'da textTr olmaz");
if (JSON.stringify(next.components) !== JSON.stringify(rec.components)) throw new Error("父: components değişmemeli");
if (JSON.stringify(next.component_meanings) !== JSON.stringify(rec.component_meanings)) throw new Error("父: component_meanings değişmemeli");
if (next.pictogram_note !== rec.pictogram_note) throw new Error("父: pictogram_note değişmemeli");
if (next.memory_hint_tr !== rec.memory_hint_tr) throw new Error("父: memory_hint_tr değişmemeli");

/* SEÇENEK (B)'nin ÖZÜ: tartışmalı nesne görünür metne GİREMEZ */
const S = next.etymology.summaryTr;
if (/balta|değnek|sopa|kamçı|silah|taş/i.test(S)) throw new Error("父 (B): tartışmalı nesne görünür metne giremez");
if (!/alet/i.test(S)) throw new Error("父 (B): uzlaşılan çekirdek 'alet' korunmalı");
if (!/otorite/i.test(S)) throw new Error("父 (B): Zeynep dil kararı — 'güç' değil 'otorite'");
if (/güç bulundur/i.test(S)) throw new Error("父 (B): 'güç bulunduran' ifadesi terk edildi");
if (!/baba/i.test(S)) throw new Error("父: 'baba' anlam kapanışı zorunlu");
if (/kesin değil|farklı görüş|tartışmalı|kaynaklar/i.test(S)) throw new Error("父: tartışma dili kullanıcı metnine giremez");
if (/会意|象形|斧|又/.test(S)) throw new Error("父: teknik terim / uygulamada olmayan karakter görünür metne giremez");
if (S === (next.memory_hint_tr || "")) throw new Error("Kökeni ile Hafıza aynı olamaz");
/* Araştırma notu KAYBOLMAMALI — ayrıntı buraya taşındı, silinmedi */
if (!/balta/i.test(next.etymology.disagreementNote)) throw new Error("父: dört kaynak izi notta kalmalı");
if (!/EMSAL/.test(next.etymology.disagreementNote)) throw new Error("父: yeni emsal notta kayıtlı olmalı");

const oldSub = JSON.stringify(rec);
if (!src.includes(oldSub)) throw new Error("父: kayıt kaynakta bire bir bulunamadı");
src = src.replace(oldSub, JSON.stringify(next));
fs.writeFileSync(INDEX, src);

console.log("父 (" + id + ") REVIEWED · KARAR (B) · confidence B→A · reviewedAt=" + GIT_DATE + " · KULLANICIYA AÇIK");
console.log("YAYIMLANAN (" + NEW_SUMMARY.length + " kr): " + NEW_SUMMARY);
console.log("mnemonic: not_required (4-soru uygulandı) · formationType 会意 (değişmedi, render edilmiyor)");
console.log("⭐ EMSAL: ESAS'ın verdiği ÇIKARILABİLİR bir ayrıntı, çapraz kaynaklarla uzlaşmadığı için görünür metne alınmadı.");
