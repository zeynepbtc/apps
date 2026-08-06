import pkg from '/home/claude/.npm-global/lib/node_modules/playwright/index.js'; const { chromium } = pkg;
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium' });
const p = await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();
const errs=[]; p.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
p.on('console',m=>{ if(m.type()==='error' && !/fonts\.googleapis|ERR_CONNECTION/.test(m.text())) errs.push('CONSOLE: '+m.text()); });
await p.goto('file:///home/claude/apps-deploy/kanji-atlas/index.html',{waitUntil:'domcontentloaded'});
await p.evaluate(()=>{ state.onboarding={completed:true,step:99}; save&&save(); });
const shot=async(n)=>{await p.waitForTimeout(250); await p.screenshot({path:'/home/claude/gate1/'+n+'.png'});};
const res={};
for (const id of ['shiro','ima','akarui','hareru','toki']) {
  await p.evaluate(i=>go('detail',i), id);
  await p.waitForTimeout(250);
  res[id]=await p.evaluate(()=>{
    const heads=[...document.querySelectorAll('.section-t h3')].map(h=>h.textContent.trim());
    const romaji=[...document.querySelectorAll('.kv .it')].find(x=>x.querySelector('.lab')?.textContent==='Romaji')?.querySelector('.v')?.textContent||null;
    return {kokenBasligi:heads.includes('Kökeni'), romaji};
  });
  await shot('detail-'+id);
}
await p.evaluate(()=>go('review')); await p.waitForTimeout(300);
res.review=await p.evaluate(()=>{
  const btn=document.querySelector('[data-act="review-start"]');
  return {disabled:btn.disabled, opacity:getComputedStyle(btn).opacity, styleAttr:btn.getAttribute('style'), outer:btn.outerHTML.slice(0,140)};
});
await shot('review');
console.log(JSON.stringify(res,null,1));
console.log('HATALAR: '+(errs.length?JSON.stringify(errs):'YOK (0)'));
await b.close();
