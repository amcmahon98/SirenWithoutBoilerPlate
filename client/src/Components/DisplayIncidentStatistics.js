import React , {useState, useEffect} from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import "../Styling/DisplayIncidentStatistics.css";

function DisplayIncidentStatistics() {
  const cookies = new Cookies();
  const userName = cookies.get('name')

  var allTriggered = 0;
  var allAcknowledged = 0;
  var allResolved = 0;
  var userTriggered = 0;
  var userAcknowledged = 0;
  var userResolved = 0;

  const [data, setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/getAlerts",{params:{status:"all"}});
        setData(response.data);
    }

    function calculateStatistics(item) {
      if (item.status === "Triggered") {
        allTriggered++;
        if (item.assigned === userName) {
          userTriggered++;
        }
      }
      else if (item.status === "Acknowledged") {
        allAcknowledged++;
        if (item.assigned === userName) {
          userAcknowledged++;
        }
      }
      else if (item.status === "Resolved") {
        allResolved++;
        if (item.assigned === userName) {
          userResolved++;
        }
      }
    }

    useEffect(() => {
        loadData();
    }, []);

    for (let i=0; i<data.length; i++) {
      calculateStatistics(data[i])
    }

  return (
    <div className="DisplayIncidentStatistics">
      <div className="DisplayIncidentStatistics-child">
        <h3>Your Incidents</h3>
        <hr className="stats-hr"/>
        <p className="triggered-tag">Triggered: {userTriggered}</p>
        <p className="acknowledged-tag">Acknowledged: {userAcknowledged}</p>
        <p className="resolved-tag">Resolved: {userResolved}</p>
      </div>
      <div className="DisplayIncidentStatistics-child">
        <h3>All Incidents</h3>
        <hr className="stats-hr"/>
        <p className="triggered-tag">Triggered: {allTriggered}</p>
        <p className="acknowledged-tag">Acknowledged: {allAcknowledged}</p>
        <p className="resolved-tag">Resolved: {allResolved}</p>
        </div>
    </div>
  );
}

export default DisplayIncidentStatistics;