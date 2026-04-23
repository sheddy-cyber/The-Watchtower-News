// frontend/src/components/auth/AuthModal.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { authApi } from "../../lib/api";
import Icon from "../ui/Icon";

export default function AuthModal({ onClose }) {
  const { login, register } = useAuth();
  const showToast = useToast();
  const [tab, setTab] = useState("signin");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((err) => ({ ...err, [k]: null }));
  };

  const validate = () => {
    const errs = {};
    if (tab === "signup" && !form.name.trim()) errs.name = "Name is required.";
    if (!form.email.includes("@")) errs.email = "Enter a valid email.";
    if (form.password.length < 8) errs.password = "Password must be at least 8 characters.";
    if (tab === "signup" && !/[A-Z]/.test(form.password)) errs.password = "Must include an uppercase letter.";
    if (tab === "signup" && !/[0-9]/.test(form.password)) errs.password = "Must include a number.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (tab === "signin") {
        await login(form.email, form.password);
        showToast("Welcome back!");
        onClose();
      } else {
        await register(form.name, form.email, form.password);
        showToast("Account created! Check your email to verify.");
        onClose();
      }
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong. Please try again.";
      const code = err.response?.data?.code;
      if (code === "EMAIL_NOT_VERIFIED") {
        showToast("Please verify your email first.", "error");
      } else {
        setErrors({ form: msg });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    if (!forgotEmail.includes("@")) return;
    setLoading(true);
    try {
      await authApi.forgotPassword(forgotEmail);
      setForgotSent(true);
    } catch {
      showToast("Failed to send reset email.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={16} />
        </button>

        {forgotMode ? (
          <>
            <h2 className="modal-title">Reset Password</h2>
            {forgotSent ? (
              <p className="modal-subtitle" style={{ color: "var(--gold-dim)" }}>
                If that email exists, a reset link has been sent. Check your inbox.
              </p>
            ) : (
              <>
                <p className="modal-subtitle">Enter your email and we'll send a reset link.</p>
                <form onSubmit={handleForgot}>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="input"
                      placeholder="you@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-gold" style={{ width: "100%" }} disabled={loading}>
                    {loading ? <span className="spinner" /> : "Send Reset Link"}
                  </button>
                </form>
              </>
            )}
            <button
              className="btn btn-outline"
              onClick={() => { setForgotMode(false); setForgotSent(false); }}
              style={{ width: "100%", fontSize: 10, marginTop: 14, gap: 6 }}
            >
              <Icon name="arrowLeft" size={11} />
              Back to Sign In
            </button>
          </>
        ) : (
          <>
            <div className="auth-tabs">
              {["signin", "signup"].map((t) => (
                <button
                  key={t}
                  className={`auth-tab${tab === t ? " active" : ""}`}
                  onClick={() => { setTab(t); setErrors({}); }}
                >
                  {t === "signin" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            <h2 className="modal-title">
              {tab === "signin" ? "Welcome Back" : "Join The Watchtower"}
            </h2>
            <p className="modal-subtitle">
              {tab === "signin"
                ? "Sign in to save articles and sync bookmarks."
                : "Create a free account to get started."}
            </p>

            {errors.form && (
              <div style={{
                background: "rgba(224,92,92,0.1)", border: "1px solid rgba(224,92,92,0.4)",
                color: "#e05c5c", padding: "10px 14px", marginBottom: 16,
                fontSize: 13, fontFamily: "var(--font-ui)", borderRadius: "var(--radius)",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <Icon name="alertTriangle" size={13} />
                {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {tab === "signup" && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className={`input${errors.name ? " error" : ""}`}
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={set("name")}
                    autoComplete="name"
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className={`input${errors.email ? " error" : ""}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  autoComplete="email"
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`input${errors.password ? " error" : ""}`}
                  placeholder={tab === "signup" ? "Min 8 chars, 1 uppercase, 1 number" : "Your password"}
                  value={form.password}
                  onChange={set("password")}
                  autoComplete={tab === "signin" ? "current-password" : "new-password"}
                />
                {errors.password && <p className="form-error">{errors.password}</p>}
              </div>

              <button
                type="submit"
                className="btn btn-gold"
                style={{ width: "100%", padding: "12px" }}
                disabled={loading}
              >
                {loading
                  ? <span className="spinner" />
                  : tab === "signin" ? "Sign In" : "Create Account"}
              </button>
            </form>

            {tab === "signin" && (
              <button
                className="btn btn-outline"
                style={{ width: "100%", fontSize: 10, marginTop: 12 }}
                onClick={() => setForgotMode(true)}
              >
                Forgot your password?
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
