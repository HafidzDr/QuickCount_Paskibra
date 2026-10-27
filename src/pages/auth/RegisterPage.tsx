import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../app/providers';
import { BrandLogo } from '../../components/ui/BrandLogo';
import { AuthCarousel } from '../../components/auth/AuthCarousel';
import { UserPlus, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [googleNotice, setGoogleNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage('Silakan lengkapi seluruh kolom formulir.');
      return;
    }

    if (confirmPassword && password !== confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await register(name.trim(), email.trim());
      navigate('/app', { replace: true });
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal mendaftar akun. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleNotice(
      'Autentikasi Google OAuth belum dikonfigurasi pada versi frontend ini. Silakan gunakan formulir pendaftaran di atas untuk pengujian demo.'
    );
  };

  return (
    <div className="auth-split-layout">
      {/* Kolom Kiri: Visual Carousel (Konsisten dengan Halaman Login) */}
      <div className="auth-carousel-column">
        <AuthCarousel />
      </div>

      {/* Kolom Kanan: Form Register Bersih & Terpusat (46% di Desktop) */}
      <div className="auth-form-column">
        <div className="auth-form-card">
          {/* Logo Resmi QuickCount Paskib dari src/assets */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', minWidth: 0 }}>
            <Link to="/" aria-label="QuickCount Paskib">
              <BrandLogo variant="light" height={42} />
            </Link>
          </div>

          {/* Heading Bersih & Sederhana */}
          <div>
            <h1 className="auth-title">
              Buat Akun QuickCount
            </h1>
            <p className="auth-desc">
              Daftarkan diri Anda untuk menyalurkan dukungan suara resmi dan memantau perolehan klasemen Paskibra.
            </p>
          </div>

          {/* Error Message */}
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

          {/* Google Notice (Jujur bahwa OAuth belum dikonfigurasi) */}
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

          {/* Form Registrasi Utama */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            {/* Input Nama Lengkap */}
            <div style={{ width: '100%' }}>
              <label
                htmlFor="reg-name"
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-main)',
                  marginBottom: '0.35rem',
                }}
              >
                Nama Lengkap
              </label>
              <input
                id="reg-name"
                type="text"
                name="name"
                autoComplete="name"
                className="input-field"
                placeholder="Contoh: Rian Anggara"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Input Alamat Email */}
            <div style={{ width: '100%' }}>
              <label
                htmlFor="reg-email"
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-main)',
                  marginBottom: '0.35rem',
                }}
              >
                Alamat Email
              </label>
              <input
                id="reg-email"
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

            {/* Input Kata Sandi */}
            <div style={{ width: '100%' }}>
              <label
                htmlFor="reg-pwd"
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-main)',
                  marginBottom: '0.35rem',
                }}
              >
                Kata Sandi
              </label>

              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  id="reg-pwd"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="new-password"
                  className="input-field"
                  placeholder="Buat kata sandi minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingRight: '2.5rem' }}
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

            {/* Input Konfirmasi Kata Sandi */}
            <div style={{ width: '100%' }}>
              <label
                htmlFor="reg-confirm-pwd"
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-main)',
                  marginBottom: '0.35rem',
                }}
              >
                Konfirmasi Kata Sandi
              </label>
              <input
                id="reg-confirm-pwd"
                type={showPassword ? 'text' : 'password'}
                name="confirm-password"
                autoComplete="new-password"
                className="input-field"
                placeholder="Ulangi kata sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Tombol Utama Daftar */}
            <button
              type="submit"
              className="btn btn-primary btn-lg auth-submit-btn"
              disabled={isSubmitting}
            >
              <UserPlus size={16} />
              <span>{isSubmitting ? 'Mendaftarkan...' : 'Daftar'}</span>
            </button>
          </form>

          {/* Pemisah Visual "atau" */}
          <div className="auth-divider">
            <span className="auth-divider-line" />
            <span className="auth-divider-text">atau</span>
            <span className="auth-divider-line" />
          </div>

          {/* Tombol Login with Google Resmi & Akurat */}
          <button
            type="button"
            className="btn btn-secondary btn-lg google-auth-btn"
            onClick={handleGoogleLogin}
            title="Masuk menggunakan akun Google"
          >
            {/* SVG Logo Google Resmi Bersih & Akurat */}
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

          {/* Tautan Kembali ke Halaman Masuk */}
          <div className="auth-footer-link">
            Sudah memiliki akun?{' '}
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
