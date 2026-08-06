# Kanji İçerik Denetimi — KAPANIŞ & MASTER BULGULAR

> 91 kanji denetimi TAMAMLANDI (pilot + Batch 1–4B). Bu belge audit'i kapatır ve **Fix fazına** devir tablosudur. **Kod hâlâ DEĞİŞMEDİ** — uygulama ayrı faz (Migration penceresi). Master CSV: `KANJI-AUDIT-MASTER-BULGULAR.csv`.
> Branch `onboarding-b2-gate3` · HEAD `2efd279` · 2026-07-24.

## 1. Batch 4B sonucu — audit kapanış gerekçesi
Kalan 28 köken'li kanji, bilinen 5 hata kalıbına karşı hafif tarandı (yeni hata aramak değil, kalıp doğrulama):
- **Oyun havuzu 5'i (三林森名買): doğrulandı, hepsi doğru.** 名 özellikle 国-tuzağını temizledi (口 burada gerçekten "ağız"; 会意). 買/三'te yalnız 2 P3 kozmetik.
- 3 havuz-dışı bileşenli (二学見): additif sayı / doğru 会意 → KEEP.
- 20 saf piktogram (山川水火目手口田日木人...): components=[], yanlış parçalama imkânsız, textbook 象形/指事 → KEEP.
**Sonuç: bilinen hata kalıpları kalan kanjilere YAYILMIYOR. Yeni sistematik desen yok → audit kapatıldı.** Hatalar iki yerde yoğunlaşmıştı: 形声 fonetik-rol (Batch 1) ve 象形 yanlış-parçalama/folk (Batch 4A).

## 2. Master bulgular (30 aksiyon: 10 P0 · 10 P1 · 10 P2)

### P0 — Oyun motorunu yanlış eğiten bileşen rolü (REWRITE) — 10
`時 語 校 晴 話 読 聞 何` (形声: fonetik parça 'anlam' gibi, oyunda öğretiliyor) + `大 王` (象形 yanlış parçalama; 大=人+一, 王=一+二+三 oyunda). **Kural: oyunu yanlış eğitiyorsa otomatik P0.**

### P1 — 10
- Gloss/folk: **国** (囗→'ağız'), **玉** (folk 'kralın hazinesi').
- Eksik resmî okuma (örnek onu kullanıyor): **月**ガツ, **九**ク, **四**よ(つ), **足**た(りる), **後**うし(ろ), **生**う(まれる), **話**はなし, **何**なん.

### P2 — 10
- Gösterge çizgisi '一=bir' (köken çoğu doğru): **天 夫 本**.
- Folk etimoloji köken: **季 東**.
- Katman çökmesi (KÖKEN=HATIRLATICI): **32 kanji** → hint `not_required` (7'si P0 rewrite'ta çözülür).
- Eksik okuma (düşük): **人**ニン, **男**ナン, **大**タイ.
- Jukujikun 付表 (okuma EKLEME, etiketle): **大人 明日 今日 お母さん お父さん 上手 下手**.

## 3. Kavramsal kazanımlar (yöntem çıktısı)
- **En değerli tekil bulgu:** 形声 fonetik bileşenin 'anlam' olarak gösterilip **oyun havuzuna yayılması** — kozmetik değil, sistematik yanlış-öğretim. Denetimin var oluş sebebi kanıtlandı.
- **Severity kuralı kilitlendi:** "oyun motorunu yanlış eğitiyor mu? → evetse P0." (Zeynep/GPT.)
- **İki tür iş ayrıldı:** yanlışı düzelt (Fix) ≠ boş içeriği yaz (Authoring).
- Kontrol karakterleri (休 中) doğru korundu → yöntem "her şeyde hata bul"muyor.

## 4. Devir — sıradaki fazlar (audit DIŞI)
1. **FIX fazı** (bu 30 bulguyu uygula): şema v2 (`etymology/structure{role}/mnemonic/readings`) → Migration penceresine biner. P0'lar önce (oyun yanlış eğitimini durdur). **Kod burada değişir.**
2. **AUTHORING fazı** (ayrı iş paketi, audit değil): **44 boş köken** yaz + P0/P1'lerin yeni köken metinleri. Hedef: kısa/sade/N5, teknik terim rozet/açılırda. Bu, kullanıcıya yeni öğrenme değeri üreten iş.
3. Sonra: tasarlanan Kelime Grupları vb. modüller.

## 5. İlke (Zeynep, kapanış)
"Amaç %100 kusursuzluk değil, **yanlış öğretme riski bırakmamak.**" Kalan emek boş kökenler + yeni modüller gibi öğrenme değeri üreten işlere ayrılmalı. Audit bu riski haritaladı; P0'lar kapatılınca ürün "yanlış öğretmiyor" eşiğini geçer.

## 6. Kaynak & maliyet (tüm audit)
Kanjipedia karakter sayfaları birincil, çok güvenilir doğrudan erişildi. 文化庁 音訓索引 kodlaması zaman zaman engelledi → jitenon 常用 etiketleriyle Jōyō seti teyidi (R1). ~25 derin ajan + 2 konsolide ajan; karakter başına low–low-med maliyet. Tüm güven sınıfları A/B (hiç X yayınlanmadı). Tartışmalılar (力 saban/güç, 王 balta, 東 çuval, 明 iki biçim) birincil-kaynak kuralıyla + ihtiyatlı dille çözüldü.
