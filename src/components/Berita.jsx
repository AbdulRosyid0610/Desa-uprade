// src/components/Berita.jsx
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
    // Gunakan link baru ini
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
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setSelectedBerita(null), 300);
  };

  return (
    <>
      <section id="berita" className="section berita-section">
        <div className="container">
          <h2 className="section-title"> Berita Terkini</h2>
          
          <div className="berita-grid">
            {beritaData.map((berita) => (
              <div key={berita.id} className="berita-card">
                {/* Gambar di atas tanggal */}
                <div className="berita-photo">
                  <img 
                    src={berita.photo} 
                    alt={berita.title} 
                    className="berita-photo-img"
                    onError={(e) => {
                      // Jika gambar gagal dimuat, tampilkan emoji sebagai fallback
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="berita-photo-fallback">${berita.image}</div>`;
                    }}
                  />
                </div>
                <div className="berita-date">{berita.date}</div>
                <h3>{berita.title}</h3>
                <p>{berita.desc}</p>
                <button 
                  className="btn-outline berita-btn"
                  onClick={() => handleBeritaClick(berita)}
                >
                  Baca Selengkapnya →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Detail Berita */}
      {showModal && selectedBerita && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content modal-berita" onClick={(e) => e.stopPropagation()}>
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
                  }}
                />
              </div>
              <div className="modal-berita-image">{selectedBerita.image}</div>
              <div className="modal-berita-date">{selectedBerita.date}</div>
              <h2 className="modal-title">{selectedBerita.title}</h2>
              <div className="modal-berita-divider"></div>
              <p className="modal-desc modal-berita-full">{selectedBerita.fullContent}</p>
              <button 
                className="btn-primary modal-btn"
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