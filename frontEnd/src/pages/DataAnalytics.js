import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const DataAnalyzer = ({ data }) => {
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);

  useEffect(() => {
    // Analyze data and generate chart data
    const analyzedData = analyzeData(data);

    // Set the chart data
    setBarChartData(analyzedData.barChartData);
    setPieChartData(analyzedData.pieChartData);
    setLineChartData(analyzedData.lineChartData);
  }, [data]);

  const analyzeData = (data) => {
    // Perform analysis on the data and generate chart data
    // Replace this with your own analysis logic

    // Bar chart data
    const barChartData = {
      labels: data.map((item) => item.CITY),
      datasets: [
        {
          label: "Sales",
          data: data.map((item) => parseFloat(item.SALES)),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    };

    // Pie chart data

    const pieChartData = {
      labels: data.map((item) => item.CONTACTFIRSTNAME),
      datasets: [
        {
          label: "# of Votes",
          data: data.map((item) => parseFloat(item.SALES)),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    // Line chart data
    const lineChartData = {
      labels: data.map((item) => item.YEAR_ID),
      datasets: [
        {
          label: "Sales",
          data: data.map((item) => parseFloat(item.SALES)),
          borderColor: "rgba(54, 162, 235, 1)",
          fill: false,
        },
      ],
    };

    return { barChartData, pieChartData, lineChartData };
  };

  return (
    <div>
      <h2>Data Analyzer</h2>

      {barChartData && (
        <div>
          <h3>Bar Chart</h3>
          <Bar data={barChartData} />
        </div>
      )}

      {pieChartData && (
        <div>
          <h3>Pie Chart</h3>
          <Pie data={pieChartData} />
        </div>
      )}

      {lineChartData && (
        <div>
          <h3>Line Chart</h3>
          <Line data={lineChartData} />
        </div>
      )}
    </div>
  );
};

export default DataAnalyzer;
