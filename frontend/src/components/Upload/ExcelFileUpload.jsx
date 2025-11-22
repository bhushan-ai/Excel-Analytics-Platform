import React, { useRef, useState } from "react";
import { FileIcon, Ghost, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

function ExcelFileUpload({ excelFile, setExcelFile }) {
  const fileRef = useRef();
  
  function handlExcelFileChange(event) {
    console.log("event", event.target.files);
    const selectedFile = event.target.files?.[0];
    //console.log(selectedFile, "sfile");
    if (selectedFile) setExcelFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();

    const dropedFile = event.dataTransfer.files?.[0];
    console.log("file", dropedFile);
    if (dropedFile) {
      setExcelFile(dropedFile);
    }
  }

  function handleRemoveFile() {
    setExcelFile(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block text-center">
        Upload Excel File
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={fileRef}
          onChange={handlExcelFileChange}
        />
        {!excelFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32  cursor-pointer"
          >
            <UploadCloudIcon className="h-10 text-muted-foreground mb-2 w-10 " />
            <span>Drag & drop or Click to upload Excel File</span>
          </Label>
        ) : (
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary h-8 mr-2" />
            </div>
            <p className="text-sm  font-medium">{excelFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={handleRemoveFile}
            >
              <XIcon className="h-4 w-4 " />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExcelFileUpload;
