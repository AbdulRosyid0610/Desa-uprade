// src/components/Profil.jsx
import React from 'react';

const Profil = () => {
  return (
    <section id="profil" className="section profil-section">
      <div className="container">
        <h2 className="section-title"> Profil Desa</h2>
        <p className="section-subtitle">
          Informasi umum, sejarah, dan geografis Desa Padakembang - Tasikmalaya
        </p>

        <div className="profil-wrapper">
          {/* ============================================ */}
          {/* BAGIAN KIRI - Informasi Profil */}
          {/* ============================================ */}
          <div className="profil-info">
            {/* Identitas Desa */}
            <div className="profil-card">
              <h3> Identitas Desa</h3>
              <p><strong>Nama Desa:</strong> Padakembang</p>
              <p><strong>Kecamatan:</strong> Padakembang</p>
              <p><strong>Kabupaten:</strong> Tasikmalaya</p>
              <p><strong>Provinsi:</strong> Jawa Barat</p>
              <p><strong>Kode Pos:</strong> 46466</p>
              <p><strong>Kode Kemendagri:</strong> 32.06.29.2005</p>
            </div>

            {/* Luas Wilayah */}
            <div className="profil-card">
              <h3> Luas Wilayah</h3>
              <p><strong>Luas:</strong> 254 Hektar <span className="detail-text">(data estimasi)</span></p>
              <p><strong>Penggunaan Lahan:</strong> Pertanian, Pemukiman, Hutan Desa</p>
              <p><strong>Potensi Alam:</strong> Biofarmaka (Mint & Rosella), Air Panas</p>
            </div>

            {/* Batas Wilayah */}
            <div className="profil-card">
              <h3> Batas Wilayah</h3>
              <div className="batas-wilayah">
                <div className="data-item">
                  <span className="data-label"> Utara:</span>
                  <span className="data-value">Berbatasan dengan Desa Linggajati (lereng Gunung Galunggung bagian utara kawasan desa)</span>
                </div>
                <div className="data-item">
                  <span className="data-label"> Timur:</span>
                  <span className="data-value">Berbatasan dengan Desa Mekarjaya</span>
                </div>
                <div className="data-item">
                  <span className="data-label"> Selatan:</span>
                  <span className="data-value">Berbatasan dengan Desa Cisaruni</span>
                </div>
                <div className="data-item">
                  <span className="data-label"> Barat:</span>
                  <span className="data-value">Berbatasan dengan Desa Mandalagiri</span>
                </div>
              </div>
            </div>

            {/* Sejarah Singkat */}
            <div className="profil-card sejarah-card">
              <h3> Sejarah Singkat</h3>
              <p>
                Desa Padakembang merupakan salah satu desa yang terletak di Kecamatan Padakembang, 
                Kabupaten Tasikmalaya, Jawa Barat. Desa ini memiliki potensi alam yang melimpah dan 
                menjadi salah satu desa yang aktif mengembangkan potensi lokalnya, terutama di bidang 
                pertanian dan wisata.
              </p>
              <p>
                Sejarah Desa Padakembang tidak terlepas dari peran masyarakatnya yang gotong royong 
                dalam mengembangkan wilayah. Desa ini dikenal memiliki potensi wisata yang dapat 
                dikembangkan, seperti wisata pemandian air panas, wisata religi, dan wisata kerajinan. 
                Dengan potensi yang dimilikinya, Desa Padakembang terus berupaya mengembangkan diri 
                menjadi desa wisata yang berkelanjutan.
              </p>
              <p>
                Dalam perkembangannya, Desa Padakembang juga dikenal sebagai desa yang memiliki 
                potensi besar dalam pengembangan usahatani biofarmaka, terutama tanaman <strong>Mint</strong> 
                dan <strong>Rosella</strong> yang memberikan kontribusi signifikan terhadap pendapatan 
                rumah tangga petani.
              </p>
            </div>
          </div>

          {/* ============================================ */}
          {/* BAGIAN KANAN - Potensi & Visi Misi */}
          {/* ============================================ */}
          <div className="profil-right">
            {/* Visi & Misi */}
            <div className="profil-card">
              <h3> Visi & Misi</h3>
              <div className="visi-misi">
                <div className="visi">
                  <h4>Visi</h4>
                  <p>"Terwujudnya Desa Padakembang yang Mandiri, Inovatif, dan Sejahtera Berbasis Potensi Lokal"</p>
                </div>
                <div className="misi">
                  <h4>Misi</h4>
                  <ol>
                    <li>Meningkatkan kualitas tata kelola pemerintahan desa yang transparan dan akuntabel</li>
                    <li>Mengembangkan potensi pertanian dan biofarmaka secara berkelanjutan</li>
                    <li>Mendorong pertumbuhan ekonomi kerakyatan melalui pengembangan UMKM</li>
                    <li>Mewujudkan desa wisata yang berdaya saing</li>
                    <li>Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Potensi Pertanian & Biofarmaka */}
            <div className="profil-card">
              <h3> Potensi Pertanian & Biofarmaka</h3>
              <p>
                Desa Padakembang memiliki potensi besar dalam pengembangan biofarmaka, 
                khususnya tanaman <strong>Mint</strong> dan <strong>Rosella</strong>.
              </p>
              <div className="potensi-stats">
                <div className="potensi-stat">
                  <span className="potensi-value">Rp 3.535.914</span>
                  <span className="potensi-label">Pendapatan per periode tanam (4 bulan)</span>
                </div>
                <div className="potensi-stat">
                  <span className="potensi-value">27,12%</span>
                  <span className="potensi-label">Kontribusi terhadap pendapatan rumah tangga petani</span>
                </div>
              </div>
            </div>

            {/* Potensi Wisata */}
            <div className="profil-card">
              <h3> Potensi Wisata</h3>
              <div className="wisata-list">
                <span className="wisata-item"> Wisata Air Panas</span>
                <span className="wisata-item"> Wisata Religi</span>
                <span className="wisata-item"> Wisata Kerajinan</span>
              </div>
            </div>

            {/* Potensi UMKM Khas Tasikmalaya */}
            <div className="profil-card">
              <h3> Potensi UMKM Khas Tasikmalaya</h3>
              <div className="umkm-potensi">
                <span className="umkm-tag"> Kerajinan bambu </span>
                <span className="umkm-tag"> Batik Tulis</span>
                <span className="umkm-tag"> kopi desa </span>
                <span className="umkm-tag"> kripik singkong </span>
                <span className="umkm-tag"> madu hutan </span>
                <span className="umkm-tag"> Tenun ikat </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profil;