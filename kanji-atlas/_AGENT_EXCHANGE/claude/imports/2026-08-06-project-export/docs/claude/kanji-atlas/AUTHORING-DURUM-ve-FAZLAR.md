# Authoring — DURUM & FAZLAR (devam noktası)

> Kardeş: **AUTHORING-01** (yazım rehberi — "kaynak kadar konuş" + terminoloji sabitleri), AUTHORING-02/**03**, **AUTHORING-04-ODUNC-USLUP-KARARI**, PARTI5–**15** QA raporları, **EDITORYAL-UYUMLAMA-BEKLEYEN**.
> Branch `onboarding-b2-gate3` · son HEAD **`b76f358`** · her commit push'lı, SHA doğrulanmış. Tarih 2026-07-25.

# ⭐⭐ YENİ KİLİTLİ İLKE: **ÇIKARILABİLİR AYRINTI TESTİ** (父 emsali)
Kaynaklar ayrışıyorsa önce **ayrışan şeyin ne olduğu** sorulur:

| Ayrışan şey | Ne yapılır | Örnek |
|---|---|---|
| Kaydın **OMURGASI** (çıkarılırsa metin kalmaz) | ESAS izlenir, confidence **B**, çatal notta | 行 · 来 · 土 |
| **ÇIKARILABİLİR AYRINTI** (çıkarılınca zincir ayakta) | Ayrıntı **yayın dışı**, yalnız uzlaşılan çekirdek yayımlanır | **父** |
| Çıkarınca **hiçbir şey kalmıyor** | Yayınlanmaz (`drafted`/`pending`) | 九 |

**Confidence'ın anlamı da netleşti (KİLİTLİ):** confidence = **YAYIMLANAN metnin** kaynak desteği, araştırmanın tümünün kesinliği değil. Tartışmalı ayrıntı yayın dışına alınınca confidence **yükselebilir** (父: B → **A**). Ayrıntı yine `disagreementNote`'ta durur → **"yayımlanan iddia" ile "araştırma notu" ayrıdır.** Tam metin: **AUTHORING-03**.

## ▶ SIRADAKİ: 🔴 KIRMIZI KUYRUK — 3 kayıt kaldı, her biri AYRI tur
| Sıra | Kanji | Bilinen risk | Kanjipedia ID |
|---|---|---|---|
| 1 | **南** | Özgün nesne gerçekten belirsiz (çan/çalgı?) | 0005406400 |
| 2 | **今** | Biçim/bileşen tartışmalı | — |
| 3 | **白** | Biçim kökeni çok teorili (palamut · tırnak · kafatası · gün doğumu · pirinç tanesi) | 0005607600 |
| ✓ | ~~父~~ | **KAPANDI** — (B) kararı, conf A | 0006017800 |

Kuyruğun tanımı: **"yayınlanamaz" değil, "ek kanıt gerektiren".** Araştırma tamamlanınca normal akışa dönerler (右 emsali). Artık **çıkarılabilir ayrıntı testi** de elde — 南 ve 白 tam olarak bu testin adayları.
Sonrasında: **九**'un durumu (drafted, conf C — açılmıyor) ve **Editoryal Harmonizasyon** (11 kalem) → **Content Freeze v1.0**.

## Güncel durum tablosu — ÖLÇÜLDÜ (`b76f358` sonrası)
| Durum | Sayı |
|---|---|
| **Reviewed** | **57** |
| Legacy (`pictogram_note` dolu, etymology yok) | 30 |
| **Drafted 1** (九 conf C — KAPALI) · Pending 0 | 1 |
| **Boş** | **3** (yalnız kırmızı kuyruk: 今 南 白) |
57 + 30 + 1 + 3 = 91.
**Yayımlanan `summaryTr`:** **52** · ortalama 124 · medyan 120 · **confidence A:37 / B:15**.
**mnemonic:** active 2 (土 行) · not_required 73 · pending_review 0.
**formationType:** 象形 21 · 形声 15 · **会意 11** · 指事 6 · 会意形声 5.

> **87 kayıtta kullanıcıya görünen köken var** (57 reviewed + 30 legacy). Gizli: 3 kırmızı + 九.

## ⚡ METODOLOJİ DONDURULDU · ÇATI İLKE: "KAYNAK KADAR KONUŞ" (AUTHORING-01)
| Kaynak ne veriyorsa | Metin ne yapar |
|---|---|
| 形声 + ses örtüşüyor | Sesi **yaz** (年 ネン, 気 キ, 青 セイ) |
| 形声 + ses örtüşmüyor | Sesi **yazma** (百, 金, 前, 飲) |
| 借りて — yalnız "ödünç" | Yalnız "ödünç alınmıştır" (万, 来) |
| Anlam bağı — nedensellik var | O nedenselliği yaz (**西**, **北**) |
| Söylenmemiş mekanizma | **Eklenmez** (飲'de 食 gloss edilmedi) |
| **Kaynaklar bir AYRINTIDA uzlaşmıyor ve ayrıntı çıkarılabilir** | **Ayrıntıyı yazma** (**父**) |

**Terminoloji sabitleri (KİLİTLİ):** "eski biçim" (旧字/本字) · **"sadeleşmiş"** (省略形/略字 — 円 気 万) · **"değişmiş"** (変わった形 — 年) · **"yaygınlaşmış"** (俗字 — 青) · "kısaltılmış biçim" (yalnız bileşen — 季).

Diğer ilkeler: verimlilik · **triage ön hüküm değil** · mnemonic not_required otomatik değil (+4 kalite testi + T3 görev ayrımı) · çapraz alıntılar fetch edilerek doğrulanır · **sistem hakkında iddia kurmadan önce ölç** · **betik sonrası exit kodu kontrol et (`set -e`)**.

## 🔒 `disagreementNote` KAPSAMI (KİLİTLİ)
**Yalnız gerçek kaynak ayrılıkları.** Ek tarihsel katmanlar (年'in erken yazısı, 万'ın su mercimeği) ve çapraz kaynak sınırlılığı (前'in 説文'da madde olmaması) **girmez** → authoring kaynak notu (betik yorumu) + QA raporu. Kayıtta yalnız tek satırlık nötr durum ifadesi.
**Ek (父):** yayın dışı bırakılan **çıkarılabilir ayrıntı** gerçek bir kaynak ayrılığı olduğu için `disagreementNote`'a **girer** — bilgi kaybolmaz, yalnız kullanıcıya gösterilmez.

## Son commit zinciri
| SHA | İş |
|---|---|
| `3964b20` → `131676c` | **Parti 14** — 北=B, 青=B, 飲=A · 俗字→"yaygınlaşmış" kilitlendi |
| `1bcd998` | Parti 15 (DRAFTED) — 父, dört kaynak, gerçek çatal, karar bekliyor |
| **`b76f358`** | **Parti 15 (REVIEWED)** — 父 · **SEÇENEK (B)** · confidence **B→A** · mnemonic not_required. QA: **AUTHORING-PARTI15-CHICHI-QA-RAPOR**. CONTENT_HASH `4ef1e054d7ac746a` |

## ✓ KAPANDI — Parti 15: 父 (kırmızı kuyruk turu 1) (`1bcd998`→`b76f358`)
Dört kaynak fetch edildi: Kanjipedia (balta, 会意) · 説文 (değnek, 从又舉杖) · Wiktionary (taş balta, 象形) · OKJiten (kamçı, 象形).
- **Uzlaşı:** el ✅ · elde bir nesne ✅ · otorite ✅ · "baba" ✅. **Uzlaşmayan:** nesne ne? ❌ (ve oluşum türü ❌).
- **Karar (B):** nesne adlandırılmadı. Yayımlanan: *"Elinde bir alet tutan kişiyi gösterir. Aileyi yöneten ve elinde otorite bulunduran kişiden 'baba' anlamı gelişmiştir."* (117 kr)
- **confidence B → A** — yayımlanan hiçbir cümle tartışmalı değil.
- Zeynep: *"'Balta' yazmak kullanıcı açısından hiçbir şeyi çözmüyor… 九'da tartışmalı kısmı çıkarınca köken çökmüştü; burada zincir tamamen ayakta."*

## ✓ KAPANDI — Parti 5–14
口=A · 名=B · 分/半/友=A, 赤=B · 土=B, 母=A(指事), 生=A, 行=B · 書=A, 先=A, 食=B, 外=A · 左=A, 右=B · 百=B, 千=B, 円=A, 金=A · 万=A, 来=B, 西=A · 年=A, 気=A, 前=B, 後=B · 北=B, 青=B, 飲=A.

## ⚠️ B0 — KALICI KURAL (genişletilmiş)
`kokenOf()` `drafted`→`null`. Her partiden önce ölç. **Genişletilmiş:** veri/sistem hakkındaki **her olgusal iddia** ölçülür. Örnekler: "会意形声 hiç yok" (yanlıştı) · çizim sırası (doğruydu) · karışıklık ortakları · terminoloji sabiti · metin uzunluk dağılımı · kategori tutarlılığı.

## Tamamlanan Authoring partileri
| Parti | Kanji | Reviewed |
|---|---|---|
| 1A–4 | 時 晴 話 聞 / 語 校 読 何 / 王 玉 季 東 / 目 耳 手 足 / 四 五 六 七 八 (+九 drafted) | 68ecd89 … 4baac87 |
| 5–9 | 口 / 名 / 分 半 友 赤 / 土 母 生 行 / 書 先 食 外 | 938d882 … aaea831 |
| 10–12 | 左 右 / 百 千 円 金 / 万 来 西 | 54ee218 / bb24677 / 351e2f3 |
| 13–14 | 年 気 前 後 / 北 青 飲 | a640fe0 / 131676c |
| **15** | 🔴 **父** (kırmızı kuyruk 1 — seçenek B, conf A) | **b76f358** |
| 🔴 | 南 · 今 · 白 (kırmızı, ayrı turlar) | ⏳ SIRADAKİ |

## Yöntem hatırlatması (her tur)
0. **B0 ÖLÇ** — ve veri/sistem hakkındaki her iddiayı ölç.
1. **ESAS Kanjipedia sayfası ayrı okunur** (triage ön hüküm değil) → oluşum türü + bileşen rolleri + anlam mekanizması **ayrı** doğrula; **説文 çaprazı FETCH EDİLEREK** (yoksa "yok" da bulgudur — 前). Kırmızı kuyrukta ek kaynaklar (Wiktionary, OKJiten) da fetch edilir.
2. **Çatal çıkarsa: ÇIKARILABİLİR AYRINTI TESTİ** — ayrışan şey omurga mı, çıkarılabilir ayrıntı mı, yoksa kaydın tamamı mı?
3. `apply_authoring_*.js` → **drafted** (mnemonic pending_review) → commit+push. Kilitli kararlar makine güvencesiyle. **Exit kodu kontrol et.**
4. QA raporu → **DUR** (yazan ≠ onaylayan).
5. Onayda: `*_reviewed.js` → **reviewed** + `reviewedAt` (Git'ten) + **mnemonic 4-soru** → regen → 4 suite → DOM kontrolü → commit+push+SHA.

## Test durumu (`b76f358` sonrası)
**4 içerik suite:** 401/401 · 83/83 · sources 0 başarısız · 9/9. CONTENT_HASH: **`4ef1e054d7ac746a`**.

## Not
Ortam: konteyner 3 kez sessizce geri sarıldı — **her commit anında push + SHA doğrulaması** zorunlu.
