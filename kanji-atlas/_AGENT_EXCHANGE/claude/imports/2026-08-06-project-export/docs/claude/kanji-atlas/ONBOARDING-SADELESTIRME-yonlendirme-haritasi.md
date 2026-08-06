# Onboarding Sadeleştirme — Yönlendirme Haritası (KARARLAR KİLİTLİ, kod-suz)

> **Durum:** Harita + kararlar + koddan-önce 3 netleştirme **KİLİTLİ.** **Kod yok.** Sıradaki: kod (onaylı). Spec: `ONBOARDING-SADELESTIRME-tanima-merdiveni.md`. Plan: `ONBOARDING-SADELESTIRME-uygulama-plani.md`.

## 0. KİLİTLİ micro-kararlar (Zeynep)
1. **İki EŞİT buton** (Evet / Hayır).
2. **あ-Hayır → Japonca Yazı Mantığı** (birleşik: hem git hem şerit = Yazı Mantığı).
3. **"Evet" = sade "tanıyorum"**, alt açıklama YOK.
4. **Ölü kod/i18n SİLİNİR.**

## 0b. KODDAN ÖNCE 3 NETLEŞTİRME (Zeynep sordu → işlendi)
- **#2 — `kanji-nedir` descriptor'ı EKLENMEZ.** 木-Hayır yolu **`kanji-ki`** (木 detay) — kilitli yol bu; `kanji-nedir` onunla çelişirdi + "Kanji nedir → devam" butonu ayrı/ertelenmiş faz. **Tek yeni descriptor `yazi-mantigi`.** (N4'teki tentative "Kanji nedir" fikri bu faz için geri alındı; ileride buton gelince opsiyon.)
- **#1 (migration matrisi) → §5.** **#3 (yol matrisi) → §2b.**

## 1. Stage makinesi
Eski: `welcome → competency → (writing-intro) → final`. **Yeni: `welcome → kana-q (あ) → kanji-q (木)`.**

| Ekran | Evet | Hayır | Ana sayfaya git |
|---|---|---|---|
| **welcome** (AYNI) | Başlayalım → kana-q | — | SKIP → home |
| **kana-q (あ)** | → kanji-q | COMPLETE + `writing-system` | SKIP → home · ‹back → welcome |
| **kanji-q (木)** | COMPLETE + `map` | COMPLETE + `detail`(ki) | SKIP → home · ‹back → kana-q |

## 2. Durum + öneri-şeridi (BİRLEŞİK model)
- COMPLETE (Evet/Hayır) → `status=completed` + `startKey`; **hemen gidilen yer = şerit hedefi** (descriptor.route). "Ana sayfaya git" → SKIP, şerit yok. `ob-home` HER ZAMAN skip.
- `completeOnboarding(startKey)` + `go(startDescriptorFor(startKey).route, param)` — eski `ob-final-start` deseninin aynısı.

## 2b. YOL MATRİSİ (#3 · net)
| Yol | Hedef route (param) | Kaydedilen startKey | onboarding.status | Home şeridi (label) |
|---|---|---|---|---|
| **あ Hayır** | `writing-system` | `yazi-mantigi` (YENİ) | **completed** | "Japonca Yazı Mantığı" |
| **あ Evet → 木 Hayır** | `detail` (ki) | `kanji-ki` (var) | **completed** | "Kanji Atlası" (home.rec.kanji) |
| **あ Evet → 木 Evet** | `map` | `atlas-map` (var) | **completed** | "Kanji Haritası" (home.rec.atlas) |
| **Ana sayfaya git** (herhangi ekran) | `home` | `null` | **skipped** | yok |
- İlk-eylem (SRS success) sonrası şerit kaybolur (firstMeaningfulActionAt), her yolda.
- Not (kopya): 木-Hayır şeridi `kanji-ki` descriptor'ının reason'ını gösterir ("Hiraganan hazırsa…") — 木-tanımıyor kullanıcı için ideal değil; **kopya ince ayarı ayrı** (bu faz bloklamaz).

## 3. START_DESCRIPTORS
- **KORU** (geri-uyum + aktif kullanım): `kana-a`, `kana-home`, `kanji-ki` (木-Hayır **aktif**), `atlas-map` (木-Evet **aktif**).
- **EKLE (tek yeni):** `yazi-mantigi` → `{route:"writing-system", labelKey:"home.rec.writing.label", reasonKey:"home.rec.writing.reason"}`.
- **ctaKey KALDIRILIR** (hiçbir yerde okunmuyor; eski final butonundaydı, o da siliniyor).
- `kanji-nedir` **EKLENMEZ**.

## 4. completeOnboarding refactor
- `completeOnboarding(startKey)` — explicit key; competency bağı çıkar. name KORUNUR; competency yok → level/showAdvanced mevcut korunur. `skipOnboarding`/marker/şerit mantığı değişmez.

## 5. normalizeOnboarding + MIGRATION MATRİSİ (#1 · net)
`OB_STAGES` = `["welcome","kana-q","kanji-q"]`; `VALID_START_KEYS` = kana-a/kana-home/kanji-ki/atlas-map + `yazi-mantigi`. `schemaVersion` DOKUNULMAZ. Tüm durumlarda **KORUNUR:** firstMeaningfulActionAt, startedAt, userHints, SRS, kana, seenWritingSystem, userProfile.name.

| Girdi (eski/mevcut state) | Politika | Sonuç |
|---|---|---|
| Yok (fresh) | — | in-progress · stage=welcome |
| Eski-şema (status yok) · completed=true | migration | completed · competency=null · startKey=null (şerit yok) |
| Eski-şema · completed=false/yok | migration | in-progress · stage=welcome |
| Yeni-şema · completed · startKey GEÇERLİ | doğrula | completed · startKey korunur → şerit resolve |
| Yeni-şema · completed · startKey geçersiz | güvenli düşüş | completed · startKey=null (sahte şerit yok) |
| Yeni-şema · skipped | temizle | skipped · competency/startKey=null · şerit yok |
| **Yeni-şema · in-progress · stage ESKİ** (competency/writing-intro/final) | **RESET** | **in-progress · stage=welcome** · competency/startKey=null |
| Yeni-şema · in-progress · stage GEÇERLİ (welcome/kana-q/kanji-q) | koru | in-progress · o stage'de kalır |

## 6. Onboarding() render
welcome KORU (escape "git"); competency/writing-intro/final SİL; kana-q/kanji-q EKLE (`.ob-final` düzeni, iki EŞİT buton, Evet subtext yok/Hayır subtext var, back oku, "Ana sayfaya git").

## 7. Handler'lar
- `ob-continue`: welcome→kana-q. **SİL:** `ob-competency`, `ob-final-start`. `ob-back`: kana-q→welcome, kanji-q→kana-q. `ob-home`: HER ZAMAN skip.
- **YENİ** `ob-yes`/`ob-no`:
  - kana-q Evet→kanji-q · kana-q Hayır→`completeOnboarding("yazi-mantigi")`+`go("writing-system")`
  - kanji-q Evet→`completeOnboarding("atlas-map")`+`go("map")` · kanji-q Hayır→`completeOnboarding("kanji-ki")`+`go("detail","ki")`
- `ob-restart` (Profil): aynı; kopya "Karşılama ekranını yeniden başlat".

## 8. I18N
- **EKLE:** `recognize.title` · kana-q/kanji-q güvence · Evet/Hayır · Hayır alt açıklamaları · tek "Ana sayfaya git" · `home.rec.writing.label/reason`.
- **SİL:** `competency.*`, `ws.*`, `final.band0-3.*` (+ descriptor ctaKey). **KORU:** welcome.*, actions.*, a11y.*, `home.rec.kana/kanji/atlas.*`.

## 9. Kapsam + bağımsızlık
Bu faz = onboarding akışı + escape "git" + Profil kopya + ölü kod temizliği. Routing hedefleri MEVCUT sayfalar (writing-system/detail-ki/map). Primer revizyonları / Home-Yardım / Flick / freemium AYRI. Sevkedilebilir.

## 10. Test
3 çıkış + skip + back + reload · yol matrisi (§2b) · **migration matrisi (§5) — in-progress dahil** · export parse · silinen sembol grep=0 · Pas 1 regresyonu temiz · 404/console temiz.
