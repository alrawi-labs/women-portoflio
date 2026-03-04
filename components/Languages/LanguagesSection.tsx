"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, Award } from "lucide-react";
import { useTranslations } from "next-intl";

/* Proficiency level → roman numeral mapping for visual scale */
const LEVEL_MARKS = ["·", "··", "···", "····", "✦"];

export default function Languages() {
  const [isVisible,    setIsVisible]    = useState(false);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("languages");

  const languages: any[] = t.raw("languages");
  const levels:    any   = t.raw("levels");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          languages.forEach((_: any, i: number) => {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, 300 + i * 160);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible, languages.length]);

  return (
    <section
      ref={sectionRef}
      id="languages"
      className="pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background:      "var(--bg-primary)",
        scrollMarginTop: "140px",
        borderBottom:    "1px solid rgba(221, 167, 165,0.08)",
      }}
    >
      {/* ── Background ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 50% 40% at 5%  80%, rgba(221, 167, 165, 0.07) 0%, transparent 65%), " +
            "radial-gradient(ellipse 45% 35% at 95% 20%, rgba(221, 167, 165, 0.05) 0%, transparent 65%)",
        }} />
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20 flex flex-col justify-between py-24">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.3), transparent)" }} />
          ))}
        </div>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl mt-8">

        {/* ── Section Header ─────────────────────────────── */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
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
                ✨ &nbsp; Linguistic Proficiency
              </span>
            </div>
          </div>

          {/* Heading with globe icon */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <div style={{
              width: "52px", height: "52px",
              border: "1px solid rgba(221, 167, 165,0.3)",
              borderRadius: "50%",
              background: "rgba(221, 167, 165,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 0 20px rgba(221, 167, 165,0.15)",
            }}>
              <Globe size={22} style={{ color: "#dda7a5", strokeWidth: 1.5 }} />
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 800,
              background: "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 50%, #b3817e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
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

          {/* Soft ornament rule */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="block h-px w-20" style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.6))" }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(221, 167, 165,0.6)", boxShadow: "0 0 10px rgba(221, 167, 165,0.5)" }} />
            <span className="block h-px w-20" style={{ background: "linear-gradient(90deg, rgba(221, 167, 165,0.6), transparent)" }} />
          </div>
        </div>

        {/* ── Languages Grid ─────────────────────────────── */}
        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
          {languages.map((lang: any, index: number) => {
            /* Determine fill level 0–4 from level key */
            const levelKeys  = Object.keys(levels);
            const levelIndex = levelKeys.indexOf(lang.level);
            const fillCount  = levelIndex >= 0 ? levelIndex + 1 : 3;

            return (
              <div
                key={index}
                className="group"
                style={{
                  transition: "opacity 0.9s ease, transform 0.9s ease",
                  transitionDelay: `${index * 90}ms`,
                  opacity:   visibleItems[index] ? 1 : 0,
                  transform: visibleItems[index] ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div
                  className="relative overflow-hidden h-full"
                  style={{
                    background: "radial-gradient(ellipse at top, var(--navy-surface) 0%, var(--navy-mid) 100%)",
                    border: "1px solid rgba(221, 167, 165,0.1)",
                    borderTop: "2px solid rgba(221, 167, 165,0.25)",
                    borderRadius: "32px",
                    padding: "36px 28px",
                    transition: "border-color 0.5s, box-shadow 0.5s, transform 0.4s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor    = "rgba(221, 167, 165,0.35)";
                    el.style.borderTopColor = "#dda7a5";
                    el.style.boxShadow      = "0 20px 50px rgba(221, 167, 165,0.1), inset 0 0 20px rgba(221, 167, 165,0.03)";
                    el.style.transform      = "translateY(-6px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor    = "rgba(221, 167, 165,0.1)";
                    el.style.borderTopColor = "rgba(221, 167, 165,0.25)";
                    el.style.boxShadow      = "none";
                    el.style.transform      = "translateY(0)";
                  }}
                >
                  {/* Flag background */}
                  {lang.backward && (
                    <div
                      className="absolute inset-0 transition-opacity duration-500 opacity-[0.05] group-hover:opacity-[0.08] rounded-[32px]"
                      style={{
                        backgroundImage:    `url(${lang.backward})`,
                        backgroundSize:     "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  )}

                  {/* Soft glow on hover */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl pointer-events-none"
                    style={{ background: "rgba(221, 167, 165, 0.18)" }} />

                  {/* Shimmer sweep */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="-translate-x-full group-hover:translate-x-full transition-transform duration-1000 absolute inset-0"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.06), transparent)" }}
                    />
                  </div>

                  {/* ── Card content ────────────────────── */}
                  <div className="relative z-10 flex flex-col items-center text-center gap-5">

                    {/* Flag with gold ring on hover */}
                    <div className="relative">
                      <div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-xl"
                        style={{ background: "rgba(221, 167, 165,0.25)", transform: "scale(1.8)" }}
                      />
                      <span
                        className="relative block group-hover:scale-110 transition-transform duration-400"
                        style={{ fontSize: "3.8rem", lineHeight: 1 }}
                      >
                        {lang.flag}
                      </span>
                    </div>

                    {/* Language name */}
                    <div>
                      <h3
                        className="mb-1 group-hover:text-[var(--gold-light)] transition-colors duration-300"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "1.35rem",
                          fontWeight: 700,
                          color: "var(--cream)",
                        }}
                      >
                        {lang.name}
                      </h3>
                      <p style={{
                        color: "var(--slate)",
                        fontSize: "0.8rem",
                        fontFamily: "'Sora', sans-serif",
                        letterSpacing: "0.05em",
                      }}>
                        {lang.nativeName}
                      </p>
                    </div>

                    {/* Animated gold rule */}
                    <div
                      className="w-10 group-hover:w-20 transition-all duration-500"
                      style={{
                        height: "1.5px",
                        background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.7), transparent)",
                      }}
                    />

                    {/* Proficiency dots — circles */}
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, di) => (
                        <div
                          key={di}
                          style={{
                            width:  "9px",
                            height: "9px",
                            borderRadius: "50%",
                            background:   di < fillCount ? "#dda7a5" : "rgba(221, 167, 165,0.15)",
                            border:       `1px solid ${di < fillCount ? "rgba(221, 167, 165,0.7)" : "rgba(221, 167, 165,0.2)"}`,
                            boxShadow:    di < fillCount ? "0 0 6px rgba(221, 167, 165,0.4)" : "none",
                            transition:   `background 0.4s ${di * 0.06}s, border-color 0.4s`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Level badge */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "6px 18px",
                        border: "1px solid rgba(221, 167, 165,0.3)",
                        borderRadius: "24px",
                        background: "rgba(221, 167, 165,0.07)",
                        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
                      }}
                      className="group-hover:!border-[rgba(221,167,165,0.45)] group-hover:!bg-[rgba(221,167,165,0.12)]"
                    >
                      <Award size={13} style={{ color: "#dda7a5", strokeWidth: 1.6 }} />
                      <span style={{
                        color: "#dda7a5",
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontFamily: "'Sora', sans-serif",
                      }}>
                        {levels[lang.level]}
                      </span>
                    </div>

                    {/* Index marker */}
                    <span style={{
                      position: "absolute",
                      top: "-2px",
                      right: "0px",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "0.65rem",
                      fontWeight: 400,
                      color: "rgba(221, 167, 165,0.2)",
                    }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}