import React from "react";
import { Header } from "../components/Header";
// import { Sidebar } from "../components/SideBar";
import { Footer } from "../components/Footer";

export function PortalLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex gap-6">
        <div className="hidden md:block md:flex-shrink-0">
          {/* <Sidebar /> */}
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Top tiles area for quick access (desktop only duplicates sidebar) */}
            <div className="md:col-span-3">
              {children}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
