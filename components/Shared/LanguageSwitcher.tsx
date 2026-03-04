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
  const locale   = useLocale() as Locale;
  const router   = useRouter();
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

  return (
    <div className="relative" ref={dropdownRef}>

      {/* ── Trigger ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Language selection"
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          padding: '8px 16px',
          background: isOpen ? 'rgba(201,116,138,0.10)' : 'transparent',
          border: `1px solid ${isOpen ? 'rgba(201,116,138,0.45)' : 'rgba(201,116,138,0.22)'}`,
          borderRadius: '100px',
          color: isOpen ? 'var(--rose-light, #e8a0b0)' : 'rgba(196,181,165,0.80)',
          fontSize: '0.67rem',
          fontWeight: 400,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontFamily: "'Jost', sans-serif",
          cursor: 'pointer',
          transition: 'all 0.3s',
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor  = 'rgba(201,116,138,0.45)';
          el.style.color        = 'var(--rose-light, #e8a0b0)';
          el.style.background   = 'rgba(201,116,138,0.08)';
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'rgba(201,116,138,0.22)';
            el.style.color       = 'rgba(196,181,165,0.80)';
            el.style.background  = 'transparent';
          }
        }}
      >
        {/* Globe icon */}
        <svg
          width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
          style={{ opacity: 0.70 }}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
        </svg>

        <span>{languageNames[locale]}</span>

        <ChevronDown
          size={11}
          style={{
            transition: 'transform 0.35s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'rgba(201,116,138,0.55)',
          }}
        />
      </button>

      {/* ── Dropdown ── */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 10px)',
          left: 0,
          minWidth: '175px',
          background: 'rgba(45,31,46,0.96)',
          border: '1px solid rgba(201,116,138,0.18)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(201,116,138,0.08)',
          backdropFilter: 'blur(20px)',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s, transform 0.25s',
          zIndex: 70,
          overflow: 'hidden',
          padding: '8px',
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
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                background: isActive ? 'rgba(201,116,138,0.12)' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: isActive ? 'var(--rose-light, #e8a0b0)' : 'rgba(196,181,165,0.80)',
                fontSize: '0.67rem',
                fontWeight: isActive ? 500 : 400,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontFamily: "'Jost', sans-serif",
                cursor: 'pointer',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color      = 'var(--rose-light, #e8a0b0)';
                  el.style.background = 'rgba(201,116,138,0.10)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color      = 'rgba(196,181,165,0.80)';
                  el.style.background = 'transparent';
                }
              }}
            >
              <span>{languageNames[lang]}</span>

              {isActive ? (
                <Check size={11} style={{ color: 'var(--rose-light, #e8a0b0)', flexShrink: 0 }} />
              ) : (
                <span style={{
                  width: '11px',
                  color: 'rgba(201,116,138,0.40)',
                  fontSize: '0.75rem',
                  opacity: 0.6,
                }}>
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