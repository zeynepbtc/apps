# Kanji İçerik Denetimi — PİLOT RAPORU (5 kanji)

> 5 kanjilik pilot (月 男 明 休 時), 文化庁 + Kanjipedia + çapraz kaynaklı, 4-katman + 3-düzey bileşen + verdict/güven/kapsam yöntemiyle. **Kod/DATA/CSS/metin DEĞİŞMEDİ.** 91'e açmadan önce Zeynep onayı için.
> Branch `onboarding-b2-gate3` · HEAD `2efd279` · Tarih 2026-07-24 · Kardeş: `KANJI-ICERIK-DENETIMI-v2-PLAN-DURUM.md`, CSV: `KANJI-CONTENT-AUDIT-PILOT.csv`

## 1. Sonuç özeti — yöntem çalıştı
| Kanji | Formasyon | Güven | Verdict | Severity | Baş bulgu |
|---|---|---|---|---|---|
| 時 | **形声** ★ | A | **REWRITE** | **P0** | 寺 fonetik iken "tapınak" ANLAM bileşeni gibi gösterilmiş — denetimin var oluş sebebi |
| 月 | 象形 | A | KEEP_WITH_MINOR_EDIT | P2 | Köken doğru; **ガツ okuması eksik** (app'in kendi örneği 一月=ichigatsu onu kullanıyor) |
| 男 | 会意 | B | KEEP_WITH_MINOR_EDIT | P2 | KÖKEN=HATIRLATICI birebir aynı string; 力'nin saban nüansı gizli; ナン eksik |
| 明 | 会意 | B | KEEP_WITH_MINOR_EDIT | P2 | Doğru ama eksik: ikinci tarihsel biçim 朙(月+囧); 明日 düzensiz okuma |
| 休 | 会意 | B | KEEP_WITH_MINOR_EDIT | P2 | **Kontrol karakteri** — içerik doğru korundu, sadece köken↔hatırlatıcı tekrarı |

Dağılım: Formasyon 3×会意, 1×象形, 1×形声 · Severity 1×P0, 4×P2 · Verdict 1×REWRITE, 4×KEEP_WITH_MINOR_EDIT · Güven 2×A, 3×B (hiç C/D/X yok — pilot seti temiz doğrulanabildi).

## 2. Üç sistematik kalıp (91'de tekrar edecek)
1. **形声 fonetik bileşeni "anlam" gibi gösterme — P0 sınıf hatası.** 時'de kanıtlı. `語, 持, 詩, 侍, 校(交), 晴, 清` gibi tüm 形声 kanjilerde büyük olasılıkla tekrar var. **Bu, taramanın asıl hedefi.** Ayrıca fonetik aile (寺→時持詩侍) uygulamanın kök/aile vizyonuyla birebir örtüşen kaçırılmış bir fırsat.
2. **Katman çökmesi (KÖKEN == HATIRLATICI).** 男'de birebir aynı string; 月/明/休'de neredeyse aynı. Şema bunu serbest bırakıyor → sistematik P2. v2 şeması ayrımı zorunlu kılmalı.
3. **Resmî okuma boşlukları — app'in kendi örnekleriyle çelişiyor.** 月→ガツ eksik (ama 一月 örneği gatsu), 男→ナン eksik (長男). `official_readings` vs `taught_in_app` ayrımı bu tür gerçek boşlukları bilinçli ertelemeden ayırıyor.

## 3. Eski → Önerilen kullanıcı metni (KÖKEN)
| Kanji | Mevcut (sorunlu) | Önerilen (kaynaklı) |
|---|---|---|
| 時 | "日 (güneş) + 寺 (tapınak): güneşle ölçülen zaman." | "形声: 日 anlamı (güneş/gün) verir; 寺 anlamıyla değil **okunuşuyla** katkı yapar → ジ sesi. 'Tapınak' öyküsü yalnız etiketli Hatırlatıcı'da." |
| 男 | "Tarlada güç harcayan: erkek." | "会意: 田 tarla + 力 (bugün 'güç'; kökende çoğu sözlükte tarım aleti/saban). İkisi: tarlada çalışan → erkek." |
| 明 | "Güneş ve ay: en parlak iki şey." | "İki tarihsel yazım (ikisi de 会意): 明=güneş+ay; 朙=ay+囧(pencere), pencereden ay ışığı. Sonra 明 standart oldu." |
| 月 | "Hilal şeklindeki ay resmi." | "Ayın piktogramı — dolunay değil incelen hilal; böylece dolu daire 日 ile karışmaz." (+ onyomi'ye ガツ) |
| 休 | "İnsan bir ağacın yanında: dinlenen kişi." | (KEEP) İsteğe bağlı: "…ağacın **gölgesinde** dinlenir." Hatırlatıcı köken cümlesini tekrarlamasın. |

## 4. Yöntem öz-QA (yöntemin kendisi tuttu mu?)
- **4-katman ayrımı iş gördü:** 明'de "yanlış değil ama eksik" ayrımını yakaladı ve cazip aşırı-düzeltmeyi ("日=囧") önledi. 時'de köken-katmanına sızmış hatırlatıcıyı ifşa etti.
- **Kontrol karakteri (休) doğru davrandı:** denetim doğru içeriği gereksiz yere yeniden yazmadı → KEEP. Yani sistem "her şeyi hata bul"maya şartlı değil.
- **DISAGREEMENT_NOTE ve HISTORICAL_FORMS_STATUS alanları hak ettiğini yaptı:** basit kanjilerde "—", zor olanlarda (男 力, 明 朙) gerçek iş. Kalıcı alan olmalılar.
- **Tutarlılık:** 5 ayrı ajan aynı şablonu üretti; normalize etmek kolay oldu. Yöntem 91'e ölçeklenebilir.
- **Zayıflık:** "source says vs my inference" ayrımı çoğu ajanda iyi ama bazı yerlerde yorum kaynak beyanına yakın yazıldı; 91 turunda bu ayrım daha katı zorlanmalı.

## 5. Kaynak kapsamı & maliyet (91'e ölçekleme riski)
- **Kanjipedia karakter sayfaları doğrudan çekilebiliyor** (etimoloji birincili = erişilebilir). 5/5 başarı.
- **文化庁 常用漢字表 PDF doğrudan çekilemedi** → okumalar jitenon/Wiktionary/Kanjipedia mutabakatıyla teyit edildi. **Bu bir kapsam bulgusu:** 91 öncesi okuma için erişilebilir güvenilir bir birincil kaynak (ör. jitenon karakter sayfaları sistematik) sabitlenmeli; sessiz ikame yapılmadı, işaretlendi.
- **Maliyet:** 5/5 karakter low–low-med; karakter başına ~2–3 fetch, ~2–3 dk; ajan başına ~45k token. **Ölçekleme kırmızı bayrağı yok.** 91 karakter, partiler halinde (ör. 8–10'luk gruplar) benzer derinlikte yapılabilir. 形声 karakterler fonetik-aile araştırmasıyla biraz daha pahalı.
- Metrikler: kritik iddiaların çoğu 2+ kaynak; tek-kaynak kalanlar ikincil önemde (力=saban nüansı, 朙 Shuowen notu); doğrulanamayan/tartışmalı = yalnız 1 gerçek (力'nin işlevi, disagreement olarak korundu).

## 6. v2 veri şeması — pilotla doğrulanan revizyonlar
Pilot, plandaki v2 şemasını doğruladı ve iki ekleme getirdi:
- `structure.modernComponents[].role` **zorunlu** (semantic/phonetic/form/empty/uncertain) — 時 bunsuz düzeltilemez.
- `mnemonic` ile `etymology` **ayrı string zorunlu** (aynı olamaz) — katman çökmesini şema seviyesinde engelle.
- `readings`: `officialReadings` + `taughtInApp` + `deferredReadings` + `deferReason` ayrı — 月/男 boşlukları bunsuz gizli kalır.
- `etymology.disagreementNote` + `historicalFormsStatus` kalıcı alan (男/明 için gerçek iş).
- `pictogram_note` alan adı **terk edilmeli** → `etymology.summaryTr` (+ `formationType`); "her kanji piktogram" varsayımı kalkar.
- GPT'nin `functional_components` / `visual_subcomponents` / `indexing_radical` üç düzeyi doğrulandı (語=言+吾 vs görsel 五+口 örneği hâlâ geçerli; pilotta 寺=土+寸 görsel alt-parça olarak kaydedildi).

## 7. Sıradaki karar (91 öncesi dur)
Pilot yöntemi sağlam. Öneri: **(a)** yöntemi bu haliyle onayla → 91'i partiler halinde tara; **(b)** 形声 kanjileri önce tara (P0 yoğunlaşması muhtemel orada); **(c)** okuma birincil kaynağını (erişilebilir) sabitle. Onaydan sonra ilk çıktı: 91-tam CSV + P0/P1 bulgular + v2 model önerisi. **Kod hâlâ değişmez** — uygulama ayrı bir faz (Migration penceresi).
