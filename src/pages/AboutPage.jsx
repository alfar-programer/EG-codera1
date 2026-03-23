import LiquidEther from "../components/LiquidEther";
import Navbar from "../components/Navbar";
import Cursor from "../components/Cursor";
import "../pages/styles/Page.css";

const AboutPage = () => {
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
          <p className="page-eyebrow">Who We Are</p>
          <h1 className="page-hero-title">
            Built by creators,<br />
            <em className="page-hero-accent">driven by craft.</em>
          </h1>
          <p className="page-hero-sub">
            EG Codera is a full-service digital studio specialising in
            engineering, design, and quality — crafting products that leave
            a lasting impression.
          </p>
        </section>

        {/* ── Placeholder for detailed About content ── */}
        <section className="page-coming-soon">
          <span className="page-coming-badge">Full page coming soon</span>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
