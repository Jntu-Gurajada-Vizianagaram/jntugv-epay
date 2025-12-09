import React, { useState, useRef, useEffect } from "react";
import { initiatePayment } from "../../api/paymentApi";

export function PhDFeeForm() {
  const [regNo, setRegNo] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [feeType, setFeeType] = useState("");
  const [amount, setAmount] = useState("");

  const [paymentData, setPaymentData] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (paymentData && formRef.current) formRef.current.submit();
  }, [paymentData]);

  async function submit(e) {
    e.preventDefault();
    if (!regNo.trim()) return alert("Registration Number is required.");
    if (!feeType) return alert("Please select fee type.");

    const payload = {
      student_roll: regNo,
      student_name: name,
      department,
      fee_type: feeType,
      amount: Number(amount),
      payment_category: "PHD_FEE"
    };

    const resp = await initiatePayment(payload);
    setPaymentData(resp);
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-3 text-jntu-700">
        Ph.D. Scholars Fee Payment
      </h2>

      <form onSubmit={submit} className="space-y-4">

        {/* Registration Number */}
        <div>
          <label className="text-sm font-medium">Ph.D. Registration Number</label>
          <input
            value={regNo}
            onChange={(e) => setRegNo(e.target.value.toUpperCase())}
            className="mt-1 w-full p-2 border rounded-lg"
            placeholder="e.g., PHD20CSE001"
            required
          />
        </div>

        {/* Name */}
        <div>
          <label className="text-sm font-medium">Scholar Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-2 border rounded-lg"
            placeholder="Enter scholar full name"
          />
        </div>

        {/* Department */}
        <div>
          <label className="text-sm font-medium">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="mt-1 w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Department</option>
            <option value="CSE">Computer Science and Engineering</option>
            <option value="ECE">Electronics and Communication Engineering</option>
            <option value="EEE">Electrical and Electronics Engineering</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="CE">Civil Engineering</option>
            <option value="Chem">Chemical Engineering</option>
            <option value="Maths">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Management">Management Studies</option>
          </select>
        </div>

        {/* Fee Type */}
        <div>
          <label className="text-sm font-medium">Fee Type</label>
          <select
            value={feeType}
            onChange={(e) => setFeeType(e.target.value)}
            className="mt-1 w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Fee Type</option>
            <option value="ADMISSION">Admission Fee</option>
            <option value="TUITION">Tuition Fee (Yearly/Semester)</option>
            <option value="EXAMINATION">Examination Fee</option>
            <option value="PROGRESS_SEMINAR">Progress Seminar Fee</option>
            <option value="THESIS_SUBMISSION">Thesis Submission Fee</option>
            <option value="RESUBMISSION">Thesis Re-submission Fee</option>
            <option value="VIVA_VOCE">Viva Voce Fee</option>
            <option value="LATE_FEE">Late Fee / Penalty</option>
            <option value="OTHERS">Other Payments</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-medium">Amount (INR)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full p-2 border rounded-lg"
            placeholder="Enter amount"
            required
          />
        </div>

        <button className="bg-jntu-500 text-white px-4 py-2 rounded-lg font-semibold w-full">
          Pay Now
        </button>
      </form>

      {/* Auto-submit SBI Form */}
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
