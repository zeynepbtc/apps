# Kanji Atlas — Eksik Ses Kayıt Listesi (üretim kuyruğu)

> **Durum:** Faz 2 ses taşıması sonrası **manifestte `durum=missing` olan 47 kayıt** — runtime'ın gerçekten bulamadığı, dosya adları **sabitlenmiş** üretim açığı (varsayımsal değil). Flick'te karşılığı olmayan (yeni kayıt gereken) içerik.
> **Ölçüm:** 214 recorded taşındı (135 distinct dosya); **47 missing** (21 kanji + 26 kelime) burada. Cümleler (74) ayrı — şimdilik TTS, en son.
> **Kayıt akışı Flick ile aynı:** Narakeet/aynı ses hattı; net-sakin oku, aralarda ~1 sn sus; ffmpeg ile kırp/normalize; romaji adıyla `audio/kanji/` veya `audio/word/`'e koy; manifest `durum: missing → recorded` yapılır.

## ⚠ Kayıt öncesi optimizasyon notu (Rule 01 — ölç, sonra kaydet)
Bazı kelimeler **tek-kanji okunuşu** ve sesi **zaten kana kütüphanesinde var olabilir**: ör. `木` (ki) → `audio/kana/ki.mp3` mevcut; `半` (han) benzer. Bu kelimeler için **yeni kayıt yerine mevcut dosyaya yönlendirme** manifest'te yapılabilir (kayıt yükünü düşürür). Kayda başlamadan önce bu ~2-4 kelime işaretlenip manifest'te `recorded` + mevcut yola bağlanabilir. Karar Zeynep+GPT.

---

## Part K · 漢字 Kanji tek-okunuş (21) → `audio/kanji/`
> Temsilî okunuş (pedagojik): kanjiyi tanıtmak için seçilen tek okunuş. "Tüm okunuşları temsil eder" iddiası yok.

**Oku (sırayla, aralarında dur):**
```
だい. てん. おっと. はやし. とき. がく. おんな. おう. たま. えん.
きん. とし. ふん. はん. おとこ. とも. しょう. あと. せい. こう. でん.
```

| Söyle | Romaji | Anlam | Dosya |
|---|---|---|---|
| 大 だい | dai | büyük | dai.mp3 |
| 天 てん | ten | gök / cennet | ten.mp3 |
| 夫 おっと | otto | koca / eş | otto.mp3 |
| 林 はやし | hayashi | koru | hayashi.mp3 |
| 時 とき | toki | zaman / saat | toki.mp3 |
| 学 がく | gaku | öğrenmek | gaku.mp3 |
| 女 おんな | onna | kadın | onna.mp3 |
| 王 おう | ou | kral | ou.mp3 |
| 玉 たま | tama | mücevher / küre | tama.mp3 |
| 円 えん | en | yen / yuvarlak | en.mp3 |
| 金 きん | kin | altın / para | kin.mp3 |
| 年 とし | toshi | yıl | toshi.mp3 |
| 分 ふん | fun | dakika / bölmek | fun.mp3 |
| 半 はん | han | yarım | han.mp3 |
| 男 おとこ | otoko | erkek | otoko.mp3 |
| 友 とも | tomo | arkadaş | tomo.mp3 |
| 小 しょう | shou | küçük | shou.mp3 |
| 後 あと | ato | arka / sonra | ato.mp3 |
| 生 せい | sei | hayat / doğmak | sei.mp3 |
| 校 こう | kou | okul | kou.mp3 |
| 電 でん | den | elektrik | den.mp3 |

## Part W · 言葉 Kelime (26) → `audio/word/`

**Oku (sırayla, aralarında dur):**
```
ひとつ. ふたつ. みっつ. ごぜん. ごご. はん. おんなのこ. おとこのこ. てんき. き.
にほん. いきます. きます. みます. ききます. よみます. かきます. たべます. のみます. はなします.
かいます. やすみます. しろい. あかい. あおい. いくら.
```

| Söyle | Romaji | Anlam | Dosya |
|---|---|---|---|
| 一つ ひとつ | hitotsu | bir (adet) | hitotsu.mp3 |
| 二つ ふたつ | futatsu | iki (adet) | futatsu.mp3 |
| 三つ みっつ | mittsu | üç (adet) | mittsu.mp3 |
| 午前 ごぜん | gozen | öğleden önce | gozen.mp3 |
| 午後 ごご | gogo | öğleden sonra | gogo.mp3 |
| 半 はん | han | buçuk | han.mp3 |
| 女の子 おんなのこ | onnanoko | kız çocuk | onnanoko.mp3 |
| 男の子 おとこのこ | otokonoko | erkek çocuk | otokonoko.mp3 |
| 天気 てんき | tenki | hava durumu | tenki.mp3 |
| 木 き | ki | ağaç *(kana ki.mp3 zaten var — reuse aday)* | ki.mp3 |
| 日本 にほん | nihon | Japonya | nihon.mp3 |
| 行きます いきます | ikimasu | gitmek | ikimasu.mp3 |
| 来ます きます | kimasu | gelmek | kimasu.mp3 |
| 見ます みます | mimasu | görmek / bakmak | mimasu.mp3 |
| 聞きます ききます | kikimasu | duymak / dinlemek | kikimasu.mp3 |
| 読みます よみます | yomimasu | okumak | yomimasu.mp3 |
| 書きます かきます | kakimasu | yazmak | kakimasu.mp3 |
| 食べます たべます | tabemasu | yemek | tabemasu.mp3 |
| 飲みます のみます | nomimasu | içmek | nomimasu.mp3 |
| 話します はなします | hanashimasu | konuşmak | hanashimasu.mp3 |
| 買います かいます | kaimasu | satın almak | kaimasu.mp3 |
| 休みます やすみます | yasumimasu | dinlenmek | yasumimasu.mp3 |
| 白い しろい | shiroi | beyaz | shiroi.mp3 |
| 赤い あかい | akai | kırmızı | akai.mp3 |
| 青い あおい | aoi | mavi | aoi.mp3 |
| いくら | ikura | ne kadar (fiyat) | ikura.mp3 |

## Kayıt sonrası (script'le, elle değil)
1. Kaydedilen mp3'ler romaji adıyla `audio/kanji/` veya `audio/word/`'e girer.
2. Manifest: ilgili entry `kaynak: yeni → (kayıt)`, `durum: missing → recorded`; `dogrulanmali` bu yeni kayıtlar için **gerekmez** (kaynak doğrudan doğru okunuş).
3. `manifest_check.js` + `smoke_audio_migration.js` yeniden koşar; distinct dosya sayısı 135 + yeni kayıtlar kadar artar.
4. Release-gate: 47 tamamlanınca + 122 pending QA'lanınca release'e flip düşünülebilir.

## Kalan (bu listede DEĞİL)
- **74 cümle** → `durum=tts` (development'ta TTS, release'te sessiz). Kayıt en son, ayrı kalem.
- **122 pending** (70 kanji + 52 kelime) → dosya var ama **bağlamca QA** bekliyor (release-gate borcu).
