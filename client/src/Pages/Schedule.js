import React from "react";
import CreateSchedule from "../Components/CreateSchedule";
import DisplaySchedule from "../Components/DisplaySchedule";
//import "../Styling/Home.css"

const Schedule = () => {
  return (
    <div>
        <DisplaySchedule/>
        <CreateSchedule/>
    </div>
  );
}

export default Schedule;