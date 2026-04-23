// frontend/src/pages/CategoryPage.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { articlesApi } from "../lib/api";
import { CATEGORY_ICONS } from "../lib/categories";
import ArticleCard from "../components/article/ArticleCard";
import Icon from "../components/ui/Icon";

export default function CategoryPage() {
  const { cat } = useParams();
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPage(1);
    setArticles([]);
  }, [cat]);

  useEffect(() => {
    setLoading(true);
    articlesApi.byCategory(cat, page)
      .then((r) => {
        setArticles((prev) => page === 1 ? r.data.articles : [...prev, ...r.data.articles]);
        setTotalPages(r.data.pages);
      })
      .catch(() => setError("Failed to load articles. Please try again."))
      .finally(() => setLoading(false));
  }, [cat, page]);

  const iconName = CATEGORY_ICONS[cat] || "newspaper";

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
        <Link to="/" style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.08em", color: "rgba(212,175,55,0.45)", textTransform: "uppercase" }}>
          Home
        </Link>
        <span style={{ color: "rgba(212,175,55,0.25)" }}>›</span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.08em", color: "var(--gold-dim)", textTransform: "uppercase" }}>
          {cat}
        </span>
      </div>

      {/* Section heading */}
      <div className="section-header" style={{ marginBottom: 32 }}>
        <Icon name={iconName} size={20} style={{ color: "var(--gold)", flexShrink: 0 }} />
        <h1 className="section-title" style={{ fontSize: "clamp(22px,3vw,30px)" }}>{cat}</h1>
        <div className="section-line" />
      </div>

      {/* Grid */}
      {error ? (
        <div className="empty-state">
          <div className="empty-state-icon"><Icon name="alertTriangle" size={40} style={{ color: "rgba(212,175,55,0.35)" }} /></div>
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button className="btn btn-outline" onClick={() => { setError(null); setPage(1); }} style={{ marginTop: 20, gap: 6 }}>
            <Icon name="refreshCw" size={12} /> Try Again
          </button>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid-4">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      ) : !loading ? (
        <div className="empty-state">
          <div className="empty-state-icon"><Icon name={iconName} size={40} style={{ color: "rgba(212,175,55,0.3)" }} /></div>
          <h3>No articles yet</h3>
          <p>Check back soon for the latest {cat} coverage.</p>
        </div>
      ) : null}

      {/* Spinner / Load more */}
      {loading && (
        <div className="page-loader" style={{ minHeight: "20vh" }}>
          <span className="spinner" style={{ width: 32, height: 32 }} />
        </div>
      )}

      {!loading && page < totalPages && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button
            className="btn btn-outline"
            onClick={() => setPage((p) => p + 1)}
            style={{ padding: "10px 32px" }}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
