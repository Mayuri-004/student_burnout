import React, {useEffect,useState} from "react";
import axios from "axios";

function History(){

const [history,setHistory] = useState([]);

useEffect(()=>{

axios.get("http://localhost:5000/api/history")
.then(res=>setHistory(res.data));

},[])

return(

<div>

<h2>Assessment History</h2>

<table>

<thead>

<tr>
<th>Date</th>
<th>Score</th>
<th>Risk</th>
</tr>

</thead>

<tbody>

{history.map((item)=>(
<tr key={item._id}>

<td>{item.date}</td>
<td>{item.score}</td>
<td>{item.risk}</td>

</tr>
))}

</tbody>

</table>

</div>

)

}

export default History;