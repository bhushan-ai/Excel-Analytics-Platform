import React, { useCallback, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "../ui/button";
import { DownloadIcon } from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart({ data }) {
  let ref = useRef(null);

  const downloadBarChart = useCallback(() => {
    const link = document.createElement("a");
    link.download = "barChart.png";
    link.href = ref.current.toBase64Image();
    link.click();
  }, []);

  const labels = data.map((_, i) => `Row ${i + 1}`);

  // Pick ANY column from Excel
  const columnNames = Object.keys(data[0]).filter((key) =>
    key.startsWith("_EMPTY")
  );

  const values = data.map((row) => {
    const numericKeys = Object.keys(row).filter(
      (key) => key.startsWith("_EMPTY") && !isNaN(Number(row[key]))
    );
    return numericKeys.length > 0 ? Number(row[numericKeys[0]]) : 0;
  });
  const chartData = {
    labels,
    datasets: [
      {
        label: `Values of ${columnNames}`,
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "500px", margin: "20px auto" }}>
      <Bar ref={ref} data={chartData} />
      <Button className="mt-1" onClick={downloadBarChart}>
        <DownloadIcon /> Download
      </Button>
    </div>
  );
}

export default BarChart;
