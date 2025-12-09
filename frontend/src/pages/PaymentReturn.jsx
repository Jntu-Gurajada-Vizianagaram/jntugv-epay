import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPaymentStatus } from "../api/paymentApi";

export function PaymentReturn() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("Processing payment...");

  useEffect(() => {
    (async () => {
      try {
        // read posted form fields from bank return
        const fd = new FormData(document.forms[0] || undefined);
        const obj = {};
        for (const [k, v] of fd.entries()) obj[k] = v;

        const merchantTxnId = obj.merchantTxnId || obj.orderId || obj.merchant_txn_id;
        if (!merchantTxnId) {
          setMsg("No transaction id found.");
          setTimeout(() => navigate("/payment/error"), 1800);
          return;
        }

        setMsg("Verifying with server...");
        const resp = await getPaymentStatus(merchantTxnId);
        if (resp.status === "SUCCESS") {
          setMsg("Payment successful");
          setTimeout(() => navigate("/payment/success"), 1000);
        } else if (resp.status === "FAILED") {
          setMsg("Payment failed");
          setTimeout(() => navigate("/payment/error"), 1000);
        } else {
          setMsg("Pending settlement. Please wait.");
        }
      } catch (e) {
        console.error(e);
        setMsg("Verification failed");
        setTimeout(() => navigate("/payment/error"), 1600);
      }
    })();
  }, [navigate]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="font-semibold">{msg}</h3>
      <p className="text-sm text-gray-500 mt-2">Do not refresh this page.</p>
    </div>
  );
}
