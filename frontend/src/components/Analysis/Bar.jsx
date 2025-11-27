import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart({ data }) {
  const labels = data.map((_, i) => `Row ${i + 1}`);

  // Pick ANY column from Excel
  const columnName = "_EMPTY_3";

  const values = data.map((row) => Number(row[columnName]) || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: `Values of ${columnName}`,
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "500px", margin: "20px auto" }}>
      <Bar data={chartData} />
    </div>
  );
}

export default BarChart;
