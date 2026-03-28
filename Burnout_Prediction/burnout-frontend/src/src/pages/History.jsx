import { useEffect,useState } from "react";
import { getHistory } from "../services/api";

function History(){

const[data,setData]=useState([]);

useEffect(()=>{

getHistory().then(res=>{

setData(res.data)

})

},[])

return(

<div>

<h2>Assessment History</h2>

<table>

<tr>
<th>Date</th>
<th>Score</th>
<th>Risk</th>
</tr>

{data.map((item)=>(
<tr key={item.id}>
<td>{item.date}</td>
<td>{item.score}</td>
<td>{item.risk}</td>
</tr>
))}

</table>

</div>

)

}

export default History