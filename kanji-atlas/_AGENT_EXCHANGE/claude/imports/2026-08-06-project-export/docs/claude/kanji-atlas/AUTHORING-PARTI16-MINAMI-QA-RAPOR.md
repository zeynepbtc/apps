# AUTHORING · PARTİ 16 QA RAPORU — 南 (KIRMIZI KUYRUK TURU 2)

**Durum:** `qaStatus: drafted` — **kullanıcıya kapalı.** Commit **`db743d7`**, remote SHA doğrulandı.
Zeynep'in kararı (metin · yön · confidence) drafted'tan **önce** verildi; bu tur o kararı DATA'ya yazdı ve doğruladı. **Açık kalan tek kalem: mnemonic.**

## YAZILAN (henüz gizli)

> **"Asılı, çan biçiminde bir çalgının resmidir. Daha sonra 'güney' anlamında kullanılmaya başlanmıştır."** (99 kr)

`formationType` 象形 · `formationTypeSource` Kanjipedia · `confidence` **A** · `sources` Kanjipedia 0005406400 · `disagreementNote` 3.067 kr · `mnemonic` **pending_review**

---

## 1. ⭐⭐ BU TURUN ÜRÜNÜ: BEŞİNCİ KİLİTLİ İLKE — MEKANİZMA BELİRSİZLİĞİ

Tam metin: **AUTHORING-05-MEKANIZMA-BELIRSIZLIGI** (yeni belge). Özet:

> **Nesne üzerinde yeterli uzlaşı varsa, fakat anlamın hangi mekanizmayla bugünkü kullanımına ulaştığı konusunda güvenilir kaynaklar ayrışıyorsa, mekanizma görünür metne alınmaz. Görünür metin yalnız özgün biçimi ve bugünkü anlamı belirtir; geçiş mekanizması `disagreementNote`'ta korunur.**

**Neden çıkarılabilir ayrıntı testinin altına konmadı** (Zeynep): *"父'de 'balta mı değnek mi?' tek bir ayrıntıydı. Burada 'hangi tarihsel mekanizma?' — bu başka seviyede bir ayrışma."*

| | Çıkarılabilir Ayrıntı (父) | Mekanizma Belirsizliği (南) |
|---|---|---|
| Ayrışan | Nesnenin **kimliği** | Anlam değişiminin **tarihsel yolu** |
| Çıkarılınca | Nesne üst kategoriyle anılır ("bir alet") | Geçiş **hiç anlatılmaz** |
| Cümleye etkisi | Bir kelime genelleşir, yapı durur | Nedensellik cümlesi **komple düşer** |
| Kalıp | Mevcut kalıp korunur | **Yeni, üçüncü kalıp gerekir** |

### Üç kalıp artık ayrı
| Durum | Kalıp | Kayıtlar |
|---|---|---|
| Anlam bağı | *"…-den '[anlam]' anlamı gelişmiştir"* | 西 · 北 · 父 · 男 |
| 借りて | *"Sonradan '[anlam]' anlamında ödünç alınmıştır"* | 万 · 来 |
| **Mekanizma belirsiz** | *"Daha sonra '[anlam]' anlamında **kullanılmaya başlanmıştır**"* | **南** |

**Fiil kilitli:** "kullanılmıştır" **değil**, "kullanılmaya başlanmıştır" — Zeynep: *"bu 'ödünç aldı' demiyor, 'anlamı gelişti' demiyor; sadece tarihsel olguyu söylüyor."* Betikte guard var; serbest çeviri yapılamaz.

---

## 2. Beş kaynak — hepsi fetch edildi

| # | Kaynak | Oluşum | Nesne | Mekanizma |
|---|---|---|---|---|
| 1 | **ESAS** Kanjipedia 0005406400 | 象形 | çan biçimli çalgı, dala asılı | **anlam bağı** (güneyli halkların çalgısı) |
| 2 | 説文解字 卷六 | 形声 (从𣎵𢆉聲) | **yok** | kozmoloji (南=任) |
| 3 | Dong Chinese | 象形 | çan biçimli çalgı | **ödünç** (phonetic loan) |
| 4 | Wiktionary | 象形 | (a) asılı vurmalı çalgı · (b) Sagart 1988: ev cephesi | (b): evler güneye bakardı |
| 5 | OKJiten kanji150 | 会意 | 草+入り口+帆 | güney rüzgârı |

**Uzlaşı ölçümü:** nesne **3/5** (Kanjipedia + Dong + Wiktionary-a) → modern küme var, **ESAS içinde** · mekanizma **dört ayrı cevap** → yayın dışı.

Sıfatlar da çapraz destekli — uydurulmadı: **"asılı"** (Kanjipedia 木の枝に掛けた + Wiktionary *hanging*) · **"çan biçiminde"** (Kanjipedia 鐘状 + Dong *bell-shaped*).

**Not (abartılmadı):** 説文解字注 「按古南男二字相假借」 der — bu **南 ile 男 arasındaki** karşılıklı ödünçtür, çalgı→güney ödüncü **değildir**. Dong'un ödünç iddiasının delili sayılmadı; notta ayrıca işaretlendi.

---

## 3. Görünür metin kararları (altısı da notta kayıtlı)

1. **Fiil** "kullanılmaya başlanmıştır" — mekanizma iddiası taşımayan tek biçim.
2. **"Güneyli halkların çalgısı"** alınmadı — tek kaynaklı **ve** Dong tarafından aktif reddediliyor. (北'tan zayıf: 北'ta çelişen kaynak yoktu.)
3. **"Ödünç"** de yazılmadı — o da tek kaynaklı ve ESAS tarafından reddediliyor. Simetrik davranıldı.
4. **木の枝 (ağaç dalı)** adlandırılmadı — bugünkü 南'da görünmüyor; bilgi **"asılı"** sıfatına çevrildi (görünmeyen bileşen ilkesi).
5. **Oluşum türü çatalı** (象形 3 / 形声 1 / 会意 1) metne girmedi — teknik terim zaten girmez.
6. **Sagart'ın "ev cephesi"** önerisi azınlık görüşü olarak notta duruyor.

---

## 4. Confidence A — gerekçe

Yayımlanacak **iki** iddia: *asılı, çan biçimli bir çalgının resmi* (3/5, ESAS dahil) ve *bugün 'güney' anlamında kullanılıyor* (tartışmasız). İkisi de sağlam → **A**. Araştırmanın kendisi B/C sayılabilir; confidence **yayımlanan metni** ölçer (父 turunda kilitlendi, AUTHORING-03).

---

## 5. Makine güvenceleri (betikte)

`kullanılmaya başlanmıştır` **zorunlu** · `ödünç` **yasak** · `anlamı gelişmiştir` **yasak** · `halk|rüzgâr|yelken|ev cephe|kozmo|bitki` **yasak** · `çalgı` + `asılı` + `çan biçiminde` + `güney` **zorunlu** · `ağaç dalı` **yasak** · teknik terim/uygulamada olmayan karakter **yasak** · **rakip mekanizmaların ikisi de `disagreementNote`'ta yoksa betik durur.**

---

## 6. Doğrulama izi

`generate_data_chars.js --check` senkron ✓ · CONTENT_HASH **`ff4232ffb135a8b2`** · scaffold **401/401** · legacy_derived **83/83** · sources **0 fail** · durable_backend **9/9** · **`kokenOf(南)` → `null`** (gizli) ✓ · `reviewedAt` yok ✓ · legacy alanlar dokunulmadı ✓

---

## 7. ⏸ AÇIK KALEM — mnemonic (Zeynep kararı gerekli)

4-soru ön analizi (öneri, bağlayıcı değil):

| Test | Bulgu |
|---|---|
| T1 · Köken bugünkü anlamı taşıyor mu? | **HAYIR** — "çalgı → güney" bağı **kasıtlı olarak yayımlanmıyor**. Köken burada hafızayı taşımıyor. |
| T2 · Tek okumada canlanıyor mu? | Nesne canlanıyor, anlam bağı canlanmıyor. |
| T3 · Biçim kancası gerekli mi? | Karışıklık ortakları ölçüldü: 干 · 冂 · 羊 · 内 · 出 uygulamada **YOK**; 十 · 半 · 円 **VAR** ama karışma riski düşük. |
| T4 · Ayrı katman ekler mi? | Ekleyebilir — ama **her aday ya tarihsel iddia (T2 ihlali) ya etiketsiz visual_story olur.** |

**Önerim: `not_required`** — 気 emsaliyle aynı sınıf. Zeynep'in 気'de verdiği karar: *"kökenin bugünkü anlamı tam taşımaması, otomatik olarak active mnemonic gerektirmez. Kaynaksız bir görsel hikâye üretmek daha büyük sorun olur."* Burada mekanizmayı bilerek yayımlamadığımız için **kaynaklı bir bağ kurmak da mümkün değil**; `active` yazmak, yayın dışı bıraktığımız mekanizmayı arka kapıdan geri sokmak olurdu.

⚠️ Karşı görüş dürüstçe: 南 bir **yön** karakteri ve öğrenen "çalgı neden güney?" diye soracak. Boş bırakmak o soruyu cevapsız bırakıyor. Ama cevap **kaynakta yok** — uydurulamaz.

---

## 8. DUR

`reviewed` açılmadı. Mnemonic kararın gelince `apply_authoring_16_minami_reviewed.js` koşulur → regen → 4 suite → commit+push+SHA.
Sonra kırmızı kuyrukta: **今** → **白**.
