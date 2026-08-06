# Authoring — 32 Boş Kayıt Risk Taraması (üretim planlaması)

**Tarih:** 2026-07-25 · **HEAD:** `f9dc575` · **Amaç:** metin yazmadan, DATA değiştirmeden, commit üretmeden kalan 32 boş kaydı yeşil/sarı/kırmızı sınıflandırıp **en temiz Parti 7'yi seçmek.** Bu bir araştırma raporu değil; kayıt başına birkaç satır üretim planı.

> **Metod notu:** Oluşum türleri **BEKLENEN** değerlerdir — draft turunda Kanjipedia karakter sayfasından teyit edilecek (ESAS referans). 32 sayfayı şimdi çekmek verimlilik ilkesini bozardı; tarama, hangi partinin en düşük riskli olduğunu bulmak için yeterli.

## B0 ÖLÇÜMÜ (DATA.chars'tan, varsayım değil)
**32'nin hepsi gerçekten BOŞ** — hiçbirinde `etymology` yok, hiçbirinde `pictogram_note` yok, hepsi DATA'da. **Gizli legacy tuzağı YOK** (口/名'deki durum tekrarlanmıyor). Sonuç: **drafted penceresinin kullanıcıya maliyeti 32 kayıt için de sıfır** → drafted'da rahat bekletilebilirler. (Tek not: 外'de `components:["夕","卜"]` + `component_meanings` zaten dolu; 卜 var, 口 yok → サイ riski yok.)

## Sınıflandırma
🟢 = Kanjipedia'da net tek ana akım okuma, ciddi kaynak çatışması beklenmiyor, A/B ile hızlı kapanır.
🟡 = küçük yorum farkı ya da bilinen türetme nüansı (shinjitai / 借りて / çok bileşen); muhtemelen A/B, draft'ta bir kez bakılır.
🔴 = temel biçim/bileşen/anlam gelişimi gerçekten tartışmalı → ayrı tek kayıt turu, batch'e girmez.

| # | Kanji | key | Beklenen oluşum | Sınıf | QA riski / not |
|---|---|---|---|---|---|
| 1 | 土 | do | 象形 (toprak höyüğü) | 🟢 | "…resmidir" kalıbı. Shirakawa'da farklı (社/direk) ama Kanjipedia net → beklenen A/B |
| 2 | 母 | haha | 象形 (memeli anne figürü) | 🟢 | Evrensel ana akım. En temizlerden |
| 3 | 生 | sei | 象形 (topraktan biten filiz) | 🟢 | Net |
| 4 | 行 | iku | 象形 (dört yöne yol / kavşak) | 🟢 | Kanjipedia + Shirakawa aynı (kavşak) → çatışma yok |
| 5 | 友 | tomo | 会意 (又+又 iki el) | 🟢 | Bileşenler tartışmasız |
| 6 | 分 | fun | 会意 (八 böl + 刀 bıçak) | 🟢 | Şeffaf; 半 ile ortak 八 |
| 7 | 半 | han | 会意 (八 böl + 牛 öküz) | 🟢 | Şeffaf; 分 ile kardeş |
| 8 | 赤 | aka | 会意 (大 büyük + 火 ateş) | 🟢 | "Büyük ateşin rengi" — net |
| 9 | 先 | saki | 会意 (ayak + 儿 insan → önde) | 🟢 | Net |
| 10 | 書 | kaku | 形声 (聿 fırça=anlam + 者 ses) | 🟢 | Klasik 形声, ev kalıbı hazır |
| 11 | 百 | hyaku | 会意/形声 (一 + 白 ses) | 🟡 | Oluşum türü nüansı (会意 mı 形声 mi) |
| 12 | 千 | sen | 指事/形声 (人 + 一) | 🟡 | Tür nüansı |
| 13 | 金 | kin | 形声/会意 (metal + 今 ses) | 🟡 | Kategori "Günlük yaşam" (Cila'da düzeltilmişti); tür nüansı |
| 14 | 年 | toshi | 形声 (禾 ekin + ses → hasat → yıl) | 🟡 | Bileşen/tür nüansı |
| 15 | 円 | en | 形声 (円 = 圓 shinjitai) | 🟡 | **Shinjitai notu** gerek (yeni biçim ≠ eski 圓) |
| 16 | 気 | ki3 | 形声 (気 = 氣 shinjitai; 气 + 米) | 🟡 | **Shinjitai notu**; 米 düşmüş |
| 17 | 左 | hidari | 会意 (el + 工 marangoz gönyesi) | 🟡 | 右'nin eşi **ama 口 YOK → サイ riski düşük**; 右'dan ayrı ve daha kolay |
| 18 | 後 | ato | 会意 (彳 + 幺 + 夂 ayak) | 🟡 | Çok bileşen ama tartışmasız |
| 19 | 前 | mae | 会意 (ayak + kayık/刀) | 🟡 | Türetme biraz karmaşık; draft'ta netlik kontrolü |
| 20 | 食 | taberu | 会意/象形 (kapaklı yemek kabı) | 🟡 | Genelde net; 象形 mı 会意 mı nüansı |
| 21 | 飲 | nomu | 形声/会意 (食 + 欠 açık ağız) | 🟡 | 欠 = eğilmiş/açık ağızlı insan; 口/サイ sorunu YOK |
| 22 | 外 | soto | 会意 (夕 akşam + 卜 fal) | 🟡 | Kanjipedia net; bileşen verisi zaten var (卜, 口 değil) |
| 23 | 青 | ao | 形声/会意 (生 + 丹/井) | 🟡 | Alt bileşende (丹 mı 井 mi) hafif tartışma |
| 24 | 北 | kita | 会意 (sırt sırta iki kişi → sırt → ödünç kuzey) | 🟡 | İyi belgeli; "ödünç" anlam gelişimi notu |
| 25 | 万 | man | 象形→借りて (akrep resmi, ödünç) | 🟡 | **借りて sınıfı** (sayılar gibi) — Parti 4 ev üslubu geçerli |
| 26 | 来 | kuru | 象形→借りて (buğday, ödünç) | 🟡 | **借りて sınıfı** |
| 27 | 西 | nishi | 象形→借りて (kuş yuvası/süzgeç, ödünç) | 🟡 | **借りて sınıfı**; özgün nesne hafif tartışmalı |
| 28 | 今 | ima | 会意 (亼 örtü + ?) | 🟡→🔴 | Biçim/bileşen tartışmalı; draft'ta çatışma çıkarsa kırmızıya |
| 29 | 父 | chichi | 会意/象形 (elde balta/değnek → otorite) | 🟡→🔴 | Bileşen okuması tartışmalı |
| 30 | 南 | minami | 象形→借りて (çan/çalgı?, ödünç) | 🟡→🔴 | Özgün nesne gerçekten belirsiz |
| 31 | **右** | migi | 会意 (又/ナ el + 口) | 🔴 | **口 ≠ doğrudan ağız**: 説文「右、手口相助也」; サイ tartışması 名'den canlı. Ayrı tur |
| 32 | **白** | shiro | 象形 (tartışmalı) | 🔴 | Biçim kökeni ciddi ihtilaflı: palamut / tırnak / kafatası / gün doğumu / pirinç tanesi. Ayrı tur |

**Dağılım:** 🟢 10 · 🟡 17 · 🟡→🔴 3 (今 父 南) · 🔴 2 (右 白). **Boş 32 / legacy 0 / DATA'da yok 0.**

## ▶ PARTİ 7 ÖNERİSİ — 会意 şeffaf dörtlüsü/beşlisi: 分 半 友 赤 (+ 先)
**Neden bu grup (estetik değil, kaynak/QA temelli):**
- Hepsi **会意 + tartışmasız, şeffaf bileşenler**; hiçbirinde biçim-kökeni ihtilafı yok, 口/サイ yok, 借りて yok, shinjitai yok.
- **Ortak QA riski tek tip:** her bileşenin rolünü Kanjipedia'ya karşı doğrula, "…anlamı gelişmiştir" ev kalıbıyla yaz (男 emsali). Tek QA turu hepsini kapsar.
- 分 ↔ 半 **gerçek kaynak akrabalığı** (ortak 八 "bölme") — anlam benzerliği değil, yapısal ortaklık.
- B0 maliyeti sıfır (hepsi boş).
- Beklenti: hepsi **A/B**, gerçek çatışma çıkmayanlar **topluca reviewed** açılır.

**Eşit derecede geçerli alternatif — 象形 temiz-piktogram dörtlüsü: 土 母 生 行.** "…resmidir" kilitli kalıbı (口/目/耳/手/足'te kanıtlandı), en basit QA profili. Tek çekince: 土'nin Shirakawa'da azınlık alt-okuması var (Kanjipedia net, beklenen A/B). Bileşen-rol muhakemesi istemediği için 会意 dörtlüsünden bir tık daha hızlı olabilir.

> Hangisini istersin? İkisi de "ilk yeşil grup"tan; 会意 dörtlüsü kaynak-akrabalık (八) taşıdığı için önerim o, ama 象形 dörtlüsü en hızlı kapanabilecek olan.

## Kırmızı/geç kuyruk (batch'e girmez, ayrı tek kayıt turları)
- **右** — サイ/口 tartışması, 説文 dahi "ağız" demiyor. 名 sonrası doğal ama ayrı tur.
- **白** — biçim kökeni çok teorili; en dikkatli tur.
- **今 · 父 · 南** — draft'ta Kanjipedia netse 🟡 kalır, çatışma çıkarsa ayrı tura düşer. Batch'e alınmadan önce tekil bakılır.

## 借りて kümesi (万 来 西 + belki 南) — doğal ikinci-üçüncü parti
Ödünç-piktogram karakterleri tutarlı bir NON-estetik küme; ama **Parti 4'ten açık bir iş taşıyorlar**: 借りて için "sesi …" ev üslubu esas referanstan doğrudan okunmuyordu (九 QA'sı yakaladı). Bu tutarlılık kararı verilmeden 借りて partisi açılmamalı → yeşil partiden sonra.

## Sonraki adım
Bu tarama **plan**; hiçbir metin yazılmadı, DATA değişmedi, commit üretilmedi. Onayınla Parti 7 için (分 半 友 赤 [+先] **veya** 土 母 生 行) standart akış başlar: Kanjipedia → drafted → tek QA turu → DUR → topluca reviewed.
