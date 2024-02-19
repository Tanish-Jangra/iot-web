import React, {useState, useEffect} from 'react'
import { MQTT, setDestinationName, publish, getClient } from "./../../mqtt.js";
import {Parameter} from './../../Parameter.js'
import ReactLoading from "react-loading";
import Navbar from './../Navbar.js';
import './St.css'
import { toast } from 'react-toastify';
const Settings = () => {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
  
    function fetchSettings() {
      publish("http://192.168.4.1/api/v1.0/keys/attributes", showSettings);
    }
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
      let parameter = Parameter("Settings", settingsObject);
      let subParameters = parameter.getSubParameterArrayList();
      let settings = subParameters.map(subParameter => ({
        title: subParameter.getName(),
        subTitle: subParameter.getPrefixValueSuffix(),
        options: subParameter.getOptions()
      }));
      setSettings(settings);
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
        console.log("fetching Settings");
        fetchSettings();
        console.log(settings);
      }
    }, []);
  
    function connectionCallback() {
      console.log("connectionCallback");
      fetchSettings();
      console.log(settings);
    }
  
    function showToast(message, type) {
      toast[type](message, {
        autoClose: 1000, // Auto-close after 2 seconds
      });
    }
  
    function updateSettings(jsonData) {
      setLoading(false);
      if (jsonData.status === 404) {
        showToast("Something went wrong!", "error");
        return;
      } else if (jsonData.status === 200) {
        showToast("Setting Updated Successfully.", "success");
      }
      fetchSettings();
    }
  
    function onChange(e, i) {
      setLoading(true);
      const token = "11111000000000000000000000000000"; // get token in a proper way later.
      const key = settings[i].title;
      const value = e.target.value;
      publish(`http://192.168.4.1/api/v1.0/keys/attributes/update?key=${key}&value=${value}&token=${token}`, updateSettings);
    }
  
    return (
      <div className='settingContainer'>
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
          <div className="settings">
            {settings.map((setting, index) => (
              <div key={index} className="item">
                
                    <p className="settingTitle">{setting.title}</p>
                    <select className="settingValue" value={setting.subTitle} onChange={(e) => { onChange(e, index) }}>
                    {setting.options.map((option, idx) => (
                        <option key={idx}>{option}</option>
                    ))}
                    </select>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default Settings;
