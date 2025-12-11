import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../components/Input";
import { initiatePayment } from "../../api/paymentApi";

export function AdmissionsForm() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    course: "B.TECH",
    branch: "",
    category: "",
    aadhar: "",
    amount: "",
  });

  const [paymentData, setPaymentData] = useState(null);
  const formRef = useRef(null);

  // Auto-submit to bank
  useEffect(() => {
    if (paymentData && formRef.current) formRef.current.submit();
  }, [paymentData]);

  // Handle changes
  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(e) {
    e.preventDefault();

    // Construct backend payload (SBI merchant-ready)
    const payload = {
      student_roll: "NEW_ADMISSION",
      student_name: form.name,
      mobile: form.mobile,
      email: form.email,
      gender: form.gender,
      dob: form.dob,
      address: form.address,
      aadhar: form.aadhar,
      course: form.course,
      branch: form.branch,
      category: form.category,
      amount: Number(form.amount),
      payment_type: "ADMISSION",
      payment_subtype: form.course,
      remarks: `New Admission - ${form.course} / ${form.branch}`,
    };

    const res = await initiatePayment(payload);
    setPaymentData(res);
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Admission Payment</h2>

      <form onSubmit={submit} className="space-y-4">

        {/* NAME */}
        <Input
          label="Full Name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          required
        />

        {/* MOBILE */}
        <Input
          label="Mobile Number"
          value={form.mobile}
          maxLength={10}
          onChange={(e) => updateField("mobile", e.target.value)}
          required
        />

        {/* EMAIL */}
        <Input
          label="Email Address"
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          required
        />

        {/* GENDER + DOB */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => updateField("gender", e.target.value)}
              className="mt-1 w-full p-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <Input
            label="Date of Birth"
            type="date"
            value={form.dob}
            onChange={(e) => updateField("dob", e.target.value)}
            required
          />
        </div>

        {/* ADDRESS */}
        <div>
          <label className="text-sm font-medium">Address</label>
          <textarea
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            className="w-full mt-1 p-2 h-20 border rounded"
            required
          ></textarea>
        </div>

        {/* AADHAR */}
        <Input
          label="Aadhar Number"
          maxLength={12}
          value={form.aadhar}
          onChange={(e) => updateField("aadhar", e.target.value)}
          required
        />

        {/* COURSE + BRANCH */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Course</label>
            <select
              value={form.course}
              onChange={(e) => updateField("course", e.target.value)}
              className="mt-1 w-full p-2 border rounded"
              required
            >
              <option>B.TECH</option>
              <option>M.TECH</option>
              <option>MBA</option>
              <option>MCA</option>
              <option>B.PHARMACY</option>
              <option>Pharm D</option>
              <option>OTHER</option>

              
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Branch</label>
            <select
              value={form.branch}
              onChange={(e) => updateField("branch", e.target.value)}
              className="mt-1 w-full p-2 border rounded"
              required
            >
              <option value="">Select Branch</option>
              <option>CSE</option>
              <option>IT</option>
              <option>CIVIL</option>
              <option>MECH</option>
              <option>ECE</option>
              <option>EEE</option>
              <option>CHEMICAL</option>
              <option>BIOTECH</option>
              <option>MINING</option>
              <option>AGRICULTURE</option>
              <option>MBA</option>
              <option>MCA</option>
              <option>PHARMA</option>
              
              <option>AIML</option>
              <option>OTHER</option>
            </select>
          </div>
        </div>

        {/* CATEGORY */}
        <div>
          <label className="text-sm font-medium">Category</label>
          <select
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="mt-1 w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option>OC</option>
            <option>BC-A</option>
            <option>BC-B</option>
            <option>BC-C</option>
            <option>BC-D</option>
            <option>SC</option>
            <option>ST</option>
            <option>EWS</option>
          </select>
        </div>

        {/* AMOUNT */}
        <Input
          label="Amount (INR)"
          type="number"
          value={form.amount}
          onChange={(e) => updateField("amount", e.target.value)}
          required
        />

        {/* SUBMIT BUTTON */}
        <button type="submit" className="primary w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">
          Proceed to Payment
        </button>
      </form>

      {/* SBI FORM AUTO-SUBMIT */}
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
