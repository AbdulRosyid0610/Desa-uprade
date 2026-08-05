import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";

const Kontak = () => {
  return (
    <section id="kontak" className="section kontak-section">
      <div className="container">
        <h2 className="section-title"> Kontak Kami</h2>

        <div className="kontak-grid">
          {/* Alamat */}
          <div className="kontak-card">
           <div className="kontak-icon">
  <FaMapMarkerAlt />
</div>
            <h3>Alamat</h3>
            <p>Desa Padakembang</p>
            <p>Kecamatan Maju</p>
            <p>Kabupaten Bersinar</p>
          </div>

          {/* Telepon */}
          <div className="kontak-card">
           <div className="kontak-icon">
  <FaPhoneAlt />
</div>
            <h3>Telepon</h3>
            <p>(021) 1234-5678</p>
            <p>(021) 8765-4321</p>
            <p className="kontak-jam">
              Senin - Jumat: 08.00 - 16.00
            </p>
          </div>

          {/* Email */}
          <div className="kontak-card">
           <div className="kontak-icon">
  <FaEnvelope />
</div>
            <h3>Email</h3>
            <p>desaparakam@email.com</p>
            <p>info@desaparakam.com</p>
            <p className="kontak-jam">
              Balas dalam 1x24 jam
            </p>
          </div>

          {/* Media Sosial */}
          <div className="kontak-card kontak-social-card">
            <div className="kontak-icon">
              <FaGlobe />
            </div>

            <h3>Media Sosial</h3>

            <div className="kontak-social-list">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item instagram"
              >
                <span className="social-icon">
                  <FaInstagram />
                </span>
                <span className="social-name">Instagram</span>
                <span className="social-arrow">→</span>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item facebook"
              >
                <span className="social-icon">
                  <FaFacebookF />
                </span>
                <span className="social-name">Facebook</span>
                <span className="social-arrow">→</span>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item whatsapp"
              >
                <span className="social-icon">
                  <FaWhatsapp />
                </span>
                <span className="social-name">WhatsApp</span>
                <span className="social-arrow">→</span>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item linkedin"
              >
                <span className="social-icon">
                  <FaLinkedinIn />
                </span>
                <span className="social-name">LinkedIn</span>
                <span className="social-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kontak;