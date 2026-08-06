# P0-5B — Durum Özeti (5B-5 sonrası)

## İlerleme
- **5B-1** srsRecord v2-uyumlu (merge-gate) ✅ — `45bd2bc`
- **5B-2** Kana review motoru ✅ — `88b85ef`
- **5B-3** mastery yumuşatma + kanaLearned + completion ✅ — `bce5aa9` (cihazda canlı doğrulandı)
- **5B-4** ertelendi ve kapsam dışı
- **5B-5** Entegrasyon regresyon ✅ — `d99e6ae`

## Konsolide regresyon (tümü YEŞİL, ~190 assertion, 0 hata)
storage node **97** · 5B-1 **28** · 5B-2 **9** · 5B-3 **~40** · 5B-5 **18**. node --check + DATA temiz.

## ⚠️ BARINDIRMA — KİLİTLİ KARAR
- **Staging = YALNIZ ayrı origin:** `kanji-atlas-staging.zeynop.workers.dev` (Git auto-deploy, faz2-kalem1).
- **`kanji-atlas-preview` senkronu YAPILMAZ — İPTAL.** `zeynepkaya.app/kanji-atlas-preview/` production ile **aynı origin** olduğundan orada migration çalıştırmak production `kana_state`'ine dokunur. Bu mimari güvenlik nedeniyle tamamen terk edildi; merge planında **preview senkronu YOKTUR.**

## Kalan
1. **Staging gerçek-cihaz kapısı (Zeynep)** — aşağıdaki A-D. Geçmeden **merge YOK**.
2. **P0-5B kapanışı** — A-D geçince.
3. **Merge planı** — ayrı, net onayla. Merge = **`faz2-kalem1` → `main`** (preview senkronu yok). Merge-gate 5B-1'de kapatıldı.

## Staging gerçek-cihaz kapısı (`kanji-atlas-staging.zeynop.workers.dev`)
Otomasyon çok geniş kapsamı geçti; elle yalnız kritik sınırlar:

**A. Gerçek production verisiyle migration**
1. Production `kana_state` değerini kopyala **ve önce ayrı bir metin dosyasına yedekle** (ham güvence; staging ayrı origin olduğundan production'a zarar riski yok ama yedek iyi).
2. Staging origin'de `kana_state` olarak yerleştir → yenile.
3. Kontrol: recovery ekranı **yok**, ilerleme duruyor, notlar (userHints) duruyor, normal ekran açılıyor, console'da validator/storage hatası **yok**.

**B. Migration sonrası yeni yazma**
Migrated state üzerinde: yeni bir kana'yı tanı · yeni bir kelimeyi "biliyorum" · mümkünse bir kanji cevabı → yenile.
Beklenti: recovery yok · işlemler kalıcı · kelime tek eylemi **seen+1, correct+1, mastery tabanı 2** · yeni kayıtların **type** alanları doğru.

**C. Mastery yumuşatma (yüzdeleri AYIRARAK)**
- **mastery 1 → bir yanlış → mastery 1:** "öğrenildi" etiketi **kaybolmaz**; **kana completion yüzdesi (öğrenilmiş adet / kanaPct) DÜŞMEZ**; yalnız **hücre-ink yüzdesi** (masteryScore = mastery+accuracy karışımı) accuracy'den **biraz dipebilir**; `next` yeni mastery 1 aralığına göre oluşur (tekrar erkene gelir).
- **mastery 2 → bir yanlış → mastery 1:** mastery 1'e düşer ama **yine öğrenildi** kabul edilir; tekrar erkene gelir. (Düşüşün tamamen kapatılmadığını kanıtlar.)
- Not: kanji hücresindeki sayı = ink % (masteryScore); kanji "tamamlandı" = mastery 4. Bunlar kana completion'dan farklı — karıştırma.

**D. Reset sınırları**
- İlerlemeyi sıfırla: öğrenme ilerlemesi temizlenir, **userHints KORUNUR**.
- Profili sıfırla: ilerleme **ve** userHints temizlenir.
- Her resetten sonra **bir kez yenile** → yalnız ekranda değil stored state'te de kalıcı olduğunu gör.

A-D geçerse → **P0-5B ✅ KAPALI** → merge planı ayrıca sunulur.

## Merge planı (staging sonrası sunulacak — henüz UYGULANMAZ)
En az: pre-merge `main` commit/tag · merge edilecek kesin commit aralığı (faz2-kalem1) · production deploy doğrulaması · production **fresh-install** smoke · gerçek **mevcut kullanıcı migration** smoke · rollback commit/tag + geri-alma komutu · production verisine müdahale edilmediğinin teyidi. **Ayrı onay olmadan merge uygulanmaz.**
