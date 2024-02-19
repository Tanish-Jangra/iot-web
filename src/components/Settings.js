import React from 'react'
import { MQTT, setDestinationName, publish, getClient } from "./../mqtt";
import { Parameter } from "../Parameter";
import { useState, useEffect } from "react";
import Navbar from './Navbar';
import "./Settings.css";
import ReactLoading from "react-loading";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchSettings() {
    publish("http://192.168.4.1/api/v1.0/keys/attributes", showSettings);
  }

  const showToast = () => {
    toast.success('Setting Updated Successfully.', {
      autoClose: 1000, // Auto-close after 2 seconds
    });
  };

  const showToastError = () => {
    toast.error('Something went wrong!', {
      autoClose: 1000, // Auto-close after 2 seconds
    });
  };

  function showSettings(jsonData) {
    let jsonArray;
    if (typeof jsonData.data === 'string') {
      jsonArray = JSON.parse(jsonData.data);
    } else if (typeof jsonData.data === 'object') {
      jsonArray = jsonData.data;
    }
    let settingsObject;
    for (let i = 0; i < jsonArray.length; i++) {
      let group = jsonArray[i];
      let groupName = group.group;
      if (groupName === "Settings") {
        settingsObject = group.fields;
        break;
      }
    }
    let subParameters=Parameter("Settings",settingsObject).getSubParameterArrayList();
    let settings = new Array();
    //let values=new Array();
    for (let subParameter of subParameters) {
      let obj = { title: subParameter.getName(), subTitle:subParameter.getPrefixValueSuffix() ,options:subParameter.getOptions()};
      if(!subParameter.isEditable()){
        obj.options=[subParameter.getValue()];
      }
      settings.push(obj);
    }
    console.log(settings);
    setSettings(settings);
    setLoading(false);
  }

  function updateSettings(jsonData){
    setLoading(false);
    if (jsonData.status === 404) {
      showToastError();
      return;
    } else if (jsonData.status === 200){
      showToast();
    }
    fetchSettings();
  }
  function connectionCallback() {
    console.log("connectionCallback");
    fetchSettings();
    console.log(settings);
  }

  function onChange(e,i){
    setLoading(true);
    let token="11111000000000000000000000000000";  // get token in a proper way later. 
    publish(`http://192.168.4.1/api/v1.0/keys/attributes/update?key=${settings[i].title}&value=${e.target.value}&token=${token}`,updateSettings);
    
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
      console.log("fetching Settings");
      fetchSettings();
      console.log(settings);
    }
  }, []);

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
        />
      </div>
      ) :
    (<div className="settings">
      {settings.map((setting,index) => (
    
          <div className="setting">
            
            <p className="settingTitle">{setting.title}</p>
            <select className="settingValue" value={setting.subTitle} onChange={(e)=>{onChange(e,index)}}>
            {
              setting.options.map((option=>(
               <option>{option}</option> 
              )))
            }
            </select>
            
          </div>
      ))}
        </div>)}
    
    </>
  )
}
export default Settings