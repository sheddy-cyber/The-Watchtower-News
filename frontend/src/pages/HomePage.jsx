// frontend/src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { articlesApi } from "../lib/api";
import { CATEGORIES } from "../lib/categories";
import HeroSection from "../components/article/HeroSection";
import CategorySection from "../components/article/CategorySection";
import Icon from "../components/ui/Icon";
import { useToast } from "../context/ToastContext";

export default function HomePage() {
  const [articlesByCategory, setArticlesByCategory] = useState({});
  const [heroArticles, setHeroArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const showToast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("newsletter") === "confirmed") {
      showToast("You're subscribed! Welcome to The Watchtower.");
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams, showToast]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          CATEGORIES.map((cat) => articlesApi.byCategory(cat, 1))
        );
        const map = {};
        results.forEach((r, i) => { map[CATEGORIES[i]] = r.data.articles || []; });
        setArticlesByCategory(map);
        const all = results.flatMap((r) => r.data.articles || []);
        setHeroArticles(all.slice(0, 4));
      } catch {
        setError("Failed to load articles. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="page-loader">
        <span className="spinner" style={{ width: 36, height: 36 }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <Icon name="alertTriangle" size={40} style={{ color: "rgba(212,175,55,0.35)" }} />
        </div>
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button className="btn btn-outline" onClick={() => window.location.reload()} style={{ marginTop: 20, gap: 6 }}>
          <Icon name="refreshCw" size={12} /> Refresh
        </button>
      </div>
    );
  }

  return (
    <>
      <HeroSection articles={heroArticles} />
      {CATEGORIES.map((cat) => (
        <CategorySection key={cat} category={cat} articles={articlesByCategory[cat] || []} />
      ))}
    </>
  );
}
