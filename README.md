# Software Quality Assurance - Automation Testing Kelompok 9

Repository ini berisi proyek End-to-End (E2E) UI Automation Testing untuk alur checkout pada website [SauceDemo](https://www.saucedemo.com/) menggunakan framework [Cypress](https://www.cypress.io/).

---

## 📋 Deskripsi Proyek

Proyek ini mengotomasi skenario pengujian alur checkout e-commerce SauceDemo dari awal hingga akhir, memastikan fungsionalitas transaksi berjalan sesuai dengan standar kualitas pengujian perangkat lunak. Pengujian mencakup skenario positif (*happy path*) hingga skenario negatif (validasi error input formulir).

---

## 📁 Struktur Direktori Proyek

```text
Kelompok5-9/
├── cypress/
│   ├── e2e/
│   │   └── checkout.cy.js        # File skrip pengujian E2E checkout
│   ├── fixtures/
│   │   └── example.json          # Data uji statis / mock fixture
│   ├── support/
│   │   ├── commands.js           # Kustomisasi perintah Cypress
│   │   └── e2e.js                # Konfigurasi pendukung suite e2e
│   └── videos/
│       └── checkout.cy.js.mp4    # Hasil rekaman video eksekusi pengujian
├── .gitignore                    # Konfigurasi pengabaian file Git (node_modules/)
├── cypress.config.js             # Konfigurasi utama Cypress (video, screenshot, dll)
├── package.json                  # Metadata dependensi & skrip proyek
├── package-lock.json             # Kunci dependensi npm yang terinstal
└── README.md                     # Dokumentasi panduan proyek
```

---

## ⚙️ Panduan Instalasi & Setup Lingkungan

Pilih panduan instalasi sesuai dengan sistem operasi yang Anda gunakan:

### 1. Lingkungan Windows (PowerShell)

#### a. Mengatasi Isu ExecutionPolicy (Troubleshooting)
Jika saat menjalankan skrip `npm` atau `npx` muncul peringatan script execution is disabled on this system:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### b. Inisialisasi Proyek & Instalasi Dependensi
Jika melakukan setup dari awal (*fresh setup*):
```powershell
npm init -y
npm install cypress --save-dev
```
Atau jika telah meng-clone repository ini, cukup jalankan:
```powershell
npm install
```

#### c. Verifikasi & Instalasi Binary Cypress
Pastikan binary Cypress terunduh dan terpasang dengan benar pada sistem:
```powershell
npx cypress install
```

---

### 2. Lingkungan Linux (WSL Ubuntu)

#### a. Update Repository Sistem
```bash
sudo apt update
```

#### b. Penanganan Kendala Dependensi / Broken Packages (Troubleshooting)
Jika terdapat paket dependensi rusak atau proses instalasi paket terputus sebelumnya pada Ubuntu/WSL:
```bash
sudo apt --fix-broken install -y
sudo dpkg --configure -a
```

#### c. Verifikasi Runtime Node.js & npm
Pastikan Node.js dan npm sudah terpasang dan dapat diakses:
```bash
node -v
npm -v
```

#### d. Instalasi Dependensi Pustaka GUI/X11 Cypress
Cypress membutuhkan pustaka sistem Linux berikut agar browser headless / GUI serta server display virtual (Xvfb/X11) dapat berjalan normal:
```bash
sudo apt install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```

#### e. Instalasi Dependensi Proyek
```bash
npm install
```

---

## 🔧 Konfigurasi Cypress & Skenario Pengujian

### Perekaman Video & Delay
Pengaturan pada `cypress.config.js`:
```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```
- **`video: true`**: Menginstruksikan Cypress untuk merekam seluruh proses eksekusi pengujian secara otomatis ke dalam format file `.mp4` saat pengujian dijalankan dalam mode headless (`cypress run`).
- **`screenshotOnRunFailure: true`**: Mengambil tangkapan layar otomatis jika terjadi kegagalan atau *assertion failure* pada suatu langkah pengujian.

### Detail Skenario Pengujian (`cypress/e2e/checkout.cy.js`)

1. **TC01 - Positive Test (Alur Pembelian Lengkap Hingga Selesai)**:
   - Login menggunakan akun valid `standard_user` dan `secret_sauce`.
   - Menggunakan simulasi pengetikan santai dengan parameter `{ delay: 100 }` dan jeda eksplisit `cy.wait()` agar demonstrasi dan alur pengujian dapat diamati dengan jelas pada rekaman video.
   - Menambahkan 2 item produk ke keranjang (*Sauce Labs Backpack* & *Sauce Labs Bike Light*).
   - Memeriksa halaman keranjang dan memverifikasi kesesuaian jumlah item.
   - Mengisi formulir data pembeli: First Name (*John*), Last Name (*Doe*), Postal Code (*12345*).
   - Memeriksa ringkasan belanja dan kalkulasi total harga (*Checkout: Overview*).
   - Menyelesaikan transaksi (*Finish*) dan memastikan muncul pesan sukses konfirmasi: `"Thank you for your order!"` serta `"Your order has been dispatched"`.

2. **TC02 - Negative Test (Validasi Field Formulir Kosong)**:
   - Login ke dalam sistem.
   - Menambahkan produk ke keranjang dan masuk ke formulir informasi checkout (*Checkout: Your Information*).
   - Langsung menekan tombol **Continue** tanpa mengisi field data pembeli.
   - Memverifikasi kemunculan pesan error validasi: `"Error: First Name is required"`.

---

## 🧪 Perintah Eksekusi Pengujian

### 1. Mode Interaktif / GUI (Cypress Test Runner)
Jalankan perintah berikut untuk membuka antarmuka visual Cypress:
```bash
npx cypress open
```

### 2. Mode Headless (Terminal) dengan Perekaman Video
Jalankan skrip pengujian alur checkout secara spesifik melalui terminal:
```bash
npx cypress run --spec "cypress/e2e/checkout.cy.js"
```

### 3. Lokasi Artefak Rekaman Pengujian
Setelah eksekusi headless selesai, video rekaman jalannya pengujian otomatis tersimpan pada direktori:
```text
cypress/videos/checkout.cy.js.mp4
```
