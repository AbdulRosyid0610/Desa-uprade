// src/services/api.js
import axios from "axios";

// ★ PERBAIKAN UNTUK HOSTING ★
const isProduction = process.env.NODE_ENV === 'production';

// ★ SUDAH DISESUAIKAN DENGAN REPO ANDA ★
const API_URL = isProduction 
  ? "https://my-json-server.typicode.com/AbdulRosyid0610/Desa-uprade" 
  : "http://localhost:5000";

const api = axios.create({
    baseURL: API_URL, 
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// --- Fungsi GET Data ---
export const getWarga = async () => {
    try {
        const response = await api.get("/warga");
        return response.data;
    } catch (error) {
        console.error("❌ Error getWarga:", error);
        return [];
    }
};

export const getUmkm = async () => {
    try {
        const response = await api.get("/umkm");
        return response.data;
    } catch (error) {
        console.error("❌ Error getUmkm:", error);
        return [];
    }
};

export const getPengaduan = async () => {
    try {
        const response = await api.get("/pengaduan");
        return response.data;
    } catch (error) {
        console.error("❌ Error getPengaduan:", error);
        return [];
    }
};

export const getBerita = async () => {
    try {
        const response = await api.get("/berita");
        return response.data;
    } catch (error) {
        console.error("❌ Error getBerita:", error);
        return [];
    }
};

// --- Fungsi CRUD (Create, Update, Delete) ---
export const postWarga = async (data) => {
    const response = await api.post("/warga", data);
    return response.data;
};

export const putWarga = async (id, data) => {
    const response = await api.put(`/warga/${id}`, data);
    return response.data;
};

export const deleteWarga = async (id) => {
    const response = await api.delete(`/warga/${id}`);
    return response.data;
};

export const postUmkm = async (data) => {
    const response = await api.post("/umkm", data);
    return response.data;
};

export const putUmkm = async (id, data) => {
    const response = await api.put(`/umkm/${id}`, data);
    return response.data;
};

export const deleteUmkm = async (id) => {
    const response = await api.delete(`/umkm/${id}`);
    return response.data;
};

export const postBerita = async (data) => {
    const response = await api.post("/berita", data);
    return response.data;
};

export const putBerita = async (id, data) => {
    const response = await api.put(`/berita/${id}`, data);
    return response.data;
};

export const deleteBerita = async (id) => {
    const response = await api.delete(`/berita/${id}`);
    return response.data;
};

export const postPengaduan = async (data) => {
    const response = await api.post("/pengaduan", data);
    return response.data;
};

export const putPengaduan = async (id, data) => {
    const response = await api.put(`/pengaduan/${id}`, data);
    return response.data;
};

export const deletePengaduan = async (id) => {
    const response = await api.delete(`/pengaduan/${id}`);
    return response.data;
};

export default api;