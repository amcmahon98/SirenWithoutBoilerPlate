import React , {useState, useEffect} from "react";
import DataTable from "react-data-table-component"
import axios from "axios";
import "../Styling/DisplayTabContent.css";

const DisplayTabContent = ({TabStatus}) => {

    const [data, setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/getSchedule");
        setData(response.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    const columns = [
        {
            name: 'User',
            selector: row => row.user,
            width: "25%"
        },
        {
            name: 'Tier',
            selector: row => row.tier,
            sortable: true,
            width: "25%"
        },
        {
            name: 'Start Time',
            selector: row => row.starttime.slice(0,-5),
            sortable: true,
            width: "25%"
        },
        {
            name: 'End Time',
            selector:row => row.endtime.slice(0,-5),
            sortable: true,
            width: "25%"
        }
    ]

  return (
    <div className="container">
        <h3>Schedule</h3>
        <DataTable 
            className="schedule-table"
            columns={columns}
            data={data}
            pagination={true}
            />
    </div>
  );
}

export default DisplayTabContent;