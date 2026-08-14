import React from 'react'

const Statistik = () => {
  // Data untuk grafik tren pertumbuhan
  const tahunData = [
    { tahun: '2022', kelahiran: 45, kematian: 28, total: 4450 },
    { tahun: '2023', kelahiran: 52, kematian: 25, total: 4680 },
    { tahun: '2024', kelahiran: 48, kematian: 30, total: 4890 },
    { tahun: '2025', kelahiran: 55, kematian: 22, total: 5070 },
    { tahun: '2026', kelahiran: 58, kematian: 26, total: 5234 }
  ]

  // Data Pendidikan
  const pendidikanData = [
    { label: 'D1-D3', jumlah: 30, persen: '19.0%', color: '#26F0D2' },
    { label: 'SMA/SMK', jumlah: 28, persen: '17.7%', color: '#26F0D2' },
    { label: 'SD/Sederajat', jumlah: 27, persen: '17.1%', color: '#26F0D2' },
    { label: 'S1/D4', jumlah: 24, persen: '15.2%', color: '#26DFF0' },
    { label: 'SMP/Sederajat', jumlah: 24, persen: '15.2%', color: '#26DFF0' },
    { label: 'Tidak Sekolah', jumlah: 22, persen: '13.9%', color: '#26DFF0' }
  ]

  // Data Mata Pencaharian
  const pekerjaanData = [
    { label: 'Pedagang', jumlah: 13, persen: '8.2%', color: '#FF8A65' },
    { label: 'Mengurus Rumah Tangga', jumlah: 12, persen: '7.6%', color: '#FFAB91' },
    { label: 'Pelajar', jumlah: 12, persen: '7.6%', color: '#FFCC80' },
    { label: 'Mahasiswa', jumlah: 11, persen: '7.0%', color: '#FFD54F' },
    { label: 'Pensiunan', jumlah: 8, persen: '5.1%', color: '#A5D6A7' },
    { label: 'Buruh', jumlah: 2, persen: '1.3%', color: '#81C784' },
    { label: 'CEO', jumlah: 1, persen: '0.6%', color: '#4CAF50' },
    { label: 'Pelajar/Mahasiswa', jumlah: 1, persen: '0.6%', color: '#66BB6A' },
    { label: 'Tidak Bekerja', jumlah: 2, persen: '1.3%', color: '#A1887F' }
  ]

  // Data BPJS
  const bpjsData = [
    { label: 'Non-PBI (Mandiri)', jumlah: 87, persen: '55.1%', color: '#4CAF50' },
    { label: 'PBI (Subsidi)', jumlah: 30, persen: '19.0%', color: '#66BB6A' },
    { label: 'Tidak Ada', jumlah: 21, persen: '13.3%', color: '#EF5350' }
  ]

  // Data Agama
  const agamaData = [
    { label: 'Islam', jumlah: 87, persen: '55.1%', color: '#26F052' },
    { label: 'Kristen', jumlah: 30, persen: '19.0%', color: '#7AF026' },
    { label: 'Hindu', jumlah: 21, persen: '13.3%', color: '#FF8A65' },
    { label: 'Buddha', jumlah: 10, persen: '6.3%', color: '#FFD54F' },
    { label: 'katolik', jumlah: 5, persen: '3.2%', color: '#C8F026' },
  ]

  // Data Administrasi
  const administrasiData = [
    { label: 'Kepemilikan KTP', persen: '81%', jumlah: '128 Terdaftar', color: '#4CAF50' },
    { label: 'Kepemilikan KK', persen: '89%', jumlah: '141 Terdaftar', color: '#66BB6A' },
    { label: 'Akta Kelahiran', persen: '75%', jumlah: '118 Terdaftar', color: '#FFA726' }
  ]

  const maxTotal = 5500
  const maxKelahiran = 60

  return (
    <section style={{
      padding: '60px 0',
      background: 'linear-gradient(135deg, #0D47A1, #1565C0)',
      minHeight: '100vh'
    }}>
      <div className="container">
        {/* Judul Halaman */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '2.8rem',
            fontWeight: 800,
            color: '#E3F2FD',
            marginBottom: '8px'
          }}>
            Dashboard <span style={{ color: '#64B5F6' }}>Statistik Lanjutan</span>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#90CAF9',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Visualisasi data kependudukan, demografi, dan laju pertumbuhan 5 tahun terakhir Desa Padakembang. Data ini mencakup kelahiran, kematian, pendidikan, pekerjaan, BPJS, agama, dan administrasi kependudukan.
          </p>
        </div>

        {/* Grid Statistik Utama - 4 Kolom */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(100, 181, 246, 0.15)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#90CAF9', marginBottom: '4px' }}>Total Penduduk</div>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#64B5F6' }}>158</div>
            <div style={{ fontSize: '0.9rem', color: '#90CAF9' }}>Jiwa</div>
            <div style={{
              marginTop: '8px',
              background: 'rgba(100, 181, 246, 0.15)',
              padding: '4px 12px',
              borderRadius: '50px',
              display: 'inline-block',
              fontSize: '0.8rem',
              color: '#BBDEFB'
            }}>
              Laju Alami: +25 jiwa (Thn ini)
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(100, 181, 246, 0.15)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#90CAF9', marginBottom: '4px' }}>Sex Ratio</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#64B5F6' }}>116.4</div>
            <div style={{ fontSize: '0.9rem', color: '#90CAF9' }}>Laki per 100 Prp</div>
            <div style={{
              marginTop: '8px',
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              fontSize: '0.85rem'
            }}>
              <span style={{ color: '#42A5F5' }}> Pria: 85 (54%)</span>
              <span style={{ color: '#90CAF9' }}> Wanita: 73 (46%)</span>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(100, 181, 246, 0.15)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#90CAF9', marginBottom: '4px' }}>Kepadatan Penduduk</div>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#64B5F6' }}>63</div>
            <div style={{ fontSize: '0.9rem', color: '#90CAF9' }}>Jiwa/km²</div>
            <div style={{
              marginTop: '8px',
              background: 'rgba(100, 181, 246, 0.15)',
              padding: '4px 12px',
              borderRadius: '50px',
              display: 'inline-block',
              fontSize: '0.8rem',
              color: '#BBDEFB'
            }}>
              Luas Wilayah: 2.5 km²
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(100, 181, 246, 0.15)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#90CAF9', marginBottom: '4px' }}>Pertumbuhan 5 Tahun</div>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#64B5F6' }}>+17.91%</div>
            <div style={{ fontSize: '0.9rem', color: '#90CAF9' }}>Geometrik Rate (2022-2026)</div>
          </div>
        </div>

        {/* ===== GRAFIK KELAHIRAN VS KEMATIAN (ALAMI) DENGAN WARNA ===== */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          padding: '32px',
          borderRadius: '16px',
          border: '1px solid rgba(100, 181, 246, 0.1)',
          marginBottom: '32px'
        }}>
          <h3 style={{
            color: '#E3F2FD',
            fontSize: '1.4rem',
            marginBottom: '8px',
            textAlign: 'center'
          }}>
             Kelahiran vs Kematian (Alami)
          </h3>
          <p style={{
            color: '#90CAF9',
            fontSize: '0.95rem',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            Data 5 Tahun Terakhir (2022-2026)
          </p>

          {/* Grafik Bar dengan Warna */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            height: '300px',
            padding: '0 20px',
            gap: '30px',
            position: 'relative'
          }}>
            {/* Sumbu Y */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              paddingRight: '12px',
              color: '#90CAF9',
              fontSize: '0.75rem',
              minWidth: '30px'
            }}>
              <span>60</span>
              <span>45</span>
              <span>30</span>
              <span>15</span>
              <span>0</span>
            </div>

            {/* Bar Chart per Tahun */}
            {tahunData.map((item, index) => {
              const maxValue = 60
              const heightKelahiran = (item.kelahiran / maxValue) * 250
              const heightKematian = (item.kematian / maxValue) * 250
              
              return (
                <div key={index} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  gap: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '8px',
                    height: '260px'
                  }}>
                    {/* Bar Kelahiran - Warna Biru Cerah */}
                    <div style={{
                      height: `${heightKelahiran}px`,
                      width: '35px',
                      background: 'linear-gradient(180deg, #42A5F5, #0D47A1)',
                      borderRadius: '8px 8px 4px 4px',
                      transition: '0.3s',
                      boxShadow: '0 4px 15px rgba(66, 165, 245, 0.3)',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      paddingTop: '4px'
                    }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#E3F2FD',
                        textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                      }}>
                        {item.kelahiran}
                      </span>
                    </div>
                    
                    {/* Bar Kematian - Warna Merah/Orange */}
                    <div style={{
                      height: `${heightKematian}px`,
                      width: '35px',
                      background: 'linear-gradient(180deg, #EF5350, #B71C1C)',
                      borderRadius: '8px 8px 4px 4px',
                      transition: '0.3s',
                      boxShadow: '0 4px 15px rgba(239, 83, 80, 0.3)',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      paddingTop: '4px'
                    }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#E3F2FD',
                        textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                      }}>
                        {item.kematian}
                      </span>
                    </div>
                  </div>
                  
                  {/* Label Tahun */}
                  <div style={{
                    color: '#90CAF9',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    paddingTop: '4px',
                    borderTop: '1px solid rgba(100, 181, 246, 0.2)',
                    width: '100%',
                    textAlign: 'center'
                  }}>
                    {item.tahun}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend dengan Warna */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(100, 181, 246, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '30px',
                height: '18px',
                background: 'linear-gradient(90deg, #42A5F5, #0D47A1)',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(66, 165, 245, 0.3)'
              }}></div>
              <span style={{ color: '#BBDEFB', fontSize: '0.95rem', fontWeight: 500 }}>
                <span style={{ color: '#42A5F5' }}>●</span> Kelahiran
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '30px',
                height: '18px',
                background: 'linear-gradient(90deg, #EF5350, #B71C1C)',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(239, 83, 80, 0.3)'
              }}></div>
              <span style={{ color: '#BBDEFB', fontSize: '0.95rem', fontWeight: 500 }}>
                <span style={{ color: '#EF5350' }}>●</span> Kematian
              </span>
            </div>
          </div>
        </div>

        {/* ===== BAGIAN: TINGKAT PENDIDIKAN ===== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Tingkat Pendidikan */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(100, 181, 246, 0.1)'
          }}>
            <h3 style={{
              color: '#E3F2FD',
              fontSize: '1.2rem',
              marginBottom: '16px',
              textAlign: 'center',
              borderBottom: '2px solid rgba(100, 181, 246, 0.2)',
              paddingBottom: '12px'
            }}>
              📚 Tingkat Pendidikan
            </h3>
            {pendidikanData.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: index < pendidikanData.length - 1 ? '1px solid rgba(100, 181, 246, 0.08)' : 'none'
              }}>
                <span style={{ color: '#BBDEFB', fontSize: '0.95rem' }}>{item.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#90CAF9', fontSize: '0.85rem' }}>{item.jumlah} Jiwa</span>
                  <span style={{
                    background: item.color + '33',
                    padding: '2px 12px',
                    borderRadius: '50px',
                    color: item.color,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: `1px solid ${item.color}44`
                  }}>{item.persen}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mata Pencaharian */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(100, 181, 246, 0.1)'
          }}>
            <h3 style={{
              color: '#E3F2FD',
              fontSize: '1.2rem',
              marginBottom: '16px',
              textAlign: 'center',
              borderBottom: '2px solid rgba(100, 181, 246, 0.2)',
              paddingBottom: '12px'
            }}>
              💼 Mata Pencaharian
            </h3>
            {pekerjaanData.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 0',
                borderBottom: index < pekerjaanData.length - 1 ? '1px solid rgba(100, 181, 246, 0.06)' : 'none'
              }}>
                <span style={{ color: '#BBDEFB', fontSize: '0.9rem' }}>{item.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#90CAF9', fontSize: '0.8rem' }}>{item.jumlah} Jiwa</span>
                  <span style={{
                    background: item.color + '33',
                    padding: '2px 12px',
                    borderRadius: '50px',
                    color: item.color,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: `1px solid ${item.color}44`
                  }}>{item.persen}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== BAGIAN: STATUS SOSIAL & KESEHATAN ===== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* BPJS */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(100, 181, 246, 0.1)'
          }}>
            <h3 style={{
              color: '#E3F2FD',
              fontSize: '1.2rem',
              marginBottom: '16px',
              textAlign: 'center',
              borderBottom: '2px solid rgba(100, 181, 246, 0.2)',
              paddingBottom: '12px'
            }}>
              🏥 KEPESERTAAN BPJS
            </h3>
            {bpjsData.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: index < bpjsData.length - 1 ? '1px solid rgba(100, 181, 246, 0.08)' : 'none'
              }}>
                <span style={{ color: '#BBDEFB', fontSize: '0.95rem' }}>{item.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#90CAF9', fontSize: '0.85rem' }}>{item.jumlah} Jiwa</span>
                  <span style={{
                    background: item.color + '33',
                    padding: '2px 12px',
                    borderRadius: '50px',
                    color: item.color,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: `1px solid ${item.color}44`
                  }}>{item.persen}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Agama */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(100, 181, 246, 0.1)'
          }}>
            <h3 style={{
              color: '#E3F2FD',
              fontSize: '1.2rem',
              marginBottom: '16px',
              textAlign: 'center',
              borderBottom: '2px solid rgba(100, 181, 246, 0.2)',
              paddingBottom: '12px'
            }}>
              🕌 AGAMA
            </h3>
            {agamaData.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: index < agamaData.length - 1 ? '1px solid rgba(100, 181, 246, 0.08)' : 'none'
              }}>
                <span style={{ color: '#BBDEFB', fontSize: '0.95rem' }}>{item.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#90CAF9', fontSize: '0.85rem' }}>{item.jumlah} Jiwa</span>
                  <span style={{
                    background: item.color + '33',
                    padding: '2px 12px',
                    borderRadius: '50px',
                    color: item.color,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: `1px solid ${item.color}44`
                  }}>{item.persen}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== BAGIAN: KELENGKAPAN ADMINISTRASI ===== */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid rgba(100, 181, 246, 0.1)',
          marginBottom: '32px'
        }}>
          <h3 style={{
            color: '#E3F2FD',
            fontSize: '1.2rem',
            marginBottom: '16px',
            textAlign: 'center',
            borderBottom: '2px solid rgba(100, 181, 246, 0.2)',
            paddingBottom: '12px'
          }}>
            📋 Kelengkapan Administrasi
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {administrasiData.map((item, index) => (
              <div key={index} style={{
                textAlign: 'center',
                background: 'rgba(100, 181, 246, 0.06)',
                padding: '20px',
                borderRadius: '12px',
                border: `1px solid ${item.color}44`
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: item.color
                }}>{item.persen}</div>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#90CAF9',
                  marginBottom: '4px'
                }}>{item.label}</div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#BBDEFB',
                  background: item.color + '22',
                  padding: '2px 12px',
                  borderRadius: '50px',
                  display: 'inline-block',
                  border: `1px solid ${item.color}33`
                }}>{item.jumlah}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabel Data Detail */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid rgba(100, 181, 246, 0.1)',
          overflowX: 'auto'
        }}>
          <h4 style={{
            color: '#E3F2FD',
            marginBottom: '16px',
            textAlign: 'center'
          }}>Data Detail 5 Tahun Terakhir</h4>
          
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            color: '#E3F2FD'
          }}>
            <thead>
              <tr style={{
                borderBottom: '2px solid rgba(100, 181, 246, 0.3)'
              }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#64B5F6' }}>Tahun</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#64B5F6' }}>Kelahiran</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#64B5F6' }}>Kematian</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#64B5F6' }}>Total Penduduk</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#64B5F6' }}>Pertumbuhan</th>
              </tr>
            </thead>
            <tbody>
              {tahunData.map((item, index) => {
                const growth = index > 0 ? ((item.total - tahunData[index-1].total) / tahunData[index-1].total * 100).toFixed(2) : '-'
                return (
                  <tr key={index} style={{
                    borderBottom: index < tahunData.length - 1 ? '1px solid rgba(100, 181, 246, 0.1)' : 'none'
                  }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#90CAF9' }}>{item.tahun}</td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#42A5F5' }}>{item.kelahiran}</td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#EF5350' }}>{item.kematian}</td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#E3F2FD' }}>{item.total}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'center',
                      color: growth !== '-' ? (growth > 0 ? '#81C784' : '#FF8A80') : '#90CAF9'
                    }}>
                      {growth !== '-' ? (growth > 0 ? '+' : '') + growth + '%' : '-'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Statistik