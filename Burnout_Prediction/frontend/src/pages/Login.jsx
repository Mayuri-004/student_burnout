import React, { useState } from "react";
import axios from "axios";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    const res = await axios.post(
      "http://localhost:5000/api/login",
      {email,password}
    );

    localStorage.setItem("token",res.data.token);

    window.location="/dashboard";
  };

  return (

    <div className="login">

      <h2>Login</h2>

      <input
      placeholder="Email"
      onChange={(e)=>setEmail(e.target.value)}
      />

      <input
      type="password"
      placeholder="Password"
      onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

    </div>
  );
}

export default Login;