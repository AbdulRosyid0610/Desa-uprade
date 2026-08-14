import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

// ==========================================
// IMPORT HALAMAN PUBLIK
// ==========================================
import Beranda from './components/pages/Beranda'
import Profil from './components/pages/Profil'
import Energi from './components/pages/Energi'
import Berita from './components/pages/Berita'
import UMKM from './components/pages/UMKM'
import Layanan from './components/pages/Layanan'
import LayananForm from './components/pages/LayananForm'
import Statistik from './components/pages/Statistik'
import Aparat from './components/pages/Aparat'
import PetaWilayah from "./components/pages/PetaWilayah"
import CCTV from './components/pages/CCTV'

// ==========================================
// IMPORT LOGIN & ADMIN (SESUAI STRUKTUR FOLDER ANDA)
// ==========================================
import Login from './components/Login'                  // Login ada di folder pages
import AdminDashboard from './components/Admin/AdminDashboard' // Admin ada di folder Admin

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="App">
      
      {/* 
         ★ UPGRADE: 
         Navbar dipindahkan ke dalam setiap halaman publik.
         Login & AdminDashboard otomatis TIDAK memiliki Navbar.
      */}

      <Routes>
        {/* Halaman Publik (Dengan Navbar) */}
        <Route path="/" element={
          <>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Beranda />
          </>
        } />
        
        <Route path="/profile" element={
          <>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Profil />
          </>
        } />
        
        <Route path="/berita" element={
          <>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Berita />
          </>
        } />
        
        <Route path="/umkm" element={
          <>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <UMKM />
          </>
        } />
        
        <Route path="/energi" element={
          <>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Energi />
          </>
        } />
        
        <Route path="/layanan" element={
          <>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Layanan />
          </>
        } />
        
        <Route path="/layanan/form" element={
          <>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <LayananForm />
          </>
        } />
        
        <Route path="/statistik" element={
          <>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Statistik />
          </>
        } />
        
        <Route path="/aparat" element={
          <>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Aparat />
          </>
        } />
        
        <Route path="/peta" element={
          <>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <PetaWilayah />
          </>
        } />
        
        <Route path="/cctv" element={
          <>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <CCTV />
          </>
        } />

        {/* ★ HALAMAN LOGIN & ADMIN (TANPA NAVBAR & TANPA FOOTER) ★ */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>

      {/* Footer tetap muncul di semua halaman publik */}
      <Footer />
    </div>
  )
}

export default App