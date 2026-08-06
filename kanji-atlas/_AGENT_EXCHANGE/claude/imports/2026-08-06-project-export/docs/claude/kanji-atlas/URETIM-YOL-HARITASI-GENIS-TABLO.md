# Japonca Yazı Atlası — ÜRETİM YOL HARİTASI · Geniş Tablo (Production Manager)

> Amaç: her açık işi tek masaya yaymak, atlanan/dağınık maddeleri yakalamak, **App Store kabulü + editör-vitrini (featuring) kalitesi** hedefiyle faz-faz sıralamak.
> Kaynaklar taranarak birleştirildi: `DEVAM-NOKTASI-guncel` · `FAZ-O-oyun-revizyon-DURUM` · `BACKLOG-IA-icerik-pratik-kararlari` · `DENETIM-CHECKLIST-her-uygulama` · `kanji-atlas-cihaz-gerceklik-safe-area` · `pazar-arastirmasi-GPT-dersler-MASTER` · `GEZINTI-REVIZYON-BIRIKTIRME` · `SHARED-STANDARDS` · `ICERIK-DENETIMI-FAZ-I-bulgular`.
> Branch `onboarding-b2-gate3` @ güncel HEAD. Kilitli ürün ilkeleri (ALINMAYACAKLAR) korunur.

---

## ✅ BİTENLER (özet)
Onboarding · Home/Nav (floating overlay, whisper scrim, Flick hizası) · İç sayfa tutarlılık · Kanji vitrin (Atlas hero + raflar) · Veri kalıcılığı (yedekleme dışa/içe) · İçerik denetimi Faz İ · Kana SRS halkası (K1) · Dakuten modülü (K2) · **Faz O çekirdek oyun paketi** (Kanjiyi Oku · Kanji Atölyesi · Kanji Ayırt Etme · kelime oyunları · Hafızadan Çiz + mevcut Ses Avı/Katakana Şifreleri). Ara bug'lar: mnemonik-ağaç, Türkçe ş (onboarding), çift-dokun zoom, dakuten ses+açıklama, resume boşluğu.

---

## 🗺️ GENİŞ TABLO — tüm açık işler (kategorize)

### A) Küçük temizlik / hızlı kazanç (düşük emek, yüksek düzen)
| # | İş | Not |
|---|---|---|
| A1 | **Türkçe glif tam taraması** | Serif (Shippori) Türkçe ş/ğ/İ/ı taşımıyor; onboarding butonu düzeldi ama `.h1/.h2` serif başlıklar (ör. "Öğrenme Yolu", "Kanji Atlası") hâlâ risk. Tüm serif-Türkçe noktaları taranıp tutarlı çözülmeli. (Standart: Latin/TR sans, .jp Shippori.) |
| A2 | **İçerik denetimi 6 karar maddesi** | 国/王 bileşen, 大/小 kategori, 月 ガツ okuma, 気 sıra, atlas-bütünlük 14 eksik bileşen (`ICERIK-DENETIMI-FAZ-I-bulgular.md`). Onayınla uygulanır. |
| A3 | **Ölü CSS/kod temizliği** | `.levbar` (artık kullanılmıyor), Kana içindeki ölü `dakChip`, `.mbox/.home-band/.gate-card/.pcard/.snav-*`. "Çalışanı silme" ilkesiyle önce doğrula. |
| A4 | **Emoji → çizgi-ikon denetimi** | Standart "emoji YOK" (işlevsel 🔊▶←→ hariç). 🎉 vb. varsa temizle. |
| A5 | **Words ekranı ses butonu tutarlılığı** | Kontrol et (muhtemel mevcut). |

### B) İçerik & pedagoji derinliği (editör puanı)
| # | İş | Not |
|---|---|---|
| B1 | **Atlas bütünlüğü — 14 eksik bileşen** | 寺 禾 力 交 夕 儿 門 売 舌 貝 卜 可 电 网 DATA'ya radikal kaydı → aile grafiği tamamlanır + oyunlarda gerçek anlam ("parça" fallback biter). Orta iş. |
| B2 | **Yōon (küçük kana) modülü** | Dakuten gibi puan-takipli/etkileşimli yapıya çevir (şu an salt referans). |
| B3 | **Yazı Mantığı → Dojo Kapısı** | Tasarım hazır (`YAZI-MANTIGI-HUB-REVIZYON-tasarim.md`); kana-about/kanji-about render+rota silme burada. |
| B4 | **Terminoloji / içerik-dili turu (R7)** | Yapay Türkçe, CTA tutarlılığı, "radikal" gevşek kullanımı → ayrı içerik review (kilitli dil: bileşen·parça·aile·ortak yapı). |
| B5 | **İçerik editoryal** | örnek kelime QA, doğal cümleler, güvenilir köken açıklamaları, benzer karakter rehberleri. |

### C) Oyun sistemi (Faz O kalanı)
| # | İş | Not |
|---|---|---|
| C1 | **Çok boyutlu ölçme (SRS)** | GPT'nin en önemli notu: SRS kaydını recognize/produce/read/write/discriminate boyutlarına genişlet. En büyük altyapı; oyun önerilerini akıllandırır. SRS invariantlarına dikkat. |
| C2 | Ses Avı'nı genişlet | "kelimeyi duy → eksik kanayı yerleştir" (küçük っ/dakuten); opsiyonel süre (can kaybı YOK). |
| C3 | Mahjong'u dönüştür | rastgele değil SRS-zayıflarından kart. Ana oyun olmasın. |
| C4 | MC "ustalık" saymasın | çoktan-seçmeli tek doğru mastery yükseltmesin (C1 ile birlikte). |

### D) Görsel sistem (vitrin/featuring kalitesi)
| # | İş | Not |
|---|---|---|
| D1 | **RENK REVİZYONU (bütünsel)** | Zeynep KİLİT: "parça parça renk değiştirmek istemiyorum." Kana·Kanji·Oyunlar·kart yüzeyleri·accent·nav seçicisi HEP BİRLİKTE Flick renk ailesine. Tek bütünsel karar. |
| D2 | **GECE MODU (dark mode)** | D1 ile birlikte yapılmalı (token seti + kontrast tek elden). Ayrı büyük iş. |
| D3 | Nav ikonları → birebir Flick şekilleri | Flick alt-nav ikon görseli gerekiyor. |
| D4 | Design System v1.0 | `--safe-top/--safe-bottom` token'ları, renk/tipografi/ikon tek kaynak. |

### E) Erişilebilirlik & cihaz gerçekliği (App Store ŞART)
| # | İş | Not |
|---|---|---|
| E1 | **Tam erişilebilirlik denetimi (WCAG AA)** | Kontrast ölçümü, dokunma hedefi ≥44px, VoiceOver/TalkBack etiketleri, focus sırası, `prefers-reduced-motion`, Dynamic Type/metin büyütme. App Store için şart. |
| E2 | **Gerçek cihaz matrisi testi** | Çentikli iPhone, Dynamic Island (14/15/16 Pro), SE/çentiksiz, punch-hole Android, landscape. Safe-area kodla var; **gözle doğrulanmadı.** (Zeynep — telefon.) |
| E3 | Reduced-motion | Animasyonlar sadeleşiyor mu. |

### F) Kalıcılık & veri (güven)
| # | İş | Not |
|---|---|---|
| F1 | **Migration gerçek-blob testi** | Prod v2 blob DevTools ile staging'e; doğru göç. (Güvenlik: blob Claude'a gelmez.) |
| F2 | Kalıcılık üst sürümü | Bulut senkron / her-save otomatik yedek (şu an manuel export var). P3 ama editör/güven artısı. |

### G) Store & yayın (Apple dev kabulü)
| # | İş | Not |
|---|---|---|
| G1 | **NATIVE SARIM (kritik gate)** | App Store saf PWA/web app KABUL ETMEZ. Tek-dosya HTML native kabuğa sarılmalı (Capacitor/WKWebView vb.). "Apple dev tarafından kabul" bunun üstünden geçer — en büyük yapısal adım. |
| G2 | Release QA checklist | `DENETIM-CHECKLIST-her-uygulama.md` baştan sona çalıştır (safe-area, font, a11y, ses, veri, build). |
| G3 | Store varlıkları | İkon seti (cila), splash, 5-8 ekran görseli, **feature graphic (var: `featuregraphic1024x500.png`)**, kısa tanıtım videosu, açıklama + anahtar kelimeler. |
| G4 | **Gizlilik "nutrition label" + veri toplamıyor** | Dürüst + güçlü satış noktası (editör sever). Privacy politikası + destek/iletişim sayfası (App Store şart). |
| G5 | Analytics/crash (opsiyonel) | Editör kalitesi; gizlilik ilkesiyle çelişmeyecek minimal. |

### H) İleri / büyüme (P3)
Çoklu dil (i18n · **dil seçenekleri** UI: TR/EN) · gelişmiş özel listeler/desteler · koleksiyon/rozet (cezasız) · ileri JLPT (N4+) · bağımsız fırça uygulaması.

### ⛔ ALINMAYACAK (kilitli ürün ilkesi)
Streak kaybetme · sert günlük kanji limiti · "Unutuldu" mastery etiketi · enerji/can sistemi · zorunlu günlük görev · yapay içerik kapıları.

---

## 🧭 ÖNERİLEN FAZ SIRASI (production manager)

**Faz P0 — Ship-blocker temizlik & sağlamlık** *(önce bunlar; hepsi düşük-orta risk, deploy edilebilir)*
1. A1 Türkçe glif taraması · A3 ölü CSS · A4 emoji · A5 Words ses (hızlı kazançlar)
2. A2 + B1 içerik 6 madde + atlas 14 bileşen (içerik doğruluğu + oyun kalitesi birlikte)
3. F1 migration gerçek-blob testi (veri güvenliği)
4. E2 cihaz matrisi + E1 erişilebilirlik denetimi (**App Store şartı**)
5. G2 release QA checklist bir tur

**Faz P1 — Editör-vitrini kalitesi** *(featurable yapan katman)*
6. **D1 + D2 birlikte:** bütünsel renk revizyonu + gece modu (tek token/kontrast kararı) — Zeynep yön verince
7. C1 çok boyutlu ölçme (akıllı SRS) + C4 · C2 Ses Avı · C3 Mahjong
8. Boş/hata/offline/yükleme durumları · haptik + çizim ses geri bildirimi (P1)
9. B2 Yōon modülü · B3 Dojo Kapısı · B4 terminoloji turu

**Faz P2 — Native + Store gönderim**
10. **G1 native sarım** (App Store gate) — teknik karar + kurulum
11. G3 store varlıkları · G4 gizlilik/destek · G5 analytics (ops.)
12. Staged release → geri bildirim

**Sonra (P3):** F2 bulut senkron · H çoklu dil / dil seçenekleri · ileri içerik.

---

## ⚡ "Şu an en pratik" (bugün başlanabilir, hızlı kapanır)
A1 (Türkçe glif taraması) → A3 (ölü CSS) → A4 (emoji) → A2 (içerik 6 madde, onayınla) → A5 (Words ses). Bunlar deploy edilebilir küçük kazançlar; büyük fazlara (renk+dark, native) girmeden ürünü cilalar.

## Notlar
- **En büyük iki yapısal iş:** G1 native sarım (Store gate) ve D1+D2 renk+dark (bütünsel). İkisi de Zeynep kararı gerektirir.
- **App Store kabulü** teknik olarak G1'e, **editör-vitrini** ise D1/D2 (görsel bütünlük) + E1 (a11y) + G4 (gizlilik dürüstlüğü) + içerik derinliğine (B) bağlı.
