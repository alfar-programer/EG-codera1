import { useState, useRef } from "react";
import LiquidEther from "../components/LiquidEther";
import Navbar from "../components/Navbar";
import Cursor from "../components/Cursor";
import "./styles/ContactPage.css";

const SERVICES = [
  "Web Development",
  "UI/UX Design",
  "Quality Assurance",
  "Full-Stack App",
  "Branding & Identity",
  "Other",
];

const BUDGETS = [
  "< $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/alfar-programer",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

const ContactPage = () => {
  const [form, setForm]       = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState("idle"); // idle | sending | success | error
  const [focused, setFocused] = useState(null);
  const formRef               = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                        e.name    = "Name is required.";
    if (!form.email.trim())                       e.email   = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                                  e.email   = "Enter a valid email.";
    if (!form.message.trim())                     e.message = "Message is required.";
    return e;
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  };

  const handleReset = () => {
    setForm({ name: "", email: "", service: "", budget: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  return (
    <div className="cp-shell">
      {/* Background */}
      <div className="cp-bg">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous viscous={30}
          autoDemo autoSpeed={0.4} autoIntensity={1.8}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <Cursor />
      <Navbar />

      <main className="cp-main">

        {/* ── Top Label ──────────────────────────── */}
        <div className="cp-topbar">
          <span className="cp-topbar-line" />
          <span className="cp-topbar-text">Let&apos;s work together</span>
          <span className="cp-topbar-line" />
        </div>

        {/* ── Page Hero ──────────────────────────── */}
        <div className="cp-hero">
          <h1 className="cp-hero-title">
            Start a<br />
            <em className="cp-hero-accent">conversation.</em>
          </h1>
          <p className="cp-hero-sub">
            Tell us about your project and we&apos;ll get back within&nbsp;24&nbsp;hours.
          </p>
        </div>

        {/* ── Two-column body ────────────────────── */}
        <div className="cp-body">

          {/* LEFT — Info panel */}
          <aside className="cp-info">
            <div className="cp-info-block">
              <p className="cp-info-label">Email us at</p>
              <a href="mailto:egcodera6@gmail.com" className="cp-info-link">
                egcodera6@gmail.com
              </a>
            </div>
            <div className="cp-info-block">
              <p className="cp-info-label">Call us at</p>
              <a href="tel:+2098165967" className="cp-info-link">
                +20 98 165 9677
              </a>
            </div>
            <div className="cp-info-block">
              <p className="cp-info-label">Based in</p>
              <span className="cp-info-value">Egypt — Available Worldwide&nbsp;🌍</span>
            </div>

            {/* Social links */}
            <div className="cp-socials">
              {SOCIALS.map(({ label, href, icon }) => (
                <a key={label} href={href} className="cp-social" target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <span className="cp-social-icon">{icon}</span>
                  <span className="cp-social-label">{label}</span>
                  <svg className="cp-social-arrow" viewBox="0 0 14 14" fill="none">
                    <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </div>

            {/* Decorative badge */}
            <div className="cp-avail-badge">
              <span className="cp-avail-dot" />
              Available for new projects
            </div>
          </aside>

          {/* RIGHT — Form */}
          <div className="cp-form-wrap">
            {status === "success" ? (
              /* ── Success state ── */
              <div className="cp-success">
                <div className="cp-success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="cp-success-title">Message Sent!</h2>
                <p className="cp-success-sub">
                  Thank you for reaching out. We&apos;ll be in touch within 24 hours.
                </p>
                <button className="cp-success-btn" onClick={handleReset}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="cp-form" ref={formRef} onSubmit={handleSubmit} noValidate>

                {/* Row 1: Name + Email */}
                <div className="cp-row">
                  <div className={`cp-field ${focused === "name" ? "cp-field--focused" : ""} ${errors.name ? "cp-field--error" : ""} ${form.name ? "cp-field--filled" : ""}`}>
                    <label className="cp-label" htmlFor="cp-name">Full Name</label>
                    <input
                      id="cp-name"
                      type="text"
                      className="cp-input"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                    {errors.name && <span className="cp-error">{errors.name}</span>}
                  </div>

                  <div className={`cp-field ${focused === "email" ? "cp-field--focused" : ""} ${errors.email ? "cp-field--error" : ""} ${form.email ? "cp-field--filled" : ""}`}>
                    <label className="cp-label" htmlFor="cp-email">Email Address</label>
                    <input
                      id="cp-email"
                      type="email"
                      className="cp-input"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="john@company.com"
                      autoComplete="email"
                    />
                    {errors.email && <span className="cp-error">{errors.email}</span>}
                  </div>
                </div>

                {/* Row 2: Service + Budget */}
                <div className="cp-row">
                  <div className={`cp-field cp-field--select ${focused === "service" ? "cp-field--focused" : ""} ${form.service ? "cp-field--filled" : ""}`}>
                    <label className="cp-label" htmlFor="cp-service">Service Needed</label>
                    <select
                      id="cp-service"
                      className="cp-input cp-select"
                      value={form.service}
                      onChange={(e) => handleChange("service", e.target.value)}
                      onFocus={() => setFocused("service")}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="" disabled>Select a service…</option>
                      {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <svg className="cp-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className={`cp-field cp-field--select ${focused === "budget" ? "cp-field--focused" : ""} ${form.budget ? "cp-field--filled" : ""}`}>
                    <label className="cp-label" htmlFor="cp-budget">Project Budget</label>
                    <select
                      id="cp-budget"
                      className="cp-input cp-select"
                      value={form.budget}
                      onChange={(e) => handleChange("budget", e.target.value)}
                      onFocus={() => setFocused("budget")}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="" disabled>Select a range…</option>
                      {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <svg className="cp-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Message */}
                <div className={`cp-field ${focused === "message" ? "cp-field--focused" : ""} ${errors.message ? "cp-field--error" : ""} ${form.message ? "cp-field--filled" : ""}`}>
                  <label className="cp-label" htmlFor="cp-message">Your Message</label>
                  <textarea
                    id="cp-message"
                    className="cp-input cp-textarea"
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell us about your project, goals, and timeline…"
                    rows={6}
                  />
                  {errors.message && <span className="cp-error">{errors.message}</span>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={`cp-submit ${status === "sending" ? "cp-submit--sending" : ""}`}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <span className="cp-spinner" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>

                <p className="cp-privacy">
                  🔒 Your information is private and will never be shared.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* ── Bottom strip ───────────────────────── */}
        <div className="cp-strip">
          <span>EG CODERA © 2026</span>
          <span className="cp-strip-dot">✦</span>
          <span>Building the Digital Future</span>
        </div>

      </main>
    </div>
  );
};

export default ContactPage;
