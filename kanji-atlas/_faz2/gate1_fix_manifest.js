/* GATE 1 · Codex sözleşmesi 2026-08-06 · Kapsam maddeleri 1, 2, 3 (manifest yanı).
   audio-manifest.json üzerinde ÜÇ kayıt değişir. Ses DOSYALARINA DOKUNULMAZ —
   yalnız hangi kaydın hangi mevcut dosyayı işaret ettiği düzeltilir.
   (Sözleşme kabul ölçütü: "Mevcut ses dosyalarının hiçbiri sessizce yeniden üretilmez
   veya üzerine yazılmaz." — bu betik hiçbir .mp3 yazmaz/silmez.)

   ── M1 · kanji_akarui ──────────────────────────────────────────────────────────────
   okunus "aka" → "akarui" · ses_dosyasi audio/word/aka.mp3 → audio/word/akarui.mp3
   ESKİ dosya 赤'in sesiydi (kanji_aka + word_x_aka hâlâ onu kullanıyor → YETİM OLMAZ).
   YENİ dosya zaten mevcut (word_akarui = 明るい) → yeni kayıt gerekmiyor.

   ── M2 · kanji_hareru ──────────────────────────────────────────────────────────────
   okunus "ha" → "hare" · ses_dosyasi audio/kana/ha.mp3 → audio/word/hare.mp3
   ESKİ dosya は/ハ kanasının sesiydi (kana_hira_ha + kana_kata_ha hâlâ kullanıyor → YETİM OLMAZ).
   YENİ dosya zaten mevcut (word_hare = 晴れ).

   ── M3 · word_x_hana → KALDIRILIYOR ────────────────────────────────────────────────
   {kategori:"word", metin:"話", okunus:"hana", ses:"audio/word/hana.mp3"} — dosya 花'nın sesi.
   Sözleşme "düzelt VEYA güvenli biçimde kaldır" diyor. DÜZELTME MÜMKÜN DEĞİL: doğru okunuş
   はなし olurdu, ama audio/word/hanashi.mp3 YOK ve ses üretmek yasak. Yanlış dosyayı işaret
   etmeye devam etmektense kaydı kaldırmak doğrudur → koşullu buton kuralı gereği o yüzeyde
   buton SESSİZ olur (yanlış ses çalmaz).
   audio/word/hana.mp3 YETİM OLMAZ: word_hana (花) + word_x_hana_2 (はな) hâlâ kullanıyor.
   KORUNAN AYRIM: word_x_hanasu (話す→hanasu) ve kanji_hanasu (話→hanasu) DOKUNULMADI. */
const fs = require("fs"), path = require("path");
const MAN = path.join(__dirname, "..", "audio-manifest.json");
const raw = fs.readFileSync(MAN, "utf8");
const doc = JSON.parse(raw);
if (!doc || !Array.isArray(doc.entries)) throw new Error("manifest kök yapısı {_meta, entries[]} bekleniyordu");
/* Biçim korunumu: bu dosya 1 boşluk girintili ve SONDA \n YOK. Ölçüldü ve doğrulandı;
   yeniden yazarken birebir aynı biçim üretilir → diff yalnız gerçek değişikliği gösterir. */
if (JSON.stringify(doc, null, 1) !== raw) throw new Error("biçim round-trip'i bozuk — yeniden yazmak gürültü üretir");
const arr = doc.entries;
const N0 = arr.length;
/* _meta.pedagojik_hukum: "Karakter (kanji) sesi pedagojik temsili okunuştur; tüm
   okunuşları temsil ettiği iddia edilmez." → M1/M2'de temsilî okunuş seçimi bu hükme uygun. */

const exists = f => fs.existsSync(path.join(__dirname, "..", f));
const byId = id => arr.find(x => x.id === id);
const usersOf = f => arr.filter(x => x.ses_dosyasi === f).map(x => x.id);
const log = [];

/* M1 */
const a = byId("kanji_akarui");
if (!a) throw new Error("kanji_akarui yok");
if (a.okunus !== "aka" || a.ses_dosyasi !== "audio/word/aka.mp3") throw new Error("kanji_akarui beklenen bozuk hâlde değil (iki kez koşmuş olabilir)");
if (!exists("audio/word/akarui.mp3")) throw new Error("hedef dosya yok: audio/word/akarui.mp3");
a.okunus = "akarui"; a.ses_dosyasi = "audio/word/akarui.mp3";
log.push("M1 kanji_akarui: aka→akarui · word/aka.mp3→word/akarui.mp3");

/* M2 */
const h = byId("kanji_hareru");
if (!h) throw new Error("kanji_hareru yok");
if (h.okunus !== "ha" || h.ses_dosyasi !== "audio/kana/ha.mp3") throw new Error("kanji_hareru beklenen bozuk hâlde değil");
if (!exists("audio/word/hare.mp3")) throw new Error("hedef dosya yok: audio/word/hare.mp3");
h.okunus = "hare"; h.ses_dosyasi = "audio/word/hare.mp3";
log.push("M2 kanji_hareru: ha→hare · kana/ha.mp3→word/hare.mp3");

/* M3 — kaldırma */
const wi = arr.findIndex(x => x.id === "word_x_hana");
if (wi < 0) throw new Error("word_x_hana yok");
const w = arr[wi];
if (!(w.kategori === "word" && w.metin === "話" && w.okunus === "hana")) throw new Error("word_x_hana beklenen hâlde değil");
arr.splice(wi, 1);
log.push("M3 word_x_hana KALDIRILDI (話→hana→hana.mp3)");

/* ── Güvenceler ── */
if (arr.length !== N0 - 1) throw new Error("yalnız 1 kayıt kaldırılmalıydı");
if (arr.some(x => x.kategori === "word" && x.metin === "話" && x.okunus === "hana")) throw new Error("KABUL: 話/hana kaydı hâlâ var");
if (arr.some(x => x.metin === "話" && x.okunus === "hana")) throw new Error("KABUL: metin 話 + okunus hana kaydı hâlâ var");
if (!byId("word_x_hanasu")) throw new Error("KORUMA: word_x_hanasu (話す/hanasu) silinmemeliydi");
if (!byId("kanji_hanasu")) throw new Error("KORUMA: kanji_hanasu silinmemeliydi");
/* yetim/kırık yol denetimi */
for (const f of ["audio/word/aka.mp3", "audio/kana/ha.mp3", "audio/word/hana.mp3"]) {
  const u = usersOf(f);
  if (!u.length) throw new Error("YETİM DOSYA oluştu: " + f);
  log.push("   " + f + " hâlâ kullanımda → " + u.join(", "));
}
const broken = arr.filter(x => !exists(x.ses_dosyasi));
if (broken.length) throw new Error("KIRIK YOL: " + broken.map(x => x.id).join(", "));
/* ses dosyası sayısı sabit kalmalı — bu betik hiç .mp3 yazmaz */
const mp3 = require("child_process").execSync("find " + JSON.stringify(path.join(__dirname, "..", "audio")) + " -type f -name '*.mp3' | wc -l").toString().trim();
if (mp3 !== "473") throw new Error("ses dosyası sayısı değişti: " + mp3 + " (473 olmalı)");

if (JSON.stringify(doc._meta) !== JSON.stringify(JSON.parse(raw)._meta)) throw new Error("_meta dokunulmamalıydı");
fs.writeFileSync(MAN, JSON.stringify(doc, null, 1));
console.log("GATE 1 · manifest düzeltmeleri uygulandı (" + N0 + " → " + arr.length + " kayıt):");
log.forEach(l => console.log("  " + (l.startsWith("   ") ? l : "✓ " + l)));
console.log("  .mp3 dosya sayısı: " + mp3 + " (DEĞİŞMEDİ)");
