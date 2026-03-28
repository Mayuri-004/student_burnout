import React, { useState } from "react";
import axios from "axios";

function AssessmentForm(){

const [data,setData] = useState({

studyHours:0,
sleepHours:0,
screenTime:0,
assignmentLoad:0,
examPressure:0,
physicalActivity:0

});

const handleSubmit = async () => {

const res = await axios.post(
"http://localhost:5000/api/assessment",
data
);

localStorage.setItem("result",JSON.stringify(res.data));

window.location="/results";

};

return(

<div>

<h2>Burnout Assessment</h2>

<input
placeholder="Study Hours"
onChange={(e)=>setData({...data,studyHours:e.target.value})}
/>

<input
placeholder="Sleep Hours"
onChange={(e)=>setData({...data,sleepHours:e.target.value})}
/>

<input
placeholder="Screen Time"
onChange={(e)=>setData({...data,screenTime:e.target.value})}
/>

<button onClick={handleSubmit}>
Predict Burnout
</button>

</div>

)

}

export default AssessmentForm;