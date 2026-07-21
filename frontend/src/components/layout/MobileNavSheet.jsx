// frontend/src/components/layout/MobileNavSheet.jsx
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../../lib/categories";
import { useAuth } from "../../context/AuthContext";
import Icon from "../ui/Icon";
import styles from "./MobileNavSheet.module.css";

export default function MobileNavSheet({ isOpen, onClose, onOpenAuth }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNav = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        {/* Handle / Header */}
        <div className={styles.handleBar}>
          <div className={styles.handle} />
        </div>

        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>The Watchtower</span>
            <h2 className={styles.title}>Menu & Desks</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {/* User Section */}
          <div className={styles.userCard}>
            {user ? (
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className={styles.userDetails}>
                  <strong>{user.name}</strong>
                  <small>{user.email}</small>
                </div>
                <button
                  className="btn btn-outline"
                  onClick={() => { onClose(); logout(); }}
                  style={{ fontSize: 10, padding: "6px 10px" }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className={styles.authPromo}>
                <div>
                  <strong>Join The Watchtower</strong>
                  <p>Save articles, sync across devices & receive briefings.</p>
                </div>
                <button
                  className="btn btn-gold"
                  onClick={() => { onClose(); onOpenAuth(); }}
                  style={{ fontSize: 11, padding: "8px 16px" }}
                >
                  <Icon name="user" size={13} /> Sign In / Register
                </button>
              </div>
            )}
          </div>

          {/* Categories Grid */}
          <div className={styles.sectionGroup}>
            <span className={styles.groupHeading}>Editorial Desks</span>
            <div className={styles.categoryGrid}>
              <button
                className={styles.categoryCard}
                onClick={() => handleNav("/")}
              >
                <Icon name="newspaper" size={18} />
                <span>Front Page</span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={styles.categoryCard}
                  onClick={() => handleNav(`/category/${cat}`)}
                >
                  <Icon name="trendingUp" size={18} />
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.sectionGroup}>
            <span className={styles.groupHeading}>Information & Company</span>
            <div className={styles.linksList}>
              <button onClick={() => handleNav("/about")}>About Us</button>
              <button onClick={() => handleNav("/contact")}>Contact & Tips</button>
              <button onClick={() => handleNav("/careers")}>Careers</button>
              <button onClick={() => handleNav("/privacy")}>Privacy Policy</button>
              <button onClick={() => handleNav("/terms")}>Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
