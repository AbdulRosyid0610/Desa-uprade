import React from 'react'

const aparat = [
  {
    name: 'jenal muttaqin',
    jabatan: 'Kepala Desa',
    photo: '/Images/kepala-desa.jpg', 
  },
  {
    name: 'dedi mulyadi',
    jabatan: 'Wakil Kepala Desa',
    photo: '/Images/wakil-desa.jpg'
  },
  {
    name: ' prabowo well',
    jabatan: 'Sekretaris Desa',
    photo: '/Images/sekretaris.jpg'
  },
  {
    name: 'Teddy',
    jabatan: 'Bendahara',
    photo: '/Images/bendahara.jpg'
  },
  {
    name: 'Agus Salim',
    jabatan: 'Wakil Bendahara',
    photo: '/Images/kasi-pemerintahan.jpg'
  },
  {
    name: 'Suuhendar',
    jabatan: 'Staff desa',
    photo: '/Images/kasi-kesejahteraan.jpg'
  },

   {
    name: 'anies',
    jabatan: 'Staff desa',
    photo: '/Images/staff.jpg'
  },

   {
    name: 'ganjar',
    jabatan: 'Staff desa',
    photo: '/Images/Staffdesa.jpg'
  }
]

const Aparat = () => {
  return (
    <section style={{
      padding: '60px 0',
      background: 'linear-gradient(135deg, #1565C0, #0D47A1)',
      borderBottom: '3px solid #42A5F5'
    }} id="aparat">
      <div className="container text-center">
        <h2 className="section-title" style={{ color: '#E3F2FD', fontSize: '2.5rem', marginBottom: '10px' }}>
          Aparat <span className="highlight" style={{ background: '#42A5F5', color: '#FFFFFF', padding: '0 12px', borderRadius: '8px' }}>Pemerintahan</span>
        </h2>
        <p className="section-subtitle" style={{ color: '#90CAF9', fontSize: '1.1rem', marginBottom: '40px' }}>
          Struktur organisasi Desa Padakembang
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {aparat.map((person, index) => (
            <div key={index} style={{
              textAlign: 'center',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              padding: '32px 24px',
              borderRadius: '16px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
              border: '1px solid rgba(100, 181, 246, 0.15)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'default'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
            }}
            >
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img
                  src={person.photo}
                  alt={person.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto 16px',
                    display: 'block',
                    border: '3px solid #64B5F6',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                  }}
                  onError={(e) => {
                    // Jika gambar gagal load, tampilkan inisial
                    const parent = e.target.parentElement;
                    e.target.style.display = 'none';
                    
                    if (!parent.querySelector('.initials-fallback')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'initials-fallback';
                      fallback.style.cssText = `
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #42A5F5, #0D47A1);
                        margin: 0 auto 16px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2.5rem;
                        color: #E3F2FD;
                        font-weight: 700;
                        border: 3px solid #64B5F6;
                      `;
                      fallback.innerText = person.name.charAt(0);
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <h4 style={{ color: '#E3F2FD', marginBottom: '4px', fontSize: '1.1rem' }}>{person.name}</h4>
              <p style={{
                color: '#64B5F6',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>{person.jabatan}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Aparat