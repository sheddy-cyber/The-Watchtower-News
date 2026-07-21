// frontend/src/components/layout/MobileBottomNav.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../ui/Icon";
import MobileNavSheet from "./MobileNavSheet";
import AuthModal from "../auth/AuthModal";
import styles from "./MobileBottomNav.module.css";

export default function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const isActive = (path) => location.pathname === path && !sheetOpen;

  return (
    <>
      <nav className={styles.bottomNav} aria-label="Mobile Navigation">
        <button
          className={`${styles.tab}${isActive("/") ? ` ${styles.active}` : ""}`}
          onClick={() => {
            setSheetOpen(false);
            navigate("/");
          }}
        >
          <Icon name="newspaper" size={18} />
          <span>Home</span>
        </button>

        <button
          className={`${styles.tab}${isActive("/saved") ? ` ${styles.active}` : ""}`}
          onClick={() => {
            setSheetOpen(false);
            navigate("/saved");
          }}
        >
          <Icon name="bookmark" size={18} />
          <span>Saved</span>
        </button>

        <button
          className={`${styles.tab}${isActive("/puzzles") ? ` ${styles.active}` : ""}`}
          onClick={() => {
            setSheetOpen(false);
            navigate("/puzzles");
          }}
        >
          <Icon name="grid" size={18} />
          <span>Puzzles</span>
        </button>

        <button
          className={`${styles.tab}${sheetOpen ? ` ${styles.active}` : ""}`}
          onClick={() => setSheetOpen((o) => !o)}
        >
          <Icon name={sheetOpen ? "close" : "menu"} size={18} />
          <span>Menu</span>
        </button>
      </nav>

      <MobileNavSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
    </>
  );
}
