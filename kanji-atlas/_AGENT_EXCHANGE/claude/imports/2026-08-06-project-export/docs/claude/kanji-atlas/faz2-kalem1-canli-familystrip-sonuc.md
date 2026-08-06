# Faz 2 · Kalem 1 — İlk Canlı Tüketici (familyStrip) · Sonuç Raporu

> **Durum:** `faz2-kalem1` dalında (GitHub `zeynepbtc/apps`, `kanji-atlas/index.html`). Deploy'a (main) merge EDİLMEDİ, proje-doc kanonu güncellenMEDİ — **yeniden denetim bekliyor.** Geri alınabilir (baseline'a birebir döner).

## Ne değişti
Tek tüketici: `familyStrip`. Okuma önceliği **kanonik → yoksa legacy fallback → fallback raporlanır**. Eski `parent_components`/`kanjiFamily` **silinmedi** (`legacyFamilyStrip` olarak korundu). `FAMILIES_CANON` + resolver additive enjekte edildi (mevcut oyun `FAMILIES[]` ile çakışmasın diye adlandırma ayrıldı). Diff yalnız 2 blok.

## Kabul kriterleri — Playwright smoke (6 karakter)
| Kriter | Sonuç |
|---|---|
| 木 kök: Ağaç ailesi + [木 林 森 本 休] | ✓ |
| 林 tekrar · 本 işaret (pedagojik rol dili) | ✓ |
| 休 classification=İnsan, secondary=Ağaç | ✓ "Ana yapı bağlantısı: İnsan · Ayrıca bağlantılı: Ağaç" |
| 休 tek düğüm (çoğaltılmadı) | ✓ adet=1 |
| İlişki türleri enum adı değil, pedagojik dil | ✓ tekrar/işaret/birleşim/biçim/uzantı |
| 校 legacy fallback'e düştü + raporlandı | ✓ fallbackIds içinde |
| 東 木/Ağaç ailesine DÜŞMEDİ | ✓ temiz |

## Legacy fallback kapsamı (görünür teknik borç, hata değil)
- **Kanonik: 8/91 kanji** (人 大 天 木 林 森 本 休) · **legacy fallback: 83/91.**
- `__famStats = {canon, fallback, fallbackIds}` ile geliştirmede sayılıyor. Fallback oranı başlangıçta yüksek — beklenen; sonraki kalemler/aileler eklendikçe düşecek.
- Fallback başarısızsa: `try/catch` → şerit kontrollü şekilde görünmez, **ekran çökmez.**

## Parite & regresyon (Playwright)
- **Kanonik-dışı aile şeridi DEĞİŞMEDİ:** kontrol karakteri 夫 (kanonik değil) için şerit **eski==yeni birebir aynı** (legacy yol dokunulmadı).
- **Yan etki yok:** kana, words, quiz, review, drill, map, progress, kanadetail — hepsi çökmeden render.
- **Yeni JS exception yok** (offline CDN font yükleme hatası ortamsal, sayılmadı).
- **Geri alma:** commit öncesi sürüm = pre-edit baseline birebir → `git revert` eski davranışa tam döner.

## Sınır korundu
`FAMILIES_CANON` içerik/ses/ilerleme tutmuyor: meaning `DATA.chars`'tan, seviye `jlpt_level`'dan okundu; ilerleme yok. İki kaynak sessizce birleşmedi (kanonik açık öncelikli, fallback raporlu).

## Sıradaki (onay sonrası)
Kalem 1'in 2. canlı tüketicisi: **Detail ilişkileri** (`related_characters` yerine `FR.detailFamilyLinks`), yine kanonik→fallback→rapor + ayrı commit + smoke. Sonra grafik → liste → ilerleme.
