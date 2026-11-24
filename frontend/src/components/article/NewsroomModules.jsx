import { useState } from "react";
import { Link } from "react-router-dom";
import CategoryBadge from "../ui/CategoryBadge";
import Icon from "../ui/Icon";
import { newsletterApi } from "../../lib/api";
import { timeAgo, formatViews } from "../../lib/categories";
import { useToast } from "../../context/ToastContext";
import SmartImage from "../ui/SmartImage";
import styles from "./NewsroomModules.module.css";

const SIGNALS = [
  { label: "Global equities", value: "In focus", trend: "Positive" },
  { label: "Energy", value: "Volatile", trend: "Watching" },
  { label: "Innovation", value: "Active", trend: "Rising" },
  { label: "Public health", value: "Developing", trend: "New" },
];

function StoryRow({ article, index }) {
  return (
    <Link className={styles.storyRow} to={`/article/${article.id}`}>
      <span className={styles.storyNumber}>{String(index + 1).padStart(2, "0")}</span>
      <span className={styles.storyCopy}>
        <CategoryBadge category={article.category} style={{ marginBottom: 5, transform: "scale(0.86)", transformOrigin: "left" }} />
        <strong>{article.title}</strong>
        <small>{article.author} · <time dateTime={article.publishedAt}>{timeAgo(article.publishedAt)}</time></small>
      </span>
      <Icon name="arrowRight" size={15} className={styles.storyArrow} />
    </Link>
  );
}

export default function NewsroomModules({ articles }) {
  const showToast = useToast();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!articles?.length) return null;

  const popular = [...articles].sort((a, b) => b.views - a.views);
  const latest = [...articles].sort((a, b) => {
    const byDate = new Date(b.publishedAt) - new Date(a.publishedAt);
    return byDate || b.id - a.id;
  });
  const focus = articles.find((article) => article.category === "Technology") || popular[0];
  const photoStories = popular.filter((article) => article.id !== focus.id).slice(0, 3);

  const subscribe = async (event) => {
    event.preventDefault();
    if (!email.trim()) return;

    setSubmitting(true);
    try {
      await newsletterApi.subscribe(email.trim());
      setEmail("");
      showToast("Check your inbox to confirm your subscription.");
    } catch (error) {
      showToast(error.response?.data?.error || "Subscription failed. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.stack}>
      <section className={styles.pulse} aria-label="Newsroom pulse">
        <div className={styles.pulseHeading}>
          <span className={styles.live}><i /> Live newsroom</span>
          <span className={styles.pulseDate}>Updated throughout the day</span>
        </div>
        <div className={styles.pulseStats}>
          <div><strong>{articles.length}</strong><span>stories on the desk</span></div>
          <div><strong>5</strong><span>specialist desks</span></div>
          <div><strong>24/7</strong><span>global perspective</span></div>
          <Link className={styles.pulseAction} to={`/article/${popular[0].id}`}>
            Open the lead story <Icon name="arrowRight" size={14} />
          </Link>
        </div>
      </section>

      <section className={styles.briefingGrid}>
        <div className={styles.latestPanel}>
          <div className={styles.moduleHeading}>
            <div>
              <span className={styles.eyebrow}>Just in</span>
              <h2>The latest</h2>
            </div>
            <span className={styles.moduleNote}>Fresh from our desks</span>
          </div>
          <div className={styles.latestList}>
            {latest.slice(0, 4).map((article, index) => (
              <StoryRow key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>

        <aside className={styles.readPanel}>
          <div className={styles.moduleHeading}>
            <div>
              <span className={styles.eyebrow}>Reader report</span>
              <h2>Most read</h2>
            </div>
            <Icon name="trendingUp" size={19} style={{ color: "var(--gold)" }} />
          </div>
          <ol className={styles.popularList}>
            {popular.slice(0, 5).map((article, index) => (
              <li key={article.id}>
                <Link to={`/article/${article.id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{article.title}</strong>
                  <small><Icon name="eye" size={11} /> {formatViews(article.views)} readers</small>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className={styles.focusGrid}>
        <Link className={styles.focusStory} to={`/article/${focus.id}`}>
          <SmartImage src={focus.imageUrl} alt="" />
          <span className={styles.focusShade} />
          <span className={styles.focusContent}>
            <span className={styles.eyebrow}>Editor's focus</span>
            <CategoryBadge category={focus.category} style={{ marginTop: 9, marginBottom: 11 }} />
            <strong>{focus.title}</strong>
            <em>{focus.excerpt}</em>
            <span className={styles.focusLink}>Read the analysis <Icon name="arrowRight" size={14} /></span>
          </span>
        </Link>

        <div className={styles.signals}>
          <div className={styles.moduleHeading}>
            <div>
              <span className={styles.eyebrow}>The watchlist</span>
              <h2>Signals to follow</h2>
            </div>
            <span className={styles.delayed}>Desk view</span>
          </div>
          <div className={styles.signalList}>
            {SIGNALS.map((signal) => (
              <div key={signal.label} className={styles.signal}>
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
                <small>{signal.trend}</small>
              </div>
            ))}
          </div>
          <p className={styles.signalFoot}>A curated snapshot of the themes guiding today’s coverage.</p>
        </div>
      </section>

      <section className={styles.photoDesk}>
        <div className={styles.photoIntro}>
          <span className={styles.eyebrow}>The visual desk</span>
          <h2>Stories in focus</h2>
          <p>Big moments, thoughtful reporting, and the details worth a closer look.</p>
          <Link className={styles.exploreDesk} to={`/category/${photoStories[0]?.category || "World"}`}>
            Explore the {photoStories[0]?.category || "World"} desk <Icon name="arrowRight" size={12} />
          </Link>
        </div>
        <div className={styles.photoRail}>
          {photoStories.map((article) => (
            <Link key={article.id} className={styles.photoCard} to={`/article/${article.id}`}>
              <SmartImage src={article.imageUrl} alt="" />
              <span>
                <CategoryBadge category={article.category} />
                <strong>{article.title}</strong>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.newsletter}>
        <div className={styles.newsletterMark}><Icon name="mail" size={24} /></div>
        <div>
          <span className={styles.eyebrow}>The daily dispatch</span>
          <h2>Start your day with the stories that matter.</h2>
          <p>A concise, considered morning briefing from The Watchtower newsroom.</p>
        </div>
        <form className={styles.newsletterForm} onSubmit={subscribe}>
          <label className="sr-only" htmlFor="daily-dispatch-email">Email address</label>
          <input
            id="daily-dispatch-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
          <button className="btn btn-gold" type="submit" disabled={submitting}>
            {submitting ? "Joining…" : "Get the briefing"}
            {!submitting && <Icon name="arrowRight" size={12} />}
          </button>
          <small>Free, thoughtful, and easy to leave.</small>
        </form>
      </section>
    </div>
  );
}
