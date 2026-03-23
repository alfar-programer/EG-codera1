import LiquidEther from "../components/LiquidEther";
import Navbar from "../components/Navbar";
import Cursor from "../components/Cursor";
import ExpandableCards from "../components/ExpandableCards";
import "../pages/styles/Page.css";

const ServicesPage = () => {
  return (
    <div className="page-shell">
      {/* Animated background */}
      <div className="page-bg">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          autoDemo
          autoSpeed={0.45}
          autoIntensity={2.0}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <Cursor />
      <Navbar />

      <main className="page-content">
        {/* ── Hero ─────────────────────────────────── */}
        <section className="about-hero">
          <p className="page-eyebrow">What We Do</p>
          <h1 className="page-hero-title">
            End-to-end digital<br />
            <em className="page-hero-accent">solutions.</em>
          </h1>
          <p className="page-hero-sub">
            From concept to launch — we develop, design, and quality-assure
            every product with absolute precision and passion.
          </p>
        </section>

        {/* ── Services accordion (reused from home) ── */}
        <ExpandableCards />

        {/* ── Placeholder for expanded per-service detail ── */}
        <section className="page-coming-soon">
          <span className="page-coming-badge">Detailed service pages coming soon</span>
        </section>
      </main>
    </div>
  );
};

export default ServicesPage;
