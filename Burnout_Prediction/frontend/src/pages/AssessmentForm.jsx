import AppLayout from "../components/AppLayout";
import SliderRow from "../components/SliderRow";

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

export default AssessmentPage;