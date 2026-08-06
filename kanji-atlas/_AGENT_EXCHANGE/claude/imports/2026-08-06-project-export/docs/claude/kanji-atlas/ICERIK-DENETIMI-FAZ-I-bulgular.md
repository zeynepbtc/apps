# İçerik Doğruluğu Denetimi — Faz İ · Bulgular

> Kapsam: `const DATA` — 91 kanji (83 N5 + 8 aile üyesi), 7 radikal, hiragana/katakana tabloları, 78 N5 kelime, 9 karışan çift.
> Yöntem: (1) deterministik iç-tutarlılık script'i, (2) 3 bağımsız kanji denetim ajanı + 1 kelime + 1 kana ajanı, (3) her işaretlenen bulgunun elle veriden doğrulanması.

## GENEL SONUÇ
**Veri son derece temiz.** Yanlış okuma (onyomi/kunyomi/romaji) YOK, yanlış çekirdek anlam YOK, kana romaji tabloları TEMİZ, 78 kelime TEMİZ. Kod sağlamdı, veri de beklenenden sağlam çıktı. Sadece 2 net olgusal düzeltme + birkaç yargı-gerektiren/iyileştirme noktası var.

## ✅ UYGULANDI (net olgusal düzeltme)
1. **先 [saki]** · anlam_tr `"önce / öğretmen"` → **`"önce / ön"`**. 先 tek başına "öğretmen" DEĞİL; öğretmen = 先生 (bileşik, örnekte zaten var). en alanı da yalnız "ahead / previous" diyordu. Yanlış olgu öğretiyordu.
2. **玉 [tama]** · örnek 目玉/medama `"göz bebeği"` → **`"göz küresi"`**. 目玉 = eyeball (göz küresi); "göz bebeği" = pupil (瞳). Çeviri hassasiyeti.

## ⏳ KARAR BEKLİYOR (yargı/pedagoji — Zeynep onayı)
1. **国 [kuni]** · bileşen `口 玉` — dıştaki gerçek eleman 口 (ağız) değil **囗** (kunigamae / çevre radikali). Köken metni ("kutu içinde değerli olan") zaten 囗'yi kastediyor. Ayrıştırma-öğreten bir uygulamada 口≠囗 anlamlı. **Öneri:** bileşen → `囗 玉`. (Görsel neredeyse aynı; 囗 N5 kanji değil.)
2. **王 [ou]** · bileşen `一 二 三` — 王 gerçekte 一+二+三'ten oluşmaz (üç yatay + bir dikey). Köken notu (gök-yer-insan üç çizgi) geleneksel yorum; ama bileşen olarak 一二三 listelemek yanıltıcı. **Öneri:** bileşeni boşalt ya da "üç yatay çizgi" olarak anlat; köken notunu "geleneksel yorum" diye işaretle. (王 non-N5 aile üyesi, düşük görünürlük.)
3. **大 / 小** · kategori `Yön ve konum` — büyük/küçük birer boyut, yön/konum değil. Aynı grupta 上下中右左前後 (gerçek konum) var. **Öneri:** ya "boyut" mikro-kategorisi, ya da olduğu gibi bırak (ayrı kategori maliyeti). Olgusal hata değil, taksonomik tutarsızlık.
4. **月 [tsuki]** · onyomi yalnız `ゲツ` ama örnek 一月/ichigatsu **ガツ** okumasını kullanıyor (kartta listelenmeyen okuma). **Öneri:** onyomi'ye ガツ ekle ya da örneği değiştir. (Benzer hafif durum: 大人/otona 大 kartında jukujikun.)
5. **気 [ki3]** · tr `"hava / ruh hâli"` — 気'nin çekirdeği ruh/enerji/his; "hava" ikincil (天気 üzerinden). tr/en sırası da ters (en: "spirit / air"). Kategori Doğa zayıf ama savunulabilir (天気). **Öneri:** tr → "ruh hâli / enerji / hava" (sıra düzelt). Kozmetik.

## 🔧 BÜTÜNLÜK BOŞLUĞU (atlas grafiği — içerik hatası değil)
Ayrıştırmada geçen şu bileşenler DATA'da tanımlı DEĞİL, dolayısıyla Atlas aile grafiği onları düğüm olarak bağlayamıyor: **寺 禾 力 交 夕 儿 門 売 舌 貝 卜 可 电 网** (+ related: 太 好; 見 için 目 component_meaning eksik). **Öneri:** bunları radikal/bileşen kaydı olarak DATA'ya eklemek Atlas'ın "aile" bağlarını tamamlar — ayrı, orta boy bir iş (Atlas derinleşmesi).

## 📝 DÜŞÜK (stil/tutarlılık — kelimeler)
- 金曜日 · romaji `kinyoubi` → ヘボn netliği için `kin'youbi` (ん + よ sınırı). Okunuş doğru.
- パン / ミルク · reading_kana hiragana yazılmış (ぱん / みるく) — katakana kelime; biçim tutarsızlığı, fonetik doğru.

## Durum
2 net düzeltme uygulandı (DATA parse OK, smoke 23/23). Kalan maddeler Zeynep onayına sunuldu.
