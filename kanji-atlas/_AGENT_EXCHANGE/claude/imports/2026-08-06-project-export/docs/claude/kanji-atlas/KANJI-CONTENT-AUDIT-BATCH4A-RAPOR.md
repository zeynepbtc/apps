# Kanji İçerik Denetimi — BATCH 4A RAPORU (yüksek riskli 会意/象形/指事)

> Karakterler: 大 王 天 夫 本 国 玉 東 中 季. Kanjipedia birincil + okjiten/jitenon çapraz. **Kod DEĞİŞMEDİ.** CSV: `KANJI-CONTENT-AUDIT-BATCH4A.csv`. Batch sonunda DURULDU.
> Branch `onboarding-b2-gate3` · HEAD `2efd279` · 2026-07-24 · Yöntem: `KANJI-DENETIM-YONTEM-KILITLI.md`.

## 1. Üç sistematik kalıp (91'e ders)
1. **象形'i yanlış parçalama** (tek piktogramı 会意 gibi gösterme): **大** (人+一), **王** (一+二+三 — saçma), **玉** (王+nokta). 大/王 oyun havuzunda → **P0** (Batch 1'deki aynı propagasyon).
2. **Gösterge çizgisini "一=bir" sanma** (指事): **天**, **夫**, **本** — konumsal/gösterge çizgisi sayı "bir" diye etiketli. Köken metinleri çoğu doğru; hata izole `component_meanings` glossunda. Genelde P2.
3. **Folk etimoloji** köken'de: **王** (gök/insan/yer → gerçek: balta), **玉** (kralın hazinesi → yeşim boncuk), **東** (ağaç ardında güneş → çuval + ses ödünçlemesi), **季** (hasat döngüsü → 禾=稚 'genç' + 子 → en küçük çocuk → mevsim). Folk hikaye, etiketli hatırlatıcıya inebilir; köken bilimsel olmalı.

Ayrıca **囗 vs 口** karışması: **国** dış parçası 囗 (sınır) iken 口 (ağız) diye etiketli — köken doğru, gloss yanlış, oyuna yayılıyor.

## 2. Sonuç tablosu
| Kanji | Formasyon | Verdict | Severity | Öz |
|---|---|---|---|---|
| 大 | 象形 | REWRITE | **P0** | 人+一 yanlış parçalama, oyuna yayılıyor; 一 sayı değil |
| 王 | 象形 (balta) | REWRITE | **P0** | 一+二+三 saçma + folk gök/insan/yer; oyuna yayılıyor |
| 国 | 会意形声 | REWRITE-kısmi | P1 | 囗→口(ağız) yanlış etiket; köken doğru |
| 玉 | 象形 | REWRITE | P1 | folk "kralın hazinesi"; gerçek yeşim boncuk |
| 天 | 指事 | KEEP+minor | P2 | 一=bir gösterge çizgisi; köken doğru |
| 夫 | 象形 | KEEP+minor | P2 | 一=saç tokası; köken "üstünde" → 天 ile karışıyor |
| 本 | 指事 | KEEP+minor | P2 | 一=kök işareti; köken zaten doğru |
| 季 | 会意形声 | REWRITE | P2 | folk "hasat"; gerçek 禾=稚(genç)+子→en küçük→mevsim |
| 東 | 象形+借用 | REWRITE | P2 | folk "ağaç+güneş"; gerçek çuval+ödünç |
| 中 | 指事 | KEEP | P3 | köken doğru (kontrol karakteri gibi korundu) |

Dağılım: 2×P0, 2×P1, 5×P2, 1×P3 · Action 5×REWRITE +1 kısmi, 3×KEEP+minor, 1×KEEP · Güven **10×A**.

## 3. Kontrol davranışı korundu
**中** doğru çıktı, gereksiz yere yeniden yazılmadı (KEEP/P3) — yalnız köken=hint tekrarı. Ayrıca 天/本'de köken metinleri DOĞRU olduğu tespit edildi; sadece izole gloss düzeltiliyor, köken'e dokunulmuyor. Yöntem "her şeyde hata bul"muyor.

## 4. Ek bulgular
- **大 → タイ okuması eksik** (大変 taihen, 大切 taisetsu çok yaygın). Kümülatif M (eksik okuma) listesine eklendi.
- **一=bir kalıbı yayılabilir:** 三 (comps [一,二]) oyun havuzunda "一+二=三" gösteriyor — aynı şüpheli parçalama; light pass'te kontrol edilecek.
- Kanjipedia URL'lerinde ilk-tahmin ID hataları oldu (arama ile düzeltildi) — küçük maliyet, doğruluğa etki yok.

## 5. Kümülatif durum
- Batch 1: 7 P0 (形声 yanlış rol) · Batch 4A: **+2 P0 (大王)** → toplam **9 P0**
- Batch 2: 6 P1 eksik okuma + 7 P2 jukujikun · Batch 4A: +2 P1 (国玉) + 5 P2 + 1 P3
- Batch 3: 32 P2 duplikasyon + 44 boş köken
- Kümülatif M (eksik okuma): 月ガツ 九ク 四よ(つ) 足た(りる) 後うし(ろ) 生う(まれる) 人ニン 男ナン 話はなし 何なん **+ 大タイ**

## 6. Kalan iş & Batch 4B önerisi (hafif)
Kalan denetlenmemiş: ~30 kanji.
- **Oyun havuzu kalanı (6, orta öncelik):** 三 林 森 名 買 外 — bileşik iddia, kontrol edilmeli (林森 muhtemelen temiz 会意; 三 şüpheli).
- **Temiz tek-parça 象形 (köken'li ~19):** 一 二 人 木 日 子 女 水 火 山 川 口 田 十 雨 目 手 上 下 小 車 — köken açıklamaları büyük olasılıkla doğru; **hafif toplu doğrulama** (1-2 ajan, aşırı basitleştirme/gizli hata taraması).
- **40 boş köken:** hata yok (yazılmamış içerik) — formasyon teyidi uygulama fazına.
Öneri: Batch 4B'yi **hafif konsolide geçiş** yap (6 oyun-havuzu + 19 象形 tek ajan-grubuyla), 10 derin ajan yerine. Onaylarsan öyle ilerlerim.
