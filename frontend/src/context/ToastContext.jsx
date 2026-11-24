// frontend/src/context/ToastContext.jsx
import { createContext, useContext, useState, useCallback, useRef } from "react";
import Icon from "../components/ui/Icon";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const showToast = useCallback((message, type = "success") => {
    const id = ++nextId.current;
    // Keep at most three on screen so rapid actions don't bury the page.
    setToasts((t) => [...t.slice(-2), { id, message, type }]);
    setTimeout(() => dismiss(id), 3500);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-stack" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast${t.type === "error" ? " error" : ""}`}>
            <span className="toast-dot" />
            <span>{t.message}</span>
            <button type="button" className="toast-close" onClick={() => dismiss(t.id)} aria-label="Dismiss notification">
              <Icon name="close" size={12} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};
