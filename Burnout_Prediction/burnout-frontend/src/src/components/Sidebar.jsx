import { Link } from "react-router-dom";

function Sidebar(){

return(

<div className="sidebar">

<h3>Menu</h3>

<Link to="/dashboard">Dashboard</Link>
<Link to="/assessment">Assessment</Link>
<Link to="/results">Results</Link>
<Link to="/history">History</Link>

</div>

)

}

export default Sidebar