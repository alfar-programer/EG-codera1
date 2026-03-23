import { useRef, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);
export let smoother;

const NAV_LINKS = [
  { label: "Home",     to: "/"        },
  { label: "Services", to: "/services" },
  { label: "About",    to: "/about"    },
  { label: "Contact",  to: "/contact"  },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const headerRef                 = useRef(null);
  const location                  = useLocation();
  const navigate                  = useNavigate();
  const isHome                    = location.pathname === "/";

  /* ── ScrollSmoother: only on home ── */
  useGSAP(() => {
    if (isHome) {
      smoother = ScrollSmoother.create({
        wrapper:              "#smooth-wrapper",
        content:              "#smooth-content",
        smooth:               1.7,
        speed:                1.7,
        effects:              true,
        autoResize:           true,
        ignoreMobileResize:   true,
      });
      smoother.scrollTop(0);
      smoother.paused(true);
      window.addEventListener("resize", () => ScrollSmoother.refresh(true));
    }

    /* Scroll-based backdrop */
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Entrance animation */
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
    );

    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  /* Close drawer on route change */
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  /* Smooth-scroll for on-page anchors (home only) */
  const handleNavClick = (e, to) => {
    if (isHome && to.startsWith("#") && smoother) {
      e.preventDefault();
      smoother.scrollTo(to, true, "top top");
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
        {/* Logo — always goes home */}
        <NavLink to="/" className="navbar__logo" data-cursor="disable">
          <img src="/images/logo.png" alt="EG Codera Logo" />
          <span className="navbar__logo-text">EG CODERA</span>
        </NavLink>

        {/* Desktop nav — centred */}
        <nav className="navbar__links">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `nav-link${isActive ? " nav-link--active" : ""}`
              }
              onClick={(e) => handleNavClick(e, to)}
            >
              <span className="nav-link__inner">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <NavLink
          to="/contact"
          className="navbar__cta"
          data-cursor="disable"
        >
          <span>Let&apos;s Talk</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </NavLink>

        {/* Hamburger */}
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
        {/* Drawer background decoration */}
        <div className="drawer-deco" aria-hidden="true">
          <div className="drawer-deco-ring drawer-deco-ring--1" />
          <div className="drawer-deco-ring drawer-deco-ring--2" />
        </div>

        <nav>
          {NAV_LINKS.map(({ label, to }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `drawer-link${isActive ? " drawer-link--active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <span className="drawer-link__num">0{i + 1}</span>
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="navbar__cta drawer-cta"
            onClick={() => setMenuOpen(false)}
          >
            Let&apos;s Talk
          </NavLink>
        </nav>
      </div>

      <div className="landing-circle1" />
      <div className="landing-circle2" />
      <div className="nav-fade" />
    </>
  );
};

export default Navbar;
