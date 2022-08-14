import axios from "axios";
import React, { useState, useEffect } from "react";
import "../Styling/CreateAlert.css";

const initialState = {
    subject: "",
    description: "",
    priority: "",
    triggeredby: ""
}

const CreateAlert = () => {

    const [state, setState] = useState(initialState);
    const {subject,description,priority, triggeredby} = state;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!subject || !description || !priority || !triggeredby) {
            alert("Please enter data into all fields to create an alert")
        } else {
            axios.post("http://localhost:5000/api/createAlert", {
                subject,
                description,
                priority,
                triggeredby
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

    const [active, setActiveData] = useState([]);
    const loadActive = async () => {
        const response = await axios.get("http://localhost:5000/api/getMaintenance",{params:{status:"active"}});
        setActiveData(response.data);
        console.log(active);
    }

    useEffect(() => {
        loadActive();
    }, []);

    let maintenanceWindow = "inactive"

    if (active.length > 0) {
        maintenanceWindow = "active"
    }

  return (

    <div class="container">
        <h1>Create Alert</h1>
        <hr/>
        <form onSubmit={handleSubmit}>
            <label for="subject">Subject:</label>
            <input 
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject..."
            value={subject}
            onChange={handleInputChange}
            />
            <label for="description">Description:</label>
            <textarea
            className="description"
            type="text"
            id="description"
            name="description"
            placeholder="Description..."
            value={description}
            onChange={handleInputChange}/>
            
            <label for="priority">Priority:</label>
            <select defaultValue={'DEFAULT'} id="priority" name="priority" onChange={handleInputChange}>
                <option value="DEFAULT">Priority...</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
            </select>
            <label for="triggeredby">Triggered By:</label>
            <input 
            type="text"
            id="triggeredby"
            name="triggeredby"
            placeholder="Triggered By..."
            value={triggeredby}
            onChange={handleInputChange}
            />
            {(() => {
            if (maintenanceWindow === "active"){
                return (
                    <input type="submit" className="disabled-button" disabled="disabled" value="Maintenance Window Active, Alerts Cannot Be Triggered"/>
                )
            }
            else {
                return (
                    <input type="submit" value="Create Alert"/>
                )
            }
        })()}
        </form>

    </div>
  );
}

export default CreateAlert;