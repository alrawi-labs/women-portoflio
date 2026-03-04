"use client";

import { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  Shield,
  Calendar,
  Filter,
  TrendingUp,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import { statsData } from "@/data/stats";

const iconMap: { [key: string]: any } = {
  Shield, Calendar, Filter, TrendingUp, Globe,
};

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  image: string;
  icon?: string;
}

interface Translations {
  title: string;
  viewProject: string;
  sectionCategory: string;  
  allProjects: {
    title: string;
    description: string;
    button: string;
    stats: { projects: string; technologies: string; years: string };
  };
}

interface FeaturedProjectsClientProps {
  projects: Project[];
  translations: Translations;
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default function FeaturedProjectsClient({
  projects,
  translations,
}: FeaturedProjectsClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top } = containerRef.current.getBoundingClientRect();
      const progress = -top / (containerRef.current.offsetHeight - window.innerHeight);
      setActiveIndex(Math.max(0, Math.min(Math.floor(progress * projects.length), projects.length - 1)));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [projects.length]);

  const getResponsiveValues = (index: number) => {
    let offset = 0.75, widthReduction = 3.75, topBase = 8;
    if (windowWidth < 640)       { offset = 0.3;  widthReduction = 1.2; topBase = 6; }
    else if (windowWidth < 1024) { offset = 0.5;  widthReduction = 2;   topBase = 7; }
    return {
      transform: `translate(${index * offset}rem, ${index * offset}rem)`,
      width:     `calc(100% - ${index * widthReduction}rem)`,
      top:       `max(${topBase}rem, ${topBase + index * 1.5}rem)`,
    };
  };

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-20 lg:py-24"
      style={{
        background: "var(--navy-mid)",
        scrollMarginTop: "30px",
        borderTop:    "1px solid rgba(221, 167, 165,0.08)",
        borderBottom: "1px solid rgba(221, 167, 165,0.08)",
      }}
    >
      {/* ── Background ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 55% 40% at 5% 25%, rgba(21,35,54,0.9) 0%, transparent 65%), " +
            "radial-gradient(ellipse 45% 35% at 95% 75%, rgba(28,47,68,0.6) 0%, transparent 65%)",
        }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          {[120, 260, 400, 540, 680, 820].map((y) => (
            <line key={y} x1="0" y1={y} x2="100%" y2={y}
              stroke="rgba(221, 167, 165,0.7)" strokeWidth="0.5" />
          ))}
          <path d="M 60 60 L 60 110 L 110 110" fill="none"
            stroke="rgba(221, 167, 165,0.8)" strokeWidth="1.2" />
          <path d="M 1140 840 L 1140 790 L 1090 790" fill="none"
            stroke="rgba(221, 167, 165,0.8)" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ─────────────────────────────────────── */}
        {projects?.length > 0 && (
          <div className="sticky mb-10 lg:mb-12">

            {/* Section marker */}
            <div className="mb-5">
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                border: "1px solid rgba(221, 167, 165,0.28)", borderRadius: "32px",
                padding: "6px 20px", background: "rgba(221, 167, 165,0.05)",
              }}>
                <span style={{
                  color: "var(--gold-dim)", fontSize: "0.62rem",
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  fontFamily: "'Sora', sans-serif", fontWeight: 600,
                }}>
                  § 04 &nbsp;—&nbsp; Featured Work
                </span>
              </div>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              background: "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 50%, #b3817e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "12px",
            }}>
              {translations.title}
            </h2>

            <p style={{
              color: "var(--cream-dim)", fontSize: "1rem",
              maxWidth: "600px", lineHeight: 1.75,
              fontFamily: "'Sora', sans-serif",
            }}>
              {translations.sectionCategory}
            </p>

            {/* Ornament rule */}
            <div className="flex items-center gap-3 mt-5">
              <span className="block h-px w-14"
                style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
              <span style={{ color: "var(--gold-dim)", fontSize: "0.55rem" }}>✦</span>
              <span className="block h-px w-8"
                style={{ background: "linear-gradient(90deg, var(--gold-dim), transparent)" }} />
            </div>
          </div>
        )}

        {/* ── Cards ──────────────────────────────────────── */}
        <div ref={containerRef} className="relative pb-[30vh] sm:pb-[40vh]">
          {projects.map((project, index) => {
            const styles      = getResponsiveValues(index);
            const IconComp    = project.icon ? iconMap[project.icon] : Shield;

            return (
              <article
                key={project.id}
                className="sticky mb-[15vh] sm:mb-[20vh] group"
                style={styles}
              >
                <div
                  className="overflow-hidden transition-all duration-700"
                  style={{
                    background: "radial-gradient(ellipse at bottom, var(--navy-surface) 0%, var(--navy-mid) 100%)",
                    border: "1px solid rgba(221, 167, 165,0.15)",
                    borderTop: "3px solid rgba(221, 167, 165,0.3)",
                    borderRadius: "48px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(221, 167, 165,0.4)";
                    (e.currentTarget as HTMLElement).style.borderTopColor = "var(--gold)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 20px 60px rgba(221, 167, 165,0.15), 0 0 0 1px rgba(221, 167, 165,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(221, 167, 165,0.15)";
                    (e.currentTarget as HTMLElement).style.borderTopColor = "rgba(221, 167, 165,0.3)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 40px rgba(0,0,0,0.2)";
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[46px]">

                    {/* ── Image pane ─────────────────────────── */}
                    <div className="relative h-[30vh] min-h-[240px] sm:h-[35vh] lg:h-[55vh] lg:min-h-[440px] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Dark overlay */}
                      <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(13,27,42,0.85) 0%, rgba(13,27,42,0.3) 50%, transparent 100%)" }}
                      />

                      {/* Floating icon — top right */}
                      <div
                        className="absolute top-6 right-6 lg:top-8 lg:right-8 flex items-center justify-center transition-transform hover:scale-110"
                        style={{
                          width: "56px", height: "56px",
                          border: "1px solid rgba(221, 167, 165,0.35)",
                          borderRadius: "50%",
                          background: "rgba(221, 167, 165,0.1)",
                          backdropFilter: "blur(12px)",
                          boxShadow: "0 8px 32px rgba(221, 167, 165,0.2)"
                        }}
                      >
                        <IconComp style={{ width: "24px", height: "24px", color: "#dda7a5", strokeWidth: 1.6 }} />
                      </div>

                      {/* Floating numeral badge — top left */}
                      <div
                        className="absolute top-6 left-6 lg:top-8 lg:left-8 flex flex-col items-center justify-center"
                        style={{
                          width: "56px", height: "56px",
                          border: "1px solid rgba(221, 167, 165,0.3)",
                          borderRadius: "50%",
                          background: "rgba(221, 167, 165,0.05)",
                          backdropFilter: "blur(12px)",
                        }}
                      >
                        <span style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "1.1rem", fontWeight: 700,
                          color: "#dda7a5", lineHeight: 1,
                        }}>
                          {ROMAN[index] ?? String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Index counter bottom-left */}
                      <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                        <span style={{
                          fontSize: "0.6rem", letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "rgba(221, 167, 165,0.6)",
                          fontFamily: "'Sora', sans-serif",
                        }}>
                          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* ── Content pane ───────────────────────── */}
                    <div
                      className="flex flex-col justify-center"
                      style={{ padding: "clamp(24px, 4vw, 48px)" }}
                    >
                      <div className="space-y-4 lg:space-y-5">

                        {/* Subtitle */}
                        {project.subtitle && (
                          <div className="flex items-center gap-3">
                            <span className="block h-px w-10"
                              style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                            <span style={{
                              color: "var(--gold-dim)", fontSize: "0.62rem",
                              fontWeight: 600, letterSpacing: "0.22em",
                              textTransform: "uppercase", fontFamily: "'Sora', sans-serif",
                            }}>
                              {project.subtitle}
                            </span>
                          </div>
                        )}

                        {/* Title */}
                        <h3 style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
                          fontWeight: 800, lineHeight: 1.2,
                          background: "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 55%, #b3817e 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}>
                          {project.title}
                        </h3>

                        {/* Rule */}
                        <div style={{
                          height: "1px", width: "100%",
                          background: "linear-gradient(90deg, rgba(221, 167, 165,0.3), transparent)",
                        }} />

                        {/* Description */}
                        <p style={{
                          color: "var(--cream-dim)", fontSize: "0.9rem",
                          lineHeight: 1.8, fontFamily: "'Sora', sans-serif",
                        }}
                          className="line-clamp-4 lg:line-clamp-none"
                        >
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, ti) => (
                            <span
                              key={ti}
                              style={{
                                padding: "6px 16px",
                                border: "1px solid rgba(221, 167, 165,0.22)",
                                borderRadius: "24px",
                                background: "rgba(221, 167, 165,0.06)",
                                color: "var(--gold-dim)",
                                fontSize: "0.62rem",
                                fontWeight: 600,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                fontFamily: "'Sora', sans-serif",
                                transition: "all 0.25s",
                                cursor: "default",
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(221, 167, 165,0.12)";
                                (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                                (e.currentTarget as HTMLElement).style.borderColor = "rgba(221, 167, 165,0.45)";
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(221, 167, 165,0.06)";
                                (e.currentTarget as HTMLElement).style.color = "var(--gold-dim)";
                                (e.currentTarget as HTMLElement).style.borderColor = "rgba(221, 167, 165,0.22)";
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="pt-2">
                          <a
                            href={`/projects/${project.id}`}
                            className="group/btn inline-flex items-center gap-2"
                            style={{
                              padding: "12px 28px",
                              background: "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 100%)",
                              color: "var(--navy)",
                              borderRadius: "40px",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              fontFamily: "'Sora', sans-serif",
                              textDecoration: "none",
                              transition: "box-shadow 0.3s, transform 0.3s",
                              display: "inline-flex",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(221, 167, 165,0.4)";
                              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.boxShadow = "none";
                              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                            }}
                          >
                            {translations.viewProject}
                            <ArrowUpRight
                              size={14}
                              className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300"
                            />
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── All Projects Banner ────────────────────────── */}
        <div
          className="relative overflow-hidden group cursor-pointer"
          style={{
            border: "1px solid rgba(221, 167, 165,0.2)",
            borderTop: "3px solid #dda7a5",
            borderRadius: "48px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/assets/images/sectionBackground.png"
              alt={translations.allProjects.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(13,27,42,0.88) 0%, rgba(21,35,54,0.75) 50%, rgba(13,27,42,0.82) 100%)" }}
            />
            {/* Gold tint on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(135deg, rgba(221, 167, 165,0.12) 0%, transparent 60%)" }}
            />
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(221, 167, 165,0.06) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }} />

          {/* Content */}
          <div className="relative z-10 px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 text-center">
            <div className="max-w-3xl mx-auto space-y-6">

              {/* Section label */}
              <div className="flex justify-center">
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  border: "1px solid rgba(221, 167, 165,0.3)", borderRadius: "32px",
                  padding: "6px 20px", background: "rgba(221, 167, 165,0.08)",
                }}>
                  <span style={{
                    color: "var(--gold-light)", fontSize: "0.62rem",
                    letterSpacing: "0.25em", textTransform: "uppercase",
                    fontFamily: "'Sora', sans-serif", fontWeight: 600,
                  }}>
                    ✨ Complete Portfolio
                  </span>
                </div>
              </div>

              {/* Ornament */}
              <div className="flex items-center justify-center gap-3">
                <span className="block h-px w-12"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.6))" }} />
                <span style={{ color: "rgba(221, 167, 165,0.5)", fontSize: "0.55rem" }}>✦</span>
                <span className="block h-px w-12"
                  style={{ background: "linear-gradient(90deg, rgba(221, 167, 165,0.6), transparent)" }} />
              </div>

              {/* Heading */}
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.6rem, 4vw, 3rem)",
                fontWeight: 800, lineHeight: 1.2,
                color: "var(--cream)",
              }}>
                {translations.allProjects.title}
              </h3>

              <p style={{
                color: "rgba(240,235,224,0.75)",
                fontSize: "1rem", lineHeight: 1.75, maxWidth: "520px",
                margin: "0 auto", fontFamily: "'Sora', sans-serif",
              }}>
                {translations.allProjects.description}
              </p>

              {/* CTA button */}
              <div className="pt-2">
                <a
                  href="/projects"
                  className="group/cta inline-flex items-center gap-2"
                  style={{
                    padding: "14px 32px",
                    background: "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 100%)",
                    color: "var(--navy)",
                    borderRadius: "40px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontFamily: "'Sora', sans-serif",
                    textDecoration: "none",
                    transition: "box-shadow 0.3s, transform 0.3s",
                    display: "inline-flex",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(221, 167, 165,0.45)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  {translations.allProjects.button}
                  <ArrowUpRight
                    size={16}
                    className="group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 transition-transform duration-300"
                  />
                </a>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4">
                {[
                  { value: statsData.projects,     label: translations.allProjects.stats.projects },
                  { value: statsData.technologies, label: translations.allProjects.stats.technologies },
                  { value: statsData.years,        label: translations.allProjects.stats.years },
                ].map((stat, i, arr) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className="text-center">
                      <div style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "1.5rem", fontWeight: 800,
                        color: "var(--gold-light)", lineHeight: 1,
                      }}>
                        {stat.value}+
                      </div>
                      <div style={{
                        fontSize: "0.6rem", letterSpacing: "0.18em",
                        textTransform: "uppercase", color: "rgba(221, 167, 165,0.55)",
                        fontFamily: "'Sora', sans-serif", marginTop: "4px",
                      }}>
                        {stat.label}
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ width: "1px", height: "32px", background: "rgba(221, 167, 165,0.2)" }} />
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Soft Glow Decoration */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none"
             style={{ background: "rgba(221, 167, 165, 0.2)" }} />
        </div>

      </div>
    </section>
  );
}