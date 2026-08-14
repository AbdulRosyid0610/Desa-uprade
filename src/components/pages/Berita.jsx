// src/components/pages/Berita.jsx
import React, { useState } from 'react';

const Berita = () => {
  const [selectedBerita, setSelectedBerita] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const beritaData = [
    { 
      id: 1, 
      title: 'Festival Budaya Desa', 
      date: '20 Juli 2026', 
      desc: 'Masyarakat meriahkan festival tahunan dengan berbagai pertunjukan seni dan kuliner.',
      fullContent: 'Festival Budaya Desa tahun ini berlangsung meriah dengan partisipasi seluruh warga desa. Acara dimulai dengan parade budaya yang menampilkan berbagai kesenian tradisional seperti tari jaipong, angklung, dan wayang kulit. Selain itu, terdapat pula bazar kuliner yang menyajikan berbagai makanan khas desa. Festival ini diadakan untuk melestarikan budaya dan mempererat tali silaturahmi antar warga desa.',
      photo: 'https://mmc.kalteng.go.id/files/berita/10072025094939_0.jpg'
    },
    { 
      id: 2, 
      title: 'Panen Raya Padi', 
      date: '15 Juli 2026', 
      desc: 'Petani desa merayakan panen raya dengan hasil melimpah tahun ini.',
      fullContent: 'Panen raya padi tahun ini mencapai hasil yang sangat memuaskan. Dengan luas lahan 40 hektar, para petani berhasil memanen lebih dari 200 ton padi. Hal ini tidak terlepas dari dukungan pemerintah desa dalam penyediaan bibit unggul dan pupuk berkualitas. Panen raya dirayakan dengan tradisi "Mapag Sri" sebagai bentuk rasa syukur kepada Tuhan Yang Maha Esa.',
      photo: 'https://cdn.antaranews.com/cache/1200x800/2023/01/27/panen-raya.jpg.webp'
    },
    { 
      id: 3, 
      title: 'Pembangunan Jalan Baru', 
      date: '10 Juli 2026', 
      desc: 'Pembangunan infrastruktur jalan desa untuk meningkatkan aksesibilitas.',
      fullContent: 'Pembangunan jalan baru sepanjang 5 kilometer telah dimulai untuk menghubungkan desa dengan kecamatan. Proyek ini dibiayai oleh dana desa dan diharapkan selesai dalam waktu 3 bulan. Dengan adanya jalan baru ini, akses transportasi masyarakat akan semakin lancar dan memudahkan distribusi hasil pertanian ke pasar.',
      photo: 'https://binamarga.pu.go.id/balai-dki-jabar/uploads/images/451/pn640/sudah-memasuki-tahap-pengaspalan-pembangunan-jalan-baru-lingkar-utara-jatigede-selesai-bulan-depan.jpeg'
    },
  ];

  const handleBeritaClick = (berita) => {
    setSelectedBerita(berita);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Mencegah scroll saat modal terbuka
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setSelectedBerita(null), 300);
  };

  return (
    <>
      {/* ===== CSS INTERNAL UNTUK TAMPILAN RAPI & ELEGAN ===== */}
      <style>{`
        .berita-section {
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
        
        /* Grid Layout */
        .berita-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        /* Kartu Berita */
        .berita-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(0, 180, 216, 0.15);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .berita-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 180, 216, 0.5);
          box-shadow: 0 12px 30px rgba(0, 180, 216, 0.15);
        }

        /* Foto Berita */
        .berita-photo {
          width: 100%;
          height: 200px;
          background: #1c2e4a;
          position: relative;
          overflow: hidden;
        }
        .berita-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .berita-photo-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-size: 4rem;
          background: #1c2e4a;
          color: #00b4d8;
        }

        /* Konten Kartu */
        .berita-card h3 {
          padding: 0 20px;
          margin: 10px 0 4px 0;
          font-size: 1.2rem;
          color: #ffffff;
        }
        .berita-date {
          padding: 0 20px;
          font-size: 0.85rem;
          color: #90e0ef;
          margin-bottom: 4px;
        }
        .berita-card p {
          padding: 0 20px;
          color: #e0fbfc;
          font-size: 0.95rem;
          line-height: 1.5;
          flex: 1;
        }

        /* Tombol Baca */
        .berita-btn {
          margin: 16px 20px 20px 20px;
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
        .berita-btn:hover {
          background: #00b4d8;
          color: #ffffff;
        }

        /* ===== MODAL POPUP ===== */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.7);
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
          max-width: 700px;
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

        .modal-berita-photo {
          width: 100%;
          height: 250px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 16px;
        }
        .modal-berita-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .modal-berita-date {
          color: #90e0ef;
          font-size: 0.9rem;
          margin-bottom: 6px;
        }
        .modal-title {
          font-size: 2rem;
          color: #ffffff;
          margin: 0 0 8px 0;
        }
        .modal-berita-divider {
          height: 2px;
          background: #00b4d8;
          width: 60px;
          margin-bottom: 16px;
        }
        .modal-desc {
          color: #e0fbfc;
          line-height: 1.8;
          font-size: 1rem;
        }
        .modal-btn {
          margin-top: 20px;
          padding: 10px 24px;
          background: #00b4d8;
          color: #ffffff;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }
        .modal-btn:hover {
          background: #0096b4;
          transform: scale(1.05);
        }

        /* Responsive Mobile */
        @media (max-width: 768px) {
          .berita-grid { grid-template-columns: 1fr; }
          .section-title { font-size: 2rem; }
          .modal-content { padding: 20px; }
          .modal-berita-photo { height: 180px; }
          .modal-title { font-size: 1.5rem; }
        }
      `}</style>

      {/* ===== HALAMAN BERITA ===== */}
      <section className="berita-section">
        <div className="container">
          <h2 className="section-title">Berita Terkini</h2>
          
          <div className="berita-grid">
            {beritaData.map((berita) => (
              <div key={berita.id} className="berita-card">
                {/* Gambar */}
                <div className="berita-photo">
                  <img 
                    src={berita.photo} 
                    alt={berita.title} 
                    className="berita-photo-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="berita-photo-fallback">📰</div>`;
                    }}
                  />
                </div>
                <div className="berita-date">{berita.date}</div>
                <h3>{berita.title}</h3>
                <p>{berita.desc}</p>
                <button 
                  className="berita-btn"
                  onClick={() => handleBeritaClick(berita)}
                >
                  Baca Selengkapnya →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MODAL DETAIL BERITA ===== */}
      {showModal && selectedBerita && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-body">
              {/* Gambar di modal */}
              <div className="modal-berita-photo">
                <img 
                  src={selectedBerita.photo} 
                  alt={selectedBerita.title} 
                  className="modal-berita-photo-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="berita-photo-fallback" style="border-radius:12px;font-size:4rem;height:100%;display:flex;align-items:center;justify-content:center;background:#1c2e4a;">📰</div>`;
                  }}
                />
              </div>
              <div className="modal-berita-date">{selectedBerita.date}</div>
              <h2 className="modal-title">{selectedBerita.title}</h2>
              <div className="modal-berita-divider"></div>
              <p className="modal-desc modal-berita-full">{selectedBerita.fullContent}</p>
              <button 
                className="modal-btn"
                onClick={closeModal}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Berita;