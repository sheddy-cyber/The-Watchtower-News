// frontend/src/pages/SearchPage.jsx
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { articlesApi } from "../lib/api";
import ArticleCard from "../components/article/ArticleCard";
import Icon from "../components/ui/Icon";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [input, setInput] = useState(query);
  const inputRef = useRef();

  useEffect(() => {
    if (!query) return;
    setInput(query);
    setLoading(true);
    setSearched(false);
    setError(null);
    articlesApi.search(query)
      .then((r) => setResults(r.data))
      .catch(() => setError("Search failed. Please try again."))
      .finally(() => { setLoading(false); setSearched(true); });
  }, [query]);

  const doSearch = () => {
    const q = input.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      {/* Search bar */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", gap: 10, maxWidth: 600 }}>
          <input
            ref={inputRef}
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doSearch()}
            placeholder="Search articles, authors, topics…"
            autoFocus
          />
          <button className="btn btn-gold" onClick={doSearch} style={{ flexShrink: 0, gap: 6 }}>
            <Icon name="search" size={12} />
            Search
          </button>
        </div>
      </div>

      {/* Results header */}
      {searched && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, paddingBottom: 16, borderBottom: "1px solid var(--gold-border)" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px,2.5vw,22px)", color: "var(--champagne)" }}>
            {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
            <em style={{ color: "var(--gold)" }}>"{query}"</em>
          </p>
          <button className="btn btn-outline" onClick={() => navigate("/")} style={{ fontSize: 9, gap: 5 }}>
            <Icon name="close" size={10} />
            Clear
          </button>
        </div>
      )}

      {loading && (
        <div className="page-loader">
          <span className="spinner" style={{ width: 32, height: 32 }} />
        </div>
      )}

      {error && (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Icon name="alertTriangle" size={40} style={{ color: "rgba(212,175,55,0.35)" }} />
          </div>
          <h3>Something went wrong</h3>
          <p>{error}</p>
        </div>
      )}

      {searched && !error && results.length > 0 && (
        <div className="grid-4">
          {results.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}

      {searched && !error && results.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Icon name="search" size={40} style={{ color: "rgba(212,175,55,0.3)" }} />
          </div>
          <h3>No results found</h3>
          <p>Try a different search term or browse by category.</p>
        </div>
      )}
    </>
  );
}
