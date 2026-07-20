const { chromium } = require("playwright");
const fs = require("fs");
(async () => {
  let fail=0; const A=(n,ok,x)=>{console.log((ok?"✓":"✗")+" "+n+(x?" — "+x:"")); if(!ok)fail++;};
  const errs=[]; const b=await chromium.launch({headless:true}); const p=await b.newPage();
  p.on("pageerror",e=>errs.push(e.message));
  p.on("console",m=>{if(m.type()==="error"&&!/Failed to load resource|net::ERR/i.test(m.text()))errs.push(m.text());});
  await p.goto("file:///home/claude/atlas_drive_may30.html");
  await p.waitForFunction(()=>typeof window.__audio!=="undefined",{timeout:15000});

  // === ÇÖZÜM (gerçek manifest) ===
  const R = await p.evaluate(()=>{
    const A=window.__audio, MAN=AUDIO_MANIFEST;
    const before = JSON.stringify(MAN);                 // Gate 5: mutate?
    const idx = A.buildAudioIndex(MAN);
    const after = JSON.stringify(MAN);
    // Gate 1: 20 çapraz çakışma
    const kanjiTexts = MAN.entries.filter(e=>e.kategori==="kanji").map(e=>e.metin);
    const collide=[...new Set(kanjiTexts.filter(m=>MAN.entries.some(e=>e.kategori==="word"&&e.metin===m)))];
    const split = collide.every(m=>{
      const k=A.resolveAudioEntry(idx,{category:"kanji",text:m}), w=A.resolveAudioEntry(idx,{category:"word",text:m});
      return k.entry&&k.entry.kategori==="kanji" && w.entry&&w.entry.kategori==="word" && k.entry.id!==w.entry.id;
    });
    // Gate 3: 4 tekilleştirilen cümle tek kayda
    const shared=["学校へ行きます。","日本語を話します。","水を飲みます。","ご飯を食べます。"];
    const single = shared.every(s=>{ const r=A.resolveAudioEntry(idx,{category:"sentence",text:s}); return r.kind!=="duplicate" && r.entry && r.entry.kategori==="sentence"; });
    // Gate 6: manifest ID önceliği (id word değil kanji_ki'ye)
    const kanjiKi = A.resolveAudioEntry(idx,{category:"word",text:"木",manifest:"kanji_ki"});
    // Gate 7: yanlış ID fallback etmez
    const wrongId = A.resolveAudioEntry(idx,{category:"kanji",text:"木",manifest:"yok_boyle_id"});
    // Gate 8/9: not-found diagnostic
    const nf = A.resolveAudioEntry(idx,{category:"kanji",text:"絶"});
    // kind örnekleri
    const kiEntry = A.resolveAudioEntry(idx,{category:"kanji",text:"木"});
    return { mutate: before!==after, collideN:collide.length, split, single,
             idKind:kanjiKi.kind, idId:kanjiKi.entry&&kanjiKi.entry.id,
             wrongKind:wrongId.kind, wrongEntry:wrongId.entry,
             nfKind:nf.kind, nfDiag:nf.diagnostic, kiKind:kiEntry.kind };
  });
  console.log("=== çözüm ===");
  A("Gate 5) buildAudioIndex manifesti MUTATE ETMİYOR", R.mutate===false);
  A("Gate 1) 20 çapraz çakışmanın tümü doğru kategoriye ayrışıyor", R.collideN>=20 && R.split, R.collideN+" çakışma");
  A("Gate 3) 4 tekilleştirilen cümle tek kayda çözülüyor", R.single);
  A("Gate 6) manifest ID önceliği: word+木+id:kanji_ki → kanji_ki (kategori+metin değil)", R.idKind==="recorded" && R.idId==="kanji_ki");
  A("Gate 7) yanlış manifest ID → not-found, başka kayda FALLBACK ETMİYOR", R.wrongKind==="not-found" && R.wrongEntry===null);
  A("Gate 8/9) not-found diagnostic üretiyor (category+text+reason)", R.nfKind==="not-found" && R.nfDiag && R.nfDiag.reason==="not-found");
  A("kind sınıflandırma: kanji木 → recorded", R.kiKind==="recorded");

  // === POLİTİKA MATRİSİ (kind × mode) ===
  const P = await p.evaluate(()=>{
    const pol=window.__audio.resolveAudioPolicy;
    const rec=k=>({kind:"recorded",entry:{durum:"recorded",ses_dosyasi:"audio/word/x.mp3",dogrulanmali:k}});
    const recNoFile={kind:"recorded",entry:{durum:"recorded",ses_dosyasi:null}};
    return {
      apprDev:pol(rec(false),"development"), apprRel:pol(rec(false),"release"),
      pendDev:pol(rec(true),"development"),  pendRel:pol(rec(true),"release"),
      noFileDev:pol(recNoFile,"development"),noFileRel:pol(recNoFile,"release"),
      ttsDev:pol({kind:"tts"},"development"),  ttsRel:pol({kind:"tts"},"release"),
      missDev:pol({kind:"missing"},"development"), missRel:pol({kind:"missing"},"release"),
      dupDev:pol({kind:"duplicate"},"development"), dupRel:pol({kind:"duplicate"},"release"),
      nfDev:pol({kind:"not-found"},"development"), nfRel:pol({kind:"not-found"},"release"),
      invDev:pol({kind:"invalid"},"development"), invRel:pol({kind:"invalid"},"release"),
      unknownMode:pol({kind:"tts"},"garbage")
    };
  });
  console.log("=== politika matrisi ===");
  A("recorded+approved+file → file/file", P.apprDev==="file" && P.apprRel==="file");
  A("Gate 10) recorded+pending → dev file / release SILENT (onaysız oynatma yok)", P.pendDev==="file" && P.pendRel==="silent");
  A("recorded+invalid file → dev tts / release silent", P.noFileDev==="tts" && P.noFileRel==="silent");
  A("tts → dev tts / release silent", P.ttsDev==="tts" && P.ttsRel==="silent");
  A("missing → dev tts / release silent", P.missDev==="tts" && P.missRel==="silent");
  A("duplicate → dev tts / release silent", P.dupDev==="tts" && P.dupRel==="silent");
  A("not-found → dev tts / release silent", P.nfDev==="tts" && P.nfRel==="silent");
  A("invalid durum → silent / silent", P.invDev==="silent" && P.invRel==="silent");
  A("tanınmayan mode → release gibi (silent)", P.unknownMode==="silent");

  // === Gate 4: saf + deterministik + state değişmez ===
  const pure = await p.evaluate(()=>{
    const A=window.__audio, idx=A.buildAudioIndex(AUDIO_MANIFEST);
    const sb=JSON.stringify(window.JYA.state);
    const r1=JSON.stringify(A.resolveAudioEntry(idx,{category:"kanji",text:"木"}));
    const r2=JSON.stringify(A.resolveAudioEntry(idx,{category:"kanji",text:"木"}));
    A.resolveAudioPolicy({kind:"tts"},"release");
    return { det:r1===r2, state:sb===JSON.stringify(window.JYA.state) };
  });
  A("Gate 4) resolver saf + deterministik + state değişmez", pure.det && pure.state);

  // === entegrasyon YOK (speak byte-identical / tüketici yok) ===
  const src=fs.readFileSync("/home/claude/apps-deploy/kanji-atlas/index.html","utf-8");
  const cc=(f)=>(src.match(new RegExp(f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g"))||[]).length;
  A("6a: resolver/policy speak()'e bağlı DEĞİL (çağrı-sözdizimi=yalnız tanım)",
    cc("resolveAudioEntry(")===1 && cc("buildAudioIndex(")===1 && cc("resolveAudioPolicy(")===1);
  A("runtime manifest fetch yok", !/fetch[^;\n]{0,80}manifest/i.test(src));

  // === render regresyonu yok ===
  const rendered = await p.evaluate(()=>{ const o={}; for(const s of ["home","kana","detail","progress","review"]){try{window.JYA.go(s,s==="detail"?"ki":null,false);o[s]=document.body.children.length>0;}catch(e){o[s]="ERR";}} return o; });
  A("render regresyonu yok", Object.values(rendered).every(v=>v===true), JSON.stringify(rendered));
  A("yeni JS exception yok", errs.length===0, errs.slice(0,2).join(" | "));

  await b.close();
  console.log(fail===0?"\n✅ SES 6a SMOKE GEÇTİ (GPT 12 kapı + politika matrisi)":"\n❌ "+fail+" başarısız");
  process.exit(fail===0?0:1);
})().catch(e=>{console.error("HATA:",e.message);process.exit(2);});
