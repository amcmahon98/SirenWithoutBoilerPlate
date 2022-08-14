import React , {useState, useEffect} from "react";
import DataTable from "react-data-table-component"
import axios from "axios";
import CreateMaintenanceWindow from "../Components/CreateMaintenanceWindow";
import "../Styling/Maintenance.css"

const Maintenance = () => {

    const cancelMaintenance = (id) => {
            axios.delete(`http://localhost:5000/api/delete/maintenance/${id}`);
            window.location.reload(false);
    }

    const endMaintenance = (id) => {
            axios.post("http://localhost:5000/api/updateMaintenance", {id})
            window.location.reload(false);
        }

    const [active, setActiveData] = useState([]);
    const loadActive = async () => {
        const response = await axios.get("http://localhost:5000/api/getMaintenance",{params:{status:"active"}});
        setActiveData(response.data);
    }

    const [future, setFutureData] = useState([]);
    const loadFuture = async () => {
        const response = await axios.get("http://localhost:5000/api/getMaintenance",{params:{status:"future"}});
        setFutureData(response.data);
    }

    const [previous, setPreviousData] = useState([]);
    const loadPrevious = async () => {
        const response = await axios.get("http://localhost:5000/api/getMaintenance",{params:{status:"previous"}});
        setPreviousData(response.data);
    }

    useEffect(() => {
        loadActive();
        loadFuture();
        loadPrevious();
    }, []);

    const activeColumns = [
        {
            name: 'Reason',
            selector: row => row.reason,
            width: "40%"
        },
        {
            name: 'Start Time',
            selector: row => row.starttime.slice(0,-8),
            width: "25%"
        },
        {
            name: 'End Time',
            selector: row => row.endtime.slice(0,-8),
            width: "25%"
        },
        {
            cell: row => <a className="end-now-link" onClick={e=> { e.preventDefault(); endMaintenance(row.id)} }>End Now</a>,
            width: "10%"
        }
    ]

    const futureColumns = [
        {
            name: 'Reason',
            selector: row => row.reason,
            width: "40%"
        },
        {
            name: 'Start Time',
            selector: row => row.starttime.slice(0,-8),
            width: "25%"
        },
        {
            name: 'End Time',
            selector: row => row.endtime.slice(0,-8),
            width: "25%"
        },
        {
            cell: row => <a className="cancel-link" onClick={e=> { e.preventDefault(); cancelMaintenance(row.id)} }>Cancel</a>,
            width: "10%",
        }
    ]

    const previousColumns = [
        {
            name: 'Reason',
            selector: row => row.reason,
            width: "40%"
        },
        {
            name: 'Start Time',
            selector: row => row.starttime.slice(0,-8),
            width: "25%"
        },
        {
            name: 'End Time',
            selector: row => row.endtime.slice(0,-8),
            width: "25%"
        }
    ]

  return (

    <div>
        <CreateMaintenanceWindow/>
        <div className="container">
        <h3>Active Maintenance Windows:</h3>
        <hr/>
        <DataTable 
            className="maintenance-table"
            columns={activeColumns}
            data={active}
            pagination={true}
            />
        </div>
        <div className="container">
        <h3>Scheduled Maintenance Windows:</h3>
        <hr/>
        <DataTable 
            className="maintenance-table"
            columns={futureColumns}
            data={future}
            pagination={true}
            />
        </div>
        <div className="container">
        <h3>Previous Maintenance Windows:</h3>
        <hr/>
        <DataTable 
            className="maintenance-table"
            columns={previousColumns}
            data={previous}
            pagination={true}
            />
        </div>
    </div>
  );
}

export default Maintenance;