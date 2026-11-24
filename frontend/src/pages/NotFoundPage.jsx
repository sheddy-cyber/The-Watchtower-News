// frontend/src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";
import { CATEGORIES, CATEGORY_ICONS } from "../lib/categories";
import Icon from "../components/ui/Icon";
import PageMeta from "../components/ui/PageMeta";

export default function NotFoundPage({
  title = "Page not found",
  message = "The page you were looking for has moved, been removed, or never existed.",
}) {
  return (
    <div className="empty-state" style={{ maxWidth: 620, margin: "0 auto" }}>
      <PageMeta title={title} />
      <p style={{ fontFamily: "var(--font-logo)", fontSize: "clamp(64px, 12vw, 110px)", fontWeight: 900, lineHeight: 1, color: "var(--color-accent)", opacity: 0.85 }}>
        404
      </p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 3vw, 30px)", color: "var(--text-heading)", margin: "14px 0 8px" }}>
        {title}
      </h1>
      <p>{message}</p>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
        <Link to="/" className="btn btn-gold"><Icon name="arrowLeft" size={12} /> Front page</Link>
        <Link to="/search" className="btn btn-outline"><Icon name="search" size={12} /> Search the archive</Link>
      </div>

      <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-ash)", margin: "40px 0 12px" }}>
        Or browse a desk
      </p>
      <div className="chip-row" style={{ justifyContent: "center" }}>
        {CATEGORIES.map((c) => (
          <Link key={c} to={`/category/${c}`} className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name={CATEGORY_ICONS[c]} size={12} /> {c}
          </Link>
        ))}
      </div>
    </div>
  );
}
