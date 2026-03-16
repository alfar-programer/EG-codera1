import { useRef, useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);
export let smoother;

const NAV_LINKS = [
  { label: "About",   href: "#about"   },
  { label: "Work",    href: "#work"    },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useGSAP(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    // Scroll-based backdrop
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Smooth nav link scrolling
    const links = document.querySelectorAll(".nav-link[data-href]");
    links.forEach((el) => {
      el.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const section = el.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
        setMenuOpen(false);
      });
    });

    window.addEventListener("resize", () => ScrollSmoother.refresh(true));

    // Entrance animation
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
    );

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleNavClick = (e, href) => {
    if (window.innerWidth > 1024 && smoother) {
      e.preventDefault();
      smoother.scrollTo(href, true, "top top");
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        data-cursor="disable"
      >
        {/* Logo */}
        <a href="/#" className="navbar__logo" data-cursor="disable">
          <img src="/images/logo.png" alt="EG Codera Logo" />
          <span className="navbar__logo-text">EG CODERA</span>
        </a>

        {/* Desktop nav links – center */}
        <nav className="navbar__links">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              data-href={href}
              className="nav-link"
              onClick={(e) => handleNavClick(e, href)}
            >
              <span className="nav-link__inner">{label}</span>
            </a>
          ))}
        </nav>

        {/* CTA button – right */}
        <a
          href="mailto:egcodera6@gmail.com"
          className="navbar__cta"
          data-cursor="disable"
        >
          <span>Let&apos;s Talk</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button
          className={`navbar__burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${menuOpen ? "navbar__drawer--open" : ""}`}>
        <nav>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              data-href={href}
              className="nav-link drawer-link"
              onClick={(e) => handleNavClick(e, href)}
            >
              {label}
            </a>
          ))}
          <a
            href="mailto:egcodera6@gmail.com"
            className="navbar__cta drawer-cta"
          >
            Let&apos;s Talk
          </a>
        </nav>
      </div>

      <div className="landing-circle1" />
      <div className="landing-circle2" />
      <div className="nav-fade" />
    </>
  );
};

export default Navbar;
