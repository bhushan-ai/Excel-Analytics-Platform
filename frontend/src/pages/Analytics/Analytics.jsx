import Bar from "@/components/Analysis/Bar";
import GetAiSummary from "@/components/Analysis/GetAiSummary";
import Header from "@/components/Analysis/Header";
import DynamicLine from "@/components/Analysis/Line";
import Line from "@/components/Analysis/Line";
import Pie from "@/components/Analysis/Pie";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Analytics() {
  const { state } = useLocation();
  const id = state?.id;
  console.log("id", id);
  
  return (
    <div>
      <GetAiSummary />
      <div>
        {/* // <DynamicLine /> */}
        <Bar /> <Pie />
      </div>
    </div>
  );
}

export default Analytics;
