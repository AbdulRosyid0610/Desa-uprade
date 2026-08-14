import React from 'react'

const cctvData = [
  { name: 'Gerbang Utama', status: 'Online', time: '13:50:20' },
  { name: 'Jalan Raya', status: 'Online', time: '13:50:20' },
  { name: 'Lapangan Desa', status: 'Maintenance', time: '--:--:--' },
  { name: 'Pasar Desa', status: 'Online', time: '13:50:20' },
  { name: 'Balai Desa', status: 'Online', time: '13:50:20' },
  { name: 'Simpang Tiga', status: 'Online', time: '13:50:20' }
]

const CCTV = () => {
  return (
    <section style={{
      padding: '60px 0',
      background: 'linear-gradient(135deg, #0D47A1, #1A237E)',
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
            CCTV <span style={{ color: '#64B5F6' }}>LIVE </span>
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#90CAF9',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Pantau keamanan desa secara real-time
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {cctvData.map((cam, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              overflow: 'hidden',
              color: '#E3F2FD',
              border: '1px solid rgba(100, 181, 246, 0.15)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
            }}>
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                minHeight: '180px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'rgba(0,0,0,0.2)'
              }}>
                <span style={{
                  background: cam.status === 'Online' ? '#4CAF50' : '#FF9800',
                  padding: '4px 14px',
                  borderRadius: '50px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  animation: cam.status === 'Online' ? 'pulse 1.5s infinite' : 'none'
                }}>
                  {cam.status === 'Online' ? '● LIVE' : '● OFFLINE'}
                </span>
                <span style={{ fontSize: '4rem' }}>{cam.icon}</span>
                <span style={{
                  fontSize: '0.8rem',
                  opacity: 0.6,
                  fontFamily: 'monospace',
                  color: '#90CAF9'
                }}>{cam.time}</span>
                <span style={{
                  fontSize: '0.7rem',
                  color: '#64B5F6'
                }}>
                  <i className="fas fa-video"></i> Streaming
                </span>
              </div>
              <div style={{
                padding: '16px 20px',
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 600 }}>{cam.name}</span>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '4px 12px',
                  borderRadius: '50px',
                  background: cam.status === 'Online' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                  color: cam.status === 'Online' ? '#81C784' : '#FFB74D'
                }}>{cam.status}</span>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>

        <p style={{
          marginTop: '32px',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#90CAF9'
        }}>
          <i className="fas fa-info-circle"></i> Simulasi tampilan CCTV - Integrasi API dapat dikembangkan
        </p>
      </div>
    </section>
  )
}

export default CCTV