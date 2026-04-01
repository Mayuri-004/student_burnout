import { useState } from "react";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import AssessmentPage from "./pages/AssessmentForm";
import ResultsPage from "./pages/Results";
import HistoryPage from "./pages/History";
import SettingsPage from "./pages/Settings";

export default function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState("");

  const PROTECTED = ["dashboard","assessment","results","history","settings"];

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const navigate = target => {
    if (PROTECTED.includes(target) && !isLoggedIn) {
      showToast("🔒 Please login to continue");
      setPage("login");
    } else {
      setPage(target);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage("dashboard");
    showToast("Welcome back! 👋");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage("home");
    showToast("Logged out successfully");
  };

  const p = { onNav: navigate, onLogout: handleLogout };

  const PAGES = {
    home:       <LandingPage {...p} />,
    login:      <LoginPage {...p} onLogin={handleLogin} />,
    dashboard:  <DashboardPage {...p} />,
    assessment: <AssessmentPage {...p} />,
    results:    <ResultsPage {...p} />,
    history:    <HistoryPage {...p} />,
    settings:   <SettingsPage {...p} />,
  };

  return (
    <>
      {toast && <div className="toast">{toast}</div>}
      {PAGES[page] ?? PAGES.home}
    </>
  );
}