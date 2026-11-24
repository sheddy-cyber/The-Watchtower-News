// frontend/src/App.jsx
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Less-visited pages load on demand to keep the first download small.
const SavedPage = lazy(() => import("./pages/SavedPage"));
const PuzzlesPage = lazy(() => import("./pages/PuzzlesPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const VerifyEmailPage = lazy(() => import("./pages/VerifyEmailPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/category/:cat" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/puzzles" element={<PuzzlesPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
