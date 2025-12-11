import React, { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function ContactUs() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [msg, setMsg] = useState("");

  function submit(e) {
    e.preventDefault();
    alert("Your message has been submitted. Our team will contact you shortly.");
  }

  return (
    <div className="max-w-4xl mx-auto p-4">

      {/* HEADER */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">
          Contact Us – JNTU-GV Payments Portal
        </h2>
        <p className="text-sm text-gray-700">
          If you have any questions, technical issues, or require support regarding payments,
          feel free to reach out to us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT: CONTACT FORM */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Send an Enquiry</h3>

          <form onSubmit={submit} className="space-y-4">
            <Input
              label="Your Name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="example@gmail.com"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
            />

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows="4"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
                placeholder="Describe your issue or enquiry..."
                required
              />
            </div>

            <Button className="w-full">Submit</Button>
          </form>
        </div>

        {/* RIGHT: CONTACT DETAILS */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">University Contact</h3>

          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Jawaharlal Nehru Technological University Gurajada (JNTU-GV)</strong><br />
              Dwarapudi, Vizianagaram – 535003, Andhra Pradesh, India
            </p>

            <p>
              📞 <strong>Phone:</strong> +91-08922-123456<br />
              ✉️ <strong>Email:</strong> support@jntugv.edu.in
            </p>

            <p>
              🕒 <strong>Office Hours:</strong><br />
              Monday – Saturday: 10:00 AM to 5:00 PM
            </p>

            <div className="pt-3">
              <h4 className="font-semibold mb-1">Payments Support:</h4>
              <p className="text-gray-700">paymentsupport@jntugv.edu.in</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Google Maps (Location)</h4>
            <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              Map Placeholder
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
