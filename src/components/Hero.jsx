import React from 'react'

const Hero = () => {
  return (
    <section style={{
      // ★ PERUBAHAN UTAMA: Mengambil gambar dari folder public/Images ★
      // Ganti 'nama-file-foto-anda.jpg' dengan nama file gambar Anda yang ada di folder public/Images
      backgroundImage: 'url("/Images/images (8).jpg")', 
      
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      
      padding: '80px 0 60px',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '3px solid #64B5F6'
    }} id="tentang">
      
      {/* ★ LAPISAN OVERLAY GELAP (Agar teks tetap terbaca di atas gambar) ★ */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to right, rgba(10, 37, 64, 0.85), rgba(13, 71, 161, 0.6))',
        zIndex: 1
      }}></div>

      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2 // Konten di atas overlay
      }}>
        <div>
          <h1 style={{
            fontSize: '3.2rem',
            fontWeight: 800,
            color: '#E3F2FD',
            lineHeight: 1.2,
            marginBottom: '16px',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)' // Bayangan teks agar lebih tajam
          }}>
            Desa <span style={{
              color: '#64B5F6',
              background: 'rgba(13, 71, 161, 0.5)',
              padding: '0 16px',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(100, 181, 246, 0.3)'
            }}>Energi Mandiri</span><br />
            Padakembang
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#90CAF9',
            marginBottom: '24px',
            maxWidth: '500px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>
            Membangun kemandirian energi berbasis potensi lokal. <br />
            <span style={{ color: '#64B5F6', fontWeight: 600 }}>Terangi desa, hijaukan bumi.</span>
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/layanan" className="btn btn-primary">Jelajahi Layanan</a>
            <a href="/energi" className="btn btn-secondary">Program Energi</a>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(20px)',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
          border: '1px solid rgba(100, 181, 246, 0.2)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              color: '#64B5F6'
            }}>501<span style={{ color: '#90CAF9' }}>+</span></div>
            <div style={{ fontSize: '0.9rem', color: '#BBDEFB', fontWeight: 500 }}>Penduduk</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              color: '#64B5F6'
            }}>30<span style={{ color: '#90CAF9' }}>+</span></div>
            <div style={{ fontSize: '0.9rem', color: '#BBDEFB', fontWeight: 500 }}> UMKM Aktif</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              color: '#64B5F6'
            }}>90<span style={{ color: '#90CAF9' }}>%</span></div>
            <div style={{ fontSize: '0.9rem', color: '#BBDEFB', fontWeight: 500 }}> kebahagian</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .container { grid-template-columns: 1fr !important; text-align: center; }
          .hero-content p { margin: 0 auto 24px; }
        }
        @media (max-width: 768px) {
          h1 { font-size: 2.2rem !important; }
          .hero-stats { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .hero-stats { grid-template-columns: 1fr !important; }
          h1 { font-size: 1.8rem !important; }
        }
      `}</style>
    </section>
  )
}

export default Hero