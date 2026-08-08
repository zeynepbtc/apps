# Kanji Atlas — Resmî Okuma Kümeleri Eksiksizlik Denetimi (RAPOR)

**Durum:** TAMAMLANDI — salt-okunur ölçüm · commit YOK · Codex bağımsız denetimi bekleniyor  
**Sözleşme:** `_AGENT_EXCHANGE/codex/specs/2026-08-08-READINGS-OFFICIAL-COMPLETENESS-AUDIT.md`  
**Taban / dal:** `6e0afc0c76cd4bf17cf39958d7dbd65b6ce8c3be` · `onboarding-b2-gate3`  
**Yetki:** DECISION-004 v3 · **Birincil kaynak:** 文化庁 常用漢字表（平成22年内閣告示第2号）PDF

> Bu tur hiçbir ürün/veri/test/karar dosyasını değiştirmedi. Üç ürün dosyasının başlangıç=son SHA-256 değerleri eşit; ürün/test diff'i sıfır (bkz. §Kanıt). Yalnız §4 rapor/kanıt yolları eklendi.

## Kaynak ve yöntem

- **PDF:** `joyokanjihyo_20101130.pdf` · SHA-256 `d9f28aeb4ce8250dbde07de20ac66cca71805ba09d94e4942c752dffa84d8d42` · 3.551.021 bayt · 164 sayfa · indirme 2026-08-08T06:18:22Z (provenans: `source-pages.txt`).
- **Konum kararı:** 3.5MB ikili PDF, §6.8 'yalnız §4 yolları' sınırını korumak için git ağacına konmadı (scratchpad'de); URL+SHA-256 ile Codex birebir yeniden indirip doğrulayabilir.
- **Çıkarım:** 本表 düzeni sabittir — sütun1 (x≈66, 18pt) başlık kanji; sütun2 (x≈134, 10.5pt) 音訓; sütun3 (x≈208) örnekler. Her karakter için başlık kanji font boyutuyla (18pt) bulundu, 音訓 sütunu ham okundu; **her karakterin resmî sayfa kırpımı görsel olarak da doğrulandı** (§7: yalnız OCR yetmez).
- **Ham vs normalize:** Resmî 訓 sütunu parantez KULLANMAZ (görsel kanıt). `officialRaw*` bu ham biçimdir; `normalized*` DECISION-004 N-3 parantez biçimine, okurigana sınırı **resmî örnek kelimeden** türetilerek (ör. 大きい → おお(きい)) üretilmiş **öneridir**. Eksik/fazla karşılaştırması parantez-bağımsız (kana kimliği) yapılır.

## §3 Zorunlu teslim tablosu (11/11)

| id/kanji | sayfa | officialRawOn | officialRawKun | normalizedOn | normalizedKun | currentOn | currentKun | missingOn | missingKun | extraOn | extraKun | notationOnly | fuhyo/irregular | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| hito 人 | 86 | ジン・ニン | ひと | ジン・ニン | ひと | ジン・ニン | ひと | — | — | — | — | — | 一人(ひとり)・二人(ふたり)・仲人(なこうど)・大人(おとな)・玄人(くろうと)・素人(しろうと)・若人(わこうど) | **PASS** |
| dai 大 | 104 | ダイ・タイ | おお・おおきい・おおいに | ダイ・タイ | おお・おお(きい)・おお(いに) | ダイ・タイ | おお(きい) | — | おお・おお(いに) | — | — | — | 大人(おとな)・大和(やまと) | **MISSING** |
| tsuki 月 | 46 | ゲツ・ガツ | つき | ゲツ・ガツ | つき | ゲツ・ガツ | つき | — | — | — | — | — | 五月(さつき)・五月雨(さみだれ) | **PASS** |
| yon 四 | 64 | シ | よ・よつ・よっつ・よん | シ | よ・よ(つ)・よっ(つ)・よん | シ | よん・よ(つ) | — | よ・よっ(つ) | — | — | — | — | **MISSING** |
| kyuu 九 | 35 | キュウ・ク | ここの・ここのつ | キュウ・ク | ここの・ここの(つ) | キュウ・ク | ここの(つ) | — | ここの | — | — | — | — | **MISSING** |
| otoko 男 | 106 | ダン・ナン | おとこ | ダン・ナン | おとこ | ダン・ナン | おとこ | — | — | — | — | — | — | **PASS** |
| ashi 足 | 100 | ソク | あし・たりる・たる・たす | ソク | あし・た(りる)・た(る)・た(す) | ソク | あし・た(りる) | — | た(る)・た(す) | — | — | — | 足袋(たび) | **MISSING** |
| ato 後 | 51 | ゴ・コウ | のち・うしろ・あと・おくれる | ゴ・コウ | のち・うし(ろ)・あと・おく(れる) | ゴ | あと・うし(ろ) | コウ | のち・おく(れる) | — | — | — | — | **MISSING** |
| sei 生 | 89 | セイ・ショウ | いきる・いかす・いける・うまれる・うむ・おう・はえる・はやす・き・なま | セイ・ショウ | い(きる)・い(かす)・い(ける)・う(まれる)・う(む)・お(う)・は(える)・は(やす)・き・なま | セイ | い(きる)・う(まれる) | ショウ | い(かす)・い(ける)・う(む)・お(う)・は(える)・は(やす)・き・なま | — | — | — | 弥生(やよい)・芝生(しばふ) | **MISSING** |
| hanasu 話 | 161 | ワ | はなす・はなし | ワ | はな(す)・はなし | ワ | はな(す)・はなし | — | — | — | — | — | — | **PASS** |
| nani 何 | 20 | カ | なに・なん | カ | なに・なん | カ | なに・なん | — | — | — | — | — | — | **PASS** |

**Özet:** PASS 5 · MISSING 6 · EXTRA 0 · NOTATION 0 · UNRESOLVED 0. Depoda resmî tabloda bulunmayan hiçbir okuma yok (extra = 0). Tüm 11 kayıt resmî PDF sayfasına izlenebilir (UNRESOLVED = 0).

### MISSING kayıtların ayrıntısı

- **大 (dai), s.104** — 訓 eksik: おお・おお(いに)  (resmî 音 ダイ・タイ / 訓 おお・おおきい・おおいに)
- **四 (yon), s.64** — 訓 eksik: よ・よっ(つ)  (resmî 音 シ / 訓 よ・よつ・よっつ・よん)
- **九 (kyuu), s.35** — 訓 eksik: ここの  (resmî 音 キュウ・ク / 訓 ここの・ここのつ)
- **足 (ashi), s.100** — 訓 eksik: た(る)・た(す)  (resmî 音 ソク / 訓 あし・たりる・たる・たす)
- **後 (ato), s.51** — 音 eksik: コウ · 訓 eksik: のち・おく(れる)  (resmî 音 ゴ・コウ / 訓 のち・うしろ・あと・おくれる)
- **生 (sei), s.89** — 音 eksik: ショウ · 訓 eksik: い(かす)・い(ける)・う(む)・お(う)・は(える)・は(やす)・き・なま  (resmî 音 セイ・ショウ / 訓 いきる・いかす・いける・うまれる・うむ・おう・はえる・はやす・き・なま)

## §8 Sonraki tur ÖNERİLERİ (yetki DEĞİL — §6.9)

Aşağıdaki gruplama yalnız öneridir; bu rapor hiçbir grubu uygulamaya yetkili kılmaz. Karar Codex + Zeynep'te.

1. **Mekanik küçük düzeltme adayları** (resmî kaynak açık, normalizasyon örnekten tartışmasız): 大 (おお・おお(いに)), 四 (よ・よっ(つ)), 九 (ここの), 足 (た(る)・た(す)). — *sınıf 1 önerisi*
2. **音 eksikliği taşıyanlar** (pedagojik kapı gerekebilir): 後 (音 コウ; 訓 のち・おく(れる)). — *sınıf 1/3 önerisi*
3. **Karmaşık karakter turu:** 生 — 音 ショウ + 8 訓 eksik; ayrı kanıt ve pedagojik sınıflandırma. — *sınıf 2 önerisi*

## Kanıt dosyaları (§4)

- `_AGENT_EXCHANGE/claude/evidence/2026-08-08-readings-official-completeness/current-readings.json`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-08-readings-official-completeness/official-readings.json`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-08-readings-official-completeness/comparison.json`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-08-readings-official-completeness/source-pages.txt`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-08-readings-official-completeness/commands-and-tool-versions.txt`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-08-readings-official-completeness/git-status-before.txt`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-08-readings-official-completeness/git-status-after.txt`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-08-readings-official-completeness/product-sha-before-after.txt`
- `_AGENT_EXCHANGE/claude/evidence/2026-08-08-readings-official-completeness/page0XX-<id>-<kanji>.png (11 görsel kırpım)`

## Kabul kriteri durumu

- (1) 11/11 raporda+JSON, eksik/çift yok ✓ · (2) her kayıt PDF sayfasına izlenir, sözlük-atıflı FAIL yok ✓ · (3) ham≠normalize ayrı ✓ · (4) missing/extra/notation otomatik küme karşılaştırmasıyla üretilir (`comparison.json`) ✓ · (5) 付表/jukujikun kümelere sızmadı ✓ · (6) taught/yüzey/deferred'e karar verilmedi ✓ · (7) üç ürün SHA başlangıç=son ✓ · (8) ürün/test diff sıfır, yalnız §4 yolları ✓ · (9) gruplar yalnız öneri ✓ · (10) commit/push YOK ✓
