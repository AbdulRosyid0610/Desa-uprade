import React from 'react';

const Profil = () => {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'linear-gradient(145deg, #0a192f, #0d47a1)', // Biru Tua ke Biru Dongker
      minHeight: '100vh',
      color: '#ffffff',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      
      {/* --- CSS INTERNAL UNTUK TAMPILAN BIRU AQUA --- */}
      <style>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* HEADER dengan warna Aqua */
        .header-title {
          font-size: 2.8rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 10px;
          letter-spacing: 1px;
          background: linear-gradient(to right, #ffffff, #00b4d8); /* Gradasi Putih ke Aqua */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .header-subtitle {
          color: #90e0ef; /* Biru Aqua muda */
          text-align: center;
          font-size: 1.1rem;
          margin-bottom: 50px;
          letter-spacing: 2px;
        }

        /* WRAPPER GRID */
        .profil-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        /* KARTU GLASSMORPHISM (Transparan dengan garis Aqua) */
        .glass-card {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 28px;
          border-radius: 20px;
          border: 1px solid rgba(0, 180, 216, 0.15); /* Border Aqua transparan */
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          margin-bottom: 24px;
        }
        .glass-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 180, 216, 0.5); /* Border Aqua menyala saat hover */
          box-shadow: 0 12px 40px 0 rgba(0, 180, 216, 0.15);
        }

        /* JUDUL KARTU (Warna Aqua) */
        .card-title {
          font-size: 1.3rem;
          color: #00b4d8; /* Biru Aqua cerah */
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* TEKS */
        .text-row {
          color: #e0fbfc; /* Putih kebiruan */
          line-height: 1.8;
          margin-bottom: 8px;
          font-size: 0.95rem;
        }
        .text-row strong {
          color: #ffffff;
          font-weight: 600;
        }
        .text-detail {
          color: #98c1d9;
          font-size: 0.85rem;
        }

        /* BATAS WILAYAH */
        .border-item {
          display: flex;
          gap: 8px;
          margin-bottom: 6px;
          border-bottom: 1px solid rgba(0, 180, 216, 0.1);
          padding-bottom: 6px;
        }
        .border-label {
          color: #00b4d8; /* Label berwarna Aqua */
          font-weight: 600;
          min-width: 60px;
        }
        .border-value {
          color: #e0fbfc;
        }

        /* VISI MISI */
        .visi-box {
          margin-bottom: 16px;
        }
        .visi-box h4 {
          color: #48cae4; /* Aqua yang lebih terang */
          margin-bottom: 4px;
        }
        .misi-list {
          padding-left: 20px;
          color: #e0fbfc;
          line-height: 1.8;
        }
        .misi-list li {
          margin-bottom: 4px;
        }

        /* STATISTIK (Kotak Data dengan warna Aqua) */
        .stat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 12px;
        }
        .stat-box {
          background: rgba(0, 180, 216, 0.08); /* Background Aqua transparan */
          padding: 16px;
          border-radius: 12px;
          border-left: 3px solid #00b4d8; /* Garis pinggir Aqua */
        }
        .stat-value {
          display: block;
          font-size: 1.3rem;
          font-weight: 700;
          color: #48cae4; /* Angka berwarna Aqua cerah */
        }
        .stat-label {
          color: #90e0ef;
          font-size: 0.85rem;
          margin-top: 4px;
        }

        /* TAG / BADGE (Aqua Transparan) */
        .tag-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 6px;
        }
        .tag {
          background: rgba(0, 180, 216, 0.1);
          color: #90e0ef;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.85rem;
          border: 1px solid rgba(0, 180, 216, 0.2);
        }
        .tag:hover {
          background: rgba(0, 180, 216, 0.25);
          transform: scale(1.05);
        }

        /* SEJARAH */
        .sejarah-text {
          color: #e0fbfc;
          line-height: 1.8;
          margin-bottom: 14px;
          font-size: 0.95rem;
          text-align: justify;
        }

        /* RESPONSIVE */
        @media (max-width: 992px) {
          .profil-wrapper {
            grid-template-columns: 1fr;
          }
          .header-title {
            font-size: 2rem;
          }
          .stat-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ==================== HALAMAN HTML ==================== */}
      <div className="container">
        
        {/* HEADER */}
        <h1 className="header-title">Profil Desa Padakembang</h1>
        <p className="header-subtitle">Mengenal Lebih Dekat Desa Energi Mandiri di Tasikmalaya</p>

        {/* CONTENT WRAPPER */}
        <div className="profil-wrapper">
          
          {/* ============================================ */}
          {/* KOLOM KIRI */}
          {/* ============================================ */}
          <div className="profil-left">
            
            {/* Identitas Desa */}
            <div className="glass-card">
              <h3 className="card-title"> Identitas Desa</h3>
              <div className="text-row"><strong>Nama Desa:</strong> Padakembang</div>
              <div className="text-row"><strong>Kecamatan:</strong> Padakembang</div>
              <div className="text-row"><strong>Kabupaten:</strong> Tasikmalaya</div>
              <div className="text-row"><strong>Provinsi:</strong> Jawa Barat</div>
              <div className="text-row"><strong>Kode Pos:</strong> 46466</div>
              <div className="text-row"><strong>Kode Kemendagri:</strong> 32.06.29.2005</div>
            </div>

            {/* Luas Wilayah */}
            <div className="glass-card">
              <h3 className="card-title"> Luas & Potensi Wilayah</h3>
              <div className="text-row"><strong>Luas Area:</strong> 254 Hektar <span className="text-detail">(data estimasi)</span></div>
              <div className="text-row"><strong>Penggunaan Lahan:</strong> Pertanian, Pemukiman, Hutan Desa</div>
              <div className="text-row"><strong>Potensi Alam:</strong> Biofarmaka (Mint & Rosella), Air Panas</div>
            </div>

            {/* Batas Wilayah */}
            <div className="glass-card">
              <h3 className="card-title"> Batas Wilayah</h3>
              <div className="border-item">
                <span className="border-label">Utara:</span>
                <span className="border-value">Desa Linggajati</span>
              </div>
              <div className="border-item">
                <span className="border-label">Timur:</span>
                <span className="border-value">Desa Mekarjaya</span>
              </div>
              <div className="border-item">
                <span className="border-label">Selatan:</span>
                <span className="border-value">Desa Cisaruni</span>
              </div>
              <div className="border-item">
                <span className="border-label">Barat:</span>
                <span className="border-value">Desa Mandalagiri</span>
              </div>
            </div>

          </div>

          {/* ============================================ */}
          {/* KOLOM KANAN */}
          {/* ============================================ */}
          <div className="profil-right">

            {/* Visi & Misi */}
            <div className="glass-card">
              <h3 className="card-title"> Visi & Misi</h3>
              <div className="visi-box">
                <h4>Visi</h4>
                <p className="text-row" style={{fontStyle: 'italic'}}>
                  "Terwujudnya Desa Padakembang yang Mandiri, Inovatif, dan Sejahtera Berbasis Potensi Lokal"
                </p>
              </div>
              <div className="visi-box">
                <h4>Misi</h4>
                <ol className="misi-list">
                  <li>Meningkatkan tata kelola pemerintahan desa yang transparan dan akuntabel</li>
                  <li>Mengembangkan potensi pertanian dan biofarmaka secara berkelanjutan</li>
                  <li>Mendorong pertumbuhan ekonomi kerakyatan melalui pengembangan UMKM</li>
                  <li>Mewujudkan desa wisata yang berdaya saing</li>
                  <li>Meningkatkan kualitas SDM melalui pendidikan dan pelatihan</li>
                </ol>
              </div>
            </div>

            {/* Sejarah Singkat */}
            <div className="glass-card">
              <h3 className="card-title"> Sejarah Singkat</h3>
              <p className="sejarah-text">
                Desa Padakembang terletak di Kecamatan Padakembang, Kabupaten Tasikmalaya. Dikenal sebagai desa yang aktif mengembangkan potensi lokal, terutama di bidang pertanian, biofarmaka, dan wisata.
              </p>
              <p className="sejarah-text">
                Masyarakatnya hidup gotong royong mengembangkan wilayah, termasuk wisata pemandian air panas, wisata religi, dan kerajinan. Desa ini juga menjadi pelopor pengembangan <strong>Mint</strong> dan <strong>Rosella</strong> yang berkontribusi besar terhadap pendapatan petani.
              </p>
            </div>

            {/* Potensi Pertanian & UMKM */}
            <div className="glass-card">
              <h3 className="card-title"> Potensi Ekonomi</h3>
              <div className="stat-grid">
                <div className="stat-box">
                  <span className="stat-value">Rp 3.535.914</span>
                  <span className="stat-label">Pendapatan Biofarmaka / Periode</span>
                </div>
                <div className="stat-box">
                  <span className="stat-value">27,12%</span>
                  <span className="stat-label">Kontribusi Pendapatan Petani</span>
                </div>
              </div>
              
              <div style={{marginTop: '16px'}}>
                <p className="text-row" style={{fontWeight: 600}}>Potensi Wisata & UMKM</p>
                <div className="tag-container">
                  <span className="tag">Wisata Air Panas</span>
                  <span className="tag">Wisata Religi</span>
                  <span className="tag">Kerajinan Bambu</span>
                  <span className="tag">Batik Tulis</span>
                  <span className="tag">Kopi Desa</span>
                  <span className="tag">Kripik Singkong</span>
                  <span className="tag">Madu Hutan</span>
                  <span className="tag">Tenun Ikat</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Profil;