# Kanji İçerik Denetimi — KİLİTLİ YÖNTEM (91 tam tarama)

> Pilot (月男明休時) onaylandı; 91 tam denetime açık. Bu belge, Zeynep'in 7 revizyonuyla kilitlenmiş yöntemdir. Batch'ler bu belgeye göre yürür. **Kod/DATA/CSS/kullanıcı metni bu fazda DEĞİŞMEZ.** Kardeş: pilot raporu, plan-durum, `PARKED-content-governance-regression-SSOT.md`.
> Tarih 2026-07-24 · Branch `onboarding-b2-gate3`.

## Kaynak hiyerarşisi (revize)
1. **Okuma & kullanım → 文化庁 常用漢字表 音訓索引** (bunka.go.jp .../joyokanjisakuin/ ve /seisaku/.../joyokanjihyo_sakuin/). Sayfa kodlaması (Shift-JIS/parçalı) doğrudan çıkarımı engellerse, Jōyō okuma seti **jitenon**'un açık 常用/表外/小学校 etiketleriyle **teyit** edilir. Bu bir ikame değil, resmî setin doğrulanmasıdır — artık "kaynak boşluğu" olarak kaydedilmez.
2. **Anlam / oluşum türü / etimoloji → Kanjipedia** (角川新字源). 5/5 pilotta doğrudan çekilebildi.
3. **Bileşen işlevi çerçevesi → Outlier** (yalnız lens). Wiktionary çapraz kontrol.
Kural: karakter-sayfası URL'si; "kaynak ne diyor" ile "benim çıkarımım" ayrı.

## 7 KİLİTLİ REVİZYON

**R1 — Okuma birincili sabit.** Yukarıdaki #1. 文化庁 音訓索引 birincil; jitenon Jōyō etiketiyle teyit. PDF erişimi artık boşluk değil.

**R2 — Severity, bilginin yanlışlığına değil UI'nin ne İDDİA ETTİĞİNE göre:**
| Durum | Severity |
|---|---|
| Eksik okuma + kart onyomi/kunyomi'yi *tam liste* gibi sunuyor **veya** kartın kendi örneği eksik okumayı kullanıyor (月→一月=ichi**gatsu**; 男→長男) | **P1** |
| Bilinçli N5 kapsam ertelemesi, açıkça kaydedilmiş | **P2** |
| Yanlış bileşen rolü **yalnız kart metninde** kalıyor | **P1** |
| Yanlış bileşen rolü **Atlas ailesi / oyun havuzu / SRS / öğrenme modeline yayılıyor** | **P0** (raporda KANITLANARAK) |
| Yanlış okuma / yanlış anlam / yanlış kelime okuması | **P0** |
P0 iddiası kanıt ister: bileşen `components`/`parent_components`/`related_characters`/oyun havuzunda anlam-bağı olarak kullanılıyorsa P0; değilse P1.

**R3 — mnemonic ≠ etymology "zorla farklı string" kuralı KALDIRILDI.** Doğru kural:
- Etimoloji zaten yeterli hafıza desteği veriyorsa → `mnemonic.basis = "not_required"`.
- Aynı metin iki ayrı bölümde gösterilemez.
- Yapay ikinci hikâye üretilmez.
(休: etimoloji "insan ağaca yaslanır → dinlenmek" yeterli → mnemonic not_required. "Ağacın gölgesinde" süslemesi EKLENMEZ.)

**R4 — Araştırma kaydı ≠ kullanıcı metni (daha keskin ayrım).**
- `formationType`, kaynak ayrılığı, teknik çözümleme → yalnız audit kaydında.
- Kullanıcı metni: N5 düzeyinde **kısa ve doğal.** Teknik terim (形声) ana açıklamaya zorla sokulmaz → rozet ("Anlam + ses karakteri") veya açılır ayrıntı.
- Örnek 時 kullanıcı metni: *"日 anlamla ilgilidir. 寺 ise burada 'tapınak' anlamını taşımaz; ジ sesine ipucu verir."* + rozet.
- Örnek 男: *"田 tarla, 力 ise eski biçiminde bir tarım aracını anlatır. Birlikte tarlada çalışan kişiyi ifade etmiş; zamanla 'erkek' anlamını kazanmıştır."* ("çoğu sözlükte" gibi kaynak-tartışması dili kullanıcıya GİRMEZ, audit'te kalır.)

**R5 — Kaynak söylemiyorsa amaç/neden UYDURMA.** "日 ile karışmaması için" (月), "ağacın gölgesinde" (休) → çıkarım; kaynak beyanı gibi yazılmaz. Çıkarımsa ayrı işaretlenir veya kullanıcı metninden çıkarılır. Dört-katman: (kaynak: hilal/kavisli ay biçimi) ≠ (çıkarım: 日'den görsel ayrışmaya yardımcı olabilir).

**R6 — 8–10 karakterlik batch'ler.** Her batch sonunda: P0/P1 bulguları · kaynak kapsamı · görüş ayrılıkları · action_required dağılımı · önceki batch ile tutarlılık QA'sı. Sonra DUR.

**R7 — Batch sırası (en yüksek eğitim zararı önce):**
- **Batch 1** — yüksek riskli 形声, her parçasına anlam verilmiş: **語 校 晴 話 読 聞 電 何** (時 pilotta bitti). Hepsi 91 setinde doğrulandı.
- **Batch 2** — kart-içi veri çelişkileri (gösterilmeyen ama örnekte kullanılan okuma; on/kun↔romaji; kelime okuması↔karakter okuması).
- **Batch 3** — `pictogram_note ≈ memory_hint_tr` (aynı/neredeyse aynı).
- **Batch 4** — 会意 + 象形 ("modern glif = eski resim" aşırı basitleştirmesi kontrolü).
- **Batch 5** — tartışmalı / tarihsel varyantlı (C/B güven).

## Hedef (kilit)
Kartı daha uzun/akademik yapmak DEĞİL. **Yanlış ilişkileri kaldır, doğru ilişkileri kaynaklı sakla, kullanıcıya yalnız öğrenmesi için gerekeni göster.** Atlas hem daha güvenilir hem daha sade kalmalı.

## Çıktı (her batch)
Batch CSV satırları + P0/P1 bulgular + action_required dağılımı + kaynak kapsamı + tutarlılık QA. Kod değişmez; uygulama ayrı faz (Migration penceresi).
