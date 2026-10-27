# QuickCount Paskib V2 — Split-Screen Auth & Competition Workspace Architecture

## 1. Project Mission & Boundaries
Frontend QuickCount Paskib V2 dibangun menggunakan **React 18 + TypeScript + Vite + React Router DOM v6**.
- **BATASAN MUTLAK**: **Frontend only**. Backend belum ada dan **TIDAK BOLEH** dibuat dalam pekerjaan ini.
- Jangan membuat server database, webhook pembayaran nyata, atau endpoint fiktif.
- Seluruh pergerakan saldo, login simulasi, pendaftaran tim, dan voting beroperasi melalui mock service terisolasi (`src/mocks/mockServices.ts`).

---

## 2. Invariants & Business Logic Rules (Aturan Mutlak)
1. **Split-Screen Authentication Entry**:
   - **TIDAK ADA LANDING PAGE, WELCOME PAGE PANJANG, ATAU HERO MARKETING**: Pintu masuk utama aplikasi saat belum login adalah **Halaman Login Minimalis Split-Screen** (`src/pages/auth/LoginPage.tsx`).
   - Sisi kiri (54% desktop): Carousel visual Paskibra beresolusi tinggi dengan overlay gelap lembut, auto-play 6 detik dengan pause tab, kontrol manual, dan dukungan `prefers-reduced-motion`.
   - Sisi kanan (46% desktop): Form login terpusat (380-400px), logo resmi `01-logo-utama-light.png`, judul **"Selamat Datang Kembali"**, deskripsi singkat *"Masuk untuk melihat perlombaan dan klasemen QuickCount Paskib."*, email, password dengan toggle show/hide accessible, tombol "Masuk", dan role selector simulasi.
   - Tanpa navbar publik, tanpa footer panjang, tanpa banner demo hitam, tanpa badge atau teks "SIMULASI DEMO" yang mengotori halaman login.
2. **Perilaku Root Route `/`**:
   - Belum login: langsung menampilkan Halaman Login Split-Screen.
   - Login sebagai `USER`: langsung diarahkan ke Dashboard Utama Kompetisi (`/app`).
   - Login sebagai `ADMIN`: langsung diarahkan ke Dashboard Operasional Panitia (`/admin`).
3. **Konversi Suara**: **Rp1.000 = 1 Suara Sah**.
4. **Saldo Non-Refundable**: Saldo yang berhasil di-top up ke dompet bersifat mutlak non-refundable (tidak dapat dicairkan kembali ke rekening bank) dan hanya dapat disalurkan sebagai suara tim kontingen.
5. **Isolasi Mutasi Saldo**: Saldo dompet **TIDAK PERNAH** terpotong saat form dibuka atau kuantitas diubah. Saldo **HANYA** berkurang setelah konfirmasi eksplisit disetujui pengguna.
6. **Route Guard & Sanitasi Redirect**:
   - Route voting (`/app/vote/:competitionId/:teamId`) hanya dapat diakses setelah login.
   - Parameter `redirect` disanitasi ketat hanya menerima internal relative path (menolak open-redirect eksternal).

---

## 3. Visual Design System: Split-Screen & Magazine Editorial

### A. Authentication Split Screen (`/`, `/login`)
- Layout: 2 kolom desktop (`min-height: 100svh`), 1 kolom mobile (fokus pada form login bersih).
- Kolom kiri: Carousel visual formasi barisan & upacara Paskibra.
- Kolom kanan: Form login terpusat, tipografi Newsreader serif untuk headline, Plus Jakarta Sans untuk form, Space Mono untuk badge tag, warna merah `#DC2626`.

### B. User Workspace (`/app`, `/app/competitions/:id`, `/app/vote/:comp/:team`, `/app/wallet`, `/app/transactions`, `/app/profile`)
- **Konsep**: *Compact Editorial Competition Dashboard*.
- Menampilkan:
  - Header ringkas dengan identitas pemilih dan saldo aktif.
  - Ringkasan statistik tabular (Kompetisi berjalan, total kontingen, akumulasi suara sah, potensi suara).
  - Daftar kompetisi aktif (status `OPEN`) dengan filter tingkat wilayah (Nasional vs Provinsi).
  - Klasemen berjalan terintegrasi yang sinkron dengan kompetisi terpilih dan tombol aksi langsung ke alur voting.

### C. Admin Workspace (`/admin`, `/admin/competitions`, `/admin/teams`, `/admin/votes`, `/admin/payments`, `/admin/reports`)
- **Konsep**: Operational administration dashboard panitia.

---

## 4. Active Skills Inventory (Telah Direkonsiliasi)
1. `quickcount-paskib-ui-ux`: Aturan bisnis, UI responsive, konversi Rp1.000 = 1 suara, isolasi saldo dompet.
2. `frontend-design`: Art direction editorial, tipografi serif + sans + mono, struktur koran/majalah kompetisi.
3. `ui-ux-pro-max`: Pattern UI/UX modern, aksesibilitas kontras, touch target, responsive behavior.
4. `web-design-guidelines`: Usability, aria-labels, semantic table & inputs.
