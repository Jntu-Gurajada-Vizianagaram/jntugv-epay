import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { isValidHTNo } from "../../utils/validations";
import { initiatePayment } from "../../api/paymentApi";

export function CertificatesForm() {
  const [ht, setHt] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [studyStatus, setStudyStatus] = useState("COMPLETED");
  const [collegeCode, setCollegeCode] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [approvalRef, setApprovalRef] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [cert, setCert] = useState("OD");
  const [amount, setAmount] = useState("");

  const [paymentData, setPaymentData] = useState(null);
  const formRef = useRef(null);

  const certFees = {
    OD: 1500,
    PC: 200,
    CMM: 200,
    MIGRATION: 600,
    TRANSCRIPTS: 1000,
  };

  const certDescriptions = {
    OD: "Original Degree Certificate issued to graduates after successful completion of course requirements.",
    PC: "Provisional Certificate issued immediately after course completion until OD is available.",
    CMM: "Consolidated Marks Memo summarising all semester marks in one document.",
    MIGRATION: "Required for students seeking admission to another university or institution.",
    TRANSCRIPTS: "Official set of attested academic transcripts for foreign or domestic applications.",
  };

  // Auto-submit form to bank
  useEffect(() => {
    if (paymentData && formRef.current) formRef.current.submit();
  }, [paymentData]);

  // Update amount automatically
  useEffect(() => {
    setAmount(certFees[cert] || "");
  }, [cert]);

  async function submit(e) {
    e.preventDefault();

    if (!isValidHTNo(ht)) return alert("Invalid Hallticket Number");
    if (!name.trim()) return alert("Name is required");

    const res = await initiatePayment({
      student_roll: ht,
      student_name: name,
      father_name: fatherName,
      study_status: studyStatus,
      college_code: collegeCode,
      college_name: collegeName,
      approval_letter_ref: approvalRef,
      email: email,
      mobile: mobile,
      amount: Number(amount),
      payment_type: "CERTIFICATE",
      payment_category: "CERTIFICATE", // Explicit category
      payment_subtype: cert,
      remarks: `${cert} Certificate Fee`,
    });

    setPaymentData(res);
  }

  return (
    <div className="max-w-2xl mx-auto p-4">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          📄 Certificate Fee Payment Portal
        </h2>
        <p className="text-sm mt-1 opacity-90">
          Secure online payment system for OD / PC / CMM / Migration / Transcripts.
        </p>
      </div>

      {/* INSTRUCTIONS */}
      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-6">

        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          📝 Instructions Before Applying
        </h3>

        <ul className="list-disc ps-5 text-gray-700 mt-3 space-y-1 text-sm">
          <li>Select the certificate type from the dropdown.</li>
          <li>Enter a valid JNTU-GV Hallticket Number.</li>
          <li>Fee amounts automatically follow university guidelines.</li>
          <li>Ensure your name matches university records.</li>
        </ul>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-sm text-yellow-900">
          ⚠️ <strong>Important Notice:</strong>
          Tatkal / Express certificate services are <strong>permanently discontinued</strong> by JNTU-GV administration.
        </div>

        <div className="mt-4 p-4 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">
          ❗ <strong>Warning:</strong> Incorrect Hallticket or Name may result in certificate rejection without refund.
        </div>
      </div>

      {/* MAIN FORM */}
      <div className="bg-white border rounded-xl shadow-md p-6">

        <form onSubmit={submit}>

          {/* Certificate Type */}
          <Select
            label="Certificate Type"
            required
            value={cert}
            onChange={(e) => setCert(e.target.value)}
            options={[
              { value: "OD", label: "Original Degree (OD)" },
              { value: "PC", label: "Provisional Certificate (PC)" },
              { value: "CMM", label: "Consolidated Marks Memo (CMM)" },
              { value: "MIGRATION", label: "Migration Certificate" },
              { value: "TRANSCRIPTS", label: "Transcripts" },
            ]}
          />

          {/* Description Box */}
          <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800">
            <strong>About this Certificate:</strong>
            <p className="mt-1 leading-relaxed">{certDescriptions[cert]}</p>
          </div>

          {/* Hallticket */}
          <Input
            label="Hallticket Number"
            placeholder="Ex: 22XX1A1234"
            value={ht}
            onChange={(e) => setHt(e.target.value.toUpperCase())}
            required
          />

          {/* Student Name */}
          <Input
            label="Full Name (As per University Records)"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Core Student Details */}
          <Input
            label="Father Name (As per SSC)"
            placeholder="Father Name"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
          />

          <Select
            label="Study Status"
            value={studyStatus}
            onChange={(e) => setStudyStatus(e.target.value)}
            required
            options={[
              { value: "COMPLETED", label: "Completed" },
              { value: "PURSUING", label: "Pursuing" },
              { value: "DISCONTINUED", label: "Discontinued" },
            ]}
          />

          {/* College Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="College Code"
              placeholder="Ex: VV"
              value={collegeCode}
              onChange={(e) => setCollegeCode(e.target.value.toUpperCase())}
              required
            />
            <Input
              label="College Name"
              placeholder="College Name"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              required
            />
          </div>

          <Input
            label="University Approval Letter Ref (If any)"
            placeholder="Letter No/Ref ID for special requests"
            value={approvalRef}
            onChange={(e) => setApprovalRef(e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="student@example.com"
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

          {/* Amount */}
          <Input
            label="Certificate Fee (INR)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          {/* Payment Summary */}
          <div className="mt-5 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-sm">
            <strong>💰 Payment Summary</strong>
            <div className="mt-1">Certificate: <span className="font-medium">{cert}</span></div>
            <div>Fee Amount: <span className="font-medium">₹{amount}</span></div>
          </div>

          {/* Submit Button */}
          <Button className="mt-6 w-full text-center">
            Proceed to Secure Payment →
          </Button>
        </form>
      </div>

      {/* Hidden auto-submit form */}
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
