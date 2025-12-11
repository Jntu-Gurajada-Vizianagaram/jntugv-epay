import React from "react";

export function Select({ label, required, options = [], className = "", ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}

      <select
        {...props}
        className={`
          w-full px-3 py-2 
          border border-gray-300 rounded-lg 
          bg-white text-sm text-gray-800
          focus:outline-none 
          focus:ring-2 focus:ring-blue-500 
          focus:border-blue-500
          transition-all duration-200
          appearance-none
          ${className}
        `}
      >
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
}
