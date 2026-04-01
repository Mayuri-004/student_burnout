const AppLayout = ({ active, onNav, onLogout, children }) => {
  const items = [
    { id:"dashboard", icon:"🏠", label:"Dashboard" },
    { id:"assessment", icon:"📋", label:"Assessment" },
    { id:"results",    icon:"📈", label:"Results" },
    { id:"history",    icon:"🕘", label:"History" },
    { id:"settings",   icon:"⚙️", label:"Settings" },
  ];
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">🧠 BurnoutAI</div>
        <div className="sidebar-nav">
          {items.map(it => (
            <div key={it.id}
              className={`sidebar-item ${active === it.id ? "active" : ""}`}
              onClick={() => onNav(it.id)}>
              <span>{it.icon}</span>{it.label}
            </div>
          ))}
        </div>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>🚪 Logout</button>
        </div>
      </aside>
      <div className="main-content">{children}</div>
    </div>
  );
};
export default AppLayout;