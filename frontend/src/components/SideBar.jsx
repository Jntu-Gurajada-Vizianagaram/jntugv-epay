import React from "react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { to: "/exam-fee", label: "Examination" },
  { to: "/certificates", label: "Certificates" },
  // { to: "/hostels", label: "Hostels" },
  { to: "/admissions", label: "Admissions" },
  { to: "/affiliation", label: "Affiliation" },
  { to: "/challan", label: "Direct Challan" },
  { to: "/phd-fee", label: "Ph.D. Fee" },
];

export function Sidebar() {
  const loc = useLocation();
  return (
    <aside className="w-full md:w-64 bg-white rounded-xl-2 shadow p-4 space-y-2 sticky top-6">
      {items.map((it) => (
        <Link key={it.to} to={it.to}>
          <div className={`p-3 rounded-lg font-medium ${loc.pathname === it.to ? "bg-jntu-500 text-white" : "text-jntu-700 hover:bg-jntu-50"}`}>
            {it.label}
          </div>
        </Link>
      ))}
    </aside>
  );
}
