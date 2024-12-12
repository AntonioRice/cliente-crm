import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { daysOfWeek } from "../../../utils/standardData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, title, week }) => {
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
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="rounded-xl p-6 shadow-lg dark:bg-[#282828]">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-xs">Week: {week}</p>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
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

export default BarChart;
