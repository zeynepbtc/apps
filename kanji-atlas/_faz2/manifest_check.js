/* FAZ 2 · Ses manifesti bütünlük harness'ı (saf; çalışan uygulamaya DOKUNMAZ, hiçbir şey yazmaz).
   ── Test Repair Batch A (Codex sözleşmesi 2026-08-06) ───────────────────────────────────────
   TAŞINABİLİRLİK: Atlas dizini betiğin KENDİ konumundan çözülür (__dirname/..). Sabit
   /home/claude/apps-deploy bağımlılığı KALDIRILDI. Depo kökünden de kanji-atlas/ içinden de
   aynı sonucu verir.
     Geçersiz kılma (belgeli, isteğe bağlı):
       CLI : node manifest_check.js --atlas=/yol/kanji-atlas
       ENV : ATLAS_DIR=/yol/kanji-atlas node manifest_check.js
     CLI, ENV'den önce gelir; ikisi de yoksa __dirname/.. kullanılır.

   KALDIRILAN DONDURULMUŞ ANLIK GÖRÜNTÜLER (sözleşme gereği — bugünkü sayılarla DEĞİŞTİRİLMEDİ):
     · sabit kategori toplamları (92/91/78/74)
     · sabit durum sayıları (214 recorded / 47 missing / 74 tts)
     · "tüm cümleler durum=tts"
     · "kaynak=flick ⇔ durum=recorded" (çift yönlü koşul; flick→yeni göçünden sonra mantıken düşer)
   Bunların yerine SAYIDAN BAĞIMSIZ kalite değişmezleri kondu: her yayın kaydı recorded, yolu
   göreli ve dosyası var; kategori+metin tekil; yetim mp3 yok; flick koşullu.

   YENİ KORUMA: kanji-atlas/audio/ altındaki HER mp3 en az bir kayıt tarafından referanslanmalı
   (paylaşımlı referans serbest) — manifestten kayıt düşerse yetim dosya sessizce kalmaz.

   ── UNICODE DÜZELTMESİ (Codex sözleşmesi 2026-08-07) ────────────────────────────────────────
   SORUN: Gerçek harici proje diskinde (macOS/APFS) dosya adları Unicode **NFD** (ayrışmış)
   biçimde görünürken kanonik manifest yolları **NFC** (birleşmiş). Ham JavaScript dize
   karşılaştırması aynı mantıksal dosyayı iki farklı yol sanıyor → Codex'in ölçümü: 19 sahte
   yetim (`chīzu.mp3`, `fōku.mp3`, `gēmu.mp3`, `kōhī.mp3` …). Konteynerde (ext4) 0 sahte yetim
   çıkıyor çünkü orada adlar zaten NFC — yani hata platforma bağlı ve testin kendisindedir.

   ÇÖZÜM: karşılaştırma ANAHTARLARI NFC'ye normalize edilir. Dosyalar YENİDEN ADLANDIRILMAZ,
   manifest YENİDEN YAZILMAZ — yalnız mantıksal küme karşılaştırması normalize edilir.

   GÜVENLİK: normalizasyon yasak bir yolu GİZLEYEMEZ. Güvenlik yüklemi (göreli · `..` yok ·
   izinli klasör) HEM HAM HEM NFC biçime ayrı ayrı uygulanır; ikisinden biri düşerse kayıt
   reddedilir. Yani normalizasyon yalnız "aynı mı?" sorusunu çözer, "güvenli mi?" sorusunu değil.

   BELİRSİZLİK: farklı iki HAM yol aynı NFC anahtarına düşerse bu SESSİZCE tek üyeye
   indirgenmez — açık tanılı bir başarısızlık üretir (hem diskte hem manifestte ayrı kontrol). */
const fs = require("fs");
const path = require("path");
const NFC = s => String(s).normalize("NFC");

/* ── Atlas dizini çözümü ── */
const cliArg = process.argv.slice(2).find(a => a.startsWith("--atlas="));
const ATLAS = path.resolve(
  cliArg ? cliArg.slice("--atlas=".length)
         : (process.env.ATLAS_DIR || path.join(__dirname, ".."))
);
const MAN_PATH = path.join(ATLAS, "audio-manifest.json");
if (!fs.existsSync(MAN_PATH)) {
  console.error("HATA: manifest bulunamadı → " + MAN_PATH);
  console.error("Atlas dizinini --atlas=<yol> veya ATLAS_DIR ile verin.");
  process.exit(2);
}
const man = JSON.parse(fs.readFileSync(MAN_PATH, "utf-8"));

let fail = 0;
const A = (n, ok, x) => { console.log((ok ? "✓" : "✗") + " " + n + (x ? " — " + x : "")); if (!ok) fail++; };
const E = man.entries;
const DURUM = new Set(["recorded", "tts", "missing"]);
const KAYNAK = new Set(["flick", "yeni"]);
const KAT = new Set(["kana", "kanji", "word", "sentence"]);
const ALLOWED_DIRS = ["kana", "kanji", "word", "sentence"];

console.log("Atlas dizini: " + ATLAS);

/* 1) id benzersiz */
{ const ids = E.map(e => e.id);
  A("1) tüm id benzersiz", new Set(ids).size === ids.length, `${ids.length} kayıt`); }

/* 2) zorunlu alanlar + enum'lar */
{ const bad = E.filter(e => !e.id || !KAT.has(e.kategori) || typeof e.metin !== "string"
    || e.metin.length === 0 || !KAYNAK.has(e.kaynak) || !DURUM.has(e.durum));
  A("2) her kayıt şemaya uygun (id·kategori·metin·kaynak·durum)", bad.length === 0,
    bad.slice(0, 3).map(x => x.id || "(id yok)").join()); }

/* 3) YAYIN KAPISI: hiçbir kayıt missing/tts kalmaz (sayı değil, DURUM değişmezi) */
{ const notReleased = E.filter(e => e.durum !== "recorded");
  A("3) yayın kapısı: missing/tts kayıt YOK (hepsi recorded)", notReleased.length === 0,
    notReleased.length ? `${notReleased.length} kayıt: ` + notReleased.slice(0, 3).map(x => x.id + ":" + x.durum).join() : ""); }

/* ── Disk indeksi: ham adlar + NFC anahtarları (bir kez okunur, 4 ve 6 birlikte kullanır) ── */
const SHAPE_RE = new RegExp("^audio/(" + ALLOWED_DIRS.join("|") + ")/[^/]+\\.mp3$");
/* Güvenlik yüklemi — normalizasyondan BAĞIMSIZ. Hem ham hem NFC biçime uygulanır. */
const isSafeRel = p => typeof p === "string" && p.length > 0
  && !path.isAbsolute(p) && !p.includes("..") && !p.startsWith("/") && !/^[A-Za-z]:/.test(p)
  && SHAPE_RE.test(p);

const diskRaw = [];
for (const d of ALLOWED_DIRS) {
  const dir = path.join(ATLAS, "audio", d);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) if (f.endsWith(".mp3")) diskRaw.push(`audio/${d}/${f}`);
}
const diskByNfc = new Map();               // NFC anahtar → farklı HAM yollar
for (const r of diskRaw) {
  const k = NFC(r);
  if (!diskByNfc.has(k)) diskByNfc.set(k, new Set());
  diskByNfc.get(k).add(r);
}
const diskNonNfc = diskRaw.filter(r => r !== NFC(r));

/* 4) her yayın kaydının yolu GÖRELİ, izinli klasörde ve DOSYASI VAR (NFC-duyarsız eşleme) */
{ const badPath = [], missingFile = [];
  for (const e of E) {
    if (e.durum !== "recorded") continue;
    const raw = e.ses_dosyasi;
    /* Güvenlik: HAM ve NFC biçim AYRI AYRI geçmeli — normalizasyon yasak yolu gizleyemez. */
    if (!isSafeRel(raw) || !isSafeRel(NFC(raw))) { badPath.push(e.id + "→" + raw); continue; }
    /* Varlık: önce gerçek dosya sistemi (macOS normalizasyon-duyarsız arar), sonra NFC indeksi
       (Linux gibi bayt-tam sistemlerde NFD disk adını NFC manifest yoluyla eşler). */
    const existsOnFs = fs.existsSync(path.join(ATLAS, raw));
    if (!existsOnFs && !diskByNfc.has(NFC(raw))) missingFile.push(e.id + "→" + raw);
  }
  A("4a) ses yolu göreli ve izinli klasörde — ham VE NFC biçim ayrı doğrulandı",
    badPath.length === 0, badPath.slice(0, 3).join(" | "));
  A("4b) referanslanan her ses dosyası DİSKTE VAR (NFC/NFD duyarsız)", missingFile.length === 0,
    missingFile.slice(0, 3).join(" | ")); }

/* 5) çözüm anahtarı sözleşmesi: kategori+metin TEKİL */
{ const seen = new Map(), dups = [];
  for (const e of E) { const k = e.kategori + " " + e.metin;
    if (seen.has(k)) dups.push(`${k} (${seen.get(k)} ↔ ${e.id})`); else seen.set(k, e.id); }
  A("5) kategori+metin duplicate SIFIR (çözüm anahtarı tekil)", dups.length === 0, dups.slice(0, 3).join(" | ")); }

/* 6) NORMALİZASYON BELİRSİZLİĞİ — diskte iki farklı HAM ad aynı NFC anahtarına düşerse
      sessizce tek üyeye indirgenmez; açık tanıyla başarısız olur. */
{ const collisions = [...diskByNfc.entries()].filter(([, set]) => set.size > 1);
  A("6a) diskte normalizasyon çakışması YOK (farklı ham ad → aynı NFC anahtarı)",
    collisions.length === 0,
    collisions.length
      ? collisions.slice(0, 2).map(([k, s]) => `${k} ← ${[...s].map(r => JSON.stringify(r)).join(" ve ")}`).join(" | ")
      : `${diskByNfc.size} benzersiz NFC anahtarı`); }

/* 6b) Aynı ilke MANİFEST tarafında: farklı ham manifest yolları aynı NFC anahtarına düşemez. */
{ const manByNfc = new Map();
  for (const e of E) { if (!e.ses_dosyasi) continue;
    const k = NFC(e.ses_dosyasi);
    if (!manByNfc.has(k)) manByNfc.set(k, new Set());
    manByNfc.get(k).add(e.ses_dosyasi); }
  const collisions = [...manByNfc.entries()].filter(([, set]) => set.size > 1);
  A("6b) manifestte normalizasyon çakışması YOK", collisions.length === 0,
    collisions.length
      ? collisions.slice(0, 2).map(([k, s]) => `${k} ← ${[...s].map(r => JSON.stringify(r)).join(" ve ")}`).join(" | ")
      : `${manByNfc.size} benzersiz NFC anahtarı`); }

/* 6c) YETİM YOK: audio/ altındaki her mp3 en az bir kayıtça referanslanıyor (paylaşım serbest).
       Karşılaştırma NFC anahtarları üzerinden — dosya adları veya manifest DEĞİŞTİRİLMEZ. */
{ const referencedNfc = new Set(E.filter(e => e.ses_dosyasi).map(e => NFC(e.ses_dosyasi)));
  const orphans = diskRaw.filter(r => !referencedNfc.has(NFC(r)));
  /* Tanı amaçlı (iddia DEĞİL): ham karşılaştırma kaç sahte yetim üretirdi? */
  const referencedRaw = new Set(E.filter(e => e.ses_dosyasi).map(e => e.ses_dosyasi));
  const rawOnly = diskRaw.filter(r => !referencedRaw.has(r)).length;
  A("6c) yetim mp3 YOK (NFC anahtarlarıyla karşılaştırıldı)", orphans.length === 0,
    `${diskRaw.length} dosya · ${orphans.length} yetim · NFC-dışı disk adı: ${diskNonNfc.length}`
    + (rawOnly !== orphans.length ? ` · (ham karşılaştırma ${rawOnly} sahte yetim verirdi)` : "")
    + (orphans.length ? " → " + orphans.slice(0, 3).join(", ") : "")); }

/* 7) FLICK KOŞULLU: flick kaydı varsa recorded olmalı ve kaynak dosyası bulunmalı.
      Flick kaydı YOKSA kardeş dizin aranmaz — test eksik komşuya bağımlı hâle gelmez. */
{ const flick = E.filter(e => e.kaynak === "flick");
  if (flick.length === 0) {
    A("7) flick kaydı yok → kardeş dizin kontrolü atlandı (bağımlılık kurulmadı)", true, "0 flick kaydı");
  } else {
    const notRecorded = flick.filter(e => e.durum !== "recorded");
    A("7a) her flick kaydı recorded", notRecorded.length === 0, notRecorded.slice(0, 3).map(x => x.id).join());
    const flickRoot = path.join(ATLAS, "..", "japanese-flick", "audio");
    if (!fs.existsSync(flickRoot)) {
      A("7b) flick kaynak dizini bulunuyor", false, "beklenen: " + flickRoot);
    } else {
      const bad = flick.filter(e => {
        const m = String(e.ses_dosyasi || "").match(/^audio\/(kana|word)\/(.+\.mp3)$/);
        if (!m) return true;
        return !fs.existsSync(path.join(flickRoot, m[1], m[2]));
      });
      A("7b) her flick kaydı GERÇEK Flick dosyasına işaret ediyor", bad.length === 0,
        bad.slice(0, 3).map(x => x.id + "→" + x.ses_dosyasi).join());
    }
  } }

/* 8) _meta pedagojik hüküm zorunlu */
{ A("8) _meta.pedagojik_hukum mevcut",
    !!(man._meta && man._meta.pedagojik_hukum && /temsili okunus/.test(man._meta.pedagojik_hukum))); }

console.log(fail === 0 ? "\n✅ MANİFEST BÜTÜNLÜK GEÇTİ (0 başarısız)" : "\n❌ " + fail + " başarısız");
process.exit(fail === 0 ? 0 : 1);
