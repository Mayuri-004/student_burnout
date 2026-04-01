import { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";



const Settings = ({ onNav, onLogout }) => {

  

  // ACTIVE SETTINGS TAB
  const [activeTab, setActiveTab] = useState("profile");

  // PROFILE STATE
  const [name, setName] = useState("Student User");
  const [email, setEmail] = useState("student@example.com");
  const [institution, setInstitution] = useState("State University");

  // PASSWORD STATE
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // SETTINGS STATE
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("darkMode") === "true"
);

  const [message, setMessage] = useState("");

  // APPLY DARK MODE
  

  // SAVE PROFILE
  const handleSaveProfile = () => {
    console.log({ name, email, institution });
    setMessage("Profile updated successfully ✅");
  };

  // UPDATE PASSWORD
  const handlePasswordUpdate = () => {

    if (!currentPassword || !newPassword) {
      setMessage("Please fill all password fields ⚠️");
      return;
    }

    console.log({ currentPassword, newPassword });

    setCurrentPassword("");
    setNewPassword("");

    setMessage("Password updated successfully 🔐");
  };

  return (
    <AppLayout active="settings" onNav={onNav} onLogout={onLogout}>

      <div className="topbar">
        <div className="topbar-greeting">Settings</div>
      </div>

      <div className="page-content settings-container">

        {/* SETTINGS MENU */}

        <div className="settings-sidebar">

          <div
            className={`settings-menu-item ${activeTab==="profile"?"active":""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </div>

          <div
            className={`settings-menu-item ${activeTab==="security"?"active":""}`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </div>

          <div
            className={`settings-menu-item ${activeTab==="notifications"?"active":""}`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </div>

          <div
            className={`settings-menu-item ${activeTab==="preferences"?"active":""}`}
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </div>

        </div>

        {/* SETTINGS PANEL */}

        <div className="settings-panel">

          {message && (
            <div className="settings-message">
              {message}
            </div>
          )}

          {/* PROFILE */}

          {activeTab === "profile" && (

            <div className="settings-card">

              <div className="card-title">Profile Information</div>

              <div className="profile-row">

                <div className="avatar">
                  {name.charAt(0)}
                </div>

                <button className="btn btn-primary">
                  Upload Photo
                </button>

              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  className="form-input"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  className="form-input"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Institution</label>
                <input
                  className="form-input"
                  value={institution}
                  onChange={(e)=>setInstitution(e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary save-btn"
                onClick={handleSaveProfile}
              >
                Save Changes
              </button>

            </div>
          )}

          {/* SECURITY */}

          {activeTab === "security" && (

            <div className="settings-card">

              <div className="card-title">Security</div>

              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={currentPassword}
                  onChange={(e)=>setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={newPassword}
                  onChange={(e)=>setNewPassword(e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={handlePasswordUpdate}
              >
                Update Password
              </button>

            </div>
          )}

          {/* NOTIFICATIONS */}

          {activeTab === "notifications" && (

            <div className="settings-card">

              <div className="card-title">Notifications</div>

              <div className="settings-toggle">

                <span>Email Notifications</span>

                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={()=>setNotifications(!notifications)}
                  />
                  <span className="slider"></span>
                </label>

              </div>

            </div>
          )}

          {/* PREFERENCES */}

          {activeTab === "preferences" && (

            <div className="settings-card">

              <div className="card-title">Preferences</div>

              <div className="settings-toggle">

                <span>Dark Mode</span>

                <label className="switch">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={()=>setDarkMode(!darkMode)}
                  />
                  <span className="slider"></span>
                </label>

              </div>

            </div>
          )}

        </div>

      </div>

    </AppLayout>
  );
};

export default Settings;