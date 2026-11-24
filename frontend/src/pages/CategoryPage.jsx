// frontend/src/pages/CategoryPage.jsx
import { useState, useEffect, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { articlesApi } from "../lib/api";
import { CATEGORIES, CATEGORY_ICONS, normalizeCategory } from "../lib/categories";
import ArticleCard from "../components/article/ArticleCard";
import Icon from "../components/ui/Icon";
import PageMeta from "../components/ui/PageMeta";
import { GridSkeleton } from "../components/ui/Skeleton";
import NotFoundPage from "./NotFoundPage";

const SORTS = [
  { id: "latest", label: "Latest" },
  { id: "popular", label: "Most read" },
];

export default function CategoryPage() {
  const { cat: rawCat } = useParams();
  const cat = normalizeCategory(rawCat);

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [sort, setSort] = useState("latest");

  // Reset when switching desks
  useEffect(() => {
    setPage(1);
    setArticles([]);
    setSort("latest");
  }, [cat]);

  useEffect(() => {
    if (!cat) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    articlesApi.byCategory(cat, page)
      .then((r) => {
        if (cancelled) return;
        setArticles((prev) => (page === 1 ? r.data.articles : [...prev, ...r.data.articles]));
        setTotalPages(r.data.pages);
        setTotal(r.data.total);
      })
      .catch(() => { if (!cancelled) setError("We couldn't load this section. Please try again."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [cat, page, attempt]);

  const sorted = useMemo(() => {
    if (sort === "popular") return [...articles].sort((a, b) => b.views - a.views);
    return articles;
  }, [articles, sort]);

  if (!cat) {
    return <NotFoundPage title="Section not found" message={`We don't have a “${rawCat}” desk. Try one of our sections below.`} />;
  }
  // Canonicalise the URL casing, e.g. /category/world → /category/World
  if (rawCat !== cat) return <Navigate to={`/category/${cat}`} replace />;

  const iconName = CATEGORY_ICONS[cat] || "newspaper";
  const initialLoad = loading && articles.length === 0;

  return (
    <>
      <PageMeta title={cat} description={`The latest ${cat} news and analysis from The Watchtower.`} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
        <Link to="/" style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.08em", color: "var(--color-ash)", textTransform: "uppercase" }}>
          Home
        </Link>
        <span aria-hidden="true" style={{ color: "var(--color-ash)" }}>›</span>
        <span aria-current="page" style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.08em", color: "var(--color-accent)", textTransform: "uppercase" }}>
          {cat}
        </span>
      </nav>

      {/* Section heading */}
      <div className="section-header" style={{ marginBottom: 20 }}>
        <Icon name={iconName} size={20} style={{ color: "var(--gold)", flexShrink: 0 }} />
        <h1 className="section-title" style={{ fontSize: "clamp(22px,3vw,30px)" }}>{cat}</h1>
        <div className="section-line" />
        {total > 0 && (
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--color-ash)", whiteSpace: "nowrap" }}>
            {total} {total === 1 ? "story" : "stories"}
          </span>
        )}
      </div>

      {/* Toolbar: other desks + sort */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
        <div className="chip-row" aria-label="Other sections">
          {CATEGORIES.filter((c) => c !== cat).map((c) => (
            <Link key={c} to={`/category/${c}`} className="chip">{c}</Link>
          ))}
        </div>
        {articles.length > 1 && (
          <div className="chip-row" role="group" aria-label="Sort stories">
            {SORTS.map((s) => (
              <button key={s.id} type="button" className="chip" aria-pressed={sort === s.id} onClick={() => setSort(s.id)}>
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      {error && articles.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><Icon name="alertTriangle" size={40} style={{ color: "color-mix(in srgb, var(--color-accent-hover) 40%, transparent)" }} /></div>
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button className="btn btn-outline" onClick={() => setAttempt((n) => n + 1)} style={{ marginTop: 20, gap: 6 }}>
            <Icon name="refreshCw" size={12} /> Try again
          </button>
        </div>
      ) : initialLoad ? (
        <GridSkeleton count={8} columns={4} />
      ) : sorted.length > 0 ? (
        <div className="grid-4">
          {sorted.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon"><Icon name={iconName} size={40} style={{ color: "color-mix(in srgb, var(--color-accent-hover) 35%, transparent)" }} /></div>
          <h3>No articles yet</h3>
          <p>Check back soon for the latest {cat} coverage.</p>
        </div>
      )}

      {/* Load more */}
      {articles.length > 0 && page < totalPages && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          {error && <p className="form-error" style={{ marginBottom: 12 }}>{error}</p>}
          <button
            className="btn btn-outline"
            onClick={() => (error ? setAttempt((n) => n + 1) : setPage((p) => p + 1))}
            disabled={loading}
            style={{ padding: "10px 32px", gap: 8 }}
          >
            {loading ? <><span className="spinner" style={{ width: 14, height: 14 }} /> Loading…</> : error ? "Retry" : "Load more stories"}
          </button>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--color-ash)", marginTop: 10 }}>
            Showing {articles.length} of {total}
          </p>
        </div>
      )}
    </>
  );
}
