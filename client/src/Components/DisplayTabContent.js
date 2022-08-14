import React , {useState, useEffect} from "react";
import DataTable from "react-data-table-component"
import {Link} from "react-router-dom";
import axios from "axios";
import "../Styling/DisplayTabContent.css";

const DisplayTabContent = ({TabStatus}) => {

    const [data, setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/getAlerts",{params:{status:TabStatus}});
        setData(response.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    const columns = [
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            width: "15%",
            conditionalCellStyles: [
                {
                    when: row => row.status == "Triggered",
                    style: {color: "#d42e1c"}
                },
                {
                    when: row => row.status == "Acknowledged",
                    style: {color: "orange"}
                },
                {
                    when: row => row.status == "Resolved",
                    style: {color: "#3cbf13"}
                }
            ]
        },
        {
            name: 'Priority',
            selector: row => row.priority,
            sortable: true,
            width: "10%"
        },
        {
            name: 'Subject',
            selector: row => row.subject,
            width: "30%",
        },
        {
            name: 'Created',
            selector: row => row.creationtime.slice(0,-5),
            sortable: true,
            width: "17%"
        },
        {
            name: 'Assigned To',
            selector: row => row.assigned,
            width: "17%",
        },
        {
          cell: row => <Link to={`/view/alert/${row.id}`} ><a className="view-alert-link">View Details</a> </Link>,
          width: "10%"
        }
    ]

  return (
    <div className="TriggeredAlertsTab">
        <DataTable 
            className="alerts-table"
            columns={columns}
            data={data}
            pagination={true}
            />
    </div>
  );
}

export default DisplayTabContent;