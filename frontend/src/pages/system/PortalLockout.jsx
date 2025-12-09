import React from "react";

export function PortalLockout({ title = "Service Temporarily Unavailable", message }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg text-center">
        
        <div className="text-5xl font-extrabold text-jntu-600 mb-4">⛔</div>

        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          {title}
        </h1>

        <p className="text-gray-600 mb-4">
          {message || "This portal is temporarily unavailable. Please try again later."}
        </p>

        <div className="mt-4 text-sm text-gray-500">
          Official Updates: <br/>
          <a href="https://jntugv.edu.in" className="text-jntu-600 font-semibold hover:underline">
            www.jntugv.edu.in
          </a>
        </div>

        <div className="mt-6 text-gray-400 text-xs">
          © {new Date().getFullYear()} JNTU-GV Digital Monitoring Cell
        </div>
      </div>
    </div>
  );
}
