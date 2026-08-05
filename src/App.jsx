// src/App.jsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// ============================================================
// 1. LAZY LOADING - Optimasi performa
// ============================================================
const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const Profil = lazy(() => import('./components/Profil'));
const Anggota = lazy(() => import('./components/Anggota'));
const Statistik = lazy(() => import('./components/Statistik'));
const PetaWilayah = lazy(() => import('./components/PetaWilayah'));
const Berita = lazy(() => import('./components/Berita'));
const UMKM = lazy(() => import('./components/UMKM'));
const Cctv = lazy(() => import('./components/Cctv'));
const LayananOnline = lazy(() => import('./components/LayananOnline'));
const Footer = lazy(() => import('./components/Footer'));
const Login = lazy(() => import('./components/Login'));
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard'));

// Import CSS
import './components/PetaWilayah.css';
import './components/LayananOnline.css';

// ============================================================
// 2. COMPONENT: Loading Spinner
// ============================================================
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Memuat...</p>
  </div>
);

// ============================================================
// 3. COMPONENT: ScrollToTop Button
// ============================================================
const ScrollToTopButton = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!showScrollTop) return null;

  return (
    <button
      className="scroll-top"
      onClick={scrollToTop}
      aria-label="Scroll ke atas"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
};

// ============================================================
// 4. COMPONENT: HomePage
// ============================================================
const HomePage = () => {
  return (
    <>
      <Navbar />

      <main className="main-content">
        {/* Hero Section */}
        <Hero />

        {/* Profil Desa */}
        <Profil />

        {/* Peta Wilayah */}
        <PetaWilayah />

        {/* Aparat / Anggota */}
        <Anggota />

        {/* Statistik */}
        <Statistik />

        {/* Berita */}
        <Berita />

        {/* ============================================
            SECTION: LAYANAN ONLINE - FULL WIDTH
            ============================================ */}
        <section id="layanan" className="layanan-section-wrapper">
          <div className="layanan-section-container">
            <LayananOnline />
          </div>
        </section>

        {/* UMKM */}
        <UMKM />

        {/* CCTV */}
        <Cctv />
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};

// ============================================================
// 5. COMPONENT: App
// ============================================================
const App = () => {
  const location = useLocation();

  // Cek apakah halaman spesial (login atau admin)
  const isSpecialPage = location.pathname === '/login' || location.pathname.startsWith('/admin');

  // ============================================================
  // 6. EFFECT: Atur scroll snap berdasarkan halaman
  // ============================================================
  useEffect(() => {
    const appElement = document.querySelector('.app');
    const bodyElement = document.body;
    const htmlElement = document.documentElement;

    if (appElement) {
      if (isSpecialPage) {
        // Nonaktifkan scroll snap untuk halaman login & admin
        appElement.style.scrollSnapType = 'none';
        appElement.style.overflow = 'visible';
        appElement.style.height = 'auto';
        appElement.style.minHeight = '100vh';

        bodyElement.style.overflow = 'auto';
        bodyElement.style.height = 'auto';

        htmlElement.style.overflow = 'auto';
        htmlElement.style.height = 'auto';
      } else {
        // Aktifkan scroll snap untuk halaman utama
        appElement.style.scrollSnapType = 'y mandatory';
        appElement.style.overflow = 'scroll';
        appElement.style.height = '100vh';
        appElement.style.minHeight = '100vh';

        bodyElement.style.overflow = 'hidden';
        bodyElement.style.height = '100vh';

        htmlElement.style.overflow = 'hidden';
        htmlElement.style.height = '100vh';
      }
    }

    // Cleanup: Reset style saat komponen unmount
    return () => {
      bodyElement.style.overflow = 'auto';
      bodyElement.style.height = 'auto';
      htmlElement.style.overflow = 'auto';
      htmlElement.style.height = 'auto';
    };
  }, [isSpecialPage]);

  // ============================================================
  // 7. RENDER
  // ============================================================
  return (
    <div className="app">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;