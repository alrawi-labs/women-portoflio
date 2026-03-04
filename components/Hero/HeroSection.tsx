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
  const t = useTranslations("home.hero");
  const tStats = useTranslations("home.stats");

  const [years, setYears] = useState<number | string>(0);
  const [projects, setProjects] = useState<number | string>(0);
  const [clients, setClients] = useState<number | string>(0);
  const [awards, setAwards] = useState<number | string>(0);

  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue(setYears, 0, statsData.years, 2000);
          animateValue(setProjects, 0, statsData.projects, 2000);
          animateValue(setClients, 0, statsData.clients, 2000, true);
          animateValue(setAwards, 0, statsData.awards, 2000);
        }
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateValue = (
    setter: Dispatch<SetStateAction<number | string>>,
    start: number,
    end: number,
    duration: number,
    isDecimal = false,
  ) => {
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = start + (end - start) * ease;
      setter(isDecimal ? current.toFixed(1) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  return (
    <>
      <style>{`
        /* ── Petal particle ── */
        @keyframes petalDrift {
          0%   { transform: translateY(-20px) translateX(0px) rotate(0deg);   opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(110vh) translateX(60px) rotate(720deg); opacity: 0; }
        }
        .petal {
          position: absolute;
          pointer-events: none;
          border-radius: 50% 0 50% 0;
        }
        .petal-1  { width:8px;  height:12px; left:12%;  animation: petalDrift 12s  3s    linear infinite; background: rgba(232,160,176,0.35); }
        .petal-2  { width:6px;  height:9px;  left:28%;  animation: petalDrift 15s  0s    linear infinite; background: rgba(201,116,138,0.25); }
        .petal-3  { width:10px; height:14px; left:55%;  animation: petalDrift 11s  6s    linear infinite; background: rgba(245,221,228,0.30); }
        .petal-4  { width:7px;  height:10px; left:72%;  animation: petalDrift 14s  2s    linear infinite; background: rgba(226,201,138,0.25); }
        .petal-5  { width:5px;  height:8px;  left:88%;  animation: petalDrift 10s  8s    linear infinite; background: rgba(201,116,138,0.20); }
        .petal-6  { width:9px;  height:13px; left:40%;  animation: petalDrift 13s  4s    linear infinite; background: rgba(232,160,176,0.28); }
        .petal-7  { width:6px;  height:9px;  left:65%;  animation: petalDrift 16s  1s    linear infinite; background: rgba(245,221,228,0.22); }
        .petal-8  { width:8px;  height:11px; left:5%;   animation: petalDrift 9s   10s   linear infinite; background: rgba(201,169,110,0.22); }

        /* ── Orbs ── */
        @keyframes orbA { 0%,100%{transform:translate(0,0)   scale(1)}    50%{transform:translate(-40px,25px) scale(1.06)} }
        @keyframes orbB { 0%,100%{transform:translate(0,0)   scale(1)}    50%{transform:translate(25px,-35px) scale(0.94)} }
        @keyframes orbC { 0%,100%{transform:translate(0,0)}               33%{transform:translate(18px,14px)} 66%{transform:translate(-14px,-10px)} }

        .orb-rose {
          position:absolute; border-radius:50%; pointer-events:none; filter:blur(80px);
          width:520px; height:520px; top:-130px; right:-80px;
          background: radial-gradient(circle, rgba(201,116,138,0.22) 0%, rgba(232,160,176,0.10) 45%, transparent 70%);
          animation: orbA 9s ease-in-out infinite;
        }
        .orb-gold {
          position:absolute; border-radius:50%; pointer-events:none; filter:blur(90px);
          width:380px; height:380px; bottom:-90px; left:-60px;
          background: radial-gradient(circle, rgba(201,169,110,0.18) 0%, rgba(245,221,228,0.06) 55%, transparent 80%);
          animation: orbB 11s ease-in-out infinite;
        }
        .orb-blush {
          position:absolute; border-radius:50%; pointer-events:none; filter:blur(70px);
          width:280px; height:280px; top:38%; left:32%;
          background: radial-gradient(circle, rgba(201,116,138,0.10) 0%, transparent 70%);
          animation: orbC 13s ease-in-out infinite;
        }

        /* ── Blob morph ── */
        @keyframes blobMorph {
          0%,100% { border-radius: 62% 38% 54% 46% / 52% 60% 40% 48% }
          33%     { border-radius: 48% 52% 38% 62% / 62% 38% 62% 38% }
          66%     { border-radius: 38% 62% 62% 38% / 38% 62% 38% 62% }
        }
        .photo-blob-bg {
          position:absolute; inset:-6%;
          background: linear-gradient(135deg, rgba(201,116,138,0.18) 0%, rgba(201,169,110,0.10) 100%);
          animation: blobMorph 9s ease-in-out infinite;
        }
        .photo-clip {
          position:absolute; inset:7%;
          border-radius: 58% 42% 52% 48% / 46% 56% 44% 54%;
          overflow:hidden;
          border:1px solid rgba(201,116,138,0.35);
          transition: border-color 0.4s;
        }
        .photo-clip:hover { border-color: rgba(201,116,138,0.65); }
        .photo-clip img {
          width:100%; height:100%; object-fit:cover; object-position:top center;
          filter: saturate(0.95) contrast(1.03);
          transition: transform 0.9s ease;
        }
        .photo-clip:hover img { transform:scale(1.04); }
        .photo-overlay {
          position:absolute; inset:0;
          background: linear-gradient(to top, rgba(45,31,46,0.35) 0%, transparent 55%);
          pointer-events:none;
        }

        /* ── Float cards ── */
        @keyframes floatUp   { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-10px)} }
        @keyframes floatDown { 0%,100%{transform:translateY(0)}   50%{transform:translateY(9px)}  }
        .float-card {
          position:absolute; z-index:10; backdrop-filter:blur(18px);
          background: rgba(45,31,46,0.82);
          border:1px solid rgba(201,116,138,0.28);
          padding:0.8rem 1.1rem;
          display:flex; flex-direction:column; gap:0.1rem;
          min-width:110px;
        }
        .float-card::before {
          content:'';
          position:absolute; left:0; top:0; bottom:0;
          width:2px;
          background: linear-gradient(to bottom, var(--rose-light,#e8a0b0), var(--gold,#c9a96e));
        }
        .float-card-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight:600; font-size:1.55rem; line-height:1;
          color: var(--rose-light,#e8a0b0);
        }
        .float-card-label {
          font-family:'Jost',sans-serif;
          font-size:0.52rem; letter-spacing:0.14em;
          text-transform:uppercase; color:var(--cream-dim,#c4b5a5);
        }
        .card-a { top:6%;    right:-11%; animation:floatUp   5s ease-in-out infinite; }
        .card-b { bottom:6%; left:-9%;   animation:floatDown 7s ease-in-out infinite; }

        /* ── Dot grid ── */
        .dot-grid {
          position:absolute; z-index:2;
          display:grid; grid-template-columns:repeat(4,1fr); gap:5px;
        }
        .dot-grid span {
          display:block; width:4px; height:4px; border-radius:50%;
        }
        .dot-grid span:nth-child(odd)  { background:rgba(201,116,138,0.30); }
        .dot-grid span:nth-child(even) { background:rgba(201,169,110,0.25); }

        /* ── Credential pill ── */
        .credential-pill {
          display:inline-flex; align-items:center; gap:0.55rem;
          padding:0.45rem 1.1rem;
          border:1px solid rgba(201,116,138,0.32);
          background:rgba(201,116,138,0.07);
          border-left:2px solid var(--rose,#c9748a);
          position:relative; overflow:hidden;
        }
        .cred-dot {
          width:6px; height:6px; border-radius:50%;
          background:var(--rose,#c9748a);
          animation:credPulse 2.5s ease-in-out infinite;
          flex-shrink:0;
        }
        @keyframes credPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.45;transform:scale(0.65)} }

        /* ── Tag chips ── */
        .tag-chip {
          font-family:'Jost',sans-serif;
          font-size:0.6rem; letter-spacing:0.13em; text-transform:uppercase;
          color:var(--cream-dim,#c4b5a5);
          padding:0.28rem 0.75rem;
          border:1px solid rgba(201,116,138,0.18);
          background:rgba(201,116,138,0.05);
          transition:all 0.3s;
          cursor:default;
        }
        .tag-chip:hover {
          border-color:rgba(201,116,138,0.5);
          color:var(--rose-light,#e8a0b0);
          background:rgba(201,116,138,0.10);
        }

        /* ── Buttons ── */
        .btn-rose {
          display:inline-flex; align-items:center; gap:0.55rem;
          padding:0.85rem 2rem;
          font-family:'Jost',sans-serif; font-weight:500;
          font-size:0.72rem; letter-spacing:0.16em; text-transform:uppercase;
          text-decoration:none;
          color:#2d1f2e;
          background: linear-gradient(135deg, #e8a0b0 0%, #c9748a 55%, #9a5268 100%);
          position:relative; overflow:hidden;
          transition:transform 0.3s, box-shadow 0.3s;
        }
        .btn-rose::after {
          content:''; position:absolute; inset:0;
          background:rgba(255,255,255,0.18);
          transform:translateX(-110%) skewX(-14deg);
          transition:transform 0.5s;
        }
        .btn-rose:hover::after { transform:translateX(110%) skewX(-14deg); }
        .btn-rose:hover {
          transform:translateY(-2px);
          box-shadow:0 14px 38px rgba(201,116,138,0.32);
        }

        .btn-outline {
          display:inline-flex; align-items:center; gap:0.55rem;
          padding:0.85rem 2rem;
          font-family:'Jost',sans-serif; font-weight:500;
          font-size:0.72rem; letter-spacing:0.16em; text-transform:uppercase;
          text-decoration:none;
          color:var(--rose-light,#e8a0b0);
          border:1px solid rgba(201,116,138,0.40);
          position:relative; overflow:hidden;
          background:transparent;
          transition:transform 0.3s, border-color 0.3s;
        }
        .btn-outline::before {
          content:''; position:absolute; inset:0;
          background:rgba(201,116,138,0.08);
          transform:scaleX(0); transform-origin:left;
          transition:transform 0.4s;
        }
        .btn-outline:hover::before { transform:scaleX(1); }
        .btn-outline:hover {
          transform:translateY(-2px);
          border-color:rgba(201,116,138,0.75);
        }

        /* ── Social ── */
        .social-icon-wrap {
          width:34px; height:34px;
          display:flex; align-items:center; justify-content:center;
          border:1px solid rgba(201,116,138,0.22);
          color:rgba(201,116,138,0.55);
          position:relative; overflow:hidden;
          transition:border-color 0.3s, color 0.3s, transform 0.3s;
          text-decoration:none;
        }
        .social-icon-wrap::before {
          content:''; position:absolute; inset:0; border-radius:50%;
          background:rgba(201,116,138,0.10);
          transform:scale(0); transition:transform 0.3s;
        }
        .social-icon-wrap:hover::before { transform:scale(1.6); }
        .social-icon-wrap:hover {
          border-color:rgba(201,116,138,0.7);
          color:var(--rose-light,#e8a0b0);
          transform:translateY(-2px);
        }

        /* ── Scroll hint ── */
        @keyframes scrollLine { 0%,100%{opacity:0.35} 50%{opacity:0.9} }
        .scroll-line {
          width:1px; height:42px;
          background:linear-gradient(to bottom, transparent, rgba(201,116,138,0.6));
          animation:scrollLine 2.2s ease-in-out infinite;
        }

        /* ── Staggered entrance ── */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(26px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeRight {
          from { opacity:0; transform:translateX(40px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .anim-0  { animation:fadeUp 0.7s 0.05s ease both; }
        .anim-1  { animation:fadeUp 0.7s 0.15s ease both; }
        .anim-2  { animation:fadeUp 0.7s 0.25s ease both; }
        .anim-3  { animation:fadeUp 0.7s 0.35s ease both; }
        .anim-4  { animation:fadeUp 0.7s 0.45s ease both; }
        .anim-5  { animation:fadeUp 0.7s 0.55s ease both; }
        .anim-6  { animation:fadeUp 0.7s 0.65s ease both; }
        .anim-7  { animation:fadeUp 0.7s 0.75s ease both; }
        .anim-ph { animation:fadeRight 0.8s 0.20s ease both; }
      `}</style>

      <section
        ref={statsRef}
        className="min-h-screen flex flex-col relative overflow-hidden pt-20 pb-8 sm:pb-12 lg:pt-0 lg:pb-16"
        style={{ background: "var(--bg-primary)" }}
      >
        {/* ── Background ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Petals */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className={`petal petal-${n}`} />
          ))}

          {/* Orbs */}
          <div className="orb-rose" />
          <div className="orb-gold" />
          <div className="orb-blush" />

          {/* SVG — rule lines + botanik + watermark */}
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Horizontal rules */}
            {[110, 230, 350, 470, 590, 710].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100%"
                y2={y}
                stroke="rgba(201,116,138,0.05)"
                strokeWidth="0.5"
              />
            ))}
            {/* Vertical accent */}
            <line
              x1="56"
              y1="0"
              x2="56"
              y2="100%"
              stroke="rgba(201,116,138,0.06)"
              strokeWidth="0.5"
            />
            {/* Corner bracket TR */}
            <path
              d="M 1070 38 L 1155 38 L 1155 100"
              fill="none"
              stroke="rgba(201,116,138,0.22)"
              strokeWidth="1"
            />
            {/* Corner bracket BL */}
            <path
              d="M 38 720 L 38 782 L 100 782"
              fill="none"
              stroke="rgba(201,116,138,0.22)"
              strokeWidth="1"
            />
            {/* Botanical stem */}
            <g opacity="0.13">
              <line
                x1="94%"
                y1="0"
                x2="94%"
                y2="35%"
                stroke="rgba(232,160,176,0.8)"
                strokeWidth="0.8"
              />
              <ellipse
                cx="94%"
                cy="7%"
                rx="16"
                ry="9"
                fill="none"
                stroke="rgba(201,116,138,0.9)"
                strokeWidth="0.8"
                transform="rotate(-28,1128,56)"
              />
              <ellipse
                cx="94%"
                cy="17%"
                rx="19"
                ry="10"
                fill="none"
                stroke="rgba(201,116,138,0.9)"
                strokeWidth="0.8"
                transform="rotate(18,1128,136)"
              />
              <ellipse
                cx="94%"
                cy="27%"
                rx="14"
                ry="8"
                fill="none"
                stroke="rgba(232,160,176,0.9)"
                strokeWidth="0.8"
                transform="rotate(-12,1128,216)"
              />
            </g>
            {/* Watermark */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="270"
              fill="none"
              stroke="rgba(201,116,138,0.04)"
              strokeWidth="1.5"
              fontWeight="600"
              style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                letterSpacing: "0.06em",
              }}
            >
              Dr
            </text>
          </svg>
        </div>

        {/* Section label */}
        <div className="absolute top-24 left-8 hidden lg:flex items-center gap-3 anim-0">
          <span
            style={{
              fontFamily: "'Jost',sans-serif",
              color: "rgba(201,116,138,0.45)",
              fontSize: "0.62rem",
              letterSpacing: "0.30em",
              textTransform: "uppercase",
            }}
          >
            § 01 &nbsp;—&nbsp; {t("sectionCategory")}
          </span>
        </div>

        {/* ── Main Content ── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex items-center mt-5 lg:mt-32">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              {/* ════════════════════════════════
                  MOBILE
              ════════════════════════════════ */}
              <div className="lg:hidden space-y-5">
                <MobileLayout
                  t={t}
                  tStats={tStats}
                  photo={personalData.photo}
                  yearsValue={years}
                  projectsValue={projects}
                />
              </div>

              {/* ════════════════════════════════
                  DESKTOP — Photo (right)
              ════════════════════════════════ */}
              <div className="hidden lg:flex lg:col-span-5 lg:order-2 justify-center anim-ph">
                <PhotoColumn
                  photo={personalData.photo}
                  name={t("name")}
                  yearsLabel={tStats("yearsExp")}
                  projectsLabel={tStats("projects")}
                  yearsValue={years}
                  projectsValue={projects}
                  size="lg"
                />
              </div>

              {/* ════════════════════════════════
                  DESKTOP — Text (left)
              ════════════════════════════════ */}
              <div className="hidden lg:flex lg:col-span-7 lg:order-1 flex-col gap-7">
                {/* Credential pill */}
                <div className="credential-pill anim-0">
                  <span className="cred-dot" />
                  <span
                    style={{
                      fontFamily: "'Jost',sans-serif",
                      color: "var(--rose-light,#e8a0b0)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("greeting")}
                  </span>
                </div>

                {/* Name block */}
                <div className="anim-1 space-y-4">
                  <span
                    style={{
                      display: "block",
                      fontFamily: "'Jost',sans-serif",
                      fontSize: "0.66rem",
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: "rgba(201,116,138,0.7)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {t("sectionCategory")}
                  </span>

                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond',Georgia,serif",
                      fontWeight: 600,
                      lineHeight: 0.9,
                      fontSize: "clamp(3.8rem,7vw,6.8rem)",
                      letterSpacing: "-0.01em",
                      background:
                        "linear-gradient(145deg, #f7f0e0 0%, #e2c98a 32%, #c9a96e 55%, #e8a0b0 80%, #c9748a 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {t("name")}
                  </h2>

                  {/* Ornament rule */}
                  <div className="flex items-center gap-3">
                    <span
                      style={{
                        display: "block",
                        height: "1px",
                        width: "52px",
                        background: "var(--rose,#c9748a)",
                      }}
                    />
                    <span
                      style={{
                        display: "block",
                        width: "5px",
                        height: "5px",
                        background: "var(--gold,#c9a96e)",
                        transform: "rotate(45deg)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        display: "block",
                        flex: 1,
                        height: "1px",
                        maxWidth: "220px",
                        background:
                          "linear-gradient(90deg, rgba(201,116,138,0.4), transparent)",
                      }}
                    />
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond',Georgia,serif",
                      fontWeight: 300,
                      fontStyle: "italic",
                      fontSize: "clamp(1.3rem,2.4vw,2rem)",
                      color: "var(--cream,#f5ece0)",
                      lineHeight: 1.35,
                    }}
                  >
                    {t("titleLine1")}
                    <br />
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: 500,
                        color: "var(--rose-light,#e8a0b0)",
                      }}
                    >
                      {t("titleLine2")}
                    </span>
                  </h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 anim-2">
                  {((t.raw("tags") as string[]) ?? []).map((tag: string) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p
                  className="anim-3"
                  style={{
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    fontSize: "clamp(1rem,1.4vw,1.18rem)",
                    lineHeight: 1.85,
                    color: "var(--cream-dim,#c4b5a5)",
                    maxWidth: "540px",
                  }}
                >
                  {t("description")}
                </p>

                {/* CTA */}
                <div className="flex flex-wrap gap-3 anim-4">
                  <a
                    href="/assets/docs/cv.pdf"
                    download="CV.pdf"
                    className="btn-rose"
                  >
                    {t("downloadCV")}
                    <Download size={15} />
                  </a>
                  <a href="/projects" className="btn-outline">
                    {t("viewWork")}
                    <ArrowRight size={15} />
                  </a>
                </div>

                {/* Social */}
                <div className="flex items-center gap-4 anim-5">
                  <span
                    style={{
                      fontFamily: "'Jost',sans-serif",
                      color: "var(--slate,#9e8e9a)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("follow")}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      maxWidth: "110px",
                      height: "1px",
                      background:
                        "linear-gradient(90deg, rgba(201,116,138,0.4), transparent)",
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
                          className="social-icon-wrap"
                        >
                          <Icon size={13} className="relative z-10" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 anim-7">
          <span
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: "0.52rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(201,116,138,0.38)",
            }}
          >
            {t("scroll")}
          </span>
          <span className="scroll-line" />
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   Mobile layout (inline for brevity)
───────────────────────────────────────────── */
function MobileLayout({ t, tStats, photo, yearsValue, projectsValue }: any) {
  return (
    <>
      <div className="credential-pill anim-0">
        <span className="cred-dot" />
        <span
          style={{
            fontFamily: "'Jost',sans-serif",
            color: "var(--rose-light,#e8a0b0)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {t("greeting")}
        </span>
      </div>

      <div className="anim-1 space-y-2">
        <h2
          style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontWeight: 600,
            fontSize: "clamp(3rem,12vw,5rem)",
            lineHeight: 0.92,
            background:
              "linear-gradient(145deg,#f7f0e0 0%,#e2c98a 32%,#c9a96e 55%,#e8a0b0 80%,#c9748a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t("name")}
        </h2>
        <span
          style={{
            display: "block",
            height: "1px",
            width: "5rem",
            background:
              "linear-gradient(90deg,var(--rose,#c9748a),transparent)",
          }}
        />
        <h3
          style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(1.1rem,4vw,1.5rem)",
            color: "var(--cream,#f5ece0)",
            lineHeight: 1.4,
          }}
        >
          {t("titleLine1")}
          <br />
          <span
            style={{
              fontStyle: "normal",
              fontWeight: 500,
              color: "var(--rose-light,#e8a0b0)",
            }}
          >
            {t("titleLine2")}
          </span>
        </h3>
      </div>

      <div className="flex justify-center py-4 anim-ph">
        <PhotoColumn
          photo={photo}
          name={t("name")}
          yearsLabel={tStats("yearsExp")}
          projectsLabel={tStats("projects")}
          yearsValue={yearsValue}
          projectsValue={projectsValue}
          size="sm"
        />
      </div>

      <p
        className="anim-3"
        style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "1.05rem",
          lineHeight: 1.8,
          color: "var(--cream-dim,#c4b5a5)",
        }}
      >
        {t("description")}
      </p>

      <div className="flex flex-wrap gap-3 anim-4">
        <a href="/assets/docs/cv.pdf" download="CV.pdf" className="btn-rose">
          {t("downloadCV")} <Download size={14} />
        </a>
        <a href="/projects" className="btn-outline">
          {t("viewWork")} <ArrowRight size={14} />
        </a>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   PhotoColumn
───────────────────────────────────────────── */
function PhotoColumn({
  photo,
  name,
  yearsLabel,
  projectsLabel,
  yearsValue,
  projectsValue,
  size,
}: {
  photo: string;
  name: string;
  yearsLabel: string;
  projectsLabel: string;
  yearsValue: number | string;
  projectsValue: number | string;
  size: "sm" | "lg";
}) {
  const maxW =
    size === "lg" ? "max-w-[420px]" : "max-w-[300px] sm:max-w-[340px]";
  const numSz = size === "lg" ? "1.6rem" : "1.25rem";
  const cardR = size === "lg" ? "-11%" : "-5%";
  const cardL = size === "lg" ? "-9%" : "-4%";

  return (
    <div className={`relative w-full ${maxW} mx-auto lg:ml-auto`}>
      {/* Dot grids */}
      <div className="dot-grid" style={{ top: "-3%", left: "-6%" }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="dot-grid" style={{ bottom: "-3%", right: "-6%" }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
        {/* Blob bg */}
        <div className="photo-blob-bg" />

        {/* Corner accents */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "44%",
            borderTop: "1px solid rgba(201,116,138,0.42)",
            borderRight: "1px solid rgba(201,116,138,0.42)",
            borderRadius: "0 18px 0 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "50%",
            height: "44%",
            borderBottom: "1px solid rgba(201,116,138,0.42)",
            borderLeft: "1px solid rgba(201,116,138,0.42)",
            borderRadius: "0 0 0 18px",
          }}
        />

        {/* Image */}
        <div className="photo-clip">
          <img src={photo} alt={name} />
          <div className="photo-overlay" />
        </div>

        {/* Float card — top right */}
        <div className="float-card card-a" style={{ right: cardR }}>
          <span className="float-card-num" style={{ fontSize: numSz }}>
            {yearsValue}+
          </span>
          <span className="float-card-label">{yearsLabel}</span>
        </div>

        {/* Float card — bottom left */}
        <div className="float-card card-b" style={{ left: cardL }}>
          <span className="float-card-num" style={{ fontSize: numSz }}>
            {projectsValue}+
          </span>
          <span className="float-card-label">{projectsLabel}</span>
        </div>
      </div>
    </div>
  );
}
