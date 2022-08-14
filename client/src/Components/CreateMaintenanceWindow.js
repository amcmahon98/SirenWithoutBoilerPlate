import axios from "axios";
import React, { useState } from "react";
import "../Styling/Maintenance.css"

const initialState = {
    reason: "",
    starttime: "",
    endtime: ""
}

const CreateMaintenanceWindow = () => {
    const [state, setState] = useState(initialState);
    const {reason,starttime,endtime} = state;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!reason || !starttime || !endtime) {
            alert("Please enter data into all fields to create an account")
        } else {
            axios.post("http://localhost:5000/api/createMaintenance", {
                reason,
                starttime,
                endtime
            })
            .catch((err) => console.log(err.response.data));
            setTimeout(500);
            window.location.reload(false);
        }
    }
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state,[name]: value})
    }

  return (

    <div className="container">
        <h3>Create Maintenance Window</h3>
        <hr/>
        <form onSubmit={handleSubmit}>
            <label htmlFor="reason">Reason:</label>
            <input 
            type="text"
            id="reason"
            name="reason"
            placeholder="Reason..."
            value={reason}
            onChange={handleInputChange}/>
            <label htmlFor="starttime">Start Time:</label>
            <input
            className="starttime"
            type="datetime-local"
            id="starttime"
            name="starttime"
            value={starttime}
            onChange={handleInputChange}/>
            <label htmlFor="endtime">End Time:</label>
            <input
            className="endtime"
            type="datetime-local"
            id="endtime"
            name="endtime"
            value={endtime}
            onChange={handleInputChange}/>
            <input type="submit" value="Create Maintenance Window"/>
        </form>

    </div>
  );
}

export default CreateMaintenanceWindow;