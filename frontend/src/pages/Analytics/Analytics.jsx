import GetAiSummary from "@/components/Analysis/GetAiSummary";
import Line from "@/components/Analysis/Line";
// import Pie from "@/components/Analysis/Pie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BarChart from "@/components/Analysis/Bar";
import { Button } from "@/components/ui/button";

function Analytics() {
  const [aiData, setAiData] = useState("");
  const { uploadedFiles, data } = useSelector((state) => state.uploadFile);

  const [savedData, setSavedData] = useState([]);
  const { isLoading } = useSelector((state) => state.aiSummary);
  const [fileData, setFileData] = useState({});
  const [showBarChart, setShowBarChart] = useState(false);
  const [showPieChart, setShowPieChart] = useState(false);
  const [showLineChart, setShowLineChart] = useState(false);

  console.log("slicedata", data);

  useEffect(() => {
    if (data?.data) {
      localStorage.setItem("chartData", JSON.stringify(data.data));
    }
  }, [data]);

  // console.log("uploade", uploadedFiles._id);

  function barChart() {
    setShowBarChart(true);
  }
  function pieChart() {
    setShowPieChart(true);
  }
  function lineChart() {
    setShowLineChart(true);
  }

  useEffect(() => {
    if (data?.data) {
      setSavedData(data.data);
    } else {
      const local = localStorage.getItem("chartData");
      if (local) setSavedData(JSON.parse(local));
    }
  }, [data]);


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
        <Button onClick={() => barChart()}> Bar Chart</Button>
        <Button onClick={() => pieChart()}> Pie Chart</Button>
        <Button onClick={() => lineChart()}> Line Chart</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 m-2">
        {showBarChart && (
          <div className=" h-fit w-fit shadow-xl m-2 p-4">
            <BarChart data={savedData} />
          </div>
        )}
        {showPieChart && (
          <div>
            {" "}
            <Pie data={data.data} />
          </div>
        )}
        {showLineChart && (
          <div>
            {" "}
            <Line />
          </div>
        )}
      </div>
    </div>
  );
}

export default Analytics;
