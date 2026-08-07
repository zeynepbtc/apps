# DECISION-002 — 南 Mnemonic Kararı

Status: APPROVED
Date: 2026-08-07
Owner: Zeynep
Decision authority: Codex product/pedagogy gate, user authorizationıyla

## Decision

`南` kaydı `mnemonic.status: "not_required"` ile yayıma açılacak. `textTr`, `memory_hint_tr` veya başka bir görsel hikâye eklenmeyecek.

## Rationale

Mevcut görünür köken metni kaynaklarla desteklenen iki iddiayı taşır: eski biçimin asılı, çan biçiminde bir çalgıyı göstermesi ve karakterin daha sonra “güney” anlamında kullanılmaya başlanması.

Kaynaklar bu iki nokta arasındaki tarihsel mekanizmada ayrışır. Ayrı bir mnemonic:

- kaynaklardan birinin mekanizmasını kesinmiş gibi geri sokar,
- ya da kaynaksız bir görsel hikâye üretir,
- görünür köken ile araştırma notu arasındaki güven sınırını bulanıklaştırır.

Mnemonic kalite testi:

1. Köken bugünkü anlam bağını taşıyor mu? **Hayır; mekanizma bilinçli olarak yayın dışıdır.**
2. Kaynaklı ve doğru bir anlam köprüsü tek okumada kurulabiliyor mu? **Hayır.**
3. Ayrı biçim kancası gerekli mi? **Hayır; ölçülen karışma riski düşüktür ve çizim öğretimi bu katmanın görevi değildir.**
4. Ayrı katman yeni, güvenilir bilgi ekliyor mu? **Hayır.**

Sonuç olarak boşluk bir içerik kusuru değil, doğruluk standardının uygulanmasıdır. Kullanıcının “çalgı neden güney?” sorusuna uydurma cevap vermemek, yapay bir hatırlatma üretmekten daha değerlidir.

## Guardrail

Bu karar yalnız `南` içindir. “Anlam bağı görünür değilse mnemonic otomatik olarak not_required olur” şeklinde genel bir kural oluşturmaz; her kayıt dört soruyla ayrıca değerlendirilir.

