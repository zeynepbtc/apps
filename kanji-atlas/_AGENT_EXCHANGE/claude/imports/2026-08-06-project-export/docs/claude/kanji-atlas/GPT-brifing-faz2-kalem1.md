# ChatGPT'ye Brifing + Denetim İsteği — Kanji Atlas · Faz 2 · Kalem 1
*(Bu belge ChatGPT'ye yapıştırılmak üzere yazıldı — ayrı bağlam, önce tazeleme.)*

## 0. Sen kimsin bu projede
Üç ayaklı ekip: **Zeynep** (ürün sahibi, son karar) · **Claude** (Production Manager: mimari/kod/risk/kalite geçitleri) · **sen/ChatGPT** (bağımsız ürün denetçisi: risk göster, kapsamı daralt, pedagoji/UX/uzun vade). Onaylamak değil, gerektiğinde frenlemek görevin.

## 1. Ürün (tek cümle)
Kanji Atlas: **Japon yazı sistemini — kana'dan kanji ailelerine, bileşenlere, anlam/ses ilişkilerine, gerçek kelimelere ve yazmaya — anlamlandıran uygulama.** Tek dosyalık HTML (~5300 satır), TR arayüz. Flick'ten ayrı: Flick=hız/refleks/klavye; Atlas=anlama/keşif/editoryal sakinlik.

## 2. Kilitli kararlar (senin önceki denetimlerinle şekillendi)
- **Öğrenme döngüsü:** Keşfet→Yapıyı anla→Gerçek kelimede gör→Kademeli yaz→Hatırla→Kullan→Atlas bağlantısını görünür kıl→Tekrar. (Kana uyarlaması ayrı.)
- **6 omurga:** yumuşak Model B grafik (kilit yok, öğrenmeyle evrilir + a11y) · yazma iki-mod (skor kapı değil) · oyun sadeleştirme · **tek kanonik aile verisi** · köken/yapı/hatırlama ayrımı · vitrin aile **木**.
- **Kalem 1 veri-modeli kararları:** relation enum donduruldu (6/10, yeni tür→önce karar günlüğü) · **classification family** (sözlük radikali; "öğrenme üstünlüğü" değil; öneri motoru radikale mahkûm değil) · Reverse Test (aile çıkarınca çökme yok) · 校 (形声, ileri düzey) ve 東 (paleografik) vitrin dışı gerekçeleri.
- Faz disiplini: her faz çıktıya bağlı kapanır; kilitli faz yeniden açılmaz, yeni bulgu **karar günlüğüne** gider.

## 3. Faz 2 kapsamı (yalnız 7 mimari güvenlik kalemi)
kanonik aile verisi · ses manifesti · kana SRS sayaç/review tutarsızlığı · onboarding tercih/sonuç · ölü kod envanteri · 木 yalnız-veriden üretim testi · storage/migration. **Faz 2'de: tasarım yayılmaz, yazma motoru yeniden kurulmaz, tüm N5 üretilmez.**

## 4. ŞU AN — Kalem 1, ilk canlı tüketici bitti (rapor)
Kanonik `FAMILIES` + resolver yazıldı; eski üç kaynağın (ATLAS_FAMILIES/EDGES/parent_components) **4 çelişkisi çözüldü** (森 ebeveyni 林→木; 休 çift-düğüm→tek düğüm+çapraz üyelik; 校/東 dışı). Beş tüketici tek kaynaktan üretilebiliyor (harness kanıtı). Sonra **ilk canlı bağlama: `familyStrip`** (5 tüketiciden biri; kalanlar sırada).

**Okuma sözleşmesi:** kanonik → yoksa legacy fallback → **fallback raporlanır** (`__famStats`). Eski kod silinmedi; geri alınabilir.

**Playwright smoke (6 karakter) — hepsi ✓:** 木(kök,[木林森本休]) · 林(tekrar) · 本(işaret) · 休(classification=İnsan, secondary=Ağaç, "Ana yapı bağlantısı: İnsan · Ayrıca bağlantılı: Ağaç", tek düğüm) · 校(fallback) · 東(木 ailesine düşmedi). İlişki türleri pedagojik dille (tekrar/işaret/birleşim), enum adı değil.

**Kapsam:** kanonik **8/91** kanji · legacy fallback **83/91** (görünür teknik borç). **Regresyon:** kanonik-dışı şerit (夫) eski==yeni birebir; 8 ekran çökmedi; yeni JS exception yok; geri alma baseline'a birebir döner. `faz2-kalem1` dalında; deploy'a merge/kanon güncelleme YOK — denetim bekliyor.

## 5. Senden istediğimiz — SÜREÇ + TEKNİK görüş
1. **Kadans:** Tüketicileri tek tek bağlamak (familyStrip→Detail→grafik→liste→ilerleme, her biri ayrı commit+smoke) doğru mu, yoksa gruplaman gereken yerler var mı?
2. **Fallback kapsamı:** 83/91 fallback şu an "görünür teknik borç" olarak kabul edildi. Faz 3'e (vitrin 木) geçmeden bir **kapsam hedefi/geçidi** koymalı mıyız, yoksa aileler eklendikçe organik düşsün mü?
3. **classification family UX:** "Ana yapı bağlantısı / Ayrıca bağlantılı" geçici ifadesi kullanıcıya yanlış hiyerarşi ima ediyor mu? (Faz 3 tasarımda kesinleşecek — şimdilik risk var mı?)
4. **Tek-dosya resolver riski:** Aile ilişkilerini tek HTML içinde resolver'la üretmek uzun vadede sürdürülebilir mi; kaçırdığımız bir mimari risk var mı?
5. **Faz 2 sıralaması:** Diğer 6 kalem (ses manifesti, kana SRS, onboarding, ölü kod, storage) aile-bağlamayla iç içe mi, yoksa katı sırayla sonra mı gitmeli?
6. **Süreç sağlığı:** Belgeleme/geçit kadansı sürdürülebilir mi, yoksa fazla ağır mı? Kapsam kontrolü işliyor mu?

Kısa, doğrudan, gerektiğinde frenleyen görüşünü bekliyoruz.
