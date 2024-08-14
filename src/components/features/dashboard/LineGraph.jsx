import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from "chart.js";
import { daysOfWeek } from "../../../utils/standardData";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const LineGraph = ({ data, title, week }) => {
  let delayed;
  let max = 0;

  for (let i = 0; i < data.length; i++) {
    max = Math.max(max, data[i]);
  }

  const chartData = {
    labels: daysOfWeek(),
    datasets: [
      {
        label: "Reservations",
        data: data,
        backgroundColor: "rgb(75, 85, 99)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 1,
        borderRadius: 10,
        fill: true,
      },
    ],
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-800 p-6 shadow-lg dark:border-gray-700">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-xs">Week: {week}</p>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            filler: { propagate: true },
            legend: {
              position: "bottom",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: max * 2 || 10,
              ticks: {
                stepSize: 1,
              },
            },
          },
          animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === "data" && context.mode === "default" && !delayed) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            },
          },
        }}
      />
    </div>
  );
};

export default LineGraph;
