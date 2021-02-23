import React from 'react';
import Chart from 'react-apexcharts';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import ReactApexChart from 'apexcharts';



const styles = makeStyles((theme) => ({
  bottomArrows:{
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1)*-2
    // marginLeft: theme.spacing(5)
  }
}))


function createData(resourse, type, startTime, endTime){
  return {
    resourse: resourse,
    type: type,
    startTime: startTime,
    endTime: endTime
  }
}


const resourses = [
  createData("music.yandex.ru/home", 'neutral', new Date(2021, 2, 25, 3, 10), new Date(2021, 2, 25, 3, 23)),
  createData('spring.io/', 'effective', new Date(2021, 2, 25, 12, 10), new Date(2021, 2, 25, 12, 17)),
  createData('www.youtube.com/', 'ineffective', new Date(2021, 2, 25, 12, 17), new Date(2021, 2, 25, 12, 20)),
  createData('spring.io/', 'effective', new Date(2021, 2, 25, 12, 25), new Date(2021, 2, 25, 12, 31)),
  createData('ru.reactjs.org/', 'effective', new Date(2021, 2, 25, 12, 40), new Date(2021, 2, 25, 13, 53)),
  createData('vk.com/feed', 'ineffective', new Date(2021, 2, 25, 14, 10), new Date(2021, 2, 25, 16, 23)),
  createData('https://www.google.com/', 'neutral', new Date(2021, 2, 25, 16, 23), new Date(2021, 2, 25, 16, 25))
]

const resultSeries = () => {
  let res = []
  for (let ind = 0; ind < resourses.length; ind++){
    const data = resourses[ind]
    let color = ""
    if (data.type === 'effective') color = 'springgreen'
    else if(data.type === 'neutral') color = '#338EFF'
    else if(data.type === 'ineffective') color = '#FF337A'
    else color = 'black'

    res.push(
      {
        name: data.resourse,
        data: [
          {
            x: 'T',
            y: [
              data.startTime.getTime(),
              data.endTime.getTime()
            ],
            fillColor: color
          }
        ]
      }
    )

  }
  return res
}


const series = resultSeries()
console.log("RES", series)

// const series = [

//     // John Jay
//     {
//         name: 'Spring',
//         data: [
//           {
//             x: 'T',
//             y: [
//               new Date(2021, 2, 25, 1, 10).getTime(),
//               new Date(2021, 2, 25, 2, 23) .getTime()
//             ],
//             fillColor: 'springgreen'
//           }
//         ]
//       },
//     {
//       name: 'Spring',
//       data: [
//         {
//           x: 'T',
//           y: [
//             new Date(2021, 2, 25, 9, 10).getTime(),
//             new Date(2021, 2, 25, 10, 23) .getTime()
//           ],
//           fillColor: 'springgreen'
//         }
//       ]
//     },
//     // Edmund Randolph
//     {
//       name: 'Vk',
//       data: [
//         {
//           x: 'T',
//           y: [
//             new Date(2021, 2, 25, 10, 23).getTime(),
//             new Date(2021, 2, 25, 12, 34).getTime()
//           ],
//           fillColor: '#FF337A'
//         }
//       ]
//     },
//     // Timothy Pickering
//     {
//       name: 'T',
//       data: [
//         {
//           x: 'T',
//           y: [
//             new Date(2021, 2, 25, 12, 34).getTime(),
//             new Date(2021, 2, 25, 16, 42).getTime()
//           ],
//           fillColor: '#FF337A'
//         }
//       ]
//     },
//     // Charles Lee
//     {
//       name: 'Neutral',
//       data: [
//         {
//           x: 'T',
//           y: [
//             new Date(2021, 2, 25, 16, 42).getTime(),
//             new Date(2021, 2, 25, 19, 24).getTime()
//           ],
//           fillColor: '#338EFF'
//         }
//       ]
//     },
//     // John Marshall
//     {
//       name: 'Effective',
//       data: [
//         {
//           x: 'T',
//           y: [
//             new Date(2021, 2, 25, 19, 24).getTime(),
//             new Date(2021, 2, 25, 19, 27).getTime()
//           ],
//           fillColor: 'springgreen'
//         }
//       ]
//     },
//     // Levi Lincoln
//     {
//       name: 'Effective',
//       data: [
//         {
//           x: 'T',
//           y: [
//             new Date(2021, 2, 25, 19, 27).getTime(),
//             new Date(2021, 2, 25, 19, 36).getTime()
//           ],
//           fillColor: 'springgreen'
//         }
//       ]
//     },
//     // James Madison
//     {
//       name: 'Neutral',
//       data: [
//         {
//           x: 'T',
//           y: [
//             new Date(2021, 2, 25, 20, 40).getTime(),
//             new Date(2021, 2, 25, 21, 54).getTime()
//           ],
//           fillColor: '#338EFF'
//         }
//       ]
//     }
//   ]

 const options = {
    chart: {
      height: 350,
      type: 'rangeBar',
      toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
            download: false,
            selection: false,
            zoom: true,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: true | '<img src="/static/icons/reset.png" width="20">',
            customIcons: []
            },
        },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
        rangeBarGroupRows: true
      }
    },
    colors:['#000000'],
    
    xaxis: {
      type: 'datetime'
    },
    legend: {
      position: 'right'
    },
    toolbar:{
        show: false
      },
    legend: {
        show: false
    },
    tooltip: {
        enabled: true,
        fillSeriesColor: false,
        shared: true,
        onDatasetHover: {
            highlightDataSeries: false,
            followCursor: true,
        },
        x: {
            show: true,
            format: 'HH:mm',
        },
        y: {
            formatter: function(value, series) {
              return ''
            }
        }
    },
    yaxis: {
        show: false,
    }
  }

  export default function ByHoursChart(props){
    
    return(
      <div style={{paddingTop: '16px'}}>
          <Chart options={options} series={series} type="rangeBar" height={150} width={1370}/>
      </div>
    )
  }
