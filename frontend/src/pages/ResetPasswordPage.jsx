// frontend/src/pages/ResetPasswordPage.jsx
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authApi } from "../lib/api";
import { useToast } from "../context/ToastContext";
import Icon from "../components/ui/Icon";

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const showToast = useToast();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (password.length < 8) errs.password = "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password)) errs.password = "Must include an uppercase letter.";
    if (!/[0-9]/.test(password)) errs.password = "Must include a number.";
    if (password !== confirm) errs.confirm = "Passwords do not match.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await authApi.resetPassword(token, password);
      setDone(true);
      showToast("Password reset successfully!");
    } catch (err) {
      const msg = err.response?.data?.error || "Reset failed. The link may have expired.";
      setErrors({ form: msg });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div style={{ maxWidth: 440, margin: "80px auto", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <Icon name="alertTriangle" size={48} style={{ color: "#e05c5c", opacity: 0.7 }} />
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "#e05c5c", marginBottom: 12 }}>Invalid Link</h1>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>This password reset link is invalid.</p>
        <button className="btn btn-outline" onClick={() => navigate("/")} style={{ gap: 6 }}>
          <Icon name="arrowLeft" size={12} /> Back to Home
        </button>
      </div>
    );
  }

  if (done) {
    return (
      <div style={{ maxWidth: 440, margin: "80px auto", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <Icon name="checkCircle" size={48} style={{ color: "var(--gold)", opacity: 0.7 }} />
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--gold)", marginBottom: 12 }}>
          Password Updated
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: 28 }}>
          Your password has been reset. You can now sign in with your new password.
        </p>
        <button
          className="btn btn-gold"
          onClick={() => navigate("/", { state: { openAuth: true } })}
          style={{ padding: "12px 32px", gap: 6 }}
        >
          Sign In
          <Icon name="arrowRight" size={13} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 440, margin: "80px auto" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--gold)", marginBottom: 8 }}>
        Reset Password
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: 15 }}>
        Choose a strong new password for your account.
      </p>

      {errors.form && (
        <div style={{
          background: "rgba(224,92,92,0.1)", border: "1px solid rgba(224,92,92,0.35)",
          color: "#e05c5c", padding: "10px 14px", marginBottom: 20,
          fontSize: 13, fontFamily: "var(--font-ui)", borderRadius: "var(--radius)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <Icon name="alertTriangle" size={14} />
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className={`input${errors.password ? " error" : ""}`}
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors((err) => ({ ...err, password: null })); }}
            autoComplete="new-password"
          />
          {errors.password && <p className="form-error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className={`input${errors.confirm ? " error" : ""}`}
            placeholder="Repeat your new password"
            value={confirm}
            onChange={(e) => { setConfirm(e.target.value); setErrors((err) => ({ ...err, confirm: null })); }}
            autoComplete="new-password"
          />
          {errors.confirm && <p className="form-error">{errors.confirm}</p>}
        </div>

        <button
          type="submit"
          className="btn btn-gold"
          style={{ width: "100%", padding: 12 }}
          disabled={loading}
        >
          {loading ? <span className="spinner" /> : "Set New Password"}
        </button>
      </form>
    </div>
  );
}
