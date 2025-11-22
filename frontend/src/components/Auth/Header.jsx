import React from "react";

function Header() {
  return (
    <div className="flex items-center justify-center mt-20">
      <h2 className="text-3xl font-semibold mr-3">Welcome to </h2>

      <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-300 to-green-900 text-transparent bg-clip-text">
        Exenalytics
      </h1>
    </div>
  );
}

export default Header;
