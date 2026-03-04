'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible,      setIsVisible]      = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [perimeter,      setPerimeter]      = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY          = window.scrollY;
      const scrollHeight     = document.documentElement.scrollHeight;
      const clientHeight     = window.innerHeight;
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

  /* Measure the real flower path length after mount */
  useEffect(() => {
    if (pathRef.current) {
      setPerimeter(pathRef.current.getTotalLength());
    }
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  /*
   * Flower-shaped progress border using an SVG <path>.
   * 8 petals built from quadratic Bézier curves.
   * Stroke is animated via strokeDashoffset — same technique as the original circle.
   */
  const SIZE         = 60;
  const CENTER       = SIZE / 2;
  const PETALS       = 8;
  const PETAL_OUTER  = 26;
  const PETAL_INNER  = 14;

  const flowerPath = (() => {
    let d = '';
    for (let i = 0; i < PETALS; i++) {
      const a1  = (i / PETALS)         * Math.PI * 2 - Math.PI / 2;
      const a2  = ((i + 1) / PETALS)   * Math.PI * 2 - Math.PI / 2;
      const tip = ((i + 0.5) / PETALS) * Math.PI * 2 - Math.PI / 2;

      const x1   = CENTER + Math.cos(a1)  * PETAL_INNER;
      const y1   = CENTER + Math.sin(a1)  * PETAL_INNER;
      const tipX = CENTER + Math.cos(tip) * PETAL_OUTER;
      const tipY = CENTER + Math.sin(tip) * PETAL_OUTER;
      const x2   = CENTER + Math.cos(a2)  * PETAL_INNER;
      const y2   = CENTER + Math.sin(a2)  * PETAL_INNER;

      const cp1x = CENTER + Math.cos((a1  + tip) / 2) * (PETAL_OUTER + 4);
      const cp1y = CENTER + Math.sin((a1  + tip) / 2) * (PETAL_OUTER + 4);
      const cp2x = CENTER + Math.cos((tip + a2)  / 2) * (PETAL_OUTER + 4);
      const cp2y = CENTER + Math.sin((tip + a2)  / 2) * (PETAL_OUTER + 4);

      d += i === 0 ? `M ${x1} ${y1} ` : `L ${x1} ${y1} `;
      d += `Q ${cp1x} ${cp1y} ${tipX} ${tipY} `;
      d += `Q ${cp2x} ${cp2y} ${x2} ${y2} `;
    }
    return d + 'Z';
  })();

  const dashOffset = perimeter > 0 ? perimeter * (1 - scrollProgress / 100) : 0;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUpIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes flowerSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .scroll-top-enter { animation: slideUpIn 0.4s ease-out; }
        .flower-spin {
          transform-origin: ${CENTER}px ${CENTER}px;
          animation: flowerSpin 10s linear infinite;
        }
      ` }} />

      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="scroll-top-enter fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group"
        >
          <div className="relative w-[46px] h-[46px]">

            {/* Flower SVG progress — sits just outside the button */}
            <svg
              width={SIZE} height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="absolute pointer-events-none"
              style={{
                top:  -(SIZE - 46) / 2,
                left: -(SIZE - 46) / 2,
                filter: "drop-shadow(0 0 4px rgba(201,116,138,0.35))",
              }}
            >
              <defs>
                <linearGradient id="roseFlower" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#e8a0b0" />
                  <stop offset="50%"  stopColor="#c9748a" />
                  <stop offset="100%" stopColor="#9a5268" />
                </linearGradient>
              </defs>

              {/* Track */}
              <path
                d={flowerPath}
                fill="none"
                stroke="rgba(201,116,138,0.12)"
                strokeWidth={2}
                className="flower-spin"
              />

              {/* Progress — starts from top, fills clockwise */}
              <path
                ref={pathRef}
                d={flowerPath}
                fill="none"
                stroke="url(#roseFlower)"
                strokeWidth={2.5}
                strokeDasharray={perimeter}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.25s ease" }}
                className="flower-spin"
              />
            </svg>

            {/* Button face */}
            <div
              className="relative w-full h-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
              style={{
                background: "linear-gradient(145deg, var(--navy-surface, #0f1f32) 0%, var(--navy-mid, #0d1b2a) 100%)",
                border: "1px solid rgba(201,116,138,0.35)",
                borderRadius: "50%",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(201,116,138,0.7)")}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(201,116,138,0.35)")}
            >
              {/* % label on hover */}
              <span
                className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                style={{
                  color: "var(--rose-light, #e8a0b0)",
                  fontSize: "0.5rem",
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                {Math.round(scrollProgress)}%
              </span>

              <ArrowUp
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
                style={{ color: "var(--rose-light, #e8a0b0)", strokeWidth: 2 }}
              />
            </div>
          </div>
        </button>
      )}
    </>
  );
}