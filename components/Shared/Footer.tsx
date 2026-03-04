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
        borderTop:   "1px solid rgba(221, 167, 165,0.15)",
      }}
    >
      {/* ── Background ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(221, 167, 165, 0.06) 0%, transparent 65%)",
        }} />
        <div className="absolute inset-0 w-full h-full opacity-20 flex flex-col justify-around py-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.25), transparent)" }} />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-14">

        {/* ── Top rule ─────────────────────────────── */}
        <div className="flex items-center gap-4 mb-12">
          <span className="block h-px flex-1"
            style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.4))" }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(221, 167, 165,0.5)", boxShadow: "0 0 8px rgba(221, 167, 165,0.4)" }} />
          <span className="block h-px flex-1"
            style={{ background: "linear-gradient(90deg, rgba(221, 167, 165,0.4), transparent)" }} />
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
                  ((e.currentTarget as HTMLElement).style.color = "#dda7a5")}
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--cream-dim)")}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 start-0 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: "rgba(221, 167, 165,0.7)" }}
                />
              </button>
            ))}
          </nav>

          {/* Bottom rule */}
          <div className="w-full flex items-center gap-4">
            <span className="block h-px flex-1"
              style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.25))" }} />
            <span className="w-1 h-1 rounded-full" style={{ background: "rgba(221, 167, 165,0.4)" }} />
            <span className="block h-px flex-1"
              style={{ background: "linear-gradient(90deg, rgba(221, 167, 165,0.25), transparent)" }} />
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            {/* Section stamp */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: "1px solid rgba(221, 167, 165,0.2)", borderRadius: "24px",
              padding: "5px 16px", background: "rgba(221, 167, 165,0.04)",
            }}>
              <span style={{
                color: "rgba(221, 167, 165,0.7)", fontSize: "0.55rem",
                letterSpacing: "0.22em", textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif", fontWeight: 500,
              }}>
                ✦ &nbsp; {t("endOfDocument")}
              </span>
            </div>

            <span style={{ color: "rgba(221, 167, 165,0.3)", fontSize: "0.6rem" }}>—</span>

            <p style={{
              color: "var(--slate)",
              fontSize: "0.72rem",
              fontFamily: "'Sora', sans-serif",
              letterSpacing: "0.08em",
            }}>
              © {year} {t("allRightsReserved")} &nbsp;·&nbsp;{" "}
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "rgba(221, 167, 165,0.8)",
                fontWeight: 700,
              }}>
                Zeynep AL-Rawi
              </span>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}