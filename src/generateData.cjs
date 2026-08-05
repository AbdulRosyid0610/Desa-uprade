const fs = require("fs");

const namaDepanLaki = [
  "Ahmad", "Budi", "Dedi", "Eko", "Fajar",
  "Hendra", "Irfan", "Joko", "Rizky", "Andi",
  "Bayu", "Dimas", "Fauzan", "Galih", "Hadi",
  "Ilham", "Kevin", "Rian", "Taufik", "Yusuf"
];

const namaDepanPerempuan = [
  "Aisyah", "Dewi", "Fitri", "Indah", "Lestari",
  "Maya", "Nabila", "Putri", "Rina", "Siti",
  "Wulan", "Yuni", "Aulia", "Citra", "Dinda",
  "Eka", "Fitria", "Lina", "Nisa", "Rahma"
];

const namaBelakang = [
  "Pratama", "Saputra", "Santoso", "Hidayat",
  "Nugroho", "Setiawan", "Permana", "Kurniawan",
  "Maulana", "Wijaya", "Ramadhan", "Firmansyah",
  "Lestari", "Rahmawati", "Sari", "Mulyani",
  "Wulandari", "Kusuma", "Purnama", "Susanto"
];

const kota = [
  "Bogor", "Jakarta", "Bandung", "Depok", "Sukabumi",
  "Cianjur", "Bekasi", "Garut", "Tangerang", "Semarang",
  "Yogyakarta", "Surabaya", "Medan", "Makassar", "Manado"
];

const jenisRumah = [
  "Kepala Keluarga", "Istri", "Anak", "Orang Tua", "Saudara"
];

const statusKel = [
  "Menikah", "Belum Menikah", "Cerai Hidup", "Cerai Mati"
];

// Data UMKM
const umkmList = [
  { nama: "SMART WATERING", pemilik: "Budi Santoso", kategori: "Teknologi", deskripsi: "Sistem penyiraman otomatis berbasis IoT." },
  { nama: "HOME AUTOMATION", pemilik: "Siti Rahmawati", kategori: "Teknologi", deskripsi: "Sistem rumah pintar untuk mengontrol perangkat secara otomatis." },
  { nama: "ENVIRONMENTAL SENSOR", pemilik: "Ahmad Fauzi", kategori: "Lingkungan", deskripsi: "Monitor kondisi lingkungan secara real-time." },
  { nama: "SMART CARD SAGA", pemilik: "Dewi Lestari", kategori: "Teknologi", deskripsi: "Sistem kartu pintar untuk transaksi digital." },
  { nama: "AGRO SMART FARM", pemilik: "Joko Susanto", kategori: "Pertanian", deskripsi: "Sistem pertanian pintar berbasis IoT." },
  { nama: "WASTE MANAGEMENT", pemilik: "Rina Kurniawati", kategori: "Lingkungan", deskripsi: "Sistem manajemen sampah terintegrasi." }
];

// Data Berita
const beritaList = [
  { judul: "Festival Budaya Desa", kategori: "Kegiatan", deskripsi: "Festival tahunan menampilkan seni dan budaya lokal desa." },
  { judul: "Panen Raya Padi", kategori: "Berita", deskripsi: "Panen raya padi di lahan pertanian desa." },
  { judul: "Pembangunan Jalan Baru", kategori: "Berita", deskripsi: "Pembangunan jalan poros desa tahap II." },
  { judul: "Pelatihan Digital Marketing", kategori: "Kegiatan", deskripsi: "Pelatihan pemasaran digital bagi pelaku UMKM." },
  { judul: "Kerja Bakti Massal", kategori: "Kegiatan", deskripsi: "Kerja bakti membersihkan lingkungan desa." },
  { judul: "Program Vaksinasi", kategori: "Berita", deskripsi: "Program vaksinasi hewan ternak gratis." }
];

// Data Pengaduan
const pengaduanList = [
  { judul: "Jalan Berlubang", deskripsi: "Terdapat jalan berlubang di wilayah desa.", pelapor: "Yanto", kategori: "KEAMANAN" },
  { judul: "Penumpukan Sampah", deskripsi: "Penumpukan sampah di pinggir sungai.", pelapor: "Rina", kategori: "LINGKUNGAN" },
  { judul: "Penerangan Jalan Rusak", deskripsi: "Lampu penerangan jalan rusak.", pelapor: "Anonim", kategori: "INFRASTRUKTUR" },
  { judul: "Saluran Air Tersumbat", deskripsi: "Saluran air tersumbat sampah.", pelapor: "Budi", kategori: "LINGKUNGAN" },
  { judul: "Kebocoran Pipa Air", deskripsi: "Pipa air utama mengalami kebocoran.", pelapor: "Siti", kategori: "INFRASTRUKTUR" }
];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pad(number, length) {
  return String(number).padStart(length, "0");
}

function generateNIK(index) {
  return `999999${pad(index, 10)}`;
}

function generateKK(index) {
  return `888888${pad(Math.ceil(index / 4), 10)}`;
}

function generateTanggalLahir() {
  const tahun = randomNumber(1960, 2012);
  const bulan = pad(randomNumber(1, 12), 2);
  const tanggal = pad(randomNumber(1, 28), 2);
  return `${tahun}-${bulan}-${tanggal}`;
}

function generateTanggalBerita() {
  const tahun = 2026;
  const bulan = pad(randomNumber(6, 7), 2);
  const tanggal = pad(randomNumber(1, 28), 2);
  return `${tahun}-${bulan}-${tanggal}`;
}

// ============================================
// GENERATE WARGA
// ============================================
function generateWarga(jumlah = 500) {
  const data = [];

  for (let i = 1; i <= jumlah; i++) {
    const gender = Math.random() > 0.5 ? "Laki-laki" : "Perempuan";
    const namaDepan = gender === "Laki-laki" ? randomItem(namaDepanLaki) : randomItem(namaDepanPerempuan);
    const nama = `${namaDepan} ${randomItem(namaBelakang)}`;
    const rt = pad(randomNumber(1, 10), 2);
    const rw = pad(randomNumber(1, 5), 2);

    data.push({
      id: i,
      nama: nama,
      nik: generateNIK(i),
      status: "Warga",
      noKK: generateKK(i),
      rt: rt,
      rw: rw,
      jenisRumah: randomItem(jenisRumah),
      statusKel: randomItem(statusKel),
      tempatLhr: randomItem(kota),
      tglLhr: generateTanggalLahir(),
      gender: gender
    });
  }

  return data;
}

// ============================================
// GENERATE UMKM
// ============================================
function generateUmkm() {
  return umkmList.map((item, index) => ({
    id: index + 1,
    nama: item.nama,
    pemilik: item.pemilik,
    kategori: item.kategori,
    status: randomItem(["Aktif", "Aktif", "Aktif", "Nonaktif"]),
    deskripsi: item.deskripsi
  }));
}

// ============================================
// GENERATE BERITA
// ============================================
function generateBerita() {
  const statuses = ["Aktif", "Aktif", "Draft"];
  return beritaList.map((item, index) => ({
    id: index + 1,
    judul: item.judul,
    kategori: item.kategori,
    tanggal: generateTanggalBerita(),
    deskripsi: item.deskripsi,
    status: randomItem(statuses)
  }));
}

// ============================================
// GENERATE PENGADUAN
// ============================================
function generatePengaduan() {
  const statuses = ["SELESAI", "SELESAI", "DIPROSES", "DIPROSES", "DITOLAK"];
  return pengaduanList.map((item, index) => ({
    id: index + 1,
    judul: item.judul,
    deskripsi: item.deskripsi,
    pelapor: item.pelapor,
    rt: pad(randomNumber(1, 10), 2),
    rw: pad(randomNumber(1, 5), 2),
    kategori: item.kategori,
    status: randomItem(statuses),
    tanggal: generateTanggalBerita()
  }));
}

// ============================================
// GENERATE CCTV (Data Statis)
// ============================================
function generateCCTV() {
  return [
    { id: 1, nama: "Pintu Gerbang Utama", lokasi: "Jalan Raya", status: "Online" },
    { id: 2, nama: "Balai Desa", lokasi: "Pusat Desa", status: "Online" },
    { id: 3, nama: "Pasar Desa", lokasi: "Pasar Sentral", status: "Online" },
    { id: 4, nama: "Lapangan Desa", lokasi: "Area Olahraga", status: "Maintenance" },
    { id: 5, nama: "Kantor Desa", lokasi: "Pusat Administrasi", status: "Maintenance" }
  ];
}

// ============================================
// GENERATE APARAT (Data Statis)
// ============================================
function generateAparat() {
  return [
    { id: 1, nama: "H. Samsul Arifin", jabatan: "Kepala Desa", bidang: "Pemerintahan", status: "Aktif", kontak: "0812-3456-7890" },
    { id: 2, nama: "Dra. Hj. Siti Mulyani", jabatan: "Sekretaris Desa", bidang: "Administrasi", status: "Aktif", kontak: "0812-3456-7891" },
    { id: 3, nama: "Drs. Ahmad Budiman", jabatan: "Kepala Urusan", bidang: "Pembangunan", status: "Aktif", kontak: "0812-3456-7892" },
    { id: 4, nama: "Rina Kurniawati", jabatan: "Kepala Urusan", bidang: "Kesejahteraan", status: "Aktif", kontak: "0812-3456-7893" },
    { id: 5, nama: "Dedi Mulyadi", jabatan: "Kepala Urusan", bidang: "Keuangan", status: "Cuti", kontak: "0812-3456-7894" }
  ];
}

// ============================================
// MAIN - Generate Semua Data
// ============================================

// Generate data
const warga = generateWarga(500);
const umkm = generateUmkm();
const berita = generateBerita();
const pengaduan = generatePengaduan();
const cctv = generateCCTV();
const aparat = generateAparat();

// Gabungkan semua data
const allData = {
  warga: warga,
  umkm: umkm,
  berita: berita,
  pengaduan: pengaduan,
  cctv: cctv,
  aparat: aparat
};

// Simpan ke file db.json
fs.writeFileSync(
  "./db.json",
  JSON.stringify(allData, null, 2),
  "utf-8"
);

// ============================================
// OUTPUT
// ============================================
console.log("=============================================");
console.log("🚀 DATABASE DESA DIGITAL LSKK");
console.log("=============================================");
console.log(`✅ Warga      : ${warga.length} data`);
console.log(`✅ UMKM       : ${umkm.length} data`);
console.log(`✅ Berita     : ${berita.length} data`);
console.log(`✅ Pengaduan  : ${pengaduan.length} data`);
console.log(`✅ CCTV       : ${cctv.length} data`);
console.log(`✅ Aparat     : ${aparat.length} data`);
console.log("=============================================");
console.log(`📁 File saved : db.json`);
console.log("=============================================");