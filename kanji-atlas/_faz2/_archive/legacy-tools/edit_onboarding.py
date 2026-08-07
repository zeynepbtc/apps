f = "/home/claude/atlas_drive_may30.html"; h = open(f, encoding="utf-8").read()

# A) entryPath türetici + rota resolver'ı completeOnboarding'den ÖNCE ekle
FUNCS = '''/* FAZ 2 · Onboarding: niyet (entryPath) sakla — ekran adı DEĞİL. Yönlendirme resolver'da türetilir. */
function deriveEntryPath(level){
  if(level==="hiragana") return "kanji-family";   // "Hiragana biliyorum, kanjiye girmek istiyorum" -> 木 vitrini
  if(level==="explorer") return "explore";         // "sen yonlendir" -> Atlas kesif
  return "kana";                                   // beginner / a_few / eksik/taninmayan -> guvenli varsayilan
}
function resolveEntryRoute(ep){
  const ROUTES = { "kana":{screen:"kanadetail",param:"あ"}, "kanji-family":{screen:"detail",param:"ki"}, "explore":{screen:"map",param:null} };
  return ROUTES[ep] || ROUTES["kana"];             // taninmayan -> kana (guvenli)
}
if(typeof window!=="undefined") window.__ob = { deriveEntryPath, resolveEntryRoute };
'''
anchor = "// Faz 7-A: onboarding tamamlanınca çağrılır."
assert h.count(anchor) == 1
h = h.replace(anchor, FUNCS + anchor, 1)

# B) completeOnboarding sonunda entryPath'i kalıcı sonuç olarak yaz
b_old = "    updatedAt: now\n  };\n  save();"
assert h.count(b_old) == 1, "completeOnboarding tail not unique: %d" % h.count(b_old)
h = h.replace(b_old, "    updatedAt: now\n  };\n  state.onboarding.entryPath = deriveEntryPath(state.onboarding.level);   // niyet (kalici sonuc)\n  save();", 1)

# C) ob-finish: koşulsuz あ yerine entryPath rotası + güvenli düşüş
c_old = '''  else if(act==="ob-finish"){
    // Son ekranda "Başla" → onboarding'i tamamlanmış işaretle + ilk derse düş (あ)
    completeOnboarding();
    go("kanadetail", "あ", false);
  }'''
assert h.count(c_old) == 1, "ob-finish block not unique"
c_new = '''  else if(act==="ob-finish"){
    // Başla → onboarding sonucundan (entryPath) türetilen rotaya git; koşulsuz あ DEĞİL
    completeOnboarding();
    const _r = resolveEntryRoute(state.onboarding.entryPath);
    const _valid = ["kanadetail","detail","map"].includes(_r.screen);
    go(_valid ? _r.screen : "home", _valid ? _r.param : null, false);   // hedef geçersizse ana ekrana güvenli düşüş
  }'''
h = h.replace(c_old, c_new, 1)

open(f, "w", encoding="utf-8").write(h)
print("onboarding entryPath + resolveEntryRoute uygulandı")
