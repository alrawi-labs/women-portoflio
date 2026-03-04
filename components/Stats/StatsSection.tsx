// @ts-nocheck

"use client";

import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { statsData } from "@/data/stats";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const PARTICLE_CONFIG = Array.from({ length: 18 }, (_, i) => ({
  width:    2 + ((i * 0.18) % 4),
  height:   2 + ((i * 0.14) % 4),
  left:     (i * 5.55) % 100,
  top:      (i * 6.1)  % 100,
  opacity:  0.2 + ((i * 0.04) % 0.45),
  xOffset:  (i % 2 === 0 ? 1 : -1) * (35 + ((i * 5) % 40)),
  xOffset2: (i % 2 === 0 ? 1 : -1) * (55 + ((i * 6) % 40)),
  yOffset:  -(35 + ((i * 5) % 45)),
  duration: 2.4 + ((i * 0.12) % 1.6),
  delay:    (i * 0.07) % 1.1,
  isRose:   i % 3 !== 0,
}));

const romanLabels = ["I", "II", "III", "IV"];

function animateValue(setter: Dispatch<SetStateAction<number>>, end: number, duration = 2000) {
  const startTime = performance.now();
  const run = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    setter(Math.floor(ease * end));
    if (progress < 1) requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}

const Particles = ({ isHovered }: { isHovered: boolean }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {PARTICLE_CONFIG.map((p, i) => (
      <span key={i} className="absolute rounded-full" style={{
        width:      p.width,
        height:     p.height,
        left:       `${p.left}%`,
        top:        `${p.top}%`,
        background: p.isRose ? `rgba(201,116,138,${p.opacity})` : `rgba(201,169,110,${p.opacity})`,
        animation:  isHovered ? `particleBurst ${p.duration}s ease-out ${p.delay}s infinite` : "none",
        opacity:    isHovered ? undefined : 0,
      }} />
    ))}
  </div>
);

const AnimatedStatsBar: React.FC = () => {
  const t = useTranslations("home.stats");

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile,     setIsMobile]     = useState(false);
  const [isMounted,    setIsMounted]    = useState(false);
  const [isInView,     setIsInView]     = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false]);
  const [years,    setYears]    = useState(0);
  const [projects, setProjects] = useState(0);
  const [clients,  setClients]  = useState(0);
  const [awards,   setAwards]   = useState(0);

  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isInView) {
          setIsInView(true);
          if (!isMobile) {
            animateValue(setYears,    statsData.years,    2000);
            animateValue(setProjects, statsData.projects, 2500);
            animateValue(setClients,  statsData.clients,  2200);
            animateValue(setAwards,   statsData.awards,   2300);
          } else {
            setYears(statsData.years);
            setProjects(statsData.projects);
            setClients(statsData.clients);
            setAwards(statsData.awards);
          }
          [0, 1, 2, 3].forEach((i) => {
            setTimeout(() => {
              setVisibleCards((prev) => { const next = [...prev]; next[i] = true; return next; });
            }, i * 160);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [isInView, isMobile]);

  const stats: Stat[] = [
    { value: years,    suffix: "",       label: t("yearsLabel"),    description: t("yearsDesc")    },
    { value: projects, suffix: "+",      label: t("projectsLabel"), description: t("projectsDesc") },
    { value: clients,  suffix: t("k"),   label: t("clientsLabel"),  description: t("clientsDesc")  },
    { value: awards,   suffix: "",       label: t("awardsLabel"),   description: t("awardsDesc")   },
  ];

  return (
    <section
      id="stats"
      className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-8"
      style={{
        background: "var(--bg-secondary)", scrollMarginTop: "30px",
        borderTop: "1px solid rgba(201,116,138,0.12)", borderBottom: "1px solid rgba(201,116,138,0.12)",
      }}
    >
      <style>{`
        @keyframes rose-shift {
          0%, 100% { background-position: 0%   50%; }
          50%       { background-position: 100% 50%; }
        }
        @keyframes shimmer-rose {
          0%   { background-position: -1000px 0; }
          100% { background-position:  1000px 0; }
        }
        @keyframes petalFloat {
          0%   { transform: translateY(0px)   rotate(0deg);   opacity: 0;  }
          10%  { opacity: 0.55; }
          90%  { opacity: 0.3;  }
          100% { transform: translateY(-80px) rotate(180deg); opacity: 0;  }
        }
        @keyframes particleBurst {
          0%   { opacity: 0;   transform: scale(0);   }
          20%  { opacity: 1;                           }
          80%  { opacity: 0.4;                         }
          100% { opacity: 0;   transform: scale(1.5); }
        }
        @keyframes cardFadeLeft {
          from { opacity:0; transform:translateX(-80px) scale(0.93); filter:blur(8px); }
          to   { opacity:1; transform:translateX(0)     scale(1);    filter:blur(0);   }
        }
        @keyframes cardFadeRight {
          from { opacity:0; transform:translateX(80px)  scale(0.93); filter:blur(8px); }
          to   { opacity:1; transform:translateX(0)     scale(1);    filter:blur(0);   }
        }
        @keyframes headerFadeDown {
          from { opacity:0; transform:translateY(-24px); }
          to   { opacity:1; transform:translateY(0);     }
        }
        @keyframes ornamentScale {
          from { opacity:0; transform:scaleX(0); }
          to   { opacity:1; transform:scaleX(1); }
        }
        @keyframes footerFadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes pulseDot {
          0%,100% { transform:scale(1);   opacity:0.4; }
          50%     { transform:scale(1.4); opacity:1;   }
        }
        .rose-text {
          background: linear-gradient(260deg, #9a5268, #e8a0b0, #c9748a, #e8a0b0, #9a5268);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: rose-shift 4s ease infinite;
        }
        .stat-card-glow {
          box-shadow: 0 4px 24px rgba(201,116,138,0.06), 0 8px 48px rgba(201,116,138,0.04), inset 0 0 24px rgba(201,116,138,0.03);
        }
        .stat-card-glow:hover {
          box-shadow: 0 8px 36px rgba(201,116,138,0.18), 0 16px 64px rgba(201,116,138,0.10), inset 0 0 40px rgba(201,116,138,0.06);
        }
        .shimmer-rose-line {
          background: linear-gradient(90deg, transparent, rgba(201,116,138,0.5), transparent);
          background-size: 1000px 100%;
          animation: shimmer-rose 3s infinite;
        }
        .stat-petal {
          position: absolute;
          border-radius: 50% 0 50% 0;
          pointer-events: none;
          animation: petalFloat linear infinite;
        }
      `}</style>

      <div ref={statsRef} className="w-full max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 sm:mb-20" style={{
          animation: isInView && !isMobile ? "headerFadeDown 0.6s ease both" : "none",
          opacity: isMobile ? 1 : isInView ? undefined : 0,
        }}>
          <div className="inline-flex items-center gap-3 mb-6" style={{
            border: "1px solid rgba(201,116,138,0.28)", borderLeft: "2px solid var(--rose,#c9748a)",
            padding: "6px 18px", background: "rgba(201,116,138,0.06)",
          }}>
            <span style={{ display:"block", width:"5px", height:"5px", borderRadius:"50%", background:"var(--rose,#c9748a)", flexShrink:0 }} />
            <span style={{ color:"var(--rose-light,#e8a0b0)", fontSize:"0.62rem", letterSpacing:"0.25em", textTransform:"uppercase", fontFamily:"'Jost', sans-serif", fontWeight:500 }}>
              § 02 &nbsp;—&nbsp; {t("sectionLabel")}
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl xl:text-5xl mb-4" style={{
            fontFamily:"'Cormorant Garamond', Georgia, serif", fontWeight:600,
            background:"linear-gradient(145deg, #f7f0e0 0%, #e8a0b0 50%, #c9748a 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
          }}>
            {t("title")}
          </h2>

          <p style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", color:"var(--cream-dim,#c4b5a5)", fontSize:"1.08rem", maxWidth:"580px", margin:"0 auto", lineHeight:1.75, fontStyle:"italic" }}>
            {t("subtitle")}
          </p>

          <div className="flex items-center justify-center gap-3 mt-7" style={{
            animation: isInView && !isMobile ? "ornamentScale 0.9s 0.5s ease both" : "none",
            transformOrigin: "center",
            opacity: isMobile ? 1 : isInView ? undefined : 0,
          }}>
            <span style={{ display:"block", height:"1px", width:"52px", background:"linear-gradient(90deg, transparent, rgba(201,116,138,0.6))" }} />
            <span style={{ display:"block", width:"5px", height:"5px", background:"var(--rose,#c9748a)", transform:"rotate(45deg)", flexShrink:0 }} />
            <span style={{ display:"block", height:"1px", width:"52px", background:"linear-gradient(90deg, rgba(201,116,138,0.6), transparent)" }} />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((stat, index) => {
            const isHov = hoveredIndex === index;
            const dir   = index % 2 === 0 ? "cardFadeLeft" : "cardFadeRight";

            return (
              <div key={index} className="group relative"
                style={{
                  opacity:   isMobile ? 1 : visibleCards[index] ? 1 : 0,
                  animation: !isMobile && visibleCards[index] ? `${dir} 0.72s cubic-bezier(0.25,0.46,0.45,0.94) both` : "none",
                  transform: !isMobile && isHov ? "translateY(-6px)" : "translateY(0)",
                  transition:"transform 0.3s",
                }}
                onMouseEnter={() => { if (!isMobile) setHoveredIndex(index); }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {!isMobile && isMounted && (
                  <div className="absolute -inset-1 blur-xl pointer-events-none rounded-xl" style={{
                    background:"radial-gradient(ellipse, rgba(201,116,138,0.14), transparent 70%)",
                    borderRadius:"12px", opacity: isHov ? 1 : 0, transition:"opacity 0.5s",
                  }} />
                )}

                {isHov && isMounted && !isMobile && (
                  [0, 1, 2].map((p) => (
                    <div key={p} className="stat-petal" style={{
                      width:`${6+p*2}px`, height:`${8+p*2}px`, bottom:"10%", left:`${20+p*28}%`,
                      background: p%2===0 ? "rgba(201,116,138,0.35)" : "rgba(226,201,138,0.28)",
                      animationDuration:`${2.5+p*0.8}s`, animationDelay:`${p*0.3}s`,
                    }} />
                  ))
                )}

                <div className="relative overflow-hidden flex flex-col justify-between stat-card-glow transition-all duration-500 rounded-xl" style={{
                  background:"linear-gradient(145deg, var(--bg-hover,#50364e) 0%, var(--bg-secondary,#3e2a40) 100%)",
                  border:       isHov ? "1px solid rgba(201,116,138,0.5)"  : "1px solid rgba(201,116,138,0.12)",
                  borderRadius: "12px",
                  borderTop:    isHov ? "2px solid var(--rose,#c9748a)"    : "2px solid rgba(201,116,138,0.22)",
                  minHeight:"300px", padding:"36px 32px", transition:"border-color 0.4s",
                }}>
                  {isMounted && !isMobile && <Particles isHovered={isHov} />}

                  {isMounted && (
                    <div className="absolute inset-0 pointer-events-none" style={{
                      backgroundImage:"radial-gradient(circle at 1.5px 1.5px, rgba(201,116,138,0.07) 1px, transparent 0)",
                      backgroundSize:"36px 36px",
                      opacity:   !isMobile && isHov ? 1 : 0.6,
                      transform: !isMobile && isHov ? "scale(1.08)" : "scale(1)",
                      transition:"opacity 0.5s, transform 0.5s",
                    }} />
                  )}

                  <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none" style={{ borderTop:"1.5px solid var(--rose,#c9748a)", borderRight:"1.5px solid var(--rose,#c9748a)", opacity: isHov ? 1 : 0, transition:"opacity 0.4s" }} />
                  <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none" style={{ borderBottom:"1.5px solid var(--rose,#c9748a)", borderLeft:"1.5px solid var(--rose,#c9748a)", opacity: isHov ? 1 : 0, transition:"opacity 0.4s" }} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <span style={{ color:"rgba(201,116,138,0.55)", fontSize:"0.58rem", fontFamily:"'Cormorant Garamond', Georgia, serif", fontWeight:600, letterSpacing:"0.1em" }}>
                        {romanLabels[index]}
                      </span>
                      <span style={{ display:"block", height:"1px", width:"18px", background:"rgba(201,116,138,0.3)" }} />
                      <span style={{
                        color: isHov ? "var(--rose-light,#e8a0b0)" : "var(--slate,#9e8e9a)",
                        fontSize:"0.58rem", fontWeight:500, letterSpacing:"0.2em",
                        textTransform:"uppercase", fontFamily:"'Jost', sans-serif",
                        transform: !isMobile && isHov ? "translateX(4px)" : "translateX(0)",
                        transition:"color 0.3s, transform 0.3s",
                      }}>
                        {stat.label}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 mb-4">
                      <span
                        className={!isMobile && isHov ? "rose-text" : ""}
                        style={{
                          fontSize:"clamp(3rem, 6vw, 5rem)", fontWeight:600,
                          fontFamily:"'Cormorant Garamond', Georgia, serif",
                          color: (!isMobile && isHov) ? undefined : "var(--rose-light,#e8a0b0)",
                          lineHeight:1, display:"inline-block",
                          transform: !isMobile && isHov ? "scale(1.06)" : "scale(1)",
                          transition:"transform 0.3s",
                        }}
                      >
                        {stat.value}
                      </span>
                      {stat.suffix && (
                        <span style={{
                          fontSize:"clamp(1.8rem, 3.5vw, 3rem)", fontWeight:500,
                          fontFamily:"'Cormorant Garamond', Georgia, serif",
                          color: isHov ? "var(--gold-light,#e2c98a)" : "var(--rose-dim,#9a5268)",
                          display:"inline-block",
                          transform: !isMobile && isHov ? "scale(1.08) rotate(4deg)" : "scale(1) rotate(0deg)",
                          transition:"color 0.3s, transform 0.3s",
                        }}>
                          {stat.suffix}
                        </span>
                      )}
                    </div>

                    <p style={{
                      fontSize:"0.88rem", lineHeight:1.65,
                      fontFamily:"'Cormorant Garamond', Georgia, serif", fontStyle:"italic",
                      color: isHov ? "var(--cream-dim,#c4b5a5)" : "rgba(196,181,165,0.42)",
                      transform: !isMobile && isHov ? "translateX(4px)" : "translateX(0)",
                      transition:"color 0.3s, transform 0.3s",
                    }}>
                      {stat.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8">
                    {!isMobile && isMounted && (
                      <div className="h-px mb-3 overflow-hidden" style={{
                        background:"rgba(201,116,138,0.12)",
                        transform: isHov ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin:"left", transition:"transform 0.5s",
                      }}>
                        <div className="h-full shimmer-rose-line" />
                      </div>
                    )}

                    <div style={{ height:"2px", background:"rgba(201,116,138,0.08)", borderRadius:"1px", overflow:"hidden" }}>
                      <div style={{
                        height:"100%", borderRadius:"1px",
                        background:"linear-gradient(90deg, var(--rose-dim,#9a5268), var(--rose,#c9748a), var(--rose-light,#e8a0b0))",
                        width:      isInView ? `${20 + index * 20}%` : "0%",
                        transition: `width 1.2s ease-out ${0.4 + index * 0.15}s`,
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 sm:mt-20" style={{
          animation: isInView && !isMobile ? "footerFadeIn 0.6s 1s ease both" : "none",
          opacity: isMobile ? 1 : isInView ? undefined : 0,
        }}>
          <div className="inline-flex items-center gap-3">
            <span style={{ display:"block", width:"6px", height:"6px", borderRadius:"50%", background:"var(--rose-dim,#9a5268)", animation: isMounted && !isMobile ? "pulseDot 2.5s infinite" : "none" }} />
            <span style={{ color:"var(--slate,#9e8e9a)", fontSize:"0.65rem", letterSpacing:"0.22em", textTransform:"uppercase", fontFamily:"'Jost', sans-serif" }}>
              {t("trustedBy")}
            </span>
            <span style={{ display:"block", width:"6px", height:"6px", borderRadius:"50%", background:"var(--rose-dim,#9a5268)", animation: isMounted && !isMobile ? "pulseDot 2.5s 1.25s infinite" : "none" }} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AnimatedStatsBar;