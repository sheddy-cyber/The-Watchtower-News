// frontend/src/components/layout/Header.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { articlesApi } from "../../lib/api";
import { CATEGORIES } from "../../lib/categories";
import AuthModal from "../auth/AuthModal";
import Icon from "../ui/Icon";
import ThemeToggle from "../ui/ThemeToggle";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [trending, setTrending] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    articlesApi.trending().then((r) => setTrending(r.data)).catch(() => {});
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (location.state?.openAuth) {
      setShowAuth(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const doSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchQuery("");
    setMobileMenuOpen(false);
  };

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
                  <span key={i} className={styles.tickerItem} onClick={() => navigate(`/article/${a.id}`)}>
                    <Icon name="dot" size={6} style={{ opacity: 0.5, marginRight: 2 }} />
                    {a.title}
                  </span>
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
        <nav>
          <div className={styles.navInner}>
            <button
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <Icon name={mobileMenuOpen ? "close" : "menu"} size={20} style={{ color: "var(--gold)" }} />
            </button>

            <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.navOpen : ""}`}>
              <li>
                <Link to="/" className={`${styles.navItem} ${location.pathname === "/" ? styles.navActive : ""}`}>
                  Home
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/category/${cat}`}
                    className={`${styles.navItem} ${location.pathname === `/category/${cat}` ? styles.navActive : ""}`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
              {/* Mobile-only: theme toggle + auth inside drawer */}
              <li className={styles.mobileExtras}>
                <div className={styles.mobileExtrasRow}>
                  <ThemeToggle />
                  {user ? (
                    <button className={styles.mobileAuthBtn} onClick={logout}>
                      <Icon name="logOut" size={12} /> Sign Out
                    </button>
                  ) : (
                    <button className={styles.mobileAuthBtn} onClick={() => { setShowAuth(true); setMobileMenuOpen(false); }}>
                      <Icon name="user" size={12} /> Sign In
                    </button>
                  )}
                </div>
              </li>
            </ul>

            <div className={styles.searchRow}>
              <div className={styles.searchWrap}>
                <Icon name="search" size={14} className={styles.searchIcon} />
                <input
                  ref={searchRef}
                  className={styles.searchInput}
                  placeholder="Search articles, authors…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && doSearch()}
                  aria-label="Search"
                />
              </div>
              <button
                className={`btn btn-gold ${styles.searchBtn}`}
                onClick={doSearch}
                style={{ padding: "7px 16px", fontSize: 10, flexShrink: 0 }}
              >
                <Icon name="search" size={12} style={{ flexShrink: 0 }} />
                <span className={styles.searchBtnText}>Search</span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
