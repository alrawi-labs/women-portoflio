"use client";

import { useState, useEffect, useRef } from "react";
import { Code2, Layers, Brain, Database } from "lucide-react";
import { useTranslations } from "next-intl";

const ROMAN = ["I","II","III","IV"];

export default function Skills() {
  const [isVisible,      setIsVisible]      = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("skills");

  const skillsData = [
    { icon:Code2,    title:t("categories.programmingLanguages"), skills:t.raw("skills.programmingLanguages") },
    { icon:Layers,   title:t("categories.frameworks"),           skills:t.raw("skills.frameworks")           },
    { icon:Brain,    title:t("categories.concepts"),             skills:t.raw("skills.concepts")             },
    { icon:Database, title:t("categories.databases"),            skills:t.raw("skills.databases")            },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if(entries[0].isIntersecting) setIsVisible(true); },
      { threshold:0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const current = skillsData[activeCategory];
  const Icon    = current.icon;

  const tabStyle = (active: boolean): React.CSSProperties => ({
    display:"inline-flex", alignItems:"center", gap:"8px",
    padding:"9px 22px", borderRadius:"100px",
    fontWeight:400, fontSize:"0.67rem",
    letterSpacing:"0.18em", textTransform:"uppercase",
    fontFamily:"'Jost', sans-serif", cursor:"pointer",
    transition:"all 0.35s",
    border:     active ? "1px solid rgba(201,116,138,0.45)" : "1px solid rgba(201,116,138,0.16)",
    background: active ? "rgba(201,116,138,0.16)" : "transparent",
    color:      active ? "var(--rose-light,#e8a0b0)" : "rgba(196,181,165,0.60)",
    boxShadow:  active ? "0 0 20px rgba(201,116,138,0.12)" : "none",
    transform:  active ? "scale(1.03)" : "scale(1)",
  });

  return (
    <>
      <style>{`
        @keyframes skillFadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
      <section ref={sectionRef} id="skills"
        className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24"
        style={{ background:"var(--bg-secondary)", scrollMarginTop:"35px" }}
      >
        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{ position:"absolute", width:"500px", height:"500px", top:"-80px", right:"-100px", borderRadius:"50%", filter:"blur(120px)", opacity:0.28, background:"radial-gradient(circle, rgba(201,116,138,0.25) 0%, transparent 70%)" }} />
          <div style={{ position:"absolute", width:"400px", height:"400px", bottom:"-80px", left:"-80px", borderRadius:"50%", filter:"blur:120px", opacity:0.18, background:"radial-gradient(circle, rgba(226,201,138,0.22) 0%, transparent 70%)" }} />
          {/* Floral watermark */}
          <svg className="absolute left-6 bottom-16 opacity-[0.04]" width="160" height="160" viewBox="0 0 160 160">
            {[0,45,90,135,180,225,270,315].map((deg,i) => (
              <ellipse key={i} cx="80" cy="80" rx="12" ry="36" fill="rgba(201,116,138,1)"
                transform={`rotate(${deg} 80 80) translate(0,-42)`} />
            ))}
            <circle cx="80" cy="80" r="12" fill="rgba(201,116,138,1)" />
          </svg>
        </div>

        <div className="container mx-auto relative z-10 max-w-6xl">

          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
            <div className="flex justify-center mb-6">
              <span style={{
                display:"inline-flex", alignItems:"center", gap:"8px", padding:"6px 20px",
                background:"rgba(201,116,138,0.10)", border:"1px solid rgba(201,116,138,0.22)",
                borderRadius:"100px", color:"var(--rose-light,#e8a0b0)",
                fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.28em",
                textTransform:"uppercase", fontFamily:"'Jost', sans-serif",
              }}>
                <span style={{ display:"block", width:"4px", height:"4px", borderRadius:"50%", background:"currentColor" }} />
                § 06 — {t("sectionCategory")}
              </span>
            </div>

            <h2 style={{
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              fontSize:"clamp(1.8rem, 5vw, 3rem)", fontWeight:400,
              background:"linear-gradient(145deg, #f7f0e0 0%, #e8a0b0 50%, #c9748a 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text", marginBottom:"12px", lineHeight:1.2,
            }}>{t("title")}</h2>

            <p style={{
              fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontWeight:300,
              color:"rgba(196,181,165,0.70)", fontSize:"1.06rem",
              maxWidth:"540px", margin:"0 auto", lineHeight:1.82,
            }}>{t("subtitle")}</p>

            <div className="flex items-center justify-center gap-4 mt-7">
              <div style={{ height:"1px", width:"60px", background:"linear-gradient(90deg, transparent, rgba(201,116,138,0.40))" }} />
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1 Q8.2 3.8 11 4 Q8.2 5.2 7 8 Q5.8 5.2 3 4 Q5.8 3.8 7 1Z" fill="rgba(201,116,138,0.50)"/></svg>
              <div style={{ height:"1px", width:"60px", background:"linear-gradient(90deg, rgba(201,116,138,0.40), transparent)" }} />
            </div>
          </div>

          {/* Tabs */}
          <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 transition-all duration-1000 delay-200 ${isVisible?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
            {skillsData.map((cat,i) => {
              const CatIcon=cat.icon; const active=activeCategory===i;
              return (
                <button key={i} onClick={() => setActiveCategory(i)} style={tabStyle(active)}
                  onMouseEnter={(e) => { if(!active){ const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(201,116,138,0.30)"; el.style.color="var(--rose-light,#e8a0b0)"; }}}
                  onMouseLeave={(e) => { if(!active){ const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(201,116,138,0.16)"; el.style.color="rgba(196,181,165,0.60)"; }}}
                >
                  <CatIcon size={13} />
                  <span className="hidden sm:inline">{cat.title}</span>
                  <span className="sm:hidden" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"0.78rem" }}>{ROMAN[i]}</span>
                </button>
              );
            })}
          </div>

          {/* Display */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>

            {/* Category bar */}
            <div className="flex items-center gap-4 mb-8 p-5" style={{
              background:"rgba(255,255,255,0.03)",
              border:"1px solid rgba(201,116,138,0.14)",
              borderLeft:"3px solid rgba(201,116,138,0.45)",
              borderRadius:"16px",
              backdropFilter:"blur(8px)",
            }}>
              <div style={{
                width:"50px", height:"50px", borderRadius:"14px",
                border:"1px solid rgba(201,116,138,0.25)",
                background:"rgba(201,116,138,0.10)",
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
              }}>
                <Icon size={21} style={{ color:"var(--rose-light,#e8a0b0)", strokeWidth:1.4 }} />
              </div>
              <div>
                <span style={{
                  display:"block", color:"rgba(201,116,138,0.50)",
                  fontSize:"0.54rem", letterSpacing:"0.25em",
                  textTransform:"uppercase", fontFamily:"'Jost', sans-serif", marginBottom:"3px",
                }}>{t("categoryPrefix")} {ROMAN[activeCategory]}</span>
                <h3 style={{
                  fontFamily:"'Cormorant Garamond', serif",
                  fontSize:"1.3rem", fontWeight:500, color:"var(--cream,#f5ece0)", lineHeight:1.2,
                }}>{current.title}</h3>
              </div>
              <div className="ml-auto" style={{
                padding:"4px 16px",
                border:"1px solid rgba(201,116,138,0.20)",
                borderRadius:"100px",
                background:"rgba(201,116,138,0.06)",
              }}>
                <span style={{ color:"var(--rose-light,#e8a0b0)", fontFamily:"'Cormorant Garamond', serif", fontSize:"1.1rem", fontWeight:400 }}>
                  {current.skills.length}
                </span>
                <span style={{ color:"rgba(201,116,138,0.45)", fontSize:"0.56rem", letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"'Jost', sans-serif", marginLeft:"6px" }}>
                  {t("skillsCount")}
                </span>
              </div>
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {current.skills.map((skill:any, index:number) => (
                <div key={skill.name} className="group relative overflow-hidden"
                  style={{
                    background:"rgba(255,255,255,0.03)",
                    border:"1px solid rgba(201,116,138,0.10)",
                    borderLeft:"2px solid rgba(201,116,138,0.20)",
                    borderRadius:"14px",
                    padding:"16px 20px",
                    animation: isVisible ? `skillFadeUp 0.5s ease-out ${index*0.06}s both` : "none",
                    cursor:"default",
                    transition:"border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                    backdropFilter:"blur(4px)",
                  }}
                  onMouseEnter={(e) => {
                    const el=e.currentTarget as HTMLElement;
                    el.style.borderColor="rgba(201,116,138,0.30)";
                    el.style.borderLeftColor="var(--rose,#c9748a)";
                    el.style.boxShadow="0 8px 28px rgba(201,116,138,0.10)";
                    el.style.transform="translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el=e.currentTarget as HTMLElement;
                    el.style.borderColor="rgba(201,116,138,0.10)";
                    el.style.borderLeftColor="rgba(201,116,138,0.20)";
                    el.style.boxShadow="none";
                    el.style.transform="translateY(0)";
                  }}>

                  {/* Hover tint */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ borderRadius:"14px", background:"linear-gradient(135deg, rgba(201,116,138,0.05), transparent)" }} />

                  <div className="relative z-10 flex items-center gap-3">
                    <div className="shrink-0 group-hover:scale-125 transition-transform duration-300"
                      style={{
                        width:"6px", height:"6px", borderRadius:"50%",
                        background:"rgba(201,116,138,0.45)",
                        boxShadow:"0 0 6px rgba(201,116,138,0.30)",
                      }} />
                    <span className="group-hover:text-[var(--cream,#f5ece0)] transition-colors duration-300"
                      style={{ fontFamily:"'Jost', sans-serif", fontSize:"0.88rem", fontWeight:300, color:"rgba(196,181,165,0.75)" }}>
                      {skill.name}
                    </span>
                    <span className="ml-auto" style={{
                      fontFamily:"'Cormorant Garamond', serif", fontSize:"0.7rem",
                      color:"rgba(201,116,138,0.16)", fontWeight:400,
                    }}>
                      {String(index+1).padStart(2,"0")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}