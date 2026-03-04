"use client";

import { useState, useEffect, useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

interface ResumeItem { year: string; title: string; company: string; }
const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];

export default function ExperienceEducation() {
  const t = useTranslations("resume");
  const [isVisible,    setIsVisible]    = useState(false);
  const [activeTab,    setActiveTab]    = useState<"experience"|"education">("experience");
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const experiences: ResumeItem[] = t.raw("experience");
  const education:   ResumeItem[] = t.raw("education");
  const currentData = activeTab === "experience" ? experiences : education;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isVisible) {
        setIsVisible(true);
        currentData.forEach((_,i) => {
          setTimeout(() => {
            setVisibleItems((prev) => { const next=[...prev]; next[i]=true; return next; });
          }, 500 + i*180);
        });
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible, currentData.length]);

  useEffect(() => {
    setVisibleItems([]);
    currentData.forEach((_,i) => {
      setTimeout(() => {
        setVisibleItems((prev) => { const next=[...prev]; next[i]=true; return next; });
      }, i*160);
    });
  }, [activeTab]);

  const tabStyle = (active: boolean): React.CSSProperties => ({
    display:"inline-flex", alignItems:"center", gap:"8px",
    padding:"10px 28px", borderRadius:"100px",
    fontWeight:400, fontSize:"0.68rem",
    letterSpacing:"0.18em", textTransform:"uppercase",
    fontFamily:"'Jost', sans-serif", cursor:"pointer",
    transition:"all 0.35s",
    border: active ? "1px solid rgba(201,116,138,0.45)" : "1px solid rgba(201,116,138,0.18)",
    background: active ? "rgba(201,116,138,0.18)" : "transparent",
    color:    active ? "var(--rose-light,#e8a0b0)" : "rgba(196,181,165,0.65)",
    boxShadow: active ? "0 0 24px rgba(201,116,138,0.15)" : "none",
  });

  return (
    <>
      <style>{`
        @keyframes ping { 75%,100% { transform:scale(1.8); opacity:0; } }
      `}</style>
      <section ref={sectionRef} id="resume"
        className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24"
        style={{ background:"var(--bg-primary)", scrollMarginTop:"35px" }}
      >
        {/* Soft blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{ position:"absolute", width:"500px", height:"500px", top:"-100px", left:"-100px", borderRadius:"50%", filter:"blur(120px)", opacity:0.3, background:"radial-gradient(circle, rgba(201,116,138,0.22) 0%, transparent 70%)" }} />
          <div style={{ position:"absolute", width:"400px", height:"400px", bottom:"-80px", right:"-80px", borderRadius:"50%", filter:"blur(120px)", opacity:0.2, background:"radial-gradient(circle, rgba(226,201,138,0.20) 0%, transparent 70%)" }} />
        </div>

        <div className="container mx-auto relative z-10 max-w-5xl">

          {/* Header */}
          <div className={`text-center mb-14 transition-all duration-1000 ${isVisible?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
            <div className="flex justify-center mb-6">
              <span style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                padding:"6px 20px",
                background:"rgba(201,116,138,0.10)",
                border:"1px solid rgba(201,116,138,0.22)",
                borderRadius:"100px",
                color:"var(--rose-light,#e8a0b0)",
                fontSize:"0.6rem", fontWeight:500,
                letterSpacing:"0.28em", textTransform:"uppercase",
                fontFamily:"'Jost', sans-serif",
              }}>
                <span style={{ display:"block", width:"4px", height:"4px", borderRadius:"50%", background:"currentColor" }} />
                § 05 — {t("sectionCategory")}
              </span>
            </div>

            <h2 style={{
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              fontSize:"clamp(1.8rem, 5vw, 3rem)", fontWeight:400,
              background:"linear-gradient(145deg, #f7f0e0 0%, #e8a0b0 50%, #c9748a 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text", marginBottom:"14px", lineHeight:1.2,
            }}>{t("title")}</h2>

            <p style={{
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              fontStyle:"italic", fontWeight:300,
              color:"rgba(196,181,165,0.70)", fontSize:"1.08rem",
              maxWidth:"520px", margin:"0 auto", lineHeight:1.82,
            }}>{t("subtitle")}</p>

            <div className="flex items-center justify-center gap-4 mt-7">
              <div style={{ height:"1px", width:"60px", background:"linear-gradient(90deg, transparent, rgba(201,116,138,0.40))" }} />
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1 Q8.2 3.8 11 4 Q8.2 5.2 7 8 Q5.8 5.2 3 4 Q5.8 3.8 7 1Z" fill="rgba(201,116,138,0.50)"/></svg>
              <div style={{ height:"1px", width:"60px", background:"linear-gradient(90deg, rgba(201,116,138,0.40), transparent)" }} />
            </div>
          </div>

          {/* Tab buttons */}
          <div className={`flex justify-center gap-3 mb-14 transition-all duration-1000 delay-200 ${isVisible?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
            {[
              { key:"experience" as const, icon:Briefcase, label:t("tabs.experience") },
              { key:"education"  as const, icon:GraduationCap, label:t("tabs.education") },
            ].map(({ key, icon:Ic, label }) => (
              <button key={key} onClick={() => setActiveTab(key)} style={tabStyle(activeTab===key)}
                onMouseEnter={(e) => { if(activeTab!==key){ const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(201,116,138,0.35)"; el.style.color="var(--rose-light,#e8a0b0)"; }}}
                onMouseLeave={(e) => { if(activeTab!==key){ const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(201,116,138,0.18)"; el.style.color="rgba(196,181,165,0.65)"; }}}
              >
                <Ic size={14} />{label}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Centre line */}
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px hidden lg:block"
              style={{ background:"linear-gradient(to bottom, transparent 0%, rgba(201,116,138,0.22) 15%, rgba(201,116,138,0.22) 85%, transparent 100%)" }} />

            <div className="space-y-8">
              {currentData.map((item:any, index:number) => (
                <div key={index} className="relative"
                  style={{
                    transition:"opacity 0.8s ease, transform 0.8s ease",
                    transitionDelay:`${index*80}ms`,
                    opacity:   visibleItems[index]?1:0,
                    transform: visibleItems[index]?"translateY(0)":"translateY(24px)",
                  }}>
                  <div className={`flex flex-col lg:flex-row gap-8 items-start lg:items-center ${index%2===0?"lg:flex-row":"lg:flex-row-reverse"}`}>

                    {/* Card */}
                    <div className="flex-1 lg:w-[calc(50%-2rem)]">
                      <div className="group relative overflow-hidden"
                        style={{
                          background:"rgba(255,255,255,0.04)",
                          border:"1px solid rgba(201,116,138,0.14)",
                          borderTop:"2px solid rgba(201,116,138,0.25)",
                          borderRadius:"20px",
                          padding:"28px 28px 24px",
                          backdropFilter:"blur(8px)",
                          transition:"border-color 0.4s, box-shadow 0.4s, transform 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          const el=e.currentTarget as HTMLElement;
                          el.style.borderColor="rgba(201,116,138,0.40)";
                          el.style.borderTopColor="var(--rose,#c9748a)";
                          el.style.boxShadow="0 16px 48px rgba(201,116,138,0.10), 0 4px 20px rgba(0,0,0,0.15)";
                          el.style.transform="translateY(-4px)";
                        }}
                        onMouseLeave={(e) => {
                          const el=e.currentTarget as HTMLElement;
                          el.style.borderColor="rgba(201,116,138,0.14)";
                          el.style.borderTopColor="rgba(201,116,138,0.25)";
                          el.style.boxShadow="none";
                          el.style.transform="translateY(0)";
                        }}>
                        {/* Tiny floral top-right */}
                        <svg className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-400"
                          width="20" height="20" viewBox="0 0 20 20">
                          {[0,72,144,216,288].map((deg,i) => (
                            <ellipse key={i} cx="10" cy="10" rx="1.5" ry="4"
                              fill="rgba(201,116,138,1)"
                              transform={`rotate(${deg} 10 10) translate(0,-5.5)`} />
                          ))}
                          <circle cx="10" cy="10" r="2" fill="rgba(201,116,138,1)" />
                        </svg>

                        <div className={`relative z-10 ${index%2===0?"lg:text-right":"lg:text-left"}`}>
                          {/* Year pill */}
                          <div className={`flex items-center gap-3 mb-4 ${index%2===0?"lg:flex-row-reverse lg:justify-start":""}`}>
                            <span style={{
                              display:"inline-block", padding:"3px 14px",
                              border:"1px solid rgba(201,116,138,0.28)",
                              borderRadius:"100px",
                              background:"rgba(201,116,138,0.08)",
                              color:"var(--rose-light,#e8a0b0)",
                              fontSize:"0.62rem", fontWeight:400,
                              letterSpacing:"0.14em",
                              fontFamily:"'Jost', sans-serif",
                            }}>{item.year}</span>
                            <span style={{
                              fontFamily:"'Cormorant Garamond', serif",
                              fontSize:"0.9rem", fontWeight:300,
                              color:"rgba(201,116,138,0.22)", lineHeight:1,
                            }}>{ROMAN[index]}</span>
                          </div>

                          <div className={`mb-4 h-px ${index%2===0?"lg:ml-auto":""}`}
                            style={{ width:"100%", background:`linear-gradient(${index%2===0?"270deg":"90deg"}, rgba(201,116,138,0.22), transparent)` }} />

                          <h3 className="mb-2 group-hover:text-[var(--rose-light,#e8a0b0)] transition-colors duration-300"
                            style={{
                              fontFamily:"'Cormorant Garamond', Georgia, serif",
                              fontSize:"1.2rem", fontWeight:500,
                              color:"var(--cream,#f5ece0)", lineHeight:1.3,
                            }}>{item.title}</h3>

                          <p style={{
                            fontFamily:"'Cormorant Garamond', serif",
                            fontStyle:"italic", fontWeight:300,
                            color:"rgba(196,181,165,0.60)", fontSize:"0.92rem", lineHeight:1.65,
                          }}>{item.company}</p>

                          <div className={`mt-5 h-px w-0 group-hover:w-3/4 transition-all duration-700 ${index%2===0?"ml-auto":""}`}
                            style={{ background:"linear-gradient(90deg, rgba(201,116,138,0.50), rgba(201,169,110,0.25), transparent)" }} />
                        </div>
                      </div>
                    </div>

                    {/* Centre dot */}
                    <div className="hidden lg:flex items-center justify-center w-16 shrink-0">
                      <div style={{
                        position:"relative", width:"12px", height:"12px",
                        borderRadius:"50%",
                        background:"var(--rose,#c9748a)",
                        border:"3px solid var(--bg-primary,#2d1f2e)",
                        boxShadow:"0 0 12px rgba(201,116,138,0.50)",
                        transition:"transform 0.5s, opacity 0.5s",
                        transform:  visibleItems[index]?"scale(1)":"scale(0)",
                        opacity:    visibleItems[index]?1:0,
                      }}>
                        <div style={{
                          position:"absolute", inset:"-6px",
                          border:"1px solid rgba(201,116,138,0.30)",
                          borderRadius:"50%",
                          animation:"ping 2s cubic-bezier(0,0,0.2,1) infinite",
                        }} />
                      </div>
                    </div>

                    <div className="hidden lg:block flex-1 lg:w-[calc(50%-2rem)]" />
                  </div>
                </div>
              ))}
            </div>

            {/* End mark */}
            <div className="hidden lg:flex justify-center mt-8">
              <span style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                padding:"4px 18px",
                border:"1px solid rgba(201,116,138,0.18)",
                borderRadius:"100px",
                background:"rgba(201,116,138,0.05)",
                color:"rgba(201,116,138,0.45)",
                fontSize:"0.56rem", letterSpacing:"0.22em",
                textTransform:"uppercase", fontFamily:"'Jost', sans-serif",
              }}>
                {currentData.length} {activeTab==="experience"?t("positionsCount"):t("degreesCount")}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}