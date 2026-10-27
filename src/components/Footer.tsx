import React from 'react';
import { Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-layout">
          <div>
            <div className="footer-brand">
              QuickCount Paskibra
            </div>
            <p className="footer-desc">
              Sistem e-voting prototipe untuk ajang Lomba Ketangkasan Baris Berbaris Paskibra. Menjunjung tinggi sportivitas, ketertiban barisan, dan transparansi data.
            </p>
            <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#D1D5DB' }}>
              Aturan Konversi: <strong>Rp1.000 = 1 Suara Sah (Saldo Non-Refundable)</strong>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Navigasi Utama</h4>
            <ul className="footer-list">
              <li><a href="#beranda">Beranda Utama</a></li>
              <li><a href="#top-tim">Klasemen Top 3</a></li>
              <li><a href="#direktori">Roster Lengkap Tim</a></li>
              <li><a href="#klasemen">Papan Klasemen Penuh</a></li>
              <li><a href="#panduan">Regulasi & Tata Cara</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Integritas & Kontak</h4>
            <ul className="footer-list">
              <li style={{ color: 'var(--color-red)' }}>
                * Saldo Dompet Bersifat Non-Refundable
              </li>
              <li><a href="#faq">Klausul Transaksi & FAQ</a></li>
              <li>
                <a href="mailto:kontak@quickcountpaskib.id" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mail size={13} aria-hidden="true" />
                  <span>kontak@quickcountpaskib.id</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; 2026 QuickCount Paskibra. Prototipe Antarmuka E-Voting.
          </div>
          <div>
            Data & Alur Transaksi Bersifat Simulasi Demo
          </div>
        </div>
      </div>
    </footer>
  );
};
