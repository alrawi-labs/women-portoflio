"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/Shared/LanguageSwitcher";
import { systemLanguageCodes } from "@/data/systemLanguages";
import { contactData } from "@/data/contacts";
import { SiteLogo } from "@/data/techIcons";

export default function Header() {
  const t = useTranslations("header");
  const [isMenuOpen, setIsMenuOpen]     = useState(false);
  const [isScrolled, setIsScrolled]     = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router      = useRouter();
  const pathname    = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const isHomePage =
      pathSegments.length === 0 ||
      (pathSegments.length === 1 && systemLanguageCodes.includes(pathSegments[0]));
    if (!isHomePage) { router.push(`/#${sectionId}`); setIsMenuOpen(false); setOpenDropdown(null); return; }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false); setOpenDropdown(null);
  };

  const goToHome = () => { router.push("/"); setIsMenuOpen(false); setOpenDropdown(null); };
  const toggleDropdown = (key: string) => setOpenDropdown(openDropdown === key ? null : key);

  return (
    <>
      <style>{`
        .hn-link {
          position: relative;
          font-family: 'Jost', sans-serif;
          font-size: 0.67rem; font-weight: 400;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(196,181,165,0.80);
          background: none; border: none; cursor: pointer;
          transition: color 0.3s; padding: 4px 0;
        }
        .hn-link:hover { color: var(--rose-light, #e8a0b0); }
        .hn-link::after {
          content: '';
          position: absolute; bottom: -1px; left: 0;
          height: 1px; width: 0;
          background: linear-gradient(90deg, var(--rose,#c9748a), transparent);
          transition: width 0.4s ease;
        }
        .hn-link:hover::after { width: 100%; }

        .hn-cta {
          font-family: 'Jost', sans-serif;
          font-size: 0.67rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          background: rgba(201,116,138,0.15);
          color: var(--rose-light,#e8a0b0);
          border: 1px solid rgba(201,116,138,0.30);
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.35s;
          position: relative; overflow: hidden;
        }
        .hn-cta:hover {
          background: rgba(201,116,138,0.25);
          border-color: rgba(201,116,138,0.55);
          box-shadow: 0 0 24px rgba(201,116,138,0.18);
        }
        .mob-link {
          width: 100%; text-align: start;
          font-family: 'Jost', sans-serif;
          font-size: 0.68rem; font-weight: 400;
          letter-spacing: 0.18em; text-transform: uppercase;
          background: none; border: none; cursor: pointer;
          transition: color 0.2s;
          color: rgba(196,181,165,0.80);
        }
        .mob-link:hover { color: var(--rose-light,#e8a0b0) !important; }
      `}</style>

      <header style={{
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        transition: "all 0.4s ease",
        borderBottom: isScrolled ? "1px solid rgba(201,116,138,0.12)" : "1px solid transparent",
        background: isScrolled ? "rgba(45,31,46,0.80)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        padding: isScrolled ? "13px 0" : "21px 0",
      }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <button onClick={goToHome} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={SiteLogo} alt="Logo" width={42} height={42} style={{ borderRadius:"10px" }} />
              <span className="hidden lg:flex items-center gap-3"
                style={{ borderLeft:"1px solid rgba(201,116,138,0.18)", paddingLeft:"12px" }}>
                <span style={{
                  color:"rgba(196,181,165,0.65)", fontSize:"0.7rem",
                  letterSpacing:"0.10em", fontFamily:"'Jost', sans-serif", fontWeight:300,
                }}>
                  {contactData.email}
                </span>
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" ref={dropdownRef}>
              <button onClick={goToHome} className="hn-link">{t("home")}</button>
              <button onClick={() => scrollToSection("stats")} className="hn-link">{t("stats")}</button>
              <button onClick={() => scrollToSection("services")} className="hn-link">{t("services")}</button>

              <SoftDropdown
                label={t("work")} isOpen={openDropdown === "work"}
                onToggle={() => toggleDropdown("work")}
                items={[
                  { label: t("projects"), onClick: () => router.push("/projects") },
                  { label: t("resume"),   onClick: () => scrollToSection("resume") },
                ]}
              />
              <SoftDropdown
                label={t("about")} isOpen={openDropdown === "about"}
                onToggle={() => toggleDropdown("about")}
                items={[
                  { label: t("skills"),       onClick: () => scrollToSection("skills") },
                  { label: t("languages"),    onClick: () => scrollToSection("languages") },
                  { label: t("volunteering"), onClick: () => scrollToSection("volunteering") },
                  { label: t("certificates"), onClick: () => scrollToSection("certificates") },
                ]}
              />
              <button onClick={() => router.push("/blog")} className="hn-link">{t("blog")}</button>
              <button onClick={() => scrollToSection("contact")} className="hn-link">{t("contact")}</button>
            </nav>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher />
              <button onClick={() => scrollToSection("contact")} className="hn-cta" style={{ padding:"9px 24px" }}>
                {t("startAProject")}
              </button>
            </div>

            {/* Mobile right */}
            <div className="lg:hidden flex items-center gap-3">
              <LanguageSwitcher />
              <button onClick={() => scrollToSection("contact")} className="hn-cta" style={{ padding:"7px 16px" }}>
                {t("startAProject")}
              </button>
              <button className="w-10 h-10 flex items-center justify-end"
                onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                <div className="flex flex-col gap-[5px] items-end">
                  {[
                    { w: isMenuOpen ? "28px":"20px", t_: isMenuOpen ? "rotate(45deg) translate(4px,5px)":"none" },
                    { w: "28px",                     o: isMenuOpen ? 0:1 },
                    { w: isMenuOpen ? "28px":"24px", t_: isMenuOpen ? "rotate(-45deg) translate(4px,-5px)":"none" },
                  ].map((bar,i) => (
                    <span key={i} style={{
                      display:"block", height:"1.5px",
                      background:"var(--rose-light,#e8a0b0)",
                      width:bar.w, borderRadius:"2px",
                      transform:(bar as any).t_ ?? "none",
                      opacity:(bar as any).o ?? 1,
                      transition:"all 0.3s",
                    }} />
                  ))}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div style={{
          overflow:"hidden",
          maxHeight: isMenuOpen ? "640px" : "0px",
          transition:"max-height 0.45s ease",
          background:"rgba(45,31,46,0.95)",
          borderTop: isMenuOpen ? "1px solid rgba(201,116,138,0.12)" : "none",
          backdropFilter:"blur(20px)",
        }} className="lg:hidden">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col gap-1">
              <MobLink label={t("home")}     onClick={goToHome} />
              <MobLink label={t("stats")}    onClick={() => scrollToSection("stats")} />
              <MobLink label={t("services")} onClick={() => scrollToSection("services")} />
              <MobGroup title={t("work")}>
                <MobLink label={t("projects")} onClick={() => router.push("/projects")} indent />
                <MobLink label={t("resume")}   onClick={() => scrollToSection("resume")} indent />
              </MobGroup>
              <MobGroup title={t("about")}>
                <MobLink label={t("skills")}       onClick={() => scrollToSection("skills")} indent />
                <MobLink label={t("languages")}    onClick={() => scrollToSection("languages")} indent />
                <MobLink label={t("volunteering")} onClick={() => scrollToSection("volunteering")} indent />
                <MobLink label={t("certificates")} onClick={() => scrollToSection("certificates")} indent />
              </MobGroup>
              <MobLink label={t("blog")}    onClick={() => router.push("/blog")} />
              <MobLink label={t("contact")} onClick={() => scrollToSection("contact")} />
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

function SoftDropdown({ label, isOpen, onToggle, items }: {
  label: string; isOpen: boolean; onToggle: () => void;
  items: { label: string; onClick: () => void }[];
}) {
  return (
    <div className="relative">
      <button onClick={onToggle} className="hn-link flex items-center gap-1"
        style={{ color: isOpen ? "var(--rose-light,#e8a0b0)" : undefined }}>
        {label}
        <ChevronDown size={11} style={{
          transition:"transform 0.4s",
          transform: isOpen ? "rotate(180deg)" : "none",
          color:"rgba(201,116,138,0.55)",
        }} />
      </button>

      <div style={{
        position:"absolute", top:"calc(100% + 14px)", left:0, width:"210px",
        background:"rgba(45,31,46,0.96)",
        border:"1px solid rgba(201,116,138,0.18)",
        borderRadius:"16px",
        boxShadow:"0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(201,116,138,0.08)",
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.97)",
        pointerEvents: isOpen ? "auto" : "none",
        transition:"opacity 0.25s, transform 0.25s",
        backdropFilter:"blur(20px)",
        zIndex:60, overflow:"hidden",
        padding:"8px",
      }}>
        {items.map((item, i) => (
          <button key={i} onClick={item.onClick}
            className="w-full text-start"
            style={{
              padding:"10px 16px",
              color:"rgba(196,181,165,0.80)",
              fontSize:"0.67rem", fontWeight:400,
              letterSpacing:"0.16em", textTransform:"uppercase",
              fontFamily:"'Jost', sans-serif",
              background:"none", border:"none", cursor:"pointer",
              borderRadius:"10px",
              transition:"color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color      = "var(--rose-light,#e8a0b0)";
              el.style.background = "rgba(201,116,138,0.10)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color      = "rgba(196,181,165,0.80)";
              el.style.background = "none";
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MobLink({ label, onClick, indent }: { label:string; onClick:()=>void; indent?:boolean }) {
  return (
    <button onClick={onClick} className="mob-link" style={{
      padding: indent ? "7px 0 7px 16px" : "10px 0",
      color: indent ? "rgba(196,181,165,0.65)" : "rgba(240,235,224,0.85)",
      borderBottom: indent ? "none" : "1px solid rgba(201,116,138,0.07)",
    }}>
      {indent && <span style={{ color:"rgba(201,116,138,0.45)", marginRight:"8px" }}>·</span>}
      {label}
    </button>
  );
}

function MobGroup({ title, children }: { title:string; children:React.ReactNode }) {
  return (
    <div style={{
      margin:"4px 0",
      borderLeft:"1.5px solid rgba(201,116,138,0.20)",
      paddingBottom:"4px",
    }}>
      <p style={{
        color:"rgba(201,116,138,0.50)", fontSize:"0.56rem",
        fontWeight:500, letterSpacing:"0.28em", textTransform:"uppercase",
        fontFamily:"'Jost', sans-serif",
        padding:"10px 0 5px 12px", margin:0,
      }}>{title}</p>
      {children}
    </div>
  );
}