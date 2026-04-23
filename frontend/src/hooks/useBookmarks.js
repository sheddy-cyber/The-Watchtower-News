// frontend/src/hooks/useBookmarks.js
import { useState, useEffect, useCallback } from "react";
import { bookmarksApi } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export function useBookmarks() {
  const { user } = useAuth();
  const showToast = useToast();
  const [bookmarks, setBookmarks] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Load bookmarks from API (logged in) or localStorage (guest)
  useEffect(() => {
    if (user) {
      setLoading(true);
      bookmarksApi.list()
        .then((r) => setBookmarks(new Set(r.data.map((a) => a.id))))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      try {
        const stored = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        setBookmarks(new Set(stored));
      } catch {
        setBookmarks(new Set());
      }
    }
  }, [user]);

  const toggle = useCallback(async (articleId) => {
    const isBookmarked = bookmarks.has(articleId);

    // Optimistic update
    setBookmarks((prev) => {
      const next = new Set(prev);
      isBookmarked ? next.delete(articleId) : next.add(articleId);
      return next;
    });

    showToast(isBookmarked ? "Removed from bookmarks" : "Saved to bookmarks");

    if (user) {
      try {
        if (isBookmarked) {
          await bookmarksApi.remove(articleId);
        } else {
          await bookmarksApi.add(articleId);
        }
      } catch {
        // Rollback
        setBookmarks((prev) => {
          const next = new Set(prev);
          isBookmarked ? next.add(articleId) : next.delete(articleId);
          return next;
        });
        showToast("Failed to update bookmark", "error");
      }
    } else {
      // Persist to localStorage for guests
      const next = new Set(bookmarks);
      isBookmarked ? next.delete(articleId) : next.add(articleId);
      localStorage.setItem("bookmarks", JSON.stringify([...next]));
    }
  }, [bookmarks, user, showToast]);

  return { bookmarks, toggle, loading };
}
