"use client";

import { useRef } from "react";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
  isVisible: boolean;
}

export default function ServiceCard({
  number,
  title,
  description,
  icon: Icon,
  index,
  isVisible,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <style>{`
        @keyframes softFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
      `}</style>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(232,160,176,0.18)",
          borderRadius: "20px",
          padding: "36px 32px",
          transition: "all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transitionDelay: `${index * 80}ms`,
          cursor: "default",
          backdropFilter: "blur(8px)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background    = "rgba(255,255,255,0.07)";
          el.style.borderColor   = "rgba(201,116,138,0.40)";
          el.style.boxShadow     = "0 20px 60px rgba(201,116,138,0.12), 0 4px 20px rgba(0,0,0,0.15)";
          el.style.transform     = "translateY(-6px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background  = "rgba(255,255,255,0.04)";
          el.style.borderColor = "rgba(232,160,176,0.18)";
          el.style.boxShadow   = "none";
          el.style.transform   = isVisible ? "translateY(0)" : "translateY(24px)";
        }}
      >
        {/* Soft glow spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
          style={{
            borderRadius: "20px",
            background: "radial-gradient(400px circle at var(--mx) var(--my), rgba(201,116,138,0.06), transparent 60%)",
          }}
        />

        {/* Tiny floral accent — top right */}
        <svg
          className="absolute top-5 right-5 opacity-20 group-hover:opacity-40 transition-opacity duration-400"
          width="28" height="28" viewBox="0 0 28 28" fill="none"
        >
          <circle cx="14" cy="14" r="2.5" fill="rgba(201,116,138,0.8)" />
          {[0,60,120,180,240,300].map((deg, i) => (
            <ellipse key={i}
              cx="14" cy="14" rx="2" ry="5.5"
              fill="rgba(201,116,138,0.5)"
              transform={`rotate(${deg} 14 14) translate(0 -8)`}
              opacity="0.7"
            />
          ))}
        </svg>

        <div className="relative z-10">

          {/* Icon + number row */}
          <div className="flex items-start justify-between mb-6">
            <div
              style={{
                width: "52px", height: "52px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(232,160,176,0.20) 0%, rgba(201,169,110,0.12) 100%)",
                border: "1px solid rgba(232,160,176,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.4s",
              }}
              className="group-hover:scale-110 group-hover:!border-[rgba(201,116,138,0.45)] transition-all duration-400"
            >
              <Icon style={{ width: "22px", height: "22px", color: "var(--rose-light,#e8a0b0)", strokeWidth: 1.5 }} />
            </div>

            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "2.4rem", fontWeight: 300,
              color: "rgba(232,160,176,0.15)",
              lineHeight: 1,
              transition: "color 0.4s",
            }}
              className="group-hover:!text-[rgba(201,116,138,0.28)]"
            >
              {String(number).padStart(2, "0")}
            </span>
          </div>

          {/* Soft divider */}
          <div style={{
            height: "1px",
            background: "linear-gradient(90deg, rgba(232,160,176,0.35), transparent)",
            marginBottom: "20px",
          }} />

          {/* Title */}
          <h3
            className="mb-3 group-hover:text-[var(--rose-light,#e8a0b0)] transition-colors duration-300"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.3rem", fontWeight: 500,
              color: "var(--cream,#f5ece0)",
              lineHeight: 1.3, letterSpacing: "0.01em",
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p style={{
            fontFamily: "'Jost', sans-serif",
            color: "rgba(196,181,165,0.70)",
            fontSize: "0.87rem", lineHeight: 1.8, fontWeight: 300,
          }}
            className="group-hover:!text-[var(--cream-dim,#c4b5a5)]"
          >
            {description}
          </p>

          {/* Animated bottom line */}
          <div
            className="mt-6 h-px w-0 group-hover:w-3/4 transition-all duration-700"
            style={{ background: "linear-gradient(90deg, rgba(201,116,138,0.6), rgba(201,169,110,0.3), transparent)" }}
          />
        </div>
      </div>
    </>
  );
}