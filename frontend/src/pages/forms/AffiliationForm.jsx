import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { initiatePayment } from "../../api/paymentApi";

export function AffiliationForm() {
  const [code, setCode] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("AFFILIATION_GENERAL");

  const [paymentData, setPaymentData] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (paymentData && formRef.current) {
      formRef.current.submit();
    }
  }, [paymentData]);

  async function submit(e) {
    e.preventDefault();

    if (!code || code.length < 2) {
      return alert("Please enter a valid college code (Min 2 chars).");
    }

    if (!collegeName.trim()) {
      return alert("College name is required.");
    }

    const payload = {
      student_roll: code,
      student_name: collegeName,
      email: email,
      mobile: mobile,
      amount: Number(amount),
      payment_type: "AFFILIATION",
      payment_subtype: category,
      remarks: `Affiliation Fee - ${collegeName} (${code})`,
    };

    const res = await initiatePayment(payload);
    setPaymentData(res);
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">

      {/* PAGE TITLE */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">
        College Affiliation Fee Payment
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        Colleges affiliated with <strong>JNTU-GV</strong> can pay annual affiliation fees securely through this portal.
      </p>

      {/* FORM CARD */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">

        <form onSubmit={submit}>

          <Input
            label="College Code"
            placeholder="Enter college code (e.g., GV01)"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            required
          />

          <Input
            label="College Name"
            placeholder="Enter official college name"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="college@jntugv.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Contact Mobile"
              type="tel"
              placeholder="9876543210"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <Select
            label="Affiliation Category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: "AFFILIATION_GENERAL", label: "General Affiliation Fee" },
              { value: "AFFILIATION_RENEWAL", label: "Renewal of Affiliation" },
              { value: "AFFILIATION_INSPECTION", label: "Inspection Charges" },
              { value: "AFFILIATION_SPECIAL", label: "Special Permission Fee" },
            ]}
          />

          <Input
            label="Amount (INR)"
            type="number"
            placeholder="Enter payable fee"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <Button type="submit" className="mt-3">
            Proceed to Payment
          </Button>
        </form>
      </div>

      {/* AUTO-SUBMIT SBI FORM */}
      {paymentData && (
        <form
          ref={formRef}
          method="POST"
          action={paymentData.action}
          style={{ display: "none" }}
        >
          {Object.entries(paymentData.fields).map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={v} />
          ))}
        </form>
      )}
    </div>
  );
}
