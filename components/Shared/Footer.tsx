"use client";

import { useTranslations } from "next-intl";
import { SiteLogo } from "@/data/techIcons";
import { contactData } from "@/data/contacts";

export default function Footer() {
  const t = useTranslations("header");

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: t("services"),     id: "services"     },
    { label: t("projects"),     id: "projects"     },
    { label: t("skills"),       id: "skills"       },
    { label: t("resume"),       id: "resume"       },
    { label: t("languages"),    id: "languages"    },
    { label: t("volunteering"), id: "volunteering" },
    { label: t("certificates"), id: "certificates" },
    { label: t("contact"),      id: "contact"      },
  ];

  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:  "var(--bg-primary)",
        borderTop:   "1px solid rgba(200,164,90,0.15)",
      }}
    >
      {/* ── Background ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(21,35,54,0.9) 0%, transparent 65%)",
        }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          {[60, 160, 260].map((y) => (
            <line key={y} x1="0" y1={y} x2="100%" y2={y}
              stroke="rgba(200,164,90,0.7)" strokeWidth="0.5" />
          ))}
          <path d="M 60 40 L 60 90 L 110 90"       fill="none" stroke="rgba(200,164,90,0.7)" strokeWidth="1.2" />
          <path d="M 1140 260 L 1140 210 L 1090 210" fill="none" stroke="rgba(200,164,90,0.7)" strokeWidth="1.2" />
          <line x1="80" y1="0" x2="80" y2="100%" stroke="rgba(200,164,90,0.15)" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-14">

        {/* ── Top rule ─────────────────────────────── */}
        <div className="flex items-center gap-4 mb-12">
          <span className="block h-px flex-1"
            style={{ background: "linear-gradient(90deg, transparent, rgba(200,164,90,0.35))" }} />
          <span style={{ color: "var(--gold-dim)", fontSize: "0.5rem", letterSpacing: "0.3em" }}>✦</span>
          <span className="block h-px flex-1"
            style={{ background: "linear-gradient(90deg, rgba(200,164,90,0.35), transparent)" }} />
        </div>

        {/* ── Main content ─────────────────────────── */}
        <div className="flex flex-col items-center gap-10">

          {/* Logo + email */}
          <div className="flex flex-col items-center gap-3">
            <img src={SiteLogo} alt="Logo" width={52} height={52} />
            <span
              style={{
                color: "var(--slate)",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                fontFamily: "'Sora', sans-serif",
              }}
            >
              {contactData.email}
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(link.id)}
                className="group relative"
                style={{
                  color: "var(--cream-dim)",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily: "'Sora', sans-serif",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--cream-dim)")}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 start-0 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: "var(--gold)" }}
                />
              </button>
            ))}
          </nav>

          {/* Bottom rule */}
          <div className="w-full flex items-center gap-4">
            <span className="block h-px flex-1"
              style={{ background: "linear-gradient(90deg, transparent, rgba(200,164,90,0.2))" }} />
            <span style={{ color: "var(--gold-dim)", fontSize: "0.45rem" }}>✦</span>
            <span className="block h-px flex-1"
              style={{ background: "linear-gradient(90deg, rgba(200,164,90,0.2), transparent)" }} />
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            {/* Section stamp */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: "1px solid rgba(200,164,90,0.18)", borderRadius: "2px",
              padding: "4px 12px", background: "rgba(200,164,90,0.04)",
            }}>
              <span style={{
                color: "var(--gold-dim)", fontSize: "0.55rem",
                letterSpacing: "0.22em", textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif", fontWeight: 600,
              }}>
                § {t("endOfDocument")}
              </span>
            </div>

            <span style={{ color: "rgba(200,164,90,0.25)", fontSize: "0.6rem" }}>—</span>

            <p style={{
              color: "var(--slate)",
              fontSize: "0.72rem",
              fontFamily: "'Sora', sans-serif",
              letterSpacing: "0.08em",
            }}>
              © {year} {t("allRightsReserved")} &nbsp;·&nbsp;{" "}
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "var(--gold-dim)",
                fontWeight: 700,
              }}>
                Sedanur AL-Rawi
              </span>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}