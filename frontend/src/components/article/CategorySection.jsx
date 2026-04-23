// frontend/src/components/article/CategorySection.jsx
import { useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import Icon from "../ui/Icon";
import { CATEGORY_ICONS } from "../../lib/categories";
import styles from "./CategorySection.module.css";

export default function CategorySection({ category, articles }) {
  const navigate = useNavigate();
  if (!articles || articles.length === 0) return null;

  const iconName = CATEGORY_ICONS[category] || "newspaper";

  return (
    <section className={styles.section}>
      <div className="section-header">
        <Icon name={iconName} size={22} style={{ color: "var(--gold)", flexShrink: 0 }} />
        <h2 className="section-title">{category}</h2>
        <div className="section-line" />
        <button
          className="btn btn-outline"
          onClick={() => navigate(`/category/${category}`)}
          style={{ fontSize: 9, padding: "6px 14px", flexShrink: 0, display: "flex", alignItems: "center", gap: 5 }}
        >
          View All
          <Icon name="chevronRight" size={11} />
        </button>
      </div>

      <div className="grid-3">
        {articles.slice(0, 3).map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}
