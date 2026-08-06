# Kanji Atlas — UX / IA Mimarisi (Faz 3 · Kol B, tam refactor)

> **Status:** ★ MODEL KİLİTLİ (2026-07-21) · Rol: **ürün mimarı**.
> **Tez (Zeynep):** *"Üründe özellik eksikliği yok. Keşfedilebilirlik eksikliği var."* En büyük sürüm yeni özellikle değil, yeniden düzenlenmiş keşfedilebilir deneyimle gelecek.
> **30-saniye testi:** İlk kez indiren biri 30 sn'de uygulamanın ne yaptığını anlıyor mu? Şu an: hayır → Hedef: evet.
> **Değişmez ilke:** **Yeni özellik YOK.** Mevcut özellikleri doğru evlere taşı. Daha az karmaşa, daha çok ekran değil.

---

## ★ KİLİTLENEN NAVİGASYON MODELİ (2026-07-21)
- **Üst bar:** **SOL = logo = Ana Sayfa/dashboard butonu** (Home alt bardan çıktı → logoya taşındı; kullanıcı hiç kaybolmaz). **SAĞ = profil avatarı.**
- **Alt bar — 4 sekme, EMOJİ YOK, her biri kendi monokrom çizgi-ikonu (`.eico`, currentColor — Flick/oyun-tasarim-standardi §3):**
  `Kana · Kanji · Yazı · Oyunlar` (kısa etiket + kendi ikonu).
- **Profil → ⚙ Ayarlar** (üst-sağ avatar → Profil; Ayarlar Profil içinde ⚙, tek giriş).
- **İlerleme → Ana Sayfa** (kutlama diliyle). Nav'da değil.
- **Push/modal ekranlarda:** solda **‹ geri = origin'e** (Zeynep kuralı), **logo = eve**. Kaybolma yok.
- **Uygulama sırası:** önce mimari KİLİT (bu belge) → sonra **tam ekran/buton envanteri** → sonra uygulama-sırası kararı (davranış-korur IA-iskelet mi, IA+görsel birlikte mi).

---

## 0. Mevcut durum (kanıt)
- **Alt nav (sat.1780):** Ana Sayfa · Kana Okulu · Kanji Atlası · Oyunlar · **İlerleme** (5).
- **~26 rota**, aralarında **nav'da olmayan öksüz hub'lar:** `Learn` (Kana/Kanji/Transform kartları — tab'larla çakışıyor), `Practice` (çizim hub'ı). Ayrıca `path`, `review`, `transform`, `writing-system`, `kana-about`, `kanji-about`.
- **Settings ayrı ekran DEĞİL** — Profil içine gömülü (Dil/Ses/reset dağınık).
- **İlerleme = istatistik ekranı** (Kana% / N5 Kanji% / N5 Kelime% barları).
- **Çizim = 4 ekran/1 motor** (bkz. `kanji-atlas-faz3-cizim-denetimi.md`).

---

## 1. GPT arayüz önerisi — dürüst değerlendirme (kabul değil, denetim)

| GPT önerisi | Değerlendirme |
|---|---|
| Alt nav sadeleş, İlerleme çıkar | **✅** Bağımsız aynı sonuç. İlerleme "eylem" değil "bakış". |
| Home = Dashboard | **✅ + uyarı:** tab kopyası değil — kişisel katman (devam/bugün/öneri). |
| Profil ≠ Ayarlar | **✅ Apple HIG.** Ama Profil'i rozet/avatar ile doldurmak = yeni özellik; ayrımı yap, içeriği mevcutla sınırla. |
| Gerçek Settings (kategorili) | **✅ Yapı harika — çoğu öğe YOK** (Premium/Cloud/Haptik...). Kabuk+kategori kur, var olanı koy; dark mode+i18n landıkça dolar. |
| İlerleme = kutlama | **✅** Ama tam rozet sistemi = yeni özellik. Mevcut veriyi gelişim diliyle sun. |
| Üstte sabit ev | **✅ → logoya bağlandı.** ‹ = origin, logo = ev. |
| Writing: Stroke Coach·Ghost·Serbest Yazı·Challenge | **⚠️** Serbest Yazı+Challenge = YENİ → park. Şimdi mevcut 2 modu topla. |
| Aile omurgası tekrar kullanımı | **✅✅** "Studio Navigation Standard"a yükselt. |

**★ Merkezi disiplin:** her öğeyi **"yapı" (şimdi) vs "özellik" (sonra)** ayır. IA refactor doğru evleri + iskeleti kurar; yeni özellikle doldurmaz. → "yeni özellik yok" korunur, keşfedilebilirlik hemen kazanılır.
**Çelişki taraması:** omurga tutarlı ve sağlam (kullanıcı kaybolmaz). Tek risk = sessizce yeni özellikler; yapıdan ayırınca öneri sağlam.

---

## 2. Omurga — üst bar + 4 sekme + yardımcı katmanlar

**Üst bar:** `[logo = Ana Sayfa]  ——— başlık ———  [profil avatarı]`
**Alt bar (birincil, 4, emoji yok, kendi çizgi-ikonları):** `あ Kana · 漢 Kanji · Yazı · Oyunlar`
**Yardımcı katmanlar (nav'da değil):** İlerleme → Home · Profil → üst-sağ avatar · Ayarlar → Profil ⚙.

---

## 3. Modül haritası — "bir özellik = bir ev"

| Modül | İçerir (toplanır) | Kısayol |
|---|---|---|
| **Ana Sayfa** (logo) | Dashboard: Devam et · bugünkü ilerleme · streak/sayı · öneri · İlerleme özeti · Keşfet | Her modüle |
| **Kana** | Kana Okulu + `kanadetail` + `kana-about` | "Yazmayı dene" → Yazı/kana |
| **Kanji** | `kanji5` + Atlas grafiği (`map`/`atlasnode`) + `detail` + `transform` + `kanji-about` | "Çiz" → Yazı/kanji · aile şeridi |
| **Yazı** | `Practice` terfi → tek modül, **2 mod** (kana/kanji); `Drill`+`Mochi` buraya; Stroke Coach (planlı) | Detaylardan kısayol, geri→origin |
| **Oyunlar** | `GamesHub` + oyunlar; stroke oyunu (motor paylaşır) | — |
| **Profil** (avatar) | Ben: hedef·streak·gelişim; ⚙ → Ayarlar | — |

**Öksüz/tekrar temizliği:** `Learn` → kaldır (kartları tab'larda) · `path`/`review` → Home/Kanji akışı (tab değil) · açıklayıcılar → bağlamsal "?".

---

## 4. Home = Dashboard (kişisel katman)
Mevcut veriyle, yeni özellik yok: (1) Devam et · (2) Bugünkü ilerleme (bar+%) · (3) Bugün (🔥 streak·N kanji·N kana) · (4) Sana öneriyoruz (SRS) · (5) Keşfet (modül kartları). Logo dokunuşuyla her yerden buraya.

---

## 5. Profil ↔ Ayarlar (KİLİT: avatar → Profil → ⚙ Ayarlar)
**Profil ("Ben") şimdi:** hedef · streak · gelişim. (rozet/başarı/koleksiyon/avatar = sonra.)
**Ayarlar — gerçek ekran, kategorili kabuk:** Öğrenme (JLPT·hedef·yazı sıkılığı·hayalet mod) · Görünüm (Açık/Koyu·yazı boyutu·hareket) · Ses (aç-kapa·oto-oynat) · Veri (sıfırla) · Erişilebilirlik (büyük buton·kontrast) · Destek (Hakkında·Sürüm·Gizlilik·Şartlar).
> Kural: kategori+var-olan ayar KUR; yok olanı KOYMA. Dark mode+i18n landıkça dolar.

---

## 6. İlerleme = gelişim/kutlama (redesign, yeni sistem değil)
Mevcut % barlarını kazanım diliyle sun ("Kana tamamlandı ✓", "bu hafta +3 kanji", "Yazın gelişiyor"). Aynı veri, farklı çerçeve. Rozet/başarı motoru = sonraki kalem. Home'da özet.

---

## 7. ≤2 dokunuş doğrulaması
| Hedef | Yol | Dokunuş |
|---|---|---|
| Ana Sayfa | üst-sol logo | 1 (her yerden) |
| Kana | alt bar | 1 (karakter: 2) |
| Kanji/atlas | alt bar (grafik: →görünüm) | 1–2 |
| Yazı | alt bar → seç | 2 (detaydan kısayol: 1) |
| Oyun | alt bar | 1 (oyun: 2) |
| İlerleme | Home | 1 |
| Profil | üst-sağ avatar | 1 |
| Ayarlar | avatar→⚙ | 2 |
Tüm çekirdek ≤2. ✓

---

## 8. Studio Navigation Standard (aile omurgası)
Omurga aile geneli: `üst bar [logo=home · profil] · alt bar [≤4 modül tab, çizgi-ikon] · Ayarlar gerçek ekran · geri=origin`. Flick/Atlas/PTJ aynı iskelet → tanıdıklık + düşük bakım. LOCK sonrası `ortak-standartlar/`'a "Studio Navigation Standard" olarak yükseltilecek (Visual Bible'ın IA kardeşi).

---

## 9. Kilitlenen kararlar + sıradaki
- ✅ Sekme adları: kısa + kendi çizgi-ikonu, emoji yok (Kana·Kanji·Yazı·Oyunlar).
- ✅ Home → üst-sol logo; Profil → üst-sağ avatar; Ayarlar → Profil ⚙.
- ✅ Model kilitli (yukarı).
- **▶ Sıradaki:** **tam ekran/buton envanteri** — her ekranın butonları benzersiz/tekrar/birleştir/kaldır tablosu + ~26 rotanın yeni-eve haritası. Sonra uygulama-sırası kararı (IA-iskelet önce mi, IA+görsel birlikte mi).
