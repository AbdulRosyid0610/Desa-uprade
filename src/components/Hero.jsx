// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="beranda" className="section hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Selamat Datang di <span>Desa Padakembang</span>
          </h1>
          <p className="hero-subtitle">
            Desa Digital - Membangun desa cerdas untuk masa depan yang lebih baik
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">501</span>
              <span className="stat-label">Penduduk</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">120+</span>
              <span className="stat-label">UMKM Aktif</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Kebahagiaan</span>
            </div>
          </div>
          <button className="btn-primary" onClick={() => scrollToSection('profil')}>
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;