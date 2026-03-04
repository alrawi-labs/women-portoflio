"use client";

import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import {
  Download,
  Instagram,
  Linkedin,
  Github,
  Twitter,
  ArrowRight,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { contactData } from "@/data/contacts";
import { statsData } from "@/data/stats";
import { personalData } from "@/data/personal";

const iconMap: Record<string, any> = { Instagram, Linkedin, Twitter, Github };

export default function Hero() {
  const t      = useTranslations("home.hero");
  const tStats = useTranslations("home.stats");

  const [years,    setYears]    = useState<number | string>(0);
  const [projects, setProjects] = useState<number | string>(0);
  const [clients,  setClients]  = useState<number | string>(0);
  const [awards,   setAwards]   = useState<number | string>(0);

  const statsRef    = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue(setYears,    0, 14,  2000);
          animateValue(setProjects, 0, 50,  2000);
          animateValue(setClients,  0, 1.5, 2000, true);
          animateValue(setAwards,   0, 24,  2000);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateValue = (
    setter: Dispatch<SetStateAction<number | string>>,
    start: number,
    end: number,
    duration: number,
    isDecimal = false
  ) => {
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress    = Math.min((now - startTime) / duration, 1);
      const ease        = 1 - Math.pow(1 - progress, 4);
      const current     = start + (end - start) * ease;
      setter(isDecimal ? current.toFixed(1) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  return (
    <section
      className="min-h-screen flex flex-col relative overflow-hidden pt-20 pb-8 sm:pb-12 lg:pt-0 lg:pb-16"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ── Background Layer ─────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Subtle radial navy glow */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(21,35,54,0.9) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(28,47,68,0.6) 0%, transparent 70%)",
          }}
        />

        {/* Diagonal rule lines — academic paper feel */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.07 }}>
          {/* Horizontal rules */}
          {[120, 240, 360, 480, 600, 720, 840].map((y) => (
            <line
              key={y}
              x1="0" y1={y} x2="100%" y2={y}
              stroke="rgba(221, 167, 165,0.5)"
              strokeWidth="0.5"
            />
          ))}
          {/* Decorative corner bracket — top-right */}
          <path
            d="M 1100 60 L 1160 60 L 1160 120"
            fill="none"
            stroke="rgba(221, 167, 165,0.6)"
            strokeWidth="1.5"
          />
          {/* Decorative corner bracket — bottom-left */}
          <path
            d="M 60 820 L 60 880 L 120 880"
            fill="none"
            stroke="rgba(221, 167, 165,0.6)"
            strokeWidth="1.5"
          />
          {/* Vertical accent line */}
          <line
            x1="80" y1="0" x2="80" y2="100%"
            stroke="rgba(221, 167, 165,0.3)"
            strokeWidth="0.5"
          />
        </svg>

        {/* Large watermark — institution monogram style */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0.035 }}
        >
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="260"
            fill="none"
            stroke="rgba(221, 167, 165,0.8)"
            strokeWidth="1.5"
            fontWeight="700"
            fontFamily="'Playfair Display', Georgia, serif"
            style={{
              animation: "scaleText 6s ease-in-out infinite",
              transformOrigin: "center",
              transformBox: "fill-box",
              letterSpacing: "0.08em",
            }}
          >
            PF
          </text>
        </svg>
      </div>

      {/* ── Section number label (academic paper style) ───── */}
      <div
        className="absolute top-24 left-8 hidden lg:flex items-center gap-3 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "var(--gold-dim)",
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          § 01 &nbsp;—&nbsp; {t("sectionCategory")}
        </span>
      </div>

      {/* ── Main Content ─────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex items-center mt-5 lg:mt-32">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">

            {/* ═══════════════════════════════════════════════
                MOBILE LAYOUT
            ═══════════════════════════════════════════════ */}
            <div className="lg:hidden space-y-5">

              {/* 1 · Heading */}
              <div className="space-y-3">
                {/* Credential tag */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-sm animate-fade-in-up"
                  style={{
                    border: "1px solid rgba(221, 167, 165,0.35)",
                    background: "rgba(221, 167, 165,0.06)",
                  }}
                >
                  <GraduationCap size={13} style={{ color: "var(--gold)" }} />
                  <span
                    style={{
                      color: "var(--gold)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      fontFamily: "'Sora', sans-serif",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("greeting")}
                  </span>
                </div>

                <h2
                  className="text-4xl sm:text-5xl font-black leading-none animate-slide-in-left-delay-2"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    background:
                      "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 55%, #b3817e 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t("name")}
                </h2>

                {/* Rule */}
                <span
                  className="block h-px w-24"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--gold) 0%, transparent 100%)",
                  }}
                />

                <h3
                  className="text-xl sm:text-2xl font-semibold animate-slide-in-left-delay-3"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "var(--cream)",
                    lineHeight: 1.35,
                  }}
                >
                  {t("titleLine1")}
                  <br />
                  <span style={{ color: "var(--gold-light)" }}>
                    {t("titleLine2")}
                  </span>
                </h3>
              </div>

              {/* 2 · Photo */}
              <div className="flex justify-center animate-slide-in-right py-4">
                <ProfileImage
                  photo={personalData.photo}
                  name={t("name")}
                  yearsLabel={tStats("yearsExp")}
                  projectsLabel={tStats("projects")}
                  yearsValue={statsData.years}
                  projectsValue={statsData.projects}
                  size="sm"
                />
              </div>

              {/* 3 · Description */}
              <p
                className="text-sm sm:text-base leading-relaxed animate-slide-in-left-delay-5"
                style={{ color: "var(--cream-dim)" }}
              >
                {t("description")}
              </p>

              {/* 4 · CTA */}
              <CTAButtons t={t} size="sm" />

              {/* 5 · Social */}
              <SocialRow t={t} />
            </div>

            {/* ═══════════════════════════════════════════════
                DESKTOP — Photo column
            ═══════════════════════════════════════════════ */}
            <div className="hidden lg:block lg:col-span-5 lg:order-2 animate-slide-in-right">
              <ProfileImage
                photo={personalData.photo}
                name={t("name")}
                yearsLabel={tStats("yearsExp")}
                projectsLabel={tStats("projects")}
                yearsValue={statsData.years}
                projectsValue={statsData.projects}
                size="lg"
              />
            </div>

            {/* ═══════════════════════════════════════════════
                DESKTOP — Text column
            ═══════════════════════════════════════════════ */}
            <div className="hidden lg:block lg:col-span-7 lg:order-1 space-y-7 lg:space-y-9">

              {/* Credential pill */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm animate-fade-in-up"
                style={{
                  border: "1px solid rgba(221, 167, 165,0.35)",
                  background: "rgba(221, 167, 165,0.07)",
                  animationDelay: "0.1s",
                }}
              >
                <GraduationCap size={14} style={{ color: "var(--gold)" }} />
                <span
                  style={{
                    color: "var(--gold)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.22em",
                    fontFamily: "'Sora', sans-serif",
                    textTransform: "uppercase",
                  }}
                >
                  {t("greeting")}
                </span>
              </div>

              {/* Name */}
              <div className="space-y-4">
                <h2
                  className="text-6xl lg:text-7xl xl:text-8xl font-black leading-none animate-slide-in-left-delay-2"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    background:
                      "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 50%, #b3817e 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t("name")}
                </h2>

                {/* Decorative gold rule */}
                <div className="flex items-center gap-3">
                  <span
                    className="block h-px w-16"
                    style={{ background: "var(--gold)" }}
                  />
                  <BookOpen size={14} style={{ color: "var(--gold-dim)" }} />
                  <span
                    className="block flex-1 h-px max-w-xs"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--gold-dim), transparent)",
                    }}
                  />
                </div>

                <h3
                  className="text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight animate-slide-in-left-delay-3"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "var(--cream)",
                  }}
                >
                  {t("titleLine1")}
                  <br />
                  <span style={{ color: "var(--gold-light)" }}>
                    {t("titleLine2")}
                  </span>
                </h3>
              </div>

              {/* Description */}
              <p
                className="text-lg xl:text-xl leading-relaxed max-w-2xl animate-slide-in-left-delay-5"
                style={{
                  color: "var(--cream-dim)",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                {t("description")}
              </p>

              {/* CTA */}
              <CTAButtons t={t} size="lg" />

              {/* Social */}
              <SocialRow t={t} />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   Sub-components
────────────────────────────────────────────────────────── */

function ProfileImage({
  photo, name, yearsLabel, projectsLabel, yearsValue, projectsValue, size,
}: {
  photo: string; name: string; yearsLabel: string; projectsLabel: string;
  yearsValue: number; projectsValue: number; size: "sm" | "lg";
}) {
  const maxW  = size === "lg" ? "max-w-[420px]" : "max-w-[280px] sm:max-w-[320px]";
  const badge = size === "lg" ? "px-4 py-2.5 -top-6 -right-6 text-2xl" : "px-2 py-1.5 -top-3 -right-3 text-lg";
  const badge2 = size === "lg" ? "px-4 py-2.5 -bottom-6 -left-6 text-2xl" : "px-2 py-1.5 -bottom-3 -left-3 text-lg";

  return (
    <div className={`relative w-full ${maxW} mx-auto lg:ml-auto`}>
      <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] mx-auto">

        {/* Soft floating background blob */}
        <div className="absolute -inset-8 blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(221, 167, 165, 0.25), transparent 70%)" }}
        />

        {/* Main Image Container — elegant arched rectangle */}
        <div
          className="absolute inset-2 group cursor-pointer overflow-hidden bg-gradient-photo shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
          style={{
            borderRadius: "140px 140px 30px 30px",
            border: "1px solid rgba(221, 167, 165, 0.3)",
            borderTop: "3px solid rgba(221, 167, 165, 0.6)",
          }}
        >
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-photo-hover opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        {/* Badge — top right */}
        <div
          className={`absolute ${badge} rounded-sm backdrop-blur-xl shadow-2xl animate-float-badge`}
          style={{
            background: "var(--navy-surface)",
            border: "1px solid rgba(221, 167, 165,0.3)",
          }}
        >
          <div
            className="font-bold"
            style={{
              color: "var(--gold)",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: size === "lg" ? "1.4rem" : "1.1rem",
            }}
          >
            {yearsValue}+
          </div>
          <div style={{ fontSize: "0.6rem", color: "var(--cream-dim)", letterSpacing: "0.1em" }}>
            {yearsLabel}
          </div>
        </div>

        {/* Badge — bottom left */}
        <div
          className={`absolute ${badge2} rounded-sm backdrop-blur-xl shadow-2xl animate-float-badge-delay`}
          style={{
            background: "var(--navy-surface)",
            border: "1px solid rgba(221, 167, 165,0.3)",
          }}
        >
          <div
            className="font-bold"
            style={{
              color: "var(--gold)",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: size === "lg" ? "1.4rem" : "1.1rem",
            }}
          >
            {projectsValue}+
          </div>
          <div style={{ fontSize: "0.6rem", color: "var(--cream-dim)", letterSpacing: "0.1em" }}>
            {projectsLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

function CTAButtons({ t, size }: { t: any; size: "sm" | "lg" }) {
  const pad  = size === "lg" ? "px-7 py-3.5" : "px-5 py-2.5";
  const text = size === "lg" ? "text-base" : "text-sm";
  const icon = size === "lg" ? 18 : 15;

  return (
    <div className={`flex flex-wrap gap-3 ${size === "lg" ? "sm:gap-4" : ""} animate-slide-in-left-delay-6`}>

      {/* Primary — CV download */}
      <a
        href="/assets/docs/cv.pdf"
        download="CV.pdf"
        className={`group relative ${pad} rounded-sm font-bold ${text} inline-flex items-center overflow-hidden transition-all duration-500 hover:scale-[1.03]`}
        style={{
          background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%)",
          color: "var(--navy)",
          boxShadow: "0 0 0 0 rgba(221, 167, 165,0)",
          transition: "box-shadow 0.4s, transform 0.3s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow = "0 0 28px rgba(221, 167, 165,0.35)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = "0 0 0 0 rgba(221, 167, 165,0)")
        }
      >
        <span className="relative z-10 flex items-center gap-2" style={{ fontFamily: "'Sora', sans-serif" }}>
          {t("downloadCV")}
          <Download size={icon} className="group-hover:translate-y-0.5 transition-transform duration-300" />
        </span>
      </a>

      {/* Secondary — View work */}
      <a
        href="/projects"
        className={`group relative ${pad} rounded-sm font-bold ${text} inline-flex items-center overflow-hidden transition-all duration-500 hover:scale-[1.03]`}
        style={{
          border: "1.5px solid rgba(221, 167, 165,0.5)",
          color: "var(--gold)",
          fontFamily: "'Sora', sans-serif",
        }}
      >
        <span className="relative z-10 flex items-center gap-2">
          {t("viewWork")}
          <ArrowRight size={icon} className="group-hover:translate-x-1 transition-transform duration-300" />
        </span>
        {/* Hover fill */}
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
          style={{ background: "rgba(221, 167, 165,0.1)" }}
        />
      </a>

    </div>
  );
}

function SocialRow({ t }: { t: any }) {
  return (
    <div className="flex items-center gap-4 pt-2 animate-slide-in-left-delay-7">
      <span
        style={{
          color: "var(--slate)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "'Sora', sans-serif",
        }}
      >
        {t("follow")}
      </span>
      <span
        className="flex-1 max-w-[160px] h-px"
        style={{
          background: "linear-gradient(90deg, rgba(221, 167, 165,0.4), transparent)",
        }}
      />
      <div className="flex gap-2">
        {contactData.socialLinks.map((social, i) => {
          const Icon = iconMap[social.icon];
          if (!Icon) return null;
          return (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="group relative w-10 h-10 flex items-center justify-center rounded-sm transition-all duration-400 hover:scale-110"
              style={{
                border: "1px solid rgba(221, 167, 165,0.25)",
                color: "var(--gold-dim)",
                animation: `fadeInUp 0.5s ease-out ${0.7 + i * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(221, 167, 165,0.7)";
                e.currentTarget.style.color = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(221, 167, 165,0.25)";
                e.currentTarget.style.color = "var(--gold-dim)";
              }}
            >
              <Icon size={15} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <div
                className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(221, 167, 165,0.08)" }}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}