// frontend/src/components/article/HeroSection.jsx
import { useNavigate } from "react-router-dom";
import CategoryBadge from "../ui/CategoryBadge";
import Icon from "../ui/Icon";
import { formatDate, formatViews } from "../../lib/categories";
import { useBookmarks } from "../../context/BookmarkContext";
import styles from "./HeroSection.module.css";

export default function HeroSection({ articles }) {
  const navigate = useNavigate();
  const { bookmarks, toggle } = useBookmarks();

  if (!articles || articles.length === 0) return null;

  const [featured, ...sidebar] = articles;
  const sideItems = sidebar.slice(0, 3);

  return (
    <section className={styles.hero}>
      {/* ── Featured (left) ── */}
      <div className={styles.feature} onClick={() => navigate(`/article/${featured.id}`)}>
        <img src={featured.imageUrl} alt={featured.title} className={styles.featureImg} />
        <div className={styles.featureOverlay} />
        <div className={styles.featureContent}>
          <CategoryBadge category={featured.category} />
          <h2 className={styles.featureTitle}>{featured.title}</h2>
          <div className="byline" style={{ marginBottom: 10 }}>
            <span>{featured.author}</span>
            <span className="byline-dot">·</span>
            <span>{formatDate(featured.publishedAt || featured.date)}</span>
            <span className="byline-dot">·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="eye" size={11} style={{ opacity: 0.6 }} />
              {formatViews(featured.views)}
            </span>
          </div>
          <p className={styles.featureExcerpt}>{featured.excerpt}</p>
          <span className="read-more" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            Read full story
            <Icon name="arrowRight" size={11} />
          </span>
        </div>

        <button
          className={`${styles.featureBookmark}${bookmarks.has(featured.id) ? ` ${styles.featureBookmarkActive}` : ""}`}
          onClick={(e) => { e.stopPropagation(); toggle(featured.id); }}
          aria-label="Bookmark"
        >
          <Icon name={bookmarks.has(featured.id) ? "bookmarkFilled" : "bookmark"} size={15} />
        </button>
      </div>

      {/* ── Sidebar (right) ── */}
      <div className={styles.sidebar}>
        {sideItems.map((a) => (
          <div key={a.id} className={styles.sideItem} onClick={() => navigate(`/article/${a.id}`)}>
            <img src={a.imageUrl} alt={a.title} className={styles.sideImg} loading="lazy" />
            <div className={styles.sideBody}>
              <CategoryBadge category={a.category} />
              <h3 className={styles.sideTitle}>{a.title}</h3>
              <p className="byline" style={{ fontSize: 10 }}>
                {a.author}
                <span className="byline-dot">·</span>
                {formatDate(a.publishedAt || a.date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
