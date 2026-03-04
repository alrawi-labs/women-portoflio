"use client";

import { useState, useEffect, useRef } from "react";
import { Code2, Layers, Brain, Database } from "lucide-react";
import { useTranslations } from "next-intl";

const ROMAN = ["I", "II", "III", "IV"];

export default function Skills() {
  const [isVisible,       setIsVisible]       = useState(false);
  const [activeCategory,  setActiveCategory]  = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("skills");

  const skillsData = [
    { icon: Code2,     title: t("categories.programmingLanguages"), skills: t.raw("skills.programmingLanguages") },
    { icon: Layers,    title: t("categories.frameworks"),           skills: t.raw("skills.frameworks")           },
    { icon: Brain,     title: t("categories.concepts"),             skills: t.raw("skills.concepts")             },
    { icon: Database,  title: t("categories.databases"),            skills: t.raw("skills.databases")            },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const current = skillsData[activeCategory];
  const Icon    = current.icon;

  /* ── Tab button style ── */
  const tabStyle = (active: boolean): React.CSSProperties => ({
    display:        "inline-flex",
    alignItems:     "center",
    gap:            "8px",
    padding:        "10px 22px",
    borderRadius:   "40px",
    fontWeight:     600,
    fontSize:       "0.68rem",
    letterSpacing:  "0.18em",
    textTransform:  "uppercase",
    fontFamily:     "'Sora', sans-serif",
    cursor:         "pointer",
    transition:     "all 0.4s ease",
    border:         active ? "1px solid transparent" : "1px solid rgba(221, 167, 165,0.25)",
    background:     active
      ? "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 100%)"
      : "rgba(221, 167, 165,0.04)",
    color:          active ? "var(--navy)" : "var(--cream-dim)",
    boxShadow:      active ? "0 8px 24px rgba(221, 167, 165,0.3)" : "none",
    transform:      active ? "translateY(-2px)" : "translateY(0)",
  });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24"
      style={{
        background:      "var(--navy-mid)",
        scrollMarginTop: "35px",
        borderTop:       "1px solid rgba(200,164,90,0.08)",
        borderBottom:    "1px solid rgba(200,164,90,0.08)",
      }}
    >
      {/* ── Background ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 55% 40% at 8% 20%, rgba(221, 167, 165, 0.07) 0%, transparent 65%), " +
            "radial-gradient(ellipse 45% 35% at 92% 80%, rgba(221, 167, 165, 0.05) 0%, transparent 65%)",
        }} />
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20 flex flex-col justify-between py-24">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.3), transparent)" }} />
          ))}
        </div>
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">

        {/* ── Section Header ─────────────────────────────── */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>

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

          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 800,
            background: "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 50%, #b3817e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "12px",
          }}>
            {t("title")}
          </h2>

          <p style={{
            color: "var(--cream-dim)", fontSize: "1rem",
            maxWidth: "580px", margin: "0 auto", lineHeight: 1.75,
            fontFamily: "'Sora', sans-serif",
          }}>
            {t("subtitle")}
          </p>

          {/* Soft ornament rule */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="block h-px w-20" style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.6))" }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(221, 167, 165,0.6)", boxShadow: "0 0 10px rgba(221, 167, 165,0.5)" }} />
            <span className="block h-px w-20" style={{ background: "linear-gradient(90deg, rgba(221, 167, 165,0.6), transparent)" }} />
          </div>
        </div>

        {/* ── Category Tabs ──────────────────────────────── */}
        <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {skillsData.map((cat, i) => {
            const CatIcon = cat.icon;
            const active  = activeCategory === i;
            return (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                style={tabStyle(active)}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(221, 167, 165,0.55)";
                    (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(221, 167, 165,0.25)";
                    (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)";
                  }
                }}
              >
                <CatIcon size={14} />
                <span className="hidden sm:inline">{cat.title}</span>
                {/* Number on mobile */}
                <span className="sm:hidden" style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.75rem",
                  fontWeight: 300,
                }}>
                  0{i + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Skills Display ─────────────────────────────── */}
        <div className={`transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>

          {/* Category header bar */}
          <div
            className="flex items-center gap-4 mb-8 p-5"
            style={{
              background: "radial-gradient(ellipse at top-left, var(--navy-surface) 0%, var(--navy-mid) 100%)",
              border: "1px solid rgba(221, 167, 165,0.12)",
              borderLeft: "3px solid #dda7a5",
              borderRadius: "32px",
            }}
          >
            {/* Icon box */}
            <div style={{
              width: "56px", height: "56px",
              border: "1px solid rgba(221, 167, 165,0.3)",
              borderRadius: "50%",
              background: "rgba(221, 167, 165,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 0 20px rgba(221, 167, 165,0.15)",
            }}>
              <Icon size={24} style={{ color: "#dda7a5", strokeWidth: 1.5 }} />
            </div>

            <div>
              {/* Category prefix */}
              <span style={{
                display: "block",
                color: "rgba(221, 167, 165,0.6)",
                fontSize: "0.58rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif",
                marginBottom: "3px",
              }}>
                ✨ &nbsp; {t("categoryPrefix")} 0{activeCategory + 1}
              </span>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "var(--cream)",
                lineHeight: 1.2,
              }}>
                {current.title}
              </h3>
            </div>

            {/* Count badge */}
            <div className="ml-auto" style={{
              padding: "6px 18px",
              border: "1px solid rgba(221, 167, 165,0.25)",
              borderRadius: "24px",
              background: "rgba(221, 167, 165,0.06)",
            }}>
              <span style={{
                color: "#dda7a5",
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
              }}>
                {current.skills.length}
              </span>
              <span style={{
                color: "rgba(221, 167, 165,0.6)",
                fontSize: "0.58rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif",
                marginLeft: "6px",
              }}>
                {t("skillsCount")}
              </span>
            </div>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {current.skills.map((skill: any, index: number) => (
              <div
                key={skill.name}
                className="group relative overflow-hidden"
                style={{
                  background: "radial-gradient(ellipse at top-left, var(--navy-surface) 0%, var(--navy-mid) 100%)",
                  border: "1px solid rgba(221, 167, 165,0.08)",
                  borderRadius: "24px",
                  padding: "18px 20px",
                  animation: isVisible
                    ? `skillFadeUp 0.55s ease-out ${index * 0.07}s both`
                    : "none",
                  cursor: "default",
                  transition: "border-color 0.4s, box-shadow 0.4s, transform 0.4s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor  = "rgba(221, 167, 165,0.3)";
                  el.style.boxShadow    = "0 8px 32px rgba(221, 167, 165,0.1)";
                  el.style.transform    = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor  = "rgba(221, 167, 165,0.08)";
                  el.style.boxShadow    = "none";
                  el.style.transform    = "translateY(0)";
                }}
              >
                {/* Hover rose tint */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[24px]"
                  style={{ background: "radial-gradient(circle at center, rgba(221, 167, 165,0.06), transparent)" }}
                />

                {/* Shimmer sweep */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="-translate-x-full group-hover:translate-x-full transition-transform duration-1000 absolute inset-0"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.06), transparent)" }}
                  />
                </div>

                <div className="relative z-10 flex items-center gap-3">
                  {/* Dot indicator — circle */}
                  <div
                    className="shrink-0 transition-all duration-400 group-hover:scale-125"
                    style={{
                      width: "7px", height: "7px",
                      borderRadius: "50%",
                      background: "rgba(221, 167, 165,0.5)",
                      boxShadow: "0 0 6px rgba(221, 167, 165,0.4)",
                      transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
                    }}
                  />
                  {/* Skill name */}
                  <span
                    className="group-hover:text-[var(--cream)] transition-colors duration-300"
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "var(--cream-dim)",
                    }}
                  >
                    {skill.name}
                  </span>

                  {/* Index — far right, very faint */}
                  <span className="ml-auto" style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "0.7rem",
                    color: "rgba(221, 167, 165,0.18)",
                    fontWeight: 400,
                  }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes skillFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  );
}