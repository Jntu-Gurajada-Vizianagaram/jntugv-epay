import React from "react";

export function FAQ() {
  const faqs = [
    {
      q: "What is the JNTU-GV Unified Payments Portal?",
      a: "It is the official online platform for paying Examination Fees, Certificate Fees, Admissions, Ph.D. Fees, Affiliation Fees, and Direct Challans through a secure SBI-powered system."
    },
    {
      q: "Which payment methods are supported?",
      a: "You can pay using Net Banking, UPI, Debit Cards, Credit Cards, and SBI Collect supported instruments."
    },
    {
      q: "Is the payment secure?",
      a: "Yes. All transactions are encrypted and processed through the SBI Payment Gateway with full RBI compliance."
    },
    {
      q: "I paid the fee, but the receipt didn't generate. What should I do?",
      a: "Wait for 10–15 minutes and check your email/SMS. If still not received, contact the University Finance Section with transaction details."
    },
    {
      q: "Can I get a refund?",
      a: "Refunds are allowed only in cases of technical failures or duplicate transactions. All refunds require approval from the University Finance Section."
    },
    {
      q: "Why is my hallticket number showing as invalid?",
      a: "Ensure the HT number is in the correct JNTU-GV format (e.g., 22XX1A1234). Avoid spaces or special characters."
    },
    {
      q: "Whom should I contact for technical issues?",
      a: "Email paymentsupport@jntugv.edu.in or use the Contact Us page with your query."
    },
    {
      q: "Is student data stored on the portal?",
      a: "No sensitive payment data is stored on University servers. Only minimal metadata is used for receipts and record verification."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">

      {/* HEADER */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Frequently Asked Questions (FAQ)</h2>
        <p className="text-sm text-gray-700">
          Answers to common queries regarding fee payments, receipts, and portal functionality.
        </p>
      </div>

      {/* FAQ LIST */}
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <details
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm cursor-pointer"
          >
            <summary className="text-gray-900 font-medium text-sm">
              {item.q}
            </summary>
            <p className="mt-2 text-sm text-gray-700 leading-relaxed">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
