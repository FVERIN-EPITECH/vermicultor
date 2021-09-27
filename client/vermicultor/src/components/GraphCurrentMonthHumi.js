import { useEffect } from "react";
import  Chart  from 'chart.js/auto';

function GraphCurrentMonthHumi(){
    useEffect(() => {
        fetch('http://localhost:5000/getData4')
        .then(res => res.json())
        .then(
            ((res) => {
                const dataHumi = {
                    labels: res.labels,
                    datasets:[{
                      label: 'Humidité moyenne durant le mois courant',
                      data: res.humidity,
                      fill: false,
                      borderColor: 'rgb(75,192,192)',
                      tension: 0.1
                    }]
                  }
                const ctx = document.getElementById("graphCurrentMonthHumi");
                const lineHumi = new Chart(ctx ,{
                type: 'line',
                data: dataHumi,
                options: {
                    scales:{
                    y: {
                        min: 0,
                        max: 100,
                    }
                    }
                }
                })

                return () => {
                lineHumi.destroy()
                }
            })
        )
    }
    ,[]);
    return <canvas id='graphCurrentMonthHumi'></canvas>
}

export default GraphCurrentMonthHumi;