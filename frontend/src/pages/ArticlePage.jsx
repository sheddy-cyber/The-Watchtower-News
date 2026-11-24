// frontend/src/pages/ArticlePage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { articlesApi } from "../lib/api";
import ArticleView from "../components/article/ArticleView";
import Icon from "../components/ui/Icon";
import PageMeta from "../components/ui/PageMeta";
import { ArticleSkeleton } from "../components/ui/Skeleton";
import NotFoundPage from "./NotFoundPage";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("ok"); // ok | notFound | error
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setStatus("ok");
    articlesApi.get(id)
      .then((r) => { if (!cancelled) setArticle(r.data); })
      .catch((err) => {
        if (cancelled) return;
        const code = err.response?.status;
        setStatus(code === 404 || code === 400 ? "notFound" : "error");
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id, attempt]);

  if (loading) return <ArticleSkeleton />;

  if (status === "notFound") {
    return (
      <NotFoundPage
        title="Article not found"
        message="This story may have been removed, or the link is incorrect."
      />
    );
  }

  if (status === "error" || !article) {
    return (
      <div className="empty-state">
        <PageMeta title="Couldn't load article" />
        <div className="empty-state-icon">
          <Icon name="alertTriangle" size={40} style={{ color: "color-mix(in srgb, var(--color-accent-hover) 40%, transparent)" }} />
        </div>
        <h3>We couldn't load this story</h3>
        <p>Check your connection and try again.</p>
        <button className="btn btn-outline" onClick={() => setAttempt((n) => n + 1)} style={{ marginTop: 20, gap: 6 }}>
          <Icon name="refreshCw" size={12} /> Try again
        </button>
      </div>
    );
  }

  return <ArticleView key={article.id} article={article} />;
}
