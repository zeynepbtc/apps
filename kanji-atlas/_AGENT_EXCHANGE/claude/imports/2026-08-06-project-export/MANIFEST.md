# PROJE BELGELERİ — EXPORT MANİFESTİ

> 2026-08-06 · Kaynak: claude.ai Projesi **"PROJECTS - JAPANESE"**
> Hedef (önerilen, HENÜZ UYGULANMADI): `apps` reposu → `kanji-atlas/_AGENT_EXCHANGE/`
> **Bu paket hiçbir yere yazılmadı, commit edilmedi, taşınmadı.** Codex doğrulaması bekliyor.

## Özet

| | |
|---|---|
| Dışa aktarılan belge | **176** |
| Toplam boyut | **2.132.797 bayt (~2,03 MB)** |
| Bütünlük | **sha256 doğrulandı — 176/176 eşleşti** |
| Hata | **0** |
| Bilerek dışlanan | **1** (aşağıda) |

## ⛔ Pakete BİLEREK KONULMAYAN

| Dosya | Sebep |
|---|---|
| `claude/erisim-anahtari-github.md` | **Canlı GitHub PAT içeriyor.** Paket bir git deposuna konacağı için sızma riski gerçek; anahtar commit'lenirse GitHub tarafından otomatik iptal edilir ve mevcut push akışı kırılır. Bu dosya projede kalmalı, git'e **girmemeli**. |

Ek güvenlik denetimi: paketin tamamı `ghp_*` / `github_pat_*` desenlerine karşı tarandı → **temiz**.

## Kova dağılımı

| Kova | Dosya | Bayt | Not |
|---|---:|---:|---|
| `claude/kanji-atlas/` | **105** | 733.606 | Asıl kapsam — authoring, QA, IA, P0, denetim |
| `claude/japanese-flick/` | 29 | 188.560 | Ayrı ürün (1.0.6 yayında) |
| `claude/baito-days/` | 14 | 167.582 | Ayrı ürün (taslak) |
| `claude/` kökü | 12 | 81.902 | Stüdyo geneli (STUDIO-OS, adlandırma, içerik ağacı…) |
| Proje kökü | 8 | 917.353 | `japonca-yazi-atlasi.html` (507 KB), `index.html` (347 KB), `sw.js` vb. — **eski/miras kopyalar** |
| `claude/ortak-standartlar/` | 6 | 31.557 | Paylaşılan standartlar, denetim checklist'i, logo |
| `claude/_AGENT_EXCHANGE/` | 1 | 8.957 | Bugünkü kanon tespiti + kanıt |
| `claude/tools/` | 1 | 3.280 | `consistency-check.js` |

## Kapsam uyarısı — Codex kararı gerekiyor

Zeynep'in kararı: exchange klasörü **yalnız `kanji-atlas/_AGENT_EXCHANGE/` altında** yaşayacak, repo kökünde karışık ortak klasör olmayacak. Bu doğruysa paketin tamamı oraya **gitmemeli**:

| Kova | Öneri | Gerekçe |
|---|---|---|
| `kanji-atlas/` (105) + `_AGENT_EXCHANGE/` (1) | ✅ Taşınsın | Doğrudan kapsam |
| `ortak-standartlar/` (6) | ⚠️ Karar | Portföy geneli; Atlas ürün reposuna ayrılınca **birlikte gitmemeli**, kopyalanmalı ya da referanslanmalı |
| `japanese-flick/` (29), `baito-days/` (14) | ❌ Taşınmasın | Ayrı ürünler; Atlas klasörüne konursa "karışık ortak klasör" yasağı ihlal edilir |
| `claude/` kökü (12), `tools/` (1) | ⚠️ Karar | Stüdyo geneli |
| Proje kökü (8) | ❌ Taşınmasın | `japonca-yazi-atlasi.html` ve `index.html` **eski miras kopyalar** — canlı kod `kanji-atlas/index.html`. Bunları taşımak ikinci bir "doğru kaynak" yaratır ve tam olarak bugün çözmeye çalıştığımız kanon sorununu tekrarlar. |

**Dar öneri (tek kanon ilkesine en uygun): yalnız 106 dosya** = `claude/kanji-atlas/` (105) + `claude/_AGENT_EXCHANGE/` (1) → `kanji-atlas/_AGENT_EXCHANGE/`. Kalan 70 dosya paket içinde arşiv olarak durur, bu turda git'e girmez.

## Paket içeriği

```
docs/                  ← 176 belge, ORİJİNAL proje yol yapısı birebir korunmuş
MANIFEST.json          ← makine okunur: path · bytes · sha256 · kova · dışlanan
MANIFEST.md            ← bu dosya
manifest-A|B|C|D.json  ← ham ajan çıktıları (denetim izi)
```

## Doğrulama

Paketi açtıktan sonra bütünlük şöyle teyit edilir:
```bash
python3 - <<'PY'
import json,hashlib,os
m=json.load(open('MANIFEST.json'))
bad=[f['path'] for f in m['dosyalar']
     if hashlib.sha256(open(os.path.join('docs',f['path']),'rb').read()).hexdigest()!=f['sha256']]
print('EŞLEŞMEYEN:', bad or 'yok', '| toplam', m['toplam_dosya'])
PY
```

## Durum

**BEKLEMEDE.** Hiçbir belge yazılmadı, commit edilmedi, repoya konmadı, klasör taşınmadı. Codex doğrulaması + kapsam kararı (yukarıdaki tablo) sonrası uygulanacak.
