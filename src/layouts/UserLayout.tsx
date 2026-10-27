import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../app/providers';
import { formatRupiah } from '../utils/formatters';
import {
  Trophy,
  Wallet,
  History,
  User as UserIcon,
  LogOut,
  PlusCircle,
  Menu,
  X,
} from 'lucide-react';
import { BrandLogo } from '../components/ui/BrandLogo';

export const UserLayout: React.FC = () => {
  const { currentUser, wallet, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Close drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Focus trap / auto focus close button when drawer opens
  useEffect(() => {
    if (mobileMenuOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [mobileMenuOpen]);

  if (!currentUser) {
    return (
      <div style={{ padding: '4rem 1.5rem', textAlign: 'center', minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '1rem' }}>
          Sesi Pengguna Memerlukan Login
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Silakan masuk akun demo untuk mengakses Dashboard Kompetisi dan Voting.
        </p>
        <Link to="/login" className="btn btn-primary">
          Masuk Akun Sekarang
        </Link>
      </div>
    );
  }

  const menu = [
    { label: 'Kompetisi & Klasemen', path: '/app', icon: Trophy },
    { label: 'Dompet & Saldo', path: '/app/wallet', icon: Wallet },
    { label: 'Riwayat Transaksi', path: '/app/transactions', icon: History },
    { label: 'Profil Akun', path: '/app/profile', icon: UserIcon },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC', overflowX: 'hidden' }}>
      {/* Top Application Bar Header User */}
      <header
        style={{
          background: '#0F172A',
          color: '#F8FAFC',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          borderBottom: '1px solid #1E293B',
        }}
      >
        {/* Tier 1: Primary Bar - Proporsional, Sejajar, & Bersih */}
        <div className="user-primary-header-row">
          {/* Logo & Mobile Drawer Toggle - Sejajar vertikal dengan gap 14px */}
          <div className="user-header-left-group">
            {/* Tombol Hamburger Selaras Header (Dark Slate #1E293B, Border #334155, Icon Putih #F8FAFC) */}
            <button
              type="button"
              className="user-hamburger-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka navigasi menu pemilih"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <Menu size={20} aria-hidden="true" />
            </button>

            {/* Logo Resmi Proporsional */}
            <Link to="/app" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', minWidth: 0 }}>
              <BrandLogo variant="light" height={30} />
            </Link>
          </div>

          {/* Quick Actions (Desktop/Tablet): Saldo Chip, Top Up, Logout */}
          <div className="user-header-right-group">
            <Link
              to="/app/wallet"
              className="nav-wallet-chip"
              title="Lihat rincian saldo"
              style={{ background: '#1E293B', borderColor: '#334155', color: '#F8FAFC' }}
            >
              <Wallet size={14} color="#94A3B8" aria-hidden="true" />
              <span className="nav-wallet-label" style={{ color: '#94A3B8' }}>Saldo</span>
              <span className="nav-wallet-value" style={{ color: '#FFFFFF' }}>{formatRupiah(wallet.balanceRupiah)}</span>
            </Link>

            <Link to="/app/wallet/top-up" className="btn btn-primary btn-sm" style={{ padding: '0.25rem 0.65rem', minHeight: '32px', gap: '0.35rem' }}>
              <PlusCircle size={13} aria-hidden="true" />
              <span>Top Up</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem' }}
              title="Keluar Sesi"
            >
              <LogOut size={13} aria-hidden="true" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Tier 2: Sub-Bar Khusus Mobile Layar Sempit (<=860px) untuk Saldo & Top Up */}
        <div className="user-header-mobile-subbar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.45rem 1rem', background: '#1E293B', borderTop: '1px solid #334155', gap: '0.5rem' }}>
            <Link to="/app/wallet" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', textDecoration: 'none', minWidth: 0 }}>
              <span style={{ color: '#94A3B8', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase' }}>Saldo:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FFFFFF' }}>{formatRupiah(wallet.balanceRupiah)}</span>
            </Link>

            <Link to="/app/wallet/top-up" className="btn btn-primary btn-sm" style={{ padding: '0.2rem 0.6rem', minHeight: '28px', fontSize: '0.6875rem', gap: '0.25rem' }}>
              <PlusCircle size={12} aria-hidden="true" />
              <span>Top Up</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="user-drawer-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div
            id="mobile-nav-drawer"
            className="user-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigasi Menu Pemilih"
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-rule)', marginBottom: '1.25rem' }}>
              <BrandLogo variant="light" height={28} />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Tutup menu navigasi"
                style={{
                  width: '38px',
                  height: '38px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-rule)',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FFFFFF',
                  color: 'var(--color-ink)',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* User Profile Info */}
            <div style={{ marginBottom: '1.25rem', padding: '0.875rem', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Pemilih Terdaftar
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-ink)', marginTop: '0.2rem', overflowWrap: 'anywhere' }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', overflowWrap: 'anywhere' }}>
                {currentUser.email}
              </div>
            </div>

            {/* Menu Links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
              {menu.map((m) => {
                const Icon = m.icon;
                const active = location.pathname === m.path;
                return (
                  <Link
                    key={m.path}
                    to={m.path}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 0.875rem',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: active ? 'var(--color-ink)' : '#FFFFFF',
                      color: active ? '#FFFFFF' : 'var(--color-text-body)',
                      border: `1px solid ${active ? 'var(--color-ink)' : 'var(--color-rule)'}`,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Icon size={16} />
                    <span>{m.label}</span>
                  </Link>
                );
              })}

              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--color-rule)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Ketentuan Resmi
                </div>
                <Link to="/voting-guide" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.8125rem', color: 'var(--color-text-body)', textDecoration: 'underline' }}>
                  Panduan 5 Langkah Voting
                </Link>
                <Link to="/faq" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.8125rem', color: 'var(--color-text-body)', textDecoration: 'underline' }}>
                  Klausul Saldo Non-Refundable
                </Link>
              </div>
            </nav>

            {/* Drawer Footer Actions */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-rule)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'center', color: 'var(--color-red)', borderColor: 'var(--color-rule)', minHeight: '40px' }}
              >
                <LogOut size={15} />
                <span>Keluar Akun</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Workspace Layout Body — Geometri Selaras 100% dengan Admin Layout */}
      <div className="workspace-body-layout" style={{ flex: 1, display: 'grid', gridTemplateColumns: '240px 1fr', minWidth: 0 }}>
        {/* Desktop Sidebar */}
        <aside className="workspace-desktop-sidebar" style={{ background: '#FFFFFF', borderRight: '1px solid var(--color-rule)', padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-rule)' }}>
            <Link to="/app" style={{ textDecoration: 'none', display: 'block' }}>
              <BrandLogo variant="light" height={32} />
            </Link>
            <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginTop: '0.4rem', textTransform: 'uppercase' }}>
              WORKSPACE PEMILIH
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
            {menu.map((m) => {
              const Icon = m.icon;
              const active = location.pathname === m.path;
              return (
                <Link
                  key={m.path}
                  to={m.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.625rem 0.75rem',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: active ? 'var(--color-ink)' : 'transparent',
                    color: active ? '#FFFFFF' : 'var(--color-text-body)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Icon size={16} />
                  <span>{m.label}</span>
                </Link>
              );
            })}
          </nav>

          <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-rule)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Bantuan
            </div>
            <Link to="/voting-guide" style={{ fontSize: '0.75rem', color: 'var(--color-text-body)', textDecoration: 'underline' }}>
              Panduan E-Voting
            </Link>
            <Link to="/faq" style={{ fontSize: '0.75rem', color: 'var(--color-text-body)', textDecoration: 'underline' }}>
              FAQ Regulasi
            </Link>
          </div>
        </aside>

        {/* User Main Body */}
        <main className="workspace-main-viewport" style={{ padding: '1.75rem', overflowY: 'auto', minWidth: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
