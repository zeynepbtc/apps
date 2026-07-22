const { chromium } = require("/home/claude/.npm-global/lib/node_modules/playwright");
const URL = "file:///home/claude/apps-deploy/kanji-atlas/index.html";
(async () => {
  let fail=0; const A=(n,ok,x)=>{console.log((ok?"  ✓ ":"  ✗ ")+n+(x?" — "+x:""));if(!ok)fail++;};
  const b=await chromium.launch({headless:true}); const p=await b.newPage();
  const perr=[]; p.on("pageerror",e=>perr.push(e.message));
  await p.goto(URL,{waitUntil:"domcontentloaded"}); await p.waitForFunction(()=>window.STORE!==undefined,{timeout:15000});
  A("uygulama hatasız açıldı", perr.length===0, perr.join("|"));

  // helper: her fixture öncesi srs temizle; sonra srsRecord çağır; stored blob validateV2Shape
  const run = (setup) => p.evaluate((setupSrc)=>{
    state.srs={}; state._migrationQuarantine=undefined;
    const f = eval("("+setupSrc+")");
    const out = f();
    save();
    let validStored=false; try{ validStored = validateV2Shape(JSON.parse(localStorage.getItem("kana_state"))); }catch(e){ validStored=false; }
    return { out, srs: JSON.parse(JSON.stringify(state.srs)), quar: state._migrationQuarantine?JSON.parse(JSON.stringify(state._migrationQuarantine)):null, validStored };
  }, setup.toString());

  // F1 — yeni kana doğru
  let r = await run(()=>{ const res=srsRecord("あ",true); return {res, rec:state.srs["あ"]}; });
  A("F1 yeni kana: ok+type=kana", r.out.res.ok && r.out.rec.type==="kana");
  A("F1 seen=1 correct=1 mastery=1", r.out.rec.seen===1 && r.out.rec.correct===1 && r.out.rec.mastery===1);
  A("F1 last/next finite (>0)", Number.isFinite(r.out.rec.last)&&Number.isFinite(r.out.rec.next)&&r.out.rec.next>0);
  A("F1 stored blob validateV2Shape ✓", r.validStored===true);

  // F2 — yeni kanji yanlış
  r = await run(()=>{ const res=srsRecord("ichi",false); return {res, rec:state.srs["ichi"]}; });
  A("F2 yeni kanji: ok+type=kanji", r.out.res.ok && r.out.rec.type==="kanji");
  A("F2 seen=1 wrong=1 mastery=0", r.out.rec.seen===1 && r.out.rec.wrong===1 && r.out.rec.mastery===0);
  A("F2 stored blob validateV2Shape ✓", r.validStored===true);

  // F3 — mevcut v1-benzeri eksik kayıt (type/seen/write yok) → backfill
  r = await run(()=>{ state.srs["い"]={correct:2,wrong:1,mastery:2,last:5,next:9}; const res=srsRecord("い",true); return {res, rec:state.srs["い"]}; });
  A("F3 backfill: type=kana eklendi", r.out.rec.type==="kana");
  A("F3 seen ≥ correct+wrong", r.out.rec.seen >= r.out.rec.correct + r.out.rec.wrong);
  A("F3 write=0 dolduruldu", r.out.rec.write===0);
  A("F3 stored blob validateV2Shape ✓", r.validStored===true);

  // F4 — mevcut YANLIŞ type → resolver düzeltir
  r = await run(()=>{ state.srs["う"]={type:"kanji",correct:1,wrong:0,mastery:1,seen:1,write:0,last:null,next:null}; const res=srsRecord("う",true); return {res, rec:state.srs["う"]}; });
  A("F4 yanlış type 'kanji' → 'kana' düzeltildi", r.out.rec.type==="kana");
  A("F4 stored blob validateV2Shape ✓", r.validStored===true);

  // F5a — çözülemeyen YENİ key → kayıt yok, ok:false
  r = await run(()=>{ const res=srsRecord("NOPE_xyz",true); return {res, has:("NOPE_xyz" in state.srs)}; });
  A("F5a çözülemeyen yeni: ok:false reason=unresolved-type", r.out.res.ok===false && r.out.res.reason==="unresolved-type");
  A("F5a canonical srs kirlenmedi", r.out.has===false);
  A("F5a stored blob validateV2Shape ✓", r.validStored===true);

  // F5b — çözülemeyen MEVCUT kayıt → quarantine, srs'ten çıkar
  r = await run(()=>{ state.srs["NOPE2"]={type:"kana",correct:1,wrong:0,mastery:1,seen:1,write:0,last:null,next:null}; const res=srsRecord("NOPE2",true); return {res, has:("NOPE2" in state.srs)}; });
  A("F5b çözülemeyen mevcut: ok:false reason=quarantined", r.out.res.ok===false && r.out.res.reason==="quarantined");
  A("F5b srs'ten çıkarıldı + quarantine'de", r.out.has===false && r.quar && !!r.quar.srs["NOPE2"]);
  A("F5b stored blob validateV2Shape ✓", r.validStored===true);

  // F6 — word-known TEK eylem → seen+1, correct+1, mastery=2 (floor), tek çağrı
  r = await p.evaluate(()=>{
    state.srs={}; const wid = (DATA.words&&DATA.words[0]&&DATA.words[0].id)||null;
    const res = srsRecord(wid, true, {known:true}); save();
    let validStored=false; try{ validStored=validateV2Shape(JSON.parse(localStorage.getItem("kana_state"))); }catch(e){}
    return { wid, res, rec: state.srs[wid], validStored };
  });
  A("F6 word-known: type=word, ok", r.res.ok && r.rec.type==="word");
  A("F6 seen=1 (tek maruziyet), correct=1", r.rec.seen===1 && r.rec.correct===1);
  A("F6 mastery=2 (known tabanı, çift-çağrı yok)", r.rec.mastery===2);
  A("F6 stored blob validateV2Shape ✓", r.validStored===true);

  // F7 — RELOAD recovery yok: yeni kana+kanji cevabı yaz, kaydet, yenile
  await p.evaluate(()=>{ localStorage.clear(); state.srs={}; state._migrationQuarantine=undefined; state.kana={}; state.learned={}; srsRecord("か",true); srsRecord("ni",false); save(); });
  await p.reload({waitUntil:"domcontentloaded"}); await p.waitForFunction(()=>window.STORE!==undefined);
  const R7 = await p.evaluate(()=>({ ro:window.STORE.readOnly, ka:state.srs["か"], ni:state.srs["ni"], ver:JSON.parse(localStorage.getItem("kana_state")).schemaVersion }));
  A("F7 reload sonrası recovery YOK (readOnly=false)", R7.ro===false);
  A("F7 kayıtlar korundu (か type=kana, ni type=kanji)", R7.ka&&R7.ka.type==="kana" && R7.ni&&R7.ni.type==="kanji");
  A("F7 schemaVersion=2, boot hatasız", R7.ver===2 && perr.length===0, perr.join("|"));

  await b.close();
  console.log("\n5B-1 FIXTURES: "+(fail?("✗ "+fail+" kaldı"):"tümü geçti"));
  process.exit(fail?1:0);
})().catch(e=>{console.error("HATA:",e.message);process.exit(2)});
