const { chromium } = require("/home/claude/.npm-global/lib/node_modules/playwright");
const URL = "file:///home/claude/apps-deploy/kanji-atlas/index.html";
(async () => {
  let fail=0; const A=(n,ok,x)=>{console.log((ok?"  ✓ ":"  ✗ ")+n+(x?" — "+x:""));if(!ok)fail++;};
  const b=await chromium.launch({headless:true}); const p=await b.newPage();
  const perr=[]; p.on("pageerror",e=>perr.push(e.message));
  await p.goto(URL,{waitUntil:"domcontentloaded"}); await p.waitForFunction(()=>window.STORE!==undefined,{timeout:15000});

  // ---- Mastery geçiş tablosu (tam) ----
  console.log("— Mastery geçişleri (doğru/yanlış + next yeni mastery'den) —");
  const T = await p.evaluate(()=>{
    const out=[];
    for(let start=0; start<=4; start++){
      for(const correct of [true,false]){
        state.srs={}; const key="あ";
        state.srs[key]={type:"kana",correct:0,wrong:0,mastery:start,seen:(start>0?1:0),write:0,last:null,next:null};
        const res=srsRecord(key, correct);
        const r=state.srs[key];
        let valid=false; try{ valid=validateV2Shape(JSON.parse(localStorage.getItem("kana_state"))); }catch(e){}
        out.push({start,correct,m:r.mastery,wrong:r.wrong,seen:r.seen,gap:r.next-r.last,expGap:SRS_DAYS[r.mastery]*DAY,lastOk:Number.isFinite(r.last),valid,ok:res.ok});
      }
    }
    return out;
  });
  const expC=[1,2,3,4,4], expW=[0,1,1,2,3];
  for(const t of T){
    const em = t.correct ? expC[t.start] : expW[t.start];
    A(`m${t.start} ${t.correct?"doğru":"yanlış"} → ${em}`, t.m===em && t.ok);
    A(`   next=SRS_DAYS[${t.m}] (yeni mastery), last finite, stored v2-valid`, t.gap===t.expGap && t.lastOk && t.valid, t.correct?"":`wrong=${t.wrong} seen=${t.seen}`);
    if(!t.correct) A(`   yanlış: wrong+1 & seen+1`, t.wrong===1 && t.seen>=1);
  }

  // ---- Completion semantiği (a-d) ----
  console.log("— kanaLearned semantiği —");
  const C = await p.evaluate(()=>{
    const R={};
    state.srs={}; state.kana={};
    state.kana["あ"]=true;                                                              R.a=kanaLearned("あ"); // SRS yok + boolean true
    state.srs["い"]={type:"kana",correct:0,wrong:0,mastery:0,seen:1,write:0,last:null,next:null}; state.kana["い"]=true; R.b=kanaLearned("い"); // kana m0 + boolean true
    state.srs["う"]={type:"kana",correct:1,wrong:0,mastery:1,seen:1,write:0,last:null,next:null}; R.c=kanaLearned("う"); // kana m1 + boolean yok
    state.srs["え"]={type:"kanji",correct:0,wrong:0,mastery:0,seen:1,write:0,last:null,next:null}; state.kana["え"]=true; R.d1=kanaLearned("え"); // yanlış type + boolean true
    state.srs["お"]={type:"kanji",correct:1,wrong:0,mastery:3,seen:1,write:0,last:null,next:null}; state.kana["お"]=false; R.d2=kanaLearned("お"); // yanlış type m3 + boolean false
    return R;
  });
  A("(a) SRS yok + boolean true → true", C.a===true);
  A("(b) kana SRS m0 + boolean true → FALSE (SRS otorite)", C.b===false);
  A("(c) kana SRS m1 + boolean yok → true", C.c===true);
  A("(d1) yanlış-type + boolean true → true (legacy fallback)", C.d1===true);
  A("(d2) yanlış-type m3 + boolean false → FALSE (SRS sayılmaz)", C.d2===false);

  // ---- §9 denklik: migrated SEED (boolean true + srs m1) == boolean ----
  console.log("— §9 denklik —");
  const E = await p.evaluate(()=>{
    const all = DATA.hiragana.flat().filter(x=>x&&x.character).map(x=>x.character);
    const chars = all.slice(0,15);
    state.kana={}; state.srs={};
    chars.forEach(c=>{ state.kana[c]=true; state.srs[c]={type:"kana",correct:0,wrong:0,mastery:1,seen:1,write:0,last:null,next:null}; });
    const unmig = all.slice(15,16)[0]; state.kana[unmig]=true; // boolean true, srs yok
    const oldCount = [...chars,unmig].filter(c=>state.kana[c]===true).length;
    const newCount = [...chars,unmig].filter(c=>kanaLearned(c)).length;
    const perChar = [...chars,unmig].every(c=>kanaLearned(c)===(state.kana[c]===true));
    return {oldCount,newCount,perChar};
  });
  A("§9 öğrenilmiş adet: eski(boolean)==yeni(kanaLearned)", E.oldCount===E.newCount && E.newCount===16);
  A("§9 her karakter için kanaLearned==boolean (adet/grup/yüzde türer)", E.perChar===true);

  // ---- Regresyon: word-known semantiği ----
  const W = await p.evaluate(()=>{ state.srs={}; const wid=DATA.words[0].id; const res=srsRecord(wid,true,{known:true}); return {rec:state.srs[wid],ok:res.ok}; });
  A("REGRESYON word-known: mastery2/seen1/correct1", W.ok && W.rec.mastery===2 && W.rec.seen===1 && W.rec.correct===1);

  // ---- Regresyon: reload recovery yok ----
  await p.evaluate(()=>{ localStorage.clear(); state.srs={}; state.kana={}; state.learned={}; srsRecord("か",true); srsRecord("ni",false); save(); });
  await p.reload({waitUntil:"domcontentloaded"}); await p.waitForFunction(()=>window.STORE!==undefined);
  const R7 = await p.evaluate(()=>({ro:window.STORE.readOnly, ver:JSON.parse(localStorage.getItem("kana_state")).schemaVersion}));
  A("REGRESYON reload recovery YOK (readOnly=false, v2)", R7.ro===false && R7.ver===2 && perr.length===0, perr.join("|"));

  await b.close();
  console.log("\n5B-3 FIXTURES: "+(fail?("✗ "+fail+" kaldı"):"tümü geçti"));
  process.exit(fail?1:0);
})().catch(e=>{console.error("HATA:",e.message);process.exit(2)});
