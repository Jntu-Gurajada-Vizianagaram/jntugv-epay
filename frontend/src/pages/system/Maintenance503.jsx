import React from "react";

export function Maintenance503() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        
        <div className="text-6xl font-extrabold text-jntu-600 mb-4">503</div>
        <h1 className="text-2xl font-bold mb-2">Maintenance in Progress</h1>

        <p className="text-gray-600 mb-4">
          The JNTU-GV Online Payments Portal is currently down for scheduled
          maintenance.  
        </p>

        <p className="text-sm text-gray-500 mb-4">
          Please check back after some time.  
          We apologize for the inconvenience.
        </p>

        <div className="mt-4 text-xs text-gray-400">
          © {new Date().getFullYear()} JNTU-GV Digital Monitoring Cell
        </div>
      </div>
    </div>
  );
}
