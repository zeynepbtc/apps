/* AUTHORING BATCH 17 · KIRMIZI KUYRUK TURU 2 · 南 — REVIEWED ONAYI
   Karar belgesi: _AGENT_EXCHANGE/decisions/DECISION-002-MINAMI-MNEMONIC.md (APPROVED, Zeynep)
   Sözleşme:      _AGENT_EXCHANGE/codex/specs/2026-08-07-AUTHORING-BATCH-17-MINAMI-REVIEW.md

   ── BU BETİĞİN YAPTIĞI TEK ŞEY ───────────────────────────────────────────────────────────
   Yalnız `南` kaydını taslaktan yayına açar. GÖRÜNÜR METİN DEĞİŞMEZ.
       qaStatus  : drafted → reviewed
       reviewedAt: yok → repo Git tarihi (YYYY-MM-DD)
       mnemonic  : {status:"pending_review"} → {status:"not_required"}
       disagreementNote: mevcut metin + REVIEWED ONAYI eki (mevcut araştırma izi SİLİNMEZ)
   Başka hiçbir alan, hiçbir kayıt değişmez.

   ── NEDEN summaryTr AYNI KALIYOR (父'dan farkı) ──────────────────────────────────────────
   父'da görünür metin tartışmalı bir ayrıntı (balta) taşıdığı için yeniden yazılmıştı ve
   confidence B→A yükselmişti. 南'da taslak metin ZATEN Mekanizma Belirsizliği ilkesine
   (AUTHORING-05, beşinci kilitli ilke) göre yazıldı: mekanizma hiç yayımlanmadı, fiil
   "kullanılmaya başlanmıştır" olarak kilitlendi ve confidence baştan A verildi.
   Bu turda düzeltilecek bir şey yok; yalnız QA kapısı açılıyor. "yazan ≠ onaylayan".

   ── MNEMONIC: not_required (DECISION-002, dört soru) ─────────────────────────────────────
   T1 Köken bugünkü anlam bağını taşıyor mu? HAYIR — mekanizma bilinçli olarak yayın dışı.
   T2 Kaynaklı ve doğru bir anlam köprüsü tek okumada kurulabiliyor mu? HAYIR.
   T3 Ayrı biçim kancası gerekli mi? HAYIR — ölçülen karışma riski düşük; çizim öğretimi
      bu katmanın görevi değil.
   T4 Ayrı katman yeni ve güvenilir bilgi ekliyor mu? HAYIR.
   → Boşluk bir içerik kusuru değil, doğruluk standardının uygulanmasıdır. Kullanıcının
     "çalgı neden güney?" sorusuna uydurma cevap vermemek, yapay hatırlatma üretmekten iyidir.
   → GUARDRAIL: bu karar YALNIZ 南 içindir; genel kural DEĞİLDİR (DECISION-002 §Guardrail). */
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const INDEX = path.join(__dirname, "..", "index.html");

/* Git tarihi repo KÖKÜNDEN okunur ve biçimi doğrulanır (§5) */
const GIT_DATE = cp.execSync("git log -1 --format=%cd --date=short", { cwd: ROOT }).toString().trim();
if (!/^\d{4}-\d{2}-\d{2}$/.test(GIT_DATE)) throw new Error("git tarihi okunamadı/biçimi bozuk: " + GIT_DATE);

/* Sözleşme §4'te kilitlenen görünür metin — BAYT OLARAK aynı kalmalı */
const LOCKED_SUMMARY = "Asılı, çan biçiminde bir çalgının resmidir. Daha sonra 'güney' anlamında kullanılmaya başlanmıştır.";

let src = fs.readFileSync(INDEX, "utf8");
const m = src.match(/const DATA = (\{.*?\});/s);
if (!m) throw new Error("DATA bulunamadı");
const DATA = JSON.parse(m[1]);

const id = Object.keys(DATA.chars).find(i => DATA.chars[i].character === "南");
if (!id) throw new Error("南 bulunamadı");
const rec = DATA.chars[id];
const e = rec.etymology;

/* ── BAŞLANGIÇ DURUMU BİREBİR DOĞRULANIR; uymuyorsa HİÇBİR ŞEY YAZILMAZ (§5) ──
   Bu blok aynı zamanda ikinci koşumun non-zero bitmesini garanti eder:
   ilk koşumdan sonra qaStatus "reviewed" olduğu için burada durur. */
if (!e) throw new Error("南 etymology taşımıyor — önce apply_authoring_16_minami.js");
if (e.qaStatus !== "drafted") throw new Error("南: beklenen qaStatus 'drafted', gelen '" + e.qaStatus + "' — betik iki kez koşmaz");
if (e.reviewedAt) throw new Error("南: reviewedAt zaten var ('" + e.reviewedAt + "') — betik iki kez koşmaz");
if (e.confidence !== "A") throw new Error("南: taslak confidence A olmalıydı, gelen " + e.confidence);
if (e.summaryTr !== LOCKED_SUMMARY) throw new Error("南: taslak görünür metin sözleşmedeki kilitli değerle birebir değil");
if (!rec.mnemonic || rec.mnemonic.status !== "pending_review") throw new Error("南: mnemonic 'pending_review' bekleniyor");
if ("textTr" in rec.mnemonic) throw new Error("南: taslakta mnemonic.textTr bulunmamalıydı");

const APPROVAL =
  " || ===== REVIEWED ONAYI (Zeynep, " + GIT_DATE + ") · DECISION-002 ===== "
  + "GÖRÜNÜR METİN DEĞİŞMEDİ — taslak zaten Mekanizma Belirsizliği ilkesine (AUTHORING-05) göre "
  + "yazılmıştı: mekanizma yayın dışı, fiil 'kullanılmaya başlanmıştır' kilitli, confidence baştan A. "
  + "Bu turda yalnız QA kapısı açıldı (yazan ≠ onaylayan): qaStatus drafted → reviewed. "
  + "父'dan FARKI: orada görünür metin tartışmalı bir ayrıntı taşıdığı için yeniden yazılmış ve "
  + "confidence B→A yükselmişti; burada düzeltilecek bir şey yok. "
  + "|| MNEMONIC KARARI: **not_required** (DECISION-002, APPROVED). Dört soru: "
  + "T1 köken bugünkü anlam bağını taşıyor mu? HAYIR — mekanizma bilinçli olarak yayın dışı. "
  + "T2 kaynaklı ve doğru bir anlam köprüsü tek okumada kurulabiliyor mu? HAYIR. "
  + "T3 ayrı biçim kancası gerekli mi? HAYIR — ölçülen karışma riski düşük, çizim öğretimi bu "
  + "katmanın görevi değil. T4 ayrı katman yeni/güvenilir bilgi ekliyor mu? HAYIR. "
  + "|| GEREKÇE: ayrı bir mnemonic ya kaynaklardan birinin mekanizmasını kesinmiş gibi geri sokar, "
  + "ya kaynaksız bir görsel hikâye üretir, ya da görünür köken ile araştırma notu arasındaki "
  + "güven sınırını bulanıklaştırır. Boşluk bir içerik kusuru değil, doğruluk standardının "
  + "uygulanmasıdır: 'çalgı neden güney?' sorusuna uydurma cevap vermemek, yapay bir hatırlatma "
  + "üretmekten daha değerlidir. "
  + "|| ⚠️ GUARDRAIL (DECISION-002): bu karar YALNIZ 南 içindir. 'Anlam bağı görünür değilse "
  + "mnemonic otomatik not_required olur' şeklinde genel bir kural OLUŞTURMAZ; her kayıt dört "
  + "soruyla ayrıca değerlendirilir. "
  + "|| Yukarıdaki beş kaynaklı araştırma izi, mekanizma çatalı (anlam bağı / fonetik ödünç / "
  + "kozmoloji / güney rüzgârı), uzlaşı ölçümü ve altı görünür-metin kararı OLDUĞU GİBİ durur — "
  + "hiçbiri silinmedi.";

const next = Object.assign({}, rec, {
  etymology: Object.assign({}, e, {
    qaStatus: "reviewed",
    reviewedAt: GIT_DATE,
    disagreementNote: e.disagreementNote + APPROVAL
  }),
  mnemonic: { status: "not_required" }
});

/* ── GÜVENCELER · yapılması GEREKEN dört değişiklik ── */
if (next.etymology.qaStatus !== "reviewed") throw new Error("南: reviewed olmalı");
if (next.etymology.reviewedAt !== GIT_DATE) throw new Error("南: reviewedAt git tarihi olmalı");
if (next.mnemonic.status !== "not_required") throw new Error("南: mnemonic not_required olmalı");
if ("textTr" in next.mnemonic) throw new Error("南: not_required'da textTr olamaz");
if (Object.keys(next.mnemonic).length !== 1) throw new Error("南: mnemonic yalnız {status} taşımalı");
if (next.etymology.disagreementNote.length <= e.disagreementNote.length) throw new Error("南: onay eki yazılmamış");
if (next.etymology.disagreementNote.indexOf(e.disagreementNote) !== 0) throw new Error("南: mevcut araştırma notu başta ve bozulmadan durmalı");
if (!/DECISION-002/.test(next.etymology.disagreementNote)) throw new Error("南: karar belgesi notta anılmalı");
if (!/GUARDRAIL/.test(next.etymology.disagreementNote)) throw new Error("南: guardrail notta kayıtlı olmalı");

/* ── GÜVENCELER · DEĞİŞMEMESİ gereken her şey (§4) ── */
const LOCKED_ETY = ["summaryTr", "confidence", "formationType", "formationTypeSource"];
for (const k of LOCKED_ETY)
  if (JSON.stringify(next.etymology[k]) !== JSON.stringify(e[k]))
    throw new Error("南: kilitli etymology alanı değişti → " + k);
if (JSON.stringify(next.etymology.sources) !== JSON.stringify(e.sources)) throw new Error("南: sources değişmemeli");
if (next.etymology.summaryTr !== LOCKED_SUMMARY) throw new Error("南: görünür metin sözleşmedeki kilitli değer olmalı");

/* Kayıttaki DİĞER tüm alanlar bayt olarak aynı kalmalı — alan alan, ad ad karşılaştırılır */
const keysBefore = Object.keys(rec), keysAfter = Object.keys(next);
if (JSON.stringify(keysBefore) !== JSON.stringify(keysAfter)) throw new Error("南: alan kümesi/sırası değişti");
for (const k of keysBefore) {
  if (k === "etymology" || k === "mnemonic") continue;
  if (JSON.stringify(next[k]) !== JSON.stringify(rec[k])) throw new Error("南: dokunulmaması gereken alan değişti → " + k);
}
const etyKeysBefore = Object.keys(e), etyKeysAfter = Object.keys(next.etymology);
for (const k of etyKeysBefore)
  if (k !== "qaStatus" && k !== "disagreementNote" && JSON.stringify(next.etymology[k]) !== JSON.stringify(e[k]))
    throw new Error("南: etymology alanı değişti → " + k);
const eklenen = etyKeysAfter.filter(k => !etyKeysBefore.includes(k));
if (eklenen.length !== 1 || eklenen[0] !== "reviewedAt") throw new Error("南: yalnız reviewedAt eklenebilir, gelen: " + eklenen.join(","));

/* ── GÜVENCELER · GÖRÜNÜR METİN DİLİ (§5) ── */
const S = next.etymology.summaryTr;
if (/ödünç/i.test(S)) throw new Error("南: 'ödünç' görünür metne giremez — mekanizma tek kaynaklı ve ESAS tarafından reddediliyor");
if (/anlamı gelişmiştir/i.test(S)) throw new Error("南: 'anlamı gelişmiştir' görünür metne giremez — anlam bağı yayın dışı");
if (/kesin değil|farklı görüş|tartışmalı|kaynaklar|bilinmiyor|belirsiz/i.test(S)) throw new Error("南: tartışma dili kullanıcı metnine giremez");
if (/象形|形声|会意|説文|Kanjipedia|Wiktionary|Sagart|piktogram|fonetik/i.test(S)) throw new Error("南: teknik kaynak terimi görünür metne giremez");
if (!/kullanılmaya başlanmıştır/.test(S)) throw new Error("南: kilitli fiil 'kullanılmaya başlanmıştır' korunmalı");
if (!/çalgı/.test(S)) throw new Error("南: 'çalgı' korunmalı (3/5 kaynak uzlaşısı)");
if (!/asılı/i.test(S)) throw new Error("南: 'asılı' korunmalı (Kanjipedia 木の枝に掛けた + Wiktionary hanging)");
if (!/çan biçiminde/.test(S)) throw new Error("南: 'çan biçiminde' korunmalı (Kanjipedia 鐘状 + Dong bell-shaped)");
if (!/güney/.test(S)) throw new Error("南: 'güney' anlam kapanışı zorunlu");
if (S === (next.memory_hint_tr || "")) throw new Error("Kökeni ile Hafıza aynı olamaz");

/* Araştırma izi KAYBOLMAMALI — mekanizma çatalının dört ucu da notta durmalı */
const N = next.etymology.disagreementNote;
for (const iz of ["MEKANİZMA BELİRSİZLİĞİ", "説文解字", "Dong Chinese", "Wiktionary", "OKJiten", "UZLAŞI ÖLÇÜMÜ"])
  if (!N.includes(iz)) throw new Error("南: araştırma izi kayboldu → " + iz);

/* ── YAZMA · eski kayıt kaynakta BİREBİR bulunmadan replace YOK ── */
const oldSub = JSON.stringify(rec);
if (!src.includes(oldSub)) throw new Error("南: kayıt kaynakta bire bir bulunamadı — yazılmadı");
if (src.split(oldSub).length - 1 !== 1) throw new Error("南: kayıt kaynakta birden fazla kez geçiyor — yazılmadı");
src = src.replace(oldSub, JSON.stringify(next));
fs.writeFileSync(INDEX, src);

console.log("南 (" + id + ") REVIEWED · reviewedAt=" + GIT_DATE + " · KULLANICIYA AÇIK");
console.log("GÖRÜNÜR METİN DEĞİŞMEDİ (" + S.length + " kr): " + S);
console.log("confidence A (değişmedi) · formationType 象形/Kanjipedia (değişmedi) · sources (değişmedi)");
console.log("mnemonic: pending_review → not_required (DECISION-002, dört soru) · textTr YOK");
console.log("disagreementNote: mevcut araştırma izi korundu, onay eki eklendi (+" + (N.length - e.disagreementNote.length) + " kr)");
console.log("SONRAKİ ADIM: node _faz2/generate_data_chars.js");
