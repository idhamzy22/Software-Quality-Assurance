# Software Quality Assurance - Automation Testing Kelompok 9

Repository ini berisi skrip End-to-End (E2E) UI Automation Testing untuk alur checkout pada website [SauceDemo](https://www.saucedemo.com/) menggunakan framework [Cypress](https://www.cypress.io/).

## 📋 Deskripsi Proyek
Proyek ini mengotomasi skenario pengujian alur checkout e-commerce SauceDemo dari awal hingga akhir, memastikan fungsionalitas transaksi berjalan sesuai dengan standar kualitas pengujian perangkat lunak.

## 🚀 Alur Pengujian (E2E Checkout Flow)
1. **Login**: Melakukan autentikasi menggunakan akun standar (`standard_user`).
2. **Katalog Produk**: Memilih produk dan menambahkannya ke keranjang belanja (*Add to Cart*).
3. **Keranjang Belanja**: Menavigasi ke halaman cart dan memverifikasi item yang dipilih.
4. **Checkout - Step One**: Mengisi form data pembeli (*First Name*, *Last Name*, *Postal Code*).
5. **Checkout - Step Two**: Melakukan review ringkasan pesanan, kalkulasi harga, dan menyelesaikan pesanan.
6. **Order Confirmation**: Memverifikasi pesan sukses checkout ("Thank you for your order!").

## 🛠️ Prasyarat & Instalasi
Pastikan Node.js sudah terpasang pada perangkat Anda:
- Node.js (LTS version)
- npm

Jalankan instalasi dependensi:
```bash
npm install
```

## 🧪 Menjalankan Pengujian
- **Mode GUI / Interaktif (Cypress Test Runner):**
  ```bash
  npx cypress open
  ```
- **Mode Headless (Terminal):**
  ```bash
  npx cypress run
  ```
