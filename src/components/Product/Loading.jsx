import React from "react";

function Loader() {
  return (
    <div
      role="status"
      className="flex flex-col p-2 m-4  rounded shadow animate-pulse"
    >
      <div className="md:h-64 md:w-64 h-32 w-32 object-cover object-center group-hover:opacity-75 bg-gray-400 rounded">
        {" "}
      </div>
      <div className="h-4 w-24 bg-gray-400 mt-2"></div>
      <div className="h-4 w-24 bg-gray-400 mt-4"></div>
      <div className="h-6 bg-gray-400 mt-2"></div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loader;
