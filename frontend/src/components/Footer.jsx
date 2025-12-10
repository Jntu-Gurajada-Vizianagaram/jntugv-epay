import React from "react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">

        {/* UNIVERSITY INFO */}
        <div>
          <h3 className="text-lg font-semibold text-white">JNTU-GV</h3>
          <p className="text-sm mt-2 leading-relaxed">
            Jawaharlal Nehru Technological University Gurajada, Vizianagaram (JNTU-GV) is committed 
            to providing secure, transparent and efficient digital financial services through its 
            Unified Payments Portal, developed in collaboration with the State Bank of India (SBI).
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="/exam-fee" className="hover:underline">Examination Fees</a></li>
            <li><a href="/certificates" className="hover:underline">Certificate Services</a></li>
            <li><a href="/phd-fee" className="hover:underline">Ph.D Scholar Fees</a></li>
            <li><a href="/affiliation" className="hover:underline">Affiliation Fees</a></li>
            <li><a href="/challan" className="hover:underline">Direct Challans</a></li>
            <li><a href="/contact" className="hover:underline">Contact Support</a></li>
          </ul>
        </div>

        {/* CONTACT / SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold text-white">Support</h3>
          <p className="text-sm mt-2 leading-relaxed">
            For payment-related queries or technical issues, please contact the University Finance & 
            Examination Cell. Ensure that you keep your Transaction ID and Hallticket Number ready 
            for faster assistance.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Jawaharlal Nehru Technological University Gurajada, Vizianagaram.
        All Rights Reserved.
        <br />
        Unified Payments Portal | Joint Collaboration with the State Bank of India (SBI)
      </div>
    </footer>
  );
}
