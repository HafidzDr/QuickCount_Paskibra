import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../app/providers';
import { formatNumber } from '../../utils/formatters';
import {
  Vote,
  Search,
  ArrowLeft,
} from 'lucide-react';

export const CompetitionDetailPage: React.FC = () => {
  const { competitionId } = useParams<{ competitionId: string }>();
  const { competitions, teams } = useApp();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('Semua');

  const comp = competitions.find((c) => c.id === competitionId || c.slug === competitionId);

  if (!comp) {
    return (
      <div style={{ background: '#FFFFFF', border: '1px solid var(--color-rule)', padding: '2.5rem', textAlign: 'center', borderRadius: 'var(--radius-xs)' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          Kompetisi Tidak Ditemukan
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Data kompetisi dengan ID tersebut tidak tersedia di sistem demo.
        </p>
        <Link to="/app" className="btn btn-primary">
          Kembali ke Dashboard Kompetisi
        </Link>
      </div>
    );
  }

  // Kontingen dalam kompetisi ini
  const compTeams = useMemo(() => {
    return teams.filter((t) => t.competitionId === comp.id);
  }, [teams, comp.id]);

  const provinces = useMemo(() => {
    return ['Semua', ...Array.from(new Set(compTeams.map((t) => t.province)))];
  }, [compTeams]);

  const filteredTeams = useMemo(() => {
    return compTeams
      .filter((t) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          t.name.toLowerCase().includes(q) ||
          t.school.toLowerCase().includes(q) ||
          t.contingentNumber.toLowerCase().includes(q);
        const matchesProv = selectedProvince === 'Semua' || t.province === selectedProvince;
        return matchesQuery && matchesProv;
      })
      .sort((a, b) => b.verifiedVotes - a.verifiedVotes);
  }, [compTeams, query, selectedProvince]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Info Kompetisi */}
      <div style={{ background: '#FFFFFF', border: '1px solid var(--color-rule)', padding: '1.75rem', borderRadius: 'var(--radius-xs)' }}>
        <div style={{ marginBottom: '1rem' }}>
          <Link to="/app" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span className="contingent-badge">{comp.scope === 'NATIONAL' ? 'TINGKAT NASIONAL' : 'REGIONAL PROVINSI'}</span>
            <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-success)', background: 'var(--color-success-bg)', padding: '0.2rem 0.5rem' }}>
              STATUS: {comp.status}
            </span>
          </div>
        </div>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-ink)', lineHeight: 1.2 }}>
          {comp.name}
        </h1>

        <p style={{ color: 'var(--color-text-body)', fontSize: '0.9375rem', lineHeight: 1.6, margin: '0.75rem 0 1.5rem', maxWidth: '800px' }}>
          {comp.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', borderTop: '1px solid var(--color-rule)', paddingTop: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Wilayah
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-ink)', marginTop: '0.15rem' }}>
              {comp.region}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Jumlah Kontingen
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-ink)', marginTop: '0.15rem' }}>
              {compTeams.length} Pleton Terdaftar
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Total Suara Sah
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '1.125rem', color: 'var(--color-red)', marginTop: '0.15rem' }}>
              {formatNumber(compTeams.reduce((acc, t) => acc + t.verifiedVotes, 0))} Suara
            </div>
          </div>
        </div>
      </div>

      {/* Roster & Klasemen Kompetisi Ini */}
      <section style={{ background: '#FFFFFF', border: '1px solid var(--color-rule)', padding: '1.5rem', borderRadius: 'var(--radius-xs)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="editorial-tag">Roster Pleton & Klasemen</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 800 }}>
              Daftar Kontingen & Perolehan Suara
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                className="input-field"
                placeholder="Cari pleton..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ paddingLeft: '2.2rem', minHeight: '36px', fontSize: '0.8125rem' }}
              />
            </div>

            {provinces.length > 2 && (
              <select
                className="input-field"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                style={{ width: 'auto', minHeight: '36px', fontSize: '0.8125rem' }}
              >
                {provinces.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {filteredTeams.length > 0 ? (
          <div className="ranking-table-container">
            <table className="ranking-table" aria-label="Tabel Roster Kontingen">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '60px', textAlign: 'center' }}>Pos</th>
                  <th scope="col" style={{ width: '90px' }}>Pleton</th>
                  <th scope="col">Nama Kontingen & Asal Sekolah</th>
                  <th scope="col">Daerah</th>
                  <th scope="col" style={{ textAlign: 'right' }}>Perolehan Suara</th>
                  <th scope="col" style={{ width: '130px', textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.map((team, idx) => {
                  const rank = idx + 1;
                  const isTopThree = rank <= 3;
                  return (
                    <tr key={team.id} className={isTopThree ? 'top-rank-row' : ''}>
                      <td className="ranking-pos-cell">
                        {isTopThree ? (
                          <span className={`ranking-pos-top ${rank === 1 ? 'rank-1-badge' : ''}`}>{rank}</span>
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
                        <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-body)' }}>
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
                          onClick={() => navigate(`/app/vote/${comp.id}/${team.id}`)}
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
        ) : (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem', border: '1px dashed var(--color-rule)' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              Tidak ada pleton yang cocok dengan kriteria pencarian "{query}".
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
