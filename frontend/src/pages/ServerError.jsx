// src/pages/ServerError.jsx
import React from "react";
import { Link } from "react-router-dom";

export function ServerError() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow max-w-xl mx-auto text-center">
      <div className="text-5xl font-extrabold text-red-600 mb-3">500</div>
      <h2 className="text-xl font-semibold mb-2">Internal Server Error</h2>

      <p className="text-gray-600 mb-4">
        Something went wrong on our end. Please try again later or contact support.
      </p>

      <Link
        className="px-4 py-2 bg-jntu-500 text-white rounded-lg font-semibold"
        to="/"
      >
        Return to Home
      </Link>
    </div>
  );
}
