# Kanji Atlas — CHANGELOG

> Sürüm & karar mikro-notları. En yeni en üstte. Sürüm gerçeği: `japonca-yazi-atlasi.html`.

## 2026-07-21 — Faz 2 · Ses fazı %100 NATIVE + kelime bağlamı + roadmap birleşimi
- **🎉 UYGULAMA %100 NATIVE SES:** A/B/C/D/E (kayıt) + F/G/H (kapanış turu) işlendi. **604/604 ses isteği kayıtlı dosyaya çözülüyor — 0 TTS, 0 eksik dosya.** Manifest 604 kayıt, hepsi recorded + kaynak "yeni". Ses↔metin denetimi kusursuz (0 eksik/kullanılmayan/yinelenen). 58 örnek kelime okunuş-eşleşmesiyle mevcut kayıttan reuse edildi (sıfır kayıt). F=83 kanji örnek, G=73 kana örnek, H=74 cümle (audio/sentence/). Dosya adı riski sanitize (sen'en→senen, boşluk→_).
- **Ses fazı kapanış — kalan:** gerçek cihaz smoke (Zeynep telefon QA) → sonra `dogrulanmali:true→false` + `AUDIO_MODE="release"` → son yedek snapshot → faz2-kalem1→main merge. (Şu an tüm kayıt `dogrulanmali:true` = dev'de çalar, release'de QA onayı gerekir.)
- **Kelime bağlamı (pazar araştırması #1 dersi):** örneksiz 62 kanjiye 156 çeşitlendirilmiş N5 örnek; kanji örnek kapsamı **29/91 → 91/91**. Native-düzey doğrulama: 1 düzeltme (目玉→göz yuvarı).
- **Pazar araştırması dersleri birleştirildi:** GPT belgesi + Claude değerlendirmesi + birleşik üretim roadmap'i projeye kaydedildi (`pazar-arastirmasi-GPT-dersler-MASTER.md`, `...-CLAUDE-degerlendirme.md`, `kanji-atlas-URETIM-ROADMAP-birlesik.md`). **Kilitler:** D1 (Home öneri şeridi + eşit kalıcı kartlar) · D3 (ekranda Yeni/Çalışılıyor/Öğrenildi) · üretim sırası (ses→IA/nav→mastery modeli→Kana SRS). Yeni planlama belgesi üretilmeyecek; roadmap üzerinde yürütülecek.

## 2026-07-20 — Faz 2 · Kalem 1 · İLK CANLI TÜKETİCİ (familyStrip)
- **`familyStrip` kanonik-öncelikli** bağlandı (`faz2-kalem1` dalı, `kanji-atlas/index.html`): kanonik `FR.familyStripData` → yoksa `legacyFamilyStrip` (fallback `__famStats` ile raporlanır). Eski `parent_components`/`kanjiFamily` **silinmedi**.
- **Playwright smoke (6 karakter) geçti:** 木/林/本 kanonik; 休 classification=İnsan + secondary=Ağaç (tek düğüm); 校 fallback; 東 ağaç ailesine düşmedi. İlişki türleri pedagojik dille (tekrar/işaret/birleşim/biçim/uzantı).
- **Regresyon temiz:** kanonik-dışı şerit (夫) eski==yeni birebir; 8 ekran çökmedi; yeni JS exception yok; geri alma baseline'a birebir döner.
- **Kapsam:** 8/91 kanji kanonik, 83 legacy fallback (görünür teknik borç). Deploy'a merge/proje-doc kanon **güncellenmedi** — yeniden denetim bekliyor. Sonuç: `faz2-kalem1-canli-familystrip-sonuc.md`.

## 2026-07-20 — Faz 2 · Kalem 1 · veri sözleşmesi (commit 1-3)
- **Kanonik `FAMILIES` + çözümleyici** (dal `faz2-kalem1`). FAMILIES yalnız aile ilişkileri; içerik DATA'da, ses manifestte, ilerleme storage'da.
- **Parite:** 木 ailesinde eski üç kaynağın 4 çelişkisi çözüldü (森 ebeveyni, 休 çift-düğüm, 校, 東). Beş tüketici tek kaynaktan.
- **Geçitler:** enum donduruldu (6/10) · classification/secondary family · Reverse Test · validator · stres testi. 校/東 gerekçeleri düzeltildi. Smoke: 0 başarısız.

## 2026-07-20 — Üretim Push başladı · Faz 0-1
- Push planı kilitlendi (3 ayak). Faz 1 denetimi (38 yüzey) kapatıldı/kilitlendi; 6 omurga kararı + karar günlüğü.
- **Kaynak:** Atlas GitHub'da yoktu (yalnız Drive 30 May, 5299 satır). `kanji-atlas-seed` dalıyla tohumlandı. Proje `japonca-yazi-atlasi.html` yolundaki Baito karışıklığı (baito-A1-engine ile aynı → kayıp yok) gerçek Atlas'la değiştirildi.

## 2026-07-17
- Studio Board kuruldu; üretim hattına oturtuldu (geç üretim / derinleşme; 10🟢·12🟡·2⚪).

## Retro özet (CANON §5 aşamalar)
- **Cila:** kategori düzeltmeleri (木火水土→Doğa, 金→Günlük); öneri satırı ilerlemiş kullanıcıda gizli; onboarding 10→8 adım.
- **10-D v1:** Aile Şeridi (paylaşılan köke göre tıklanabilir aile). **10-C:** kullanıcının kendi hatırlatıcısı (ilerleme sıfırlamada korunur).
- **11:** Home bilgi hiyerarşisiyle yeniden kuruldu; öneri sistemi (öner-kısıtlama yok); ilerleme bug fix.
- **10-A/B:** Atlas 3-katmanlı içerik (45 kanji "neden böyle"); katı 3-katman modeli.
- **8-9:** Kana/Kanji Nedir; Katakana Şifreleri + stabilizasyon.
- **7:** Onboarding akışı; Home; açıklayıcılar. **5-6:** Çizim sistemi; Kana Okulu.
