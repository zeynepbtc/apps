# Parti 12 · 万 来 西 — Ayrı QA Turu Raporu

**Tarih:** 2026-07-25 · **Drafted commit:** `faad7db` (branch `onboarding-b2-gate3`, push+SHA doğrulandı) · **Durum:** 3 kayıt `drafted` (KAPALI) · **reviewed VERİLMEDİ**

**AUTHORING-04**'te kilitlenen beş karar uygulandı ve **makine güvencesiyle** enforce edildi (aşağıda §5). Üç kayıt bağımsız kaynak turundan geçti.

---

## 0. B0 — üçü de boş
万 来 西'de etymology/pictogram_note/memory_hint_tr/mnemonic yok → drafted maliyeti **sıfır**.

---

## 1. Kaynak turu — ESAS + 説文 (hepsi fetch edilerek)

| Kanji | Kanjipedia (ESAS) | 説文解字 (漢典) | Sonuç |
|---|---|---|---|
| **万** | 0006573600 · 萬 için:「象形。**さそり（蠆(たい)）**の形にかたどる。**借りて**、数詞の「まん」の意に用いる。」 + 万'ın 「**萬の略字**」 olarak kullanıldığı | (萬)「**蟲也。从厹，象形。**」 + 段注「**叚借爲十千數名**」 | **UYUMLU** → **A** |
| **来** | 0007020500「旧字は、象形。**麦がのぎを張った形**にかたどる。**借りて**「くる」意に用いる。教育用漢字は省略形による。」 | (來)「周所受瑞麥來麰。一來二縫，象芒朿之形。**天所來也，故爲行來之來。**」 | **MEKANİZMA ÇATALI** → **B** |
| **西** | 0003852100「象形。**鳥の巣**の形にかたどる。**太陽がにしに傾くころに鳥が巣に帰ることから**、方角の「にし」の意に用いる。」 | 「**鳥在巢上。象形。日在西方而鳥棲，故因以爲東西之西。**」 | **BİREBİR** → **A** |

### 🔍 Yeni bulgu — 来'de mekanizma çatalı
Resim üzerinde **ihtilaf yok** (ikisi de buğday/başak). Ayrılık **anlam kaymasının mekanizmasında**:
- **Kanjipedia (modern):** yalnız 「借りて」 — ödünç, gerekçe vermez.
- **説文 (Han dönemi):** bir **anlam gerekçesi** verir — 「天所來也，故爲行來之來」 (*gökten gelen tahıl olduğu için gidip-gelmenin 來'si olmuştur*).

İkisi aynı olayı **farklı mekanizmayla** açıklıyor. En zayıf halka → **B**. Görünür metin ESAS'a uydu (ödünç); 説文'un "gökten gelen tahıl" gerekçesi **metne alınmadı** (ana akım değil + kaynak tartışması kullanıcı metnine girmez).

### ✅ 西 doğrulandı — ödünç kaydı değil
İki kaynak **hem resimde hem anlam bağında tam mutabık**: kuş yuvada; güneş batıdayken kuşlar tüner → "batı". 借りて hiçbirinde geçmiyor. Triage'ın "借りて kümesi" varsayımı yanlıştı — **triage ön hüküm değil, dördüncü kez** (母 指事 · 左 会意形声 · 会意形声 zaten vardı · şimdi 西 ödünç değil).

---

## 2. Terminoloji — ölçüldü (Zeynep'in sorusuna yanıt)
`summaryTr`'lerde eski-biçim/sadeleştirme ifadesi taşıyan **4 kayıt** ölçüldü:

| Kayıt | İfade | Bağlam |
|---|---|---|
| 円 (reviewed) | "**eski biçimi** 圓'dan gelir" + "**sadeleşmiş** hâlidir" | bütün-karakter sadeleştirmesi (省略形) |
| 九 (drafted) | "**Eski biçimi** … resimden gelir" | 旧字 |
| 読 (reviewed) | "**Eski biçimdeki** sağ parça" | 旧字 |
| 季 (reviewed) | "**kısaltılmış biçimidir**" | **BİLEŞEN** kısaltması (稚→禾) — farklı bağlam |

**Sonuç:** "**eski biçim**" = 旧字 için sabit (3 kayıt). Bütün-karakter sadeleştirmesi için **tek emsal 円'nin "sadeleşmiş"i**. "kısaltılmış" yalnız bileşen bağlamında kullanılmış.
→ **万'da "kısaltılmış yazımı" yerine "sadeleşmiş yazımı" seçildi** — 円 ile aynı aile, aynı terim. (Senin sorduğun ayrımın yanıtı bu.)

---

## 3. Görünür metinler (drafted)

| Kanji | summaryTr | Kalıp |
|---|---|---|
| **万** | "Bugünkü 万, eski biçimi 萬'ın **sadeleşmiş yazımıdır**. 萬, bir akrebin resmidir; sonradan 'on bin' anlamında **ödünç alınmıştır**." | ödünç (B) + sadeleştirme |
| **来** | "Bugünkü 来, **eski biçimi** 來'den gelir. 來, başak vermiş bir buğdayın resmidir; sonradan 'gelmek' anlamında **ödünç alınmıştır**." | ödünç (B) + sadeleştirme |
| **西** | "Bir kuş yuvasının resmidir. Güneş batıya eğildiğinde kuşların yuvalarına dönmesinden 'batı' **anlamı gelişmiştir**." | **anlam bağı** (ödünç DEĞİL) |

Üçünde de: ses gerekçesi **yok** · olumsuz kapanış **yok** (yanıltıcı görsel beklenti yok) · 120/120/111 kr (dengeli).

---

## 4. 万'ın üçüncü hattı — nereye konuldu (karar 3)
Kanjipedia 万 için **iki ayrı madde** veriyor: (A) 万'ın kendi kökeni **su mercimeği** (うき草) resmi + 「萬の略字」 olarak kullanımı · (B) 萬'ın kökeni (akrep + ödünç).
Zeynep kararı: bu hat **ne `summaryTr`'ye ne `disagreementNote`'a** girmez (ortada kaynak anlaşmazlığı yok, birleşen tarihçe var) → **authoring kaynak notu olarak `apply_authoring_12.js`'in başındaki yorumda korunuyor** (git'te kalıcı, DATA'da yok). Doğrulandı: `disagreementNote`'ta "su mercimeği/うき草" **geçmiyor**.

---

## 5. Makine güvenceleri — beş karar koda gömüldü
`apply_authoring_12.js` şu ihlallerde **hata verip durur**:

| Karar | Güvence |
|---|---|
| 1 — ses gerekçesi yasak | `summaryTr` **ve** `disagreementNote`'ta `sesi için\|benzer sesli\|sesi nedeniyle\|ses değeriyle…` yasak |
| 2 — olumsuz kapanış seçici | `göstermez\|resmetmez\|bağı yoktur` bu üç kayıtta yasak |
| 3 — 万'ın üçüncü hattı | `su mercimeği\|うき草` her iki alanda yasak |
| 4 — 西 ödünç değil | 西'de `ödünç` yasak; 万/来'de `ödünç alınmıştır` **zorunlu** |
| terminoloji | 万'da `sadeleş…` zorunlu; 万/来'de `eski biçim` zorunlu |

---

## 6. ⭐ MNEMONIC — üçü de `not_required` öneriliyor

**Önce ölçüm:** karışıklık ortakları uygulamada var mı? → **方 · 力 · 刀 · 未 · 末 · 米 · 酉 · 要 hepsi YOK.** `confusables` listesi (9 kayıt) **yalnız kana** içeriyor, hiç kanji yok. → Biçim-ayırt etme kancası için doğrulanabilir problem **kurulamıyor** (T3 düşer).

| Kanji | Karar | Gerekçe |
|---|---|---|
| **西** | not_required | **Köken anlamı zaten taşıyor** — "kuşlar akşam yuvaya döner → batı" başlı başına güçlü bir kanca |
| **万** | not_required | ↓ aşağıdaki yapısal not |
| **来** | not_required | ↓ aşağıdaki yapısal not |

**Emsal ölçüldü:** mevcut ödünç kayıtlarının **hepsi** `not_required` (四 五 六 七 八 東 校 何). Tutarlı.

### 🔍 Yapısal gözlem (aksiyon önerilmiyor — kayda geçsin diye)
**Ödünç kayıtlarda köken, tanım gereği bugünkü anlamı taşıyamaz.** 4-soru'nun 1. sorusu ("köken temel anlama doğrudan bağlanıyor mu?") bu sınıf için **sistematik olarak HAYIR**tır — 萬'ın akrebi "on bin"i, 來'nin buğdayı "gelmek"i açıklamaz. Yani 4-soru mantığı bu kayıtlarda `active`'e işaret ediyor.
**Ama:** anlamı bağlayacak her kanca **uydurma görsel hikâye** (`basis: visual_story`) olurdu ve politika bunun için **UI etiketi** ("Hatırlama ipucu — gerçek köken değildir") şart koşuyor; etiket kodda **yok** → yazılmaz.
→ Sonuç: ödünç kayıtlar, active'in en çok işe yarayacağı yer olmasına rağmen politika gereği `not_required` kalıyor. **Şimdi bir şey yapılması gerekmiyor**; ileride visual_story etiketi gündeme gelirse bu sınıf ilk aday olur.

---

## 7. Yan bulgu — 東'ün legacy `memory_hint_tr`'si reviewed kökeniyle çelişiyor
Ölçüldü: 東'ün `memory_hint_tr` alanı **"Ağacın ardından doğan güneş: doğu."** — bu tam da reviewed kökenin **reddettiği** folk etimolojidir (東'ün onaylı metni: *"…iki ucundan bağlanmış bir torbanın resmidir… 'doğu' anlamının torbayla bir bağı yoktur."*).
**Şu an zararsız:** `mnemonic.status = not_required` olduğu için render **edilmiyor**. Ama 東 bir gün `active`'e çevrilirse çelişen bir folk etimoloji yüzeye çıkar.
→ **EDITORYAL-UYUMLAMA-BEKLEYEN**'e eklendi. **Şimdi commit açılmadı.**
*(Ayrıca küçük: 九'da `mnemonic` alanı hiç yok — mnemonic alan konvansiyonundan önce drafted edilmişti. 九 açılırsa eklenir.)*

---

## 8. Editoryal kapı doğrulaması
3 kayıt `kokenOf`→null (KAPALI) · mnemonic `pending_review` · `disagreementNote` (説文 çatalı, 段注, triage notu) **sızmıyor** · components/component_meanings/pictogram_note/memory_hint_tr dokunulmadı · reviewedAt yok · beş karar güvencesi geçti.
`node --check` 0 hata · `generate --check` senkron, CONTENT_HASH **`b4b279475a4f495b`** · 4 suite: **401/401** · **83/83** · **0 başarısız** · **9/9**.

---

## 9. QA sonucu → Zeynep kararı

| Kanji | Oluşum | Conf önerisi | Kalıp | mnemonic |
|---|---|---|---|---|
| 万 | 象形 | **A** | ödünç + sadeleştirme | not_required |
| 来 | 象形 | **B** (mekanizma çatalı) | ödünç + sadeleştirme | not_required |
| 西 | 象形 | **A** | anlam bağı | not_required |

**DURULDU.** reviewed + reviewedAt verilmedi.

### ▶ Kararlar
1. **Confidence:** 万=A, 来=B, 西=A onaylanıyor mu?
2. **Onay:** üçü topluca reviewed açılsın mı?
3. **Terminoloji teyidi:** 万'da "sadeleşmiş yazımı" (円 ile aynı terim) kabul mü, yoksa senin ilk yazdığın "kısaltılmış yazımı" mı tercih edilir?
4. **Mnemonic:** üçü de not_required kabul mü?

---

## 10. Sıradaki
- Kalan boş **11:** 年 今 気 父 前 後 南 北 白 青 飲
- **Temiz üretim adayları (7):** 年 気 前 後 北 青 飲 → bir sonraki normal parti (Zeynep'in planı)
- 🔴 Kırmızı kuyruk: **白 · 今 · 父 · 南**
- ⏳ Harmonizasyon listesi **9 kaleme** çıktı (yeni: 借りて geriye dönük hizalama · 東'ün çelişen memory_hint)
