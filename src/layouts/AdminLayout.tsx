import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../app/providers';
import {
  ShieldCheck,
  Trophy,
  Users,
  Vote,
  Receipt,
  FileText,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { BrandLogo } from '../components/ui/BrandLogo';

export const AdminLayout: React.FC = () => {
  const { currentUser, logout } = useApp();
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

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return (
      <div style={{ padding: '4rem 1.5rem', textAlign: 'center', minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--color-red)' }}>
          Akses Khusus Admin Operasional
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Anda harus login sebagai Admin Simulasi untuk mengakses dashboard operasional.
        </p>
        <Link to="/login" className="btn btn-primary">
          Login Sebagai Admin
        </Link>
      </div>
    );
  }

  const adminMenu = [
    { label: 'Overview Operasional', path: '/admin', icon: ShieldCheck },
    { label: 'Kelola Kompetisi', path: '/admin/competitions', icon: Trophy },
    { label: 'Kelola Tim & Roster', path: '/admin/teams', icon: Users },
    { label: 'Monitoring Suara', path: '/admin/votes', icon: Vote },
    { label: 'Monitoring Transaksi', path: '/admin/payments', icon: Receipt },
    { label: 'Laporan & Audit Log', path: '/admin/reports', icon: FileText },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC', overflowX: 'hidden' }}>
      {/* Top Header Admin Bersih & Bebas Elemen Redundan */}
      <header style={{ background: '#0F172A', color: '#F8FAFC', position: 'sticky', top: 0, zIndex: 40, borderBottom: '1px solid #1E293B' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 1.25rem', height: '3.75rem', gap: '0.75rem', minWidth: 0 }}>
          {/* Sisi Kiri: Hamburger Kontras Tinggi di Mobile / Judul Panel di Desktop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
            {/* Tombol Hamburger Kontras Tinggi (Latar Terang #FFFFFF, Ikon Gelap #0F172A, Min 44x44px) */}
            <button
              type="button"
              className="admin-hamburger-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka navigasi menu admin"
              aria-expanded={mobileMenuOpen}
              aria-controls="admin-nav-drawer"
            >
              <Menu size={22} aria-hidden="true" />
            </button>

            {/* Identitas Admin Bersih (Teks Redundan 'Workspace User' dan Badge Lama Dihapus) */}
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Panel Operasional
              </span>
              <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                {currentUser.name}
              </span>
            </div>
          </div>

          {/* Sisi Kanan: Hanya Aksi Utama yang Diperlukan (Keluar) */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#FCA5A5',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                minHeight: '34px',
                borderRadius: 'var(--radius-xs)',
                transition: 'all 0.15s ease',
              }}
              title="Keluar Sesi Admin"
            >
              <LogOut size={14} />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Drawer & Backdrop untuk Admin */}
      {mobileMenuOpen && (
        <>
          <div
            className="user-drawer-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div
            id="admin-nav-drawer"
            className="user-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigasi Menu Admin"
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

            {/* Profile Info Admin */}
            <div style={{ marginBottom: '1.25rem', padding: '0.875rem', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Administrator Operasional
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-ink)', marginTop: '0.2rem', overflowWrap: 'anywhere' }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', overflowWrap: 'anywhere' }}>
                {currentUser.email}
              </div>
            </div>

            {/* Admin Menu Links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
              {adminMenu.map((m) => {
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
                <span>Keluar Akun Admin</span>
              </button>
            </div>
          </div>
        </>
      )}

      <div className="workspace-body-layout" style={{ flex: 1, display: 'grid', gridTemplateColumns: '240px 1fr', minWidth: 0 }}>
        {/* Admin Navigation Sidebar (Desktop) */}
        <aside className="workspace-desktop-sidebar" style={{ background: '#FFFFFF', borderRight: '1px solid var(--color-rule)', padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-rule)' }}>
            <Link to="/admin" style={{ textDecoration: 'none', display: 'block' }}>
              <BrandLogo variant="light" height={32} />
            </Link>
            <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginTop: '0.4rem', textTransform: 'uppercase' }}>
              PANEL OPERASIONAL
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
            {adminMenu.map((m) => {
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

          <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-rule)' }}>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.5rem 0.75rem',
                fontSize: '0.8125rem',
                color: 'var(--color-red)',
                fontWeight: 700,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <LogOut size={15} />
              <span>Keluar Admin</span>
            </button>
          </div>
        </aside>

        {/* Admin Main Body */}
        <main className="workspace-main-viewport" style={{ padding: '1.75rem', overflowY: 'auto', minWidth: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
