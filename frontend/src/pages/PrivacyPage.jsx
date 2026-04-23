// frontend/src/pages/PrivacyPage.jsx
import { Link } from "react-router-dom";
import Icon from "../components/ui/Icon";

const SECTIONS = [
  {
    title: "What we collect",
    body: `When you create an account we collect your name and email address. If you subscribe to our newsletter we store your email for the purpose of sending you publications. We do not collect payment information directly — any transactions are handled by our payment processor under their own privacy policy.

We also collect standard server logs, which include your IP address, browser type, and pages visited. These are retained for 90 days for security and diagnostic purposes.`,
  },
  {
    title: "How we use your data",
    body: `Your account information is used solely to authenticate you and to personalise your reading experience (for example, remembering your bookmarks). Your email address is used to send you account notifications and, if subscribed, our newsletter.

We do not sell, rent, or share your personal data with third parties for marketing purposes. We will share data with law enforcement only when legally compelled to do so.`,
  },
  {
    title: "Cookies",
    body: `We use a small number of strictly necessary cookies to keep you signed in across sessions. We do not use advertising cookies or tracking cookies. We do not use third-party analytics services that share your data with external companies.

You may disable cookies in your browser settings. Doing so will prevent you from staying signed in.`,
  },
  {
    title: "Data retention",
    body: `We retain your account data for as long as your account is active. If you request account deletion, your personal data is permanently removed within 30 days. Anonymised, aggregated analytics data (article view counts, etc.) is retained indefinitely as it cannot be tied to any individual.`,
  },
  {
    title: "Your rights",
    body: `You have the right to access, correct, or delete the personal data we hold about you at any time. You may also request a machine-readable export of your data. To exercise any of these rights, please contact us at privacy@watchtower.com.

If you are a resident of the European Economic Area, you have additional rights under the GDPR, including the right to lodge a complaint with your national supervisory authority.`,
  },
  {
    title: "Changes to this policy",
    body: `We may update this policy from time to time. When we make material changes, we will notify registered users by email at least 14 days before the changes take effect. The date of the most recent revision appears at the top of this page.`,
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
        <Link to="/" style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.08em", color: "rgba(212,175,55,0.45)", textTransform: "uppercase" }}>Home</Link>
        <span style={{ color: "rgba(212,175,55,0.25)" }}>›</span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.08em", color: "var(--gold-dim)", textTransform: "uppercase" }}>Privacy Policy</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <Icon name="eye" size={22} style={{ color: "var(--gold)" }} />
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "var(--text-heading)" }}>
            Privacy Policy
          </h1>
        </div>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "rgba(212,175,55,0.4)", letterSpacing: "0.08em", marginBottom: 16 }}>
          Last revised: 1 January 2026
        </p>
        <p style={{ fontSize: 17, color: "var(--text-body)", lineHeight: 1.8 }}>
          We believe privacy is a right, not a privilege. This policy explains clearly and completely what data we collect, why we collect it, and what rights you have over it. We have written it in plain English deliberately.
        </p>
      </div>

      <hr className="gold-rule" style={{ marginBottom: 48 }} />

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {SECTIONS.map(({ title, body }, i) => (
          <div key={title}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 14 }}>
              <span style={{
                fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700,
                color: "var(--gold)", letterSpacing: "0.1em",
                background: "rgba(212,175,55,0.1)", border: "1px solid var(--gold-border)",
                padding: "2px 8px", borderRadius: 1, flexShrink: 0,
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--champagne)" }}>
                {title}
              </h2>
            </div>
            {body.split("\n\n").map((para, j) => (
              <p key={j} style={{ fontSize: 16, color: "var(--text-body)", lineHeight: 1.85, marginBottom: 14 }}>
                {para}
              </p>
            ))}
            {i < SECTIONS.length - 1 && (
              <hr style={{ border: "none", borderTop: "1px solid rgba(212,175,55,0.08)", marginTop: 8 }} />
            )}
          </div>
        ))}
      </div>

      {/* Contact */}
      <div style={{ marginTop: 52, background: "var(--surface)", border: "1px solid var(--gold-border)", padding: "24px 28px", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
        <div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "var(--champagne)", marginBottom: 4 }}>Questions about this policy?</p>
          <p style={{ fontSize: 14, color: "var(--muted)" }}>Contact our privacy team at <a href="mailto:privacy@watchtower.com" style={{ color: "var(--gold)" }}>privacy@watchtower.com</a></p>
        </div>
        <Link to="/contact" className="btn btn-outline" style={{ gap: 7, flexShrink: 0 }}>
          Contact Us <Icon name="arrowRight" size={12} />
        </Link>
      </div>

    </div>
  );
}
