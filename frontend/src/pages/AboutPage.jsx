// frontend/src/pages/AboutPage.jsx
import { Link } from "react-router-dom";
import Icon from "../components/ui/Icon";

const PILLARS = [
  {
    icon: "newspaper",
    title: "Independent Reporting",
    body: "We accept no corporate sponsorship that could influence our editorial decisions. Our journalism is funded solely by our readers and subscription revenue.",
  },
  {
    icon: "globe",
    title: "Global Coverage",
    body: "With correspondents across six continents, we bring you stories from every corner of the world — told with context, not just headlines.",
  },
  {
    icon: "eye",
    title: "Radical Transparency",
    body: "When we make mistakes, we correct them prominently and immediately. Our sources, methods, and conflicts of interest are disclosed openly.",
  },
  {
    icon: "heart",
    title: "Public Interest First",
    body: "Every story we publish passes a simple test: does this serve the public's right to know? If the answer is no, we don't publish it.",
  },
];

const TEAM = [
  { name: "Eleanor Hargrave", role: "Editor-in-Chief", joined: "2009" },
  { name: "James Okonkwo", role: "Deputy Editor, World", joined: "2013" },
  { name: "Priya Nair", role: "Head of Investigations", joined: "2015" },
  { name: "Marcus Delacroix", role: "Technology Editor", joined: "2017" },
  { name: "Sofia Brennan", role: "Health & Science Editor", joined: "2018" },
  { name: "David Achebe", role: "Sports Editor", joined: "2020" },
];

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
        <Link to="/" style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.08em", color: "rgba(212,175,55,0.45)", textTransform: "uppercase" }}>
          Home
        </Link>
        <span style={{ color: "rgba(212,175,55,0.25)" }}>›</span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.08em", color: "var(--gold-dim)", textTransform: "uppercase" }}>
          About Us
        </span>
      </div>

      {/* Hero */}
      <div style={{ borderLeft: "3px solid var(--gold)", paddingLeft: 28, marginBottom: 56 }}>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: 12 }}>
          Established 1892
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "var(--text-heading)", lineHeight: 1.15, marginBottom: 20 }}>
          More than a century of truth-telling
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.8vw, 19px)", color: "var(--text-body)", lineHeight: 1.8, maxWidth: 640 }}>
          The Watchtower was founded in 1892 by journalist and reformer Adelaide Marsh, who believed the public deserved a newspaper that answered to no-one but its readers. That conviction remains our north star today.
        </p>
      </div>

      {/* Gold rule */}
      <hr className="gold-rule" style={{ marginBottom: 56 }} />

      {/* Mission */}
      <div style={{ marginBottom: 56 }}>
        <div className="section-header" style={{ marginBottom: 24 }}>
          <Icon name="newspaper" size={22} style={{ color: "var(--gold)" }} />
          <h2 className="section-title">Our Mission</h2>
          <div className="section-line" />
        </div>
        <p style={{ fontSize: 17, color: "var(--text-body)", lineHeight: 1.85, marginBottom: 16 }}>
          We exist to hold power to account, to give voice to those who go unheard, and to make sense of a complicated world for our readers. We believe an informed public is the foundation of a functioning democracy.
        </p>
        <p style={{ fontSize: 17, color: "var(--text-body)", lineHeight: 1.85 }}>
          We do not chase clicks or optimise for outrage. We measure our success by the impact of our journalism — laws changed, wrongdoing exposed, stories told that would otherwise have stayed untold.
        </p>
      </div>

      {/* Pillars */}
      <div style={{ marginBottom: 56 }}>
        <div className="section-header" style={{ marginBottom: 28 }}>
          <Icon name="checkCircle" size={22} style={{ color: "var(--gold)" }} />
          <h2 className="section-title">Our Principles</h2>
          <div className="section-line" />
        </div>
        <div className="grid-2">
          {PILLARS.map(({ icon, title, body }) => (
            <div
              key={title}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--gold-border)",
                padding: "24px 26px",
                borderRadius: "var(--radius)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <Icon name={icon} size={18} style={{ color: "var(--gold)", flexShrink: 0 }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "var(--champagne)" }}>
                  {title}
                </h3>
              </div>
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.75 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div style={{ marginBottom: 56 }}>
        <div className="section-header" style={{ marginBottom: 28 }}>
          <Icon name="user" size={22} style={{ color: "var(--gold)" }} />
          <h2 className="section-title">Editorial Leadership</h2>
          <div className="section-line" />
        </div>
        <div className="grid-3">
          {TEAM.map(({ name, role, joined }) => (
            <div
              key={name}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--gold-border)",
                padding: "20px 22px",
                borderRadius: "var(--radius)",
              }}
            >
              {/* Initials avatar */}
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(212,175,55,0.1)", border: "1px solid var(--gold-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontSize: 16, color: "var(--gold)",
                marginBottom: 14,
              }}>
                {name.split(" ").map(n => n[0]).join("")}
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--champagne)", marginBottom: 4 }}>
                {name}
              </p>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--gold-dim)", letterSpacing: "0.05em", marginBottom: 2 }}>
                {role}
              </p>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, color: "rgba(212,175,55,0.3)", letterSpacing: "0.05em" }}>
                Joined {joined}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ borderTop: "1px solid var(--gold-border)", paddingTop: 40, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--champagne)", marginBottom: 6 }}>
            Want to get in touch?
          </p>
          <p style={{ fontSize: 15, color: "var(--muted)" }}>Our editorial team reads every message.</p>
        </div>
        <Link to="/contact" className="btn btn-gold" style={{ padding: "11px 28px", gap: 7 }}>
          Contact Us
          <Icon name="arrowRight" size={13} />
        </Link>
      </div>

    </div>
  );
}
