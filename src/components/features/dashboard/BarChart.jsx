import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, title, week }) => {
  const chartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Reservations",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-800 p-6 shadow-lg dark:border-gray-700">
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
              max: 26,
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
