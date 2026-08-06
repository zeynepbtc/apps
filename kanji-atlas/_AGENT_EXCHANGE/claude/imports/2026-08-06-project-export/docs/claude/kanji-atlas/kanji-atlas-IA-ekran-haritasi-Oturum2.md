# Kanji Atlas — IA / Nav Ekran Haritası (Oturum 2 · P0-1) — KOD TAMAM

> **Durum:** P0-1 entegrasyonu kod olarak TAMAM (Dilim 1-4 + 3.5 + 2 scroll fix). Telefon sign-off bekliyor. Kilitler: alt bar Kana/Kanji/Yazı/Oyunlar · logo=Home · D1.

## İLERLEME (dilimler)
- **Dilim 1 — Root navigation stack politikası:** ✅ yayında. `goRoot()`; tab/logo reset, profile çağıranı korur.
- **Dilim 2 — 4-tab IA yapısı:** ✅ yayında. renderTabs→4 tab, Home→logo, Progress→Home ana+Profile ikincil, görünürlük, noBack={home,kana,kanji5,practice,games}.
- **Dilim 3 — Floating socket selector + 3 durum:** ✅ yayında. Kilitli v23 geometri; **active/sunk/hidden ayrı** (sunk=kısa iniş+ikon kaybolur; hidden=fade+scale, socket in-place kapanır); stretch ≤%3.5 yalnız aktif; reduced-motion=snap; derin contextTab statik vurgu.
- **Dilim 3.5 — Home IA:** ✅ yayında. 4 kalıcı giriş (Kana/Kanji/Yazı/Oyunlar); öneri her zaman + baskın + progress'ten önce; progress ikincil; açıklayıcılar korundu.
- **Dilim 4 — Tam nav smoke:** ✅ geçti (gerçek tıklama). Tab dolaşımı stack=[]; Kanji→detail stack=[kanji5]; brand→home reset; avatar→profile çağıran korunur+back→çağıran; görünürlük tablosu uygun.
- **Nav kalitesi scroll fix'leri:** ✅ (a) Yazı pratiği yatay şeridi seçimde başa zıplamıyor; (b) `back()` liste dikey kaydırmasını stack'te saklayıp geri yüklüyor — kanji/kana/kelime tüm liste→detay→geri akışları kaldığı yeri hatırlıyor.
- **Kalan:** Zeynep telefon sign-off → P0-1 CLOSED.

### Nav sonrası ayrı UI dilimleri (kayıtlı, bu faz değil)
- ⬜ **Header revizesi — derin ekranda net Home affordance:** Şu an derin ekranda sol=geri, Home erişimi başlık/brand'e tıklama ile (kasıtlı uzlaşma, header büyütülmesin diye). Zeynep: başlığın Home'a götürmesi sezgisel değil. Doğru çözüm: `geri (parent) · ortada Home logosu/ev ikonu · avatar` (3-bölge). Yarım-fix (başlık-linkini kaldırmak) derin ekrandan Home'u zorlaştırır → tam çözüm header diliminde. (Ara-düzeltme istenirse: başlığı tıklanamaz yap.)
- ⬜ **Kana Detail ↔ Kanji Detail ortak component mimarisi** — aynı eylemler aynı sıra/isim/görsel ağırlık; iskelet aynı, içerik farklı.
- ⬜ **Yazı hub'ı** — mochi (Kana Yazımı) practice/Yazı'ya açık giriş (şu an kana bağlamından erişilebilir; kırık değil).

## A. Root navigation & stack (Dilim 1)
Tab tap: root'a git, detay dalını kapat, root'u tekrar push etme. Logo/brand→Home: reset. Avatar→Profile: çağıran korunur, geri→çağıran. return_to = stack.

## C. Görünürlük (uygulandı)
4 root tab: nav görünür + selector aktif · Home: nav görünür + selector sunk · List/detail: nav görünür + selector gizli · Immersive (game/drill/onboarding): nav gizli · Profile dalı: nav gizli.

## D. Header (uygulandı — revize ayrı dilimde ↑)
Root: sol=logo→Home. Derin: sol=geri (back=stack). Header büyütülmedi. Brand/title→Home (reset). Sezgisellik header diliminde.

## E. Ekran → yeni ev
| screen | tab | canonical_parent | return_to | nav | selector |
|---|---|---|---|---|---|
| home | — (logo) | — | reset | ✔ | sunk |
| learn/kana-about/kanji-about/writing-system | (Home) | home | stack | ✔ | gizli |
| kana | Kana | — | — | ✔ | aktif |
| kanadetail | Kana | kana | stack | ✔ | gizli |
| kanji5 | Kanji | — | — | ✔ | aktif |
| detail/atlasnode/map/transform/words/worddetail | Kanji | kanji5/words | stack | ✔ | gizli |
| practice (Yazı) | Yazı | — | — | ✔ | aktif |
| mochi | Yazı | practice | stack | ✔ | gizli |
| drill | Yazı | practice/detail | stack | gizli | gizli |
| games | Oyunlar | — | — | ✔ | aktif |
| game | Oyunlar | games | stack | gizli | gizli |
| quiz | (bağlamsal) | çağıran | stack | ✔ | gizli |
| progress | (Home+Profile) | home | stack | ✔ | gizli |
| review/path | İlerleme | progress | stack | ✔ | gizli |
| profile/profile-edit/reset-confirm | — (avatar) | profile | stack | gizli | — |
| onboarding | — | — | — | gizli | — |

## F. Bu fazda YAPILMADI (sonraki dilim/faz)
Home dashboard tam kişiselleştirme (P1-1) · yazı motoru (P1-4) · header 3-bölge revizesi · detay ortak component · Yazı hub mochi girişi · mastery/SRS/yeni oyun.
