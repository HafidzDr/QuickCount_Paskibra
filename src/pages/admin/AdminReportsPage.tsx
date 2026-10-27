import React, { useState, useEffect } from 'react';
import { AdminService } from '../../mocks/mockServices';
import { AuditLogItem } from '../../types';

export const AdminReportsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);

  useEffect(() => {
    AdminService.getAuditLogs().then(setLogs);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', minWidth: 0, width: '100%' }}>
      {/* Header Admin Modern Card */}
      <div className="modern-card" style={{ padding: '1.5rem', minWidth: 0 }}>
        <span className="editorial-tag">Laporan & Audit Log</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: 800, margin: '0.2rem 0', color: 'var(--color-ink)' }}>
          Audit Trail Aktivitas Panitia
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          Jejak rekaman tindakan perubahan data kompetisi, penambahan kontingen, dan sinkronisasi tabulasi.
        </p>
      </div>

      {/* Tabel Data Card Modern */}
      <div className="modern-card" style={{ overflow: 'hidden' }}>
        <div className="ranking-table-scroll-wrap" style={{ border: 'none' }}>
          <table className="ranking-table" style={{ width: '100%', minWidth: '780px' }}>
            <thead>
              <tr>
                <th style={{ width: '160px' }}>Waktu Aktivitas</th>
                <th style={{ width: '180px' }}>Aktor & Peran</th>
                <th style={{ width: '150px' }}>Tindakan</th>
                <th style={{ width: '110px' }}>Entitas</th>
                <th>Rincian Log</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                    {log.timestamp}
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.8125rem', color: 'var(--color-ink)', display: 'block' }}>{log.actorName}</strong>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>{log.actorRole}</span>
                  </td>
                  <td>
                    <span className="contingent-badge">{log.action}</span>
                  </td>
                  <td style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {log.entity}
                  </td>
                  <td style={{ fontSize: '0.8125rem', color: 'var(--color-text-body)', wordBreak: 'break-word' }}>
                    {log.details}
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
