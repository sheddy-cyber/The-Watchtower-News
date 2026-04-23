// frontend/src/pages/VerifyEmailPage.jsx
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authApi } from "../lib/api";
import Icon from "../components/ui/Icon";

export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");
  const [status, setStatus] = useState("verifying"); // "verifying" | "success" | "error"

  useEffect(() => {
    if (!token) { setStatus("error"); return; }
    authApi.verifyEmail(token)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <div style={{ maxWidth: 480, margin: "80px auto", textAlign: "center" }}>
      {status === "verifying" && (
        <>
          <div className="page-loader" style={{ minHeight: "auto", marginBottom: 20 }}>
            <span className="spinner" style={{ width: 36, height: 36 }} />
          </div>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--gold-dim)", letterSpacing: "0.1em" }}>
            Verifying your email…
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <Icon name="checkCircle" size={48} style={{ color: "var(--gold)", opacity: 0.7 }} />
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--gold)", marginBottom: 12 }}>
            Email Verified
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
            Your account is now active. Sign in to start reading.
          </p>
          <button
            className="btn btn-gold"
            onClick={() => navigate("/", { state: { openAuth: true } })}
            style={{ padding: "12px 32px", gap: 6 }}
          >
            Sign In Now
            <Icon name="arrowRight" size={13} />
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <Icon name="alertTriangle" size={48} style={{ color: "#e05c5c", opacity: 0.7 }} />
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "#e05c5c", marginBottom: 12 }}>
            Verification Failed
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
            This link is invalid or has expired. Please register again or request a new verification email.
          </p>
          <button
            className="btn btn-outline"
            onClick={() => navigate("/")}
            style={{ padding: "10px 28px", gap: 6 }}
          >
            <Icon name="arrowLeft" size={12} />
            Back to Home
          </button>
        </>
      )}
    </div>
  );
}
