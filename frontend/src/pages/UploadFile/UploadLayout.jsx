import Header from "@/components/Home/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function UploadLayout() {
  return (
    <div>
      <Header />
      <div className="flex mt-10 justify-center">
        <div className="text-center max-w-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-300 to-green-700 text-transparent bg-clip-text">
            AI-Powered Excel Sheet Analysis Platform
          </h2>
          <p className="mt-4 text-gray-800  text-base md:text-lg leading-relaxed font-medium">
            Analyze your Excel sheets effortlessly get smart charts and
            AI-generated summaries in seconds.
          </p>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default UploadLayout;
