import { useEffect } from "react";
import  Chart  from 'chart.js/auto';

function GraphCurrentWeekTemp(){
    useEffect(() => {
        fetch('http://localhost:5000/getData3')
        .then(res => res.json())
        .then(
            ((res) => {
                const dataTemp = {
                    labels: res.labels,
                    datasets:[{
                      label: 'Température moyenne durant la semaine courante',
                      data: res.temperature,
                      fill: false,
                      borderColor: 'rgb(75,192,192)',
                      tension: 0.1
                    }]
                  }
                const ctx = document.getElementById("graphCurrentWeekTemp");
                const lineTemp = new Chart(ctx ,{
                type: 'line',
                data: dataTemp,
                options: {
                    scales:{
                    y: {
                        min: -20,
                        max: 60,
                    }
                    }
                }
                })

                return () => {
                lineTemp.destroy()
                }
            })
        )
    },[]);
    return <canvas id='graphCurrentWeekTemp'></canvas>
}

export default GraphCurrentWeekTemp;