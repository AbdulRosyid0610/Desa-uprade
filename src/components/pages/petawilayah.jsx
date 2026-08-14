import React, { useState } from "react";
import {
  FaShieldAlt,
  FaLandmark,
  FaGraduationCap,
  FaHospital,
  FaMosque,
  FaStore,
  FaVideo,
  FaLightbulb,
  FaExclamationCircle,
  FaChevronRight,
  FaDownload,
  FaExpand,
  FaPrint,
} from "react-icons/fa";

import "./PetaWilayah.css";

const PetaWilayah = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showLegend, setShowLegend] = useState(true);

  const filters = [
    {
      id: "batas",
      label: "Batas Wilayah Desa",
      icon: <FaShieldAlt />,
      color: "blue",
    },
    {
      id: "umum",
      label: "Fasilitas Umum",
      icon: <FaLandmark />,
      color: "cyan",
    },
    {
      id: "pendidikan",
      label: "Fasilitas Pendidikan",
      icon: <FaGraduationCap />,
      color: "purple",
    },
    {
      id: "kesehatan",
      label: "Fasilitas Kesehatan",
      icon: <FaHospital />,
      color: "pink",
    },
    {
      id: "ibadah",
      label: "Tempat Ibadah",
      icon: <FaMosque />,
      color: "green",
    },
    {
      id: "umkm",
      label: "UMKM / Ekonomi",
      icon: <FaStore />,
      color: "yellow",
    },
    {
      id: "cctv",
      label: "CCTV Pengawas",
      icon: <FaVideo />,
      color: "red",
    },
    {
      id: "pju",
      label: "Titik Rawan / PJU",
      icon: <FaLightbulb />,
      color: "gray",
    },
  ];

  const markers = [
    // Sukamanah
    {
      id: 1,
      type: "pendidikan",
      icon: <FaGraduationCap />,
      x: 22,
      y: 27,
      label: "SDN Sukamanah",
    },
    {
      id: 2,
      type: "umum",
      icon: <FaLandmark />,
      x: 29,
      y: 29,
      label: "Balai Desa",
    },
    {
      id: 3,
      type: "ibadah",
      icon: <FaMosque />,
      x: 36,
      y: 24,
      label: "Masjid Al-Hikmah",
    },

    // Cikadu
    {
      id: 4,
      type: "kesehatan",
      icon: <FaHospital />,
      x: 17,
      y: 47,
      label: "Puskesmas Cikadu",
    },
    {
      id: 5,
      type: "umum",
      icon: <FaLandmark />,
      x: 21,
      y: 52,
      label: "Kantor Kecamatan",
    },
    {
      id: 6,
      type: "cctv",
      icon: <FaVideo />,
      x: 25,
      y: 50,
      label: "CCTV Jl. Raya",
    },
    {
      id: 7,
      type: "cctv",
      icon: <FaVideo />,
      x: 18,
      y: 59,
      label: "CCTV Simpang",
    },

    // Padamenak
    {
      id: 8,
      type: "umum",
      icon: <FaLandmark />,
      x: 42,
      y: 35,
      label: "GOR Padamenak",
    },
    {
      id: 9,
      type: "umum",
      icon: <FaLandmark />,
      x: 42,
      y: 55,
      label: "Pasar Desa",
    },
    {
      id: 10,
      type: "pendidikan",
      icon: <FaGraduationCap />,
      x: 48,
      y: 49,
      label: "SMPN 1 Padakembang",
    },
    {
      id: 11,
      type: "cctv",
      icon: <FaVideo />,
      x: 46,
      y: 60,
      label: "CCTV Pasar",
    },
    {
      id: 12,
      type: "ibadah",
      icon: <FaMosque />,
      x: 50,
      y: 66,
      label: "Masjid Agung",
    },

    // Margaluyu
    {
      id: 13,
      type: "umum",
      icon: <FaLandmark />,
      x: 60,
      y: 32,
      label: "Balai Pertemuan",
    },
    {
      id: 14,
      type: "kesehatan",
      icon: <FaHospital />,
      x: 66,
      y: 31,
      label: "Klinik Pratama",
    },
    {
      id: 15,
      type: "cctv",
      icon: <FaVideo />,
      x: 64,
      y: 38,
      label: "CCTV Perempatan",
    },
    {
      id: 16,
      type: "umkm",
      icon: <FaStore />,
      x: 74,
      y: 31,
      label: "Sentra Kerajinan",
    },

    // Sukaraja
    {
      id: 17,
      type: "ibadah",
      icon: <FaMosque />,
      x: 73,
      y: 45,
      label: "Musholla Nurul Iman",
    },
    {
      id: 18,
      type: "pendidikan",
      icon: <FaGraduationCap />,
      x: 76,
      y: 48,
      label: "MI Sukaraja",
    },
    {
      id: 19,
      type: "umum",
      icon: <FaLandmark />,
      x: 67,
      y: 53,
      label: "Lapangan Sepakbola",
    },
    {
      id: 20,
      type: "cctv",
      icon: <FaVideo />,
      x: 74,
      y: 54,
      label: "CCTV Lapangan",
    },

    // Babakan
    {
      id: 21,
      type: "umum",
      icon: <FaLandmark />,
      x: 28,
      y: 75,
      label: "Kantor Babakan",
    },
    {
      id: 22,
      type: "ibadah",
      icon: <FaMosque />,
      x: 33,
      y: 73,
      label: "Masjid Baiturrahman",
    },
    {
      id: 23,
      type: "pendidikan",
      icon: <FaGraduationCap />,
      x: 40,
      y: 71,
      label: "SDN Babakan",
    },
    {
      id: 24,
      type: "pju",
      icon: <FaLightbulb />,
      x: 46,
      y: 79,
      label: "PJU Jl. Babakan",
    },

    // Pangkalan
    {
      id: 25,
      type: "umkm",
      icon: <FaStore />,
      x: 55,
      y: 68,
      label: "Koperasi Desa",
    },
    {
      id: 26,
      type: "umum",
      icon: <FaLandmark />,
      x: 62,
      y: 69,
      label: "Posyandu Pangkalan",
    },
    {
      id: 27,
      type: "pju",
      icon: <FaLightbulb />,
      x: 72,
      y: 66,
      label: "PJU Jl. Pangkalan",
    },
  ];

  const visibleMarkers =
    activeFilter === "all"
      ? markers
      : markers.filter((marker) => marker.type === activeFilter);

  return (
    <section className="peta-section" id="peta-wilayah">
      {/* ================= SIDEBAR ================= */}
      <aside className="peta-sidebar">
        <div className="peta-brand">
          <div>
            <span className="peta-kicker"> PEMETAAN DIGITAL</span>
            <h2>
              Peta Wilayah
              <br />
              Desa Padakembang
            </h2>
            <p>
              Kec. Padakembang, Kab. Tasikmalaya
              <br />
              Jawa Barat
            </p>
          </div>
        </div>

        {/* STATUS CARD - dengan aksen biru */}
        <div className="status-card">
          <div className="status-title">
            <span className="status-dot"></span>
            <span>Status Wilayah Aman & Kondusif</span>
          </div>
          <p>
            Wilayah Desa Padakembang dalam kondisi aman dan kondusif. 
            Tetap jaga keamanan dan ketertiban bersama.
          </p>
          <button className="btn-lapor">
            <FaExclamationCircle /> Laporkan Kejadian
          </button>
        </div>

        {/* FILTER LIST */}
        <div className="filter-list">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-button ${filter.color} ${
                activeFilter === filter.id ? "active" : ""
              }`}
              onClick={() =>
                setActiveFilter(activeFilter === filter.id ? "all" : filter.id)
              }
            >
              <span className="filter-icon">{filter.icon}</span>
              <span>{filter.label}</span>
              <FaChevronRight className="filter-arrow" />
            </button>
          ))}
        </div>

        {/* MINI INFO */}
        <div className="sidebar-info">
          <div>
            <strong>6</strong>
            <span>Wilayah</span>
          </div>
          <div>
            <strong>27</strong>
            <span>Fasilitas</span>
          </div>
          <div>
            <strong>08</strong>
            <span>RW</span>
          </div>
        </div>
      </aside>

      {/* ================= MAP ================= */}
      <div className="map-container">
        {/* MAP HEADER dengan aksi */}
        <div className="map-header">
          <div className="map-header-left">
            <span className="map-badge"> Interaktif</span>
            <span className="map-coord">7°08'27.12" S · 108°12'45.89" E</span>
          </div>
          <div className="map-header-right">
            <button className="map-action-btn" title="Unduh Peta">
              <FaDownload />
            </button>
            <button className="map-action-btn" title="Cetak">
              <FaPrint />
            </button>
            <button 
              className="map-action-btn" 
              title="Fullscreen"
              onClick={() => setShowLegend(!showLegend)}
            >
              <FaExpand />
            </button>
          </div>
        </div>

        {/* COMPASS */}
        <div className="compass">
          <span className="compass-n">U</span>
          <span className="compass-e">T</span>
          <span className="compass-s">S</span>
          <span className="compass-w">B</span>
          <div className="compass-star">✦</div>
        </div>

        {/* RIVER - lebih jelas */}
        <div className="river river-one"></div>
        <div className="river river-two"></div>

        {/* ===== BATAS DESA - DITEBALKAN (PRIORITAS!) ===== */}
        <div className="desa-boundary"></div>

        {/* NEIGHBORING AREAS */}
        <span className="neighbor neighbor-top">Desa Sukamulya</span>
        <span className="neighbor neighbor-left">Desa Padawaras</span>
        <span className="neighbor neighbor-right">Desa Tanjungjaya</span>
        <span className="neighbor neighbor-bottom-left">Desa Cipatujah</span>
        <span className="neighbor neighbor-bottom">Desa Padamukti</span>
        <span className="neighbor neighbor-bottom-right">Desa Sukahurip</span>

        {/* ===== AREAS ===== */}
        <div className="map-area area-sukamanah">
          <span>Kp. Sukamanah</span>
        </div>
        <div className="map-area area-margaluyu">
          <span>Kp. Margaluyu</span>
        </div>
        <div className="map-area area-cikadu">
          <span>Kp. Cikadu</span>
        </div>
        <div className="map-area area-padamenak">
          <span>Kp. Padamenak</span>
        </div>
        <div className="map-area area-sukaraja">
          <span>Kp. Sukaraja</span>
        </div>
        <div className="map-area area-babakan">
          <span>Kp. Babakan</span>
        </div>
        <div className="map-area area-pangkalan">
          <span>Kp. Pangkalan</span>
        </div>

        {/* ===== ROADS - Label Jalan dengan kontras tinggi ===== */}
        {/* Jalan Utama */}
        <div className="road road-1"></div>
        <div className="road road-2"></div>
        <div className="road road-3"></div>
        <div className="road road-4"></div>
        <div className="road road-5"></div>
        <div className="road road-6"></div>

        {/* ===== LABEL JALAN - DENGAN BACKGROUND (KONTRASTING) ===== */}
        <div className="road-label road-label-1">
          <span>Jl. Raya Padakembang</span>
        </div>
        <div className="road-label road-label-2">
          <span>Jl. Pasar Lama</span>
        </div>
        <div className="road-label road-label-3">
          <span>Jl. Kesehatan</span>
        </div>
        <div className="road-label road-label-4">
          <span>Jl. Sukamanah</span>
        </div>

        {/* ===== MARKERS ===== */}
        {visibleMarkers.map((marker) => (
          <div
            key={marker.id}
            className={`map-marker marker-${marker.type}`}
            style={{
              left: `${marker.x}%`,
              top: `${marker.y}%`,
            }}
            title={marker.label || ''}
          >
            {marker.icon}
            {marker.label && (
              <span className="marker-tooltip">{marker.label}</span>
            )}
          </div>
        ))}

        {/* ===== LEGEND - dengan aksen biru/silver ===== */}
        {showLegend && (
          <div className="map-legend">
            <h3>📋 Legenda</h3>
            <div className="legend-line">
              <span className="line-boundary"></span>
              <span>Batas Wilayah Desa</span>
            </div>
            <div className="legend-line">
              <span className="line-main-road"></span>
              <span>Jalan Utama</span>
            </div>
            <div className="legend-line">
              <span className="line-small-road"></span>
              <span>Jalan Lingkungan</span>
            </div>
            <div className="legend-line">
              <span className="line-river"></span>
              <span>Sungai</span>
            </div>
            <div className="legend-divider"></div>
            <div className="legend-filter-active">
              <span className="legend-dot" style={{ background: '#1a56db' }}></span>
              <span>Filter aktif: {activeFilter === 'all' ? 'Semua' : activeFilter}</span>
            </div>
          </div>
        )}

        {/* ===== BOTTOM INFO ===== */}
        <div className="map-footer">
          <div>
            <strong>6</strong>
            <span>Wilayah</span>
          </div>
          <div>
            <strong>08</strong>
            <span>RW</span>
          </div>
          <div>
            <strong>27</strong>
            <span>Fasilitas</span>
          </div>
          <div>
            <strong>12</strong>
            <span>CCTV</span>
          </div>
          <div className="map-coordinates">
            <span>PADAKEMBANG</span>
            <small>TASIKMALAYA · JAWA BARAT</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetaWilayah;