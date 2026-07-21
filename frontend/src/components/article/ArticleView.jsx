// frontend/src/components/article/ArticleView.jsx
import { useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import CategoryBadge from "../ui/CategoryBadge";
import Icon from "../ui/Icon";
import { formatDate, formatViews } from "../../lib/categories";
import { useBookmarks } from "../../context/BookmarkContext";
import { useToast } from "../../context/ToastContext";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";
import styles from "./ArticleView.module.css";

export default function ArticleView({ article }) {
  const navigate = useNavigate();
  const { bookmarks, toggle } = useBookmarks();
  const showToast = useToast();
  const saved = bookmarks.has(article.id);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: article.title, text: article.excerpt, url }); }
      catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard!");
    }
  };

  const paragraphs = (article.content || "").split(/\n\n+/).filter(Boolean);

  return (
    <div className={styles.wrap}>
      <Helmet>
        <title>{article.title} | Watchtower News</title>
        <meta name="description" content={article.excerpt || article.title} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt || article.title} />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt || article.title} />
        <meta name="twitter:image" content={article.imageUrl} />
      </Helmet>

      <button className="btn btn-outline" onClick={() => navigate(-1)} style={{ marginBottom: 32, gap: 6 }}>
        <Icon name="arrowLeft" size={12} />
        Back
      </button>

      <img src={article.imageUrl} alt={article.title} className={styles.heroImg} />

      <div className={styles.header}>
        <div className={styles.categoryRow}>
          <CategoryBadge category={article.category} />
          <div className={styles.actionsContainer}>
            <button
              className={`${styles.actionBtn} ${saved ? styles.active : ""}`}
              onClick={() => toggle(article.id)}
              title={saved ? "Remove Bookmark" : "Save Bookmark"}
            >
              <Icon name={saved ? "bookmarkFilled" : "bookmark"} size={16} />
            </button>
            <button className={styles.actionBtn} onClick={share} title="Share Article">
              <Icon name="share" size={16} />
            </button>
          </div>
        </div>
        
        <h1 className={styles.title}>{article.title}</h1>

        <div className={styles.metaBar}>
          <div className="byline">
            <span>{article.author}</span>
            <span className="byline-dot">·</span>
            <span>{formatDate(article.publishedAt || article.date)}</span>
            <span className="byline-dot">·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="eye" size={12} style={{ opacity: 0.5 }} />
              {formatViews(article.views)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        {paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? styles.dropCap : ""}>
            {DOMPurify.sanitize(p, { ALLOWED_TAGS: [] })}
          </p>
        ))}
      </div>

      {/* End-of-article ornament — pure CSS, no emoji */}
      <div className={styles.tagLine}>
        <span className={styles.tagLineDiamond} />
        <span className={styles.tagLineText}>End of Article</span>
        <span className={styles.tagLineDiamond} />
      </div>

      {article.similar && article.similar.length > 0 && (
        <div className={styles.similarSection}>
          <h3 className={styles.similarTitle}>More from {article.category}</h3>
          <div className={styles.similarGrid}>
            {article.similar.map((sim) => (
              <ArticleCard key={sim.id} article={sim} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
