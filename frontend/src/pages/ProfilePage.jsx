// frontend/src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { bookmarksApi } from "../lib/api";
import { useToast } from "../context/ToastContext";
import ArticleCard from "../components/article/ArticleCard";
import Icon from "../components/ui/Icon";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const showToast = useToast();
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkError, setBookmarkError] = useState(null);
  const [activeTab, setActiveTab] = useState("bookmarks");

  useEffect(() => {
    bookmarksApi.list()
      .then((r) => setBookmarkedArticles(r.data))
      .catch(() => setBookmarkError("Failed to load saved articles."))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    showToast("Signed out successfully.");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <>
      {/* Profile header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 24, padding: "28px 32px",
        background: "var(--bg-surface)", border: "1px solid var(--gold-border)",
        marginBottom: 40, flexWrap: "wrap",
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "rgba(212,175,55,0.12)", border: "1px solid var(--gold-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontSize: 24, color: "var(--gold)",
          flexShrink: 0,
        }}>
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,3vw,28px)", color: "var(--text-heading)", marginBottom: 4 }}>
            {user?.name}
          </h1>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--gold-dim)", letterSpacing: "0.05em" }}>
            {user?.email}
          </p>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, color: "rgba(212,175,55,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>
            {user?.role || "Reader"} · Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : "2026"}
          </p>
        </div>
        <button className="btn btn-outline" onClick={handleLogout} style={{ fontSize: 10, gap: 6 }}>
          <Icon name="logOut" size={12} />
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="auth-tabs" style={{ marginBottom: 32 }}>
        {["bookmarks", "settings"].map((t) => (
          <button
            key={t}
            className={`auth-tab${activeTab === t ? " active" : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t === "bookmarks" ? `Saved Articles (${bookmarkedArticles.length})` : "Account Settings"}
          </button>
        ))}
      </div>

      {/* Bookmarks tab */}
      {activeTab === "bookmarks" && (
        <>
          {loading ? (
            <div className="page-loader">
              <span className="spinner" style={{ width: 32, height: 32 }} />
            </div>
          ) : bookmarkError ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Icon name="alertTriangle" size={40} style={{ color: "rgba(212,175,55,0.35)" }} />
              </div>
              <h3>Something went wrong</h3>
              <p>{bookmarkError}</p>
            </div>
          ) : bookmarkedArticles.length > 0 ? (
            <div className="grid-4">
              {bookmarkedArticles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Icon name="bookmark" size={40} style={{ color: "rgba(212,175,55,0.3)" }} />
              </div>
              <h3>No saved articles yet</h3>
              <p>Bookmark articles while reading to find them here.</p>
            </div>
          )}
        </>
      )}

      {/* Settings tab */}
      {activeTab === "settings" && (
        <div style={{ maxWidth: 480 }}>
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--gold-border)", padding: 28, marginBottom: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--gold)", marginBottom: 16 }}>
              Account Details
            </h3>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="input" defaultValue={user?.name} readOnly style={{ opacity: 0.7 }} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="input" defaultValue={user?.email} readOnly style={{ opacity: 0.7 }} />
            </div>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "rgba(212,175,55,0.35)", marginTop: 8 }}>
              To update your details, please contact support.
            </p>
          </div>

          <div style={{ background: "rgba(224,92,92,0.06)", border: "1px solid rgba(224,92,92,0.2)", padding: 24 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "#e05c5c", marginBottom: 8 }}>
              Danger Zone
            </h3>
            <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 16, lineHeight: 1.6 }}>
              Signing out will end your current session on this device.
            </p>
            <button
              className="btn"
              style={{ background: "rgba(224,92,92,0.15)", color: "#e05c5c", border: "1px solid rgba(224,92,92,0.3)", fontSize: 10, gap: 6 }}
              onClick={handleLogout}
            >
              <Icon name="logOut" size={12} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}
