# P0-5 (A+B) Production Release Planı — REVİZE 3 (ONAY BEKLİYOR · UYGULANMADI)

> Seçici production release snapshot (kilitli commit `d99e6ae`'den tek runtime dosya) + iki eski same-origin kopyanın inert tombstone'a çevrilmesi. Onaylanmadan hiçbir fetch/pull/restore/tag/edit/commit/push uygulanmaz.

## 0. Same-origin denetimi
Tehlike: production v2'ye geçince eski kopyanın v2 `kana_state`'e eski kodla `save()` yazması. Aynı `kana_state`'i okuyan app kopyaları: `kanji-atlas/` (hedef v2), `kanji-atlas-preview/`, `atlas-onizleme/` → son ikisi **inert tombstone** (§2).

## 1. Başlangıç — temiz worktree + main == origin/main (GATE)
```bash
git checkout main
git status --short                     # BOŞ olmalı; değilse DUR (otomatik stash/reset YOK)
git fetch origin --prune --tags
git pull --ff-only origin main         # beklenmedik merge commit yok
git status --short                     # yine BOŞ
git rev-parse main ; git rev-parse origin/main   # EŞİT olmalı → raporla
```

## 2. Release kaynağı — KİLİTLİ commit (hareketli branch DEĞİL) (GATE)
Snapshot, test edilen kesin commit **`d99e6ae`**'den alınır (yerel `faz2-kalem1` ilerleyebilir → kullanılmaz). Önce doğrula:
```bash
git show --no-patch --oneline d99e6ae        # "P0-5B-5 ..." beklenir
git branch --contains d99e6ae                # faz2-kalem1 içermeli
```
Runtime dosyası:
```bash
git restore --source=d99e6ae --staged --worktree kanji-atlas/index.html
# (eski Git: git checkout d99e6ae -- kanji-atlas/index.html)
```

## 3. İki eski kopya → INERT TOMBSTONE
`kanji-atlas-preview/index.html` ve `atlas-onizleme/index.html` şununla değiştirilir (uygulama JS'i / localStorage / kana_state / runtime asset YOK):
```html
<!doctype html><html lang="tr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'none'; connect-src 'none'; object-src 'none'; frame-src 'none'; style-src 'unsafe-inline'; img-src 'self'; base-uri 'none'; form-action 'none'">
<title>Önizleme kapatıldı</title></head>
<body style="font-family:-apple-system,system-ui,sans-serif;max-width:34rem;margin:12vh auto;padding:0 1.5rem;color:#272320;line-height:1.6">
<h1 style="font-size:1.4rem">Bu önizleme kapatıldı</h1>
<p>Bu önizleme ortamı artık kullanılmıyor. Güncel uygulama:</p>
<p><a href="/kanji-atlas/" style="color:#A4392C;font-weight:600">Kanji Atlas'ı aç →</a></p>
</body></html>
```
`<a href>` gezinmesi bu CSP ile çalışır (navigate-to gerekmez).
```bash
git add kanji-atlas-preview/index.html atlas-onizleme/index.html
```

## 4. Pre-release tag — annotated + remote + `^{}` doğrulaması (GATE)
```bash
git tag -l pre-p05-20260722                            # yerel çakışma (boş olmalı)
git ls-remote --tags origin pre-p05-20260722           # remote çakışma (boş olmalı)
git tag -a pre-p05-20260722 -m "Production before P0-5" main
git push origin pre-p05-20260722
git rev-parse main ; git rev-parse 'pre-p05-20260722^{}'   # peel — EŞİT olmalı (annotated tag-object değil commit)
```

## 5. Commit-öncesi kapılar (hepsi raporlanır) (GATE)
```bash
git diff --cached --name-status         # TAM 3 satır, hepsi M (aşağı); fazlası → DUR
git diff --cached --check               # whitespace/conflict marker yok
git diff --cached --stat
git diff --cached -- kanji-atlas/index.html
# ortam/debug sızıntı taraması (eşleşme=AÇIKLANIR):
git grep --cached -n -e 'kanji-atlas-staging' -e 'workers.dev' -e 'netlify' -e 'wrangler' -e '_faz2' -e 'localhost' -e 'console.debug'
# ÇALIŞAN HTML kopyaları — kana_state yalnız production runtime'da:
git grep --cached -n 'kana_state' -- '*.html'
#   BEKLENEN: yalnız kanji-atlas/index.html. Başka çalışan app HTML'i çıkarsa DUR.
# Tombstone NEGATİF doğrulama (çıktı BOŞ olmalı):
git grep --cached -n -e 'kana_state' -e 'localStorage' -e '<script' -- kanji-atlas-preview/index.html atlas-onizleme/index.html
```
**Beklenen `--cached --name-status`:**
```
M  kanji-atlas/index.html
M  kanji-atlas-preview/index.html
M  atlas-onizleme/index.html
```

## 6. Commit (audit izi) + push
```
P0-5A+B production release (secici snapshot d99e6ae): kanji-atlas -> v2 + eski same-origin kopyalar inert

Kaynak commitler (faz2-kalem1):
- P0-5A: 0b58eb5, db728bc, 61a3e0f
- P0-5B-1: 45bd2bc · 5B-2: 88b85ef · 5B-3: bce5aa9 · 5B-5: d99e6ae
Inert edilen ayni-origin kopyalar: kanji-atlas-preview/, atlas-onizleme/
```
`git push origin main`

## 7. Rollback — force-push YOK · tam-revert applicable DEĞİL · v2-uyumlu (kapsam haritası)
Tam `git revert <release-commit>` prod'u v1'e döndürür **VE iki kopyayı yeniden aktif eder** → uygulanabilir değil. Güvenli yol: **forward-fix → v2-uyumlu compatibility rollback → son çare tam v1.**

### V2-COMPATIBLE ROLLBACK KAPSAM HARİTASI
**KESİN KORUNUR (dokunulmaz — v2 kullanıcıyı bozar):**
- `SCHEMA_VERSION = 2`, `migrate`/`migrateV1ToV2`, `validateV2Shape`/`validSrsRecord`, `safeMerge`/`hydrate`/`createStorage` (forward-guard, backup+hash, read-only, `resetCanonical`), `APP_RESOLVER`/`makeTypeResolver`.
- **`srsRecord`'un v2-ŞEKİL üretimi** (type/seen/write). *Eski v1 şekline DÖNDÜRÜLEMEZ:* yeni kayıt type'sız kalır → validator reddeder → recovery (merge-gate). Bu ileri-kilitli.
- İki inert tombstone route.

**GÜVENLE GERİ ALINABİLİR (5B davranışları — v2 storage bozulmadan):**
- **Mastery yumuşatma** (5B-3 yanlış-dalı): `mastery<=1?mastery:mastery-1` → eski `Math.max(0,mastery-1)`. Storage v2 kalır, valid. Güvenli.
- **kanaLearned completion geçişi** (5B-3): 4 okuma tekrar boolean `state.kana`'ya döner (ayna hâlâ yazılıyor). **UI semantiği değişir** (mastery0 kana yine "öğrenilmiş" sayılır) ama veri silinmez. Güvenli-ama-semantik.
- **Kana review motoru** (5B-2): `buildKanaReviewQueue`/`kanaDueCount` UI'ya bağlı değil; devre dışı/kaldırma güvenli.

**GERİ ALINAMAZ:** `srsRecord` v1 yazıcı biçimi (yukarıda), word-known çift-çağrı (ölçüm bozardı — dönülmez).

**Rollback candidate üretimi (gerekirse):** temel = release commit; yukarıdaki "korunur" bloğu aynen; yalnız sorunlu "geri alınabilir" davranış revert; **test:** `smoke_p05a` (97) + reload-no-recovery + `validateV2Shape(stored)` + "srs kayıtlarında type/seen/write var" → hepsi yeşil olmadan aday geçersiz. *(Şimdi commit üretmiyoruz; harita hazır, acil durumda bu tabloyla dakikalar içinde build edilir.)*

## 8. Deploy + production smoke
1. Pages build ~1 dk. `zeynepkaya.app/kanji-atlas/` kaynak → `SCHEMA_VERSION = 2`.
2. **S1 fresh-install (incognito) — GERÇEK DAVRANIŞ (koddan doğrulandı):** uygulama açılışta state YAZMAZ → `kana_state` **null olması NORMAL** (ekran onboarding). Sonra **tek gerçek eylem** yap (kana tanı / kanji cevap / kelime ekle) → **yenile** → `kana_state` var, **schemaVersion 2**, `validateV2Shape` geçer, **recovery yok**.
3. **S2 mevcut-kullanıcı migration (gerçek cihaz):** **ÖNCE** production ham `kana_state`'i ayrı bir **`.txt`'ye kopyala** (bağımsız son güvence; `.bak.v1` bunu gereksiz kılmaz). Sonra production'ı aç → migrate. Kontroller **birlikte**:
   - **canonical:** schemaVersion 2 · `validateV2Shape` geçer · yeni SRS v2-shape · ilerleme + userHints korundu · yeni aktivite reload sonrası kalıcı · recovery yok.
   - **backup:** `.bak.v1` mevcut · raw/hash eşleşiyor · migration sonrası canonical save backup'ı **ezmemiş**.
4. **Kopya teyidi:** `/kanji-atlas-preview/` + `/atlas-onizleme/` → tombstone (app JS yüklenmiyor).
5. **Smoke geçince doğrulanmış release tag'i:**
   ```bash
   git tag -a p05-production-20260722 -m "P0-5 production verified" <release-commit>
   git push origin p05-production-20260722
   ```

## 9. Production verisine dokunulmadığı teyidi
Sunucu-tarafı veri YOK; statik HTML. Migration her kullanıcının tarayıcısında; öncesinde hash'li `.bak.v1`. Release yalnız `kanji-atlas/index.html` (v2) + iki tombstone.

---
## Onay checklist
- [ ] Temiz worktree + `main == origin/main` (§1)
- [ ] Snapshot **kilitli `d99e6ae`**'den (branch değil) + kimlik/containment doğrulandı (§2)
- [ ] Nihai `--cached --name-status` = 3 satır (hepsi M) · `_faz2`/config yok
- [ ] Tombstone'lar: kana_state/localStorage/`<script>` **negatif grep boş** + genişletilmiş CSP
- [ ] Tag annotated + remote + **`^{}` hash eşit**
- [ ] Commit-öncesi kapılar (`--check`/`--stat`/grep sızıntı + `kana_state -- '*.html'`) raporlandı
- [ ] Rollback: force-push yok · tam-revert applicable değil · **v2-compatible kapsam haritası hazır** (§7)
- [ ] Fresh-install smoke **2. yol** (açılışta null normal; ilk eylem+reload → v2)
- [ ] S2: manuel `.txt` yedek + canonical/backup çift kontrol
- [ ] Smoke sonrası doğrulanmış release tag'i
**Hiçbir adım ayrı onay olmadan uygulanmaz.**
