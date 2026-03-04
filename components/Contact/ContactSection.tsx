"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail, Phone, MapPin, Send, CheckCircle,
  Instagram, Github, Linkedin, Twitter, BookOpen,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { contactData } from "@/data/contacts";

const iconMap: Record<string, any> = { Instagram, Linkedin, Twitter, Github };

interface ContactInfo { icon: any; title: string; value: string; link: string; }

export default function Contact() {
  const t      = useTranslations("contact");
  const locale = useLocale();
  const isRTL  = locale === "ar";

  const [isVisible,    setIsVisible]    = useState(false);
  const [formData,     setFormData]     = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted,  setIsSubmitted]  = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo: ContactInfo[] = [
    { icon: Mail,   title: t("info.email.title"),    value: contactData.email,    link: `mailto:${contactData.email}` },
    ...(contactData.phone    ? [{ icon: Phone,  title: t("info.phone.title"),    value: contactData.phone,    link: `tel:${contactData.phone.replace(/\s/g, "")}` }] : []),
    ...(contactData.location ? [{ icon: MapPin, title: t("info.location.title"), value: contactData.location, link: "#" }] : []),
  ];

  const socialLinks = contactData.socialLinks.map((s) => ({
    icon: iconMap[s.icon], name: s.name, url: s.href,
  }));

  /* shared field style */
  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(31, 20, 28, 0.85)",
    border: "1px solid rgba(221, 167, 165,0.2)",
    borderRadius: "16px",
    color: "var(--cream)",
    fontSize: "0.9rem",
    fontFamily: "'Sora', sans-serif",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "8px",
    color: "var(--slate)",
    fontSize: "0.65rem",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontFamily: "'Sora', sans-serif",
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex items-center"
      style={{ background: "var(--bg-primary)", scrollMarginTop: "20px" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* ── Background ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 55% 45% at 0%   15%, rgba(221, 167, 165, 0.07)  0%, transparent 65%), " +
            "radial-gradient(ellipse 45% 40% at 100% 85%, rgba(221, 167, 165, 0.05) 0%, transparent 65%)",
        }} />
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-15 flex flex-col justify-between py-24">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.3), transparent)" }} />
          ))}
        </div>
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl w-full">

        {/* ── Section Header ───────────────────────── */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="flex justify-center mb-6">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              border: "1px solid rgba(221, 167, 165,0.28)", borderRadius: "32px",
              padding: "6px 20px", background: "rgba(221, 167, 165,0.05)",
            }}>
              <span style={{
                color: "var(--gold-dim)", fontSize: "0.62rem",
                letterSpacing: "0.3em", textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif", fontWeight: 500,
              }}>
                ✨ &nbsp; {t("sectionCategory")}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-3">
            <div style={{
              width: "52px", height: "52px",
              border: "1px solid rgba(221, 167, 165,0.3)", borderRadius: "50%",
              background: "rgba(221, 167, 165,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, boxShadow: "0 0 20px rgba(221, 167, 165,0.15)",
            }}>
              <Mail size={22} style={{ color: "#dda7a5", strokeWidth: 1.5 }} />
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 800,
              background: "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 50%, #b3817e 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              lineHeight: 1.15,
            }}>
              {t("title")}
            </h2>
          </div>

          <p style={{
            color: "var(--cream-dim)", fontSize: "1rem",
            maxWidth: "540px", margin: "0 auto", lineHeight: 1.75,
            fontFamily: "'Sora', sans-serif",
          }}>
            {t("subtitle")}
          </p>

          {/* Badge */}
          <div className="flex justify-center mt-5">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 18px",
              border: "1px solid rgba(221, 167, 165,0.3)", borderRadius: "24px",
              background: "rgba(221, 167, 165,0.06)",
            }}>
              <BookOpen size={13} style={{ color: "#dda7a5" }} />
              <span style={{
                color: "#dda7a5", fontSize: "0.68rem", fontWeight: 600,
                letterSpacing: "0.15em", textTransform: "uppercase",
                fontFamily: "'Sora', sans-serif",
              }}>{t("badge")}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="block h-px w-20" style={{ background: "linear-gradient(90deg, transparent, rgba(221, 167, 165,0.6))" }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(221, 167, 165,0.6)", boxShadow: "0 0 10px rgba(221, 167, 165,0.5)" }} />
            <span className="block h-px w-20" style={{ background: "linear-gradient(90deg, rgba(221, 167, 165,0.6), transparent)" }} />
          </div>
        </div>

        {/* ── Main Grid ────────────────────────────── */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-8">

          {/* ── Form ── col-span-3 ────────────────── */}
          <div className={`lg:col-span-3 order-1 lg:order-2 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div
              className="relative overflow-hidden h-full"
              style={{
                background: "radial-gradient(ellipse at top-left, var(--navy-surface) 0%, var(--navy-mid) 100%)",
                border: "1px solid rgba(221, 167, 165,0.12)",
                borderTop: "2px solid rgba(221, 167, 165,0.3)",
                borderRadius: "32px",
                padding: "36px 32px",
              }}
            >
              {/* Dot-grid */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(200,164,90,0.05) 1px, transparent 0)",
                backgroundSize: "28px 28px",
              }} />

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-8 h-8"
                style={{ borderTop: "1.5px solid rgba(200,164,90,0.4)", borderRight: "1.5px solid rgba(200,164,90,0.4)" }} />
              <div className="absolute bottom-0 left-0 w-8 h-8"
                style={{ borderBottom: "1.5px solid rgba(200,164,90,0.4)", borderLeft: "1.5px solid rgba(200,164,90,0.4)" }} />

              {/* Form label */}
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <span className="block h-px w-6" style={{ background: "var(--gold)" }} />
                <span style={{
                  color: "var(--gold-dim)", fontSize: "0.6rem",
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  fontFamily: "'Sora', sans-serif", fontWeight: 700,
                }}>
                  {t("inquiryForm")}
                </span>
                <span className="block h-px flex-1 max-w-[60px]"
                  style={{ background: "linear-gradient(90deg, var(--gold-dim), transparent)" }} />
              </div>

              {!isSubmitted ? (
                <div className="space-y-5 relative z-10">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label style={labelStyle}>{t("form.name.label")}</label>
                      <input
                        type="text" name="name" value={formData.name}
                        onChange={handleChange}
                        placeholder={t("form.name.placeholder")}
                        style={fieldStyle}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "rgba(221, 167, 165,0.55)";
                          e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(221, 167, 165,0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "rgba(221, 167, 165,0.2)";
                          e.currentTarget.style.boxShadow   = "none";
                        }}
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label style={labelStyle}>{t("form.email.label")}</label>
                      <input
                        type="email" name="email" value={formData.email}
                        onChange={handleChange}
                        placeholder={t("form.email.placeholder")}
                        style={fieldStyle}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "rgba(221, 167, 165,0.55)";
                          e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(221, 167, 165,0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "rgba(221, 167, 165,0.2)";
                          e.currentTarget.style.boxShadow   = "none";
                        }}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label style={labelStyle}>{t("form.subject.label")}</label>
                    <input
                      type="text" name="subject" value={formData.subject}
                      onChange={handleChange}
                      placeholder={t("form.subject.placeholder")}
                      style={fieldStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "rgba(200,164,90,0.55)";
                        e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(200,164,90,0.08)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(200,164,90,0.2)";
                        e.currentTarget.style.boxShadow   = "none";
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>{t("form.message.label")}</label>
                    <textarea
                      name="message" value={formData.message}
                      onChange={handleChange} rows={5}
                      placeholder={t("form.message.placeholder")}
                      style={{ ...fieldStyle, resize: "none" }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "rgba(200,164,90,0.55)";
                        e.currentTarget.style.boxShadow   = "0 0 0 3px rgba(200,164,90,0.08)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(200,164,90,0.2)";
                        e.currentTarget.style.boxShadow   = "none";
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden flex items-center justify-center gap-2 font-bold transition-all duration-400 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      padding: "14px 28px",
                      background: "linear-gradient(135deg, #f0c4c2 0%, #dda7a5 100%)",
                      color: "var(--navy)",
                      borderRadius: "24px",
                      fontSize: "0.75rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "'Sora', sans-serif",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = "0 0 28px rgba(221, 167, 165,0.4)")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "none")}  
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }} />
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full animate-spin border-2 border-[var(--navy)]/30 border-t-[var(--navy)] relative z-10" />
                        <span className="relative z-10">{t("form.sending")}</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">{t("form.submit")}</span>
                        <Send size={14}
                          className={`relative z-10 transition-transform duration-300 ${
                            isRTL ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"
                          }`}
                        />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* ── Success state ── */
                <div className="relative z-10 flex flex-col items-center justify-center py-14 text-center">
                  <div
                    className="w-16 h-16 flex items-center justify-center mb-6"
                    style={{
                      border: "2px solid #dda7a5",
                      borderRadius: "50%",
                      background: "rgba(221, 167, 165,0.1)",
                    }}
                  >
                    <CheckCircle size={28} style={{ color: "#dda7a5" }} />
                  </div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "var(--cream)", fontSize: "1.4rem", fontWeight: 700, marginBottom: "8px",
                  }}>
                    {t("success.title")}
                  </h3>
                  <p style={{ color: "var(--cream-dim)", fontSize: "0.9rem", fontFamily: "'Sora', sans-serif" }}>
                    {t("success.message")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Sidebar ── col-span-2 ─────────────── */}
          <div className={`lg:col-span-2 space-y-5 order-2 lg:order-1 transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>

            {/* Contact info cards */}
            <div className="space-y-3">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <a
                    key={i}
                    href={info.link}
                    className="group block transition-all duration-300"
                    style={{
                      padding: "18px 20px",
                      background: "radial-gradient(ellipse at top-left, var(--navy-surface) 0%, var(--navy-mid) 100%)",
                      border: "1px solid rgba(221, 167, 165,0.1)",
                      borderLeft: "3px solid rgba(221, 167, 165,0.3)",
                      borderRadius: "20px",
                      textDecoration: "none",
                      display: "block",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor     = "rgba(221, 167, 165,0.3)";
                      el.style.borderLeftColor = "#dda7a5";
                      el.style.boxShadow       = "0 8px 24px rgba(221, 167, 165,0.1)";
                      el.style.transform       = isRTL ? "translateX(-3px)" : "translateX(3px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor     = "rgba(221, 167, 165,0.1)";
                      el.style.borderLeftColor = "rgba(221, 167, 165,0.3)";
                      el.style.boxShadow       = "none";
                      el.style.transform       = "translateX(0)";
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div style={{
                        width: "40px", height: "40px", flexShrink: 0,
                        border: "1px solid rgba(221, 167, 165,0.25)", borderRadius: "50%",
                        background: "rgba(221, 167, 165,0.07)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "border-color 0.3s, background 0.3s",
                      }}
                        className="group-hover:!border-[rgba(221,167,165,0.5)] group-hover:!bg-[rgba(221,167,165,0.12)]"
                      >
                        <Icon size={16} style={{ color: "#dda7a5", strokeWidth: 1.6 }} />
                      </div>
                      <div>
                        <p style={{
                          color: "var(--slate)", fontSize: "0.58rem",
                          letterSpacing: "0.2em", textTransform: "uppercase",
                          fontFamily: "'Sora', sans-serif", fontWeight: 700,
                          marginBottom: "4px",
                        }}>
                          {info.title}
                        </p>
                        <p style={{
                          color: "var(--cream)",
                          fontSize: "0.88rem",
                          fontFamily: "'Sora', sans-serif",
                          wordBreak: "break-all",
                        }} dir="ltr">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social links */}
            <div
              style={{
                padding: "24px 20px",
                background: "radial-gradient(ellipse at top-left, var(--navy-surface) 0%, var(--navy-mid) 100%)",
                border: "1px solid rgba(221, 167, 165,0.1)",
                borderTop: "2px solid rgba(221, 167, 165,0.25)",
                borderRadius: "24px",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="block h-px w-6" style={{ background: "var(--gold)" }} />
                <span style={{
                  color: "var(--gold-dim)", fontSize: "0.58rem",
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  fontFamily: "'Sora', sans-serif", fontWeight: 700,
                }}>
                  {t("social.title")}
                </span>
              </div>

              <div className="flex gap-2 flex-wrap">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  if (!Icon) return null;
                  return (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="group relative flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{
                        width: "42px", height: "42px",
                        border: "1px solid rgba(221, 167, 165,0.22)", borderRadius: "50%",
                        background: "transparent",
                        color: "rgba(221, 167, 165,0.6)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(221, 167, 165,0.6)";
                        el.style.color       = "#dda7a5";
                        el.style.background  = "rgba(221, 167, 165,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(221, 167, 165,0.22)";
                        el.style.color       = "rgba(221, 167, 165,0.6)";
                        el.style.background  = "transparent";
                      }}
                    >
                      <Icon size={15} className="relative z-10" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Decorative quote block */}
            <div style={{
              padding: "20px 20px 20px 24px",
              borderLeft: "3px solid rgba(221, 167, 165,0.35)",
              background: "rgba(221, 167, 165,0.03)",
              borderRadius: "0 16px 16px 0",
            }}>
              <span style={{
                display: "block",
                fontFamily: "'Playfair Display', serif",
                color: "rgba(221, 167, 165,0.2)",
                fontSize: "2.5rem",
                lineHeight: 0.7,
                marginBottom: "8px",
              }}>"</span>
              <p style={{
                color: "var(--cream-dim)",
                fontSize: "0.85rem",
                fontFamily: "'Sora', sans-serif",
                fontStyle: "italic",
                lineHeight: 1.7,
              }}>
                {t("badge")}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}