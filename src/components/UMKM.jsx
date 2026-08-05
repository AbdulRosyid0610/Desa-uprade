// src/components/UMKM.jsx
import React, { useState } from 'react';

const UMKM = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

// src/components/UMKM.jsx
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
    // Ganti dengan link baru
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
      <section id="umkm" className="section umkm-section">
        <div className="container">
          <h2 className="section-title"> UMKM </h2>
          
          <div className="umkm-grid">
            {umkmData.map((umkm) => (
              <div 
                key={umkm.id} 
                className="umkm-card clickable"
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
                      e.target.parentElement.innerHTML = `<div class="umkm-photo-fallback">${umkm.image}</div>`;
                    }}
                  />
                </div>
                <div className="umkm-image">{umkm.image}</div>
                <h3>{umkm.name}</h3>
                <p>{umkm.desc}</p>
                <span className="umkm-category">{umkm.category}</span>
                <button 
                  className="btn-outline-small umkm-btn"
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

      {/* Modal Detail Produk */}
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
                  }}
                />
              </div>
              <div className="modal-icon">{selectedProduct.image}</div>
              <h2 className="modal-title">{selectedProduct.name}</h2>
              <span className="modal-category">{selectedProduct.category}</span>
              <p className="modal-desc">{selectedProduct.detail}</p>
              <div className="modal-price">
                <span className="price-label">Harga:</span>
                <span className="price-value">{selectedProduct.price}</span>
              </div>
              <div className="modal-actions">
                <button 
                  className="btn-primary modal-btn"
                  onClick={() => handleWhatsApp(selectedProduct)}
                >
                  <span></span> Pesan via WhatsApp
                </button>
                <button 
                  className="btn-outline modal-btn"
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