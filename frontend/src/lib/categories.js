// frontend/src/lib/categories.js

export const CATEGORIES = ["World", "Technology", "Business", "Health", "Sports"];

export const CATEGORY_COLORS = {
  World:      { bg: "#1e3a5f", text: "#7ab3e8" },
  Technology: { bg: "#1a3a2e", text: "#5ecba1" },
  Business:   { bg: "#3a2a10", text: "#e8b84b" },
  Health:     { bg: "#3a1a2a", text: "#e87ab3" },
  Sports:     { bg: "#1a2a3a", text: "#7ab8e8" },
};

export const CATEGORY_ICONS = {
  World:      "globe",
  Technology: "cpu",
  Business:   "barChart",
  Health:     "heart",
  Sports:     "trophy",
};

export const getCategoryColor = (cat) =>
  CATEGORY_COLORS[cat] || { bg: "#2a2a2a", text: "#aaa" };

export const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const formatViews = (v) =>
  v >= 1000 ? (v / 1000).toFixed(1) + "K" : String(v);
