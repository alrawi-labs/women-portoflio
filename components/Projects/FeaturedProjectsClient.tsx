"use client";

import { useState, useEffect, useRef } from "react";
import { Shield, Calendar, Filter, TrendingUp, Globe, ArrowUpRight } from "lucide-react";
import { statsData } from "@/data/stats";

const iconMap: { [key: string]: any } = { Shield, Calendar, Filter, TrendingUp, Globe };

interface Project { id:string; title:string; subtitle?:string; description:string; tags:string[]; image:string; icon?:string; }
interface Translations { title:string; viewProject:string; sectionCategory:string; allProjects:{ title:string; description:string; button:string; stats:{ projects:string; technologies:string; years:string; }; }; }
interface FeaturedProjectsClientProps { projects:Project[]; translations:Translations; }

const ROMAN = ["I","II","III","IV","V","VI","VII","VIII"];

export default function FeaturedProjectsClient({ projects, translations }: FeaturedProjectsClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top } = containerRef.current.getBoundingClientRect();
      const progress = -top / (containerRef.current.offsetHeight - window.innerHeight);
      setActiveIndex(Math.max(0, Math.min(Math.floor(progress * projects.length), projects.length - 1)));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [projects.length]);

  const getResponsiveValues = (index: number) => {
    let offset = 0.75, widthReduction = 3.75, topBase = 8;
    if (windowWidth < 640) { offset = 0.3; widthReduction = 1.2; topBase = 6; }
    else if (windowWidth < 1024) { offset = 0.5; widthReduction = 2; topBase = 7; }
    return {
      transform: `translate(${index*offset}rem, ${index*offset}rem)`,
      width: `calc(100% - ${index*widthReduction}rem)`,
      top: `max(${topBase}rem, ${topBase+index*1.5}rem)`,
    };
  };

  return (
    <section id="projects" className="relative py-16 sm:py-20 lg:py-24"
      style={{ background:"var(--bg-secondary)", scrollMarginTop:"30px" }}>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:"absolute", width:"600px", height:"600px", top:"-150px", right:"-150px", borderRadius:"50%", filter:"blur(130px)", opacity:0.22, background:"radial-gradient(circle, rgba(201,116,138,0.28) 0%, transparent 70%)" }} />
        <div style={{ position:"absolute", width:"500px", height:"500px", bottom:"-100px", left:"-100px", borderRadius:"50%", filter:"blur:120px", opacity:0.16, background:"radial-gradient(circle, rgba(226,201,138,0.20) 0%, transparent 70%)" }} />
        {/* Floral watermark */}
        <svg className="absolute right-10 top-32 opacity-[0.04]" width="180" height="180" viewBox="0 0 180 180">
          {[0,60,120,180,240,300].map((deg,i) => (
            <ellipse key={i} cx="90" cy="90" rx="14" ry="42" fill="rgba(201,116,138,1)"
              transform={`rotate(${deg} 90 90) translate(0,-52)`} />
          ))}
          <circle cx="90" cy="90" r="14" fill="rgba(201,116,138,1)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        {projects?.length > 0 && (
          <div className="sticky mb-10 lg:mb-12">
            <div className="mb-6">
              <span style={{
                display:"inline-flex", alignItems:"center", gap:"8px", padding:"6px 20px",
                background:"rgba(201,116,138,0.10)", border:"1px solid rgba(201,116,138,0.22)",
                borderRadius:"100px", color:"var(--rose-light,#e8a0b0)",
                fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.28em",
                textTransform:"uppercase", fontFamily:"'Jost', sans-serif",
              }}>
                <span style={{ display:"block", width:"4px", height:"4px", borderRadius:"50%", background:"currentColor" }} />
                § 04 — {translations.sectionCategory}
              </span>
            </div>

            <h2 style={{
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              fontSize:"clamp(1.8rem, 5vw, 3.5rem)", fontWeight:400, lineHeight:1.15,
              background:"linear-gradient(145deg, #f7f0e0 0%, #e8a0b0 50%, #c9748a 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              marginBottom:"10px",
            }}>{translations.title}</h2>

            <div className="flex items-center gap-3 mt-4">
              <div style={{ height:"1px", width:"52px", background:"linear-gradient(90deg, rgba(201,116,138,0.50), transparent)" }} />
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 0.5 Q7 2.5 10 3 Q7 4 6 7 Q5 4 2 3 Q5 2.5 6 0.5Z" fill="rgba(201,169,110,0.55)"/></svg>
            </div>
          </div>
        )}

        {/* Cards */}
        <div ref={containerRef} className="relative pb-[30vh] sm:pb-[40vh]">
          {projects.map((project, index) => {
            const styles   = getResponsiveValues(index);
            const IconComp = project.icon ? iconMap[project.icon] : Shield;

            return (
              <article key={project.id} className="sticky mb-[15vh] sm:mb-[20vh] group" style={styles}>
                <div className="overflow-hidden transition-all duration-500"
                  style={{
                    background:"rgba(255,255,255,0.04)",
                    border:"1px solid rgba(201,116,138,0.15)",
                    borderRadius:"24px",
                    boxShadow:"0 8px 40px rgba(0,0,0,0.25)",
                    backdropFilter:"blur(12px)",
                  }}
                  onMouseEnter={(e) => {
                    const el=e.currentTarget as HTMLElement;
                    el.style.borderColor="rgba(201,116,138,0.35)";
                    el.style.boxShadow="0 20px 60px rgba(201,116,138,0.12), 0 4px 20px rgba(0,0,0,0.20)";
                  }}
                  onMouseLeave={(e) => {
                    const el=e.currentTarget as HTMLElement;
                    el.style.borderColor="rgba(201,116,138,0.15)";
                    el.style.boxShadow="0 8px 40px rgba(0,0,0,0.25)";
                  }}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                    {/* Image pane */}
                    <div className="relative h-[30vh] min-h-[240px] sm:h-[35vh] lg:h-[55vh] lg:min-h-[440px] overflow-hidden"
                      style={{ borderRadius:"24px 0 0 24px" }}>
                      <img src={project.image} alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ filter:"saturate(0.90)" }} />
                      <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(45,31,46,0.85) 0%, rgba(45,31,46,0.25) 55%, transparent 100%)" }} />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background:"linear-gradient(135deg, rgba(201,116,138,0.10) 0%, transparent 55%)" }} />

                      {/* Icon badge */}
                      <div className="absolute top-4 right-4 lg:top-6 lg:right-6 flex items-center justify-center"
                        style={{ width:"40px", height:"40px", borderRadius:"12px", border:"1px solid rgba(201,116,138,0.35)", background:"rgba(45,31,46,0.75)", backdropFilter:"blur(8px)" }}>
                        <IconComp style={{ width:"18px", height:"18px", color:"var(--rose-light,#e8a0b0)", strokeWidth:1.4 }} />
                      </div>

                      {/* Roman numeral badge */}
                      <div className="absolute top-4 left-4 lg:top-6 lg:left-6 flex items-center justify-center"
                        style={{ width:"40px", height:"40px", borderRadius:"12px", border:"1px solid rgba(201,116,138,0.40)", background:"rgba(201,116,138,0.16)", backdropFilter:"blur(8px)" }}>
                        <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"0.92rem", fontWeight:400, color:"var(--rose-light,#e8a0b0)", lineHeight:1 }}>
                          {ROMAN[index] ?? String(index+1).padStart(2,"0")}
                        </span>
                      </div>

                      {/* Counter */}
                      <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                        <span style={{ fontSize:"0.58rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(201,116,138,0.55)", fontFamily:"'Jost', sans-serif" }}>
                          {String(index+1).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}
                        </span>
                      </div>
                    </div>

                    {/* Content pane */}
                    <div className="flex flex-col justify-center" style={{ padding:"clamp(24px, 4vw, 52px)" }}>
                      <div className="space-y-5">

                        {/* Subtitle */}
                        {project.subtitle && (
                          <div className="flex items-center gap-3">
                            <div style={{ height:"1px", width:"32px", background:"linear-gradient(90deg, rgba(201,116,138,0.55), transparent)" }} />
                            <span style={{ color:"rgba(201,116,138,0.60)", fontSize:"0.60rem", fontWeight:400, letterSpacing:"0.22em", textTransform:"uppercase", fontFamily:"'Jost', sans-serif" }}>
                              {project.subtitle}
                            </span>
                          </div>
                        )}

                        {/* Title */}
                        <h3 style={{
                          fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(1.4rem, 3vw, 2.4rem)", fontWeight:400, lineHeight:1.2,
                          background:"linear-gradient(145deg, #f7f0e0 0%, #e8a0b0 55%, #c9748a 100%)",
                          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                        }}>{project.title}</h3>

                        <div style={{ height:"1px", width:"100%", background:"linear-gradient(90deg, rgba(201,116,138,0.25), transparent)" }} />

                        {/* Description */}
                        <p className="line-clamp-4 lg:line-clamp-none"
                          style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontWeight:300, color:"rgba(196,181,165,0.75)", fontSize:"0.98rem", lineHeight:1.85 }}>
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag,ti) => (
                            <span key={ti}
                              style={{
                                padding:"4px 14px",
                                border:"1px solid rgba(201,116,138,0.20)",
                                borderRadius:"100px",
                                background:"rgba(201,116,138,0.06)",
                                color:"rgba(201,116,138,0.60)",
                                fontSize:"0.60rem", fontWeight:400,
                                letterSpacing:"0.14em", textTransform:"uppercase",
                                fontFamily:"'Jost', sans-serif",
                                transition:"all 0.25s", cursor:"default",
                              }}
                              onMouseEnter={(e) => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(201,116,138,0.14)"; el.style.color="var(--rose-light,#e8a0b0)"; el.style.borderColor="rgba(201,116,138,0.40)"; }}
                              onMouseLeave={(e) => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(201,116,138,0.06)"; el.style.color="rgba(201,116,138,0.60)"; el.style.borderColor="rgba(201,116,138,0.20)"; }}
                            >{tag}</span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="pt-1">
                          <a href={`/projects/${project.id}`} className="group/btn inline-flex items-center gap-2"
                            style={{
                              padding:"10px 26px",
                              background:"rgba(201,116,138,0.16)",
                              color:"var(--rose-light,#e8a0b0)",
                              border:"1px solid rgba(201,116,138,0.30)",
                              borderRadius:"100px",
                              fontSize:"0.68rem", fontWeight:400,
                              letterSpacing:"0.16em", textTransform:"uppercase",
                              fontFamily:"'Jost', sans-serif",
                              textDecoration:"none",
                              transition:"all 0.35s",
                              display:"inline-flex",
                            }}
                            onMouseEnter={(e) => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(201,116,138,0.28)"; el.style.borderColor="rgba(201,116,138,0.55)"; el.style.boxShadow="0 0 24px rgba(201,116,138,0.20)"; }}
                            onMouseLeave={(e) => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(201,116,138,0.16)"; el.style.borderColor="rgba(201,116,138,0.30)"; el.style.boxShadow="none"; }}
                          >
                            {translations.viewProject}
                            <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* All Projects Banner */}
        <div className="relative overflow-hidden group cursor-pointer"
          style={{ border:"1px solid rgba(201,116,138,0.18)", borderRadius:"28px" }}>
          <div className="absolute inset-0">
            <img src="/assets/images/sectionBackground.png" alt={translations.allProjects.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter:"saturate(0.80)" }} />
            <div className="absolute inset-0" style={{ background:"linear-gradient(135deg, rgba(45,31,46,0.90) 0%, rgba(62,42,64,0.80) 50%, rgba(45,31,46,0.88) 100%)" }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background:"linear-gradient(135deg, rgba(201,116,138,0.10) 0%, transparent 55%)" }} />
          </div>

          <div className="relative z-10 px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 text-center">
            <div className="max-w-3xl mx-auto space-y-6">

              <div className="flex justify-center">
                <span style={{
                  display:"inline-flex", alignItems:"center", gap:"8px", padding:"6px 20px",
                  background:"rgba(201,116,138,0.12)", border:"1px solid rgba(201,116,138,0.28)",
                  borderRadius:"100px", color:"var(--rose-light,#e8a0b0)",
                  fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.28em",
                  textTransform:"uppercase", fontFamily:"'Jost', sans-serif",
                }}>
                  <span style={{ display:"block", width:"4px", height:"4px", borderRadius:"50%", background:"currentColor" }} />
                  Complete Portfolio
                </span>
              </div>

              <div className="flex items-center justify-center gap-4">
                <div style={{ height:"1px", width:"52px", background:"linear-gradient(90deg, transparent, rgba(201,116,138,0.45))" }} />
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1 Q8.2 3.8 11 4 Q8.2 5.2 7 8 Q5.8 5.2 3 4 Q5.8 3.8 7 1Z" fill="rgba(201,116,138,0.55)"/></svg>
                <div style={{ height:"1px", width:"52px", background:"linear-gradient(90deg, rgba(201,116,138,0.45), transparent)" }} />
              </div>

              <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(1.6rem, 4vw, 3rem)", fontWeight:400, lineHeight:1.2, color:"var(--cream,#f5ece0)" }}>
                {translations.allProjects.title}
              </h3>

              <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontWeight:300, color:"rgba(245,236,224,0.68)", fontSize:"1.05rem", lineHeight:1.82, maxWidth:"480px", margin:"0 auto" }}>
                {translations.allProjects.description}
              </p>

              <div className="pt-2">
                <a href="/projects" className="group/cta inline-flex items-center gap-2"
                  style={{
                    padding:"12px 32px",
                    background:"rgba(201,116,138,0.18)",
                    color:"var(--rose-light,#e8a0b0)",
                    border:"1px solid rgba(201,116,138,0.35)",
                    borderRadius:"100px",
                    fontSize:"0.70rem", fontWeight:400,
                    letterSpacing:"0.18em", textTransform:"uppercase",
                    fontFamily:"'Jost', sans-serif",
                    textDecoration:"none",
                    transition:"all 0.35s", display:"inline-flex",
                  }}
                  onMouseEnter={(e) => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(201,116,138,0.30)"; el.style.borderColor="rgba(201,116,138,0.60)"; el.style.boxShadow="0 0 32px rgba(201,116,138,0.22)"; }}
                  onMouseLeave={(e) => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(201,116,138,0.18)"; el.style.borderColor="rgba(201,116,138,0.35)"; el.style.boxShadow="none"; }}
                >
                  {translations.allProjects.button}
                  <ArrowUpRight size={14} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4">
                {[
                  { value:statsData.projects,     label:translations.allProjects.stats.projects },
                  { value:statsData.technologies, label:translations.allProjects.stats.technologies },
                  { value:statsData.years,        label:translations.allProjects.stats.years },
                ].map((stat,i,arr) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className="text-center">
                      <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.6rem", fontWeight:400, color:"var(--rose-light,#e8a0b0)", lineHeight:1 }}>{stat.value}+</div>
                      <div style={{ fontSize:"0.58rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(201,116,138,0.45)", fontFamily:"'Jost', sans-serif", marginTop:"4px" }}>{stat.label}</div>
                    </div>
                    {i < arr.length-1 && <div style={{ width:"1px", height:"32px", background:"rgba(201,116,138,0.18)" }} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}