import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./accHeader";

function AccLayout() {
  return (
    <div>
      <Header />
      <div className="mt-10 w-full h-fit">
        <Outlet />
      </div>
    </div>
  );
}

export default AccLayout;
