"use client";

import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { Search, SlidersHorizontal, X, BookOpen, Clock, User, Tag } from "lucide-react";
import type { BlogPost } from "@/data/types";
import { localeMap } from "@/data/systemLanguages";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";

interface BlogTranslations {
  hero:       { badge: string; title: string; subtitle: string };
  search:     { placeholder: string; filterButton: string; showingResults: string; article: string; articles: string };
  categories: Record<string, string>;
  readMore:   string;
  readingTime: string; // e.g. "min read"
  noResults:  { title: string; description: string; clearButton: string };
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

  const roseGold = {
    light: "#f0c4c2",
    main: "#dda7a5",
    dark: "#b3817e",
    glow: "rgba(221, 167, 165, 0.4)",
    border: "rgba(221, 167, 165, 0.2)",
    bgGlow: "rgba(221, 167, 165, 0.08)",
  };

  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.02)",
    backdropFilter: "blur(10px)",
    border: `1px solid ${roseGold.border}`,
    borderTop: `2px solid ${roseGold.main}44`,
    borderRadius: "4px",
  };

  return (
    <div
      className="min-h-screen pt-20 flex flex-col"
      style={{ background: "var(--bg-primary)", color: "var(--cream)" }}
    >
      <Header />
      {/* ── Background ───────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              `radial-gradient(ellipse 55% 50% at 0% 0%, ${roseGold.bgGlow} 0%, transparent 65%), ` +
              `radial-gradient(ellipse 45% 40% at 100% 100%, ${roseGold.bgGlow} 0%, transparent 65%)`,
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.05 }}
        >
          {[120, 240, 360, 480, 600, 720, 840, 960].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100%"
              y2={y}
              stroke={roseGold.main}
              strokeWidth="0.5"
            />
          ))}
          <path
            d="M 60 80 L 60 130 L 110 130"
            fill="none"
            stroke={roseGold.main}
            strokeWidth="1"
            opacity="0.4"
          />
          <path
            d="M 1140 880 L 1140 830 L 1090 830"
            fill="none"
            stroke={roseGold.main}
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="relative z-10">
        {/* ── Hero ─────────────────────────────────── */}
        <div className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div
            className={`container mx-auto max-w-3xl text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex justify-center mb-6">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  border: `1px solid ${roseGold.border}`,
                  borderRadius: "24px",
                  padding: "6px 20px",
                  background: "rgba(221, 167, 165, 0.04)",
                }}
              >
                <span
                  style={{
                    color: roseGold.main,
                    fontSize: "0.62rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  ✦ Blog &nbsp;—&nbsp; {translations.hero.badge}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  border: `1px solid ${roseGold.border}`,
                  borderRadius: "4px",
                  background: "rgba(221, 167, 165, 0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <BookOpen size={20} style={{ color: roseGold.main }} />
              </div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${roseGold.light} 0%, ${roseGold.main} 50%, ${roseGold.dark} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.15,
                }}
              >
                {translations.hero.title}
              </h1>
            </div>

            <p
              style={{
                color: "var(--cream-dim)",
                fontSize: "1rem",
                lineHeight: 1.75,
                fontFamily: "'Sora', sans-serif",
                maxWidth: "520px",
                margin: "0 auto",
              }}
            >
              {translations.hero.subtitle}
            </p>

            <div className="flex items-center justify-center gap-3 mt-7">
              <span
                className="block h-px w-14"
                style={{
                  background: `linear-gradient(90deg, transparent, ${roseGold.main})`,
                }}
              />
              <span style={{ color: roseGold.main, fontSize: "0.55rem" }}>
                ✦
              </span>
              <span
                className="block h-px w-14"
                style={{
                  background: `linear-gradient(90deg, ${roseGold.main}, transparent)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Featured Post ────────────────────────── */}
        {featured && selectedCategory === "all" && !searchQuery && (
          <div
            className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-12 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="block h-px w-8"
                style={{ background: roseGold.main }}
              />
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: roseGold.light,
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 800,
                }}
              >
                Featured Article
              </h3>
            </div>

            <Link
              href={`/${locale}/blog/${featured.slug}`}
              className="group block"
            >
              <div
                className="relative overflow-hidden grid lg:grid-cols-2"
                style={{
                  ...cardStyle,
                  transition: "box-shadow 0.4s, transform 0.35s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = `0 20px 60px ${roseGold.bgGlow}`;
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Image container */}
                <div className="relative h-64 lg:h-full min-h-[340px] overflow-hidden">
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right, transparent 60%, var(--bg-primary) 100%)",
                    }}
                  />
                  {/* Badge */}
                  <div
                    className="absolute top-4 left-4"
                    style={{
                      padding: "4px 16px",
                      background: "rgba(13,27,42,0.85)",
                      border: `1px solid ${roseGold.main}`,
                      borderRadius: "4px",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <span
                      style={{
                        color: roseGold.main,
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontFamily: "'Sora', sans-serif",
                      }}
                    >
                      ✦ TOP CHOICE
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span
                      style={{
                        padding: "4px 14px",
                        border: `1px solid ${roseGold.border}`,
                        borderRadius: "4px",
                        color: roseGold.main,
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        fontFamily: "'Sora', sans-serif",
                        background: "rgba(221, 167, 165, 0.05)",
                      }}
                    >
                      {translations.categories[featured.category] ??
                        featured.category}
                    </span>
                    <span
                      className="flex items-center gap-1"
                      style={{
                        color: "var(--slate)",
                        fontSize: "0.72rem",
                        fontFamily: "'Sora', sans-serif",
                      }}
                    >
                      <Clock size={12} style={{ color: roseGold.main }} />
                      {featured.readingTime} {translations.readingTime}
                    </span>
                  </div>

                  <h2
                    className="mb-4 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                      fontWeight: 800,
                      color: "var(--cream)",
                      lineHeight: 1.25,
                      backgroundImage: `linear-gradient(135deg, ${roseGold.light} 0%, ${roseGold.main} 100%)`,
                    }}
                  >
                    {featured.title}
                  </h2>

                  {featured.subtitle && (
                    <p
                      className="mb-5"
                      style={{
                        color: roseGold.main,
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: "italic",
                        fontSize: "1.1rem",
                        opacity: 0.9,
                      }}
                    >
                      {featured.subtitle}
                    </p>
                  )}

                  <p
                    className="mb-8 line-clamp-3"
                    style={{
                      color: "var(--cream-dim)",
                      fontSize: "0.95rem",
                      fontFamily: "'Sora', sans-serif",
                      lineHeight: 1.8,
                    }}
                  >
                    {featured.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={featured.author.avatar}
                      alt={featured.author.name}
                      className="w-11 h-11 object-cover"
                      style={{
                        borderRadius: "2px",
                        border: `1px solid ${roseGold.border}`,
                      }}
                    />
                    <div>
                      <p
                        style={{
                          color: roseGold.light,
                          fontSize: "0.9rem",
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                        }}
                      >
                        {featured.author.name}
                      </p>
                      <p
                        style={{
                          color: "var(--slate)",
                          fontSize: "0.7rem",
                          fontFamily: "'Sora', sans-serif",
                        }}
                      >
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: roseGold.main, opacity: 0.6 }}
              />
              <input
                type="text"
                placeholder={translations.search.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${roseGold.border}`,
                  borderRadius: "4px",
                  color: "var(--cream)",
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "0.9rem",
                  outline: "none",
                  width: "100%",
                  padding: "13px 48px",
                  transition: "all 0.3s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = roseGold.main;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${roseGold.bgGlow}`;
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = roseGold.border;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--slate)" }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-3"
              style={{
                padding: "12px 24px",
                border: `1px solid ${roseGold.border}`,
                borderRadius: "4px",
                background: showFilters ? "rgba(221, 167, 165, 0.1)" : "transparent",
                color: roseGold.main,
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif",
              }}
            >
              <SlidersHorizontal size={14} />
              {translations.search.filterButton}
            </button>

            {/* Category filters */}
            <div className="hidden lg:flex items-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "10px 20px",
                    border: `1px solid ${selectedCategory === cat ? roseGold.main : roseGold.border}`,
                    borderBottom: `2px solid ${selectedCategory === cat ? roseGold.main : "transparent"}`,
                    borderRadius: "4px",
                    background: selectedCategory === cat ? "rgba(221, 167, 165, 0.08)" : "transparent",
                    color: selectedCategory === cat ? roseGold.light : "var(--cream-dim)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontFamily: "'Sora', sans-serif",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat) {
                      e.currentTarget.style.color = roseGold.light;
                      e.currentTarget.style.borderColor = roseGold.main;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat) {
                      e.currentTarget.style.color = "var(--cream-dim)";
                      e.currentTarget.style.borderColor = roseGold.border;
                    }
                  }}
                >
                  {translations.categories[cat]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span
              className="block h-px w-6"
              style={{ background: roseGold.main }}
            />
            <span
              style={{
                color: "var(--slate)",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
              }}
            >
              {translations.search.showingResults}{" "}
              <span style={{ color: roseGold.main }}>{filtered.length}</span>{" "}
              {filtered.length === 1
                ? translations.search.article
                : translations.search.articles}
            </span>
          </div>
        </div>

        {/* ── Posts Grid ────────────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-24">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  key={post.id}
                  className="group block"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
                  }}
                >
                  <article
                    className="relative overflow-hidden h-full flex flex-col"
                    style={{
                      ...cardStyle,
                      transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = roseGold.main;
                      el.style.transform = "translateY(-8px)";
                      el.style.boxShadow = `0 20px 40px ${roseGold.bgGlow}`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = roseGold.border;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {/* Corner accents */}
                    <div
                      className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        borderTop: `2px solid ${roseGold.main}`,
                        borderRight: `2px solid ${roseGold.main}`,
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        borderBottom: `2px solid ${roseGold.main}`,
                        borderLeft: `2px solid ${roseGold.main}`,
                      }}
                    />

                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(13,27,42,0.6) 0%, transparent 60%)",
                        }}
                      />
                      {/* Badge */}
                      <div
                        className="absolute top-3 left-3"
                        style={{
                          padding: "4px 12px",
                          background: "rgba(13,27,42,0.8)",
                          border: `1px solid ${roseGold.border}`,
                          borderRadius: "4px",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <span
                          style={{
                            color: roseGold.light,
                            fontSize: "0.58rem",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            fontFamily: "'Sora', sans-serif",
                          }}
                        >
                          {translations.categories[post.category] ??
                            post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="flex items-center gap-1.5"
                          style={{
                            color: "var(--slate)",
                            fontSize: "0.68rem",
                            fontFamily: "'Sora', sans-serif",
                          }}
                        >
                          <Clock size={11} style={{ color: roseGold.main }} />
                          {post.readingTime} {translations.readingTime}
                        </span>
                        <span
                          style={{
                            color: roseGold.border,
                            fontSize: "0.5rem",
                          }}
                        >
                          ✦
                        </span>
                        <span
                          style={{
                            color: "var(--slate)",
                            fontSize: "0.68rem",
                            fontFamily: "'Sora', sans-serif",
                          }}
                        >
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>

                      <h3
                        className="mb-3"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          color: "var(--cream)",
                          lineHeight: 1.4,
                          transition: "color 0.3s",
                        }}
                      >
                        {post.title}
                      </h3>

                      <p
                        className="line-clamp-3 mb-6 flex-1"
                        style={{
                          color: "var(--cream-dim)",
                          fontSize: "0.85rem",
                          fontFamily: "'Sora', sans-serif",
                          lineHeight: 1.7,
                          opacity: 0.8,
                        }}
                      >
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div
                        className="flex items-center justify-between pt-4 mt-auto"
                        style={{ borderTop: `1px solid ${roseGold.border}` }}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-7 h-7 object-cover rounded-full"
                            style={{ border: `1px solid ${roseGold.border}` }}
                          />
                          <span
                            style={{
                              color: "var(--cream-dim)",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              fontFamily: "'Sora', sans-serif",
                            }}
                          >
                            {post.author.name}
                          </span>
                        </div>
                        <span
                          className="flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300"
                          style={{
                            color: roseGold.main,
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            fontFamily: "'Sora', sans-serif",
                          }}
                        >
                          {translations.readMore} →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <div
                className="inline-flex items-center justify-center mb-8"
                style={{
                  width: "80px",
                  height: "80px",
                  border: `1px solid ${roseGold.border}`,
                  borderRadius: "50%",
                  background: "rgba(221, 167, 165, 0.05)",
                }}
              >
                <Search size={32} style={{ color: roseGold.main }} />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "var(--cream)",
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  marginBottom: "12px",
                }}
              >
                {translations.noResults.title}
              </h3>
              <p
                style={{
                  color: "var(--cream-dim)",
                  fontSize: "1rem",
                  fontFamily: "'Sora', sans-serif",
                  marginBottom: "32px",
                  maxWidth: "400px",
                  margin: "0 auto 32px",
                }}
              >
                {translations.noResults.description}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="inline-flex items-center gap-2 transition-all duration-300 hover:scale-[1.05]"
                style={{
                  padding: "12px 32px",
                  background: `linear-gradient(135deg, ${roseGold.light} 0%, ${roseGold.main} 100%)`,
                  color: "var(--bg-primary)",
                  borderRadius: "32px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                <BookOpen size={14} />
                {translations.noResults.clearButton}
              </button>
            </div>
          )}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
      `,
        }}
      />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
