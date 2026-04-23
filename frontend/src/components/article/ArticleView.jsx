// frontend/src/components/article/ArticleView.jsx
import { useNavigate } from "react-router-dom";
import CategoryBadge from "../ui/CategoryBadge";
import Icon from "../ui/Icon";
import { formatDate, formatViews } from "../../lib/categories";
import { useBookmarks } from "../../context/BookmarkContext";
import { useToast } from "../../context/ToastContext";
import DOMPurify from "dompurify";
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
      <button className="btn btn-outline" onClick={() => navigate(-1)} style={{ marginBottom: 32, gap: 6 }}>
        <Icon name="arrowLeft" size={12} />
        Back
      </button>

      <img src={article.imageUrl} alt={article.title} className={styles.heroImg} />

      <div className={styles.header}>
        <CategoryBadge category={article.category} />
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

          <div className={styles.actions}>
            <button
              className={`btn btn-outline${saved ? " active" : ""}`}
              onClick={() => toggle(article.id)}
              style={{ fontSize: 10, gap: 6 }}
            >
              <Icon name={saved ? "bookmarkFilled" : "bookmark"} size={12} />
              {saved ? "Saved" : "Save"}
            </button>
            <button className="btn btn-outline" onClick={share} style={{ fontSize: 10, gap: 6 }}>
              <Icon name="share" size={12} />
              Share
            </button>
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
    </div>
  );
}
