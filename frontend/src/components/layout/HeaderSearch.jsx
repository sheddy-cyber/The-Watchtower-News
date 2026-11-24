// frontend/src/components/layout/HeaderSearch.jsx
// Search field with instant suggestions, recent searches, full keyboard
// support and a global "/" shortcut to jump into it.
import { useState, useEffect, useRef, useId } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { articlesApi } from "../../lib/api";
import { getRecentSearches, addRecentSearch, clearRecentSearches } from "../../lib/recentSearches";
import CategoryBadge from "../ui/CategoryBadge";
import Icon from "../ui/Icon";
import styles from "./HeaderSearch.module.css";

export default function HeaderSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const listId = useId();
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);
  const [recent, setRecent] = useState(getRecentSearches);

  const term = query.trim();
  const showingRecent = term.length < 2;

  // Debounced suggestions
  useEffect(() => {
    if (term.length < 2) { setResults([]); setLoading(false); return; }
    setLoading(true);
    let cancelled = false;
    const t = setTimeout(() => {
      articlesApi.search(term)
        .then((r) => { if (!cancelled) setResults(r.data.slice(0, 5)); })
        .catch(() => { if (!cancelled) setResults([]); })
        .finally(() => { if (!cancelled) setLoading(false); });
    }, 250);
    return () => { cancelled = true; clearTimeout(t); };
  }, [term]);

  useEffect(() => { setActive(-1); }, [term, open]);

  // Close on navigation
  useEffect(() => { setOpen(false); }, [location.pathname, location.search]);

  // Click outside closes the panel
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // "/" focuses search from anywhere (unless the user is already typing)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement;
      const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (typing) return;
      if (!inputRef.current || inputRef.current.offsetParent === null) return;
      e.preventDefault();
      inputRef.current.focus();
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const remember = (value) => {
    addRecentSearch(value);
    setRecent(getRecentSearches());
  };

  const finish = () => {
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  const goToSearch = (q) => {
    const value = q.trim();
    if (!value) return;
    remember(value);
    navigate(`/search?q=${encodeURIComponent(value)}`);
    finish();
  };

  const goToArticle = (id) => {
    if (term) remember(term);
    navigate(`/article/${id}`);
    finish();
  };

  // Options the arrow keys move through
  const options = showingRecent
    ? recent.map((q) => ({ type: "recent", q }))
    : [...results.map((a) => ({ type: "article", a })), { type: "all", q: term }];

  const choose = (opt) => {
    if (opt.type === "article") goToArticle(opt.a.id);
    else goToSearch(opt.q);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (options.length ? (i + 1) % options.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (options.length ? (i <= 0 ? options.length - 1 : i - 1) : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && active >= 0 && options[active]) choose(options[active]);
      else goToSearch(query);
    } else if (e.key === "Escape") {
      if (open) setOpen(false);
      else { setQuery(""); inputRef.current?.blur(); }
    }
  };

  const panelVisible = open && (showingRecent ? recent.length > 0 : true);
  const optionId = (i) => `${listId}-opt-${i}`;
  const optionProps = (i, onPick) => ({
    id: optionId(i),
    role: "option",
    "aria-selected": active === i,
    onMouseEnter: () => setActive(i),
    onMouseDown: (e) => e.preventDefault(), // keep focus in the input
    onClick: onPick,
  });

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <form
        className={styles.form}
        role="search"
        onSubmit={(e) => { e.preventDefault(); goToSearch(query); }}
      >
        <Icon name="search" size={14} className={styles.icon} />
        <input
          ref={inputRef}
          className={styles.input}
          type="search"
          placeholder="Search the news…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          aria-label="Search articles"
          role="combobox"
          aria-expanded={panelVisible}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={panelVisible && active >= 0 ? optionId(active) : undefined}
          autoComplete="off"
          enterKeyHint="search"
        />
        {!query && <kbd className={styles.kbd} title="Press / to search">/</kbd>}
        <button type="submit" className={`btn btn-gold ${styles.submit}`} aria-label="Search">
          <Icon name="search" size={12} />
          <span className={styles.submitText}>Search</span>
        </button>
      </form>

      {panelVisible && (
        <div className={styles.panel}>
          {showingRecent ? (
            <>
              <div className={styles.panelHead}>
                <span>Recent searches</span>
                <button
                  type="button"
                  className={styles.clear}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => { clearRecentSearches(); setRecent([]); }}
                >
                  Clear
                </button>
              </div>
              <ul id={listId} role="listbox" aria-label="Recent searches" className={styles.list}>
                {recent.map((q, i) => (
                  <li key={q} {...optionProps(i, () => goToSearch(q))} className={`${styles.option} ${active === i ? styles.optionActive : ""}`}>
                    <Icon name="history" size={14} className={styles.optionIcon} />
                    <span className={styles.recentText}>{q}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className={styles.panelHead}>
                <span>{loading ? "Searching…" : results.length ? "Top matches" : "No quick matches"}</span>
                {loading && <span className="spinner" style={{ width: 12, height: 12, borderWidth: 1.5 }} />}
              </div>
              <ul id={listId} role="listbox" aria-label="Search suggestions" className={styles.list}>
                {results.map((a, i) => (
                  <li key={a.id} {...optionProps(i, () => goToArticle(a.id))} className={`${styles.option} ${active === i ? styles.optionActive : ""}`}>
                    {a.imageUrl ? <img src={a.imageUrl} alt="" className={styles.thumb} loading="lazy" /> : <span className={styles.thumb} />}
                    <span className={styles.optionText}>
                      <strong>{a.title}</strong>
                      <span>
                        <CategoryBadge category={a.category} style={{ marginBottom: 0, fontSize: 8, padding: "1px 6px" }} />
                        {a.author}
                      </span>
                    </span>
                  </li>
                ))}
                <li
                  {...optionProps(results.length, () => goToSearch(term))}
                  className={`${styles.option} ${styles.seeAll} ${active === results.length ? styles.optionActive : ""}`}
                >
                  <Icon name="search" size={14} className={styles.optionIcon} />
                  <span>See all results for <em>“{term}”</em></span>
                  <Icon name="arrowRight" size={13} style={{ marginLeft: "auto" }} />
                </li>
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
