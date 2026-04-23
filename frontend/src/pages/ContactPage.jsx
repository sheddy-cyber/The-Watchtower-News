// frontend/src/pages/ContactPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/ui/Icon";
import { useToast } from "../context/ToastContext";

const DEPARTMENTS = [
  { icon: "newspaper", label: "Editorial", email: "editorial@watchtower.com", desc: "News tips, corrections, and story pitches" },
  { icon: "user",      label: "Press & PR", email: "press@watchtower.com",     desc: "Media enquiries and interview requests" },
  { icon: "mail",      label: "Subscriptions", email: "subscriptions@watchtower.com", desc: "Newsletter and account questions" },
  { icon: "alertTriangle", label: "Legal",  email: "legal@watchtower.com",     desc: "Right of reply and legal matters" },
];

export default function ContactPage() {
  const showToast = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission — replace with real API call
    await new Promise((r) => setTimeout(r, 900));
    showToast("Message sent. We'll be in touch within two business days.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);
  };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
        <Link to="/" style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.08em", color: "rgba(212,175,55,0.45)", textTransform: "uppercase" }}>
          Home
        </Link>
        <span style={{ color: "rgba(212,175,55,0.25)" }}>›</span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.08em", color: "var(--gold-dim)", textTransform: "uppercase" }}>
          Contact
        </span>
      </div>

      {/* Hero */}
      <div style={{ marginBottom: 52 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "var(--text-heading)", marginBottom: 14 }}>
          Get in touch
        </h1>
        <p style={{ fontSize: 17, color: "var(--text-body)", lineHeight: 1.8, maxWidth: 560 }}>
          Whether you have a news tip, a correction, or just a question — we want to hear from you. We read every message and respond to all substantive enquiries.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 40, alignItems: "start" }}>

        {/* Form */}
        <div>
          <div className="section-header" style={{ marginBottom: 24 }}>
            <Icon name="mail" size={22} style={{ color: "var(--gold)" }} />
            <h2 className="section-title">Send a Message</h2>
            <div className="section-line" />
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid-2" style={{ marginBottom: 0 }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="input" type="text" value={form.name} onChange={set("name")} placeholder="Jane Smith" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="input" type="email" value={form.email} onChange={set("email")} placeholder="jane@example.com" required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input className="input" type="text" value={form.subject} onChange={set("subject")} placeholder="What's this about?" required />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="input"
                value={form.message}
                onChange={set("message")}
                placeholder="Tell us more…"
                required
                rows={6}
                style={{ resize: "vertical", lineHeight: 1.7 }}
              />
            </div>

            <button type="submit" className="btn btn-gold" style={{ padding: "11px 28px", gap: 7 }} disabled={submitting}>
              {submitting ? <span className="spinner" /> : (
                <>Send Message <Icon name="arrowRight" size={13} /></>
              )}
            </button>
          </form>
        </div>

        {/* Department contacts */}
        <div>
          <div className="section-header" style={{ marginBottom: 24 }}>
            <Icon name="user" size={22} style={{ color: "var(--gold)" }} />
            <h2 className="section-title" style={{ fontSize: 16 }}>Direct Contacts</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {DEPARTMENTS.map(({ icon, label, email, desc }) => (
              <div key={label} style={{
                background: "var(--surface)", border: "1px solid var(--gold-border)",
                padding: "16px 18px", borderRadius: "var(--radius)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Icon name={icon} size={14} style={{ color: "var(--gold)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-dim)" }}>
                    {label}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>{desc}</p>
                <a href={`mailto:${email}`} style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "var(--gold)", letterSpacing: "0.03em" }}>
                  {email}
                </a>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, padding: "16px 18px", background: "rgba(212,175,55,0.05)", border: "1px solid var(--gold-border)", borderRadius: "var(--radius)" }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: 8 }}>
              Response Times
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
              General enquiries: 2 business days<br />
              News tips: reviewed within 24 hours<br />
              Legal matters: 5 business days
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
