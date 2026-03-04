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

    if (!isHomePage) {
      router.push(`/#${sectionId}`);
      setIsMenuOpen(false);
      setOpenDropdown(null);
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const goToHome = () => {
    router.push("/");
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (key: string) =>
    setOpenDropdown(openDropdown === key ? null : key);

  /* ─── shared style tokens ───────────────────────────── */
  const navLinkBase =
    "relative text-sm font-semibold tracking-widest uppercase transition-colors duration-300 group";
  const navLinkColor =
    "text-[var(--cream-dim)] hover:text-[#dda7a5]";
  const underline =
    "absolute -bottom-1 start-0 h-px w-0 group-hover:w-full transition-all duration-500 bg-[#dda7a5]";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        transition: "all 0.4s ease",
        borderBottom: isScrolled
          ? "1px solid rgba(221, 167, 165,0.18)"
          : "1px solid transparent",
        background: isScrolled
          ? "rgba(28, 18, 26, 0.92)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(18px)" : "none",
        padding: isScrolled ? "14px 0" : "22px 0",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* ── Logo ─────────────────────────────────────── */}
          <button
            onClick={goToHome}
            className="flex items-center gap-3 hover:opacity-85 transition-opacity"
          >
            <img src={SiteLogo} alt="Logo" width={48} height={48} />

            {/* Vertical rule + email */}
            <span
              className="hidden lg:flex items-center gap-3"
              style={{ borderLeft: "1px solid rgba(221, 167, 165,0.25)", paddingLeft: "12px" }}
            >
              <span
                style={{
                  color: "var(--cream-dim)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                {contactData.email}
              </span>
            </span>
          </button>

          {/* ── Desktop Nav ───────────────────────────────── */}
          <nav
            className="hidden lg:flex items-center gap-8"
            ref={dropdownRef}
          >
            {/* Home */}
            <NavLink label={t("home")} onClick={goToHome} />

            {/* Stats */}
            <NavLink label={t("stats")} onClick={() => scrollToSection("stats")} />

            {/* Services */}
            <NavLink label={t("services")} onClick={() => scrollToSection("services")} />

            {/* Work dropdown */}
            <AcademicDropdown
              label={t("work")}
              isOpen={openDropdown === "work"}
              onToggle={() => toggleDropdown("work")}
              items={[
                { label: t("projects"),  onClick: () => router.push("/projects") },
                { label: t("resume"),    onClick: () => scrollToSection("resume") },
              ]}
            />

            {/* About dropdown */}
            <AcademicDropdown
              label={t("about")}
              isOpen={openDropdown === "about"}
              onToggle={() => toggleDropdown("about")}
              items={[
                { label: t("skills"),       onClick: () => scrollToSection("skills") },
                { label: t("languages"),    onClick: () => scrollToSection("languages") },
                { label: t("volunteering"), onClick: () => scrollToSection("volunteering") },
                { label: t("certificates"), onClick: () => scrollToSection("certificates") },
              ]}
            />

            {/* Blog */}
            <NavLink label={t("blog")} onClick={() => router.push("/blog")} />

            {/* Contact */}
            <NavLink label={t("contact")} onClick={() => scrollToSection("contact")} />
          </nav>

          {/* ── Desktop Actions ───────────────────────────── */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />

            {/* CTA — rose gold pill */}
            <button
              onClick={() => scrollToSection("contact")}
              className="relative overflow-hidden font-bold tracking-widest uppercase text-xs group"
              style={{
                padding: "10px 26px",
                background: "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 100%)",
                color: "var(--navy)",
                border: "none",
                borderRadius: "32px",
                transition: "box-shadow 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 28px rgba(221, 167, 165,0.5)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              {/* Shimmer */}
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
              />
              {t("startAProject")}
            </button>
          </div>

          {/* ── Mobile Right ──────────────────────────────── */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher />

            <button
              onClick={() => scrollToSection("contact")}
              className="text-xs font-bold uppercase tracking-widest"
              style={{
                padding: "8px 18px",
                background: "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 100%)",
                color: "var(--navy)",
                borderRadius: "32px",
              }}
            >
              {t("startAProject")}
            </button>

            {/* Hamburger — gold bars */}
            <button
              className="relative w-10 h-10 flex items-center justify-end"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-[5px] items-end">
                <span
                  style={{
                    display: "block",
                    height: "1.5px",
                    background: "#dda7a5",
                    width: isMenuOpen ? "28px" : "20px",
                    transform: isMenuOpen ? "rotate(45deg) translate(4px,5px)" : "none",
                    transition: "all 0.3s",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    height: "1.5px",
                    background: "#dda7a5",
                    width: "28px",
                    opacity: isMenuOpen ? 0 : 1,
                    transition: "all 0.3s",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    height: "1.5px",
                    background: "#dda7a5",
                    width: isMenuOpen ? "28px" : "24px",
                    transform: isMenuOpen ? "rotate(-45deg) translate(4px,-5px)" : "none",
                    transition: "all 0.3s",
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ───────────────────────────────────── */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: isMenuOpen ? "600px" : "0px",
          transition: "max-height 0.45s ease",
          background: "rgba(28, 18, 26, 0.97)",
          borderTop: isMenuOpen ? "1px solid rgba(221, 167, 165,0.18)" : "none",
          backdropFilter: "blur(16px)",
        }}
        className="lg:hidden"
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex flex-col gap-1">

            <MobileNavLink label={t("home")}     onClick={goToHome} />
            <MobileNavLink label={t("stats")}    onClick={() => scrollToSection("stats")} />
            <MobileNavLink label={t("services")} onClick={() => scrollToSection("services")} />

            {/* Work group */}
            <MobileGroup title={t("work")}>
              <MobileNavLink label={t("projects")} onClick={() => router.push("/projects")} indent />
              <MobileNavLink label={t("resume")}   onClick={() => scrollToSection("resume")} indent />
            </MobileGroup>

            {/* About group */}
            <MobileGroup title={t("about")}>
              <MobileNavLink label={t("skills")}       onClick={() => scrollToSection("skills")} indent />
              <MobileNavLink label={t("languages")}    onClick={() => scrollToSection("languages")} indent />
              <MobileNavLink label={t("volunteering")} onClick={() => scrollToSection("volunteering")} indent />
              <MobileNavLink label={t("certificates")} onClick={() => scrollToSection("certificates")} indent />
            </MobileGroup>

            <MobileNavLink label={t("blog")} onClick={() => router.push("/blog")} />
            <MobileNavLink label={t("contact")} onClick={() => scrollToSection("contact")} />
          </nav>
        </div>
      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────────────────
   Sub-components
────────────────────────────────────────────────────────── */

function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative group"
      style={{
        color: "var(--cream-dim)",
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        fontFamily: "'Sora', sans-serif",
        background: "none",
        border: "none",
        cursor: "pointer",
        transition: "color 0.3s",
        padding: "4px 0",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#dda7a5")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--cream-dim)")}
    >
      {label}
      {/* underline */}
      <span
        className="absolute -bottom-1 start-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: "#dda7a5" }}
      />
    </button>
  );
}

function AcademicDropdown({
  label,
  isOpen,
  onToggle,
  items,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  items: { label: string; onClick: () => void }[];
}) {
  return (
    <div className="relative group/drop">
      <button
        onClick={onToggle}
        className="relative flex items-center gap-1 group"
        style={{
          color: isOpen ? "var(--gold)" : "var(--cream-dim)",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontFamily: "'Sora', sans-serif",
          background: "none",
          border: "none",
          cursor: "pointer",
          transition: "color 0.3s",
          padding: "4px 0",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#dda7a5")}
        onMouseLeave={(e) =>
          !isOpen && ((e.currentTarget as HTMLElement).style.color = "var(--cream-dim)")
        }
      >
        {label}
        <ChevronDown
          size={13}
          style={{
            transition: "transform 0.4s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            color: "rgba(221, 167, 165, 0.6)",
          }}
        />
        <span
          className="absolute -bottom-1 start-0 h-px w-0 group-hover:w-full transition-all duration-500"
          style={{ background: "#dda7a5" }}
        />
      </button>

      {/* Dropdown panel */}
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 12px)",
          left: 0,
          width: "200px",
          background: "rgba(28, 18, 26, 0.97)",
          border: "1px solid rgba(221, 167, 165,0.2)",
          borderTop: "2px solid #dda7a5",
          borderRadius: "20px",
          boxShadow: "0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(221,167,165,0.06)",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s, transform 0.3s",
          backdropFilter: "blur(16px)",
          zIndex: 60,
          overflow: "hidden",
        }}
      >
        {items.map((item, i) => (
          <button
            key={i}
            onClick={item.onClick}
            className="w-full text-start group/item relative"
            style={{
              padding: "11px 20px",
              color: "var(--cream-dim)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "'Sora', sans-serif",
              background: "none",
              border: "none",
              cursor: "pointer",
              borderBottom:
                i < items.length - 1 ? "1px solid rgba(221, 167, 165,0.08)" : "none",
              transition: "color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#dda7a5";
              (e.currentTarget as HTMLElement).style.background = "rgba(221, 167, 165,0.07)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--cream-dim)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {/* Left tick on hover */}
            <span
              style={{
                display: "inline-block",
                width: "14px",
                marginRight: "8px",
                color: "var(--gold-dim)",
                fontFamily: "serif",
              }}
            >
              ›
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MobileNavLink({
  label,
  onClick,
  indent,
}: {
  label: string;
  onClick: () => void;
  indent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-start"
      style={{
        padding: indent ? "8px 0 8px 12px" : "10px 0",
        color: indent ? "var(--cream-dim)" : "var(--cream)",
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        fontFamily: "'Sora', sans-serif",
        background: "none",
        border: "none",
        cursor: "pointer",
        borderBottom: indent ? "none" : "1px solid rgba(221, 167, 165,0.06)",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#dda7a5")}
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.color = indent ? "var(--cream-dim)" : "var(--cream)")
      }
    >
      {indent && (
        <span style={{ color: "var(--gold-dim)", marginRight: "8px" }}>›</span>
      )}
      {label}
    </button>
  );
}

function MobileGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        margin: "4px 0",
        paddingLeft: "0",
        borderLeft: "1.5px solid rgba(221, 167, 165,0.3)",
        paddingBottom: "4px",
      }}
    >
      {/* Group label */}
      <p
        style={{
          color: "var(--gold-dim)",
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontFamily: "'Sora', sans-serif",
          padding: "10px 0 6px 12px",
          margin: 0,
        }}
      >
        {title}
      </p>
      <div style={{ paddingLeft: "0" }}>{children}</div>
    </div>
  );
}