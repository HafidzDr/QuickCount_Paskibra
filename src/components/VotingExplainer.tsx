import React from 'react';
import { ArrowRight, ShieldCheck, Wallet } from 'lucide-react';

interface VotingExplainerProps {
  onStartTopUp: () => void;
}

export const VotingExplainer: React.FC<VotingExplainerProps> = ({ onStartTopUp }) => {
  const steps = [
    {
      num: '01',
      title: 'Top Up Saldo E-Wallet',
      desc: 'Pengisian saldo dompet via QRIS / VA demo. Saldo tersimpan aman di akun pemilih dan berstatus non-refundable.',
    },
    {
      num: '02',
      title: 'Pilih Kontingen Pleton',
      desc: 'Buka direktori peserta untuk menentukan pleton Paskibra sekolah atau daerah yang ingin Anda dukung.',
    },
    {
      num: '03',
      title: 'Tentukan Kuantitas Suara',
      desc: 'Masukkan jumlah suara yang disalurkan. Rumus mutlak transparan: Rp1.000 = 1 Suara sah terverifikasi.',
    },
    {
      num: '04',
      title: 'Konfirmasi Eksplisit',
      desc: 'Tinjau rincian tim dan sisa saldo. Saldo HANYA dipotong setelah Anda menyetujui konfirmasi final.',
    },
    {
      num: '05',
      title: 'Tabulasi Suara Masuk',
      desc: 'Sistem langsung menambahkan suara sah ke klasemen publik secara transparan tanpa intervensi manual.',
    },
  ];

  return (
    <section id="panduan" className="sequence-section" style={{ padding: '4rem 0', background: '#FFFFFF', borderBottom: '1px solid var(--color-rule)' }}>
      <div className="container">
        <div className="editorial-header">
          <div className="editorial-header-left">
            <span className="editorial-tag">Transparansi & Prosedur</span>
            <h2 className="editorial-title">Regulasi dan Tata Cara E-Voting</h2>
            <p className="editorial-subtitle">
              Lima tahapan baku dalam menyalurkan suara sah pada ajang kompetisi Paskibra nasional. Sistem menjamin tidak ada pemotongan saldo sebelum persetujuan final.
            </p>
          </div>
        </div>

        {/* 5-Step Editorial Sequence */}
        <div className="sequence-row">
          {steps.map((st) => (
            <div key={st.num} className="sequence-col">
              <span className="sequence-num">{st.num}</span>
              <h3 className="sequence-step-title">{st.title}</h3>
              <p className="sequence-step-text">{st.desc}</p>
            </div>
          ))}
        </div>

        {/* Transparansi Card & CTA Bar */}
        <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
          <div style={{ padding: '1.25rem 1.5rem', background: 'var(--color-paper-warm)', border: '1px solid var(--color-rule)', borderRadius: 'var(--radius-xs)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <ShieldCheck size={16} color="var(--color-success)" />
              <strong style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Klausul Perlindungan Pemilih
              </strong>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-body)', lineHeight: 1.5 }}>
              Saldo dompet tidak pernah berkurang saat membuka formulir atau mengubah angka kuantitas. Saldo baru akan dipotong setelah konfirmasi eksplisit disetujui pengguna.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onStartTopUp}
              style={{ width: '100%' }}
            >
              <Wallet size={16} />
              <span>Isi Saldo Dompet Voting</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', textAlign: 'center' }}>
              * Saldo yang telah di-top up bersifat non-refundable untuk disalurkan sebagai suara tim
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
