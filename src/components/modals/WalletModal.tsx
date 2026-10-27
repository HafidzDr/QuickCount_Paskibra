import React from 'react';
import { X, Plus, Clock, LogOut, AlertCircle } from 'lucide-react';
import { WalletSummary } from '../../types';
import { formatRupiah, calculatePotentialVotes } from '../../utils/formatters';

interface WalletModalProps {
  isOpen: boolean;
  wallet: WalletSummary;
  userName?: string;
  userEmail?: string;
  onClose: () => void;
  onOpenTopUp: () => void;
  onOpenHistory: () => void;
  onLogout: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  wallet,
  userName = 'Hendra Wijaya',
  userEmail = 'hendra.paskib@gmail.com',
  onClose,
  onOpenTopUp,
  onOpenHistory,
  onLogout,
}) => {
  if (!isOpen) return null;

  const potentialVotes = calculatePotentialVotes(wallet.balanceRupiah);

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wallet-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h3 id="wallet-modal-title" className="modal-title">
            Dompet Pemilih
          </h3>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup rincian dompet"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="modal-body">
          {/* Header profil pengguna */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-rule)' }}>
            <div style={{ width: '44px', height: '44px', background: 'var(--color-ink)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1rem' }}>
              {userName.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-ink)' }}>
                {userName}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                {userEmail}
              </div>
            </div>
          </div>

          {/* Kartu Saldo */}
          <div style={{
            background: 'var(--color-paper-warm)',
            border: '1px solid var(--color-rule)',
            padding: '1.25rem',
            marginBottom: '1.25rem',
          }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Saldo Aktif Siap Pakai
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 900, color: 'var(--color-ink)', margin: '0.35rem 0' }}>
              {formatRupiah(wallet.balanceRupiah)}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-success)', fontWeight: 700 }}>
              Setara potensi {potentialVotes} Suara Sah Terverifikasi
            </div>
          </div>

          {/* Ketentuan Non-Refundable */}
          <div className="alert-box alert-warning">
            <AlertCircle size={16} className="flex-shrink-0" aria-hidden="true" />
            <div style={{ fontSize: '0.75rem' }}>
              <strong>Klausul Regulasi:</strong> Saldo voting bersifat <em>non-refundable</em> (tidak dapat diuangkan / ditarik kembali ke rekening bank). Saldo hanya dapat disalurkan sebagai suara tim kontingen.
            </div>
          </div>

          {/* Tombol aksi dompet */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => { onClose(); onOpenTopUp(); }}
            >
              <Plus size={16} aria-hidden="true" />
              <span>Top Up Saldo E-Wallet</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%' }}
              onClick={() => { onClose(); onOpenHistory(); }}
            >
              <Clock size={16} aria-hidden="true" />
              <span>Lihat Riwayat Transaksi</span>
            </button>
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={() => { onLogout(); onClose(); }}
            style={{ color: 'var(--color-red)' }}
          >
            <LogOut size={14} aria-hidden="true" />
            <span>Keluar Akun</span>
          </button>
          <button type="button" className="btn btn-sm btn-secondary" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
