import AppLayout from "../components/AppLayout";
const SettingsPage = ({ onNav, onLogout }) => (
  <AppLayout active="settings" onNav={onNav} onLogout={onLogout}>
    <div className="topbar"><div className="topbar-greeting">Settings</div></div>
    <div className="page-content">
      <div className="card" style={{ maxWidth:520 }}>
        <div className="card-title">Profile Settings</div>
        <div className="form-group"><label>Full Name</label><input className="form-input" defaultValue="Student User" /></div>
        <div className="form-group"><label>Email</label><input className="form-input" defaultValue="student@example.com" /></div>
        <div className="form-group"><label>Institution</label><input className="form-input" defaultValue="State University" /></div>
        <div style={{ marginTop:"1rem" }}>
          <button className="btn btn-primary" style={{ padding:".55rem 1.4rem" }}>Save Changes</button>
        </div>
      </div>
    </div>
  </AppLayout>
);
export default SettingsPage;