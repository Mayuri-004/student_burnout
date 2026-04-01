import { useState } from "react";

const AppLayout = ({ children, active, onNav, onLogout }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">

      {/* MENU BUTTON */}

      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      {/* SIDEBAR */}

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>

        <div className="sidebar-header">
          <h2>BurnoutAI</h2>

          <button className="close-btn" onClick={closeSidebar}>
            ✕
          </button>
        </div>

        <ul className="sidebar-menu">

          <li onClick={() => { onNav("dashboard"); closeSidebar(); }}>
            📊 Dashboard
          </li>

          <li onClick={() => { onNav("assessment"); closeSidebar(); }}>
            📝 Assessment
          </li>

          <li onClick={() => { onNav("results"); closeSidebar(); }}>
            📈 Results
          </li>

          <li onClick={() => { onNav("history"); closeSidebar(); }}>
            🕘 History
          </li>

          <li onClick={() => { onNav("settings"); closeSidebar(); }}>
            ⚙️ Settings
          </li>

          <li onClick={onLogout}>
            🚪 Logout
          </li>

        </ul>

      </div>

      {/* MAIN CONTENT */}

      <div className="main-content">
        {children}
      </div>

    </div>
  );
};

export default AppLayout;