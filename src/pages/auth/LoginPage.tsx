import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../app/providers';
import { BrandLogo } from '../../components/ui/BrandLogo';
import { AuthCarousel } from '../../components/auth/AuthCarousel';
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, currentUser } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Sanitize redirect: only internal relative path
  const rawRedirect = searchParams.get('redirect') || '/app';
  const redirect =
    rawRedirect.startsWith('/') && !rawRedirect.startsWith('//') && !rawRedirect.includes(':')
      ? rawRedirect
      : '/app';

  // Otomatis redirect jika pengguna sudah terautentikasi
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate(redirect, { replace: true });
      }
    }
  }, [currentUser, navigate, redirect]);

  const [email, setEmail] = useState('hendra.paskib@gmail.com');
  const [password, setPassword] = useState('password-demo-123');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [googleNotice, setGoogleNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Silakan lengkapi alamat email dan kata sandi.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      // Login satu pintu: role ditentukan otomatis oleh sistem berdasarkan akun
      const user = await login(email, password);
      if (user.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate(redirect, { replace: true });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal masuk akun. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleNotice(
      'Autentikasi Google OAuth belum dikonfigurasi pada versi frontend ini. Silakan masuk menggunakan form di atas untuk pengujian demo.'
    );
  };

  return (
    <div className="auth-split-layout">
      {/* Kolom Kiri: Visual Carousel (54% di Desktop) */}
      <div className="auth-carousel-column">
        <AuthCarousel />
      </div>

      {/* Kolom Kanan: Form Login Bersih & Terpusat (46% di Desktop) */}
      <div className="auth-form-column">
        <div className="auth-form-card">
          {/* Logo Resmi QuickCount Paskib dari src/assets */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', minWidth: 0 }}>
            <Link to="/" aria-label="QuickCount Paskib">
              <BrandLogo variant="light" height={42} />
            </Link>
          </div>

          {/* Heading Bersih, Tegas, dan Responsif */}
          <div>
            <h1 className="auth-title">
              Selamat Datang Kembali
            </h1>
            <p className="auth-desc">
              Masuk untuk melihat perlombaan dan klasemen QuickCount Paskib.
            </p>
          </div>

          {/* Konteks redirect aman jika ada */}
          {rawRedirect.startsWith('/app/vote') && (
            <div
              className="alert-box alert-warning"
              style={{
                padding: '0.625rem 0.875rem',
                margin: 0,
                fontSize: '0.75rem',
                borderRadius: 'var(--radius-xs)',
              }}
            >
              <AlertCircle size={15} className="flex-shrink-0" />
              <span>
                Konteks dukungan Anda telah disimpan dan akan dibuka otomatis setelah masuk.
              </span>
            </div>
          )}

          {errorMessage && (
            <div
              className="alert-box alert-error"
              style={{
                padding: '0.625rem 0.875rem',
                margin: 0,
                fontSize: '0.75rem',
                borderRadius: 'var(--radius-xs)',
              }}
            >
              <AlertCircle size={15} className="flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {googleNotice && (
            <div
              className="alert-box alert-warning"
              style={{
                padding: '0.625rem 0.875rem',
                margin: 0,
                fontSize: '0.75rem',
                borderRadius: 'var(--radius-xs)',
              }}
            >
              <AlertCircle size={15} className="flex-shrink-0" />
              <span>{googleNotice}</span>
            </div>
          )}

          {/* Form Login Utama Satu Pintu (Tanpa Selector Role Manual) */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem', width: '100%' }}>
            {/* Input Alamat Email */}
            <div style={{ width: '100%' }}>
              <label
                htmlFor="auth-email"
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-main)',
                  marginBottom: '0.4rem',
                }}
              >
                Alamat Email
              </label>
              <input
                id="auth-email"
                type="email"
                name="email"
                autoComplete="email"
                className="input-field"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                Akun demo pemilih: <strong>hendra.paskib@gmail.com</strong> | Admin: <strong>admin.operasional@quickcountpaskib.id</strong>
              </div>
            </div>

            {/* Input Kata Sandi dengan Tombol Show/Hide Accessible */}
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label
                  htmlFor="auth-password"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--color-text-main)',
                  }}
                >
                  Kata Sandi
                </label>
                <Link to="/forgot-password" style={{ fontSize: '0.75rem', color: 'var(--color-red)', textDecoration: 'underline' }}>
                  Lupa kata sandi?
                </Link>
              </div>

              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  className="input-field"
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    paddingRight: '2.5rem',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-text-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Tombol Utama Masuk (Full Width Form) */}
            <button
              type="submit"
              className="btn btn-primary btn-lg auth-submit-btn"
              disabled={isSubmitting}
            >
              <LogIn size={16} />
              <span>{isSubmitting ? 'Memproses...' : 'Masuk'}</span>
            </button>
          </form>

          {/* Pemisah Visual "atau" */}
          <div className="auth-divider">
            <span className="auth-divider-line" />
            <span className="auth-divider-text">atau</span>
            <span className="auth-divider-line" />
          </div>

          {/* Tombol Login with Google */}
          <button
            type="button"
            className="btn btn-secondary btn-lg google-auth-btn"
            onClick={handleGoogleLogin}
            title="Masuk menggunakan akun Google"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                fill="#4285F4"
              />
              <path
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.36 7.34 24 12 24z"
                fill="#34A853"
              />
              <path
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.42l4.02-3.15z"
                fill="#FBBC05"
              />
              <path
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.27 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                fill="#EA4335"
              />
            </svg>
            <span>Login with Google</span>
          </button>

          {/* Tautan Pendaftaran jika pengguna belum memiliki akun */}
          <div className="auth-footer-link">
            Belum memiliki akun?{' '}
            <Link
              to="/register"
              style={{
                fontWeight: 800,
                color: 'var(--color-ink)',
                textDecoration: 'underline',
              }}
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
