import React from "react";
import { Line, Bar } from "react-chartjs-2";
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

const MultipleCharts = ({ data }) => {
  return (
    <div>
      {Object.keys(data).map((key) => (
        <div key={key}>
          <h5>
            {Object.keys(data[key][0])[1]} vs {Object.keys(data[key][0])[0]}
          </h5>
          <Line
            data={{
              labels: data[key]
                .map((item) => Object.values(item)[0])
                .sort(function (a, b) {
                  return a - b;
                }),
              datasets: [
                {
                  label: Object.keys(data[key][0])[1],
                  data: data[key].map((item) => Object.values(item)[1]),
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                },
              ],
            }}
          />
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/combinations", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <h1>Multiple Charts</h1>
      {data && <MultipleCharts data={data} />}
    </div>
  );
};

export default App;
