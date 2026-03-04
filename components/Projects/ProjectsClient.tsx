"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Calendar, X, BookOpen, FileText } from "lucide-react";
import { localeMap } from "@/data/systemLanguages";

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  date?: string;
  isFeatured?: boolean;
}

interface Translations {
  hero: { badge: string; title: string; subtitle: string; sectionCategory: string };
  search: { placeholder: string; filterButton: string; showingResults: string; project: string; projects: string };
  categories: { all: string; webDevelopment: string; mobileApp: string; design: string; aiMl: string; blockchain: string };
  noResults: { title: string; description: string; clearButton: string };
}

interface ProjectsClientProps {
  projects: Project[];
  translations: Translations;
  locale: string;
}

export default function ProjectsClient({ projects, translations, locale }: ProjectsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery,       setSearchQuery]       = useState("");
  const [filteredProjects,  setFilteredProjects]  = useState<Project[]>(projects);
  const [showFilters,       setShowFilters]        = useState(false);
  const [isVisible,         setIsVisible]          = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date       = new Date(dateString);
    const localeCode = localeMap[locale as keyof typeof localeMap] || "en-US";
    return date.toLocaleDateString(localeCode, { month: "long", year: "numeric" });
  };

  useEffect(() => {
    let filtered = projects;
    if (selectedCategory !== "all") {
      const categoryName = translations.categories[selectedCategory as keyof typeof translations.categories];
      filtered = filtered.filter((p) => p.category === categoryName);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    setFilteredProjects(filtered);
  }, [selectedCategory, searchQuery, projects, translations]);

  const categories = ["all", "webDevelopment", "mobileApp", "design", "aiMl", "blockchain"];

  // Rose Gold constants
  const roseGold = {
    light: "#f0c4c2",
    main:  "#dda7a5",
    dark:  "#b3817e",
    glow:  "rgba(221, 167, 165, 0.4)",
    border: "rgba(221, 167, 165, 0.2)",
    bgGlow: "rgba(221, 167, 165, 0.08)"
  };

  /* Shared field style */
  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${roseGold.border}`,
    borderRadius: "2px",
    color: "var(--cream)",
    fontFamily: "'Sora', sans-serif",
    fontSize: "0.88rem",
    outline: "none",
    backdropFilter: "blur(10px)",
  };

  return (
    <div
      className="min-h-screen pt-20"
      style={{ background: "var(--bg-primary)", color: "var(--cream)" }}
    >
      {/* ── Background ───────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div style={{
          position: "absolute", inset: 0,
          background:
            `radial-gradient(ellipse 55% 45% at 0% 10%, ${roseGold.bgGlow} 0%, transparent 65%), ` +
            `radial-gradient(ellipse 45% 40% at 100% 90%, ${roseGold.bgGlow} 0%, transparent 65%)`,
        }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.05 }}>
          {[120,240,360,480,600,720,840,960].map((y) => (
            <line key={y} x1="0" y1={y} x2="100%" y2={y}
              stroke={roseGold.main} strokeWidth="0.5" />
          ))}
          <path d="M 60 80 L 60 130 L 110 130"        fill="none" stroke={roseGold.main} strokeWidth="1" opacity="0.4" />
          <path d="M 1140 880 L 1140 830 L 1090 830"  fill="none" stroke={roseGold.main} strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="relative z-10">

        {/* ── Hero ─────────────────────────────────── */}
        <div className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className={`container mx-auto max-w-3xl text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>

            {/* Section marker */}
            <div className="flex justify-center mb-6">
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                border: `1px solid ${roseGold.border}`, borderRadius: "24px",
                padding: "6px 20px", background: "rgba(221, 167, 165, 0.04)",
              }}>
                <span style={{
                  color: roseGold.main, fontSize: "0.62rem",
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  fontFamily: "'Sora', sans-serif", fontWeight: 600,
                }}>
                  ✦ {translations.hero.sectionCategory} &nbsp;—&nbsp; {translations.hero.badge}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-6 mb-8">
              <div style={{
                width: "56px", height: "56px",
                border: `1px solid ${roseGold.border}`, borderRadius: "50%",
                background: "rgba(221, 167, 165, 0.07)",
                display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(5px)",
              }}>
                <FileText size={24} style={{ color: roseGold.main, strokeWidth: 1.5 }} />
              </div>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                fontWeight: 800,
                background: `linear-gradient(135deg, ${roseGold.light} 0%, ${roseGold.main} 50%, ${roseGold.dark} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                lineHeight: 1.1,
              }}>
                {translations.hero.title}
              </h1>
            </div>

            <p style={{
              color: "var(--cream-dim)", fontSize: "1.05rem", lineHeight: 1.8,
              fontFamily: "'Sora', sans-serif", maxWidth: "580px", margin: "0 auto",
              opacity: 0.85
            }}>
              {translations.hero.subtitle}
            </p>

            <div className="flex items-center justify-center gap-4 mt-10">
              <span className="block h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${roseGold.main})` }} />
              <span style={{ color: roseGold.main, fontSize: "0.6rem", opacity: 0.6 }}>✦</span>
              <span className="block h-px w-16" style={{ background: `linear-gradient(90deg, ${roseGold.main}, transparent)` }} />
            </div>
          </div>
        </div>

        {/* ── Search + Filter bar ───────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center bg-white/5 p-2 rounded-lg backdrop-blur-md border border-white/5">

            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: roseGold.main, opacity: 0.6 }} />
              <input
                type="text"
                placeholder={translations.search.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ ...inputStyle, width: "100%", padding: "12px 42px 12px 42px" }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: "var(--slate)" }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                padding: "12px 20px",
                border: `1px solid ${roseGold.border}`, borderRadius: "2px",
                background: showFilters ? "rgba(221, 167, 165, 0.1)" : "transparent",
                color: roseGold.main,
                fontSize: "0.75rem", fontWeight: 700,
                letterSpacing: "0.15em", textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif",
              }}
            >
              <SlidersHorizontal size={14} />
              {translations.search.filterButton}
            </button>

            {/* Desktop category filters */}
            <div className="hidden lg:flex items-center gap-1.5 flex-wrap px-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "24px",
                    background: selectedCategory === cat ? roseGold.main : "transparent",
                    color: selectedCategory === cat ? "var(--bg-primary)" : roseGold.main,
                    border: `1px solid ${selectedCategory === cat ? roseGold.main : "transparent"}`,
                    fontSize: "0.68rem", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    fontFamily: "'Sora', sans-serif",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {translations.categories[cat as keyof typeof translations.categories]}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-8 flex items-center gap-4">
            <span className="block h-px w-10" style={{ background: roseGold.main, opacity: 0.3 }} />
            <span style={{
              color: "var(--slate)", fontSize: "0.68rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              fontFamily: "'Sora', sans-serif", opacity: 0.7
            }}>
              {translations.search.showingResults}{" "}
              <span style={{ color: roseGold.main, fontWeight: 700 }}>
                {filteredProjects.length}
              </span>{" "}
              {filteredProjects.length === 1
                ? translations.search.project
                : translations.search.projects}
            </span>
          </div>
        </div>

        {/* ── Projects Grid ─────────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-32">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProjects.map((project, i) => (
                <Link
                  href={`/${locale}/projects/${project.id}`}
                  key={project.id}
                  className="group block"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.8s ease ${i * 100}ms, transform 0.8s ease ${i * 100}ms`,
                  }}
                >
                  <div
                    className="relative overflow-hidden h-full flex flex-col"
                    style={{
                      border: `1px solid ${roseGold.border}`,
                      borderTop: `2px solid ${roseGold.main}44`,
                      borderRadius: "4px",
                      background: "rgba(255,255,255,0.02)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor    = roseGold.main;
                      el.style.borderTopColor = roseGold.main;
                      el.style.boxShadow      = `0 20px 50px -12px ${roseGold.bgGlow}, 0 0 20px -5px ${roseGold.bgGlow}`;
                      el.style.transform      = "translateY(-8px)";
                      el.style.background     = "rgba(255,255,255,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor    = roseGold.border;
                      el.style.borderTopColor = roseGold.main + "44";
                      el.style.boxShadow      = "none";
                      el.style.transform      = "translateY(0)";
                      el.style.background     = "rgba(255,255,255,0.02)";
                    }}
                  >
                    {/* Dot-grid accent */}
                    <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, ${roseGold.main} 1px, transparent 0)`,
                      backgroundSize: "32px 32px",
                    }} />

                    {/* Image Container */}
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={project.image} alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)" }} />

                      {/* Category badge */}
                      <div
                        className="absolute top-4 left-4"
                        style={{
                          padding: "5px 14px",
                          background: "rgba(15,10,10,0.75)",
                          border: `1px solid ${roseGold.border}`,
                          borderRadius: "24px",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <span style={{
                          color: roseGold.main, fontSize: "0.6rem",
                          fontWeight: 700, letterSpacing: "0.2em",
                          textTransform: "uppercase", fontFamily: "'Sora', sans-serif",
                        }}>
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-7 flex flex-col flex-1">
                      {project.date && (
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar size={12} style={{ color: roseGold.main, opacity: 0.7 }} />
                          <span style={{
                            color: "var(--slate)", fontSize: "0.7rem",
                            fontFamily: "'Sora', sans-serif", letterSpacing: "0.05em",
                            opacity: 0.8
                          }}>
                            {formatDate(project.date)}
                          </span>
                        </div>
                      )}

                      <h3
                        className="mb-2 group-hover:text-white transition-colors duration-300"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "1.5rem", fontWeight: 700,
                          color: roseGold.light, lineHeight: 1.2,
                        }}
                      >
                        {project.title}
                      </h3>

                      {project.subtitle && (
                        <p style={{
                          color: roseGold.main, fontSize: "0.85rem",
                          fontFamily: "'Sora', sans-serif", marginBottom: "12px",
                          fontStyle: "italic", opacity: 0.8
                        }}>
                          {project.subtitle}
                        </p>
                      )}

                      <p className="line-clamp-2 mb-6" style={{
                        color: "var(--cream-dim)", fontSize: "0.9rem",
                        fontFamily: "'Sora', sans-serif", lineHeight: 1.7,
                        opacity: 0.8
                      }}>
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: "3px 10px",
                              border: `1px solid ${roseGold.border}`,
                              borderRadius: "4px",
                              color: "var(--slate)",
                              fontSize: "0.62rem",
                              fontWeight: 600,
                              letterSpacing: "0.05em",
                              fontFamily: "'Sora', sans-serif",
                              transition: "all 0.3s",
                            }}
                            className="group-hover:border-roseGold-main/40 group-hover:text-roseGold-main"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Bottom action line */}
                      <div className="mt-8 flex items-center justify-between">
                        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${roseGold.main}33, transparent)` }} />
                        <span style={{
                          color: roseGold.main, fontSize: "0.65rem", fontWeight: 800,
                          letterSpacing: "0.15em", textTransform: "uppercase",
                          paddingLeft: "16px", transform: "translateX(10px)",
                          opacity: 0, transition: "all 0.4s"
                        }} className="group-hover:opacity-100 group-hover:translate-x-0">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* No results */
            <div className="text-center py-32 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
              <div
                className="inline-flex items-center justify-center mb-8"
                style={{
                  width: "80px", height: "80px",
                  border: `1px solid ${roseGold.border}`, borderRadius: "50%",
                  background: "rgba(221, 167, 165, 0.05)",
                }}
              >
                <Search size={32} style={{ color: roseGold.main, opacity: 0.5 }} />
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: roseGold.light, fontSize: "1.8rem", fontWeight: 700, marginBottom: "12px",
              }}>
                {translations.noResults.title}
              </h3>
              <p style={{
                color: "var(--cream-dim)", fontSize: "1rem",
                fontFamily: "'Sora', sans-serif", marginBottom: "32px",
                maxWidth: "400px", margin: "0 auto 32px"
              }}>
                {translations.noResults.description}
              </p>

              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                className="inline-flex items-center gap-3 transition-all duration-500 hover:scale-[1.05]"
                style={{
                  padding: "14px 32px",
                  background: `linear-gradient(135deg, ${roseGold.light} 0%, ${roseGold.main} 100%)`,
                  color: "var(--bg-primary)", borderRadius: "32px",
                  fontSize: "0.75rem", fontWeight: 800,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  fontFamily: "'Sora', sans-serif",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = `0 15px 30px ${roseGold.bgGlow}`)}
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
              >
                <BookOpen size={16} />
                {translations.noResults.clearButton}
              </button>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      ` }} />
    </div>
  );
}
