import React from "react";

export function Offline() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">

        <div className="text-5xl text-jntu-600 mb-4">📡</div>

        <h1 className="text-xl font-bold mb-2">No Internet Connection</h1>
        <p className="text-gray-600 mb-4">
          Your device is offline. Please check your network connection.
        </p>

        <p className="text-xs text-gray-400">
          The portal will reconnect automatically once you are back online.
        </p>
      </div>
    </div>
  );
}
