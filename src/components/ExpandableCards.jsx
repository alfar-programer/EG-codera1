import { useState, useRef, useEffect } from "react";
import "./styles/ExpandableCards.css";

const services = [
  {
    id: "develop",
    number: "01",
    title: "DEVELOP",
    subtitle: "Engineering & Development",
    description:
      "We build fast, scalable, and secure digital products. From dynamic modern web applications to complex enterprise solutions, our engineering team uses cutting-edge technologies and best practices to transform your ideas into robust, high-performing software.",
    tags: ["React", "Node.js", "Next.js", "TypeScript", "APIs"],
    stat: { value: "200+", label: "Projects Shipped" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "design",
    number: "02",
    title: "DESIGN",
    subtitle: "UI/UX & Visual Identity",
    description:
      "We craft beautiful, intuitive, and highly engaging user experiences. By blending modern aesthetics with deep user-centric research, we design premium interfaces and immersive visual identities that captivate your audience and elevate your brand's digital presence.",
    tags: ["Figma", "Branding", "Motion", "Prototyping", "Systems"],
    stat: { value: "98%", label: "Client Satisfaction" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: "qa",
    number: "03",
    title: "QA",
    subtitle: "Quality Assurance & Testing",
    description:
      "We ensure flawless performance with zero compromises on quality. Through rigorous automated and manual testing methodologies, our QA specialists meticulously validate every component of your software to guarantee reliability, security, and a seamless user experience.",
    tags: ["Automation", "Manual QA", "Security", "Performance", "CI/CD"],
    stat: { value: "99.9%", label: "Bug-Free Rate" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.22.45 4.56 1.23" />
        <path d="M16 5l2 2 4-4" />
      </svg>
    ),
  },
];

/* Orbiting visual panel for expanded rows */
const ServiceVisual = ({ service }) => (
  <div className="svc-visual">
    <div className="svc-visual-ring svc-visual-ring--1" />
    <div className="svc-visual-ring svc-visual-ring--2" />
    <div className="svc-visual-ring svc-visual-ring--3" />
    <div className="svc-visual-core">
      {service.icon}
    </div>
    <div className="svc-visual-stat">
      <span className="svc-visual-stat-val">{service.stat.value}</span>
      <span className="svc-visual-stat-lbl">{service.stat.label}</span>
    </div>
  </div>
);

const ExpandableCards = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  /* Cursor-tracking glow */
  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
    };

    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="services-section" ref={sectionRef}>
      {/* Cursor glow */}
      <div className="services-cursor-glow" ref={glowRef} />

      {/* Decorative grid lines */}
      <div className="services-grid-deco" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="services-grid-col" />
        ))}
      </div>

      {/* Header */}
      <div className="services-header">
        <div className="services-eyebrow-row">
          <span className="services-eyebrow-line" />
          <p className="services-eyebrow">What We Offer</p>
          <span className="services-eyebrow-line" />
        </div>
        <h2 className="services-title">
          Our <em className="services-title-accent">Services</em>
        </h2>
        <p className="services-subtitle">
          End-to-end digital solutions crafted with precision and passion
        </p>
        {/* Scan-line decorations */}
        <div className="services-scan" aria-hidden="true" />
      </div>

      {/* Accordion list */}
      <div className="services-list">
        <div className="services-list-top-line" />
        {services.map((service, i) => (
          <div
            key={service.id}
            className={`service-row${activeIndex === i ? " service-row--open" : ""}`}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          >
            {/* Huge ghost number */}
            <span className="service-ghost-num" aria-hidden="true">
              {service.number}
            </span>

            {/* Accent bar */}
            <div className="service-accent-bar" />

            {/* Top bar */}
            <div className="service-row-top">
              <span className="service-number">{service.number}</span>

              <div className="service-icon">{service.icon}</div>

              <div className="service-name-block">
                <h3 className="service-name">{service.title}</h3>
                <span className="service-sub">{service.subtitle}</span>
              </div>

              <div className="service-tags-inline">
                {service.tags.map((tag) => (
                  <span key={tag} className="service-tag">{tag}</span>
                ))}
              </div>

              <div className="service-toggle" aria-label="Toggle">
                <span className="service-toggle-line" />
                <span className="service-toggle-line service-toggle-line--v" />
              </div>
            </div>

            {/* Expandable body */}
            <div className="service-row-body">
              <div className="service-row-body-inner">
                <p className="service-desc">{service.description}</p>

                <ServiceVisual service={service} />

                <button className="service-cta">
                  Get Started
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="service-row-divider" />
          </div>
        ))}
      </div>

      {/* Ticker footer */}
      <div className="services-ticker-wrap" aria-hidden="true">
        <div className="services-ticker">
          {[...Array(3)].map((_, rep) =>
            ["DEVELOP", "DESIGN", "QA", "INNOVATE", "BUILD", "CRAFT"].map((w, j) => (
              <span key={`${rep}-${j}`} className="services-ticker-item">
                {w} <span className="services-ticker-dot">✦</span>
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ExpandableCards;
