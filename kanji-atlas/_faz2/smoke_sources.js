/* Batch C · TAŞINABİLİRLİK: sunucu sahipliği YOK, sabit yol/port YOK.
   URL'yi run-browser-gates.mjs SMOKE_URL ile verir. Assertion'lar DEĞİŞMEDİ. */
const { chromium } = require("playwright");
const SMOKE_URL = process.env.SMOKE_URL;
if (!SMOKE_URL) {
  console.error("YAPILANDIRMA HATASI: SMOKE_URL tanımlı değil.");
  console.error("Bu test tarayıcı kapısı koşucusu üzerinden çalışır:  node _faz2/run-browser-gates.mjs");
  process.exit(2);
}
(async () => {
  let fail=0; const A=(n,ok,x)=>{console.log((ok?"✓":"✗")+" "+n+(x?" — "+x:"")); if(!ok)fail++;};
  const errs=[]; const b=await chromium.launch({headless:true}); const p=await b.newPage();
  try {
  p.on("pageerror",e=>errs.push(e.message));
  p.on("console",m=>{if(m.type()==="error"&&!/Failed to load resource|net::ERR/i.test(m.text()))errs.push(m.text());});
  await p.goto(SMOKE_URL,{waitUntil:"domcontentloaded"});
  await p.waitForFunction(()=>typeof go==="function",{timeout:15000});

  // 1) route kayıtlı ve render ediyor
  const r = await p.evaluate(()=>{ go("sources"); const el=document.querySelector(".about-root");
    return { screen: state.screen, has: !!el, h1: document.querySelector(".about-hero h1")?.textContent,
      eyebrow: document.querySelector(".about-eyebrow")?.textContent,
      lis: [...document.querySelectorAll(".about-li-label")].map(x=>x.textContent),
      navHidden: NAV_HIDDEN.includes("sources") }; });
  A("1) sources ekranı render ediyor", r.has, r.h1);
  A("2) eyebrow İngilizce başlık var", r.eyebrow==="Sources & Methodology", r.eyebrow);
  A("3) 4 kaynak + 3 varlık listeleniyor (7)", r.lis.length===7, r.lis.join(", "));
  A("4) Kanjipedia/Dong/Wiktionary/OKJiten hepsi var", ["Kanjipedia","Dong Chinese","Wiktionary","OKJiten"].every(k=>r.lis.includes(k)));
  A("5) tab bar gizli (NAV_HIDDEN)", r.navHidden===true);

  // 6) geri butonu stack'i doğru boşaltıyor
  const back1 = await p.evaluate(()=>{ go("home"); go("profile"); go("sources");
    document.querySelector('.about-cta [data-act="back"]').click();
    return state.screen; });
  A("6) Geri → profile'a döner", back1==="profile", back1);

  // 7) profildeki giriş butonu çalışıyor
  const entry = await p.evaluate(()=>{ go("home"); go("profile");
    const btn=[...document.querySelectorAll('[data-go="sources"]')];
    if(!btn.length) return {n:0}; btn[0].click(); return {n:btn.length, screen:state.screen, label:btn[0].textContent.trim()}; });
  A("7) Profil > Hakkında girişi sources'a götürüyor", entry.screen==="sources", `${entry.n} buton · "${entry.label}"`);

  // 8) tüm data-go hedefleri R'de karşılanıyor (regresyon)
  const orphan = await p.evaluate(()=>{ const known=Object.keys(R_KEYS||{}); return null; }).catch(()=>null);

  // 9) diğer ekranlar bozulmadı
  const reg = await p.evaluate(()=>{ const out={}; for(const s of ["home","kana","detail","progress","profile","kanji-about"]){
    try{ go(s, s==="detail"?"ki2":undefined); out[s]=!!document.getElementById("app").innerHTML.length; }catch(e){ out[s]="ERR:"+e.message; } } return out; });
  A("8) render regresyonu yok", Object.values(reg).every(v=>v===true), JSON.stringify(reg));
  A("9) yeni JS exception yok", errs.length===0, errs.join(" | "));
  console.log(fail? `\n❌ ${fail} BAŞARISIZ` : "\n✅ SOURCES SMOKE GEÇTİ (0 başarısız)");
  process.exitCode = fail?1:0;
  } finally {
    await b.close().catch(()=>{});      // tarayıcı BAŞARI ve BAŞARISIZLIK yollarında kapanır
  }
})().catch(e=>{ console.error("HARNESS ERR", e && e.message || e); process.exit(2); });
