import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="layout">
      <nav className="navbar">
        <h2>Burnout Detector</h2>

        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/assessment">Assessment</Link>
          <Link to="/history">History</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </nav>

      <main className="content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}