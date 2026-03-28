import { useState } from "react";
import { loginUser } from "../services/api";

function Login(){

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

const handleLogin=async(e)=>{

e.preventDefault();

await loginUser({email,password});

}

return(

<div className="login">

<h2>Login</h2>

<form onSubmit={handleLogin}>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button>Login</button>

</form>

</div>

)

}

export default Login