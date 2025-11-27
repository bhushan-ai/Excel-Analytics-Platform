import Bar from "@/components/Analysis/Bar";
import GetAiSummary from "@/components/Analysis/GetAiSummary";
import Header from "@/components/Analysis/Header";
import DynamicLine from "@/components/Analysis/Line";
import Line from "@/components/Analysis/Line";
import Pie from "@/components/Analysis/Pie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BarChart from "@/components/Analysis/Bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Analytics() {
  const [aiData, setAiData] = useState("");
  const { uploadedFiles, data } = useSelector((state) => state.uploadFile);
  const { isLoading } = useSelector((state) => state.aiSummary);
  const [fileData, setFileData] = useState({});
  const [chartType, setChartType] = useState("none");
  console.log("slicedata", data);

  console.log("uploade", uploadedFiles._id);

  const { state } = useLocation();
  const id = state?.id;
  console.log("id", id);

  return (
    <div>
      <GetAiSummary
        aiData={aiData}
        setAiData={setAiData}
        uploadedFiles={uploadedFiles}
        data={data}
        isLoading={isLoading}
        fileData={fileData}
        setFileData={setFileData}
      />
      <div className="m-10 flex items-center justify-center gap-5">
        <Select onValueChange={(value) => setChartType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Choose Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="font-semibold" value="none">
              None
            </SelectItem>
            <SelectItem className="font-semibold">Bar Chart </SelectItem>
            <SelectItem className="font-semibold" value="pie">
              Pie Chart
            </SelectItem>
            <SelectItem className="font-semibold" value="line">
              {" "}
              Line Chart
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 m-2">
        {chartType === "bar" && (
          <div className="h-fit w-fit shadow-xl m-5 p-5">
            <BarChart data={data.data} />
          </div>
        )}
        <div> {chartType === "pie" && <Pie />}</div>
        <div> {chartType === "line" && <Line />}</div>
      </div>
    </div>
  );
}

export default Analytics;
