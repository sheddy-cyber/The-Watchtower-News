// frontend/src/components/layout/Layout.jsx
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import ScrollToTop from "../ui/ScrollToTop";
import BackToTop from "../ui/BackToTop";

export default function Layout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <ScrollToTop />
      <Header />
      <main id="main-content" tabIndex={-1} style={{ flex: 1, paddingTop: "40px", paddingBottom: "80px", outline: "none" }}>
        <div className="container">
          {/* Lazy pages load inside the layout so the header never disappears */}
          <Suspense fallback={<div className="page-loader"><span className="spinner" style={{ width: 32, height: 32 }} /></div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <Footer />
      <BackToTop />
      <MobileBottomNav />
    </div>
  );
}
