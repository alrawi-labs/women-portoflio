"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/portfolioData";

export default function Testimonials() {
  const [isVisible, setIsVisible]     = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          testimonials.forEach((_: any, i: number) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, 200 + i * 130);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24"
      style={{
        background:      "var(--bg-primary)",
        scrollMarginTop: "140px",
        borderBottom:    "1px solid rgba(200,164,90,0.08)",
      }}
    >
      {/* ── Background ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 50% 40% at 0%  20%, rgba(21,35,54,0.85) 0%, transparent 65%), " +
            "radial-gradient(ellipse 45% 35% at 100% 80%, rgba(28,47,68,0.55) 0%, transparent 65%)",
        }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          {[120, 250, 380, 510, 640, 770].map((y) => (
            <line key={y} x1="0" y1={y} x2="100%" y2={y}
              stroke="rgba(200,164,90,0.7)" strokeWidth="0.5" />
          ))}
          <path d="M 60 60 L 60 110 L 110 110"      fill="none" stroke="rgba(200,164,90,0.8)" strokeWidth="1.2" />
          <path d="M 1140 750 L 1140 700 L 1090 700" fill="none" stroke="rgba(200,164,90,0.8)" strokeWidth="1.2" />
          <line x1="80" y1="0" x2="80" y2="100%" stroke="rgba(200,164,90,0.2)" strokeWidth="0.5" />
        </svg>
        {/* Watermark */}
        <svg width="100%" height="100%" viewBox="0 0 1200 800"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0.022 }}
        >
          <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle"
            fontSize="160" fill="none" stroke="rgba(200,164,90,0.8)" strokeWidth="1"
            fontWeight="700" fontFamily="'Playfair Display', Georgia, serif" letterSpacing="0.08em"
          >
            TESTIMONIALS
          </text>
        </svg>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">

        {/* ── Section Header ───────────────────────── */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="flex justify-center mb-5">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              border: "1px solid rgba(200,164,90,0.28)", borderRadius: "2px",
              padding: "5px 16px", background: "rgba(200,164,90,0.05)",
            }}>
              <span style={{
                color: "var(--gold-dim)", fontSize: "0.62rem",
                letterSpacing: "0.25em", textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif", fontWeight: 600,
              }}>
                § 09 &nbsp;—&nbsp; Client References
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-3">
            <div style={{
              width: "44px", height: "44px",
              border: "1px solid rgba(200,164,90,0.3)", borderRadius: "2px",
              background: "rgba(200,164,90,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <MessageSquare size={20} style={{ color: "var(--gold)", strokeWidth: 1.6 }} />
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 800,
              background: "linear-gradient(135deg, #e0c07a 0%, #c8a45a 50%, #8a6e35 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              lineHeight: 1.15,
            }}>
              My Client&apos;s Stories
            </h2>
          </div>

          <p style={{
            color: "var(--cream-dim)", fontSize: "1rem",
            maxWidth: "540px", margin: "0 auto", lineHeight: 1.75,
            fontFamily: "'Sora', sans-serif",
          }}>
            Empowering people in a new digital journey with my services
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="block h-px w-14" style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
            <span style={{ color: "var(--gold-dim)", fontSize: "0.55rem" }}>✦</span>
            <span className="block h-px w-14" style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
          </div>
        </div>

        {/* ── Grid ─────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {testimonials.map((testimonial: any, index: number) => (
            <div
              key={testimonial.id}
              className="group relative"
              style={{
                opacity:   visibleCards[index] ? 1 : 0,
                transform: visibleCards[index] ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.7s ease ${index * 80}ms, transform 0.7s ease ${index * 80}ms`,
              }}
            >
              <div
                className="relative overflow-hidden h-full"
                style={{
                  background: "linear-gradient(145deg, var(--navy-surface) 0%, var(--navy-mid) 100%)",
                  border: "1px solid rgba(200,164,90,0.12)",
                  borderTop: "2px solid rgba(200,164,90,0.25)",
                  borderRadius: "2px",
                  padding: "32px 28px",
                  transition: "border-color 0.4s, box-shadow 0.4s, transform 0.35s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor    = "rgba(200,164,90,0.38)";
                  el.style.borderTopColor = "var(--gold)";
                  el.style.boxShadow      = "0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,164,90,0.1)";
                  el.style.transform      = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor    = "rgba(200,164,90,0.12)";
                  el.style.borderTopColor = "rgba(200,164,90,0.25)";
                  el.style.boxShadow      = "none";
                  el.style.transform      = "translateY(0)";
                }}
              >
                {/* Dot-grid */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(200,164,90,0.05) 1px, transparent 0)",
                  backgroundSize: "28px 28px",
                }} />

                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ borderTop: "1.5px solid var(--gold)", borderRight: "1.5px solid var(--gold)" }} />
                <div className="absolute bottom-0 left-0 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ borderBottom: "1.5px solid var(--gold)", borderLeft: "1.5px solid var(--gold)" }} />

                {/* Shimmer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="-translate-x-full group-hover:translate-x-full transition-transform duration-1000 absolute inset-0"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(200,164,90,0.05), transparent)" }} />
                </div>

                {/* Index stamp */}
                <span style={{
                  position: "absolute", top: "14px", right: "16px",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.65rem", fontWeight: 700,
                  color: "rgba(200,164,90,0.2)",
                }}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="relative z-10 space-y-5">

                  {/* Opening quote */}
                  <span style={{
                    display: "block",
                    fontFamily: "'Playfair Display', serif",
                    color: "rgba(200,164,90,0.3)",
                    fontSize: "4rem",
                    lineHeight: 0.7,
                  }}>
                    "
                  </span>

                  {/* Quote text */}
                  <p style={{
                    color: "var(--cream-dim)",
                    fontSize: "0.95rem",
                    lineHeight: 1.85,
                    fontFamily: "'Sora', sans-serif",
                    fontStyle: "italic",
                  }}>
                    {testimonial.quote}
                  </p>

                  {/* Gold rule */}
                  <div
                    className="w-10 group-hover:w-20 transition-all duration-500"
                    style={{
                      height: "1.5px",
                      background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
                    }}
                  />

                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        style={{
                          fill: "var(--gold)",
                          color: "var(--gold)",
                          opacity: 0.9,
                        }}
                      />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-1">
                    {/* Avatar with gold ring */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="absolute inset-0 rounded-sm"
                        style={{
                          border: "1px solid rgba(200,164,90,0.4)",
                          transform: "scale(1.08)",
                          borderRadius: "2px",
                        }}
                      />
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="relative w-12 h-12 object-cover"
                        style={{ borderRadius: "2px" }}
                      />
                    </div>

                    {/* Name & role */}
                    <div>
                      <p style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        color: "var(--cream)",
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        marginBottom: "2px",
                      }}>
                        {testimonial.name}
                      </p>
                      <p style={{
                        color: "var(--gold-dim)",
                        fontSize: "0.7rem",
                        fontFamily: "'Sora', sans-serif",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom ornament ──────────────────────── */}
        <div className={`flex items-center justify-center gap-4 mt-14 transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <span className="block h-px flex-1 max-w-[120px]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(200,164,90,0.3))" }} />
          <span style={{
            color: "var(--gold-dim)", fontSize: "0.6rem",
            letterSpacing: "0.3em", textTransform: "uppercase",
            fontFamily: "'Sora', sans-serif",
          }}>
            {testimonials.length} References
          </span>
          <span className="block h-px flex-1 max-w-[120px]"
            style={{ background: "linear-gradient(90deg, rgba(200,164,90,0.3), transparent)" }} />
        </div>

      </div>
    </section>
  );
}