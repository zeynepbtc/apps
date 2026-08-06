# Faz O — Oyun Revizyonu · DURUM

> Referans: `OYUN-REVIZYON-NOTLARI-FazO-referans.md` (GPT analizi + Claude ön-değerlendirme). Bu belge uygulanan adımları izler.
> Branch `onboarding-b2-gate3` @ `2efd279`. **GPT çekirdek oyun paketi (6-7) tamamlandı.**

## ✅ YAPILDI
1. **Hazır kelime oyunlarını yüzeye çıkar** (`dc1e922`): word-meaning/word-reading/word-cloze → "Gerçek Kullanım" grubu. Test 15/15.
2. **Kanjiyi Oku** (`736cdeb`): kanji okuma (kun/on etiketli; öbür okuma çeldirici; örnek kelime; SRS). Test 27/27.
3. **Kanji Atölyesi** (`f291992`): moat — parçalar → kanjiyi KUR (üretim) → ilişki+hikâye. ptype 'atolye'. Test 28/28.
4. **Kana detay düzeni** kanji'ye hizalandı (`31606be`): çiz butonu üstte ghost, Tanıyorum kırmızı primary.
5. **Kanji Ayırt Etme** (`b1c3a4f`): İnce Farklar kanji minimal-çiftleri (木/本, 日/目, 王/玉, 人/入, 土/士, 大/太, 千/干, 右/石) fark notuyla, anlam üzerinden. Test 38/38.
6. **Hafızadan Çiz** (`2efd279`): gör → gizle → hafızandan çiz → doğru çizince kılavuz açılır. Yeni engine 'memdraw', peek/draw fazları; mevcut setupDrill/validateStroke yeniden kullanıldı (guide kvg-hidden=opacity:0, validasyon çalışır). Başarıda SRS + reveal. Kaligrafi cezası yok. Test 13/13. **Gerçek çizim/validasyon cihazda birebir denenmeli.**

## 📌 Zaten var olan / GPT çekirdeğine karşılık gelen
- **Ses Avı** ≈ K1 `kanareview` (ses/romaji → doğru kana). **İnce Farklar** ≈ `confuse` (kana) + yeni `kanji-confuse`. **Katakana Şifreleri** ≈ `katakana-cipher`.
- Böylece GPT'nin çekirdek 6-7 oyunu karşılandı: Ses Avı(K1) · İnce Farklar(confuse+kanji-confuse) · Kelime İçinde(kelime oyunları+Kanjiyi Oku) · Kanji Atölyesi · Hafızadan Çiz · Katakana Şifreleri.

## ⏳ KALAN (Faz O — ikincil/iyileştirme)
1. **Ses Avı'nı genişlet** — "kelimeyi duy → eksik kanayı yerleştir" (küçük っ, uzun ses, dakuten); opsiyonel süre (can kaybı YOK, otomatikleşme odaklı).
2. **Mahjong/hafıza eşleştirmeyi dönüştür** — rastgele değil SRS-zayıflarından kart; ses-kana / hiragana-katakana eşleme; yanlışta farkı göster. (Ana oyun olmasın.)
3. **Çok boyutlu ölçme** (GPT'nin en önemli notu) — SRS kaydını boyut-bazlı (recognize/produce/read/write/discriminate) genişlet. SRS çekirdeğinin korunan invariantları var, dikkatli. En büyük altyapı işi; oyun önerilerini akıllandırır.
4. **MC "ustalık" saymasın** — çoktan-seçmeli tek doğru mastery yükseltmesin; üretim/ayrım/gecikmeli tekrar ağırlık taşısın (çok boyutlu ölçmeyle birlikte).

## Not
- `comp-select`/atölye'de bazı bileşenler "parça" fallback → içerik denetimindeki 14 eksik bileşen (DATA'da yok). Atlas bütünlük maddesiyle çözülür.
- Bekleyen içerik: Faz İ'nin 6 karar-gerektiren maddesi (Zeynep onayı).
