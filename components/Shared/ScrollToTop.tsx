'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollableHeight = scrollHeight - clientHeight;

      setIsVisible(scrollY > 500);
      setScrollProgress(
        scrollableHeight > 0
          ? Math.min((scrollY / scrollableHeight) * 100, 100)
          : 0
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  /*
   * Circular progress calculations.
   */
  const SIZE = 56;
  const STROKE = 2.5;
  const RADIUS = (SIZE - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dashOffset = CIRCUMFERENCE - (scrollProgress / 100) * CIRCUMFERENCE;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUpIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .scroll-top-enter { animation: slideUpIn 0.4s ease-out; }
      ` }} />

      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="scroll-top-enter fixed bottom-8 right-8 z-[100] group"
        >
          <div className="relative w-[50px] h-[50px] flex items-center justify-center">

            {/* Circular SVG progress ring */}
            <svg
              width={SIZE}
              height={SIZE}
              className="absolute pointer-events-none -rotate-90"
              style={{
                filter: "drop-shadow(0 0 8px rgba(221, 167, 165, 0.3))",
              }}
            >
              {/* Track */}
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="rgba(221, 167, 165, 0.1)"
                strokeWidth={STROKE}
              />
              {/* Progress */}
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth={STROKE}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--gold-light, #f0c4c2)" />
                  <stop offset="50%" stopColor="var(--gold, #dda7a5)" />
                  <stop offset="100%" stopColor="var(--gold-dim, #b3817e)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Button face */}
            <div
              className="relative w-full h-full flex items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110 shadow-lg overflow-hidden"
              style={{
                background: "rgba(56, 45, 66, 0.8)", // --navy-surface with opacity
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(221, 167, 165, 0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(221, 167, 165, 0.6)";
                e.currentTarget.style.background = "rgba(56, 45, 66, 0.95)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(221, 167, 165, 0.25)";
                e.currentTarget.style.background = "rgba(56, 45, 66, 0.8)";
              }}
            >
              {/* Hover label */}
              <span
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--navy-surface)]"
                style={{
                  color: "var(--gold-light, #f0c4c2)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {Math.round(scrollProgress)}%
              </span>

              <ArrowUp
                size={20}
                className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4"
                style={{ color: "var(--gold, #dda7a5)", strokeWidth: 2.5 }}
              />
            </div>
          </div>
        </button>
      )}
    </>
  );
}
