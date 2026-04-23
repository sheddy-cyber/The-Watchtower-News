// frontend/src/pages/ArticlePage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { articlesApi } from "../lib/api";
import ArticleView from "../components/article/ArticleView";
import Icon from "../components/ui/Icon";

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    articlesApi.get(id)
      .then((r) => setArticle(r.data))
      .catch((err) => { if (err.response?.status === 404) setNotFound(true); })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="page-loader">
        <span className="spinner" style={{ width: 36, height: 36 }} />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <Icon name="newspaper" size={40} style={{ color: "rgba(212,175,55,0.3)" }} />
        </div>
        <h3>Article not found</h3>
        <p>This article may have been removed or the link is incorrect.</p>
        <button className="btn btn-outline" onClick={() => navigate("/")} style={{ marginTop: 20, gap: 6 }}>
          <Icon name="arrowLeft" size={12} /> Back to Home
        </button>
      </div>
    );
  }

  return <ArticleView article={article} />;
}
