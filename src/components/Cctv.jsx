// src/components/Cctv.jsx
import React, { useState, useEffect } from 'react';

const Cctv = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cctvData = [
    { id: 1, name: 'Pintu Gerbang Utama', location: 'Jalan Raya', status: 'online' },
    { id: 2, name: 'Balai Desa', location: 'Pusat Desa', status: 'online' },
    { id: 3, name: 'Pasar Desa', location: 'Pasar Sentral', status: 'online' },
    { id: 4, name: 'Lapangan Desa', location: 'Area Olahraga', status: 'maintenance' },
  ];

  return (
    <section id="cctv" className="section cctv-section">
      <div className="container">
        <h2 className="section-title"> CCTV Live</h2>
        <p className="section-subtitle">Pemantauan keamanan publik secara real-time</p>
        
        <div className="cctv-status-bar">
          <span className="status-indicator online">🟢 Sistem Online</span>
          <span className="last-update"> Update: {lastUpdate.toLocaleTimeString()}</span>
        </div>

        <div className="cctv-grid">
          {cctvData.map((cctv) => (
            <div key={cctv.id} className="cctv-card">
              <div className="cctv-header">
                <span className={`cctv-dot ${cctv.status}`}></span>
                <span className="cctv-name">{cctv.name}</span>
              </div>
              <div className="cctv-body">
                <div className="cctv-info-text">
                  <p className="cctv-live">Live Feed</p>
                  <p className="cctv-location">{cctv.location}</p>
                  <p className="cctv-time">{lastUpdate.toLocaleTimeString()}</p>
                </div>
                {cctv.status === 'online' && (
                  <div className="cctv-live-badge"> LIVE</div>
                )}
              </div>
              <div className="cctv-footer">
                <span className="cctv-location-label"> {cctv.location}</span>
                <span className={`cctv-status-badge ${cctv.status}`}>
                  {cctv.status === 'online' ? 'Aktif' : 'Maintenance'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="cctv-info">
          <p> Sistem pemantauan CCTV terintegrasi dengan keamanan desa</p>
          <p className="cctv-note">* Simulasi tampilan CCTV - Integrasi API nyata dapat dikembangkan</p>
        </div>
      </div>
    </section>
  );
};

export default Cctv;