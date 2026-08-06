# Kanji Atlas — Alt Navigasyon (Floating Circular Selector) SÖZLEŞME

> **Status:** ★★ GEOMETRİ + ANİMASYON KİLİTLENDİ (2026-07-21) · Zeynep: "Köşeler mis, kaybolma daha tatlı, yay nefis. Sabahladığımıza değdi. Devam."
> **Ne bu?** Alt navigasyonun aktif-sekme göstergesinin **final** davranış + görünüm sözleşmesi. IA refactor'da nav kurulurken **birebir bu geometri + his** uygulanır. Prototip: `zeynepkaya.app/nav-prototip/` (final = **v21**). Kaynak: `/home/claude/nav-v11/index.html`.
> **Önemli:** Eski "çarşaf-altı jel / kabaran dom" yönü (v7) **terk edildi**. Uzun bir iterasyon (v3→v21) sonunda yön **"düz bar + yuvasından çıkan bağımsız dairesel seçici"** oldu. Aşağısı geçerli olan tek gerçektir.

## Onaylanan yön — "Floating circular selector in a socket"
Referans hissi: bir reels'teki "Saved" dairesi — düz tab bar'ın içine kesilmiş yuvadan çıkan, bağımsız, üstte duran dairesel seçici. FAB değil.

- **Bar düz ve SABİT.** Üst kenar dümdüz bir çizgi, **kare köşeler** (yuvarlak/bevel YOK — kenar sekmelerinde eğiş büğüş sivrilme yapıyordu). Bar hiç oynamaz, yükseklik değişmez, dalga/esneme/notch animasyonu YOK.
- **Aktif daire = bağımsız katman.** Barın **arka katmanında** çizilir; barda **mask ile kesilmiş yuvarlak delik** (negatif boşluk) içinden görünür. Dairenin üst ~%32'si barın üstünde (açık alanda), alt ~%68'i yuvanın içinde → "yuvasına oturmuş".
- **Negatif boşluk (nefes):** daire ile delik arası **~5px** boşluk, arkadaki sayfa arka planını (paper) gösterir. Dar tutuldu — geniş olunca yay yazıya değiyordu.
- **Yuva yayı:** deliğin barla kesişen alt yayı **net, ince bir çizgi** (çerçeve kalınlığında ~1.2px, ton `#DCCFB9`). **Blur/bulanıklık YOK** (blur'lu groove denendi, "netsiz" diye reddedildi). Yalnız bar içinde görünür (üstü `clip-path` ile kesilir).
- **Hafif ambient gölge:** daire (arka katman) yumuşak gölge → yuvaya groove/derinlik verir. Kaldırılmaz.
- **İkon dairenin içinde:** aktif sekmenin ikonu kendi satır yerinden kaybolur (`opacity 1→0`), beyaz olarak dairenin merkezinde belirir. Diğer ikonlar yerinde. Yazılar HER ZAMAN görünür, asla aşağı itilmez.

## Animasyon (KİLİTLİ — Zeynep onayladı, dokunma)
- **Yatay akış:** dokun → daire o sekmeye üstel yumuşatma ile akar (`cx += (cxT-cx)*0.2`); **jiggle/overshoot YOK** (monoton). Hafif squash-stretch (hız→esneme, `max 0.12`) ile canlı his. Yerleşme/durma yumuşak.
- **Sürükleme:** parmakla daireyi kaydır (bonus); bırakınca en yakın sekmeye oturur. Dokunma birincil, sürükleme opsiyonel.
- **Gömülme (Home'a dönüş) — "kaynaşarak batma", KÜÇÜLME DEĞİL:** daire **sabit boyutta aşağı batar** (cy: PRES→derin), aynı anda **yuva penceresi yukarı çıkıp düz kenara mühürlenir** → daire kapanan yüzeyin altında kalır. Konsantrik daralma (dıştan içe küçülme) reddedildi — "buna kaynaşma denmez". Fade YOK.
- **Doğma:** sekmeye dokununca daire yuvadan yukarı doğar (gömülmenin tersi).

## Kilitli geometri (px · container H=118, prototip 336px genişlik)
- `BAR_TOP=48` (düz bar üst kenarı, bar 70px) · üst köşeler **kare** (path: `M0,BAR_TOP L W,BAR_TOP L W,H L0,H Z`)
- `R=28` (daire yarıçapı, **çap 56** — SABİT, küçülmez) · `GAP=5` (negatif boşluk) · `holeR=R+GAP=33`
- `PRES_CY=BAR_TOP+10` (aktif merkez, ~%68 gömülü / ~%32 görünür)
- `BALL_SINK=BAR_TOP+52` (Home: daire aşağı batar) · `HOLE_SEAL=BAR_TOP-holeR-2` (Home: pencere yükselip mühürlenir)
- `ICON_Y=BAR_TOP+16` (satır ikonları, SABİT) · `LABEL_Y=BAR_TOP+47` (yazılar, SABİT — yay ile arasında nefes)
- `INSET=10` (kenar payı — ilk/son daire köşeye sıkışmaz; tab merkezleri ve `slot` bu paya göre)
- Daire fill: **düz tek renk** `#D3813A` (amber; gradyan/highlight/gloss YOK — "sade sessiz"). İkon beyaz `.eico` çizgi, stroke ~2.1.
- Yuva yayı `#DCCFB9` w1.2 net · delik kenarı mask blur ~0.5 (neredeyse net) · ambient gölge dy3/std5/opacity~0.26.
- Hız yumuşatma `svel=svel*0.8+vel*0.2`, ölü bölge `|svel|<0.5→0`.
- z-sırası: **daire (arka, gölgeli) → ikon → bar (mask'lı delik) → yuva yayı (clip'li)**.

## Erişilebilirlik / güvenlik
- **Reduced-motion:** yumuşatma oranları hızlı/sade (loop `0.5`), esneme minimum.
- **Dokunma her zaman çalışır** (VoiceOver/motor); sürükleme opsiyonel.
- **Haptik:** Android web `navigator.vibrate` hafif; **iPhone web'de haptik YOK** (Apple kısıtı) → gerçek Apple-haptik native sürümde. Kod hazır.
- **Render notu:** JS gerekir; uygulama-içi önizleme JS engeller → test daima **Safari/hosted URL**.

## Açık işler (geometri onaylı; kalanlar)
1. **Final çizgi-ikonlar — SIRADAKİ İŞ.** Mevcutlar geçici (Kana=kitap · Kanji=田 · Yazı=kalem · Oyunlar=kol). Aile `.eico` standardı; premium tutarlı stroke. Nav işini bu kapatır.
2. **Gerçek nav'a entegrasyon** — IA refactor'da (üst-bar logo=Home + profil; 4 sekme Kana·Kanji·Yazı·Oyunlar) bu motor bağlanır. Rotalar `data-go`, aktif durum senkronu.
3. **Cihaz perf testi** — gerçek (ucuz) Android'de akıcılık.
4. **Native haptik** — native sarılınca bağlanır.

## İterasyon geçmişi (özet)
v7 çarşaf-altı jel (terk) → v14 floating selector (düz bar) → v15 socket/mask negatif boşluk → v16 derin oturma (Zeynep sevdi) → v17 tanımlı kenar+arka katman (yay yazıya değdi, hâlâ küçülüyordu) → v18 dar yuva 5px + gerçek batma → v19/20 düz kare köşeler + kenar payı → **v21 net ince yuva yayı (KİLİT)**.
