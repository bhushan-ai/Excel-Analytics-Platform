import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getFileData } from "@/store/upload/uploadSlice";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function DynamicLine() {
  const { uploadedFiles } = useSelector((state) => state.uploadFile);
  const [fileData, setFileData] = useState({});
  const [xColumn, setXColumn] = useState("");
  const [yColumn, setYColumn] = useState(""); 
  const dispatch = useDispatch();
  useEffect(() => {
    if (uploadedFiles?._id) {
      dispatch(getFileData(uploadedFiles._id)).then((data) => {
        console.log("File Data:", data?.payload?.data?.data);
        const fdata = data?.payload?.data?.data;
        setFileData(fdata);


          if (fdata.length > 0) {
          const headersList = Object.keys(fdata[0]);
          setXColumn(headersList[0] || "");
          setYColumn(headersList[1] || "");
        }
      });
    }
  }, [uploadedFiles?._id, dispatch]);

  const rows = fileData || [];
  const headers = rows.length > 0 ? Object.keys(rows[0]) : null;
  // const [xColumn, setXColumn] = useState(headers[0] || "");
  // const [yColumn, setYColumn] = useState(headers[1] || "");

  console.log("rows", rows);
  console.log("header", headers);

  const filterdData = rows.filter((row) => {
    typeof row[xColumn] === "number" && typeof row[yColumn] === "number";
  });
  console.log("xcol", xColumn);
  console.log("ycol", yColumn);
  console.log("filterdData", filterdData);

  const labels = filterdData.map((row) => row[xColumn]);
  const values = filterdData.map((row) => row[yColumn]);

  console.log("labels", labels);
  console.log("values", values);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `${yColumn} vs ${xColumn}`,
        data: values,
        fill: true,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
        pointedRadius: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: `${yColumn} vs ${xColumn}` },
    },
  };

  return (
    <div style={{ width: "700px", margin: "auto" }}>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <Label>X-axis: </Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select x-axis" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup
                values={xColumn}
                onChange={(e) => setXColumn(e.target.value)}
              >
                {" "}
                <SelectLabel>X-axis</SelectLabel>
                {headers.map((h) => {
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>;
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Y-axis: </Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select y-axis" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup
                values={yColumn}
                onChange={(e) => setYColumn(e.target.value)}
              >
                <SelectLabel>Y-axis</SelectLabel>
                {headers.map((h) => {
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>;
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-5">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default DynamicLine;
//value={xColumn} onChange={(e) => setXColumn(e.target.value)}
// {headers.map((h) => (
//   <option key={h} value={h}>
//     {h}
//   </option>
// ))}
