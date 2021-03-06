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
  }
}))

function minutesToHours(minutes){
  const hours = Math.floor(minutes/60)
  const min = minutes % 60
  if (hours != 0){
      if (min != 0) return  hours+ 'h' + ' ' + minutes%60 + 'm'
      return hours+'h'
  }
  return minutes%60+'m'
}   


const dataUsing = [121,60,143,90,41,200,100, 131, 300, 100, 57,99]
const dataWaste =   [136,190,101,98,230,15,240, 23, 90,20,34,90]
// const dataIneffective = [100,120,10,10,15,20, 11, 0,76,1.0,80,1]
// const dataWithout = [200,55,104,210,100,201,0, 100, 10,99,20,33]

const dataUsingWeek = [121,230,240,250,130,120,140,123,243,120,86,135]
const dataWasteWeek= [100,212,20,80,130,270,310,107,14,78,101,100]
// const dataIneffectiveWeek = [20,120,150,154,76,45,13,67,72,50,61,21]
// const dataWithoutWeek = [132,11,13,53,46,97,120,53,62,78,23,109]


const maxYVal = 600
const tickAmount = 5

const categories = [['Bobrov Artur'],['Kuznezova Veronika'], ['Lisa Davies'],['Maria Jones'],['Mark Evans'],['Michaylov Dmitry'],['Novikova Anna'],
['David Smith'],['Paul Taylor'],['Popov Ilya'], ['Prokhorov Andrew'], ['Sorokin Alexandr']]

const series =  [
  {
    name: 'Using',
    data: dataUsing.slice(0,6),
  },
  {
    name: 'Waste',
    data: dataWaste.slice(0,6)
  }
]
  
  
  const options = {
    chart: {
      id: 'usageTeam',
      type: 'bar',
      height: 350,
      stacked: true,
      width: 50,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 300,
        animateGradually: {
            enabled: true,
            delay: 1
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    },
    toolbar:{
      show: false
    }
    },
  
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '25%',
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
        categories: categories.slice(0, 6),
        labels: {rotate: -45}
    }
    ,
    yaxis:{

      min: 0,
      max: maxYVal,
      tickAmount: tickAmount,

      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 900,
        },
        formatter: (value) => { return minutesToHours(value) },
      },
    },
    fill: {
        colors: ['#e91e63', '#031d44'],
        opacity: 1
      },
  }

  function computeNewOptions(beginInd, endInd, dataUsing, dataWaste){
    return {
      series: [
        {
          name: 'Using',
          data: dataUsing.slice(beginInd, endInd + 1)
        },
        {
        name: 'Waste',
        data: dataWaste.slice(beginInd, endInd + 1)
      }],
      xaxis:{
        categories: categories.slice(beginInd, endInd + 1)
      }
    }
  }


  export default function EfficiencyByHoursChart(props){
    const classes = styles()

    const [timePeriod, setTimePeriod] = React.useState(0)
    const [beginInd, setBeginInd] = React.useState(0)
    const [endInd, setEndInd] = React.useState(6)
    const catLen = categories.length

    const handleLeftClick = event => {

      let newBeginInd
      if (beginInd < 6)  newBeginInd = 0
      else newBeginInd = beginInd - 6
      let newEndInd = newBeginInd + 6 <= categories.length -1 ? newBeginInd + 6 : categories.length - 1

      let dataU, dataW
      if (timePeriod === 2){
        dataU = dataUsingWeek
        dataW = dataWasteWeek
      }
      else {
        dataU = dataUsing
        dataW = dataWaste
      }
      const newOpt = computeNewOptions(newBeginInd, newEndInd, dataU, dataW)
      setBeginInd(newBeginInd)
      setEndInd(newEndInd)
      ReactApexChart.exec("usageTeam", 'updateOptions', newOpt, true)
    }

    const handleRightClick = event => {

        let newEndInd
        if (endInd > categories.length - 1 - 6) newEndInd = categories.length - 1
        else newEndInd = endInd + 6
        let newBeginInd = newEndInd-6 >= 0 ? newEndInd - 6 : 0
        
        let dataU, dataW
        if (timePeriod === 2){
          dataU = dataUsingWeek
          dataW = dataWasteWeek
        }
        else {
          dataU = dataUsing
          dataW = dataWaste
        }
        const newOpt = computeNewOptions(newBeginInd, newEndInd, dataU, dataW)
        setBeginInd(newBeginInd)
        setEndInd(newEndInd)
        ReactApexChart.exec("usageTeam", 'updateOptions', newOpt, true)
    }
    

    React.useEffect(() => {
      if (timePeriod != 0 && timePeriod == props.timePeriod){}

      else if(props.timePeriod == 2){
        const newOpt = computeNewOptions(beginInd, endInd, dataUsingWeek, dataWasteWeek)
        ReactApexChart.exec("usageTeam", 'updateOptions', newOpt, true)  
        setTimePeriod(props.timePeriod)
      }

      else if(props.timePeriod == 1){
        const newOpt = computeNewOptions(beginInd, endInd,dataUsing, dataWaste)
        ReactApexChart.exec("usageTeam", 'updateOptions', newOpt, true)
        setTimePeriod(props.timePeriod)
      }
    });

    return(
      <div>
          <Chart options={options} series={series} type="bar" height={370}  width={'100%'}/>
          <div className={classes.bottomArrows}>
            {beginInd === 0 ? (<Button disabled><KeyboardArrowLeftIcon/></Button>):(<Button onClick={handleLeftClick}><KeyboardArrowLeftIcon/></Button>)}
            {endInd === catLen - 1 ? (<Button disabled><KeyboardArrowRightIcon/></Button>) : (<Button onClick={handleRightClick}><KeyboardArrowRightIcon/></Button>)}
          </div>)
      </div>
    )
  }
