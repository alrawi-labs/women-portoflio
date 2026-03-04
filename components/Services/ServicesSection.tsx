"use client";

import { useState, useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";
import { useTranslations } from "next-intl";
import ServiceCard from "./ServiceCard";

export default function Services() {
  const t = useTranslations("services");
  const [isVisible, setIsVisible]       = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const servicesCount = t.raw("items").length;

  useEffect(() => {
    setVisibleCards(new Array(servicesCount).fill(false));
  }, [servicesCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          Array.from({ length: servicesCount }).forEach((_, i) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 350);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [servicesCount]);

  const defaultIcons = ["Code", "Palette", "Cpu", "Shield"];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24"
      style={{
        background: "var(--bg-primary)",
        scrollMarginTop: "25px",
        borderTop:    "1px solid rgba(221, 167, 165,0.08)",
        borderBottom: "1px solid rgba(221, 167, 165,0.08)",
      }}
    >
      {/* ── Background accents ─────────────────────────── */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 10%, rgba(221, 167, 165, 0.08) 0%, transparent 60%), " +
            "radial-gradient(ellipse 60% 40% at 80% 90%, rgba(221, 167, 165, 0.05) 0%, transparent 60%)",
        }}
      />

      {/* Horizontal glowing lines — soft elegant feel */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20 flex flex-col justify-between py-20">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-full h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.4), transparent)",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">

        {/* ── Section Header ─────────────────────────────── */}
        <div
          className={`text-center mb-14 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Section marker */}
          <div className="flex justify-center mb-5">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid rgba(221, 167, 165,0.28)",
                borderRadius: "2px",
                padding: "5px 16px",
                background: "rgba(221, 167, 165,0.05)",
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
                ✨ &nbsp; {t("sectionCategory")}
              </span>
            </div>
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

          <p style={{
            color: "var(--cream-dim)",
            fontSize: "1.05rem",
            maxWidth: "640px",
            margin: "0 auto",
            lineHeight: 1.75,
            fontFamily: "'Sora', sans-serif",
          }}>
            {t("subtitle")}
          </p>

          {/* Soft ornament rule */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="block h-px w-20"
              style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.6))" }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(221, 167, 165,0.6)", boxShadow: "0 0 10px rgba(221, 167, 165,0.5)" }} />
            <span className="block h-px w-20"
              style={{ background: "linear-gradient(90deg, rgba(221, 167, 165,0.6), transparent)" }} />
          </div>
        </div>

        {/* ── Services Grid ──────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
          {t.raw("items").map((service: any, index: number) => {
            const iconName    = service.icon || defaultIcons[index] || "Code";
            const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Code;

            return (
              <ServiceCard
                key={index}
                number={index + 1}
                title={service.title}
                description={service.description}
                icon={IconComponent}
                index={index}
                isVisible={visibleCards[index]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}