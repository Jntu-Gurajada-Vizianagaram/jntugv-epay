import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-300 mt-auto py-4 flex flex-col items-center text-center">
      
      {/* Main Footer Content */}
      <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
        © {new Date().getFullYear()} JNTU-GV — Payments Portal
      </div>

      {/* Back to Top Button */}
      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="
          mt-3 
          w-10 h-10 
          flex items-center justify-center 
          rounded-full 
          bg-jntu-500 text-white 
          shadow-md 
          hover:bg-jntu-600 
          transition
        "
      >
        ↑
      </button>

      {/* Attribution */}
      <div className="text-xs text-gray-500 mt-3">
        Built by{" "}
        <a
          className="text-jntu-600 font-medium hover:underline"
          href="https://anilsinthu.vercel.app"
          target="_blank"
          rel="noreferrer"
        >
          Anil Sinthu
        </a>{" "}
        | Source on{" "}
        <a
          className="text-jntu-600 font-medium hover:underline"
          href="https://github.com/anilsinthu114/jntugv-payments"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>

      {/* Disclaimer */}
      <div className="text-[11px] text-gray-400 mt-2 px-4 leading-snug max-w-lg">
        This is a student project for educational purposes only. Not affiliated with JNTU-GV.
        Use at your own risk.
      </div>
    </footer>
  );
}
