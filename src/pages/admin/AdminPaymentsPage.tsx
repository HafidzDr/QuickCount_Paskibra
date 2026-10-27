import React from 'react';
import { useApp } from '../../app/providers';
import { formatRupiah } from '../../utils/formatters';

export const AdminPaymentsPage: React.FC = () => {
  const { transactions } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', minWidth: 0, width: '100%' }}>
      {/* Header Admin Modern Card */}
      <div className="modern-card" style={{ padding: '1.5rem', minWidth: 0 }}>
        <span className="editorial-tag">Monitoring Keuangan</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: 800, margin: '0.2rem 0', color: 'var(--color-ink)' }}>
          Monitoring Transaksi & Pembayaran
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          Seluruh log simulasi pengisian saldo e-wallet dan pembayaran voting. Tidak ada gateway bank sungguhan yang terhubung.
        </p>
      </div>

      {/* Tabel Data Card Modern */}
      <div className="modern-card" style={{ overflow: 'hidden' }}>
        <div className="ranking-table-scroll-wrap" style={{ border: 'none' }}>
          <table className="ranking-table" style={{ width: '100%', minWidth: '780px' }}>
            <thead>
              <tr>
                <th style={{ width: '170px' }}>ID Transaksi & Ref</th>
                <th style={{ width: '90px' }}>Jenis</th>
                <th>Keterangan</th>
                <th style={{ textAlign: 'right' }}>Pokok</th>
                <th style={{ textAlign: 'right' }}>Admin</th>
                <th style={{ textAlign: 'right' }}>Total Tagihan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => {
                const isTopUp = tx.kind === 'TOP_UP';
                return (
                  <tr key={tx.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                      <div style={{ color: 'var(--color-ink)', fontWeight: 700 }}>{tx.id}</div>
                      <div style={{ color: 'var(--color-text-muted)' }}>{tx.referenceNumber}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 800, padding: '0.2rem 0.5rem', background: isTopUp ? '#F0FDF4' : '#FEE2E2', color: isTopUp ? '#15803D' : '#DC2626', border: `1px solid ${isTopUp ? '#BBF7D0' : '#FECACA'}`, borderRadius: 'var(--radius-xs)', whiteSpace: 'nowrap' }}>
                        {tx.kind}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 800, fontSize: '0.8125rem', color: 'var(--color-ink)', wordBreak: 'break-word' }}>{tx.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{tx.subtitle}</div>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, textAlign: 'right', fontSize: '0.8125rem' }}>
                      {formatRupiah(tx.amountRupiah)}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'right' }}>
                      {formatRupiah(tx.feeRupiah)}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.875rem', color: 'var(--color-ink)', textAlign: 'right' }}>
                      {formatRupiah(tx.totalPaidRupiah)}
                    </td>
                    <td>
                      <span className="status-badge-active" style={{ whiteSpace: 'nowrap' }}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
