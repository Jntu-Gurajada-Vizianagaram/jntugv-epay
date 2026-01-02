import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { initiatePayment } from "../../api/paymentApi";
import { parseHTNumber } from "../../utils/htParser";

export function PhDFeeForm() {
  const [regNo, setRegNo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [department, setDepartment] = useState("");
  const [feeType, setFeeType] = useState("");
  const [amount, setAmount] = useState("");

  const [processing, setProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const formRef = useRef(null);

  const feeDescriptions = {
    ADMISSION: "Initial admission fee at the time of joining Ph.D.",
    TUITION: "Semester/Yearly research tuition fee.",
    EXAMINATION: "Ph.D. course work or semester exam fee.",
    PROGRESS_SEMINAR: "Fee for conducting progress seminar presentations.",
    THESIS_SUBMISSION: "Fee for submitting full Ph.D. thesis.",
    RESUBMISSION: "Fee for re-submitting revised thesis.",
    VIVA_VOCE: "Fee for Ph.D. Viva-Voce and evaluation.",
    LATE_FEE: "Penalty/late fee for delay in academic procedures.",
    OTHERS: "Other misc. payments approved by the University.",
  };

  const departmentsList = [
    "CSE",
    "ECE",
    "EEE",
    "ME",
    "CE",
    "Chem",
    "Maths",
    "Physics",
    "Chemistry",
    "Management",
  ];

  // Auto-submit SBI Form
  useEffect(() => {
    if (paymentData && formRef.current) formRef.current.submit();
  }, [paymentData]);

  async function submit(e) {
    e.preventDefault();

    if (!regNo.trim()) return alert("Registration Number is required.");

    // Strict Ph.D Validation
    const parsed = parseHTNumber(regNo);
    if (!parsed.valid) return alert("Invalid Registration Number.");
    if (parsed.course !== "Ph.D Program") {
      return alert(`This portal is for Ph.D. Scholars only. Your ID indicates: ${parsed.course}`);
    }

    if (!feeType) return alert("Please select fee type.");
    if (!amount) return alert("Amount must not be empty.");

    const payload = {
      student_roll: regNo,
      student_name: name,
      email: email,
      mobile: mobile,
      department,
      fee_type: feeType,
      amount: Number(amount),
      payment_category: "PHD_FEE",
      remarks: `PhD - ${feeType}`,
    };

    try {
      setProcessing(true);
      const resp = await initiatePayment(payload);
      setPaymentData(resp);
    } catch (err) {
      alert("Failed to initiate payment");
      console.error(err);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">

      {/* HEADER */}
      <div className="bg-purple-700 text-white p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          🎓 Ph.D. Scholar Fee Payment
        </h2>
        <p className="text-sm opacity-90 mt-1">
          Secure online fee payment portal for research scholars of JNTU-GV.
        </p>
      </div>

      {/* INFO CARD */}
      <div className="bg-white border border-gray-200 rounded-xl shadow p-5 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Instructions</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Enter your official Ph.D. registration number.</li>
          <li>Select correct department and fee type.</li>
          <li>Payment details will be stored and verified by the Research Cell.</li>
          <li>Ensure the amount corresponds to the latest circular.</li>
        </ul>

        <div className="text-xs text-red-600 mt-3 border-t pt-2">
          ⚠ Incorrect details may delay academic processing.
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <form onSubmit={submit} className="space-y-4">

          {/* Registration Number */}
          <Input
            label="Ph.D Registration Number"
            placeholder="e.g., PHD20CSE001"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value.toUpperCase())}
            required
          />

          {/* Scholar Name */}
          <Input
            label="Scholar Name"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="scholar@jntugv.edu.in"
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

          {/* Department */}
          <Select
            label="Department"
            required
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            options={[
              { value: "", label: "Select Department" },
              ...departmentsList.map((d) => ({ value: d, label: d })),
            ]}
          />

          {/* Fee Type */}
          <Select
            label="Fee Type"
            required
            value={feeType}
            onChange={(e) => setFeeType(e.target.value)}
            options={[
              { value: "", label: "Select Fee Type" },
              ...Object.keys(feeDescriptions).map((d) => ({
                value: d,
                label: d.replace(/_/g, " "),
              })),
            ]}
          />

          {/* Description */}
          {feeType && (
            <div className="bg-purple-50 border border-purple-200 text-purple-900 p-3 rounded-lg text-sm">
              <strong>Description:</strong>
              <p>{feeDescriptions[feeType]}</p>
            </div>
          )}

          {/* Amount */}
          <Input
            label="Fee Amount (INR)"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          {/* Summary */}
          {(feeType && amount) && (
            <div className="bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-900">
              <strong>Payment Summary</strong>
              <p className="mt-1">Fee Type: {feeType.replace(/_/g, " ")}</p>
              <p>Amount: ₹{amount}</p>
              {department && <p>Department: {department}</p>}
            </div>
          )}

          <Button disabled={processing} className="w-full mt-4">
            {processing ? "Processing..." : "Proceed to Payment →"}
          </Button>
        </form>
      </div>

      {/* Auto Submit SBI Form */}
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
