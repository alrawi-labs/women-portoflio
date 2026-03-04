"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { ProjectDetail } from "@/data/types";
import { localeMap } from "@/data/systemLanguages";
import ImageCarousel from "./ImageCarousel";
import CodeBlock from "./CodeBlock";
import { useTranslations } from "next-intl";
import {
  ArrowLeft, Calendar, User, Clock, Users,
  ExternalLink, Github, CheckCircle, ShoppingCart,
  BookOpen, ChevronRight, Sparkles,
} from "lucide-react";

const FALLBACK_TECH_ICON =
  "data:image/svg+xml;base64," +
  btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
    <rect fill="#3e2a40" width="80" height="80" rx="40"/>
    <circle cx="40" cy="40" r="20" fill="#c9748a" opacity="0.3"/>
  </svg>`);

interface ProjectDetailClientProps {
  project: ProjectDetail;
  locale: string;
}

const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({ project, locale }) => {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const t = useTranslations();

  const handleImageError = (logoUrl: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!imageErrors.has(logoUrl)) {
      setImageErrors((prev) => new Set(prev).add(logoUrl));
      e.currentTarget.src = FALLBACK_TECH_ICON;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(localeMap[locale] || "en-US", {
      month: "long", year: "numeric",
    });
  };

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

  const cardStyle: React.CSSProperties = {
    background: "linear-gradient(145deg, var(--plum-surface) 0%, var(--plum-mid) 100%)",
    border: "1px solid rgba(201,116,138,0.12)",
    borderRadius: "20px",
  };

  const sectionHeading = (text: string) => (
    <div className="flex items-center gap-3 mb-6">
      <div style={{ width: "28px", height: "1px", background: "var(--rose)" }} />
      <h3 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "var(--rose-pale)", fontSize: "1.3rem", fontWeight: 600, fontStyle: "italic",
      }}>
        {text}
      </h3>
      <div style={{ flex: 1, maxWidth: "60px", height: "1px", background: "linear-gradient(90deg, var(--rose-dim), transparent)" }} />
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--plum)", color: "var(--rose-pale)" }}>

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
          <circle cx="10%" cy="15%" r="100" fill="none" stroke="rgba(201,116,138,0.3)" strokeWidth="0.5" />
          <circle cx="90%" cy="80%" r="200" fill="none" stroke="rgba(232,160,176,0.4)" strokeWidth="0.8" />
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(201,116,138,0.05) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
      </div>

      <div className="relative z-10">

        {/* ── Hero ─────────────────────────────────── */}
        <div className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="container mx-auto max-w-7xl mt-4">

            {/* Back link */}
            <Link
              href={`/${locale}/projects`}
              className="group inline-flex items-center gap-2 mb-10 transition-all duration-300"
              style={{
                color: "var(--slate)", fontSize: "0.7rem", fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase",
                fontFamily: "'Jost', sans-serif", textDecoration: "none",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--rose-light)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--slate)")}
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-300" />
              {t("backToProjects")}
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-start">

              {/* ── Left: Info ─────────────────────── */}
              <div>
                {/* Category badge */}
                <div className="mb-6" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  border: "1px solid rgba(201,116,138,0.3)", borderRadius: "50px",
                  padding: "5px 18px", background: "rgba(201,116,138,0.07)",
                }}>
                  <Sparkles size={10} style={{ color: "var(--rose)" }} />
                  <span style={{
                    color: "var(--rose-light)", fontSize: "0.62rem",
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    fontFamily: "'Jost', sans-serif", fontWeight: 600,
                  }}>
                    {project.category}
                  </span>
                </div>

                <h1 className="mb-4" style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 600, fontStyle: "italic",
                  background: "linear-gradient(135deg, var(--rose-pale) 0%, var(--rose-light) 45%, var(--rose) 80%, var(--rose-dim) 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  lineHeight: 1.2,
                }}>
                  {project.title}
                </h1>

                {/* Rose divider */}
                <div className="flex items-center gap-3 mb-5">
                  <div style={{ width: "40px", height: "1px", background: "var(--rose)" }} />
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--rose)", opacity: 0.5 }} />
                  <div style={{ width: "80px", height: "1px", background: "linear-gradient(90deg, var(--rose-dim), transparent)" }} />
                </div>

                {project.subtitle && (
                  <p className="mb-4" style={{
                    color: "var(--rose-dim)", fontSize: "1rem",
                    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                  }}>
                    {project.subtitle}
                  </p>
                )}

                <p className="mb-8" style={{
                  color: "var(--slate)", fontSize: "0.95rem",
                  fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85,
                }}>
                  {project.description}
                </p>

                {/* Meta cards */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { show: project.date || (project as any).meta?.date,        icon: Calendar, label: t("date"),     value: formatDate(project.date || (project as any).meta?.date) },
                    { show: project.duration || (project as any).meta?.duration, icon: Clock,    label: t("duration"), value: project.duration || (project as any).meta?.duration },
                    { show: project.client || (project as any).meta?.client,     icon: User,     label: t("client"),   value: project.client || (project as any).meta?.client },
                    { show: project.teamSize || (project as any).meta?.teamSize, icon: Users,    label: t("teamSize"), value: project.teamSize || (project as any).meta?.teamSize },
                  ].filter((m) => m.show).map((meta, i) => {
                    const Icon = meta.icon;
                    return (
                      <div key={i} style={{ ...cardStyle, padding: "16px" }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div style={{
                            width: "28px", height: "28px", borderRadius: "50%",
                            border: "1px solid rgba(201,116,138,0.25)",
                            background: "rgba(201,116,138,0.07)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <Icon size={12} style={{ color: "var(--rose-light)" }} />
                          </div>
                          <span style={{
                            color: "var(--slate)", fontSize: "0.58rem",
                            letterSpacing: "0.18em", textTransform: "uppercase",
                            fontFamily: "'Jost', sans-serif",
                          }}>
                            {meta.label}
                          </span>
                        </div>
                        <p style={{
                          color: "var(--rose-pale)", fontSize: "0.88rem",
                          fontFamily: "'Jost', sans-serif", fontWeight: 500,
                        }}>
                          {meta.value}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  {project.demoLink && (
                    <a
                      href={project.demoLink} target="_blank" rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        padding: "12px 26px",
                        background: "linear-gradient(135deg, var(--rose-light) 0%, var(--rose) 55%, var(--rose-dim) 100%)",
                        color: "var(--plum)", borderRadius: "50px",
                        fontSize: "0.72rem", fontWeight: 700,
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        fontFamily: "'Jost', sans-serif", textDecoration: "none",
                        boxShadow: "0 4px 20px rgba(201,116,138,0.3)",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(201,116,138,0.45)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(201,116,138,0.3)")}
                    >
                      <ExternalLink size={13} />
                      {t("liveDemo")}
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink} target="_blank" rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        padding: "12px 26px",
                        border: "1px solid rgba(201,116,138,0.35)", borderRadius: "50px",
                        color: "var(--rose-light)",
                        fontSize: "0.72rem", fontWeight: 700,
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        fontFamily: "'Jost', sans-serif",
                        textDecoration: "none", background: "transparent",
                        transition: "background 0.3s, border-color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background  = "rgba(201,116,138,0.1)";
                        el.style.borderColor = "rgba(201,116,138,0.6)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background  = "transparent";
                        el.style.borderColor = "rgba(201,116,138,0.35)";
                      }}
                    >
                      <Github size={13} />
                      {t("viewSource")}
                    </a>
                  )}
                </div>
              </div>

              {/* ── Right: Image + Tech logos ───────── */}
              <div className="space-y-6">
                {/* Main image */}
                <div className="group relative overflow-hidden" style={{
                  borderRadius: "20px",
                  border: "1px solid rgba(201,116,138,0.2)",
                }}>
                  <img
                    src={project.image} alt={project.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(to top, rgba(45,31,46,0.5) 0%, transparent 60%)",
                    borderRadius: "20px",
                  }} />
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                    background: "radial-gradient(ellipse at 50% 0%, rgba(201,116,138,0.1) 0%, transparent 60%)",
                  }} />
                </div>

                {/* Tech logos */}
                {project.techLogos && project.techLogos.length > 0 && (
                  <div style={{ ...cardStyle, padding: "24px" }}>
                    {sectionHeading(t("technologiesUsed"))}
                    <div className="flex flex-wrap gap-3">
                      {project.techLogos.map((logo: string, idx: number) => (
                        <div
                          key={idx}
                          className="group/tech transition-all duration-300 hover:-translate-y-1"
                          style={{
                            padding: "12px", borderRadius: "14px",
                            border: "1px solid rgba(201,116,138,0.15)",
                            background: "rgba(201,116,138,0.04)",
                            transition: "border-color 0.3s",
                          }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(201,116,138,0.45)")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(201,116,138,0.15)")}
                        >
                          <img
                            src={logo} alt="Tech"
                            className="w-10 h-10 object-contain filter grayscale group-hover/tech:grayscale-0 transition-all duration-300"
                            onError={(e) => handleImageError(logo, e)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Content Section ──────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Main content ── */}
            <div className="lg:col-span-2 space-y-8">

              {project.contentBlocks && project.contentBlocks.length > 0 && (
                <div className="space-y-8">
                  {project.contentBlocks.map((block: any, idx: number) => {
                    if (block.type === 0) return (
                      <div key={idx} style={{ ...cardStyle, padding: "32px" }}>
                        {block.heading && sectionHeading(block.heading)}
                        {block.subheading && (
                          <p className="mb-3" style={{
                            color: "var(--rose-dim)", fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "1rem", fontStyle: "italic",
                          }}>{block.subheading}</p>
                        )}
                        {block.content && (
                          <div style={{
                            color: "var(--slate)", fontSize: "0.9rem",
                            fontFamily: "'Jost', sans-serif", fontWeight: 300,
                            lineHeight: 1.9, whiteSpace: "pre-line",
                          }}>
                            {parseMarkdown(block.content)}
                          </div>
                        )}
                      </div>
                    );
                    if (block.type === 1) return (
                      <div key={idx} className="space-y-3">
                        {block.heading && sectionHeading(block.heading)}
                        <div className="group relative overflow-hidden" style={{ borderRadius: "20px", border: "1px solid rgba(201,116,138,0.2)" }}>
                          <img src={block.imageUrl} alt={block.heading || "Project image"}
                            className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        {block.caption && (
                          <p style={{ color: "var(--slate)", fontSize: "0.78rem", fontFamily: "'Jost',sans-serif", fontStyle: "italic", textAlign: "center" }}>
                            {block.caption}
                          </p>
                        )}
                      </div>
                    );
                    if (block.type === 2) return (
                      <div key={idx} className="space-y-3">
                        {block.heading && sectionHeading(block.heading)}
                        <div style={{ borderRadius: "20px", border: "1px solid rgba(201,116,138,0.2)", overflow: "hidden" }}>
                          <video src={block.videoUrl} controls className="w-full aspect-video object-cover" poster={block.posterUrl}>
                            {t("videoNotSupported")}
                          </video>
                        </div>
                        {block.caption && (
                          <p style={{ color: "var(--slate)", fontSize: "0.78rem", fontFamily: "'Jost',sans-serif", fontStyle: "italic", textAlign: "center" }}>
                            {block.caption}
                          </p>
                        )}
                      </div>
                    );
                    if (block.type === 3) return (
                      <div key={idx}>
                        <ImageCarousel images={block.images || []} heading={block.heading}
                          autoPlay={block.autoPlay !== false} autoPlayInterval={block.autoPlayInterval || 5000} />
                      </div>
                    );
                    if (block.type === 4) return (
                      <div key={idx}>
                        <CodeBlock heading={block.heading} subheading={block.subheading}
                          content={block.content} codeBlocks={block.codeBlocks || []} defaultTab={block.defaultTab || 0} />
                      </div>
                    );
                    return null;
                  })}
                </div>
              )}

              {/* Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <div style={{ ...cardStyle, padding: "32px" }}>
                  {sectionHeading(t("challenges"))}
                  <div className="space-y-3">
                    {project.challenges.map((challenge: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3" style={{
                        padding: "14px 18px",
                        background: "rgba(201,116,138,0.04)",
                        borderLeft: "3px solid rgba(201,116,138,0.3)",
                        borderRadius: "0 12px 12px 0",
                      }}>
                        <span style={{ color: "var(--rose-dim)", fontFamily: "'Cormorant Garamond',serif", fontSize: "0.8rem", marginTop: "2px", flexShrink: 0, fontStyle: "italic" }}>
                          {String(idx + 1).padStart(2, "0")}.
                        </span>
                        <p style={{ color: "var(--slate)", fontSize: "0.88rem", fontFamily: "'Jost',sans-serif", fontWeight: 300, lineHeight: 1.8 }}>
                          {challenge}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Solutions */}
              {project.solutions && project.solutions.length > 0 && (
                <div style={{ ...cardStyle, padding: "32px" }}>
                  {sectionHeading(t("solutions"))}
                  <div className="space-y-3">
                    {project.solutions.map((solution: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3" style={{
                        padding: "14px 18px",
                        background: "rgba(201,116,138,0.06)",
                        borderLeft: "3px solid var(--rose)",
                        borderRadius: "0 12px 12px 0",
                      }}>
                        <CheckCircle size={14} style={{ color: "var(--rose-light)", marginTop: "3px", flexShrink: 0 }} />
                        <p style={{ color: "var(--slate)", fontSize: "0.88rem", fontFamily: "'Jost',sans-serif", fontWeight: 300, lineHeight: 1.8 }}>
                          {solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {project.results && project.results.length > 0 && (
                <div style={{
                  padding: "32px", borderRadius: "20px",
                  background: "linear-gradient(145deg, rgba(201,116,138,0.07) 0%, var(--plum-mid) 100%)",
                  border: "1px solid rgba(201,116,138,0.2)",
                }}>
                  {sectionHeading(t("resultsImpact"))}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.results.map((result: any, idx: number) => (
                      <div key={idx} style={{
                        padding: "20px", borderRadius: "16px",
                        background: "rgba(45,31,46,0.5)",
                        border: "1px solid rgba(201,116,138,0.15)",
                      }}>
                        <div style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "2.2rem", fontWeight: 600, fontStyle: "italic",
                          background: "linear-gradient(135deg, var(--rose-pale) 0%, var(--rose-light) 100%)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                          marginBottom: "4px",
                        }}>
                          {result.value}
                        </div>
                        <div style={{ color: "var(--rose-dim)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Jost',sans-serif", marginBottom: "4px" }}>
                          {result.metric}
                        </div>
                        <p style={{ color: "var(--slate)", fontSize: "0.82rem", fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>
                          {result.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonial */}
              {project.testimonial && (
                <div style={{ ...cardStyle, padding: "32px" }}>
                  <div className="flex items-start gap-4">
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: "rgba(201,116,138,0.25)", fontSize: "5rem", lineHeight: 0.75, flexShrink: 0,
                    }}>"</span>
                    <div>
                      <p className="mb-5" style={{
                        color: "var(--slate)",
                        fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", lineHeight: 1.9, fontSize: "1.05rem",
                      }}>
                        {project.testimonial.text}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="block w-px h-8" style={{ background: "var(--rose)" }} />
                        <div>
                          <p style={{ color: "var(--rose-pale)", fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: "0.95rem" }}>
                            {project.testimonial.author}
                          </p>
                          <p style={{ color: "var(--slate)", fontSize: "0.72rem", fontFamily: "'Jost',sans-serif", fontWeight: 300 }}>
                            {project.testimonial.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6">

              {/* Buy card */}
              {project.buy && (
                <div style={{
                  position: "relative", padding: "28px", borderRadius: "20px",
                  background: "linear-gradient(145deg, rgba(201,116,138,0.09) 0%, var(--plum-mid) 100%)",
                  border: "1px solid rgba(201,116,138,0.3)",
                  overflow: "hidden",
                }}>
                  <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(201,116,138,0.05) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }} />
                  <div className="absolute top-0 left-0 right-0 h-px" style={{
                    background: "linear-gradient(90deg, transparent, var(--rose), transparent)",
                  }} />

                  <div className="relative z-10 space-y-5">
                    <div className="flex items-center gap-3">
                      <div style={{
                        width: "38px", height: "38px", borderRadius: "50%",
                        border: "1px solid rgba(201,116,138,0.3)",
                        background: "rgba(201,116,138,0.08)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <ShoppingCart size={15} style={{ color: "var(--rose-light)" }} />
                      </div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", color: "var(--rose-pale)", fontSize: "1.1rem", fontWeight: 600, fontStyle: "italic" }}>
                        {t("buy")}
                      </h3>
                    </div>

                    <div className="flex items-end gap-1">
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "2.8rem", fontWeight: 600, fontStyle: "italic",
                        background: "linear-gradient(135deg, var(--rose-pale) 0%, var(--rose-light) 100%)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        lineHeight: 1,
                      }}>
                        {project.buy.price}
                      </span>
                      <span style={{ color: "var(--slate)", fontSize: "0.8rem", marginBottom: "4px", fontFamily: "'Jost',sans-serif" }}>
                        {project.buy.currency}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {project.buy.features.map((feature: string) => (
                        <div key={feature} className="flex items-start gap-2.5">
                          <ChevronRight size={12} style={{ color: "var(--rose)", marginTop: "3px", flexShrink: 0 }} />
                          <p style={{ color: "var(--slate)", fontSize: "0.8rem", fontFamily: "'Jost',sans-serif", fontWeight: 300, lineHeight: 1.6 }}>
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>

                    <a
                      href={project.buy.buylink} target="_blank"
                      className="flex items-center justify-center gap-2 w-full transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        padding: "13px",
                        background: "linear-gradient(135deg, var(--rose-light) 0%, var(--rose) 55%, var(--rose-dim) 100%)",
                        color: "var(--plum)", borderRadius: "50px",
                        fontSize: "0.72rem", fontWeight: 700,
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        fontFamily: "'Jost',sans-serif", textDecoration: "none",
                        boxShadow: "0 4px 20px rgba(201,116,138,0.3)",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(201,116,138,0.45)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(201,116,138,0.3)")}
                    >
                      <ShoppingCart size={13} />
                      {t("buynow")}
                    </a>
                  </div>
                </div>
              )}

              {/* Technologies sidebar */}
              {project.technologies && project.technologies.length > 0 && (
                <div style={{ ...cardStyle, padding: "24px", position: "sticky", top: "96px" }}>
                  {sectionHeading(t("technologies"))}
                  <div className="space-y-4">
                    {project.technologies.map((tech: any, idx: number) => (
                      <div key={idx} style={{
                        paddingBottom: "16px",
                        borderBottom: idx < project.technologies.length - 1
                          ? "1px solid rgba(201,116,138,0.08)"
                          : "none",
                      }}>
                        <div className="flex items-center gap-2 mb-1">
                          <span style={{ color: "var(--rose-dim)", fontSize: "0.6rem", fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontStyle: "italic" }}>
                            {String(idx + 1).padStart(2, "0")}.
                          </span>
                          <p style={{ color: "var(--rose-pale)", fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: "0.95rem" }}>
                            {tech.name}
                          </p>
                        </div>
                        <p style={{ color: "var(--slate)", fontSize: "0.78rem", fontFamily: "'Jost',sans-serif", fontWeight: 300, lineHeight: 1.65, paddingLeft: "20px" }}>
                          {tech.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailClient;