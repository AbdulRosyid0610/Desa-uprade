// src/components/pages/UMKM.jsx
import React, { useState } from 'react';

const UMKM = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const umkmData = [
    { 
      id: 1, 
      name: 'Kerajinan Bambu', 
      desc: 'Anyaman bambu berkualitas tinggi dengan motif tradisional', 
      photo: 'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1637804174/ulnpzfptenxaix6h2wnq.jpg',
      detail: 'Kerajinan bambu ini dibuat oleh pengrajin lokal dengan teknik turun-temurun. Setiap produk memiliki kualitas terbaik dan desain yang unik.',
      price: 'Rp 50.000 - Rp 200.000',
      category: 'Kerajinan'
    },
    { 
      id: 2, 
      name: 'Kopi Desa', 
      desc: 'Kopi arabika asli dengan cita rasa khas', 
      photo: 'https://desamerdeka.id/wp-content/uploads/2024/08/kopi-kljpg-20210706080837.webp',
      detail: 'Kopi arabika ditanam di dataran tinggi desa dengan proses pengolahan yang alami tanpa bahan kimia, menghasilkan rasa yang khas dan nikmat.',
      price: 'Rp 35.000 - Rp 85.000',
      category: 'Minuman'
    },
    { 
      id: 3, 
      name: 'Batik Tulis', 
      desc: 'Batik motif khas desa dengan warna alami', 
      photo: 'https://www.rukita.co/stories/wp-content/uploads/2022/05/cara-membedakan-batik-tulis-dan-batik-print.jpeg',
      detail: 'Batik tulis dibuat dengan tangan oleh perajin batik berpengalaman, menggunakan pewarna alami dari tumbuhan sekitar.',
      price: 'Rp 150.000 - Rp 500.000',
      category: 'Pakaian'
    },
    { 
      id: 4, 
      name: 'Madu Hutan', 
      desc: 'Madu murni tanpa campuran dari hutan desa', 
      photo: 'https://asset.kompas.com/crops/uatp9R4X9gxvQitaVPQfvJqNhzE=/65x38:945x625/750x500/data/photo/2018/10/16/3894874319.jpg',
      detail: 'Madu hutan murni diambil dari lebah hutan yang hidup alami, memiliki khasiat kesehatan yang tinggi.',
      price: 'Rp 75.000 - Rp 150.000',
      category: 'Makanan'
    },
    { 
      id: 5, 
      name: 'Keripik Singkong', 
      desc: 'Keripik renyah dengan bumbu spesial', 
      photo: 'https://kehamilansehat.com/wp-content/uploads/2025/09/Kalori-Keripik-Singkong_-Apakah-Aman-Dikonsumsi-untuk-Ibu-Hamil.png',
      detail: 'Keripik singkong dibuat dari singkong pilihan dengan resep tradisional dan bumbu spesial yang membuatnya renyah dan gurih.',
      price: 'Rp 15.000 - Rp 30.000',
      category: 'Makanan'
    },
    { 
      id: 6, 
      name: 'Tenun Ikat', 
      desc: 'Kain tenun tradisional dengan motif khas', 
      photo: 'https://asset.kompas.com/crops/8RBHzapUGJ1f3jk0JicWj7Zzto4=/0x0:1000x667/750x500/data/photo/2018/05/30/822670728.jpg',
      detail: 'Tenun ikat dibuat dengan proses yang panjang dan penuh ketelitian, setiap motif memiliki makna dan filosofi tersendiri.',
      price: 'Rp 250.000 - Rp 1.000.000',
      category: 'Pakaian'
    },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleWhatsApp = (product) => {
    const message = `Halo, saya tertarik dengan produk ${product.name}. Apakah masih tersedia?`;
    const url = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* ===== CSS INTERNAL UNTUK TAMPILAN RAPI & ELEGAN ===== */}
      <style>{`
        .umkm-section {
          padding: 80px 20px;
          background: linear-gradient(145deg, #0a192f, #0d47a1);
          min-height: 100vh;
          color: #ffffff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 40px;
          background: linear-gradient(to right, #ffffff, #00b4d8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* GRID PRODUK */
        .umkm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        /* KARTU PRODUK (Glassmorphism) */
        .umkm-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(0, 180, 216, 0.15);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .umkm-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 180, 216, 0.5);
          box-shadow: 0 12px 30px rgba(0, 180, 216, 0.15);
        }

        /* FOTO PRODUK */
        .umkm-photo {
          width: 100%;
          height: 200px;
          background: #1c2e4a;
          position: relative;
          overflow: hidden;
        }
        .umkm-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .umkm-photo-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-size: 4rem;
          background: #1c2e4a;
          color: #00b4d8;
        }

        /* KONTEN KARTU */
        .umkm-card h3 {
          padding: 0 20px;
          margin: 12px 0 4px 0;
          font-size: 1.2rem;
          color: #ffffff;
        }
        .umkm-card p {
          padding: 0 20px;
          color: #e0fbfc;
          font-size: 0.95rem;
          line-height: 1.5;
          flex: 1;
        }

        /* KATEGORI PRODUK */
        .umkm-category {
          display: inline-block;
          margin: 10px 20px 0 20px;
          padding: 4px 14px;
          background: rgba(0, 180, 216, 0.15);
          color: #90e0ef;
          border-radius: 50px;
          font-size: 0.8rem;
          border: 1px solid rgba(0, 180, 216, 0.2);
          align-self: flex-start;
        }

        /* TOMBOL LIHAT PRODUK */
        .umkm-btn {
          margin: 14px 20px 20px 20px;
          padding: 8px 16px;
          background: transparent;
          border: 1px solid #00b4d8;
          color: #00b4d8;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
          align-self: flex-start;
        }
        .umkm-btn:hover {
          background: #00b4d8;
          color: #ffffff;
        }

        /* ===== MODAL POPUP DETAIL PRODUK ===== */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-content {
          background: linear-gradient(145deg, #122c54, #0d47a1);
          border-radius: 20px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 30px;
          position: relative;
          border: 1px solid rgba(0, 180, 216, 0.3);
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: #ffffff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 1.2rem;
          cursor: pointer;
          transition: 0.3s;
        }
        .modal-close:hover {
          background: #00b4d8;
          transform: rotate(90deg);
        }

        .modal-umkm-photo {
          width: 100%;
          height: 220px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 16px;
        }
        .modal-umkm-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .modal-title {
          font-size: 1.8rem;
          color: #ffffff;
          margin: 0 0 4px 0;
        }
        .modal-category {
          display: inline-block;
          padding: 2px 12px;
          background: rgba(0, 180, 216, 0.15);
          color: #90e0ef;
          border-radius: 50px;
          font-size: 0.8rem;
          margin-bottom: 12px;
        }
        .modal-desc {
          color: #e0fbfc;
          line-height: 1.8;
          font-size: 1rem;
          margin-bottom: 12px;
        }
        .modal-price {
          background: rgba(0, 180, 216, 0.08);
          padding: 12px 16px;
          border-radius: 8px;
          border-left: 4px solid #00b4d8;
          margin-bottom: 20px;
        }
        .price-label {
          color: #90e0ef;
          font-size: 0.9rem;
          margin-right: 8px;
        }
        .price-value {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .modal-btn {
          padding: 10px 24px;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          font-size: 0.95rem;
          border: none;
          flex: 1;
          min-width: 120px;
        }
        .btn-primary {
          background: #00b4d8;
          color: #ffffff;
        }
        .btn-primary:hover {
          background: #0096b4;
          transform: scale(1.02);
        }
        .btn-outline {
          background: transparent;
          color: #e0fbfc;
          border: 1px solid rgba(255,255,255,0.3);
        }
        .btn-outline:hover {
          background: rgba(255,255,255,0.1);
        }

        /* Responsive Mobile */
        @media (max-width: 768px) {
          .umkm-grid { grid-template-columns: 1fr; }
          .section-title { font-size: 2rem; }
          .modal-content { padding: 20px; }
          .modal-umkm-photo { height: 180px; }
          .modal-title { font-size: 1.5rem; }
          .modal-actions { flex-direction: column; }
          .modal-btn { width: 100%; }
        }
      `}</style>

      {/* ===== HALAMAN UMKM ===== */}
      <section className="umkm-section">
        <div className="container">
          <h2 className="section-title">UMKM Desa Padakembang</h2>
          
          <div className="umkm-grid">
            {umkmData.map((umkm) => (
              <div 
                key={umkm.id} 
                className="umkm-card"
                onClick={() => handleProductClick(umkm)}
              >
                {/* Foto Produk */}
                <div className="umkm-photo">
                  <img 
                    src={umkm.photo} 
                    alt={umkm.name} 
                    className="umkm-photo-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="umkm-photo-fallback">📦</div>`;
                    }}
                  />
                </div>
                <h3>{umkm.name}</h3>
                <p>{umkm.desc}</p>
                <span className="umkm-category">{umkm.category}</span>
                <button 
                  className="umkm-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(umkm);
                  }}
                >
                  Lihat Produk →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MODAL DETAIL PRODUK ===== */}
      {showModal && selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-body">
              {/* Foto di modal */}
              <div className="modal-umkm-photo">
                <img 
                  src={selectedProduct.photo} 
                  alt={selectedProduct.name} 
                  className="modal-umkm-photo-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="umkm-photo-fallback" style="border-radius:12px;font-size:4rem;height:100%;display:flex;align-items:center;justify-content:center;background:#1c2e4a;">📦</div>`;
                  }}
                />
              </div>
              <h2 className="modal-title">{selectedProduct.name}</h2>
              <span className="modal-category">{selectedProduct.category}</span>
              <p className="modal-desc">{selectedProduct.detail}</p>
              <div className="modal-price">
                <span className="price-label">Harga:</span>
                <span className="price-value">{selectedProduct.price}</span>
              </div>
              <div className="modal-actions">
                <button 
                  className="modal-btn btn-primary"
                  onClick={() => handleWhatsApp(selectedProduct)}
                >
                  💬 Pesan via WhatsApp
                </button>
                <button 
                  className="modal-btn btn-outline"
                  onClick={closeModal}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UMKM;