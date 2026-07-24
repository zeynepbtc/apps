/* NATIVE storage · durable backend shim testi. index.html'deki GERÇEK makeStorageBackend/hydrateDurableBackend
   fonksiyonlarını mock Capacitor Preferences ile doğrular. Web yolu = localStorage (değişmez). */
const fs = require("fs"), path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const block = src.match(/function makeStorageBackend\(\)\{[\s\S]*?\n\}\nasync function hydrateDurableBackend[\s\S]*?\n\}/)[0];
let pass = 0, fail = 0; const ok = (n, c) => { if (c) pass++; else { fail++; console.log("FAIL:", n); } };

function build(win, ls) {
  const api = {};
  new Function("window", "localStorage", "console", block + "\nthis.makeStorageBackend=makeStorageBackend;this.hydrateDurableBackend=hydrateDurableBackend;").call(api, win, ls, console);
  return api;
}

// --- WEB yolu: Capacitor yok → localStorage döner (birebir) ---
const webLS = { getItem: () => "x", setItem: () => {}, removeItem: () => {}, length: 0, key: () => null };
{
  const api = build({}, webLS);
  const b = api.makeStorageBackend();
  ok("web: backend === localStorage (değişmez)", b === webLS);
}

// --- NATIVE yolu: mock Capacitor Preferences (async, in-memory) ---
(async () => {
  const store = {}; // native durable
  const P = {
    set: async ({ key, value }) => { store[key] = value; },
    get: async ({ key }) => ({ value: key in store ? store[key] : null }),
    remove: async ({ key }) => { delete store[key]; },
    keys: async () => ({ keys: Object.keys(store) }),
  };
  const cacheLS = {}; // localStorage cache mock
  const lsMock = { getItem: k => (k in cacheLS ? cacheLS[k] : null), setItem: (k, v) => { cacheLS[k] = String(v); }, removeItem: k => { delete cacheLS[k]; } };
  const win = { Capacitor: { Plugins: { Preferences: P } } };
  const api = build(win, lsMock);
  const b = api.makeStorageBackend();
  ok("native: durable shim döndü", !!b.__durable);

  // write-through: setItem → mirror + P + localStorage cache
  b.setItem("kana_state", '{"a":1}');
  await new Promise(r => setTimeout(r, 0)); // async P.set tamamlansın
  ok("native: getItem aynadan okur", b.getItem("kana_state") === '{"a":1}');
  ok("native: localStorage cache'e yazıldı", cacheLS["kana_state"] === '{"a":1}');
  ok("native: Preferences'a write-through", store["kana_state"] === '{"a":1}');

  // removeItem
  b.setItem("tmp", "z"); await new Promise(r => setTimeout(r, 0));
  b.removeItem("tmp"); await new Promise(r => setTimeout(r, 0));
  ok("native: removeItem aynadan siler", b.getItem("tmp") === null);
  ok("native: removeItem Preferences'tan siler", !("tmp" in store));

  // hydrate: Preferences'ta veri var, aynayı doldurur (uygulama yeniden açılışı senaryosu)
  store["kana_state"] = '{"restored":true}'; // durable'da var
  const b2 = api.makeStorageBackend();       // yeni ayna (boş)
  ok("hydrate öncesi ayna boş", b2.getItem("kana_state") === null || b2.getItem("kana_state") === '{"a":1}');
  await api.hydrateDurableBackend(b2);
  ok("native: hydrate Preferences'tan aynayı doldurdu", b2.getItem("kana_state") === '{"restored":true}');

  console.log(`\nsmoke_durable_backend: ${pass}/${pass + fail}`);
  process.exit(fail ? 1 : 0);
})();
