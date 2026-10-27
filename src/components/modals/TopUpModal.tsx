import React, { useState } from 'react';
import { X, CheckCircle, ArrowLeft, ShieldAlert } from 'lucide-react';
import { PaymentOption } from '../../types';
import { PAYMENT_METHODS, TOP_UP_PRESETS } from '../../data/mockData';
import { formatRupiah, calculatePotentialVotes } from '../../utils/formatters';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCompleteTopUp: (amount: number, fee: number, method: string) => void;
}

export const TopUpModal: React.FC<Props> = ({ isOpen, onClose, onCompleteTopUp }) => {
  const [step, setStep] = useState<'SELECT' | 'PENDING' | 'SUCCESS'>('SELECT');
  const [amount, setAmount] = useState<number>(50000);
  const [custom, setCustom] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [method, setMethod] = useState<PaymentOption>(PAYMENT_METHODS[0]);
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  const currentAmt = isCustom ? (parseInt(custom, 10) || 0) : amount;
  const totalPay = currentAmt + method.feeRupiah;
  const potentialVotes = calculatePotentialVotes(currentAmt);
  const isValid = currentAmt >= 10000;

  const handleSimulateSuccess = () => {
    onCompleteTopUp(currentAmt, method.feeRupiah, method.name);
    setStep('SUCCESS');
  };

  const handleClose = () => {
    setStep('SELECT');
    setIsCustom(false);
    setAmount(50000);
    setCustom('');
    setAgreed(false);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="topup-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {step === 'PENDING' && (
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setStep('SELECT')}
                aria-label="Kembali ke pemilihan nominal"
              >
                <ArrowLeft size={16} aria-hidden="true" />
              </button>
            )}
            <h3 id="topup-modal-title" className="modal-title">
              {step === 'SELECT' && 'Pengisian Saldo E-Wallet'}
              {step === 'PENDING' && 'Instruksi Bayar (Simulasi Demo)'}
              {step === 'SUCCESS' && 'Saldo Berhasil Ditambahkan'}
            </h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Tutup dialog top up"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {step === 'SELECT' && (
          <>
            <div className="modal-body">
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                Pilihan Nominal Cepat
              </label>

              <div className="preset-grid">
                {TOP_UP_PRESETS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`preset-chip ${!isCustom && amount === amt ? 'selected' : ''}`}
                    onClick={() => { setIsCustom(false); setAmount(amt); }}
                  >
                    {formatRupiah(amt)}
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="custom-topup-input" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
                  Atau Nominal Kustom (Min. Rp10.000):
                </label>
                <input
                  id="custom-topup-input"
                  type="text"
                  className="input-field"
                  placeholder="Contoh: 75000"
                  value={custom}
                  onChange={(e) => {
                    setIsCustom(true);
                    setCustom(e.target.value.replace(/\D/g, ''));
                  }}
                />
              </div>

              {/* Potensi suara */}
              <div style={{
                padding: '0.75rem 1rem',
                background: 'var(--color-paper)',
                border: '1px solid var(--color-rule)',
                marginBottom: '1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Estimasi Suara
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Formula: Rp1.000 = 1 Suara Sah
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, color: 'var(--color-ink)', fontSize: '1.125rem' }}>
                  {potentialVotes} Suara
                </span>
              </div>

              {/* Metode Bayar */}
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                Metode Pembayaran (Demo)
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
                {PAYMENT_METHODS.map((pm) => {
                  const isChosen = method.id === pm.id;
                  return (
                    <label
                      key={pm.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.625rem 0.875rem',
                        border: `1.5px solid ${isChosen ? 'var(--color-ink)' : 'var(--color-rule)'}`,
                        backgroundColor: isChosen ? 'var(--color-paper-warm)' : '#FFFFFF',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <input
                          type="radio"
                          name="payMethod"
                          checked={isChosen}
                          onChange={() => setMethod(pm)}
                          style={{ accentColor: 'var(--color-ink)' }}
                        />
                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-ink)' }}>
                          {pm.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: pm.feeRupiah === 0 ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                        {pm.feeRupiah === 0 ? 'Gratis' : `+${formatRupiah(pm.feeRupiah)}`}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Rincian tagihan */}
              <div style={{
                padding: '0.75rem 1rem',
                border: '1px solid var(--color-rule)',
                background: '#FFFFFF',
                fontSize: '0.8125rem',
                marginBottom: '1rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Nominal Saldo:</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{formatRupiah(currentAmt)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Biaya Admin:</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{method.feeRupiah === 0 ? 'Rp0' : formatRupiah(method.feeRupiah)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-rule)', paddingTop: '0.35rem', fontWeight: 900 }}>
                  <span>Total Tagihan:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-red)' }}>{formatRupiah(totalPay)}</span>
                </div>
              </div>

              {/* Ketentuan Non-Refundable */}
              <div style={{
                background: 'var(--color-warning-bg)',
                border: '1px solid var(--color-warning-border)',
                padding: '0.75rem',
              }}>
                <label className="policy-checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <span>
                    <strong>Pernyataan Non-Refundable:</strong> Saya memahami bahwa saldo top up tidak dapat ditarik kembali / diuangkan dan hanya dapat disalurkan sebagai suara tim kontingen.
                  </span>
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-ghost" onClick={handleClose}>
                Batal
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!isValid || !agreed}
                onClick={() => setStep('PENDING')}
              >
                Lanjut Bayar {formatRupiah(totalPay)}
              </button>
            </div>
          </>
        )}

        {step === 'PENDING' && (
          <>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              <div className="alert-box alert-warning" style={{ textAlign: 'left' }}>
                <ShieldAlert size={16} className="flex-shrink-0" aria-hidden="true" />
                <div>
                  <strong>SIMULASI PEMBAYARAN DEMO:</strong> QR & VA adalah tiruan antarmuka. Jangan mengirimkan dana riil.
                </div>
              </div>

              <div style={{ margin: '1.25rem 0' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
                  Total Tagihan Demo
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 900, color: 'var(--color-ink)' }}>
                  {formatRupiah(totalPay)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Metode: {method.name}</div>
              </div>

              <div style={{
                display: 'inline-block',
                padding: '1.25rem',
                background: '#FFFFFF',
                border: '2px dashed var(--color-ink)',
              }}>
                <div style={{
                  width: '110px',
                  height: '110px',
                  background: 'var(--color-ink)',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                }}>
                  QRIS DEMO
                </div>
                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  KODE: QC-DEMO-98231
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <button type="button" className="btn btn-ghost" onClick={() => setStep('SELECT')}>
                Ubah Nominal
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSimulateSuccess}>
                <CheckCircle size={15} aria-hidden="true" />
                <span>Simulasi Pembayaran Berhasil</span>
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
              Top Up Berhasil Dikonfirmasi!
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', margin: '0.5rem 0 1.5rem', lineHeight: 1.55 }}>
              Saldo sejumlah <strong>{formatRupiah(currentAmt)}</strong> telah ditambahkan ke dompet akun Anda (setara <strong>{potentialVotes} suara sah</strong>).
            </p>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={handleClose}
            >
              Gunakan Saldo untuk Dukung Tim
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
