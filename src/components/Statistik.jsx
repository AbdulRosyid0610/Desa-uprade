// src/components/Statistik.jsx
import React from 'react';

const Statistik = () => {
  // Data statistik
  const statData = {
    totalPenduduk: 501,
    lajuAlami: '+5',
    pria: 89,
    wanita: 71,
    kepadatan: 61,
    luasWilayah: 2.5,
    pertumbuhan: '+17.69%',
    tahunPertumbuhan: '2022-2026'
  };

  // Data tren pertumbuhan 5 tahun
  const trenData = [
    { tahun: '2022', total: 4450 },
    { tahun: '2023', total: 4680 },
    { tahun: '2024', total: 4890 },
    { tahun: '2025', total: 5070 },
    { tahun: '2026', total: 5234 },
  ];

  // Data kelahiran vs kematian
  const kelahiranKematian = [
    { tahun: '2022', lahir: 45, mati: 28 },
    { tahun: '2023', lahir: 52, mati: 25 },
    { tahun: '2024', lahir: 48, mati: 30 },
    { tahun: '2025', lahir: 55, mati: 22 },
    { tahun: '2026', lahir: 58, mati: 26 },
  ];

  // Data pendidikan
  const pendidikanData = [
    { label: 'SD/Sederajat', value: 45, persen: 29.4 },
    { label: 'SMP/Sederajat', value: 38, persen: 24.8 },
    { label: 'SMA/Sederajat', value: 40, persen: 26.1 },
    { label: 'SMK/Sederajat', value: 30, persen: 19.6 },
    { label: 'S1-S2', value: 30, persen: 19.6 },
    { label: 'S3', value: 30, persen: 19.6 },
    { label: 'Tidak Sekolah', value: 30, persen: 19.6 },
  ];

  // Data mata pencaharian
  const pekerjaanData = [
    { label: 'Petani', value: 35, persen: 28.5 },
    { label: 'Pedagang', value: 25, persen: 20.3 },
    { label: 'PNS', value: 85.3, persen: 85.3 },
    { label: 'TNI/Polri', value: 80.6, persen: 80.6 },
    { label: 'Wiraswasta', value: 90, persen: 90.6 },
    { label: 'Mahasiswa', value: 92, persen: 92.6 },
    { label: 'Buruh', value: 97.3, persen: 97.3 },
    { label: 'CEO', value: 49.6, persen: 49.6 },
    { label: 'Pensiunan', value: 18, persen: 14.6 },
    { label: 'Mengurus rumah tangga', value: 90.6, persen: 90.6 },
       { label: 'Lainnya', value: 25, persen: 20.3 },
  ];

  // Hitung max untuk skala chart
  const maxTren = Math.max(...trenData.map(d => d.total));
  const maxKelahiran = Math.max(...kelahiranKematian.map(d => d.lahir));
  
  return (
    <section id="statistik" className="section statistik-section">
      <div className="container">
        <h2 className="section-title">Dashboard Statistik </h2>
        <p className="section-subtitle">
          Visualisasi data kependudukan, demografi, dan laju pertumbuhan 5 tahun terakhir Desa Padakembang Digital .
        </p>

        {/* Row 1: Total Penduduk & Sex Ratio */}
        <div className="statistik-row">
          {/* Total Penduduk */}
          <div className="statistik-card-big">
            <div className="stat-header">
              <h3>Total Penduduk</h3>
            </div>
            <div className="stat-number-big">{statData.totalPenduduk.toLocaleString()}</div>
            <div className="stat-label-big">
              <span className="laju-alami"> Laju Alami: {statData.lajuAlami} jiwa (Thn ini)</span>
            </div>
          </div>

          {/* Sex Ratio */}
          <div className="statistik-card-big">
            <div className="stat-header">
              <h3> (Rasio Jenis Kelamin)</h3>
            </div>
            <div className="sex-ratio">
              <div className="sex-item pria">
                <span className="sex-value">{statData.pria}</span>
                <span className="sex-label">Pria ({Math.round(statData.pria / (statData.pria + statData.wanita) * 100)}%)</span>
                <div className="sex-bar">
                  <div className="sex-bar-fill pria" style={{ width: `${statData.pria / (statData.pria + statData.wanita) * 100}%` }}></div>
                </div>
              </div>
              <div className="sex-item wanita">
                <span className="sex-value">{statData.wanita}</span>
                <span className="sex-label">Wanita ({Math.round(statData.wanita / (statData.pria + statData.wanita) * 100)}%)</span>
                <div className="sex-bar">
                  <div className="sex-bar-fill wanita" style={{ width: `${statData.wanita / (statData.pria + statData.wanita) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Kepadatan Penduduk & Pertumbuhan 5 Tahun */}
        <div className="statistik-row">
          {/* Kepadatan Penduduk */}
          <div className="statistik-card">
            <div className="stat-header">
              <h3>Kepadatan Penduduk</h3>
            </div>
            <div className="stat-number">{statData.kepadatan}</div>
            <div className="stat-label">Jiwa/km²</div>
            <div className="stat-sub-label">Luas Wilayah: {statData.luasWilayah} km²</div>
          </div>

          {/* Pertumbuhan 5 Tahun */}
          <div className="statistik-card">
            <div className="stat-header">
              <h3>Pertumbuhan 5 Tahun</h3>
            </div>
            <div className="stat-number" style={{ color: '#27ae60' }}>{statData.pertumbuhan}</div>
            <div className="stat-label">Geometrik Rata ({statData.tahunPertumbuhan})</div>
          </div>
        </div>

        {/* Row 3: Tren Laju Pertumbuhan Total */}
        <div className="statistik-row full-width">
          <div className="statistik-card-full">
            <div className="stat-header">
              <h3>Tren Laju Pertumbuhan Total</h3>
            </div>
            <div className="chart-container">
              <div className="chart-bars">
                {trenData.map((item, index) => (
                  <div key={index} className="chart-bar-item">
                    <div className="chart-bar-wrapper">
                      <div 
                        className="chart-bar" 
                        style={{ 
                          height: `${(item.total / maxTren) * 100}%`,
                          background: `linear-gradient(180deg, #1a5276, #3498db)`
                        }}
                      >
                        <span className="chart-bar-value">{item.total}</span>
                      </div>
                    </div>
                    <span className="chart-bar-label">{item.tahun}</span>
                  </div>
                ))}
              </div>
              <div className="chart-label">Total Penduduk</div>
            </div>
          </div>
        </div>

        {/* Row 4: Kelahiran vs Kematian */}
        <div className="statistik-row full-width">
          <div className="statistik-card-full">
            <div className="stat-header">
              <h3>Kelahiran vs Kematian (Alami)</h3>
            </div>
            <div className="chart-container">
              <div className="chart-bars double">
                {kelahiranKematian.map((item, index) => (
                  <div key={index} className="chart-bar-item">
                    <div className="chart-bar-wrapper">
                      <div 
                        className="chart-bar kelahiran" 
                        style={{ 
                          height: `${(item.lahir / maxKelahiran) * 100}%`,
                          background: '#27ae60'
                        }}
                      >
                        <span className="chart-bar-value">{item.lahir}</span>
                      </div>
                      <div 
                        className="chart-bar kematian" 
                        style={{ 
                          height: `${(item.mati / maxKelahiran) * 100}%`,
                          background: '#e74c3c'
                        }}
                      >
                        <span className="chart-bar-value">{item.mati}</span>
                      </div>
                    </div>
                    <span className="chart-bar-label">{item.tahun}</span>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <span className="legend-item kelahiran">■ Kelahiran</span>
                <span className="legend-item kematian">■ Kematian</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 5: Tingkat Pendidikan & Mata Pencaharian */}
        <div className="statistik-row">
          {/* Tingkat Pendidikan */}
          <div className="statistik-card">
            <div className="stat-header">
              <h3>Tingkat Pendidikan</h3>
            </div>
            <div className="pendidikan-list">
              {pendidikanData.map((item, index) => (
                <div key={index} className="pendidikan-item">
                  <span className="pendidikan-label">{item.label}</span>
                  <div className="pendidikan-bar-wrapper">
                    <div 
                      className="pendidikan-bar" 
                      style={{ width: `${item.persen}%` }}
                    ></div>
                  </div>
                  <span className="pendidikan-value">{item.value} Jiwa ({item.persen}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mata Pencaharian */}
          <div className="statistik-card">
            <div className="stat-header">
              <h3>Mata Pencaharian</h3>
            </div>
            <div className="pekerjaan-list">
              {pekerjaanData.map((item, index) => (
                <div key={index} className="pekerjaan-item">
                  <span className="pekerjaan-label">{item.label}</span>
                  <div className="pekerjaan-bar-wrapper">
                    <div 
                      className="pekerjaan-bar" 
                      style={{ width: `${item.persen}%` }}
                    ></div>
                  </div>
                  <span className="pekerjaan-value">{item.value}%</span>
                </div>
              ))}
            </div>
            <div className="stat-sub-label" style={{ marginTop: '10px', textAlign: 'center' }}>
              Jumlah penduduk yang berusia 5 tahun ke atas
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistik;