import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { initiatePayment } from "../../api/paymentApi";

/**
 * Enhanced ChallanForm
 * - Mobile-first
 * - Purpose presets for faster entry
 * - Auto challan/ref id generation
 * - Payment summary + consent checkbox
 * - Disabled while processing
 */
export function ChallanForm() {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [referenceId, setReferenceId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const formRef = useRef(null);

  // Generate a local challan/reference id for tracking
  useEffect(() => {
    const id = `CHL-${Date.now().toString().slice(-8)}`;
    setReferenceId(id);
  }, []);

  // Auto submit to bank when paymentData arrives
  useEffect(() => {
    if (paymentData && formRef.current) formRef.current.submit();
  }, [paymentData]);

  const purposePresets = [
    "Library Fine",
    "Hostel Fine",
    "Examination Late Fee",
    "Re-evaluation Fee",
    "Miscellaneous"
  ];

  function applyPreset(p) {
    setPurpose(p);
  }

  function validate() {
    if (!name.trim()) {
      alert("Name is required.");
      return false;
    }
    if (!purpose.trim()) {
      alert("Purpose is required.");
      return false;
    }
    const am = Number(amount);
    if (!am || am <= 0) {
      alert("Enter a valid amount greater than 0.");
      return false;
    }
    return true;
  }

  async function submit(e) {
    e.preventDefault();
    if (!validate()) return;

    setProcessing(true);
    try {
      // payload includes a merchant/reference id to map back to your DB
      const payload = {
        student_roll: "CHALLAN",
        student_name: name,
        amount: Number(amount),
        payment_type: "CHALLAN",
        payment_subtype: category,
        remarks: purpose,
        referenceId // local challan id for your DB/audit
      };

      const res = await initiatePayment(payload);
      // IMPORTANT: backend should save the created record with referenceId
      setPaymentData(res);
    } catch (err) {
      console.error("Initiate error", err);
      alert("Failed to initiate payment. See console for details.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="bg-white rounded-xl shadow p-5 mb-6 border border-gray-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Direct Challan / Misc Payment</h2>
            <p className="text-sm text-gray-600 mt-1">
              Use this form to pay fines, challans or miscellaneous fees. You will receive a receipt and reference ID after successful payment.
            </p>
          </div>

          <div className="text-sm text-gray-500 text-right">
            <div>Reference</div>
            <div className="mt-1 font-mono font-semibold text-sm text-gray-800">{referenceId}</div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <form onSubmit={submit}>

          <Input
            label="Payer Name"
            placeholder="Full name (Student / Staff / Visitor)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Purpose (select or type)</label>

            <div className="flex gap-2 mb-3 flex-wrap">
              {purposePresets.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => applyPreset(p)}
                  className={`text-sm px-3 py-1 rounded-full border ${
                    purpose === p ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 text-gray-800 border-gray-200"
                  } transition`}
                >
                  {p}
                </button>
              ))}
            </div>

            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Purpose of payment (e.g., Library fine for overdue books)"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Select
                options={[
                  { value: "GENERAL", label: "General Challan" },
                  { value: "HOSTEL", label: "Hostel" },
                  { value: "LIBRARY", label: "Library" },
                  { value: "EXAM", label: "Examination" },
                  { value: "OTHER", label: "Other" },
                ]}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <Input
              label="Amount (INR)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Payment summary + consent */}
          <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Payment Summary</div>
                <div className="text-xs text-gray-700 mt-1">
                  Reference: <span className="font-mono">{referenceId}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">₹ {amount || "0.00"}</div>
                <div className="text-xs text-gray-600">Amount payable</div>
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-700">
              By clicking Proceed you agree to the University payment terms and that the details provided are correct.
            </div>
          </div>

          <div className="mt-5">
            <Button type="submit" disabled={processing} className="w-full">
              {processing ? "Initiating payment..." : "Proceed to Payment"}
            </Button>
          </div>
        </form>

        {/* Optional: quick actions */}
        <div className="mt-4 text-sm text-gray-600">
          <div>Need support? Contact: <a href="/contact" className="text-blue-700 underline">Finance & Exam Cell</a></div>
        </div>
      </div>

      {/* Hidden bank form (auto-post) */}
      {paymentData && (
        <form ref={formRef} method="POST" action={paymentData.action} style={{ display: "none" }}>
          {Object.entries(paymentData.fields).map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={v} />
          ))}
        </form>
      )}
    </div>
  );
}
