import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "../ui/button";
function Layout({ isAuthenticated }) {
  const navigate = useNavigate();

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

          {isAuthenticated ? (
            <button
              className="mt-10 bg-green-400 hover:bg-green-500 py-2 px-3 rounded-2xl text-xl font-semibold"
              onClick={() => navigate("/upload/uploadfile")}
            >
              Upload file
            </button>
          ) : (
            <div>
              <h4 className="text-gray-800 md:text-lg text-base font-medium">
                You need to login first
              </h4>
              <Button
                onClick={() => navigate("/auth/login")}
                className="text-xl mt-2 rounded-md font-semibold text-gray-800 bg-gradient-to-br from-white to-blue-300 px-6 py-2 shadow-md hover:to-blue-400  transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </div>

      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
