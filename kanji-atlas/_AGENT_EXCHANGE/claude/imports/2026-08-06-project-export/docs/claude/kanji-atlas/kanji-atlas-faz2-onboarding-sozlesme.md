# Faz 2 · Onboarding — Tercih/Sonuç Sözleşmesi

> **Sorun (Faz 1):** `ob-finish` herkesi koşulsuz `あ`'ya düşürüyor; toplanan seviye/stili yok sayıyor. **Çözüm:** niyet sakla (ekran adı değil), yönlendirmeyi resolver türetsin. **Faz 2'de yeni kişiselleştirme sistemi üretilmez** — mevcut `OB_LEVELS` verisi kullanılır.

## Eşleme: mevcut OB_LEVELS (4) → entryPath (3) → rota
| Onboarding seviyesi (var olan) | entryPath (kalıcı niyet) | resolveEntryRoute → ekran |
|---|---|---|
| beginner ("Hiç dokunmadım") · a_few ("Birkaç harf") | `kana` | `kanadetail` / あ (kana başlangıcı) |
| hiragana ("Hiragana biliyorum, **kanjiye girmek istiyorum**") | `kanji-family` | `detail` / ki (**木 vitrini**) |
| explorer ("Karıştırmayı seviyorum, **sen yönlendir**") | `explore` | `map` (Atlas keşif) |
| eksik / tanınmayan | `kana` (güvenli varsayılan) | `kanadetail` / あ |

## Kalıcı sonuç vs yalnız-yönlendirme
- **Kalıcı sonuç (storage'da kalır):** `onboarding.completed`, `name`, `motivation`, `level`, `style`, **`entryPath`** (niyet).
- **Yalnız yönlendirme (SAKLANMAZ):** `resolveEntryRoute(entryPath)` → ekran. Ekran adları değişirse kullanıcı verisi migrate edilmez (niyet sabit kalır).

## Yaşam döngüsü sözleşmesi (GPT ratifikasyonu · KİLİTLİ)
- **M1 — `entryPath` tek kullanımlık yönlendirmedir.** `entryPath`, **onboarding tamamlanma eyleminde bir defalık** ilk yönlendirme üretir (`ob-finish` → `resolveEntryRoute` bir kez). Normal uygulama açılışı veya oturum devam ettirme (resume) davranışını **değiştirmez**; sonraki açılışlarda `entryPath` **otomatik tüketilmez**. Kalıcı ana sayfa tercihi değildir — mevcut bootstrap (`completed → home`) davranışı korunur.
- **M2 — Eski `completed:true` kullanıcıya zorunlu `entryPath` üretilmez.** `onboarding.completed === true` + `entryPath === undefined` **geçerli** kabul edilir. Migration bu kullanıcıya sessizce `entryPath:"kana"` **eklemez**; kullanıcı yeniden onboarding'e gönderilmez, otomatik `kana`ya yönlendirilmez, mevcut normal açılış davranışını korur. `kana` güvenli varsayılanı **yalnız aktif onboarding bitirme anında**, seçili `level` eksik/tanınmıyorsa geçerlidir; eski completed kullanıcıya geriye dönük başlangıç rotası atanmaz.
- **Çağrı-bağlamı ayrımı:** güvenli varsayılan resolver içinde olsa bile esas güvenlik **resolver'ın ne zaman çağrıldığındadır.** Aktif onboarding bitirme → tanınmayan niyet `kana`ya düşebilir. Normal bootstrap → resolver **hiç çağrılmaz.**

## Resolver saflığı (KİLİTLİ)
`deriveEntryPath(level) → "kana"|"kanji-family"|"explore"` ve `resolveEntryRoute(entryPath) → {screen, param}` **saf** kalır: state'e yazmaz, navigasyon yapmaz, progress değiştirmez, yalnız sonuç döndürür. `ob-finish` bu sonucu kullanarak state kaydı + navigasyon orkestrasyonunu yapar.

## `style` kararı
`style` (adım/oyun/karışık) mevcut uygulama davranışını **hiçbir yerde değiştirmiyor.** Bu yüzden **rota kararına sokulmuyor** — yalnız gelecekte kullanılmak üzere saklanıyor. Onboarding'den kaldırma sonraki tasarım kararına (Faz 3) devredildi. (Aynı şekilde `motivation` yalnız saklanıyor.)

## Sınırlar (kilitli)
1. `ob-finish` koşulsuz `あ` seçmez. 2. Yönlendirme yalnız onboarding sonucundan (`entryPath`) türetilir. 3. Kullanılmayan `style`/`motivation`'a sahte önem verilmez. 4. Başlangıç rotası **kullanıcı ilerlemesi sayılmaz** (learned/srs'e yazılmaz). 5. Kullanıcı sonradan tüm bölümlere serbest erişir. 6. Onboarding tekrar açılırsa öğrenme verisi sıfırlanmaz. 7. Eski `completed:true` kullanıcıların migration sonucu değişmez. 8. Bu kalemde yeni onboarding seçeneği eklenmez, görsel tasarım değişmez, `style` tabanlı kişiselleştirme yapılmaz, eski kullanıcı açılış davranışı değiştirilmez.

## Test kartı (9)
1. Her üç entryPath doğru hedefe gider.
2. Sonuç (entryPath) yeniden yüklemede korunur.
3. `ob-finish` ilerleme verisini (learned/srs/userHints/games/cipher) değiştirmez.
4. Eksik/tanınmayan `level` → güvenli varsayılan (kana) — **yalnız aktif bitirme anında**.
5. Eski `completed:true` yeniden onboarding'e atılmaz.
6. Re-onboarding `userHints/srs/learned/cipherLearned` korur.
7. Hedef ekran geçersizse ana ekrana güvenli düşüş — hem bilinmeyen `entryPath` hem de **resolver'ın döndürdüğü ekranın route registry'de (R) bulunmaması** senaryosu.
8. **`entryPath` tek kullanımlık:** onboarding tamamla → ilk yönlendirme (ör. detail/ki) → reload → normal başlangıç/resume çalışır, kullanıcı tekrar o rotaya **zorlanmaz** (M1 kanıtı).
9. **Eski completed kullanıcı korunur:** `completed:true` + `entryPath` yok → onboarding açılmaz, sessizce `entryPath:"kana"` eklenmez / rota olarak tüketilmez, `kanadetail/あ`ya zorlanmaz, normal açılır (M2 kanıtı).
