"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft, Clock, Calendar, Tag,
  Twitter, Linkedin, Link as LinkIcon,
  ChevronRight, Hash, Sparkles,
} from "lucide-react";
import type { BlogPost, BlogContentBlock } from "@/data/types";
import { localeMap } from "@/data/systemLanguages";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";

interface BlogDetailTranslations {
  backToBlog:      string;
  readingTime:     string;
  tableOfContents: string;
  relatedArticles: string;
  shareArticle:    string;
  linkCopied:      string;
  categories:      Record<string, string>;
}

interface BlogDetailClientProps {
  post:         BlogPost;
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
          ? <strong key={i} style={{ color: "var(--rose-pale)", fontWeight: 700 }}>{part.slice(2, -2)}</strong>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

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
  const [activeId, setActiveId] = useState<string>("");
  const [copied,   setCopied]   = useState(false);
  const [tocOpen,  setTocOpen]  = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const toc = useMemo(() => buildToc(post.contentBlocks), [post.contentBlocks]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(
      localeMap[locale as keyof typeof localeMap] || "en-US",
      { day: "numeric", month: "long", year: "numeric" }
    );

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
    background: "linear-gradient(145deg, var(--plum-surface) 0%, var(--plum-mid) 100%)",
    border: "1px solid rgba(201,116,138,0.12)",
    borderRadius: "20px",
  };

  const sectionHeading = (text: string) => (
    <div className="flex items-center gap-3 mb-5">
      <div style={{ width: "28px", height: "1px", background: "var(--rose)" }} />
      <h2 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "var(--rose-pale)", fontSize: "1.35rem", fontWeight: 600, fontStyle: "italic",
      }}>
        {text}
      </h2>
      <div style={{ flex: 1, maxWidth: "60px", height: "1px", background: "linear-gradient(90deg, var(--rose-dim), transparent)" }} />
    </div>
  );

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
            "radial-gradient(ellipse 60% 50% at 5% 5%, rgba(201,116,138,0.10) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 45% at 95% 90%, rgba(154,82,104,0.08) 0%, transparent 60%)",
        }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          <circle cx="10%" cy="15%" r="160" fill="none" stroke="rgba(201,116,138,0.5)" strokeWidth="0.8" />
          <circle cx="90%" cy="80%" r="200" fill="none" stroke="rgba(232,160,176,0.4)" strokeWidth="0.8" />
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(201,116,138,0.05) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
      </div>

      <div className="relative z-10">

        {/* ── Hero / Cover ─────────────────────────── */}
        <div className="relative">
          <div className="relative h-[45vh] min-h-[320px] overflow-hidden">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to bottom, rgba(45,31,46,0.4) 0%, rgba(45,31,46,0.92) 100%)",
            }} />
            {/* Soft rose vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse at 50% 100%, rgba(201,116,138,0.08) 0%, transparent 60%)",
            }} />
          </div>

          {/* Hero text overlay */}
          <div className="absolute bottom-0 left-0 right-0 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl">
              {/* Back link */}
              <Link
                href={`/${locale}/blog`}
                className="group inline-flex items-center gap-2 mb-6 transition-colors duration-200"
                style={{
                  color: "rgba(232,160,176,0.6)", textDecoration: "none",
                  fontSize: "0.7rem", fontFamily: "'Jost',sans-serif",
                  fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--rose-light)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(232,160,176,0.6)")}
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-300" />
                {translations.backToBlog}
              </Link>

              {/* Category badge */}
              <div className="mb-5" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                border: "1px solid rgba(201,116,138,0.4)", borderRadius: "50px",
                padding: "5px 16px", background: "rgba(45,31,46,0.75)",
                backdropFilter: "blur(10px)",
              }}>
                <Sparkles size={10} style={{ color: "var(--rose)" }} />
                <span style={{
                  color: "var(--rose-light)", fontSize: "0.62rem",
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  fontFamily: "'Jost', sans-serif", fontWeight: 600,
                }}>
                  {translations.categories[post.category] ?? post.category}
                </span>
              </div>

              <h1 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 600, fontStyle: "italic",
                background: "linear-gradient(135deg, var(--rose-pale) 0%, var(--rose-light) 55%, #ffffff 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                lineHeight: 1.2, marginBottom: "12px",
              }}>
                {post.title}
              </h1>

              {post.subtitle && (
                <p style={{
                  color: "rgba(232,160,176,0.75)", fontFamily: "'Cormorant Garamond',serif",
                  fontStyle: "italic", fontSize: "1.05rem", marginBottom: "18px",
                }}>
                  {post.subtitle}
                </p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <img src={post.author.avatar} alt={post.author.name}
                    className="w-8 h-8 object-cover"
                    style={{ borderRadius: "50%", border: "1px solid rgba(201,116,138,0.4)" }} />
                  <span style={{ color: "rgba(232,160,176,0.85)", fontSize: "0.8rem", fontFamily: "'Jost',sans-serif", fontWeight: 400 }}>
                    {post.author.name}
                  </span>
                </div>
                <span style={{ color: "rgba(201,116,138,0.35)" }}>·</span>
                <span className="flex items-center gap-1" style={{ color: "rgba(232,160,176,0.6)", fontSize: "0.75rem", fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>
                  <Calendar size={11} /> {formatDate(post.publishedAt)}
                </span>
                <span style={{ color: "rgba(201,116,138,0.35)" }}>·</span>
                <span className="flex items-center gap-1" style={{ color: "rgba(232,160,176,0.6)", fontSize: "0.75rem", fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>
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
                      <div data-heading-id={slugify(block.heading)}>
                        {sectionHeading(block.heading)}
                      </div>
                    )}
                    {block.subheading && (
                      <p data-heading-id={slugify(block.subheading)} className="mb-3" style={{
                        color: "var(--rose-dim)", fontFamily: "'Cormorant Garamond',serif",
                        fontSize: "1rem", fontStyle: "italic",
                      }}>
                        {block.subheading}
                      </p>
                    )}
                    {block.content && (
                      <div style={{
                        color: "var(--slate)", fontSize: "0.95rem",
                        fontFamily: "'Jost',sans-serif", fontWeight: 300,
                        lineHeight: 1.9, whiteSpace: "pre-line",
                      }}>
                        {parseMarkdown(block.content)}
                      </div>
                    )}
                  </div>
                );

                /* Type 1: Image */
                if (block.type === 1) return (
                  <div key={idx} className="space-y-3">
                    {block.heading && sectionHeading(block.heading)}
                    <div className="group relative overflow-hidden" style={{
                      borderRadius: "20px", border: "1px solid rgba(201,116,138,0.2)",
                    }}>
                      <img src={block.imageUrl} alt={block.heading || ""}
                        className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                        background: "radial-gradient(ellipse at 50% 0%, rgba(201,116,138,0.07) 0%, transparent 60%)",
                      }} />
                    </div>
                    {block.caption && (
                      <p style={{ color: "var(--slate)", fontSize: "0.78rem", fontFamily: "'Jost',sans-serif", fontStyle: "italic", textAlign: "center", fontWeight: 300 }}>
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
                        <Hash size={13} style={{ color: "var(--rose-dim)" }} />
                        <span style={{ color: "var(--rose-dim)", fontSize: "0.7rem", fontFamily: "'Jost',sans-serif", fontWeight: 600, letterSpacing: "0.1em" }}>
                          {block.heading}
                        </span>
                        <span style={{
                          marginLeft: "auto", padding: "2px 10px",
                          border: "1px solid rgba(201,116,138,0.2)", borderRadius: "50px",
                          color: "var(--rose-dim)", fontSize: "0.58rem",
                          fontFamily: "'Jost',sans-serif", textTransform: "uppercase",
                        }}>
                          {block.language}
                        </span>
                      </div>
                    )}
                    <pre style={{
                      margin: 0, padding: "20px 24px",
                      background: "rgba(20,10,22,0.85)",
                      borderTop: "1px solid rgba(201,116,138,0.1)",
                      overflowX: "auto",
                      fontSize: "0.82rem",
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      color: "var(--rose-pale)",
                      lineHeight: 1.7,
                    }}>
                      <code>{block.code}</code>
                    </pre>
                    {block.caption && (
                      <p style={{ padding: "8px 24px 12px", color: "var(--slate)", fontSize: "0.75rem", fontFamily: "'Jost',sans-serif", fontStyle: "italic", fontWeight: 300 }}>
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
                        fontFamily: "'Cormorant Garamond',serif",
                        color: "rgba(201,116,138,0.25)", fontSize: "5rem", lineHeight: 0.75, flexShrink: 0,
                      }}>"</span>
                      <div>
                        <p style={{
                          color: "var(--rose-pale)", fontFamily: "'Cormorant Garamond',serif",
                          fontStyle: "italic", fontSize: "1.15rem", lineHeight: 1.75, marginBottom: "12px",
                        }}>
                          {block.quote}
                        </p>
                        {block.author && (
                          <div className="flex items-center gap-2">
                            <span className="block w-px h-5" style={{ background: "var(--rose)" }} />
                            <span style={{ color: "var(--rose-dim)", fontSize: "0.78rem", fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>
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
                    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,116,138,0.3))" }} />
                    <div style={{ display: "flex", gap: "5px" }}>
                      {[0,1,2].map(i => (
                        <div key={i} style={{
                          width: i === 1 ? "5px" : "4px", height: i === 1 ? "5px" : "4px",
                          borderRadius: "50%", background: i === 1 ? "var(--rose)" : "var(--rose-dim)",
                          opacity: i === 1 ? 0.7 : 0.35,
                        }} />
                      ))}
                    </div>
                    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(201,116,138,0.3), transparent)" }} />
                  </div>
                );

                return null;
              })}

              {/* Tags footer */}
              <div className="flex flex-wrap items-center gap-2 pt-4"
                style={{ borderTop: "1px solid rgba(201,116,138,0.1)" }}>
                <Tag size={12} style={{ color: "var(--rose-dim)" }} />
                {post.tags.map((tag, i) => (
                  <span key={i} style={{
                    padding: "3px 12px",
                    border: "1px solid rgba(201,116,138,0.2)", borderRadius: "50px",
                    color: "var(--slate)", fontSize: "0.65rem",
                    fontFamily: "'Jost',sans-serif", fontWeight: 300,
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,116,138,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "var(--rose-light)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,116,138,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "var(--slate)";
                  }}
                  >
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
                    <div style={{ width: "20px", height: "1px", background: "var(--rose)" }} />
                    <span style={{
                      color: "var(--rose-dim)", fontSize: "0.6rem",
                      letterSpacing: "0.22em", textTransform: "uppercase",
                      fontFamily: "'Jost', sans-serif", fontWeight: 600, flex: 1, textAlign: "left",
                    }}>
                      {translations.tableOfContents}
                    </span>
                    <ChevronRight size={12} style={{
                      color: "var(--rose-dim)",
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
                            borderLeft: entry.level === 3 ? "1px solid rgba(201,116,138,0.15)" : "none",
                            color: activeId === entry.id ? "var(--rose-light)" : "var(--slate)",
                            fontSize: entry.level === 3 ? "0.72rem" : "0.78rem",
                            fontFamily: "'Jost',sans-serif",
                            fontWeight: activeId === entry.id ? 600 : 300,
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--rose-light)")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = activeId === entry.id ? "var(--rose-light)" : "var(--slate)")}
                        >
                          {entry.level === 3 && <span style={{ color: "var(--rose-dim)", marginRight: "6px", fontSize: "0.6rem" }}>›</span>}
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
                  <div style={{ width: "20px", height: "1px", background: "var(--rose)" }} />
                  <span style={{
                    color: "var(--rose-dim)", fontSize: "0.6rem",
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    fontFamily: "'Jost', sans-serif", fontWeight: 600,
                  }}>
                    {translations.shareArticle}
                  </span>
                </div>

                <div className="flex gap-2">
                  {[
                    {
                      icon: <Twitter size={13} />,
                      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
                    },
                    {
                      icon: <Linkedin size={13} />,
                      href: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
                    },
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center flex-1 transition-all duration-300"
                      style={{
                        padding: "9px",
                        border: "1px solid rgba(201,116,138,0.2)", borderRadius: "50px",
                        color: "var(--rose-dim)", background: "transparent",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(201,116,138,0.5)";
                        el.style.color = "var(--rose-light)";
                        el.style.background = "rgba(201,116,138,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(201,116,138,0.2)";
                        el.style.color = "var(--rose-dim)";
                        el.style.background = "transparent";
                      }}
                    >
                      {item.icon}
                    </a>
                  ))}

                  {/* Copy link */}
                  <button
                    onClick={copyLink}
                    className="flex items-center justify-center flex-1 gap-1 transition-all duration-300"
                    style={{
                      padding: "9px",
                      border: copied ? "1px solid var(--rose)" : "1px solid rgba(201,116,138,0.2)",
                      borderRadius: "50px",
                      color: copied ? "var(--rose-light)" : "var(--rose-dim)",
                      background: copied ? "rgba(201,116,138,0.12)" : "transparent",
                      fontSize: "0.55rem", fontWeight: 600,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      fontFamily: "'Jost',sans-serif", cursor: "pointer",
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
                  <div style={{ width: "20px", height: "1px", background: "var(--rose)" }} />
                  <span style={{
                    color: "var(--rose-dim)", fontSize: "0.6rem",
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    fontFamily: "'Jost', sans-serif", fontWeight: 600,
                  }}>
                    Author
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img src={post.author.avatar} alt={post.author.name}
                    className="w-12 h-12 object-cover flex-shrink-0"
                    style={{ borderRadius: "50%", border: "1px solid rgba(201,116,138,0.3)" }} />
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "var(--rose-pale)", fontWeight: 600, fontStyle: "italic", fontSize: "0.95rem", marginBottom: "2px" }}>
                      {post.author.name}
                    </p>
                    {post.author.title && (
                      <p style={{ color: "var(--slate)", fontSize: "0.7rem", fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>
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
            <div className="mt-20">
              <div className="flex items-center gap-4 mb-8">
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,116,138,0.3))" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Sparkles size={11} style={{ color: "var(--rose-dim)" }} />
                  <span style={{
                    color: "var(--rose-dim)", fontSize: "0.6rem",
                    letterSpacing: "0.25em", textTransform: "uppercase",
                    fontFamily: "'Jost',sans-serif", fontWeight: 600,
                  }}>
                    {translations.relatedArticles}
                  </span>
                  <Sparkles size={11} style={{ color: "var(--rose-dim)" }} />
                </div>
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(201,116,138,0.3), transparent)" }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.slice(0, 3).map((related, i) => (
                  <Link href={`/${locale}/blog/${related.slug}`} key={related.id} className="group block">
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
                        el.style.boxShadow   = "0 16px 48px rgba(154,82,104,0.25)";
                        el.style.transform   = "translateY(-5px)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(201,116,138,0.12)";
                        el.style.boxShadow   = "none";
                        el.style.transform   = "translateY(0)";
                      }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                        background: "radial-gradient(ellipse at 50% 0%, rgba(201,116,138,0.07) 0%, transparent 60%)",
                        borderRadius: "20px",
                      }} />

                      <div className="relative h-40 overflow-hidden" style={{ borderRadius: "20px 20px 0 0" }}>
                        <img src={related.coverImage} alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0"
                          style={{ background: "linear-gradient(to top, rgba(45,31,46,0.85) 0%, transparent 60%)" }} />
                        <span className="absolute top-3 right-3" style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          color: "rgba(232,160,176,0.5)", fontSize: "0.8rem",
                          fontWeight: 600, fontStyle: "italic",
                        }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-px"
                          style={{ background: "linear-gradient(90deg, transparent, rgba(201,116,138,0.3), transparent)" }} />
                      </div>

                      <div className="p-5">
                        <p className="mb-2 flex items-center gap-1" style={{ color: "var(--slate)", fontSize: "0.62rem", fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>
                          <Clock size={10} /> {related.readingTime} {translations.readingTime}
                        </p>
                        <h4
                          className="group-hover:text-[var(--rose-pale)] transition-colors duration-300"
                          style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            color: "var(--rose-pale)", fontSize: "1rem",
                            fontWeight: 600, fontStyle: "italic", lineHeight: 1.35,
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

      <div className="mt-auto"><Footer /></div>
    </div>
  );
}