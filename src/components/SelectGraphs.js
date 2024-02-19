import React from "react";
import Navbar from "./Navbar";
import { Parameter } from "../Parameter";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { MQTT, setDestinationName, publish, getClient } from "./../mqtt";
import Graphs from "./Graphs";
import './SelectGraphs.css'

const SelectGraphs = () => {
  const [graph, setGraph] = useState(0);
  const [graphParameters, setGraphParameters] = useState([]);
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(true);
  function showParameters(jsonData) {
    let jsonArray;
    if (typeof jsonData.data === 'string') {
      jsonArray = JSON.parse(jsonData.data);
    } else if (typeof jsonData.data === 'object') {
      jsonArray = jsonData.data;
    }
    let gParameters = new Array();
    let checkedArray = new Array();
    for (let i = 0; i < jsonArray.length; i++) {
      let group = jsonArray[i];
      let groupName = group.group;
      let fields = group.fields;
      let newParameter = Parameter(groupName, fields);
      const subParameters = newParameter.getSubParameterArrayList();

      for (let j = 0; j < subParameters.length; j++) {
        if (subParameters[j].isLogged()) {
          gParameters.push(subParameters[j]);
          checkedArray.push(false);
          console.log(subParameters[j].getName());
        }
      }
    }
    setGraphParameters(gParameters);
    setChecked(checkedArray);
    setLoading(false);
    console.log("Show Graphs");
  }

  function connectionCallback() {
    console.log("connectionCallback");
    fetchParameters();
  }
  function fetchParameters() {
    console.log("fetch Parameters");
    publish("http://192.168.4.1/api/v1.0/keys/parameters", showParameters);
  }
  useEffect(() => {
    const storedData = localStorage.getItem("url");
    if (storedData && getClient() === undefined) {
      setTimeout(function () {
        setDestinationName(storedData);
        const mqtt = MQTT(connectionCallback);
        mqtt.connect();
      }, 100);
    } else {
      console.log("fetching Parameters");
      fetchParameters();
    }
  }, []);

  function handleChange(index) {
    const updatedArray = [...checked]; // Create a copy of the original array
    updatedArray[index] = !checked[index];
    setChecked(updatedArray);
  }

  return (
    <>
      <Navbar />
      {loading === true ? (
          <div className='loading'>
            <ReactLoading
              type="spinningBubbles"
              color="#284897"
              height={170}
              width={80}
              items-center             
            />
          </div>
        ) : (
          <div>
          <div className="selectGraphs">
        {graphParameters.map((graphParameter, index) => (
          <label className="selectGraph" style={{ width: "200px" }}>
            <input
              style={{ margin: "1px" }}
              type="checkbox"
              className="itemCheckbox"
              checked={checked[index]}
              onChange={() => handleChange(index)}
            />
            <span style={{marginLeft:"10px"}}>{graphParameter.getName()}</span>
          </label>
        ))}
      </div>
      <br />
      <br />
      <button
        className="generateGraphsButton"
        onClick={() => {
          setGraph(graph+1);
        }}
      >
        <h1>Generate Graphs</h1>
      </button>

      {graph!==0 && (
        <Graphs
          resetGraph={graph}
          graphParameters={graphParameters.filter((item, index) => {
            return checked[index];
          })}
        />
       )}
       </div>
        )}
      
    </>
  );
};

export default SelectGraphs;