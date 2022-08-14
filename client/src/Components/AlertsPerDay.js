import React , {useState, useEffect} from "react";
import axios from "axios";
import Chart from 'react-google-charts'
import "../Styling/AlertsPerDay.css"

const AlertsPerDay = ({startTime,endTime,daysDifference}) => {   

    const [data, setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/getAlertReporting",{params:{starttime:startTime,endtime:endTime}});
        setData(response.data);
    }

    useEffect(() => {
        loadData();
    }, [startTime,endTime]);

    let highPriorityChartData = [];
    let lowPriorityChartData = [];

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

    highPriorityChartData.push(['date', 'high'])
    lowPriorityChartData.push(['date', 'low'])

    for(let i=daysDifference; i>=0;i--){
        let tempHighCounter=0;
        let tempLowCounter=0;
        let tempDate = new Date(endTime);
        tempDate.setDate(tempDate.getDate() - i);
        for(let j=0; j<data.length; j++){
            if(data[j].priority === "High" && data[j].creationtime.slice(0,-14) ===  formatDate(tempDate)){
                tempHighCounter++;
            }
            else if (data[j].priority === "Low" && data[j].creationtime.slice(0,-14) ===  formatDate(tempDate))  {
                tempLowCounter++;
            }
        }
        highPriorityChartData.push([formatDate(tempDate),tempHighCounter])
        lowPriorityChartData.push([formatDate(tempDate),tempLowCounter])
    }

      const highPriorityOptions = {
        hAxis: {
          title: 'Days',
        },
        vAxis: {
          title: 'Alert Volume',
        },
        colors: ["#e8153b"],
        lineWidth: 3
      }

      const lowPriorityOptions = {
        hAxis: {
          title: 'Days',
        },
        vAxis: {
          title: 'Alert Volume',
        },
        colors: ["#1597e8"],
        lineWidth: 3
      }
      //https://www.positronx.io/react-js-multiple-line-chart-with-google-charts-tutorial/
  return (
    <div>
      <div className="alerts-per-day-container">
        <h3 className="line-chart-title">High Priority Alerts Per Day</h3>
        <div className="line-chart-container">
        <Chart
          className="alert-volume-chart"
          width={"100%"}
          height={'500px'}
          chartType="LineChart"
          data={highPriorityChartData}
          options={highPriorityOptions}
        />
        </div>
        </div>
        <div className="alerts-per-day-container">
        <h3 className="line-chart-title">Low Priority Alerts Per Day</h3>
        <div className="line-chart-container">
        <Chart
          className="alert-volume-chart"
          width={"100%"}
          height={'500px'}
          chartType="LineChart"
          data={lowPriorityChartData}
          options={lowPriorityOptions}
        />
        
        </div>
        </div>
    </div>
  );
}

export default AlertsPerDay;