import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function LandingPage(){

return(

<div>

<Navbar/>

<section className="hero">

<h1>Student Mental Burnout Prediction</h1>

<p>
AI powered system to detect early burnout symptoms
</p>

<Link to="/assessment">

<button>Start Assessment</button>

</Link>

</section>

</div>

)

}

export default LandingPage