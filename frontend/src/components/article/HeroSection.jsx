// frontend/src/components/article/HeroSection.jsx
import { Link } from "react-router-dom";
import CategoryBadge from "../ui/CategoryBadge";
import Icon from "../ui/Icon";
import SmartImage from "../ui/SmartImage";
import { formatViews, timeAgo } from "../../lib/categories";
import { useBookmarks } from "../../context/BookmarkContext";
import styles from "./HeroSection.module.css";

export default function HeroSection({ articles }) {
  const { bookmarks, toggle } = useBookmarks();

  if (!articles || articles.length === 0) return null;

  const [featured, ...sidebar] = articles;
  const sideItems = sidebar.slice(0, 3);
  const featuredSaved = bookmarks.has(featured.id);
  const featuredDate = featured.publishedAt || featured.date;

  return (
    <section className={styles.hero} aria-label="Top stories">
      {/* ── Featured (left) ── */}
      <div className={styles.feature}>
        <SmartImage src={featured.imageUrl} alt="" className={styles.featureImg} loading="eager" fetchpriority="high" />
        <div className={styles.featureOverlay} />
        <div className={styles.featureContent}>
          <CategoryBadge category={featured.category} />
          <h2 className={styles.featureTitle}>
            <Link to={`/article/${featured.id}`} className={styles.featureLink}>{featured.title}</Link>
          </h2>
          <div className="byline" style={{ marginBottom: 10 }}>
            <span>{featured.author}</span>
            <span className="byline-dot">·</span>
            <time dateTime={featuredDate}>{timeAgo(featuredDate)}</time>
            <span className="byline-dot">·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="eye" size={11} style={{ opacity: 0.6 }} />
              {formatViews(featured.views)}
            </span>
          </div>
          <p className={styles.featureExcerpt}>{featured.excerpt}</p>
          <span className="read-more" aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            Read full story
            <Icon name="arrowRight" size={11} />
          </span>
        </div>

        <button
          type="button"
          className={`${styles.featureBookmark}${featuredSaved ? ` ${styles.featureBookmarkActive}` : ""}`}
          onClick={() => toggle(featured.id)}
          aria-label={featuredSaved ? "Remove from saved" : "Save story"}
          aria-pressed={featuredSaved}
        >
          <Icon name={featuredSaved ? "bookmarkFilled" : "bookmark"} size={15} />
        </button>
      </div>

      {/* ── Sidebar (right) ── */}
      <div className={styles.sidebar}>
        {sideItems.map((a) => {
          const date = a.publishedAt || a.date;
          return (
            <Link key={a.id} to={`/article/${a.id}`} className={styles.sideItem}>
              <SmartImage src={a.imageUrl} alt="" className={styles.sideImg} />
              <div className={styles.sideBody}>
                <CategoryBadge category={a.category} />
                <h3 className={styles.sideTitle}>{a.title}</h3>
                <p className="byline" style={{ fontSize: 10 }}>
                  {a.author}
                  <span className="byline-dot">·</span>
                  <time dateTime={date}>{timeAgo(date)}</time>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
