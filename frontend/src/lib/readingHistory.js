// frontend/src/lib/readingHistory.js
// Small, local-only record of recently opened articles (newest first).

const KEY = "wt_history";
const MAX = 12;

export function getHistory() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function recordRead(article) {
  if (!article?.id) return;
  const entry = {
    id: article.id,
    title: article.title,
    category: article.category,
    imageUrl: article.imageUrl,
    author: article.author,
    excerpt: article.excerpt,
    views: article.views,
    publishedAt: article.publishedAt,
    readAt: new Date().toISOString(),
  };
  const next = [entry, ...getHistory().filter((a) => a.id !== article.id)].slice(0, MAX);
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage full or blocked */ }
}

export function clearHistory() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}
