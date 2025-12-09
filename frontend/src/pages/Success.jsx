import React from "react";

export function Success() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold">Payment Successful</h2>
      <p className="text-gray-600 mt-2">Thank you. Your payment has been received. A receipt will be emailed if you provided an email address.</p>
    </div>
  );
}
