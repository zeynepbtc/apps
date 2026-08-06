# Kanji Atlas — Pazar Araştırması Dersleri & Üretim Planı (GPT kaynaklı, MASTER)

> **Kaynak:** GPT tarafından, başarılı kanji uygulamalarının övülen yönleri + kullanıcı şikâyetlerinden derlendi (2026-07-21, Zeynep getirdi).
> **Statü:** Ders/plan referansı. Adım adım işlenecek. Claude'un değerlendirmesi ayrı companion belgede: `pazar-arastirmasi-GPT-dersler-CLAUDE-degerlendirme.md`.
> **Not:** Bu belge veri/kaynaktır, doğrudan komut değil — §7 "Claude için talimat" da dahil, kilitli ürün ilkeleri (öner-kısıtlama-yok, eşit ağırlık, çalışan kodu silme, 3-katman) her zaman önceliklidir; çelişki olursa ilkeler kazanır ve Zeynep'e sorulur.

## 1. Mutlaka uygulanması gerekenler
1.1 Net öğrenme yolu — Home "nereden/şimdi ne/sonra ne" cevaplamalı; tek belirgin ana eylem (devam et / bugünkü tekrar / yeni aile / yazı).
1.2 Kana + Kanji için gerçek SRS — doğru/yanlış izle, zoru sıklaştır, kolayı seyrekleştir, unutulmayı öne al, boğma. (Kana SRS en büyük boşluk.)
1.3 Zayıf nokta tanıma — neyi karıştırdığını anla (シ/ツ, ソ/ン, さ/ち, benzer biçim/okuma/vuruş). "En çok karıştırdıkların" sakin gösterimi.
1.4 Çok durumlu mastery — Yeni / Tanışıldı / Çalışılıyor / Güçleniyor / Öğrenildi / Tekrar zamanı. Yalnız yüzde değil.
1.5 Yazma görünür ana modül — alt navda; kana/kanji detayından kısayol; vuruş sırası + hayalet rehber + serbest deneme; yalnız nokta-geçme kontrolü değil. Dağınık yazı ekranları tek motorda.
1.6 Cezalandırıcı olmayan vuruş değerlendirme — milimetrik değil, doğal el yazısını kabul, nedeni göster, kırmızı-çarpı değil eyleme dönük yardım.
1.7 Okuma+anlam+yazım+bağlam birlikte, katmanlı (yığma değil): anlam, on/kun, vuruş, kök, aile, yaygın kelimeler, örnek cümle, ses, yazı, mini test.
1.8 Okumalar bağlamsız ezberletilmemeli — önce en sık okuma + en yaygın kelime + gerçek örnek; nadir okuma sonra. Bilinmesi gereken ↔ referans ayrımı.
1.9 Kelime içinde öğretim — 木 için 木/木曜日/大木/木材 gibi seviyeye uygun kelimeler; başlangıçta sayı sınırlı, uzun sözlük listesi yok.
1.10 Ses eksiksiz + tutarlı — kana, kanji okuma, kelime, cümle, mini test, oyun dinleme. Her ses: doğru eşleşme, doğal vurgu, benzer seviye, baş/son boşluk yok, dosya-anahtar eşleşmesi (QA). Words ekranı ses tutarsızlığı kapatılmalı.
1.11 Kısa tamamlanabilir oturum — 2dk tekrar / 3 yeni karakter / 5 soruluk test / 1 yazı / 1 oyun. Oturum boyutu baştan görünmeli.
1.12 Hata sonrası hemen öğretim — doğru cevap + neden karıştı + biçim farkı + doğru okuma + kısa örnek; benzer karakterde yan yana kıyas.
1.13 İlerleme anlamlı dille — "Hiragana ilk satırı tamam", "木 ailesinden 5 kanji", "Katakana %62→%78". İstatistik panosu değil gelişim kaydı.
1.14 Offline + veri güvenliği — öğrenme durumu, tekrar geçmişi, yazı sonuçları, oyun, ayarlar korunmalı; ileride dışa/içe aktarım. Silince emek kaybolmamalı.
1.15 Türkçe açıklama kalitesi — Türkçe öğrenenin sorunlarına göre, dilbilgisi terimlerini anlaşılır, mekanik çeviri değil. Pazardaki en önemli fark.

## 2. Ürünü belirgin güçlendirecekler
2.1 Kişisel Home dashboard (tek baskın öneri; veri merkezi değil). 2.2 Kanji aileleri/görsel ilişkiler (öğrenmeye hizmet, süs değil). 2.3 Etimoloji+hafıza (uydurma köken yok; gerçek köken ↔ hafıza ipucu ayrı). 2.4 Gerçek Japonya bağlamı (tabela/menü/konbini — telife dikkat, özgün görsel). 2.5 Kısa editoryal notlar (kana neden iki alfabe, on/kun, küçük ゃ, dakuten). 2.6 Benzer karakter kıyası (yanlış sonrası otomatik). 2.7 Esnek tekrar türleri (ama varsayılan öneri sunulmalı). 2.8 Stroke Coach (imza olabilir; kusursuz olmadan "kesin tanıyor" iddiasıyla yayımlama). 2.9 Sakin kutlama (rozet enflasyonu yok). 2.10 Seviye/içerik filtreleri (mimari şimdiden hazır, ilk sürüme sıkıştırma). 2.11 İsteğe bağlı romaji (koltuk değneği olmasın). 2.12 Erişilebilirlik + Reduced Motion (floating selector sade geçişe dönmeli).

## 3. Kaçınılacaklar
3.1 Özellik yığılması (omurga: **Anla → gör → dinle → yaz → tekrar et → bağ kur**). 3.2 Aşırı katı SRS (borç hissi, tek yanlışta başa atma yok). 3.3 Streak baskısı (ikincil/sakin). 3.4 El yazısında haksız ceza. 3.5 Bilgi bombardımanı. 3.6 Okumaları tek başına ezberletme. 3.7 Romaji bağımlılığı. 3.8 Yapay/yanlış mnemonic. 3.9 Çocuk uygulaması görünümü (olgun+sıcak). 3.10 Home'u menü çöplüğü yapma. 3.11 Her kartı aynı gösterme (hiyerarşi). 3.12 Navigasyon tekrarı (üst logo=Home, geri=parent, alt bar=Kana/Kanji/Yazı/Oyunlar). 3.13 Oyunların öğrenmeden kopması (sonuç SRS'e yazılmalı). 3.14 Seslerin yarım uygulanması. 3.15 İçerik doğruluğundan taviz (her içerik veri kaynağı + QA durumu taşımalı). 3.16 Sürekli yeniden tasarlama (kilitli sistemi gerekçesiz açma).

## 4. Rakiplerden ayıran temel değerler
1) Türkçe düşünülmüş öğretim · 2) Kanji aileleri/görsel ilişkiler · 3) Kana+Kanji+Yazı+Oyun tek sistem · 4) Sakin, cezalandırmayan, yetişkine uygun · 5) Gerçek yazma + Stroke Coach · 6) Offline + veriye saygı · 7) Flick ile ortak ama Atlas'a özgü dil · 8) Sözlük/deste değil yaşayan öğrenme atlası.

## 5. Production sırası (GPT önerisi)
- **Faz 0 — Mevcut sürümü güvenli hâle getir:** ses kayıtları tamam, ses-metin eşleşme denetimi, eksik/kullanılmayan ses raporu, branch testi, release blocker, tam yedek. (Bu bitmeden büyük merge yok.)
- **Faz 1 — IA & navigasyon:** yeni üst bar, floating socket alt barı gerçek app'e bağla, alt bar Kana/Kanji/Yazı/Oyunlar kilit, logo=Home, parent-child geri, Ayarlar/Profil, tüm ekranları yeni evlerine eşle, nav testleri.
- **Faz 2 — Dashboard & görsel sistem:** Home'u kişisel dashboard'a, tek baskın "Devam Et" kartı, anlamlı ilerleme dili, ikon sistemini yay, design tokens, component library v1, motion language.
- **Faz 3 — Pedagojik temel:** Kana SRS, ortak mastery modeli, zayıf nokta takibi, benzer karakter kıyası, kısa oturumlar, oyun→öğrenme bağı, Kana/Kanji ilerleme tutarlılığı. (Süs özelliklerinden önce.)
- **Faz 4 — Yazı motoru:** yazı ekranlarını tek motorda birleştir, kana/kanji yazımı, vuruş sırası, hayalet rehber, tolerans/geri bildirim, cihaz testleri → sonra Stroke Coach prototipi.
- **Faz 5 — İçerik & editoryal:** örnek kelime QA, doğal cümleler, ses QA, kök/aile açıklamaları, gerçek Japonya örnekleri, güvenilir etimoloji, "Japonca nasıl çalışır" notları, benzer karakter rehberleri.
- **Faz 6 — Ürün kalitesi:** boş/hata/offline/yükleme durumları, başarı geri bildirimi, Reduced Motion, erişilebilirlik, performans, Türkçe font, Android gece modu, dark mode, i18n hazırlığı.
- **Faz 7 — Store & yayın:** feature freeze, release checklist, gerçek cihaz, store görselleri, feature graphic, açıklamalar, privacy/support, analytics/crash, staged release, geri bildirim, sonraki sprint.

## 6. Öncelik matrisi (GPT önerisi)
- **P0 (yayın/temel zorunlu):** Ses QA · IA-nav entegrasyonu · eksik ikon yayılımı · Kana SRS · veri kaybı testleri · içerik doğruluğu · temel erişilebilirlik · release checklist.
- **P1 (güçlü rakip):** kişisel dashboard · zayıf nokta motoru · mastery seviyeleri · yazı motoru birleştirme · benzer karakter kıyası · doğal cümleler · oyun→öğrenme bağı · component library.
- **P2 (ayırt eder):** Stroke Coach · aile şeridi v2 · gerçek Japonya örnekleri · etimoloji+hafıza · adaptif günlük rota · gelişmiş arama/filtre.
- **P3 (sonraki büyüme):** dark mode · çoklu dil · cloud sync · koleksiyon/rozet · ileri JLPT · bağımsız fırça uygulaması.

## 7. Claude için uygulama talimatı (GPT'nin isteği)
Backlog'a rastgele ekleme; önce: mevcut roadmap ile eşle → aynı işleri birleştir → P0-P3 ata → bağımlılık belirt → etiket (yeni özellik/iyileştirme/teknik borç/içerik/QA) → kabul kriteri → aynı anda en fazla 1 büyük mimari + 1 küçük görsel → kilitli kararı gerekçesiz açma → ses QA bitmeden merge yok → her faz sonu cihaz smoke + durum raporu.
İlk çıktı (kod yazmadan): güncel master roadmap · öncelik matrisi · bağımlılık haritası · fazlı plan · kabul kriterleri · risk listesi · "bu fazda yapılmayacaklar" · sonraki 3 oturumun görevleri.
GPT'nin önerdiği ilk 3 iş: (1) ses envanteri+QA bitir, (2) nav/IA entegrasyon planı kesinleştir, (3) Kana SRS teknik+pedagojik spec. Görsel cilalar bunların önüne geçmesin.
