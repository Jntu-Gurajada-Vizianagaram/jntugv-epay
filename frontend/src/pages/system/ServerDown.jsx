import React from "react";

export function ServerDown() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">

        <div className="text-6xl text-red-600 mb-4">⚠️</div>

        <h1 className="text-2xl font-bold mb-2">
          Service Temporarily Unavailable
        </h1>

        <p className="text-gray-600 mb-4">
          Our servers are currently unreachable. This may be due to network
          issues, maintenance, or high load.
        </p>

        <p className="text-sm text-gray-500">
          If this issue persists, please try again after some time.
        </p>

        <div className="mt-6 text-xs text-gray-400">
          Error Code: <span className="font-semibold">UPSTREAM FAILURE (NGINX)</span>
        </div>
      </div>
    </div>
  );
}
