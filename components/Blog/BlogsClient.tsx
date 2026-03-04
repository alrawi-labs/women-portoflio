"use client";

import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { Search, SlidersHorizontal, X, BookOpen, Clock, Tag, Sparkles } from "lucide-react";
import type { BlogPost } from "@/data/types";
import { localeMap } from "@/data/systemLanguages";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";

interface BlogTranslations {
  hero:        { badge: string; title: string; subtitle: string };
  search:      { placeholder: string; filterButton: string; showingResults: string; article: string; articles: string };
  categories:  Record<string, string>;
  readMore:    string;
  readingTime: string;
  noResults:   { title: string; description: string; clearButton: string };
}

interface BlogsClientProps {
  posts:        BlogPost[];
  translations: BlogTranslations;
  locale:       string;
}

export default function BlogsClient({ posts, translations, locale }: BlogsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery,       setSearchQuery]       = useState("");
  const [showFilters,       setShowFilters]        = useState(false);
  const [isVisible,         setIsVisible]          = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(
      localeMap[locale as keyof typeof localeMap] || "en-US",
      { day: "numeric", month: "long", year: "numeric" }
    );
  };

  const filtered = useMemo(() => {
    let result = posts;
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return result;
  }, [selectedCategory, searchQuery, posts]);

  const featured = posts.find((p) => p.isFeatured);
  const categories = Object.keys(translations.categories);

  const inputStyle: React.CSSProperties = {
    background: "linear-gradient(145deg, var(--plum-surface) 0%, var(--plum-mid) 100%)",
    border: "1px solid rgba(201,116,138,0.2)",
    borderRadius: "50px",
    color: "var(--rose-pale)",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.88rem",
    outline: "none",
  };

  return (
    <div
      className="min-h-screen pt-20 flex flex-col"
      style={{ background: "var(--plum)", color: "var(--rose-pale)" }}
    >
      <Header />

      {/* ── Background ───────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 10% 10%, rgba(201,116,138,0.10) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 45% at 90% 85%, rgba(154,82,104,0.08) 0%, transparent 60%)",
        }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          <circle cx="15%" cy="20%" r="180" fill="none" stroke="rgba(201,116,138,0.5)" strokeWidth="0.8" />
          <circle cx="15%" cy="20%" r="120" fill="none" stroke="rgba(201,116,138,0.3)" strokeWidth="0.5" />
          <circle cx="85%" cy="75%" r="220" fill="none" stroke="rgba(232,160,176,0.4)" strokeWidth="0.8" />
          <circle cx="85%" cy="75%" r="150" fill="none" stroke="rgba(232,160,176,0.25)" strokeWidth="0.5" />
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(201,116,138,0.05) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
      </div>

      <div className="relative z-10">

        {/* ── Hero ─────────────────────────────────── */}
        <div className="relative py-28 px-4 sm:px-6 lg:px-8">
          <div className={`container mx-auto max-w-3xl text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
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
                  Blog &nbsp;·&nbsp; {translations.hero.badge}
                </span>
                <Sparkles size={11} style={{ color: "var(--rose)" }} />
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 mb-6">
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(201,116,138,0.18), rgba(154,82,104,0.08))",
                border: "1px solid rgba(201,116,138,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <BookOpen size={20} style={{ color: "var(--rose-light)", strokeWidth: 1.5 }} />
              </div>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.2rem, 6vw, 3.8rem)", fontWeight: 600, fontStyle: "italic",
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

            <div className="flex items-center justify-center gap-4 mt-8">
              <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, transparent, var(--rose))" }} />
              <div style={{ display: "flex", gap: "5px" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: i === 1 ? "6px" : "4px", height: i === 1 ? "6px" : "4px",
                    borderRadius: "50%", background: i === 1 ? "var(--rose)" : "var(--rose-dim)",
                    opacity: i === 1 ? 1 : 0.5,
                  }} />
                ))}
              </div>
              <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, var(--rose), transparent)" }} />
            </div>
          </div>
        </div>

        {/* ── Featured Post ────────────────────────── */}
        {featured && selectedCategory === "all" && !searchQuery && (
          <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: "24px", height: "1px", background: "var(--rose)" }} />
              <span style={{
                color: "var(--rose-dim)", fontSize: "0.6rem",
                letterSpacing: "0.25em", textTransform: "uppercase",
                fontFamily: "'Jost', sans-serif", fontWeight: 600,
              }}>
                Featured Article
              </span>
            </div>

            <Link href={`/${locale}/blog/${featured.slug}`} className="group block">
              <div
                className="relative overflow-hidden grid lg:grid-cols-2"
                style={{
                  border: "1px solid rgba(201,116,138,0.2)",
                  borderRadius: "24px",
                  background: "linear-gradient(145deg, var(--plum-surface) 0%, var(--plum-mid) 100%)",
                  transition: "box-shadow 0.4s, transform 0.35s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "0 24px 64px rgba(154,82,104,0.3), 0 0 0 1px rgba(201,116,138,0.2)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                  background: "radial-gradient(ellipse at 30% 0%, rgba(201,116,138,0.08) 0%, transparent 60%)",
                  borderRadius: "24px",
                }} />

                {/* Image */}
                <div className="relative h-64 lg:h-full min-h-[280px] overflow-hidden" style={{ borderRadius: "24px 0 0 24px" }}>
                  <img src={featured.coverImage} alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to right, transparent 60%, rgba(45,31,46,0.8) 100%)" }} />
                  {/* Featured badge */}
                  <div className="absolute top-4 left-4" style={{
                    padding: "4px 14px",
                    background: "rgba(45,31,46,0.9)",
                    border: "1px solid rgba(201,116,138,0.4)",
                    borderRadius: "50px",
                    backdropFilter: "blur(6px)",
                  }}>
                    <span style={{
                      color: "var(--rose-light)", fontSize: "0.58rem", fontWeight: 600,
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      fontFamily: "'Jost', sans-serif",
                    }}>
                      ✦ Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span style={{
                      padding: "4px 14px",
                      border: "1px solid rgba(201,116,138,0.3)", borderRadius: "50px",
                      color: "var(--rose-light)", fontSize: "0.58rem", fontWeight: 600,
                      letterSpacing: "0.15em", textTransform: "uppercase",
                      fontFamily: "'Jost', sans-serif",
                    }}>
                      {translations.categories[featured.category] ?? featured.category}
                    </span>
                    <span className="flex items-center gap-1" style={{ color: "var(--slate)", fontSize: "0.7rem", fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>
                      <Clock size={11} />
                      {featured.readingTime} {translations.readingTime}
                    </span>
                  </div>

                  <h2
                    className="mb-3 group-hover:text-[var(--rose-pale)] transition-colors duration-300"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "clamp(1.4rem, 3vw, 2.1rem)", fontWeight: 600, fontStyle: "italic",
                      color: "var(--rose-pale)", lineHeight: 1.25,
                    }}
                  >
                    {featured.title}
                  </h2>

                  {featured.subtitle && (
                    <p className="mb-4" style={{
                      color: "var(--rose-dim)", fontFamily: "'Cormorant Garamond',serif",
                      fontStyle: "italic", fontSize: "0.95rem",
                    }}>
                      {featured.subtitle}
                    </p>
                  )}

                  <p className="mb-6 line-clamp-3" style={{
                    color: "var(--slate)", fontSize: "0.88rem",
                    fontFamily: "'Jost',sans-serif", fontWeight: 300, lineHeight: 1.8,
                  }}>
                    {featured.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img src={featured.author.avatar} alt={featured.author.name}
                      className="w-9 h-9 object-cover"
                      style={{ borderRadius: "50%", border: "1px solid rgba(201,116,138,0.3)" }} />
                    <div>
                      <p style={{ color: "var(--rose-pale)", fontSize: "0.8rem", fontFamily: "'Jost',sans-serif", fontWeight: 500 }}>
                        {featured.author.name}
                      </p>
                      <p style={{ color: "var(--slate)", fontSize: "0.65rem", fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>
                        {formatDate(featured.publishedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ── Search + Filter ───────────────────────── */}
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
                <button onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
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
              className="lg:hidden flex items-center justify-center gap-2"
              style={{
                padding: "11px 22px",
                border: "1px solid rgba(201,116,138,0.3)", borderRadius: "50px",
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
                    border: selectedCategory === cat ? "1px solid rgba(201,116,138,0.6)" : "1px solid rgba(201,116,138,0.15)",
                    borderRadius: "50px",
                    background: selectedCategory === cat
                      ? "linear-gradient(135deg, rgba(201,116,138,0.18), rgba(154,82,104,0.12))"
                      : "transparent",
                    color: selectedCategory === cat ? "var(--rose-light)" : "var(--slate)",
                    fontSize: "0.65rem", fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    fontFamily: "'Jost', sans-serif", cursor: "pointer",
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
                  {translations.categories[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile filters panel */}
          {showFilters && (
            <div className="lg:hidden mt-3 flex flex-wrap gap-2 p-5" style={{
              border: "1px solid rgba(201,116,138,0.2)", borderRadius: "16px",
              background: "linear-gradient(145deg, var(--plum-surface) 0%, var(--plum-mid) 100%)",
              backdropFilter: "blur(12px)",
            }}>
              {categories.map((cat) => (
                <button key={cat} onClick={() => { setSelectedCategory(cat); setShowFilters(false); }}
                  style={{
                    padding: "6px 16px",
                    border: selectedCategory === cat ? "1px solid var(--rose)" : "1px solid rgba(201,116,138,0.2)",
                    borderRadius: "50px",
                    background: selectedCategory === cat ? "rgba(201,116,138,0.15)" : "transparent",
                    color: selectedCategory === cat ? "var(--rose-light)" : "var(--slate)",
                    fontSize: "0.65rem", fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    fontFamily: "'Jost', sans-serif", cursor: "pointer",
                  }}
                >
                  {translations.categories[cat]}
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
              <span style={{ color: "var(--rose-light)", fontWeight: 600 }}>{filtered.length}</span>{" "}
              {filtered.length === 1 ? translations.search.article : translations.search.articles}
            </span>
          </div>
        </div>

        {/* ── Posts Grid ────────────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-28">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <Link href={`/${locale}/blog/${post.slug}`} key={post.id} className="group block"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s ease ${i * 60}ms, transform 0.6s ease ${i * 60}ms`,
                  }}
                >
                  <article
                    className="relative overflow-hidden h-full flex flex-col"
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

                    {/* Cover image */}
                    <div className="relative h-48 overflow-hidden flex-shrink-0" style={{ borderRadius: "20px 20px 0 0" }}>
                      <img src={post.coverImage} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(45,31,46,0.9) 0%, rgba(45,31,46,0.15) 60%, transparent 100%)" }} />

                      {/* Category badge */}
                      <div className="absolute top-3 left-3" style={{
                        padding: "4px 12px",
                        background: "rgba(45,31,46,0.88)",
                        border: "1px solid rgba(201,116,138,0.3)", borderRadius: "50px",
                        backdropFilter: "blur(8px)",
                      }}>
                        <span style={{
                          color: "var(--rose-light)", fontSize: "0.58rem", fontWeight: 600,
                          letterSpacing: "0.15em", textTransform: "uppercase",
                          fontFamily: "'Jost', sans-serif",
                        }}>
                          {translations.categories[post.category] ?? post.category}
                        </span>
                      </div>

                      {/* Index */}
                      <span className="absolute top-3 right-4" style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "rgba(232,160,176,0.55)", fontSize: "0.8rem",
                        fontWeight: 600, fontStyle: "italic",
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="absolute bottom-0 left-0 right-0 h-px"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(201,116,138,0.3), transparent)" }} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className="flex items-center gap-1" style={{ color: "var(--slate)", fontSize: "0.65rem", fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>
                          <Clock size={10} /> {post.readingTime} {translations.readingTime}
                        </span>
                        <span style={{ color: "rgba(201,116,138,0.3)", fontSize: "0.6rem" }}>·</span>
                        <span style={{ color: "var(--slate)", fontSize: "0.65rem", fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>

                      <h3
                        className="mb-2 group-hover:text-[var(--rose-pale)] transition-colors duration-300"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: "1.1rem", fontWeight: 600, fontStyle: "italic",
                          color: "var(--rose-pale)", lineHeight: 1.35,
                        }}
                      >
                        {post.title}
                      </h3>

                      <p className="line-clamp-2 mb-4 flex-1" style={{
                        color: "var(--slate)", fontSize: "0.82rem",
                        fontFamily: "'Jost',sans-serif", fontWeight: 300, lineHeight: 1.75,
                      }}>
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="flex items-center gap-1 group-hover:!border-[rgba(201,116,138,0.35)] group-hover:!text-[var(--rose-light)]" style={{
                            padding: "3px 10px",
                            border: "1px solid rgba(201,116,138,0.18)", borderRadius: "50px",
                            color: "var(--slate)", fontSize: "0.6rem",
                            fontFamily: "'Jost',sans-serif",
                            transition: "border-color 0.2s, color 0.2s",
                          }}>
                            <Tag size={8} />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Author row */}
                      <div className="flex items-center gap-2 pt-3"
                        style={{ borderTop: "1px solid rgba(201,116,138,0.08)" }}>
                        <img src={post.author.avatar} alt={post.author.name}
                          className="w-7 h-7 object-cover flex-shrink-0"
                          style={{ borderRadius: "50%", border: "1px solid rgba(201,116,138,0.25)" }} />
                        <div className="flex-1 min-w-0">
                          <p style={{ color: "var(--rose-pale)", fontSize: "0.72rem", fontFamily: "'Jost',sans-serif", fontWeight: 500 }}>
                            {post.author.name}
                          </p>
                        </div>
                        <span style={{
                          color: "var(--rose)", fontSize: "0.6rem", fontWeight: 600,
                          letterSpacing: "0.1em", textTransform: "uppercase",
                          fontFamily: "'Jost',sans-serif",
                        }}>
                          {translations.readMore} →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-28">
              <div className="inline-flex items-center justify-center mb-6" style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(201,116,138,0.1), transparent)",
                border: "1px solid rgba(201,116,138,0.25)",
              }}>
                <Search size={28} style={{ color: "var(--rose-dim)" }} />
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "var(--rose-pale)", fontSize: "1.6rem",
                fontWeight: 600, fontStyle: "italic", marginBottom: "10px",
              }}>
                {translations.noResults.title}
              </h3>
              <p style={{ color: "var(--slate)", fontSize: "0.9rem", fontFamily: "'Jost',sans-serif", fontWeight: 300, marginBottom: "28px" }}>
                {translations.noResults.description}
              </p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                className="inline-flex items-center gap-2 transition-all duration-300 hover:scale-[1.03]"
                style={{
                  padding: "12px 28px",
                  background: "linear-gradient(135deg, var(--rose-light) 0%, var(--rose) 55%, var(--rose-dim) 100%)",
                  color: "var(--plum)", borderRadius: "50px",
                  fontSize: "0.72rem", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  fontFamily: "'Jost', sans-serif",
                  boxShadow: "0 4px 20px rgba(201,116,138,0.3)",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(201,116,138,0.45)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(201,116,138,0.3)")}
              >
                <BookOpen size={13} />
                {translations.noResults.clearButton}
              </button>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
      ` }} />
      <div className="mt-auto"><Footer /></div>
    </div>
  );
}