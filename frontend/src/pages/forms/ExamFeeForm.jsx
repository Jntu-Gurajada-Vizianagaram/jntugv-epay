import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../components/Input";
import { isValidHTNo } from "../../utils/validations";
import { parseHTNumber } from "../../utils/htParser";
import { initiatePayment } from "../../api/paymentApi";

export function ExamFeeForm() {
  const [ht, setHt] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (paymentData && formRef.current) formRef.current.submit();
  }, [paymentData]);

  async function submit(e) {
    e.preventDefault();

    if (!isValidHTNo(ht)) return alert("Invalid Hallticket format");

    const parsed = parseHTNumber(ht);
    if (!parsed.valid) return alert("Hallticket parsing failed!");

    const payload = {
      student_roll: ht,
      student_name: name,
      amount: Number(amount),

      // enriched academic metadata
      year: parsed.year,
      college_code: parsed.collegeCode,
      college_name: parsed.college,
      branch_code: parsed.branchCode,
      branch_name: parsed.branch,
      course: parsed.course,
      roll_number: parsed.roll,

      // payment info
      payment_type: "EXAM_FEE",
      payment_category: "EXAMINATION",
    };

    const res = await initiatePayment(payload);
    setPaymentData(res);
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">

      <h2 className="text-xl font-semibold mb-4 text-jntu-700">
        Examination Fee Payment
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <Input
          label="Hallticket Number"
          value={ht}
          onChange={(e) => setHt(e.target.value.toUpperCase())}
          required
        />

        <Input
          label="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Amount (INR)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button className="primary w-full" type="submit">
          Proceed to Pay
        </button>
      </form>

      {/* Auto-submit form to SBI */}
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
