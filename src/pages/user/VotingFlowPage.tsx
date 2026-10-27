import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../../app/providers';
import { formatRupiah, calculateSupportCost, calculatePotentialVotes } from '../../utils/formatters';
import { Plus, Minus, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

export const VotingFlowPage: React.FC = () => {
  const { competitionId, teamId } = useParams<{ competitionId: string; teamId: string }>();
  const { teams, wallet, currentUser, voteForTeam } = useApp();

  // Route Guard: Anonim diarahkan ke login dengan parameter context
  if (!currentUser) {
    return <Navigate to={`/login?redirect=/app/vote/${competitionId}/${teamId}`} replace />;
  }

  const [step, setStep] = useState<'INPUT' | 'CONFIRM' | 'SUCCESS'>('INPUT');
  const [votes, setVotes] = useState<number>(10);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const team = teams.find((t) => t.id === teamId);

  if (!team) {
    return (
      <div style={{ background: '#FFFFFF', border: '1px solid var(--color-rule)', padding: '2rem', textAlign: 'center', borderRadius: 'var(--radius-xs)' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>Kontingen tidak ditemukan</h3>
        <p style={{ color: 'var(--color-text-muted)', margin: '0.5rem 0 1.5rem', fontSize: '0.875rem' }}>
          Silakan kembali ke dashboard untuk memilih kontingen.
        </p>
        <Link to="/app" className="btn btn-primary">
          Buka Dashboard Kompetisi
        </Link>
      </div>
    );
  }

  const cost = calculateSupportCost(votes);
  const potentialMaxVotes = calculatePotentialVotes(wallet.balanceRupiah);
  const isInsufficient = wallet.balanceRupiah < cost;

  const handleConfirmVote = async () => {
    try {
      setErrorMsg(null);
      await voteForTeam(competitionId || team.competitionId, team.id, votes);
      setStep('SUCCESS');
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal memproses dukungan suara');
    }
  };

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid var(--color-rule)', borderRadius: 'var(--radius-xs)', padding: '1.5rem', maxWidth: '640px', margin: '0 auto', minWidth: 0, width: '100%' }}>
      {/* Header Alur Voting */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-rule)', minWidth: 0, gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
          {step === 'CONFIRM' && (
            <button type="button" onClick={() => setStep('INPUT')} className="btn btn-ghost btn-sm" aria-label="Kembali" style={{ padding: '0.35rem 0.6rem' }}>
              <ArrowLeft size={16} />
            </button>
          )}
          <div style={{ minWidth: 0 }}>
            <span className="editorial-tag">Alur E-Voting Terverifikasi</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 800, margin: '0.2rem 0', wordBreak: 'break-word', lineHeight: 1.25 }}>
              {step === 'INPUT' && 'Tentukan Jumlah Dukungan Suara'}
              {step === 'CONFIRM' && 'Konfirmasi Pengurangan Saldo'}
              {step === 'SUCCESS' && 'Dukungan Berhasil Masuk!'}
            </h1>
          </div>
        </div>
      </div>

      {step === 'INPUT' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Target Team Card */}
          <div style={{ background: 'var(--color-paper)', border: '1px solid var(--color-rule)', padding: '1rem', borderRadius: 'var(--radius-xs)', minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="contingent-badge">{team.contingentNumber}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>PERINGKAT #{team.rank}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800, margin: '0.35rem 0 0.15rem', wordBreak: 'break-word' }}>
              {team.name}
            </h2>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              {team.school} • {team.province}
            </div>
          </div>

          {/* Voting Counter */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.35rem' }}>
              <label htmlFor="vote-input-val" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
                Kuantitas Suara
              </label>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                Saldo Anda: <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink)' }}>{formatRupiah(wallet.balanceRupiah)}</strong>
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', margin: '0.875rem 0' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: '44px', height: '44px', padding: 0 }}
                disabled={votes <= 1}
                onClick={() => setVotes(Math.max(1, votes - 1))}
                aria-label="Kurangi satu suara"
              >
                <Minus size={18} />
              </button>
              <div id="vote-input-val" style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 900, color: 'var(--color-ink)', minWidth: '90px', textAlign: 'center' }}>
                {votes}
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: '44px', height: '44px', padding: 0 }}
                onClick={() => setVotes(votes + 1)}
                aria-label="Tambah satu suara"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Quick Presets Responsive */}
            <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {[5, 10, 25, 50, 100].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`preset-chip ${votes === p ? 'selected' : ''}`}
                  style={{ minWidth: '42px', padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                  onClick={() => setVotes(p)}
                >
                  +{p}
                </button>
              ))}
              {potentialMaxVotes > 0 && (
                <button
                  type="button"
                  className="preset-chip"
                  style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                  onClick={() => setVotes(potentialMaxVotes)}
                >
                  Maks ({potentialMaxVotes})
                </button>
              )}
            </div>
          </div>

          {/* Pricing Box */}
          <div style={{ padding: '0.875rem 1rem', background: 'var(--color-paper)', border: '1px solid var(--color-rule)', borderRadius: 'var(--radius-xs)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>Formula: {votes} suara × Rp1.000</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.0625rem', color: 'var(--color-ink)' }}>
                {formatRupiah(cost)}
              </span>
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
              Saldo dompet belum berkurang pada tahap pemilihan ini.
            </div>
          </div>

          {isInsufficient && (
            <div className="alert-box alert-error">
              <AlertCircle size={16} className="flex-shrink-0" />
              <div style={{ fontSize: '0.8125rem' }}>
                Saldo dompet Anda tidak mencukupi (Kurang {formatRupiah(cost - wallet.balanceRupiah)}).
                <div style={{ marginTop: '0.5rem' }}>
                  <Link to="/app/wallet/top-up" className="btn btn-primary btn-sm">
                    Top Up Saldo E-Wallet Sekarang
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <Link to="/app" className="btn btn-ghost" style={{ flex: 1, minWidth: '100px', textAlign: 'center' }}>
              Batal
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              disabled={isInsufficient || votes < 1}
              onClick={() => setStep('CONFIRM')}
              style={{ flex: 2, minWidth: '180px' }}
            >
              Lanjut Konfirmasi ({formatRupiah(cost)})
            </button>
          </div>
        </div>
      )}

      {step === 'CONFIRM' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert-box alert-warning">
            <AlertCircle size={16} className="flex-shrink-0" />
            <div style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>
              <strong>Konfirmasi Pemotongan:</strong> Saldo dompet Anda HANYA akan dipotong sebesar {formatRupiah(cost)} setelah tombol di bawah disetujui.
            </div>
          </div>

          <div style={{ background: 'var(--color-paper)', border: '1px solid var(--color-rule)', padding: '1.25rem', borderRadius: 'var(--radius-xs)', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', flexWrap: 'wrap', gap: '0.25rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Penerima Suara:</span>
              <strong style={{ color: 'var(--color-ink)', wordBreak: 'break-word' }}>{team.name}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Jumlah Dukungan:</span>
              <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-red)' }}>+{votes} Suara Sah</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Saldo Awal:</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{formatRupiah(wallet.balanceRupiah)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-red)' }}>
              <span>Pengurangan Saldo:</span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>- {formatRupiah(cost)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', borderTop: '1px solid var(--color-rule)', paddingTop: '0.5rem', fontWeight: 800 }}>
              <span>Sisa Saldo Dompet:</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-success)' }}>
                {formatRupiah(wallet.balanceRupiah - cost)}
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="alert-box alert-error">
              <AlertCircle size={16} className="flex-shrink-0" />
              <div>{errorMsg}</div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setStep('INPUT')} style={{ flex: 1, minWidth: '120px' }}>
              Ubah Kuantitas
            </button>
            <button type="button" className="btn btn-primary" onClick={handleConfirmVote} style={{ flex: 2, minWidth: '180px' }}>
              <span>Setujui & Konfirmasi Suara</span>
            </button>
          </div>
        </div>
      )}

      {step === 'SUCCESS' && (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <CheckCircle size={44} color="var(--color-success)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 800 }}>
            Dukungan Berhasil Masuk!
          </h2>
          <p style={{ color: 'var(--color-text-body)', fontSize: '0.875rem', margin: '0.5rem 0 1.5rem', lineHeight: 1.6 }}>
            Sebanyak <strong>{votes} suara sah</strong> telah resmi ditambahkan ke <strong>{team.name}</strong> dan tercatat pada klasemen kompetisi.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/app" className="btn btn-primary">
              Lihat Klasemen di Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
