"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft, Clock, Calendar, User, Tag,
  Twitter, Linkedin, Link as LinkIcon, BookOpen,
  ChevronRight, Hash,
} from "lucide-react";
import type { BlogPost, BlogContentBlock } from "@/data/types";
import { localeMap } from "@/data/systemLanguages";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";

interface BlogDetailTranslations {
  backToBlog:    string;
  readingTime:   string;
  tableOfContents: string;
  relatedArticles: string;
  shareArticle:  string;
  linkCopied:    string;
  categories:    Record<string, string>;
}

interface BlogDetailClientProps {
  post:        BlogPost;
  relatedPosts: BlogPost[];
  translations: BlogDetailTranslations;
  locale:       string;
}

/* ── Helpers ─────────────────────────────────────────── */
function parseMarkdown(text: string): JSX.Element {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**")
          ? <strong key={i} style={{ color: "var(--cream)", fontWeight: 700 }}>{part.slice(2, -2)}</strong>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

/* ── TOC entry ───────────────────────────────────────── */
interface TocEntry { id: string; text: string; level: number }

function buildToc(blocks: BlogContentBlock[]): TocEntry[] {
  const toc: TocEntry[] = [];
  blocks.forEach((block) => {
    if (block.type === 0 && block.heading)
      toc.push({ id: slugify(block.heading), text: block.heading, level: 2 });
    if (block.type === 0 && block.subheading)
      toc.push({ id: slugify(block.subheading), text: block.subheading, level: 3 });
  });
  return toc;
}

/* ─────────────────────────────────────────────────────── */
export default function BlogDetailClient({
  post, relatedPosts, translations, locale,
}: BlogDetailClientProps) {
  const [activeId,    setActiveId]    = useState<string>("");
  const [copied,      setCopied]      = useState(false);
  const [tocOpen,     setTocOpen]     = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const toc = useMemo(() => buildToc(post.contentBlocks), [post.contentBlocks]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(
      localeMap[locale as keyof typeof localeMap] || "en-US",
      { day: "numeric", month: "long", year: "numeric" }
    );

  /* Active heading tracker */
  useEffect(() => {
    const headings = contentRef.current?.querySelectorAll("[data-heading-id]");
    if (!headings?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActiveId(entry.target.getAttribute("data-heading-id") ?? "");
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardStyle: React.CSSProperties = {
    background: "linear-gradient(145deg, var(--navy-surface) 0%, var(--navy-mid) 100%)",
    border: "1px solid rgba(200,164,90,0.12)",
    borderTop: "2px solid rgba(200,164,90,0.25)",
    borderRadius: "2px",
  };

  return (
    <div
      className="min-h-screen pt-20 flex flex-col"
      style={{ background: "var(--bg-primary)", color: "var(--cream)" }}
    >
      <Header />
      {/* ── Background ───────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 55% 50% at 0%   0%,   rgba(21,35,54,0.9)  0%, transparent 65%), " +
            "radial-gradient(ellipse 45% 40% at 100% 100%, rgba(28,47,68,0.55) 0%, transparent 65%)",
        }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.035 }}>
          {[120,240,360,480,600,720,840,960,1080].map((y) => (
            <line key={y} x1="0" y1={y} x2="100%" y2={y}
              stroke="rgba(200,164,90,0.7)" strokeWidth="0.5" />
          ))}
          <line x1="80" y1="0" x2="80" y2="100%" stroke="rgba(200,164,90,0.2)" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10">

        {/* ── Hero / Cover ─────────────────────────── */}
        <div className="relative">
          {/* Cover image */}
          <div className="relative h-[45vh] min-h-[320px] overflow-hidden">
            <img src={post.coverImage} alt={post.title}
              className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to bottom, rgba(13,27,42,0.3) 0%, rgba(13,27,42,0.85) 100%)",
            }} />
            {/* Ruled overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
              {[80,160,240,320].map((y) => (
                <line key={y} x1="0" y1={y} x2="100%" y2={y}
                  stroke="rgba(200,164,90,0.8)" strokeWidth="0.5" />
              ))}
            </svg>
          </div>

          {/* Hero text overlay */}
          <div className="absolute bottom-0 left-0 right-0 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl">
              {/* Back link */}
              <Link href={`/${locale}/blog`}
                className="group inline-flex items-center gap-2 mb-6 transition-colors duration-200"
                style={{ color: "rgba(232,220,200,0.6)", textDecoration: "none", fontSize: "0.7rem", fontFamily: "'Sora',sans-serif", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(232,220,200,0.6)")}
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-300" />
                {translations.backToBlog}
              </Link>

              {/* Category */}
              <div className="mb-4" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                border: "1px solid rgba(200,164,90,0.4)", borderRadius: "2px",
                padding: "5px 14px", background: "rgba(13,27,42,0.7)", backdropFilter: "blur(8px)",
              }}>
                <span style={{
                  color: "var(--gold)", fontSize: "0.62rem",
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  fontFamily: "'Sora', sans-serif", fontWeight: 600,
                }}>
                  {translations.categories[post.category] ?? post.category}
                </span>
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 800,
                background: "linear-gradient(135deg, #e0c07a 0%, #c8a45a 55%, #ffffff 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                lineHeight: 1.2, marginBottom: "12px",
              }}>
                {post.title}
              </h1>

              {post.subtitle && (
                <p style={{
                  color: "rgba(232,220,200,0.7)", fontFamily: "'Playfair Display',serif",
                  fontStyle: "italic", fontSize: "1rem", marginBottom: "16px",
                }}>
                  {post.subtitle}
                </p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <img src={post.author.avatar} alt={post.author.name}
                    className="w-8 h-8 object-cover"
                    style={{ borderRadius: "2px", border: "1px solid rgba(200,164,90,0.4)" }} />
                  <span style={{ color: "rgba(232,220,200,0.8)", fontSize: "0.8rem", fontFamily: "'Sora',sans-serif" }}>
                    {post.author.name}
                  </span>
                </div>
                <span style={{ color: "rgba(200,164,90,0.3)" }}>·</span>
                <span className="flex items-center gap-1" style={{ color: "rgba(232,220,200,0.6)", fontSize: "0.75rem", fontFamily: "'Sora',sans-serif" }}>
                  <Calendar size={11} /> {formatDate(post.publishedAt)}
                </span>
                <span style={{ color: "rgba(200,164,90,0.3)" }}>·</span>
                <span className="flex items-center gap-1" style={{ color: "rgba(232,220,200,0.6)", fontSize: "0.75rem", fontFamily: "'Sora',sans-serif" }}>
                  <Clock size={11} /> {post.readingTime} {translations.readingTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main content area ────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-14">
          <div className="grid lg:grid-cols-[1fr_280px] gap-10">

            {/* ── Article body ── */}
            <div ref={contentRef} className="space-y-8 min-w-0">
              {post.contentBlocks.map((block, idx) => {
                /* Type 0: Text */
                if (block.type === 0) return (
                  <div key={idx} style={{ ...cardStyle, padding: "32px" }}>
                    {block.heading && (
                      <div data-heading-id={slugify(block.heading)} className="flex items-center gap-3 mb-5">
                        <span className="block h-px w-8" style={{ background: "var(--gold)" }} />
                        <h2 style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          color: "var(--cream)", fontSize: "1.35rem", fontWeight: 800,
                        }}>
                          {block.heading}
                        </h2>
                        <span className="block h-px flex-1 max-w-[60px]"
                          style={{ background: "linear-gradient(90deg, var(--gold-dim), transparent)" }} />
                      </div>
                    )}
                    {block.subheading && (
                      <p data-heading-id={slugify(block.subheading)} className="mb-3" style={{
                        color: "var(--gold-dim)", fontFamily: "'Playfair Display',serif",
                        fontSize: "1rem", fontStyle: "italic",
                      }}>
                        {block.subheading}
                      </p>
                    )}
                    {block.content && (
                      <div style={{
                        color: "var(--cream-dim)", fontSize: "0.95rem",
                        fontFamily: "'Sora',sans-serif", lineHeight: 1.9,
                        whiteSpace: "pre-line",
                      }}>
                        {parseMarkdown(block.content)}
                      </div>
                    )}
                  </div>
                );

                /* Type 1: Image */
                if (block.type === 1) return (
                  <div key={idx} className="space-y-3">
                    {block.heading && (
                      <div className="flex items-center gap-3">
                        <span className="block h-px w-8" style={{ background: "var(--gold)" }} />
                        <h3 style={{ fontFamily: "'Playfair Display',serif", color: "var(--cream)", fontSize: "1.1rem", fontWeight: 700 }}>
                          {block.heading}
                        </h3>
                      </div>
                    )}
                    <div className="group relative overflow-hidden" style={{
                      borderRadius: "2px", border: "1px solid rgba(200,164,90,0.2)",
                      borderTop: "2px solid rgba(200,164,90,0.3)",
                    }}>
                      <img src={block.imageUrl} alt={block.heading || ""}
                        className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    {block.caption && (
                      <p style={{ color: "var(--slate)", fontSize: "0.78rem", fontFamily: "'Sora',sans-serif", fontStyle: "italic", textAlign: "center" }}>
                        {block.caption}
                      </p>
                    )}
                  </div>
                );

                /* Type 2: Code */
                if (block.type === 2) return (
                  <div key={idx} style={{ ...cardStyle, overflow: "hidden" }}>
                    {block.heading && (
                      <div className="flex items-center gap-3 px-6 pt-5 pb-3">
                        <Hash size={13} style={{ color: "var(--gold-dim)" }} />
                        <span style={{ color: "var(--gold-dim)", fontSize: "0.7rem", fontFamily: "'Sora',sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>
                          {block.heading}
                        </span>
                        <span style={{
                          marginLeft: "auto", padding: "2px 8px",
                          border: "1px solid rgba(200,164,90,0.2)", borderRadius: "2px",
                          color: "var(--gold-dim)", fontSize: "0.58rem",
                          fontFamily: "'Sora',sans-serif", textTransform: "uppercase",
                        }}>
                          {block.language}
                        </span>
                      </div>
                    )}
                    <pre style={{
                      margin: 0, padding: "20px 24px",
                      background: "rgba(8,16,28,0.8)",
                      borderTop: "1px solid rgba(200,164,90,0.1)",
                      overflowX: "auto",
                      fontSize: "0.82rem",
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      color: "var(--cream)",
                      lineHeight: 1.7,
                    }}>
                      <code>{block.code}</code>
                    </pre>
                    {block.caption && (
                      <p style={{ padding: "8px 24px 12px", color: "var(--slate)", fontSize: "0.75rem", fontFamily: "'Sora',sans-serif", fontStyle: "italic" }}>
                        {block.caption}
                      </p>
                    )}
                  </div>
                );

                /* Type 3: Quote */
                if (block.type === 3) return (
                  <div key={idx} style={{ ...cardStyle, padding: "28px 32px" }}>
                    <div className="flex items-start gap-4">
                      <span style={{
                        fontFamily: "'Playfair Display',serif",
                        color: "rgba(200,164,90,0.3)", fontSize: "5rem", lineHeight: 0.75, flexShrink: 0,
                      }}>"</span>
                      <div>
                        <p style={{
                          color: "var(--cream)", fontFamily: "'Playfair Display',serif",
                          fontStyle: "italic", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "12px",
                        }}>
                          {block.quote}
                        </p>
                        {block.author && (
                          <div className="flex items-center gap-2">
                            <span className="block w-px h-5" style={{ background: "var(--gold)" }} />
                            <span style={{ color: "var(--gold-dim)", fontSize: "0.78rem", fontFamily: "'Sora',sans-serif" }}>
                              {block.author}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );

                /* Type 4: Divider */
                if (block.type === 4) return (
                  <div key={idx} className="flex items-center gap-4 py-2">
                    <span className="block h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(200,164,90,0.3))" }} />
                    <span style={{ color: "var(--gold-dim)", fontSize: "0.5rem" }}>✦</span>
                    <span className="block h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(200,164,90,0.3), transparent)" }} />
                  </div>
                );
                return null;
              })}

              {/* Tags footer */}
              <div className="flex flex-wrap items-center gap-2 pt-4"
                style={{ borderTop: "1px solid rgba(200,164,90,0.1)" }}>
                <Tag size={12} style={{ color: "var(--gold-dim)" }} />
                {post.tags.map((tag, i) => (
                  <span key={i} style={{
                    padding: "3px 10px",
                    border: "1px solid rgba(200,164,90,0.2)", borderRadius: "2px",
                    color: "var(--slate)", fontSize: "0.65rem",
                    fontFamily: "'Sora',sans-serif",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="space-y-6">

              {/* Table of Contents */}
              {toc.length > 0 && (
                <div style={{ ...cardStyle, position: "sticky", top: "88px" }}>
                  <button
                    className="w-full flex items-center gap-3 p-5"
                    onClick={() => setTocOpen(!tocOpen)}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    <span className="block h-px w-6" style={{ background: "var(--gold)" }} />
                    <span style={{
                      color: "var(--gold-dim)", fontSize: "0.6rem",
                      letterSpacing: "0.22em", textTransform: "uppercase",
                      fontFamily: "'Sora', sans-serif", fontWeight: 700, flex: 1, textAlign: "left",
                    }}>
                      {translations.tableOfContents}
                    </span>
                    <ChevronRight size={12} style={{
                      color: "var(--gold-dim)",
                      transform: tocOpen ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }} />
                  </button>

                  {tocOpen && (
                    <nav className="px-5 pb-5 space-y-1">
                      {toc.map((entry) => (
                        <a
                          key={entry.id}
                          href={`#${entry.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.querySelector(`[data-heading-id="${entry.id}"]`)
                              ?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className="block transition-all duration-200"
                          style={{
                            padding: entry.level === 3 ? "5px 0 5px 16px" : "5px 0",
                            borderLeft: entry.level === 3
                              ? "1px solid rgba(200,164,90,0.15)"
                              : "none",
                            color: activeId === entry.id ? "var(--gold)" : "var(--cream-dim)",
                            fontSize: entry.level === 3 ? "0.72rem" : "0.78rem",
                            fontFamily: "'Sora',sans-serif",
                            fontWeight: activeId === entry.id ? 700 : 400,
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold-light)")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = activeId === entry.id ? "var(--gold)" : "var(--cream-dim)")}
                        >
                          {entry.level === 3 && <span style={{ color: "var(--gold-dim)", marginRight: "6px", fontSize: "0.6rem" }}>›</span>}
                          {entry.text}
                        </a>
                      ))}
                    </nav>
                  )}
                </div>
              )}

              {/* Social Share */}
              <div style={{ ...cardStyle, padding: "20px" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block h-px w-6" style={{ background: "var(--gold)" }} />
                  <span style={{
                    color: "var(--gold-dim)", fontSize: "0.6rem",
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    fontFamily: "'Sora', sans-serif", fontWeight: 700,
                  }}>
                    {translations.shareArticle}
                  </span>
                </div>

                <div className="flex gap-2">
                  {/* Twitter/X */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center flex-1 gap-2 transition-all duration-300"
                    style={{
                      padding: "9px",
                      border: "1px solid rgba(200,164,90,0.2)", borderRadius: "2px",
                      color: "var(--gold-dim)", background: "transparent",
                      fontSize: "0.62rem", fontWeight: 700,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      fontFamily: "'Sora',sans-serif", textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(200,164,90,0.5)";
                      el.style.color = "var(--gold)";
                      el.style.background = "rgba(200,164,90,0.07)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(200,164,90,0.2)";
                      el.style.color = "var(--gold-dim)";
                      el.style.background = "transparent";
                    }}
                  >
                    <Twitter size={13} />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center flex-1 gap-2 transition-all duration-300"
                    style={{
                      padding: "9px",
                      border: "1px solid rgba(200,164,90,0.2)", borderRadius: "2px",
                      color: "var(--gold-dim)", background: "transparent",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(200,164,90,0.5)";
                      el.style.color = "var(--gold)";
                      el.style.background = "rgba(200,164,90,0.07)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(200,164,90,0.2)";
                      el.style.color = "var(--gold-dim)";
                      el.style.background = "transparent";
                    }}
                  >
                    <Linkedin size={13} />
                  </a>

                  {/* Copy link */}
                  <button
                    onClick={copyLink}
                    className="flex items-center justify-center flex-1 gap-1 transition-all duration-300"
                    style={{
                      padding: "9px",
                      border: copied ? "1px solid var(--gold)" : "1px solid rgba(200,164,90,0.2)",
                      borderRadius: "2px",
                      color: copied ? "var(--gold)" : "var(--gold-dim)",
                      background: copied ? "rgba(200,164,90,0.1)" : "transparent",
                      fontSize: "0.55rem", fontWeight: 700,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      fontFamily: "'Sora',sans-serif", cursor: "pointer",
                    }}
                  >
                    <LinkIcon size={13} />
                    {copied ? translations.linkCopied : ""}
                  </button>
                </div>
              </div>

              {/* Author card */}
              <div style={{ ...cardStyle, padding: "20px" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block h-px w-6" style={{ background: "var(--gold)" }} />
                  <span style={{
                    color: "var(--gold-dim)", fontSize: "0.6rem",
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    fontFamily: "'Sora', sans-serif", fontWeight: 700,
                  }}>
                    Author
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img src={post.author.avatar} alt={post.author.name}
                    className="w-12 h-12 object-cover flex-shrink-0"
                    style={{ borderRadius: "2px", border: "1px solid rgba(200,164,90,0.3)" }} />
                  <div>
                    <p style={{ fontFamily: "'Playfair Display',serif", color: "var(--cream)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "2px" }}>
                      {post.author.name}
                    </p>
                    {post.author.title && (
                      <p style={{ color: "var(--slate)", fontSize: "0.7rem", fontFamily: "'Sora',sans-serif" }}>
                        {post.author.title}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* ── Related Articles ─────────────────────── */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              {/* Divider */}
              <div className="flex items-center gap-4 mb-8">
                <span className="block h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(200,164,90,0.3))" }} />
                <span style={{
                  color: "var(--gold-dim)", fontSize: "0.6rem",
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  fontFamily: "'Sora',sans-serif",
                }}>
                  {translations.relatedArticles}
                </span>
                <span className="block h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(200,164,90,0.3), transparent)" }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedPosts.slice(0, 3).map((related, i) => (
                  <Link href={`/${locale}/blog/${related.slug}`} key={related.id} className="group block">
                    <div
                      className="relative overflow-hidden h-full"
                      style={{
                        border: "1px solid rgba(200,164,90,0.12)",
                        borderTop: "2px solid rgba(200,164,90,0.22)",
                        borderRadius: "2px",
                        background: "linear-gradient(145deg, var(--navy-surface) 0%, var(--navy-mid) 100%)",
                        transition: "border-color 0.35s, box-shadow 0.35s, transform 0.35s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor    = "rgba(200,164,90,0.4)";
                        el.style.borderTopColor = "var(--gold)";
                        el.style.boxShadow      = "0 12px 36px rgba(0,0,0,0.35)";
                        el.style.transform      = "translateY(-3px)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor    = "rgba(200,164,90,0.12)";
                        el.style.borderTopColor = "rgba(200,164,90,0.22)";
                        el.style.boxShadow      = "none";
                        el.style.transform      = "translateY(0)";
                      }}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img src={related.coverImage} alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0"
                          style={{ background: "linear-gradient(to top, rgba(13,27,42,0.8) 0%, transparent 60%)" }} />
                        <span className="absolute top-3 right-3" style={{
                          fontFamily: "'Playfair Display',serif",
                          color: "rgba(200,164,90,0.4)", fontSize: "0.65rem", fontWeight: 700,
                        }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="p-4">
                        <p className="mb-1 flex items-center gap-1" style={{ color: "var(--slate)", fontSize: "0.62rem", fontFamily: "'Sora',sans-serif" }}>
                          <Clock size={10} /> {related.readingTime} {translations.readingTime}
                        </p>
                        <h4
                          className="group-hover:text-[var(--gold-light)] transition-colors duration-300"
                          style={{
                            fontFamily: "'Playfair Display',serif",
                            color: "var(--cream)", fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.35,
                          }}
                        >
                          {related.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}