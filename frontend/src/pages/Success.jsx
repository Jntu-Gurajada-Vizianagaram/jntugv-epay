import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { decryptPaymentData } from "../api/paymentApi";

export function Success() {
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      const encryptedData = searchParams.get("data");

      if (encryptedData) {
        try {
          const decrypted = await decryptPaymentData(encryptedData);
          setDetails({
            txId: decrypted.merchantTxnId || "N/A",
            amount: decrypted.amount || "N/A",
            status: decrypted.status || "SUCCESS"
          });
        } catch (err) {
          console.error("Failed to decrypt", err);
          // Fallback if decryption fails (or maybe show error)
          setDetails({
            txId: "Error loading details",
            amount: "-",
            status: "UNKNOWN"
          });
        }
      } else {
        // Fallback to legacy plain params if 'data' is missing
        setDetails({
          txId: searchParams.get("merchantTxnId") || "N/A",
          amount: searchParams.get("amount") || "N/A",
          status: searchParams.get("status") || "SUCCESS"
        });
      }
      setLoading(false);
    }

    fetchDetails();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center">
        <p className="text-gray-500">Verifying payment details...</p>
      </div>
    );
  }

  const { txId, amount, status } = details;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Payment Successful</h2>
      <p className="text-gray-500 mt-2">Thank you for your payment.</p>

      <div className="mt-6 border-t border-gray-100 pt-4 text-left space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Transaction ID</span>
          <span className="font-medium text-gray-900">{txId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Amount</span>
          <span className="font-medium text-gray-900">₹{amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Status</span>
          <span className="font-medium text-green-600">{status}</span>
        </div>
      </div>

      <div className="mt-8">
        <a href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Return Home</a>
      </div>
    </div>
  );
}
