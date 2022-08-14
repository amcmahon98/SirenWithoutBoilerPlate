import { useState } from "react";
import "../Styling/HomeTabs.css";
import DisplayTabContent from "./DisplayTabContent"

function HomeTabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-selector">
        <button id="open-alerts-tab" className={toggleState === 1 ? "tabs active-tabs" : "tabs"} 
            onClick={() => toggleTab(1)}>
        Open
        </button>
        <button id="triggered-alerts-tab" className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}>
        Triggered
        </button>
        <button id="acknowledged-alerts-tab" className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}>
        Acknowledged
        </button>
        <button id="resolved-alerts-tab" className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(4)}>
        Resolved
        </button>
        <button id="all-alerts-tab" className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(5)}>
        All
        </button>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
          <DisplayTabContent TabStatus={"open"}/>
        </div>

        <div className={toggleState === 2 ? "content  active-content" : "content"}>
          <DisplayTabContent TabStatus={"triggered"}/>
        </div>

        <div className={toggleState === 3 ? "content  active-content" : "content"}>
          <DisplayTabContent TabStatus={"acknowledged"}/>
        </div>

        <div className={toggleState === 4 ? "content  active-content" : "content"}>
          <DisplayTabContent TabStatus={"resolved"}/>
        </div>

        <div className={toggleState === 5 ? "content  active-content" : "content"}>
          <DisplayTabContent TabStatus={"all"}/>
        </div>
      </div>
    </div>
  );
}

export default HomeTabs;