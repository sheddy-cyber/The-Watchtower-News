// frontend/src/pages/SearchPage.jsx
import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { articlesApi } from "../lib/api";
import { CATEGORIES } from "../lib/categories";
import { getRecentSearches, addRecentSearch, clearRecentSearches } from "../lib/recentSearches";
import ArticleCard from "../components/article/ArticleCard";
import Icon from "../components/ui/Icon";
import PageMeta from "../components/ui/PageMeta";
import { GridSkeleton } from "../components/ui/Skeleton";

const SORTS = [
  { id: "popular", label: "Most read" },
  { id: "latest", label: "Newest" },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") === "latest" ? "latest" : "popular";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [input, setInput] = useState(query);
  const [attempt, setAttempt] = useState(0);
  const [recent, setRecent] = useState(getRecentSearches);
  const [trending, setTrending] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    setInput(query);
    if (!query) { setResults([]); setSearched(false); return; }
    let cancelled = false;
    setLoading(true);
    setError(null);
    addRecentSearch(query);
    setRecent(getRecentSearches());
    articlesApi.search(query)
      .then((r) => { if (!cancelled) setResults(r.data); })
      .catch(() => { if (!cancelled) setError("Search failed. Please check your connection and try again."); })
      .finally(() => { if (!cancelled) { setLoading(false); setSearched(true); } });
    return () => { cancelled = true; };
  }, [query, attempt]);

  // Suggestions for the empty / no-results states
  useEffect(() => {
    articlesApi.trending().then((r) => setTrending(r.data.slice(0, 4))).catch(() => {});
  }, []);

  const counts = useMemo(() => {
    const c = { All: results.length };
    results.forEach((a) => { c[a.category] = (c[a.category] || 0) + 1; });
    return c;
  }, [results]);

  const visible = useMemo(() => {
    let list = category === "All" ? results : results.filter((a) => a.category === category);
    if (sort === "latest") list = [...list].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    return list;
  }, [results, category, sort]);

  const updateParams = (patch) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    setSearchParams(next, { replace: true });
  };

  const doSearch = (e) => {
    e?.preventDefault();
    const q = input.trim();
    if (!q) { inputRef.current?.focus(); return; }
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const clear = () => {
    setInput("");
    navigate("/search");
    inputRef.current?.focus();
  };

  const suggestions = (
    <div style={{ marginTop: 28 }}>
      {recent.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span className="eyebrow-label">Recent searches</span>
            <button type="button" className="link-button" onClick={() => { clearRecentSearches(); setRecent([]); }}>Clear</button>
          </div>
          <div className="chip-row">
            {recent.map((q) => (
              <Link key={q} to={`/search?q=${encodeURIComponent(q)}`} className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Icon name="history" size={12} /> {q}
              </Link>
            ))}
          </div>
        </div>
      )}
      <div style={{ marginBottom: 28 }}>
        <span className="eyebrow-label" style={{ display: "block", marginBottom: 12 }}>Browse by section</span>
        <div className="chip-row">
          {CATEGORIES.map((c) => <Link key={c} to={`/category/${c}`} className="chip">{c}</Link>)}
        </div>
      </div>
      {trending.length > 0 && (
        <div>
          <span className="eyebrow-label" style={{ display: "block", marginBottom: 12 }}>Trending now</span>
          <ol className="trending-list">
            {trending.map((a, i) => (
              <li key={a.id}>
                <Link to={`/article/${a.id}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{a.title}</strong>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );

  return (
    <>
      <PageMeta title={query ? `“${query}” — Search` : "Search"} />

      <h1 className="sr-only">Search The Watchtower</h1>

      {/* Search bar */}
      <form onSubmit={doSearch} role="search" style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", gap: 10, maxWidth: 640 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <input
              ref={inputRef}
              className="input"
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search articles, authors, topics…"
              aria-label="Search articles"
              autoFocus={!query}
              enterKeyHint="search"
              style={{ paddingRight: input ? 40 : 14 }}
            />
            {input && (
              <button type="button" onClick={clear} aria-label="Clear search" className="input-clear">
                <Icon name="close" size={14} />
              </button>
            )}
          </div>
          <button className="btn btn-gold" type="submit" style={{ flexShrink: 0, gap: 6 }}>
            <Icon name="search" size={12} />
            Search
          </button>
        </div>
      </form>

      {!query && suggestions}

      {/* Results header + filters */}
      {query && searched && !error && results.length > 0 && (
        <div style={{ marginBottom: 28, paddingBottom: 16, borderBottom: "1px solid var(--gold-border)" }}>
          <p aria-live="polite" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px,2.5vw,24px)", color: "var(--text-heading)", marginBottom: 14 }}>
            {visible.length} result{visible.length !== 1 ? "s" : ""} for{" "}
            <em style={{ color: "var(--gold)" }}>“{query}”</em>
            {category !== "All" && <span style={{ color: "var(--color-ash)" }}> in {category}</span>}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div className="chip-row" role="group" aria-label="Filter by section">
              {["All", ...CATEGORIES].filter((c) => c === "All" || counts[c]).map((c) => (
                <button
                  key={c}
                  type="button"
                  className="chip"
                  aria-pressed={category === c}
                  onClick={() => updateParams({ category: c === "All" ? null : c })}
                >
                  {c}<span className="chip-count">{counts[c] || 0}</span>
                </button>
              ))}
            </div>
            <div className="chip-row" role="group" aria-label="Sort results">
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="chip"
                  aria-pressed={sort === s.id}
                  onClick={() => updateParams({ sort: s.id === "popular" ? null : s.id })}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {query && loading && <GridSkeleton count={4} columns={4} />}

      {query && !loading && error && (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Icon name="alertTriangle" size={40} style={{ color: "color-mix(in srgb, var(--color-accent-hover) 40%, transparent)" }} />
          </div>
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button className="btn btn-outline" onClick={() => setAttempt((n) => n + 1)} style={{ marginTop: 20, gap: 6 }}>
            <Icon name="refreshCw" size={12} /> Try again
          </button>
        </div>
      )}

      {query && !loading && searched && !error && visible.length > 0 && (
        <div className="grid-4">
          {visible.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}

      {query && !loading && searched && !error && results.length === 0 && (
        <>
          <div className="empty-state" style={{ paddingBottom: 20 }}>
            <div className="empty-state-icon">
              <Icon name="search" size={40} style={{ color: "color-mix(in srgb, var(--color-accent-hover) 35%, transparent)" }} />
            </div>
            <h3>No results for “{query}”</h3>
            <p>Search matches whole words — try a broader term, check the spelling, or browse a section.</p>
          </div>
          {suggestions}
        </>
      )}
    </>
  );
}
