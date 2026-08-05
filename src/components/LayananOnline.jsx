// src/components/LayananOnline.jsx
import React, { useState } from 'react';
import './LayananOnline.css';

const LayananOnline = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLayanan, setSelectedLayanan] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    noHp: '',
    alamat: '',
    keterangan: '',
    // Untuk Surat
    jenisSurat: 'domisili',
    keperluan: '',
    // Untuk Bantuan Sosial
    jenisBantuan: 'blt',
    // Untuk Posyandu
    tanggalPosyandu: '',
    // Untuk Pengaduan
    kategoriPengaduan: 'infrastruktur',
    // Untuk UMKM
    jenisUsaha: '',
    namaUsaha: ''
  });

  const layananData = [
    {
      id: 1,
      icon: 'fa-file-pen',
      nama: 'Surat Keterangan',
      deskripsi: 'Domisili, usaha, & kehilangan',
      status: 'online',
      warna: '#e8f0f8',
      formFields: ['jenisSurat', 'keperluan']
    },
    {
      id: 2,
      icon: 'fa-hand-holding-heart',
      nama: 'Bantuan Sosial',
      deskripsi: 'BLT, PKH, sembako',
      status: 'cepat',
      warna: '#e8f5e8',
      formFields: ['jenisBantuan']
    },
    {
      id: 3,
      icon: 'fa-calendar-check',
      nama: 'Jadwal Posyandu',
      deskripsi: 'Kesehatan ibu & anak',
      status: 'terupdate',
      warna: '#f5f0e8',
      formFields: ['tanggalPosyandu']
    },
    {
      id: 4,
      icon: 'fa-notes-medical',
      nama: 'Pengaduan',
      deskripsi: 'Infrastruktur & lingkungan',
      status: 'responsif',
      warna: '#f5e8e8',
      formFields: ['kategoriPengaduan']
    },
    {
      id: 5,
      icon: 'fa-handshake',
      nama: 'UMKM Desa',
      deskripsi: 'Pendaftaran & promosi',
      status: 'gratis',
      warna: '#e8f0f0',
      formFields: ['jenisUsaha', 'namaUsaha']
    },
    {
      id: 6,
      icon: 'fa-video',
      nama: 'CCTV Online',
      deskripsi: 'Pantau desa secara realtime',
      status: 'live 24/7',
      warna: '#dce8f0',
      formFields: []
    }
  ];

  // Scroll ke section CCTV
  const scrollToCctv = () => {
    const cctvSection = document.getElementById('cctv-section');
    if (cctvSection) {
      cctvSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Buka modal dengan layanan yang dipilih
  const openModal = (layanan) => {
    setSelectedLayanan(layanan);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Tutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLayanan(null);
    document.body.style.overflow = 'auto';
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Pengajuan ${selectedLayanan?.nama} berhasil dikirim!\n\nNama: ${formData.nama}\nNIK: ${formData.nik}\nNo HP: ${formData.noHp}`);
    closeModal();
    setFormData({
      nama: '',
      nik: '',
      noHp: '',
      alamat: '',
      keterangan: '',
      jenisSurat: 'domisili',
      keperluan: '',
      jenisBantuan: 'blt',
      tanggalPosyandu: '',
      kategoriPengaduan: 'infrastruktur',
      jenisUsaha: '',
      namaUsaha: ''
    });
  };

  // Render form fields berdasarkan layanan
  const renderFormFields = () => {
    if (!selectedLayanan) return null;

    switch (selectedLayanan.id) {
      case 1: // Surat Keterangan
        return (
          <>
            <div className="form-group">
              <label><i className="fas fa-file-alt"></i> Jenis Surat</label>
              <select name="jenisSurat" value={formData.jenisSurat} onChange={handleInputChange}>
                <option value="domisili">Surat Keterangan Domisili</option>
                <option value="usaha">Surat Keterangan Usaha</option>
                <option value="kehilangan">Surat Keterangan Kehilangan</option>
                <option value="kelakuan-baik">Surat Keterangan Kelakuan Baik</option>
                <option value="tidak-mampu">Surat Keterangan Tidak Mampu</option>
              </select>
            </div>
            <div className="form-group">
              <label><i className="fas fa-pen"></i> Keperluan</label>
              <textarea name="keperluan" value={formData.keperluan} onChange={handleInputChange} placeholder="Jelaskan keperluan surat..." rows="2" />
            </div>
          </>
        );

      case 2: // Bantuan Sosial
        return (
          <div className="form-group">
            <label><i className="fas fa-hand-holding-heart"></i> Jenis Bantuan</label>
            <select name="jenisBantuan" value={formData.jenisBantuan} onChange={handleInputChange}>
              <option value="blt">BLT (Bantuan Langsung Tunai)</option>
              <option value="pkh">PKH (Program Keluarga Harapan)</option>
              <option value="sembako">Bantuan Sembako</option>
              <option value="bansos-lain">Bantuan Sosial Lainnya</option>
            </select>
          </div>
        );

      case 3: // Posyandu
        return (
          <div className="form-group">
            <label><i className="fas fa-calendar-day"></i> Tanggal Posyandu</label>
            <input type="date" name="tanggalPosyandu" value={formData.tanggalPosyandu} onChange={handleInputChange} />
            <small style={{ color: '#6b7a8a', marginTop: '4px' }}>
              <i className="fas fa-info-circle"></i> Pilih tanggal kunjungan posyandu
            </small>
          </div>
        );

      case 4: // Pengaduan
        return (
          <div className="form-group">
            <label><i className="fas fa-tag"></i> Kategori Pengaduan</label>
            <select name="kategoriPengaduan" value={formData.kategoriPengaduan} onChange={handleInputChange}>
              <option value="infrastruktur">Infrastruktur (Jalan, Jembatan)</option>
              <option value="lingkungan">Lingkungan (Sampah, Drainase)</option>
              <option value="pelayanan">Pelayanan Publik</option>
              <option value="keamanan">Keamanan & Ketertiban</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
        );

      case 5: // UMKM
        return (
          <>
            <div className="form-group">
              <label><i className="fas fa-store"></i> Nama Usaha</label>
              <input type="text" name="namaUsaha" value={formData.namaUsaha} onChange={handleInputChange} placeholder="Nama usaha Anda..." />
            </div>
            <div className="form-group">
              <label><i className="fas fa-tag"></i> Jenis Usaha</label>
              <select name="jenisUsaha" value={formData.jenisUsaha} onChange={handleInputChange}>
                <option value="kuliner">Kuliner/Makanan</option>
                <option value="kerajinan">Kerajinan Tangan</option>
                <option value="fashion">Fashion/Pakaian</option>
                <option value="pertanian">Pertanian/Perkebunan</option>
                <option value="jasa">Jasa/Layanan</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>
          </>
        );

      case 6: // CCTV
        return (
          <div className="form-group">
            <div style={{ padding: '16px', background: '#eaf1f6', borderRadius: '12px', textAlign: 'center' }}>
              <i className="fas fa-video" style={{ fontSize: '2rem', color: '#1a5276' }}></i>
              <p style={{ marginTop: '8px', color: '#1a5276', fontWeight: '500' }}>
                CCTV Online - Pantau langsung keamanan desa
              </p>
              <button type="button" className="btn-cctv-modal" onClick={scrollToCctv}>
                <i className="fas fa-play"></i> Lihat CCTV Sekarang
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <section id="layanan" className="layanan-online-section">
        <div className="layanan-online-container">
          <div className="layanan-header">
            <div className="layanan-title">
              <i className="fas fa-grid-2"></i>
              <h2>Layanan Digital Desa</h2>
            </div>
            <span className="layanan-badge">
              <i className="fas fa-circle-check"></i> {layananData.length} Layanan
            </span>
          </div>

          <div className="layanan-grid">
            {layananData.map((item) => (
              <div className="layanan-card" key={item.id}>
                <div className="layanan-icon" style={{ background: item.warna }}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3>{item.nama}</h3>
                <p>{item.deskripsi}</p>
                <span className="layanan-status">
                  <i className="fas fa-circle"></i> {item.status}
                </span>
                <button 
                  className="btn-ajukan-layanan" 
                  onClick={() => openModal(item)}
                >
                  <i className="fas fa-plus-circle"></i> Ajukan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          MODAL FORM PENGAJUAN LAYANAN
          ============================================================ */}
      {isModalOpen && selectedLayanan && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>

            <div className="modal-header">
              <div className="modal-icon" style={{ background: selectedLayanan.warna }}>
                <i className={`fas ${selectedLayanan.icon}`}></i>
              </div>
              <div>
                <h2>Ajukan {selectedLayanan.nama}</h2>
                <p>{selectedLayanan.deskripsi}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              {/* Data Diri - Selalu Muncul */}
              <div className="form-section-title">
                <i className="fas fa-user-circle"></i> Data Diri
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><i className="fas fa-user"></i> Nama Lengkap <span className="required">*</span></label>
                  <input 
                    type="text" 
                    name="nama" 
                    value={formData.nama} 
                    onChange={handleInputChange} 
                    placeholder="Nama lengkap Anda"
                    required 
                  />
                </div>
                <div className="form-group">
                  <label><i className="fas fa-id-card"></i> NIK <span className="required">*</span></label>
                  <input 
                    type="text" 
                    name="nik" 
                    value={formData.nik} 
                    onChange={handleInputChange} 
                    placeholder="16 digit NIK"
                    pattern="[0-9]{16}"
                    title="NIK harus 16 digit angka"
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><i className="fas fa-phone"></i> No. HP / WA <span className="required">*</span></label>
                  <input 
                    type="tel" 
                    name="noHp" 
                    value={formData.noHp} 
                    onChange={handleInputChange} 
                    placeholder="0812-3456-7890"
                    required 
                  />
                </div>
                <div className="form-group">
                  <label><i className="fas fa-home"></i> Alamat</label>
                  <input 
                    type="text" 
                    name="alamat" 
                    value={formData.alamat} 
                    onChange={handleInputChange} 
                    placeholder="Alamat lengkap"
                  />
                </div>
              </div>

              {/* Form Fields Spesifik Layanan */}
              {renderFormFields() && (
                <>
                  <div className="form-section-title">
                    <i className="fas fa-clipboard-list"></i> Detail {selectedLayanan.nama}
                  </div>
                  {renderFormFields()}
                </>
              )}

              <div className="form-group">
                <label><i className="fas fa-message"></i> Keterangan Tambahan</label>
                <textarea 
                  name="keterangan" 
                  value={formData.keterangan} 
                  onChange={handleInputChange} 
                  placeholder="Informasi tambahan yang perlu disampaikan..."
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-modal-cancel" onClick={closeModal}>
                  <i className="fas fa-times"></i> Batal
                </button>
                <button type="submit" className="btn-modal-submit">
                  <i className="fas fa-paper-plane"></i> Kirim Pengajuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LayananOnline;