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

  const isRTL       = locale === "ar";
  const loadingText = isRTL ? [t("text")] : t("text").split("");

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        return Math.min(prev + Math.random() * 15, 100);
      });
    }, 200);

    const exitTimer   = setTimeout(() => setIsExiting(true),  2500);
    const removeTimer = setTimeout(() => setIsLoading(false), 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  const pct = Math.min(Math.round(progress), 100);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Letter float ── */
        @keyframes letterFloat {
          0%, 100% { transform: translateY(0);     opacity: 1;   }
          50%       { transform: translateY(-10px); opacity: 0.7; }
        }
        /* ── Logo float ── */
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0)     rotate(0deg);  }
          50%       { transform: translateY(-12px) rotate(3deg);  }
        }
        /* ── Soft rose pulse ring ── */
        @keyframes rosePulse {
          0%, 100% { box-shadow: 0 0 0   0   rgba(201,116,138,0);    }
          50%       { box-shadow: 0 0 28px 6px rgba(201,116,138,0.22); }
        }
        /* ── Progress shimmer ── */
        @keyframes progressShimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%);  }
        }
        /* ── Petal drift ── */
        @keyframes petalDrift {
          0%   { transform: translateY(-20px) translateX(0px)  rotate(0deg);   opacity: 0; }
          10%  { opacity: 0.5; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(110vh) translateX(50px) rotate(720deg); opacity: 0; }
        }
        /* ── Orb float ── */
        @keyframes orbA {
          0%,100%{ transform:translate(0,0)    scale(1);    }
          50%    { transform:translate(-30px,20px) scale(1.05); }
        }
        @keyframes orbB {
          0%,100%{ transform:translate(0,0);   }
          50%    { transform:translate(20px,-28px); }
        }
        /* ── Entrance ── */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0);    }
        }

        .ls-letter { animation: letterFloat 1.6s ease-in-out infinite; }
        .ls-logo   { animation: logoFloat   3s   ease-in-out infinite; }
        .ls-ring   { animation: rosePulse   2.2s ease-in-out infinite; }
        .ls-orb-a  { animation: orbA        9s   ease-in-out infinite; }
        .ls-orb-b  { animation: orbB        11s  ease-in-out infinite; }

        .petal {
          position: absolute; pointer-events: none;
          border-radius: 50% 0 50% 0;
          animation: petalDrift linear infinite;
        }
      ` }} />

      <div
        className={`fixed inset-0 z-[999] flex items-center justify-center overflow-hidden transition-all duration-1000 ${
          isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
        style={{ background: "var(--bg-primary, #2d1f2e)" }}
      >

        {/* ── Ambient orbs ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="ls-orb-a absolute" style={{
            borderRadius:"50%", filter:"blur(90px)",
            width:"520px", height:"520px", top:"-130px", right:"-80px",
            background:"radial-gradient(circle, rgba(201,116,138,0.20) 0%, rgba(232,160,176,0.08) 45%, transparent 70%)",
          }} />
          <div className="ls-orb-b absolute" style={{
            borderRadius:"50%", filter:"blur(90px)",
            width:"380px", height:"380px", bottom:"-90px", left:"-60px",
            background:"radial-gradient(circle, rgba(201,169,110,0.14) 0%, rgba(245,221,228,0.05) 55%, transparent 80%)",
          }} />
        </div>

        {/* ── Falling petals ── */}
        {[
          { w:8,  h:12, left:"12%", dur:"12s", delay:"3s",  bg:"rgba(232,160,176,0.35)" },
          { w:6,  h:9,  left:"28%", dur:"15s", delay:"0s",  bg:"rgba(201,116,138,0.25)" },
          { w:10, h:14, left:"55%", dur:"11s", delay:"6s",  bg:"rgba(245,221,228,0.28)" },
          { w:7,  h:10, left:"72%", dur:"14s", delay:"2s",  bg:"rgba(226,201,138,0.22)" },
          { w:5,  h:8,  left:"88%", dur:"10s", delay:"8s",  bg:"rgba(201,116,138,0.18)" },
          { w:9,  h:13, left:"40%", dur:"13s", delay:"4s",  bg:"rgba(232,160,176,0.26)" },
        ].map((p, i) => (
          <div key={i} className="petal" style={{
            width:`${p.w}px`, height:`${p.h}px`, left:p.left,
            animationDuration:p.dur, animationDelay:p.delay,
            background:p.bg,
          }} />
        ))}

        {/* ── SVG background decoration ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice">
          {/* Subtle horizontal rules */}
          {[110,230,350,470,590,710].map(y => (
            <line key={y} x1="0" y1={y} x2="100%" y2={y}
              stroke="rgba(201,116,138,0.04)" strokeWidth="0.5" />
          ))}
          {/* Corner bracket TL */}
          <path d="M 48 48 L 48 100 L 100 100"
            fill="none" stroke="rgba(201,116,138,0.20)" strokeWidth="1" />
          {/* Corner bracket BR */}
          <path d="M calc(100% - 48px) calc(100% - 48px) L calc(100% - 48px) calc(100% - 100px) L calc(100% - 100px) calc(100% - 48px)"
            fill="none" stroke="rgba(201,116,138,0.20)" strokeWidth="1" />

          {/* Botanical stem — top right */}
          <g opacity="0.10">
            <line x1="93%" y1="0" x2="93%" y2="32%"
              stroke="rgba(232,160,176,0.8)" strokeWidth="0.8" />
            <ellipse cx="93%" cy="7%"  rx="15" ry="8"  fill="none"
              stroke="rgba(201,116,138,0.9)" strokeWidth="0.8"
              transform="rotate(-28 1110 56)" />
            <ellipse cx="93%" cy="17%" rx="18" ry="9"  fill="none"
              stroke="rgba(201,116,138,0.9)" strokeWidth="0.8"
              transform="rotate(18 1110 136)" />
            <ellipse cx="93%" cy="26%" rx="13" ry="7"  fill="none"
              stroke="rgba(232,160,176,0.9)" strokeWidth="0.8"
              transform="rotate(-12 1110 210)" />
          </g>

          {/* Watermark name */}
          <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle"
            fontSize="220" fill="none"
            stroke="rgba(201,116,138,0.035)" strokeWidth="1.5"
            fontWeight="600"
            style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", letterSpacing:"0.06em" }}>
            Dr
          </text>
        </svg>

        {/* ── Main content ── */}
        <div
          className={`relative z-10 flex flex-col items-center gap-9 px-4 transition-all duration-1000 ${
            isExiting ? "opacity-0 -translate-y-8 scale-95" : "opacity-100 translate-y-0 scale-100"
          }`}
        >

          {/* Logo */}
          <div className="relative ls-logo" style={{ animation: "logoFloat 3s ease-in-out infinite, fadeUp 0.7s 0.05s ease both" }}>
            {/* Rose glow ring */}
            <div
              className="absolute -inset-3 ls-ring pointer-events-none"
              style={{
                border: "1px solid rgba(201,116,138,0.22)",
                borderRadius: "14px",
              }}
            />
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4" style={{
              borderTop:  "1.5px solid rgba(201,116,138,0.55)",
              borderLeft: "1.5px solid rgba(201,116,138,0.55)",
            }} />
            <div className="absolute -bottom-1 -right-1 w-4 h-4" style={{
              borderBottom: "1.5px solid rgba(201,116,138,0.55)",
              borderRight:  "1.5px solid rgba(201,116,138,0.55)",
            }} />
            {/* Gold dot accents */}
            <div className="absolute -top-1 -right-1 w-4 h-4" style={{
              borderTop:   "1.5px solid rgba(201,169,110,0.45)",
              borderRight: "1.5px solid rgba(201,169,110,0.45)",
            }} />
            <div className="absolute -bottom-1 -left-1 w-4 h-4" style={{
              borderBottom: "1.5px solid rgba(201,169,110,0.45)",
              borderLeft:   "1.5px solid rgba(201,169,110,0.45)",
            }} />

            <img
              src={SiteLogo}
              alt="Logo"
              width={72} height={72}
              className="relative z-10"
              style={{
                borderRadius: "10px",
                filter: "drop-shadow(0 0 22px rgba(201,116,138,0.35))",
              }}
            />
          </div>

          {/* Section label pill */}
          <div style={{
            animation: "fadeUp 0.7s 0.15s ease both",
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 20px",
            background: "rgba(201,116,138,0.10)",
            border: "1px solid rgba(201,116,138,0.22)",
            borderRadius: "100px",
            color: "var(--rose-light, #e8a0b0)",
            fontSize: "0.6rem", fontWeight: 500,
            letterSpacing: "0.28em", textTransform: "uppercase",
            fontFamily: "'Jost', sans-serif",
          }}>
            <span style={{
              display:"block", width:"4px", height:"4px",
              borderRadius:"50%", background:"currentColor",
              animation: "credPulse 2.5s ease-in-out infinite",
            }} />
            § Portfolio
          </div>

          {/* Animated name letters */}
          <div
            style={{ animation: "fadeUp 0.7s 0.25s ease both" }}
            className={`flex items-end gap-0.5 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <div className={`flex gap-0 ${isRTL ? "flex-row-reverse" : ""}`}>
              {loadingText.map((letter, i) => (
                <span
                  key={i}
                  className="ls-letter"
                  style={{
                    animationDelay: `${i * 0.08}s`,
                    fontFamily: isRTL
                      ? "'Cairo', 'Tajawal', sans-serif"
                      : "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(2.4rem, 9vw, 5.2rem)",
                    fontWeight: 600,
                    background: "linear-gradient(145deg, #f7f0e0 0%, #e8a0b0 45%, #c9748a 80%, #9a5268 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                    display: "inline-block",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>

            {/* Bounce dots */}
            <div className={`flex gap-1 items-end pb-1.5 ${isRTL ? "mr-2" : "ml-2"}`}>
              {[0, 1, 2].map((i) => (
                <span key={i} className="block animate-bounce" style={{
                  width: "5px", height: "5px",
                  background: "var(--rose, #c9748a)",
                  borderRadius: "50%",
                  animationDelay: `${i * 0.18}s`,
                }} />
              ))}
            </div>
          </div>

          {/* Ornament divider */}
          <div style={{ animation: "fadeUp 0.7s 0.35s ease both" }} className="flex items-center gap-4">
            <div style={{ height:"1px", width:"60px", background:"linear-gradient(90deg, transparent, rgba(201,116,138,0.45))" }} />
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M8 1 Q9.5 4 13 4 Q9.5 5.5 8 9 Q6.5 5.5 3 4 Q6.5 4 8 1Z" fill="rgba(201,116,138,0.55)" />
            </svg>
            <div style={{ height:"1px", width:"60px", background:"linear-gradient(90deg, rgba(201,116,138,0.45), transparent)" }} />
          </div>

          {/* Progress bar */}
          <div style={{ animation: "fadeUp 0.7s 0.45s ease both" }} className="w-full max-w-xs sm:max-w-sm px-4 sm:px-0">
            {/* Track */}
            <div className="relative overflow-hidden" style={{
              height: "2px",
              background: "rgba(201,116,138,0.10)",
              border: "1px solid rgba(201,116,138,0.15)",
              borderRadius: "100px",
            }}>
              {/* Fill */}
              <div style={{
                position: "absolute",
                top: 0, bottom: 0,
                [isRTL ? "right" : "left"]: 0,
                width: `${pct}%`,
                background: "linear-gradient(90deg, #9a5268, #c9748a, #e8a0b0)",
                borderRadius: "100px",
                transition: "width 0.3s ease",
                boxShadow: "0 0 14px rgba(201,116,138,0.55)",
              }}>
                {/* Shimmer */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                  animation: "progressShimmer 1.2s linear infinite",
                }} />
              </div>
            </div>

            {/* Percentage */}
            <div className="flex justify-between mt-3" style={{
              color: "rgba(196,181,165,0.40)",
              fontSize: "0.58rem",
              fontFamily: "'Jost', sans-serif",
              letterSpacing: "0.18em",
            }}>
              <span>000</span>
              <span style={{
                color: "var(--rose-light, #e8a0b0)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}>
                {isRTL ? `%${pct}` : `${pct}%`}
              </span>
              <span>100</span>
            </div>

            {/* Ruler ticks */}
            <div className="flex justify-between mt-1 px-px">
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} style={{
                  width: "1px",
                  height: i % 5 === 0 ? "6px" : "3px",
                  background: `rgba(201,116,138,${i % 5 === 0 ? 0.38 : 0.14})`,
                }} />
              ))}
            </div>
          </div>

          {/* Floral SVG watermark — bottom ornament */}
          <div style={{ animation: "fadeUp 0.7s 0.55s ease both" }} className="flex flex-col items-center gap-3">
            {/* Mini floral */}
            <svg width="32" height="32" viewBox="0 0 32 32" style={{ opacity: 0.35 }}>
              <circle cx="16" cy="16" r="3" fill="rgba(201,116,138,0.9)" />
              {[0,60,120,180,240,300].map((deg, i) => (
                <ellipse key={i}
                  cx="16" cy="16" rx="2.5" ry="6.5"
                  fill="rgba(201,116,138,0.55)"
                  transform={`rotate(${deg} 16 16) translate(0 -9.5)`}
                  opacity="0.75"
                />
              ))}
            </svg>

            <div style={{
              fontFamily:"'Jost', sans-serif",
              color:"rgba(196,181,165,0.30)",
              fontSize:"0.52rem",
              letterSpacing:"0.26em",
              textTransform:"uppercase",
            }}>
              {isRTL ? "جاري التحميل" : "preparing experience"}
            </div>
          </div>

        </div>

        {/* ── CSS keyframe for cred pulse (used inline) ── */}
        <style dangerouslySetInnerHTML={{ __html:`
          @keyframes credPulse {
            0%,100%{ opacity:1; transform:scale(1);    }
            50%    { opacity:0.4; transform:scale(0.6); }
          }
          @keyframes fadeUp {
            from { opacity:0; transform:translateY(22px); }
            to   { opacity:1; transform:translateY(0);    }
          }
        `}} />
      </div>
    </>
  );
}