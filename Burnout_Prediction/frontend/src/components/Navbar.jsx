import { Link } from "react-router-dom";

function Navbar() {

return(

<nav className="navbar">

<h2>Burnout Predictor</h2>

<div>

<Link to="/">Home</Link>
<Link to="/login">Login</Link>

</div>

</nav>

)

}

export default Navbar