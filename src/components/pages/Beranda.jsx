import React from 'react'
import Hero from '../Hero'

const Beranda = () => {
  return (
    <>
      <Hero />
      
      {/* ========================================== */}
      {/* SECTION 1: SELAMAT DATANG (DENGAN GAMBAR) */}
      {/* ========================================== */}
      <section style={{
        /* Ganti 'nama-gambar-anda.jpg' dengan file di folder public/Images */
        backgroundImage: 'url("/Images/nama-gambar-anda.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        
        padding: '80px 0',
        position: 'relative',
        textAlign: 'center'
      }}>
        
        {/* OVERLAY BIRU GELAP */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(13, 71, 161, 0.75)',
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ 
            color: '#E3F2FD', 
            fontSize: '2.5rem', 
            marginBottom: '16px',
            textShadow: '0 2px 15px rgba(0,0,0,0.5)' 
          }}>
            Selamat Datang di <span style={{ color: '#64B5F6' }}>Desa Padakembang</span>
          </h2>
          <p style={{ 
            color: '#90CAF9', 
            fontSize: '1.2rem', 
            maxWidth: '600px', 
            margin: '0 auto 32px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>
            Desa Energi Mandiri yang mengelola potensi lokal untuk kemandirian energi dan kesejahteraan masyarakat.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/energi" className="btn btn-primary">Lihat Program Energi</a>
            <a href="/layanan" className="btn btn-secondary">Layanan Digital</a>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 2: CAPAIAN DESA (GANTI DENGAN GAMBAR) */}
      {/* ========================================== */}
      <section style={{
        /* ★ PENTING: Ganti 'nama-gambar-anda-2.jpg' dengan file di folder public/Images ★ */
        backgroundImage: 'url("/Images/nama-gambar-anda-2.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        
        padding: '60px 0',
        position: 'relative'
      }}>
        
        {/* OVERLAY BIRU GELAP TRANSPARAN */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(13, 71, 161, 0.80)',
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h3 style={{
            textAlign: 'center',
            color: '#E3F2FD',
            fontSize: '1.8rem',
            marginBottom: '32px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>
            Capaian <span style={{ color: '#64B5F6' }}>Desa Padakembang</span>
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px'
          }}>
            <div style={{
              textAlign: 'center',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid rgba(100, 181, 246, 0.2)'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#64B5F6' }}>501+</div>
              <div style={{ color: '#90CAF9' }}>Penduduk</div>
            </div>
            <div style={{
              textAlign: 'center',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid rgba(100, 181, 246, 0.2)'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#64B5F6' }}>30+</div>
              <div style={{ color: '#90CAF9' }}>UMKM Aktif</div>
            </div>
            <div style={{
              textAlign: 'center',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid rgba(100, 181, 246, 0.2)'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#64B5F6' }}>90%</div>
              <div style={{ color: '#90CAF9' }}> Kebagahagian Penduduk</div>
            </div>
            <div style={{
              textAlign: 'center',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid rgba(100, 181, 246, 0.2)'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#64B5F6' }}>90%</div>
              <div style={{ color: '#90CAF9' }}>Kepuasan Warga</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Beranda