// src/components/Pengaduan.jsx
import React, { useState } from 'react';

const Pengaduan = () => {
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    email: '',
    telepon: '',
    kategori: 'infrastruktur',
    judul: '',
    pesan: '',
    lampiran: null
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'lampiran') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.nama || !formData.nik || !formData.judul || !formData.pesan) {
      setSubmitError('Harap isi semua field yang wajib diisi!');
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        nama: '',
        nik: '',
        email: '',
        telepon: '',
        kategori: 'infrastruktur',
        judul: '',
        pesan: '',
        lampiran: null
      });
    }, 3000);
  };

  return (
    <section id="pengaduan" className="section pengaduan-section bg-light">
      <div className="container">
        <h2 className="section-title"> Layanan Pengaduan</h2>
        <p className="section-subtitle">Sampaikan aspirasi, laporan, atau pengaduan Anda kepada pemerintah desa</p>

        <div className="pengaduan-container">
          {isSubmitted ? (
            <div className="pengaduan-success">
              <span className="success-icon">✅</span>
              <h3>Pengaduan Berhasil Dikirim!</h3>
              <p>Terima kasih atas laporan Anda. Kami akan segera menindaklanjuti.</p>
              <p className="success-id">Nomor Tiket: #PDK-{Date.now().toString().slice(-6)}</p>
            </div>
          ) : (
            <form className="pengaduan-form" onSubmit={handleSubmit}>
              {submitError && (
                <div className="form-error">{submitError}</div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Nama Lengkap <span className="required">*</span></label>
                  <input
                    type="text"
                    name="nama"
                    className="form-input"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>NIK <span className="required">*</span></label>
                  <input
                    type="text"
                    name="nik"
                    className="form-input"
                    value={formData.nik}
                    onChange={handleChange}
                    placeholder="Masukkan NIK"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Masukkan email"
                  />
                </div>
                <div className="form-group">
                  <label>Telepon</label>
                  <input
                    type="tel"
                    name="telepon"
                    className="form-input"
                    value={formData.telepon}
                    onChange={handleChange}
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Kategori Pengaduan <span className="required">*</span></label>
                <select
                  name="kategori"
                  className="form-select"
                  value={formData.kategori}
                  onChange={handleChange}
                  required
                >
                  <option value="infrastruktur">Infrastruktur</option>
                  <option value="kesehatan">Kesehatan</option>
                  <option value="pendidikan">Pendidikan</option>
                  <option value="sosial">Sosial Masyarakat</option>
                  <option value="lingkungan">Lingkungan</option>
                  <option value="keamanan">Keamanan</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div className="form-group">
                <label>Judul Pengaduan <span className="required">*</span></label>
                <input
                  type="text"
                  name="judul"
                  className="form-input"
                  value={formData.judul}
                  onChange={handleChange}
                  placeholder="Masukkan judul pengaduan"
                  required
                />
              </div>

              <div className="form-group">
                <label>Deskripsi Pengaduan <span className="required">*</span></label>
                <textarea
                  name="pesan"
                  className="form-textarea"
                  value={formData.pesan}
                  onChange={handleChange}
                  placeholder="Jelaskan secara detail pengaduan Anda"
                  rows="5"
                  required
                />
              </div>

              <div className="form-group">
                <label>Lampiran (Foto/Dokumen)</label>
                <input
                  type="file"
                  name="lampiran"
                  className="form-file"
                  onChange={handleChange}
                  accept="image/*,.pdf,.doc,.docx"
                />
                <span className="file-hint">Format: JPG, PNG, PDF (Max 5MB)</span>
              </div>

              <button type="submit" className="btn-primary form-submit">
                Kirim Pengaduan
              </button>
            </form>
          )}
        </div>

        <div className="pengaduan-info">
          <div className="info-item">
            <div>
              <h4>Waktu Respon</h4>
              <p>Pengaduan akan diproses dalam 1x24 jam</p>
            </div>
          </div>
          <div className="info-item">
            <div>
              <h4>Data Terjamin</h4>
              <p>Identitas Anda akan dijaga kerahasiaannya</p>
            </div>
          </div>
          <div className="info-item">
            <div>
              <h4>Status Pengaduan</h4>
              <p>Cek status pengaduan melalui NIK</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pengaduan;