import { useState } from "react";
import AppLayout from "../components/AppLayout";

const Settings = ({ onNav, onLogout }) => {

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppLayout active="settings" onNav={onNav} onLogout={onLogout}>
      
      <div className="topbar">
        <div className="topbar-greeting">Settings</div>
      </div>

      <div className="page-content settings-container">

        {/* LEFT SETTINGS MENU */}

        <div className="settings-sidebar">

          <div className="settings-menu-item active">Profile</div>
          <div className="settings-menu-item">Account</div>
          <div className="settings-menu-item">Security</div>
          <div className="settings-menu-item">Notifications</div>
          <div className="settings-menu-item">Preferences</div>

        </div>

        {/* RIGHT SETTINGS PANEL */}

        <div className="settings-panel">

          {/* PROFILE SECTION */}

          <div className="settings-card">

            <div className="card-title">Profile Information</div>

            <div className="profile-row">

              <div className="avatar">
                <span>SU</span>
              </div>

              <div>
                <button className="btn btn-primary">Upload Photo</button>
              </div>

            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input className="form-input" defaultValue="Student User" />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input className="form-input" defaultValue="student@example.com" />
            </div>

            <div className="form-group">
              <label>Institution</label>
              <input className="form-input" defaultValue="State University" />
            </div>

            <button className="btn btn-primary save-btn">
              Save Changes
            </button>

          </div>

          {/* SECURITY */}

          <div className="settings-card">

            <div className="card-title">Security</div>

            <div className="form-group">
              <label>Current Password</label>
              <input type="password" className="form-input" />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input type="password" className="form-input" />
            </div>

            <button className="btn btn-primary">
              Update Password
            </button>

          </div>

          {/* NOTIFICATIONS */}

          <div className="settings-card">

            <div className="card-title">Notifications</div>

            <div className="settings-toggle">

              <span>Email Notifications</span>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <span className="slider"></span>
              </label>

            </div>

          </div>

          {/* PREFERENCES */}

          <div className="settings-card">

            <div className="card-title">Preferences</div>

            <div className="settings-toggle">

              <span>Dark Mode</span>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <span className="slider"></span>
              </label>

            </div>

          </div>

        </div>

      </div>

    </AppLayout>
  );
};

export default Settings;