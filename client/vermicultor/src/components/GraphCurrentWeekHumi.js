import { useEffect } from "react";
import  Chart  from 'chart.js/auto';

function GraphCurrentWeekHumi(){
    useEffect(() => {
        fetch('http://localhost:5000/getData3')
        .then(res => res.json())
        .then(
            ((res) => {
                const dataHumi = {
                    labels: res.labels,
                    datasets:[{
                      label: 'Humidité moyenne durant la semaine courante',
                      data: res.humidity,
                      fill: false,
                      borderColor: 'rgb(75,192,192)',
                      tension: 0.1
                    }]
                  }
                const ctx = document.getElementById("graphCurrentWeekHumi");
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
    },[]);
    return <canvas id='graphCurrentWeekHumi'></canvas>
}

export default GraphCurrentWeekHumi;