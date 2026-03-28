import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <h2>Burnout AI</h2>

      <div>

        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/assessment">Assessment</Link>
        <Link to="/history">History</Link>

      </div>

    </nav>
  );
}

export default Navbar;