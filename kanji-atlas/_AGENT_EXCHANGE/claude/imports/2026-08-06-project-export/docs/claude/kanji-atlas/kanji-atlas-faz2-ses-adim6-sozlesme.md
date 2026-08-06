# Faz 2 · Ses Manifesti · Adım 6 — speak() Entegrasyonu Sözleşmesi (GPT RATİFİYE)

> GPT dört kararı da onayladı + incelikler ekledi. Brifing: `GPT-brifing-faz2-ses-adim6.md`.

## GPT'nin son hükmü (4 karar)
1. **Çağrı yüzeyi = A (açık kategori).** `audioBtn(text, category)` — kategori fonksiyon imzasında açık (yalnız DOM attribute'a güvenme); `data-audio-cat` üretilebilir. Kanonik **çözüm anahtarı = kategori + metin**. Manifest `id` = stabil pedagojik kimlik. B (doğrudan id) reddedildi (geniş migration).
2. **Dinamik/eşleşmeyen → ortam politikasına düşer** (dev TTS / release sessiz). Resolver sonuçları AYRIŞTIRILMALI: not-found / recorded / tts / missing / invalid / duplicate. Ayrım: dinamik not-found = beklenen; **sabit eğitim yüzeyi not-found = manifest bütünlük hatası (diagnostic)** — yoksa yanlış kategori/yazım TTS'le gizlenir.
3. **speak() minimal + geriye uyumlu, fallback açık.** Release'te TTS kaçağı YOK. Dosya adı manifest id'ye dönüşmez.
4. **Üç ayrı katman:** pedagojik id ≠ çözüm anahtarı (kategori+metin) ≠ dosya adı.

## Çözüm anahtarı sözleşmesi (yeni hard kural)
Her kategori+metin manifest içinde EN FAZLA bir entry'ye çözülür. 20 çapraz-kategori çakışması kategori sayesinde çözülür; kategori-içi duplicate = SIFIR.
- Uygulandı: GPT kuralı 4 cümle duplicate'ini yakaladı (2 kelime aynı cümleyi paylaşıyordu). Cümleler tekilleştirildi (78 to 74; manifest 335). manifest_check 7c kapısı korur. Duplicate resolver'da ilk seçilmez to dev diagnostic+TTS, release diagnostic+sessiz.

## QA-onay katmanı (release-gate BORCU, migration yok)
dogrulanmali:true kayıtlar (70 kanji + 52 kelime = 122) Flick romaji eşleşmesi; recorded görünse de qa:pending. Mevcut dogrulanmali alanı bu sinyali karşılar.
- development: pending recorded to file oynar + diagnostic.
- release: yalnız approved recorded to file; pending to sessiz. TTS sadece development'ta.
- Açık borç: release öncesi 122 kayıt bağlamca QA'lanır ya da release'te sessiz. recorded teknik varlığı fark pedagojik onay.

## Resolver + politika hattı
- buildAudioIndex(manifest) to kategori+metin haritası (duplicate=0).
- resolveAudioEntry(index, kategori, metin) to found/not-found/duplicate. Kategori yoksa çözmez (metinden tahmin YOK).
- Politika (resolveAudioPolicy genişletilir, qa-aware): resolution + durum + dogrulanmali + mode + surfaceKind to action(file/tts/silent) + diagnostic.

## Kabul testleri (GPT 15) — 6a saf, 6b entegrasyon
1. kanji+木 to kanji_ki. 2. word+木 to word entry. 3. 20 çakışma doğru ayrışır. 4. duplicate to ilk seçilmez. 5. sabit yüzey not-found to diagnostic. 6. dinamik not-found to dev TTS/release sessiz. 7. kategorisiz legacy dev kırılmaz, release TTS YAPMAZ. 8. recorded+dosya to file. 9. recorded+dosyasız to dev TTS/release sessiz. 10. tts/missing to dev TTS/release sessiz. 11. resolver saf+deterministik. [6b] 12. speak tek dal. 13. metinden kategori tahmini yok. 14. runtime fetch yok. 15. oynatma hatası to dev TTS/release sessiz.

## Plan (6a to 6b, ayrı commit)
- 6a saf: buildAudioIndex + resolveAudioEntry + qa-aware politika; harness 1-11. Enjekte tüketilmeden.
- 6b entegrasyon: audioBtn(text, category) + data-audio-cat; 8 yüzeye kategori; handler resolver+policy to file(relatif url)/tts/silent; surfaceKind. Canlı smoke 12-15 + gerçek oynatma enjekte sahte dosyayla (Atlas audio/ boş; 214 kopya release-öncesi).
- 47 kayıt listesi: 6b smoke'undan sonra kesin adlarla.

## Durum
Manifest duplicate düzeltmesi TAMAM (03ec679). Sıradaki: 6a resolver (saf, 1-11).
