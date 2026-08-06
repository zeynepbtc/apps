# Kanji Atlas (Japonca Yazı Atlası) — STUDIO BOARD

> **Studio OS** (`claude/STUDIO-OS.md`) üretim hattının Kanji Atlas'a uygulanışı. Kaynak: proje CANON belgesi (japonca-yazi-atlasi.html doğruluk kaynağı). Durum: 🟢 tamam · 🟡 devam · ⚪ başlanmadı · 🔴 engelli · ⚫ arşiv.
>
> **Konum:** Atlas olgun, kararlı, sevkedilebilir bir eğitim aracı (kana + N5 kanji; Atlas = bileşen/anlam/aile ilişkileri). Üretim hattında **geç üretim / canlı-öncesi derinleşme** aşamasında — yeni ekran değil, derinleştirme.

---

## ✅ FAZ 2 KOD TARAFI KAPANDI (2026-07-20)
> Ses manifesti+politika+taşıma → oyun/dinamik yüzey kayıtlı ses → **ölü kod temizliği** (6 JS + 76 CSS, 3-kapı: statik + otomatik suite + **telefon smoke** "temiz çalışıyor"). Faz 2'nin tüm KOD kalemleri bitti. Kalan tek iş: ⭐ ses kayıtları (aşağıda) → release modu → main merge.

## ⭐ AÇIK STÜDYO İŞİ (Zeynep) — SES KAYITLARI  ·  hatırlatılacak
> **Kod tarafı hazır**; ses boru hattı (manifest → politika → oynatma → oyun/dinamik yüzeyler) cihazda doğrulandı. Kalan iş **içerik = kayıt**, Zeynep'in stüdyo tarafı. Bitene kadar release modunda pending/eksik kelimeler SESSİZ kalır. Bu satır iş bitene kadar burada durur.
>
> 1. **122 pending kaydın QA'i** — Flick'ten taşınan `dogrulanmali:true` kayıtlar (bağlam/okunuş doğrulaması). Onaylanınca release'te de çalarlar.
> 2. **74 örnek cümle kaydı** — şu an hepsi TTS; kayıt gelince recorded'a döner.
> 3. **47 eksik kayıt** — liste hazır: `kanji-atlas-ses-eksik-kayit-listesi.md` (Flick seslendirme formatında).
> 4. Hepsi girince → **release moduna geçiş** (`AUDIO_MODE="release"`) → `faz2-kalem1` → **main merge**.
>
> **Önizleme (test):** `zeynepkaya.app/kanji-atlas-preview/` — güncel build (oyun kayıtlı ses düzeltmesi + ölü kod temizliği) deploy edildi; telefon smoke GEÇTİ.

---

## Özet tablo

| # | Aşama | Durum | Sorumlu | Not |
|:--:|---|:--:|:--:|---|
| 00 | Vision Lock | 🟢 | Z | Vizyon/ilke/kapsam kilitli (§1–3 CANON); premium sakin, öner-kısıtlama yok |
| 01 | Product DNA | 🟢 | Z+C | Sakin premium · 3-katman · eşit ağırlık · kişisel veri korunur · faz disiplini |
| 02 | Experience Pillars | 🟡 | Z+C | "Yalnız değil, bir ailenin parçası" hissi örtük; resmî sütun yazılmadı |
| 03 | Market Research | 🟡 | C | Farklılaştırıcı (aile/kök keşfi) net; resmî rakip tablosu yok |
| 04 | Tech Feasibility | 🟢 | C | Tek dosya · DATA literal · speak() · ~5550 satır (temizlik sonrası) kanıtlı |
| 05 | Risk Register | 🟢 | Z+C | §8: localStorage kalıcılık · barındırma · TTS · içerik kalitesi · dosya boyutu |
| 06 | Game/Interaction Design | 🟢 | Z+C | Çizim sistemi · Kana Okulu · Atlas gezinme · aile şeridi |
| 07 | Education Design Doc | 🟢 | Z+C | 3-katman kanji (köken/neden/hafıza) · kana · aile · ustalık |
| 08 | Curriculum Map | 🟡 | Z+C | Kana tam; N5 kanji "neden böyle" 45 adet — kalan N5 sürüyor |
| 09 | Content Database | 🟡 | C | DATA (chars/hiragana/katakana/confusables/words) canlı; içerik derinleşmesi sürüyor |
| 10 | Visual Bible | 🟢 | Z | zeynep-mobile-product-design · token · Shippori · sakin premium |
| 11 | Audio Bible | 🟡 | Z+C | speak() TTS çalışıyor; pro ses dosyaları + seviye/mastering standardı yok |
| 12 | UI Kit | 🟡 | C | render()/R + bileşenler var; resmî kit değil |
| 13 | Vertical Slice | 🟢 | Z+C | Çoktan aşıldı — tam uygulama canlı |
| 14 | Core Systems | 🟢 | C | state · localStorage · migration guard · route · SRS (kanji) · ses manifesti+politika |
| 15 | Content Pipeline | 🟡 | C | İçerik DATA düzenlenerek ekleniyor; tam otomatik hat değil |
| 16 | Art Pipeline | 🟡 | Z | IKON-SISTEMI-notlari var; manifest/export standardı gevşek |
| 17 | Audio Pipeline | 🟡 | Z+N | **Manifest+politika+taşıma+oyun entegrasyonu KOD tarafı bitti (Faz 2). Kalan: kayıt/QA — ⭐ üstteki açık iş.** |
| 18 | Implementation | 🟢 | C | Olgun, sevkedilebilir; ölü kod temizliği (Faz 2) tamam; bilinen bug yok |
| 19 | QA | 🟢 | Z+C | Yönlendirme/ses/veri bütünlüğü denetlendi (node --check + DATA JSON + smoke suite + telefon smoke) |
| 20 | Store Preparation | ⚪ | Z | Web-öncelikli; mağaza yolu izlenirse açılır |
| 21 | Soft Launch | 🟡 | Z | Cihaz smoke + ses oyun düzeltmesi + temizlik telefon smoke GEÇTİ ("temiz çalışıyor") |
| 22 | Feedback Triage | 🟡 | Z+C | Tutarsızlıklar kullandıkça toplanıp toplu düzeltiliyor |
| 23 | Roadmap Board | 🟢 | Z+C | Bu belge + CANON §7 |
| 24 | Session Review | 🟢 | C | Ritüel kurulu |

**Kaba ilerleme:** 10 🟢 · 12 🟡 · 2 ⚪ · 0 🔴.

---

## KILL CHECK
İlk oynanabilir sürüm **çoktan çıktı** — Atlas canlı ve sevkedilebilir. Kill Check geçmişte kaldı; şu an odak *derinleştirme + gerçek kullanım testi*, yeni kapsam değil. Dosya ~5550 satır (temizlik sonrası); çok büyürse bölme (12/14) düşünülür.

---

## Sıradaki en kritik adımlar (CANON §7 yol haritasıyla)
1. **⭐ Ses kayıtları (17)** — Zeynep stüdyo işi (122 QA + 74 cümle + 47 eksik). Üstteki açık iş kutusu. **Bu tamamlanmadan release olmaz.** → sonra release modu → main merge.
2. ~~Önizleme cihaz testi~~ ✅ GEÇTİ (oyun/dinamik ses `018d281` + temizlik `b121261` telefonda "temiz çalışıyor").
3. ~~Ölü kod temizliği~~ ✅ KAPANDI (`b121261`; 6 JS + 76 CSS; 3-kapı).
4. **Kana SRS (14)** — Faz 2 dışı büyük kalem; kanjide var, kanada yok.
5. **Words ekranına ses butonu (11)** — küçük tutarsızlık.
6. **Aile Şeridi v2 (06)** — yukarı taşı / teste bağla / Atlas grafiğine bağla (kullanım sonrası karar).

---

## §S — Oturum kapanışı (aşama 24)
Studio OS §24 şablonu; kapanışta durum ikonlarını güncelle · GUNLUK'a [atlas] satırı · kod değiştiyse commit + SURUMLER. Atlas kuralı: **HTML güncel gerçektir**; belge çelişirse HTML kazanır.

*Studio OS: claude/STUDIO-OS.md · Kaynak: japonca-yazi-atlasi.html (CANON) · IKON-SISTEMI-notlari · proje-gunlugu-sistemi.*
