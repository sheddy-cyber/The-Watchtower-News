// frontend/src/lib/recentSearches.js
const KEY = "wt_recent_searches";
const MAX = 5;

export function getRecentSearches() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(list) ? list.filter((q) => typeof q === "string") : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(q) {
  const term = q.trim();
  if (!term) return;
  const next = [term, ...getRecentSearches().filter((x) => x.toLowerCase() !== term.toLowerCase())].slice(0, MAX);
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
}

export function clearRecentSearches() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}
