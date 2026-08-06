# Kanji İçerik Denetimi — BATCH 3 RAPORU (katman çökmesi + boş köken)

> 91 kanji deterministik tarandı: KÖKEN (`pictogram_note`) ↔ HATIRLATICI (`memory_hint_tr`) benzerliği (SequenceMatcher, normalize). Web gerekmedi. **Kod DEĞİŞMEDİ.** CSV: `KANJI-CONTENT-AUDIT-BATCH3.csv`. Batch sonunda DURULDU.
> Branch `onboarding-b2-gate3` · HEAD `2efd279` · 2026-07-24 · Yöntem: `KANJI-DENETIM-YONTEM-KILITLI.md`.

## 1. Genel dağılım (91 kanji)
| Durum | Sayı | Anlam |
|---|---|---|
| **Hem köken hem hint BOŞ** | **44** | Kartta "Kökeni" + "Hatırlatıcı" hiç yok — sadece bileşen ağacı görünüyor |
| KÖKEN == HATIRLATICI (birebir) | 19 | Sert katman çökmesi |
| KÖKEN ≈ HATIRLATICI (≥0.60) | 13 | Yumuşak tekrar |
| Distinct (sorun yok) | 15 | Köken ve hint gerçekten farklı |

Yani 91'in **32'sinde katman çökmesi**, **44'ünde köken+hint tamamen eksik**, yalnız 15'i temiz.

## 2. Manşet: 44 kanjide köken+hint YOK (içerik boşluğu, hata değil)
四 五 六 七 八 九 百 千 万 円 金 土 年 分 半 今 気 母 父 友 耳 足 右 左 前 後 西 南 北 白 赤 青 先 生 校 語 行 来 読 書 食 飲 外 何
- Bu bir *yanlış veri* değil, **yazılmamış içerik.** Bu kartlarda köken katmanı boş; 形声 olanlarda (語校読何) yalnızca (Batch 1'de yanlış çıkan) bileşen glossları görünüyor.
- Uygulama fazının gerçeği: kanji düzeltmesi "yanlışı düzelt"in yanında **44 kanjiye sıfırdan köken yazmak** demek. Bu, "her karta uzun akademik metin ekle" DEĞİL — çoğu basit piktogram/sayı için tek kısa cümle yeter (bazıları için köken gösterilmeyebilir de). Kapsam gerçeği olarak kaydedildi.

## 3. Katman çökmesi — 32 kanji (P2)
Fix ilkesi (R3): etimoloji zaten hafızayı taşıyorsa → **`mnemonic.basis = not_required`** (yapay ikinci hikâye ÜRETME; aynı metni iki bölümde gösterme).

**IDENTICAL (19):** 山 十 雨 男 目 手 上 下 中 小 東 名 見 聞 話 買 国 車 電
**NEAR ≥0.60 (13):** 時 林 大 休 日 学 晴 口 夫 天 明 木 本

İki alt-grup:
- **7'si zaten köken-rewrite kuyruğunda** (Batch1/pilot: 聞 話 電 晴 時 明 男). Bunlarda köken yeniden yazılırken hint `not_required` olur — duplikasyon otomatik çözülür.
- **25'inde köken makul görünüyor**, yalnız hint temizliği gerekiyor (hint'i `not_required` yap veya gerçekten değer katan ayrı bir hatırlama-ipucuna dönüştür). NOT: bu 25'in köken *doğruluğu* Batch 4'te (会意+象形) denetlenecek; Batch 3 yalnız duplikasyonu işaretler.

Severity: tümü **P2** (içerik hijyeni; yanlış bilgi değil, tekrar).

## 4. Kavramsal netlik
- Duplikasyon ≠ hata. Köken doğruysa, çözüm hint'i silmek/`not_required` yapmaktır — süsleyerek ikinci bir hikâye uydurmak değil (R3 + 休 kontrol dersi).
- 44 boş = ayrı iş türü: yaratılacak içerik. Düzeltme fazında "yanlışı düzelt" (Batch 1) + "eksiği yaz" (Batch 3 boşlar) + "okuma tamla" (Batch 2) birlikte planlanmalı.

## 5. Karar (batch sonunda DUR)
Batch 3 bitti, kod değişmedi. **32 katman çökmesi (P2)** + **44 boş köken (içerik boşluğu).** Kümülatif tablo büyüyor; şu ana dek: Batch 1 = 7 P0 (形声 yanlış rol, oyuna yayılıyor), Batch 2 = 6 P1 eksik okuma + 7 P2 jukujikun-etiket, Batch 3 = 32 P2 duplikasyon + 44 boş.
Sırada **Batch 4** (会意 + 象形 kanjiler — "modern glif = eski resim" aşırı basitleştirmesi + köken doğruluğu; bu 32 duplikasyonun 25 "makul" köken'inin gerçek denetimi de burada). Bu, en büyük batch (çoğu kanji 会意/象形). Onaylarsan parçalı gideceğim.
