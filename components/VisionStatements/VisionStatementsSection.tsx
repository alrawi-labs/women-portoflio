"use client";

import TextAnimation from "@/components/ui/scroll-text";
import React from "react";
import { useTranslations, useLocale } from "next-intl";

export default function VisionStatements() {
  const t      = useTranslations("vision");
  const locale = useLocale();
  const isRTL  = locale === "ar";

  const labels = [
    "§ 02.1 — Vision",
    "§ 02.2 — Mission",
    "§ 02.3 — Approach",
    "§ 02.4 — Purpose",
  ];

  const statements = [
    {
      // § 02.1 — Vision
      // Kelimeler ortadan açılır gibi — çiçek açma efekti
      // Her kelime scale(0.85) + blur'dan tam boyuta gelir, stagger ile
      text: t("statements.0.text"),
      variants: {
        hidden:  { opacity: 0, scale: 0.85, filter: "blur(8px)", y: 10 },
        visible: {
          opacity: 1, scale: 1, filter: "blur(0px)", y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      },
      className: `vs-text text-4xl sm:text-5xl md:text-6xl xl:text-8xl max-w-4xl mx-auto font-bold capitalize leading-tight ${isRTL ? "rtl" : ""}`,
      containerClass: "h-[80vh] flex flex-col justify-center items-center text-center",
      align: "center" as const,
    },
    {
      // § 02.2 — Mission
      // Harf harf soldan sürünerek gelir — kalem ucundan yazılıyor hissi
      text: t("statements.1.text"),
      letterAnime: !isRTL,
      variants: {
        hidden:  { opacity: 0, x: -18, filter: "blur(3px)" },
        visible: {
          opacity: 1, x: 0, filter: "blur(0px)",
          transition: { duration: 0.35, ease: "easeOut" },
        },
      },
      as: "p" as const,
      className: `vs-text text-3xl sm:text-4xl md:text-5xl xl:text-7xl max-w-3xl lowercase font-bold ${isRTL ? "rtl" : ""}`,
      containerClass: "h-[80vh] flex items-center text-left",
      align: "left" as const,
    },
    {
      // § 02.3 — Approach
      // Kelimeler sağdan kayarak, hafif rotation ile — rüzgarda yaprak gibi
      text: t("statements.2.text"),
      direction: "right" as const,
      variants: {
        hidden:  { opacity: 0, x: 60, rotate: 1.5, filter: "blur(6px)" },
        visible: {
          opacity: 1, x: 0, rotate: 0, filter: "blur(0px)",
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        },
      },
      className: `vs-text text-3xl sm:text-4xl md:text-5xl xl:text-7xl max-w-3xl ml-auto capitalize font-bold ${isRTL ? "rtl" : ""}`,
      containerClass: "h-[80vh] flex justify-center items-center text-right",
      align: "right" as const,
    },
    {
      // § 02.4 — Purpose
      // Tüm satır aşağıdan yüzer gibi gelir — ağır, sakin, tamamlayıcı
      text: t("statements.3.text"),
      direction: "down" as const,
      lineAnime: !isRTL,
      variants: {
        hidden:  { opacity: 0, y: 40, filter: "blur(12px)" },
        visible: {
          opacity: 1, y: 0, filter: "blur(0px)",
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        },
      },
      className: `vs-text text-3xl sm:text-4xl md:text-5xl xl:text-7xl max-w-3xl mx-auto lowercase font-bold ${isRTL ? "rtl" : ""}`,
      containerClass: "h-[80vh] flex justify-center items-center text-center",
      align: "center" as const,
    },
  ];

  return (
    <div style={{ background: "var(--bg-primary)", position: "relative", overflow: "hidden" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Single dusty-rose accent ── */
        .vs-text,
        .vs-text span,
        .vs-text p,
        .vs-text div {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          color: #ffdce4a6 !important;
          -webkit-text-fill-color: #ffdce4a6 !important;
          background: none !important;
        }
        .vs-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.56rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(196,120,138,0.65);
        }
      `}} />

      {/* ── Static botanical illustration — top right ── */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", top: 0, right: 0, width: "240px", height: "240px", opacity: 0.10, pointerEvents: "none" }}
        viewBox="0 0 260 260"
        fill="none"
      >
        <path d="M 200 0 Q 180 60 160 100 Q 140 140 130 200 Q 120 230 115 260"
          stroke="#c4788a" strokeWidth="1" />
        <path d="M 170 70 Q 140 50 120 65 Q 145 75 160 90"
          stroke="#c4788a" strokeWidth="0.8" fill="rgba(196,120,138,0.15)" />
        <path d="M 150 115 Q 118 95 100 112 Q 128 118 145 132"
          stroke="#c4788a" strokeWidth="0.8" fill="rgba(196,120,138,0.12)" />
        <path d="M 178 88 Q 210 70 225 85 Q 205 94 192 108"
          stroke="#c4788a" strokeWidth="0.8" fill="rgba(196,120,138,0.10)" />
        {[0,40,80,120,160,200,240,280,320].map((deg, i) => (
          <ellipse key={i} cx="200" cy="28" rx="5" ry="14"
            fill="rgba(196,120,138,0.22)" stroke="#c4788a" strokeWidth="0.5"
            transform={`rotate(${deg} 200 28) translate(0 -16)`} />
        ))}
        <circle cx="200" cy="28" r="5" fill="rgba(196,120,138,0.4)" />
        {[0,60,120,180,240,300].map((deg, i) => (
          <ellipse key={i} cx="128" cy="198" rx="3" ry="9"
            fill="rgba(196,120,138,0.15)" stroke="#c4788a" strokeWidth="0.4"
            transform={`rotate(${deg} 128 198) translate(0 -11)`} />
        ))}
        <circle cx="128" cy="198" r="3" fill="rgba(196,120,138,0.3)" />
      </svg>

      {/* ── Mirrored botanical — bottom left ── */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", bottom: 0, left: 0, width: "160px", height: "160px", opacity: 0.08, pointerEvents: "none", transform: "scaleX(-1) rotate(180deg)" }}
        viewBox="0 0 260 260"
        fill="none"
      >
        <path d="M 200 0 Q 180 60 160 100 Q 140 140 130 200 Q 120 230 115 260"
          stroke="#c4788a" strokeWidth="1" />
        <path d="M 170 70 Q 140 50 120 65 Q 145 75 160 90"
          stroke="#c4788a" strokeWidth="0.8" fill="rgba(196,120,138,0.15)" />
        <path d="M 150 115 Q 118 95 100 112 Q 128 118 145 132"
          stroke="#c4788a" strokeWidth="0.8" fill="rgba(196,120,138,0.12)" />
        {[0,60,120,180,240,300].map((deg, i) => (
          <ellipse key={i} cx="128" cy="198" rx="3" ry="9"
            fill="rgba(196,120,138,0.15)" stroke="#c4788a" strokeWidth="0.4"
            transform={`rotate(${deg} 128 198) translate(0 -11)`} />
        ))}
        <circle cx="128" cy="198" r="3" fill="rgba(196,120,138,0.3)" />
      </svg>

      {/* ── Statements ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-64" style={{ position: "relative", zIndex: 10 }}>
        {statements.map((statement, i) => (
          <div key={i} className={`relative ${statement.containerClass}`}>

            {/* Section label */}
            <div className="absolute top-8 left-0" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "block", width: "20px", height: "1px", background: "rgba(196,120,138,0.45)" }} />
              <span className="vs-label">{labels[i]}</span>
            </div>

            {/* Text */}
            <div style={{ position: "relative", zIndex: 10 }}>
              <TextAnimation
                text={statement.text}
                direction={statement.direction}
                variants={statement.variants}
                letterAnime={statement.letterAnime}
                lineAnime={statement.lineAnime}
                as={statement.as}
                classname={statement.className}
              />
            </div>

            {/* Bottom floral ornament */}
            <div
              className="absolute bottom-10"
              style={{
                ...(statement.align === "center"
                  ? { left: "50%", transform: "translateX(-50%)" }
                  : statement.align === "right"
                  ? { right: 0 }
                  : { left: 0 }),
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {statement.align !== "right" && (
                <span style={{ display: "block", width: "36px", height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(196,120,138,0.40))" }} />
              )}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                {[0,60,120,180,240,300].map((deg, di) => (
                  <ellipse key={di} cx="6" cy="6" rx="1.2" ry="3.5"
                    fill="rgba(196,120,138,0.55)"
                    transform={`rotate(${deg} 6 6) translate(0 -3.8)`} />
                ))}
                <circle cx="6" cy="6" r="1.8" fill="rgba(196,120,138,0.65)" />
              </svg>
              {statement.align !== "left" && (
                <span style={{ display: "block", width: "36px", height: "1px",
                  background: "linear-gradient(90deg, rgba(196,120,138,0.40), transparent)" }} />
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}