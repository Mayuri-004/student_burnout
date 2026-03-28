import { useState } from "react";
import { predictBurnout } from "../services/api";

function AssessmentForm(){

const[form,setForm]=useState({

studyHours:0,
sleepHours:0,
screenTime:0,
stressLevel:0

});

const handleSubmit=async(e)=>{

e.preventDefault();

const res = await predictBurnout(form);

console.log(res.data);

}

return(

<div>

<h2>Assessment Form</h2>

<form onSubmit={handleSubmit}>

<label>Study Hours</label>
<input type="number"
onChange={(e)=>setForm({...form,studyHours:e.target.value})}
/>

<label>Sleep Hours</label>
<input type="number"
onChange={(e)=>setForm({...form,sleepHours:e.target.value})}
/>

<label>Screen Time</label>
<input type="number"
onChange={(e)=>setForm({...form,screenTime:e.target.value})}
/>

<label>Stress Level</label>
<input type="number"
onChange={(e)=>setForm({...form,stressLevel:e.target.value})}
/>

<button>Predict Burnout</button>

</form>

</div>

)

}

export default AssessmentForm