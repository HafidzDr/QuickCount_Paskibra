import React from 'react';
import logoLight from '../../assets/01-logo-utama-light.png';
import logoDark from '../../assets/02-logo-utama-dark.png';
import symbolOnly from '../../assets/07-symbol-only.png';
import appIconRed from '../../assets/10-app-icon-red.png';

export type LogoVariant = 'light' | 'dark' | 'symbol' | 'icon';

interface BrandLogoProps {
  variant?: LogoVariant;
  height?: number;
  className?: string;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  height = 38,
  className = '',
  showSubtitle = true,
}) => {
  let src = logoLight;
  if (variant === 'dark') src = logoDark;
  else if (variant === 'symbol') src = symbolOnly;
  else if (variant === 'icon') src = appIconRed;

  return (
    <div
      className={`brand-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.625rem',
        textDecoration: 'none',
        lineHeight: 1,
      }}
    >
      <img
        src={src}
        alt="QuickCount Paskib"
        style={{
          height: `${height}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          flexShrink: 0,
        }}
        loading="eager"
      />
      {showSubtitle && (variant === 'symbol' || variant === 'icon') && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 800,
              fontSize: '1.25rem',
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            QUICKCOUNT
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: 'var(--color-red)',
              marginTop: '0.2rem',
              textTransform: 'uppercase',
            }}
          >
            PASKIBRA V2
          </span>
        </div>
      )}
    </div>
  );
};
