const { execSync } = require("child_process");
const commits = execSync("git log --reverse --format='%H;%ad' --date=short -- kanji-atlas/index.html", {encoding:"utf8", maxBuffer:1e8})
  .trim().split("\n").map(l=>{const [h,d]=l.split(";");return {h,d};});
const first = {};   // char -> {date, sha}
let prevOk = 0;
for (const c of commits) {
  let src;
  try { src = execSync(`git show ${c.h}:kanji-atlas/index.html`, {encoding:"utf8", maxBuffer:1e9}); }
  catch(e){ continue; }
  const m = src.match(/const DATA = (\{.*?\});/s);
  if (!m) continue;
  let D; try { D = JSON.parse(m[1]); } catch(e){ continue; }
  if (!D.chars) continue;
  prevOk++;
  for (const id in D.chars) {
    const r = D.chars[id];
    if (r.etymology && r.etymology.qaStatus === "reviewed" && !first[r.character]) {
      first[r.character] = { date: c.d, sha: c.h.slice(0,7), id };
    }
  }
}
console.log("taranan commit:", commits.length, "· DATA okunabilen:", prevOk);
const out = {};
for (const ch of Object.keys(first)) out[first[ch].id] = first[ch].date;
console.log(JSON.stringify(first, null, 0));
require("fs").writeFileSync("/tmp/reviewed_dates.json", JSON.stringify(out, null, 1));
console.log("toplam reviewed:", Object.keys(first).length);
