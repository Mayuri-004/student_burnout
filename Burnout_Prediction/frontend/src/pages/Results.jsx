import React from "react";

function Results(){

const result = JSON.parse(localStorage.getItem("result"));

return(

<div>

<h2>Burnout Score</h2>

<h1>{result.score}</h1>

<p>Risk Level: {result.risk}</p>

</div>

)

}

export default Results;