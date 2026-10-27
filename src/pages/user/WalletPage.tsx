import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../app/providers';
import { formatRupiah } from '../../utils/formatters';
import { PlusCircle, ArrowUpRight, AlertCircle, Sparkles, ArrowDownLeft } from 'lucide-react';

export const WalletPage: React.FC = () => {
  const { wallet, transactions } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', minWidth: 0, width: '100%' }}>
      {/* Saldo Master Card */}
      <div style={{ background: '#FFFFFF', border: '1px solid var(--color-rule)', padding: '1.5rem', borderRadius: 'var(--radius-xs)', minWidth: 0 }}>
        <div className="wallet-header-row">
          <div>
            <span className="editorial-tag">Dompet E-Voting</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--color-ink)', margin: '0.2rem 0' }}>
              Saldo Aktif Tersedia
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
              Saldo digunakan untuk menyalurkan dukungan suara resmi ke kontingen Paskibra.
            </p>
          </div>

          <Link to="/app/wallet/top-up" className="btn btn-primary btn-lg wallet-topup-btn">
            <PlusCircle size={16} />
            <span>Top Up Saldo</span>
          </Link>
        </div>

        {/* Saldo Display Panel */}
        <div style={{ marginTop: '1.5rem', padding: '1.25rem 1.5rem', background: 'var(--color-paper-warm)', border: '1px solid var(--color-rule)', borderRadius: 'var(--radius-xs)', minWidth: 0 }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>
            Total Nominal Saldo Siap Pakai
          </div>
          <div className="wallet-balance-num">
            {formatRupiah(wallet.balanceRupiah)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8125rem', color: 'var(--color-success)', fontWeight: 700, flexWrap: 'wrap' }}>
            <Sparkles size={15} flex-shrink="0" />
            <span>Setara potensi {wallet.estimatedVotes} Suara Sah Terverifikasi</span>
          </div>
        </div>

        {/* Non Refund Warning */}
        <div className="alert-box alert-warning" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
          <AlertCircle size={16} className="flex-shrink-0" />
          <div style={{ fontSize: '0.8125rem', lineHeight: 1.5, wordBreak: 'break-word' }}>
            <strong>Pemberitahuan Regulasi:</strong> Saldo voting bersifat <em>non-refundable</em> (tidak dapat diuangkan / ditarik kembali ke rekening bank). Saldo hanya dapat disalurkan sebagai suara kontingen Paskibra.
          </div>
        </div>
      </div>

      {/* Riwayat Mutasi Saldo Ringkas */}
      <div style={{ background: '#FFFFFF', border: '1px solid var(--color-rule)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-xs)', minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800 }}>
              Riwayat Mutasi Saldo
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
              Catatan kredit pengisian dan debit penggunaan suara.
            </p>
          </div>
          <Link to="/app/transactions" className="btn btn-secondary btn-sm" style={{ gap: '0.35rem' }}>
            <span>Lihat Semua Transaksi ({transactions.length})</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {transactions.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {transactions.slice(0, 5).map((t) => {
              const isTopUp = t.kind === 'TOP_UP';
              return (
                <div key={t.id} className="transaction-item-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-xs)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isTopUp ? 'var(--color-success-bg)' : '#FEE2E2',
                        color: isTopUp ? 'var(--color-success)' : 'var(--color-red)',
                        border: `1px solid ${isTopUp ? 'var(--color-success)' : 'var(--color-red)'}`,
                        flexShrink: 0,
                      }}
                    >
                      {isTopUp ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--color-ink)', wordBreak: 'break-word' }}>{t.title}</div>
                      <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginTop: '0.15rem', wordBreak: 'break-all' }}>
                        {t.date} • REF: {t.referenceNumber}
                      </div>
                    </div>
                  </div>

                  <div className="transaction-amt-col">
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.9375rem', color: isTopUp ? 'var(--color-success)' : 'var(--color-ink)' }}>
                      {isTopUp ? '+' : '-'}{formatRupiah(t.amountRupiah)}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--color-success)', fontWeight: 700 }}>
                      SUKSES (DEMO)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', border: '1px dashed var(--color-rule)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            Belum ada catatan mutasi transaksi pada akun Anda.
          </div>
        )}
      </div>
    </div>
  );
};
