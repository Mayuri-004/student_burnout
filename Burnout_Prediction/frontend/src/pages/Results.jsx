import AppLayout from "../components/AppLayout";

const ResultsPage = ({ onNav, onLogout }) => (
  <AppLayout active="results" onNav={onNav} onLogout={onLogout}>
    <div className="topbar"><div className="topbar-greeting">Assessment Results</div></div>
    <div className="page-content">
      <div className="grid-2" style={{ marginBottom:"1.25rem" }}>
        <div className="card">
          <div className="card-title">Burnout Score</div>
          <div className="big-score">
            <div className="big-score-num" style={{ color:"#ef4444" }}>7.4</div>
            <div className="big-score-denom">/ 10</div>
            <span className="risk-badge risk-high" style={{ fontSize:"1rem", padding:".4rem 1rem" }}>High Risk</span>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Key Factors</div>
          <div className="bar-chart-wrap">
            {[
              { label:"Sleep",             h:75, c:"#ef4444" },
              { label:"Screen Time",       h:65, c:"#f97316" },
              { label:"Academic Pressure", h:55, c:"#eab308" },
            ].map(b => (
              <div className="bar-chart-col" key={b.label}>
                <div className="bar-chart-bar" style={{ height:`${b.h}px`, background:b.c }} />
                <span className="bar-chart-label">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid-2" style={{ marginBottom:"1.25rem" }}>
        <div className="card">
          <div className="card-title">Risk Level Indicator</div>
          <div style={{ background:"#fee2e2", borderRadius:10, padding:"1rem", border:"1px solid #fecaca" }}>
            <div style={{ display:"flex", alignItems:"center", gap:".5rem", marginBottom:".5rem" }}>
              <span>⚠️</span><strong style={{ color:"#ef4444" }}>HIGH RISK</strong>
            </div>
            <p style={{ fontSize:".8rem", color:"#7f1d1d", lineHeight:1.5 }}>
              You are experiencing a high level of burnout symptoms. Consider taking immediate steps to improve your well-being.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Reported vs Actual</div>
          {[
            { label:"Screen Time", rep:2, actual:6 },
            { label:"Sleep Hours", rep:8, actual:5 },
          ].map(r => (
            <div key={r.label} style={{ marginBottom:".85rem" }}>
              <div style={{ fontSize:".78rem", fontWeight:700, marginBottom:".4rem" }}>{r.label}</div>
              <div className="reported-row">
                <span className="rep-tag">Reported</span>
                <div className="rep-bar"><div className="rep-bar-inner rep-reported" style={{ width:`${(r.rep/10)*100}%` }} /></div>
                <span className="rep-val">{r.rep} hrs</span>
              </div>
              <div className="reported-row">
                <span className="rep-tag">Actual</span>
                <div className="rep-bar"><div className="rep-bar-inner rep-actual" style={{ width:`${(r.actual/10)*100}%` }} /></div>
                <span className="rep-val">{r.actual} hrs</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-title">Recommendations</div>
        <div className="rec-card-grid">
          {[
            { icon:"😴", title:"Improve Sleep",      tips:["Maintain a consistent sleep schedule","Aim for 7–8 hours nightly","Avoid screens 1 hour before bed"] },
            { icon:"📵", title:"Reduce Screen Time", tips:["Limit social media usage","Use focus apps while studying","Keep phone away during study sessions"] },
            { icon:"🧘", title:"Manage Stress",      tips:["Practice deep breathing","Use Pomodoro technique","Talk to a counselor if needed"] },
          ].map((c, i) => (
            <div className="rec-card" key={i}>
              <div className="rec-card-icon">{c.icon}</div>
              <h4>{c.title}</h4>
              <ul>{c.tips.map(t => <li key={t}>{t}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </AppLayout>
);
export default ResultsPage;