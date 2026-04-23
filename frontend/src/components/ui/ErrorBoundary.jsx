// frontend/src/components/ui/ErrorBoundary.jsx
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("Render error:", error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg-page)",
          padding: 24,
        }}>
          <div style={{ textAlign: "center", maxWidth: 480 }}>
            {/* CSS triangle ornament — no emoji */}
            <div style={{
              width: 52, height: 52, margin: "0 auto 24px",
              border: "2px solid rgba(212,175,55,0.35)",
              transform: "rotate(45deg)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                transform: "rotate(-45deg)",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 22,
                color: "rgba(212,175,55,0.5)",
                fontWeight: 700,
                lineHeight: 1,
              }}>!</span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(22px, 4vw, 30px)",
              color: "#d4af37",
              marginBottom: 12,
            }}>
              Something went wrong
            </h1>
            <p style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontSize: 16,
              color: "var(--text-muted)",
              lineHeight: 1.7,
              marginBottom: 28,
            }}>
              An unexpected error occurred. Refreshing the page usually fixes this.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "#d4af37",
                color: "var(--bg-page)",
                border: "none",
                padding: "10px 28px",
                fontFamily: "'Montserrat', Arial, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: 2,
              }}
            >
              Refresh Page
            </button>

            {import.meta.env.DEV && this.state.error && (
              <pre style={{
                marginTop: 24,
                padding: 16,
                background: "rgba(224,92,92,0.08)",
                border: "1px solid rgba(224,92,92,0.2)",
                borderRadius: 2,
                fontSize: 11,
                color: "#e05c5c",
                textAlign: "left",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}>
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
