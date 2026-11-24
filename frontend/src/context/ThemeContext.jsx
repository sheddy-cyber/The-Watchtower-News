// frontend/src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const ThemeContext = createContext(null);
// v2 stores only choices the reader actually made. The legacy key was written
// on every visit (always "light" by default), so only an explicit "dark" in it
// is honoured; everyone else now follows their system setting.
const STORAGE_KEY = "wt-theme-v2";
const LEGACY_KEY = "wt-theme";

const systemTheme = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const storedTheme = () => {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    if (t === "light" || t === "dark") return t;
    return localStorage.getItem(LEGACY_KEY) === "dark" ? "dark" : null;
  } catch {
    return null;
  }
};

export function ThemeProvider({ children }) {
  // An explicit choice wins; otherwise follow the operating system.
  const [explicit, setExplicit] = useState(storedTheme);
  const [system, setSystem] = useState(systemTheme);
  const theme = explicit || system;

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;
    const onChange = (e) => setSystem(e.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setExplicit(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
