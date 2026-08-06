/* GATE 1 · Codex sözleşmesi 2026-08-06 · Kapsam maddeleri 1, 2, 3(DATA yanı), 6.
   DATA.chars üzerinde YALNIZ dört alan değişir. Başka hiçbir kayıt/alan dokunulmaz
   (JSON.stringify indexOf/replace ile bayt korumalı düzenleme).

   ── M1 · 明 (akarui) ────────────────────────────────────────────────────────────────
   romaji "aka" → "akarui".  "aka" YANLIŞTI: 赤'in okunuşu; manifest de onu izleyip
   赤'in ses dosyasını (audio/word/aka.mp3) çalıyordu.
   Ev deseni ÖLÇÜLDÜ — fiil/sıfat kanjilerinde romaji = sözlük biçimi okunuşu:
     休→yasumu · 話→hanasu · 飲→nomu · 食→taberu · 見→miru · 買→kau
   明 kaydının kendi verisi de bunu destekliyor: id="akarui", kunyomi あか(るい),
   ilk örnek ["明るい","akarui","parlak"]. Ses: audio/word/akarui.mp3 ZATEN VAR
   (word_akarui = 明るい) → yeni kayıt üretilmiyor, mevcut doğru dosya işaret ediliyor.

   ── M2 · 晴 (hareru) ────────────────────────────────────────────────────────────────
   romaji "ha" → "hare".  "ha" YANLIŞTI: は kanasının okunuşu; manifest audio/kana/ha.mp3
   (kana は) çalıyordu.
   Neden "hareru" değil "hare": (a) kaydın meaning_tr'si "açık hava" = 晴れ (isim),
   (b) ilk örnek ["晴れ","hare","açık hava"], (c) audio/word/hare.mp3 VAR ve tam olarak
   晴れ; "hareru" için ses dosyası YOK ve sözleşme ses üretmeyi yasaklıyor.
   → Kaydın kendi içeriğiyle tutarlı, mevcut doğru dosyaya oturan tek seçenek "hare".
   ⚠️ Bu, M1'deki sözlük-biçimi deseninden bilinçli bir sapmadır; gerekçesi yukarıda ve
      teslim raporunda açıkça yazılıdır (sessiz sapma değil).

   ── M3(DATA yanı) · 言 radikalinin 話 örneği ────────────────────────────────────────
   examples ["話","hana","konuşmak"] → romaji "hana" → "hanashi".
   "hana" YANLIŞTI: 花'nın okunuşu; audio/word/hana.mp3 (= 花) çalıyordu.
   Sözleşme: «doğru 話す/hanasu ve 話/hanashi ayrımını koru» → tek başına 話 = はなし.
   Türkçe karşılık ("konuşmak") DEĞİŞTİRİLMEDİ — sözleşme kapsamı romaji/ses referansı.

   ── M6 · 日.n5_words ───────────────────────────────────────────────────────────────
   "nichiyoubi" iki kez → bir kez. Sıra ve diğer 7 öğe korunur (ilk görülen konumda kalır).

   KAPSAM DIŞI (dokunulmadı): pictogram_note politikası · kanji_hanasu kaydı ·
   örnek kelimelerin Türkçe karşılıkları · başka hiçbir romaji. */
const fs = require("fs"), path = require("path");
const INDEX = path.join(__dirname, "..", "index.html");
let src = fs.readFileSync(INDEX, "utf8");
const DATA = JSON.parse(src.match(/const DATA = (\{.*?\});/s)[1]);

const findId = ch => Object.keys(DATA.chars).find(i => DATA.chars[i].character === ch);
const log = [];

function patch(id, mutate, label) {
  const rec = DATA.chars[id];
  if (!rec) throw new Error(id + " bulunamadı");
  const before = JSON.stringify(rec);
  const next = JSON.parse(before);
  mutate(next);
  const after = JSON.stringify(next);
  if (before === after) throw new Error(label + ": değişiklik üretmedi (iki kez koşmuş olabilir)");
  if (!src.includes(before)) throw new Error(label + ": kayıt kaynakta bire bir bulunamadı");
  src = src.replace(before, after);
  log.push(label);
}

/* M1 · 明 */
const idMei = findId("明");
patch(idMei, r => {
  if (r.romaji !== "aka") throw new Error("明: beklenen romaji 'aka', gelen '" + r.romaji + "'");
  r.romaji = "akarui";
}, "M1 明 romaji aka→akarui");

/* M2 · 晴 */
const idHare = findId("晴");
patch(idHare, r => {
  if (r.romaji !== "ha") throw new Error("晴: beklenen romaji 'ha', gelen '" + r.romaji + "'");
  r.romaji = "hare";
}, "M2 晴 romaji ha→hare");

/* M3 · 言 radikalinin 話 örneği */
const idGon = Object.keys(DATA.chars).find(i => DATA.chars[i].id === "r_gonben");
patch(idGon, r => {
  const ex = r.examples.find(e => e[0] === "話");
  if (!ex) throw new Error("言: 話 örneği bulunamadı");
  if (ex[1] !== "hana") throw new Error("言/話: beklenen romaji 'hana', gelen '" + ex[1] + "'");
  ex[1] = "hanashi";
}, "M3 言→話 örnek romaji hana→hanashi");

/* M6 · 日.n5_words */
const idHi = findId("日");
patch(idHi, r => {
  const before = r.n5_words.slice();
  const seen = new Set(), out = [];
  for (const w of before) { if (!seen.has(w)) { seen.add(w); out.push(w); } }
  if (out.length === before.length) throw new Error("日: yinelenen öğe bulunamadı");
  if (before.length - out.length !== 1) throw new Error("日: beklenen 1 yineleme, bulunan " + (before.length - out.length));
  if (before.filter(w => w === "nichiyoubi").length !== 2) throw new Error("日: 'nichiyoubi' 2 kez bekleniyordu");
  r.n5_words = out;
}, "M6 日.n5_words nichiyoubi 2→1");

fs.writeFileSync(INDEX, src);

/* ── Doğrulama (yazdıktan sonra yeniden oku) ── */
const D2 = JSON.parse(fs.readFileSync(INDEX, "utf8").match(/const DATA = (\{.*?\});/s)[1]);
const g = (ch, f) => f(Object.values(D2.chars).find(x => x.character === ch));
if (g("明", r => r.romaji) !== "akarui") throw new Error("DOĞRULAMA: 明 romaji");
if (g("晴", r => r.romaji) !== "hare") throw new Error("DOĞRULAMA: 晴 romaji");
const gon2 = Object.values(D2.chars).find(x => x.id === "r_gonben");
if (gon2.examples.find(e => e[0] === "話")[1] !== "hanashi") throw new Error("DOĞRULAMA: 言/話 romaji");
const hi2 = Object.values(D2.chars).find(x => x.character === "日");
if (hi2.n5_words.filter(w => w === "nichiyoubi").length !== 1) throw new Error("DOĞRULAMA: nichiyoubi tekilliği");
if (hi2.n5_words.length !== 8) throw new Error("DOĞRULAMA: 日.n5_words 8 öğe olmalı, " + hi2.n5_words.length);
/* Kapsam dışı kalanlar gerçekten dokunulmamış mı? */
if (g("赤", r => r.romaji) !== "aka") throw new Error("KAPSAM: 赤 romaji dokunulmamalıydı");
if (g("話", r => r.romaji) !== "hanasu") throw new Error("KAPSAM: 話 kanji romaji dokunulmamalıydı");
if (Object.keys(D2.chars).length !== 98) throw new Error("KAPSAM: kayıt sayısı değişmemeli");

console.log("GATE 1 · DATA düzeltmeleri uygulandı:");
log.forEach(l => console.log("  ✓ " + l));
console.log("  日.n5_words →", JSON.stringify(hi2.n5_words));
