import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import ScoreRing from "../components/ScoringRing";
import TrendChart from "../components/TrendChart";

const DashboardPage = ({ onNav, onLogout }) => {

  const [data,setData] = useState(null);

  useEffect(()=>{
    fetch("http://localhost:5000/api/dashboard")
    .then(res=>res.json())
    .then(result=>setData(result))
  },[]);

  if(!data){
    return <div>Loading dashboard...</div>
  }

  const riskColor =
  data.riskLevel==="High" ? "#ef4444" :
  data.riskLevel==="Medium" ? "#f97316" :
  "#22c55e";

  return (

<AppLayout active="dashboard" onNav={onNav} onLogout={onLogout}>

<div className="topbar">
<div className="topbar-greeting">
Welcome back, Student 👋
</div>
</div>

<div className="page-content">

<div className="grid-3">

{/* Burnout Score */}

<div className="card">

<div className="card-title">Burnout Score</div>

<ScoreRing score={data.burnoutScore} color={riskColor} />

<div style={{textAlign:"center"}}>

<span className={`risk-badge risk-${data.riskLevel.toLowerCase()}`}>
{data.riskLevel} Risk
</span>

</div>

</div>


{/* Factors */}

<div className="card">

<div className="card-title">Key Factors</div>

{Object.entries(data.factors).map(([key,value])=>(
<div className="factor-row" key={key}>

<span className="factor-label">{key}</span>

<div className="factor-bar-bg">

<div className="factor-bar"
style={{width:`${value}%`}}/>

</div>

</div>
))}

</div>


{/* Recommendations */}

<div className="card">

<div className="card-title">Recommendations</div>

{data.recommendations.map((r,i)=>(
<div className="rec-item" key={i}>

<div className="rec-icon">💡</div>

<div className="rec-text">{r}</div>

</div>
))}

</div>

</div>


{/* Trend */}

<div className="grid-2">

<div className="card">

<div className="card-title">Burnout Trend</div>

<TrendChart data={data.trend}/>

</div>


<div className="card">

<div className="card-title">Quick Actions</div>

<button className="qa-btn qa-primary"
onClick={()=>onNav("assessment")}>
Start New Assessment
</button>

<button className="qa-btn qa-secondary"
onClick={()=>onNav("history")}>
View History
</button>

</div>

</div>

</div>

</AppLayout>

)
};

export default DashboardPage;