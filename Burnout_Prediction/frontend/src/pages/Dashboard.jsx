import AppLayout from "../components/AppLayout";
import ScoreRing from "../components/ScoringRing";
import TrendChart from "../components/TrendChart";

const DashboardPage = ({ onNav, onLogout }) => {

  const handleNotifications = () => {
    onNav("notifications");
  };

  const handleProfile = () => {
    onNav("settings");
  };

  return (
    <AppLayout active="dashboard" onNav={onNav} onLogout={onLogout}>

      {/* TOP BAR */}

      <div className="topbar">
        <div className="topbar-greeting">
          Welcome back, Student! 👋
        </div>

        <div className="topbar-right">

          <button
            className="notif-btn"
            onClick={handleNotifications}
          >
            🔔 Notifications
          </button>

          <div
            className="avatar"
            onClick={handleProfile}
            style={{ cursor: "pointer" }}
          >
            S
          </div>

        </div>
      </div>

      {/* PAGE CONTENT */}

      <div className="page-content">

        {/* TOP GRID */}

        <div className="grid-3">

          {/* SCORE */}

          <div className="card">
            <div className="card-title">Burnout Score</div>

            <ScoreRing score={7.4} color="#ef4444" />

            <div style={{ textAlign: "center" }}>
              <span className="risk-badge risk-high">
                🔴 High Risk
              </span>
            </div>
          </div>

          {/* FACTORS */}

          <div className="card">
            <div className="card-title">Key Factors</div>

            {[
              { label:"Sleep", pct:85, cls:"bar-red", level:"High", c:"#ef4444" },
              { label:"Screen Time", pct:80, cls:"bar-orange", level:"High", c:"#f97316" },
              { label:"Study Hours", pct:55, cls:"bar-yellow", level:"Medium", c:"#eab308" },
              { label:"Exam Pressure", pct:50, cls:"bar-yellow", level:"Medium", c:"#eab308" },
            ].map((f, i) => (

              <div className="factor-row" key={i}>

                <span className="factor-label">{f.label}</span>

                <div className="factor-bar-bg">
                  <div
                    className={`factor-bar ${f.cls}`}
                    style={{ width: `${f.pct}%` }}
                  />
                </div>

                <span
                  className="bar-level"
                  style={{ color: f.c }}
                >
                  {f.level}
                </span>

              </div>

            ))}
          </div>

          {/* RECOMMENDATIONS */}

          <div className="card">

            <div className="card-title">
              Recommendations
            </div>

            {[
              { icon:"😴", cls:"rec-blue", title:"Improve sleep schedule", desc:"Try 7–8 hours of sleep every night." },
              { icon:"📵", cls:"rec-teal", title:"Reduce screen time", desc:"Limit non-academic usage before bed." },
              { icon:"⏱️", cls:"rec-green", title:"Take study breaks", desc:"Use Pomodoro technique (25/5 rule)." },
              { icon:"🏃", cls:"rec-orange", title:"Exercise regularly", desc:"Try 30 minutes of physical activity." },
            ].map((r, i) => (

              <div className="rec-item" key={i}>

                <div className={`rec-icon ${r.cls}`}>
                  {r.icon}
                </div>

                <div className="rec-text">
                  <strong>{r.title}</strong>
                  {r.desc}
                </div>

              </div>

            ))}
          </div>

        </div>

        {/* BOTTOM GRID */}

        <div className="grid-2">

          {/* TREND */}

          <div className="card">

            <div className="card-title">
              Burnout Trend (Last 4 Weeks)
            </div>

            <TrendChart />

            <div
              style={{
                display:"flex",
                justifyContent:"space-between",
                fontSize:".72rem",
                color:"var(--muted)",
                marginTop:".5rem"
              }}
            >
              {["Week 1","Week 2","Week 3","Week 4"].map(w =>
                <span key={w}>{w}</span>
              )}
            </div>

          </div>

          {/* QUICK ACTIONS */}

          <div className="card">

            <div className="card-title">
              Quick Actions
            </div>

            <button
              className="qa-btn qa-primary"
              onClick={() => onNav("assessment")}
            >
              ➕ Start New Assessment
            </button>

            <button
              className="qa-btn qa-secondary"
              onClick={() => onNav("history")}
            >
              🕘 View History
            </button>

            <button
              className="qa-btn qa-secondary"
              onClick={() => onNav("results")}
            >
              📈 View Results
            </button>

            <button
              className="qa-btn qa-secondary"
              onClick={() => onNav("settings")}
            >
              ⚙️ Settings
            </button>

            <button
              className="qa-btn qa-danger"
              onClick={onLogout}
            >
              🚪 Logout
            </button>

          </div>

        </div>

      </div>

    </AppLayout>
  );
};

export default DashboardPage;