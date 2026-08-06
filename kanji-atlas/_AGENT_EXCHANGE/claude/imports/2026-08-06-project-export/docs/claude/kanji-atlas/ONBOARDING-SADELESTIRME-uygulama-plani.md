# Onboarding Sadeleştirme — Uygulama Planı (kod-suz, ONAYLI — koda geçilebilir)

> **Durum:** Uygulama planı + koddan-önce 3 netleştirme **işlendi.** Zeynep: yön + uygulama sırası + export-grep + tek-faz **onaylı**. Harita: `ONBOARDING-SADELESTIRME-yonlendirme-haritasi.md`. Tek dosya: `index.html` (+ `_faz2/`). Branch: `onboarding-b2-gate3`.
> **Kapsam (tek kapanabilir iş):** onboarding akışı + escape "git" + Profil restart kopyası + ölü kod temizliği. Routing hedefleri MEVCUT sayfalar. Primer revizyonları / Home-Yardım / Flick / freemium AYRI.

## ★ Koddan-önce 3 netleştirme (Zeynep)
- **#1 · Migration:** eski **completed VE in-progress** state'leri kapsayan normalize politikası + fixture'lar (yalnız completed yetmez). → Harita §5 matrisi; fixture listesi aşağıda (Test).
- **#2 · `kanji-nedir` EKLENMEZ.** 木-Hayır → **`kanji-ki`** (mevcut). Tek yeni descriptor **`yazi-mantigi`**. (Gerekçe: kilitli yol kanji-ki ile çelişmesin + "Kanji nedir→devam" butonu ayrı faz.)
- **#3 · Yol matrisi:** aşağıda (+ Harita §2b).

## Yol matrisi (kesin)
| Yol | Hedef route(param) | startKey | status | Home şeridi |
|---|---|---|---|---|
| あ Hayır | writing-system | `yazi-mantigi` | completed | "Japonca Yazı Mantığı" |
| あ Evet → 木 Hayır | detail(ki) | `kanji-ki` | completed | "Kanji Atlası" |
| あ Evet → 木 Evet | map | `atlas-map` | completed | "Kanji Haritası" |
| Ana sayfaya git | home | null | **skipped** | yok |

## Dosya kapsamı (blok bazında — satırlar kodda teyit)
**A · I18N (~2255-2298):** SİL competency.*/ws.*/final.band*.* · EKLE recognize.title, kana-q/kanji-q güvence, Evet/Hayır, Hayır alt açıklamaları, tek "Ana sayfaya git", `home.rec.writing.label/reason` · KORU welcome.*/actions.*/a11y.*/home.rec.kana|kanji|atlas.*.
**B · Descriptors + ölü yardımcılar (~2317-2339):** SİL OB_BANDS/bandOf/competencyNeedsIntro/startKeyForCompetency/competencyToLegacyLevel/competencyShowAdvanced · START_DESCRIPTORS: ctaKey kaldır, **EKLE yalnız `yazi-mantigi`** (kanji-nedir YOK); kana-a/kana-home/**kanji-ki**/atlas-map KORUNUR.
**C · normalizeOnboarding (~2343-2384):** OB_STAGES yeni; competency türetme çıkar; **migration matrisi §5 (Harita) — in-progress ESKİ stage → welcome RESET dahil**; schemaVersion sabit.
**D · completeOnboarding (~2387-2401):** `completeOnboarding(startKey)`; name korunur; competency helper referansları çıkar.
**E · Onboarding() render (~2434-2501):** welcome KORU (escape "git"); competency/writing-intro/final SİL; kana-q/kanji-q EKLE (.ob-final, iki eşit buton, Evet subtext yok/Hayır subtext, back).
**F · Handler'lar (~5731-5766):** ob-continue sadeleş; SİL ob-competency/ob-final-start; ob-back sadeleş; ob-home HER ZAMAN skip; EKLE ob-yes/ob-no (kanji-q Hayır→completeOnboarding("kanji-ki")+go("detail","ki")).
**G · Export'lar (PARSE GOTCHA):** window.__ob (2432) + window.JYA (~5968): silinen sembolleri (OB_BANDS/competencyNeedsIntro/startKeyForCompetency/competencyToLegacyLevel/competencyShowAdvanced) çıkar; commit öncesi grep=0 doğrula.
**H · Profil kopya:** "Karşılama ekranını yeniden başlat".
**I · CSS:** .ob-final/.ob-root/.ob-stage/.ob-escape/.ob-back/.rec-hint KORU; competency/writing-intro özel sınıfları (.ob-card*/.ob-cards-vert/.ob-three*/.ob-final-pair/atlas/target) grep temizse sil.

## Adım sırası
1. I18N ekle. 2. Descriptors: yazi-mantigi ekle + ctaKey kaldır. 3. normalize + completeOnboarding refactor. 4. render kana-q/kanji-q. 5. handlers ob-yes/ob-no + güncelle. 6. **Export'lar güncelle (G).** 7. **Eski blokları SİL** (referanslar temizlenince). 8. CSS grep-temiz sil. 9. Profil kopya. 10. Doğrula: node --check + DATA JSON + grep(silinen sembol)=0.

## Migration + Test matrisi
**Node fixture (gate1 yeniden yazılır):**
- Stage makinesi: welcome→kana-q→kanji-q; her çıkış `completeOnboarding(doğru startKey)` + doğru route (yol matrisi).
- Skip (ob-home her stage) → skipped, şerit yok. Back haritası. shouldShowInitialRec.
- **Migration (§5 — HEPSİ):** fresh · eski-şema completed → completed/startKey=null · eski-şema not-completed → welcome · yeni completed geçerli startKey → korunur · yeni completed geçersiz startKey → null · skipped · **yeni in-progress stage=competency → welcome RESET** · **stage=writing-intro → welcome RESET** · stage=kanji-q → korunur. Her durumda userHints/SRS/kana/seenWritingSystem/name korunur.
- **Export parse (ReferenceError yok).**
**Browser smoke (yeniden yazılır):** gerçek Evet/Hayır her ekran → doğru route+status+şerit; git→skip+şerit yok; ilk-eylem→şerit kaybolur.
**gate3_container:** migration/font/klavye/console KORU; flow kısmı yeni.
**Regresyon:** Pas 1 (alt-nav İlerleme/Oyunlar, Home 3 kart, 404/console) temiz.
**Gerçek production blob** (GATE) — Zeynep, cihazda.

## Riskler
Export gotcha (G+grep) · fixture'lar eski flow'a bağlı (yeniden yazılır) · CSS ölü sınıf (grep) · in-progress kullanıcı welcome'a döner (nadir, matriste kabul).

## Sevkiyat
Yeni temiz ZIP → staging redeploy (Zeynep) → browser regresyon (Claude) → migration testi (Zeynep) → onay. Faz kendi başına sevkedilebilir. GATE 3/4: Pas1+bu+Pas2 birleşince + onay.

## KAPSAM DIŞI
Yazı Mantığı iç revizyonu · Kanji nedir "→ devam" butonu · Home nedir-temizliği + Profil>Yardım · Flick renk/font + welcome buton rengi · freemium/N5 · yeni Yardım içerikleri.
