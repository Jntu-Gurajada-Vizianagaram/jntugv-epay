import React from "react";

export function Maintenance500() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">

        <div className="text-6xl text-jntu-600 mb-4">🛠️</div>

        <h1 className="text-2xl font-bold mb-2">
          Maintenance Mode
        </h1>

        <p className="text-gray-600 mb-4">
          The JNTU-GV Payments Portal is temporarily under maintenance.
          Our systems are being updated or experiencing a temporary issue.
        </p>

        <p className="text-sm text-gray-500 mb-4">
          Please try again after a few minutes.  
          We appreciate your patience.
        </p>

        <div className="mt-6 text-xs text-gray-400">
          Error Code: <span className="font-semibold">HTTP 500 – Internal Server Error</span>
        </div>
      </div>
    </div>
  );
}
