// frontend/src/pages/SavedPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useBookmarks } from "../context/BookmarkContext";
import { bookmarksApi, articlesApi } from "../lib/api";
import ArticleCard from "../components/article/ArticleCard";
import RecentlyRead from "../components/article/RecentlyRead";
import Icon from "../components/ui/Icon";
import PageMeta from "../components/ui/PageMeta";
import { GridSkeleton } from "../components/ui/Skeleton";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function SavedPage() {
  const { user } = useAuth();
  const { bookmarks } = useBookmarks();
  const navigate = useNavigate();
  const location = useLocation();
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (user) {
      bookmarksApi.list()
        .then((r) => setSavedArticles(r.data))
        .catch(() => setSavedArticles([]))
        .finally(() => setLoading(false));
    } else {
      const ids = Array.from(bookmarks);
      if (!ids.length) {
        setSavedArticles([]);
        setLoading(false);
        return;
      }
      Promise.all(ids.map((id) => articlesApi.get(id).then((r) => r.data).catch(() => null)))
        .then((results) => setSavedArticles(results.filter(Boolean)))
        .finally(() => setLoading(false));
    }
  }, [user, bookmarks]);

  return (
    <div>
      <PageMeta title="Saved articles" />
      <div className="section-header" style={{ marginBottom: 32, justifyContent: "space-between", flexWrap: "wrap" }}>
        <div>
          <span className="eyebrow-label" style={{ color: "var(--color-accent)" }}>Personal reading list</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 36px)", color: "var(--text-heading)", lineHeight: 1.2, marginTop: 4 }}>
            Saved Articles
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--gold)" }}>
          <Icon name="bookmark" size={20} />
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 700 }}>
            {savedArticles.length} {savedArticles.length === 1 ? "article" : "articles"}
          </span>
        </div>
      </div>

      {!user && (
        <div className="notice-bar">
          <Icon name="user" size={14} />
          <span>Saved stories live on this device only. <button type="button" className="link-button" onClick={() => navigate(location.pathname, { replace: true, state: { openAuth: true } })}>Sign in</button> to keep them in sync everywhere.</span>
        </div>
      )}

      {loading ? (
        <GridSkeleton count={3} columns={3} />
      ) : savedArticles.length > 0 ? (
        <div className="grid-3">
          {savedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="empty-state" style={{ padding: "60px 20px" }}>
          <div className="empty-state-icon">
            <Icon name="bookmark" size={44} style={{ color: "color-mix(in srgb, var(--color-accent-hover) 35%, transparent)" }} />
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--text-heading)", marginTop: 16 }}>
            No saved articles yet
          </h3>
          <p style={{ color: "var(--text-muted)", maxWidth: 400, margin: "8px auto 0" }}>
            Tap the bookmark icon on any story to build your own reading list for later.
          </p>
          <Link to="/" className="btn btn-gold" style={{ marginTop: 22 }}>
            Browse today's stories <Icon name="arrowRight" size={12} />
          </Link>
        </div>
      )}

      <div style={{ marginTop: 56 }}>
        <RecentlyRead limit={8} title="Recently read" />
      </div>
    </div>
  );
}
