import {React, useState, useEffect} from "react";
import "../Styling/Analytics.css"
import AlertStatusDonut from "../Components/AlertStatusDonut";
import AlertTriggeredByDonut from "../Components/AlertTriggeredByDonut";
import AnalyticsCounts from "../Components/AnalyticsCounts";
import AlertsPerDay from "../Components/AlertsPerDay";
import TopThreeAlerts from "./TopThreeAlerts";

const AllAnalytics = ({starttime,endtime}) => {
  const [daysBetween, setdaysDifference] = useState([]);

  function calculateDaysDifference () {
    let dateStart = new Date(starttime)
    let dateEnd = new Date(endtime)
    let difference = dateEnd.getTime() - dateStart.getTime()
    let days = difference / (1000 * 60 * 60 * 24);
    setdaysDifference(days)
}

useEffect(() => {
  calculateDaysDifference();
}, [starttime,endtime]);

  return (
    <div>
      <h1 className="reporting-title">Siren Alert Statistics</h1>
        <div className="donut-chart-container">
                <AlertStatusDonut startTime={starttime} endTime={endtime} />
                <AlertTriggeredByDonut startTime={starttime} endTime={endtime}/>
        </div>
        <AnalyticsCounts startTime={starttime} endTime={endtime}/>
        <AlertsPerDay startTime={starttime} endTime={endtime} daysDifference={daysBetween}/>
        <TopThreeAlerts startTime={starttime} endTime={endtime} daysDifference={daysBetween}/>
      </div>
  );
}

export default AllAnalytics;