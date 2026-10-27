import React, { useState } from 'react';
import { useApp } from '../../app/providers';
import { CompetitionService } from '../../mocks/mockServices';
import { formatNumber } from '../../utils/formatters';
import { Plus } from 'lucide-react';

export const AdminCompetitionsPage: React.FC = () => {
  const { competitions, refreshData } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('Jawa Barat');
  const [scope, setScope] = useState<'NATIONAL' | 'PROVINCE' | 'REGENCY_CITY'>('PROVINCE');
  const [desc, setDesc] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await CompetitionService.create({
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      region,
      scope,
      status: 'OPEN',
      startsAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + 14 * 86400000).toISOString(),
      description: desc || 'Kompetisi seleksi baris-berbaris Paskibra resmi.',
    });
    await refreshData();
    setShowModal(false);
    setName('');
    setDesc('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', minWidth: 0, width: '100%' }}>
      {/* Header Admin Modern Card */}
      <div className="modern-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', minWidth: 0 }}>
        <div>
          <span className="editorial-tag">Kelola Data</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: 800, margin: '0.2rem 0', color: 'var(--color-ink)' }}>
            Manajemen Kompetisi & Event
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            Daftar event kejuaraan yang dibuka untuk proses tabulasi e-voting.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setShowModal(true)} style={{ gap: '0.35rem' }}>
          <Plus size={15} />
          <span>Tambah Kompetisi</span>
        </button>
      </div>

      {/* Tabel Data Card Modern */}
      <div className="modern-card" style={{ overflow: 'hidden' }}>
        <div className="ranking-table-scroll-wrap" style={{ border: 'none' }}>
          <table className="ranking-table" style={{ width: '100%', minWidth: '780px' }}>
            <thead>
              <tr>
                <th style={{ width: '160px' }}>ID & Slug</th>
                <th>Nama Kejuaraan</th>
                <th>Cakupan & Wilayah</th>
                <th>Status</th>
                <th>Total Kontingen</th>
                <th style={{ textAlign: 'right' }}>Total Suara</th>
                <th style={{ textAlign: 'right', width: '90px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {competitions.map((comp) => (
                <tr key={comp.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    <div>{comp.id}</div>
                    <div style={{ fontSize: '0.6875rem' }}>/{comp.slug}</div>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.875rem', color: 'var(--color-ink)', wordBreak: 'break-word', display: 'block' }}>{comp.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>{comp.description.slice(0, 80)}...</div>
                  </td>
                  <td>
                    <span className="contingent-badge">{comp.scope}</span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>{comp.region}</div>
                  </td>
                  <td>
                    <span className="status-badge-active" style={{ whiteSpace: 'nowrap' }}>
                      {comp.status}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                    {comp.totalTeams} Pleton
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-red)', textAlign: 'right', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                    {formatNumber(comp.totalVotes)}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button type="button" className="btn btn-secondary btn-sm" style={{ padding: '0.25rem 0.6rem' }}>
                      Edit
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
              <h3 className="modal-title">Tambah Kompetisi Paskibra</h3>
              <button type="button" className="modal-close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>Nama Kejuaraan</label>
                  <input type="text" className="input-field" placeholder="Contoh: Piala Walikota Bogor 2026" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>Tingkat Wilayah</label>
                    <select className="input-field" value={scope} onChange={(e) => setScope(e.target.value as any)}>
                      <option value="NATIONAL">Nasional</option>
                      <option value="PROVINCE">Provinsi</option>
                      <option value="REGENCY_CITY">Kota / Kabupaten</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>Nama Daerah</label>
                    <input type="text" className="input-field" value={region} onChange={(e) => setRegion(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>Deskripsi Singkat</label>
                  <textarea className="input-field" rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Tujuan dan deskripsi acara..." />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}>Batal</button>
                <button type="submit" className="btn btn-primary btn-sm">Simpan Kompetisi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
