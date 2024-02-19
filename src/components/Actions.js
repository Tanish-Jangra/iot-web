import React from "react";
import { MQTT, setDestinationName, publish, getClient } from "./../mqtt";
import { Parameter } from "../Parameter";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Actions.css";
import ReactLoading from "react-loading";
import clickhere from './../assets/abcd.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Actions = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const [actionPerformed, setActionPerformed] = useState(false);

  function fetchActions() {
    publish("http://192.168.4.1/api/v1.0/keys/attributes", showActions);
  }
  function connectionCallback() {
    console.log("connectionCallback");
    fetchActions();
    console.log(actions);
  }

  const showToast = () => {
    toast.success('Action Performed Successfully.', {
      autoClose: 1000, // Auto-close after 2 seconds
    });
  };

  const showToastError = () => {
    toast.error('Something went wrong!', {
      autoClose: 1000, // Auto-close after 2 seconds
    });
  };

  function showActions(jsonData) {
    if (jsonData.status === 404) {
      alert("Couldn't show action");
      return;
    }
    let jsonArray;
    if (typeof jsonData.data === 'string') {
      jsonArray = JSON.parse(jsonData.data);
    } else if (typeof jsonData.data === 'object') {
      jsonArray = jsonData.data;
    }
    let actionsObject;
    for (let i = 0; i < jsonArray.length; i++) {
      let group = jsonArray[i];
      let groupName = group.group;
      if (groupName === "Actions") {
        actionsObject = group.fields;
        break;
      }
    }
    let subParameters = Parameter(
      "Actions",
      actionsObject
    ).getSubParameterArrayList();
    let actions = new Array();
    for (let subParameter of subParameters) {
      let obj = { title: subParameter.getName() };
      actions.push(obj);
    }
    console.log(actions);
    setActions(actions);
    setLoading(false);
  }

  function updateActions(jsonData) {
    setLoading(false);
    if (jsonData.status === 404) {
      showToastError();
      return;
    } else if (jsonData.status === 200){
      showToast();
    }
    fetchActions();
  }

  function onSubmit(e, i) {
    setLoading(true);

    let token = "11111000000000000000000000000000"; // get token in a proper way later.
    publish(
      `http://192.168.4.1/api/v1.0/keys/attributes/update?key=${actions[i].title}&value=""&token=${token}`,
      updateActions
    );
  }

  const handleConfirmation = (e, index) => {
    if (actions[index].title === "Delete All Recorded Data") {
      // Show a confirmation alert
      const userConfirmed = window.confirm("Are you sure you want to perform this action?");

      if (userConfirmed) {
        onSubmit(e, index);
      }
    } else {
      onSubmit(e, index);
    }
  };
  
  

  useEffect(() => {
    const storedData = localStorage.getItem("url");
    if (storedData && getClient() === undefined) {
      setTimeout(function () {
        setDestinationName(storedData);
        const mqtt = MQTT(connectionCallback);
        mqtt.connect();
      }, 100);
    } else {
      console.log("fetching Actions");
      fetchActions();
      console.log(actions);
    }
  }, []);

  return (
    <>
      <Navbar />
      {loading === true ? (
          <div className="loadingg">
            <ReactLoading type="spinningBubbles" color="#284897" height={170} width={80} />
          </div>
        ) : (
          <div className="actions">
            {actions.map((action, index) => (
              <div className="action" onClick={(e) => { handleConfirmation(e, index); }}>
                <p className="actionTitle">{action.title}</p>
                <img src={clickhere} width={44} height={44} />
              </div>
            ))}
          </div>
        )
      }
    </>
  );
};

export default Actions;