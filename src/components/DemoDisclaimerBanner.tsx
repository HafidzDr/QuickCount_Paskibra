import React from 'react';

export const DemoDisclaimerBanner: React.FC = () => {
  return (
    <aside className="demo-banner" role="status" aria-label="Informasi status prototipe demo">
      <div className="container demo-banner-inner">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem' }}>
          <span className="demo-banner-tag">Simulasi Demo</span>
          <span>
            Data suara, saldo e-wallet, dan QRIS/VA bersifat tiruan untuk verifikasi antarmuka kompetisi.
          </span>
        </div>
        <div className="demo-banner-rule">
          Regulasi: <strong>Rp1.000 = 1 Suara Sah</strong> (Saldo Non-Refundable)
        </div>
      </div>
    </aside>
  );
};
