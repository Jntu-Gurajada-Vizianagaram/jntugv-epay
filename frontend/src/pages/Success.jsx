import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { decryptPaymentData, getPaymentStatus } from "../api/paymentApi";

export function Success() {
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      const encryptedData = searchParams.get("data");
      let txId = null;
      let initialStatus = "SUCCESS";
      let initialAmount = "N/A";

      if (encryptedData) {
        try {
          const decrypted = await decryptPaymentData(encryptedData);
          txId = decrypted.merchantTxnId || "N/A";
          initialStatus = decrypted.status || "SUCCESS";
          initialAmount = decrypted.amount || "N/A";
        } catch (err) {
          console.error("Failed to decrypt", err);
        }
      } else {
        txId = searchParams.get("merchantTxnId");
        initialStatus = searchParams.get("status") || "SUCCESS";
        initialAmount = searchParams.get("amount") || "N/A";
      }

      if (txId && txId !== "N/A") {
        try {
          const fullData = await getPaymentStatus(txId);
          if (fullData) {
            // If the server-to-server callback hasn't run yet, the DB might still say INITIATED
            // But we know from the encrypted bank return URL payload that it was a success.
            if ((fullData.status === "INITIATED" || fullData.status === "PENDING") && initialStatus === "SUCCESS") {
              fullData.status = "SUCCESS";
            }
            setDetails(fullData);
          } else {
            setDetails({ merchantTxnId: txId, status: initialStatus, amount: initialAmount });
          }
        } catch (err) {
          setDetails({ merchantTxnId: txId, status: initialStatus, amount: initialAmount });
        }
      } else {
        setDetails({ merchantTxnId: "UNKNOWN", status: "UNKNOWN", amount: "-" });
      }
      
      setLoading(false);
    }

    fetchDetails();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center">
        <p className="text-gray-500">Retrieving Full Transaction Details...</p>
      </div>
    );
  }

  // Fallback if data is missing
  const txId = details?.merchantTxnId || "N/A";
  const amount = details?.amount || "N/A";
  const status = details?.status || "SUCCESS";
  const bankTxnId = details?.bankTxnId || "N/A";
  
  // Extra detailed fields if fetched
  const studentName = details?.student_name || details?.college_name;
  const rollNumber = details?.student_roll || details?.college_code;
  const paymentCategory = details?.payment_category || "";
  const paymentType = details?.payment_type || "";
  const paymentDate = details?.updatedAt || details?.createdAt || new Date().toISOString(); 
  
  const formattedDate = new Date(paymentDate).toLocaleString('en-IN', {
    dateStyle: "medium", timeStyle: "short"
  });

  // Collect all available extra fields to display dynamically
  const extraFields = [
    { label: "Student / College Name", value: studentName },
    { label: "Roll / Reg. No", value: rollNumber },
    { label: "Father's Name", value: details?.father_name },
    { label: "Email Address", value: details?.email },
    { label: "Mobile Number", value: details?.mobile },
    { label: "Course / Program", value: details?.course },
    { label: "Branch / Dept", value: details?.department || details?.branch_name || details?.branch },
    { label: "Study Status", value: details?.study_status },
    { label: "Year & Semester", value: [details?.year, details?.semester].filter(Boolean).join(" - ") },
    // Category specific
    { label: "Exam Type", value: details?.exam_type },
    { label: "Certificate Type", value: details?.certificate_type },
    { label: "Approval Ref", value: details?.approval_letter_ref },
    { label: "Specific Category", value: details?.fee_type || details?.affiliation_type || details?.category },
    { label: "Gender", value: details?.gender },
    { label: "Aadhar", value: details?.aadhar },
    { label: "Payment Category", value: paymentCategory?.replace(/_/g, " ") },
    { label: "Fee Sub-Type", value: paymentType?.replace(/_/g, " ") }
  ].filter(f => f.value && f.value !== "N/A" && f.value.trim() !== "");

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 sm:p-8 bg-white rounded-2xl shadow-lg print:shadow-none print:mt-0 print:p-0">
      
      {/* SUCCESS HEADER - hidden slightly when printing if we want to focus on receipt */}
      <div className="text-center print:hidden">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Payment Processed</h2>
        <p className="text-gray-500 mt-2 mb-6">Your transaction details are below.</p>
      </div>

      {/* PRINTABLE RECEIPT SECTION */}
      <div className="border border-gray-200 rounded-xl p-6 print:border-none print:p-0">
        
        {/* Receipt Header */}
        <div className="hidden print:block text-center border-b-2 border-gray-300 pb-4 mb-6">
          <h1 className="text-2xl font-bold uppercase text-gray-900">Jawaharlal Nehru Technological University - Gurajada Vizianagaram</h1>
          <h2 className="text-lg font-semibold text-gray-700 mt-1">Official E-Payment Receipt</h2>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 print:hidden">Transaction Receipt</h3>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm sm:text-base">
          <div>
            <span className="block text-gray-500 text-xs uppercase tracking-wider">Transaction ID</span>
            <span className="font-medium text-gray-900 font-mono">{txId}</span>
          </div>
          
          <div>
            <span className="block text-gray-500 text-xs uppercase tracking-wider">Bank Reference No</span>
            <span className="font-medium text-gray-900 font-mono">{bankTxnId === "N/A" ? "-" : bankTxnId}</span>
          </div>

          <div>
            <span className="block text-gray-500 text-xs uppercase tracking-wider">Transaction Date & Time</span>
            <span className="font-medium text-gray-900">{formattedDate}</span>
          </div>

          <div>
            <span className="block text-gray-500 text-xs uppercase tracking-wider">Amount Paid</span>
            <span className="font-bold text-gray-900 text-lg">₹ {amount}</span>
          </div>

          <div className="col-span-1 md:col-span-2 my-2 border-t border-gray-100 print:border-gray-300"></div>

          {extraFields.map((field, idx) => (
            <div key={idx}>
              <span className="block text-gray-500 text-xs uppercase tracking-wider">{field.label}</span>
              <span className="font-medium text-gray-900">{field.value}</span>
            </div>
          ))}

          <div className="col-span-1 md:col-span-2 mt-4 text-center">
             <span className="inline-block px-4 py-1 rounded bg-green-100 text-green-800 font-semibold border border-green-200 uppercase">
               Status: {status}
             </span>
          </div>
        </div>

        {/* Receipt Footer for Print */}
        <div className="hidden print:block mt-12 text-center text-sm text-gray-500">
          <p>This is a computer-generated receipt and does not require a physical signature.</p>
          <p>Please keep this receipt for future reference.</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 print:hidden">
        <button 
          onClick={() => window.print()}
          className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
          </svg>
          Print / Save PDF
        </button>
        <Link to="/" className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition text-center">
          Return Home
        </Link>
      </div>
    </div>
  );
}

