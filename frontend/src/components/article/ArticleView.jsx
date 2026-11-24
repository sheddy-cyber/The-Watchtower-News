// frontend/src/components/article/ArticleView.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import CategoryBadge from "../ui/CategoryBadge";
import Icon from "../ui/Icon";
import SmartImage from "../ui/SmartImage";
import { formatDate, formatViews, readingTime } from "../../lib/categories";
import { recordRead } from "../../lib/readingHistory";
import { useBookmarks } from "../../context/BookmarkContext";
import { useToast } from "../../context/ToastContext";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";
import styles from "./ArticleView.module.css";

const TEXT_SIZES = ["sm", "md", "lg", "xl"];
const TEXT_SIZE_KEY = "wt_text_size";

function useTextSize() {
  const [size, setSize] = useState(() => {
    const saved = localStorage.getItem(TEXT_SIZE_KEY);
    return TEXT_SIZES.includes(saved) ? saved : "md";
  });
  const change = (delta) => {
    const next = TEXT_SIZES[Math.min(TEXT_SIZES.length - 1, Math.max(0, TEXT_SIZES.indexOf(size) + delta))];
    setSize(next);
    try { localStorage.setItem(TEXT_SIZE_KEY, next); } catch { /* ignore */ }
  };
  return { size, change, isMin: size === TEXT_SIZES[0], isMax: size === TEXT_SIZES[TEXT_SIZES.length - 1] };
}

function ShareMenu({ article }) {
  const showToast = useToast();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const url = window.location.href;

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard");
    } catch {
      showToast("Couldn't copy the link", "error");
    }
    setOpen(false);
  };

  const nativeShare = async () => {
    try { await navigator.share({ title: article.title, text: article.excerpt, url }); }
    catch { /* user cancelled */ }
    setOpen(false);
  };

  const enc = encodeURIComponent;
  const targets = [
    { name: "X (Twitter)", icon: "twitter", href: `https://twitter.com/intent/tweet?text=${enc(article.title)}&url=${enc(url)}` },
    { name: "Facebook", icon: "facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { name: "LinkedIn", icon: "linkedin", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { name: "WhatsApp", icon: "whatsapp", href: `https://wa.me/?text=${enc(`${article.title} ${url}`)}` },
    { name: "Email", icon: "mail", href: `mailto:?subject=${enc(article.title)}&body=${enc(`${article.excerpt || ""}\n\n${url}`)}` },
  ];

  return (
    <div className={styles.shareWrap} ref={ref}>
      <button
        type="button"
        className={`${styles.actionBtn} ${open ? styles.active : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Share this article"
        title="Share"
      >
        <Icon name="share" size={16} />
      </button>
      {open && (
        <div className={styles.shareMenu} role="menu">
          {typeof navigator.share === "function" && (
            <button type="button" role="menuitem" onClick={nativeShare}>
              <Icon name="share" size={14} /> Share via…
            </button>
          )}
          <button type="button" role="menuitem" onClick={copy}>
            <Icon name="link" size={14} /> Copy link
          </button>
          {targets.map((t) => (
            <a
              key={t.name}
              role="menuitem"
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <Icon name={t.icon} size={14} /> {t.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ArticleView({ article }) {
  const navigate = useNavigate();
  const { bookmarks, toggle } = useBookmarks();
  const { size, change, isMin, isMax } = useTextSize();
  const saved = bookmarks.has(article.id);
  const published = article.publishedAt || article.date;

  useEffect(() => { recordRead(article); }, [article]);

  // In-app back when there's history to go back to; otherwise the front page.
  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate("/");
  };

  const paragraphs = (article.content || "").split(/\n\n+/).filter(Boolean);
  const minutes = readingTime(article.content || article.excerpt || "");

  return (
    <article className={styles.wrap}>
      <Helmet>
        <title>{article.title} | The Watchtower</title>
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

      <div className={styles.topBar}>
        <button className="btn btn-outline" onClick={goBack} style={{ gap: 6 }}>
          <Icon name="arrowLeft" size={12} />
          Back
        </button>
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link to={`/category/${article.category}`}>{article.category}</Link>
        </nav>
      </div>

      <header className={styles.header}>
        <div className={styles.categoryRow}>
          <CategoryBadge category={article.category} />
          <div className={styles.actionsContainer}>
            <div className={styles.textSize} role="group" aria-label="Text size">
              <button
                type="button"
                className={styles.actionBtn}
                onClick={() => change(-1)}
                disabled={isMin}
                aria-label="Decrease text size"
                title="Smaller text"
              >
                <span className={styles.aSmall}>A</span>
              </button>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={() => change(1)}
                disabled={isMax}
                aria-label="Increase text size"
                title="Larger text"
              >
                <span className={styles.aLarge}>A</span>
              </button>
            </div>
            <button
              type="button"
              className={`${styles.actionBtn} ${saved ? styles.active : ""}`}
              onClick={() => toggle(article.id)}
              aria-pressed={saved}
              aria-label={saved ? "Remove from saved" : "Save for later"}
              title={saved ? "Remove from saved" : "Save for later"}
            >
              <Icon name={saved ? "bookmarkFilled" : "bookmark"} size={16} />
            </button>
            <ShareMenu article={article} />
          </div>
        </div>

        <h1 className={styles.title}>{article.title}</h1>
        {article.excerpt && <p className={styles.standfirst}>{article.excerpt}</p>}

        <div className={styles.metaBar}>
          <div className="byline">
            <span className={styles.author}>By {article.author}</span>
            <span className="byline-dot">·</span>
            <time dateTime={published}>{formatDate(published)}</time>
            <span className="byline-dot">·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="clock" size={12} style={{ opacity: 0.6 }} />
              {minutes} min read
            </span>
            <span className="byline-dot">·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="eye" size={12} style={{ opacity: 0.6 }} />
              {formatViews(article.views)} views
            </span>
          </div>
        </div>
      </header>

      <SmartImage src={article.imageUrl} alt={article.title} className={styles.heroImg} loading="eager" fetchpriority="high" />

      <div className={`${styles.body} ${styles[`size_${size}`]}`}>
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

      <div className={styles.endActions}>
        <p>Found this useful?</p>
        <div>
          <button type="button" className={`btn ${saved ? "btn-outline active" : "btn-outline"}`} onClick={() => toggle(article.id)} style={{ gap: 6 }}>
            <Icon name={saved ? "bookmarkFilled" : "bookmark"} size={12} />
            {saved ? "Saved" : "Save for later"}
          </button>
          <Link to={`/category/${article.category}`} className="btn btn-outline" style={{ gap: 6 }}>
            More {article.category} <Icon name="arrowRight" size={12} />
          </Link>
        </div>
      </div>

      {article.similar && article.similar.length > 0 && (
        <section className={styles.similarSection} aria-labelledby="similar-title">
          <h2 id="similar-title" className={styles.similarTitle}>More from {article.category}</h2>
          <div className={styles.similarGrid}>
            {article.similar.map((sim) => (
              <ArticleCard key={sim.id} article={sim} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
