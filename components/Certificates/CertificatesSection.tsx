"use client";

import { useState, useEffect, useRef } from "react";
import { Award, X, ChevronLeft, ChevronRight, ExternalLink, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";

/* ── Marquee ─────────────────────────────────────────────── */
function Marquee({
  reverse = false,
  pauseOnHover = false,
  children,
  repeat = 4,
}: {
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  repeat?: number;
}) {
  return (
    <div className={`group flex overflow-hidden [--gap:1.25rem] py-2`}>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`flex shrink-0 justify-around gap-5 ${
              reverse ? "animate-marquee-reverse" : "animate-marquee"
            } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

/* ── Certificate Card ─────────────────────────────────────── */
function CertificateCard({
  img, title, issuer, date, category, onClick,
}: {
  img: string; title: string; issuer: string;
  date: string; category: string; onClick: () => void;
}) {
  return (
    <figure
      onClick={onClick}
      className="group relative flex-shrink-0 w-72 cursor-pointer overflow-hidden"
      style={{
        borderRadius: "20px",
        border: "1px solid rgba(232,160,176,0.18)",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(8px)",
        transition: "border-color 0.35s, box-shadow 0.35s, transform 0.35s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(201,116,138,0.40)";
        el.style.boxShadow   = "0 20px 60px rgba(201,116,138,0.12), 0 4px 20px rgba(0,0,0,0.15)";
        el.style.transform   = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(232,160,176,0.18)";
        el.style.boxShadow   = "none";
        el.style.transform   = "translateY(0)";
      }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden" style={{ borderRadius: "20px 20px 0 0" }}>
        <img
          src={img} alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(45,31,46,0.90) 0%, rgba(45,31,46,0.25) 55%, transparent 100%)" }} />

        {/* Category pill */}
        <div
          className="absolute top-3 right-3"
          style={{
            padding: "3px 12px",
            background: "rgba(45,31,46,0.82)",
            border: "1px solid rgba(201,116,138,0.30)",
            borderRadius: "100px",
            backdropFilter: "blur(8px)",
          }}
        >
          <span style={{
            color: "var(--rose-light, #e8a0b0)",
            fontSize: "0.58rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "'Jost', sans-serif",
          }}>
            {category}
          </span>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 left-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ borderTop: "1.5px solid rgba(201,116,138,0.55)", borderLeft: "1.5px solid rgba(201,116,138,0.55)", borderRadius: "20px 0 0 0" }} />
      </div>

      {/* Body */}
      <div className="p-4 relative">
        {/* Soft divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, rgba(232,160,176,0.30), transparent)",
          marginBottom: "12px",
        }} />

        <figcaption
          className="relative z-10 mb-1 leading-snug line-clamp-2 group-hover:text-[var(--rose-light,#e8a0b0)] transition-colors duration-300"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1rem",
            fontWeight: 500,
            color: "var(--cream, #f5ece0)",
          }}
        >
          {title}
        </figcaption>
        <p style={{ color: "rgba(196,181,165,0.65)", fontSize: "0.78rem", fontFamily: "'Jost', sans-serif", fontWeight: 300, marginBottom: "2px" }}>
          {issuer}
        </p>
        <p style={{ color: "rgba(196,181,165,0.40)", fontSize: "0.68rem", fontFamily: "'Jost', sans-serif", letterSpacing: "0.08em" }}>
          {date}
        </p>

        {/* Animated bottom line */}
        <div
          className="mt-4 h-px w-0 group-hover:w-3/4 transition-all duration-700"
          style={{ background: "linear-gradient(90deg, rgba(201,116,138,0.6), rgba(201,169,110,0.3), transparent)" }}
        />
      </div>
    </figure>
  );
}

/* ── Main Component ───────────────────────────────────────── */
export default function Certificates() {
  const t = useTranslations("certificates");
  const [isVisible, setIsVisible]          = useState(false);
  const [selectedCertificate, setSelected] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const rawCerts = t.raw("certificates") as Array<{
    title: string; issuer: string; date: string;
    category: string; img: string; link: string;
  }>;

  const certificates = rawCerts.map((cert) => ({
    ...cert,
    category: t(`categories.${cert.category}`),
  }));

  const firstRow  = certificates.slice(0, Math.ceil(certificates.length / 2));
  const secondRow = certificates.slice(Math.ceil(certificates.length / 2));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openModal = (i: number) => {
    setSelected(i);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setSelected(null);
    document.body.style.overflow = "unset";
  };
  const next = () => setSelected((s) => s !== null ? (s + 1) % certificates.length : 0);
  const prev = () => setSelected((s) => s !== null ? (s - 1 + certificates.length) % certificates.length : 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedCertificate === null) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "Escape")     closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedCertificate]);

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="relative overflow-hidden py-24"
      style={{
        background:      "var(--bg-primary)",
        scrollMarginTop: "25px",
      }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", width: "600px", height: "600px",
          top: "-150px", right: "-150px", borderRadius: "50%",
          filter: "blur(120px)", opacity: 0.30,
          background: "radial-gradient(circle, rgba(232,160,176,0.25) 0%, rgba(201,116,138,0.08) 50%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", width: "500px", height: "500px",
          bottom: "-100px", left: "-100px", borderRadius: "50%",
          filter: "blur(120px)", opacity: 0.20,
          background: "radial-gradient(circle, rgba(226,201,138,0.18) 0%, transparent 70%)",
        }} />

        {/* SVG rules + corner brackets */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          {[120, 250, 380, 510, 640, 770].map((y) => (
            <line key={y} x1="0" y1={y} x2="100%" y2={y}
              stroke="rgba(201,116,138,0.7)" strokeWidth="0.5" />
          ))}
          <path d="M 60 60 L 60 110 L 110 110"
            fill="none" stroke="rgba(201,116,138,0.8)" strokeWidth="1.2" />
          <path d="M 1140 750 L 1140 700 L 1090 700"
            fill="none" stroke="rgba(201,116,138,0.8)" strokeWidth="1.2" />
        </svg>

        {/* Subtle floral watermark */}
        <svg className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.04]" width="220" height="220" viewBox="0 0 220 220">
          {[0,45,90,135,180,225,270,315].map((deg, i) => (
            <ellipse key={i} cx="110" cy="110" rx="18" ry="50"
              fill="rgba(201,116,138,1)"
              transform={`rotate(${deg} 110 110) translate(0,-58)`} />
          ))}
          <circle cx="110" cy="110" r="16" fill="rgba(201,116,138,1)" />
        </svg>
      </div>

      <div className="relative z-10">

        {/* ── Section Header ── */}
        <div className={`text-center mb-14 px-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>

          {/* Pill label */}
          <div className="flex justify-center mb-6">
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 20px",
              background: "rgba(201,116,138,0.10)",
              border: "1px solid rgba(201,116,138,0.22)",
              borderRadius: "100px",
              color: "var(--rose-light, #e8a0b0)",
              fontSize: "0.6rem", fontWeight: 500,
              letterSpacing: "0.28em", textTransform: "uppercase",
              fontFamily: "'Jost', sans-serif",
            }}>
              <span style={{ display: "block", width: "4px", height: "4px", borderRadius: "50%", background: "currentColor" }} />
              § 08 — {t("sectionCategory")}
            </span>
          </div>

          {/* Title */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div style={{
              width: "48px", height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, rgba(232,160,176,0.20) 0%, rgba(201,169,110,0.12) 100%)",
              border: "1px solid rgba(232,160,176,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Award size={20} style={{ color: "var(--rose-light, #e8a0b0)", strokeWidth: 1.5 }} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 400,
              background: "linear-gradient(145deg, #f7f0e0 0%, #e8a0b0 50%, #c9748a 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              lineHeight: 1.2, letterSpacing: "0.02em",
            }}>
              {t("title")}
            </h2>
          </div>

          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic", fontWeight: 300,
            color: "rgba(196,181,165,0.75)",
            fontSize: "1.1rem", maxWidth: "540px",
            margin: "0 auto", lineHeight: 1.85,
          }}>
            {t("subtitle")}
          </p>

          {/* Count badge */}
          <div className="flex justify-center mt-6">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "7px 20px",
              border: "1px solid rgba(201,116,138,0.28)",
              borderRadius: "100px",
              background: "rgba(201,116,138,0.07)",
            }}>
              <BookOpen size={14} style={{ color: "var(--rose-light, #e8a0b0)" }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "var(--rose-light, #e8a0b0)",
                fontSize: "1rem", fontWeight: 600,
              }}>
                {certificates.length}+
              </span>
              <span style={{
                color: "rgba(196,181,165,0.65)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: "'Jost', sans-serif",
              }}>
                {t("certificatesCount")}
              </span>
            </div>
          </div>

          {/* Ornament */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, transparent, rgba(201,116,138,0.45))" }} />
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M8 1 Q9.5 4 13 4 Q9.5 5.5 8 9 Q6.5 5.5 3 4 Q6.5 4 8 1Z" fill="rgba(201,116,138,0.55)" />
            </svg>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, rgba(201,116,138,0.45), transparent)" }} />
          </div>
        </div>

        {/* ── Marquee Rows ── */}
        <div className={`relative transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <Marquee pauseOnHover repeat={4}>
            {firstRow.map((cert, idx) => (
              <CertificateCard key={idx} {...cert} onClick={() => openModal(idx)} />
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover repeat={4}>
            {secondRow.map((cert, idx) => (
              <CertificateCard key={idx} {...cert}
                onClick={() => openModal(firstRow.length + idx)} />
            ))}
          </Marquee>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32"
            style={{ background: "linear-gradient(90deg, var(--bg-primary), transparent)" }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32"
            style={{ background: "linear-gradient(270deg, var(--bg-primary), transparent)" }} />
        </div>
      </div>

      {/* ── Modal ── */}
      {selectedCertificate !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(45,31,46,0.92)", backdropFilter: "blur(16px)" }}
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full overflow-hidden"
            style={{
              borderRadius: "24px",
              border: "1px solid rgba(201,116,138,0.28)",
              background: "rgba(45,31,46,0.97)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,116,138,0.10)",
              backdropFilter: "blur(20px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 flex items-center justify-center transition-all duration-300"
              style={{
                width: "36px", height: "36px",
                border: "1px solid rgba(201,116,138,0.25)", borderRadius: "10px",
                background: "rgba(45,31,46,0.90)", backdropFilter: "blur(8px)",
                color: "rgba(196,181,165,0.70)", cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(201,116,138,0.55)";
                el.style.color = "var(--rose-light, #e8a0b0)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(201,116,138,0.25)";
                el.style.color = "rgba(196,181,165,0.70)";
              }}
            >
              <X size={16} />
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-300"
              style={{
                width: "36px", height: "36px",
                border: "1px solid rgba(201,116,138,0.25)", borderRadius: "10px",
                background: "rgba(45,31,46,0.90)", backdropFilter: "blur(8px)",
                color: "rgba(196,181,165,0.70)", cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(201,116,138,0.55)";
                el.style.color = "var(--rose-light, #e8a0b0)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(201,116,138,0.25)";
                el.style.color = "rgba(196,181,165,0.70)";
              }}
            >
              <ChevronLeft size={16} />
            </button>

            {/* Next */}
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-300"
              style={{
                width: "36px", height: "36px",
                border: "1px solid rgba(201,116,138,0.25)", borderRadius: "10px",
                background: "rgba(45,31,46,0.90)", backdropFilter: "blur(8px)",
                color: "rgba(196,181,165,0.70)", cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(201,116,138,0.55)";
                el.style.color = "var(--rose-light, #e8a0b0)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(201,116,138,0.25)";
                el.style.color = "rgba(196,181,165,0.70)";
              }}
            >
              <ChevronRight size={16} />
            </button>

            {/* Image */}
            <div className="relative" style={{ background: "rgba(35,22,36,1)", borderRadius: "24px 24px 0 0", aspectRatio: "4/3" }}>
              <img
                src={certificates[selectedCertificate].img}
                alt={certificates[selectedCertificate].title}
                className="w-full h-full object-contain"
              />
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-10 h-10"
                style={{ borderTop: "1.5px solid rgba(201,116,138,0.40)", borderLeft: "1.5px solid rgba(201,116,138,0.40)", borderRadius: "24px 0 0 0" }} />
              <div className="absolute bottom-0 right-0 w-10 h-10"
                style={{ borderBottom: "1.5px solid rgba(201,116,138,0.40)", borderRight: "1.5px solid rgba(201,116,138,0.40)" }} />
            </div>

            {/* Footer info */}
            <div className="p-6" style={{ borderTop: "1px solid rgba(201,116,138,0.14)" }}>

              {/* Soft divider line */}
              <div style={{
                height: "1px",
                background: "linear-gradient(90deg, rgba(232,160,176,0.35), transparent)",
                marginBottom: "20px",
              }} />

              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  {/* Category pill */}
                  <div className="mb-3" style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "3px 14px",
                    border: "1px solid rgba(201,116,138,0.25)",
                    borderRadius: "100px",
                    background: "rgba(201,116,138,0.08)",
                  }}>
                    <span style={{
                      color: "var(--rose-light, #e8a0b0)", fontSize: "0.58rem", fontWeight: 500,
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      fontFamily: "'Jost', sans-serif",
                    }}>
                      {certificates[selectedCertificate].category}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                    fontWeight: 500,
                    color: "var(--cream, #f5ece0)",
                    marginBottom: "6px",
                    lineHeight: 1.3,
                  }}>
                    {certificates[selectedCertificate].title}
                  </h3>

                  <p style={{ color: "rgba(196,181,165,0.70)", fontSize: "0.88rem", fontFamily: "'Jost', sans-serif", fontWeight: 300, marginBottom: "3px" }}>
                    {certificates[selectedCertificate].issuer}
                  </p>
                  <p style={{ color: "rgba(196,181,165,0.45)", fontSize: "0.75rem", fontFamily: "'Jost', sans-serif", letterSpacing: "0.08em" }}>
                    {certificates[selectedCertificate].date}
                  </p>
                </div>

                {/* Counter */}
                <div style={{
                  padding: "6px 16px",
                  border: "1px solid rgba(201,116,138,0.20)",
                  borderRadius: "100px",
                  background: "rgba(201,116,138,0.06)",
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "rgba(232,160,176,0.70)", fontSize: "0.85rem", fontWeight: 600,
                  }}>
                    {String(selectedCertificate + 1).padStart(2, "0")}
                    <span style={{ color: "rgba(201,116,138,0.30)", margin: "0 4px" }}>/</span>
                    {String(certificates.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={certificates[selectedCertificate].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-all duration-300"
                style={{
                  padding: "10px 26px",
                  background: "linear-gradient(135deg, #e8a0b0 0%, #c9748a 55%, #9a5268 100%)",
                  color: "#2d1f2e",
                  borderRadius: "100px",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 38px rgba(201,116,138,0.32)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {t("viewCertificate")}
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Keyframes ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 1.25rem)); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(calc(-100% - 1.25rem)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee         { animation: marquee         60s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 60s linear infinite; }
      ` }} />
    </section>
  );
}