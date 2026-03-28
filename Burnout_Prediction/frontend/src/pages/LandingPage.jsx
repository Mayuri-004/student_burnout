import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function LandingPage() {

  return (

    <div>

      <Navbar/>

      <section className="hero">

        <h1>AI Powered Student Burnout Detection</h1>

        <p>
        Detect mental burnout early using machine learning
        and behavioral analytics
        </p>

        <Link to="/login">
        <button>Start Assessment</button>
        </Link>

      </section>

    </div>

  );
}

export default LandingPage;