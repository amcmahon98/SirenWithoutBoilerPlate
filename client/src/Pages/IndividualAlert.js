import React, {useState, useEffect, Fragment} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Styling/IndividualAlert.css"

const IndividualAlert = () => {
    const [alert, setAlert] = useState({});
    const {id} = useParams();
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/getAlert/${id}`)
        .then((resp) => setAlert({...resp.data[0]}));
    }, [id]); 

    const alertStatus = alert.status;


const UpdateStatus = (updatedStatus) => {
    axios.post("http://localhost:5000/api/updateStatus", {
        id,
        updatedStatus
    })
    window.location.reload(false);
}

  return (
    <div className="container">
        <h2>{alert.subject}</h2>
        <label>Status: </label>
        <p>{alert.status}</p>
        <label>Priority: </label>
        <p>{alert.priority}</p>
        <label>Assigned To: </label>
        <p>{alert.assigned}</p>
        <label>Triggered By: </label>
        <p>{alert.triggeredby}</p>
        <label>Description: </label>
        <p>{alert.description}</p>
        {(() => {
            if (alertStatus === "Triggered"){
                return (
                    <Fragment>
                        <button className="acknowledge-button" onClick={event => {UpdateStatus('Acknowledged')}}>Acknowledge</button>
                        <button className="resolve-button" onClick={event => {UpdateStatus('Resolved')}}>Resolve</button>
                    </Fragment>
                )
            }
            else if (alertStatus === "Acknowledged"){
                return <button className="resolve-button" onClick={event => {UpdateStatus('Resolved')}}>Resolve</button>
            }
        })()}
    </div>
  );
}

export default IndividualAlert;