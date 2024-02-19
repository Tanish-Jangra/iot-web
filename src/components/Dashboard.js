import React from "react";
import { Parameter } from "../Parameter";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { MQTT, setDestinationName, publish, getClient } from "./../mqtt";
import "./Dashboard.css";
import ReactLoading from "react-loading";
import ammeter from "./../assets/ammeter.png";
import exported from "./../assets/exported.png";
import frequency from "./../assets/frequency.png";
import hourglass from "./../assets/hourglass.png";
import imported from "./../assets/imported.png";
import logo from "./../assets/logo.png";
import power from "./../assets/power.png";
import voltage from "./../assets/voltage.png";
import unbalance from "./../assets/unbalance.png";
import totalHarmonicDistortion from "./../assets/total_harmonic_distortion.png";
import oldData from "./../assets/old_data.png";
import phaseAngles from "./../assets/phase_angle.png";
import digitalIO from "./../assets/digital_io.png";
import energy from "./../assets/energy.png";
import faults from "./../assets/faults.png";
import status from "./../assets/status.png";
import tripData from "./../assets/trip.png";
import aggregates from "./../assets/aggregates.png";
import runHour from "./../assets/run_hour.png";
import sensors from "./../assets/sensors.png";


const Dashboard = () => {
  const [parameters, setParameters] = useState([]);
  const [loading, setLoading] = useState(true);

  let interval;
  function fetchParameters() {
    publish(
      "http://192.168.4.1/api/v1.0/keys/parameters",
      showParameters,
      setParameters
    );
  }
  function connectionCallback() {
    console.log("connectionCallback");
    fetchParameters();
    console.log(parameters);
  }
  function showParameters(jsonData){
    let jsonArray;
    if (typeof jsonData.data === 'string') {
      jsonArray = JSON.parse(jsonData.data);
    } else if (typeof jsonData.data === 'object') {
      jsonArray = jsonData.data;
    }
    let parameters = new Array();
    for (let i = 0; i < jsonArray.length; i++) {
      let group = jsonArray[i];
      let groupName = group.group;
      let fields = group.fields;
      let newParameter = Parameter(groupName, fields);
      let obj = { title: newParameter.title, subTitle: newParameter.subTitle };
      parameters.push(obj);
    }
    console.log("showing Parameters", parameters);
    setParameters(parameters);
    setLoading(false);
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
      console.log(parameters);
    }
  }, []);

  function getImage(key) {
    if (key.toLowerCase() === "export") {
      return exported;
    } else if (key.toLowerCase() === "import") {
      return imported;
    } else if (key.toLowerCase() === "time") {
      return hourglass;
    } else if (key.toLowerCase() === "power" || key.toLowerCase() === "power factor") {
      return power;
    } else if (key.toLowerCase() === "voltage") {
      return voltage;
    } else if (key.toLowerCase() === "current") {
      return ammeter;
    } else if (key.toLowerCase() === "frequency") {
      return frequency;
    } else if(key.toLowerCase() === "status"){
      return status;
    } else if(key.toLowerCase() === "energy"){
      return energy;
    } else if(key.toLowerCase() === "faults"){
      return faults;
    } else if(key.toLowerCase() === "digital i/os"){
      return digitalIO;
    } else if(key.toLowerCase() === "old data"){
      return oldData;
    } else if(key.toLowerCase() === "phase angles"){
      return phaseAngles;
    } else if(key.toLowerCase() === "total harmonic distortion"){
      return totalHarmonicDistortion;
    } else if(key.toLowerCase() === "unbalance"){
      return unbalance;
    } else if(key.toLowerCase() === "trip data"){
      return tripData;
    } else if(key.toLowerCase() === "aggregates"){
      return aggregates;
    } else if(key.toLowerCase() === "run hours"){
      return runHour;
    } else if(key.toLowerCase() === "sensors"){
      return sensors;
    } else {
      return logo;
    }
  }

  return (
    <>
      <Navbar />
      {loading === true ? (
        <div className="loading">
          <ReactLoading
            type="spinningBubbles"
            color="#284897"
            height={170}
            width={80}
          />
        </div>
      ) : (
        <div className="parameters">
          {parameters.map((parameter, index) => (
            <div className="parameter" key={index}>
              <div className="parameterHeader">
                <img
                  className="parameterImage"
                  src={getImage(parameter.title)}
                  alt={parameter.title}
                  style={{ height: "30px" }}
                />
                <p className="title" style={{ fontSize: '17px' }}>
                  {parameter.title}
                </p>
              </div>

              <div className="subtitle">
                {parameter.subTitle.map((list, i) => (
                  <p className="subParameter" key={i} style={{marginTop:"5px",marginLeft:"4px"}}> {list} </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;