// frontend/src/components/ui/Skeleton.jsx
// Shimmering placeholders that mirror the real layout while content loads.

export function Skeleton({ width = "100%", height = 14, style = {}, className = "" }) {
  return <span className={`skeleton ${className}`} style={{ width, height, ...style }} aria-hidden="true" />;
}

export function CardSkeleton() {
  return (
    <div className="card skeleton-card" aria-hidden="true">
      <Skeleton height={190} style={{ borderRadius: 0 }} />
      <div style={{ padding: "18px 20px 20px", display: "grid", gap: 10 }}>
        <Skeleton width={70} height={16} />
        <Skeleton height={20} />
        <Skeleton width="80%" height={20} />
        <Skeleton width="55%" height={12} />
        <Skeleton height={12} />
        <Skeleton width="90%" height={12} />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 8, columns = 4 }) {
  return (
    <div className={`grid-${columns}`} role="status" aria-label="Loading articles">
      {Array.from({ length: count }, (_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div role="status" aria-label="Loading the latest edition">
      <div className="skeleton-hero">
        <Skeleton height="100%" style={{ borderRadius: 0, minHeight: 420 }} />
        <div style={{ display: "grid", gap: 2 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ padding: 18, display: "grid", gap: 10, alignContent: "end", background: "var(--hero-sidebar-bg)" }}>
              <Skeleton width={64} height={16} />
              <Skeleton height={16} />
              <Skeleton width="70%" height={16} />
            </div>
          ))}
        </div>
      </div>
      <GridSkeleton count={3} columns={3} />
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gap: 14 }} role="status" aria-label="Loading article">
      <Skeleton width={90} height={34} />
      <Skeleton height={400} style={{ marginBottom: 18 }} />
      <Skeleton width={80} height={18} />
      <Skeleton height={38} />
      <Skeleton width="65%" height={38} style={{ marginBottom: 18 }} />
      {Array.from({ length: 7 }, (_, i) => <Skeleton key={i} width={i % 3 === 2 ? "75%" : "100%"} height={16} />)}
    </div>
  );
}
