"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SiteLogo } from "@/data/techIcons";

export default function LoadingScreen() {
  const [isLoading,  setIsLoading]  = useState(true);
  const [isExiting,  setIsExiting]  = useState(false);
  const [progress,   setProgress]   = useState(0);
  const locale = useLocale();
  const t      = useTranslations("loading");

  const isRTL      = locale === "ar";
  const loadingText = isRTL ? [t("text")] : t("text").split("");

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        return Math.min(prev + Math.random() * 15, 100);
      });
    }, 200);

    const exitTimer   = setTimeout(() => setIsExiting(true),    2500);
    const removeTimer = setTimeout(() => setIsLoading(false),   3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  const pct = Math.min(Math.round(progress), 100);

  // Feminine Rose Gold Palette
  const roseGold = {
    light: "#f0c4c2",
    main:  "#dda7a5",
    dark:  "#b3817e",
    glow:  "rgba(221, 167, 165, 0.4)",
    border: "rgba(221, 167, 165, 0.22)",
    bgGlow: "rgba(221, 167, 165, 0.06)"
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes letterFloat {
          0%, 100% { transform: translateY(0);    opacity: 1;   }
          50%       { transform: translateY(-8px); opacity: 0.8; }
        }
        @keyframes logoPulse {
          0%, 100% { transform: scale(1);       opacity: 1;    }
          50%       { transform: scale(1.05);    opacity: 0.9;  }
        }
        @keyframes rosePulse {
          0%, 100% { box-shadow: 0 0 0   0 rgba(221, 167, 165, 0);    }
          50%       { box-shadow: 0 0 30px 8px rgba(221, 167, 165, 0.2); }
        }
        @keyframes progressShimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%);  }
        }
        @keyframes softGlow {
          0%, 100% { opacity: 0.4; transform: scale(1);   }
          50%       { opacity: 0.7; transform: scale(1.1); }
        }
        .letter-float  { animation: letterFloat 2s ease-in-out infinite; }
        .logo-pulse    { animation: logoPulse   4s ease-in-out infinite; }
        .rose-pulse    { animation: rosePulse   3s ease-in-out infinite; }
        .soft-glow      { animation: softGlow     5s ease-in-out infinite; }
      ` }} />

      <div
        className={`fixed inset-0 z-[999] flex items-center justify-center overflow-hidden transition-all duration-1000 ${
          isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
        style={{ background: "var(--bg-primary, #0f0a0a)" }}
      >
        {/* ── Background rose glows ───────────── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="soft-glow"
            style={{
              position: "absolute",
              top: "-10%",
              right: "-10%",
              width: "50%",
              height: "50%",
              background: `radial-gradient(circle, ${roseGold.bgGlow} 0%, transparent 70%)`,
            }} 
          />
          <div 
            className="soft-glow"
            style={{
              position: "absolute",
              bottom: "-10%",
              left: "-10%",
              width: "50%",
              height: "50%",
              background: `radial-gradient(circle, ${roseGold.bgGlow} 0%, transparent 70%)`,
              animationDelay: "-2s"
            }} 
          />
          
          {/* Subtle horizontal lines */}
          <div className="absolute inset-0 w-full h-full opacity-10 flex flex-col justify-between py-24">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="w-full h-px" 
                style={{ background: `linear-gradient(90deg, transparent, ${roseGold.main}, transparent)` }} 
              />
            ))}
          </div>
        </div>

        {/* ── Main content ─────────────────────── */}
        <div
          className={`relative z-10 flex flex-col items-center gap-12 px-4 transition-all duration-1000 ${
            isExiting ? "opacity-0 -translate-y-8 scale-95" : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          {/* Logo Section */}
          <div className="relative logo-pulse">
            {/* Rose Gold Glow Ring */}
            <div
              className="absolute -inset-4 rose-pulse pointer-events-none"
              style={{
                border: `1px solid ${roseGold.border}`,
                borderRadius: "50%",
              }}
            />
            {/* Elegant corner accents */}
            <div className="absolute -top-2 -left-2 w-5 h-5"
              style={{ borderTop: `1.5px solid ${roseGold.main}`, borderLeft: `1.5px solid ${roseGold.main}`, opacity: 0.6 }} />
            <div className="absolute -bottom-2 -right-2 w-5 h-5"
              style={{ borderBottom: `1.5px solid ${roseGold.main}`, borderRight: `1.5px solid ${roseGold.main}`, opacity: 0.6 }} />

            <div className="p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 relative z-10">
              <img
                src={SiteLogo}
                alt="Logo"
                width={64} height={64}
                style={{ filter: `drop-shadow(0 0 15px ${roseGold.glow})` }}
              />
            </div>
          </div>

          {/* Loading text */}
          <div className={`flex flex-col items-center gap-4`}>
            {/* Section marker */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: `1px solid ${roseGold.border}`, borderRadius: "24px",
              padding: "4px 14px", background: "rgba(221, 167, 165, 0.04)",
            }}>
              <span style={{
                color: roseGold.main, fontSize: "0.55rem",
                letterSpacing: "0.25em", textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif", fontWeight: 600,
                opacity: 0.8
              }}>
                ✦ {t("text") || "Loading Portfolio"} ✦
              </span>
            </div>

            <div className={`flex items-end gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={`flex gap-0 ${isRTL ? "flex-row-reverse" : ""}`}>
                {loadingText.map((letter, i) => (
                  <span
                    key={i}
                    className="letter-float"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      fontFamily: isRTL
                        ? "'Cairo', 'Tajawal', sans-serif"
                        : "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(2.5rem, 10vw, 4rem)",
                      fontWeight: 700,
                      background: `linear-gradient(135deg, ${roseGold.light} 0%, ${roseGold.main} 50%, ${roseGold.dark} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: 1,
                      display: "inline-block",
                      padding: "0 1px"
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>

              {/* Elegant Dots */}
              <div className={`flex gap-1.5 items-end pb-2 ${isRTL ? "mr-3" : "ml-3"}`}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block w-1 h-1 rounded-full animate-pulse"
                    style={{
                      background: roseGold.main,
                      animationDelay: `${i * 0.2}s`,
                      opacity: 0.6
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full max-w-xs sm:max-w-sm px-6">
            {/* Track */}
            <div
              className="relative h-1 overflow-hidden rounded-full bg-white/5 border border-white/5"
            >
              {/* Fill */}
              <div
                style={{
                  position: "absolute",
                  top: 0, bottom: 0,
                  [isRTL ? "right" : "left"]: 0,
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, ${roseGold.dark}, ${roseGold.main}, ${roseGold.light})`,
                  transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: `0 0 10px ${roseGold.glow}`,
                }}
              >
                {/* Shimmer */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    animation: "progressShimmer 1.5s linear infinite",
                  }}
                />
              </div>
            </div>

            {/* Percentage & Markers */}
            <div
              className="flex justify-between mt-4"
              style={{
                color: roseGold.main,
                fontSize: "0.65rem",
                fontFamily: "'Sora', sans-serif",
                letterSpacing: "0.15em",
                opacity: 0.6
              }}
            >
              <span>0%</span>
              <span style={{ 
                fontWeight: 700, 
                fontFamily: "'Playfair Display', serif", 
                fontSize: "0.85rem",
                opacity: 1
              }}>
                {isRTL ? `%${pct}` : `${pct}%`}
              </span>
              <span>100%</span>
            </div>
          </div>

          {/* Bottom Ornament */}
          <div className="flex items-center gap-4 opacity-40">
            <div className="h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${roseGold.main})` }} />
            <div className="w-1.5 h-1.5 rounded-full rotate-45 border border-current" style={{ color: roseGold.main }} />
            <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${roseGold.main}, transparent)` }} />
          </div>
        </div>
      </div>
    </>
  );
}
