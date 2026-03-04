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

  useEffect(() => { setVisibleCards(new Array(servicesCount).fill(false)); }, [servicesCount]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        Array.from({ length: servicesCount }).forEach((_, i) => {
          setTimeout(() => {
            setVisibleCards((prev) => { const next = [...prev]; next[i] = true; return next; });
          }, i * 350);
        });
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [servicesCount]);

  const defaultIcons = ["BookOpen", "PenLine", "Microscope", "GraduationCap"];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-28"
      style={{ background: "var(--bg-primary)", scrollMarginTop: "25px" }}
    >
      {/* Soft background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position:"absolute", width:"600px", height:"600px",
          top:"-150px", right:"-150px", borderRadius:"50%",
          filter:"blur(120px)", opacity:0.35,
          background:"radial-gradient(circle, rgba(232,160,176,0.25) 0%, rgba(201,116,138,0.08) 50%, transparent 70%)",
        }} />
        <div style={{
          position:"absolute", width:"500px", height:"500px",
          bottom:"-100px", left:"-100px", borderRadius:"50%",
          filter:"blur(120px)", opacity:0.25,
          background:"radial-gradient(circle, rgba(226,201,138,0.20) 0%, transparent 70%)",
        }} />
        {/* Subtle floral watermark */}
        <svg className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.04]" width="220" height="220" viewBox="0 0 220 220">
          {[0,45,90,135,180,225,270,315].map((deg,i) => (
            <ellipse key={i} cx="110" cy="110" rx="18" ry="50"
              fill="rgba(201,116,138,1)"
              transform={`rotate(${deg} 110 110) translate(0,-58)`} />
          ))}
          <circle cx="110" cy="110" r="16" fill="rgba(201,116,138,1)" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">

        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Pill label */}
          <div className="flex justify-center mb-6">
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 20px",
              background: "rgba(201,116,138,0.10)",
              border: "1px solid rgba(201,116,138,0.22)",
              borderRadius: "100px",
              color: "var(--rose-light,#e8a0b0)",
              fontSize: "0.6rem", fontWeight: 500,
              letterSpacing: "0.28em", textTransform: "uppercase",
              fontFamily: "'Jost', sans-serif",
            }}>
              <span style={{ display:"block", width:"4px", height:"4px", borderRadius:"50%", background:"currentColor" }} />
              § 03 — {t("sectionCategory")}
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            fontWeight: 400, letterSpacing: "0.02em",
            background: "linear-gradient(145deg, #f7f0e0 0%, #e8a0b0 50%, #c9748a 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", marginBottom: "16px", lineHeight: 1.2,
          }}>
            {t("title")}
          </h2>

          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic", fontWeight: 300,
            color: "rgba(196,181,165,0.75)",
            fontSize: "1.1rem", maxWidth: "560px",
            margin: "0 auto", lineHeight: 1.85,
          }}>
            {t("subtitle")}
          </p>

          {/* Ornament */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div style={{ height:"1px", width:"60px", background:"linear-gradient(90deg, transparent, rgba(201,116,138,0.45))" }} />
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M8 1 Q9.5 4 13 4 Q9.5 5.5 8 9 Q6.5 5.5 3 4 Q6.5 4 8 1Z" fill="rgba(201,116,138,0.55)" />
            </svg>
            <div style={{ height:"1px", width:"60px", background:"linear-gradient(90deg, rgba(201,116,138,0.45), transparent)" }} />
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {t.raw("items").map((service: any, index: number) => {
            const iconName = service.icon || defaultIcons[index] || "BookOpen";
            const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.BookOpen;
            return (
              <ServiceCard
                key={index} number={index + 1}
                title={service.title} description={service.description}
                icon={IconComponent} index={index} isVisible={visibleCards[index]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}