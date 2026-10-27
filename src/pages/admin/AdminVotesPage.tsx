import React from 'react';
import { useApp } from '../../app/providers';
import { formatNumber } from '../../utils/formatters';

export const AdminVotesPage: React.FC = () => {
  const { votes } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', minWidth: 0, width: '100%' }}>
      {/* Header Admin Modern Card */}
      <div className="modern-card" style={{ padding: '1.5rem', minWidth: 0 }}>
        <span className="editorial-tag">Monitoring Tabulasi</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: 800, margin: '0.2rem 0', color: 'var(--color-ink)' }}>
          Monitoring Dukungan Suara Masuk
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          Log verifikasi transaksi voting dan penambahan suara ke kontingen secara transparan.
        </p>
      </div>

      {/* Tabel Data Card Modern */}
      <div className="modern-card" style={{ overflow: 'hidden' }}>
        <div className="ranking-table-scroll-wrap" style={{ border: 'none' }}>
          <table className="ranking-table" style={{ width: '100%', minWidth: '700px' }}>
            <thead>
              <tr>
                <th style={{ width: '140px' }}>ID Suara</th>
                <th>Pleton Penerima</th>
                <th>Pengguna (User ID)</th>
                <th style={{ textAlign: 'right' }}>Jumlah Suara</th>
                <th style={{ textAlign: 'right' }}>Nilai Biaya</th>
                <th>Waktu Konfirmasi</th>
                <th>Status Audit</th>
              </tr>
            </thead>
            <tbody>
              {votes.map((v) => (
                <tr key={v.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{v.id}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0 }}>
                      <span className="contingent-badge">{v.contingentNumber}</span>
                      <strong style={{ fontSize: '0.875rem', color: 'var(--color-ink)', wordBreak: 'break-word' }}>{v.teamName}</strong>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {v.userId}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-red)', textAlign: 'right' }}>
                    +{formatNumber(v.votesCount)}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.875rem', textAlign: 'right' }}>
                    Rp{v.costRupiah.toLocaleString('id-ID')}
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                    {v.createdAt}
                  </td>
                  <td>
                    <span className="status-badge-active" style={{ whiteSpace: 'nowrap' }}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
