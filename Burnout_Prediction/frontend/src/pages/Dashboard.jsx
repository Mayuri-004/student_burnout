import Sidebar from "../components/Sidebar";

function Dashboard(){

return(

<div className="dashboard">

<Sidebar/>

<div className="content">

<h2>Dashboard</h2>

<div className="cards">

<div className="card">
<h3>Burnout Score</h3>
<p>7.4 / 10</p>
</div>

<div className="card">
<h3>Sleep Hours</h3>
<p>5 hrs</p>
</div>

<div className="card">
<h3>Screen Time</h3>
<p>6 hrs</p>
</div>

</div>

</div>

</div>

)

}

export default Dashboard