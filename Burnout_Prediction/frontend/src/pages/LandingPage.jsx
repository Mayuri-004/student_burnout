import Footer from "../components/Footer";

const LandingPage = ({ onNav }) => {

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if(section){
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
  <div>

    <nav className="navbar">
      <div className="navbar-logo">🧠 BurnoutAI</div>

      <div className="navbar-links">
        <a onClick={() => scrollToSection("home")}>Home</a>
        <a onClick={() => scrollToSection("features")}>Features</a>
        <a onClick={() => scrollToSection("how")}>How It Works</a>

        <button className="btn btn-outline" onClick={() => onNav("login")}>
          Login
        </button>

        <button className="btn btn-primary" onClick={() => onNav("login")}>
          Start Assessment
        </button>
      </div>
    </nav>


    <section id="home" className="hero">
      <div className="hero-inner">
        <div>
          <div className="hero-badge">✦ AI-Powered Detection</div>
          <h1>AI Powered Student Burnout Detection</h1>

          <p>
            Early detection of mental burnout using behavioral analytics and machine learning. 
            Get personalized insights to improve your well-being.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => onNav("login")}>
              Take Assessment
            </button>

            <button
              className="btn btn-secondary btn-lg"
              onClick={() => scrollToSection("features")}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <span className="hero-icon">🧠</span>
        </div>
      </div>
    </section>


    <section id="features" className="features-section">
      <div className="section-title">Powerful Features</div>
      <div className="section-sub">
        Everything you need to monitor and improve your mental well-being
      </div>

      <div className="features-grid">
        {[
          { icon:"🤖", title:"AI Prediction", desc:"Machine learning based burnout risk analysis" },
          { icon:"📱", title:"Digital Wellbeing", desc:"Smartphone usage and screen time integration" },
          { icon:"📊", title:"Stress Analytics", desc:"Track stress patterns and contributing factors" },
          { icon:"💡", title:"Personalized Recommendations", desc:"Actionable steps to improve well-being" },
        ].map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>


    <section id="how" className="how-section">
      <div className="how-inner">
        <div className="section-title">How It Works</div>
        <div className="section-sub">
          Four simple steps to understand your burnout risk
        </div>

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
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <Footer />

  </div>
  );
};

export default LandingPage;