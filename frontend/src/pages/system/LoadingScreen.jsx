import React from "react";

export function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      
      <div className="w-12 h-12 border-4 border-jntu-300 border-t-jntu-600 rounded-full animate-spin"></div>

      <p className="mt-4 text-jntu-700 font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
}
