import React, { useState } from 'react';
import { useApp } from '../../app/providers';
import { TeamService } from '../../mocks/mockServices';
import { formatNumber } from '../../utils/formatters';
import { Plus } from 'lucide-react';

export const AdminTeamsPage: React.FC = () => {
  const { teams, competitions, refreshData } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [region, setRegion] = useState('');
  const [province, setProvince] = useState('DKI Jakarta');
  const [contingentNumber, setContingentNumber] = useState('');
  const [tagline, setTagline] = useState('');

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    await TeamService.create({
      competitionId: competitions[0]?.id || 'comp-nasional-2026',
      contingentNumber: contingentNumber || `PLT-${Math.floor(10 + Math.random() * 89)}`,
      name,
      school,
      region: region || 'Kota Administrasi',
      province,
      tagline: tagline || 'Disiplin dan Kehormatan Paskibra',
      leaderName: 'Komandan Pleton',
      coachName: 'Pembina Paskibra',
    });
    await refreshData();
    setShowModal(false);
    setName('');
    setSchool('');
    setContingentNumber('');
    setTagline('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', minWidth: 0, width: '100%' }}>
      {/* Header Admin Modern Card */}
      <div className="modern-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', minWidth: 0 }}>
        <div>
          <span className="editorial-tag">Kelola Data</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: 800, margin: '0.2rem 0', color: 'var(--color-ink)' }}>
            Manajemen Kontingen Paskibra
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            Roster resmi peserta pleton yang terdaftar dalam kompetisi.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setShowModal(true)} style={{ gap: '0.35rem' }}>
          <Plus size={15} />
          <span>Tambah Kontingen</span>
        </button>
      </div>

      {/* Tabel Data Card Modern */}
      <div className="modern-card" style={{ overflow: 'hidden' }}>
        <div className="ranking-table-scroll-wrap" style={{ border: 'none' }}>
          <table className="ranking-table" style={{ width: '100%', minWidth: '700px' }}>
            <thead>
              <tr>
                <th style={{ width: '60px', textAlign: 'center' }}>Pos</th>
                <th style={{ width: '90px' }}>Pleton</th>
                <th>Nama Kontingen & Sekolah</th>
                <th>Daerah / Provinsi</th>
                <th style={{ textAlign: 'right' }}>Perolehan Suara</th>
                <th style={{ textAlign: 'right', width: '90px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((t) => (
                <tr key={t.id}>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                    #{t.rank}
                  </td>
                  <td>
                    <span className="contingent-badge">{t.contingentNumber}</span>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.875rem', color: 'var(--color-ink)', display: 'block', wordBreak: 'break-word' }}>{t.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t.school}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-body)' }}>{t.region}</div>
                    <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>{t.province}</div>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-ink)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {formatNumber(t.verifiedVotes)} Suara
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button type="button" className="btn btn-secondary btn-sm" style={{ padding: '0.25rem 0.6rem' }}>
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="modal-content" style={{ borderRadius: 'var(--radius-md)' }}>
            <div className="modal-header">
              <h3 className="modal-title">Tambah Kontingen Pleton</h3>
              <button type="button" className="modal-close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateTeam}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>Nomor Kontingen</label>
                    <input type="text" className="input-field" placeholder="PLT-12" value={contingentNumber} onChange={(e) => setContingentNumber(e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>Nama Pleton</label>
                    <input type="text" className="input-field" placeholder="Contoh: Ksatria Yudha" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>Asal Sekolah</label>
                  <input type="text" className="input-field" placeholder="Contoh: SMAN 1 Bogor" value={school} onChange={(e) => setSchool(e.target.value)} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>Kota / Kabupaten</label>
                    <input type="text" className="input-field" placeholder="Kota Bogor" value={region} onChange={(e) => setRegion(e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>Provinsi</label>
                    <input type="text" className="input-field" value={province} onChange={(e) => setProvince(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>Motto / Tagline Pleton</label>
                  <input type="text" className="input-field" placeholder="Langkah tegap pantang mundur" value={tagline} onChange={(e) => setTagline(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}>Batal</button>
                <button type="submit" className="btn btn-primary btn-sm">Simpan Kontingen</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
