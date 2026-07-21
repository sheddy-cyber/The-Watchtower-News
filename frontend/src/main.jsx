// frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { BookmarkProvider } from "./context/BookmarkContext";
import { ThemeProvider } from "./context/ThemeContext";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import "./styles/globals.css";

if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "identified_only",
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <ToastProvider>
              <BookmarkProvider>
                <HelmetProvider>
                  <PostHogProvider client={posthog}>
                    <App />
                  </PostHogProvider>
                </HelmetProvider>
              </BookmarkProvider>
            </ToastProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
