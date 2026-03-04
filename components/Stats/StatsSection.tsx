// @ts-nocheck

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { statsData } from "@/data/stats";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

/* ── Sabit particle config (hydration-safe) ── */
const PARTICLE_CONFIG = Array.from({ length: 16 }, (_, i) => ({
  width:   1 + ((i * 0.15) % 3),
  height:  1 + ((i * 0.12) % 3),
  left:    (i * 6.25) % 100,
  top:     (i * 5.5)  % 100,
  opacity: 0.25 + ((i * 0.03) % 0.4),
  xOffset:  (i % 2 === 0 ? 1 : -1) * (40 + ((i * 5) % 40)),
  xOffset2: (i % 2 === 0 ? 1 : -1) * (60 + ((i * 6) % 40)),
  yOffset:  -(40 + ((i * 5) % 40)),
  duration: 2.2 + ((i * 0.1) % 1.5),
  delay:    (i * 0.06) % 1,
}));

const AnimatedStatsBar: React.FC = () => {
  const t = useTranslations("home.stats");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile,   setIsMobile]   = useState(false);
  const [isMounted,  setIsMounted]  = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.3 });

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Counter hook ── */
  const useCounter = (end: number, duration = 2000, start = 0): number => {
    const [count, setCount] = useState(start);
    useEffect(() => {
      if (!isInView) return;
      if (isMobile) { setCount(end); return; }
      let startTime: number | null = null;
      const animate = (now: number) => {
        if (!startTime) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(ease * (end - start) + start));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, [isInView, isMobile, end, duration, start]);
    return count;
  };

  const years    = useCounter(statsData.years,    2000);
  const projects = useCounter(statsData.projects, 2500);
  const clients  = useCounter(statsData.clients,  2200);
  const awards   = useCounter(statsData.awards,   2300);

  const stats: Stat[] = [
    { value: years,    suffix: "",        label: t("yearsLabel"),    description: t("yearsDesc")    },
    { value: projects, suffix: "+",       label: t("projectsLabel"), description: t("projectsDesc") },
    { value: clients,  suffix: t("k"),    label: t("clientsLabel"),  description: t("clientsDesc")  },
    { value: awards,   suffix: "",        label: t("awardsLabel"),   description: t("awardsDesc")   },
  ];

  /* ── Particles (gold toned) ── */
  const Particles = ({ isHovered }: { isHovered: boolean }) => {
    if (isMobile || !isMounted) return null;
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLE_CONFIG.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width:  p.width,
              height: p.height,
              left:   `${p.left}%`,
              top:    `${p.top}%`,
              background: `rgba(221, 167, 165, ${p.opacity})`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isHovered
                ? { opacity: [0, 1, 0], scale: [0, 1.4, 0],
                    x: [p.xOffset, p.xOffset2], y: [0, p.yOffset] }
                : { opacity: 0 }
            }
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
          />
        ))}
      </div>
    );
  };

  /* ── Variants ── */
  const cardVariants = {
    hidden: (dir: string) => ({
      opacity: isMobile ? 1 : 0,
      x:       isMobile ? 0 : dir === "left" ? -100 : 100,
      filter:  isMobile ? "blur(0px)" : "blur(8px)",
      scale:   isMobile ? 1 : 0.92,
    }),
    visible: {
      opacity: 1, x: 0, filter: "blur(0px)", scale: 1,
      transition: { duration: isMobile ? 0 : 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: isMobile ? 0 : 0.18 } },
  };

  /* ── Roman numeral labels for academic flavour ── */
  const romanLabels = ["I", "II", "III", "IV"];

  return (
    <section
      id="stats"
      className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-8"
      style={{
        background: "var(--navy-mid)",
        scrollMarginTop: "30px",
        borderTop:    "1px solid rgba(221, 167, 165, 0.1)",
        borderBottom: "1px solid rgba(221, 167, 165, 0.1)",
      }}
    >
      <style>{`
        @keyframes feminine-shift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        @keyframes shimmer-soft {
          0%   { background-position: -1000px 0; }
          100% { background-position:  1000px 0; }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .feminine-text {
          background: linear-gradient(260deg, #b3817e, #f0c4c2, #dda7a5, #f0c4c2, #b3817e);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: feminine-shift 4s ease infinite;
        }
        .feminine-card-glow {
          box-shadow:
            0 10px 40px rgba(221, 167, 165, 0.04),
            inset 0 0 30px rgba(221, 167, 165, 0.02);
        }
        .feminine-card-glow:hover {
          box-shadow:
            0 20px 60px rgba(221, 167, 165, 0.12),
            inset 0 0 50px rgba(221, 167, 165, 0.06);
        }
        .shimmer-soft-line {
          background: linear-gradient(90deg, transparent, rgba(221, 167, 165, 0.4), transparent);
          background-size: 1000px 100%;
          animation: shimmer-soft 3s infinite;
        }
      `}</style>

      <div ref={statsRef} className="w-full max-w-7xl mx-auto">

        {/* ── Section Header ─────────────────────────────── */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={isMobile ? {} : { opacity: 0, y: -24 }}
          animate={!isMobile && isInView ? { opacity: 1, y: 0 } : isMobile ? {} : { opacity: 0, y: -24 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section marker */}
          <div
            className="inline-flex items-center gap-3 mb-6"
            style={{
              border: "1px solid rgba(221, 167, 165, 0.25)",
              borderRadius: "2px",
              padding: "6px 18px",
              background: "rgba(221, 167, 165, 0.05)",
            }}
          >
            <span style={{
              color: "var(--gold-dim)",
              fontSize: "0.62rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "'Sora', sans-serif",
              fontWeight: 500,
            }}>
              ✨ &nbsp; Metrics
            </span>
          </div>

          <h2
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              background: "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 50%, #b3817e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("title")}
          </h2>

          <p style={{ color: "var(--cream-dim)", fontSize: "1.05rem", maxWidth: "620px", margin: "0 auto", lineHeight: 1.7 }}>
            {t("subtitle")}
          </p>

          {/* Rule */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-6"
            initial={isMobile ? {} : { scaleX: 0 }}
            animate={!isMobile && isInView ? { scaleX: 1 } : isMobile ? {} : { scaleX: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            <span className="block h-px w-16" style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
            <span style={{ color: "var(--gold-dim)", fontSize: "0.6rem", letterSpacing: "0.3em" }}>✦</span>
            <span className="block h-px w-16" style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
          </motion.div>
        </motion.div>

        {/* ── Stats Grid ─────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => {
            const isHov = hoveredIndex === index;
            const dir   = index % 2 === 0 ? "left" : "right";

            return (
              <motion.div
                key={index}
                className="group relative"
                custom={dir}
                variants={cardVariants}
                onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={isMobile ? {} : { y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {/* Outer glow */}
                {!isMobile && isMounted && (
                  <motion.div
                    className="absolute -inset-1 blur-xl opacity-0 group-hover:opacity-100"
                    style={{ background: "radial-gradient(ellipse, rgba(221, 167, 165, 0.12), transparent 70%)", borderRadius: "4px" }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                {/* Card */}
                <div
                  className="relative overflow-hidden flex flex-col justify-between feminine-card-glow transition-all duration-700"
                  style={{
                    background: "radial-gradient(ellipse at bottom, var(--navy-surface) 0%, var(--navy-mid) 100%)",
                    border: isHov
                      ? "1px solid rgba(221, 167, 165, 0.35)"
                      : "1px solid rgba(221, 167, 165, 0.08)",
                    borderRadius: "40px",
                    minHeight: "320px",
                    padding: "48px 36px",
                    transition: "border-color 0.5s ease-in-out, transform 0.5s",
                    animation: isHov && !isMobile ? "float-gentle 3s ease-in-out infinite" : "none",
                  }}
                >
                  {/* Particles */}
                  <Particles isHovered={isHov} />

                  {/* Dot grid pattern */}
                  {isMounted && (
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(221, 167, 165, 0.08) 1px, transparent 0)",
                        backgroundSize: "36px 36px",
                        opacity: 0.6,
                      }}
                      animate={!isMobile && isHov ? { scale: 1.08, opacity: 1 } : { scale: 1, opacity: 0.6 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  {/* Soft decorative floating circle */}
                  <div
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl pointer-events-none"
                    style={{ background: "rgba(221, 167, 165, 0.15)" }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">

                    {/* Label */}
                    <div className="flex flex-col items-center gap-2 mb-6">
                      <motion.div
                        style={{
                          width: "36px",
                          height: "4px",
                          borderRadius: "2px",
                          background: isHov ? "var(--gold)" : "rgba(221, 167, 165, 0.2)",
                          transition: "background 0.5s",
                        }}
                      />
                      <motion.span
                        style={{
                          color: isHov ? "var(--gold-light)" : "var(--slate)",
                          fontSize: "0.6rem",
                          fontWeight: 600,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          fontFamily: "'Sora', sans-serif",
                          transition: "color 0.3s",
                        }}
                        animate={!isMobile && isHov ? { x: 4 } : { x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {stat.label}
                      </motion.span>
                    </div>

                    {/* Number */}
                    <div className="flex items-center justify-center gap-1 mb-5 relative">
                      {isHov && !isMobile && (
                        <motion.div
                          className="absolute inset-0 rounded-full blur-xl pointer-events-none"
                          style={{ background: "rgba(221, 167, 165, 0.2)" }}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1.5 }}
                          transition={{ duration: 0.8 }}
                        />
                      )}
                      <motion.span
                        className={!isMobile && isHov ? "feminine-text relative z-10" : "relative z-10"}
                        style={{
                          fontSize: "clamp(3rem, 6vw, 5rem)",
                          fontWeight: 900,
                          fontFamily: "'Playfair Display', Georgia, serif",
                          color: (!isMobile && isHov) ? undefined : "var(--gold)",
                          lineHeight: 1,
                        }}
                        animate={!isMobile && isHov ? { scale: 1.06 } : { scale: 1 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                      >
                        {stat.value}
                      </motion.span>
                      {stat.suffix && (
                        <motion.span
                          style={{
                            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                            fontWeight: 700,
                            fontFamily: "'Playfair Display', Georgia, serif",
                            color: isHov ? "var(--gold-light)" : "var(--gold-dim)",
                            transition: "color 0.3s",
                          }}
                          animate={!isMobile && isHov ? { scale: 1.08, rotate: 4 } : { scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {stat.suffix}
                        </motion.span>
                      )}
                    </div>

                    {/* Description */}
                    <motion.p
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: 1.6,
                        color: isHov ? "var(--cream-dim)" : "rgba(184,176,160,0.45)",
                        fontFamily: "'Sora', sans-serif",
                        transition: "color 0.3s",
                      }}
                      animate={!isMobile && isHov ? { x: 4 } : { x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.description}
                    </motion.p>
                  </div>

                  {/* Bottom decoratives */}
                  <div className="relative z-10 mt-8">
                    {!isMobile && isMounted && (
                      <motion.div
                        className="h-px mb-3 overflow-hidden"
                        style={{ background: "rgba(221, 167, 165, 0.12)" }}
                        initial={{ scaleX: 0 }}
                        animate={isHov ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="h-full shimmer-soft-line" />
                      </motion.div>
                    )}

                    {/* Progress bar — purely decorative */
                    /* Removed in feminine design to avoid rigid technical look, replaced by soft glowing curves */
                    }
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Footer note ───────────────────────────────── */}
        <motion.div
          className="text-center mt-16 sm:mt-20"
          initial={isMobile ? {} : { opacity: 0 }}
          animate={!isMobile && isInView ? { opacity: 1 } : isMobile ? {} : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="inline-flex items-center gap-3">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--gold-dim)" }}
              animate={isMobile || !isMounted ? {} : { scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span style={{ color: "var(--slate)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Sora', sans-serif" }}>
              {t("trustedBy")}
            </span>
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--gold-dim)" }}
              animate={isMobile || !isMounted ? {} : { scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1.25 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedStatsBar;