import {React, useState, useRef} from "react";
import "../Styling/Analytics.css"
import AllAnalytics from "../Components/AllAnalytics";
import {PDFExport} from '@progress/kendo-react-pdf'

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

//https://bobbyhadz.com/blog/javascript-get-yesterday-date-yyyy-mm-dd
function formatDate(date) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}

let today = new Date()
let thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

const initialState = {
    selectedStartDate: formatDate(thirtyDaysAgo),
    selectedEndDate: formatDate(today),
}

const Analytics = () => {
    const report = useRef(null);
    const [state, setState] = useState(initialState);
    const {selectedStartDate,selectedEndDate} = state;

    //https://www.telerik.com/kendo-react-ui/components/pdfprocessing/api/PDFExportProps/
    const exportPDF = (e) => {
        report.current.save();
        console.log("clicked")
    }

    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state,[name]: value})
    }

    

  return (
    <div>
        <div className="generate-report-container">
        <div className="generate-report-container-child">
        <label htmlFor="selectedStartDate">Start Time:</label>
        <input
            className="selectedStartDate"
            type="date"
            id="selectedStartDate"
            name="selectedStartDate"
            value={selectedStartDate}
            onChange={handleInputChange}
        />
        </div>
        <div className="generate-report-container-child">
        <label htmlFor="selectedEndDate">End Time:</label>
        <input
            className="selectedEndDate"
            type="date"
            id="selectedEndDate"
            name="selectedEndDate"
            value={selectedEndDate}
            onChange={handleInputChange}
        />
        </div>
        <div class="flex-break"/>
        <button className="export-pdf-button" onClick={exportPDF}>Export Report as PDF</button>
            </div>
            <PDFExport ref={report} landscape={true} fileName={"siren-report-" + selectedStartDate + "-to-" + selectedEndDate} paperSize="A3" scale={0.41} >
                <AllAnalytics starttime={selectedStartDate} endtime={selectedEndDate} />
            </PDFExport>
      </div>
  );
}

export default Analytics;