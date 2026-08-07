# CODEX PAUSE — CLAUDE DEVAM İŞ AKIŞI

**Durum:** ACTIVE  
**Başlangıç ucu:** `98c1385478d9c83157b8a6ca4b99b29db4342c15`  
**Amaç:** Codex oturumu yenilenirken ilerlemeyi güvenli, küçük ve denetlenebilir tutmak.

## Şimdi kimin sırası?

Claude'un sırası. Yalnız `2026-08-07-TEST-REPAIR-BATCH-F-BROWSER-FAILURE-EVIDENCE.md` sözleşmesini uygular.

## Claude'un çalışma sırası

1. Uzak `codex/kanji-atlas-coordination` dalını getir ve sözleşmede yazan tam tabanı doğrula.
2. Hedef feature dalını oluştur.
3. Ürün/test değişikliğinden önce zorunlu planı yaz ve ayrı commit et.
4. Yalnız sözleşmenin izin verdiği dosyalarda uygula.
5. Negatif fixture'ları, varsayılan 14/14 kapıyı ve temiz-ağaç kanıtını üret.
6. Raporu ve ham kanıtları commit et.
7. Push mümkünse feature dalını push et; değilse SHA-256 doğrulanmış tek bundle üret.
8. Teslim raporunda dur ve Zeynep'e kısa sonuç ver.

## Codex dönene kadar izin verilen ek hazırlık

Batch F tesliminden sonra Claude ürün veya test koduna dokunamaz. Yalnız salt-okunur olarak:

- `EDITORYAL-UYUMLAMA-BEKLEYEN.md` içindeki kalemleri güncel veriyle karşılaştırabilir;
- her kalemi `hala gerekli / zaten çözülmüş / karar gerekiyor` diye sınıflandıran taslak envanter hazırlayabilir;
- önerilen küçük batch sırasını, tahmini dosya kapsamını ve riskleri `_AGENT_EXCHANGE/claude/checkpoints/` altında yazabilir.

Bu hazırlık bir uygulama yetkisi değildir. Metinleri değiştiremez, Content Freeze ilan edemez ve yeni creative/product kararı veremez.

## Kesinlikle yapılmayacaklar

- `main` merge/push, deploy veya landing linki
- editoryal uyumlama uygulaması
- görünürlük politikası veya tartışmalı-köken ürün deseni
- reduced-motion/erişilebilirlik uygulaması
- telefon/tablet responsive değişiklikleri
- Capacitor/native üretimi, imzalama veya mağaza işlemleri
- klasör taşıma, silme, arşiv temizliği
- Codex PASS yerine Claude'un kendi teslimini onaylaması

## Claude tesliminden sonra Zeynep'in yapacağı

Claude'un final raporunu ve bundle/branch bilgisini sakla. Yeni Codex oturumunda şu cümleyle devam et:

> Kanji Atlas koordinasyonunda Codex pause handoff belgesinden devam et. Claude Batch F'yi tamamladı; teslimini bağımsız denetle, sonucu kanonik dala al ve sonra editoryal uyumlama için en küçük güvenli sözleşmeyi hazırla.

## Değişmeyen yayın sırası

Test güvenilirliği → editoryal uyumlama → Content Freeze → QA görünürlük + erişilebilirlik → telefon gerçek cihaz → tablet uyumluluk → native/store hazırlığı → iç test → genel yayın.
