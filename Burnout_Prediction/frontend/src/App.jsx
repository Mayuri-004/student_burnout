import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy:#0f1c2e; --navy2:#162033; --blue:#1a3557;
    --accent:#2563eb; --accent2:#3b82f6; --teal:#0ea5e9;
    --red:#ef4444; --orange:#f97316; --yellow:#eab308; --green:#22c55e;
    --white:#ffffff; --offwhite:#f8fafc; --muted:#94a3b8;
    --border:#e2e8f0; --card:#ffffff; --text:#1e293b; --text2:#475569;
    --shadow:0 2px 12px rgba(0,0,0,.08); --shadow-lg:0 8px 32px rgba(0,0,0,.12);
    --radius:12px; --radius-sm:8px;
    font-family:'DM Sans',sans-serif;
  }
  body { background:var(--offwhite); color:var(--text); }

  .navbar { background:var(--navy); padding:0 2rem; height:60px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:100; }
  .navbar-logo { color:var(--white); font-family:'Syne',sans-serif; font-size:1.2rem; font-weight:800; }
  .navbar-links { display:flex; align-items:center; gap:1.5rem; }
  .navbar-links a { color:#cbd5e1; font-size:.9rem; text-decoration:none; cursor:pointer; transition:color .2s; }
  .navbar-links a:hover { color:var(--white); }
  .btn { border:none; cursor:pointer; border-radius:var(--radius-sm); font-family:inherit; font-weight:600; transition:all .2s; }
  .btn-outline { background:transparent; border:1.5px solid #475569; color:var(--white); padding:.4rem 1rem; font-size:.85rem; }
  .btn-outline:hover { border-color:var(--white); }
  .btn-primary { background:var(--accent); color:var(--white); padding:.45rem 1.1rem; font-size:.85rem; }
  .btn-primary:hover { background:var(--accent2); }
  .btn-lg { padding:.7rem 1.6rem; font-size:1rem; border-radius:var(--radius); }
  .btn-secondary { background:#1e3a5f; color:var(--white); padding:.45rem 1.1rem; font-size:.85rem; }

  .hero { background:var(--navy); padding:4rem 2rem; }
  .hero-inner { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:2rem; align-items:center; }
  .hero-badge { display:inline-block; background:#1e3a5f; color:var(--teal); font-size:.75rem; font-weight:600; padding:.25rem .75rem; border-radius:20px; margin-bottom:1rem; letter-spacing:.5px; text-transform:uppercase; }
  .hero h1 { font-family:'Syne',sans-serif; font-size:2.6rem; font-weight:800; color:var(--white); line-height:1.15; margin-bottom:1rem; }
  .hero p { color:#94a3b8; font-size:1rem; line-height:1.7; margin-bottom:1.5rem; }
  .hero-actions { display:flex; gap:.75rem; }
  .hero-visual { background:#162033; border-radius:var(--radius); border:1px solid #1e3a5f; display:flex; align-items:center; justify-content:center; min-height:220px; }
  .hero-icon { font-size:5rem; opacity:.7; }

  .section-title { font-family:'Syne',sans-serif; font-size:1.5rem; font-weight:800; color:var(--text); margin-bottom:.35rem; }
  .section-sub { color:var(--text2); font-size:.9rem; margin-bottom:2rem; }
  .features-section { max-width:1100px; margin:0 auto; padding:3.5rem 2rem; }
  .features-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1.25rem; }
  .feature-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:1.4rem; text-align:center; box-shadow:var(--shadow); transition:transform .2s,box-shadow .2s; }
  .feature-card:hover { transform:translateY(-3px); box-shadow:var(--shadow-lg); }
  .feature-icon { font-size:1.8rem; margin-bottom:.75rem; }
  .feature-card h3 { font-size:.9rem; font-weight:700; margin-bottom:.4rem; }
  .feature-card p { font-size:.78rem; color:var(--text2); line-height:1.5; }

  .how-section { background:var(--navy); padding:3.5rem 2rem; }
  .how-inner { max-width:1100px; margin:0 auto; }
  .how-inner .section-title { color:var(--white); }
  .how-inner .section-sub { color:#94a3b8; }
  .steps-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; }
  .step-card { background:#162033; border:1px solid #1e3a5f; border-radius:var(--radius); padding:1.4rem; text-align:center; }
  .step-num { width:32px; height:32px; background:var(--accent); color:var(--white); border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:.85rem; margin:0 auto .75rem; }
  .step-icon { font-size:1.6rem; margin-bottom:.6rem; }
  .step-card h3 { font-size:.88rem; font-weight:700; color:var(--white); margin-bottom:.3rem; }
  .step-card p { font-size:.75rem; color:#94a3b8; line-height:1.5; }

  .footer { background:var(--navy); border-top:1px solid #1e3a5f; padding:1.5rem 2rem; text-align:center; }
  .footer-links { display:flex; justify-content:center; gap:2rem; }
  .footer-links a { color:#94a3b8; font-size:.85rem; text-decoration:none; cursor:pointer; }

  .auth-page { min-height:100vh; background:var(--navy); display:flex; align-items:center; justify-content:center; }
  .auth-card { background:var(--white); border-radius:16px; padding:2.5rem; width:100%; max-width:420px; box-shadow:var(--shadow-lg); }
  .auth-logo { font-family:'Syne',sans-serif; font-weight:800; font-size:1.1rem; background:var(--navy); color:var(--white); border-radius:8px; padding:.5rem 1.5rem; display:inline-block; margin-bottom:1.25rem; }
  .auth-card h2 { font-family:'Syne',sans-serif; font-size:1.6rem; font-weight:800; margin-bottom:1.5rem; text-align:center; }
  .form-group { margin-bottom:1rem; }
  .form-group label { display:block; font-size:.82rem; font-weight:600; margin-bottom:.35rem; color:var(--text2); }
  .form-input { width:100%; padding:.6rem .85rem; border:1.5px solid var(--border); border-radius:var(--radius-sm); font-family:inherit; font-size:.9rem; color:var(--text); transition:border-color .2s; }
  .form-input:focus { outline:none; border-color:var(--accent); }
  .form-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.25rem; }
  .form-row label { display:flex; align-items:center; gap:.4rem; font-size:.82rem; color:var(--text2); cursor:pointer; }
  .form-row a { font-size:.82rem; color:var(--accent); text-decoration:none; cursor:pointer; }
  .btn-block { width:100%; padding:.75rem; font-size:.95rem; border-radius:var(--radius-sm); }
  .divider { display:flex; align-items:center; gap:.75rem; margin:1rem 0; color:var(--muted); font-size:.82rem; }
  .divider::before,.divider::after { content:''; flex:1; height:1px; background:var(--border); }
  .google-btn { width:100%; padding:.65rem; border:1.5px solid var(--border); background:var(--white); border-radius:var(--radius-sm); font-family:inherit; font-size:.88rem; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:.5rem; }
  .google-btn:hover { background:var(--offwhite); }
  .auth-footer { text-align:center; font-size:.82rem; color:var(--text2); margin-top:1.25rem; }
  .auth-footer a { color:var(--accent); text-decoration:none; font-weight:600; cursor:pointer; }
  .err-box { background:#fee2e2; color:#b91c1c; padding:.5rem .75rem; border-radius:8px; font-size:.82rem; margin-bottom:1rem; }

  .toast { position:fixed; top:1.25rem; left:50%; transform:translateX(-50%); background:#1e293b; color:#fff; padding:.65rem 1.5rem; border-radius:8px; font-size:.85rem; font-weight:600; z-index:9999; box-shadow:var(--shadow-lg); animation:fadeIn .3s; }
  @keyframes fadeIn { from{opacity:0;transform:translateX(-50%) translateY(-8px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }

  .app-layout { display:flex; min-height:100vh; }
  .sidebar { width:220px; background:var(--navy); display:flex; flex-direction:column; flex-shrink:0; }
  .sidebar-header { font-family:'Syne',sans-serif; font-weight:800; color:var(--white); font-size:1rem; padding:1.25rem 1.25rem 1rem; border-bottom:1px solid #1e3a5f; }
  .sidebar-nav { flex:1; padding:.5rem 0; }
  .sidebar-item { display:flex; align-items:center; gap:.65rem; padding:.65rem 1.25rem; cursor:pointer; color:#94a3b8; font-size:.875rem; font-weight:500; transition:all .15s; }
  .sidebar-item:hover { color:var(--white); background:#162033; }
  .sidebar-item.active { color:var(--white); background:#1e3a5f; border-right:3px solid var(--accent); }
  .sidebar-footer { padding:1rem 1.25rem; border-top:1px solid #1e3a5f; }
  .logout-btn { width:100%; background:#7f1d1d; color:var(--white); border:none; border-radius:var(--radius-sm); padding:.5rem; font-family:inherit; font-size:.82rem; font-weight:600; cursor:pointer; }
  .logout-btn:hover { background:#991b1b; }
  .main-content { flex:1; overflow:auto; background:var(--offwhite); }
  .topbar { background:var(--white); border-bottom:1px solid var(--border); padding:1rem 1.75rem; display:flex; align-items:center; justify-content:space-between; }
  .topbar-greeting { font-weight:700; font-size:1.05rem; }
  .topbar-right { display:flex; align-items:center; gap:1rem; }
  .notif-btn { background:var(--offwhite); border:1px solid var(--border); border-radius:8px; padding:.35rem .75rem; font-size:.82rem; cursor:pointer; }
  .avatar { width:32px; height:32px; background:var(--accent); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--white); font-size:.8rem; font-weight:700; }
  .page-content { padding:1.5rem 1.75rem; }

  .card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:1.25rem; box-shadow:var(--shadow); }
  .card-title { font-weight:700; font-size:.88rem; margin-bottom:.85rem; }
  .grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem; margin-bottom:1.25rem; }
  .grid-2 { display:grid; grid-template-columns:repeat(2,1fr); gap:1.25rem; }

  .score-ring { position:relative; width:100px; height:100px; margin:0 auto 1rem; }
  .score-ring svg { transform:rotate(-90deg); }
  .score-ring-label { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }
  .score-val { font-family:'Syne',sans-serif; font-size:1.5rem; font-weight:800; }
  .score-denom { font-size:.7rem; color:var(--muted); }
  .risk-badge { display:inline-flex; align-items:center; gap:.35rem; font-size:.82rem; font-weight:700; padding:.3rem .75rem; border-radius:20px; }
  .risk-high { background:#fee2e2; color:var(--red); }
  .risk-moderate { background:#fef3c7; color:#d97706; }
  .risk-low { background:#dcfce7; color:#16a34a; }

  .factor-row { display:flex; align-items:center; gap:.75rem; margin-bottom:.65rem; }
  .factor-label { width:90px; font-size:.8rem; color:var(--text2); flex-shrink:0; }
  .factor-bar-bg { flex:1; height:7px; background:#e2e8f0; border-radius:4px; overflow:hidden; }
  .factor-bar { height:100%; border-radius:4px; }
  .bar-red { background:var(--red); } .bar-orange { background:var(--orange); } .bar-yellow { background:var(--yellow); }
  .bar-level { font-size:.75rem; font-weight:600; width:50px; text-align:right; }

  .rec-item { display:flex; gap:.65rem; margin-bottom:.75rem; align-items:flex-start; }
  .rec-icon { width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.75rem; flex-shrink:0; margin-top:.1rem; }
  .rec-blue{background:#dbeafe;color:var(--accent)} .rec-teal{background:#e0f2fe;color:var(--teal)} .rec-green{background:#dcfce7;color:#16a34a} .rec-orange{background:#ffedd5;color:var(--orange)}
  .rec-text { font-size:.8rem; color:var(--text); line-height:1.5; }
  .rec-text strong { display:block; font-weight:700; margin-bottom:.1rem; }

  .qa-btn { width:100%; display:flex; align-items:center; justify-content:center; gap:.5rem; padding:.65rem; border-radius:var(--radius-sm); font-size:.85rem; font-weight:600; cursor:pointer; border:none; margin-bottom:.6rem; font-family:inherit; transition:all .2s; }
  .qa-primary { background:var(--accent); color:var(--white); } .qa-primary:hover { background:var(--accent2); }
  .qa-secondary { background:var(--offwhite); border:1.5px solid var(--border); color:var(--text); } .qa-secondary:hover { background:var(--border); }

  .progress-bar-outer { display:flex; align-items:flex-start; margin-bottom:2rem; }
  .progress-step { display:flex; flex-direction:column; align-items:center; flex:1; }
  .progress-circle { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.85rem; font-weight:700; border:2px solid var(--border); background:var(--white); color:var(--muted); }
  .progress-circle.done { background:var(--accent); border-color:var(--accent); color:var(--white); }
  .progress-circle.active { background:var(--navy); border-color:var(--navy); color:var(--white); }
  .progress-label { font-size:.72rem; color:var(--muted); margin-top:.35rem; font-weight:500; text-align:center; }
  .progress-label.active { color:var(--navy); font-weight:700; }
  .progress-connector { flex:1; height:2px; background:var(--border); margin-top:17px; }
  .progress-connector.done { background:var(--accent); }
  .form-section-title { font-weight:700; font-size:.95rem; padding:.75rem 0 1rem; border-bottom:1px solid var(--border); margin-bottom:1rem; }
  .slider-row { display:flex; align-items:center; gap:1rem; margin-bottom:1rem; }
  .slider-label { width:160px; font-size:.83rem; color:var(--text2); flex-shrink:0; }
  .slider-input { flex:1; -webkit-appearance:none; height:5px; border-radius:3px; background:#e2e8f0; cursor:pointer; }
  .slider-input::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; border-radius:50%; background:var(--navy); cursor:pointer; }
  .slider-val { width:60px; text-align:right; font-size:.83rem; font-weight:700; }

  .big-score { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; }
  .big-score-num { font-family:'Syne',sans-serif; font-size:3.5rem; font-weight:800; line-height:1; }
  .big-score-denom { font-size:1rem; color:var(--muted); margin-bottom:.75rem; }
  .bar-chart-wrap { display:flex; align-items:flex-end; gap:.75rem; height:90px; padding-top:.5rem; }
  .bar-chart-col { display:flex; flex-direction:column; align-items:center; gap:.35rem; flex:1; }
  .bar-chart-bar { width:100%; border-radius:4px 4px 0 0; }
  .bar-chart-label { font-size:.7rem; color:var(--text2); text-align:center; }
  .reported-row { display:flex; align-items:center; gap:.75rem; margin-bottom:.5rem; }
  .rep-tag { font-size:.68rem; color:var(--muted); width:50px; flex-shrink:0; }
  .rep-bar { flex:1; } .rep-bar-inner { height:6px; border-radius:3px; }
  .rep-reported { background:#cbd5e1; } .rep-actual { background:var(--accent); }
  .rep-val { font-size:.78rem; font-weight:600; width:40px; text-align:right; }
  .rec-card-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin-top:1rem; }
  .rec-card { background:var(--offwhite); border-radius:10px; padding:1rem; border:1px solid var(--border); }
  .rec-card-icon { font-size:1.2rem; margin-bottom:.5rem; }
  .rec-card h4 { font-size:.82rem; font-weight:700; margin-bottom:.4rem; }
  .rec-card ul { padding-left:1rem; }
  .rec-card ul li { font-size:.75rem; color:var(--text2); margin-bottom:.2rem; }

  .history-table { width:100%; border-collapse:collapse; font-size:.84rem; }
  .history-table th { text-align:left; padding:.65rem 1rem; font-size:.78rem; font-weight:700; color:var(--text2); border-bottom:1px solid var(--border); background:var(--offwhite); }
  .history-table td { padding:.7rem 1rem; border-bottom:1px solid var(--border); }
  .history-table tr:last-child td { border-bottom:none; }
  .history-table tr:hover td { background:var(--offwhite); }
  .badge { font-size:.72rem; font-weight:700; padding:.2rem .65rem; border-radius:20px; }
  .badge-high{background:#fee2e2;color:var(--red)} .badge-moderate{background:#fef3c7;color:#d97706} .badge-low{background:#dcfce7;color:#16a34a}
  .view-btn { background:var(--navy); color:var(--white); border:none; border-radius:6px; padding:.3rem .85rem; font-size:.75rem; cursor:pointer; font-family:inherit; font-weight:600; }
  .mini-chart { width:100%; height:80px; }
`;

// ── Shared components ──────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="footer">
    <div className="footer-links">
      <a>About</a><a>Privacy Policy</a><a>Contact</a><a>GitHub</a>
    </div>
  </footer>
);

const ScoreRing = ({ score = 7.4, max = 10, color = "#ef4444" }) => {
  const r = 40, cx = 50, cy = 50, circ = 2 * Math.PI * r;
  const offset = circ - (score / max) * circ;
  return (
    <div className="score-ring">
      <svg viewBox="0 0 100 100" width="100" height="100">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="score-ring-label">
        <span className="score-val">{score}</span>
        <span className="score-denom">/ {max}</span>
      </div>
    </div>
  );
};

const TrendChart = () => {
  const pts = [2, 3.5, 5, 4, 5.5, 6.2, 7.4];
  const w = 500, h = 80;
  const toX = i => (i / (pts.length - 1)) * w;
  const toY = v => h - (v / 10) * h;
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mini-chart">
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity=".2" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill="url(#tg)" />
      <path d={d} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((v, i) => <circle key={i} cx={toX(i)} cy={toY(v)} r="4" fill="#2563eb" stroke="#fff" strokeWidth="1.5" />)}
    </svg>
  );
};

// ── LANDING ────────────────────────────────────────────────────────────────────
const LandingPage = ({ onNav }) => (
  <div>
    <nav className="navbar">
      <div className="navbar-logo">🧠 BurnoutAI</div>
      <div className="navbar-links">
        <a>Home</a><a>Features</a><a>How It Works</a>
        <button className="btn btn-outline" onClick={() => onNav("login")}>Login</button>
        <button className="btn btn-primary" onClick={() => onNav("login")}>Start Assessment</button>
      </div>
    </nav>

    <section className="hero">
      <div className="hero-inner">
        <div>
          <div className="hero-badge">✦ AI-Powered Detection</div>
          <h1>AI Powered Student Burnout Detection</h1>
          <p>Early detection of mental burnout using behavioral analytics and machine learning. Get personalized insights to improve your well-being.</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => onNav("login")}>Take Assessment</button>
            <button className="btn btn-secondary btn-lg">Learn More</button>
          </div>
        </div>
        <div className="hero-visual"><span className="hero-icon">🧠</span></div>
      </div>
    </section>

    <section className="features-section">
      <div className="section-title">Powerful Features</div>
      <div className="section-sub">Everything you need to monitor and improve your mental well-being</div>
      <div className="features-grid">
        {[
          { icon:"🤖", title:"AI Prediction", desc:"Machine learning based burnout risk analysis" },
          { icon:"📱", title:"Digital Wellbeing", desc:"Smartphone usage and screen time integration" },
          { icon:"📊", title:"Stress Analytics", desc:"Track stress patterns and contributing factors" },
          { icon:"💡", title:"Personalized Recommendations", desc:"Actionable steps to improve well-being" },
        ].map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3><p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="how-section">
      <div className="how-inner">
        <div className="section-title">How It Works</div>
        <div className="section-sub">Four simple steps to understand your burnout risk</div>
        <div className="steps-grid">
          {[
            { icon:"📝", title:"Fill Assessment", desc:"Answer questions about your routine and feelings" },
            { icon:"✅", title:"Data Validation", desc:"System cross-checks with digital wellbeing data" },
            { icon:"🧠", title:"ML Prediction", desc:"AI model analyzes your risk level" },
            { icon:"🎯", title:"Get Recommendations", desc:"Receive personalized suggestions" },
          ].map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-num">{i + 1}</div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3><p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

// ── LOGIN ──────────────────────────────────────────────────────────────────────
const LoginPage = ({ onNav, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (!email || !password) { setError("Please enter your email and password."); return; }
    onLogin();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div style={{ textAlign:"center" }}>
          <div className="auth-logo">BurnoutAI</div>
        </div>
        <h2>Welcome Back</h2>
        {error && <div className="err-box">{error}</div>}
        <div className="form-group">
          <label>Email</label>
          <input className="form-input" type="email" placeholder="you@example.com"
            value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-input" type="password" placeholder="••••••••"
            value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="form-row">
          <label><input type="checkbox" style={{ marginRight:4 }} /> Remember Me</label>
          <a>Forgot Password?</a>
        </div>
        <button className="btn btn-primary btn-block" onClick={submit}>Login</button>
        <div className="divider">or</div>
        <button className="google-btn" onClick={onLogin}>
          <span style={{ fontSize:"1rem" }}>G</span> Continue with Google
        </button>
        <div className="auth-footer">
          Don't have an account? <a onClick={() => onNav("home")}>Register</a>
        </div>
        <div style={{ textAlign:"center", marginTop:".75rem" }}>
          <span style={{ fontSize:".8rem", color:"var(--muted)", cursor:"pointer" }} onClick={() => onNav("home")}>
            ← Back to Home
          </span>
        </div>
      </div>
    </div>
  );
};

// ── SIDEBAR LAYOUT ─────────────────────────────────────────────────────────────
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

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
const DashboardPage = ({ onNav, onLogout }) => (
  <AppLayout active="dashboard" onNav={onNav} onLogout={onLogout}>
    <div className="topbar">
      <div className="topbar-greeting">Welcome back, Student! 👋</div>
      <div className="topbar-right">
        <button className="notif-btn">🔔 Notifications</button>
        <div className="avatar">S</div>
      </div>
    </div>
    <div className="page-content">
      <div className="grid-3">
        <div className="card">
          <div className="card-title">Burnout Score</div>
          <ScoreRing score={7.4} color="#ef4444" />
          <div style={{ textAlign:"center" }}>
            <span className="risk-badge risk-high">🔴 High Risk</span>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Key Factors</div>
          {[
            { label:"Sleep",         pct:85, cls:"bar-red",    level:"High",   c:"#ef4444" },
            { label:"Screen Time",   pct:80, cls:"bar-orange", level:"High",   c:"#f97316" },
            { label:"Study Hours",   pct:55, cls:"bar-yellow", level:"Medium", c:"#eab308" },
            { label:"Exam Pressure", pct:50, cls:"bar-yellow", level:"Medium", c:"#eab308" },
          ].map((f, i) => (
            <div className="factor-row" key={i}>
              <span className="factor-label">{f.label}</span>
              <div className="factor-bar-bg">
                <div className={`factor-bar ${f.cls}`} style={{ width:`${f.pct}%` }} />
              </div>
              <span className="bar-level" style={{ color:f.c }}>{f.level}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title">Recommendations</div>
          {[
            { icon:"😴", cls:"rec-blue",   title:"Improve sleep schedule", desc:"Try 7–8 hours of sleep every night." },
            { icon:"📵", cls:"rec-teal",   title:"Reduce screen time",     desc:"Limit non-academic usage before bed." },
            { icon:"⏱️", cls:"rec-green",  title:"Take study breaks",      desc:"Use Pomodoro technique (25/5 rule)." },
            { icon:"🏃", cls:"rec-orange", title:"Exercise regularly",     desc:"Try 30 minutes of physical activity." },
          ].map((r, i) => (
            <div className="rec-item" key={i}>
              <div className={`rec-icon ${r.cls}`}>{r.icon}</div>
              <div className="rec-text"><strong>{r.title}</strong>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Burnout Trend (Last 4 Weeks)</div>
          <TrendChart />
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:".72rem", color:"var(--muted)", marginTop:".5rem" }}>
            {["Week 1","Week 2","Week 3","Week 4"].map(w => <span key={w}>{w}</span>)}
          </div>
        </div>
        <div className="card">
          <div className="card-title">Quick Actions</div>
          <button className="qa-btn qa-primary"    onClick={() => onNav("assessment")}>➕ Start New Assessment</button>
          <button className="qa-btn qa-secondary"  onClick={() => onNav("history")}>🕘 View History</button>
          <button className="qa-btn qa-secondary"  onClick={() => onNav("results")}>📈 View Results</button>
        </div>
      </div>
    </div>
  </AppLayout>
);

// ── ASSESSMENT ────────────────────────────────────────────────────────────────
const SliderRow = ({ label, value, onChange, unit }) => (
  <div className="slider-row">
    <span className="slider-label">{label}</span>
    <input className="slider-input" type="range" min={0} max={10} step={0.5} value={value}
      onChange={e => onChange(parseFloat(e.target.value))} />
    <span className="slider-val">{unit === "hrs" ? `${value} hrs` : `${value} / 10`}</span>
  </div>
);

const AssessmentPage = ({ onNav, onLogout }) => {
  const [step, setStep] = useState(1);
  const [vals, setVals] = useState({
    studyHours:6, assignmentLoad:7, examPressure:8,
    sleepHours:5, physicalActivity:3, socialInteraction:6,
    screenTime:6, socialMediaUsage:4, gamingHours:1,
    stressLevel:7, moodLevel:5, motivationLevel:4,
  });
  const set = k => v => setVals(p => ({ ...p, [k]: v }));
  const STEPS = ["Academic","Lifestyle","Digital Usage","Mental Health"];
  const SECTIONS = [
    { title:"Academic Section", fields:[
      { label:"Study Hours per day", key:"studyHours", unit:"hrs" },
      { label:"Assignment Load",     key:"assignmentLoad" },
      { label:"Exam Pressure",       key:"examPressure" },
    ]},
    { title:"Lifestyle Section", fields:[
      { label:"Sleep Hours per night", key:"sleepHours", unit:"hrs" },
      { label:"Physical Activity",     key:"physicalActivity" },
      { label:"Social Interaction",    key:"socialInteraction" },
    ]},
    { title:"Digital Usage Section", fields:[
      { label:"Screen Time per day",  key:"screenTime", unit:"hrs" },
      { label:"Social Media Usage",   key:"socialMediaUsage" },
      { label:"Gaming Hours",         key:"gamingHours" },
    ]},
    { title:"Mental Health Section", fields:[
      { label:"Stress Level",     key:"stressLevel" },
      { label:"Mood Level",       key:"moodLevel" },
      { label:"Motivation Level", key:"motivationLevel" },
    ]},
  ];

  return (
    <AppLayout active="assessment" onNav={onNav} onLogout={onLogout}>
      <div className="topbar"><div className="topbar-greeting">Assessment Form</div></div>
      <div className="page-content">
        <div className="card" style={{ maxWidth:700, margin:"0 auto" }}>
          {/* Progress indicator */}
          <div className="progress-bar-outer">
            {STEPS.map((s, i) => (
              <div key={s} style={{ display:"contents" }}>
                <div className="progress-step">
                  <div className={`progress-circle ${i+1 < step ? "done" : i+1===step ? "active" : ""}`}>
                    {i+1 < step ? "✓" : i+1}
                  </div>
                  <span className={`progress-label ${i+1===step ? "active" : ""}`}>{s}</span>
                </div>
                {i < STEPS.length-1 && (
                  <div className={`progress-connector ${i+1 < step ? "done" : ""}`} />
                )}
              </div>
            ))}
          </div>

          <div className="form-section-title">{SECTIONS[step-1].title}</div>
          {SECTIONS[step-1].fields.map(f => (
            <SliderRow key={f.key} label={f.label} value={vals[f.key]} onChange={set(f.key)} unit={f.unit} />
          ))}

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:"1.5rem" }}>
            <button className="btn btn-secondary" style={{ padding:".55rem 1.25rem" }}
              disabled={step===1} onClick={() => setStep(p => p-1)}>← Back</button>
            {step < 4
              ? <button className="btn btn-primary" style={{ padding:".55rem 1.25rem" }} onClick={() => setStep(p => p+1)}>Next →</button>
              : <button className="btn btn-primary" style={{ padding:".55rem 1.25rem" }} onClick={() => onNav("results")}>🔮 Predict Burnout</button>
            }
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

// ── RESULTS ───────────────────────────────────────────────────────────────────
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

// ── HISTORY ───────────────────────────────────────────────────────────────────
const HistoryPage = ({ onNav, onLogout }) => {
  const rows = [
    { date:"10 Feb 2025", score:6.3, risk:"Moderate" },
    { date:"20 Feb 2025", score:7.1, risk:"High" },
    { date:"01 Mar 2025", score:5.8, risk:"Moderate" },
    { date:"10 Mar 2025", score:4.9, risk:"Low" },
    { date:"20 Mar 2025", score:7.4, risk:"High" },
  ];
  return (
    <AppLayout active="history" onNav={onNav} onLogout={onLogout}>
      <div className="topbar"><div className="topbar-greeting">Assessment History</div></div>
      <div className="page-content">
        <div className="card" style={{ marginBottom:"1.25rem" }}>
          <div className="card-title">History Table</div>
          <table className="history-table">
            <thead><tr><th>Date</th><th>Burnout Score</th><th>Risk Level</th><th>Actions</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.date}</td>
                  <td><strong>{r.score}</strong></td>
                  <td><span className={`badge badge-${r.risk.toLowerCase()}`}>{r.risk}</span></td>
                  <td><button className="view-btn">View Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-title">Trend Chart</div>
          <TrendChart />
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:".72rem", color:"var(--muted)", marginTop:".5rem" }}>
            {["10 Feb","20 Feb","01 Mar","10 Mar","20 Mar"].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

// ── SETTINGS ──────────────────────────────────────────────────────────────────
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

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");         // ← starts on landing page
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState("");

  const PROTECTED = ["dashboard","assessment","results","history","settings"];

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const navigate = target => {
    if (PROTECTED.includes(target) && !isLoggedIn) {
      showToast("🔒 Please login to continue");
      setPage("login");
    } else {
      setPage(target);
    }
  };

  const handleLogin  = () => { setIsLoggedIn(true);  setPage("dashboard"); showToast("Welcome back! 👋"); };
  const handleLogout = () => { setIsLoggedIn(false); setPage("home");      showToast("Logged out successfully"); };

  const p = { onNav: navigate, onLogout: handleLogout };

  const PAGES = {
    home:       <LandingPage    {...p} />,
    login:      <LoginPage      {...p} onLogin={handleLogin} />,
    dashboard:  <DashboardPage  {...p} />,
    assessment: <AssessmentPage {...p} />,
    results:    <ResultsPage    {...p} />,
    history:    <HistoryPage    {...p} />,
    settings:   <SettingsPage   {...p} />,
  };

  return (
    <>
      <style>{css}</style>
      {toast && <div className="toast">{toast}</div>}
      {PAGES[page] ?? PAGES.home}
    </>
  );
}
