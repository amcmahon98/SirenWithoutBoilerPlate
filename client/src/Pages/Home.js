import React from "react";
import HomeTabs from '../Components/HomeTabs';
import DisplayIncidentStatistics from '../Components/DisplayIncidentStatistics';
import "../Styling/Home.css"

const Home = () => {
  return (
    <div>
        <DisplayIncidentStatistics/>
        <HomeTabs/>
    </div>
  );
}

export default Home;