import React from 'react'
import { Link } from 'react-router-dom'

const layananData = [
  { icon: '📄', title: 'Surat Keterangan', desc: 'Domisili, usaha, kelahiran, dan kematian', link: '/layanan/form' },
  { icon: '🤝', title: 'Bantuan Sosial', desc: 'BLT, PKH, sembako, dan bantuan lainnya', link: '/layanan/form' },
  { icon: '🏥', title: 'Kesehatan', desc: 'Jadwal posyandu dan layanan kesehatan dasar', link: '/layanan/form' },
  { icon: '🛠️', title: 'Pengaduan', desc: 'Infrastruktur, lingkungan, dan pelayanan', link: '/layanan/form' },
  { icon: '🏪', title: 'UMKM & Usaha', desc: 'Pendaftaran usaha dan promosi produk lokal', link: '/layanan/form' },
  { icon: '⚡', title: 'Program Energi', desc: 'Pendaftaran PLTS, biogas, dan efisiensi energi', link: '/layanan/form' }
]

const Layanan = () => {
  return (
    <section style={{
      padding: '60px 0',
      background: 'linear-gradient(135deg, #1565C0, #0D47A1)',
      minHeight: '100vh'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 800,
            color: '#E3F2FD',
            marginBottom: '8px'
          }}>
            Layanan <span style={{ color: '#64B5F6' }}>Digital Desa</span>
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#90CAF9',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Akses layanan publik dengan mudah, cepat, dan transparan
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {layananData.map((item, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid rgba(100, 181, 246, 0.15)',
              textAlign: 'center',
              transition: '0.3s ease'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{item.icon}</div>
              <h4 style={{ color: '#E3F2FD', fontSize: '1.3rem', marginBottom: '8px' }}>{item.title}</h4>
              <p style={{ fontSize: '0.95rem', color: '#90CAF9', marginBottom: '16px' }}>{item.desc}</p>
              <Link to={item.link} className="btn btn-primary">Ajukan Sekarang</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Layanan