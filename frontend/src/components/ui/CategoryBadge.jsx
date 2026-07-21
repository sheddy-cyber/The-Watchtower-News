// frontend/src/components/ui/CategoryBadge.jsx

/**
 * CategoryBadge renders section-specific editorial color tags.
 * Each category pair is defined as CSS custom properties in globals.css,
 * keyed as --cat-{slug}-bg and --cat-{slug}-text.
 * Dark/light mode is handled automatically by the CSS variable system.
 */

const SLUG_MAP = {
  World:      "world",
  Technology: "technology",
  Business:   "business",
  Health:     "health",
  Sports:     "sports",
  Politics:   "politics",
  Culture:    "culture",
  Opinion:    "opinion",
  Science:    "science",
  Breaking:   "breaking",
};

export default function CategoryBadge({ category, style = {} }) {
  const slug = SLUG_MAP[category] ?? "politics"; // fallback to politics palette

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
        borderRadius: "var(--radius-sm)",
        background: `var(--cat-${slug}-bg)`,
        color: `var(--cat-${slug}-text)`,
        border: `1px solid color-mix(in srgb, var(--cat-${slug}-text) 25%, transparent)`,
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
