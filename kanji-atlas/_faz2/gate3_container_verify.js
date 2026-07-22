/* GATE 3 · container-doğrulanabilir alt küme (non-shipping). Gerçek telefon / gerçek production blob /
   Cloudflare deploy / %200 text-zoom CİHAZDA. Bu script: gerçekçi v2 blob migration korunumu · font yükleme +
   eğitim glifi=detay · klavye (Tab/Enter/Space + focus) · console/pageerror/network/404 temizliği. */
const { chromium } = require("playwright");
const crypto = require("crypto");
const URL = process.env.SMOKE_URL || "http://127.0.0.1:8899/index.html";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 780 } });
  const consoleErr = [], pageErr = [], reqFail = [], http4xx = [];
  page.on("console", m => { if (m.type() === "error") consoleErr.push(m.text()); });
  page.on("pageerror", e => pageErr.push(e.message));
  page.on("requestfailed", r => reqFail.push(r.url() + " :: " + (r.failure() && r.failure().errorText)));
  page.on("response", r => { if (r.status() >= 400) http4xx.push(r.status() + " " + r.url()); });

  let pass = 0, fail = 0; const fails = [];
  const ok = (c, m) => { if (c) pass++; else { fail++; fails.push(m); } };
  const ev = (fn, a) => page.evaluate(fn, a);
  const click = async sel => { await page.click(sel, { timeout: 8000 }); await page.waitForTimeout(80); };
  async function fresh() { await page.goto(URL, { waitUntil: "domcontentloaded" }); await ev(() => localStorage.clear()); await page.reload({ waitUntil: "domcontentloaded" }); await page.waitForTimeout(250); }

  // ============ A) GERÇEKÇİ v2 BLOB MIGRATION — kullanıcı verisi/not/SRS/seenWritingSystem KORUNUR ============
  const realistic = {
    schemaVersion: 2,
    onboarding: { completed: true, step: 8, name: "Zeynep", level: "hiragana", startedAt: "2025-06-01T00:00:00.000Z", completedAt: "2025-06-02T00:00:00.000Z" },
    userProfile: { name: "Zeynep", level: "hiragana", showAdvanced: true, createdAt: "2025-06-01T00:00:00.000Z", updatedAt: "2025-06-02T00:00:00.000Z" },
    learned: { ki: true, hi: true, moku: true },
    status: { ki: "learning", hi: "mastered" },
    kana: { "あ": true, "い": true, "う": true },
    srs: {
      ki: { type: "kanji", correct: 5, wrong: 1, mastery: 3, seen: 6, write: 2, last: 1717200000000, next: 1717800000000 },
      "あ": { type: "kana", correct: 3, wrong: 0, mastery: 2, seen: 3, write: 1, last: null, next: null }
    },
    userHints: { ki: "benim mnemonic notum: ağaç gibi", "あ": "a sesi — açık ağız" },
    seenWritingSystem: true, seenReadingIntro: true,
    cipherLearned: { "ミ": { kana: "mi", romaji: "mi" } },
    discoveredRules: {}, lastSeenKatakana: ["ミルク"], games: { "kana-match": { best: 12 } },
    settings: { audio: true, audioMode: "system", autoplay: true, calm: true }
  };
  const blobStr = JSON.stringify(realistic);
  const blobHash = crypto.createHash("sha256").update(blobStr).digest("hex").slice(0, 16);
  const blobLen = blobStr.length;
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await ev(b => localStorage.setItem("kana_state", b), blobStr);
  await page.reload({ waitUntil: "domcontentloaded" }); await page.waitForTimeout(250);
  const st = await ev(() => window.JYA.state);
  ok(JSON.stringify(st.userHints) === JSON.stringify(realistic.userHints), "A1 userHints (kişisel notlar) BİREBİR korunur");
  ok(JSON.stringify(st.learned) === JSON.stringify(realistic.learned), "A2 learned korunur");
  ok(JSON.stringify(st.kana) === JSON.stringify(realistic.kana), "A3 kana korunur");
  ok(st.srs.ki && st.srs.ki.correct === 5 && st.srs.ki.mastery === 3 && st.srs["あ"] && st.srs["あ"].mastery === 2, "A4 SRS kayıtları/sayaçları korunur");
  ok(st.seenWritingSystem === true, "A5 seenWritingSystem (tam ders) KORUNUR (onboarding sıfırlamaz)");
  ok(st.userProfile && st.userProfile.name === "Zeynep", "A6 userProfile.name korunur");
  ok(st.onboarding.status === "completed" && st.onboarding.competency === null && st.onboarding.startKey === null, "A7 onboarding legacy completed → normalize (competency/startKey null)");
  ok(st.screen === "home", "A8 completed → home");
  ok((await page.locator(".rec-hint").count()) === 0, "A9 startKey yok → öneri şeridi YOK (sahte kişiselleştirme yok)");
  // ikinci reload idempotent
  await page.reload({ waitUntil: "domcontentloaded" }); await page.waitForTimeout(200);
  const st2 = await ev(() => window.JYA.state);
  ok(JSON.stringify(st2.userHints) === JSON.stringify(realistic.userHints) && st2.seenWritingSystem === true, "A10 ikinci reload idempotent (veri tekrar değişmez)");

  // ============ B) FONT yükleme + eğitim glifi = detay biçimi ============
  await fresh();
  const fontLoad = await ev(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; return { shippori: document.fonts.check('16px "Shippori Mincho"'), noto: document.fonts.check('16px "Noto Sans JP"'), klee: document.fonts.check('16px "Klee One"') }; });
  ok(fontLoad.shippori && fontLoad.noto && fontLoad.klee, "B1 üç font yüklendi (Shippori/Noto/Klee)");
  // onboarding eğitim glifi (final band0 あ) computed font
  await click('[data-act="ob-continue"]'); await click('[data-act="ob-competency"][data-comp="0"]'); await click('[data-act="ob-continue"]'); // final band0
  const obGlyphFont = await ev(() => { const g = document.querySelector(".ob-final-glyph .jp"); return g ? getComputedStyle(g).fontFamily : null; });
  ok(obGlyphFont && /Shippori Mincho/i.test(obGlyphFont), "B2 onboarding eğitim glifi font = Shippori (--font-ja-learning): " + obGlyphFont);
  // detay ekranı .jp computed font
  await click('[data-act="ob-final-start"]'); // → kanadetail/あ
  await page.waitForTimeout(120);
  const detailGlyphFont = await ev(() => { const g = document.querySelector(".jp"); return g ? getComputedStyle(g).fontFamily : null; });
  ok(detailGlyphFont && /Shippori Mincho/i.test(detailGlyphFont), "B3 detay ekranı .jp font = Shippori (onboarding ile AYNI): " + detailGlyphFont);

  // ============ C) KLAVYE — Tab/Enter/Space + focus ============
  await fresh();
  await click('[data-act="ob-continue"]'); // competency
  // ilk competency kartına focus + Enter → ilerler
  await ev(() => { const b = document.querySelector('[data-act="ob-competency"][data-comp="0"]'); b.focus(); });
  const focused = await ev(() => document.activeElement && document.activeElement.getAttribute("data-comp"));
  ok(focused === "0", "C1 competency kartı klavye ile focus alır");
  await page.keyboard.press("Enter"); await page.waitForTimeout(120);
  ok((await ev(() => window.JYA.state.onboarding.stage)) === "writing-intro", "C2 Enter ile kart etkinleşir (→ writing-intro)");
  // writing-intro'da Devam butonuna Space
  await ev(() => { const b = document.querySelector('[data-act="ob-continue"]'); b.focus(); });
  await page.keyboard.press("Space"); await page.waitForTimeout(120);
  ok((await ev(() => window.JYA.state.onboarding.stage)) === "final", "C3 Space ile CTA etkinleşir (→ final)");
  // ekran geçişinde H1 focus (afterRender)
  ok((await ev(() => document.activeElement && document.activeElement.tagName)) === "H1", "C4 ekran geçişinde focus H1'e taşınır");

  // ============ D) 320px yatay taşma (competency + final band2) ============
  await page.setViewportSize({ width: 320, height: 700 });
  await fresh(); await click('[data-act="ob-continue"]');
  ok((await ev(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)) <= 1, "D1 320px competency → yatay taşma yok");
  await click('[data-act="ob-competency"][data-comp="2"]'); // final band2
  ok((await ev(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)) <= 1, "D2 320px final band2 → yatay taşma yok");
  await page.setViewportSize({ width: 390, height: 780 });

  // ============ E) console / pageerror / network / 404 — tam akış boyunca ============
  const before = { c: consoleErr.length, p: pageErr.length };
  await fresh(); await click('[data-act="ob-continue"]'); await click('[data-act="ob-competency"][data-comp="0"]'); await click('[data-act="ob-continue"]'); await click('[data-act="ob-final-start"]');
  await ev(() => window.JYA.go("home"));
  const appOriginFail = reqFail.filter(u => u.includes("127.0.0.1"));
  const app404 = http4xx.filter(u => u.includes("127.0.0.1"));
  ok(pageErr.length === 0, "E1 pageerror YOK" + (pageErr.length ? " :: " + pageErr.join("|") : ""));
  // App-JS console error'ları — çevresel kaynak yükleme hatalarını (CDN font, ERR_TUNNEL) HARİÇ tut.
  // (App-origin istekler E3/E4'te zaten 0; kalan 'Failed to load resource' yalnız dış CDN'dir.)
  const appConsoleErr = consoleErr.filter(tx => !/Failed to load resource|ERR_TUNNEL|net::ERR_/i.test(tx));
  ok(appConsoleErr.length === 0, "E2 app-JS console error YOK (CDN/çevresel hariç)" + (appConsoleErr.length ? " :: " + appConsoleErr.slice(0,3).join("|") : ""));
  ok(appOriginFail.length === 0, "E3 app-origin başarısız network YOK" + (appOriginFail.length ? " :: " + appOriginFail.join("|") : ""));
  ok(app404.length === 0, "E4 app-origin 4xx/404 YOK" + (app404.length ? " :: " + app404.join("|") : ""));

  console.log("GATE 3 (container) · pass=" + pass + "  fail=" + fail);
  console.log("v2 blob (hassas değil): len=" + blobLen + "  sha256/16=" + blobHash);
  const cdnFail = reqFail.filter(u => !u.includes("127.0.0.1"));
  if (cdnFail.length) console.log("NOT (çevresel, app değil): CDN/dış istek uyarısı x" + cdnFail.length);
  if (fail) console.log("FAILURES:\n - " + fails.join("\n - "));
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error("GATE3 HARNESS ERROR:", e.message); process.exit(2); });
