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
        borderRadius: "24px",
        border: "1px solid rgba(221, 167, 165,0.15)",
        borderTop: "2px solid rgba(221, 167, 165,0.3)",
        background: "linear-gradient(145deg, var(--navy-surface, #0f1f32) 0%, var(--navy-mid, #0d1b2a) 100%)",
        transition: "box-shadow 0.4s, transform 0.4s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 0 0 1.5px #dda7a5, 0 16px 40px rgba(221, 167, 165,0.18)";
        el.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden" style={{ borderRadius: "22px 22px 0 0" }}>
        <img
          src={img} alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(13,27,42,0.9) 0%, rgba(13,27,42,0.3) 55%, transparent 100%)" }} />

        {/* Category pill */}
        <div
          className="absolute top-3 right-3"
          style={{
            padding: "3px 12px",
            background: "rgba(13,27,42,0.85)",
            border: "1px solid rgba(221, 167, 165,0.3)",
            borderRadius: "20px",
            backdropFilter: "blur(6px)",
          }}
        >
          <span style={{
            color: "#dda7a5",
            fontSize: "0.6rem", fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase",
            fontFamily: "'Sora', sans-serif",
          }}>
            {category}
          </span>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ borderTop: "1.5px solid var(--gold,#c8a45a)", borderLeft: "1.5px solid var(--gold,#c8a45a)" }} />
      </div>

      {/* Body */}
      <div className="p-4 relative">
        {/* Dot-grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(200,164,90,0.05) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }} />

        <figcaption
          className="relative z-10 mb-1 leading-snug line-clamp-2 group-hover:text-[var(--gold-light,#e0c07a)] transition-colors duration-300"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "var(--cream, #e8dcc8)",
          }}
        >
          {title}
        </figcaption>
        <p style={{ color: "var(--cream-dim,rgba(232,220,200,0.6))", fontSize: "0.78rem", fontFamily: "'Sora',sans-serif", marginBottom: "2px" }}>
          {issuer}
        </p>
        <p style={{ color: "var(--slate,rgba(232,220,200,0.4))", fontSize: "0.7rem", fontFamily: "'Sora',sans-serif", letterSpacing: "0.08em" }}>
          {date}
        </p>
      </div>
    </figure>
  );
}

/* ── Main Component ───────────────────────────────────────── */
export default function Certificates() {
  const t = useTranslations("certificates");
  const [isVisible, setIsVisible]           = useState(false);
  const [selectedCertificate, setSelected]  = useState<number | null>(null);
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

  /* Intersection observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Modal helpers */
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
        scrollMarginTop: "140px",
        borderBottom:    "1px solid rgba(200,164,90,0.08)",
      }}
    >
      {/* ── Background ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 55% 40% at 95% 15%, rgba(21,35,54,0.9) 0%, transparent 65%), " +
            "radial-gradient(ellipse 45% 40% at 5%  85%, rgba(28,47,68,0.6) 0%, transparent 65%)",
        }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          {[120, 250, 380, 510, 640, 770].map((y) => (
            <line key={y} x1="0" y1={y} x2="100%" y2={y}
              stroke="rgba(200,164,90,0.7)" strokeWidth="0.5" />
          ))}
          <path d="M 60 60 L 60 110 L 110 110" fill="none" stroke="rgba(200,164,90,0.8)" strokeWidth="1.2" />
          <path d="M 1140 750 L 1140 700 L 1090 700" fill="none" stroke="rgba(200,164,90,0.8)" strokeWidth="1.2" />
        </svg>
        {/* Watermark */}
        <svg width="100%" height="100%" viewBox="0 0 1200 800"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0.022 }}
        >
          <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle"
            fontSize="180" fill="none" stroke="rgba(200,164,90,0.8)" strokeWidth="1"
            fontWeight="700" fontFamily="'Playfair Display', Georgia, serif" letterSpacing="0.08em"
          >
            CERT
          </text>
        </svg>
      </div>

      <div className="relative z-10">

        {/* ── Section Header ──────────────────────── */}
        <div className={`text-center mb-14 px-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>

          {/* Section marker */}
          <div className="flex justify-center mb-6">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              border: "1px solid rgba(221, 167, 165,0.28)", borderRadius: "32px",
              padding: "6px 20px", background: "rgba(221, 167, 165,0.05)",
            }}>
              <span style={{
                color: "var(--gold-dim)", fontSize: "0.62rem",
                letterSpacing: "0.3em", textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif", fontWeight: 500,
              }}>
                ✨ &nbsp; {t("sectionCategory")}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <div style={{
              width: "52px", height: "52px",
              border: "1px solid rgba(221, 167, 165,0.3)", borderRadius: "50%",
              background: "rgba(221, 167, 165,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, boxShadow: "0 0 20px rgba(221, 167, 165,0.15)",
            }}>
              <Award size={22} style={{ color: "#dda7a5", strokeWidth: 1.5 }} />
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 800,
              background: "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 50%, #b3817e 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              lineHeight: 1.15,
            }}>
              {t("title")}
            </h2>
          </div>

          <p style={{
            color: "var(--cream-dim)", fontSize: "1rem",
            maxWidth: "540px", margin: "0 auto", lineHeight: 1.75,
            fontFamily: "'Sora', sans-serif",
          }}>
            {t("subtitle")}
          </p>

          {/* Count badge */}
          <div className="flex justify-center mt-6">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "7px 20px",
              border: "1px solid rgba(221, 167, 165,0.3)", borderRadius: "24px",
              background: "rgba(221, 167, 165,0.07)",
            }}>
              <BookOpen size={14} style={{ color: "#dda7a5" }} />
              <span style={{
                color: "#dda7a5", fontFamily: "'Playfair Display', serif",
                fontSize: "1rem", fontWeight: 700,
              }}>{certificates.length}+</span>
              <span style={{
                color: "rgba(221, 167, 165,0.6)", fontSize: "0.68rem",
                letterSpacing: "0.15em", textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif",
              }}>{t("certificatesCount")}</span>
            </div>
          </div>

          {/* Ornament */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="block h-px w-20" style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.6))" }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(221, 167, 165,0.6)", boxShadow: "0 0 10px rgba(221, 167, 165,0.5)" }} />
            <span className="block h-px w-20" style={{ background: "linear-gradient(90deg, rgba(221, 167, 165,0.6), transparent)" }} />
          </div>
        </div>

        {/* ── Marquee Rows ────────────────────────── */}
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

      {/* ── Modal ───────────────────────────────────── */}
      {selectedCertificate !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(8,16,28,0.97)", backdropFilter: "blur(12px)" }}
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full overflow-hidden"
            style={{
              borderRadius: "32px",
              border: "1px solid rgba(221, 167, 165,0.25)",
              borderTop: "2px solid #dda7a5",
              background: "linear-gradient(145deg, var(--navy-surface) 0%, var(--navy-mid) 100%)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(221, 167, 165,0.08)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 flex items-center justify-center transition-all duration-300"
              style={{
                width: "36px", height: "36px",
                border: "1px solid rgba(221, 167, 165,0.25)", borderRadius: "50%",
                background: "rgba(13,27,42,0.9)", backdropFilter: "blur(8px)",
                color: "var(--cream-dim)", cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(221, 167, 165,0.6)";
                (e.currentTarget as HTMLElement).style.color = "#dda7a5";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(221, 167, 165,0.25)";
                (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)";
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
                border: "1px solid rgba(200,164,90,0.3)", borderRadius: "2px",
                background: "rgba(13,27,42,0.9)", backdropFilter: "blur(8px)",
                color: "var(--cream-dim)", cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                (e.currentTarget as HTMLElement).style.color = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.3)";
                (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)";
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
                border: "1px solid rgba(200,164,90,0.3)", borderRadius: "2px",
                background: "rgba(13,27,42,0.9)", backdropFilter: "blur(8px)",
                color: "var(--cream-dim)", cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                (e.currentTarget as HTMLElement).style.color = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,164,90,0.3)";
                (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)";
              }}
            >
              <ChevronRight size={16} />
            </button>

            {/* Image */}
            <div className="relative bg-[#080f18]" style={{ aspectRatio: "4/3" }}>
              <img
                src={certificates[selectedCertificate].img}
                alt={certificates[selectedCertificate].title}
                className="w-full h-full object-contain"
              />
              {/* Corner decoration */}
              <div className="absolute top-0 left-0 w-10 h-10"
                style={{ borderTop: "2px solid rgba(200,164,90,0.4)", borderLeft: "2px solid rgba(200,164,90,0.4)" }} />
              <div className="absolute bottom-0 right-0 w-10 h-10"
                style={{ borderBottom: "2px solid rgba(200,164,90,0.4)", borderRight: "2px solid rgba(200,164,90,0.4)" }} />
            </div>

            {/* Footer info */}
            <div
              className="p-6"
              style={{ borderTop: "1px solid rgba(200,164,90,0.15)" }}
            >
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-5">
                <div className="flex-1">
                  {/* Category tag */}
                  <div className="mb-3" style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "3px 12px",
                    border: "1px solid rgba(200,164,90,0.3)", borderRadius: "2px",
                    background: "rgba(200,164,90,0.07)",
                  }}>
                    <span style={{
                      color: "var(--gold)", fontSize: "0.6rem", fontWeight: 700,
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      fontFamily: "'Sora', sans-serif",
                    }}>
                      {certificates[selectedCertificate].category}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                    fontWeight: 800,
                    color: "var(--cream)",
                    marginBottom: "6px",
                    lineHeight: 1.3,
                  }}>
                    {certificates[selectedCertificate].title}
                  </h3>

                  <p style={{ color: "var(--cream-dim)", fontSize: "0.9rem", fontFamily: "'Sora',sans-serif", marginBottom: "3px" }}>
                    {certificates[selectedCertificate].issuer}
                  </p>
                  <p style={{ color: "var(--slate)", fontSize: "0.78rem", fontFamily: "'Sora',sans-serif", letterSpacing: "0.08em" }}>
                    {certificates[selectedCertificate].date}
                  </p>
                </div>

                {/* Counter */}
                <div style={{
                  padding: "6px 16px",
                  border: "1px solid rgba(200,164,90,0.2)", borderRadius: "2px",
                  background: "rgba(200,164,90,0.05)",
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "var(--gold-dim)", fontSize: "0.8rem", fontWeight: 700,
                  }}>
                    {String(selectedCertificate + 1).padStart(2, "0")}
                    <span style={{ color: "rgba(200,164,90,0.3)", margin: "0 4px" }}>/</span>
                    {String(certificates.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={certificates[selectedCertificate].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  padding: "10px 24px",
                  background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%)",
                  color: "var(--navy)",
                  borderRadius: "2px",
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(200,164,90,0.4)"
                }
                onMouseLeave={(e) =>
                  (e.currentTarget as HTMLElement).style.boxShadow = "none"
                }
              >
                {t("viewCertificate")}
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Dot-grid overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(200,164,90,0.03) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }} />
          </div>
        </div>
      )}

      {/* ── Keyframes ──────────────────────────────── */}
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