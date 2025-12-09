// src/pages/PageDisabled.jsx
import React from "react";

export function PageDisabled() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow max-w-xl mx-auto text-center">
      <div className="text-4xl font-bold text-jntu-500 mb-4">Feature Disabled</div>

      <p className="text-gray-600 mb-4">
        This service is currently unavailable or has been temporarily disabled by the University.
      </p>

      <p className="text-sm text-gray-500">
        Please check the official notifications on the JNTUGV website or contact the Academic/Examination section.
      </p>
    </div>
  );
}
