import React, { useState } from 'react';
import { X, LogIn, AlertTriangle, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [customName, setCustomName] = useState('Hendra Wijaya');
  const [customEmail, setCustomEmail] = useState('hendra.paskib@gmail.com');

  if (!isOpen) return null;

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(customName || 'Pendukung Paskibra', customEmail || 'pendukung@paskib.id');
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h3 id="auth-modal-title" className="modal-title">
            Masuk Akun Pemilih
          </h3>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup dialog masuk akun"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleDemoLogin}>
          <div className="modal-body">
            <div className="alert-box alert-warning">
              <AlertTriangle size={16} className="flex-shrink-0" aria-hidden="true" />
              <div>
                <strong>Simulasi Demo Autentikasi:</strong> Ini adalah dialog masuk prototipe demo. Tidak ada koneksi OAuth Google sungguhan yang dibuat ke server luar.
              </div>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-body)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Masuk untuk mengelola saldo dompet, melakukan top up via QRIS/VA demo, dan menyalurkan dukungan suara resmi.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="auth-name-input" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
                Nama Pengguna (Demo)
              </label>
              <input
                id="auth-name-input"
                type="text"
                className="input-field"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="auth-email-input" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
                Email Akun Google (Demo)
              </label>
              <input
                id="auth-email-input"
                type="email"
                className="input-field"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              <ShieldCheck size={15} color="var(--color-success)" aria-hidden="true" />
              <span>Data hanya disimpan di memori browser lokal saat ini.</span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <LogIn size={15} aria-hidden="true" />
              <span>Masuk Akun (Demo)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
