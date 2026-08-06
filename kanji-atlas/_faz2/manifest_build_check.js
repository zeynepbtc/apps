/* FAZ 2 · Ses manifesti GÖMME kapıları — statik doğrulama (Gate 7 & 10). Hiçbir şey YAZMAZ.
   ── Test Repair Batch A (Codex sözleşmesi 2026-08-06) ───────────────────────────────────────
   TAŞINABİLİRLİK: Atlas dizini betiğin KENDİ konumundan çözülür (__dirname/..). Sabit
   /home/claude/apps-deploy bağımlılığı KALDIRILDI.
     Geçersiz kılma (belgeli, isteğe bağlı):
       CLI : node manifest_build_check.js --atlas=/yol/kanji-atlas
       ENV : ATLAS_DIR=/yol/kanji-atlas node manifest_build_check.js

   KALDIRILAN DONDURULMUŞ ANLIK GÖRÜNTÜ: `entries === 335`.
   Bugünkü toplamla (610) DEĞİŞTİRİLMEDİ — yerine sayıdan bağımsız yapısal koşul kondu
   (entries dizi ve boş değil). Kayıt SAYISININ eşitliği zaten Gate 7'nin semantik eşitliğiyle
   korunuyor: gömülü blok ile kanonik JSON birebir aynı olmak zorunda, dolayısıyla sayı da aynı.

   KORUNAN KAPILAR: anchor tespiti · Gate 7 semantik eşitlik · Gate 10 runtime fetch yasağı ·
   Gate 10b JSON'un fetch argümanı olmaması · AUDIO_MANIFEST'in tüketilmesi · _meta pedagojik hüküm. */
const fs = require("fs");
const path = require("path");

/* ── Atlas dizini çözümü ── */
const cliArg = process.argv.slice(2).find(a => a.startsWith("--atlas="));
const ATLAS = path.resolve(
  cliArg ? cliArg.slice("--atlas=".length)
         : (process.env.ATLAS_DIR || path.join(__dirname, ".."))
);
const HTML_PATH = path.join(ATLAS, "index.html");
const MAN_PATH = path.join(ATLAS, "audio-manifest.json");
for (const p of [HTML_PATH, MAN_PATH]) {
  if (!fs.existsSync(p)) {
    console.error("HATA: bulunamadı → " + p);
    console.error("Atlas dizinini --atlas=<yol> veya ATLAS_DIR ile verin.");
    process.exit(2);
  }
}
const h = fs.readFileSync(HTML_PATH, "utf-8");
const man = JSON.parse(fs.readFileSync(MAN_PATH, "utf-8"));

console.log("Atlas dizini: " + ATLAS);

let fail = 0; const A = (n, ok, x) => { console.log((ok ? "✓" : "✗") + " " + n + (x ? " — " + x : "")); if (!ok) fail++; };
/* sıra-bağımsız kanonik stringify (anahtarları özyinelemeli sırala) → semantik eşitlik */
const canon = v => Array.isArray(v) ? v.map(canon)
  : (v && typeof v === "object") ? Object.keys(v).sort().reduce((o, k) => (o[k] = canon(v[k]), o), {})
  : v;
const eq = (a, b) => JSON.stringify(canon(a)) === JSON.stringify(canon(b));

/* anchor'lı blok var mı */
const m = h.match(/\/\* FAZ2_AUDIO_MANIFEST_START[\s\S]*?const AUDIO_MANIFEST = (\{[\s\S]*?\});\n\/\* FAZ2_AUDIO_MANIFEST_END \*\//);
A("gömülü blok anchor'larla mevcut", !!m);

/* Gate 7: gömülü veri JSON ile SEMANTİK birebir aynı (kayıt sayısı eşitliğini de kapsar) */
let embedded = null;
if (m) { try { embedded = JSON.parse(m[1]); } catch (e) { console.log("  (gömülü blok JSON olarak ayrıştırılamadı: " + e.message + ")"); } }
A("Gate 7) gömülü AUDIO_MANIFEST === audio-manifest.json (semantik)", embedded !== null && eq(embedded, man));

/* Gate 10: runtime manifest FETCH yok */
const fetchesManifest = /(fetch|XMLHttpRequest|axios)[^;\n]{0,80}manifest/i.test(h)
  || /import\([^)]*manifest[^)]*\)/i.test(h);
A("Gate 10) runtime manifest fetch YOK", !fetchesManifest);
/* 'audio-manifest.json' yalnız yorumda geçebilir, fetch argümanı olarak DEĞİL */
const jsonRefInCode = /(fetch|open|load)[^;\n]{0,40}audio-manifest\.json/i.test(h);
A("Gate 10b) 'audio-manifest.json' fetch argümanı değil (yalnız yorum)", !jsonRefInCode);

/* 6b entegrasyonu sonrası AUDIO_MANIFEST TÜKETİLİYOR (buildAudioIndex(AUDIO_MANIFEST) ile) */
const consumed = (h.match(/AUDIO_MANIFEST/g) || []).length > 3; // 2 anchor + 1 decl + tüketici(ler)
A("AUDIO_MANIFEST tüketiliyor (buildAudioIndex ile, 6b)", consumed);

/* entries yapısal bütünlüğü — SAYI DONDURULMADI (Gate 7 sayı eşitliğini zaten garanti eder) */
A("gömülü entries dizi ve boş değil (sabit sayı YOK)",
  !!(embedded && Array.isArray(embedded.entries) && embedded.entries.length > 0),
  embedded && Array.isArray(embedded.entries) ? embedded.entries.length + " kayıt (bilgi amaçlı, iddia değil)" : "");

A("_meta.pedagojik_hukum gömülü", !!(embedded && embedded._meta && embedded._meta.pedagojik_hukum));

console.log(fail === 0 ? "\n✅ GÖMME KAPILARI GEÇTİ (Gate 7 & 10)" : "\n❌ " + fail + " başarısız");
process.exit(fail === 0 ? 0 : 1);
