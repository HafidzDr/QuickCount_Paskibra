import React, { useState } from 'react';
import { Wallet, LogIn, Menu, X, Plus, Clock } from 'lucide-react';
import { WalletSummary } from '../types';
import { formatRupiah } from '../utils/formatters';

interface NavbarProps {
  wallet: WalletSummary;
  onOpenAuth: () => void;
  onOpenWallet: () => void;
  onOpenTopUp: () => void;
  onOpenHistory: () => void;
  isLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  wallet,
  onOpenAuth,
  onOpenWallet,
  onOpenTopUp,
  onOpenHistory,
  isLoggedIn = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Top 3', href: '#top-tim' },
    { label: 'Roster Tim', href: '#direktori' },
    { label: 'Klasemen', href: '#klasemen' },
    { label: 'Tata Cara', href: '#panduan' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="site-header">
      <div className="container">
        <div className="nav-wrapper">
          <a href="#beranda" className="brand-link" aria-label="QuickCount Paskib - Kembali ke beranda">
            <span className="brand-wordmark">
              <span className="wordmark-main">QUICKCOUNT</span>
              <span className="wordmark-sub">PASKIBRA</span>
            </span>
          </a>

          <nav aria-label="Navigasi Utama">
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="nav-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="nav-wallet-chip"
                  onClick={onOpenWallet}
                  aria-label={`Buka dompet, saldo saat ini ${formatRupiah(wallet.balanceRupiah)}`}
                  title="Lihat rincian saldo dan dompet"
                >
                  <Wallet size={15} color="var(--color-ink)" aria-hidden="true" />
                  <span className="nav-wallet-label">Saldo</span>
                  <span className="nav-wallet-value">{formatRupiah(wallet.balanceRupiah)}</span>
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={onOpenTopUp}
                  title="Top Up Saldo E-Wallet"
                >
                  <Plus size={14} aria-hidden="true" />
                  <span>Top Up</span>
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-ghost btn-icon-only"
                  onClick={onOpenHistory}
                  title="Riwayat Transaksi"
                  aria-label="Lihat riwayat transaksi"
                >
                  <Clock size={16} aria-hidden="true" />
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={onOpenAuth}
              >
                <LogIn size={15} aria-hidden="true" />
                <span>Masuk Akun</span>
              </button>
            )}

            <button
              type="button"
              className="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            >
              {mobileMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-nav" className="nav-mobile-menu">
          <ul className="nav-mobile-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
