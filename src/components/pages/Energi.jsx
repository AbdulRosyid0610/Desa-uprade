import React from 'react'

const programs = [
  {
    icon: '☀️',
    title: 'Panel Surya (PLTS)',
    desc: 'Pembangkit listrik tenaga surya dengan kapasitas 85 kWp yang telah melayani lebih dari 300 rumah tangga di Desa Padakembang.',
    specs: ['Kapasitas: 85 kWp', 'Rumah Terlayani: 300+', 'Penghematan: Rp 500.000/bulan'],
    badge: 'Energi Terbarukan'
  },
  {
    icon: '𖣘',
    title: 'Kincir Angin',
    desc: 'Pemanfaatan energi angin untuk pompa air irigasi dan listrik skala kecil di area pertanian desa.',
    specs: ['Jumlah: 10 Unit', 'Area: 50 Hektar', 'Irigasi: 100+ Petani'],
    badge: 'Ramah Lingkungan'
  },
  {
    icon: '♻️',
    title: 'Biogas Desa',
    desc: 'Pengolahan limbah ternak menjadi sumber energi gas untuk kebutuhan memasak dan penerangan.',
    specs: ['Rumah Tangga: 50+', 'Limbah Ternak: 200+ Ekor', 'Penghematan: Rp 200.000/bulan'],
    badge: 'Ekonomi Sirkular'
  },
  {
    icon: '💡',
    title: 'Efisiensi Energi',
    desc: 'Program penggantian lampu LED dan edukasi hemat energi untuk seluruh warga desa.',
    specs: ['Lampu LED: 1.000+ Unit', 'Edukasi: 10.000+ Orang', 'Hemat: 40% Listrik'],
    badge: 'Hemat Biaya'
  }
]

const Energi = () => {
  return (
    <section style={{
      padding: '60px 0',
      background: 'linear-gradient(135deg, #0D47A1, #1565C0)',
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
            Program <span style={{ color: '#64B5F6' }}>Energi Mandiri</span>
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#90CAF9',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Desa Padakembang mengelola sumber daya alam untuk kemandirian energi
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {programs.map((program, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(10px)',
              padding: '32px',
              borderRadius: '20px',
              border: '1px solid rgba(100, 181, 246, 0.15)',
              transition: '0.3s ease',
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                fontSize: '4rem',
                display: 'block',
                marginBottom: '16px',
                textAlign: 'center'
              }}>{program.icon}</div>
              <h3 style={{
                color: '#E3F2FD',
                fontSize: '1.5rem',
                marginBottom: '12px',
                textAlign: 'center'
              }}>{program.title}</h3>
              <p style={{
                color: '#90CAF9',
                fontSize: '0.95rem',
                marginBottom: '16px',
                textAlign: 'center'
              }}>{program.desc}</p>
              
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '16px'
              }}>
                {program.specs.map((spec, i) => (
                  <p key={i} style={{
                    color: '#BBDEFB',
                    fontSize: '0.9rem',
                    padding: '4px 0',
                    borderBottom: i < program.specs.length - 1 ? '1px solid rgba(100, 181, 246, 0.1)' : 'none'
                  }}>
                    <i className="fas fa-check-circle" style={{ color: '#64B5F6', marginRight: '8px' }}></i>
                    {spec}
                  </p>
                ))}
              </div>
              
              <span style={{
                display: 'inline-block',
                background: '#42A5F5',
                color: '#FFFFFF',
                padding: '6px 20px',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '0.85rem',
                width: '100%',
                textAlign: 'center'
              }}>{program.badge}</span>
            </div>
          ))}
        </div>

        {/* Statistik Energi */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          marginTop: '60px',
          background: 'rgba(255,255,255,0.05)',
          padding: '40px',
          borderRadius: '20px',
          border: '1px solid rgba(100, 181, 246, 0.1)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#64B5F6' }}>85 kWp</div>
            <div style={{ color: '#90CAF9' }}>PLTS Terpasang</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#64B5F6' }}>50+</div>
            <div style={{ color: '#90CAF9' }}>Rumah Biogas</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#64B5F6' }}>98%</div>
            <div style={{ color: '#90CAF9' }}>Akses Listrik</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#64B5F6' }}>Rp 5M</div>
            <div style={{ color: '#90CAF9' }}>Penghematan/Tahun</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Energi