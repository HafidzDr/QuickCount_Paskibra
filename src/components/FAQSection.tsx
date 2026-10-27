import React, { useState } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Berapa formula konversi resmi saldo ke perolehan suara?',
      a: 'Formula resmi adalah Rp1.000 = 1 Suara sah terverifikasi. Tidak ada biaya tersembunyi atau pemotongan proporsional (contoh: Rp50.000 tepat bernilai 50 suara sah).',
    },
    {
      q: 'Apakah saldo dompet yang sudah di-top up dapat dicairkan kembali (refund)?',
      a: 'TIDAK BISA. Saldo yang telah berhasil ditop-up bersifat mutlak non-refundable (tidak dapat dikembalikan atau diuangkan kembali ke rekening bank pemilih). Pastikan nominal top-up sesuai dengan jumlah dukungan yang ingin Anda salurkan.',
    },
    {
      q: 'Kapan saldo dompet saya mulai berkurang saat voting?',
      a: 'Saldo dompet Anda HANYA berkurang setelah Anda meninjau rincian tim, menentukan kuantitas suara, dan menekan tombol Konfirmasi & Salurkan secara sadar. Membuka dialog atau mengisi formulir sama sekali tidak memotong saldo.',
    },
    {
      q: 'Metode pembayaran apa saja yang tersedia untuk pengisian saldo?',
      a: 'Tersedia QRIS (bebas biaya admin untuk seluruh m-banking dan e-wallet nasional), Virtual Account BCA, Mandiri, dan E-Wallet. Biaya transaksi (bila ada) selalu ditampilkan secara terbuka sebelum pembayaran.',
    },
    {
      q: 'Mengapa situs ini mencantumkan tanda SIMULASI DEMO?',
      a: 'Aplikasi ini merupakan prototipe antarmuka publik resmi. Seluruh simulasi QRIS, login OAuth, dan transaksi e-wallet berjalan di sisi klien (frontend demo) untuk keperluan pengujian dan verifikasi sebelum integrasi gateway resmi.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="editorial-header">
          <div className="editorial-header-left">
            <span className="editorial-tag">Tanya Jawab</span>
            <h2 className="editorial-title">Pertanyaan Sering Diajukan (FAQ)</h2>
            <p className="editorial-subtitle">
              Ketetapan resmi mengenai konversi suara, kebijakan saldo non-refundable, dan integritas audit kompetisi.
            </p>
          </div>
        </div>

        <div className="faq-editorial-list">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            const headingId = `faq-head-${idx}`;
            const panelId = `faq-body-${idx}`;

            return (
              <div key={idx} className="faq-row">
                <button
                  type="button"
                  id={headingId}
                  className="faq-btn"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.15s ease',
                      flexShrink: 0,
                      color: isOpen ? 'var(--color-red)' : 'var(--color-ink)',
                    }}
                  />
                </button>
                {isOpen && (
                  <div id={panelId} role="region" aria-labelledby={headingId} className="faq-panel">
                    {idx === 1 && (
                      <div className="alert-box alert-warning" style={{ marginBottom: '0.75rem' }}>
                        <AlertCircle size={16} aria-hidden="true" className="flex-shrink-0" />
                        <div>
                          <strong>Klausul Regulasi:</strong> Saldo voting non-refundable demi kepatuhan pertanggungjawaban panitia kompetisi.
                        </div>
                      </div>
                    )}
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
