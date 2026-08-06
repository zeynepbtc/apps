# ▶ DEVAM NOKTASI + GÜNLÜK — Japonca Yazı Atlası

> **Bu dosya:** oturumlar arası tam devam kaydı + yedek günlüğü. Önce bunu oku. **Son tam yedek: 2026-07-23 17:32.**
> **Kaynak gerçek = git.** Branch `onboarding-b2-gate3` @ **`ca744a5`** (origin senkron, çalışma ağacı temiz).

## 🎯 DURUM
Tasarım kalemleri (onboarding + home + nav + iç sayfa + kanji vitrin) KAPANDI. Veri kalıcılığı (yedekleme) + İçerik denetimi (Faz İ) + **Faz K (Kana SRS halkası + Dakuten modülü)** tamam. **SIRADA: Faz O — oyun revizyonu.** (dil + dark mode İLERİDE, Zeynep dönecek.)

## 🔒 YEDEK NOKTASI (2026-07-23 17:32)
- **Commit:** `1f6f4e8`. **Tag:** `yedek-nav-materyal-20260723-1732` · **Branch:** `yedek/nav-materyal-20260723-1732` (origin'de).
- **ZIP:** `/mnt/user-data/outputs/YEDEK-japonca-yazi-atlasi-20260723-1732.zip`.
- (Not: sonraki tam yedek `ca744a5`'ten alınmalı — İçerik denetimi + Faz K commitleri geldi.)

## ⭐ Uygulama: **Japonca Yazı Atlası** (isim KİLİT). Logo teal yuvarlak kare + turuncu 木, **60px**.

## ⏭ SIRADAKİ AKSİYON
1. **Faz O — Oyun revizyonu (SIRADAKİ).** Referans: `OYUN-REVIZYON-NOTLARI-FazO-referans.md` (GPT analizi + Claude ön-değerlendirmesi). Sıra: hazır kelime oyunlarını yüzeye çıkar (word-meaning/reading/cloze kodda hazır, hub'da gizli) → üretim/ses/süreli kana modları → kanji okuma oyunu → bileşenden kanji kur (Kanji Atölyesi, moat). SRS kaydını boyut-bazlı genişletmeyi burada değerlendir.
2. **Zeynep — telefon:** yeni Kana SRS tekrar halkası + dakuten modülü (dokun→dönüşüm→Biliyorum→tekrar); whisper scrim + iOS köşe-bant; yedekleme.
3. **İki-pencere uyarısı:** devam etmeden önce **`git pull`** ile `ca744a5`'e senkron ol.
4. **İçerik: karar bekleyen 6 madde** (bkz `ICERIK-DENETIMI-FAZ-I-bulgular.md` — 国/王 bileşen, 大/小 kategori, 月 okuma, 気 sıra, atlas bütünlük). Zeynep onayıyla uygulanacak.

## ✅ YAPILDI — Faz K · Kana SRS halkası (`27f7793`) + Dakuten modülü (`ca744a5`)
Kilit bulgu: kana SRS MOTORU (`buildKanaReviewQueue/currentKanaReviewQueue/kanaDueCount`) zaten vardı ama "internal"dı; UI'a bağlandı.
- **K1:** yeni `kanareview` ekranı = **üretim-hafif tekrar** (ses/romaji → doğru kanayı seç, 2x2 `.gopt`, `srsRecord` besler → mastery/next günceller). Kana ekranı üstünde `kanaDueCount>0` iken "X kana tekrar bekliyor" banner'ı (`.krev-*`). NAV_HIDDEN + NAV_TAB_GROUP.kana'ya `kanareview`. Test `test_kanarev` 13/13. (Cila: `.krev-opts` prompt↔şık boşluğu 16px.)
- **K2:** DAKUTEN_PAIRS/HANDAKUTEN_PAIRS modül seviyesine taşındı + `DAKU_KANA` map + `kanaInfo/kanaDistractorPool` (tekrar dakuten'i de tanır). Dakuten referans çipleri dokunulabilir (`dakBtn`, `data-act=dak-open`) → **dönüşüm kartı** (`dakFocusCard`: か+゛=が, ka→ga, kural, ses, "Biliyorum"). "Biliyorum" → `srsRecord(voiced,{known:true})` → kana SRS'e girer + çipte ✓/teal. Yōon şimdilik salt referans (kapsam dışı).
- **BUG FIX (kritik):** `makeTypeResolver.resolveType`'a `isKanaCodepoint` fallback eklendi — dakuten (temel-46 dışı tekil kana) artık "kana" çözülüyor; önce srsRecord reddediyordu. `isKana` (migration seed) DEĞİŞMEDİ.
- Test `test_dakuten` 14/14. Tüm regresyon: smoke 23/23, backup 17/17, kanarev 13/13.
- NOT (Faz O): GPT'nin "çok boyutlu ölçme"si için SRS kaydını boyut-bazlı (recognize/produce/read/write/discriminate) genişletmek gerekir — SRS çekirdeğinin korunan invariantları var, dikkatle; Faz O'da oyunlarla birlikte.

## ✅ YAPILDI — İçerik doğruluğu denetimi · Faz İ (`51c5f35`)
91 kanji + 78 kelime + kana; deterministik script + 5 bağımsız ajan + elle doğrulama. **Veri çok temiz.** 2 net düzeltme: 先 "önce / öğretmen"→"önce / ön"; 玉 örnek 目玉 "göz bebeği"→"göz küresi". Kalan 6 madde yargı-gerektiren, onayda (`ICERIK-DENETIMI-FAZ-I-bulgular.md`).

## ✅ YAPILDI — Kanji vitrin (`274089c`) · Yedekleme (`4fbcee5`) · İç sayfa tutarlılık (`abaf85c`)
- **Kanji vitrin:** kompakt ustalık + Atlas hero (木→本休林森) + kategori rafları + `kanjicat` detay ekranı. Seviye çubuğu/chip filtresi/çizim pratiği kaldırıldı.
- **Yedekleme:** Profil > Veriler dışa/geri yükle (aynı `hydrate` yolu, TAM DEĞİŞTİR, onaylı). `smoke_backup` 17/17.
- **İç sayfa:** geri butonu yüzen malzeme + üst satır; Atlas pilleri narin tint; `.gsec-t` sakin serif-ink.

## ✅ Önceki: Nav materyal (`d3cfe54`,`1f6f4e8`) + üst mimari (`15eebf0`) + Home/Nav Flick redesign
`NAV-MATERYAL-TUTARLILIGI-KILITLI.md`. Whisper scrim, elevation birliği, kapsül camı, logo 60px, floating overlay header+nav, home-duo, buzlu-cam pill nav.

## 🔧 Commit izi (bu oturum)
…`274089c` kanji vitrin →`51c5f35` içerik Faz İ →`27f7793` Faz K1 kana SRS →`9990a9b` K1 boşluk cila →`ca744a5` **Faz K2 dakuten** (güncel HEAD).

## ⏳ AÇIK İŞLER
1. **Faz O — oyun revizyonu** (SIRADAKİ, yukarıda). Notlar: `OYUN-REVIZYON-NOTLARI-FazO-referans.md`.
2. İçerik: karar bekleyen 6 madde. 3. **DİL / i18n** — Zeynep. 4. **DARK MODE** — Zeynep.
5. Migration gerçek-blob testi + telefon render.
6. **Yazı Mantığı → Dojo Kapısı**; kana-about/kanji-about silme burada.
7. Nav ikonları → Flick şekilleri (görsel gerekiyor). 8. Pas B — ekran başlıkları.
9. **Ölü CSS temizliği** (`.levbar` + Kana içindeki artık kullanılmayan `dakChip` local const + `.mbox/.home-band/.gate-card/.pcard/.snav-*`) — önce doğrula.
10. R7 Learning Flow · S-1 font. 11. Kalıcılık üst sürümü (bulut senkron).

## 📎 İlgili belgeler
`OYUN-REVIZYON-NOTLARI-FazO-referans.md` · `ICERIK-DENETIMI-FAZ-I-bulgular.md` · `NAV-MATERYAL-TUTARLILIGI-KILITLI.md` · `HOME-GRID-EDITOR-PROMPT-referans-hizalama.md` · `IKON-LOGO-TASARIM-DILI-referanslar.md` · `YAZI-MANTIGI-HUB-REVIZYON-tasarim.md` · `GEZINTI-REVIZYON-BIRIKTIRME.md`.

## 🔐 Teknik / güvenlik
- Branch `onboarding-b2-gate3` @ `ca744a5` (origin senkron). Yedek branch/tag dokunulmaz.
- Staging `kanji-atlas-staging-b2.zeynop.workers.dev` (Upload & deploy). Paket: index.html + 473 ses → ZIP.
- Yerel doğrulama: `node --check` + `_faz2/smoke_recognition.js` (23/23) + `_faz2/smoke_backup.js` (17/17) + Playwright (`/tmp/test_kanarev.js` 13, `/tmp/test_dakuten.js` 14). iOS gerçek cam/download/ses telefonda gözlenir.
- GÜVENLİK: production `kana_state` sohbete/Claude'a asla yapıştırılmaz; prod localStorage'a yazılmaz. GitHub token yalnız push/fetch URL'sinde, tüm çıktı sed-filtreli.
