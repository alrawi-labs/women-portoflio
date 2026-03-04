"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, Award } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Languages() {
  const [isVisible,    setIsVisible]    = useState(false);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("languages");
  const languages: any[] = t.raw("languages");
  const levels:    any   = t.raw("levels");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isVisible) {
        setIsVisible(true);
        languages.forEach((_:any, i:number) => {
          setTimeout(() => {
            setVisibleItems((prev) => { const next=[...prev]; next[i]=true; return next; });
          }, 300+i*160);
        });
      }
    }, { threshold:0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible, languages.length]);

  return (
    <section ref={sectionRef} id="languages"
      className="pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background:"var(--bg-primary)", scrollMarginTop:"140px" }}
    >
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:"absolute", width:"500px", height:"500px", top:"-80px", right:"-100px", borderRadius:"50%", filter:"blur(120px)", opacity:0.25, background:"radial-gradient(circle, rgba(201,116,138,0.22) 0%, transparent 70%)" }} />
        <div style={{ position:"absolute", width:"350px", height:"350px", bottom:"-60px", left:"-60px", borderRadius:"50%", filter:"blur(100px)", opacity:0.18, background:"radial-gradient(circle, rgba(226,201,138,0.20) 0%, transparent 70%)" }} />
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl mt-8">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <div className="flex justify-center mb-6">
            <span style={{
              display:"inline-flex", alignItems:"center", gap:"8px", padding:"6px 20px",
              background:"rgba(201,116,138,0.10)", border:"1px solid rgba(201,116,138,0.22)",
              borderRadius:"100px", color:"var(--rose-light,#e8a0b0)",
              fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.28em",
              textTransform:"uppercase", fontFamily:"'Jost', sans-serif",
            }}>
              <span style={{ display:"block", width:"4px", height:"4px", borderRadius:"50%", background:"currentColor" }} />
              § 07 — {t("sectionCategory")}
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-3">
            <div style={{
              width:"44px", height:"44px", borderRadius:"12px",
              border:"1px solid rgba(201,116,138,0.25)",
              background:"rgba(201,116,138,0.10)",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
            }}>
              <Globe size={19} style={{ color:"var(--rose-light,#e8a0b0)", strokeWidth:1.4 }} />
            </div>
            <h2 style={{
              fontFamily:"'Cormorant Garamond', serif",
              fontSize:"clamp(1.8rem, 5vw, 3rem)", fontWeight:400,
              background:"linear-gradient(145deg, #f7f0e0 0%, #e8a0b0 50%, #c9748a 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text", lineHeight:1.15,
            }}>{t("title")}</h2>
          </div>

          <p style={{
            fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontWeight:300,
            color:"rgba(196,181,165,0.70)", fontSize:"1.06rem",
            maxWidth:"500px", margin:"0 auto", lineHeight:1.82,
          }}>{t("subtitle")}</p>

          <div className="flex items-center justify-center gap-4 mt-7">
            <div style={{ height:"1px", width:"60px", background:"linear-gradient(90deg, transparent, rgba(201,116,138,0.40))" }} />
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1 Q8.2 3.8 11 4 Q8.2 5.2 7 8 Q5.8 5.2 3 4 Q5.8 3.8 7 1Z" fill="rgba(201,116,138,0.50)"/></svg>
            <div style={{ height:"1px", width:"60px", background:"linear-gradient(90deg, rgba(201,116,138,0.40), transparent)" }} />
          </div>
        </div>

        {/* Languages grid */}
        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
          {languages.map((lang:any, index:number) => {
            const levelKeys  = Object.keys(levels);
            const levelIndex = levelKeys.indexOf(lang.level);
            const fillCount  = levelIndex >= 0 ? levelIndex+1 : 3;

            return (
              <div key={index} className="group"
                style={{
                  transition:"opacity 0.9s ease, transform 0.9s ease",
                  transitionDelay:`${index*90}ms`,
                  opacity:   visibleItems[index]?1:0,
                  transform: visibleItems[index]?"translateY(0)":"translateY(20px)",
                }}>
                <div className="relative overflow-hidden h-full"
                  style={{
                    background:"rgba(255,255,255,0.04)",
                    border:"1px solid rgba(201,116,138,0.14)",
                    borderRadius:"24px",
                    padding:"40px 28px",
                    backdropFilter:"blur(10px)",
                    transition:"border-color 0.4s, box-shadow 0.4s, transform 0.35s",
                  }}
                  onMouseEnter={(e) => {
                    const el=e.currentTarget as HTMLElement;
                    el.style.borderColor="rgba(201,116,138,0.35)";
                    el.style.boxShadow="0 20px 60px rgba(201,116,138,0.12), 0 4px 20px rgba(0,0,0,0.15)";
                    el.style.transform="translateY(-6px)";
                  }}
                  onMouseLeave={(e) => {
                    const el=e.currentTarget as HTMLElement;
                    el.style.borderColor="rgba(201,116,138,0.14)";
                    el.style.boxShadow="none";
                    el.style.transform="translateY(0)";
                  }}>

                  {/* Flag bg */}
                  {lang.backward && (
                    <div className="absolute inset-0 transition-opacity duration-500 opacity-[0.04] group-hover:opacity-[0.07]"
                      style={{ backgroundImage:`url(${lang.backward})`, backgroundSize:"cover", backgroundPosition:"center", borderRadius:"24px" }} />
                  )}

                  {/* Subtle corner floral */}
                  <svg className="absolute bottom-4 right-4 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-400"
                    width="40" height="40" viewBox="0 0 40 40">
                    {[0,60,120,180,240,300].map((deg,i) => (
                      <ellipse key={i} cx="20" cy="20" rx="3" ry="9" fill="rgba(201,116,138,1)"
                        transform={`rotate(${deg} 20 20) translate(0,-11)`} />
                    ))}
                    <circle cx="20" cy="20" r="4" fill="rgba(201,116,138,1)" />
                  </svg>

                  <div className="relative z-10 flex flex-col items-center text-center gap-5">

                    {/* Flag */}
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-2xl"
                        style={{ background:"rgba(201,116,138,0.25)", transform:"scale(2)" }} />
                      <span className="relative block group-hover:scale-110 transition-transform duration-400"
                        style={{ fontSize:"3.8rem", lineHeight:1 }}>{lang.flag}</span>
                    </div>

                    {/* Name */}
                    <div>
                      <h3 className="mb-1 group-hover:text-[var(--rose-light,#e8a0b0)] transition-colors duration-300"
                        style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.4rem", fontWeight:500, color:"var(--cream,#f5ece0)" }}>
                        {lang.name}
                      </h3>
                      <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontWeight:300, color:"rgba(196,181,165,0.55)", fontSize:"0.9rem" }}>
                        {lang.nativeName}
                      </p>
                    </div>

                    {/* Animated rule — rose to gold */}
                    <div className="w-8 group-hover:w-16 transition-all duration-500"
                      style={{ height:"1px", background:"linear-gradient(90deg, transparent, rgba(201,116,138,0.60), rgba(201,169,110,0.30), transparent)" }} />

                    {/* Dots */}
                    <div className="flex items-center gap-2">
                      {Array.from({ length:5 }).map((_,di) => (
                        <div key={di} style={{
                          width:"7px", height:"7px", borderRadius:"50%",
                          background:   di<fillCount ? "var(--rose,#c9748a)" : "rgba(201,116,138,0.12)",
                          border:       `1px solid ${di<fillCount?"rgba(201,116,138,0.60)":"rgba(201,116,138,0.16)"}`,
                          transition:   `background 0.4s ${di*0.06}s`,
                        }} />
                      ))}
                    </div>

                    {/* Level badge */}
                    <div style={{
                      display:"inline-flex", alignItems:"center", gap:"7px",
                      padding:"7px 20px",
                      border:"1px solid rgba(201,116,138,0.22)",
                      borderRadius:"100px",
                      background:"rgba(201,116,138,0.08)",
                      transition:"background 0.3s, border-color 0.3s",
                    }}
                      className="group-hover:!border-[rgba(201,116,138,0.45)] group-hover:!bg-[rgba(201,116,138,0.15)]"
                    >
                      <Award size={12} style={{ color:"var(--rose-light,#e8a0b0)", strokeWidth:1.4 }} />
                      <span style={{ color:"var(--rose-light,#e8a0b0)", fontSize:"0.65rem", fontWeight:400, letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"'Jost', sans-serif" }}>
                        {levels[lang.level]}
                      </span>
                    </div>

                    {/* Index */}
                    <span style={{
                      position:"absolute", top:"-2px", right:"0",
                      fontFamily:"'Cormorant Garamond', serif",
                      fontSize:"0.65rem", fontWeight:300,
                      color:"rgba(201,116,138,0.16)",
                    }}>{String(index+1).padStart(2,"0")}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}