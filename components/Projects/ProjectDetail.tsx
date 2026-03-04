"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { ProjectDetail } from "@/data/types";
import { localeMap } from "@/data/systemLanguages";
import ImageCarousel from "./ImageCarousel";
import CodeBlock from "./CodeBlock";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Users,
  ExternalLink,
  Github,
  CheckCircle,
  ShoppingCart,
  BookOpen,
  ChevronRight,
} from "lucide-react";

const FALLBACK_TECH_ICON =
  "data:image/svg+xml;base64," +
  btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
    <rect fill="#0d1b2a" width="80" height="80" rx="4"/>
    <circle cx="40" cy="40" r="20" fill="#c8a45a" opacity="0.3"/>
  </svg>`);

interface ProjectDetailClientProps {
  project: ProjectDetail;
  locale: string;
}

const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({
  project,
  locale,
}) => {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const t = useTranslations();

  const handleImageError = (
    logoUrl: string,
    e: React.SyntheticEvent<HTMLImageElement>,
  ) => {
    if (!imageErrors.has(logoUrl)) {
      setImageErrors((prev) => new Set(prev).add(logoUrl));
      e.currentTarget.src = FALLBACK_TECH_ICON;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(
      localeMap[locale] || "en-US",
      {
        month: "long",
        year: "numeric",
      },
    );
  };

  function parseMarkdown(text: string): JSX.Element {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
      <>
        {parts.map((part, i) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={i} style={{ color: "var(--cream)", fontWeight: 700 }}>
              {part.slice(2, -2)}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </>
    );
  }

  const roseGold = {
    light: "#f0c4c2",
    main: "#dda7a5",
    dark: "#b3817e",
    glow: "rgba(221, 167, 165, 0.4)",
    border: "rgba(221, 167, 165, 0.2)",
    bgGlow: "rgba(221, 167, 165, 0.08)",
  };

  /* Shared card style */
  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.02)",
    backdropFilter: "blur(10px)",
    border: `1px solid ${roseGold.border}`,
    borderTop: `2px solid ${roseGold.main}44`,
    borderRadius: "4px",
  };

  const sectionHeading = (text: string) => (
    <div className="flex items-center gap-3 mb-5">
      <span className="block h-px w-8" style={{ background: roseGold.main }} />
      <h3
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: roseGold.light,
          fontSize: "1.25rem",
          fontWeight: 800,
        }}
      >
        {text}
      </h3>
      <span
        className="block h-px flex-1 max-w-[60px]"
        style={{
          background: `linear-gradient(90deg, ${roseGold.main}, transparent)`,
        }}
      />
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg-primary)", color: "var(--cream)" }}
    >
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
          {[120, 240, 360, 480, 600, 720, 840, 960, 1080].map((y) => (
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
            d="M 1140 980 L 1140 930 L 1090 930"
            fill="none"
            stroke={roseGold.main}
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>
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
                color: "var(--slate)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = roseGold.main)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--slate)")
              }
            >
              <ArrowLeft
                size={13}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              {t("backToProjects")}
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* ── Left: Info ─────────────────────── */}
              <div>
                {/* Section marker */}
                <div
                  className="mb-5"
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
                    {project.category}
                  </span>
                </div>

                <h1
                  className="mb-4"
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
                  {project.title}
                </h1>

                {/* Rose gold rule */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="block h-px w-12"
                    style={{ background: roseGold.main }}
                  />
                  <span style={{ color: roseGold.main, fontSize: "0.5rem" }}>
                    ✦
                  </span>
                  <span
                    className="block h-px w-24"
                    style={{
                      background: `linear-gradient(90deg, ${roseGold.main}, transparent)`,
                    }}
                  />
                </div>

                {project.subtitle && (
                  <p
                    className="mb-4"
                    style={{
                      color: roseGold.main,
                      fontSize: "1.1rem",
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      opacity: 0.9,
                    }}
                  >
                    {project.subtitle}
                  </p>
                )}

                <p
                  className="mb-8"
                  style={{
                    color: "var(--cream-dim)",
                    fontSize: "0.95rem",
                    fontFamily: "'Sora', sans-serif",
                    lineHeight: 1.8,
                  }}
                >
                  {project.description}
                </p>

                {/* Meta cards */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    {
                      show: project.date || (project as any).meta?.date,
                      icon: Calendar,
                      label: t("date"),
                      value: formatDate(
                        project.date || (project as any).meta?.date,
                      ),
                    },
                    {
                      show: project.duration || (project as any).meta?.duration,
                      icon: Clock,
                      label: t("duration"),
                      value:
                        project.duration || (project as any).meta?.duration,
                    },
                    {
                      show: project.client || (project as any).meta?.client,
                      icon: User,
                      label: t("client"),
                      value: project.client || (project as any).meta?.client,
                    },
                    {
                      show: project.teamSize || (project as any).meta?.teamSize,
                      icon: Users,
                      label: t("teamSize"),
                      value:
                        project.teamSize || (project as any).meta?.teamSize,
                    },
                  ]
                    .filter((m) => m.show)
                    .map((meta, i) => {
                      const Icon = meta.icon;
                      return (
                        <div key={i} style={{ ...cardStyle, padding: "16px" }}>
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              style={{
                                width: "28px",
                                height: "28px",
                                border: `1px solid ${roseGold.border}`,
                                borderRadius: "50%",
                                background: "rgba(221, 167, 165, 0.07)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Icon
                                size={13}
                                style={{ color: roseGold.main }}
                              />
                            </div>
                            <span
                              style={{
                                color: "var(--slate)",
                                fontSize: "0.58rem",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                fontFamily: "'Sora', sans-serif",
                              }}
                            >
                              {meta.label}
                            </span>
                          </div>
                          <p
                            style={{
                              color: roseGold.light,
                              fontSize: "0.88rem",
                              fontFamily: "'Sora', sans-serif",
                              fontWeight: 600,
                            }}
                          >
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
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        padding: "11px 28px",
                        background: `linear-gradient(135deg, ${roseGold.light} 0%, ${roseGold.main} 100%)`,
                        color: "var(--bg-primary)",
                        borderRadius: "32px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontFamily: "'Sora', sans-serif",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.boxShadow =
                          `0 10px 24px ${roseGold.bgGlow}`)
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.boxShadow =
                          "none")
                      }
                    >
                      <ExternalLink size={13} />
                      {t("liveDemo")}
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        padding: "11px 28px",
                        border: `1px solid ${roseGold.border}`,
                        borderRadius: "32px",
                        color: roseGold.main,
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontFamily: "'Sora', sans-serif",
                        textDecoration: "none",
                        background: "transparent",
                        transition: "background 0.3s, border-color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "rgba(221, 167, 165, 0.08)";
                        el.style.borderColor = roseGold.main;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "transparent";
                        el.style.borderColor = roseGold.border;
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
                <div
                  className="group relative overflow-hidden"
                  style={{
                    borderRadius: "4px",
                    border: `1px solid ${roseGold.border}`,
                    borderTop: `2px solid ${roseGold.main}44`,
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(13,27,42,0.5) 0%, transparent 60%)",
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      borderTop: `2px solid ${roseGold.main}`,
                      borderLeft: `2px solid ${roseGold.main}`,
                    }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      borderBottom: `2px solid ${roseGold.main}`,
                      borderRight: `2px solid ${roseGold.main}`,
                    }}
                  />
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
                            padding: "12px",
                            border: `1px solid ${roseGold.border}`,
                            borderRadius: "4px",
                            background: "rgba(221, 167, 165, 0.04)",
                            transition: "border-color 0.3s",
                          }}
                          onMouseEnter={(e) =>
                            ((
                              e.currentTarget as HTMLElement
                            ).style.borderColor = roseGold.main)
                          }
                          onMouseLeave={(e) =>
                            ((
                              e.currentTarget as HTMLElement
                            ).style.borderColor = roseGold.border)
                          }
                        >
                          <img
                            src={logo}
                            alt="Tech"
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
              {/* Content Blocks */}
              {project.contentBlocks && project.contentBlocks.length > 0 && (
                <div className="space-y-8">
                  {project.contentBlocks.map((block: any, idx: number) => {
                    // Type 0: Text
                    if (block.type === 0)
                      return (
                        <div
                          key={idx}
                          style={{ ...cardStyle, padding: "32px" }}
                        >
                          {block.heading && sectionHeading(block.heading)}
                          {block.subheading && (
                            <p
                              className="mb-3"
                              style={{
                                color: roseGold.main,
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "1rem",
                                fontStyle: "italic",
                                opacity: 0.9,
                              }}
                            >
                              {block.subheading}
                            </p>
                          )}
                          {block.content && (
                            <div
                              style={{
                                color: "var(--cream-dim)",
                                fontSize: "0.9rem",
                                fontFamily: "'Sora', sans-serif",
                                lineHeight: 1.85,
                                whiteSpace: "pre-line",
                              }}
                            >
                              {parseMarkdown(block.content)}
                            </div>
                          )}
                        </div>
                      );
                    // Type 1: Image
                    if (block.type === 1)
                      return (
                        <div key={idx} className="space-y-3">
                          {block.heading && sectionHeading(block.heading)}
                          <div
                            className="group relative overflow-hidden"
                            style={{
                              borderRadius: "4px",
                              border: `1px solid ${roseGold.border}`,
                              borderTop: `2px solid ${roseGold.main}44`,
                            }}
                          >
                            <img
                              src={block.imageUrl}
                              alt={block.heading || "Project image"}
                              className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div
                              className="absolute top-0 left-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                borderTop: `1.5px solid ${roseGold.main}`,
                                borderLeft: `1.5px solid ${roseGold.main}`,
                              }}
                            />
                          </div>
                          {block.caption && (
                            <p
                              style={{
                                color: "var(--slate)",
                                fontSize: "0.78rem",
                                fontFamily: "'Sora',sans-serif",
                                fontStyle: "italic",
                                textAlign: "center",
                              }}
                            >
                              {block.caption}
                            </p>
                          )}
                        </div>
                      );
                    // Type 2: Video
                    if (block.type === 2)
                      return (
                        <div key={idx} className="space-y-3">
                          {block.heading && sectionHeading(block.heading)}
                          <div
                            style={{
                              borderRadius: "4px",
                              border: `1px solid ${roseGold.border}`,
                              overflow: "hidden",
                            }}
                          >
                            <video
                              src={block.videoUrl}
                              controls
                              className="w-full aspect-video object-cover"
                              poster={block.posterUrl}
                            >
                              {t("videoNotSupported")}
                            </video>
                          </div>
                          {block.caption && (
                            <p
                              style={{
                                color: "var(--slate)",
                                fontSize: "0.78rem",
                                fontFamily: "'Sora',sans-serif",
                                fontStyle: "italic",
                                textAlign: "center",
                              }}
                            >
                              {block.caption}
                            </p>
                          )}
                        </div>
                      );
                    // Type 3: Gallery
                    if (block.type === 3)
                      return (
                        <div key={idx}>
                          <ImageCarousel
                            images={block.images || []}
                            heading={block.heading}
                            autoPlay={block.autoPlay !== false}
                            autoPlayInterval={block.autoPlayInterval || 5000}
                          />
                        </div>
                      );
                    // Type 4: Code
                    if (block.type === 4)
                      return (
                        <div key={idx}>
                          <CodeBlock
                            heading={block.heading}
                            subheading={block.subheading}
                            content={block.content}
                            codeBlocks={block.codeBlocks || []}
                            defaultTab={block.defaultTab || 0}
                          />
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
                    {project.challenges.map(
                      (challenge: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4"
                          style={{
                            padding: "16px 20px",
                            background: "rgba(221, 167, 165, 0.04)",
                            borderLeft: `3px solid ${roseGold.main}88`,
                            borderRadius: "4px",
                          }}
                        >
                          <span
                            style={{
                              color: roseGold.main,
                              fontFamily: "'Playfair Display',serif",
                              fontSize: "0.8rem",
                              marginTop: "2px",
                              flexShrink: 0,
                              fontWeight: 700,
                            }}
                          >
                            {String(idx + 1).padStart(2, "0")}.
                          </span>
                          <p
                            style={{
                              color: "var(--cream-dim)",
                              fontSize: "0.88rem",
                              fontFamily: "'Sora',sans-serif",
                              lineHeight: 1.75,
                            }}
                          >
                            {challenge}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Solutions */}
              {project.solutions && project.solutions.length > 0 && (
                <div style={{ ...cardStyle, padding: "32px" }}>
                  {sectionHeading(t("solutions"))}
                  <div className="space-y-3">
                    {project.solutions.map((solution: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4"
                        style={{
                          padding: "16px 20px",
                          background: "rgba(221, 167, 165, 0.06)",
                          borderLeft: `3px solid ${roseGold.main}`,
                          borderRadius: "4px",
                        }}
                      >
                        <CheckCircle
                          size={16}
                          style={{
                            color: roseGold.main,
                            marginTop: "2px",
                            flexShrink: 0,
                          }}
                        />
                        <p
                          style={{
                            color: "var(--cream-dim)",
                            fontSize: "0.88rem",
                            fontFamily: "'Sora',sans-serif",
                            lineHeight: 1.75,
                          }}
                        >
                          {solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {project.results && project.results.length > 0 && (
                <div
                  style={{
                    padding: "32px",
                    background: `linear-gradient(145deg, rgba(221, 167, 165, 0.1) 0%, rgba(221, 167, 165, 0.02) 100%)`,
                    border: `1px solid ${roseGold.border}`,
                    borderTop: `2px solid ${roseGold.main}`,
                    borderRadius: "4px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {sectionHeading(t("resultsImpact"))}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.results.map((result: any, idx: number) => (
                      <div
                        key={idx}
                        style={{
                          padding: "20px",
                          background: "rgba(255,255,255,0.03)",
                          border: `1px solid ${roseGold.border}`,
                          borderRadius: "4px",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "2.2rem",
                            fontWeight: 800,
                            background: `linear-gradient(135deg, ${roseGold.light} 0%, ${roseGold.main} 100%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            marginBottom: "4px",
                          }}
                        >
                          {result.value}
                        </div>
                        <div
                          style={{
                            color: roseGold.main,
                            fontSize: "0.6rem",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            fontFamily: "'Sora',sans-serif",
                            marginBottom: "4px",
                            fontWeight: 600,
                          }}
                        >
                          {result.metric}
                        </div>
                        <p
                          style={{
                            color: "var(--cream-dim)",
                            fontSize: "0.82rem",
                            fontFamily: "'Sora',sans-serif",
                          }}
                        >
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
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: `${roseGold.main}33`,
                        fontSize: "5rem",
                        lineHeight: 0.75,
                        flexShrink: 0,
                      }}
                    >
                      "
                    </span>
                    <div>
                      <p
                        className="mb-5"
                        style={{
                          color: "var(--cream-dim)",
                          fontSize: "0.95rem",
                          fontFamily: "'Sora',sans-serif",
                          fontStyle: "italic",
                          lineHeight: 1.85,
                        }}
                      >
                        {project.testimonial.text}
                      </p>
                      <div className="flex items-center gap-3">
                        <span
                          className="block w-px h-8"
                          style={{ background: roseGold.main }}
                        />
                        <div>
                          <p
                            style={{
                              color: roseGold.light,
                              fontFamily: "'Playfair Display',serif",
                              fontWeight: 700,
                              fontSize: "0.9rem",
                            }}
                          >
                            {project.testimonial.author}
                          </p>
                          <p
                            style={{
                              color: "var(--slate)",
                              fontSize: "0.72rem",
                              fontFamily: "'Sora',sans-serif",
                            }}
                          >
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
                <div
                  style={{
                    position: "relative",
                    padding: "32px",
                    background: `linear-gradient(145deg, rgba(221, 167, 165, 0.12) 0%, rgba(221, 167, 165, 0.02) 100%)`,
                    border: `1px solid ${roseGold.border}`,
                    borderTop: `2px solid ${roseGold.main}`,
                    borderRadius: "4px",
                    overflow: "hidden",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* Dot-grid */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1.5px 1.5px, ${roseGold.main}11 1px, transparent 0)`,
                      backgroundSize: "24px 24px",
                    }}
                  />

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          border: `1px solid ${roseGold.border}`,
                          borderRadius: "50%",
                          background: "rgba(221, 167, 165, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ShoppingCart
                          size={15}
                          style={{ color: roseGold.main }}
                        />
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          color: roseGold.light,
                          fontSize: "1.1rem",
                          fontWeight: 700,
                        }}
                      >
                        {t("buy")}
                      </h3>
                    </div>

                    <div className="flex items-end gap-1">
                      <span
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "3rem",
                          fontWeight: 800,
                          background: `linear-gradient(135deg, ${roseGold.light} 0%, ${roseGold.main} 100%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          lineHeight: 1,
                        }}
                      >
                        {project.buy.price}
                      </span>
                      <span
                        style={{
                          color: "var(--slate)",
                          fontSize: "0.8rem",
                          marginBottom: "6px",
                          fontFamily: "'Sora',sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {project.buy.currency}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {project.buy.features.map((feature: string) => (
                        <div key={feature} className="flex items-start gap-3">
                          <ChevronRight
                            size={14}
                            style={{
                              color: roseGold.main,
                              marginTop: "3px",
                              flexShrink: 0,
                            }}
                          />
                          <p
                            style={{
                              color: "var(--cream-dim)",
                              fontSize: "0.85rem",
                              fontFamily: "'Sora',sans-serif",
                              lineHeight: 1.5,
                            }}
                          >
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>

                    <a
                      href={project.buy.buylink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        padding: "14px",
                        background: `linear-gradient(135deg, ${roseGold.light} 0%, ${roseGold.main} 100%)`,
                        color: "var(--bg-primary)",
                        borderRadius: "32px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontFamily: "'Sora', sans-serif",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.boxShadow =
                          `0 10px 24px ${roseGold.bgGlow}`)
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.boxShadow =
                          "none")
                      }
                    >
                      <ShoppingCart size={14} />
                      {t("buynow")}
                    </a>
                  </div>
                </div>
              )}

              {/* Technologies sidebar */}
              {project.technologies && project.technologies.length > 0 && (
                <div
                  style={{
                    ...cardStyle,
                    padding: "28px",
                    position: "sticky",
                    top: "96px",
                  }}
                >
                  {sectionHeading(t("technologies"))}
                  <div className="space-y-5">
                    {project.technologies.map((tech: any, idx: number) => (
                      <div
                        key={idx}
                        style={{
                          paddingBottom: "16px",
                          borderBottom:
                            idx < project.technologies.length - 1
                              ? `1px solid ${roseGold.border}`
                              : "none",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            style={{
                              color: roseGold.main,
                              fontSize: "0.65rem",
                              fontFamily: "'Playfair Display',serif",
                              fontWeight: 800,
                            }}
                          >
                            {String(idx + 1).padStart(2, "0")}.
                          </span>
                          <p
                            style={{
                              color: roseGold.light,
                              fontFamily: "'Playfair Display',serif",
                              fontWeight: 700,
                              fontSize: "0.95rem",
                            }}
                          >
                            {tech.name}
                          </p>
                        </div>
                        <p
                          style={{
                            color: "var(--slate)",
                            fontSize: "0.8rem",
                            fontFamily: "'Sora',sans-serif",
                            lineHeight: 1.6,
                            paddingLeft: "24px",
                          }}
                        >
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
