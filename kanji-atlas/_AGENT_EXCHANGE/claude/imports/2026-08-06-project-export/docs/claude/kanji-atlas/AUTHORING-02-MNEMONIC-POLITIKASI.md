# Authoring — MNEMONIC POLİTİKASI (KİLİTLİ)

> `mnemonic.status` ne zaman hangi değeri alır. Kod bu semantiği uyguluyor (`mnemonicOf`: active→textTr, diğerleri→gizli). Kardeş: Köken Yazım Rehberi, Source Policy.

## Üç durum
| status | Ne zaman | UI | textTr |
|---|---|---|---|
| **active** | Köken'in TAŞIMADIĞI, gerçekten yardımcı, karaktere özgü ayrı ipucu var | Render edilir (ayrı '記 · Şöyle hatırlayabilirsin:' kartı) | Yazılır |
| **not_required** | Köken tek başına karakteri yeterince hatırlatıyor | Render EDİLMEZ | null |
| **pending_review** | Köken pending/drafted VEYA hatırlatıcı denetlenmedi | Render EDİLMEZ | Yazılmaz |

## KURAL: "hint yok" örtük dördüncü durum OLAMAZ
Her kaydın açık bir `mnemonic.status`'u olmalı. Köken yazılırken **açıkça `not_required` veya `pending_review`** alır. (Hedef: alanı boş kayıt = 0.)

## ⭐ `not_required` OTOMATİK DEĞİLDİR — reviewed'da AYRI QA kararı (Zeynep, 2026-07-25 · KİLİTLİ)
**"Köken açık/şeffaf ⇒ mnemonic gereksiz" eşitliği YASAK.** Çok açık bir etimoloji bile ekstra çağrışım kazandıran bir hatırlatıcı üretebilir.
- **Doğru ölçüt:** "Köken **tek başına** karakteri **yeterince hatırlatıyor** mu?"
- **QA kararıdır**, drafted→reviewed'de **her kayıt için ayrı** verilir. Drafted'da `pending_review`; reviewed'da 4-soru → `not_required` **veya** `active`. Gerekçe kayıtta yazılır.
- **Her partide active üretme zorunluluğu YOKTUR** (Zeynep, Parti 9): *"active kullanmaya başlamış olmak, her partide active üretmeniz gerektiği anlamına gelmiyor."*

### `not_required` 4 sorusu
1. Köken **temel anlama doğrudan** bağlanıyor mu?
2. Kullanıcı **tek okumada** canlandırabiliyor mu?
3. Ayrı mnemonic **yeni bilgi mi katıyor**, yalnız tekrar mı?
4. Diğer kanjilerde **aynı bileşenle çelişiyor mu?**
→ 1-2 evet, 3 "yalnız tekrar", 4 hayır ise `not_required`. **Aksi halde `active` — bu ihtimal gerçek tutulur.**

## ⭐⭐ ACTIVE MNEMONIC KALİTE STANDARDI (Zeynep, 2026-07-25 · KİLİTLİ)
Her active mnemonic **yazılmadan önce** dört testten geçer. Amaç: Hafıza katmanının uzun hikâyelerle dolmasını engellemek.

| # | Test | Kalırsa |
|---|---|---|
| 1 | **Kökeni tekrar ediyor mu?** | Evet → **REDDET** |
| 2 | **Tarihsel iddia içeriyor mu?** | Evet → **REDDET** (tarihsel iddia Kökeni katmanına aittir) |
| 3 | **Gerçek bir öğrenme problemini çözüyor mu?** | Hayır → **REDDET** |
| 4 | **8–10 saniyede hatırlanabilir mi?** | Hayır → **SADELEŞTİR** |

### ⭐ T3'ün KAPSAM SINIRI — görev ayrımı (Zeynep, 2026-07-25 · Parti 10 kararı)
T3'teki "öğrenme problemi" **ANLAM ve AYIRT ETME** problemidir. **YAZIM ÖĞRETİMİ Hafıza katmanının işi değildir — çizim modülünün (Stroke Coach) işidir.**

> *"土'daki active gerçek kullanıcı problemi çözüyordu; 土/士 gerçekten karışıyor. 左/右 için ilk çizgi farklılığı gerçek, ama bunun Stroke Coach'un görevi olduğunu düşünüyorum. Eğer Hafıza katmanı bunu da üstlenmeye başlarsa ileride ilk çizgi, ikinci çizgi, kalem kaldırma, oran, açı gibi şeyler gelmeye başlar ve Hafıza katmanı giderek yazı öğretmeye başlar. Bu görev ayrımı bozulur. Stroke order verisi zaten uygulamada var."* — Zeynep

**Ayrım çizgisi:**
- ✅ **土** active'i meşru: iki **KARAKTERİ** ayırt ettiriyor (土/士), yazım tekniği öğretmiyor.
- ❌ **左/右** çizim-sırası ipucu reddedildi: gerçek ve veriden doğrulanmış (左 ilk çizgi yatay, 右 eğik) ve 4 testi teknik olarak geçiyordu — ama **yazım tekniği**, ayırt etme değil.

## Kesin kurallar
- **Yapay mnemonic üretme.** Gereksizse `not_required`.
- **Köken'i tekrar etme.** Aynı/near-aynı string yasak (kod ve reviewed betiği enforce eder).
- **Active = AYRI Hafıza katmanı**, tarihsel köken açıklaması DEĞİL. Mimari ayrı: `kokenOf`→'Kökeni' bölümü, `mnemonicOf`→ayrı '記' kartı. **Bu ayrım korunmalı** — birleşirse sahte etimoloji üretme riski doğar.
- **Ses bileşenini sahte anlam hikâyesine çevirme.** Tek ana görüntü; sistem-tutarlı.

## `basis` alanı + `visual_story` ETİKET ŞARTI
`mnemonic.basis`: `historical_form` · `functional_components` · `visual_story` · `not_required`.
**KRİTİK:** `basis: "visual_story"` → UI'da açık etiket ZORUNLU: **"Hatırlama ipucu — gerçek köken değildir"**. Etiket render edilmiyorsa visual_story-tipi mnemonic HİÇ kullanılmaz.
- **Not:** `basis` kodda kullanılmıyor, testte kontrol edilmiyor, hiçbir kayıtta yok. Mevcut active'ler minimal `{status, textTr}` (smoke_content_scaffold tam bunu bekliyor) ve ikisi de visual_story DEĞİL.

## Mevcut durum (ÖLÇÜLDÜ, `54ee218` sonrası — DATA.chars)
`active` **2** (土 · 行) · `not_required` **58** · `pending_review` **0** · `alan yok` **38** · toplam 98.
- İlk active'ler Parti 8'de yazıldı (eşik geçildi). Parti 9'da 書 için aday üretildi ama 4 testten düştü; Parti 10'da 左/右 adayı **görev ayrımı** gerekçesiyle reddedildi. **Standart hem üretme hem reddetme yönünde çalışıyor.**
- "alan yok" 38 → Authoring ilerledikçe 0'a iner.
