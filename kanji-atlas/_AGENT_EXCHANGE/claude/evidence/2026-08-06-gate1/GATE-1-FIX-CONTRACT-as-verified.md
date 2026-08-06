# Claude Görev Sözleşmesi — Gate 1 Düzeltmeleri

Tarih: 2026-08-06  
Hazırlayan: Codex  
Uygulayan: Claude  
Denetleyen: Codex  
Durum: **READY**

## Hedef

Birleştirme öncesinde yalnızca doğrulanmış, düşük riskli içerik/ses ve görünüm kusurlarını düzeltmek. Bu görev yayın, merge veya klasör taşıma yetkisi vermez.

## Kapsam

1. `明` kaydının öğrenme bağlamına uygun romaji ve ses referansını düzelt.
2. `晴` kaydının öğrenme bağlamına uygun romaji ve ses referansını düzelt.
3. Yanlış `話 → hana → hana.mp3` ek manifest kaydını düzelt veya güvenli biçimde kaldır; doğru `話す/hanasu` ve `話/hanashi` ayrımını koru.
4. Boş köken metninde başlık ve kartın hiç üretilmemesini sağla; `null`, boş dize ve yalnız boşluk aynı gizli sonucu vermeli.
5. Tekrar ekranındaki düğmede tek bir `style` niteliği üret; devre dışı görünümünü koru.
6. `日.n5_words` içindeki yinelenen `nichiyoubi` öğesini teke indir.

## Kapsam dışı

- `pictogram_note` yayın politikası
- Test paketinin yeniden kurulması
- `prefers-reduced-motion`
- Landing bağlantısı, merge, deploy
- Native/App Store/Google Play işleri
- Genel refactor veya biçim değişikliği

## Kabul ölçütleri

- `明`, `晴` ve `話` için içerik ile manifest arasında yanlış dosya/okunuş eşleşmesi kalmaz.
- Manifestte `metin: "話", okunus: "hana"` kaydı kalmaz.
- Boş veya yalnız boşluk içeren köken değeri ekranda kart üretmez.
- Review düğmesinin HTML çıktısında aynı etikette iki `style` niteliği bulunmaz.
- `nichiyoubi` ilgili listede tam bir kez bulunur.
- Mevcut ses dosyalarının hiçbiri sessizce yeniden üretilmez veya üzerine yazılmaz.
- Değişiklikler dar kapsamlı commit(ler) halinde, test komutları ve ham sonuçlarıyla teslim edilir.

## Claude teslim formatı

Claude aşağıdakileri `_AGENT_EXCHANGE/claude/reports/` altında tek raporda sunmalı:

- başlangıç ve bitiş commit kimliği
- değişen dosyalar
- her kabul ölçütü için kanıt
- çalıştırılan komutlar ve çıkış kodları
- bilinen kalan riskler
- çalışma ağacının temiz/kirli durumu

Codex bu kanıtları yeniden üretmeden Gate 1 kapanmış sayılmaz.
