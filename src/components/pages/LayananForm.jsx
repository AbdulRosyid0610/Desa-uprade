import React, { useState } from 'react'

const LayananForm = () => {
  // 1. Tambahkan data baru ke state awal
  const [formData, setFormData] = useState({ 
    nama: '', 
    nik: '', 
    hp: '',
    kampung: '',
    rt: '',
    rw: '',
    layanan: '', 
    pesan: '',
    ktp: null,
    kk: null
  })
  const [feedback, setFeedback] = useState('')

  // Data Kampung sesuai dengan Peta Anda
  const kampungOptions = [
    "Sukamanah", "Cikadu", "Padamenak", 
    "Margaluyu", "Sukaraja", "Babakan", "Pangkalan"
  ]

  const handleChange = (e) => {
    const { id, value, type, files } = e.target
    // Jika input file, ambil file-nya. Jika text, ambil value-nya.
    setFormData({ 
      ...formData, 
      [id]: type === 'file' ? files[0] : value 
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { nama, layanan, hp, kampung } = formData

    // Validasi lebih ketat
    if (!nama || !layanan || !hp || !kampung) {
      setFeedback('⚠️ Harap isi Nama, No. HP, Kampung, dan Jenis Layanan.')
      return
    }

    // Jika lolos validasi
    const antrian = 'MGL-' + Date.now().toString().slice(-6)
    setFeedback(`✅ Permohonan Anda telah diterima! Nomor antrian: ${antrian}. Petugas akan menghubungi Anda.`)
    
    // Reset form setelah submit
    setFormData({ 
      nama: '', nik: '', hp: '', kampung: '', rt: '', rw: '', 
      layanan: '', pesan: '', ktp: null, kk: null 
    })
    setTimeout(() => setFeedback(''), 8000)
  }

  return (
    <section style={{
      padding: '60px 20px', // Tambahkan padding kiri kanan
      background: 'linear-gradient(135deg, #0D47A1, #1A237E)',
      minHeight: '100vh'
    }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#E3F2FD',
            marginBottom: '8px'
          }}>
            Formulir <span style={{ color: '#64B5F6' }}>Layanan</span>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#90CAF9',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Isi data dengan benar. Petugas desa akan segera memproses permohonan Anda.
          </p>
        </div>

        {/* Card Formulir */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
          padding: '40px',
          borderRadius: '20px',
          border: '1px solid rgba(100, 181, 246, 0.15)',
          textAlign: 'left'
        }}>
          <form onSubmit={handleSubmit}>
            
            {/* GRID LAYOUT: 2 Kolom */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px' 
            }}>
              
              {/* Kolom Kiri */}
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="nama" style={{ display: 'block', fontWeight: 600, color: '#E3F2FD', marginBottom: '6px' }}>Nama Lengkap <span style={{color: '#ef4444'}}>*</span></label>
                  <input
                    type="text" id="nama" value={formData.nama} onChange={handleChange}
                    placeholder="Contoh: Budi Santoso"
                    style={inputStyle}
                    required
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="nik" style={{ display: 'block', fontWeight: 600, color: '#E3F2FD', marginBottom: '6px' }}>NIK (16 digit)</label>
                  <input
                    type="text" id="nik" value={formData.nik} onChange={handleChange}
                    placeholder="3200000000000000" maxLength="16"
                    style={inputStyle}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="hp" style={{ display: 'block', fontWeight: 600, color: '#E3F2FD', marginBottom: '6px' }}>No. Handphone / WA <span style={{color: '#ef4444'}}>*</span></label>
                  <input
                    type="text" id="hp" value={formData.hp} onChange={handleChange}
                    placeholder="08123456789"
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              {/* Kolom Kanan */}
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="kampung" style={{ display: 'block', fontWeight: 600, color: '#E3F2FD', marginBottom: '6px' }}>Pilih Kampung / Dusun <span style={{color: '#ef4444'}}>*</span></label>
                  <select id="kampung" value={formData.kampung} onChange={handleChange} style={inputStyle} required>
                    <option value="" style={{ background: '#0D47A1' }}>Pilih Kampung...</option>
                    {kampungOptions.map(k => <option key={k} value={k} style={{ background: '#0D47A1' }}>{k}</option>)}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label htmlFor="rt" style={{ display: 'block', fontWeight: 600, color: '#E3F2FD', marginBottom: '6px' }}>RT</label>
                    <input type="text" id="rt" value={formData.rt} onChange={handleChange} placeholder="001" style={inputStyle} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label htmlFor="rw" style={{ display: 'block', fontWeight: 600, color: '#E3F2FD', marginBottom: '6px' }}>RW</label>
                    <input type="text" id="rw" value={formData.rw} onChange={handleChange} placeholder="002" style={inputStyle} />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="layanan" style={{ display: 'block', fontWeight: 600, color: '#E3F2FD', marginBottom: '6px' }}>Jenis Layanan <span style={{color: '#ef4444'}}>*</span></label>
                  <select id="layanan" value={formData.layanan} onChange={handleChange} style={inputStyle} required>
                    <option value="" style={{ background: '#0D47A1' }}>Pilih layanan...</option>
                    <option value="surat" style={{ background: '#0D47A1' }}>Surat Keterangan</option>
                    <option value="bansos" style={{ background: '#0D47A1' }}>Bantuan Sosial</option>
                    <option value="kesehatan" style={{ background: '#0D47A1' }}>Kesehatan</option>
                    <option value="pengaduan" style={{ background: '#0D47A1' }}>Pengaduan</option>
                    <option value="umkm" style={{ background: '#0D47A1' }}>UMKM</option>
                    <option value="energi" style={{ background: '#0D47A1' }}>Program Energi</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Upload Berkas (Full Width) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '16px' }}>
              <div>
                <label htmlFor="ktp" style={{ display: 'block', fontWeight: 600, color: '#E3F2FD', marginBottom: '6px' }}>Upload Foto KTP</label>
                <input type="file" id="ktp" onChange={handleChange} style={{
                  width: '100%', padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: '#E3F2FD', border: '2px solid rgba(100, 181, 246, 0.3)'
                }} />
              </div>
              <div>
                <label htmlFor="kk" style={{ display: 'block', fontWeight: 600, color: '#E3F2FD', marginBottom: '6px' }}>Upload Foto KK</label>
                <input type="file" id="kk" onChange={handleChange} style={{
                  width: '100%', padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: '#E3F2FD', border: '2px solid rgba(100, 181, 246, 0.3)'
                }} />
              </div>
            </div>

            {/* Keterangan */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="pesan" style={{ display: 'block', fontWeight: 600, color: '#E3F2FD', marginBottom: '6px' }}>Pesan / Keterangan Tambahan</label>
              <textarea
                id="pesan" value={formData.pesan} onChange={handleChange}
                placeholder="Jelaskan detail keperluan Anda agar petugas lebih mudah membantu..."
                style={{
                  ...inputStyle, minHeight: '80px', fontFamily: 'inherit', resize: 'vertical'
                }}
              ></textarea>
            </div>

            {/* Tombol Kirim */}
            <button type="submit" style={{
              width: '100%',
              padding: '18px',
              fontSize: '1.1rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #42A5F5, #0D47A1)',
              color: '#FFFFFF',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: '0.3s ease',
              boxShadow: '0 4px 25px rgba(66, 165, 245, 0.3)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              <i className="fas fa-paper-plane"></i> Kirim Permohonan
            </button>
          </form>

          {/* Feedback Notifikasi */}
          {feedback && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              borderRadius: '12px',
              fontWeight: 600,
              background: feedback.includes('⚠️') ? 'rgba(255, 193, 7, 0.15)' : 'rgba(100, 181, 246, 0.15)',
              border: feedback.includes('⚠️') ? '1px solid #FFB74D' : '1px solid #64B5F6',
              color: feedback.includes('⚠️') ? '#FFD54F' : '#64B5F6',
              textAlign: 'center'
            }}>{feedback}</div>
          )}
        </div>
      </div>
    </section>
  )
}

// Style object agar kode lebih bersih
const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  fontSize: '16px',
  border: '2px solid rgba(100, 181, 246, 0.3)',
  borderRadius: '12px',
  background: 'rgba(255,255,255,0.05)',
  color: '#E3F2FD',
  transition: '0.3s',
  outline: 'none'
}

export default LayananForm 