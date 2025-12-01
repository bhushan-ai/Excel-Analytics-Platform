import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getAiSummary } from "@/store/AiSummary/aiSlice";
import { Skeleton } from "../ui/skeleton";
import { getFileData } from "@/store/upload/uploadSlice";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";

function GetAiSummary({
  aiData,
  setAiData,
  uploadedFiles,
  savedAiData,
  data,
  isLoading,
  fileData,
  setFileData,
}) {
  const dispatch = useDispatch();

  function getAnalysis() {
    dispatch(getAiSummary(uploadedFiles._id))
      .then((data) => {
        console.log("datainAiSummaryCompo", data);

        if (!data.payload?.success) {
          toast.error("AI is not available");
          console.log("AI SUMMARY ERROR:", data.payload.msg);
          return;
        }
        console.log("Ai data", data?.payload?.data);
        setAiData(data?.payload?.data);
      })
      .catch((error) => {
        console.log("err", error);
      });
  }

  useEffect(() => {
    if (uploadedFiles?._id) {
      dispatch(getFileData(uploadedFiles._id)).then((data) => {
        //console.log("File Data:", data?.payload?.data?.data);
        if (data.payload.success) {
          const fdata = data?.payload?.data?.data;
          setFileData(fdata);
        } else {
          console.log("res", data.payload?.msg);
        }
      });
    }
  }, [uploadedFiles?._id, dispatch]);

  return (
    <div className="flex flex-col items-center mt-10 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Get AI Summary</h2>

      <Button
        onClick={getAnalysis}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
        disabled={isLoading || !uploadedFiles?._id}
      >
        {isLoading ? "Analyzing..." : "Analyse your sheet"}
      </Button>

      {isLoading ? (
        <div className="flex flex-col items-center space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2 text-center">
            <h2 className="text-gray-600 text-lg font-semibold">
              Getting Summary...
            </h2>
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      ) : savedAiData ? (
        <Textarea
          name="aisum"
          id="aisum"
          value={savedAiData}
          readOnly
          className=" max-w-lg h-60 p-4 "
        />
      ) : null}
    </div>
  );
}

export default GetAiSummary;
