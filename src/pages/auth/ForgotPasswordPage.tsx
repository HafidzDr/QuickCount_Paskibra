import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../../components/ui/BrandLogo';
import { AuthCarousel } from '../../components/auth/AuthCarousel';
import { Mail, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="auth-split-layout">
      {/* Kolom Kiri: Visual Carousel */}
      <div className="auth-carousel-column">
        <AuthCarousel />
      </div>

      {/* Kolom Kanan: Form Lupa Kata Sandi Terpusat & Responsif */}
      <div className="auth-form-column">
        <div className="auth-form-card">
          <div style={{ display: 'flex', justifyContent: 'flex-start', minWidth: 0 }}>
            <Link to="/" aria-label="QuickCount Paskib">
              <BrandLogo variant="light" height={42} />
            </Link>
          </div>

          <div>
            <span className="editorial-tag">Pemulihan Akun</span>
            <h1 className="auth-title">
              Lupa Kata Sandi
            </h1>
            <p className="auth-desc">
              Kirimkan instruksi pemulihan kata sandi akun pemilih terdaftar Anda.
            </p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0', background: 'var(--color-paper-warm)', border: '1px solid var(--color-rule)', borderRadius: 'var(--radius-xs)', paddingLeft: '1rem', paddingRight: '1rem' }}>
              <CheckCircle2 size={40} color="var(--color-success)" style={{ margin: '0 auto 0.75rem' }} />
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--color-ink)' }}>Permintaan Terkirim (Demo)</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', margin: '0.5rem 0 1.25rem', lineHeight: 1.5 }}>
                Tautan simulasi pemulihan kata sandi telah dikirimkan ke <strong>{email}</strong>.
              </p>
              <Link to="/login" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Kembali ke Halaman Masuk
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem', width: '100%' }}>
              <div>
                <label htmlFor="forgot-email" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-main)', marginBottom: '0.35rem' }}>
                  Alamat Email Terdaftar
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="input-field"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg auth-submit-btn">
                <Mail size={16} />
                <span>Kirim Tautan Pemulihan</span>
              </button>

              <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                <Link to="/login" style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textDecoration: 'underline' }}>
                  Batal dan kembali ke halaman masuk
                </Link>
              </div>
            </form>
          )}

          <div className="auth-footer-link">
            Sudah ingat kata sandi?{' '}
            <Link
              to="/login"
              style={{
                fontWeight: 800,
                color: 'var(--color-ink)',
                textDecoration: 'underline',
              }}
            >
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
