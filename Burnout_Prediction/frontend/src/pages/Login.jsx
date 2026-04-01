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
export default LoginPage;