import React, { useState, useRef, useEffect } from "react";
import { initiatePayment } from "../api/paymentApi";

export function PaymentPage() {
  const [roll, setRoll] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [paymentData, setPaymentData] = useState(null); // SBI redirect fields
  const formRef = useRef(null);

  // Auto-submit the form once paymentData arrives (CSP safe)
  useEffect(() => {
    if (paymentData && formRef.current) {
      formRef.current.submit();
    }
  }, [paymentData]);

  async function handlePayment(e) {
    e.preventDefault();
    try {
      const res = await initiatePayment({
        student_roll: roll,
        student_name: name,
        amount: Number(amount),
      });

      setPaymentData(res); // trigger auto-submit via useEffect
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed.");
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem", border: "1px solid #ddd", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 8 }}>JNTUGV Payment</h2>

      {/* ---------- USER INPUT FORM ---------- */}
      <form onSubmit={handlePayment}>
        <label>Roll Number</label><br />
        <input
          value={roll}
          onChange={e => setRoll(e.target.value)}
          required
          style={{ width: "100%" }}
        /><br /><br />

        <label>Name</label><br />
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: "100%" }}
        /><br /><br />

        <label>Amount (INR)</label><br />
        <input
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          type="number"
          step="0.01"
          style={{ width: "100%" }}
        /><br /><br />

        <button type="submit">Pay Now</button>
      </form>

      {/* ---------- AUTO-SUBMIT FORM FOR SBI ---------- */}
      {paymentData && (
        <form
          ref={formRef}
          method="POST"
          action={paymentData.action}
          style={{ display: "none" }}
        >
          {Object.entries(paymentData.fields).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
        </form>
      )}

      <div style={{ marginTop: 16, fontSize: 13, color: "#666" }}>
        <strong>Note:</strong> This environment uses a mock bank that simulates SBI callback.
      </div>
    </div>
  );
}
