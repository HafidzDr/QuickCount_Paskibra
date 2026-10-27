import React, { useState } from 'react';
import { X, Plus, Minus, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Team, WalletSummary } from '../../types';
import { VOTE_PRESETS } from '../../data/mockData';
import { formatRupiah, calculateSupportCost, calculatePotentialVotes } from '../../utils/formatters';

interface Props {
  isOpen: boolean;
  team: Team | null;
  wallet: WalletSummary;
  isLoggedIn?: boolean;
  onClose: () => void;
  onConfirmSupport: (team: Team, votesCount: number, costRupiah: number) => void;
  onOpenTopUp: () => void;
  onOpenAuth: () => void;
}

export const SupportModal: React.FC<Props> = ({
  isOpen,
  team,
  wallet,
  isLoggedIn = true,
  onClose,
  onConfirmSupport,
  onOpenTopUp,
  onOpenAuth,
}) => {
  const [step, setStep] = useState<'INPUT' | 'CONFIRM' | 'SUCCESS'>('INPUT');
  const [votes, setVotes] = useState<number>(10);

  if (!isOpen || !team) return null;

  const cost = calculateSupportCost(votes);
  const potentialMaxVotes = calculatePotentialVotes(wallet.balanceRupiah);
  const isInsufficient = isLoggedIn && wallet.balanceRupiah < cost;

  const handleMax = () => {
    if (potentialMaxVotes > 0) setVotes(potentialMaxVotes);
  };

  const handleConfirm = () => {
    onConfirmSupport(team, votes, cost);
    setStep('SUCCESS');
  };

  const handleClose = () => {
    setStep('INPUT');
    setVotes(10);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {step === 'CONFIRM' && (
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setStep('INPUT')}
                aria-label="Kembali ke formulir suara"
              >
                <ArrowLeft size={16} aria-hidden="true" />
              </button>
            )}
            <h3 id="support-modal-title" className="modal-title">
              {step === 'INPUT' && 'Salurkan Suara Dukungan'}
              {step === 'CONFIRM' && 'Konfirmasi Penggunaan Saldo'}
              {step === 'SUCCESS' && 'Suara Sah Terverifikasi!'}
            </h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Tutup dialog dukungan"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {step === 'INPUT' && (
          <>
            <div className="modal-body">
              {/* Identitas Tim Penerima */}
              <div style={{
                padding: '0.875rem 1rem',
                background: 'var(--color-paper)',
                border: '1px solid var(--color-rule)',
                marginBottom: '1.25rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span className="contingent-badge">{team.contingentNumber}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>
                    PERINGKAT #{team.rank}
                  </span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--color-ink)' }}>
                  {team.name}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                  {team.school} • {team.province}
                </div>
              </div>

              {!isLoggedIn ? (
                <div className="alert-box alert-warning">
                  <AlertCircle size={16} className="flex-shrink-0" aria-hidden="true" />
                  <div>
                    Silakan masuk akun terlebih dahulu untuk menggunakan saldo dompet Anda.
                    <div style={{ marginTop: '0.5rem' }}>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => { onClose(); onOpenAuth(); }}
                      >
                        Masuk Akun Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label htmlFor="vote-counter-val" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
                      Tentukan Jumlah Suara:
                    </label>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                      Saldo: <strong style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-mono)' }}>{formatRupiah(wallet.balanceRupiah)}</strong>
                    </span>
                  </div>

                  {/* Counter kontrol */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '0.75rem 0 1rem' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ width: '42px', height: '42px', padding: 0 }}
                      disabled={votes <= 1}
                      onClick={() => setVotes(Math.max(1, votes - 1))}
                      aria-label="Kurangi satu suara"
                    >
                      <Minus size={16} aria-hidden="true" />
                    </button>

                    <div
                      id="vote-counter-val"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: 'var(--color-ink)',
                        minWidth: '100px',
                        textAlign: 'center',
                      }}
                      aria-live="polite"
                    >
                      {votes}
                    </div>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ width: '42px', height: '42px', padding: 0 }}
                      onClick={() => setVotes(votes + 1)}
                      aria-label="Tambah satu suara"
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </div>

                  {/* Tombol preset cepat */}
                  <div style={{ display: 'flex', gap: '0.45rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {VOTE_PRESETS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`preset-chip ${votes === p ? 'selected' : ''}`}
                        style={{ padding: '0.35rem 0.75rem', minWidth: '46px' }}
                        onClick={() => setVotes(p)}
                      >
                        +{p}
                      </button>
                    ))}
                    {potentialMaxVotes > 0 && (
                      <button
                        key="max"
                        type="button"
                        className="preset-chip"
                        style={{ padding: '0.35rem 0.75rem' }}
                        onClick={handleMax}
                      >
                        Maks ({potentialMaxVotes})
                      </button>
                    )}
                  </div>

                  {/* Rincian biaya dan transparansi */}
                  <div style={{
                    padding: '0.875rem 1rem',
                    background: 'var(--color-paper)',
                    border: '1px solid var(--color-rule)',
                    fontSize: '0.875rem',
                    marginBottom: '1rem',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Formula: {votes} suara × Rp1.000</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-ink)' }}>{formatRupiah(cost)}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Saldo dompet belum dipotong pada tahap pemilihan ini.
                    </div>
                  </div>

                  {isInsufficient && (
                    <div className="alert-box alert-error">
                      <AlertCircle size={16} className="flex-shrink-0" aria-hidden="true" />
                      <div>
                        Saldo dompet tidak mencukupi (Perlu {formatRupiah(cost)}).
                        <div style={{ marginTop: '0.5rem' }}>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => { onClose(); onOpenTopUp(); }}
                          >
                            <span>Top Up Saldo Sekarang</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-ghost" onClick={handleClose}>
                Batal
              </button>
              {isLoggedIn && (
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={isInsufficient || votes < 1}
                  onClick={() => setStep('CONFIRM')}
                >
                  Tinjau Dukungan ({formatRupiah(cost)})
                </button>
              )}
            </div>
          </>
        )}

        {step === 'CONFIRM' && (
          <>
            <div className="modal-body">
              <div style={{ marginBottom: '1.25rem' }}>
                <span className="kicker-tag" style={{ marginBottom: '0.35rem' }}>Persetujuan Final</span>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-ink)' }}>
                  Konfirmasi Pengurangan Saldo
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                  Saldo dompet Anda baru akan dikurangi setelah menekan tombol konfirmasi resmi di bawah.
                </p>
              </div>

              <div style={{
                background: 'var(--color-paper)',
                border: '1px solid var(--color-rule)',
                padding: '1rem',
                fontSize: '0.875rem',
                marginBottom: '1rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Penerima Suara:</span>
                  <span style={{ fontWeight: 800 }}>{team.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Jumlah Dukungan:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-red)' }}>+{votes} Suara Terverifikasi</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Saldo Dompet Awal:</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{formatRupiah(wallet.balanceRupiah)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--color-red)' }}>
                  <span>Saldo Digunakan:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>- {formatRupiah(cost)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--color-rule)',
                  paddingTop: '0.5rem',
                  fontWeight: 800,
                }}>
                  <span>Sisa Saldo Dompet:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-success)' }}>{formatRupiah(wallet.balanceRupiah - cost)}</span>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <button type="button" className="btn btn-ghost" onClick={() => setStep('INPUT')}>
                Kembali
              </button>
              <button type="button" className="btn btn-primary" onClick={handleConfirm}>
                <span>Konfirmasi & Salurkan Suara</span>
              </button>
            </div>
          </>
        )}

        {step === 'SUCCESS' && (
          <div className="modal-body" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '2px solid var(--color-success)',
              color: 'var(--color-success)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}>
              <CheckCircle size={28} aria-hidden="true" />
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-ink)' }}>
              Suara Sah Berhasil Masuk!
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', margin: '0.5rem 0 1.5rem', lineHeight: 1.55 }}>
              Sebanyak <strong>{votes} suara sah terverifikasi</strong> telah resmi ditambahkan ke <strong>{team.name}</strong> dan tercatat pada audit klasemen.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={handleClose}
            >
              Lihat di Papan Klasemen
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
