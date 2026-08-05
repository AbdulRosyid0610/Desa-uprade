// src/components/Anggota.jsx
import React from 'react';

const Anggota = () => {
const anggotaData = [
  { 
    id: 1, 
    name: 'Dedi Mulyadi', 
    position: 'Kepala Desa', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Dedi_Mulyadi%2C_Gubernur_Jawa_barat_2025-2030.jpg/960px-Dedi_Mulyadi%2C_Gubernur_Jawa_barat_2025-2030.jpg'
  },
  { 
    id: 2, 
    name: 'Erwan Setiawan', 
    position: 'Wakil Kepala Desa', 
    // Gunakan link langsung ke gambar
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Erwan_Setiawan%2C_Wakil_Gubernur_Jawa_Barat_2025-2030.jpg/250px-Erwan_Setiawan%2C_Wakil_Gubernur_Jawa_Barat_2025-2030.jpg'
  },
    { 
      id: 3, 
      name: 'Jenal Mutaqin', 
      position: 'Sekretaris', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Jenal_Mutaqin%2C_Wakil_Walikota_Bogor_2025_%28cropped%29.jpg'
    },
    { 
    id: 4, 
    name: 'Ganjar Pranowo', 
    position: 'Bendahara', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Ganjar_Pranowo%2C_Gubernur_Jateng_Periode_II.jpg'
  },
       { 
    id: 5, 
    name: 'Megawati Sukarnoputri', 
    position: 'Wakil Bendahara', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/President_Megawati_Sukarnoputri_-_Indonesia.jpg'
    },
    { 
    id: 6, 
    name: 'Illiza Saaduddin Djamal', 
    position: 'Staff Desa', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Illiza_Saaduddin_Djamal_Walikota_Banda_Aceh_2025.png'
  },
   { 
    id: 9, 
    name: 'Iin Tazkiyatul Mutmainnah', 
    position: 'Staff', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Iin_Tazkiyatul_Mutmainnah.png'
  },
  { 
    id: 10, 
    name: 'Agustina Wilujeng Pramestuti', 
    position: 'Staff', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Wali_Kota_Semarang_Agustina_Wilujeng_Pramestuti.jpg/250px-Wali_Kota_Semarang_Agustina_Wilujeng_Pramestuti.jpg'
  },
    { 
    id: 11, 
    name: 'H. Erwin, S.E., M.Pd.', 
    position: 'Staff', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Wakil_Wali_Kota_Bandung_Erwin.jpg'
  },  
  { 
    id: 12, 
    name: 'Muhammad Farhan', 
    position: 'Staff', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Wali_Kota_Bandung_Muhammad_Farhan.jpg'
  },
  ];

  return (
    <section id="anggota" className="section anggota-section">
      <div className="container">
        <h2 className="section-title"> Aparat Pemerintahan</h2>
        <p className="section-subtitle">
          Susunan struktur organisasi Desa Padakembang Digital.
        </p>

        <div className="anggota-grid">
          {anggotaData.map((anggota) => (
            <div key={anggota.id} className="anggota-card">
              <div className="anggota-image-wrapper">
                <img 
                  src={anggota.image} 
                  alt={anggota.name} 
                  className="anggota-image"
                  onError={(e) => {
                    // Jika gambar gagal dimuat, gunakan placeholder
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(anggota.name)}&background=3498db&color=fff&size=128`;
                  }}
                />
              </div>
              <div className="anggota-info">
                <h3>{anggota.name}</h3>
                <p className="anggota-position">{anggota.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Anggota;