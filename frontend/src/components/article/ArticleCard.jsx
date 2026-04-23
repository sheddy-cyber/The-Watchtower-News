// frontend/src/components/article/ArticleCard.jsx
import { useNavigate } from "react-router-dom";
import CategoryBadge from "../ui/CategoryBadge";
import { formatDate, formatViews } from "../../lib/categories";
import { useBookmarks } from "../../context/BookmarkContext";
import styles from "./ArticleCard.module.css";

export default function ArticleCard({ article }) {
  const navigate = useNavigate();
  const { bookmarks, toggle } = useBookmarks();
  const saved = bookmarks.has(article.id);

  return (
    <article
      className={`card ${styles.card}`}
      onClick={() => navigate(`/article/${article.id}`)}
    >
      <div className={styles.imgWrap}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className={styles.img}
          loading="lazy"
        />
        <div className={styles.imgOverlay} />
      </div>

      <div className={styles.body}>
        <CategoryBadge category={article.category} />
        <h3 className={styles.title}>{article.title}</h3>
        <p className="byline" style={{ marginBottom: 10, width: "100%" }}>
          <span>{article.author}</span>
          <span className="byline-dot">·</span>
          <span>{formatDate(article.publishedAt || article.date)}</span>
        </p>
        <p className={styles.excerpt}>{article.excerpt}</p>

        <div className={styles.footer}>
          <span className={styles.views}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5 }}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {formatViews(article.views)}
          </span>
          <button
            className={`${styles.bookmark}${saved ? ` ${styles.bookmarkActive}` : ""}`}
            onClick={(e) => { e.stopPropagation(); toggle(article.id); }}
            aria-label={saved ? "Remove bookmark" : "Bookmark article"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
