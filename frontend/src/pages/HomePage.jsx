// frontend/src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { articlesApi } from "../lib/api";
import { CATEGORIES } from "../lib/categories";
import HeroSection from "../components/article/HeroSection";
import CategorySection from "../components/article/CategorySection";
import NewsroomModules from "../components/article/NewsroomModules";
import RecentlyRead from "../components/article/RecentlyRead";
import Icon from "../components/ui/Icon";
import PageMeta from "../components/ui/PageMeta";
import { HomeSkeleton } from "../components/ui/Skeleton";
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

  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          CATEGORIES.map((cat) => articlesApi.byCategory(cat, 1))
        );
        if (cancelled) return;
        const map = {};
        results.forEach((r, i) => { map[CATEGORIES[i]] = r.data.articles || []; });
        setArticlesByCategory(map);
        const all = results.flatMap((r) => r.data.articles || []);
        const leadStories = [...all]
          .sort((a, b) => Number(b.trending) - Number(a.trending) || b.views - a.views)
          .slice(0, 4);
        setHeroArticles(leadStories);
      } catch {
        if (!cancelled) setError("We couldn't load today's edition. Check your connection and try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchAll();
    return () => { cancelled = true; };
  }, [attempt]);

  if (loading) {
    return (
      <>
        <PageMeta />
        <HomeSkeleton />
      </>
    );
  }

  if (error) {
    return (
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
    );
  }

  return (
    <>
      <PageMeta />
      <div className="edition-bar">
        <span><i /> Live coverage</span>
        <p>Independent reporting for a changing world</p>
        <time>{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</time>
      </div>
      <HeroSection articles={heroArticles} />
      <RecentlyRead />
      <NewsroomModules articles={Object.values(articlesByCategory).flat()} />
      {CATEGORIES.map((cat) => (
        <CategorySection key={cat} category={cat} articles={articlesByCategory[cat] || []} />
      ))}
    </>
  );
}
