// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

// ============================================
// CONSTANTS - TAMBAHKAN 'layanan' DI SINI
// ============================================
const NAV_ITEMS = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'profil', label: 'Profil' },
  { id: 'anggota', label: 'Aparat' },
  { id: 'statistik', label: 'Statistik' },
  { id: 'peta-wilayah', label: 'Peta Wilayah' },
  { id: 'berita', label: 'Berita' },
  { id: 'layanan', label: 'Layanan' }, // 👈 TAMBAHKAN LAYANAN
  { id: 'umkm', label: 'UMKM' },
  { id: 'cctv', label: 'CCTV' },
];

// ============================================
// COMPONENT: Navbar
// ============================================
const Navbar = () => {
  const location = useLocation();

  const [activeNav, setActiveNav] = useState('beranda');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sembunyikan navbar di halaman admin
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  // ============================================
  // EFFECTS
  // ============================================
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ============================================
  // EFFECT: Update active nav based on scroll
  // ============================================
  useEffect(() => {
    const handleScrollActive = () => {
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      
      // Cari section yang sedang terlihat
      let currentSection = 'beranda';
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // Jika section berada di viewport
          if (rect.top <= 200) {
            currentSection = NAV_ITEMS[index]?.id || 'beranda';
          }
        }
      });
      
      setActiveNav(currentSection);
    };

    window.addEventListener('scroll', handleScrollActive);
    return () => window.removeEventListener('scroll', handleScrollActive);
  }, []);

  // ============================================
  // HANDLERS
  // ============================================
  const scrollToSection = (id) => {
    setActiveNav(id);
    setIsMenuOpen(false);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar__container">
        {/* LOGO */}
        <a href="#beranda" className="navbar__brand">
          <img
            src="/images.png"
            alt="Logo desa Padakembang"
            className="navbar__logo"
          />
          <span className="navbar__title">
            Desa Digital <span>Padakembang</span>
          </span>
        </a>

        {/* TOGGLE MOBILE */}
        <button
          className="navbar__toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* NAVIGATION MENU */}
        <ul className={`navbar__menu ${isMenuOpen ? 'is-open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                className={`navbar__link ${
                  activeNav === item.id ? 'is-active' : ''
                }`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}

          {/* ADMIN LOGIN */}
          <li>
            <Link to="/login" className="navbar__login">
              ADMIN LOGIN
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;