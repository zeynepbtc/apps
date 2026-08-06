# Onboarding Adım 7 — Uygulama Planı (code-free) · PLAN ONAYLI / GATE 0 AÇIK

> **Durum:** **PLAN ONAYLI / GATE 0 AÇIK.** Feature kod kapısı **GATE 0 cihaz font kabulünden SONRA** açılır. Bu başlık görülünce feature koduna **başlanmaz**.
> Kilitli kaynaklar: B2 · R2-A · R3 · pre-code a11y. Kod gerçeği: `apps-deploy/kanji-atlas/index.html` (satır no'ları okumadan; HTML kazanır).
> **İlke:** dar kapsam · storage v2 / SRS / ses çekirdeğine dokunma · rollback & eski-kullanıcı state'i öncelikli. **i18n-readiness = mimari sınır, localization DEĞİL** (yeni dil çevirisi yok).

## GATE 0 durumu
```
Fixture üretildi                 ✅
Container font yükleme testi     ✅  (Shippori · Noto Sans JP · Klee One = yüklendi)
Container görsel ön-kontrol      ✅  (TR ğ/ş/ı/İ fallback sıçraması yok; あ ア 火 木 tutarlı)
Kullanıcı cihaz kontrolü         ⏳
GATE 0 kapanışı                  ⏳
Feature kodu                     ⛔  henüz BAŞLAMADI (cihaz kabulünden sonra)
```

---

## §0 — DOKUNULMAZ: Storage v2 yeniden açılmaz
Bu dönüşüm **schemaVersion bump değildir.** `schemaVersion=2` kalır; yeni migration zinciri yok; `.bak.v1` yeniden yazılmaz; P0-5 backup/migration/merge-gate/normalizer değişmez. İş = mevcut v2 state içindeki `onboarding` alt-nesnesinin **geriye uyumlu normalizasyonu** (hydrate sonrası, storage katmanına dokunmadan).

---

## §1 — Mevcut kod / state envanteri (teyitli)

| Parça | Satır | Rol / durum |
|---|---|---|
| `OB_LEVELS/MOTIVATIONS/STYLES` · `OB_TOTAL_STEPS=8` | 2243–2261 | eski akış girdileri |
| `deriveEntryPath`/`resolveEntryRoute` | 2264/2269 | → tek descriptor'a inecek |
| `completeOnboarding` | 2275 | completed + **userProfile aynası** + entryPath |
| `Onboarding()` | 2298 | 8-adım; "Atla"; ob-back; eyebrow + %step/8 |
| `recommendedStart` | 2000 | **tek tüketici: Home 2821** |
| `REC` | 2816 | `kana/kanji/games → {go,label,reason}` (tr metin — i18n sözlüğüne taşınacak) |
| Öneri görünürlüğü | 2823 | `established=(learnedKana+learnedKanji)>=10` iken gizli |
| ob-handler'ları | 5695–5769 | ob-next/back/name/motivation/level/style/skip/finish/restart/start |
| **`ob-restart` UI** | **3832** | Profil butonu — CANLI |
| `ob-start` | 5759 | handler var, UI tüketicisi YOK → ölü |
| `load()` bootstrap | 1718–1719 | `screen=completed?home:onboarding` |
| userProfile tüketicileri | 2197 avatar · 2800 Home selam · 5776 pe-save · 2288 showAdvanced yaz | kırılmamalı |
| Font token'ları | `:root` (~19–28) | `--serif`/`--sans` → §15'te tek-kaynak tokenlara alias (görsel değişmez) |
| srsRecord çağrı yüzeyleri | §7 | 10 yüzey |
| `WS_STEPS`/`WritingSystem`/`seenWritingSystem` | 2639/2718/1736 | ayrı tam ders — ellenmez |

---

## §2 — State modeli + zaman damgaları

```
onboarding = {
  status: "in-progress" | "completed" | "skipped",   // KANONİK
  completed: bool,                                    // LEGACY AYNA (rollback)
  stage:  "welcome" | "competency" | "writing-intro" | "final",
  competency: 0|1|2|3|null,
  startKey: "kana-a"|"kana-home"|"kanji-ki"|"atlas-map"|null,
  introShown: bool,
  firstMeaningfulActionAt: ISO|null,
  startedAt, completedAt, skippedAt
}
```
**Legacy ayna:** in-progress→`completed=false`; completed **veya** skipped→`completed=true`. Alanların **hiçbiri çevrilmiş metin tutmaz** (dil bağımsız).

**Zaman damgası semantiği:**

| Olay | status | completedAt | skippedAt | startedAt | firstMeaningfulActionAt |
|---|---|---|---|---|---|
| Final tamamlandı | completed | **now** | null | (mevcut) | (korunur) |
| Erken çıkış | skipped | **null** | now | (mevcut) | (korunur) |
| Restart | in-progress | null | null | **now** | **korunur** |

> `completedAt` **yalnız gerçek completed'de**. Skipped'a **sahte completedAt yazılmaz**.

---

## §3 — B2 ekran & descriptor eşlemesi
Tek `onboarding` rotası içeride dallanır. **Ham `{screen,param}` VE literal metin yazılmaz** — kalıcı **semantik anahtar** + tek `startDescriptorFor(key)`.

| competency | startKey | route/param | Home kartı → çeviri anahtarı (tr sözlüğü mevcut kaynaktan) | Final CTA anahtarı | writing-intro |
|---|---|---|---|---|---|
| 0 | `kana-a` | `kanadetail`/`あ` | `home.rec.kana.*` (tr = mevcut `REC.kana`) | `onboarding.final.band0.cta` | göster |
| 1 | `kana-home` | `kana`/`null` | `home.rec.kana.*` | `onboarding.final.band1.cta` | göster |
| 2 | `kanji-ki` | `detail`/`ki` | `home.rec.kanji.*` (tr = mevcut `REC.kanji`) | `onboarding.final.band2.cta` | atla |
| 3 | `atlas-map` | `map`/`null` | `home.rec.atlas.*` (tr = mevcut hubCard ~2941) — teyit | `onboarding.final.band3.cta` | atla |

**§3.1 — descriptor çıktısı (literal değil anahtar):**
```
startDescriptorFor("kana-a") → {
  route:"kanadetail", param:"あ",
  labelKey:"home.rec.kana.label", reasonKey:"home.rec.kana.reason",
  ctaKey:"onboarding.final.band0.cta"
}
```
Rota bütün dillerde aynı; label/reason/CTA `t(key)` ile çözülür. tr sözlüğü **mevcut REC + kilitli R2-A**'dan doldurulur — **yeni mikrokopi/çeviri yazılmaz.**

---

## §4 — Geri / reload / dallanma
```
welcome        : geri YOK
competency     : geri → welcome
writing-intro  : geri → competency
final (0/1)    : geri → writing-intro
final (2/3)    : geri → competency
```
Reload mevcut `stage`'den sürer · competency değişince dal yeniden hesaplanır · `startKey` final tamamlanana kadar yazılmaz · erken "Ana sayfaya geç" competency+startKey temizler (skipped) · **Final ikincil "Ana sayfaya git" = completed** (skip değil).

## §4.1 — İlerleme göstergesi
Eyebrow 01–06 + %step/8 **kaldırılır.** Geri oku stage haritasıyla korunur.

---

## §5 — Migration / normalizasyon matrisi

| Gelen | Yeni sonuç |
|---|---|
| Eski `completed:true` | status=completed, competency=null, startKey=null; sahte öneri yok; legacy `completed=true` |
| Eski `completed:false` + herhangi step | status=in-progress, stage=welcome, competency=null |
| Yeni skipped | Home; competency/startKey yok; legacy `completed=true` |
| Yeni completed | competency + startKey doğrulanır |
| Bozuk stage | welcome güvenli düşüş |
| Geçersiz startKey | key=null; Home güvenli düşüş |
| Eski `level/style/entryPath` | competency **TÜRETİLMEZ**; tolere edilir, silinmez |

## §5.1 — State kombinasyon invariant matrisi
Normalizer yalnız alanı değil **kombinasyonu** doğrular:

| Durum | Geçerli eşleşme |
|---|---|
| in-progress / welcome | competency=null, startKey=null |
| in-progress / competency | competency=null, startKey=null |
| in-progress / writing-intro | competency ∈ {0,1}, startKey=null |
| in-progress / final | competency 0–3, startKey henüz null |
| skipped | competency=null, startKey=null |
| Yeni completed | competency ↔ startKey **birebir** (0↔kana-a · 1↔kana-home · 2↔kanji-ki · 3↔atlas-map) |
| Legacy completed | competency=null, startKey=null kabul |

**Uyumsuz kombinasyonlar** (writing-intro+comp3 · final+comp null · comp0+atlas-map · skipped+kana-a) **sahte rota üretmeden** güvenli normalize: bozuk stage→welcome; completed'de eşleşmezse **startKey=null + Home güvenli düşüş**.

---

## §6 — Home öneri şeridi davranışı
- **completed + startKey + firstMeaningfulActionAt YOK** → şerit `startDescriptorFor(startKey)` kartını gösterir (metin `t(labelKey/reasonKey)`).
- **skipped VEYA competency'siz eski completed** → şerit yok; eşit ağırlıklı normal kartlar.
- **İlk anlamlı eylemden sonra** → şerit **boşluksuz gizlenir**; `recommendedNext` bu fazda **YOK**. Mevcut `established>=10` eşiği tek görünürlük mantığına birleştirilir.

---

## §7 — Anlamlı öğrenme eylemi
**SRS çekirdeğine davranış eklenmez.** Ayrı idempotent `markFirstMeaningfulLearningAction(kind)`.

**Çağrı sırası + hata davranışı (kilit):** 1) öğrenme/SRS başarılı → 2) canonical kayıt başarılı → 3) **sonra** marker.
- Marker SRS/mastery **etkilemez**; öğrenme kaydı başarılı olmadan **çağrılmaz**.
- Marker save başarısızsa öğrenme kaydı **geri alınmaz**; sonraki eylemde **yeniden denenir**.
- `.bak.v1` yeniden yazılmaz; ilk başarılı işaretten sonra **idempotent**.

**Çağrı yüzeyi matrisi (yanlış cevap "anlamlı eylem" sayılmaz):**

| Satır | Çağrı yüzeyi | Başarı koşulu | kind | Marker yeri | Yanlış/başarısızda |
|---|---|---|---|---|---|
| 5171 | oyun round — word | ok:true & correct | game-word | correct dalı | correct=false → yok |
| 5172 | oyun round — karakter | ok:true & correct | game-char | correct dalı | correct=false → yok |
| 5317 | oyun — stroke/quiz | ok:true & allRight | game-stroke | allRight dalı | allRight=false → yok |
| 5335 | oyun — kana-match | ok:true | game-match | eşleşme sonrası | yanlış eşleşmede srsRecord yok |
| 5528 | mochi — yazma | ok:true | write-mochi | yazma başarı | başarısız yazımda yok |
| 5639 | öğrenme — ilk kayıt | ok:true | learn-first | kayıt sonrası | — |
| 5647 | kana-known | `_r.ok` | known-kana | `_r.ok` dalı | `_r.ok=false` → yok |
| 5648 | word-known | `_r.ok` | known-word | `_r.ok` dalı | `_r.ok=false` → yok |
| 5666 | öğrenme/detay | ok:true | learn-detail | kayıt sonrası | — |
| 5940 | quiz cevabı | ok:true & correct | quiz | correct dalı | correct=false → yok |

Kesin `correct` dalı her yüzeyde uygulamada teyit; **liste kapalı**.

---

## §8 — Eski kod: KALDIR + state TOLERE ET
Yorumlanmış ölü kod bırakılmaz. **Kaldırılacak (referanssız aktif):** isim/motivasyon/stil/katakana-quiz render+handler · `OB_MOTIVATIONS` · `OB_STYLES` · ölü `ob-start`. **State'te tolere (silinmez):** `name`, `motivation`, `style`, `level`, `entryPath`.
**Zorunlu referans taraması (kod öncesi):** `userProfile` · `onboarding.completed/step/level/style/motivation/entryPath` · `recommendedStart` · `ob-restart` · `ob-start` · `showAdvanced` okuyucuları.

### §8.1 — userProfile korunması + legacy eşleme
- **Fresh:** `userProfile.name` yoksa boş kalabilir.
- **Mevcut/restart:** `userProfile.name` **korunur**; `motivation`/`style` metadata **zorla silinmez**; yeni onboarding yalnız yönlendirme alanlarını günceller (name'i ezmez).
- **competency → legacy `userProfile.level`:** 0=beginner · 1=a_few · 2=hiragana · 3=hiragana. `explorer` kullanılmaz.
- **`showAdvanced`:** 0/1→false · 2/3→true.
- **Eski competency'siz completed:** mevcut `level`/`showAdvanced` **korunur, tahmin edilmez**.
- **Ön koşul:** `showAdvanced` tüketicisi doğrulanır; sonra eşleme fixture'a girer.

### §8.2 — ob-restart davranışı (CANLI, 3832)
Öğrenme ilerlemesi silinmez · onboarding → `{status:"in-progress", stage:"welcome", competency:null, startKey:null, introShown:false}` · `firstMeaningfulActionAt` korunur · `userProfile.name` korunur · yeniden tamamlamada şerit dönmez.

---

## §9 — GATE'ler
```
GATE 0  Font fixture — NON-SHIPPING; ÜRETİLDİ + container ön-render GEÇTİ; CİHAZ KABULÜ BEKLİYOR
GATE 1  Node fixture: startDescriptorFor (anahtar döndürür) · status makinesi · migration + invariant ·
        rota geçerliliği · zaman damgası · userProfile koruma/eşleme · ROLLBACK-COMPAT · marker idempotent/hata ·
        i18n: state literal metin tutmaz + t() fallback zinciri (§15-9) + eksik anahtar güvenli
GATE 2  Tarayıcı smoke (§10)
GATE 3  STAGING (ayrı origin, telefon): 4 bant + 3 kaçış · pre-code §5 · gerçek v2 blob migration ·
        lang="ja" glif işaretleme spot-check
GATE 4  PRODUCTION: yalnız feature commit seçici snapshot; gerçek cihaz smoke → SONRA doğrulanmış tag;
        v2-uyumlu rollback; eski same-origin kopyalara dokunma
```

---

## §10 — Test matrisi

| # | Senaryo | Beklenen |
|---|---|---|
| 1 | Fresh install | Karşılama render |
| 2–5 | Band 0/1/2/3 | doğru startKey; 0/1 intro göster, 2/3 atla |
| 6 | Erken kaçış ×3 | skipped; competency/startKey temizli; şerit yok; completedAt yok |
| 7 | Final ikincil "Ana sayfaya git" | completed (skip değil); startKey + completedAt |
| 8 | Geri dalları | geri haritasına uyar |
| 9 | Reload-resume | her stage'den sürer |
| 10 | Competency değiştir | dal yeniden hesaplanır |
| 11 | intro işareti | introShown=true, seenWritingSystem DEĞİŞMEZ |
| 12 | İlk anlamlı eylem | şerit boşluksuz gizlenir |
| 13 | Yanlış cevap | marker çağrılmaz |
| 14 | Migration eski completed | status=completed, sahte şerit yok, veri aynı |
| 15 | Migration eski incomplete | in-progress/welcome |
| 16 | Invariant normalize | uyumsuz kombinasyon → güvenli düşüş, sahte rota yok |
| 17 | Zaman damgası | completed→completedAt; skipped→null; restart→yeni startedAt |
| 18 | userProfile koruma | name korunur; competency→level/showAdvanced; legacy korunur |
| 19 | Rollback-compat fixture | yeni state eski runtime'da güvenli açılır |
| 20 | Marker hata | öğrenme kaydı geri alınmaz; sonraki eylemde denenir; idempotent |
| 21 | ob-restart | ilerleme korunur; welcome; firstMeaningfulActionAt korunur; şerit dönmez |
| 22 | i18n dil bağımsızlığı | state literal metin tutmaz; descriptor anahtar döndürür; **t() fallback: locale→tr→key**; bozuk locale→tr; prod çökme yok |
| 23 | Regresyon | kanji SRS/review · kana learned · rota · ses · userProfile tüketicileri · **görsel font çıktısı** birebir |

---

## §11 — Dar dosya kapsamı
Yalnız `kanji-atlas/index.html` onboarding bölgesi (1718–1719, 2000, 2243–2296, 2298–~2455, 2816–2823, 3832, 5695–5769). **Görsel-nötr global eklemeler (§15):** `:root`'ta **tek kanonik font kaynağı** — `--font-display`/`--font-ui`/`--font-ja-learning`; eski `--serif`/`--sans` bunlara **geçici alias** (aynı değer iki yerde tanımlanmaz); `.jp` **yalnız `--font-ja-learning`** okur. Ayrıca küçük `tr` sözlüğü + `t(key)`. Çıktı değişmez (test #23). Dokunulmaz: storage v2 · SRS/`srsRecord` (yalnız `ok`) · ses · Kana/Kanji içerik · `writing-system` tam dersi. Test: `_faz2/` non-shipping fixture'lar.

## §12 — Riskler
Sahte competency yasak · linear→dallanan regresyon · recommendedStart tek tüketici · introShown ≠ seenWritingSystem · userProfile aynası · a11y klavye/focus yeni iş · yanlış cevap markeri · **font token/`.jp` rebind görsel-nötr** (test #23) · **i18n eksik anahtar/bozuk locale'de çökme yok** (§15-9 fallback).

## §13 — Rollback yaklaşımı
Feature commit = tek production runtime commit; font fixture ayrı non-shipping commit. HEAD~1 byte-identical yalnız feature commit için. İleri-düzeltme önce; v2-uyumlu geri alma; rollback-compat fixture kanıtlar. Production tag gerçek cihaz smoke sonrası; tombstone kopyalara dokunulmaz.

---

## §15 — i18n-READINESS mimari kısıtı (localization DEĞİL; yeni çeviri YOK)
Amaç: yeni kodun sonradan sökülmeden çevrilebilir olması. **Kilitli Türkçe R2-A metinleri değişmez; İngilizce/Almanca vb. bu fazda üretilmez.**

1. Yeni onboarding metinleri render/handler'a **gömülmez**; sabit **çeviri anahtarlarından** çözülür (`t("onboarding.actions.goHome")`).
2. `startDescriptorFor` literal yerine `labelKey`/`reasonKey`/`ctaKey` döndürür (§3.1).
3. State'e **çevrilmiş metin yazılmaz**; `status`/`stage`/`competency`/`startKey` **dil bağımsız**.
4. **`preferences.locale` progress'ten ayrı**; dil değiştirmek mastery/SRS/onboarding/startKey/learned'i **değiştirmez** — yalnız görünen metin.
5. Sayfa `lang` locale'e göre; **Japonca glifler her locale'de `lang="ja"`** (`<span class="jp" lang="ja">木</span>`). Görünmeyen aria/focus/hata metinleri de anahtar kullanır.
6. Mevcut Türkçe = **ilk locale sözlüğü (`tr`)** (kaynak: kilitli R2-A + mevcut REC/hub); başka çeviri yok.
7. Locale kodları genişlemeye açık: `tr, en, de, fr, pt-BR, pt-PT, vi, id` (pt-BR ≠ pt-PT).
8. **Font — TEK KANONİK KAYNAK:** `:root`'ta font değerleri yalnız `--font-display`/`--font-ui`/`--font-ja-learning`'de tanımlanır; eski `--serif`=`var(--font-display)`, `--sans`=`var(--font-ui)` **geçici alias** (aynı değer iki yerde bağımsız yazılmaz → drift yok); `.jp` **yalnız `--font-ja-learning`**. Legacy alias'lar ileride ayrı temizlik fazında kaldırılır. Şimdilik display = ja-learning = Shippori; **görsel değişmez.**
9. **`t()` fallback zinciri (kilit):** istenen locale → **`tr`** → **okunabilir key adı**. Örn. `t("onboarding.actions.continue","de")`: Almanca yoksa `tr`; `tr` de yoksa boş/exception değil, `onboarding.actions.continue` gösterilir + **development'ta uyarı log'u**. **Production çökmez.** **Desteklenmeyen/bozuk locale → `tr`.**

## §16 — Takip (bu GATE'i bloke ETMEZ)
Çok dilli **font fixture genişletmesi** — Almanca uzun birleşik metin · Fransızca aksanlar (é è ê ë ç œ) · Portekizce · **Vietnamca birleşik aksanlar** (gerçek kelime/cümle: "học tiếng Nhật", "người mới bắt đầu"; aksan kesilmesi/satır yüksekliği/kalın ağırlık). Ayrı takip; GATE 0'ı bloke etmez.

---

## §17 — Durum: PLAN ONAYLI / GATE 0 AÇIK
Dört semantik + i18n-readiness + teknik kesinlik düzeltmeleri kapandı. **Feature kod kapısı GATE 0 cihaz font kabulünden SONRA açılır.** Cihaz kabulü gelene kadar feature kodu/çeviri üretilmez.
