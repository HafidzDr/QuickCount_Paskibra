import React, { useState } from 'react';
import { X, ArrowDownLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Transaction } from '../../types';
import { formatRupiah } from '../../utils/formatters';

interface Props {
  isOpen: boolean;
  transactions: Transaction[];
  onClose: () => void;
}

export const TransactionHistoryModal: React.FC<Props> = ({ isOpen, transactions, onClose }) => {
  const [filter, setFilter] = useState<'ALL' | 'TOP_UP' | 'VOTE'>('ALL');

  if (!isOpen) return null;

  const filtered = transactions.filter((t) => {
    if (filter === 'TOP_UP') return t.kind === 'TOP_UP';
    if (filter === 'VOTE') return t.kind === 'VOTE';
    return true;
  });

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h3 id="history-modal-title" className="modal-title">Riwayat Transaksi</h3>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup riwayat transaksi"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="modal-body">
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem' }}>
            <button
              type="button"
              className={`roster-pill ${filter === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilter('ALL')}
            >
              Semua ({transactions.length})
            </button>
            <button
              type="button"
              className={`roster-pill ${filter === 'TOP_UP' ? 'active' : ''}`}
              onClick={() => setFilter('TOP_UP')}
            >
              Top Up
            </button>
            <button
              type="button"
              className={`roster-pill ${filter === 'VOTE' ? 'active' : ''}`}
              onClick={() => setFilter('VOTE')}
            >
              Dukungan Suara
            </button>
          </div>

          {filtered.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {filtered.map((item) => {
                const isTopUp = item.kind === 'TOP_UP';
                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.875rem 1rem',
                      border: '1px solid var(--color-rule)',
                      backgroundColor: 'var(--color-paper)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: isTopUp ? 'var(--color-success-bg)' : '#FEE2E2',
                          color: isTopUp ? 'var(--color-success)' : 'var(--color-red)',
                        }}
                      >
                        {isTopUp ? <ArrowDownLeft size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}
                      </div>

                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.8125rem', color: 'var(--color-ink)' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                          {item.date} • {item.referenceNumber}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          fontSize: '0.9375rem',
                          color: isTopUp ? 'var(--color-success)' : 'var(--color-ink)',
                        }}
                      >
                        {isTopUp ? '+' : '-'}{formatRupiah(item.amountRupiah)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem', fontSize: '0.6875rem', color: 'var(--color-success)' }}>
                        <CheckCircle2 size={12} aria-hidden="true" />
                        <span>Sukses</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
              Tidak ada catatan transaksi pada filter ini.
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
