# Kanji İçerik Denetimi — BATCH 2 RAPORU (kart-içi okuma çelişkileri)

> 91 kanji deterministik tarandı; örnek okuması ↔ öğretilen on/kun uyumsuzlukları çıkarıldı, tek konsolide ajanla Jōyō/付表'ye karşı doğrulandı. **Kod/DATA/CSS/metin DEĞİŞMEDİ.** CSV: `KANJI-CONTENT-AUDIT-BATCH2.csv`. Batch sonunda DURULDU.
> Branch `onboarding-b2-gate3` · HEAD `2efd279` · 2026-07-24 · Yöntem: `KANJI-DENETIM-YONTEM-KILITLI.md`.

## 1. Yöntem — deterministik + doğrulama
91 kanjinin her örneğini romanize edip öğretilen on/kun (rendaku/gemination toleranslı) ile karşılaştırdım → **14 çelişki bayrağı** (91'in geri kalanı tutarlı). Tek ajan bu 14'ü 文化庁 常用漢字表 + 付表 + jitenon'a karşı doğruladı. Web maliyeti: 1 ajan (~45k token) — 14 ayrı ajan yerine.

## 2. İki net grup
**M — EKSİK RESMÎ OKUMA** (örnek onu kullanıyor → R2 gereği P1). Düzeltme: kanjiye resmî okumayı ekle.
| Kanji | Örnek | Eksik resmî okuma | App'te var |
|---|---|---|---|
| 月 | 一月 (ichi**gatsu**) | 音 **ガツ** | ゲツ, つき |
| 九 | 九月/九時 (**ku**...) | 音 **ク** | キュウ |
| 四 | 四つ (**yo**ttsu) | 訓 **よ(つ)/よっ(つ)** (sayaç) | シ, よん |
| 足 | 足りる (**ta**riru) | 訓 **た(りる)** ('yetmek') | ソク, あし |
| 後 | 後ろ (**ushiro**) | 訓 **うし(ろ)** | ゴ, あと |
| 生 | 生まれる (**u**mareru) | 訓 **う(まれる)** | セイ, い(きる) |
Ek (örnek çelişkisi değil ama açık eksik, P2): **人 → 音 ニン** (三人/人気 çok yaygın; app yalnız ジン).
Önceki batch'lerden aynı M kalıbı: **男→ナン, 話→はなし, 何→なん.**

**J — DÜZENSİZ/JUKUJIKUN 付表** (veri DOĞRU; kanjiye okuma EKLENMEZ; sadece "düzensiz okuma" etiketi gerekir → P2 öğretim netliği). Ajanın vurgusu: bunları kanji okuması diye eklemek **factual olarak yanlış olur.**
| Kanji | Örnek (付表 kelime) | Düzensiz okuma |
|---|---|---|
| 人 | 大人 | おとな |
| 明 | 明日 | あす/ashita |
| 今 | 今日 | きょう |
| 母 | お母さん | かあさん |
| 父 | お父さん | とうさん |
| 手 | 上手 | じょうず |
| 下 | 下手 | へた |

Dağılım: 7×M, 7×J · Severity 6×P1, 8×P2.

## 3. Tutarlılık QA — ajan hatası yakalandı (önemli)
Ajan "ekstra" bölümünde **iki hata** yaptı: "四 シ'yi öğretmiyor" ve "生 セイ'yi öğretmiyor" dedi. **Yanlış** — DATA'da 四 on=シ, 生 on=セイ *zaten var.* Sebep: prompt'ta ben yalnız kun'ları "app teaches" diye yazınca ajan on'ları eksik sandı. Kodla karşılaştırıp düzelttim. Ders: "app_teaches" alanı ajana tam (on+kun) verilmeli; Batch 3+ promptlarında düzeltilecek. (人→ニン eksiği ise gerçek, doğrulandı.)

## 4. Kavramsal ayrım (kilit)
- **M** = kanjinin GERÇEK Jōyō okuması eksik → ekle (öğreten veri boşluğu).
- **J** = kelimeye özgü düzensiz okuma (付表) → kanjiye okuma ekleme; kelimeyi "düzensiz" etiketle. 明日'nin 付表 baş biçimi あす; ashita aynı kelimenin konuşma dili varyantı.
- Sınır vakası netleşti: **四つ (よっつ)** bir sayaç kun'u, jukujikun DEĞİL (常用 gövdesinde) → M. Aynı şekilde 足りる/後ろ/生まれる düzenli okurigana kun'ları → M.

## 5. Pedagojik yan not (uygulama fazına)
7 jukujikun kelime (大人, 明日, 今日, お母さん, お父さん, 上手, 下手) N5 kartlarında ÖRNEK olarak kullanılıyor — makul (yaygın kelimeler) ama "düzensiz okuma" rozeti şart, yoksa öğrenci on/kun'dan türetmeye çalışıp kafası karışır. Ayrıca 足りる ('yetmek' anlam kümesini açıyor) örnek seçimi N5 için sorgulanabilir.

## 6. Kaynak & maliyet
文化庁 常用漢字表 付表 (hatosan aynası, 文化庁 listesini birebir veriyor) + jitenon 常用/表外 etiketleri. Birincil kısmen ulaşıldı (bunka HTML satırları ayna+jitenon ile okundu). Tüm 13 sınıflandırma doğrulandı, düzeltme yok (四/生 ekstra hataları hariç, onlar zaten kod karşılaştırmasıyla düzeltildi). Maliyet düşük.

## 7. Karar (batch sonunda DUR)
Batch 2 bitti, kod değişmedi. **6 P1 eksik-okuma + 7 P2 jukujikun-etiket.** Kümülatif M listesi (Batch 1-2 + pilot): 月ガツ, 九ク, 四よ(つ), 足た(りる), 後うし(ろ), 生う(まれる), 人ニン, 男ナン, 話はなし, 何なん. Onaylarsan Batch 3'e (`pictogram_note ≈ memory_hint_tr` — katman çökmesi taraması, 91 deterministik) geçerim.
