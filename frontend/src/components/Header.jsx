import React from "react";

export function Header() {
  return (
    <header className="bg-jntu-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center text-jntu-600 font-bold">J</div>
          <div>
            <div className="font-semibold">JNTU-GV Payments</div>
            <div className="text-xs opacity-80">Jawaharlal Nehru Technological University Gurajada, Vizianagaram</div>
          </div>
        </div>
        <nav className="hidden md:flex gap-4">
          <a className="hover:underline" href="/">Home</a>
          <a className="hover:underline" href="/exam-fee">Exams</a>
          <a className="hover:underline" href="/certificates">Certificates</a>
          {/* <a className="hover:underline" href="/hostels">Hostels</a> */}
          <a className="hover:underline" href= '/phd-fee'>Ph.D Fees</a>
          <a className="hover:underline" href="/admissions">Admissions</a>
          <a className="hover:underline" href="/about">About</a>

          <a className="hover:underline" href="/contact">Contact</a>

        </nav>
      </div>
    </header>
  );
}
