"use client";

import TextAnimation from "@/components/ui/scroll-text";
import React from "react";
import { useTranslations, useLocale } from "next-intl";

export default function VisionStatements() {
  const t      = useTranslations("vision");
  const locale = useLocale();
  const isRTL  = locale === "ar";

  const labels = [
    "✦ Vision",
    "✦ Mission",
    "✦ Approach",
    "✦ Purpose",
  ];

  /*
   * `vision-gold-text` class is applied to the TextAnimation wrapper.
   * The CSS below also targets child spans/divs that TextAnimation
   * creates internally — so the gradient renders regardless of the
   * animation component's internal DOM structure.
   */
  const goldCSS = `
    .vision-gold-text,
    .vision-gold-text span,
    .vision-gold-text p,
    .vision-gold-text div {
      font-family: 'Playfair Display', Georgia, serif !important;
      background: linear-gradient(135deg, #f0c4c2 0%, #dda7a5 55%, #b3817e 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    }
  `;

  const g = "vision-gold-text";

  const statements = [
    {
      text: t("statements.0.text"),
      variants: {
        hidden:  { filter: "blur(10px)", opacity: 0, y: 20 },
        visible: { filter: "blur(0px)",  opacity: 1, y: 0, transition: { ease: "linear" } },
      },
      className: `${g} text-4xl sm:text-5xl md:text-6xl xl:text-8xl max-w-4xl mx-auto font-bold capitalize leading-tight ${isRTL ? "rtl" : ""}`,
      containerClass: "h-[80vh] flex flex-col justify-center items-center text-center",
      align: "center" as const,
    },
    {
      text: t("statements.1.text"),
      letterAnime: !isRTL,
      variants: {
        hidden:  { filter: "blur(4px)", opacity: 0, y: 20 },
        visible: { filter: "blur(0px)", opacity: 1, y: 0, transition: { duration: 0.2 } },
      },
      as: "p" as const,
      className: `${g} text-3xl sm:text-4xl md:text-5xl xl:text-7xl max-w-3xl lowercase font-bold ${isRTL ? "rtl" : ""}`,
      containerClass: "h-[80vh] flex items-center text-left",
      align: "left" as const,
    },
    {
      text: t("statements.2.text"),
      direction: "right" as const,
      className: `${g} text-3xl sm:text-4xl md:text-5xl xl:text-7xl max-w-3xl ml-auto capitalize font-bold ${isRTL ? "rtl" : ""}`,
      containerClass: "h-[80vh] flex justify-center items-center text-right",
      align: "right" as const,
    },
    {
      text: t("statements.3.text"),
      direction: "down" as const,
      lineAnime: !isRTL,
      className: `${g} text-3xl sm:text-4xl md:text-5xl xl:text-7xl max-w-3xl mx-auto lowercase font-bold ${isRTL ? "rtl" : ""}`,
      containerClass: "h-[80vh] flex justify-center items-center text-center",
      align: "center" as const,
    },
  ];

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Gold gradient text styles */}
      <style dangerouslySetInnerHTML={{ __html: goldCSS }} />

      {/* ── Background ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 100% 0%, rgba(221, 167, 165, 0.06) 0%, transparent 65%), " +
            "radial-gradient(ellipse 50% 40% at 0% 100%, rgba(221, 167, 165, 0.04) 0%, transparent 65%)",
        }} />
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-15 flex flex-col justify-between" style={{ padding: "10% 0" }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.25), transparent)" }} />
          ))}
        </div>
      </div>

      {/* ── Statements ───────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-64 relative z-10">
        {statements.map((statement, i) => (
          <div
            key={i}
            className={`relative ${statement.containerClass}`}
          >
            {/* Section marker */}
            <div
              className="absolute top-8 left-0"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                border: "1px solid rgba(221, 167, 165,0.22)", borderRadius: "24px",
                padding: "5px 16px", background: "rgba(221, 167, 165,0.04)",
              }}
            >
              <span style={{
                color: "rgba(221, 167, 165,0.7)", fontSize: "0.58rem",
                letterSpacing: "0.22em", textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif", fontWeight: 500,
              }}>
                {labels[i]}
              </span>
            </div>

            {/* Bottom ornament */}
            <div
              className={`absolute bottom-12 flex items-center gap-2 ${
                statement.align === "right"
                  ? "right-0"
                  : statement.align === "center"
                  ? "left-1/2 -translate-x-1/2"
                  : "left-0"
              }`}
            >
              <span className="block h-px w-8"
                style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.6))" }} />
              <span className="w-1 h-1 rounded-full" style={{ background: "rgba(221, 167, 165,0.6)" }} />
              <span className="block h-px w-8"
                style={{ background: "linear-gradient(90deg, rgba(221, 167, 165,0.6), transparent)" }} />
            </div>

            {/* Vertical rose gold accent bar */}
            <div style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              [statement.align === "right" ? "right" : "left"]: "-24px",
              width: "2px",
              height: "80px",
              borderRadius: "2px",
              background: "linear-gradient(180deg, transparent, rgba(221, 167, 165,0.5), transparent)",
              opacity: 0.6,
            }} />

            {/* Text animation */}
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
        ))}
      </div>
    </div>
  );
}