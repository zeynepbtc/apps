// build-www.mjs — Capacitor webDir'ini (www/) üst klasördeki gerçek web uygulamasından KURAR.
// Kaynak tek doğru: ../index.html + ../audio + ../audio-manifest.json. www/ bir BUILD çıktısıdır, git'e girmez.
// Kullanım: `npm run sync-www` (cap add/sync bunu otomatik çağırır).
import { existsSync, mkdirSync, rmSync, cpSync, copyFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const NATIVE = resolve(__dirname, "..");   // kanji-atlas/native
const APP = resolve(NATIVE, "..");         // kanji-atlas  (web app kökü)
const WWW = join(NATIVE, "www");

function die(msg) { console.error("HATA:", msg); process.exit(1); }

// Kaynakları doğrula
const indexSrc = join(APP, "index.html");
const audioSrc = join(APP, "audio");
const manifestSrc = join(APP, "audio-manifest.json");
if (!existsSync(indexSrc)) die(`bulunamadı: ${indexSrc}`);
if (!existsSync(audioSrc)) die(`bulunamadı: ${audioSrc}`);

// www/ temiz kur
if (existsSync(WWW)) rmSync(WWW, { recursive: true, force: true });
mkdirSync(WWW, { recursive: true });

// index.html
copyFileSync(indexSrc, join(WWW, "index.html"));

// audio/ (özyinelemeli)
cpSync(audioSrc, join(WWW, "audio"), { recursive: true });

// audio-manifest.json (varsa)
if (existsSync(manifestSrc)) copyFileSync(manifestSrc, join(WWW, "audio-manifest.json"));

// Özet
let audioCount = 0;
try {
  const { readdirSync } = await import("node:fs");
  const walk = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) { if (e.isDirectory()) walk(join(d, e.name)); else audioCount++; } };
  walk(join(WWW, "audio"));
} catch { /* sayım kritik değil */ }

const kb = Math.round(statSync(join(WWW, "index.html")).size / 1024);
console.log(`www/ kuruldu: index.html (${kb} KB) + audio/ (${audioCount} dosya)${existsSync(manifestSrc) ? " + audio-manifest.json" : ""}`);
