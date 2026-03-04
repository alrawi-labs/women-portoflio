"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail, Phone, MapPin, Send, CheckCircle,
  Instagram, Github, Linkedin, Twitter, Sparkles,
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

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 18px",
    background: "rgba(201,116,138,0.05)",
    border: "1px solid rgba(201,116,138,0.22)",
    borderRadius: "14px",
    color: "var(--rose-pale)",
    fontSize: "0.9rem",
    fontFamily: "'Jost', sans-serif",
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "8px",
    color: "var(--rose-light)",
    fontSize: "0.62rem",
    fontWeight: 600,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontFamily: "'Jost', sans-serif",
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex items-center"
      style={{ background: "var(--plum)", scrollMarginTop: "20px" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* ── Background ─────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Rose glow blobs */}
        <div style={{
          position: "absolute", width: "600px", height: "600px",
          top: "-150px", right: "-150px", borderRadius: "50%",
          filter: "blur(130px)", opacity: 0.35,
          background: "radial-gradient(circle, rgba(201,116,138,0.2) 0%, rgba(154,82,104,0.07) 50%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", width: "500px", height: "500px",
          bottom: "-100px", left: "-100px", borderRadius: "50%",
          filter: "blur(120px)", opacity: 0.2,
          background: "radial-gradient(circle, rgba(232,160,176,0.15) 0%, transparent 70%)",
        }} />
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(201,116,138,0.05) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
        {/* Floral watermark */}
        <svg className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.035]" width="220" height="220" viewBox="0 0 220 220">
          {[0,45,90,135,180,225,270,315].map((deg, i) => (
            <ellipse key={i} cx="110" cy="110" rx="18" ry="50"
              fill="rgba(201,116,138,1)"
              transform={`rotate(${deg} 110 110) translate(0,-58)`} />
          ))}
          <circle cx="110" cy="110" r="16" fill="rgba(201,116,138,1)" />
        </svg>
        {/* Faint ring accents */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          <circle cx="10%" cy="20%" r="160" fill="none" stroke="rgba(201,116,138,0.6)" strokeWidth="0.8" />
          <circle cx="90%" cy="75%" r="200" fill="none" stroke="rgba(232,160,176,0.5)" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl w-full">

        {/* ── Section Header ───────────────────────── */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {/* Section badge */}
          <div className="flex justify-center mb-6">
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 20px",
              background: "rgba(201,116,138,0.08)",
              border: "1px solid rgba(201,116,138,0.25)",
              borderRadius: "50px",
              color: "var(--rose-light)",
              fontSize: "0.6rem", fontWeight: 600,
              letterSpacing: "0.25em", textTransform: "uppercase",
              fontFamily: "'Jost', sans-serif",
            }}>
              <Sparkles size={10} style={{ color: "var(--rose)" }} />
              § 10 — {t("sectionCategory")}
              <Sparkles size={10} style={{ color: "var(--rose)" }} />
            </span>
          </div>

          {/* Title */}
          <div className="flex items-center justify-center gap-5 mb-5">
            <div style={{
              width: "48px", height: "48px",
              border: "1px solid rgba(201,116,138,0.3)", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,116,138,0.15), rgba(154,82,104,0.07))",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Mail size={20} style={{ color: "var(--rose-light)", strokeWidth: 1.5 }} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 600, fontStyle: "italic",
              background: "linear-gradient(135deg, var(--rose-pale) 0%, var(--rose-light) 50%, var(--rose) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              lineHeight: 1.2,
            }}>
              {t("title")}
            </h2>
          </div>

          <p style={{
            color: "var(--slate)", fontSize: "1rem",
            maxWidth: "520px", margin: "0 auto", lineHeight: 1.8,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic", fontWeight: 400,
          }}>
            {t("subtitle")}
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mt-7">
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, transparent, var(--rose))" }} />
            <div style={{ display: "flex", gap: "5px" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: i === 1 ? "6px" : "4px", height: i === 1 ? "6px" : "4px",
                  borderRadius: "50%", background: i === 1 ? "var(--rose)" : "var(--rose-dim)",
                  opacity: i === 1 ? 1 : 0.5,
                }} />
              ))}
            </div>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, var(--rose), transparent)" }} />
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
                background: "linear-gradient(145deg, var(--plum-surface) 0%, var(--plum-mid) 100%)",
                border: "1px solid rgba(201,116,138,0.15)",
                borderRadius: "24px",
                padding: "36px 32px",
              }}
            >
              {/* Dot-grid */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(201,116,138,0.04) 1px, transparent 0)",
                backgroundSize: "28px 28px",
              }} />
              {/* Top shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{
                background: "linear-gradient(90deg, transparent, var(--rose), transparent)",
              }} />
              {/* Inner glow */}
              <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(201,116,138,0.07) 0%, transparent 70%)",
              }} />

              {/* Form label */}
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div style={{ width: "24px", height: "1px", background: "var(--rose)" }} />
                <span style={{
                  color: "var(--rose-dim)", fontSize: "0.6rem",
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  fontFamily: "'Jost', sans-serif", fontWeight: 600,
                }}>
                  {t("inquiryForm")}
                </span>
                <div style={{ flex: 1, maxWidth: "60px", height: "1px", background: "linear-gradient(90deg, var(--rose-dim), transparent)" }} />
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
                          e.currentTarget.style.borderColor = "rgba(201,116,138,0.55)";
                          e.currentTarget.style.boxShadow   = "0 0 0 4px rgba(201,116,138,0.08)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "rgba(201,116,138,0.22)";
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
                          e.currentTarget.style.borderColor = "rgba(201,116,138,0.55)";
                          e.currentTarget.style.boxShadow   = "0 0 0 4px rgba(201,116,138,0.08)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "rgba(201,116,138,0.22)";
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
                        e.currentTarget.style.borderColor = "rgba(201,116,138,0.55)";
                        e.currentTarget.style.boxShadow   = "0 0 0 4px rgba(201,116,138,0.08)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(201,116,138,0.22)";
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
                        e.currentTarget.style.borderColor = "rgba(201,116,138,0.55)";
                        e.currentTarget.style.boxShadow   = "0 0 0 4px rgba(201,116,138,0.08)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(201,116,138,0.22)";
                        e.currentTarget.style.boxShadow   = "none";
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      padding: "14px 28px",
                      background: "linear-gradient(135deg, var(--rose-light) 0%, var(--rose) 55%, var(--rose-dim) 100%)",
                      color: "var(--plum)",
                      borderRadius: "50px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "'Jost', sans-serif",
                      boxShadow: "0 4px 20px rgba(201,116,138,0.3)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,116,138,0.45)")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,116,138,0.3)")}
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full animate-spin border-2 border-[var(--plum)]/30 border-t-[var(--plum)] relative z-10" />
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
                      border: "2px solid var(--rose)",
                      borderRadius: "50%",
                      background: "rgba(201,116,138,0.1)",
                    }}
                  >
                    <CheckCircle size={28} style={{ color: "var(--rose-light)" }} />
                  </div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: "var(--rose-pale)", fontSize: "1.4rem",
                    fontWeight: 600, fontStyle: "italic", marginBottom: "8px",
                  }}>
                    {t("success.title")}
                  </h3>
                  <p style={{ color: "var(--slate)", fontSize: "0.9rem", fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
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
                      background: "linear-gradient(145deg, var(--plum-surface) 0%, var(--plum-mid) 100%)",
                      border: "1px solid rgba(201,116,138,0.12)",
                      borderLeft: "3px solid rgba(201,116,138,0.3)",
                      borderRadius: "16px",
                      textDecoration: "none",
                      display: "block",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor     = "rgba(201,116,138,0.35)";
                      el.style.borderLeftColor = "var(--rose)";
                      el.style.boxShadow       = "0 8px 28px rgba(154,82,104,0.2)";
                      el.style.transform       = isRTL ? "translateX(-3px)" : "translateX(3px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor     = "rgba(201,116,138,0.12)";
                      el.style.borderLeftColor = "rgba(201,116,138,0.3)";
                      el.style.boxShadow       = "none";
                      el.style.transform       = "translateX(0)";
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div style={{
                        width: "40px", height: "40px", flexShrink: 0,
                        border: "1px solid rgba(201,116,138,0.25)", borderRadius: "50%",
                        background: "rgba(201,116,138,0.07)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "border-color 0.3s, background 0.3s",
                      }}
                        className="group-hover:!border-[rgba(201,116,138,0.5)] group-hover:!bg-[rgba(201,116,138,0.12)]"
                      >
                        <Icon size={16} style={{ color: "var(--rose-light)", strokeWidth: 1.5 }} />
                      </div>
                      <div>
                        <p style={{
                          color: "var(--slate)", fontSize: "0.58rem",
                          letterSpacing: "0.2em", textTransform: "uppercase",
                          fontFamily: "'Jost', sans-serif", fontWeight: 600,
                          marginBottom: "4px",
                        }}>
                          {info.title}
                        </p>
                        <p style={{
                          color: "var(--rose-pale)", fontSize: "0.88rem",
                          fontFamily: "'Jost', sans-serif", fontWeight: 300,
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
            <div style={{
              padding: "24px 20px",
              background: "linear-gradient(145deg, var(--plum-surface) 0%, var(--plum-mid) 100%)",
              border: "1px solid rgba(201,116,138,0.12)",
              borderRadius: "20px",
              position: "relative", overflow: "hidden",
            }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{
                background: "linear-gradient(90deg, transparent, rgba(201,116,138,0.4), transparent)",
              }} />

              <div className="flex items-center gap-3 mb-5">
                <div style={{ width: "20px", height: "1px", background: "var(--rose)" }} />
                <span style={{
                  color: "var(--rose-dim)", fontSize: "0.58rem",
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  fontFamily: "'Jost', sans-serif", fontWeight: 600,
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
                        border: "1px solid rgba(201,116,138,0.22)", borderRadius: "50%",
                        background: "transparent",
                        color: "var(--rose-light)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(201,116,138,0.6)";
                        el.style.background  = "rgba(201,116,138,0.1)";
                        el.style.boxShadow   = "0 0 14px rgba(201,116,138,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(201,116,138,0.22)";
                        el.style.background  = "transparent";
                        el.style.boxShadow   = "none";
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
              borderLeft: "3px solid rgba(201,116,138,0.35)",
              borderRadius: "0 16px 16px 0",
              background: "rgba(201,116,138,0.03)",
            }}>
              <span style={{
                display: "block",
                fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(201,116,138,0.2)",
                fontSize: "2.5rem",
                lineHeight: 0.7,
                marginBottom: "10px",
              }}>"</span>
              <p style={{
                color: "var(--rose-light)",
                fontSize: "0.88rem",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                lineHeight: 1.75,
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