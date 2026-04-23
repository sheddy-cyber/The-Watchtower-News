// frontend/src/components/layout/Footer.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../lib/categories";
import { newsletterApi } from "../../lib/api";
import { useToast } from "../../context/ToastContext";
import Icon from "../ui/Icon";
import styles from "./Footer.module.css";

export default function Footer() {
  const showToast = useToast();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      await newsletterApi.subscribe(email.trim());
      showToast("Check your email to confirm your subscription!");
      setEmail("");
    } catch (err) {
      const msg = err.response?.data?.error || "Subscription failed. Please try again.";
      showToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const socials = [
    { icon: "twitter",  label: "X / Twitter" },
    { icon: "facebook", label: "Facebook" },
    { icon: "linkedin", label: "LinkedIn" },
    { icon: "mail",     label: "Email" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          {/* Brand */}
          <div>
            <p className={styles.brand}>The Watchtower</p>
            <p className={styles.brandTagline}>Truth in Every Edition</p>
            <p className={styles.brandDesc}>
              Independent journalism since 1892. Committed to truth, depth, and integrity in every story we tell.
            </p>
            <div className={styles.socials}>
              {socials.map(({ icon, label }) => (
                <button key={icon} className={styles.socialBtn} aria-label={label}>
                  <Icon name={icon} size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className={styles.colHead}>Categories</p>
            <ul className={styles.links}>
              {CATEGORIES.map((c) => (
                <li key={c}><Link to={`/category/${c}`}>{c}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className={styles.colHead}>Company</p>
            <ul className={styles.links}>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className={styles.colHead}>Newsletter</p>
            <p className={styles.newsletterDesc}>Stay informed with our daily briefing delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className={styles.newsletterInput}
                required
              />
              <button type="submit" className="btn btn-gold" disabled={submitting}>
                {submitting ? "…" : "Subscribe"}
              </button>
            </form>
            <p className={styles.newsletterNote}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 The Watchtower. All rights reserved.</span>
          <span>Established 1892 · Independent News Since the Beginning</span>
        </div>
      </div>
    </footer>
  );
}
