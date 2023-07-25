import Chart from "react-apexcharts";
import React, { useEffect, useState} from "react";

export default function ApexDonut({ goals, dropDown }) {
    // console.log('goals: ', goals)
    // console.log('dropdown: ', dropDown)

    const [reachGoal, setReachGoal] = useState(false);

    const series = goals.map((goal) => {
        if (goal.category === dropDown) {
            const firstVal = Math.trunc(goal.total / goal.goal * 100)
            const secondVal = 100 - firstVal
            return [firstVal, secondVal];
        }
        return [0, 100] // return default values if no matching goal values are found
    })

    // console.log('series: ', series)

    useEffect(() => {
        if (series[0] < 100) {
            setReachGoal(false);
        } else {
            setReachGoal(true);
        }
    }, [series]);
        const options = { //data on the x-axis
            // chart: { id: 'donut' },
            // xaxis: {
            //     categories: []
            // }
            chart: {
                type: 'donut',
                // background: 'red',
                height: '800px',
                sparkline: {
                    borderWidth: 2 // Set the desired border width here
                },
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            colors: ['#1E9700', '#EBEBEB'],
            stroke: {
                show: false,
                width: 0
            },
            labels: ['amount', 'total'],
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                pie: {
                    expandOnClick: true,
                    customScale: 1,
                    size: 800,
                    donut: {
                        size: '80%',
                        label: {
                            show: true
                        }
                    }
                }
            },
            legend: {
                show: false,
                position: 'bottom'
            }
        }
        return (
            <div className='donut'>
                {goals && dropDown && (
                <Chart
                options={options}
                series={series[0]}
                type="donut"
                width="350px"
                />
                )}
            </div >
        )
}
