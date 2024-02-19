import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import './SavedDevices.css'
const SavedDevices = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios.get('https://iot.mrmprocom.com/php-auth-api/getUser.php', {
      withCredentials: true,
    },
    ).then(function(response){
    console.log(response.data);
    axios
      .get(`https://iot.mrmprocom.com/php-auth-api/getDevices.php?email=${response.data.user.email}`, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        const deviceArray = response.data;
        setLoading(false);
        setDevices(deviceArray);
        console.log("Devices shown")
      //  navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
});
    
  }, []);

  return (
    <>
      {loading === true ? (
        <div className="loading">
          <ReactLoading
            type="bubbles"
            color="#0000FF"
            height={170}
            width={80}
          />
        </div>
      ) : 
        <div className="devices">
          {errorMessage && (
            <p className="error" style={{ color: "red" }}>
              {" "}
              {errorMessage}{" "}
            </p>
          )}
          {devices.map((device, index) => (
            <div className="device"  key={index}>
              <p className="deviceLink">{device.device}</p>
            </div>
          ))}
        </div>
      }
    </>
  );
};

export default SavedDevices;