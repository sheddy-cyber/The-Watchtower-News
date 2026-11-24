// frontend/src/components/layout/Header.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { articlesApi } from "../../lib/api";
import { CATEGORIES } from "../../lib/categories";
import AuthModal from "../auth/AuthModal";
import Icon from "../ui/Icon";
import ThemeToggle from "../ui/ThemeToggle";
import HeaderSearch from "./HeaderSearch";
import styles from "./Header.module.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [trending, setTrending] = useState([]);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    articlesApi.trending().then((r) => setTrending(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (location.state?.openAuth) {
      setShowAuth(true);
      // Clear the flag without wiping the router's own history state
      navigate(`${location.pathname}${location.search}`, { replace: true, state: null });
    }
  }, [location.state, location.pathname, location.search, navigate]);

  const isActive = (path) => location.pathname.toLowerCase() === path.toLowerCase();
  const navClass = (path) => `${styles.navItem} ${isActive(path) ? styles.navActive : ""}`;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      {/* ── MASTHEAD — scrolls with the page ── */}
      <div className={styles.masthead}>
        {trending.length > 0 && (
          <div className={styles.ticker}>
            <span className={styles.tickerLabel}>
              <Icon name="trendingUp" size={12} />
              Trending
            </span>
            <div className={styles.tickerTrack}>
              <div className={styles.tickerInner}>
                {[...trending, ...trending].map((a, i) => (
                  <Link
                    key={i}
                    to={`/article/${a.id}`}
                    className={styles.tickerItem}
                    aria-hidden={i >= trending.length ? "true" : undefined}
                    tabIndex={i >= trending.length ? -1 : undefined}
                  >
                    <Icon name="dot" size={6} style={{ opacity: 0.5, marginRight: 2 }} />
                    {a.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className={styles.mastheadRow}>
          {/* Left side: date + theme toggle */}
          <div className={styles.mastheadSideLeft}>
            <span className={styles.mastheadDate}>{today}</span>
          </div>

          <Link to="/" className={styles.mastheadCenter}>
            <h1 className={styles.mastheadTitle}>The Watchtower</h1>
            <div className={styles.mastheadRule}>
              <span className={styles.ruleLine} />
              <span className={styles.ruleDiamond} />
              <span className={`${styles.ruleLine} ${styles.ruleLineRight}`} />
            </div>
            <p className={styles.mastheadTagline}>Truth in Every Edition</p>
          </Link>

          {/* Right side: theme toggle + auth */}
          <div className={styles.mastheadSideRight}>
            <ThemeToggle />
            {user ? (
              <div className={styles.userMenu}>
                <Link to="/profile" className="btn btn-outline" style={{ fontSize: 10, gap: 6 }}>
                  <Icon name="user" size={12} />
                  {user.name.split(" ")[0]}
                </Link>
                <button className="btn btn-outline" style={{ fontSize: 10, gap: 6 }} onClick={logout}>
                  <Icon name="logOut" size={12} />
                  Sign Out
                </button>
              </div>
            ) : (
              <button className="btn btn-outline" style={{ gap: 6 }} onClick={() => setShowAuth(true)}>
                <Icon name="user" size={12} />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── STICKY NAV — always visible at top ── */}
      <div className={styles.stickyBar}>
        <nav aria-label="Sections">
          <div className={styles.navInner}>
            <ul className={styles.navLinks}>
              <li>
                <Link to="/" className={navClass("/")} aria-current={isActive("/") ? "page" : undefined}>
                  Home
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/category/${cat}`}
                    className={navClass(`/category/${cat}`)}
                    aria-current={isActive(`/category/${cat}`) ? "page" : undefined}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/saved" className={navClass("/saved")} aria-current={isActive("/saved") ? "page" : undefined}>
                  Saved
                </Link>
              </li>
              <li>
                <Link to="/puzzles" className={navClass("/puzzles")} aria-current={isActive("/puzzles") ? "page" : undefined}>
                  Puzzles
                </Link>
              </li>
            </ul>

            <div className={styles.searchRow}>
              <HeaderSearch />
              <div className={styles.navThemeToggle}>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
