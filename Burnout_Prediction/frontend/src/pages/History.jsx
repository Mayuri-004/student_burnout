import AppLayout from "../components/AppLayout";
import TrendChart from "../components/TrendChart";

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
export default HistoryPage;