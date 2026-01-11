# 🏥 SIMRS Delta Surya - Case Study

Sistem Informasi Manajemen Rumah Sakit (SIMRS) sederhana yang dirancang untuk mengintegrasikan proses pemeriksaan dokter dan layanan farmasi/apoteker secara real-time. Aplikasi ini dibangun menggunakan stack modern **Laravel 11**, **Inertia.js**, **React**, dan **Ant Design**.

### UI Documentation : https://github.com/Rjndrkha/simrsdelta/tree/main/screenshoot
---

## 🚀 Fitur Utama

### 1. 👨‍⚕️ Modul Dokter

-   **Dashboard Antrean**: Melihat daftar pasien yang perlu diperiksa.
-   **Pemeriksaan Medis**: Input tanda-tanda vital (Tinggi, Berat, Tekanan Darah, HR, RR, Suhu).
-   **E-Prescribing**: Integrasi pencarian obat dari API Eksternal RS Delta Surya.
-   **Edit Resep**: Dokter dapat mengubah data resep selama statusnya masih `Pending` (belum dibayar di apotek).

### 2. 💊 Modul Apoteker

-   **Manajemen Pasien**: Fitur untuk master data pasien.
-   **Antrean Resep**: Memproses resep yang dikirim oleh dokter secara real-time.
-   **Konfirmasi Pembayaran**: Memvalidasi transaksi obat untuk mengubah status resep menjadi `Completed`.
-   **Cetak Resi PDF**: Menghasilkan bukti pembayaran resmi (Invoice) menggunakan `dompdf`.

### 3. 📱 Fitur Sistem

-   **Multi-Role Authentication**: Login berbeda untuk Dokter dan Apoteker.
-   **Responsive Design**: Sidebar auto-hide dan Form/Table yang adaptif untuk perangkat mobile (HP/Tablet).
-   **External API Bridge**: Laravel bertindak sebagai proxy untuk mengambil data obat dari sistem eksternal secara aman.

### 4. 👨‍⚕️ Logging Transactional Data
---

## 🛠️ Tech Stack

-   **Backend**: Laravel 11 (PHP 8.x)
-   **Frontend**: React.js dengan Inertia.js
-   **UI Library**: Ant Design (AntD) & Tailwind CSS
-   **Database**: PostgreSQL / MySQL
-   **PDF Engine**: Barryvdh Laravel DomPDF

---

## 🏃 Cara Menjalankan Aplikasi

Ikuti langkah-langkah berikut untuk menjalankan proyek di lingkungan lokal:

### 1. Persiapan Awal

Pastikan Anda sudah menginstal **Composer**, **Node.js**, dan database server (**PostgreSQL/MySQL**).

```bash
# Clone repository ini
git clone https://github.com/Rjndrkha/simrsdelta.git

```

### 2. Instalasi Dependensi

```bash
# Instal library PHP (Laravel)
composer install

# Instal library JavaScript (React)
npm install
```

### 3. Konfigurasi Environment

Buat file `.env` berdasarkan template `.env.example` dan sesuaikan pengaturan database

```bash
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=laraveldb
DB_USERNAME=postgres
DB_PASSWORD=password_anda
```

### 3. Seeding DB

```bash
php artisan migrate:fresh --seed
```
