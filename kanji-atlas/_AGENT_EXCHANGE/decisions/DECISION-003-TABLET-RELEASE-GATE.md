# Kanji Atlas — Tablet Uyumu Yayın Kapısı

**Durum:** APPROVED  
**Karar sahibi:** Zeynep  
**Tarih:** 2026-08-07

## Karar

Kanji Atlas, App Store ve Google Play'de ilk genel yayına çıktığında telefonların yanında tabletleri de desteklemelidir.

Tablet uyumu sonraki sürüme bırakılan isteğe bağlı bir geliştirme değildir. Telefon deneyimi tamamlanıp gerçek cihazlarda doğrulandıktan sonra ayrı bir tablet uyumluluk kapısı uygulanır. Bu kapı PASS olmadan mağaza yayınına geçilemez.

## Zorunlu sıra

1. Telefon deneyimini tamamla ve gerçek iOS/Android telefonlarda doğrula.
2. iPad ve Android tablet responsive uyumluluğunu uygula.
3. Dikey ve yatay tablet kullanımını gerçek cihaz veya güvenilir emülatörde test et.
4. Tablet kapısı PASS olduktan sonra mağaza varlıkları ve genel yayın kapısına geç.

## Tablet kabul ölçütleri

- iPad ve Android tabletlerde dikey/yatay yerleşim kullanılabilir ve görsel olarak dengelidir.
- İçerik büyük ekranda kontrolsüz biçimde yayılmaz; uygun maksimum genişlik ve boşluk sistemi kullanılır.
- Atlas, karakter ayrıntısı, kana, SRS/tekrar ve oyun akışlarının tamamı erişilebilir kalır.
- Dokunma hedefleri, kaydırma, sürükleme ve yön değiştirme davranışları sorunsuzdur.
- Ekran döndürme veya uygulamanın arka plana alınması ilerleme/oyun durumunu kaybettirmez.
- Safe area, sanal klavye ve sistem çubukları içeriği kapatmaz.
- iPad Split View ve Android çoklu pencere en azından güvenli responsive düzeyde çalışır.
- Metin taşması, kesilme, boş ekran, üst üste binme ve yalnız telefona göre uzatılmış görünüm yoktur.
- Erişilebilirlik ve reduced-motion davranışları tablette de korunur.
- Mağaza için gerekli tablet ekran görüntüleri gerçek yayın yapısından alınır.

## Yayın kapısı

`PHONE EXPERIENCE PASS` → `TABLET COMPATIBILITY PASS` → `STORE ASSETS / INTERNAL TESTING` → `RELEASE`

Telefon PASS olup tablet FAIL/HOLD ise web geliştirmesi sürebilir; fakat App Store ve Google Play genel yayını HOLD kalır.

## Kapsam notu

İlk sürümde tamamen farklı, iki panelli özel tablet arayüzü zorunlu değildir. Profesyonel ve tam kullanılabilir responsive tablet deneyimi zorunludur. Atlas için iki panelli özel geniş-ekran düzeni daha sonra ayrı bir iyileştirme kapısı olarak ele alınabilir.
