const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const DB_FILE = "./db.json";

// ==============================
// BACA DATABASE
// ==============================

function readDB() {
    try {
        const data = fs.readFileSync(DB_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Gagal membaca db.json:", error.message);
        return {};
    }
}

// ==============================
// HOME
// ==============================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API Desa Digital aktif",
    });
});

// ==============================
// WARGA
// ==============================

app.get("/warga", (req, res) => {
    const db = readDB();
    res.json(db.warga || []);
});

// ==============================
// UMKM
// ==============================

app.get("/umkm", (req, res) => {
    const db = readDB();
    res.json(db.umkm || []);
});

// ==============================
// BERITA
// ==============================

app.get("/berita", (req, res) => {
    const db = readDB();
    res.json(db.berita || []);
});

// ==============================
// PENGADUAN
// ==============================

app.get("/pengaduan", (req, res) => {
    const db = readDB();
    res.json(db.pengaduan || []);
});

// ==============================
// CCTV
// ==============================

app.get("/cctv", (req, res) => {
    const db = readDB();
    res.json(db.cctv || []);
});

// ==============================
// APARAT
// ==============================

app.get("/aparat", (req, res) => {
    const db = readDB();
    res.json(db.aparat || []);
});

// ==============================
// SERVER
// ==============================

app.listen(PORT, () => {
    console.log(`🚀 API berjalan di port ${PORT}`);
});