# Editoryal Uyumlama — Bekleyen Liste (Authoring DEĞİL, EN SONA)

> Boş kökenler bittikten sonra tek turda ele alınacak editoryal/tutarlılık işleri. **Şu an hiçbiri acil değil; kullanıcıya yanlış bilgi gösteren bir hata yok.**
> **Zeynep planı:** dil standardizasyonunu **~103 reviewed'a ulaşınca tek seferde** yap — şu an akışı durdurmaya değmez.

| # | Kayıt/alan | İş | Kaynak | Öncelik |
|---|---|---|---|---|
| 1 | **借りて geriye dönük hizalama** ⭐ | AUTHORING-04 (B) kararı gereği kaynakta olmayan ses gerekçesi çıkarılacak. **6 kayıt:** 四 · 六 · 七 · 八 · 東 (reviewed) + 九 (drafted). Çıkarılacak: "sesi uygun düştüğü için", "benzer sesli olduğu için", "sesi için", "sesi nedeniyle". Kanıt: 六'nın ESAS sayfası yalnız 「借りて」 der. | AUTHORING-04 · PARTI12 QA | **Orta-Yüksek** |
| 2 | **Oluşum türü dilinin toplu standardizasyonu** ⭐ | ~103 reviewed'da **tek seferde**: 象形 · 指事 · 会意 · 形声 · 会意形声 (+ 借りて) için ev dili taranıp birleştirilir. İçine giren alt kalem: **iki farklı 形声 ifadesi** — (a) tam: "X anlamı verir. Y ise anlamıyla değil, okunuşuyla katkı yapar ve [ses] sesini verir." (時 晴 聞 書 百 千 金 前) · (b) sıkıştırılmış: "…X'i gösteren A ile [ses] sesini veren B'den oluşur." (年 気 青). (b) yalnız "eski biçimi … -den oluşur" çerçevesinde ve ses bileşenine yanlış anlam vermiyor → kilitli kuralın amacı korunuyor. | PARTI13–14 · Zeynep planı | Orta |
| **12** | **ÇIKARILABİLİR AYRINTI TESTİ — geriye dönük tarama** ⭐ YENİ | 父 turunda kilitlenen test (AUTHORING-01/03) mevcut `reviewed` kayıtlara **tek seferde** uygulanır: *"Bugünkü yayımlanmış metinler arasında, tartışmalı bir ayrıntı çıkarılırsa confidence'ı yükselecek ve anlamı bozulmayacak başka kayıt var mı?"* İlk bakılacaklar: **B confidence'lı 15 kayıt** (行, 食, 土, 赤, 名, 北, 青, 百, 千, 来, 右, 後, 前, …). **Zeynep kararı: ŞİMDİ YAPILMAZ** — (a) kalan üç kırmızı kayıt (南, 白) testi zaten gerçek vakalarda sınayacak, (b) şimdi aranırsa kapsam büyür. Harmonizasyonda **tek seferlik tarama** olarak yapılır. | PARTI15 QA · Zeynep 2026-07-25 | **Orta-Yüksek** |
| 3 | **東 `memory_hint_tr` çelişkisi** | Legacy alan "Ağacın ardından doğan güneş: doğu." — reviewed kökenin **reddettiği** folk etimoloji. `not_required` olduğu için render EDİLMİYOR → zararsız. 東 bir gün `active`'e çevrilirse yüzeye çıkar. **Önleyici not.** | PARTI12 QA | Orta |
| 4 | **口 bileşenli kayıtlarda "ağız" mı "söz" mü?** | Parti 10 ilkesi: Kanjipedia bileşiklerde 口'ya **konuşma işlevi** verir. 右'da "söz" dendi; **名** ise "ağız" diyor (hem `summaryTr` hem `component_meanings`). Hata değil, ses tutarsızlığı. | PARTI10 QA | Orta |
| 5 | **Kategori tutarsızlığı** ⭐ | Ölçüldü: **北 南 西 東 → "Yönler"** · **左 右 前 後 上 下 中 → "Yön ve konum"** · **外 → "Günlük yaşam"**. İki ayrı yön kategorisi var, pusula yönleri sol/sağ/ön/arka'dan ayrı düşüyor; 外 büsbütün başka yerde. **Kullanıcıya görünen gruplama** (kategori bazlı listeler). Köken işi değil, **veri hijyeni**. | PARTI14 QA §8 | Orta |
| 6 | 30 legacy kayıt | "Yeni editoryal sesle aynı mı?" turu — legacy `pictogram_note` metinleri ev üslubuyla uyumlu mu? | DURUM Faz | Orta |
| 7 | 5 kayıt: 大 天 夫 本 国 | `qaStatus:"reviewed"` var ama `summaryTr` yok — görünen köken hâlâ legacy `pictogram_note`'tan (v2 iskele kalıntısı). | AUTHORING-03 | Orta |
| 8 | 名 `summaryTr` | Akıcılık: **"口 ağzı, 夕 ise akşam karanlığını gösterir. Karanlıkta birbirini göremeyen insanların adlarını söylemelerinden 'isim' anlamı gelişmiştir."** *(4. kalemle birlikte.)* | PARTI6 QA | Küçük |
| 9 | 名 `onyomi` | Kanjipedia 音 **メイ・ミョウ**; kayıtta yalnız `メイ`. | PARTI6 QA | Küçük |
| 10 | 名 `pictogram_note` (legacy kalıntı) | reviewed'da okunmuyor ama kayıtta duruyor. Silme zorunlu değil; gözden geçir. | PARTI6 | Küçük |
| 11 | 九 `mnemonic` alanı yok | Konvansiyondan önce drafted edilmişti. 九 açılırsa eklenmeli ("alan yok = 0" hedefi). | PARTI12 QA | Küçük |

## Terminoloji — ölçülmüş/kilitli sabitler
| Japonca | Ne demek | Türkçe sabit | Kayıtlar |
|---|---|---|---|
| 旧字 · 本字 | eski/asıl karakter biçimi | **"eski biçim"** | 円 九 読 来 万 年 気 青 飲 |
| 省略形 · 略字 | kısaltılarak sadeleşmiş biçim | **"sadeleşmiş"** | 円, 気, 万 |
| 変わった形 | biçimi değişmiş | **"değişmiş"** | 年 |
| **俗字** | halk arasında yerleşip standart olmuş varyant | **"yaygınlaşmış"** | 青 |
| (bileşen kısalması) | yalnız bileşen düzeyinde | "kısaltılmış biçim" | 季 (稚→禾) |

## `disagreementNote` kapsamı (KİLİTLİ)
**Yalnız gerçek kaynak ayrılıkları.**
- ✅ Girer: mekanizma/rol/oluşum çatalları (後 来 百 千 食 行 土 赤 名 青), kaynak mutabakatı kaydı, görünür metni belirleyen editoryal kararlar, **yayın dışı bırakılan çıkarılabilir ayrıntı** (父).
- ❌ Girmez: ek tarihsel katmanlar (年'in erken yazısı, 万'ın su mercimeği) · çapraz kaynak sınırlılığı ayrıntısı (前'in 説文'da madde olmaması) → **authoring kaynak notu** (apply/fix betiği yorumu) + **QA raporu**. Kayıtta yalnız tek satırlık nötr durum ifadesi (前 emsali).

## Not
Küçük kalemler (8, 9) istenirse bir sonraki reviewed commit'ine iliştirilebilir. **1, 2 ve 12. kalem en büyükleri** — ayrı tur hak ediyorlar.
