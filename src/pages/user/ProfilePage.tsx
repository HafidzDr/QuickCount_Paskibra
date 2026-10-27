import React from 'react';
import { useApp } from '../../app/providers';
import { Shield, Calendar, Mail, UserCheck } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser } = useApp();

  if (!currentUser) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', minWidth: 0, width: '100%' }}>
      {/* Header Halaman */}
      <div style={{ background: '#FFFFFF', border: '1px solid var(--color-rule)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-xs)', minWidth: 0 }}>
        <span className="editorial-tag">Pengaturan Akun</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 1.75rem)', fontWeight: 800, color: 'var(--color-ink)', margin: '0.2rem 0' }}>
          Profil Akun Pemilih
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
          Informasi identitas akun pemilih yang terdaftar pada sistem simulasi QuickCount Paskib.
        </p>
      </div>

      {/* Detail Profil Card */}
      <div style={{ background: '#FFFFFF', border: '1px solid var(--color-rule)', padding: '1.5rem', borderRadius: 'var(--radius-xs)', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
        {/* Identitas Ringkas */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-rule)', flexWrap: 'wrap', minWidth: 0 }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              background: 'var(--color-ink)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.25rem',
              borderRadius: 'var(--radius-xs)',
              flexShrink: 0,
            }}
          >
            {currentUser.name.charAt(0)}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h2 style={{ fontSize: '1.1875rem', fontWeight: 800, color: 'var(--color-ink)', wordBreak: 'break-word' }}>{currentUser.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
              <span className="contingent-badge">{currentUser.role === 'ADMIN' ? 'ROLE: ADMINISTRATOR' : 'ROLE: PEMILIH RESMI'}</span>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>ID: {currentUser.id}</span>
            </div>
          </div>
        </div>

        {/* Informasi Atribut Grid Responsif */}
        <div className="profile-attributes-grid">
          <div className="profile-attr-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
              <Mail size={13} flex-shrink="0" />
              <span>Alamat Email</span>
            </div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-ink)', wordBreak: 'break-all' }}>
              {currentUser.email}
            </div>
          </div>

          <div className="profile-attr-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
              <Calendar size={13} flex-shrink="0" />
              <span>Terdaftar Sejak</span>
            </div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-ink)' }}>
              {currentUser.createdAt}
            </div>
          </div>

          <div className="profile-attr-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
              <Shield size={13} flex-shrink="0" />
              <span>Status Sesi</span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <UserCheck size={14} flex-shrink="0" />
              <span>Terotentikasi Sesi Frontend</span>
            </div>
          </div>
        </div>

        {/* Catatan Transparansi Simulasi */}
        <div style={{ borderTop: '1px solid var(--color-rule)', paddingTop: '1.25rem', background: 'var(--color-paper-warm)', padding: '1.25rem', borderRadius: 'var(--radius-xs)', minWidth: 0 }}>
          <h3 style={{ fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-ink)', marginBottom: '0.35rem' }}>
            Catatan Keamanan & Batasan Sistem
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-body)', lineHeight: 1.55 }}>
            Aplikasi berjalan dalam mode simulasi frontend (tanpa backend database terhubung). Seluruh data sesi dan saldo tersimpan di memori runtime klien dan tidak ditransmisikan ke server luar.
          </p>
        </div>
      </div>
    </div>
  );
};
