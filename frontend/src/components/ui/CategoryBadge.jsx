// frontend/src/components/ui/CategoryBadge.jsx
import { useTheme } from "../../context/ThemeContext";

const DARK_COLORS = {
  World:      { bg: "#1e3a5f", text: "#7ab3e8" },
  Technology: { bg: "#1a3a2e", text: "#5ecba1" },
  Business:   { bg: "#3a2a10", text: "#e8b84b" },
  Health:     { bg: "#3a1a2a", text: "#e87ab3" },
  Sports:     { bg: "#1a2a3a", text: "#7ab8e8" },
};

const LIGHT_COLORS = {
  World:      { bg: "#dbeafe", text: "#1e40af" },
  Technology: { bg: "#d1fae5", text: "#065f46" },
  Business:   { bg: "#fef3c7", text: "#92400e" },
  Health:     { bg: "#fce7f3", text: "#9d174d" },
  Sports:     { bg: "#e0f2fe", text: "#075985" },
};

export default function CategoryBadge({ category, style = {} }) {
  const { theme } = useTheme();
  const palette = theme === "light" ? LIGHT_COLORS : DARK_COLORS;
  const { bg, text } = palette[category] || (theme === "light"
    ? { bg: "#f3f4f6", text: "#374151" }
    : { bg: "#2a2a2a", text: "#aaa" });

  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-ui)",
        fontSize: "9px",
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        padding: "3px 8px",
        borderRadius: "1px",
        background: bg,
        color: text,
        border: `1px solid ${text}33`,
        whiteSpace: "nowrap",
        flexShrink: 0,
        marginBottom: 8,
        lineHeight: 1.6,
        ...style,
      }}
    >
      {category}
    </span>
  );
}
