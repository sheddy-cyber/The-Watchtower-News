// frontend/src/components/article/RecentlyRead.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { getHistory, clearHistory } from "../../lib/readingHistory";
import { timeAgo } from "../../lib/categories";
import CategoryBadge from "../ui/CategoryBadge";
import SmartImage from "../ui/SmartImage";
import Icon from "../ui/Icon";
import styles from "./RecentlyRead.module.css";

/** "Pick up where you left off" — the reader's own recent history (local only). */
export default function RecentlyRead({ limit = 4, title = "Pick up where you left off", excludeId }) {
  const [items, setItems] = useState(() => getHistory().filter((a) => a.id !== excludeId).slice(0, limit));

  if (!items.length) return null;

  return (
    <section className={styles.wrap} aria-labelledby="recently-read-title">
      <div className={styles.head}>
        <h2 id="recently-read-title" className={styles.title}>
          <Icon name="history" size={16} /> {title}
        </h2>
        <button
          type="button"
          className={styles.clear}
          onClick={() => { clearHistory(); setItems([]); }}
        >
          Clear history
        </button>
      </div>
      <div className={styles.rail}>
        {items.map((a) => (
          <Link key={a.id} to={`/article/${a.id}`} className={styles.item}>
            <SmartImage src={a.imageUrl} alt="" className={styles.thumb} />
            <span className={styles.copy}>
              <CategoryBadge category={a.category} style={{ marginBottom: 4, fontSize: 8, padding: "1px 6px" }} />
              <strong>{a.title}</strong>
              <small>Read {timeAgo(a.readAt).toLowerCase()}</small>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
