// frontend/src/pages/TermsPage.jsx
import { Link } from "react-router-dom";
import Icon from "../components/ui/Icon";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    body: `By accessing or using The Watchtower website or any of its associated services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

We reserve the right to update these terms at any time. Continued use of the service following notification of changes constitutes acceptance of the revised terms.`,
  },
  {
    title: "User Accounts",
    body: `You must be at least 16 years of age to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.

You agree to provide accurate, current, and complete information when registering and to keep your profile information up to date. We reserve the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    title: "Acceptable Use",
    body: `You may use The Watchtower for personal, non-commercial purposes. You may not use the service to distribute spam, malware, or any content that is unlawful, defamatory, abusive, or infringes third-party rights.

You may not attempt to gain unauthorised access to any part of the service, interfere with its operation, or use automated tools to scrape or harvest content without our express written permission.`,
  },
  {
    title: "Intellectual Property",
    body: `All content published on The Watchtower — including articles, photographs, graphics, and multimedia — is owned by The Watchtower Publications Ltd or its licensors and is protected by copyright law.

You may share individual articles via social media or link to them freely. Reproduction of substantial portions of our content without written authorisation is prohibited. Fair use excerpts for the purpose of commentary or criticism are permitted.`,
  },
  {
    title: "Disclaimer of Warranties",
    body: `The Watchtower is provided on an "as is" basis. While we strive for accuracy, we make no warranty that the service will be uninterrupted, error-free, or free of inaccuracies. News is by nature time-sensitive and subject to revision.

To the fullest extent permitted by law, we disclaim all warranties, express or implied, including but not limited to warranties of merchantability and fitness for a particular purpose.`,
  },
  {
    title: "Limitation of Liability",
    body: `To the fullest extent permitted by applicable law, The Watchtower Publications Ltd shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of or inability to use the service.

Our total liability to you for any claim arising out of or in connection with these terms shall not exceed the greater of £100 or the amount you have paid to us in the 12 months preceding the claim.`,
  },
  {
    title: "Governing Law",
    body: `These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.`,
  },
];

export default function TermsPage() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
        <Link to="/" style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.08em", color: "rgba(212,175,55,0.45)", textTransform: "uppercase" }}>Home</Link>
        <span style={{ color: "rgba(212,175,55,0.25)" }}>›</span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.08em", color: "var(--gold-dim)", textTransform: "uppercase" }}>Terms of Service</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <Icon name="newspaper" size={22} style={{ color: "var(--gold)" }} />
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "var(--text-heading)" }}>
            Terms of Service
          </h1>
        </div>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "rgba(212,175,55,0.4)", letterSpacing: "0.08em", marginBottom: 16 }}>
          Last revised: 1 January 2026 · Effective: 1 January 2026
        </p>
        <p style={{ fontSize: 17, color: "var(--text-body)", lineHeight: 1.8 }}>
          These terms govern your use of The Watchtower and its associated services. Please read them carefully. If you have any questions, our legal team is available at <a href="mailto:legal@watchtower.com" style={{ color: "var(--gold)" }}>legal@watchtower.com</a>.
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

      {/* Footer note */}
      <div style={{ marginTop: 52, padding: "20px 24px", background: "rgba(212,175,55,0.04)", border: "1px solid var(--gold-border)", borderRadius: "var(--radius)" }}>
        <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>
          <strong style={{ color: "var(--text-muted)" }}>The Watchtower Publications Ltd</strong> · Registered in England & Wales · Company No. 00892341<br />
          Registered address: 14 Fleet Street, London, EC4Y 1AA
        </p>
      </div>

    </div>
  );
}
