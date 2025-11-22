import { Button } from "@/components/ui/button";
import ExcelFileUpload from "@/components/Upload/ExcelFileUpload";
import { addFile } from "@/store/upload/uploadSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [excelFile, setExcelFile] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!excelFile) return;
    dispatch(addFile(excelFile));
  }, [excelFile, dispatch]);

  return (
    <div>
      <ExcelFileUpload excelFile={excelFile} setExcelFile={setExcelFile} />

      {excelFile && (
        <div className="flex items-center justify-center mt-6  ">
          <Button
            onClick={() => navigate(`/upload/analysis`)}
            className="text-2xl font-semibold rounded-lg px-2.5 py-1 text-white   bg-green-700 hover:bg-green-800"
          >
            Get Chart
          </Button>
        </div>
      )}
    </div>
  );
}

export default Upload;
