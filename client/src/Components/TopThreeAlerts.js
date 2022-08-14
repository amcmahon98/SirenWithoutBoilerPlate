import React , {useState, useEffect} from "react";
import axios from "axios";
import Chart from 'react-google-charts'

const TopThreeAlerts = ({startTime,endTime,daysDifference}) => {
  var uniqueSubjects = [];
  var uniqueSubjectsCounts = [[0,0],[0,0],[0,0]];
  let firstChartData = [];
  let secondChartData = [];
  let thirdChartData = [];

  const [allAlerts, setAllAlerts] = useState([]);
    const loadAllAlerts = async () => {
        const response = await axios.get("http://localhost:5000/api/getAlertReporting",{params:{starttime:startTime,endtime:endTime}});
        setAllAlerts(response.data);
    }

    useEffect(() => {
      loadAllAlerts();
  }, [startTime,endTime]);

  for (let i=0; i<allAlerts.length; i++) {
    if(!uniqueSubjects.includes(allAlerts[i].subject)) {
        uniqueSubjects.push(allAlerts[i].subject)
    }
  }

  for (let i=0; i<uniqueSubjects.length; i++) {
    var uniqueCounter = 0;
    for (let j=0; j<allAlerts.length; j++) {
        if(uniqueSubjects[i] === allAlerts[j].subject) {
          uniqueCounter++;
        }
    }
    uniqueSubjectsCounts.push([uniqueSubjects[i],uniqueCounter])
  }

  uniqueSubjectsCounts.sort(function(low,high) {
    return high[1]-low[1]
  })
  
  //https://bobbyhadz.com/blog/javascript-get-yesterday-date-yyyy-mm-dd
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

//https://bobbyhadz.com/blog/javascript-get-yesterday-date-yyyy-mm-dd
function formatDate(date) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}
console.log(uniqueSubjectsCounts)

firstChartData.push(['date', uniqueSubjectsCounts[0][0]])
secondChartData.push(['date', uniqueSubjectsCounts[1][0]])
thirdChartData.push(['date', uniqueSubjectsCounts[2][0]])

for(let i=daysDifference; i>=0;i--){
    let tempFirstCounter=0;
    let tempSecondCounter=0;
    let tempThirdCounter=0;
    let tempDate = new Date(endTime);
    tempDate.setDate(tempDate.getDate() - i);
    for(let j=0; j<allAlerts.length; j++){
        if(allAlerts[j].subject === uniqueSubjectsCounts[0][0] && allAlerts[j].creationtime.slice(0,-14) ===  formatDate(tempDate)){
          tempFirstCounter++;
        }
        else if (allAlerts[j].subject === uniqueSubjectsCounts[1][0] && allAlerts[j].creationtime.slice(0,-14) ===  formatDate(tempDate))  {
            tempSecondCounter++;
        }
        else if (allAlerts[j].subject === uniqueSubjectsCounts[2][0] && allAlerts[j].creationtime.slice(0,-14) ===  formatDate(tempDate)) {
            tempThirdCounter++;
        }
    }
    firstChartData.push([formatDate(tempDate),tempFirstCounter])
    secondChartData.push([formatDate(tempDate),tempSecondCounter])
    thirdChartData.push([formatDate(tempDate),tempThirdCounter])
}

const chartOptions = {
  hAxis: {
    title: 'Days',
  },
  vAxis: {
    title: 'Alert Volume',
  },
  colors: ["#0E9594"],
  lineWidth: 3
}

  return (
    <div>
    <div className="alerts-per-day-container">
    <h3 className="line-chart-title">Highest Frequency Alerts</h3>
      <p className="top3-sub-heading">{uniqueSubjectsCounts[0][0]} (Occurrences: {uniqueSubjectsCounts[0][1]})</p>
      <div className="line-chart-container">
      <Chart
        className="alert-volume-chart"
        width={"100%"}
        height={'500px'}
        chartType="LineChart"
        data={firstChartData}
        options={chartOptions}
      />
      </div>
      <p className="top3-sub-heading">{uniqueSubjectsCounts[1][0]} (Occurrences: {uniqueSubjectsCounts[1][1]})</p>
      <div className="line-chart-container">
      <Chart
        className="alert-volume-chart"
        width={"100%"}
        height={'500px'}
        chartType="LineChart"
        data={secondChartData}
        options={chartOptions}
      />
      </div>
      <p className="top3-sub-heading">{uniqueSubjectsCounts[2][0]} (Occurrences: {uniqueSubjectsCounts[2][1]})</p>
      <div className="line-chart-container">
      <Chart
        className="alert-volume-chart"
        width={"100%"}
        height={'500px'}
        chartType="LineChart"
        data={thirdChartData}
        options={chartOptions}
      />
      </div>
      </div>
  </div>
  );
}

export default TopThreeAlerts;