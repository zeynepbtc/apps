const { chromium } = require("playwright");
const fs = require("fs");
const REPO="/home/claude/apps-deploy";
(async () => {
  let fail=0; const A=(n,ok,x)=>{console.log((ok?"✓":"✗")+" "+n+(x?" — "+x:"")); if(!ok)fail++;};
  const warns=[]; const b=await chromium.launch({headless:true}); const p=await b.newPage();
  p.on("console",m=>{ if(m.type()==="warning"||m.type()==="warn") warns.push(m.text()); });
  await p.addInitScript(()=>{
    window.__spy={audio:[],tts:0};
    const RA=window.Audio; window.Audio=function(u){ window.__spy.audio.push(u); const a=new RA(u); a.play=function(){ return Promise.reject(new Error("headless")); }; return a; };
    const s=window.speechSynthesis; if(s){ s.speak=function(){ window.__spy.tts++; }; }
  });
  await p.goto("file:///home/claude/atlas_drive_may30.html");
  await p.waitForFunction(()=>typeof window.__play!=="undefined",{timeout:15000});

  const reset=()=>p.evaluate(()=>{ window.__spy.audio=[]; window.__spy.tts=0; });

  // === Gerçek dosyalar fiziksel var mı (Atlas hedef) ===
  const files = ["audio/kana/a.mp3","audio/kana/ki.mp3","audio/word/ohayou.mp3"];
  files.forEach(f=>A("fiziksel dosya var: "+f, fs.existsSync(REPO+"/kanji-atlas/"+f)));

  // === Dikey dilim: kana (approved) dev → file, dosya var, TTS yok ===
  await reset();
  const kana = await p.evaluate(()=>{ window.__play.playAudio("あ","kana",null,"fixed","development"); return {audio:window.__spy.audio.slice(),tts:window.__spy.tts}; });
  A("kana あ (approved) dev → file (audio/kana/a.mp3), TTS yok", kana.audio.length===1 && kana.audio[0]==="audio/kana/a.mp3" && kana.tts===0);

  // === Gate 8: kanji (pending) dev → file + qa-pending WARNING ===
  await reset(); warns.length=0;
  const kanjiDev = await p.evaluate(()=>{ window.__play.playAudio("木","kanji",null,"fixed","development"); return {audio:window.__spy.audio.slice(),tts:window.__spy.tts}; });
  await p.waitForTimeout(50);
  A("Gate 8) kanji 木 (pending) dev → file oynatılıyor (audio/kana/ki.mp3)", kanjiDev.audio.length===1 && kanjiDev.audio[0]==="audio/kana/ki.mp3" && kanjiDev.tts===0);
  A("Gate 8) dev pending → qa-pending WARNING üretti", warns.some(w=>/qa-pending/.test(w)));

  // === Gate 7: kanji (pending) release → SILENT (dosya fiziksel var ama ÇALMAZ) ===
  await reset();
  const kanjiRel = await p.evaluate(()=>{ window.__play.playAudio("木","kanji",null,"fixed","release"); return {audio:window.__spy.audio.slice(),tts:window.__spy.tts}; });
  A("Gate 7) kanji 木 (pending) release → SILENT (dosya var ama Audio yok, TTS yok)", kanjiRel.audio.length===0 && kanjiRel.tts===0);

  // === word (approved veya pending) dev → file ===
  await reset();
  const word = await p.evaluate(()=>{ window.__play.playAudio("おはよう","word",null,"fixed","development"); return {audio:window.__spy.audio.slice(),tts:window.__spy.tts}; });
  A("word おはよう dev → file (audio/word/ohayou.mp3)", word.audio.length===1 && word.audio[0]==="audio/word/ohayou.mp3" && word.tts===0);

  // === Gate 9: sentence (tts) → file playback BEKLENMEZ; doğru policy (dev tts) ===
  await reset();
  const sent = await p.evaluate(()=>{
    const A=window.__audio, idx=A.buildAudioIndex(AUDIO_MANIFEST);
    const s=AUDIO_MANIFEST.entries.find(e=>e.kategori==="sentence");
    const res=A.resolveAudioEntry(idx,{category:"sentence",text:s.metin});
    window.__play.playAudio(s.metin,"sentence",null,"fixed","development");
    return { kind:res.kind, pol:A.resolveAudioPolicy(res,"development"), audio:window.__spy.audio.length, tts:window.__spy.tts };
  });
  A("Gate 9) sentence tts → file YOK, dev policy tts (speechSynthesis)", sent.kind==="tts" && sent.pol==="tts" && sent.audio===0 && sent.tts>=1);

  // === partition doğrulama (rapor) ===
  const rep = JSON.parse(fs.readFileSync(REPO+"/kanji-atlas/_faz2/audio-migration-report.json","utf-8"));
  A("rapor: 135 distinct kopya, 46 approved + 89 pending, Flick değişmedi",
    rep.copied.length===135 && rep.approved_files===46 && rep.pending_only_files===89 && rep.flick_unchanged===true);

  await b.close();
  console.log(fail===0?"\n✅ TAŞIMA SMOKE GEÇTİ (gerçek dosyalarla dev/release policy)":"\n❌ "+fail+" başarısız");
  process.exit(fail===0?0:1);
})().catch(e=>{console.error("HATA:",e.message);process.exit(2);});
