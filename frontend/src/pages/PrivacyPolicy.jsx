import React from "react";

export function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* HERO */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl shadow-sm mb-8">
        <h1 className="text-2xl font-semibold text-blue-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-700">
          This Privacy Policy explains how Jawaharlal Nehru Technological University Gurajada, Vizianagaram
          (JNTU-GV) collects, uses, discloses and protects personal information submitted through the
          Unified Payments Portal (the “Portal”). By using the Portal you consent to the practices described here.
        </p>
      </div>

      {/* PRINCIPLES */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Core Principles</h2>
        <ul className="list-disc ml-6 text-sm text-gray-700 space-y-2">
          <li><strong>Lawful & purpose-limited:</strong> We collect only the data necessary to provide the service.</li>
          <li><strong>Minimization:</strong> We store minimal personal information required for verification and receipts.</li>
          <li><strong>Security:</strong> Data is transmitted and stored using appropriate technical safeguards.</li>
          <li><strong>Transparency:</strong> You can contact the University for questions or corrections.</li>
        </ul>
      </section>

      {/* WHAT WE COLLECT */}
      <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Information We Collect</h2>

        <p className="text-sm text-gray-700 mb-2">We may collect the following information when you use the Portal:</p>

        <ul className="list-disc ml-6 text-sm text-gray-700 space-y-2">
          <li><strong>Identity & academic data:</strong> hallticket/registration number, student name, course, branch, college code.</li>
          <li><strong>Contact details:</strong> email address, mobile number (for receipts and notifications).</li>
          <li><strong>Payment metadata:</strong> transaction reference, amount, payment type, merchantTxnId (we do <em>not</em> store card or full banking credentials).</li>
          <li><strong>Device & usage data:</strong> browser, IP address, timestamps, and basic telemetry to monitor service health and detect abuse.</li>
        </ul>
      </section>

      {/* HOW WE USE */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">How We Use Information</h2>

        <ul className="list-disc ml-6 text-sm text-gray-700 space-y-2">
          <li>Process and record fee payments and generate receipts.</li>
          <li>Validate student identity and match payments to university records.</li>
          <li>Notify payers about transaction status via email/SMS (if provided).</li>
          <li>Maintain audit logs for finance and compliance purposes.</li>
          <li>Detect and prevent fraud, and to ensure platform security and integrity.</li>
        </ul>
      </section>

      {/* DATA SHARING */}
      <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Sharing & Disclosure</h2>

        <p className="text-sm text-gray-700 mb-2">We do not sell personal data. Data may be shared only in limited circumstances:</p>

        <ul className="list-disc ml-6 text-sm text-gray-700 space-y-2">
          <li><strong>Payment Processor (SBI):</strong> transactional data necessary for payment routing, settlement and reconciliation.</li>
          <li><strong>University Departments:</strong> Finance, Exam/Research cell for verification, records and administrative processing.</li>
          <li><strong>Legal & regulatory:</strong> where required by law, court orders or regulatory authorities.</li>
          <li><strong>Service providers:</strong> third-party vendors under contract who perform services on behalf of the University (they must follow confidentiality & security rules).</li>
        </ul>
      </section>

      {/* SECURITY */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Security</h2>

        <p className="text-sm text-gray-700 mb-2">
          We implement reasonable administrative, technical and physical safeguards to protect personal information.
          All payment transactions are processed by the State Bank of India (SBI) and the Portal does not retain sensitive
          card or banking credentials. Communications between your browser and servers are encrypted using TLS.
        </p>

        <p className="text-sm text-gray-700">
          While we strive to protect your data, no system is completely secure. If a security incident affects your data,
          we will follow applicable notification procedures.
        </p>
      </section>

      {/* DATA RETENTION */}
      <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Data Retention</h2>

        <p className="text-sm text-gray-700 mb-2">
          Personal and transaction records are retained for periods necessary for accounting, audit, regulatory compliance,
          and internal university policy (typically aligned with statutory record-keeping requirements). When no longer required,
          personal data will be securely deleted or anonymized.
        </p>
      </section>

      {/* COOKIES & THIRD PARTIES */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Cookies & Third-Party Services</h2>

        <p className="text-sm text-gray-700 mb-2">
          The Portal uses minimal cookies and browser storage for session management, CSRF protection and UX (e.g., keeping form state).
          Third-party services such as analytics or monitoring tools may set cookies; these are used in anonymized form for reliability and performance monitoring.
        </p>

        <p className="text-sm text-gray-700">
          The payment processing itself is handled by SBI—please review SBI's privacy and cookies policies for details on their data handling practices.
        </p>
      </section>

      {/* USER RIGHTS */}
      <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Rights</h2>

        <ul className="list-disc ml-6 text-sm text-gray-700 space-y-2">
          <li>Access & correction: You may request access to or correction of personal information held by the University.</li>
          <li>Data deletion: Where permitted by law and policy, you may request deletion of personal data that is no longer required.</li>
          <li>Complaint & redress: You may contact the University Data Protection Officer (contact below) to raise concerns.</li>
        </ul>
      </section>

      {/* CONTACT */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact & Data Protection Officer</h2>

        <p className="text-sm text-gray-700 mb-2">
          For privacy-related inquiries, access requests, or complaints, contact:
        </p>

        <div className="text-sm text-gray-800">
          <div><strong>Data Protection Officer</strong></div>
          <div>Jawaharlal Nehru Technological University Gurajada (JNTU-GV)</div>
          <div>Address: Dwarapudi, Vizianagaram – 535003, Andhra Pradesh, India</div>
          <div>Email: <a href="mailto:privacy@jntugv.edu.in" className="text-blue-700 underline">privacy@jntugv.edu.in</a></div>
          <div>Phone: +91-08922-123456</div>
        </div>
      </section>

      {/* CHANGES */}
      <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Changes to this Policy</h2>

        <p className="text-sm text-gray-700">
          The University may update this Privacy Policy. Material changes will be posted on the Portal with the effective date.
          Please review this policy periodically.
        </p>
      </section>

      {/* FOOTER NOTE */}
      <div className="text-xs text-gray-500 italic text-center mb-8">
        © {new Date().getFullYear()} Jawaharlal Nehru Technological University Gurajada, Vizianagaram — Unified Payments Portal
      </div>
    </div>
  );
}
