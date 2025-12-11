import React from "react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full mt-12 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4">

        {/* GRID SECTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* UNIVERSITY DESCRIPTION */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold text-white">JNTU-GV Payments Portal</h3>
            <p className="text-sm mt-3 leading-relaxed text-gray-400">
              Jawaharlal Nehru Technological University Gurajada, Vizianagaram (JNTU-GV)
              provides a unified and secure digital payment system for students, scholars,
              and affiliated institutions. This platform is developed in joint
              collaboration with the State Bank of India (SBI) to ensure banking-grade
              security, reliability, and transparency.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li><a href="/exam-fee" className="hover:text-white transition">Examination Fees</a></li>
              <li><a href="/certificates" className="hover:text-white transition">Certificate Services</a></li>
              <li><a href="/phd-fee" className="hover:text-white transition">Ph.D Scholar Fees</a></li>
              <li><a href="/affiliation" className="hover:text-white transition">Affiliation Payments</a></li>
              <li><a href="/challan" className="hover:text-white transition">Direct Challans</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact Support</a></li>
            </ul>
          </div>

          {/* SUPPORT SECTION */}
          <div>
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <p className="text-sm mt-3 text-gray-400 leading-relaxed">
              For transaction issues or technical support, contact the University
              Finance / Examination Cell. Keep your <strong>Transaction ID</strong> and
              <strong> Hallticket Number</strong> ready.
            </p>

            <div className="mt-3 text-sm text-gray-400">
              📧 Email:{" "}
              <a href="mailto:support@jntugv.edu.in" className="text-blue-400 hover:underline">
                support@jntugv.edu.in
              </a>
              <br />
              ☎️ Phone: +91-XXXXXXXXXX
            </div>
          </div>

        </div>

        {/* FOOTER BOTTOM TEXT */}
        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Jawaharlal Nehru Technological University Gurajada, Vizianagaram.
          <br />
          Unified Payments Portal | Developed in Joint Collaboration with State Bank of India (SBI)
        </div>
      </div>
    </footer>
  );
}
