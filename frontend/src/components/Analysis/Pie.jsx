// import React, { useCallback, useRef } from "react";
// import { Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
// } from "chart.js";
// import { Button } from "../ui/button";
// import { DownloadIcon } from "lucide-react";

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

// function Pie({ data }) {
//   const ref = useRef(null);

//   /* Download image */
//   const downloadPieChart = useCallback(() => {
//     const link = document.createElement("a");
//     link.download = "pieChart.png";
//     link.href = ref.current.toBase64Image();
//     link.click();
//   }, []);

//   /* Dynamic labels & values */
//   const labels = data.map((row, i) => `Row ${i + 1}`);

//   const values = data.map((row) => {
//     const numericKeys = Object.keys(row).filter(
//       (key) => key.startsWith("_EMPTY") && !isNaN(Number(row[key]))
//     );
//     return numericKeys.length > 0 ? Number(row[numericKeys[0]]) : 0;
//   });

//   const doughnutData = {
//     labels,
//     datasets: [
//       {
//         label: "Dataset",
//         data: values,
//         backgroundColor: [
//           "rgb(255, 99, 132)",
//           "rgb(54, 162, 235)",
//           "rgb(255, 205, 86)",
//           "rgb(75, 192, 192)",
//           "rgb(153, 102, 255)",
//           "rgb(255, 159, 64)",
//         ],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <Doughnut ref={ref} data={doughnutData} />
//       <Button className="mt-2" onClick={downloadPieChart}>
//         <DownloadIcon className="mr-1" /> Download
//       </Button>
//     </div>
//   );
// }

// export default Pie;
