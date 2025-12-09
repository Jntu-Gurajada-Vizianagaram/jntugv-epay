// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow max-w-xl mx-auto text-center">
      <div className="text-5xl font-extrabold text-jntu-600 mb-3">404</div>
      <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>

      <p className="text-gray-600 mb-4">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        className="px-4 py-2 bg-jntu-500 text-white rounded-lg font-semibold"
        to="/"
      >
        Go Back Home
      </Link>
    </div>
  );
}
