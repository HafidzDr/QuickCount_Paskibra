import React from 'react';
import { Team } from '../types';
import { formatNumber } from '../utils/formatters';

interface LeaderboardProps {
  teams: Team[];
  onSelectTeamToVote: (team: Team) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ teams, onSelectTeamToVote }) => {
  return (
    <section id="klasemen" className="leaderboard-section">
      <div className="container">
        <div className="editorial-header">
          <div className="editorial-header-left">
            <span className="editorial-tag">Klasemen Lengkap</span>
            <h2 className="editorial-title">Papan Peringkat Suara Terbuka</h2>
            <p className="editorial-subtitle">
              Urutan kontingen berdasarkan total perolehan suara sah yang tercatat di sistem demo. Diperbarui otomatis setelah setiap konfirmasi voting.
            </p>
          </div>
          <div className="editorial-header-right">
            <span className="contingent-badge" style={{ background: 'var(--color-ink)', color: '#FFFFFF' }}>
              SIMULASI TABULASI DEMO
            </span>
          </div>
        </div>

        <div className="ranking-table-container">
          <table className="ranking-table" aria-label="Tabel Klasemen Paskibra">
            <thead>
              <tr>
                <th scope="col" style={{ width: '70px', textAlign: 'center' }}>Pos</th>
                <th scope="col" style={{ width: '100px' }}>Pleton</th>
                <th scope="col">Nama Kontingen & Asal Sekolah</th>
                <th scope="col">Provinsi</th>
                <th scope="col" style={{ textAlign: 'right' }}>Total Suara Sah</th>
                <th scope="col" style={{ width: '130px', textAlign: 'right' }}>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => {
                const rank = index + 1;
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
                      <div className="ranking-team-meta">{team.school} • {team.region}</div>
                    </td>

                    <td>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-body)' }}>
                        {team.province}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div className="ranking-vote-num">
                        {formatNumber(team.verifiedVotes)}
                      </div>
                      <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                        Suara Sah
                      </div>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => onSelectTeamToVote(team)}
                        aria-label={`Dukung ${team.name}, perolehan saat ini ${formatNumber(team.verifiedVotes)} suara`}
                      >
                        <span>Dukung</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
