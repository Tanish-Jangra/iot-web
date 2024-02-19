import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import ChartZoom from "chartjs-plugin-zoom";
import './Chart1.css'
import moment from 'moment';
import 'moment-timezone';

ChartJS.register(ChartZoom);

const Chart1 = ({ data, parameter }) => {
  const formattedData = data.map((dataPoint) => {
    const timestamp = dataPoint.x;
    const date = new Date(timestamp);
    const formattedDateTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false, // Use 24-hour format
    }).format(date);
  
    return { x: formattedDateTime, y: dataPoint.y };
  });
  
  const chartConfig = {
    type: "line",
  
    data: {
      labels: formattedData.map((data) => data.x),
      datasets: [
        {
          label: parameter,
          data: formattedData.map((data) => data.y),
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            usePointStyle: true,
            boxHeight: 5,
            color: "rgb(0, 0, 0)",
            font: {
              size: 18,
            },
          },
          align: "end",
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "xy",
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(255, 0, 0, 0.5)",
            lineWidth: 0.6,
          },
          type: "category", // Use category type for labels
          labels: formattedData.map((data) => data.x),
        },
        y: {
          grid: {
            color: "rgba(255, 0, 0, 0.5)",
            lineWidth: 0.6,
          },
        },
      },
    },
  };

  return (
    <div className="lineChart">
      <Line data={chartConfig.data} options={chartConfig.options} />
    </div>
  );
};

export default Chart1;