import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css' // ★ JANGAN LUPA IMPOR CSS NYA

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const toggleMenu = () => setMenuOpen(!menuOpen)
  const location = useLocation()

  // Fungsi untuk menentukan class active
  const getLinkClass = (path) => {
    return location.pathname === path ? 'navbar__link navbar__link--active' : 'navbar__link'
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        
        {/* ===== LOGO (KIRI) ===== */}
        <Link to="/" className="navbar__brand">
          <img src="/Images/images.png" alt="Logo Desa" className="navbar__logo" />
          
          <span className="navbar__brand-title">
            Desa Digital 
            <span className="navbar__brand-highlight">Padakembang</span>
          </span>
        </Link>

        {/* ===== TOMBOL HAMBURGER (MOBILE) ===== */}
        <button 
          className="navbar__toggle" 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* ===== MENU NAVIGASI (KANAN) ===== */}
        {/* Class 'navbar__menu--open' akan ditambahkan jika menuOpen true */}
        <ul className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}>
          <li><Link to="/" className={getLinkClass('/')}>Beranda</Link></li>
          <li><Link to="/profile" className={getLinkClass('/profile')}>Profil</Link></li>
          <li><Link to="/energi" className={getLinkClass('/energi')}>Energi</Link></li>
          <li><Link to="/berita" className={getLinkClass('/berita')}>Berita</Link></li>
          <li><Link to="/UMKM" className={getLinkClass('/UMKM')}>UMKM</Link></li>
          <li><Link to="/layanan" className={getLinkClass('/layanan')}>Layanan</Link></li>
          <li><Link to="/statistik" className={getLinkClass('/statistik')}>Statistik</Link></li>
          <li><Link to="/aparat" className={getLinkClass('/aparat')}>Aparat</Link></li>
          <li><Link to="/peta" className={getLinkClass('/peta')}>Peta</Link></li>
          <li><Link to="/cctv" className={getLinkClass('/cctv')}>CCTV</Link></li>
          
          {/* Tombol Ajukan Layanan */}
          <li>
            <Link to="/layanan/form" className="navbar__cta">
              Ajukan Layanan
            </Link>
          </li>

          {/* ★ TAMBAHAN BARU: Tombol Login Admin ★ */}
          <li>
            <Link to="/login" className="navbar__login">
              <span className="icon"></span> Login Admin
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar