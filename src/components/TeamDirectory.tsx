import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { Team } from '../types';
import { formatNumber } from '../utils/formatters';

interface Props {
  teams: Team[];
  onSelectTeamToVote: (team: Team) => void;
}

export const TeamDirectory: React.FC<Props> = ({ teams, onSelectTeamToVote }) => {
  const [query, setQuery] = useState('');
  const [province, setProvince] = useState('Semua');
  const [sortBy, setSortBy] = useState<'rank' | 'votes' | 'name'>('rank');

  const provinces = useMemo(() => ['Semua', ...Array.from(new Set(teams.map((t) => t.province)))], [teams]);

  const filtered = useMemo(() => {
    return teams
      .filter((t) => {
        const q = query.trim().toLowerCase();
        const mQ = !q || t.name.toLowerCase().includes(q) || t.school.toLowerCase().includes(q) || t.region.toLowerCase().includes(q) || t.contingentNumber.toLowerCase().includes(q);
        const mP = province === 'Semua' || t.province === province;
        return mQ && mP;
      })
      .sort((a, b) => {
        if (sortBy === 'votes') return b.verifiedVotes - a.verifiedVotes;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return a.rank - b.rank;
      });
  }, [teams, query, province, sortBy]);

  return (
    <section id="direktori" className="directory-section">
      <div className="container">
        <div className="editorial-header">
          <div className="editorial-header-left">
            <span className="editorial-tag">Roster Peserta</span>
            <h2 className="editorial-title">Direktori Lengkap Kontingen</h2>
            <p className="editorial-subtitle">
              Pindai dan telusuri kontingen Paskibra dari setiap provinsi. Pilih pleton dan salurkan suara resmi Anda.
            </p>
          </div>
          <div className="editorial-header-right">
            <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-text-muted)' }}>
              Menampilkan {filtered.length} dari {teams.length} Kontingen
            </div>
          </div>
        </div>

        <div className="roster-controls">
          <div className="roster-search-wrap">
            <Search size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} aria-hidden="true" />
            <input
              type="text"
              className="roster-search-input"
              placeholder="Cari nomor kontingen, nama pleton, sekolah, daerah..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Cari tim paskibra"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Hapus kata kunci pencarian"
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                }}
              >
                <X size={15} aria-hidden="true" />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <label htmlFor="roster-sort" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
              <SlidersHorizontal size={14} aria-hidden="true" />
              <span>Urutan:</span>
            </label>
            <select
              id="roster-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-field"
              style={{ width: 'auto', minHeight: '38px', paddingRight: '1.5rem', fontWeight: 600, fontSize: '0.8125rem' }}
              aria-label="Urutkan daftar kontingen"
            >
              <option value="rank">Peringkat Klasemen</option>
              <option value="votes">Suara Terbanyak</option>
              <option value="name">Nama Pleton (A-Z)</option>
            </select>
          </div>
        </div>

        <div className="roster-filter-pills" role="group" aria-label="Filter berdasarkan provinsi">
          {provinces.map((prov) => (
            <button
              key={prov}
              type="button"
              className={`roster-pill ${province === prov ? 'active' : ''}`}
              onClick={() => setProvince(prov)}
              aria-pressed={province === prov}
            >
              {prov}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="roster-grid">
            {filtered.map((team) => (
              <article key={team.id} className="roster-card">
                <div className="roster-card-header">
                  <span className="contingent-badge">{team.contingentNumber}</span>
                  <span className="roster-pos">POSISI #{team.rank}</span>
                </div>

                <div className="roster-card-body">
                  <span className="roster-school">{team.school}</span>
                  <h3 className="roster-name">{team.name}</h3>
                  <div className="roster-region">{team.region}, {team.province}</div>

                  <div className="roster-stats-row">
                    <span className="roster-votes-label">Perolehan Sah</span>
                    <span className="roster-votes-val">{formatNumber(team.verifiedVotes)} Suara</span>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', marginTop: 'auto' }}
                    onClick={() => onSelectTeamToVote(team)}
                    aria-label={`Dukung ${team.name}, perolehan saat ini ${formatNumber(team.verifiedVotes)} suara`}
                  >
                    <span>Dukung Pleton Ini</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', border: '1px dashed var(--color-rule)', background: 'var(--color-paper)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Kontingen Tidak Ditemukan</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', margin: '0.5rem 0 1.25rem' }}>
              Tidak ada data yang cocok dengan kriteria pencarian "{query}".
            </p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => { setQuery(''); setProvince('Semua'); }}
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
