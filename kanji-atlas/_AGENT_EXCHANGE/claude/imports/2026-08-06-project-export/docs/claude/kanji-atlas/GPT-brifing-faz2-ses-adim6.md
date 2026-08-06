# GPT Brifing — Faz 2 Ses Manifesti · Adım 6 (speak() entegrasyonu · ID çözümü)

> Zeynep GPT'ye iletmek için. Adım 1-5 tamam; adım 6'nın tasarım kararı gerekiyor. Kod DEĞİŞMEDEN önce senin görüşün.

## Nerede kaldık (1-5 tamam, hepsi ayrı commit + test + rollback byte-identical)
1. `audio-manifest.json` — 339 kayıt (92 kana + 91 kanji + 78 kelime + 78 cümle). 214 recorded (Flick) · 47 missing · 78 tts. Şema: `id·kategori·metin·okunuş·ses_dosyası·kaynak·durum`.
2. Bütünlük harness (10 test) — recorded'ların hepsi gerçek Flick dosyasına ulaşıyor.
3. **Gömme** — `const AUDIO_MANIFEST` HTML'e build-time enjekte; 10 build kapısı; runtime fetch YOK; henüz tüketilmiyor.
4. **Yol normalizasyonu** — `words/`→`word/`, `sentences/`→`sentence/`; göreli-URL sözleşmesi (audio/ HTML kökünde) kanıtlandı.
5. **Ortam politikası** — `const AUDIO_MODE` + saf `resolveAudioPolicy(entry,mode)→file|tts|silent`; senin karar matrisin birebir; **speak() henüz bağlı değil**.

## Adım 6'nın çözmesi gereken problem (senin uyarının somut hali)
Manifest **kategori+metin** ile eşlenmeli. **Yalnız metin ile eşlemek BELİRSİZ:** ölçtük — **20 metin, `kanji` ve `word` kategorilerinde birlikte var** (人 木 本 水 山 川 百 千 万 半 今 雨 母 父 上 …). Örn. 木: `kanji_ki` (temsilî okunuş き) VE bir word kaydı. Yani "ses dosyası adı = pedagojik kimlik" yapıştırması burada gerçek bir çakışma üretir.

## Mevcut çağrı yüzeyleri (bugün metinle çağırıyor, kategori YOK)
| Yer | Çağrı | Kategori (bağlamdan) |
|---|---|---|
| Kanji Detail | `audioBtn(c.character)` | kanji |
| Kanji örnek | `audioBtn(e[0])` | word |
| Kana Detail | `audioBtn(k.character)` | kana |
| Kana örnek | `audioBtn(k.example.word)` | word |
| N5 kelime | `audioBtn(w.word_jp, url)` | word |
| Örnek cümle | `audioBtn(w.example_sentence_jp, url)` | sentence |
| Oyun/Quiz | `speak(label)`, `speak(R.speak)` | dinamik (manifestte yok) |

Ortak yol: `audioBtn` → `data-speak="metin"` (+ `data-audio="url"`); tıklama → `speak(text, el, url)`.

## Karar gereken sorular (senin görüşün)
1. **Çözüm anahtarını çağrı yüzeyi nasıl versin?**
   - **A (öneri):** `audioBtn`'e açık **kategori** parametresi → `data-audio-cat`. Resolver `(kategori, metin) → manifest entry`. ~8 çağrı yüzeyi kategori ekler; pedagojik `id` ayrı kalır; 20 çakışma çözülür.
   - **B:** Her çağrı yüzeyi doğrudan manifest **`id`** geçsin (`audioBtn(id)`), metinden tamamen ayrı. Daha büyük dokunuş; metin↔ses tam ayrışır.
   - **C:** Resolver kategoriyi ekran/bağlamdan çıkarsın (kırılgan — önermem).
2. **Dinamik etiketler** (oyun/quiz, manifestte yok): manifest eşleşmesi yoksa doğrudan politikaya düş (dev→TTS, release→sessiz)? (Öneri: evet.)
3. **speak() ne kadar değişsin?** (Sen "minimal" demiştin.) Öneri: `speak()` geriye-uyumlu kalır; opsiyonel `(kategori)` alır; manifest entry çözülürse `resolveAudioPolicy(entry, AUDIO_MODE)` → file/tts/silent uygular; çözülmezse mevcut davranış (TTS). Yani speak yeniden yazılmaz, **tek bir çözüm+politika dalı** eklenir.
4. **Kimlik ayrımı onayı:** pedagojik `id` (kanji_ki) ≠ çözüm anahtarı (kategori+metin) ≠ dosya adı (ki.mp3). Üçü ayrı katman, doğru mu?

## Claude önerisi (özet)
A + dinamik→politika + speak minimal dal. `audioBtn(text, cls, {cat})` → `data-audio-cat`; tıklama handler `(cat, text)` ile manifest entry çözer → `resolveAudioPolicy` → file (relatif url oynat) / tts (mevcut) / silent. Kategori olmayan eski çağrılar → çözülmez → mevcut TTS (kırılmaz). Ayrı commit + smoke (her çağrı yüzeyi doğru entry'ye çözülüyor mu; 20 çakışma doğru ayrışıyor mu; dev/release davranışı; speak backward-compat).

## Adım 6 sınırı (öneri)
Yalnız çözüm + politika bağlama. Yeni kayıt yok, Atlas `audio/` klasörü hâlâ boş (release-öncesi doldurulur) — bu yüzden adım 6 smoke'unda "dosya oynatma" testi **sahte/enjekte bir dosyayla** yapılır, gerçek 214 kopya adım 6 sonrası ayrı deployment. 47 kayıt listesi entegrasyon smoke'undan hemen sonra (kesin dosya adlarıyla).
