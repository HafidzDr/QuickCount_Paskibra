import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../app/providers';
import { formatNumber } from '../../utils/formatters';
import {
  Users,
  Vote,
  ArrowRight,
  MapPin,
  Trophy,
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { competitions, teams } = useApp();
  const navigate = useNavigate();

  // Filter hanya kompetisi dengan status OPEN
  const activeCompetitions = useMemo(
    () => competitions.filter((c) => c.status === 'OPEN'),
    [competitions]
  );

  // Default kompetisi yang dipilih untuk klasemen berjalan
  const [selectedCompId, setSelectedCompId] = useState<string>(
    activeCompetitions[0]?.id || competitions[0]?.id || ''
  );

  // Scope filter untuk daftar kompetisi
  const [scopeFilter, setScopeFilter] = useState<'ALL' | 'NATIONAL' | 'PROVINCE'>('ALL');

  const filteredCompetitions = useMemo(() => {
    return activeCompetitions.filter((c) => {
      if (scopeFilter === 'NATIONAL') return c.scope === 'NATIONAL';
      if (scopeFilter === 'PROVINCE') return c.scope === 'PROVINCE';
      return true;
    });
  }, [activeCompetitions, scopeFilter]);

  // Data kompetisi terpilih
  const currentCompetition = competitions.find((c) => c.id === selectedCompId);

  // Klasemen berjalan
  const leaderboardTeams = useMemo(() => {
    return teams
      .filter((t) => !selectedCompId || t.competitionId === selectedCompId)
      .sort((a, b) => b.verifiedVotes - a.verifiedVotes);
  }, [teams, selectedCompId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', minWidth: 0, width: '100%' }}>
      {/* 1. Judul dan Deskripsi Singkat */}
      <div className="modern-card" style={{ padding: '1.5rem', minWidth: 0 }}>
        <span className="editorial-tag">Pusat Informasi & Klasemen</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: 800, margin: '0.2rem 0', color: 'var(--color-ink)' }}>
          Kompetisi Berlangsung & Klasemen
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>
          Pantau pergerakan posisi klasemen secara langsung dan salurkan suara dukungan untuk kontingen pilihan Anda.
        </p>
      </div>

      {/* 2. Daftar Kompetisi Aktif & Filter (Fokus Utama Pertama, Card Modern Halus) */}
      <section className="modern-card" style={{ padding: '1.5rem', minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-ink)' }}>
              Daftar Kejuaraan Aktif
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
              Pilih salah satu kompetisi untuk memfokuskan tabel klasemen di bawah.
            </p>
          </div>

          {/* Scope Filters */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`roster-pill ${scopeFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setScopeFilter('ALL')}
            >
              Semua ({activeCompetitions.length})
            </button>
            <button
              type="button"
              className={`roster-pill ${scopeFilter === 'NATIONAL' ? 'active' : ''}`}
              onClick={() => setScopeFilter('NATIONAL')}
            >
              Nasional
            </button>
            <button
              type="button"
              className={`roster-pill ${scopeFilter === 'PROVINCE' ? 'active' : ''}`}
              onClick={() => setScopeFilter('PROVINCE')}
            >
              Provinsi
            </button>
          </div>
        </div>

        {filteredCompetitions.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', minWidth: 0 }}>
            {filteredCompetitions.map((comp) => {
              const isSelected = comp.id === selectedCompId;
              const isNational = comp.scope === 'NATIONAL';
              return (
                <div
                  key={comp.id}
                  className={`modern-interactive-card competition-card-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedCompId(comp.id)}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span className="contingent-badge">
                        {isNational ? 'TINGKAT NASIONAL' : 'REGIONAL PROVINSI'}
                      </span>
                      <span className="status-badge-active">
                        ● AKTIF (OPEN)
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.1875rem',
                        fontWeight: 800,
                        color: 'var(--color-ink)',
                        lineHeight: 1.3,
                        marginBottom: '0.45rem',
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {comp.name}
                    </h3>

                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-body)', lineHeight: 1.55, marginBottom: '0.875rem' }}>
                      {comp.description}
                    </p>

                    <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '1.125rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={13} flex-shrink="0" /> {comp.region}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Users size={13} flex-shrink="0" /> {comp.totalTeams} Pleton
                      </span>
                    </div>
                  </div>

                  <div className="comp-card-actions">
                    <button
                      type="button"
                      className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, minWidth: '130px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCompId(comp.id);
                      }}
                    >
                      {isSelected ? '✓ Sedang Dilihat' : 'Pilih Kompetisi'}
                    </button>
                    <Link
                      to={`/app/competitions/${comp.id}`}
                      className="btn btn-ghost btn-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Detail</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', border: '1px dashed var(--color-rule)', borderRadius: 'var(--radius-sm)' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              Tidak ada kompetisi aktif pada kategori filter ini.
            </p>
          </div>
        )}
      </section>

      {/* 3. Klasemen Berjalan Terkait Kompetisi Aktif */}
      <section className="modern-card" style={{ padding: '1.5rem', minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.625rem' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="editorial-tag">Klasemen Resmi</span>
              <span className="contingent-badge" style={{ overflowWrap: 'anywhere' }}>{currentCompetition?.name || 'Kompetisi Terpilih'}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800, marginTop: '0.2rem', color: 'var(--color-ink)' }}>
              Papan Perolehan Suara Sah
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
              Total akumulasi suara sah yang terverifikasi dalam sistem. Klik "Dukung" untuk menyalurkan suara.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
              Total: {leaderboardTeams.length} Pleton
            </span>
          </div>
        </div>

        {leaderboardTeams.length > 0 ? (
          <>
            {/* Desktop & Tablet View: Structured Responsive Table */}
            <div className="ranking-table-scroll-wrap ranking-desktop-view">
              <table className="ranking-table" aria-label="Tabel Klasemen Berjalan">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '56px', textAlign: 'center' }}>Pos</th>
                    <th scope="col" style={{ width: '84px' }}>Pleton</th>
                    <th scope="col">Nama Kontingen & Asal Sekolah</th>
                    <th scope="col">Daerah</th>
                    <th scope="col" style={{ textAlign: 'right' }}>Perolehan Suara</th>
                    <th scope="col" style={{ width: '120px', textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardTeams.map((team, idx) => {
                    const rank = idx + 1;
                    const isTopThree = rank <= 3;
                    return (
                      <tr key={team.id} className={isTopThree ? 'top-rank-row' : ''}>
                        <td className="ranking-pos-cell">
                          {isTopThree ? (
                            <span
                              className={`ranking-pos-top ${rank === 1 ? 'rank-1-badge' : ''}`}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                            >
                              {rank === 1 && <Trophy size={11} color="#FBBF24" />}
                              {rank}
                            </span>
                          ) : (
                            <span>{rank}</span>
                          )}
                        </td>
                        <td>
                          <span className="contingent-badge">{team.contingentNumber}</span>
                        </td>
                        <td>
                          <div className="ranking-team-title">{team.name}</div>
                          <div className="ranking-team-meta">{team.school}</div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-body)' }}>
                            {team.region}, {team.province}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="ranking-vote-num">{formatNumber(team.verifiedVotes)}</div>
                          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                            Suara Sah
                          </div>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => navigate(`/app/vote/${team.competitionId}/${team.id}`)}
                            aria-label={`Dukung ${team.name}`}
                          >
                            <Vote size={13} />
                            <span>Dukung</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile View: Modern Cards */}
            <div className="ranking-mobile-view">
              {leaderboardTeams.map((team, idx) => {
                const rank = idx + 1;
                const isTopThree = rank <= 3;
                return (
                  <div
                    key={team.id}
                    className={`mobile-rank-card ${isTopThree ? 'top-card' : ''}`}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span className={`ranking-pos-top ${rank === 1 ? 'rank-1-badge' : ''}`}>
                          #{rank}
                        </span>
                        <span className="contingent-badge">{team.contingentNumber}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-ink)' }}>
                          {formatNumber(team.verifiedVotes)}
                        </div>
                        <div style={{ fontSize: '0.625rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', lineHeight: 1 }}>
                          Suara Sah
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '0.625rem' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 800, fontSize: '1rem', color: 'var(--color-ink)', lineHeight: 1.25 }}>
                        {team.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>
                        {team.school} • {team.province}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%', minHeight: '36px', justifyContent: 'center' }}
                      onClick={() => navigate(`/app/vote/${team.competitionId}/${team.id}`)}
                    >
                      <Vote size={13} />
                      <span>Salurkan Dukungan Suara</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', border: '1px dashed var(--color-rule)', borderRadius: 'var(--radius-sm)' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              Belum ada kontingen yang terdaftar untuk kompetisi ini.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
