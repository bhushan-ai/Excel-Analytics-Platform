import React, { useCallback, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Button } from "../ui/button";
import { DownloadIcon } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

function Pie({ data }) {
  const ref = useRef(null);

  console.log("piedata", data);

  if (!data || !Array.isArray(data)) {
    return <p>No chart data available</p>;
  }
  /* Dynamic labels & values */
  const labels = data.map((row, i) => `Row ${i + 1}`);

  //color generated
  const generateColors = (count) =>
    Array.from({ length: count }, (_, i) => `hsl(${(i * 25) % 360}, 70%, 55%)`);

  const values = data.map((row) => {
    const numericKeys = Object.keys(row).filter(
      (key) => key.startsWith("_EMPTY") && !isNaN(Number(row[key]))
    );
    return numericKeys.length > 0 ? Number(row[numericKeys[0]]) : 0;
  });

  const doughnutData = {
    labels,
    datasets: [
      {
        label: "Dataset",
        data: values,
        backgroundColor: generateColors(values.length),
        hoverOffset: 4,
      },
    ],
  };

  /* Download image */
  const downloadPieChart = useCallback(() => {
    const link = document.createElement("a");
    link.download = "pieChart.png";
    link.href = ref.current.toBase64Image();
    link.click();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Doughnut ref={ref} data={doughnutData} />
      <Button className="mt-2" onClick={downloadPieChart}>
        <DownloadIcon className="mr-1" /> Download
      </Button>
    </div>
  );
}

export default Pie;
