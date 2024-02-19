import React from "react";
import { useState } from "react";
import { MQTT, setDestinationName,disConnect,publish } from "./../mqtt";
import { useNavigate } from "react-router-dom";
import "./Connect.css";
import axios from "axios";
import avatar from "./../assets/connect.png";
import bg from "./../assets/bg.svg";
import wave from "./../assets/wavessss.png";

const Connect = () => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  
  function onApiVersion(jsonData){
    setLoading(false);

    console.log("apiVersion: ",jsonData.data);
    if (jsonData.status === 404) {
      setErrorMessage("Couldn't connect to device");
      return;
    }

    axios
      .get("https://iot.mrmprocom.com/php-auth-api/getUser.php",{
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.success !== 0) {
          axios
          .post("https://iot.mrmprocom.com/php-auth-api/addDevice.php", {device:url,email:response.data.user.email}, {
            withCredentials: true,
          })
          .then(function (response) {
            console.log(response.data);
          }).catch((error) => {
            console.log(error.message);
          });      
        }
      }).catch((error) => {
        
      });

      localStorage.setItem('url', url);
      setUrl("");
      setDeviceId("");

    navigate("/dashboard");
  }

  function fetchApiVersion(){
    publish("http://192.168.4.1/api", onApiVersion);
  }

  function connectionCallback(){
    fetchApiVersion(); 
  }

  function handleSubmit(e) {
    setLoading(true);

    console.log(url);
    e.preventDefault();
 
    setDestinationName(url);
    const mqtt = MQTT(connectionCallback);
    
    disConnect();
    mqtt.connect();
  }

  function handleChange(e) {
    // setUrl(e.target.value);
    setDeviceId(e.target.value);
    console.log(e.target.value);
    setUrl('https://smart.mrmprocom.com/wan?device=' + e.target.value);
  }

  return (
    <div className="main-container">
      <img className="wave" src={wave} />
      <div className="container">
        <div className="img">
        </div> 
        <div className="login-content">
          <form onSubmit={handleSubmit}>
            <img src={avatar} alt="Avatar" />
            {errorMessage && <p className="error" style={{color:'red'}}> {errorMessage} </p>}
            <div className="title">Connect to device</div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-cogs" style={{color: 'black'}}></i>
              </div>
              <div className="div">
                <input
                  required
                  type="text"
                  name="url"
                  className="input"
                  onChange={handleChange}
                  placeholder="Enter Device Id"
                  value={deviceId}
                />
              </div>
            </div>

            {loading ? (
              <div className="spinner"></div>
            ) : (
              <button className="btn">Submit</button>
            )}
          </form>

        </div>
      </div>
    </div>
  );
};

export default Connect;