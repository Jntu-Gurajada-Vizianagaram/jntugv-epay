import React from "react";
import { Link } from "react-router-dom";

export function CardTile({ to, title, desc, icon }) {
  return (
    <Link to={to} className="block">
      <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition flex gap-4 items-center">
        <div className="w-14 h-14 rounded-lg bg-jntu-50 flex items-center justify-center text-jntu-600 font-bold text-xl">{icon || title[0]}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-gray-500">{desc}</div>
        </div>
      </div>
    </Link>
  );
}
