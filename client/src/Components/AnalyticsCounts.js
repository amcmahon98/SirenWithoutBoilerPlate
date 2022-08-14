import React , {useState, useEffect} from "react";
import axios from "axios";
import "../Styling/AnalyticsCounts.css"

const AnalyticsCounts = ({startTime,endTime}) => {
    var highAlertsCount = 0;
    var lowAlertsCount = 0;
    var uniqueSubjects = [];

    const [allAlerts, setAllAlerts] = useState([]);
    const loadAllAlerts = async () => {
        const response = await axios.get("http://localhost:5000/api/getAlertReporting",{params:{starttime:startTime,endtime:endTime}});
        setAllAlerts(response.data);
    }

    const [allMaintenance, setAllMaintenance] = useState([]);
    const loadAllMaintenance = async () => {
        const response = await axios.get("http://localhost:5000/api/getMaintenanceReporting",{params:{starttime:startTime,endtime:endTime}});
        setAllMaintenance(response.data);
    }


    function calculateCounts(item) {
        if(item.priority === "High") {
            highAlertsCount++;
        }
        else {
            lowAlertsCount++;
        }
    }

    useEffect(() => {
        loadAllAlerts();
        loadAllMaintenance();
    }, [startTime,endTime]);

    for (let i=0; i<allAlerts.length; i++) {
      calculateCounts(allAlerts[i])
      
      if(!uniqueSubjects.includes(allAlerts[i].subject)) {
          uniqueSubjects.push(allAlerts[i].subject)
      }
    }

  return (
    <div>
        <div className="counters-container">
            <div className="counters-child">
                <div className="counter-text">{uniqueSubjects.length}</div>
                <p className="counter-title">Unique Alerts</p>
        </div>
        <div className="counters-child">
                <div className="counter-text">{highAlertsCount}</div>
                <p className="counter-title">High Priority</p>
        </div>
        <div className="counters-child">
                <div className="counter-text">{lowAlertsCount}</div>
                <p className="counter-title">Low Priority</p>
        </div>
        <div className="counters-child">
                <div className="counter-text">{allAlerts.length}</div>
                <p className="counter-title">Total Alerts</p>
        </div>
        <div className="counters-child">
                <div className="counter-text">{allMaintenance.length}</div>
                <p className="counter-title">Maintenance Windows</p>
        </div>
        </div>
    </div>
  );
}

export default AnalyticsCounts;