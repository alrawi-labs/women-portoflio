"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, MapPin, Calendar, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Volunteering() {
  const [isVisible,    setIsVisible]    = useState(false);
  const [activeIndex,  setActiveIndex]  = useState(0);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("volunteering");
  const volunteering: any[] = t.raw("volunteering");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isVisible) {
        setIsVisible(true);
        volunteering.forEach((_:any, i:number) => {
          setTimeout(() => {
            setVisibleCards((prev) => { const next=[...prev]; next[i]=true; return next; });
          }, 200+i*150);
        });
      }
    }, { threshold:0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible, volunteering.length]);

  return (
    <section ref={sectionRef} id="volunteering"
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24"
      style={{ background:"var(--bg-primary)", scrollMarginTop:"140px" }}
    >
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:"absolute", width:"550px", height:"550px", top:"-120px", left:"-120px", borderRadius:"50%", filter:"blur(130px)", opacity:0.25, background:"radial-gradient(circle, rgba(201,116,138,0.22) 0%, transparent 70%)" }} />
        <div style={{ position:"absolute", width:"400px", height:"400px", bottom:"-80px", right:"-80px", borderRadius:"50%", filter:"blur:110px", opacity:0.18, background:"radial-gradient(circle, rgba(226,201,138,0.18) 0%, transparent 70%)" }} />
        {/* Floral watermark */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025]" width="260" height="260" viewBox="0 0 260 260">
          {[0,45,90,135,180,225,270,315].map((deg,i) => (
            <ellipse key={i} cx="130" cy="130" rx="18" ry="55" fill="rgba(201,116,138,1)"
              transform={`rotate(${deg} 130 130) translate(0,-68)`} />
          ))}
          <circle cx="130" cy="130" r="18" fill="rgba(201,116,138,1)" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">

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
              § 08 — {t("sectionCategory")}
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-3">
            <div style={{ width:"44px", height:"44px", borderRadius:"12px", border:"1px solid rgba(201,116,138,0.25)", background:"rgba(201,116,138,0.10)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Heart size={19} style={{ color:"var(--rose-light,#e8a0b0)", strokeWidth:1.4 }} />
            </div>
            <h2 style={{
              fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(1.8rem, 5vw, 3rem)", fontWeight:400,
              background:"linear-gradient(145deg, #f7f0e0 0%, #e8a0b0 50%, #c9748a 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", lineHeight:1.15,
            }}>{t("title")}</h2>
          </div>

          <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontWeight:300, color:"rgba(196,181,165,0.70)", fontSize:"1.06rem", maxWidth:"500px", margin:"0 auto", lineHeight:1.82 }}>{t("subtitle")}</p>

          <div className="flex items-center justify-center gap-4 mt-7">
            <div style={{ height:"1px", width:"60px", background:"linear-gradient(90deg, transparent, rgba(201,116,138,0.40))" }} />
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1 Q8.2 3.8 11 4 Q8.2 5.2 7 8 Q5.8 5.2 3 4 Q5.8 3.8 7 1Z" fill="rgba(201,116,138,0.50)"/></svg>
            <div style={{ height:"1px", width:"60px", background:"linear-gradient(90deg, rgba(201,116,138,0.40), transparent)" }} />
          </div>
        </div>

        {/* Active card */}
        {volunteering.map((item:any, index:number) => (
          <div key={index} style={{
            display:activeIndex===index?"block":"none",
            opacity:visibleCards[index]?1:0,
            transform:visibleCards[index]?"translateY(0)":"translateY(20px)",
            transition:"opacity 0.6s ease, transform 0.6s ease",
          }}>
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">

              {/* Image */}
              <div className="lg:col-span-5">
                <div className="group relative overflow-hidden"
                  style={{ borderRadius:"24px", border:"1px solid rgba(201,116,138,0.18)", aspectRatio:"4/3" }}>
                  <img src={item.image} alt={item.role}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ filter:"saturate(0.88)" }} />
                  <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(45,31,46,0.85) 0%, rgba(45,31,46,0.20) 55%, transparent 100%)" }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background:"linear-gradient(135deg, rgba(201,116,138,0.10) 0%, transparent 55%)" }} />

                  {/* Role badge */}
                  <div className="absolute bottom-4 left-4 right-4 px-5 py-3"
                    style={{ background:"rgba(45,31,46,0.88)", border:"1px solid rgba(201,116,138,0.22)", borderLeft:"3px solid rgba(201,116,138,0.60)", backdropFilter:"blur(10px)", borderRadius:"14px" }}>
                    <p style={{ fontFamily:"'Cormorant Garamond', serif", color:"var(--rose-light,#e8a0b0)", fontSize:"0.95rem", fontWeight:500, marginBottom:"2px" }}>{item.role}</p>
                    <p style={{ fontFamily:"'Jost', sans-serif", color:"rgba(196,181,165,0.70)", fontSize:"0.7rem", letterSpacing:"0.05em" }}>{item.organization}</p>
                  </div>

                  {/* Index stamp */}
                  <div className="absolute top-3 right-3"
                    style={{ padding:"3px 12px", background:"rgba(45,31,46,0.85)", border:"1px solid rgba(201,116,138,0.22)", borderRadius:"100px", backdropFilter:"blur(6px)" }}>
                    <span style={{ fontFamily:"'Jost', sans-serif", color:"rgba(201,116,138,0.55)", fontSize:"0.60rem", fontWeight:400, letterSpacing:"0.1em" }}>
                      {String(index+1).padStart(2,"0")} / {String(volunteering.length).padStart(2,"0")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-7 space-y-6">

                {/* Meta */}
                <div className="flex flex-wrap gap-3">
                  <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"5px 16px", border:"1px solid rgba(201,116,138,0.25)", borderRadius:"100px", background:"rgba(201,116,138,0.08)" }}>
                    <Calendar size={11} style={{ color:"var(--rose-light,#e8a0b0)" }} />
                    <span style={{ color:"var(--rose-light,#e8a0b0)", fontSize:"0.62rem", fontWeight:400, letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"'Jost', sans-serif" }}>{item.date}</span>
                  </div>
                  {item.location && (
                    <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"5px 16px", border:"1px solid rgba(201,116,138,0.12)", borderRadius:"100px" }}>
                      <MapPin size={11} style={{ color:"rgba(196,181,165,0.55)" }} />
                      <span style={{ color:"rgba(196,181,165,0.55)", fontSize:"0.62rem", letterSpacing:"0.10em", fontFamily:"'Jost', sans-serif" }}>{item.location}</span>
                    </div>
                  )}
                </div>

                {/* Role */}
                <div className="space-y-3">
                  <h3 style={{
                    fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight:400, lineHeight:1.2,
                    background:"linear-gradient(145deg, #f7f0e0 0%, #e8a0b0 50%, #c9748a 100%)",
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                  }}>{item.role}</h3>

                  <div className="flex items-center gap-3">
                    <div style={{ height:"1.5px", width:"44px", background:"rgba(201,116,138,0.55)" }} />
                    <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 0.5 Q6 2.5 8 3 Q6 3.8 5 6 Q4 3.8 2 3 Q4 2.5 5 0.5Z" fill="rgba(201,169,110,0.60)"/></svg>
                    <div style={{ height:"1px", flex:1, maxWidth:"70px", background:"linear-gradient(90deg, rgba(201,116,138,0.40), transparent)" }} />
                  </div>

                  <p style={{ fontFamily:"'Cormorant Garamond', serif", fontWeight:500, color:"var(--cream,#f5ece0)", fontSize:"1.1rem" }}>{item.organization}</p>
                  {item.event && (
                    <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontWeight:300, color:"rgba(196,181,165,0.65)", fontSize:"0.94rem" }}>{item.event}</p>
                  )}
                </div>

                {/* Description */}
                <div style={{
                  padding:"24px 28px",
                  background:"rgba(255,255,255,0.03)",
                  border:"1px solid rgba(201,116,138,0.12)",
                  borderLeft:"3px solid rgba(201,116,138,0.40)",
                  borderRadius:"16px",
                  backdropFilter:"blur(8px)",
                  position:"relative", overflow:"hidden",
                }}>
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background:"radial-gradient(ellipse 60% 50% at 0% 0%, rgba(201,116,138,0.06), transparent)",
                  }} />
                  <span style={{ fontFamily:"'Cormorant Garamond', serif", color:"rgba(201,116,138,0.20)", fontSize:"3.5rem", lineHeight:0.8, display:"block", marginBottom:"8px" }}>"</span>
                  <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontWeight:300, color:"rgba(196,181,165,0.75)", fontSize:"1.02rem", lineHeight:1.85 }}>
                    {item.description}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveIndex((prev) => Math.max(0,prev-1))}
                    disabled={activeIndex===0}
                    className="flex items-center gap-2"
                    style={{
                      padding:"8px 20px", border:"1px solid rgba(201,116,138,0.20)", borderRadius:"100px",
                      background:"transparent", color:activeIndex===0?"rgba(201,116,138,0.20)":"rgba(196,181,165,0.65)",
                      fontSize:"0.62rem", fontWeight:400, letterSpacing:"0.18em", textTransform:"uppercase",
                      fontFamily:"'Jost', sans-serif", cursor:activeIndex===0?"not-allowed":"pointer",
                      transition:"all 0.3s",
                    }}
                    onMouseEnter={(e) => { if(activeIndex!==0){ (e.currentTarget as HTMLElement).style.color="var(--rose-light,#e8a0b0)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(201,116,138,0.40)"; }}}
                    onMouseLeave={(e) => { if(activeIndex!==0){ (e.currentTarget as HTMLElement).style.color="rgba(196,181,165,0.65)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(201,116,138,0.20)"; }}}
                  >
                    <ChevronRight size={11} style={{ transform:"rotate(180deg)" }} />{t("prevButton")}
                  </button>

                  <div className="flex gap-2 flex-1 justify-center">
                    {volunteering.map((_:any,di:number) => (
                      <button key={di} onClick={() => setActiveIndex(di)} style={{
                        width:di===activeIndex?"22px":"7px", height:"7px", borderRadius:"100px",
                        background:di===activeIndex?"var(--rose,#c9748a)":"rgba(201,116,138,0.20)",
                        border:`1px solid ${di===activeIndex?"rgba(201,116,138,0.70)":"rgba(201,116,138,0.22)"}`,
                        transition:"all 0.4s ease", cursor:"pointer",
                      }} />
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveIndex((prev) => Math.min(volunteering.length-1,prev+1))}
                    disabled={activeIndex===volunteering.length-1}
                    className="flex items-center gap-2"
                    style={{
                      padding:"8px 20px", border:"1px solid rgba(201,116,138,0.20)", borderRadius:"100px",
                      background:"transparent", color:activeIndex===volunteering.length-1?"rgba(201,116,138,0.20)":"rgba(196,181,165,0.65)",
                      fontSize:"0.62rem", fontWeight:400, letterSpacing:"0.18em", textTransform:"uppercase",
                      fontFamily:"'Jost', sans-serif", cursor:activeIndex===volunteering.length-1?"not-allowed":"pointer",
                      transition:"all 0.3s",
                    }}
                    onMouseEnter={(e) => { if(activeIndex!==volunteering.length-1){ (e.currentTarget as HTMLElement).style.color="var(--rose-light,#e8a0b0)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(201,116,138,0.40)"; }}}
                    onMouseLeave={(e) => { if(activeIndex!==volunteering.length-1){ (e.currentTarget as HTMLElement).style.color="rgba(196,181,165,0.65)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(201,116,138,0.20)"; }}}
                  >
                    {t("nextButton")}<ChevronRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* All entries list */}
        <div className={`mt-16 transition-all duration-1000 delay-500 ${isVisible?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-4 mb-8">
            <div style={{ height:"1px", flex:1, background:"linear-gradient(90deg, transparent, rgba(201,116,138,0.25))" }} />
            <span style={{ color:"rgba(201,116,138,0.45)", fontSize:"0.58rem", letterSpacing:"0.25em", textTransform:"uppercase", fontFamily:"'Jost', sans-serif" }}>{t("allEntries")}</span>
            <div style={{ height:"1px", flex:1, background:"linear-gradient(90deg, rgba(201,116,138,0.25), transparent)" }} />
          </div>

          <div className="space-y-3">
            {volunteering.map((item:any,index:number) => (
              <button key={index} onClick={() => setActiveIndex(index)} className="w-full group text-left"
                style={{
                  opacity:visibleCards[index]?1:0,
                  transform:visibleCards[index]?"translateX(0)":"translateX(-16px)",
                  transition:`opacity 0.6s ease ${index*80}ms, transform 0.6s ease ${index*80}ms`,
                }}>
                <div style={{
                  display:"flex", alignItems:"center", gap:"16px",
                  padding:"15px 20px",
                  background:activeIndex===index?"rgba(201,116,138,0.08)":"transparent",
                  border:"1px solid",
                  borderColor:activeIndex===index?"rgba(201,116,138,0.28)":"rgba(201,116,138,0.08)",
                  borderLeft:`2px solid ${activeIndex===index?"var(--rose,#c9748a)":"rgba(201,116,138,0.18)"}`,
                  borderRadius:"14px",
                  transition:"all 0.3s",
                }}
                  onMouseEnter={(e) => { if(activeIndex!==index){ const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(201,116,138,0.18)"; el.style.background="rgba(201,116,138,0.04)"; }}}
                  onMouseLeave={(e) => { if(activeIndex!==index){ const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(201,116,138,0.08)"; el.style.background="transparent"; }}}
                >
                  <span style={{ fontFamily:"'Cormorant Garamond', serif", color:activeIndex===index?"var(--rose-light,#e8a0b0)":"rgba(201,116,138,0.28)", fontSize:"0.8rem", fontWeight:400, minWidth:"28px", transition:"color 0.3s" }}>
                    {String(index+1).padStart(2,"0")}
                  </span>
                  <span style={{ display:"block", width:"1px", height:"28px", background:"rgba(201,116,138,0.15)" }} />
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily:"'Cormorant Garamond', serif", color:activeIndex===index?"var(--rose-light,#e8a0b0)":"var(--cream,#f5ece0)", fontSize:"0.94rem", fontWeight:500, marginBottom:"2px", transition:"color 0.3s" }}>{item.role}</p>
                    <p style={{ fontFamily:"'Jost', sans-serif", color:"rgba(196,181,165,0.55)", fontSize:"0.70rem", letterSpacing:"0.04em" }}>{item.organization} · {item.date}</p>
                  </div>
                  <ChevronRight size={13} style={{ color:activeIndex===index?"var(--rose,#c9748a)":"rgba(201,116,138,0.20)", flexShrink:0, transition:"color 0.3s, transform 0.3s", transform:activeIndex===index?"translateX(2px)":"none" }} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}