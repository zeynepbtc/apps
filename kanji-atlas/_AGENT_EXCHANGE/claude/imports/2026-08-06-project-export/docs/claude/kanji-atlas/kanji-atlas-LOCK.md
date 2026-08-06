# Kanji Atlas — LOCK (Anayasa)

> **Ne bu belge?** Gerçekten **değişmeyen** kararlar — projenin anayasası (10–20 madde). Günlük/operasyonel kararlar buraya değil `kanji-atlas-karar-gunlugu.md`'ye gider. Bir maddeyi değiştirmek = Zeynep + üç-ayak onayı + burada açık revizyon. (GPT önerisi, 2026-07-20: "hangisi anayasa, hangisi tarihçe" ayrımı.)

1. **Vizyon:** Japon yazı sistemini — kana'dan kanji ailelerine, bileşenlere, anlam/ses ilişkilerine, gerçek kelimelere ve yazmaya — **anlamlandıran** uygulama. Bilgi göstermez, anlamlandırır.
2. **Flick sınırı:** Flick = hız/refleks/klavye/oyun; Atlas = anlama/keşif/yapı/editoryal sakinlik. Ortak yalnız `/audio`; ekran/akış paylaşılmaz.
3. **Öğrenme döngüsü:** Keşfet→Yapıyı anla→Gerçek kelimede gör→Kademeli yaz→Hatırla→Kullan→Atlas bağlantısını görünür kıl→Tekrar. (Kana: Duy→Ayırt et→Kademeli yaz→Romajisiz hatırla→Kelimede tanı→Tekrar.)
4. **Ürün ilkeleri:** öner-kısıtlama-yok · Kana/Kanji eşit ağırlık · kişisel veri (userHints) korunur.
5. **Köken / Yapı / Hatırlama ayrımı:** üç alan açıkça etiketli; doğrulanamayan bilgi "köken"e yazılmaz; hatırlama desteği tarihsel gerçek gibi sunulmaz.
6. **Grafik = yumuşak Model B:** tüm düğümler keşfe açık, **kilit/kısıtlama YOK**; görsel durum öğrenmeyle evrilir; liste/aile alternatifi + a11y **zorunlu**. Grafik amaç değil, öğrenmenin görünür sonucu (aynı zamanda keşif + yön bulma).
7. **Yazma iki-mod:** skor **kapı değil, geri bildirim**; kullanıcı başarısız sayılmaz; sahte % ve "geçemedin" yok.
8. **Aile verisi tek kanonik kaynak.** Relation enum **dondurulmuş** (yeni tür → önce karar günlüğü, tavan 10). **classification family = SÖZLÜK sınıflandırması** (radikal); "öğrenme üstünlüğü / gerçek aile" hiyerarşisi DEĞİL. Kullanıcıya asla "ana/daha önemli aile" olarak sunulmaz.
9. **Resolver saflığı:** resolver **yorum üretmez, öğretmez, pedagojik karar vermez** — yalnız veriyi çözer. Özel-durum (`if 校 … if 東 …`) ile ikinci veri tabanına dönüşemez. `FAMILIES` içerik/ses/ilerleme tutmaz (içerik DATA, ses manifest, ilerleme storage).
10. **Tek dosya HTML** (framework/build-step yok). Dosya içinde mantıksal katmanlar görünür.
11. **Mahremiyet:** veri toplamıyor / izlemesiz; metrik yalnız cihazda / opt-in. Otomatik uzaktan analitik yok.
12. **Satın alma:** temel/N5 ücretsiz + ileri paket tek-seferlik (abonelik/reklam/enerji yok).
13. **Kapsam disiplini:** **Vitrin 木 ailesi baştan sona bitmeden yeni aile eklenmez.** Faz sınırları korunur; en büyük risk teknik değil, kapsamın sessizce genişlemesi.
14. **Teknik borç hedefli azaltılır** (organik "ileride düşer" değil): görünür sayaç + faz-başı hedef.
15. **Süreç:** LOCK = anayasa · karar günlüğü = tarihçe · kilitli faz yeniden açılmaz; yeni bulgu günlüğe + sonraki faza.
