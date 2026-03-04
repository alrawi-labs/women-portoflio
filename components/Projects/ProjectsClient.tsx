"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Calendar, X, BookOpen, FileText, Sparkles } from "lucide-react";
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

  const inputStyle: React.CSSProperties = {
    background: "linear-gradient(145deg, var(--plum-surface) 0%, var(--plum-mid) 100%)",
    border: "1px solid rgba(201,116,138,0.2)",
    borderRadius: "24px",
    color: "var(--rose-pale)",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.88rem",
    outline: "none",
  };

  return (
    <div
      className="min-h-screen pt-20"
      style={{ background: "var(--plum)", color: "var(--rose-pale)" }}
    >
      {/* ── Background ───────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft radial glows */}
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 10% 10%, rgba(201,116,138,0.12) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 45% at 90% 85%, rgba(154,82,104,0.10) 0%, transparent 60%), " +
            "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(62,42,64,0.4) 0%, transparent 70%)",
        }} />
        {/* Subtle petal-like shapes */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          <circle cx="15%" cy="20%" r="180" fill="none" stroke="rgba(201,116,138,0.6)" strokeWidth="0.8" />
          <circle cx="15%" cy="20%" r="120" fill="none" stroke="rgba(201,116,138,0.4)" strokeWidth="0.5" />
          <circle cx="85%" cy="75%" r="220" fill="none" stroke="rgba(232,160,176,0.5)" strokeWidth="0.8" />
          <circle cx="85%" cy="75%" r="150" fill="none" stroke="rgba(232,160,176,0.3)" strokeWidth="0.5" />
        </svg>
        {/* Fine dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(201,116,138,0.06) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
      </div>

      <div className="relative z-10">

        {/* ── Hero ─────────────────────────────────── */}
        <div className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className={`container mx-auto max-w-3xl text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>

            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                border: "1px solid rgba(201,116,138,0.3)", borderRadius: "50px",
                padding: "6px 20px", background: "rgba(201,116,138,0.07)",
                backdropFilter: "blur(8px)",
              }}>
                <Sparkles size={11} style={{ color: "var(--rose)" }} />
                <span style={{
                  color: "var(--rose-light)", fontSize: "0.62rem",
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  fontFamily: "'Jost', sans-serif", fontWeight: 600,
                }}>
                  {translations.hero.sectionCategory} &nbsp;·&nbsp; {translations.hero.badge}
                </span>
                <Sparkles size={11} style={{ color: "var(--rose)" }} />
              </div>
            </div>

            {/* Title */}
            <div className="flex items-center justify-center gap-5 mb-6">
              <div style={{
                width: "48px", height: "48px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(201,116,138,0.18), rgba(154,82,104,0.08))",
                border: "1px solid rgba(201,116,138,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <FileText size={20} style={{ color: "var(--rose-light)", strokeWidth: 1.5 }} />
              </div>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
                fontWeight: 600,
                fontStyle: "italic",
                background: "linear-gradient(135deg, var(--rose-pale) 0%, var(--rose-light) 45%, var(--rose) 80%, var(--rose-dim) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                lineHeight: 1.2,
              }}>
                {translations.hero.title}
              </h1>
            </div>

            <p style={{
              color: "var(--slate)", fontSize: "1rem", lineHeight: 1.8,
              fontFamily: "'Jost', sans-serif", fontWeight: 300,
              maxWidth: "500px", margin: "0 auto",
            }}>
              {translations.hero.subtitle}
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, transparent, var(--rose))" }} />
              <div style={{ display: "flex", gap: "5px" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: i === 1 ? "6px" : "4px",
                    height: i === 1 ? "6px" : "4px",
                    borderRadius: "50%",
                    background: i === 1 ? "var(--rose)" : "var(--rose-dim)",
                    opacity: i === 1 ? 1 : 0.5,
                  }} />
                ))}
              </div>
              <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, var(--rose), transparent)" }} />
            </div>
          </div>
        </div>

        {/* ── Search + Filter bar ───────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-10">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">

            {/* Search */}
            <div className="relative flex-1">
              <Search size={15} className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--rose-dim)" }} />
              <input
                type="text"
                placeholder={translations.search.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ ...inputStyle, width: "100%", padding: "12px 44px 12px 44px" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,116,138,0.55)";
                  e.currentTarget.style.boxShadow   = "0 0 0 4px rgba(201,116,138,0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,116,138,0.2)";
                  e.currentTarget.style.boxShadow   = "none";
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: "var(--rose-dim)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--rose)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--rose-dim)")}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                padding: "11px 22px",
                border: "1px solid rgba(201,116,138,0.3)", borderRadius: "24px",
                background: showFilters ? "rgba(201,116,138,0.12)" : "transparent",
                color: "var(--rose-light)",
                fontSize: "0.72rem", fontWeight: 600,
                letterSpacing: "0.15em", textTransform: "uppercase",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              <SlidersHorizontal size={13} />
              {translations.search.filterButton}
            </button>

            {/* Desktop category filters */}
            <div className="hidden lg:flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "8px 18px",
                    border: selectedCategory === cat
                      ? "1px solid rgba(201,116,138,0.6)"
                      : "1px solid rgba(201,116,138,0.15)",
                    borderRadius: "50px",
                    background: selectedCategory === cat
                      ? "linear-gradient(135deg, rgba(201,116,138,0.18), rgba(154,82,104,0.12))"
                      : "transparent",
                    color: selectedCategory === cat ? "var(--rose-light)" : "var(--slate)",
                    fontSize: "0.65rem", fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    fontFamily: "'Jost', sans-serif",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    boxShadow: selectedCategory === cat ? "0 0 12px rgba(201,116,138,0.15)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,116,138,0.35)";
                      (e.currentTarget as HTMLElement).style.color = "var(--rose-light)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,116,138,0.15)";
                      (e.currentTarget as HTMLElement).style.color = "var(--slate)";
                    }
                  }}
                >
                  {translations.categories[cat as keyof typeof translations.categories]}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile filters dropdown */}
          {showFilters && (
            <div
              className="lg:hidden mt-3 flex flex-wrap gap-2 p-5"
              style={{
                border: "1px solid rgba(201,116,138,0.2)",
                borderRadius: "16px",
                background: "linear-gradient(145deg, var(--plum-surface) 0%, var(--plum-mid) 100%)",
                backdropFilter: "blur(12px)",
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setShowFilters(false); }}
                  style={{
                    padding: "6px 16px",
                    border: selectedCategory === cat
                      ? "1px solid var(--rose)"
                      : "1px solid rgba(201,116,138,0.2)",
                    borderRadius: "50px",
                    background: selectedCategory === cat ? "rgba(201,116,138,0.15)" : "transparent",
                    color: selectedCategory === cat ? "var(--rose-light)" : "var(--slate)",
                    fontSize: "0.65rem", fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    fontFamily: "'Jost', sans-serif",
                    cursor: "pointer",
                  }}
                >
                  {translations.categories[cat as keyof typeof translations.categories]}
                </button>
              ))}
            </div>
          )}

          {/* Results count */}
          <div className="mt-5 flex items-center gap-3">
            <div style={{ width: "24px", height: "1px", background: "var(--rose)" }} />
            <span style={{
              color: "var(--slate)", fontSize: "0.65rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              fontFamily: "'Jost', sans-serif",
            }}>
              {translations.search.showingResults}{" "}
              <span style={{ color: "var(--rose-light)", fontWeight: 600 }}>
                {filteredProjects.length}
              </span>{" "}
              {filteredProjects.length === 1
                ? translations.search.project
                : translations.search.projects}
            </span>
          </div>
        </div>

        {/* ── Projects Grid ─────────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-28">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, i) => (
                <Link
                  href={`/${locale}/projects/${project.id}`}
                  key={project.id}
                  className="group block"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s ease ${i * 60}ms, transform 0.6s ease ${i * 60}ms`,
                  }}
                >
                  <div
                    className="relative overflow-hidden h-full"
                    style={{
                      border: "1px solid rgba(201,116,138,0.12)",
                      borderRadius: "20px",
                      background: "linear-gradient(145deg, var(--plum-surface) 0%, var(--plum-mid) 100%)",
                      transition: "border-color 0.35s, box-shadow 0.35s, transform 0.35s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(201,116,138,0.4)";
                      el.style.boxShadow   = "0 20px 60px rgba(154,82,104,0.25), 0 0 0 1px rgba(201,116,138,0.15)";
                      el.style.transform   = "translateY(-6px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(201,116,138,0.12)";
                      el.style.boxShadow   = "none";
                      el.style.transform   = "translateY(0)";
                    }}
                  >
                    {/* Inner glow on hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                      background: "radial-gradient(ellipse at 50% 0%, rgba(201,116,138,0.08) 0%, transparent 60%)",
                      borderRadius: "20px",
                    }} />

                    {/* Image */}
                    <div className="relative h-52 overflow-hidden" style={{ borderRadius: "20px 20px 0 0" }}>
                      <img
                        src={project.image} alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(45,31,46,0.9) 0%, rgba(45,31,46,0.3) 50%, transparent 100%)" }} />

                      {/* Soft vignette overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "linear-gradient(135deg, rgba(201,116,138,0.08), transparent 60%)" }} />

                      {/* Category badge */}
                      <div
                        className="absolute top-3 left-3"
                        style={{
                          padding: "4px 12px",
                          background: "rgba(45,31,46,0.85)",
                          border: "1px solid rgba(201,116,138,0.3)",
                          borderRadius: "50px",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <span style={{
                          color: "var(--rose-light)", fontSize: "0.58rem",
                          fontWeight: 600, letterSpacing: "0.15em",
                          textTransform: "uppercase", fontFamily: "'Jost', sans-serif",
                        }}>
                          {project.category}
                        </span>
                      </div>

                      {/* Index stamp */}
                      <span className="absolute top-3 right-4" style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "rgba(232,160,176,0.55)", fontSize: "0.8rem",
                        fontWeight: 600, fontStyle: "italic",
                      }}>
                        {String(filteredProjects.indexOf(project) + 1).padStart(2, "0")}
                      </span>

                      {/* Bottom thin rose line */}
                      <div className="absolute bottom-0 left-0 right-0 h-px"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(201,116,138,0.4), transparent)" }} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6">
                      {project.date && (
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar size={11} style={{ color: "var(--rose-dim)" }} />
                          <span style={{
                            color: "var(--slate)", fontSize: "0.65rem",
                            fontFamily: "'Jost', sans-serif", letterSpacing: "0.08em",
                          }}>
                            {formatDate(project.date)}
                          </span>
                        </div>
                      )}

                      <h3
                        className="mb-1 group-hover:text-[var(--rose-pale)] transition-colors duration-300"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: "1.2rem", fontWeight: 600,
                          fontStyle: "italic",
                          color: "var(--rose-pale)", lineHeight: 1.3,
                        }}
                      >
                        {project.title}
                      </h3>

                      {project.subtitle && (
                        <p style={{
                          color: "var(--rose-dim)", fontSize: "0.8rem",
                          fontFamily: "'Jost', sans-serif", marginBottom: "8px",
                          fontWeight: 300,
                        }}>
                          {project.subtitle}
                        </p>
                      )}

                      <p className="line-clamp-2 mb-5" style={{
                        color: "var(--slate)", fontSize: "0.83rem",
                        fontFamily: "'Jost', sans-serif", lineHeight: 1.75,
                        fontWeight: 300,
                      }}>
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: "3px 11px",
                              border: "1px solid rgba(201,116,138,0.18)",
                              borderRadius: "50px",
                              color: "var(--slate)",
                              fontSize: "0.6rem",
                              fontWeight: 500,
                              letterSpacing: "0.08em",
                              fontFamily: "'Jost', sans-serif",
                              transition: "border-color 0.2s, color 0.2s, background 0.2s",
                            }}
                            className="group-hover:!border-[rgba(201,116,138,0.35)] group-hover:!text-[var(--rose-light)] group-hover:!bg-[rgba(201,116,138,0.05)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Bottom accent — growing rose line */}
                      <div className="mt-5 h-px overflow-hidden"
                        style={{ background: "rgba(201,116,138,0.08)", borderRadius: "1px" }}>
                        <div
                          className="h-full w-0 group-hover:w-2/3 transition-all duration-700"
                          style={{ background: "linear-gradient(90deg, var(--rose-light), var(--rose), transparent)" }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* No results */
            <div className="text-center py-28">
              <div
                className="inline-flex items-center justify-center mb-6"
                style={{
                  width: "80px", height: "80px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(201,116,138,0.1), transparent)",
                  border: "1px solid rgba(201,116,138,0.25)",
                }}
              >
                <Search size={28} style={{ color: "var(--rose-dim)" }} />
              </div>

              <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "var(--rose-pale)", fontSize: "1.6rem",
                fontWeight: 600, fontStyle: "italic",
                marginBottom: "10px",
              }}>
                {translations.noResults.title}
              </h3>
              <p style={{
                color: "var(--slate)", fontSize: "0.9rem",
                fontFamily: "'Jost', sans-serif", fontWeight: 300,
                marginBottom: "28px",
              }}>
                {translations.noResults.description}
              </p>

              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                className="inline-flex items-center gap-2 transition-all duration-300 hover:scale-[1.03]"
                style={{
                  padding: "12px 28px",
                  background: "linear-gradient(135deg, var(--rose-light) 0%, var(--rose) 55%, var(--rose-dim) 100%)",
                  color: "var(--plum)",
                  borderRadius: "50px",
                  fontSize: "0.72rem", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  fontFamily: "'Jost', sans-serif",
                  boxShadow: "0 4px 20px rgba(201,116,138,0.3)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(201,116,138,0.45)")}
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(201,116,138,0.3)")}
              >
                <BookOpen size={13} />
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