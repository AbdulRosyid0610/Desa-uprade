import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0D47A1, #1A237E)',
      color: '#E3F2FD',
      padding: '40px 0',
      borderTop: '3px solid #42A5F5'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: '40px'
      }}>
        <div>
          <h4 style={{ color: '#64B5F6', marginBottom: '16px' }}> Desa Padakembang</h4>
          <p style={{ marginBottom: '8px', color: '#90CAF9' }}>
            Desa Energi Mandiri - Kecamatan Padakembang, Kabupaten Tasikmalaya, Jawa Barat
          </p>
          <p style={{ color: '#90CAF9' }}>
            <i className="fas fa-phone" style={{ color: '#64B5F6' }}></i> (0265) 123-4567 &nbsp;|&nbsp;
            <i className="fas fa-envelope" style={{ color: '#64B5F6' }}></i> desa@padakembang.id
          </p>
        </div>
        <div>
          <h4 style={{ color: '#64B5F6', marginBottom: '16px' }}>Navigasi</h4>
          <p><Link to="/" style={{ color: '#90CAF9', transition: '0.3s' }}>Beranda</Link></p>
          <p><Link to="/energi" style={{ color: '#90CAF9', transition: '0.3s' }}>Program Energi</Link></p>
          <p><Link to="/layanan" style={{ color: '#90CAF9', transition: '0.3s' }}>Layanan Online</Link></p>
          <p><Link to="/cctv" style={{ color: '#90CAF9', transition: '0.3s' }}>CCTV</Link></p>
        </div>
        <div>
          <h4 style={{ color: '#64B5F6', marginBottom: '16px' }}>Layanan</h4>
          <p><Link to="/layanan/form" style={{ color: '#90CAF9', transition: '0.3s' }}>Surat Keterangan</Link></p>
          <p><Link to="/layanan/form" style={{ color: '#90CAF9', transition: '0.3s' }}>Bantuan Sosial</Link></p>
          <p><Link to="/layanan/form" style={{ color: '#90CAF9', transition: '0.3s' }}>Pengaduan</Link></p>
          <p><Link to="/layanan/form" style={{ color: '#90CAF9', transition: '0.3s' }}>UMKM & Energi</Link></p>
        </div>
        <div className="footer-bottom" style={{
          gridColumn: '1 / -1',
          borderTop: '1px solid rgba(100, 181, 246, 0.2)',
          paddingTop: '16px',
          textAlign: 'center',
          fontSize: '0.9rem',
          opacity: 0.7,
          color: '#90CAF9'
        }}>
          &copy; 2026 Desa Padakembang. Dibangun dengan <i className="fas fa-heart" style={{ color: '#64B5F6' }}></i> untuk kemandirian energi.
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer .container {
            grid-template-columns: 1fr !important;
            gap: 24px;
          }
        }
        .footer a:hover {
          color: #64B5F6 !important;
        }
      `}</style>
    </footer>
  )
}

export default Footer