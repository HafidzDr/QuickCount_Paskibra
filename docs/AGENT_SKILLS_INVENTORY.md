# Agent Skills Inventory — QuickCount Paskib V2

## Retained and Aligned Skills

| Skill | Status | Reason & Alignment |
|---|---|---|
| `quickcount-paskib-ui-ux` | Core / Required | Aturan bisnis e-voting, batasan frontend-only, isolasi saldo, redirect login pemilih, transparansi demo. |
| `frontend-design` | Active | Panduan visual Magazine/Newspaper Hybrid Editorial: komposisi asimetris, tipografi triad, dan penekanan data kompetisi. |
| `ui-ux-pro-max` | Active | Best practice accessibility (WCAG AA), navigasi keyboard, touch target, kontras warna dan responsive layout. |
| `web-design-guidelines` | Active | Usability audit, semantic HTML, aksesibilitas tabel, formulir berlabel jelas. |

---

## Deprecated / Reconciled Skills

| Skill | Former Status | Conflict & Resolution |
|---|---|---|
| `ui-styling` | Deprecated for Public Portal | Mempromosikan komponen generic template shadcn/ui dan floating rounded card yang bertentangan dengan visual Newspaper/Magazine Hybrid Editorial. Dibatasi hanya untuk token styling dasar tanpa memaksakan template SaaS. |
| `banner-design` | Removed | Terkait materi kampanye media sosial/cetak di luar lingkup aplikasi web e-voting. |
| `slides` | Removed | Pembuatan slide presentasi di luar lingkup frontend. |
| `design` | Removed | Skill payung duplikat yang tumpang tindih dengan `frontend-design` dan `ui-ux-pro-max`. |

---

## Agent Protocol
1. Selalu patuhi `AGENTS.md` dan `FRONTEND_V2_BLUEPRINT.md`.
2. Jangan pernah membuat backend atau mengklaim hasil/transaksi demo sebagai data sungguhan.
3. Selalu arahkan pengguna belum login ke `/login?redirect=...` saat menekan aksi dukungan voting.
