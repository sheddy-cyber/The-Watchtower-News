// frontend/src/pages/SavedPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useBookmarks } from "../context/BookmarkContext";
import { bookmarksApi, articlesApi } from "../lib/api";
import ArticleCard from "../components/article/ArticleCard";
import Icon from "../components/ui/Icon";

export default function SavedPage() {
  const { user } = useAuth();
  const { bookmarks } = useBookmarks();
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
      <div className="section-header" style={{ marginBottom: 32 }}>
        <div>
          <span className="eyebrow">Personal Reading List</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 36px)", color: "var(--text-heading)" }}>
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

      {loading ? (
        <div className="page-loader">
          <span className="spinner" style={{ width: 36, height: 36 }} />
        </div>
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
            Tap the bookmark icon on any article across The Watchtower to save it for offline or later reading.
          </p>
        </div>
      )}
    </div>
  );
}
