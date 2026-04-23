// frontend/src/context/BookmarkContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { bookmarksApi } from "../lib/api";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

const BookmarkContext = createContext(null);

export function BookmarkProvider({ children }) {
  const { user } = useAuth();
  const showToast = useToast();
  const [bookmarks, setBookmarks] = useState(new Set());

  // Load on mount and whenever auth state changes
  useEffect(() => {
    if (user) {
      bookmarksApi
        .list()
        .then((r) => setBookmarks(new Set(r.data.map((a) => a.id))))
        .catch(() => {});
    } else {
      // Guest — read from localStorage
      try {
        const stored = JSON.parse(localStorage.getItem("wt_bookmarks") || "[]");
        setBookmarks(new Set(stored));
      } catch {
        setBookmarks(new Set());
      }
    }
  }, [user]);

  const toggle = useCallback(
    async (articleId) => {
      const wasBookmarked = bookmarks.has(articleId);

      // Optimistic update — shared across ALL components instantly
      setBookmarks((prev) => {
        const next = new Set(prev);
        wasBookmarked ? next.delete(articleId) : next.add(articleId);
        return next;
      });

      showToast(wasBookmarked ? "Removed from bookmarks" : "Saved to bookmarks");

      if (user) {
        try {
          wasBookmarked
            ? await bookmarksApi.remove(articleId)
            : await bookmarksApi.add(articleId);
        } catch {
          // Rollback on API failure
          setBookmarks((prev) => {
            const next = new Set(prev);
            wasBookmarked ? next.add(articleId) : next.delete(articleId);
            return next;
          });
          showToast("Failed to update bookmark", "error");
        }
      } else {
        // Persist guest bookmarks to localStorage
        setBookmarks((prev) => {
          localStorage.setItem("wt_bookmarks", JSON.stringify([...prev]));
          return prev;
        });
      }
    },
    [bookmarks, user, showToast]
  );

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggle }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarkProvider");
  return ctx;
}
