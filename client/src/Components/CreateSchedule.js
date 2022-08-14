import axios from "axios";
import React, { useState } from "react";
import "../Styling/Maintenance.css"

const initialState = {
    user: "",
    tier: "",
    starttime: "",
    endtime: ""
}

const CreateSchedule = () => {
    const [state, setState] = useState(initialState);
    const {user,tier,starttime,endtime} = state;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!user || !tier || !starttime || !endtime) {
            alert("Please enter data into all fields to create an account")
        } else {
            axios.post("http://localhost:5000/api/createSchedule", {
                user,
                tier,
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
        <h3>Create Schedule</h3>
        <hr/>
        <form onSubmit={handleSubmit}>
            <label htmlFor="user">User:</label>
            <input 
            type="text"
            id="user"
            name="user"
            placeholder="Email..."
            value={user}
            onChange={handleInputChange}/>
            <label htmlFor="tier">Tier:</label>
            <select defaultValue={'DEFAULT'} id="tier" name="tier" onChange={handleInputChange}>
                <option value="DEFAULT">Tier...</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
            </select>
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
            <input type="submit" value="Create Schedule"/>
        </form>

    </div>
  );
}

export default CreateSchedule;