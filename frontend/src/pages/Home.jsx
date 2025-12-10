import React from "react";
import { CardTile } from "../components/CardTile";

export function Home() {
  return (
    <div className="w-full">

      {/* ===== TOP HERO SECTION ===== */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">
          Unified Payments Portal – JNTU-GV
        </h2>

        <p className="text-gray-700 leading-relaxed text-sm">
          The <strong>Unified Payments Portal of Jawaharlal Nehru Technological University Gurajada, Vizianagaram (JNTU-GV)</strong>
          is an integrated and secure digital platform designed to streamline all student-centric and institutional financial services
          under a single interface.
        </p>

        <p className="text-gray-700 leading-relaxed text-sm mt-3">
          This system is developed in <strong>Joint Collaboration with the State Bank of India (SBI)</strong> to ensure safe, seamless,
          and real-time electronic payments through industry-standard banking protocols. The portal enables students, research scholars,
          affiliated colleges, and administrative departments to make payments with complete transparency, traceability, and compliance.
        </p>

        <p className="text-gray-700 leading-relaxed text-sm mt-3">
          The platform supports a wide range of services, including Examination Fees, Certificate Fees
          (OD / PC / CMM / Migration), Admission Processing, Affiliation Fees, Direct Challans, and
          Ph.D. Scholar Payments. Each transaction is securely recorded and acknowledged instantly, offering
          a unified and dependable digital experience aligned with the University’s digital transformation vision.
        </p>

        <p className="text-gray-600 text-xs mt-4 italic">
          *This portal is an official digital initiative of JNTU-GV in collaboration with SBI to enhance efficiency, accessibility,
          and reliability in all financial operations across the university ecosystem.*
        </p>
      </div>

      {/* ===== QUICK PAY OPTIONS ===== */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Select a Service</h2>
        <p className="text-sm text-gray-600">
          Choose a category to proceed with safe & secure university payments.
        </p>
      </div>

      {/* ===== GRID OF PAYMENT TILES ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">
        <CardTile to="/exam-fee" title="Examination Fees" desc="Regular & supplementary fees" icon="🧾" accent="blue" />
        <CardTile to="/certificates" title="Certificates" desc="OD, PC, Migration, CMM" icon="📜" accent="emerald" />
        <CardTile to="/phd-fee" title="Ph.D Scholar Fees" desc="Registration, tuition & semester fees" icon="🎓" accent="purple" />
        <CardTile to="/admissions" title="Admissions" desc="New admissions & special category fees" icon="🎟️" accent="amber" />
        <CardTile to="/affiliation" title="Affiliation Fees" desc="College affiliation & inspections" icon="🏛️" accent="rose" />
        <CardTile to="/challan" title="Direct Challans" desc="Other challans, fines & miscellaneous" icon="💳" accent="teal" />
      </div>

      {/* ====================================================== */}
      {/* ===== SECURITY & COMPLIANCE SECTION ===== */}
      {/* ====================================================== */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Security & Compliance</h3>

        <p className="text-sm text-gray-700 leading-relaxed">
          The JNTU-GV Unified Payments Portal adheres to <strong>industry-standard financial security protocols</strong> and follows
          compliance frameworks mandated by the <strong>Reserve Bank of India (RBI)</strong> and the State Bank of India (SBI).
          Every transaction is encrypted, validated, and securely routed through SBI’s payment infrastructure.
        </p>

        <ul className="text-sm text-gray-700 mt-3 space-y-2 list-disc ml-6">
          <li>Bank-grade encryption ensures end-to-end data protection.</li>
          <li>Fully compliant with <strong>RBI Digital Payment Guidelines</strong>.</li>
          <li>Supports secure transaction logging, auditing, and verification.</li>
          <li>Secure communication protocols with checksum & encrypted payloads.</li>
          <li>High availability architecture with safe fallback mechanisms.</li>
        </ul>

        <p className="text-xs text-gray-500 mt-4 italic">
          Your safety is our priority. JNTU-GV guarantees confidentiality, integrity, and availability of all payment data.
        </p>
      </div>

      {/* ====================================================== */}
      {/* ===== PRIVACY POLICY SECTION ===== */}
      {/* ====================================================== */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm mb-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Privacy Policy</h3>

        <p className="text-sm text-gray-700 leading-relaxed">
          JNTU-GV is committed to protecting your personal information. All student, scholar, and institution data submitted through the
          Unified Payments Portal is handled strictly in accordance with University data governance standards.
        </p>

        <ul className="text-sm text-gray-700 mt-3 space-y-2 list-disc ml-6">
          <li>No financial data is stored on University servers.</li>
          <li>Personal details are used only for verification and receipt generation.</li>
          <li>Data is never shared with third parties except SBI for payment processing.</li>
          <li>All sensitive information is encrypted during transmission.</li>
        </ul>

        <p className="text-xs text-gray-500 mt-4 italic">
          By using this portal, you consent to the secure processing of your information as per institutional guidelines.
        </p>
      </div>

      {/* ====================================================== */}
      {/* ===== REFUND POLICY SECTION ===== */}
      {/* ====================================================== */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Refund & Cancellation Policy</h3>

        <p className="text-sm text-gray-700 leading-relaxed">
          Payments made through the JNTU-GV Unified Portal are processed via SBI’s secure payment gateway. Refunds are governed strictly by the
          University’s academic and administrative policies.
        </p>

        <ul className="text-sm text-gray-700 mt-3 space-y-2 list-disc ml-6">
          <li>Fees once paid are generally <strong>non-refundable</strong> unless due to technical errors or duplicate transactions.</li>
          <li>Refund requests must be submitted to the University Finance Section along with supporting documents.</li>
          <li>Any approved refund will be credited back to the same bank account used for payment.</li>
          <li>Processing time for refunds may take 7–14 working days based on SBI settlement schedules.</li>
        </ul>

        <p className="text-xs text-gray-500 mt-4 italic">
          Refund requests are subject to University approval and banking regulations. Ensure correct details before proceeding with payment.
        </p>
      </div>
    </div>
  );
}
