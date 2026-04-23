// frontend/src/hooks/useArticles.js
import { useState, useEffect } from "react";
import { articlesApi } from "../lib/api";

export function useArticles(params = {}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 });

  const key = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    articlesApi.list(params)
      .then((res) => {
        if (cancelled) return;
        setArticles(res.data.articles);
        setMeta({ total: res.data.total, page: res.data.page, pages: res.data.pages });
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.response?.data?.error || "Failed to load articles.");
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { articles, loading, error, meta };
}

export function useArticle(id) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);

    articlesApi.get(id)
      .then((res) => { if (!cancelled) setArticle(res.data); })
      .catch((err) => { if (!cancelled) setError(err.response?.data?.error || "Article not found."); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [id]);

  return { article, loading, error };
}

export function useTrending() {
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    articlesApi.trending()
      .then((res) => setTrending(res.data))
      .catch(() => {});
  }, []);
  return trending;
}

export function useSearch(q) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) { setResults([]); return; }
    let cancelled = false;
    setLoading(true);

    articlesApi.search(q)
      .then((res) => { if (!cancelled) setResults(res.data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [q]);

  return { results, loading };
}
