'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { routing, type Locale } from '@/i18n/routing';
import { ChevronDown, Check } from 'lucide-react';
import { systemLanguages } from '@/data/systemLanguages';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale  = useLocale() as Locale;
  const router  = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  const languageNames = Object.fromEntries(
    systemLanguages.map((lang) => [lang.code, lang.name])
  ) as Record<Locale, string>;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roseGold = {
    light: '#f0c4c2',
    main: '#dda7a5',
    dark: '#b3817e',
    glow: 'rgba(221, 167, 165, 0.4)',
    border: 'rgba(221, 167, 165, 0.2)',
    bgGlow: 'rgba(221, 167, 165, 0.08)',
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ── Trigger ───────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Language selection"
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 18px',
          background: 'transparent',
          border: `1px solid ${isOpen ? roseGold.main : roseGold.border}`,
          borderRadius: '4px',
          color: isOpen ? roseGold.main : 'var(--cream-dim)',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: "'Playfair Display', serif",
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
          backdropFilter: 'blur(12px)',
          backgroundColor: isOpen ? 'rgba(221, 167, 165, 0.1)' : 'rgba(221, 167, 165, 0.04)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = roseGold.main;
          el.style.color = roseGold.main;
          el.style.transform = 'scale(1.02)';
          el.style.backgroundColor = 'rgba(221, 167, 165, 0.08)';
          el.style.boxShadow = `0 4px 15px ${roseGold.bgGlow}`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = 'scale(1)';
          el.style.boxShadow = 'none';
          if (!isOpen) {
            el.style.borderColor = roseGold.border;
            el.style.color = 'var(--cream-dim)';
            el.style.backgroundColor = 'rgba(221, 167, 165, 0.04)';
          } else {
            el.style.backgroundColor = 'rgba(221, 167, 165, 0.1)';
          }
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.8, color: roseGold.main }}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
        </svg>

        <span style={{ paddingTop: '1px' }}>{languageNames[locale]}</span>

        <ChevronDown
          size={12}
          style={{
            transition: 'transform 0.4s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: roseGold.main,
            opacity: 0.6,
          }}
        />
      </button>

      {/* ── Dropdown ──────────────────────────────────── */}
      <div
        className="flex flex-col"
        style={{
          position: 'absolute',
          top: 'calc(100% + 12px)',
          right: 0,
          minWidth: '180px',
          background: 'linear-gradient(165deg, rgba(20, 15, 15, 0.98) 0%, rgba(10, 10, 15, 0.95) 100%)',
          border: `1px solid ${roseGold.border}`,
          borderTop: `2px solid ${roseGold.main}`,
          borderRadius: '4px',
          boxShadow: `0 25px 60px rgba(0,0,0,0.7), 0 0 30px ${roseGold.bgGlow}`,
          backdropFilter: 'blur(20px)',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
          zIndex: 100,
          overflow: 'hidden',
        }}
      >
        {(routing.locales as readonly Locale[]).map((lang, i) => {
          const isActive = locale === lang;
          return (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              style={{
                width: '100%',
                textAlign: 'start',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                background: isActive ? 'rgba(221, 167, 165, 0.12)' : 'transparent',
                border: 'none',
                borderBottom:
                  i < routing.locales.length - 1
                    ? `1px solid ${roseGold.border}`
                    : 'none',
                color: isActive ? roseGold.light : 'var(--cream-dim)',
                fontSize: '0.72rem',
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontFamily: isActive ? "'Playfair Display', serif" : "'Sora', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = roseGold.light;
                  (e.currentTarget as HTMLElement).style.background =
                    'rgba(221, 167, 165, 0.08)';
                  (e.currentTarget as HTMLElement).style.paddingLeft = '24px';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--cream-dim)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.paddingLeft = '20px';
                }
              }}
            >
              <span>{languageNames[lang]}</span>

              {isActive ? (
                <Check
                  size={12}
                  style={{ color: roseGold.main, flexShrink: 0 }}
                />
              ) : (
                /* Right chevron placeholder for alignment */
                <span
                  style={{
                    width: '11px',
                    color: 'var(--gold-dim)',
                    fontSize: '0.7rem',
                    opacity: 0.5,
                  }}
                >
                  ›
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}