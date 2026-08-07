/* Home ilk-öneri şeridi (.rec-hint) — DOM SEVİYESİNDE görünürlük + klavye + tekillik testi.
   Neden ayrı dosya: regresyon 13aeff1'de mantık ve CSS ayakta kalıp yalnız markup düştüğü için
   logic-level test (shouldShowInitialRec) yeşil kaldı ama kullanıcı hiçbir şey görmedi.
   Bu suite bilerek DOM'a bakar: element var mı, gerçekten yüksekliği var mı, tıklanınca/Enter'la/
   Space'le doğru rotaya gidiyor mu, ve aynı ekranda ikinci bir tavsiye kalmış mı.

   DİKKAT: uygulamada pagehide/visibilitychange "lifecycle flush" var (save() → localStorage).
   Düz clear()+reload() İŞE YARAMAZ: reload'un pagehide'ı eski state'i geri yazar.
   Çözüm: clear/seed'den SONRA bu dokümanda setItem'i etkisizleştir. */
/* Batch E · TAŞINABİLİRLİK: Python sunucu sahipliği, sabit port 8907 ve /home/claude yolu
   KALDIRILDI. URL'yi run-browser-gates.mjs SMOKE_URL ile verir; sunucunun TEK sahibi odur.
   Assertion'lar, seçiciler, üç onboarding yolu, 44px ölçütü, mouse/Enter/Space davranışı,
   tekillik, marker semantiği, 320px taşma ve pageerror kontrolü DEĞİŞMEDİ. */
const { chromium } = require("playwright");
const URL = process.env.SMOKE_URL;
if (!URL) {
  console.error("YAPILANDIRMA HATASI: SMOKE_URL tanımlı değil.");
  console.error("Bu test tarayıcı kapısı koşucusu üzerinden çalışır:  node _faz2/run-browser-gates.mjs");
  process.exit(2);                     // hiçbir tarayıcı AÇILMADAN çıkar
}
/* Ekran görüntüsü: normal gate koşumunda DOSYA YAZILMAZ. Yalnız açık debug seçeneğiyle:
     HOME_REC_SHOT_DIR=<dizin> node _faz2/run-browser-gates.mjs
   Verilmezse hiçbir görüntü alınmaz (eski zorunlu /tmp/home_rec_*.png yan etkisi kaldırıldı). */
const SHOT_DIR = process.env.HOME_REC_SHOT_DIR || null;
const shot = async (p, ad) => {
  if (!SHOT_DIR) return;                                   // normal koşumda hiç dosya yazılmaz
  const path = require("path"), fs = require("fs");
  fs.mkdirSync(SHOT_DIR, { recursive: true });
  await p.screenshot({ path: path.join(SHOT_DIR, ad) });
};

(async () => {
  const b = await chromium.launch();
  try {
  const p = await b.newPage({ viewport:{width:390,height:780} });
  let pass=0, fail=0; const fails=[];
  const ok=(c,m)=>{ if(c)pass++; else { fail++; fails.push(m); } };
  const pe=[]; p.on("pageerror",e=>pe.push(e.message));

  const ev=(fn,a)=>p.evaluate(fn,a);
  const clk=async s=>{ await p.click(s,{timeout:6000}); await p.waitForTimeout(90); };
  async function fresh(){ await p.goto(URL,{waitUntil:"domcontentloaded"});
    await ev(()=>{ localStorage.clear(); try{ Storage.prototype.setItem=function(){}; }catch(e){} });
    await p.reload({waitUntil:"domcontentloaded"}); await p.waitForTimeout(250); }

  /* Şeridin GERÇEKTEN görünür olduğunu ölçer — varlık yetmez, kutusu olmalı. */
  const recBox = () => ev(()=>{
    const el=document.querySelector(".rec-hint");
    if(!el) return null;
    const r=el.getBoundingClientRect(), cs=getComputedStyle(el);
    return { n:document.querySelectorAll(".rec-hint").length, w:r.width, h:r.height,
             disp:cs.display, vis:cs.visibility, text:(el.textContent||"").replace(/\s+/g," ").trim(),
             tabindex:el.getAttribute("tabindex"), role:el.getAttribute("role"),
             aria:el.getAttribute("aria-label")||"", go:el.dataset.go, param:el.dataset.param||"" };
  });
  const tipCount = () => ev(()=>document.querySelectorAll(".tip-pill").length);
  const S = () => ev(()=>({ screen:JYA.state.screen, param:JYA.state.param,
                            sk:JYA.state.onboarding.startKey, st:JYA.state.onboarding.status }));
  /* Onboarding'i bitirip Home'a dönen yol. yol: "a-hayir" | "ki-hayir" | "harita" */
  async function completeVia(yol){
    await fresh();
    await clk('[data-act="ob-continue"]');
    if(yol==="a-hayir"){ await clk('[data-act="ob-no"]'); }
    else { await clk('[data-act="ob-yes"]');
           await clk(yol==="ki-hayir" ? '[data-act="ob-no"]' : '[data-act="ob-yes"]'); }
    await ev(()=>JYA.go("home")); await p.waitForTimeout(140);
  }

  // ---- 1) Şerit görünür + içeriği doğru (üç yolun üçü de) ----
  const yollar = [
    { yol:"a-hayir",  sk:"yazi-mantigi", go:"writing-system", param:"", label:"Japonca Yazı Mantığı", reason:"Yazının nasıl çalıştığını baştan öğren" },
    { yol:"ki-hayir", sk:"kanji-ki",     go:"detail",         param:"ki", label:"Kanji Atlası",        reason:"Hiraganan hazırsa doğrudan kanjiye geç" },
    { yol:"harita",   sk:"atlas-map",    go:"map",            param:"", label:"Kanji Haritası",       reason:"Kanjiler arasındaki bağları haritada keşfet" },
  ];
  for(const y of yollar){
    await completeVia(y.yol);
    const s=await S(), r=await recBox();
    ok(s.st==="completed" && s.sk===y.sk, `[${y.yol}] onboarding completed + startKey ${y.sk}`);
    ok(!!r, `[${y.yol}] .rec-hint DOM'da VAR (regresyon nöbetçisi)`);
    if(r){
      ok(r.n===1, `[${y.yol}] tam olarak 1 şerit (mükerrer yok)`);
      ok(r.h>0 && r.w>0 && r.disp!=="none" && r.vis!=="hidden", `[${y.yol}] gerçekten görünür (h=${r&&r.h})`);
      ok(r.h>=44, `[${y.yol}] dokunma hedefi >=44px (ölçülen ${r?Math.round(r.h):"-"}px)`);
      ok(r.text.indexOf("Senin için öneri")===0, `[${y.yol}] önek "Senin için öneri" ile başlıyor`);
      ok(r.text.includes(y.label), `[${y.yol}] etiket doğru: ${y.label}`);
      ok(r.text.includes(y.reason), `[${y.yol}] gerekçe doğru`);
      ok(r.go===y.go && r.param===y.param, `[${y.yol}] rota doğru: ${y.go}${y.param?"/"+y.param:""}`);
      ok(r.role==="button" && r.tabindex==="0", `[${y.yol}] role=button + tabindex=0`);
      ok(r.aria.includes(y.label), `[${y.yol}] aria-label anlamlı`);
    }
  }

  // ---- 2) TEK BİRİNCİL ÖNERİ: şerit görünürken tip-pill YOK ----
  await completeVia("ki-hayir");
  ok((await recBox())!==null, "tekillik: şerit görünür durumda");
  ok((await tipCount())===0, "şerit görünürken .tip-pill GİZLİ (ikinci tavsiye yok)");
  ok(await ev(()=>document.querySelectorAll(".rec-hint,.tip-pill").length)===1,
     "ekranda tek bir birincil öneri var");
  ok(await ev(()=>document.querySelectorAll(".stat-pill").length)===1,
     "ilerleme pili etkilenmedi (yalnız tavsiye geri çekildi)");

  // ---- 3) Fare ile tıklama → doğru rota ----
  await completeVia("ki-hayir");
  await clk(".rec-hint");
  { const s=await S(); ok(s.screen==="detail" && s.param==="ki", "tıklama → detail/ki"); }

  // ---- 4) KLAVYE: Enter ile açılıyor ----
  await completeVia("a-hayir");
  ok(await ev(()=>{ const el=document.querySelector(".rec-hint"); if(!el) return false;
                    el.focus(); return document.activeElement===el; }), "Enter: şerit klavyeyle odaklanabiliyor");
  await p.keyboard.press("Enter"); await p.waitForTimeout(160);
  { const s=await S(); ok(s.screen==="writing-system", "Enter ile açılıyor → writing-system"); }

  // ---- 5) KLAVYE: Space ile açılıyor (+ sayfa kaymıyor) ----
  await completeVia("harita");
  await ev(()=>{ const el=document.querySelector(".rec-hint"); if(el) el.focus(); });
  const scrollOnce = await ev(()=>window.scrollY);
  await p.keyboard.press("Space"); await p.waitForTimeout(160);
  { const s=await S(); ok(s.screen==="map", "Space ile açılıyor → map"); }
  ok((await ev(()=>window.scrollY))===scrollOnce, "Space sayfayı kaydırmadı (preventDefault çalışıyor)");

  // ---- 6) Şerit kalkınca .tip-pill GERİ GELİYOR ----
  await completeVia("ki-hayir");
  ok((await tipCount())===0, "geri-gelme öncesi: tip-pill yok");
  // gerçek anlamlı öğrenme eylemi → kalıcı marker yazılır
  await ev(()=>{ JYA.markFirstMeaningfulLearningAction("test-known"); JYA.go("home"); });
  await p.waitForTimeout(160);
  ok(await ev(()=>!!(JYA.state.onboarding||{}).firstMeaningfulActionAt), "anlamlı eylem markerı yazıldı");
  ok((await recBox())===null, "marker sonrası şerit KAYBOLDU");
  ok((await tipCount())===1, "şerit kalkınca .tip-pill GERİ GELDİ");
  ok(await ev(()=>document.querySelectorAll(".rec-hint,.tip-pill").length)===1,
     "yine tek öneri (boşluk da kalmadı, çift de olmadı)");

  // ---- 7) Şerit GÖRÜNMEMESİ gereken durumlar (sahte kişiselleştirme yok) ----
  await fresh(); await clk('[data-act="ob-continue"]'); await clk('[data-act="ob-home"]');
  ok((await S()).st==="skipped", "skipped kuruldu");
  ok((await recBox())===null, "skipped → şerit YOK");
  ok((await tipCount())===1, "skipped → tip-pill normal şekilde var");

  await p.goto(URL,{waitUntil:"domcontentloaded"});
  await ev(()=>{ localStorage.clear();
    localStorage.setItem("kana_state", JSON.stringify({ schemaVersion:2, screen:"home",
      onboarding:{ status:"completed", stage:"kanji-q", startKey:null } }));
    try{ Storage.prototype.setItem=function(){}; }catch(e){} });
  await p.reload({waitUntil:"domcontentloaded"}); await p.waitForTimeout(250);
  await ev(()=>JYA.go("home")); await p.waitForTimeout(120);
  ok((await recBox())===null, "startKey'siz eski completed → şerit YOK");

  await p.goto(URL,{waitUntil:"domcontentloaded"});
  await ev(()=>{ localStorage.clear();
    localStorage.setItem("kana_state", JSON.stringify({ schemaVersion:2, screen:"home",
      onboarding:{ status:"completed", stage:"kanji-q", startKey:"atlas-map",
                   firstMeaningfulActionAt:"2026-01-01T00:00:00.000Z" } }));
    try{ Storage.prototype.setItem=function(){}; }catch(e){} });
  await p.reload({waitUntil:"domcontentloaded"}); await p.waitForTimeout(250);
  await ev(()=>JYA.go("home")); await p.waitForTimeout(120);
  ok((await recBox())===null, "markerı olan kullanıcı → şerit YOK (tekrar gösterilmez)");

  // ---- 8) 320px: taşma yok ----
  await p.setViewportSize({width:320,height:640});
  await completeVia("ki-hayir");
  const ov = await ev(()=>{ const el=document.querySelector(".rec-hint");
    if(!el) return {miss:true};
    const r=el.getBoundingClientRect();
    return { miss:false, right:r.right, docW:document.documentElement.clientWidth,
             scrollW:document.documentElement.scrollWidth, h:r.h||r.height }; });
  ok(!ov.miss, "320px: şerit hâlâ render ediliyor");
  ok(!ov.miss && ov.right<=ov.docW+0.5, "320px: yatay taşma yok");
  ok(!ov.miss && ov.scrollW<=ov.docW+0.5, "320px: sayfa yatay kaymıyor");
  ok(!ov.miss && ov.h>=44, "320px: dokunma hedefi hâlâ >=44px");
  await shot(p, "home_rec_320.png");
  await p.setViewportSize({width:390,height:780});
  await completeVia("a-hayir");
  await shot(p, "home_rec_390.png");

  ok(pe.length===0, "pageerror YOK"+(pe.length?": "+pe.slice(0,3).join("|"):""));

  console.log("SMOKE home-rec · pass="+pass+"  fail="+fail);
  if(fail) console.log("FAILURES:\n - "+fails.join("\n - "));
  process.exitCode = fail?1:0;           // sunucuyu KAPATMAZ; sahibi run-browser-gates.mjs
  } finally {
    await b.close().catch(()=>{});       // her başarı/hata yolunda tarayıcı kapanır
  }
})().catch(e=>{ console.error("HARNESS ERR", e && e.message || e); process.exit(2); });
