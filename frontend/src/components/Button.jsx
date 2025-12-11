import React from "react";

export function Button({ children, className = "", loading, ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        w-full py-2.5 rounded-lg 
        bg-blue-600 text-white font-semibold text-sm
        shadow-sm
        hover:bg-blue-700 
        disabled:bg-gray-400 disabled:cursor-not-allowed
        transition-all duration-200
        ${className}
      `}
    >
      {loading ? "Processing..." : children}
    </button>
  );
}
