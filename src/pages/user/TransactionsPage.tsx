import React, { useState } from 'react';
import { useApp } from '../../app/providers';
import { formatRupiah } from '../../utils/formatters';
import { ArrowDownLeft, ArrowUpRight, CheckCircle2, History } from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const { transactions } = useApp();
  const [filter, setFilter] = useState<'ALL' | 'TOP_UP' | 'VOTE'>('ALL');

  const filtered = transactions.filter((t) => {
    if (filter === 'TOP_UP') return t.kind === 'TOP_UP';
    if (filter === 'VOTE') return t.kind === 'VOTE';
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0, width: '100%' }}>
      {/* Header Halaman */}
      <div style={{ background: '#FFFFFF', border: '1px solid var(--color-rule)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-xs)', minWidth: 0 }}>
        <span className="editorial-tag">Audit Mutasi Saldo</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 1.75rem)', fontWeight: 800, color: 'var(--color-ink)', margin: '0.2rem 0' }}>
          Riwayat Transaksi
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
          Log audit seluruh mutasi pengisian saldo (kredit) dan penyaluran suara dukungan (debit).
        </p>

        {/* Filter Pills Responsive Wrap */}
        <div style={{ display: 'flex', gap: '0.45rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`roster-pill ${filter === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilter('ALL')}
          >
            Semua ({transactions.length})
          </button>
          <button
            type="button"
            className={`roster-pill ${filter === 'TOP_UP' ? 'active' : ''}`}
            onClick={() => setFilter('TOP_UP')}
          >
            Top Up Saldo
          </button>
          <button
            type="button"
            className={`roster-pill ${filter === 'VOTE' ? 'active' : ''}`}
            onClick={() => setFilter('VOTE')}
          >
            Dukungan Suara
          </button>
        </div>
      </div>

      {/* Daftar Transaksi */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: 0 }}>
        {filtered.length > 0 ? (
          filtered.map((item) => {
            const isTopUp = item.kind === 'TOP_UP';
            return (
              <div key={item.id} className="transaction-full-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isTopUp ? 'var(--color-success-bg)' : '#FEE2E2',
                      color: isTopUp ? 'var(--color-success)' : 'var(--color-red)',
                      border: `1px solid ${isTopUp ? 'var(--color-success)' : 'var(--color-red)'}`,
                      borderRadius: 'var(--radius-xs)',
                      flexShrink: 0,
                    }}
                  >
                    {isTopUp ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--color-ink)', wordBreak: 'break-word' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.1rem', wordBreak: 'break-word' }}>
                      {item.subtitle}
                    </div>
                    <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-light)', marginTop: '0.2rem', wordBreak: 'break-all' }}>
                      {item.date} • REF: <span style={{ color: 'var(--color-ink)' }}>{item.referenceNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="transaction-full-amt">
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      fontSize: '1.0625rem',
                      color: isTopUp ? 'var(--color-success)' : 'var(--color-ink)',
                    }}
                  >
                    {isTopUp ? '+' : '-'}{formatRupiah(item.amountRupiah)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem', color: 'var(--color-success)', fontWeight: 700, marginTop: '0.15rem' }}>
                    <CheckCircle2 size={12} />
                    <span>SUKSES (DEMO)</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1.5rem', background: '#FFFFFF', border: '1px dashed var(--color-rule)', borderRadius: 'var(--radius-xs)' }}>
            <History size={32} color="var(--color-text-muted)" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-ink)' }}>Tidak Ada Transaksi</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
              Tidak ditemukan data pada kategori filter "{filter}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
