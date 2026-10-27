import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../app/providers';
import { MapPin, Users, Trophy, ArrowRight } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

export const CompetitionsPage: React.FC = () => {
  const { competitions } = useApp();

  return (
    <div className="container" style={{ padding: '3.5rem 1rem' }}>
      <div className="editorial-header">
        <div className="editorial-header-left">
          <span className="editorial-tag">Jelajahi Kompetisi</span>
          <h1 className="editorial-title">Daftar Kejuaraan & Seleksi Paskibra</h1>
          <p className="editorial-subtitle">
            Pilih ajang kompetisi baris-berbaris yang sedang dibuka untuk meninjau klasemen dan menyalurkan dukungan suara resmi.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {competitions.map((comp) => (
          <article
            key={comp.id}
            style={{
              background: '#FFFFFF',
              border: '2px solid var(--color-ink)',
              borderRadius: 'var(--radius-xs)',
              padding: '1.5rem',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span className="contingent-badge">{comp.scope === 'NATIONAL' ? 'TINGKAT NASIONAL' : 'REGIONAL PROVINSI'}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-success)', textTransform: 'uppercase' }}>
                STATUS: {comp.status}
              </span>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-ink)', marginBottom: '0.5rem' }}>
                {comp.name}
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '780px' }}>
                {comp.description}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.8125rem', borderTop: '1px solid var(--color-rule)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
                <MapPin size={15} color="var(--color-ink)" />
                <span>Wilayah: <strong>{comp.region}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
                <Users size={15} color="var(--color-ink)" />
                <span>Kontingen: <strong>{comp.totalTeams} Pleton</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
                <Trophy size={15} color="var(--color-red)" />
                <span>Akumulasi: <strong>{formatNumber(comp.totalVotes)} Suara</strong></span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <Link to="/teams" className="btn btn-primary btn-sm">
                <span>Lihat Pleton Peserta</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/leaderboard" className="btn btn-secondary btn-sm">
                <span>Papan Klasemen</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
