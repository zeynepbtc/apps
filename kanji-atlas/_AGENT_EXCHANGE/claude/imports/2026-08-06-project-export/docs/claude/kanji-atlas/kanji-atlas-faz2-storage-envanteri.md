# Faz 2 · Storage/Migration — Envanter + Tasarım + Sonuç

> **Statü:** UYGULANDI + test edildi (`faz2-kalem1` dalı). Tek anahtar `localStorage["kana_state"]` = tüm `state`. İlke: *migration kullanıcı verisini dönüştürür, sessizce sıfırlamaz.*
> **Kapsam:** R1 (parse edilemeyen kayıtta sessiz sıfırlama YOK) · R2 (schemaVersion) · R3 (kontrollü nested-default) · save görünür sözleşme. **Ertelendi:** export/import + her-save yedek + recovery kullanıcı ekranı.

## Durum ayrımı (GPT düzeltmesi — aynı hata sınıfına sokma)
- **Parse edilemeyen ham kayıt → RECOVERY.** `kana_state` yerinde korunur; ayrı recovery anahtarına kopyalanır; save bloke.
- **Anahtar hiç yok → NORMAL defaults** (recovery değil; ilk açılış).
- **Alanlar eksik/eski → MIGRATION + kontrollü varsayılan tamamlama** (recovery değil; olağan yükseltme).

## State alan envanteri (5 sütun)
| Alan | Tür | Geri getirilemez? | Varsayılan | Yoksa / bozuksa |
|---|---|---|---|---|
| `schemaVersion` | number | — | 1 | yoksa v0 → v1 migrate |
| `learned`/`status`/`kana`/`srs` | object | **Evet** | `{}` | tip guard; korunur |
| `games` | object | **Evet** (skorlar) | `{}` | guard |
| `userHints` | object | **Evet (kişisel · LOCK-4)** | `{}` | KORU + guard |
| `cipherLearned`/`discoveredRules` | object | **Evet** | `{}` | guard |
| `userProfile` | object/null | **Evet (kimlik)** | `null` | null korunur / obje merge |
| `onboarding` (sonuç: completed) | object | **Evet (korunacak sonuç)** | `null` | v0'da yoksa userProfile'dan migrate |
| `onboarding` (tercihler: motivation/level/style) | — | yeniden seçilebilir **ama migration'da korunur** | — | migrate'te taşınır |
| `onboarding.step` (ekran adımı) | number | Hayır (oturum/cache) | 1/8 | önemsiz |
| `settings` | object | tercih (yeniden seçilebilir) | `{audio,audioMode,autoplay,calm}` | nested-default merge |
| `lastSeenKatakana` | array | Hayır (cache) | `[]` | array guard |
| `streak/pathStage/lastActive` | number | türetilir | 1/1/0 | default |
| `screen,stack,param,_resume,_game,_gamePick,_quiz` | oturum | **Hayır (cache)** | home/[]/null | `load()` bootstrap **bilinçli sıfırlar** |

**Üç sınıf:** (1) Geri getirilemez kullanıcı verisi: learned/status/kana/srs/games/userHints/cipherLearned/discoveredRules/userProfile/**tamamlanmış onboarding sonucu**. (2) Yeniden seçilebilir tercih (migration'da yine korunur): settings, **onboarding motivasyon/seviye/stil**. (3) Cache/oturum: screen/stack/param/_resume/_game/_gamePick/_quiz/**onboarding.step**.

## Uygulanan tasarım
- **Düz `schemaVersion`** (wrapper refactor YOK). `migrate()`→v0<1 ise `migrateV0ToV1` (idempotent, deterministik; onboarding+audioMode; bilinmeyen alanı silmez).
- **`safeMerge`:** kör deep-merge DEĞİL; bilinen iç nesneler kontrollü; yanlış tip (`settings:null`,`srs:"x"`,`userHints:[]`) → default; bilinmeyen ekstra alan korunur.
- **Recovery:** parse hatası → `kana_state` **yerinde**; `kana_state_recovery_<ts>` kopyası; app defaults ile açılır; **recovery'de `save()` ana kaydı EZMEZ.**
- **save() GÖRÜNÜR SÖZLEŞME (GPT):** `{ok, reason}` döndürür — `reason ∈ {null, "storage-recovery", "write-error"}` + konsol uyarısı. **Sessiz kayıt başarısızlığı yok**; çağıran katman `result.ok`/`result.reason` ile durumu anlar. App `save()` bu değeri döndürür.

## Kabul testleri — sonuç
**22/22 saf (`storage_check.js`):** yok/sürümsüz/v1 · idempotent · truncated→recovery+yerinde · yanlış tip guard · eksik ayar tamamlanır · bilinmeyen alan korunur · recovery save `{ok:false,reason:"storage-recovery"}` · setItem hata `{ok:false,reason:"write-error"}`+yerinde · normal save `{ok:true}` · userHints/cipherLearned/learned/srs/games derin eşit · oturum bootstrap'ta sıfırlanır.
**Canlı Playwright (`smoke_storage.js`):** sürümsüz→v1 + userHints korundu; bozuk→recovery, kana_state ezilmedi, kopya oluştu, app açıldı, save `{ok:false,reason:"storage-recovery"}`.

> **EXIT-CARD:** Recovery modunda uygulama açıldıktan sonra **hiçbir otomatik akış `kana_state` üzerine yazamadı** — doğrulandı. Save başarısızlığı çağıran katmana **görünür** raporlanıyor.
