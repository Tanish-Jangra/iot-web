import React from "react";
import "./Graphs.css";
import { useState, useEffect } from "react";
import Chart1 from "./Chart1";
import { MQTT, setDestinationName, publish, getClient } from "./../mqtt";

let total;

const Graphs = ({resetGraph,graphParameters }) => {
  const [graph, setGraph] = useState(false);
  const [datalist, setDatalist] = useState([]);
  const [parameterNameList,setParameterNameList]=useState([]);

  useEffect(() => {
    console.log(graphParameters.length);
    setDatalist([]);
    setParameterNameList([]);

    total=0;
        if(total < graphParameters.length) {
          generateGraph(graphParameters[total].getName(), 0, 200);
          total++;
        }
        
  }, [resetGraph]);

  function generateGraph(parameter, offset, step) {
    let time = new Array();
    let values = new Array();
    let dataArray = new Array();

    function showGraphs(jsonData) {
      if (jsonData.status === 404) {
        publish(
          `http://192.168.4.1/api/v1.0/values/timeseries?key=${encodeURIComponent(
            parameter
          )}&limit=${step}&offset=${offset}`,
          showGraphs
        );
        return;
      }
      let jsonArray;
      if (typeof jsonData.data === 'string') {
        jsonArray = JSON.parse(jsonData.data);
      } else if (typeof jsonData.data === 'object') {
        jsonArray = jsonData.data;
      }
      if (jsonArray[0][parameter].length === step) {
        for (let i = 0; i < step; i++) {
          time.push(jsonArray[0][parameter][i].ts);
          values.push(jsonArray[0][parameter][i].value);
          dataArray.push({
            x: jsonArray[0][parameter][i].ts,
            y: jsonArray[0][parameter][i].value,
          });
        }
        offset += step;
        publish(
          `http://192.168.4.1/api/v1.0/values/timeseries?key=${encodeURIComponent(
            parameter
          )}&limit=${step}&offset=${offset}`,
          showGraphs
        );
      } else {
        let i = 0;
        while (i < jsonArray[0][parameter].length) {
          time.push(jsonArray[0][parameter][i].ts);
          values.push(jsonArray[0][parameter][i].value);
          dataArray.push({
            x: jsonArray[0][parameter][i].ts,
            y: jsonArray[0][parameter][i].value,
          });
          i++;
        }
        dataArray.sort(function (a, b) {
          var keyA = a.x;
          var keyB = b.x;
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        setParameterNameList((oldArray) => [...oldArray, parameter]);
   
        setDatalist((oldArray) => [...oldArray, dataArray]);
        setGraph(true);

        if(total < graphParameters.length) {
          generateGraph(graphParameters[total].getName(), 0, 200);
          total++;
        }
      }
    }

    publish(
      `http://192.168.4.1/api/v1.0/values/timeseries?key=${encodeURIComponent(
        parameter
      )}&limit=${step}&offset=${offset}`,
      showGraphs
    );
  }

  return (
    <>
    <div className="graphs">
      {graph && 
        datalist.map((data, index) => {
          return (
            <div className="graph" key={index} >
              <Chart1 data={data} parameter={parameterNameList[index]}/>
            </div>
          );
        })}
        </div>
    </>
  );
};

export default Graphs;