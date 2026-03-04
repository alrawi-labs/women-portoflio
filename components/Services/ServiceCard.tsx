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

  /* Mouse-follow spotlight */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden feminine-card"
      style={{
        background: "radial-gradient(ellipse at center, var(--navy-surface) 0%, var(--navy-mid) 100%)",
        border: "1px solid rgba(221, 167, 165,0.08)",
        borderRadius: "32px",
        padding: "40px 32px",
        transition: "border-color 0.5s ease-in-out, transform 0.5s, box-shadow 0.5s",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 80}ms`,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(221, 167, 165,0.35)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 16px 48px rgba(221, 167, 165,0.08), inset 0 0 20px rgba(221, 167, 165,0.03)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(221, 167, 165,0.08)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = isVisible ? "translateY(0)" : "translateY(20px)";
      }}
    >
      {/* Mouse-follow spotlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background:
            "radial-gradient(480px circle at var(--mx) var(--my), rgba(221, 167, 165,0.07), transparent 50%)",
        }}
      />

      {/* Dot-grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1.5px 1.5px, rgba(221, 167, 165,0.07) 1px, transparent 0)",
          backgroundSize: "36px 36px",
          opacity: 0.7,
        }}
      />

      {/* Soft floating glow effect on hover */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl pointer-events-none"
        style={{ background: "rgba(221, 167, 165, 0.15)" }}
      />

      {/* ── Card content ───────────────────────────────── */}
      <div className="relative z-10">

        {/* Icon row + Roman numeral */}
        {/* Icon container */}
        <div className="flex items-center justify-between w-full mb-6">
          <div
            className="flex items-center justify-center transition-all duration-500 group-hover:scale-110"
            style={{
              width: "56px",
              height: "56px",
              border: "1px solid rgba(221, 167, 165,0.2)",
              borderRadius: "50%",
              background: "rgba(221, 167, 165,0.04)",
              transition: "background 0.5s, border-color 0.5s, transform 0.5s, box-shadow 0.5s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(221, 167, 165,0.12)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(221, 167, 165,0.4)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(221, 167, 165,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(221, 167, 165,0.04)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(221, 167, 165,0.2)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <Icon
              className="group-hover:text-[#dda7a5] transition-colors duration-500"
              style={{
                width: "24px",
                height: "24px",
                color: "var(--gold-dim)",
                strokeWidth: 1.5,
              }}
            />
          </div>
          
          {/* Subtle numbering */}
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.8rem",
              fontWeight: 300,
              color: "rgba(221, 167, 165,0.1)",
              transition: "color 0.5s",
            }}
            className="group-hover:!text-[rgba(221, 167, 165,0.25)]"
          >
            0{number}
          </span>
        </div>

        {/* Soft divider */}
        <div
          className="mb-5"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, rgba(221, 167, 165,0.2), transparent)",
            width: "60%",
            borderRadius: "1px",
          }}
        />

        {/* Title */}
        <h3
          className="mb-3 transition-colors duration-300"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "var(--cream)",
            lineHeight: 1.35,
          }}
        >
          <span
            className="group-hover:text-[var(--gold-light)] transition-colors duration-300"
            style={{ display: "inline" }}
          >
            {title}
          </span>
        </h3>

        {/* Description */}
        <p
          style={{
            color: "rgba(184,176,160,0.65)",
            fontSize: "0.88rem",
            lineHeight: 1.75,
            fontFamily: "'Sora', sans-serif",
            transition: "color 0.3s",
          }}
          className="group-hover:!text-[var(--cream-dim)]"
        >
          {description}
        </p>

        {/* Animated bottom rule */}
        <div
          className="mt-6 h-px w-0 group-hover:w-full transition-all duration-700"
          style={{
            background:
              "linear-gradient(90deg, var(--gold-dim), var(--gold), transparent)",
          }}
        />
      </div>
    </div>
  );
}