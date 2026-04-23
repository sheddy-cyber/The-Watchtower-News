// frontend/src/pages/CareersPage.jsx
import { Link } from "react-router-dom";
import Icon from "../components/ui/Icon";

const OPENINGS = [
  { title: "Senior Investigative Reporter", dept: "Editorial", location: "London / Remote", type: "Full-time" },
  { title: "Data Journalist", dept: "Editorial", location: "Remote", type: "Full-time" },
  { title: "Video Producer", dept: "Multimedia", location: "New York", type: "Full-time" },
  { title: "Frontend Engineer", dept: "Engineering", location: "Remote", type: "Full-time" },
  { title: "Audience Growth Analyst", dept: "Strategy", location: "London", type: "Full-time" },
  { title: "Editorial Assistant (Sports)", dept: "Editorial", location: "London", type: "Contract" },
];

const VALUES = [
  { icon: "eye",       title: "Ownership", body: "Every person at The Watchtower is accountable for the quality of their work. We give autonomy and expect excellence in return." },
  { icon: "globe",     title: "Curiosity", body: "We hire people who ask why. Journalists, engineers, and operators alike — we believe intellectual curiosity improves everything we do." },
  { icon: "heart",     title: "Kindness", body: "We work in a high-pressure industry. We've found that treating colleagues with genuine warmth makes us harder working, not softer." },
  { icon: "checkCircle", title: "Impact", body: "We want our work to matter. That means prioritising stories and projects with real-world consequences over vanity metrics." },
];

export default function CareersPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
        <Link to="/" style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.08em", color: "rgba(212,175,55,0.45)", textTransform: "uppercase" }}>Home</Link>
        <span style={{ color: "rgba(212,175,55,0.25)" }}>›</span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.08em", color: "var(--gold-dim)", textTransform: "uppercase" }}>Careers</span>
      </div>

      {/* Hero */}
      <div style={{ borderLeft: "3px solid var(--gold)", paddingLeft: 28, marginBottom: 52 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "var(--text-heading)", lineHeight: 1.15, marginBottom: 16 }}>
          Work that matters
        </h1>
        <p style={{ fontSize: 17, color: "var(--text-body)", lineHeight: 1.8, maxWidth: 580 }}>
          We're building a newsroom for the next century. We're looking for journalists, engineers, and strategists who believe quality journalism is worth fighting for — and who want to help us do it.
        </p>
      </div>

      <hr className="gold-rule" style={{ marginBottom: 52 }} />

      {/* Values */}
      <div style={{ marginBottom: 52 }}>
        <div className="section-header" style={{ marginBottom: 28 }}>
          <Icon name="heart" size={22} style={{ color: "var(--gold)" }} />
          <h2 className="section-title">How We Work</h2>
          <div className="section-line" />
        </div>
        <div className="grid-2">
          {VALUES.map(({ icon, title, body }) => (
            <div key={title} style={{ background: "var(--surface)", border: "1px solid var(--gold-border)", padding: "22px 24px", borderRadius: "var(--radius)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <Icon name={icon} size={17} style={{ color: "var(--gold)", flexShrink: 0 }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "var(--champagne)" }}>{title}</h3>
              </div>
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.75 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Roles */}
      <div style={{ marginBottom: 52 }}>
        <div className="section-header" style={{ marginBottom: 24 }}>
          <Icon name="newspaper" size={22} style={{ color: "var(--gold)" }} />
          <h2 className="section-title">Open Positions</h2>
          <div className="section-line" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {OPENINGS.map((role) => (
            <div
              key={role.title}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--gold-border)",
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
                borderRadius: "var(--radius)",
                transition: "border-color 0.2s, background 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.45)"; e.currentTarget.style.background = "#1e1e1e"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--gold-border)"; e.currentTarget.style.background = "var(--surface)"; }}
            >
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--champagne)", marginBottom: 5 }}>
                  {role.title}
                </p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 10, color: "var(--gold-dim)", letterSpacing: "0.05em" }}>
                    {role.dept}
                  </span>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 4 }}>
                    <Icon name="globe" size={10} style={{ opacity: 0.5 }} /> {role.location}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-ui)", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", padding: "2px 7px",
                    background: role.type === "Full-time" ? "rgba(94,203,161,0.12)" : "rgba(212,175,55,0.1)",
                    color: role.type === "Full-time" ? "#5ecba1" : "var(--gold-dim)",
                    border: role.type === "Full-time" ? "1px solid rgba(94,203,161,0.25)" : "1px solid var(--gold-border)",
                    borderRadius: 1,
                  }}>
                    {role.type}
                  </span>
                </div>
              </div>
              <Icon name="arrowRight" size={16} style={{ color: "rgba(212,175,55,0.4)", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Spontaneous applications */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--gold-border)", padding: "28px 32px", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 19, color: "var(--champagne)", marginBottom: 6 }}>
            Don't see your role?
          </p>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65 }}>
            We review spontaneous applications from exceptional candidates year-round.
          </p>
        </div>
        <Link to="/contact" className="btn btn-outline" style={{ gap: 7, flexShrink: 0 }}>
          Get In Touch <Icon name="arrowRight" size={12} />
        </Link>
      </div>

    </div>
  );
}
