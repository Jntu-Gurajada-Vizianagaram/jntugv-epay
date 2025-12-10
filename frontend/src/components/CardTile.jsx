import React from "react";
import { Link } from "react-router-dom";

export function CardTile({ to, title, desc, icon, accent = "blue" }) {
  return (
    <Link
      to={to}
      className={`
        bg-white border rounded-xl p-5 shadow-sm 
        hover:shadow-lg transition-all duration-300
        hover:-translate-y-1 cursor-pointer
        flex items-start gap-4
      `}
    >
      {/* ICON */}
      <div className={`
        h-12 w-12 flex items-center justify-center rounded-lg 
        bg-${accent}-100 text-${accent}-700 text-2xl font-bold
      `}>
        {icon}
      </div>

      {/* TEXT CONTENT */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </Link>
  );
}
