import React from "react";

export function TermsAndConditions() {
  return (
    <div className="max-w-5xl mx-auto p-4">

      {/* HEADER */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Terms & Conditions</h2>
        <p className="text-sm text-gray-700">
          Please read the following terms carefully before using the JNTU-GV Payments Portal.
        </p>
      </div>

      {/* CONTENT */}
      <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm space-y-6">

        {/* SECTION 1 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            By accessing or using the JNTU-GV Unified Payments Portal, you agree to these Terms & Conditions,
            University policies, and all applicable legal regulations.
          </p>
        </section>

        {/* SECTION 2 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Eligibility</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            This portal may be used only by students, scholars, affiliated colleges, and authorized representatives
            for genuine fee payments and administrative transactions.
          </p>
        </section>

        {/* SECTION 3 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Payment Processing</h3>
          <ul className="list-disc ml-6 text-sm text-gray-700 space-y-2">
            <li>Payments are securely processed through the State Bank of India (SBI) gateway.</li>
            <li>JNTU-GV does not store debit/credit/UPI banking details.</li>
            <li>Transaction charges, if any, are applied as per SBI norms.</li>
          </ul>
        </section>

        {/* SECTION 4 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Data Usage & Privacy</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Personal information such as hallticket numbers, names, and email IDs is used solely for verification,
            receipt generation, and University records. No financial data is stored or shared.
          </p>
        </section>

        {/* SECTION 5 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Refund Policy</h3>
          <ul className="list-disc ml-6 text-sm text-gray-700 space-y-2">
            <li>Fees once paid are generally non-refundable.</li>
            <li>Refunds are allowed only for duplicate payments or technical failures.</li>
            <li>All refunds must be requested through the University Finance Section.</li>
          </ul>
        </section>

        {/* SECTION 6 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">6. Prohibited Activities</h3>
          <ul className="list-disc ml-6 text-sm text-gray-700 space-y-2">
            <li>Providing false or misleading information.</li>
            <li>Attempting unauthorized access or tampering with payment systems.</li>
            <li>Using the portal for fraudulent or non-university transactions.</li>
          </ul>
        </section>

        {/* SECTION 7 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">7. Liability Disclaimer</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            JNTU-GV is not responsible for issues arising due to network failures, banking delays,
            incorrect information entered by the user, or third-party gateway downtime.
          </p>
        </section>

        {/* SECTION 8 */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">8. Amendments to Terms</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            The University reserves the right to update these terms at any time.
            Users are encouraged to review them periodically.
          </p>
        </section>

      </div>

    </div>
  );
}
