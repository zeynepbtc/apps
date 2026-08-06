# Kanji Atlas — Karar Günlüğü

> **Amaç:** Kilitli fazlar yeniden açılmaz. Yeni bulgu/karar buraya eklenir. En yeni en üstte. **Anayasa ayrı:** `kanji-atlas-LOCK.md`.

## ★ LOCK yorumlayıcı karar (2026-07-20) — "tek dosya" ilkesinin kapsamı
> GPT önerisi: LOCK'u yeniden açmadan buraya yorumlayıcı karar olarak eklendi.
- **Tek-dosya ilkesi = uygulama mantığı + yapılandırma/veri haritaları tek HTML'de yaşar.** **Medya dosyaları (`audio/…`) paketlenmiş statik varlık olarak AYRI bulunabilir; runtime yapılandırma/veri dosyası FETCH EDİLMEZ.** ("Tek dosyaysa MP3 neden dışarıda?" sorusunu baştan kapatır.) `const DATA`, `const AUDIO_MANIFEST` gibi veri/harita blokları HTML'e gömülü kalır; ses/görsel gibi medya dış statik varlıktır.

## 2026-07-20 — ★★ FAZ 2 KOD TARAFI TAMAMEN KAPANDI
> Faz 2'nin tüm kod kalemleri bitti ve **gerçek cihazda doğrulandı**: migration/tüketiciler → storage → onboarding → SRS → ses manifesti → oyun/dinamik ses → ölü kod temizliği. Kalan tek iş Zeynep'in stüdyo tarafı: ⭐ ses kayıtları (122 QA + 74 cümle + 47 eksik) → `AUDIO_MODE="release"` → `faz2-kalem1` main merge. Detaylar aşağıdaki kalem kayıtlarında.

## 2026-07-20 — Faz 2 · Ölü kod temizliği KAPANDI (Faz 2'nin son kod kalemi)
- **Onay (Zeynep):** Kapsam = 6 JS sembolü + 76 özellik-bağlı CSS sınıfı. 7 genel utility (`.bigchar .cmstory .extra-arr .extra-toggle .fadein .open .xs`) bilinçli KORUNDU (el altında kalsın).
- **Kanıt yöntemi (çalışanı silme):** İki katmanlı statik tarama. (1) `deadcode_scan.js` tam-sözcük referans sayımı; (2) `deadcode_css3.js` — **dinamik `${}` sınıf üretimi tuzağı** ele alındı: `class="inkcard t${t}"` yüzünden `.t1–.t4` statik aramada kaçıyordu, prefix eşlemesiyle TUTULDU. Sonuç: bu 76 sınıf adı hiçbir string'de yok → hiçbir elemana uygulanmıyor; 6 JS sembolünün 0 çağıranı var.
- **Güvenli çıkarım:** CSS `postcss` ile parse; ölü sınıf İÇEREN her seçici asla eşleşemez → kaldırıldı (render korunur; **104 kural** silindi, 0 seçici kırpma gerekti — tümü tam-ölü). JS: brace/bracket eşlemesiyle tam gövde çıkarımı.
- **Silinen JS/sabit:** `masteryOf` (masteryScore ikizi) · `dueItems` (SRS'te geçici korunmuştu; kanonik `buildKanjiReviewQueue`) · `compCount` (çağrılmıyor + buggy `>6?0:0`) · `homeReviewSection` (eski Home "Tekrar sırası") · `suggestionCard` (eski öneri kartı) · `FAM_LABELS` (eski grafik etiketleri).
- **Silinen CSS aileleri:** eski Home hero/progress (`.ha-* .hero-atlas .hpc-*`) · eski Learn kart (`.lc-* .learn-*`) · eski oyun-hub kart (`.gcard/.gbody/…`) · onboarding kanji-demo (`.ob-kanji-*`) · eski peer panel nesilleri (`.kp-* .mp-* .mk-*`) · eski result/match/quiz/stroke-annotation.
- **Stale invariant güncellendi (verify-the-verifier):** `smoke_srs.js`'teki "dueItems korundu" iddiası, temizlik kararıyla "dueItems silindi (kanonik `buildKanjiReviewQueue`)" olarak çevrildi.
- **Doğrulama:** 12/12 smoke + `node --check` + DATA/AUDIO_MANIFEST parse temiz. **~14 KB / 173 satır** (583601→569332 bayt). Araçlar: `_faz2/deadcode_scan.js · deadcode_css3.js · cleanup_apply.js` (postcss dev-dep, `node_modules` gitignore).
- **İzolasyon:** commit `b121261` (index.html −173, yalnız silme). Rollback HEAD~1 (583601 bayt) mümkün. `faz2-kalem1` push edildi.
- **★ Gate 3 (telefon smoke) GEÇTİ (GPT'nin 3-kapı kuralı):** Temizlikli build önizlemeye kondu (main `ed18448`); Zeynep tur attı → **"temiz çalışıyor"** (SRS/graph/Home/oyun/CSS ekranları eskisiyle aynı). "Kullanılmıyor gibi görünmek ölü olduğunun kanıtı değildir" → 3 kapının üçü de (statik + otomatik suite + telefon smoke) geçti; silmeler kanıtlanmış ölü.
- **Bölge kararı (Zeynep):** SRS/graph "dokunma" bölgesindeki ölü semboller (`dueItems`·`FAM_LABELS` dahil) **silinmiş kaldı**; "dokunma" kuralı = *refactor/isim değişikliği yapma*, gate-3 davranış korunumunu kanıtladığı için kanıtlanmış ölü artığın kaldırılması bu kuralı ihlal etmez.
- **DURUM: KAPANDI → Faz 2 KOD tarafı TAMAMEN bitti.** Kalan tek iş: Zeynep'in ses kayıtları (⭐ roadmap açık iş) → release modu → main merge.

## 2026-07-20 — Faz 2 · Oyun/dinamik yüzeyler kayıtlı sesi kullanır (ses kimliği tutarlılığı) KAPANDI
- **Karar (Zeynep/GPT):** "dynamic" bir **YÜZEY tipidir, çözüm yöntemi değil.** Kavram karışıklığı düzeltildi — "dynamic olduğu için TTS" YANLIŞ; doğru model: **yüzey → metin → manifest lookup → recorded? evet → insan sesi / hayır → policy fallback.** Oyunun ürettiği kelime manifestte kayıtlıysa uygulamanın her yerinde (Detail · kelime listesi · quiz · Flick) AYNI recorded ses çalar — ses kimliği/marka tutarlılığı. Yalnız gerçekten runtime'da üretilen metin (puan/geri bildirim: "3 puan kazandın") policy fallback'e düşer.
- **Uygulama (commit `018d281`, index.html +15/−3, yalnız bu kalem):** 3 saf sınıflandırıcı — `_charAudioCat(text)` (chars=kanji+radikal → `charIdOf` kana'da null → "kana"), `roundAudioCat(R)` (cloze→sentence · wkey→word · yoksa karakter kanji/kana), `memoryCardAudio(G,card)`. 3 dinamik çağrı yüzeyi (`matchTap`·`gameChoiceAnswer`·`memoryFlip`) `null` yerine **gerçek kategoriyi** geçer. `surfaceKind="dynamic"` **KORUNDU** — yüzey tipi kimlik çözümüne karışmaz (resolver hâlâ id/kategori+metin; kategori tahmini yok, çapraz-kategori fallback yok).
- **Tek-karakter kelime tuzağı çözüldü:** 本/人 gibi hem kelime hem kanji olan metinler oyunda `wkey` sayesinde "word" kategorisine gider (kanjiye düşmez) → doğru kelime sesi.
- **Davranış (dev/release):** kayıtlı+onaylı (kana あ) → her iki modda dosya · kayıtlı-pending kelime → dev dosya(+uyarı), release **sessiz** (pending policy) · manifest-dışı gerçek dinamik → dev TTS, release **sessiz** (TTS kaçağı yok).
- **Test:** `smoke_audio_games.js` **20 senaryo GEÇTİ** — sınıflandırıcı doğruluğu (gerçek DATA) + dev/release davranış (Audio/TTS casusu) + **gerçek oyun kurulumu** (word-meaning round'larının HEPSİ "word", kana-match pair'lerinin HEPSİ "kana" → call-site kanıtı). Regresyon suite'i (6a/6b/migration/manifest/build/srs/onboarding/storage/regress) tam temiz. `faz2-kalem1` push edildi.
- **Not:** memory engine (`memoryFlip`) şu an UI'da bağlı bir oyuna sahip değil (ileriye dönük); değişiklik yine de doğru+güvenli.
- **DURUM: KAPANDI.** Bu kayıt, önceki kaydın "AÇIK ÜRÜN SORUSU"nu çözer.

## 2026-07-20 — Faz 2 · Ses cihaz dilimi GEÇTİ (kayıtlı yüzey = insan sesi; TTS = beklenen kapsam)
- **Ölçüm kararı (Studio Rule 01 — varsayma, ölç):** Zeynep cihazda **Kana Okulu → あ** dahil kayıtlı yüzeyleri test etti → "**temiz çalıyor**" (kaydedilen insan sesi). Ses boru hattı (manifest → gömme → çözümleyici → politika → oynatma → 135 taşınmış dosya) uçtan uca **gerçek cihazda** doğrulandı.
- **Cihaz bulgusu ayrıştırıldı:** Zeynep'in "sistem sesi / adam sesi yok" bulgusunun kaynağı **beklenen dev davranışıydı**, bug değil:
  - **Oyunlar (Kelime Anlamı quiz: 百·天気·外 vb.)** = `dynamic` yüzey → o an tasarım gereği TTS. (↑ Üstteki kayıtla bu davranış değişti: artık kayıtlı kelime insan sesi çalar.)
  - **Manifest dışı örnek kelimeler** (日, 日本, 木 gibi 78-kelime setinde olmayanlar) → development modunda doğru şekilde TTS'e düşer (içerik kapsamı, playback hatası değil).
  - **"Hiç ses yok" (sessizlik)** = kayıtlı dosyanın henüz canlı olmadığı an (Pages deploy gecikmesi → 404 → GPT 3. koşulu gereği TTS'e DÜŞMEZ, sessiz kalır). Kayıtlı yüzeyler artık çaldığına göre bu geçici deploy durumuydu.
- **AÇIK ÜRÜN SORUSU — ÇÖZÜLDÜ (↑ üstteki kayıt):** Oyunlardaki kelimeler kayıtlı sese sahipse artık kayıtlı insan sesi kullanılıyor; yalnız gerçek dinamik metin policy fallback'e düşüyor.
- **DURUM: Ses kalemi cihazda doğrulandı — KAPANMAYA HAZIR.** Kalan işler Zeynep'in stüdyo tarafı + release kararı: 122 pending kaydın QA'i, 74 cümle + 47 eksik kaydın alınması, release moduna geçiş, `faz2-kalem1` → main merge. **Sıradaki kod işi: ölü kod temizliği (en son).**

## 2026-07-20 — Faz 2 · Ses Manifesti: gömme RATİFİYE + manifest üretildi + HTML'e gömüldü (uygulama devam ediyor)
- **GPT ratifikasyonu (Son kararlarım):** (1) **Temsilî tek okunuş** — pedagojik seçim manifestte açık. (2) **CDN kurma** — her uygulama kendi `audio/`'sunu taşır, klasör yapısı+manifest ortak. (3) **Manifest = JSON**, kod okur. + **gömme yaklaşımı RATİFİYE** (runtime fetch reddedildi): *audio-manifest.json kanonik kaynak; runtime fetch YOK; build'de doğrulanmış manifest HTML'e `const AUDIO` gömülür; ship edilen HTML harici manifeste bağımlı değil.*
- **★ `durum` ≠ runtime davranışı (kritik):** manifest "ne mevcut?" der; **ortam bayrağı** "ne yapmalı?" der. dev: recorded→dosya, tts/missing→TTS denenebilir · release: recorded→dosya, tts/missing→**sessiz**. `durum=tts` development politikası; runtime davranış durum+ortam birlikte.
- **Şema (7 alan):** `id·kategori·metin·okunuş·ses_dosyası·kaynak·durum`; durum∈{recorded,tts,missing}. Kanji: karakter sesi (temsilî) vs kelime sesi ayrı; `_meta.pedagojik_hukum` zorunlu. Detay: `...-ses-manifesti-sozlesme.md` (v3, 10 build kapısı).
- **Uygulama ilerleme:**
  - **1-2 (commit `99a66a0`):** `audio-manifest.json` **339 kayıt** (92 kana+91 kanji+78 kelime+78 cümle); 214 recorded (Flick) · 47 missing (21 kanji+26 kelime) · 78 tts. `manifest_check.js` 10 test; 214 Flick kaydının HEPSİ gerçek Flick dosyasına işaret ediyor; 70 kanji `dogrulanmali` bayraklı.
  - **3 GÖMME (commit `a548fa9`):** `const AUDIO_MANIFEST` anchor'lı blok DATA'dan sonra enjekte. **10 kapı sağlandı:** 1-6,9 `inject_manifest.py` yazımdan önce doğrular (geçersiz manifestte HTML EZİLMEZ — fiilen test edildi) · Gate7 gömülü==JSON semantik · Gate8 byte-identical re-run (md5) · Gate10 runtime fetch YOK. **Henüz TÜKETİCİ YOK** (ölü veri); app render + regresyon temiz; rollback HEAD~1 byte-identical. `manifest_build_check.js` kapıları GEÇTİ.
- **Kalan uygulama adımları:** yol normalizasyonu (`words/`→`word/` vb.) · dev/release ses politikası bayrağı · `speak()` entegrasyonu (ÖNCE tüm çağrı yüzeylerinin manifest ID çözümü doğrulanır — **ses dosyası adı ≠ pedagojik id**) · smoke · 47 eksik kayıt listesi (Flick SESLENDIRME formatında). Her biri ayrı commit + test.
- **Kapsam kilidi:** `speak()` yeniden yazılmaz; çalışanı silme.

## 2026-07-20 — Cihaz smoke turu GEÇTİ (üç kalem: storage + onboarding + SRS)
- **Sonuç (Zeynep):** Gerçek cihazda "tüm butonlar çalışıyor, uygulama aktif" — cihaz turu GEÇTİ. Davranış invariantları otomatik smoke'larda (16 SRS + 9 onboarding + storage + fresh-user) kanıtlı; cihaz turunun asıl işi otomasyonun yakalayamadığı gerçek-cihaz sorununu yakalamaktı (aşağıdaki ölü buton) — yakalandı ve düzeltildi.
- **Ortam:** faz2-kalem1 build main'de bağlantısız önizlemeye kondu → `zeynepkaya.app/kanji-atlas-preview/` (canlı `/kanji-atlas/` ve launcher'a dokunulmadı; robots disallow; SW cache yok). **Tur bitince preview KALDIRILDI** (commit `6382379`, robots eski hâline döndü).
- **BULGU (blocker):** Temiz kullanıcıda (boş localStorage) onboarding intro'daki **"Başlayalım" ölü** — hiç ilerlemiyordu.
- **Kök neden (regresyon):** Storage yeniden yazımı `DEFAULT_STATE.onboarding=null` bıraktı; `freshState()` (raw==null) migrate'i **atlar** → yeni kullanıcıda `state.onboarding` null kalır. Tüm `ob-*` handler'ları `if(!state.onboarding) return;` ile korunduğu için buton ölür. Onboarding testleri `state.onboarding`'i **elle set ettiği** için kaçmıştı.
- **DÜZELTME (yeni faz yok):** `load()` bootstrap'ında `if(!state.onboarding) state.onboarding = {completed:false, step:1, ...}` — migrateV0ToV1'in taze şekliyle birebir. Storage modülü saf sözleşmesi değişmedi (null sentinel korundu). Bug **önce reprodüksiyon** edildi, sonra fix doğrulandı.
- **İkinci iş (metin):** Intro alt metni → **"Japonca yazı sistemlerinin mantığını adım adım keşfedin."**
- **Test:** `smoke_onboarding_freshuser.js` — boş localStorage'dan tam akış **6 test GEÇTİ**. Tüm regresyon temiz. Commit `6fe2580`.
- **DURUM: KAPANDI.** Üç altyapı kalemi (storage, onboarding, SRS) gerçek cihazda doğrulandı. **Sıradaki: ses manifesti** → ölü kod (en son).

## 2026-07-20 — Faz 2 · Kana Review / SRS tutarlılığı KAPANDI
- **Bulgu (envanter):** Tek "due" tanımı yoktu — üç ayrı sayaç birbirini tutmuyordu (Profil=`dueItems` · Home=`reviewQueue` · Review=birleşim); gösterilen küme ≠ tüketilen küme; "sayaç>0 ama review boş" (mastered ölü buton) gerçekten mümkündü; kana/hayalet anahtar sayacı şişiriyordu. Detay: `kanji-atlas-faz2-srs-envanteri.md`.
- **KARAR (Zeynep+GPT):** (1) Kapsam **A, yalnız kanji**; kana tüketimi ayrı **Kana SRS (büyük, B)** kalemi. (2) Due **kesin zaman-temelli** (`next<=now`); `status` due kaynağı değil. (3) Navigasyon önerisi (`firstAvailableNode`) due'dan ayrı, korunur.
- **GPT'nin 4 teknik düzeltmesi uygulandı (v2 spec):** (a) selector **saf/enjekte** — `buildKanjiReviewQueue(state,data,now)` global bağımlılıksız; (b) **`Number.isFinite`** tip güvenliği (`next` string/null/NaN/Infinity elenir; `now` geçersizse boş); (c) **deterministik sıra** next→mastery→id; (d) **snapshot invariantı** — render/eylem başına tek `now`. UX metni kapsamla dürüstleştirildi: "**N kanji** tekrar bekliyor", Profil "**Kanji tekrarı**". Yan-etkisiz `inspectKanjiReviewData` teşhisi (siler değil, raporlar).
- **Dört canlı yüzey tek kanonik kuyruğa bağlandı:** Review başlığı, `review-start`, Profil, Progress statline. **KORUNDU:** `reviewQueue`, `firstAvailableNode`, `dueItems`, Home "Tekrar sırası" listesi, `srsRecord`/`SRS_DAYS`. Kendi ürettiğim öksüz `q=reviewQueue()` (Progress) aynı commit'te temizlendi. *(Not: `dueItems` daha sonra ölü-kod temizliğinde silindi — bkz. en üstteki kayıt.)*
- **İnvariant sağlandı:** `dueCount(snapshot) === buildKanjiReviewQueue(snapshot).length === Profil/Home/Review sayısı`; `dueCount>0 → review-start aynı snapshot'ın ilk öğesini açar` (mastered ölü buton çözüldü).
- **Test:** saf harness `srs_check.js` (shipped kaynaktan çıkarılmış fonksiyonlar, 10-14 mantık + sınır/determinizm/mutasyonsuzluk) + canlı `smoke_srs.js` (invariant/tüketim/2. öğe blokajsız/regresyon) — **16 senaryo GEÇTİ**. Storage+onboarding regresyon temiz.
- **Bilinçli davranış:** bugün öğrenilen kanji aynı gün sayaçta görünmez (`next=+1 gün`) — doğru SRS semantiği; Home "Tekrar sırası" **listesi** değişmedi.
- **İzolasyon:** commit `3a4d3c5` (index.html +39/−7, yalnız SRS; `_faz2/srs_check.js`+`smoke_srs.js`+arşiv). Rollback HEAD^ byte-identical. `faz2-kalem1` push edildi.
- **Sıradaki Faz 2:** ses manifesti → ölü kod (en son). Kana SRS (B) Faz 2 dışı, ileri kalem.

## 2026-07-20 — Faz 2 · Onboarding kalemi TAM KAPANDI (M1+M2 doğrulandı)
- **GPT ratifikasyonu 2 kritik netleştirme — üretim kodu zaten karşılıyordu, yalnız test + günlük değişti.**
- **M1 — `entryPath` tek kullanımlık yönlendirmedir.** Onboarding tamamlanma eyleminde bir defalık ilk yönlendirme üretir (`ob-finish` → `resolveEntryRoute` bir kez, satır 5356). Bootstrap (`load()` satır 1547: `completed → home`) `entryPath`'i **hiç okumaz**; sonraki açılışlarda kullanıcı rotaya **zorlanmaz**. `entryPath` kalıcı ana sayfa tercihi değildir.
- **M2 — Eski `completed:true` + `entryPath` yok GEÇERLİDİR.** Migration bu kullanıcıya sessizce `entryPath:"kana"` **eklemez** (migrateV0ToV1 onboarding nesnesinde entryPath alanı yok); kullanıcı normal `home`'a açılır, `kanadetail/あ`ya zorlanmaz. `kana` güvenli varsayılanı yalnız **aktif onboarding bitirme** anında, `level` eksik/tanınmıyorsa geçerlidir.
- **Çağrı-bağlamı ayrımı kilitlendi:** resolver saf (state/nav/progress'e dokunmaz); güvenli varsayılan resolver içinde olsa da esas güvenlik resolver'ın **ne zaman çağrıldığındadır** — normal bootstrap resolver'ı hiç çağırmaz.
- **Test kartı 7→9 + test 7 genişletildi:** (8) reload sonrası bootstrap home, detail/ki'ye zorlanmaz · (9) eski completed kullanıcıya entryPath sessizce eklenmez/tüketilmez · (7b) resolver'ın döndürdüğü ekran R registry'de yoksa ob-finish guard home'a düşürür + render `||Home`. **9/9 GEÇTİ.**
- **İzolasyon:** üretim yaması commit `9d1bb0d` (index.html, +16/−2, yalnız onboarding); kapanış-doğrulama commit `85ce7c4` (yalnız `_faz2/smoke_onboarding.js` + arşiv `edit_onboarding.py`, **üretim kodu değişmedi**). Storage'dan tam izole.
- **Sıradaki Faz 2 kalemleri:** kana review (SRS sayaç/review tutarsızlığı) → ses manifesti → ölü kod (en son).

## 2026-07-20 — Faz 2 · Onboarding — Üretim yaması geçmişi
> (Yukarıdaki "TAM KAPANDI" kaydıyla **aynı kaleme** ait — bu, kalemin üretim yaması aşamasının geçmişidir.)
- **Sorun:** ob-finish koşulsuz `go("kanadetail","あ")` yapıyordu; kullanıcının seçtiği seviye sonucu etkilemiyordu (tercih↔sonuç tutarsızlığı).
- **Çözüm (niyet katmanı):** `state.onboarding.entryPath` **niyet** olarak saklanır (`"kana" | "kanji-family" | "explore"`) — **ekran adı DEĞİL**. Böylece ileride ekran adı değişirse kullanıcı verisi göç gerektirmez.
- `deriveEntryPath(level)`: 4 OB seviyesi → 3 niyet. hiragana→kanji-family, explorer→explore, beginner/a_few/eksik/tanınmayan→kana (güvenli varsayılan).
- `resolveEntryRoute(entryPath)` **ayrı saf resolver**: niyet→rota. kana→kanadetail/あ · kanji-family→detail/ki · explore→map/null · tanınmayan→kana.
- ob-finish: entryPath rotasına gider; hedef ekran geçersizse **home'a güvenli düşüş**.
- **İzolasyon:** storage kalemiyle KARIŞTIRILMADI — commit (`9d1bb0d`). Rollback HEAD^ byte-identical doğrulandı.

## 2026-07-20 — Faz 2 · Kalem 1 KAPANDI
Kapanış kriterleri (hepsi sağlandı):
- `FAMILIES` **tek kanonik aile kaynağı** (içerik/ses/ilerleme tutmaz).
- Mevcut **iki canlı tüketici** (`familyStrip`, `Detail` çapraz bağlar) kanonik→fallback→rapor sözleşmesine bağlı.
- **Grafik adaptörü** (`graphEdges`) semantik olarak doğrulanmış; canlı MapView geçişi Faz 3'e açık teslimle devredildi.
- `familyList` + `familyProgress` **saf veri harness'ıyla** doğrulandı (deterministik sıra · duplicate yok · 休 çift-sayılmıyor · fallback açık · boş veride çökme yok) — **sahte UI tüketicisi üretilmedi.**
- Fallback **83/91**, artmadı, raporlanıyor. Legacy kaynaklar silinmedi; rollback mümkün.
- Faz 3'e devredilen işler adları + kabul kriterleriyle kayıtlı (aşağıda).

## 2026-07-20 — Grafik tüketicisi: veri adaptörü ≠ canlı tüketici (bölme ratifiye)
- **STATÜ:** Grafik **kanonik veri adaptörü** (`graphEdges`) tamamlandı; semantik gate'ler geçti. **Canlı MapView geçişi Faz 3'e DEVREDİLDİ** ("üçüncü tüketici tamamlandı" DEĞİL).
- **Faz 2 çıkış metriği (DOĞRU hali):** *Faz 2 sonunda mevcut iki canlı aile-verisi tüketicisi (`familyStrip`, `Detail`) kanonik→fallback→rapor sözleşmesine geçirilir. Grafik için `graphEdges` adaptörü + semantik testleri tamamlanır; canlı MapView geçişi Faz 3'e devredilir. Mevcut üründe ayrı aile listesi ve aile ilerlemesi tüketicisi bulunmadığından, `familyList` ve `familyProgress` yalnız veri adaptörü olarak doğrulanır; UI bağlaması Faz 3 tasarımına aittir.* — ("resolver'da fonksiyon var" ≠ "üründe tüketici var".)
- **FAZ 3'e AÇIK TESLİM (grafik):** 1) node kimliği `familyIndex_char` olmaktan çıkar · 2) düğüm kimliği ↔ görsel bant/pozisyon ayrılır · 3) tek node + çok aile bağı · 4) layout aile üyeliğinden bağımsız · 5) `graphEdges` tek aile-ilişki kaynağı · 6) legacy grafik ancak parite+rollback sonrası kaldırılır.
- **FAZ 3'e AÇIK TESLİM (liste/ilerleme UI):** aile-liste ve aile-ilerleme görünümleri tasarlanınca `familyList`/`familyProgress`'e bağlanır. **İlerleme çift-sayım kilidi:** 休 İnsan+Ağaç'ta iki kez sayılmaz; **tek kanji ilerleme kaydı**, aile görünümü referanslar (global toplam = benzersiz kanji, ailelerin toplamı DEĞİL).

## 2026-07-20 — Fallback geçidi DÜZELTİLDİ
- Faz 2 sonu fallback 83/91 kalır ve ARTMAZ; **木 vitrini baştan sona tamamlandığında** yeni kanonikleştirme planı + sayısal hedef (gerçek çıktıya bağlı); release öncesi 0.

## 2026-07-20 — GPT Faz 2·Kalem 1 denetimi → operasyonel kararlar
- Kadans + legacy-removal-readiness smoke. classification UX: "Sözlük sınıflandırması: X · Yapısal bağlantılar: Y". Resolver saflığı LOCK-9. Faz 2 sırası: migration → tüketiciler → storage → onboarding → kana review → ses manifesti → ölü kod. Commit kartı 5 satır. LOCK+günlük iki katman. Kapsam: 木 bitmeden yeni aile yok.

## 2026-07-20 — Faz 2·Kalem 1: aile bilgi modeli (KİLİTLİ · v3)
- Enum DONDURULDU (6/10). classification/secondary (sözlük radikali). 校 (形声) · 東 (paleografik) vitrin dışı · 森 ebeveyni=木. Reverse Test; kanonik→fallback→RAPORLANIR.

## 2026-07-20 — Faz 1 KAPANDI ve kilitlendi
- 6 omurga kararı: yumuşak Model B · yazma iki-mod · oyun sadeleştirme · tek kanonik aile verisi · köken/yapı/hatırlama ayrımı · vitrin 木.

## Politika
Yeni bulgu: kilitli faz belgesine dokunma; buraya yaz; ilgili faz planına kapsam kalemi ekle.
