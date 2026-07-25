/* GATE 2 · Onboarding — TARAYICI smoke (gerçek runtime + state + rota + reload).
   DOM-metin aramaz; window.JYA.state / rota / localStorage-migration / gerçek handler tıklamaları üzerinden doğrular.
   Sunucu: python http.server; URL env SMOKE_URL.

   2026-07-25 REVİZYON — eski "competency band" akışına yazılmış selector borcu temizlendi.
   Uygulamadaki güncel akış TANIMA MERDİVENİ'dir: welcome → kana-q (あ) → kanji-q (木).
   Kaldırılan eylemler: ob-competency, ob-final-start. Güncel eylemler: ob-continue, ob-yes, ob-no, ob-back, ob-home, ob-restart.
   Yol matrisi (Evet/Hayır dalları) smoke_recognition.js'te; bu dosya ONUN KAPSAMADIĞI şeyleri tutar:
   skip dalları, reload-resume, ilk-öneri marker mantığı, restart, migration, invariant düşüşü, t(), a11y, 320px.

   BİLİNEN BULGU (test değil, rapor): Home'daki ilk-öneri şeridinin MARKUP'ı artık render edilmiyor
   (showRecHint/recLabel/recReason hesaplanıyor ama şablona basılmıyor; .rec-hint yalnız CSS'te duruyor).
   Bu yüzden şerit DOM'da değil, MANTIK düzeyinde (__ob.shouldShowInitialRec) doğrulanıyor. Karar Zeynep'te. */
const { chromium } = require("playwright");
const URL = process.env.SMOKE_URL || "http://127.0.0.1:8899/index.html";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 780 } });
  const perr = [];
  page.on("pageerror", e => perr.push(e.message));

  let pass = 0, fail = 0; const fails = [];
  const ok = (c, m) => { if (c) pass++; else { fail++; fails.push(m); } };

  const ob = () => page.evaluate(() => window.JYA.state.onboarding);
  const scr = () => page.evaluate(() => ({ screen: window.JYA.state.screen, param: window.JYA.state.param }));
  const stage = async () => (await ob()).stage;
  const click = async (sel) => { await page.click(sel, { timeout: 8000 }); await page.waitForTimeout(80); };
  const evalr = (fn, arg) => page.evaluate(fn, arg);
  // Home ilk-öneri şeridi kararı — DOM değil, kanonik runtime mantığı.
  const recVisible = () => page.evaluate(() => {
    const o = window.JYA.state.onboarding || {};
    const d = (o.status === "completed" && o.startKey) ? window.__ob.startDescriptorFor(o.startKey) : null;
    return !!(d && window.__ob.shouldShowInitialRec(o));
  });

  /* DİKKAT: uygulamada pagehide/visibilitychange "lifecycle flush" var (save() → localStorage).
     Düz clear()/setItem + reload() İŞE YARAMAZ: reload'un pagehide'ı bellekteki eski state'i geri yazar.
     Çözüm: yazdıktan SONRA bu dokümanda setItem'i etkisizleştir → flush yazamaz, yeni doküman istediğimiz blob'la açılır. */
  async function seed(blob) {
    await page.goto(URL, { waitUntil: "domcontentloaded" });
    await page.evaluate(b => {
      if (b === null) localStorage.clear(); else localStorage.setItem("kana_state", b);
      try { Storage.prototype.setItem = function () {}; } catch (e) {}
    }, blob);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(250);
  }
  const freshLoad = () => seed(null);
  const loadBlob = (blob) => seed(typeof blob === "string" ? blob : JSON.stringify(blob));
  const V2 = (onb, extra) => Object.assign({ schemaVersion: 2, onboarding: onb, srs: {}, learned: {}, status: {}, kana: {}, userHints: {}, games: {}, settings: {}, cipherLearned: {}, discoveredRules: {}, lastSeenKatakana: [] }, extra || {});

  // Güncel akış kısayolları
  const toKanaQ  = async () => { await freshLoad(); await click('[data-act="ob-continue"]'); };
  const toKanjiQ = async () => { await toKanaQ(); await click('[data-act="ob-yes"]'); };

  // ---- 1) Fresh install → Karşılama ----
  await freshLoad();
  let s = await scr(), o = await ob();
  ok(s.screen === "onboarding" && o.stage === "welcome" && o.status === "in-progress", "1a fresh → onboarding/welcome/in-progress");
  ok(await page.locator(".ob-root .ob-title").first().isVisible(), "1b Karşılama başlığı görünür");
  ok(await page.locator('[data-act="ob-back"]').count() === 0, "1c welcome'da geri oku YOK");

  // ---- 2) Erken "Ana sayfaya git" → skipped (üç ekranda da) ----
  await freshLoad(); await click('[data-act="ob-home"]'); o = await ob(); s = await scr();
  ok(o.status === "skipped" && o.startKey === null && o.completedAt === null && typeof o.skippedAt === "string" && s.screen === "home",
     "2a welcome skip → skipped/startKey yok/sahte completedAt yok/home");
  await toKanaQ(); await click('[data-act="ob-home"]'); o = await ob();
  ok(o.status === "skipped" && o.startKey === null, "2b kana-q skip → skipped/temiz");
  await toKanjiQ(); await click('[data-act="ob-home"]'); o = await ob();
  ok(o.status === "skipped" && o.startKey === null, "2c kanji-q skip → skipped/temiz");
  ok(await recVisible() === false, "2d skipped → ilk-öneri şeridi YOK (sahte kişiselleştirme yok)");

  // ---- 3) Geri dalları + welcome'da geri okunun görünmesi ----
  await toKanjiQ();
  ok(await page.locator('[data-act="ob-back"]').count() === 1, "3a kanji-q'da geri oku VAR");
  await click('[data-act="ob-back"]'); ok(await stage() === "kana-q", "3b kanji-q→geri→kana-q");
  await click('[data-act="ob-back"]'); ok(await stage() === "welcome", "3c kana-q→geri→welcome");
  ok(await page.locator('[data-act="ob-back"]').count() === 0, "3d welcome'a dönünce geri oku kayboldu");

  // ---- 4) Reload-resume (her iki soru ekranı) ----
  await toKanaQ(); await page.reload({ waitUntil: "domcontentloaded" }); await page.waitForTimeout(200);
  o = await ob(); s = await scr();
  ok(s.screen === "onboarding" && o.stage === "kana-q", "4a reload → kana-q'dan sürer");
  await toKanjiQ(); await page.reload({ waitUntil: "domcontentloaded" }); await page.waitForTimeout(200);
  o = await ob(); s = await scr();
  ok(s.screen === "onboarding" && o.stage === "kanji-q", "4b reload → kanji-q'dan sürer");

  // ---- 5) İlk anlamlı eylem marker'ı: completed + startKey → şerit; gerçek doğru cevap → marker + şerit kapanır ----
  await toKanjiQ(); await click('[data-act="ob-yes"]');           // → atlas-map / completed
  o = await ob(); ok(o.status === "completed" && o.startKey === "atlas-map", "5a kanji-q Evet → completed/atlas-map");
  await evalr(() => window.JYA.go("home")); await page.waitForTimeout(70);
  ok(await recVisible() === true, "5b completed+startKey+marker yok → ilk-öneri AKTİF");
  await evalr(() => { const r = window.JYA.srsRecord("ki", true); window.__ob.markLearn(r, true, "quiz"); window.JYA.go("home"); });
  await page.waitForTimeout(70); o = await ob();
  ok(typeof o.firstMeaningfulActionAt === "string", "5c doğru anlamlı eylem → marker yazıldı");
  ok(await recVisible() === false, "5d marker sonrası ilk-öneri BOŞLUKSUZ kapanır");

  // ---- 6) Yanlış cevap / başarısız kayıt marker YAZMAZ ----
  await toKanaQ(); await click('[data-act="ob-no"]');             // → yazi-mantigi / completed
  o = await ob(); ok(o.status === "completed" && o.startKey === "yazi-mantigi" && o.firstMeaningfulActionAt == null, "6a kana-q Hayır → completed/yazi-mantigi, marker yok");
  await evalr(() => { const r = window.JYA.srsRecord("ki", false); window.__ob.markLearn(r, false, "quiz"); });
  o = await ob(); ok(o.firstMeaningfulActionAt == null, "6b yanlış cevap → marker YOK");
  await evalr(() => { window.__ob.markLearn({ ok: false }, true, "quiz"); });
  o = await ob(); ok(o.firstMeaningfulActionAt == null, "6c başarısız kayıt (ok=false) → marker YOK");
  ok(await recVisible() === true, "6d yanlış/gezinme sonrası ilk-öneri HÂLÂ aktif");

  // ---- 7) SRS reset sonrası marker korunur → şerit geri gelmez ----
  await evalr(() => { window.__ob.markFirstMeaningfulLearningAction("known-kana"); window.JYA.state.srs = {}; window.JYA.save(); window.JYA.go("home"); });
  await page.waitForTimeout(60); o = await ob();
  ok(typeof o.firstMeaningfulActionAt === "string" && await recVisible() === false, "7 SRS reset sonrası marker kalır → şerit dönmez");

  // ---- 8) Import: eski correct>0 ama marker yok → şerit GÖSTERİLİR (yeni eylem beklenir) ----
  await loadBlob(V2({ status: "completed", stage: "kanji-q", startKey: "atlas-map", firstMeaningfulActionAt: null, completed: true },
    { srs: { "ki": { type: "kanji", correct: 6, wrong: 0, mastery: 3, seen: 6, write: 0, last: null, next: null } } }));
  s = await scr(); ok(s.screen === "home", "8a import completed → home");
  ok(await recVisible() === true, "8b IMPORT: eski correct>0 + marker yok → şerit GÖSTERİLİR");

  // ---- 9) Restart: ilerleme/name/marker korunur; yeniden tamamlayınca şerit dönmez ----
  await loadBlob(V2({ status: "completed", stage: "kanji-q", startKey: "atlas-map", firstMeaningfulActionAt: "2026-01-01T00:00:00.000Z", completed: true },
    { userProfile: { name: "Zeynep", level: "beginner", createdAt: "2025-01-01T00:00:00.000Z" }, srs: { "あ": { type: "kana", correct: 2, wrong: 0, mastery: 2, seen: 2, write: 0, last: null, next: null } } }));
  await evalr(() => window.JYA.go("profile")); await page.waitForTimeout(70);
  ok(await page.locator('[data-act="ob-restart"]').count() === 1, "9a Profil'de 'yeniden başlat' düğmesi var");
  await click('[data-act="ob-restart"]');
  o = await ob(); s = await scr();
  ok(s.screen === "onboarding" && o.stage === "welcome" && o.status === "in-progress", "9b restart → onboarding/welcome/in-progress");
  ok(o.firstMeaningfulActionAt === "2026-01-01T00:00:00.000Z", "9c restart → marker KORUNUR (dönen kullanıcı yeniden dürtülmez)");
  const up = await evalr(() => window.JYA.state.userProfile);
  const srsN = await evalr(() => Object.keys(window.JYA.state.srs).length);
  ok(up && up.name === "Zeynep" && srsN >= 1, "9d restart → isim + öğrenme ilerlemesi KORUNUR");
  await click('[data-act="ob-continue"]'); await click('[data-act="ob-yes"]'); await click('[data-act="ob-yes"]');
  await evalr(() => window.JYA.go("home")); await page.waitForTimeout(60);
  ok(await recVisible() === false, "9e yeniden tamamla → marker dolu → şerit DÖNMEZ");

  // ---- 10) Migration: eski completed / eski incomplete ----
  await loadBlob(V2({ completed: true, step: 8, name: "X", level: "hiragana" }));
  o = await ob(); s = await scr();
  ok(o.status === "completed" && o.startKey === null && s.screen === "home", "10a eski completed → completed, startKey null, home");
  ok(await recVisible() === false, "10b eski completed (startKey yok) → şerit YOK");
  await loadBlob(V2({ completed: false, step: 3 }));
  o = await ob(); s = await scr();
  ok(o.status === "in-progress" && o.stage === "welcome" && s.screen === "onboarding", "10c eski incomplete → in-progress/welcome/onboarding");

  // ---- 11) Invariant güvenli düşüş (kaldırılan stage'ler dâhil) ----
  await loadBlob(V2({ status: "in-progress", stage: "competency", competency: 1 }));
  o = await ob(); ok(o.stage === "welcome", "11a KALDIRILAN stage 'competency' → welcome düşüşü");
  await loadBlob(V2({ status: "in-progress", stage: "zzz-bozuk" }));
  o = await ob(); ok(o.stage === "welcome", "11b bozuk stage → welcome düşüşü");
  await loadBlob(V2({ status: "completed", stage: "kana-q", startKey: "zzz-yok", completed: true }));
  o = await ob(); ok(o.startKey === null, "11c completed + geçersiz startKey → null (sahte öneri yok)");
  await loadBlob(V2({ status: "completed", stage: "kana-q", startKey: "atlas-map", completed: true }));
  o = await ob(); ok(o.startKey === "atlas-map", "11d completed + geçerli startKey KORUNUR");

  // ---- 12) t() fallback (gerçek runtime) ----
  const tRes = await evalr(() => ({ hit: window.__ob.t("onboarding.actions.start"), miss: window.__ob.t("yok.olan.x"), de: window.__ob.t("onboarding.actions.start", "de") }));
  ok(typeof tRes.hit === "string" && tRes.hit.length > 0 && tRes.miss === "yok.olan.x" && tRes.de === tRes.hit, "12 t() fallback: locale→tr→key, çökme yok");

  // ---- 13) lang="ja" glifler + ekran geçişinde H1 focus ----
  await toKanaQ();
  ok(await page.locator('.ob-stage [lang="ja"]').count() >= 1, "13a kana-q Japonca glif lang=\"ja\"");
  let activeTag = await evalr(() => document.activeElement && document.activeElement.tagName);
  ok(activeTag === "H1", "13b kana-q geçişinde focus H1'e taşınır");
  await click('[data-act="ob-yes"]');
  ok(await page.locator('.ob-stage [lang="ja"]').count() >= 1, "13c kanji-q Japonca glif lang=\"ja\"");
  activeTag = await evalr(() => document.activeElement && document.activeElement.tagName);
  ok(activeTag === "H1", "13d kanji-q geçişinde focus H1'e taşınır");

  // ---- 14) 320px yatay taşma yok (üç ekran) ----
  await page.setViewportSize({ width: 320, height: 700 });
  const ovf = () => evalr(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await freshLoad(); let v = await ovf(); ok(v <= 1, "14a 320px welcome → taşma yok, got " + v);
  await click('[data-act="ob-continue"]'); v = await ovf(); ok(v <= 1, "14b 320px kana-q → taşma yok, got " + v);
  await click('[data-act="ob-yes"]'); v = await ovf(); ok(v <= 1, "14c 320px kanji-q → taşma yok, got " + v);
  await page.setViewportSize({ width: 390, height: 780 });

  // Kanıt ekran görüntüleri
  await toKanaQ(); await page.screenshot({ path: "/home/claude/smoke_b2_kana_q.png" });
  await click('[data-act="ob-yes"]'); await page.screenshot({ path: "/home/claude/smoke_b2_kanji_q.png" });

  ok(perr.length === 0, "runtime: JS pageerror yok" + (perr.length ? " :: " + perr.join(" | ") : ""));

  console.log("GATE 2 · smoke_onboarding_b2:  pass=" + pass + "  fail=" + fail + "  pageerrors=" + perr.length);
  if (fail) console.log("FAILURES:\n - " + fails.join("\n - "));
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error("SMOKE HARNESS ERROR:", e.message); process.exit(2); });
