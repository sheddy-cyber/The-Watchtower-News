// frontend/src/components/article/ArticleCard.jsx
import { Link } from "react-router-dom";
import CategoryBadge from "../ui/CategoryBadge";
import Icon from "../ui/Icon";
import SmartImage from "../ui/SmartImage";
import { formatViews, timeAgo } from "../../lib/categories";
import { useBookmarks } from "../../context/BookmarkContext";
import styles from "./ArticleCard.module.css";

export default function ArticleCard({ article }) {
  const { bookmarks, toggle } = useBookmarks();
  const saved = bookmarks.has(article.id);
  const published = article.publishedAt || article.date;

  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.imgWrap}>
        <SmartImage src={article.imageUrl} alt="" className={styles.img} />
        <div className={styles.imgOverlay} />
      </div>

      <div className={styles.body}>
        <CategoryBadge category={article.category} />
        <h3 className={styles.title}>
          {/* Stretched link: the whole card is clickable, but it's a real link
              (keyboard focusable, middle-click / open in new tab works). */}
          <Link to={`/article/${article.id}`} className={styles.cardLink}>
            {article.title}
          </Link>
        </h3>
        <p className="byline" style={{ marginBottom: 10, width: "100%" }}>
          <span>{article.author}</span>
          <span className="byline-dot">·</span>
          <time dateTime={published}>{timeAgo(published)}</time>
        </p>
        <p className={styles.excerpt}>{article.excerpt}</p>

        <div className={styles.footer}>
          <span className={styles.views}>
            <Icon name="eye" size={12} style={{ opacity: 0.5 }} />
            {formatViews(article.views)}
          </span>
          <button
            type="button"
            className={`${styles.bookmark}${saved ? ` ${styles.bookmarkActive}` : ""}`}
            onClick={() => toggle(article.id)}
            aria-label={saved ? `Remove "${article.title}" from saved` : `Save "${article.title}"`}
            aria-pressed={saved}
          >
            <Icon name={saved ? "bookmarkFilled" : "bookmark"} size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
