import { Bar } from "react-chartjs-2";

function Results(){

const data = {

labels:["Sleep","Screen Time","Study Hours"],

datasets:[{

label:"Impact",

data:[8,6,5]

}]

}

return(

<div>

<h2>Burnout Results</h2>

<Bar data={data}/>

</div>

)

}

export default Results