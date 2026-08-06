# Onboarding Yeniden Tasarım Fazı — Çalışma Planı (KİLİTLİ)

> P0-5 KAPANDI (production, doğrulandı, kilitli çekirdek). Sıradaki faz. **Koddan değil envanterden başlanır**; akış + metin doğruluğu kilitlenmeden ekran-ekran yama yapılmaz.

## R2 bölündü (kapsam kontrolü)
- **R2-A — Onboarding içerik doğruluğu:** yeni akışta kullanılacak TÜM metinler araştırılır, düzeltilir, **uygulamadan ÖNCE kilitlenir.** (Onboarding fazının parçası.)
- **R2-B — Uygulama geneli bilgi kartları:** tüm modüllerdeki açıklama/tanımlar ayrı envanterlenir, içerik-doğruluk fazında tamamlanır. (Onboarding fazı R2-B'nin tamamını BEKLEMEZ.)
- **Kilit:** onboarding'de görünen hiçbir bilgi **doğrulanmadan canlıya taşınmaz.**

## Güncellenmiş yürüyüş (11 adım)
1. Mevcut ekran + karar + state + hedef envanteri (code-free)
2. Tutarsızlık ve gereksiz-yük analizi
3. Koru / kaldır / birleştir — code-free akış önerisi
4. Yeni akışın onayı
5. **Yalnız onboarding metinlerinin** doğruluk denetimi ve kilidi (R2-A)
6. Tipografi / görsel hiyerarşi tasarımı (R3)
7. Uygulama + fixture + staging
8. Uygulama geneli bilgi kartları denetimi (R2-B)
9. Kana–Kanji UI parity (R4)
10. Accessibility / Reduced Motion
11. Final QA + Store varlıkları

## Adım 1 teslimat formatı — her mevcut ekran için tablo (KİLİTLİ)
| Alan | Açıklama |
|---|---|
| Ekran sırası / kimliği | Akıştaki gerçek konum |
| Mevcut metin | Ekrandaki eksiksiz metin |
| Görsel öğeler | Karakter, kart, ikon, animasyon |
| Ekranın amacı | Kullanıcıya ne öğretmeye/yaptırmaya çalışıyor |
| Kullanıcı kararı | Seçim var mı, yalnız devam mı |
| State'e yazılan veri | Seçim nerede/nasıl saklanıyor |
| Sonraki hedef | Buton gerçekte nereye götürüyor |
| Hedefi belirleyen mantık | Sabit hedef mi, `recommendedStart()` mi |
| Sorun | Gereksiz / tekrar / yanlış / okunaksız / tutarsız |
| İlk karar | Koru / kaldır / birleştir / yeniden yaz |
| Not | Henüz çözüm değil; araştırma/karar ihtiyacı |

**`recommendedStart()` ürün karar-ağacı olarak çıkarılır** (yalnız kod değil):
kullanıcı hangi cevabı veriyor → hangi profile/state'e dönüşüyor → hangi öneri üretiliyor → son ekran ne söylüyor → "Başla" nereye gidiyor. **R5'in gerçek kapsamı bu zincir görünür olunca anlaşılır.**

## Kilitli prensipler — yeni onboarding
**YAPMAMALI:** kullanıcının Japonca bildiğini varsaymak · uygulamayı uzun uzun anlatmak · öğrenme tercihlerini gereğinden fazla sorgulamak · seçim yaptırmış gibi gösterip sabit rota vermek · erken aşamada Kanji/Kana terminolojisi yüklemek · "öneri"yi zorunlu rotaya çevirmek · metin/görsel vurgu/gerçek hedef arasında çelişki bırakmak.
**GÖREVİ:** kullanıcıyı uygulamanın mantığını anlayacak kadar hazırlamak ve **ilk anlamlı eyleme güvenle ulaştırmak.** Asıl Kana/Kanji eğitimi uygulamanın kendi öğrenme ekranlarında yapılır — onboarding öğretim modülüne dönüştürülmez.
**İlke uyumu:** öner-kısıtlama-yok · eşit ağırlık · sadeleştirme · zeynep-mobile-product-design (referans: zeynepkaya.app vurgu + Flick "aynı karakter, farklı işlev").

## Sonraki oturumun İLK komutu (yalnız bu)
> "Mevcut onboarding'in tam ekran, karar, state ve hedef envanterini çıkar. Henüz çözüm veya kod önerme."

## Disiplin (P0-5'teki gibi)
Karar → dar kapsam → code-free plan onayı → uygulama → fixture/smoke → staging teyidi → GATE'li release. P0-5 çekirdeği (storage/SRS) yeniden açılmaz.
