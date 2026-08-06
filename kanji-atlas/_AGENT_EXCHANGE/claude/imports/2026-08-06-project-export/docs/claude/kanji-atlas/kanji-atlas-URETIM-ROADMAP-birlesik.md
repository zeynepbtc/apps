# Kanji Atlas — Birleşik Üretim Roadmap'i (GPT dersleri ⨯ mevcut yol haritası)

> **Amaç:** GPT pazar-araştırması derslerini (`...-GPT-dersler-MASTER.md`) mevcut Studio Board ile TEK tabloya birleştirmek. Kod yok — planlama çıktısı.
> **Tarih:** 2026-07-21. **Kilitli ilkeler her zaman öncelikli** (öner-kısıtlama-yok · eşit ağırlık · çalışan kodu silme · 3-katman · faz disiplini).
> Etiketler: 🆕 yeni özellik · 🔧 iyileştirme · ⚙️ teknik borç · 📝 içerik · 🔍 QA.

## Ses durumu — ALTYAPI ✅ CLOSED · İÇERİK KAPSAMI 🟡 IN PROGRESS (GPT ayrımı)
"Tüm ses native" ≠ "tüm içerik sesli". İki ayrı durum izlenir:
- **Ses ALTYAPISI — ✅ CLOSED:** manifest sistemi · native oynatma · koşullu buton (release'te yalnız çalacak içerikte buton) · release davranışı (`AUDIO_MODE=release`, `dogrulanmali=false`). Bu yeniden açılmaz. Final tag: `ses-release-final-20260721` (main `906bced`).
- **Ses İÇERİK KAPSAMI — 🟡 IN PROGRESS:** yeni kelime/cümle/pending örnek geldikçe kapsam büyür. Her içerik batch'i sonunda pending + native kapsam güncellenir. **"Tüm ses içeriği CLOSED" İLAN EDİLMEZ.**
  - **Mevcut native kapsam:** 611 kayıt · tüm çalışan buton native · **pending: 0**.
  - **I batch ✅ (2026-07-21):** 7 ikincil örnek (耳が痛い, 西口, 北西, 南口, 南東, 北口, 北東) native seslendirildi, entegre, butonları açıldı → pending 7→0.
  - **Gelecek kapsam artışı:** 33-kanji Content Linking Sprint (↓, IA/nav sonrası) yeni kart+cümle+ses doğuracak → o zaman pending yeniden artar.

## ✅ SES ALTYAPISI KAPANIŞ RAPORU (2026-07-21)
Zeynep dinleme turu onayı sonrası ses **altyapısı** resmen kapatıldı. GPT kapanış koşulları ✔:

| Koşul | Sonuç |
|---|---|
| Words ses butonu çalışıyor | ✅ (liste + detay + cümle) |
| Metin↔ses eşleşmesi / eksik / kullanılmayan / yinelenen | ✅ tarandı · 0 / 0 / 0 |
| 74 cümle (D2) | ✅ hepsi native |
| Yeni eklenen kelime ses kapsamı | ✅ (58 reuse + F/G/H) |
| Gerçek cihaz smoke | ✅ Zeynep telefon QA — sessiz cümle çıkmadı, onay |
| Manifest kilidi | ✅ `dogrulanmali=false` + `AUDIO_MODE=release` |
| Koşullu buton (GPT 3.14) | ✅ release'te yalnız çalacak içerikte buton; sessiz buton yok |
| Yedek + snapshot | ✅ HDD zip + tag ×3 (final: `ses-release-final-20260721`) |

**Sonuç:** Release'te 0 sessiz istek (oyun/mini-test dahil; 7 radikal ses istemez). `faz2-kalem1 → main` merge; üretim yolu **main/kanji-atlas/** (release); landing/japanese-flick/preview/nav-prototip korundu. Kanji Atlas henüz landing'den linklenmedi (pre-launch).
**4 kanji örnek (耳西南北):** 47×3/40×2/4×1 → 50×3/41×2/0×1; eklenen 7 ikincil örnek de artık native (I batch).

## 0. KİLİTLER (2026-07-21 · Zeynep + GPT + Claude mutabık) — YENİ BELGE ÜRETME, YÜRÜT
- **Üretim sırası KİLİT:** (1) ✅ Ses altyapısı kapanışı → (1.5) ✅ 7 örnek mini-batch (I) → (2) IA/nav ekran haritası + entegrasyonu → (3) Ortak mastery modeli spec'i → (4) Kana SRS → **(sonra) 33-kanji Content Linking Sprint.** Bu sıranın önüne yeni görsel cila, yeni oyun, Stroke Coach, dark mode veya yeni editoryal modül GİRMEYECEK. Yeni master/matris belgesi üretilmez.
- **D1 KİLİT (Home yönlendirme):** Home üstünde görsel baskın dinamik **öneri şeridi**; altında Kana/Kanji/Yazı/Oyunlar **eşit erişimle kalıcı** görünür. Öneri modül kilitlemez/gizlemez/tek rotaya zorlamaz. *Eşit erişim=evet; aynı boy/ağırlık=hayır; doğrudan giriş=evet; hiç öneri sunmama=hayır.*
- **D3 KİLİT (mastery görünürlüğü):** İçeride ≤6 durum; yüzeyde yalnız **Yeni / Çalışılıyor / Öğrenildi**. "Tekrar zamanı" mastery değil, geçici durum → ayrı rozet.
- **D2 — ✅ KAPANDI:** 74 cümle + yeni kelimeler native.
- **Ses kapsam disiplini KİLİT:** koşullu buton kalite-açığı arka kapısı DEĞİL, güvenli render kuralı. Çekirdek word DB kelimesi = native ZORUNLU; ikincil örnek/kullanım ifadesi = opsiyonel (pending/not_required); buton yalnız gerçek dosya varsa. **91/91 görünsün diye zayıf/yapay bağ KURULMAZ.**

## A. Güncel gerçek
| İş | Durum | Not |
|---|---|---|
| Ses ALTYAPISI | ✅ **CLOSED** | manifest/native/koşullu buton/release; final tag |
| Ses İÇERİK KAPSAMI | 🟡 **IN PROGRESS** | 611 native · pending 0 · 33-kanji sprint gelecek |
| Kanji örnek kapsamı (inline) | ✅ | 91/91; tek-örnekli 0 |
| Kanji → kelime KARTI bağı (`n5_words`) | 🟡 | 58/91 bağlı; **33 bağsız → Content Linking Sprint (Senaryo B, IA/nav sonrası)** |
| Nav + ikon + logo tasarımı | ✅ kilitli | Entegrasyon = P0-1 |
| Ölü kod temizliği (Faz 2 kod) | ✅ | 3-kapı smoke |
| Yedek | ✅ | HDD zip + tag ×3 |

## B. Birleşik backlog

### P0 — Yayın / temel öğrenme için zorunlu
| ID | İş | GPT | Etiket | Bağımlılık | Durum |
|---|---|---|---|---|---|
| P0-2 | Ses ↔ metin QA + Words butonu + koşullu buton | 1.10, 3.14 | 🔍🔧 | — | ✅ CLOSED |
| P0-3 | 74 cümle + yeni örnek kelime sesi + I batch | 1.10 | 📝 | — | ✅ CLOSED |
| P0-1 | **IA / nav entegrasyonu** — floating socket + üst bar; alt bar Kana/Kanji/Yazı/Oyunlar; logo=Home; parent-child geri | Faz1, 3.12 | 🆕⚙️ | Nav ✅ · D1 ✅ | **SIRADAKİ** |
| P0-4 | Ortak mastery modeli spec'i (kana+kanji tek model) | 1.4, Faz3 | 🆕 | — | bekliyor |
| P0-5 | Kana SRS | 1.2 | 🆕 | P0-4 | bekliyor |
| P0-6 | İçerik doğruluğu altyapısı — `kaynak + QA durumu` + `audio_status` (native/not_required/pending) | 3.15 | ⚙️📝 | — | bekliyor |
| P0-7 | Veri kaybı testleri (offline/localStorage/migration) | 1.14 | 🔍 | — | bekliyor |
| P0-8 | Temel erişilebilirlik + Reduced Motion | 2.12 | 🆕🔧 | — | bekliyor |
| P0-9 | Release checklist + eksik ikon yayılımı | Faz7, Faz2 | 🔧 | P0-1 | bekliyor |

**P0-6 kabul kriteri — ek notlar (2026-07-21 eklendi · ŞİMDİ UYGULANMIYOR):**
- Koşullu içerik alanları yalnız **doğrulanmış veri varsa** render edilir (ör. `pictogram_note`). Doğrulanmamış veri gösterilmez.
- **"Bileşen verisi yok" ≠ "temel piktogram".** Doğrulanmamış pedagojik açıklama kullanıcıya gösterilmez. (Ses tarafındaki koşullu-buton mantığının içerik/metin alanlarına genişletilmesi — aynı "yalnız doğrulanmış içerik render edilir" ilkesi.)

### Faz 5 — İçerik (IA/nav sonrası)
- **Content Linking Sprint — 33 kanji → çekirdek kelime kartı** 📝🔍 (GPT: en önemli içerik önerilerinden). **Senaryo B doğrulandı:** 33'ün 0'ı mevcut kartlara bağlanamıyor (word_jp + contains_kanji = 0) → hepsi YENİ kart ister. Her kart: kelime seçimi · okuma · TR/EN anlam · örnek cümle · romaji · çeviri · kelime sesi (29'u kayıtlı örnek terfisiyle ~bedava) · cümle sesi (yeni) · QA · oyun havuzu etkisi. Hedef: **kanji başına 1 çekirdek kart** (3 değil). **91/91 için zayıf/yapay bağ kurulmaz.** Bağımlılık: P0-1 sonrası; ses içerik kapsamını büyütür (pending güncellenir).

### P1 — Güçlü rakip seviyesi
| ID | İş | GPT | Etiket | Bağımlılık |
|---|---|---|---|---|
| P1-1 | Home dashboard — baskın öneri şeridi + eşit araç kartları (D1) | 1.1, 2.1 | 🆕 | P0-1 |
| P1-2 | Zayıf nokta motoru (karıştırılanlar) | 1.3, 2.6 | 🆕 | P0-5 |
| P1-3 | Mastery seviyeleri (içeride 6, ekranda 3 — D3) | 1.4 | 🆕 | P0-4 |
| P1-4 | Yazı motoru birleştirme (tek motor: kana+kanji, vuruş, hayalet) | 1.5, Faz4 | 🆕⚙️ | P0-1 |
| P1-5 | Cezalandırmayan vuruş geri bildirimi | 1.6, 3.4 | 🆕 | P1-4 |
| P1-6 | Hata sonrası hemen öğretim + benzer karakter kıyası | 1.12, 2.6 | 🔧🆕 | P0-5 |
| P1-7 | Anlamlı ilerleme dili (gelişim kaydı) | 1.13 | 🔧 | P0-4 |
| P1-8 | Kısa tamamlanabilir oturumlar | 1.11 | 🆕 | P0-5 |
| P1-9 | Oyun sonuçları → öğrenme modeline | 3.13 | 🆕 | P0-4 |
| P1-10 | Design tokens + component library v1 + motion language | Faz2 | ⚙️ | — |

### P2 — Ayırt eder
Stroke Coach (2.8, bağ: P1-4/P1-5) 🆕 · Aile şeridi v2 (2.2) 🔧 · Etimoloji+hafıza (2.3) 🔧📝 · "Japonca nasıl çalışır" notları (2.5) 📝 · **Gerçek kullanım bağlamı — birkaç düşük maliyetli özgün bağlam kartı** (2.4; 駅/入口/木曜日/半額; 耳鼻科 gibi N5-üstü gerçek kelimeler burada) 🆕📝 · Gelişmiş arama/filtre (2.10) 🆕 · İsteğe bağlı romaji ayarı (2.11) 🔧 · Adaptif günlük rota (2.1) 🆕.

### P3 — Sonraki büyüme
Kapsamlı gerçek Japonya içerik kütüphanesi (2.4 büyük) · Dark mode · i18n · Cloud sync (export/import) · Koleksiyon/rozet · İleri JLPT · Bağımsız fırça uygulaması.

## C. Kararlar — DURUM
- **D1 — KİLİT** · **D2 — ✅ KAPANDI** · **D3 — KİLİT** · **Ses kapsam disiplini — KİLİT** (§0).

## D. Bu turda YAPILMAYACAKLAR
Stroke Coach · aile şeridi v2 · gerçek Japonya görselleri · dark mode · i18n · cloud sync · gelişmiş filtre/arama · yeni oyun · rozet · romaji ayar ekranı · yeni ekran · **33-kanji yeni kart üretimi (IA/nav sonrası sprint'e)**. (Aynı anda en fazla 1 büyük mimari + 1 küçük görsel/içerik iş.)

## E. Oturumlar
1. **Oturum 1 — Ses altyapısı kapanışı + 4 kanji örnek:** ✅ **TAMAM**.
1.5. **Ara — 7 örnek mini seslendirme (I):** ✅ **TAMAM** (native, entegre, pending 7→0).
2. **Oturum 2 — P0-1 IA/nav (SIRADAKİ):** kod dışı ekran haritası (screen_id/parent/entry_points/back/logo/bottom_tab/selector_state/profile/settings) → onay → entegrasyon. Home dashboard'ı bu fazda TAM geliştirme; önce ekranları güvenle taşı.
3. **Oturum 3 — P0-4 ortak mastery spec'i.** Sonra Kana SRS.
4. **Content Linking Sprint (33 kanji)** — IA/nav sonrası, Faz 5 içerik.

## F. Riskler
Kapsam patlaması → "yapılmayacaklar" + tek-mimari kuralı · Kana SRS'i mastery'den önce yapmak → yeniden iş · Home'u huniye çevirmek → kimlik kaybı (D1) · Koşullu butonu kapsam-açığı arka kapısı yapmak → audio_status disiplini + "IN PROGRESS" ifadesi · 91/91 için zayıf bağ → yasak · **Doğrulanmamış içerik alanı (pictogram_note vb.) render etmek → yalnız doğrulanmış içerik gösterilir (P0-6)** · Stroke Coach'u erken yayımlamak → P1-4 sağlam olmadan P2 yok.
