# AUTHORING BATCH 20 — 九 NİHAİ DURUM KAPISI

**Durum:** APPROVED / UYGULAMAYA HAZIR  
**Sahip:** Claude (plan + doğrulama + kanıt) → Codex (bağımsız denetim)  
**Taban:** `70e1ef25fa66ee3eef00816164ae95f98c38a538`  
**Hedef dal:** `content/authoring-20-kyuu-disposition-2026-08-07`  
**Tarih:** 2026-08-07

## 1. Amaç

Mevcut `九` kaydının açık authoring durumunu kapatmak ve daha önce verilmiş kullanıcı kararını kanonik bir yayın kararı hâline getirmek.

Zeynep'in 2026-07-25 tarihli kararı geçerlidir: tartışmalı şekil iddiasını çıkarıp yarım bir köken metni yayımlamak yerine `九` kullanıcıya kapalı kalacaktır. Bu batch yeni bir köken hikâyesi üretmez ve `九` kaydını `reviewed` yapmaz.

## 2. Başlangıç durumu

- `九`: `etymology.qaStatus = "drafted"`, `confidence = "C"`, `reviewedAt` yok.
- Gizli taslakta dirsek/bükülü kol iddiası ile “sesi nedeniyle” ifadesi bulunuyor.
- `disagreementNote`, Kanjipedia/説文/白川/Wiktionary ayrılığını ve Zeynep'in HOLD kararını koruyor.
- `mnemonic` alanı yok.
- Ürün kapısı drafted kaydı kullanıcıya göstermiyor; Kökeni ve Hafıza kartları oluşmuyor.
- Başlangıç sayımı: 98 toplam, 58 reviewed, 1 drafted (yalnız `九`), 30 legacy, 88 görünür köken; mnemonic 74 `not_required`, 2 `active`, 0 `pending_review`, 22 alansız; CONTENT_HASH `475592a4bd20617e`.

## 3. Zorunlu plan

Ürün dosyasına dokunmadan önce ayrı commit'te şu dosya oluşturulmalıdır:

- `_AGENT_EXCHANGE/claude/plans/2026-08-07-AUTHORING-BATCH-20-KYUU-DISPOSITION-PLAN.md`

Plan tam taban SHA'yı, mevcut `九` kaydının checksum/semantik özetini, izinli yolları, doğrulama sırasını, geri dönüş yöntemini ve teslim kanıtlarını içermelidir.

## 4. Kilitli karar ve kapsam

Bu batch'in sonucu **B / HOLD** olarak kilitlidir:

- `九` `drafted`, confidence C ve kullanıcıya kapalı kalır.
- `reviewedAt` eklenmez.
- `summaryTr`, `sources`, `disagreementNote`, formation alanları veya mnemonic değiştirilmez.
- `index.html`, `_faz2/data_chars.json`, `_faz2/content_manifest.json` ve diğer tüm ürün dosyaları bayt-identik kalır.
- Gizli taslaktaki “sesi nedeniyle” ifadesinin editoryal düzeltilmesi bu batch'te yapılmaz; ayrı editoryal uyumlama batch'ine taşınmış bir borçtur.

`今`, `白`, `南`, diğer karakterler, görünürlük politikası, tartışmalı-köken ürün deseni, editoryal uyumlama, Content Freeze, erişilebilirlik, telefon/tablet, native ve mağaza işleri kapsam dışıdır.

## 5. Doğrulama görevi

Claude yeni teori seçmeden mevcut kanıt zincirini doğrulamalıdır:

1. Kanonik içe aktarılmış raporlardaki Zeynep nihai kararını ve `九` disagreementNote içindeki aynı kararı çapraz kontrol et.
2. Kanjipedia `0001360800`, 説文 açıklaması ve kaydedilmiş karşıt teorilerin ortak bir nesne omurgası oluşturmadığını kaynak matrisinde özetle.
3. “Şekil dokuz nesneyi göstermez” gibi ortak ama tek başına köken anlatısı oluşturmayan bulguyu, kullanıcıya açılma gerekçesi yapma.
4. Kaynakta yalnız anılan, açıkça reddedilen veya ikincil olarak aktarılan görüşleri “destek” diye sayma.
5. Kararın yeni bir araştırma sonucu değil, mevcut kanıtın ve kullanıcı kararının nihai yayın sınıflandırması olduğunu açık yaz.

Canlı kaynak erişimi mümkünse kesin URL, erişim tarihi ve kısa özgün alıntı kaydedilir. Erişim engelliyse içe aktarılmış ham kanıt kullanıldığı açıkça belirtilir; bellekten doğrudan alıntı üretilmez.

## 6. İzin verilen dosyalar

Yalnız:

- `_AGENT_EXCHANGE/claude/plans/2026-08-07-AUTHORING-BATCH-20-KYUU-DISPOSITION-PLAN.md`
- `_AGENT_EXCHANGE/claude/reports/2026-08-07-AUTHORING-BATCH-20-KYUU-DISPOSITION.md`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-07-authoring-20-kyuu-disposition/**`

Ürün, test, paket, ses veya başka belge dosyası değişemez.

## 7. Kanıt ve kabul ölçütleri

1. Başlangıç SHA tam olarak `70e1ef25fa66ee3eef00816164ae95f98c38a538` olmalıdır.
2. Plan ayrı ve ilk commit olmalıdır.
3. Değişen her dosya §6 beyaz listesindedir; ürün dosyası farkı 0'dır.
4. `九` kaydının önce/sonra semantik ve bayt özeti aynıdır.
5. Generator `--check` PASS ve CONTENT_HASH `475592a4bd20617e` kalır.
6. Sayımlar §2 ile birebir aynı kalır.
7. Gerçek Chromium'da `九` Kökeni/Hafıza kartı oluşturmaz; `今`/`白` boş ve kartsız, `南` görünür kalır; pageerror 0'dır.
8. Varsayılan `npm run gates`: 10/10 core + 4/4 browser, exit 0.
9. `git diff --check` temizdir; koşum sonrası çalışma ağacı yalnız izinli teslim dosyalarını gösterir.
10. Rapor `九 = CLOSED / HOLD / hidden drafted` sonucunu açıkça yazar ve bunu Content Freeze öncesi açık authoring işi olmaktan çıkarır.

## 8. Teslim ve durma noktası

Küçük commit sırası: plan; kaynak/karar doğrulama kanıtı; rapor ve koşum kanıtları. Teslim raporu taban/uç SHA, gerçek dosya sayısı/listesi, kaynak erişim durumu, karar izi, komut/sürüm/exit kodları, sayımlar, DOM, temiz-ağaç ve geri dönüş bilgisini içermelidir.

Push engellenirse tek doğrulanmış `.bundle` teslim et. Batch 20 sonunda dur. Codex PASS vermeden editoryal uyumlama veya Content Freeze başlatılamaz.
