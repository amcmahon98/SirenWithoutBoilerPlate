import React , {useState, useEffect} from "react";
import axios from "axios";
import {Chart,ChartLegend,ChartSeries,ChartSeriesItem,ChartSeriesLabels, ChartTooltip} from "@progress/kendo-react-charts";
import "../Styling/AlertStatusDonut.css"

const AlertTriggeredByDonut = ({startTime,endTime}) => {
    var api = 0;
    var console = 0;
    var access = 0;
    var email = 0;

    const [data, setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/getAlertReporting",{params:{starttime:startTime,endtime:endTime}});
        setData(response.data);
    }

    function calculateStatistics(item) {
      if (item.triggeredby === "API") {
        api++;
      }
      else if (item.triggeredby === "Console Logs") {
        console++;
      }
      else if (item.triggeredby === "Access Logs") {
        access++;
      }
      else if (item.triggeredby === "Email") {
        email++;
      }
    }

    useEffect(() => {
        loadData();
    }, [startTime,endTime]);

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

    const alertsTriggeredBy = [
        {
          triggeredby: "API",
          value: api,
          color: "#4287f5"
        },
        {
          triggeredby: "Console Logs",
          value: console,
          color: "#761ba1"
        },
        {
          triggeredby: "Access Logs",
          value: access,
          color: "#878687"
        },
        {
            triggeredby: "Email",
            value: email,
            color: "#7acc3f"
          },
      ];

      const labelContent = e => e.category;

  return (
    <div className="donut-chart-container-child">
        <h3 className="donut-title">Alerts: Triggered By</h3>
        <Chart>
        <ChartLegend visible={false} />
        <ChartTooltip render={renderTooltip} />
        <ChartSeries>
        <ChartSeriesItem
          type="donut"
          data={alertsTriggeredBy}
          categoryField="triggeredby"
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

export default AlertTriggeredByDonut;