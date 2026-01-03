import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { isValidHTNo } from "../../utils/validations";
import { parseHTNumber } from "../../utils/htParser";
import { initiatePayment } from "../../api/paymentApi";

export function ExamFeeForm() {
  const [ht, setHt] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [studyStatus, setStudyStatus] = useState("PURSUING");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [manualYear, setManualYear] = useState("I");
  const [manualSem, setManualSem] = useState("I");
  const [examType, setExamType] = useState("REGULAR");
  const [amount, setAmount] = useState("");
  const [parsedInfo, setParsedInfo] = useState(null);

  const [processing, setProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const formRef = useRef(null);

  // Auto-submit SBI form
  useEffect(() => {
    if (paymentData && formRef.current) formRef.current.submit();
  }, [paymentData]);

  /* ------------------------------
      Exam Fee Mapping (Customizable)
     ------------------------------ */
  const feeChart = {
    REGULAR: 750,
    SUPPLEMENTARY: 360,
    REVALUATION: 1000,
    RC: 300,
    SHORT_MEMO: 50,
    SPECIAL_SUPPLY: 950,
  };

  const examDescriptions = {
    REGULAR: "Regular Semester Examination Fee for registered subjects.",
    SUPPLEMENTARY: "Supplementary Fee for backlog subjects.",
    REVALUATION: "Apply for revaluation of answer scripts.",
    RC: "Request for Recounting of marks.",
    SHORT_MEMO: "Short Memo / Marks Extract Fee.",
    SPECIAL_SUPPLY: "Special Supplementary Examination Fee.",
  };

  // Auto parse HT Number
  useEffect(() => {
    if (isValidHTNo(ht)) {
      const parsed = parseHTNumber(ht);
      setParsedInfo(parsed.valid ? parsed : null);
    } else {
      setParsedInfo(null);
    }
  }, [ht]);

  // Auto update fee when exam type changes
  useEffect(() => {
    setAmount(feeChart[examType]);
  }, [examType]);

  async function submit(e) {
    e.preventDefault();

    if (!isValidHTNo(ht)) return alert("Invalid Hallticket format");
    if (!isValidHTNo(ht)) return alert("Invalid Hallticket format");
    // Parsed info is now for display/verification only, not blocking.
    if (!name.trim()) return alert("Name is required");

    const payload = {
      student_roll: ht,
      student_name: name,
      father_name: fatherName,
      study_status: studyStatus,
      email: email,
      mobile: mobile,
      amount: Number(amount),

      // metadata from parsed HT No
      // metadata
      year: manualYear, // User manually selected year
      semester: manualSem, // User manually selected semester
      college_code: parsedInfo?.collegeCode || "UNKNOWN",
      college_name: parsedInfo?.college || "UNKNOWN",
      branch_code: parsedInfo?.branchCode || "UNKNOWN",
      branch_name: parsedInfo?.branch || "UNKNOWN",
      course: parsedInfo?.course || "UNKNOWN",
      roll_number: parsedInfo?.roll || "UNKNOWN",

      payment_type: "EXAM_FEE",
      payment_subtype: examType,
      payment_category: "UNIVERSITY_EXAMINATION",
      remarks: `${examType} Examination Fee`,
    };

    try {
      setProcessing(true);
      const res = await initiatePayment(payload);
      setPaymentData(res);
    } catch (err) {
      console.error(err);
      alert("Failed to initiate payment");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-5">

      {/* HEADER */}
      <div className="bg-blue-600 text-white p-5 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          📝 Examination Fee Payment
        </h2>
        <p className="text-sm mt-1 opacity-90">
          Pay semester examination fees, supplementary, revaluation & more.
        </p>
      </div>

      {/* INSTRUCTIONS */}
      <div className="bg-white p-5 rounded-xl shadow border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">Important Information</h3>

        <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
          <li>Enter your hallticket number exactly as per university records.</li>
          <li>Select the correct examination type before proceeding.</li>
          <li>Fees are based on university circulars — automatically updated.</li>
          <li>Multiple subjects in supplementary exams require *per-subject* fee payment.</li>
        </ul>

        <div className="text-xs text-red-600 mt-3">
          ⚠ Incorrect details may lead to rejection of exam registration.
        </div>
      </div>

      {/* MAIN FORM */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">

        <form onSubmit={submit} className="space-y-4">

          {/* HT No */}
          <Input
            label="Hallticket Number"
            placeholder="22XX1A1234"
            value={ht}
            onChange={(e) => setHt(e.target.value.toUpperCase())}
            required
          />

          {/* LIVE PARSED INFO */}
          {parsedInfo && (
            <div className="bg-green-50 border border-green-200 p-3 rounded text-sm text-green-900">
              <div className="font-medium mb-1">Verified Student Info</div>
              <div>College: {parsedInfo.college}</div>
              <div>Branch: {parsedInfo.branch}</div>
              <div>Course: {parsedInfo.course}</div>
              <div>Admitted Batch: 20{parsedInfo.year}</div>
            </div>
          )}

          {/* Student Name */}
          <Input
            label="Student Name"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Father Name"
            placeholder="Enter father's name"
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
              { value: "PURSUING", label: "Pursuing" },
              { value: "COMPLETED", label: "Completed" },
              { value: "DISCONTINUED", label: "Discontinued" },
            ]}
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
              label="Mobile Number"
              type="tel"
              placeholder="9876543210"
              value={mobile}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                setMobile(val);
              }}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Present Year"
              value={manualYear}
              onChange={(e) => setManualYear(e.target.value)}
              required
              options={[
                { value: "I", label: "I Year" },
                { value: "II", label: "II Year" },
                { value: "III", label: "III Year" },
                { value: "IV", label: "IV Year" },
              ]}
            />
            <Select
              label="Present Semester"
              value={manualSem}
              onChange={(e) => setManualSem(e.target.value)}
              required
              options={[
                { value: "I", label: "I Semester" },
                { value: "II", label: "II Semester" },
              ]}
            />
          </div>

          {/* Exam Type */}
          <Select
            label="Examination Type"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            required
            options={[
              { value: "REGULAR", label: "Regular Examination" },
              { value: "SUPPLEMENTARY", label: "Supplementary" },
              { value: "REVALUATION", label: "Revaluation" },
              { value: "RC", label: "Recounting (RC)" },
              { value: "SHORT_MEMO", label: "Short Memo" },
              { value: "SPECIAL_SUPPLY", label: "Special Supplementary" },
            ]}
          />

          {/* Exam Description */}
          <div className="bg-gray-50 border border-gray-200 p-3 rounded text-sm text-gray-800">
            <strong>About:</strong> {examDescriptions[examType]}
          </div>

          {/* Amount */}
          <Input
            label="Fee Amount (INR)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          {/* Payment Summary */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-900">
            <div className="font-medium">Payment Summary</div>
            <div className="mt-1">Exam Type: {examType}</div>
            <div>Fee: ₹{amount}</div>
          </div>

          {/* Submit */}
          <Button className="w-full mt-4" disabled={processing}>
            {processing ? "Processing..." : "Proceed to Secure Payment →"}
          </Button>
        </form>
      </div>

      {/* SBI Hidden Form */}
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
