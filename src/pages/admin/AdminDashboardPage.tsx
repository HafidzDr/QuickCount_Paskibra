import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../app/providers';
import { formatNumber, formatRupiah } from '../../utils/formatters';
import { Trophy, Users, Vote, Receipt } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { competitions, teams, transactions } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', minWidth: 0, width: '100%' }}>
      {/* Header Admin Modern Card */}
      <div className="modern-card" style={{ padding: '1.5rem', minWidth: 0 }}>
        <span className="editorial-tag">Pusat Kendali Operasional</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: 800, margin: '0.2rem 0', color: 'var(--color-ink)' }}>
          Dashboard Operasional Panitia
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>
          Monitoring terpusat aktivitas kejuaraan, tabulasi perolehan suara sah, dan audit transaksi.
        </p>
      </div>

      {/* KPI Cards Grid Responsif Modern */}
      <div className="workspace-kpi-grid">
        <div className="workspace-kpi-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase' }}>
            <span>Kompetisi Aktif</span>
            <Trophy size={15} color="var(--color-ink)" />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-ink)', margin: '0.25rem 0', lineHeight: 1.1 }}>
            {competitions.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Kejuaraan Terdaftar</div>
        </div>

        <div className="workspace-kpi-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase' }}>
            <span>Total Kontingen</span>
            <Users size={15} color="var(--color-ink)" />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-ink)', margin: '0.25rem 0', lineHeight: 1.1 }}>
            {teams.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Pleton Bertanding</div>
        </div>

        <div className="workspace-kpi-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase' }}>
            <span>Dukungan Tercatat</span>
            <Vote size={15} color="var(--color-red)" />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-red)', margin: '0.25rem 0', lineHeight: 1.1, wordBreak: 'break-all' }}>
            {formatNumber(teams.reduce((acc, t) => acc + t.verifiedVotes, 0))}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Akumulasi Suara Sah</div>
        </div>

        <div className="workspace-kpi-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase' }}>
            <span>Total Transaksi</span>
            <Receipt size={15} color="var(--color-success)" />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-ink)', margin: '0.25rem 0', lineHeight: 1.1 }}>
            {transactions.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Log Mutasi Sesi Ini</div>
        </div>
      </div>

      {/* Quick Action Navigation Panels (Modern Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', minWidth: 0 }}>
        <div className="modern-card" style={{ padding: '1.5rem', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1875rem', fontWeight: 800, color: 'var(--color-ink)' }}>Pimpinan Klasemen</h2>
            <Link to="/admin/teams" className="btn btn-ghost btn-sm" style={{ padding: '0.25rem 0.6rem' }}>Kelola Tim</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {teams.slice(0, 4).map((t) => (
              <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', gap: '0.5rem', minWidth: 0 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span className="contingent-badge">{t.contingentNumber}</span>
                    <strong style={{ fontSize: '0.875rem', wordBreak: 'break-word', color: 'var(--color-ink)' }}>{t.name}</strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>{t.school} • {t.province}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-ink)', flexShrink: 0, textAlign: 'right' }}>
                  {formatNumber(t.verifiedVotes)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modern-card" style={{ padding: '1.5rem', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1875rem', fontWeight: 800, color: 'var(--color-ink)' }}>Aktivitas Transaksi Terbaru</h2>
            <Link to="/admin/payments" className="btn btn-ghost btn-sm" style={{ padding: '0.25rem 0.6rem' }}>Audit Log</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {transactions.slice(0, 4).map((tx) => (
              <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', gap: '0.5rem', minWidth: 0 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.8125rem', wordBreak: 'break-word', color: 'var(--color-ink)' }}>{tx.title}</div>
                  <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>{tx.date}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.875rem', color: tx.kind === 'TOP_UP' ? 'var(--color-success)' : 'var(--color-ink)', flexShrink: 0, textAlign: 'right' }}>
                  {formatRupiah(tx.amountRupiah)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
