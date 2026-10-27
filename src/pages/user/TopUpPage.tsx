import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../app/providers';
import { PAYMENT_METHODS, TOP_UP_PRESETS } from '../../data/mockData';
import { formatRupiah, calculatePotentialVotes } from '../../utils/formatters';
import { ArrowLeft, CheckCircle, ShieldAlert, QrCode } from 'lucide-react';

export const TopUpPage: React.FC = () => {
  const { topUp } = useApp();

  const [step, setStep] = useState<'SELECT' | 'PENDING' | 'SUCCESS'>('SELECT');
  const [amount, setAmount] = useState<number>(50000);
  const [custom, setCustom] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [method, setMethod] = useState(PAYMENT_METHODS[0]);
  const [agreed, setAgreed] = useState(false);

  const currentAmt = isCustom ? (parseInt(custom, 10) || 0) : amount;
  const totalPay = currentAmt + method.feeRupiah;
  const potentialVotes = calculatePotentialVotes(currentAmt);
  const isValid = currentAmt >= 10000;

  const handleSimulatePayment = async () => {
    await topUp(currentAmt, method.feeRupiah, method.name);
    setStep('SUCCESS');
  };

  return (
    <div style={{ background: '#FFFFFF', border: '2px solid var(--color-ink)', borderRadius: 'var(--radius-xs)', padding: '2rem', maxWidth: '640px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-rule)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {step === 'PENDING' && (
            <button type="button" onClick={() => setStep('SELECT')} className="btn btn-ghost btn-sm" aria-label="Kembali">
              <ArrowLeft size={16} />
            </button>
          )}
          <div>
            <span className="editorial-tag">Pengisian Saldo Dompet</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 800 }}>
              {step === 'SELECT' && 'Pilih Nominal & Metode Pembayaran'}
              {step === 'PENDING' && 'Instruksi Bayar (Simulasi Demo)'}
              {step === 'SUCCESS' && 'Top Up Saldo Berhasil!'}
            </h1>
          </div>
        </div>
      </div>

      {step === 'SELECT' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
              Pilihan Cepat Nominal
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

            <label htmlFor="custom-amt" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
              Atau Masukkan Nominal Kustom (Min. Rp10.000):
            </label>
            <input
              id="custom-amt"
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

          {/* Estimasi Suara */}
          <div style={{ padding: '0.875rem 1rem', background: 'var(--color-paper)', border: '1px solid var(--color-rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
                Estimasi Potensi Suara
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Formula konversi mutlak: Rp1.000 = 1 Suara Sah
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-ink)', fontSize: '1.25rem' }}>
              {potentialVotes} Suara
            </span>
          </div>

          {/* Pilihan Metode Bayar */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
              Metode Pembayaran (Demo)
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {PAYMENT_METHODS.map((pm) => {
                const isChosen = method.id === pm.id;
                return (
                  <label
                    key={pm.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
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
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-ink)' }}>{pm.name}</div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{pm.description}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: pm.feeRupiah === 0 ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                      {pm.feeRupiah === 0 ? 'Gratis' : `+${formatRupiah(pm.feeRupiah)}`}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Rincian Biaya */}
          <div style={{ padding: '0.875rem 1rem', border: '1px solid var(--color-rule)', background: '#FFFFFF', fontSize: '0.8125rem' }}>
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

          {/* Syarat Non-Refundable */}
          <div style={{ background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)', padding: '0.75rem' }}>
            <label className="policy-checkbox-label">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                <strong>Pernyataan Non-Refundable:</strong> Saya memahami bahwa saldo top up bersifat mutlak tidak dapat dikembalikan / ditarik ke rekening bank dan hanya dapat digunakan untuk suara kontingen Paskibra.
              </span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <Link to="/app/wallet" className="btn btn-ghost">
              Batal
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!isValid || !agreed}
              onClick={() => setStep('PENDING')}
            >
              Lanjut Bayar {formatRupiah(totalPay)}
            </button>
          </div>
        </div>
      )}

      {step === 'PENDING' && (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert-box alert-warning" style={{ textAlign: 'left' }}>
            <ShieldAlert size={16} className="flex-shrink-0" />
            <div style={{ fontSize: '0.75rem' }}>
              <strong>Simulasi Demo:</strong> Kode pembayaran dan instruksi ini adalah prototipe. Jangan lakukan transfer dana sungguhan.
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
              Total Tagihan Demo
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.25rem', fontWeight: 900, color: 'var(--color-ink)' }}>
              {formatRupiah(totalPay)}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Metode: {method.name}</div>
          </div>

          <div style={{ display: 'inline-block', padding: '1.5rem', background: '#FFFFFF', border: '2px dashed var(--color-ink)', maxWidth: '200px', margin: '0 auto' }}>
            <div style={{ width: '120px', height: '120px', background: 'var(--color-ink)', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', gap: '0.35rem' }}>
              <QrCode size={36} />
              <span style={{ fontSize: '0.625rem', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>QRIS DEMO</span>
            </div>
            <div style={{ marginTop: '0.75rem', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
              REF: QC-TOPUP-98231
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setStep('SELECT')}>
              Ubah Nominal
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSimulatePayment}>
              <CheckCircle size={15} />
              <span>Simulasikan Pembayaran Berhasil</span>
            </button>
          </div>
        </div>
      )}

      {step === 'SUCCESS' && (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <CheckCircle size={44} color="var(--color-success)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 800 }}>
            Top Up Saldo Berhasil Dikonfirmasi!
          </h2>
          <p style={{ color: 'var(--color-text-body)', fontSize: '0.875rem', margin: '0.5rem 0 1.5rem', lineHeight: 1.6 }}>
            Saldo sejumlah <strong>{formatRupiah(currentAmt)}</strong> telah ditambahkan ke dompet akun Anda (setara <strong>{potentialVotes} suara sah</strong>).
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <Link to="/teams" className="btn btn-primary">
              Gunakan Saldo untuk Dukung Tim
            </Link>
            <Link to="/app/wallet" className="btn btn-secondary">
              Kembali ke Dompet
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
