// src/components/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Menggunakan CSS eksternal Anda

// ============================================
// CONSTANTS
// ============================================

const DEFAULT_USERS = [
  { email: 'user@desa.com', password: 'user123', role: 'user', name: 'User Desa' },
  { email: 'admin@desa.com', password: 'admin123', role: 'admin', name: 'Admin Desa' },
];

const STORAGE_KEYS = {
  USER: 'user',
  REGISTERED_USERS: 'registeredUsers',
};

// ============================================
// COMPONENT: Login
// ============================================

const Login = () => {
  const navigate = useNavigate();
  
  // ============================================
  // STATE
  // ============================================
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ============================================
  // HELPERS - LocalStorage
  // ============================================
  
  const getUsers = () => {
    const storedUsers = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  };

  const saveCurrentUser = (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  };

  // ============================================
  // HANDLERS - Form
  // ============================================
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    handleLogin();
  };

  // ============================================
  // HANDLERS - Login
  // ============================================
  
  const handleLogin = () => {
    setTimeout(() => {
      setLoading(false);
      
      const users = getUsers();
      const foundUser = users.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (!foundUser) {
        setError('❌ Email atau password salah!');
        return;
      }

      saveCurrentUser({
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        isLoggedIn: true
      });

      // Jika admin, arahkan ke dashboard admin. Jika user biasa, ke beranda.
      navigate(foundUser.role === 'admin' ? '/admin/dashboard' : '/');
    }, 1500);
  };

  // ============================================
  // RENDER
  // ============================================
  
  return (
    <div className="login-page">
      <div className="login-container">
        {/* Header */}
        <div className="login-header">
          <h1>Desa Padakembang</h1>
          <p className="login-subtitle">Desa Digital - Sistem Informasi Desa</p>
        </div>

        <div className="login-box">
          {/* Form Login */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password (min 6 karakter)"
                required
              />
            </div>

            {/* Error Message */}
            {error && <div className="login-error">{error}</div>}

            {/* Submit Button */}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <span className="loading-spinner" />
              ) : (
                'Login'
              )}
            </button>

            {/* Options */}
            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" /> Ingat saya
              </label>
              <a href="#" className="forgot-password">Lupa password?</a>
            </div>
          </form>

          {/* Demo Info */}
          <div className="login-demo-info">
            <p> Demo Akun:</p>
            <p> Admin: admin@desa.com / admin123</p>
            <p className="warning"> Sistem akan otomatis mendeteksi role Anda</p>
          </div>

          {/* Back to Home */}
          <div className="back-home-wrapper">
            <Link to="/" className="back-home">
              ← Kembali ke Beranda
            </Link>
          </div>

          {/* Credit */}
          <div className="login-credit">
            <p>© 2026 Desa Padakembang - Tasikmalaya</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;