// src/components/Admin/AdminDashboard.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import './AdminDashboard.css';
import api from '../../Services/api';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// ============================================
// CONSTANTS
// ============================================

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', },
  { id: 'warga', label: 'Data Warga', },
  { id: 'umkm', label: 'Kelola UMKM', },
  { id: 'berita', label: 'Kelola Berita', },
  { id: 'pengaduan', label: 'Pengaduan', },
  { id: 'cctv', label: 'CCTV', },
  { id: 'pengaturan', label: 'Pengaturan', },
];

// ============================================
// COMPONENT: AdminDashboard
// ============================================
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWarga: 0,
    totalUMKM: 0,
    totalBerita: 0,
    totalPengaduan: 0,
    wargaAktif: 0,
    wargaNonaktif: 0,
    umkmAktif: 0,
    umkmNonaktif: 0,
  });

  // State untuk Modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // State untuk Image Preview
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedImageForModal, setSelectedImageForModal] = useState(null);
  const fileInputRef = useRef(null);

  // State Data
  const [wargaData, setWargaData] = useState([]);
  const [umkmData, setUmkmData] = useState([]);
  const [pengaduanData, setPengaduanData] = useState([]);
  const [beritaData, setBeritaData] = useState([]);

  // State untuk Filter
  const [umkmSearchTerm, setUmkmSearchTerm] = useState('');
  const [umkmStatusFilter, setUmkmStatusFilter] = useState('Semua Status');
  const [umkmCurrentPage, setUmkmCurrentPage] = useState(1);
  const umkmItemsPerPage = 4;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRW, setSelectedRW] = useState('Semua RW');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const [beritaSearchTerm, setBeritaSearchTerm] = useState('');
  const [beritaCurrentPage, setBeritaCurrentPage] = useState(1);
  const beritaItemsPerPage = 3;

  const [pengaduanStatusFilter, setPengaduanStatusFilter] = useState('Semua Status');
  const [pengaduanCurrentPage, setPengaduanCurrentPage] = useState(1);
  const pengaduanItemsPerPage = 5;

  // ============================================
  // DATA DEFAULT dengan GAMBAR
  // ============================================
  const defaultUmkmData = [
    { 
      id: 1, 
      nama: 'SMART WATERING', 
      kategori: 'Teknologi', 
      pemilik: 'Bapak Andi', 
      status: 'aktif', 
      desc: 'Sistem penyiraman otomatis berbasis IoT.',
      gambar: null,
      gambarBase64: null
    },
    { 
      id: 2, 
      nama: 'HOME AUTOMATION', 
      kategori: 'Elektronik', 
      pemilik: 'Ibu Siti', 
      status: 'aktif', 
      desc: 'Sistem rumah pintar untuk mengontrol perangkat listrik secara otomatis.',
      gambar: null,
      gambarBase64: null
    },
    { 
      id: 3, 
      nama: 'ENVIRONMENTAL SENSOR', 
      kategori: 'Lingkungan', 
      pemilik: 'Bapak Budi', 
      status: 'nonaktif', 
      desc: 'Monitor kondisi lingkungan secara real-time.',
      gambar: null,
      gambarBase64: null
    },
    { 
      id: 4, 
      nama: 'SMART CARD SAGA', 
      kategori: 'Teknologi', 
      pemilik: 'Ibu Dewi', 
      status: 'draft', 
      desc: 'Sistem kartu pintar untuk transaksi digital.',
      gambar: null,
      gambarBase64: null
    },
    { 
      id: 5, 
      nama: 'AGRO SMART FARM', 
      kategori: 'Pertanian', 
      pemilik: 'Pak Joko', 
      status: 'aktif', 
      desc: 'Sistem pertanian pintar berbasis IoT.',
      gambar: null,
      gambarBase64: null
    },
    { 
      id: 6, 
      nama: 'WASTE MANAGEMENT', 
      kategori: 'Lingkungan', 
      pemilik: 'Bu Rina', 
      status: 'draft', 
      desc: 'Sistem manajemen sampah terintegrasi.',
      gambar: null,
      gambarBase64: null
    },
  ];

  // ============================================
  // FUNGSI KOMPRES GAMBAR (SOLUSI PAYLOAD TOO LARGE)
  // ============================================

  const compressImage = (file, maxSizeKB = 80) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('File tidak ditemukan'));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          // Resize ke maksimal 600px (lebih kecil)
          let width = img.width;
          let height = img.height;
          const maxDimension = 600;
          
          if (width > maxDimension || height > maxDimension) {
            const ratio = Math.min(maxDimension / width, maxDimension / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Mulai dengan kualitas 0.7
          let quality = 0.7;
          let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          
          // Turunkan kualitas sampai ukuran < maxSizeKB
          let attempts = 0;
          while (compressedDataUrl.length > maxSizeKB * 1024 && quality > 0.1 && attempts < 10) {
            quality -= 0.05;
            compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            attempts++;
          }

          // Jika masih terlalu besar, resize ulang lebih kecil
          if (compressedDataUrl.length > maxSizeKB * 1024) {
            const newWidth = Math.round(width * 0.7);
            const newHeight = Math.round(height * 0.7);
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            compressedDataUrl = canvas.toDataURL('image/jpeg', 0.5);
          }

          const finalSize = (compressedDataUrl.length / 1024);
          console.log(`📊 Ukuran akhir: ${finalSize.toFixed(2)} KB (target < ${maxSizeKB} KB)`);
          
          resolve(compressedDataUrl);
        };
        img.onerror = () => {
          reject(new Error('Gagal memuat gambar'));
        };
      };
      reader.onerror = () => {
        reject(new Error('Gagal membaca file'));
      };
    });
  };

  // ============================================
  // FUNGSI API
  // ============================================

  const getData = async () => {
    setLoading(true);
    try {
      const [wargaRes, umkmRes, pengaduanRes, beritaRes] = await Promise.all([
        api.get("/warga"),
        api.get("/umkm"),
        api.get("/pengaduan"),
        api.get("/berita")
      ]);

      const warga = wargaRes.data || [];
      const umkmFromApi = umkmRes.data || [];
      const umkm = umkmFromApi.length > 0 
        ? umkmFromApi.map(item => ({
            ...item,
            gambar: item.gambar || item.gambarBase64 || null
          }))
        : defaultUmkmData;
      const pengaduan = pengaduanRes.data || [];
      const berita = beritaRes.data || [];

      setWargaData(warga);
      setUmkmData(umkm);
      setPengaduanData(pengaduan);
      setBeritaData(berita);

      const wargaAktif = warga.filter(w => w.status === 'aktif' || w.status === 'Warga').length;
      const wargaNonaktif = warga.filter(w => w.status === 'nonaktif').length;
      const umkmAktif = umkm.filter(u => u.status === 'aktif' || u.status === 'Aktif').length;
      const umkmNonaktif = umkm.filter(u => u.status === 'nonaktif' || u.status === 'Nonaktif' || u.status === 'draft').length;

      setStats({
        totalWarga: warga.length,
        totalUMKM: umkm.length,
        totalBerita: berita.length,
        totalPengaduan: pengaduan.length,
        wargaAktif: wargaAktif,
        wargaNonaktif: wargaNonaktif,
        umkmAktif: umkmAktif,
        umkmNonaktif: umkmNonaktif,
      });
    } catch (error) {
      console.log("Gagal mengambil data, menggunakan data default:", error);
      setUmkmData(defaultUmkmData);
      setStats({
        totalWarga: 0,
        totalUMKM: defaultUmkmData.length,
        totalBerita: 0,
        totalPengaduan: 0,
        wargaAktif: 0,
        wargaNonaktif: 0,
        umkmAktif: defaultUmkmData.filter(u => u.status === 'aktif').length,
        umkmNonaktif: defaultUmkmData.filter(u => u.status !== 'aktif').length,
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // FUNGSI UNTUK GAMBAR
  // ============================================

  // Fungsi handle upload gambar dengan kompresi
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('❌ Harap upload file gambar!');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
    const extension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      alert(`❌ Format file tidak didukung. Gunakan: ${allowedExtensions.join(', ')}`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(`❌ Ukuran gambar maksimal 5MB! (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    try {
      // Kompres gambar
      const compressedImage = await compressImage(file, 80);
      
      setSelectedImageFile(file);
      setImagePreview(compressedImage);
      setFormData(prev => ({
        ...prev,
        gambar: compressedImage
      }));

      console.log('✅ Gambar berhasil dikompres!');
    } catch (error) {
      console.error('❌ Gagal kompres gambar:', error);
      alert('❌ Gagal memproses gambar. Silakan coba lagi.');
    }
  };

  // Fungsi hapus gambar
  const handleRemoveImage = () => {
    setSelectedImageFile(null);
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      gambar: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ============================================
  // FUNGSI CRUD - UMKM dengan GAMBAR
  // ============================================

  const handleSubmitUMKM = async (e) => {
    e.preventDefault();
    
    console.log('📝 Form Data sebelum submit:', formData);
    console.log('📝 Is Editing:', isEditing);
    console.log('📝 Edit ID:', editId);

    if (!formData.nama || !formData.nama.trim()) {
      alert('❌ Nama UMKM harus diisi!');
      return;
    }
    
    if (!formData.kategori || !formData.kategori.trim()) {
      alert('❌ Kategori harus diisi!');
      return;
    }
    
    if (!formData.pemilik || !formData.pemilik.trim()) {
      alert('❌ Pemilik harus diisi!');
      return;
    }

    try {
      const newData = {
        nama: formData.nama.trim(),
        kategori: formData.kategori.trim(),
        pemilik: formData.pemilik.trim(),
        status: formData.status || 'aktif',
        desc: formData.desc || 'Deskripsi produk UMKM'
      };

      // Handle gambar - gunakan yang sudah dikompres
      if (formData.gambar && typeof formData.gambar === 'string') {
        const sizeInKB = (formData.gambar.length / 1024);
        console.log(`📸 Gambar size: ${sizeInKB.toFixed(2)} KB`);
        
        if (sizeInKB > 100) {
          console.warn('⚠️ Gambar masih > 100KB, kompres ulang...');
          // Kompres ulang jika masih terlalu besar
          const blob = dataURLToBlob(formData.gambar);
          const recompressed = await compressImage(blob, 80);
          newData.gambar = recompressed;
          newData.gambarBase64 = recompressed;
        } else {
          newData.gambar = formData.gambar;
          newData.gambarBase64 = formData.gambar;
        }
      } else {
        console.log('📸 Tidak ada gambar');
        newData.gambar = null;
        newData.gambarBase64 = null;
      }

      // Final check ukuran
      if (newData.gambar) {
        const finalSize = (newData.gambar.length / 1024);
        console.log(`📊 Final size: ${finalSize.toFixed(2)} KB`);
        if (finalSize > 100) {
          alert('⚠️ Gambar masih terlalu besar. Silakan upload gambar yang lebih kecil.');
          return;
        }
      }

      console.log('📤 Data yang akan dikirim:', {
        ...newData,
        gambar: newData.gambar ? `ADA (${(newData.gambar.length / 1024).toFixed(2)} KB)` : 'TIDAK ADA'
      });

      let response;
      if (isEditing && editId) {
        console.log(`🔄 Mengupdate UMKM dengan ID: ${editId}`);
        response = await api.put(`/umkm/${editId}`, newData);
        console.log('✅ Update response:', response.data);
        alert('✅ Data UMKM berhasil diupdate!');
      } else {
        console.log('➕ Menambahkan UMKM baru');
        response = await api.post('/umkm', newData);
        console.log('✅ Create response:', response.data);
        alert('✅ Data UMKM berhasil ditambahkan!');
      }

      setSelectedImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      closeModal();
      getData();
      
    } catch (error) {
      console.error('❌ ERROR DETAIL:', error);
      
      if (error.response) {
        console.error('❌ Response error:', error.response.data);
        console.error('❌ Status code:', error.response.status);
        
        let errorMessage = '❌ Gagal menyimpan data!';
        if (error.response.status === 413) {
          errorMessage = '❌ Ukuran gambar terlalu besar! Maksimal 100KB. Silakan upload gambar yang lebih kecil.';
        } else if (error.response.data?.message) {
          errorMessage += `\n${error.response.data.message}`;
        }
        alert(errorMessage);
      } else if (error.request) {
        alert('❌ Server tidak merespon. Periksa koneksi internet atau server sedang down.');
      } else {
        alert(`❌ Error: ${error.message}`);
      }
    }
  };

  // Helper: Convert dataURL ke Blob
  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleDeleteUMKM = async (id) => {
    if (window.confirm('⚠️ Yakin ingin menghapus data UMKM ini?')) {
      try {
        await api.delete(`/umkm/${id}`);
        alert('✅ Data UMKM berhasil dihapus!');
        getData();
      } catch (error) {
        console.error('Error deleting UMKM:', error);
        alert('❌ Gagal menghapus data!');
      }
    }
  };

  // ============================================
  // FUNGSI CRUD - WARGA
  // ============================================

  const handleSubmitWarga = async (e) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.nik) {
      alert('❌ Nama dan NIK harus diisi!');
      return;
    }

    const newData = {
      nama: formData.nama,
      nik: formData.nik,
      status: formData.status || 'Warga',
      noKK: formData.noKK || formData.nik,
      rt: formData.rt || '00',
      rw: formData.rw || '00',
      jenisRumah: formData.jenisRumah || 'Kepala Keluarga',
      statusKel: formData.statusKel || 'Menikah',
      tempatLhr: formData.tempatLhr || '-',
      tglLhr: formData.tglLhr || '2000-01-01',
      gender: formData.gender || 'Laki-laki'
    };

    try {
      if (isEditing) {
        await api.put(`/warga/${editId}`, newData);
        alert('✅ Data warga berhasil diupdate!');
      } else {
        await api.post('/warga', newData);
        alert('✅ Data warga berhasil ditambahkan!');
      }
      closeModal();
      getData();
    } catch (error) {
      console.error('Error saving warga:', error);
      alert('❌ Gagal menyimpan data!');
    }
  };

  const handleDeleteWarga = async (id) => {
    if (window.confirm('⚠️ Yakin ingin menghapus data ini?')) {
      try {
        await api.delete(`/warga/${id}`);
        alert('✅ Data berhasil dihapus!');
        getData();
      } catch (error) {
        console.error('Error deleting warga:', error);
        alert('❌ Gagal menghapus data!');
      }
    }
  };

  // ============================================
  // FUNGSI CRUD - PENGADUAN
  // ============================================

  const handleSubmitPengaduan = async (e) => {
    e.preventDefault();
    
    if (!formData.judul || !formData.pelapor || !formData.kategori) {
      alert('❌ Judul, Pelapor, dan Kategori harus diisi!');
      return;
    }

    const newData = {
      judul: formData.judul,
      pelapor: formData.pelapor || formData.nama,
      kategori: formData.kategori,
      deskripsi: formData.deskripsi || '',
      status: formData.status || 'DIPROSES',
      tanggal: new Date().toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      rt: formData.rt || '00',
      rw: formData.rw || '00'
    };

    try {
      if (isEditing) {
        await api.put(`/pengaduan/${editId}`, newData);
        alert('✅ Pengaduan berhasil diupdate!');
      } else {
        await api.post('/pengaduan', newData);
        alert('✅ Pengaduan berhasil ditambahkan!');
      }
      closeModal();
      getData();
    } catch (error) {
      console.error('Error saving pengaduan:', error);
      alert('❌ Gagal menyimpan data!');
    }
  };

  const handleDeletePengaduan = async (id) => {
    if (window.confirm('⚠️ Yakin ingin menghapus pengaduan ini?')) {
      try {
        await api.delete(`/pengaduan/${id}`);
        alert('✅ Pengaduan berhasil dihapus!');
        getData();
      } catch (error) {
        console.error('Error deleting pengaduan:', error);
        alert('❌ Gagal menghapus data!');
      }
    }
  };

  // ============================================
  // FUNGSI CRUD - BERITA
  // ============================================

  const handleSubmitBerita = async (e) => {
    e.preventDefault();
    
    if (!formData.judul || !formData.tanggal) {
      alert('❌ Judul dan Tanggal harus diisi!');
      return;
    }

    const newData = {
      judul: formData.judul,
      tanggal: formData.tanggal,
      penulis: formData.penulis || 'Admin Desa',
      status: formData.status || 'draft',
      desc: formData.desc || ''
    };

    try {
      if (isEditing) {
        await api.put(`/berita/${editId}`, newData);
        alert('✅ Berita berhasil diupdate!');
      } else {
        await api.post('/berita', newData);
        alert('✅ Berita berhasil ditambahkan!');
      }
      closeModal();
      getData();
    } catch (error) {
      console.error('Error saving berita:', error);
      alert('❌ Gagal menyimpan data!');
    }
  };

  const handleDeleteBerita = async (id) => {
    if (window.confirm('⚠️ Yakin ingin menghapus berita ini?')) {
      try {
        await api.delete(`/berita/${id}`);
        alert('✅ Berita berhasil dihapus!');
        getData();
      } catch (error) {
        console.error('Error deleting berita:', error);
        alert('❌ Gagal menghapus data!');
      }
    }
  };

  // ============================================
  // FUNGSI MODAL
  // ============================================

  const openModal = (type, data = null) => {
    setSelectedImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    if (data) {
      setIsEditing(true);
      setEditId(data.id);
      setModalType(type);
      
      const formFields = {
        warga: {
          nama: data.nama || '',
          nik: data.nik || '',
          noKK: data.noKK || '',
          rt: data.rt || '',
          rw: data.rw || '',
          jenisRumah: data.jenisRumah || 'Kepala Keluarga',
          statusKel: data.statusKel || 'Menikah',
          tempatLhr: data.tempatLhr || '',
          tglLhr: data.tglLhr || '',
          gender: data.gender || 'Laki-laki',
          status: data.status || 'Warga',
        },
        umkm: {
          nama: data.nama || '',
          kategori: data.kategori || '',
          pemilik: data.pemilik || '',
          status: data.status || 'aktif',
          desc: data.desc || '',
          gambar: data.gambar || data.gambarBase64 || null,
        },
        pengaduan: {
          judul: data.judul || '',
          pelapor: data.pelapor || data.nama || '',
          kategori: data.kategori || '',
          deskripsi: data.deskripsi || '',
          status: data.status || 'DIPROSES',
          rt: data.rt || '',
          rw: data.rw || '',
        },
        berita: {
          judul: data.judul || '',
          tanggal: data.tanggal || '',
          penulis: data.penulis || '',
          status: data.status || 'draft',
          desc: data.desc || '',
        },
      };
      setFormData(formFields[type] || {});
      
      if (type === 'umkm' && (data.gambar || data.gambarBase64)) {
        setImagePreview(data.gambar || data.gambarBase64);
      }
    } else {
      setIsEditing(false);
      setEditId(null);
      setModalType(type);
      setFormData(type === 'umkm' ? {
        nama: '',
        kategori: '',
        pemilik: '',
        status: 'aktif',
        desc: '',
        gambar: null
      } : {});
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
    setModalType('');
    setIsEditing(false);
    setEditId(null);
    setSelectedImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ============================================
  // FUNGSI EXPORT EXCEL
  // ============================================

  const downloadExcel = (data, filename, headers) => {
    if (!data || data.length === 0) {
      alert('⚠️ Tidak ada data untuk diexport!');
      return;
    }

    const excelData = data.map(item => {
      const row = {};
      headers.forEach(header => {
        row[header.label] = item[header.key] || '-';
      });
      return row;
    });

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `${filename}.xlsx`);
  };

  const exportWarga = () => {
    const headers = [
      { key: 'id', label: 'No' },
      { key: 'nama', label: 'Nama' },
      { key: 'nik', label: 'NIK' },
      { key: 'noKK', label: 'NO KK' },
      { key: 'rt', label: 'RT' },
      { key: 'rw', label: 'RW' },
      { key: 'jenisRumah', label: 'Jenis Rumah' },
      { key: 'statusKel', label: 'Status Kel.' },
      { key: 'tempatLhr', label: 'Tempat Lahir' },
      { key: 'tglLhr', label: 'Tanggal Lahir' },
      { key: 'gender', label: 'Gender' },
      { key: 'status', label: 'Status' },
    ];
    downloadExcel(wargaData, 'Data_Warga', headers);
  };

  const exportUMKM = () => {
    const headers = [
      { key: 'id', label: 'No' },
      { key: 'nama', label: 'Nama UMKM' },
      { key: 'kategori', label: 'Kategori' },
      { key: 'pemilik', label: 'Pemilik' },
      { key: 'status', label: 'Status' },
      { key: 'desc', label: 'Deskripsi' },
    ];
    downloadExcel(umkmData, 'Data_UMKM', headers);
  };

  const exportPengaduan = () => {
    const headers = [
      { key: 'id', label: 'No' },
      { key: 'judul', label: 'Judul Pengaduan' },
      { key: 'pelapor', label: 'Pelapor' },
      { key: 'kategori', label: 'Kategori' },
      { key: 'status', label: 'Status' },
      { key: 'tanggal', label: 'Tanggal' },
      { key: 'deskripsi', label: 'Deskripsi' },
    ];
    downloadExcel(pengaduanData, 'Data_Pengaduan', headers);
  };

  const exportBerita = () => {
    const headers = [
      { key: 'id', label: 'No' },
      { key: 'judul', label: 'Judul' },
      { key: 'tanggal', label: 'Tanggal' },
      { key: 'penulis', label: 'Penulis' },
      { key: 'status', label: 'Status' },
    ];
    downloadExcel(beritaData, 'Data_Berita', headers);
  };

  // ============================================
  // EFFECTS
  // ============================================

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role === 'admin') {
        setUser(parsedUser);
      } else {
        navigate('/');
      }
    } else {
      setUser({ name: 'Admin Desa', email: 'admin@desa.com', role: 'admin' });
    }
  }, [navigate]);

  useEffect(() => {
    getData();
  }, []);

  // ============================================
  // HANDLERS
  // ============================================

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleMenuChange = (menuId) => {
    setActiveMenu(menuId);
    if (menuId === 'warga' || menuId === 'umkm' || menuId === 'berita' || menuId === 'pengaduan') {
      getData();
    }
  };

  // ============================================
  // CHART DATA
  // ============================================

  const getWargaPerDusun = () => {
    const dusunCount = {};
    wargaData.forEach(w => {
      const dusun = w.tempatLhr || 'Unknown';
      dusunCount[dusun] = (dusunCount[dusun] || 0) + 1;
    });
    const sorted = Object.entries(dusunCount).sort((a, b) => b[1] - a[1]);
    return {
      labels: sorted.slice(0, 6).map(item => item[0]),
      datasets: [
        {
          label: 'Jumlah Warga',
          data: sorted.slice(0, 6).map(item => item[1]),
          backgroundColor: [
            'rgba(26, 82, 118, 0.8)',
            'rgba(41, 128, 185, 0.8)',
            'rgba(52, 152, 219, 0.8)',
            'rgba(46, 204, 113, 0.8)',
            'rgba(241, 196, 15, 0.8)',
            'rgba(231, 76, 60, 0.8)',
          ],
          borderColor: [
            'rgba(26, 82, 118, 1)',
            'rgba(41, 128, 185, 1)',
            'rgba(52, 152, 219, 1)',
            'rgba(46, 204, 113, 1)',
            'rgba(241, 196, 15, 1)',
            'rgba(231, 76, 60, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const getWargaStatusData = () => {
    const aktif = wargaData.filter(w => w.status === 'aktif' || w.status === 'Warga').length;
    const nonaktif = wargaData.filter(w => w.status === 'nonaktif').length;
    return {
      labels: ['Aktif', 'Nonaktif'],
      datasets: [
        {
          data: [aktif || 1, nonaktif || 1],
          backgroundColor: ['#27ae60', '#e74c3c'],
          borderColor: ['#27ae60', '#e74c3c'],
          borderWidth: 2,
        },
      ],
    };
  };

  const getUmkmPerKategori = () => {
    const kategoriCount = {};
    umkmData.forEach(u => {
      kategoriCount[u.kategori] = (kategoriCount[u.kategori] || 0) + 1;
    });
    return {
      labels: Object.keys(kategoriCount),
      datasets: [
        {
          label: 'Jumlah UMKM',
          data: Object.values(kategoriCount),
          backgroundColor: [
            'rgba(46, 204, 113, 0.8)',
            'rgba(241, 196, 15, 0.8)',
            'rgba(231, 76, 60, 0.8)',
            'rgba(155, 89, 182, 0.8)',
            'rgba(52, 152, 219, 0.8)',
          ],
          borderColor: [
            'rgba(46, 204, 113, 1)',
            'rgba(241, 196, 15, 1)',
            'rgba(231, 76, 60, 1)',
            'rgba(155, 89, 182, 1)',
            'rgba(52, 152, 219, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  // ============================================
  // RENDER DASHBOARD
  // ============================================

  const renderDashboard = () => {
    const wargaAktif = wargaData.filter(w => w.status === 'aktif' || w.status === 'Warga').length;
    const wargaNonaktif = wargaData.filter(w => w.status === 'nonaktif').length;

    return (
      <div className="admin-dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-info">
              <h3>{wargaData.length.toLocaleString()}</h3>
              <p>Total Warga</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <h3>{umkmData.filter(u => u.status === 'aktif' || u.status === 'Aktif').length}</h3>
              <p>UMKM Aktif</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <h3>{beritaData.length}</h3>
              <p>Total Berita</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <h3>{pengaduanData.length}</h3>
              <p>Pengaduan Masuk</p>
            </div>
          </div>
        </div>

        <div className="admin-welcome">
          <h2> Selamat Datang, {user?.name || 'Admin Desa'}!</h2>
          <p>Anda login sebagai Administrator Desa Padakembang</p>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>📊 Distribusi Warga per Kota</h3>
            <div className="chart-container">
              <Bar data={getWargaPerDusun()} options={barOptions} />
            </div>
          </div>
          <div className="chart-card">
            <h3>📈 Status Warga</h3>
            <div className="chart-container doughnut">
              <Doughnut data={getWargaStatusData()} options={doughnutOptions} />
              <div className="chart-legend-custom">
                <span>🟢 Aktif: {wargaAktif}</span>
                <span>🔴 Nonaktif: {wargaNonaktif}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>📊 UMKM per Kategori</h3>
            <div className="chart-container">
              <Bar data={getUmkmPerKategori()} options={barOptions} />
            </div>
          </div>
          <div className="chart-card">
            <h3>📈 Status UMKM</h3>
            <div className="chart-container doughnut">
              <Doughnut data={{
                labels: ['Aktif', 'Nonaktif'],
                datasets: [{
                  data: [
                    umkmData.filter(u => u.status === 'aktif' || u.status === 'Aktif').length,
                    umkmData.filter(u => u.status !== 'aktif' && u.status !== 'Aktif').length
                  ],
                  backgroundColor: ['#27ae60', '#e74c3c'],
                  borderColor: ['#27ae60', '#e74c3c'],
                  borderWidth: 2,
                }]
              }} options={doughnutOptions} />
              <div className="chart-legend-custom">
                <span>🟢 Aktif: {umkmData.filter(u => u.status === 'aktif' || u.status === 'Aktif').length}</span>
                <span>🔴 Nonaktif: {umkmData.filter(u => u.status !== 'aktif' && u.status !== 'Aktif').length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h3> Aksi Cepat</h3>
          <div className="quick-actions-grid">
            <button className="quick-action-btn" onClick={() => openModal('warga')}>
              <span></span> Tambah Warga
            </button>
            <button className="quick-action-btn" onClick={() => openModal('umkm')}>
              <span></span> Tambah UMKM
            </button>
            <button className="quick-action-btn" onClick={() => openModal('berita')}>
              <span></span> Tambah Berita
            </button>
            <button className="quick-action-btn" onClick={() => openModal('pengaduan')}>
              <span></span> Tambah Pengaduan
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // RENDER DATA WARGA
  // ============================================

  const renderWarga = () => {
    const rwList = ['Semua RW', ...new Set(wargaData.map(w => {
      return w.rw ? `RW ${w.rw}` : null;
    }).filter(Boolean))];

    const filteredData = wargaData.filter(item => {
      const matchSearch = 
        item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nik?.includes(searchTerm);
      const matchRW = selectedRW === 'Semua RW' || `RW ${item.rw}` === selectedRW;
      return matchSearch && matchRW;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const totalWarga = wargaData.length;
    const punyaKTP = wargaData.filter(w => w.nik).length;
    const lakiLaki = wargaData.filter(w => w.gender === 'Laki-laki').length;
    const perempuan = wargaData.filter(w => w.gender === 'Perempuan').length;
    const wargaPendatang = Math.floor(wargaData.length * 0.2);

    const formatDate = (dateStr) => {
      if (!dateStr) return '-';
      try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      } catch {
        return dateStr;
      }
    };

    return (
      <div className="admin-content">
        <div className="page-header">
          <div>
            <h2> Data Warga</h2>
            <p className="page-desc">Kelola data administrasi dan demografi warga desa secara komprehensif.</p>
          </div>
          <div className="header-actions">
            <button className="btn-export" onClick={exportWarga}>
               Export Excel
            </button>
            <button className="btn-add" onClick={() => openModal('warga')}>
               Tambah Warga
            </button>
          </div>
        </div>

        <div className="sub-stats-grid warga-stats-grid">
          <div className="sub-stat-card">
            <div className="sub-stat-info">
              <h3>{totalWarga}</h3>
              <p>TOTAL WARGA</p>
            </div>
          </div>
          <div className="sub-stat-card">
            <div className="sub-stat-info">
              <h3>{punyaKTP}</h3>
              <p>PUNYA KTP</p>
            </div>
          </div>
          <div className="sub-stat-card">
            <div className="sub-stat-info">
              <h3>{lakiLaki} / {perempuan}</h3>
              <p>LAKI-LAKI / PR</p>
            </div>
          </div>
          <div className="sub-stat-card">
            <div className="sub-stat-info">
              <h3>{wargaPendatang}</h3>
              <p>WARGA PENDATANG</p>
            </div>
          </div>
        </div>

        <div className="search-filter">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Cari NIK, nama lengkap, atau pekerjaan..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>
          <div className="filter-wrapper">
            <select 
              className="filter-select"
              value={selectedRW}
              onChange={(e) => {
                setSelectedRW(e.target.value);
                setCurrentPage(1);
              }}
            >
              {rwList.map(rw => (
                <option key={rw} value={rw}>{rw}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>AKSI</th>
                <th>NAMA &amp; NIK</th>
                <th>STATUS WARGA</th>
                <th>NO KK</th>
                <th>RT/RW</th>
                <th>JENIS RUMAH</th>
                <th>STATUS KEL.</th>
                <th>TEMPAT LHR</th>
                <th>TGL LAHIR</th>
                <th>GENDER</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="10" className="table-empty">Tidak ada data yang ditemukan</td>
                </tr>
              ) : (
                currentData.map((item) => {
                  const rtRw = item.rt && item.rw ? `${item.rt}/${item.rw}` : '-';
                  return (
                    <tr key={item.id}>
                      <td>
                        <button className="btn-edit" title="Edit" onClick={() => openModal('warga', item)}>✏️</button>
                        <button className="btn-delete" title="Hapus" onClick={() => handleDeleteWarga(item.id)}>🗑️</button>
                      </td>
                      <td>
                        <div className="warga-name">
                          <strong>{item.nama}</strong>
                          <span className="warga-nik">{item.nik}</span>
                        </div>
                      </td>
                      <td><span className="badge warga">{item.status || 'Warga'}</span></td>
                      <td>{item.noKK || '-'}</td>
                      <td>{rtRw}</td>
                      <td>{item.jenisRumah || '-'}</td>
                      <td>{item.statusKel || '-'}</td>
                      <td>{item.tempatLhr || '-'}</td>
                      <td>{formatDate(item.tglLhr)}</td>
                      <td>
                        <span className={`gender-badge ${item.gender === 'Laki-laki' ? 'male' : 'female'}`}>
                          {item.gender === 'Laki-laki' ? '♂' : '♀'} {item.gender || '-'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ◀
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="pagination-dots">...</span>
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              ▶
            </button>
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // RENDER UMKM dengan GAMBAR
  // ============================================

  const renderUMKM = () => {
    const filteredData = umkmData.filter(item => {
      const matchSearch = 
        item.nama?.toLowerCase().includes(umkmSearchTerm.toLowerCase()) ||
        item.pemilik?.toLowerCase().includes(umkmSearchTerm.toLowerCase());
      const matchStatus = umkmStatusFilter === 'Semua Status' || 
        (umkmStatusFilter === 'Aktif' && (item.status === 'aktif' || item.status === 'Aktif')) ||
        (umkmStatusFilter === 'Nonaktif' && (item.status === 'nonaktif' || item.status === 'Nonaktif')) ||
        (umkmStatusFilter === 'Menunggu Validasi' && item.status === 'draft');
      return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filteredData.length / umkmItemsPerPage);
    const startIndex = (umkmCurrentPage - 1) * umkmItemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + umkmItemsPerPage);

    const totalUMKM = umkmData.length;
    const statusAktif = umkmData.filter(u => u.status === 'aktif' || u.status === 'Aktif').length;
    const statusNonaktif = umkmData.filter(u => u.status === 'nonaktif' || u.status === 'Nonaktif').length;
    const menungguValidasi = umkmData.filter(u => u.status === 'draft').length;

    const getStatusInfo = (status) => {
      if (status === 'aktif' || status === 'Aktif') {
        return { label: 'Aktif', icon: '●', color: '#27ae60', bg: '#d5f5e3', class: 'aktif' };
      } else if (status === 'nonaktif' || status === 'Nonaktif') {
        return { label: 'Nonaktif', icon: '●', color: '#e74c3c', bg: '#fde8e8', class: 'nonaktif' };
      } else if (status === 'draft') {
        return { label: 'Menunggu Validasi', icon: '●', color: '#f39c12', bg: '#fdebd0', class: 'draft' };
      }
      return { label: status || 'Unknown', icon: '●', color: '#95a5a6', bg: '#ecf0f1', class: '' };
    };

    const getImageUrl = (item) => {
      if (item.gambar) return item.gambar;
      if (item.gambarBase64) return item.gambarBase64;
      return null;
    };

    return (
      <div className="admin-content umkm-page">
        <div className="umkm-header">
          <div className="umkm-header-left">
            <h2> Manajemen Data UMKM</h2>
            <p className="page-desc">Kelola dan monitor seluruh unit usaha mikro, kecil, dan menengah yang terdaftar di wilayah administrasi desa.</p>
          </div>
          <div className="umkm-header-right">
            <button className="btn-export" onClick={exportUMKM}>
               Export Excel
            </button>
            <button className="btn-add" onClick={() => openModal('umkm')}>
               Tambah UMKM
            </button>
          </div>
        </div>

        <div className="umkm-stats">
          <div className="umkm-stat-item total">
            <div className="stat-number">{totalUMKM}</div>
            <div className="stat-label"> Total UMKM</div>
          </div>
          <div className="umkm-stat-item aktif">
            <div className="stat-number">{statusAktif}</div>
            <div className="stat-label"> Status Aktif</div>
          </div>
          <div className="umkm-stat-item nonaktif">
            <div className="stat-number">{statusNonaktif}</div>
            <div className="stat-label"> Nonaktif</div>
          </div>
          <div className="umkm-stat-item validasi">
            <div className="stat-number">{menungguValidasi}</div>
            <div className="stat-label"> Menunggu Validasi</div>
          </div>
        </div>

        <div className="umkm-search-filter">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Cari nama usaha atau pemilik..."
              value={umkmSearchTerm}
              onChange={(e) => {
                setUmkmSearchTerm(e.target.value);
                setUmkmCurrentPage(1);
              }}
              className="search-input"
            />
          </div>
          <div className="filter-wrapper">
            <select 
              className="filter-select"
              value={umkmStatusFilter}
              onChange={(e) => {
                setUmkmStatusFilter(e.target.value);
                setUmkmCurrentPage(1);
              }}
            >
              <option value="Semua Status"> Semua Status</option>
              <option value="Aktif"> Aktif</option>
              <option value="Nonaktif"> Nonaktif</option>
              <option value="Menunggu Validasi"> Menunggu Validasi</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="admin-table umkm-table">
            <thead>
              <tr>
                <th className="col-gambar">GAMBAR</th>
                <th className="col-nama">NAMA USAHA</th>
                <th className="col-pemilik">PEMILIK</th>
                <th className="col-kategori">KATEGORI PRODUK</th>
                <th className="col-status">STATUS</th>
                <th className="col-aksi">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="table-empty">📭 Tidak ada data UMKM yang ditemukan</td>
                </tr>
              ) : (
                currentData.map((item) => {
                  const statusInfo = getStatusInfo(item.status);
                  const imageUrl = getImageUrl(item);
                  return (
                    <tr key={item.id} className="umkm-row">
                      <td className="col-gambar">
                        {imageUrl ? (
                          <div className="umkm-image-wrapper">
                            <img 
                              src={imageUrl} 
                              alt={item.nama}
                              className="umkm-thumbnail"
                              onClick={() => setSelectedImageForModal(imageUrl)}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                const parent = e.target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `
                                    <div class="umkm-image-placeholder">
                                      <span>📷</span>
                                      <small>No Image</small>
                                    </div>
                                  `;
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <div className="umkm-image-placeholder">
                            <span>📷</span>
                            <small>No Image</small>
                          </div>
                        )}
                      </td>
                      <td className="col-nama">
                        <div className="umkm-name">
                          <strong>{item.nama}</strong>
                          <span className="umkm-desc-text">{item.desc || 'Deskripsi produk UMKM'}</span>
                        </div>
                      </td>
                      <td className="col-pemilik">
                        <div className="pemilik-info">
                          {item.pemilik || '-'}
                        </div>
                      </td>
                      <td className="col-kategori">
                        <span className="kategori-badge-umkm">{item.kategori || '-'}</span>
                      </td>
                      <td className="col-status">
                        <span 
                          className={`status-badge-umkm ${statusInfo.class}`}
                          style={{ 
                            backgroundColor: statusInfo.bg,
                            color: statusInfo.color
                          }}
                        >
                          <span style={{ color: statusInfo.color }}>{statusInfo.icon}</span> {statusInfo.label}
                        </span>
                      </td>
                      <td className="col-aksi">
                        <button 
                          className="btn-edit" 
                          title="Edit" 
                          onClick={() => openModal('umkm', item)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-delete" 
                          title="Hapus" 
                          onClick={() => handleDeleteUMKM(item.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => setUmkmCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={umkmCurrentPage === 1}
            >
              ◀
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (umkmCurrentPage <= 3) {
                pageNum = i + 1;
              } else if (umkmCurrentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = umkmCurrentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  className={`pagination-btn ${umkmCurrentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setUmkmCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && umkmCurrentPage < totalPages - 2 && (
              <>
                <span className="pagination-dots">...</span>
                <button
                  className="pagination-btn"
                  onClick={() => setUmkmCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
            <button
              className="pagination-btn"
              onClick={() => setUmkmCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={umkmCurrentPage === totalPages}
            >
              ▶
            </button>
          </div>
        )}

        {selectedImageForModal && (
          <div className="image-modal-overlay" onClick={() => setSelectedImageForModal(null)}>
            <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="image-modal-close" onClick={() => setSelectedImageForModal(null)}>
                ✕
              </button>
              <img src={selectedImageForModal} alt="Preview" className="image-modal-preview" />
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // RENDER BERITA
  // ============================================

  const renderBerita = () => {
    const filteredData = beritaData.filter(item =>
      item.judul?.toLowerCase().includes(beritaSearchTerm.toLowerCase()) ||
      item.penulis?.toLowerCase().includes(beritaSearchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / beritaItemsPerPage);
    const startIndex = (beritaCurrentPage - 1) * beritaItemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + beritaItemsPerPage);

    const totalBerita = beritaData.length;
    const beritaPublished = beritaData.filter(b => b.status === 'aktif' || b.status === 'Aktif').length;
    const beritaDraft = beritaData.filter(b => b.status === 'draft').length;

    const getStatusInfo = (status) => {
      if (status === 'aktif' || status === 'Aktif') {
        return { label: 'Aktif', class: 'aktif' };
      } else if (status === 'draft') {
        return { label: 'Draft', class: 'draft' };
      }
      return { label: status || 'Unknown', class: '' };
    };

    const formatDate = (dateStr) => {
      if (!dateStr) return '-';
      try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      } catch {
        return dateStr;
      }
    };

    return (
      <div className="admin-content berita-page">
        <div className="berita-header">
          <div className="berita-header-left">
            <h2> Berita & Kegiatan</h2>
            <p className="page-desc">Kelola publikasi artikel berita dan agenda kegiatan desa kepada masyarakat.</p>
          </div>
          <div className="berita-header-right">
            <button className="btn-export" onClick={exportBerita}>
               Export Excel
            </button>
            <button className="btn-add" onClick={() => openModal('berita')}>
               Tambah Berita
            </button>
          </div>
        </div>

        <div className="berita-stats">
          <div className="berita-stat-item total">
            <div className="stat-number">{totalBerita}</div>
            <div className="stat-label"> Total Berita</div>
          </div>
          <div className="berita-stat-item published">
            <div className="stat-number">{beritaPublished}</div>
            <div className="stat-label">✅ Published</div>
          </div>
          <div className="berita-stat-item draft">
            <div className="stat-number">{beritaDraft}</div>
            <div className="stat-label"> Draft</div>
          </div>
        </div>

        <div className="berita-search">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Cari judul berita atau kegiatan..."
              value={beritaSearchTerm}
              onChange={(e) => {
                setBeritaSearchTerm(e.target.value);
                setBeritaCurrentPage(1);
              }}
              className="search-input"
            />
          </div>
        </div>

        <div className="table-container">
          <table className="admin-table berita-table">
            <thead>
              <tr>
                <th className="col-no">NO</th>
                <th className="col-judul">JUDUL</th>
                <th className="col-tanggal">TANGGAL</th>
                <th className="col-penulis">PENULIS</th>
                <th className="col-status">STATUS</th>
                <th className="col-aksi">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="table-empty">📭 Belum ada berita</td>
                </tr>
              ) : (
                currentData.map((item, index) => {
                  const statusInfo = getStatusInfo(item.status);
                  return (
                    <tr key={item.id} className="berita-row">
                      <td className="col-no">
                        <span className="row-number">{(beritaCurrentPage - 1) * beritaItemsPerPage + index + 1}</span>
                      </td>
                      <td className="col-judul">
                        <div className="berita-title">{item.judul}</div>
                        {item.desc && (
                          <div className="berita-desc">{item.desc}</div>
                        )}
                      </td>
                      <td className="col-tanggal">
                        <div className="tanggal-info">
                          <span className="tanggal-icon">📅</span>
                          {formatDate(item.tanggal)}
                        </div>
                      </td>
                      <td className="col-penulis">
                        <div className="penulis-info">
                          {item.penulis || 'Admin'}
                        </div>
                      </td>
                      <td className="col-status">
                        <span className={`status-badge-berita ${statusInfo.class}`}>
                          {statusInfo.icon} {statusInfo.label}
                        </span>
                      </td>
                      <td className="col-aksi">
                        <button 
                          className="btn-edit" 
                          title="Edit" 
                          onClick={() => openModal('berita', item)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-delete" 
                          title="Hapus" 
                          onClick={() => handleDeleteBerita(item.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => setBeritaCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={beritaCurrentPage === 1}
            >
              ◀
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (beritaCurrentPage <= 3) {
                pageNum = i + 1;
              } else if (beritaCurrentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = beritaCurrentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  className={`pagination-btn ${beritaCurrentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setBeritaCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && beritaCurrentPage < totalPages - 2 && (
              <>
                <span className="pagination-dots">...</span>
                <button
                  className="pagination-btn"
                  onClick={() => setBeritaCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
            <button
              className="pagination-btn"
              onClick={() => setBeritaCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={beritaCurrentPage === totalPages}
            >
              ▶
            </button>
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // RENDER PENGADUAN
  // ============================================

  const renderPengaduan = () => {
    const filteredData = pengaduanData.filter(item => {
      const matchSearch = 
        item.judul?.toLowerCase().includes(beritaSearchTerm.toLowerCase()) ||
        item.pelapor?.toLowerCase().includes(beritaSearchTerm.toLowerCase()) ||
        item.kategori?.toLowerCase().includes(beritaSearchTerm.toLowerCase());
      const matchStatus = pengaduanStatusFilter === 'Semua Status' || 
        item.status === pengaduanStatusFilter;
      return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filteredData.length / pengaduanItemsPerPage);
    const startIndex = (pengaduanCurrentPage - 1) * pengaduanItemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + pengaduanItemsPerPage);

    const totalPengaduan = pengaduanData.length;
    const selesai = pengaduanData.filter(p => p.status === 'SELESAI' || p.status === 'selesai').length;
    const diproses = pengaduanData.filter(p => p.status === 'DIPROSES' || p.status === 'proses').length;
    const ditolak = pengaduanData.filter(p => p.status === 'DITOLAK' || p.status === 'ditolak').length;

    const getStatusLabel = (status) => {
      if (status === 'SELESAI' || status === 'selesai') return { label: 'Selesai', icon: '✅', class: 'selesai' };
      if (status === 'DIPROSES' || status === 'proses') return { label: 'Diproses', icon: '🔄', class: 'diproses' };
      if (status === 'DITOLAK' || status === 'ditolak') return { label: 'Ditolak', icon: '❌', class: 'ditolak' };
      return { label: status || 'Unknown', icon: '❓', class: '' };
    };

    return (
      <div className="admin-content pengaduan-page">
        <div className="pengaduan-header">
          <div className="pengaduan-header-left">
            <h2> Pengaduan Warga</h2>
            <p className="page-desc">Monitor dan kelola pengaduan dari warga desa.</p>
          </div>
          <div className="pengaduan-header-right">
            <button className="btn-export" onClick={exportPengaduan}>
              📊 Export Excel
            </button>
            <button className="btn-add" onClick={() => openModal('pengaduan')}>
              ➕ Tambah Pengaduan
            </button>
          </div>
        </div>

        <div className="pengaduan-stats">
          <div className="pengaduan-stat-item total">
            <div className="stat-number">{totalPengaduan}</div>
            <div className="stat-label">📊 Total Pengaduan</div>
          </div>
          <div className="pengaduan-stat-item diproses">
            <div className="stat-number">{diproses}</div>
            <div className="stat-label">🔄 Diproses</div>
          </div>
          <div className="pengaduan-stat-item selesai">
            <div className="stat-number">{selesai}</div>
            <div className="stat-label">✅ Selesai</div>
          </div>
          <div className="pengaduan-stat-item ditolak">
            <div className="stat-number">{ditolak}</div>
            <div className="stat-label">❌ Ditolak</div>
          </div>
        </div>

        <div className="pengaduan-search-filter">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Cari judul, pelapor, atau kategori..."
              value={beritaSearchTerm}
              onChange={(e) => {
                setBeritaSearchTerm(e.target.value);
                setPengaduanCurrentPage(1);
              }}
              className="search-input"
            />
          </div>
          <div className="filter-wrapper">
            <select 
              className="filter-select"
              value={pengaduanStatusFilter}
              onChange={(e) => {
                setPengaduanStatusFilter(e.target.value);
                setPengaduanCurrentPage(1);
              }}
            >
              <option value="Semua Status">📋 Semua Status</option>
              <option value="DIPROSES">🔄 Diproses</option>
              <option value="SELESAI">✅ Selesai</option>
              <option value="DITOLAK">❌ Ditolak</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="admin-table pengaduan-table">
            <thead>
              <tr>
                <th className="col-no">NO</th>
                <th className="col-judul">JUDUL</th>
                <th className="col-pelapor">PELAPOR</th>
                <th className="col-kategori">KATEGORI</th>
                <th className="col-status">STATUS</th>
                <th className="col-aksi">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="table-empty">📭 Belum ada pengaduan</td>
                </tr>
              ) : (
                currentData.map((item, index) => {
                  const statusInfo = getStatusLabel(item.status);
                  return (
                    <tr key={item.id} className="pengaduan-row">
                      <td className="col-no">
                        <span className="row-number">{(pengaduanCurrentPage - 1) * pengaduanItemsPerPage + index + 1}</span>
                      </td>
                      <td className="col-judul">
                        <div className="pengaduan-title">{item.judul}</div>
                        {item.deskripsi && (
                          <div className="pengaduan-desc">{item.deskripsi}</div>
                        )}
                      </td>
                      <td className="col-pelapor">
                        <div className="pelapor-info">
                          {item.pelapor || item.nama || '-'}
                        </div>
                      </td>
                      <td className="col-kategori">
                        <span className={`kategori-badge ${item.kategori}`}>
                          {item.kategori || '-'}
                        </span>
                      </td>
                      <td className="col-status">
                        <span className={`status-badge-pengaduan ${statusInfo.class}`}>
                          {statusInfo.icon} {statusInfo.label}
                        </span>
                      </td>
                      <td className="col-aksi">
                        <button 
                          className="btn-edit" 
                          title="Edit" 
                          onClick={() => openModal('pengaduan', item)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-delete" 
                          title="Hapus" 
                          onClick={() => handleDeletePengaduan(item.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => setPengaduanCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={pengaduanCurrentPage === 1}
            >
              ◀
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (pengaduanCurrentPage <= 3) {
                pageNum = i + 1;
              } else if (pengaduanCurrentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = pengaduanCurrentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  className={`pagination-btn ${pengaduanCurrentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setPengaduanCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && pengaduanCurrentPage < totalPages - 2 && (
              <>
                <span className="pagination-dots">...</span>
                <button
                  className="pagination-btn"
                  onClick={() => setPengaduanCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
            <button
              className="pagination-btn"
              onClick={() => setPengaduanCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={pengaduanCurrentPage === totalPages}
            >
              ▶
            </button>
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // RENDER CCTV
  // ============================================

  const renderCCTV = () => (
    <div className="admin-content">
      <h2> Manajemen CCTV</h2>
      <div className="cctv-management">
        <div className="cctv-status-grid">
          <div className="cctv-status-item online">
            <span>🟢</span>
            <div>
              <h4>Pintu Gerbang Utama</h4>
              <p>Online - Jalan Raya</p>
            </div>
          </div>
          <div className="cctv-status-item online">
            <span>🟢</span>
            <div>
              <h4>Balai Desa</h4>
              <p>Online - Pusat Desa</p>
            </div>
          </div>
          <div className="cctv-status-item online">
            <span>🟢</span>
            <div>
              <h4>Pasar Desa</h4>
              <p>Online - Pasar Sentral</p>
            </div>
          </div>
          <div className="cctv-status-item maintenance">
            <span>🟡</span>
            <div>
              <h4>Lapangan Desa</h4>
              <p>Maintenance - Area Olahraga</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // RENDER PENGATURAN
  // ============================================

  const renderPengaturan = () => (
    <div className="admin-content">
      <div className="settings-form">
        <div className="settings-group">
          <h3>Profil Admin</h3>
          <div className="form-group">
            <label>Nama</label>
            <input type="text" value={user?.name || ''} className="form-input" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={user?.email || ''} className="form-input" />
          </div>
          <button className="btn-save">Simpan Perubahan</button>
        </div>
        <div className="settings-group">
          <h3>Keamanan</h3>
          <div className="form-group">
            <label>Password Lama</label>
            <input type="password" placeholder="Masukkan password lama" className="form-input" />
          </div>
          <div className="form-group">
            <label>Password Baru</label>
            <input type="password" placeholder="Masukkan password baru" className="form-input" />
          </div>
          <button className="btn-save">Ubah Password</button>
        </div>
      </div>
    </div>
  );

  // ============================================
  // RENDER MODAL
  // ============================================

  const renderModal = () => {
    if (!showModal) return null;

    let title = '';
    let fields = [];
    let submitHandler = null;

    if (modalType === 'warga') {
      title = isEditing ? '✏️ Edit Data Warga' : '➕ Tambah Data Warga';
      fields = [
        { name: 'nama', label: 'Nama Lengkap', type: 'text', placeholder: 'Masukkan nama lengkap' },
        { name: 'nik', label: 'NIK', type: 'text', placeholder: 'Masukkan NIK (16 digit)' },
        { name: 'noKK', label: 'NO KK', type: 'text', placeholder: 'Masukkan NO KK' },
        { name: 'rt', label: 'RT', type: 'text', placeholder: 'Contoh: 03' },
        { name: 'rw', label: 'RW', type: 'text', placeholder: 'Contoh: 02' },
        { name: 'jenisRumah', label: 'Jenis Rumah', type: 'select', options: ['Kepala Keluarga', 'Istri', 'Anak', 'Orang Tua', 'Saudara'] },
        { name: 'statusKel', label: 'Status Kel.', type: 'select', options: ['Menikah', 'Belum Menikah', 'Cerai Hidup', 'Cerai Mati'] },
        { name: 'tempatLhr', label: 'Tempat Lahir', type: 'text', placeholder: 'Contoh: Bandung' },
        { name: 'tglLhr', label: 'Tanggal Lahir', type: 'date' },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Laki-laki', 'Perempuan'] },
        { name: 'status', label: 'Status', type: 'select', options: ['Warga', 'Pendatang'] },
      ];
      submitHandler = handleSubmitWarga;
    } else if (modalType === 'umkm') {
      title = isEditing ? '✏️ Edit Data UMKM' : '➕ Tambah Data UMKM';
      fields = [
        { name: 'nama', label: 'Nama UMKM', type: 'text', placeholder: 'Masukkan nama UMKM' },
        { name: 'kategori', label: 'Kategori', type: 'text', placeholder: 'Masukkan kategori' },
        { name: 'pemilik', label: 'Pemilik', type: 'text', placeholder: 'Masukkan nama pemilik' },
        { name: 'desc', label: 'Deskripsi', type: 'textarea', placeholder: 'Masukkan deskripsi produk' },
        { name: 'status', label: 'Status', type: 'select', options: ['aktif', 'nonaktif', 'draft'] },
      ];
      submitHandler = handleSubmitUMKM;
    } else if (modalType === 'pengaduan') {
      title = isEditing ? '✏️ Edit Pengaduan' : '➕ Tambah Pengaduan';
      fields = [
        { name: 'judul', label: 'Judul Pengaduan', type: 'text', placeholder: 'Masukkan judul' },
        { name: 'pelapor', label: 'Pelapor', type: 'text', placeholder: 'Masukkan nama pelapor' },
        { name: 'kategori', label: 'Kategori', type: 'text', placeholder: 'Masukkan kategori' },
        { name: 'deskripsi', label: 'Deskripsi', type: 'textarea', placeholder: 'Masukkan deskripsi' },
        { name: 'status', label: 'Status', type: 'select', options: ['DIPROSES', 'SELESAI', 'DITOLAK'] },
        { name: 'rt', label: 'RT', type: 'text', placeholder: 'Contoh: 03' },
        { name: 'rw', label: 'RW', type: 'text', placeholder: 'Contoh: 02' },
      ];
      submitHandler = handleSubmitPengaduan;
    } else if (modalType === 'berita') {
      title = isEditing ? '✏️ Edit Berita' : '➕ Tambah Berita';
      fields = [
        { name: 'judul', label: 'Judul Berita', type: 'text', placeholder: 'Masukkan judul berita' },
        { name: 'tanggal', label: 'Tanggal', type: 'date' },
        { name: 'penulis', label: 'Penulis', type: 'text', placeholder: 'Masukkan nama penulis' },
        { name: 'desc', label: 'Deskripsi', type: 'textarea', placeholder: 'Masukkan deskripsi' },
        { name: 'status', label: 'Status', type: 'select', options: ['aktif', 'draft'] },
      ];
      submitHandler = handleSubmitBerita;
    }

    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="modal-close" onClick={closeModal}>✕</button>
          </div>
          <form onSubmit={submitHandler} className="modal-form">
            {modalType === 'umkm' && (
              <div className="form-group image-upload-group">
                <label>📷 Gambar UMKM</label>
                <div className="image-upload-container">
                  {imagePreview ? (
                    <div className="image-preview-wrapper">
                      <img src={imagePreview} alt="Preview" className="image-preview" />
                      <button 
                        type="button" 
                        className="remove-image-btn"
                        onClick={handleRemoveImage}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="upload-area"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span className="upload-icon">📷</span>
                      <p>Klik untuk upload gambar</p>
                      <small>Max 5MB | JPG, PNG, GIF, WEBP</small>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input-hidden"
                  />
                </div>
                {formData.gambar && !imagePreview && (
                  <div className="existing-image">
                    <small>Gambar saat ini:</small>
                    <img 
                      src={formData.gambar} 
                      alt="Existing" 
                      className="existing-image-preview"
                      onClick={() => setSelectedImageForModal(formData.gambar)}
                    />
                  </div>
                )}
              </div>
            )}

            {fields.map((field) => (
              <div key={field.name} className="form-group">
                <label>{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih {field.label}</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    rows="3"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required={field.type !== 'date'}
                  />
                )}
              </div>
            ))}
            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={closeModal}>Batal</button>
              <button type="submit" className="btn-save-modal">
                {isEditing ? '💾 Update' : '💾 Simpan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // ============================================
  // RENDER CONTENT
  // ============================================

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
          fontSize: '1.2rem',
          color: '#1a5276'
        }}>
          ⏳ Memuat data...
        </div>
      );
    }

    switch (activeMenu) {
      case 'dashboard': return renderDashboard();
      case 'warga': return renderWarga();
      case 'umkm': return renderUMKM();
      case 'berita': return renderBerita();
      case 'pengaduan': return renderPengaduan();
      case 'cctv': return renderCCTV();
      case 'pengaturan': return renderPengaturan();
      default: return <div className="admin-content"><h2>Halaman tidak ditemukan</h2></div>;
    }
  };

  // ============================================
  // MAIN RENDER
  // ============================================

  if (!user) {
    return (
      <div className="loading" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        color: '#1a5276',
        background: '#f0f4f8'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>Desa Padakembang</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-nav">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`admin-nav-btn ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => handleMenuChange(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button className="admin-logout" onClick={handleLogout}>
           Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{MENU_ITEMS.find(m => m.id === activeMenu)?.label || 'Dashboard'}</h1>
          <div className="admin-user">
            <span> {user?.name || 'Admin'}</span>
            <span className="admin-role">Administrator</span>
          </div>
        </header>

        <div className="admin-body">
          {renderContent()}
        </div>
      </main>

      {renderModal()}
      
      {selectedImageForModal && (
        <div className="image-modal-overlay" onClick={() => setSelectedImageForModal(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={() => setSelectedImageForModal(null)}>
              ✕
            </button>
            <img src={selectedImageForModal} alt="Preview" className="image-modal-preview" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;