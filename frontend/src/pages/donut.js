import Chart from "react-apexcharts";
import React, { useEffect, useState} from "react";

export default function ApexDonut({ goals, dropDown }) {

  const [reachGoal, setReachGoal] = useState(false);

  const series = goals.map((goal) => {
    if (goal.category === dropDown) {
      const firstVal = Math.trunc(goal.total / goal.goal * 100)
      const secondVal = 100 - firstVal
      return [firstVal, secondVal];
    }
    return [0, 100] // return default values if no matching goal values are found
  })

  useEffect(() => {
    if (series[0] < 100) {
      setReachGoal(false);
    } else {
      setReachGoal(true);
    }
  }, [series]);

  const options = {
    chart: {
      type: 'donut',
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
    }, [series]);
        const options = {
            chart: {
                type: 'donut',
                // background: 'red',
                height: '800px',
                sparkline: {
                    borderWidth: 2 // Set the desired border width here
                },
            },
            tooltip: {
                enabled: true,
                enabledOnSeries: undefined,
                shared: true,
                followCursor: true,
                intersect: false,
                inverseOrder: false,
                custom: undefined,
                fillSeriesColor: false,
                theme: undefined,
                style: {
                  fontSize: '12px',
                  fontFamily: undefined,
                },
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
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
            colors: ['#df5000', '#ffcf60'],
            stroke: {
                show: false,
                width: 0
            },
            labels: ['amount', 'total'],
            dataLabels: {
                enabled: true,
                background: {
                    enabled: false,
                    foreColor: '#df5000',
                    padding: 2,
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: '#df5000',
                    opacity: 0.1,
                    dropShadow: {
                      enabled: true,
                      top: 1,
                      left: 1,
                      blur: 1,
                      color: '#fff',
                      opacity: 0.45
                    }
                  },
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
      }
    },
    legend: {
      show: false,
      position: 'bottom'
    },
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
  );
}
