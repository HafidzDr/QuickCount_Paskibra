import React, { useState, useEffect, useRef } from 'react';
import { AUTH_CAROUSEL_SLIDES, CarouselSlide } from '../../data/carouselSlides';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface AuthCarouselProps {
  slides?: CarouselSlide[];
  intervalMs?: number;
}

export const AuthCarousel: React.FC<AuthCarouselProps> = ({
  slides = AUTH_CAROUSEL_SLIDES,
  intervalMs = 6000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    if (mq.matches) {
      setIsPlaying(false);
    }

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsPlaying(false);
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Handle document visibility (pause autoplay when tab is inactive)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else if (isPlaying && !prefersReducedMotion) {
        startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isPlaying, prefersReducedMotion]);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
  };

  useEffect(() => {
    if (isPlaying && !prefersReducedMotion) {
      startTimer();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, prefersReducedMotion, slides.length, intervalMs]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    if (isPlaying && !prefersReducedMotion) {
      startTimer();
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    if (isPlaying && !prefersReducedMotion) {
      startTimer();
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    if (isPlaying && !prefersReducedMotion) {
      startTimer();
    }
  };

  return (
    <div
      className="auth-carousel-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '100svh',
        overflow: 'hidden',
        backgroundColor: '#0A0C10',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        userSelect: 'none',
      }}
      aria-roledescription="carousel"
      aria-label="Dokumentasi Paskibra Nasional"
    >
      {/* Background Images with smooth crossfade */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              visibility: isActive ? 'visible' : 'hidden',
              transition: prefersReducedMotion ? 'none' : 'opacity 0.8s ease-in-out',
              zIndex: isActive ? 1 : 0,
            }}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(0.72) contrast(1.08)',
              }}
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
            {/* Subtle Editorial Dark Gradient Overlay to ensure text readability */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(10, 12, 16, 0.4) 0%, rgba(10, 12, 16, 0.2) 40%, rgba(10, 12, 16, 0.88) 100%)',
              }}
            />
          </div>
        );
      })}

      {/* Top Header Tag inside Visual Panel */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '2.5rem 3rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#DC2626',
              display: 'inline-block',
              borderRadius: '1px',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#FBFBFA',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {slides[currentIndex].tagline}
          </span>
        </div>

        {slides[currentIndex].accentBadge && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#FFFFFF',
              background: 'rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(8px)',
              padding: '0.25rem 0.625rem',
              border: '1px solid rgba(255, 255, 255, 0.24)',
              borderRadius: '2px',
            }}
          >
            {slides[currentIndex].accentBadge}
          </span>
        )}
      </div>

      {/* Bottom Content Area with Editorial Typography */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '2rem 3rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <div style={{ maxWidth: '520px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.875rem, 3.2vw, 2.5rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem',
            }}
          >
            {slides[currentIndex].title}
          </h2>
          <p
            style={{
              color: '#E2E4E8',
              fontSize: '0.9375rem',
              lineHeight: 1.6,
              fontWeight: 400,
              opacity: 0.9,
            }}
          >
            {slides[currentIndex].description}
          </p>
        </div>

        {/* Carousel Indicators & Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(226, 228, 232, 0.2)',
          }}
        >
          {/* Slide Indicator Bars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Pindah ke slide ${idx + 1}`}
                style={{
                  height: '4px',
                  width: idx === currentIndex ? '32px' : '14px',
                  backgroundColor: idx === currentIndex ? '#DC2626' : 'rgba(255, 255, 255, 0.35)',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  padding: 0,
                  border: 'none',
                }}
              />
            ))}
          </div>

          {/* Navigation Controls: Prev, Play/Pause, Next */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Slide sebelumnya"
              style={{
                width: '32px',
                height: '32px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                borderRadius: '2px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'background 0.15s ease',
              }}
            >
              <ChevronLeft size={16} />
            </button>

            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Jeda otomatis slide' : 'Putar otomatis slide'}
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  borderRadius: '2px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'background 0.15s ease',
                }}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              </button>
            )}

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Slide berikutnya"
              style={{
                width: '32px',
                height: '32px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                borderRadius: '2px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'background 0.15s ease',
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
