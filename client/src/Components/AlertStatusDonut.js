import React , {useState, useEffect} from "react";
import axios from "axios";
import {Chart,ChartLegend,ChartSeries,ChartSeriesItem,ChartSeriesLabels,ChartTooltip} from "@progress/kendo-react-charts";
import "../Styling/AlertStatusDonut.css"

const AlertStatusDonut = ({startTime,endTime}) => {
    const [data, setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/getAlertReporting",{params:{starttime:startTime,endtime:endTime}});
        setData(response.data);
    }

    useEffect(() => {
        loadData();
    }, [startTime,endTime]);
    
    var allTriggered = 0;
    var allAcknowledged = 0;
    var allResolved = 0;

    function calculateStatistics(item) {
      if (item.status === "Triggered") {
        allTriggered++;
      }
      else if (item.status === "Acknowledged") {
        allAcknowledged++;
      }
      else if (item.status === "Resolved") {
        allResolved++;
      }
    }

    for (let i=0; i<data.length; i++) {
      calculateStatistics(data[i])
    }

    const renderTooltip = status => {
        const { category, value } = status.point || status;
        return (
          <div>
            {category}: {value} ({(value/data.length*100).toFixed(1)}%)
          </div>
        );
    }

    const alertStatus = [
        {
          status: "Triggered",
          value: allTriggered,
          color: "#d42e1c"
        },
        {
          status: "Acknowledged",
          value: allAcknowledged,
          color: "orange"
        },
        {
          status: "Resolved",
          value: allResolved,
          color: "#3cbf13"
        },
      ];

      const labelContent = e => e.category;

  return (
    <div className="donut-chart-container-child">
        <h3 className="donut-title">Alerts: Status</h3>
        <Chart>
        <ChartLegend visible={false} />
        <ChartTooltip render={renderTooltip} />
        <ChartSeries>
        <ChartSeriesItem
          type="donut"
          data={alertStatus}
          categoryField="status"
          field="value"
          padding={0}
        >
          <ChartSeriesLabels
            color="#fff"
            background="none"
            content={labelContent}
          />
        </ChartSeriesItem>
      </ChartSeries>
    </Chart>
    </div>
  );
}

export default AlertStatusDonut;